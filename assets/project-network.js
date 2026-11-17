(function (global) {
    'use strict';

    const NS = 'http://www.w3.org/2000/svg';
    const DAY = 86400000;
    const escapeText = value => String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
    const number = ticks => (ticks / 10).toFixed(1);
    const date = value => new Intl.DateTimeFormat('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'
    }).format(new Date(`${value}T00:00:00Z`));
    const shortDate = value => new Intl.DateTimeFormat('en-GB', {
        day: '2-digit', month: 'short', timeZone: 'UTC'
    }).format(new Date(`${value}T00:00:00Z`));

    function calculate(schedule) {
        if (!schedule || !Array.isArray(schedule.tasks) || !schedule.tasks.length) {
            throw new Error('The task dataset is missing or empty.');
        }
        const nodes = new Map();
        const phaseIds = new Set(schedule.phases.map(phase => phase.id));
        for (const task of schedule.tasks) {
            if (!Number.isInteger(task.id) || nodes.has(task.id)) throw new Error(`Duplicate or invalid task ID ${task.id}.`);
            if (!Number.isFinite(task.duration) || task.duration <= 0 ||
                Math.abs(task.duration * 10 - Math.round(task.duration * 10)) > 1e-8) {
                throw new Error(`Task ${task.id} needs a positive duration at the source's tenth-day precision.`);
            }
            if (!phaseIds.has(task.phase)) throw new Error(`Task ${task.id} references an unknown phase.`);
            if (!Array.isArray(task.predecessors) || new Set(task.predecessors).size !== task.predecessors.length) {
                throw new Error(`Task ${task.id} has an invalid predecessor list.`);
            }
            nodes.set(task.id, {
                ...task, predecessors: [...task.predecessors], successors: [],
                ticks: Math.round(task.duration * 10), milestone: false
            });
        }
        const sourceEdges = [];
        for (const node of nodes.values()) {
            for (const predecessor of node.predecessors) {
                if (!nodes.has(predecessor) || predecessor === node.id) throw new Error(`Invalid link ${predecessor} -> ${node.id}.`);
                nodes.get(predecessor).successors.push(node.id);
                sourceEdges.push({ from: predecessor, to: node.id, derived: false });
            }
        }
        const roots = [...nodes.values()].filter(node => !node.predecessors.length).map(node => node.id);
        const leaves = [...nodes.values()].filter(node => !node.successors.length).map(node => node.id);
        const indegree = new Map([...nodes.values()].map(node => [node.id, node.predecessors.length]));
        const queue = [...roots];
        const order = [];
        while (queue.length) {
            const id = queue.shift();
            const node = nodes.get(id);
            node.es = Math.max(0, ...node.predecessors.map(predecessor => nodes.get(predecessor).ef));
            node.ef = node.es + node.ticks;
            node.rank = 1 + Math.max(0, ...node.predecessors.map(predecessor => nodes.get(predecessor).rank));
            order.push(id);
            for (const successor of node.successors) {
                indegree.set(successor, indegree.get(successor) - 1);
                if (indegree.get(successor) === 0) queue.push(successor);
            }
        }
        if (order.length !== nodes.size) throw new Error('The workbook contains a dependency cycle.');
        const duration = Math.max(...leaves.map(id => nodes.get(id).ef));
        for (const id of [...order].reverse()) {
            const node = nodes.get(id);
            node.lf = node.successors.length ? Math.min(...node.successors.map(successor => nodes.get(successor).ls)) : duration;
            node.ls = node.lf - node.ticks;
            node.tf = node.ls - node.es;
            node.ff = Math.min(duration, ...node.successors.map(successor => nodes.get(successor).es)) - node.ef;
            node.critical = node.tf === 0;
        }
        nodes.set('START', {
            id: 'START', name: 'Project start', milestone: true, phase: 0, predecessors: [], successors: roots,
            ticks: 0, es: 0, ef: 0, ls: 0, lf: 0, tf: 0, ff: 0, critical: true, rank: 0
        });
        nodes.set('FINISH', {
            id: 'FINISH', name: 'All listed work complete', milestone: true, phase: 9, predecessors: leaves, successors: [],
            ticks: 0, es: duration, ef: duration, ls: duration, lf: duration, tf: 0, ff: 0, critical: true,
            rank: 1 + Math.max(...order.map(id => nodes.get(id).rank))
        });
        const edges = [
            ...sourceEdges,
            ...roots.map(id => ({ from: 'START', to: id, derived: true })),
            ...leaves.map(id => ({ from: id, to: 'FINISH', derived: true }))
        ];
        for (const edge of edges) {
            const from = nodes.get(edge.from);
            const to = nodes.get(edge.to);
            edge.critical = from.critical && to.critical && from.ef === to.es;
        }
        const criticalNodes = order.filter(id => nodes.get(id).critical);
        const paths = [];
        function visit(id, path) {
            if (id === 'FINISH') {
                paths.push(path.filter(item => typeof item === 'number'));
                return;
            }
            for (const edge of edges.filter(edge => edge.from === id && edge.critical)) {
                visit(edge.to, [...path, edge.to]);
            }
        }
        visit('START', []);
        return { schedule, nodes, edges, sourceEdges, order, roots, leaves, duration, criticalNodes, paths };
    }

    function svgElement(tag, attributes = {}, text) {
        const element = document.createElementNS(NS, tag);
        for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function addText(parent, x, y, text, attributes = {}) {
        const element = svgElement('text', { x, y, ...attributes }, text);
        parent.appendChild(element);
        return element;
    }

    function wrap(value, limit) {
        const lines = [];
        let current = '';
        for (const word of value.split(/\s+/)) {
            if (current && `${current} ${word}`.length > limit) {
                lines.push(current);
                current = word;
            } else {
                current = current ? `${current} ${word}` : word;
            }
        }
        if (current) lines.push(current);
        return lines;
    }

    function makeSvg(width, height, title, description) {
        const svg = svgElement('svg', {
            xmlns: NS, viewBox: `0 0 ${width} ${height}`, width, height, role: 'group',
            'aria-labelledby': 'network-svg-title network-svg-description',
            style: "font-family:'Segoe UI',Arial,sans-serif;background:#fff"
        });
        svg.appendChild(svgElement('title', { id: 'network-svg-title' }, title));
        svg.appendChild(svgElement('desc', { id: 'network-svg-description' }, description));
        const definitions = svgElement('defs');
        for (const [id, color] of [['normal', '#718078'], ['critical', '#b52d36'], ['derived', '#667788']]) {
            const marker = svgElement('marker', {
                id: `arrow-${id}`, viewBox: '0 0 10 10', refX: 9, refY: 5,
                markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse'
            });
            marker.appendChild(svgElement('path', { d: 'M 0 0 L 10 5 L 0 10 z', fill: color }));
            definitions.appendChild(marker);
        }
        svg.appendChild(definitions);
        return svg;
    }

    function detailedLayout(model) {
        const width = 266;
        const height = 228;
        const column = 344;
        const row = 290;
        const left = 200;
        let top = 60;
        const positions = new Map();
        const lanes = [];
        for (const phase of model.schedule.phases) {
            const counts = new Map();
            let rows = 1;
            for (const task of model.schedule.tasks.filter(task => task.phase === phase.id)) {
                const node = model.nodes.get(task.id);
                const subrow = counts.get(node.rank) || 0;
                counts.set(node.rank, subrow + 1);
                rows = Math.max(rows, subrow + 1);
                positions.set(node.id, { x: left + node.rank * column, y: top + 44 + subrow * row, width, height });
            }
            const laneHeight = 44 + rows * row;
            lanes.push({ ...phase, y: top, height: laneHeight });
            top += laneHeight;
        }
        const drivingLeaf = model.leaves.find(id => model.nodes.get(id).ef === model.duration);
        positions.set('START', { x: left, y: positions.get(model.roots[0]).y, width, height });
        positions.set('FINISH', {
            x: left + model.nodes.get('FINISH').rank * column, y: positions.get(drivingLeaf).y, width, height
        });
        return {
            positions, lanes, width: positions.get('FINISH').x + width + 60,
            height: top + 40, nodeWidth: width, nodeHeight: height
        };
    }

    function routeEdge(from, to, index) {
        const start = { x: from.x + from.width, y: from.y + from.height / 2 };
        const end = { x: to.x, y: to.y + to.height / 2 };
        if (from.y === to.y && to.x - start.x < 100) return [start, end];
        const out = start.x + 16 + (index % 4) * 7;
        const entry = end.x - 16 - (index % 3) * 7;
        const channel = from.y - 14 - (index % 4) * 7;
        return [start, { x: out, y: start.y }, { x: out, y: channel },
            { x: entry, y: channel }, { x: entry, y: end.y }, end];
    }

    function drawEdge(parent, edge, points) {
        const type = edge.critical ? 'critical' : edge.derived ? 'derived' : 'normal';
        const line = svgElement('path', {
            d: points.map((point, index) => `${index ? 'L' : 'M'}${point.x},${point.y}`).join(' '),
            fill: 'none', stroke: type === 'critical' ? '#b52d36' : type === 'derived' ? '#667788' : '#718078',
            'stroke-width': edge.critical ? 2.6 : 1.5, 'stroke-dasharray': edge.derived ? '7 5' : 'none',
            'marker-end': `url(#arrow-${type})`, 'data-from': edge.from, 'data-to': edge.to,
            'data-derived': edge.derived, 'data-critical': edge.critical
        });
        line.appendChild(svgElement('title', {}, `${edge.from} -> ${edge.to}: ${edge.derived ? 'derived boundary connector' : 'finish-to-start, zero lag'}${edge.critical ? '; critical' : ''}`));
        parent.appendChild(line);
    }

    function renderDetailed(model) {
        const layout = detailedLayout(model);
        const svg = makeSvg(layout.width, layout.height, 'SMART Greenhouse detailed activity-on-node project network',
            `${model.order.length} source activities and two zero-duration boundary milestones. ${model.sourceEdges.length} source finish-to-start links. Critical activities and driving links are red. Layout columns show dependency levels, not elapsed time.`);
        svg.appendChild(svgElement('rect', { width: layout.width, height: layout.height, fill: '#fff' }));
        for (const lane of layout.lanes) {
            svg.appendChild(svgElement('rect', {
                x: 0, y: lane.y, width: layout.width, height: lane.height,
                fill: lane.id % 2 ? '#f5f7f8' : '#ffffff', stroke: '#e1e6e9'
            }));
            addText(svg, 18, lane.y + 26, `${lane.id}. ${lane.name}`, {
                'font-size': 16, 'font-weight': 700, fill: '#34433c'
            });
        }
        addText(svg, 18, 30, 'Activity-on-node | scheduled durations | all source FS links retained | offsets in working days from t = 0', {
            'font-size': 15, fill: '#46564d'
        });
        const connectors = svgElement('g', { 'aria-label': 'Dependencies' });
        for (const [index, edge] of model.edges.entries()) {
            drawEdge(connectors, edge, routeEdge(layout.positions.get(edge.from), layout.positions.get(edge.to), index));
        }
        svg.appendChild(connectors);
        for (const node of model.nodes.values()) {
            const position = layout.positions.get(node.id);
            const group = svgElement('g', {
                transform: `translate(${position.x},${position.y})`,
                class: 'network-node', 'data-task': node.id, tabindex: 0, role: 'button',
                'aria-label': `${node.milestone ? '' : `Task ${node.id}. `}${node.name}. Duration ${number(node.ticks)} working days. Total float ${number(node.tf)} days.${node.critical ? ' Critical.' : ''}`
            });
            const border = node.critical ? '#b52d36' : '#566b7a';
            group.appendChild(svgElement('rect', {
                width: position.width, height: position.height, rx: 2, fill: '#fff',
                stroke: border, 'stroke-width': node.critical ? 2.5 : 1.5,
                'stroke-dasharray': node.milestone ? '7 4' : 'none'
            }));
            group.appendChild(svgElement('rect', {
                x: 1, y: 1, width: position.width - 2, height: 26,
                fill: node.critical ? '#fcebed' : '#edf3f7'
            }));
            addText(group, 10, 18, node.milestone ? `${node.id} | derived milestone` : `ID ${node.id} | WBS ${node.wbs}`, {
                'font-size': 12, 'font-weight': 700, fill: border
            });
            const lines = wrap(node.name, 33);
            lines.forEach((line, index) => addText(group, 10, 47 + index * 16, line, {
                'font-size': 13, 'font-weight': 600, fill: '#1f2933'
            }));
            const metricTop = 114;
            const metrics = [['ES', node.es], ['D', node.ticks], ['EF', node.ef], ['LS', node.ls], ['TF', node.tf], ['LF', node.lf]];
            metrics.forEach(([label, value], index) => {
                const x = (index % 3) * (position.width / 3);
                const y = metricTop + Math.floor(index / 3) * 34;
                group.appendChild(svgElement('rect', {
                    x, y, width: position.width / 3, height: 34,
                    fill: label === 'TF' && node.critical ? '#fcebed' : '#f8fafb', stroke: '#d4dce1', 'stroke-width': .8
                }));
                addText(group, x + 7, y + 13, label, { 'font-size': 10, fill: '#57656e' });
                addText(group, x + 7, y + 28, number(value), { 'font-size': 13, 'font-weight': 700, fill: '#22313c' });
            });
            addText(group, 10, 199, node.milestone ? 'Boundary only; not an extra work package' : `Plan: ${shortDate(node.start)} - ${shortDate(node.finish)} 2027`, {
                'font-size': 11, fill: '#465661'
            });
            addText(group, 10, 216, `FF ${number(node.ff)}d | ${node.critical ? 'CRITICAL' : 'Noncritical'}${node.milestone ? '' : ` | Pred: ${node.predecessors.join(', ') || 'none'}`}`, {
                'font-size': 10, fill: border
            });
            group.appendChild(svgElement('title', {}, node.name));
            svg.appendChild(group);
        }
        return { svg, layout };
    }

    function phaseLinks(model) {
        const groups = new Map();
        for (const edge of model.sourceEdges) {
            const from = model.nodes.get(edge.from);
            const to = model.nodes.get(edge.to);
            if (from.phase === to.phase) continue;
            const key = `${from.phase}-${to.phase}`;
            if (!groups.has(key)) groups.set(key, { from: from.phase, to: to.phase, tasks: [], critical: false, derived: false });
            const group = groups.get(key);
            group.tasks.push([from.id, to.id]);
            group.critical ||= edge.critical;
        }
        return [...groups.values()];
    }

    function renderSimple(model) {
        const width = 1740;
        const height = 900;
        const positions = new Map([
            [1, { x: 25, y: 360 }], [2, { x: 380, y: 360 }], [3, { x: 735, y: 360 }],
            [4, { x: 1090, y: 40 }], [5, { x: 1090, y: 260 }], [6, { x: 1090, y: 480 }],
            [7, { x: 1090, y: 700 }], [8, { x: 1445, y: 360 }]
        ].map(([id, position]) => [id, { ...position, width: 260, height: 170 }]));
        const svg = makeSvg(width, height, 'SMART Greenhouse simplified workstream dependency map',
            'Eight workstreams. Arrows represent only the workbook links between specific activities in different workstreams; they do not require an entire workstream to finish before another starts. Red boxes contain critical activities.');
        svg.appendChild(svgElement('rect', { width, height, fill: '#fff' }));
        const links = phaseLinks(model);
        for (const [index, edge] of links.entries()) {
            const from = positions.get(edge.from);
            const to = positions.get(edge.to);
            const start = { x: from.x + from.width, y: from.y + 85 };
            const end = { x: to.x, y: to.y + 85 };
            let points;
            let labelX;
            let labelY;
            if (edge.from === 1 && edge.to === 3) {
                points = [start, { x: start.x + 18, y: start.y }, { x: start.x + 18, y: 320 },
                    { x: to.x - 20, y: 320 }, { x: to.x - 20, y: end.y - 18 }, { x: to.x, y: end.y - 18 }];
                labelX = 440; labelY = 310;
            } else if (edge.from === 3) {
                const y = from.y + 28 + (edge.to - 4) * 36;
                const entry = to.x - 80 + (edge.to - 4) * 10;
                points = [{ x: start.x, y }, { x: entry, y }, { x: entry, y: end.y }, end];
                labelX = entry + 5; labelY = end.y - 10;
            } else if (edge.to === 8) {
                const entry = to.x - 80 + (edge.from - 4) * 10;
                const targetY = to.y + 28 + (edge.from - 4) * 36;
                points = [start, { x: entry, y: start.y }, { x: entry, y: targetY }, { x: to.x, y: targetY }];
                labelX = start.x + 5; labelY = start.y - 10;
            } else {
                points = [start, end];
                labelX = start.x + 9; labelY = start.y - 10;
            }
            drawEdge(svg, edge, points);
            addText(svg, labelX, labelY, edge.tasks.map(([a, b]) => `${a} > ${b}`).join(', '), {
                'font-size': 11, 'font-weight': 600, fill: edge.critical ? '#b52d36' : '#52695c'
            });
        }
        const shortNames = {
            1: 'Define Greenhouse Requirements', 2: 'Design Greenhouse', 3: 'Greenhouse Construction',
            4: 'Mobile App Dashboard', 5: 'Automated Irrigation', 6: 'AI Plant Health Monitoring',
            7: 'Solar Panels', 8: 'Website & Handoff'
        };
        for (const phase of model.schedule.phases) {
            const position = positions.get(phase.id);
            const tasks = model.order.map(id => model.nodes.get(id)).filter(node => node.phase === phase.id);
            const critical = tasks.filter(task => task.critical).length;
            const group = svgElement('g', {
                transform: `translate(${position.x},${position.y})`, class: 'phase-node',
                'data-phase': phase.id, tabindex: 0, role: 'button',
                'aria-label': `${phase.name}, ${tasks.length} activities, ${critical} critical activities. Select to inspect links.`
            });
            group.appendChild(svgElement('rect', {
                width: position.width, height: position.height, rx: 12, fill: critical ? '#fff8f8' : '#f6f9f4',
                stroke: critical ? '#b95c61' : '#a9bca6', 'stroke-width': 1.7
            }));
            addText(group, 17, 26, `Workstream ${phase.id}`, { 'font-size': 11, 'font-weight': 600, fill: '#627262' });
            wrap(shortNames[phase.id], 26).forEach((line, index) => {
                addText(group, 17, 53 + index * 21, line, { 'font-size': 17, 'font-weight': 700, fill: '#243d30' });
            });
            addText(group, 17, 112, `${shortDate(phase.start)} - ${shortDate(phase.finish)} 2027`, { 'font-size': 11, fill: '#59695f' });
            addText(group, 17, 136, `${tasks.length} activities | ${critical ? `${critical} critical` : 'noncritical'}`, {
                'font-size': 12, 'font-weight': 600, fill: critical ? '#a82e3a' : '#44674b'
            });
            addText(group, 17, 155, 'Select to see activity-level links', { 'font-size': 10, fill: '#68756b' });
            svg.appendChild(group);
        }
        return { svg, layout: { width, height, positions } };
    }

    function renderRegister(model) {
        document.getElementById('task-register-body').innerHTML = model.schedule.tasks.map(task => {
            const node = model.nodes.get(task.id);
            const pert = (task.optimistic + 4 * task.mostLikely + task.pessimistic) / 6;
            return `<tr data-register-task="${task.id}" class="${node.critical ? 'critical-row' : ''}">
                <th scope="row">${task.id}</th><td>${task.wbs}</td><td class="task-name">${escapeText(task.name)}</td>
                <td>${task.predecessors.join(', ') || '-'}</td><td>${number(node.ticks)}</td><td>${pert.toFixed(2)}</td>
                <td>${date(task.start)}</td><td>${date(task.finish)}</td>
                ${[node.es, node.ef, node.ls, node.lf, node.tf, node.ff].map(value => `<td>${number(value)}</td>`).join('')}
                <td>${node.critical ? 'Yes' : 'No'}</td></tr>`;
        }).join('');
    }

    function showTask(model, id) {
        const node = model.nodes.get(id);
        const target = document.getElementById('task-inspector');
        document.querySelectorAll('.network-node').forEach(element => element.classList.toggle('selected', element.dataset.task === String(id)));
        target.innerHTML = `<h3>${node.milestone ? '' : `Task ${id}: `}${escapeText(node.name)}</h3>
            <p>${node.milestone ? 'Derived zero-duration boundary milestone.' : `${escapeText(model.schedule.phases.find(phase => phase.id === node.phase).name)} | WBS ${node.wbs}`}
            ${node.critical ? '<strong> Critical: zero total float.</strong>' : ` Total float: <strong>${number(node.tf)} working days.</strong>`}</p>
            <dl class="inspector-metrics">${[['ES', node.es], ['Duration', node.ticks], ['EF', node.ef], ['LS', node.ls], ['Total float', node.tf], ['LF', node.lf]]
                .map(([label, value]) => `<div><dt>${label}</dt><dd>${number(value)}d</dd></div>`).join('')}</dl>
            <p>Predecessors: ${node.predecessors.join(', ') || 'none'} | Successors: ${node.successors.join(', ') || 'none'} | Free float: ${number(node.ff)}d</p>
            ${node.milestone ? '' : `<p>Workbook planned dates: ${date(node.start)} - ${date(node.finish)}. These are source dates, not the recalculated ES/EF.</p>`}`;
    }

    function showPhase(model, id) {
        const phase = model.schedule.phases.find(phase => phase.id === id);
        const target = document.getElementById('phase-inspector');
        const links = phaseLinks(model).filter(edge => edge.from === id || edge.to === id);
        document.querySelectorAll('.phase-node').forEach(element => element.classList.toggle('selected', element.dataset.phase === String(id)));
        target.innerHTML = `<h3>${escapeText(phase.name)}</h3><p>Workbook planned span: ${date(phase.start)} - ${date(phase.finish)}. Early planning can overlap construction.</p>
            <ul>${links.map(edge => edge.tasks.map(([from, to]) => `<li><strong>${from} &rarr; ${to}:</strong> ${escapeText(model.nodes.get(from).name)} &rarr; ${escapeText(model.nodes.get(to).name)}</li>`).join('')).join('')}</ul>`;
    }

    function renderGantt(model) {
        const start = Date.parse(`${model.schedule.source.start}T00:00:00Z`);
        const finish = Date.parse(`${model.schedule.source.finish}T00:00:00Z`);
        const days = Math.round((finish - start) / DAY) + 1;
        const trackWidth = 1440;
        const bar = (first, last, detail) => {
            const offset = (Date.parse(`${first}T00:00:00Z`) - start) / DAY;
            const duration = (Date.parse(`${last}T00:00:00Z`) - Date.parse(`${first}T00:00:00Z`)) / DAY + 1;
            return `<div class="gantt-track"><span class="gantt-bar${detail ? ' detail' : ''}" style="left:${offset / days * 100}%;width:${duration / days * 100}%"></span></div>`;
        };
        const monthLabels = [];
        for (let month = 0; month <= 8; month++) {
            const time = Date.UTC(2027, month, 1);
            monthLabels.push(`<span style="left:${(time - start) / DAY / days * trackWidth}px">${new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(time)}</span>`);
        }
        const chart = document.getElementById('gantt-chart');
        chart.innerHTML = `<div class="gantt-header"><div>Project phase / task</div><div class="gantt-months">${monthLabels.join('')}</div></div>` +
            model.schedule.phases.map(phase => {
                const tasks = model.schedule.tasks.filter(task => task.phase === phase.id);
                return `<details class="gantt-phase"><summary class="gantt-row"><div class="gantt-label"><span class="chevron" aria-hidden="true">&rsaquo;</span><span class="phase-number">${phase.id}</span><div><strong>${escapeText(phase.name)}</strong><small>${tasks.length} tasks | ${shortDate(phase.start)} - ${shortDate(phase.finish)} 2027</small></div></div>${bar(phase.start, phase.finish, false)}</summary>
                    ${tasks.map(task => `<div class="gantt-row task-row"><div class="gantt-label"><div><strong>${task.id}. ${escapeText(task.name)}</strong><small>${shortDate(task.start)} - ${shortDate(task.finish)} 2027</small></div></div>${bar(task.start, task.finish, true)}</div>`).join('')}</details>`;
            }).join('');
        document.querySelectorAll('[data-gantt-scroll]').forEach(button => button.addEventListener('click', () => {
            document.getElementById('gantt-scroll-region').scrollBy({
                left: Number(button.dataset.ganttScroll) * 600, behavior: 'smooth'
            });
        }));
    }

    function installView(model, diagram, mode) {
        const canvas = document.getElementById('network-canvas');
        canvas.appendChild(diagram.svg);
        let userZoomed = false;
        let scale = Math.min(1, (document.getElementById('network-viewport').clientWidth - 24) / diagram.layout.width);
        function zoom(value) {
            scale = Math.max(.005, Math.min(1.5, value));
            diagram.svg.style.width = `${diagram.layout.width * scale}px`;
            diagram.svg.style.height = `${diagram.layout.height * scale}px`;
            document.getElementById('zoom-value').textContent = `${Math.round(scale * 100)}%`;
        }
        zoom(scale);
        const viewport = document.getElementById('network-viewport');
        new ResizeObserver(() => {
            if (!userZoomed && viewport.clientWidth > 0) {
                zoom((viewport.clientWidth - 24) / diagram.layout.width);
            }
        }).observe(viewport);
        const timelineTab = viewport.closest('.tab-content');
        if (timelineTab) {
            new MutationObserver(() => {
                if (!userZoomed && timelineTab.classList.contains('active') && viewport.clientWidth > 0) {
                    zoom((viewport.clientWidth - 24) / diagram.layout.width);
                }
            }).observe(timelineTab, { attributes: true, attributeFilter: ['class'] });
        }
        global.addEventListener('resize', () => {
            if (!userZoomed) {
                zoom((document.getElementById('network-viewport').clientWidth - 24) / diagram.layout.width);
            }
        });
        document.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => {
            userZoomed = true;
            const action = button.dataset.zoom;
            if (action === 'in') zoom(scale * 1.25);
            else if (action === 'out') zoom(scale / 1.25);
            else if (action === 'actual') zoom(1);
            else zoom((document.getElementById('network-viewport').clientWidth - 24) / diagram.layout.width);
        }));
        if (mode === 'detailed') {
            document.getElementById('download-svg').addEventListener('click', () => {
                const copy = diagram.svg.cloneNode(true);
                copy.style.width = '';
                copy.style.height = '';
                copy.querySelectorAll('[tabindex]').forEach(element => {
                    element.removeAttribute('tabindex');
                    element.removeAttribute('role');
                    element.removeAttribute('class');
                });
                const blob = new Blob([new XMLSerializer().serializeToString(copy)], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'smart-greenhouse-project-network.svg';
                link.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            });
            document.getElementById('print-report').addEventListener('click', () => global.print());
        }
        canvas.addEventListener('click', event => {
            const node = event.target.closest('[data-task], [data-phase]');
            if (!node) return;
            if (node.dataset.task) showTask(model, /^\d+$/.test(node.dataset.task) ? Number(node.dataset.task) : node.dataset.task);
            else showPhase(model, Number(node.dataset.phase));
        });
        canvas.addEventListener('keydown', event => {
            if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-task], [data-phase]')) {
                event.preventDefault();
                event.target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            }
        });
        if (mode === 'detailed') {
            renderRegister(model);
            document.getElementById('task-search').addEventListener('input', event => {
                const search = event.target.value.trim().toLowerCase();
                let count = 0;
                document.querySelectorAll('[data-register-task]').forEach(row => {
                    const node = model.nodes.get(Number(row.dataset.registerTask));
                    const match = !search || String(node.id) === search || node.name.toLowerCase().includes(search) || node.wbs === search;
                    row.hidden = !match;
                    if (match) count++;
                });
                document.getElementById('search-result').textContent = `${count} of ${model.order.length} activities shown${count ? '.' : '; no matching activities.'}`;
            });
            const finder = document.getElementById('task-jump');
            finder.innerHTML = '<option value="">Locate an activity...</option>' + model.schedule.tasks.map(task =>
                `<option value="${task.id}">${task.id}. ${escapeText(task.name)}</option>`).join('');
            finder.addEventListener('change', () => {
                if (!finder.value) return;
                const id = Number(finder.value);
                showTask(model, id);
                const position = diagram.layout.positions.get(id);
                document.getElementById('network-viewport').scrollTo({
                    left: Math.max(0, position.x * scale - 60), top: Math.max(0, position.y * scale - 60), behavior: 'smooth'
                });
            });
        }
    }

    function initialize() {
        const model = calculate(global.GreenhouseSchedule);
        const mode = document.body.dataset.networkMode || 'portal';
        if (mode === 'detailed') {
            document.getElementById('critical-path').textContent = model.paths.map(path => path.join(' > ')).join(' | ');
            document.getElementById('task-count').textContent = model.order.length;
            document.getElementById('link-count').textContent = model.sourceEdges.length;
            document.getElementById('cpm-duration').textContent = number(model.duration);
            document.getElementById('critical-count').textContent = model.criticalNodes.length;
            document.getElementById('root-tasks').textContent = model.roots.join(', ');
            document.getElementById('leaf-tasks').textContent = model.leaves.join(', ');
            document.getElementById('source-hash').textContent = model.schedule.source.sha256;
            const discrepancies = model.schedule.tasks.filter(task =>
                Math.abs(task.duration - (task.optimistic + 4 * task.mostLikely + task.pessimistic) / 6) > .051);
            document.getElementById('duration-discrepancies').innerHTML = discrepancies.map(task =>
                `<li><strong>Task ${task.id}:</strong> ${escapeText(task.name)}: scheduled ${task.duration.toFixed(1)}d; PERT ${((task.optimistic + 4 * task.mostLikely + task.pessimistic) / 6).toFixed(2)}d.</li>`).join('');
        } else if (mode === 'simple') {
            renderGantt(model);
        }
        installView(model, mode === 'detailed' ? renderDetailed(model) : renderSimple(model), mode);
        global.GreenhouseNetwork.model = model;
    }

    global.GreenhouseNetwork = { calculate, detailedLayout, routeEdge, phaseLinks };
    if (typeof document !== 'undefined' && (document.body.dataset.networkMode || document.getElementById('project-network-section'))) {
        try {
            initialize();
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            const alert = document.createElement('div');
            alert.className = 'error';
            alert.setAttribute('role', 'alert');
            alert.textContent = `Unable to build the project network: ${message}`;
            document.querySelector('main').prepend(alert);
            console.error('Project network initialization failed.', error);
        }
    }
})(globalThis);
