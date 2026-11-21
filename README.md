# SMART Greenhouse

Project website for the SMART Greenhouse: a client proposal and project portal covering the greenhouse concept, its feature systems, and the project plan.

**Live site:** https://dtm01.github.io/smartgreenhouse/

All readings, camera feeds, and controls on the site are simulated. The page does not connect to live sensors, equipment, or cameras.

## What's on the site

The site is a single page with tabs:

| Tab | Contents |
|---|---|
| Overview & Charter | Project concept and charter |
| Mobile Dashboard | Multi-screen phone app mockup (Home, Cameras, Energy, Alerts), functions, data flow, FAQ |
| Automated Irrigation | How the watering system works, interactive demo, FAQ |
| AI Plant Health | Camera-based plant health monitoring and demo |
| Solar Panels | Solar generation, energy use, and panel connection demo |
| Project Specifics | Timeline, Stakeholder Matrix, Risks, Resource & Budget |
| Team Directory | Team members and roles |

## Team

| Name | Role |
|---|---|
| Nia Isom | Engineering Director |
| Diya Mehta | Project Manager |
| Aiden Lee | Lead, Solar Panels |
| Alexander Wong | Lead, Irrigation System |
| Damita George | Lead, AI Health Monitoring |
| Patti de Cruilles | Lead, Website |
| Stephanie Nguyen | Lead, Mobile App Dashboard |

## Repository layout

```
index.html                           The website (all tabs, data, and JavaScript)
assets/                              Images, GIFs, CSS, and JS used by index.html
  overview.css, solar.css,           Tab-specific styles
  timeline-network.css
  network-data.js, project-network.js  Timeline / project network diagram
  *-live-cam.gif                     Sample camera feeds for the Mobile Dashboard
smart_greenhouse_client_portal.html  Older copy of the site (not linked; do not edit)
changelog.md                         Notes on notable changes
```

## Running it locally

There is no build step. Open `index.html` in a browser, or serve the folder so relative paths behave like GitHub Pages:

```
python -m http.server 8000
```

Then visit http://localhost:8000. An internet connection is needed for the CDN libraries.

## Tech stack

- [Tailwind CSS](https://tailwindcss.com/) via CDN, with a custom `sage` color palette defined in `index.html`
- [Font Awesome 6](https://fontawesome.com/) icons
- [Chart.js](https://www.chartjs.org/) for charts
- Vanilla JavaScript

## Editing guidelines

- Each feature lead edits only their own tab (`<div id="tab-...">`) and the JS/CSS that tab needs.
- Use a per-tab prefix for new element IDs and JS functions (for example `dash-` / `dash` for the Mobile Dashboard, `solar-` for Solar) so IDs never clash between tabs.
- Shared data (the risk register and budget arrays in `index.html`) feeds the Project Specifics tabs. Coordinate before changing it.
- Match the existing patterns: white `rounded-2xl border border-sage-200 shadow-sm` cards, uppercase `text-sage-600 tracking-widest` section kickers, and `<details>` FAQs.
- Keep pages responsive (check about 375px wide and desktop) and accessible (real `<button>` elements, aria labels, alt text, keyboard support).
- Label mockups and sample data clearly.
- Record notable changes in `changelog.md`.

## Deployment

The site is served by GitHub Pages from the `main` branch. Pushing to `main` publishes the changes, usually within a few minutes.
