globalThis.GreenhouseSchedule = {
  "source": {
    "file": "SMART Greenhouse.xlsx",
    "sheet": "Project tasks",
    "sha256": "f607b6e84862ea5561d0668c4804700debb7bb69e402369203a97c8919becc26",
    "start": "2027-01-01",
    "finish": "2027-09-24",
    "scheduledDays": 191,
    "relationship": "Finish-to-start, zero explicit lag",
    "durationBasis": "Scheduled Duration column, in working days; source precision preserved",
    "calendar": "Monday-Friday, 8 hours per working day; no holiday calendar supplied"
  },
  "phases": [
    {
      "id": 1,
      "sourceId": 1,
      "name": "Define Greenhouse Requirements",
      "start": "2027-01-01",
      "finish": "2027-02-17",
      "scheduledSpan": 33.8
    },
    {
      "id": 2,
      "sourceId": 6,
      "name": "Design Greenhouse",
      "start": "2027-02-17",
      "finish": "2027-03-17",
      "scheduledSpan": 20.0
    },
    {
      "id": 3,
      "sourceId": 11,
      "name": "Greenhouse Construction",
      "start": "2027-03-03",
      "finish": "2027-07-28",
      "scheduledSpan": 104.5
    },
    {
      "id": 4,
      "sourceId": 21,
      "name": "Mobile App Dashboard",
      "start": "2027-01-01",
      "finish": "2027-09-20",
      "scheduledSpan": 187.0
    },
    {
      "id": 5,
      "sourceId": 27,
      "name": "Automated Irrigation System",
      "start": "2027-01-01",
      "finish": "2027-08-18",
      "scheduledSpan": 163.3
    },
    {
      "id": 6,
      "sourceId": 34,
      "name": "AI Plant Health Monitoring",
      "start": "2027-01-01",
      "finish": "2027-08-16",
      "scheduledSpan": 161.6
    },
    {
      "id": 7,
      "sourceId": 44,
      "name": "Solar Panels",
      "start": "2027-01-01",
      "finish": "2027-08-31",
      "scheduledSpan": 172.3
    },
    {
      "id": 8,
      "sourceId": 57,
      "name": "Website",
      "start": "2027-01-01",
      "finish": "2027-09-24",
      "scheduledSpan": 191.0
    }
  ],
  "tasks": [
    {
      "id": 2,
      "wbs": "1.1",
      "phase": 1,
      "name": "Define environmental requirements",
      "duration": 6.0,
      "optimistic": 4.0,
      "mostLikely": 6.0,
      "pessimistic": 8.0,
      "sourceExpected": 6.0,
      "start": "2027-01-01",
      "finish": "2027-01-08",
      "predecessors": [],
      "sourceDependency": ""
    },
    {
      "id": 3,
      "wbs": "1.2",
      "phase": 1,
      "name": "Identify target crops the greenhouse will support",
      "duration": 6.0,
      "optimistic": 4.0,
      "mostLikely": 6.0,
      "pessimistic": 8.0,
      "sourceExpected": 6.0,
      "start": "2027-01-11",
      "finish": "2027-01-18",
      "predecessors": [
        2
      ],
      "sourceDependency": "2FS"
    },
    {
      "id": 4,
      "wbs": "1.3",
      "phase": 1,
      "name": "Determine greenhouse size and location",
      "duration": 7.8,
      "optimistic": 5.0,
      "mostLikely": 8.0,
      "pessimistic": 10.0,
      "sourceExpected": 7.8,
      "start": "2027-01-19",
      "finish": "2027-01-28",
      "predecessors": [
        3
      ],
      "sourceDependency": "3FS"
    },
    {
      "id": 5,
      "wbs": "1.4",
      "phase": 1,
      "name": "Establish project budget",
      "duration": 7.8,
      "optimistic": 5.0,
      "mostLikely": 8.0,
      "pessimistic": 10.0,
      "sourceExpected": 7.8,
      "start": "2027-02-08",
      "finish": "2027-02-17",
      "predecessors": [
        2,
        4,
        3
      ],
      "sourceDependency": "2FS, 4FS, 3FS"
    },
    {
      "id": 7,
      "wbs": "2.1",
      "phase": 2,
      "name": "Create conceptual greenhouse design",
      "duration": 5.0,
      "optimistic": 4.0,
      "mostLikely": 5.0,
      "pessimistic": 6.0,
      "sourceExpected": 5.0,
      "start": "2027-02-17",
      "finish": "2027-02-24",
      "predecessors": [
        5
      ],
      "sourceDependency": "5FS"
    },
    {
      "id": 8,
      "wbs": "2.2",
      "phase": 2,
      "name": "Develop greenhouse floor plan",
      "duration": 5.0,
      "optimistic": 4.0,
      "mostLikely": 5.0,
      "pessimistic": 6.0,
      "sourceExpected": 5.0,
      "start": "2027-02-24",
      "finish": "2027-03-03",
      "predecessors": [
        7
      ],
      "sourceDependency": "7FS"
    },
    {
      "id": 9,
      "wbs": "2.3",
      "phase": 2,
      "name": "Select greenhouse materials",
      "duration": 5.0,
      "optimistic": 3.0,
      "mostLikely": 5.0,
      "pessimistic": 7.0,
      "sourceExpected": 5.0,
      "start": "2027-03-03",
      "finish": "2027-03-10",
      "predecessors": [
        8
      ],
      "sourceDependency": "8FS"
    },
    {
      "id": 10,
      "wbs": "2.4",
      "phase": 2,
      "name": "Review and approve design",
      "duration": 5.0,
      "optimistic": 3.0,
      "mostLikely": 5.0,
      "pessimistic": 7.0,
      "sourceExpected": 5.0,
      "start": "2027-03-10",
      "finish": "2027-03-17",
      "predecessors": [
        9,
        8,
        7
      ],
      "sourceDependency": "9FS, 8FS, 7FS"
    },
    {
      "id": 12,
      "wbs": "3.1",
      "phase": 3,
      "name": "Contractor Procurement",
      "duration": 7.8,
      "optimistic": 5.0,
      "mostLikely": 8.0,
      "pessimistic": 10.0,
      "sourceExpected": 7.8,
      "start": "2027-03-03",
      "finish": "2027-03-15",
      "predecessors": [
        5,
        8
      ],
      "sourceDependency": "5FS, 8FS"
    },
    {
      "id": 13,
      "wbs": "3.2",
      "phase": 3,
      "name": "Site Preparation (select, survey, and prepare)",
      "duration": 7.8,
      "optimistic": 5.0,
      "mostLikely": 7.0,
      "pessimistic": 12.0,
      "sourceExpected": 7.5,
      "start": "2027-03-15",
      "finish": "2027-03-25",
      "predecessors": [
        12
      ],
      "sourceDependency": "12FS"
    },
    {
      "id": 14,
      "wbs": "3.3",
      "phase": 3,
      "name": "Construct greenhouse foundation",
      "duration": 15.0,
      "optimistic": 10.0,
      "mostLikely": 14.0,
      "pessimistic": 24.0,
      "sourceExpected": 15.0,
      "start": "2027-03-25",
      "finish": "2027-04-15",
      "predecessors": [
        13
      ],
      "sourceDependency": "13FS"
    },
    {
      "id": 15,
      "wbs": "3.4",
      "phase": 3,
      "name": "Assemble greenhouse frame",
      "duration": 14.3,
      "optimistic": 10.0,
      "mostLikely": 14.0,
      "pessimistic": 20.0,
      "sourceExpected": 14.3,
      "start": "2027-04-15",
      "finish": "2027-05-05",
      "predecessors": [
        14
      ],
      "sourceDependency": "14FS"
    },
    {
      "id": 16,
      "wbs": "3.5",
      "phase": 3,
      "name": "Install greenhouse panels and entry doors",
      "duration": 14.5,
      "optimistic": 10.0,
      "mostLikely": 14.0,
      "pessimistic": 21.0,
      "sourceExpected": 14.5,
      "start": "2027-05-05",
      "finish": "2027-05-26",
      "predecessors": [
        15
      ],
      "sourceDependency": "15FS"
    },
    {
      "id": 17,
      "wbs": "3.6",
      "phase": 3,
      "name": "Install electrical service",
      "duration": 14.8,
      "optimistic": 9.0,
      "mostLikely": 14.0,
      "pessimistic": 24.0,
      "sourceExpected": 14.8,
      "start": "2027-05-26",
      "finish": "2027-06-15",
      "predecessors": [
        16
      ],
      "sourceDependency": "16FS"
    },
    {
      "id": 18,
      "wbs": "3.7",
      "phase": 3,
      "name": "Install water connections",
      "duration": 14.7,
      "optimistic": 9.0,
      "mostLikely": 14.0,
      "pessimistic": 23.0,
      "sourceExpected": 14.7,
      "start": "2027-06-16",
      "finish": "2027-07-06",
      "predecessors": [
        17
      ],
      "sourceDependency": "17FS"
    },
    {
      "id": 19,
      "wbs": "3.8",
      "phase": 3,
      "name": "Final inspections",
      "duration": 7.8,
      "optimistic": 5.0,
      "mostLikely": 7.0,
      "pessimistic": 14.0,
      "sourceExpected": 7.8,
      "start": "2027-07-06",
      "finish": "2027-07-16",
      "predecessors": [
        18
      ],
      "sourceDependency": "18FS"
    },
    {
      "id": 20,
      "wbs": "3.9",
      "phase": 3,
      "name": "Approve greenhouse for system installation",
      "duration": 7.8,
      "optimistic": 5.0,
      "mostLikely": 7.0,
      "pessimistic": 14.0,
      "sourceExpected": 7.8,
      "start": "2027-07-16",
      "finish": "2027-07-28",
      "predecessors": [
        19
      ],
      "sourceDependency": "19FS"
    },
    {
      "id": 22,
      "wbs": "4.1",
      "phase": 4,
      "name": "Design",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-01-01",
      "finish": "2027-01-04",
      "predecessors": [],
      "sourceDependency": ""
    },
    {
      "id": 23,
      "wbs": "4.2",
      "phase": 4,
      "name": "Develop",
      "duration": 3.0,
      "optimistic": 2.0,
      "mostLikely": 3.0,
      "pessimistic": 4.0,
      "sourceExpected": 3.0,
      "start": "2027-09-02",
      "finish": "2027-09-07",
      "predecessors": [
        22
      ],
      "sourceDependency": "22FS"
    },
    {
      "id": 24,
      "wbs": "4.3",
      "phase": 4,
      "name": "Test",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-09-07",
      "finish": "2027-09-08",
      "predecessors": [
        23
      ],
      "sourceDependency": "23FS"
    },
    {
      "id": 25,
      "wbs": "4.4",
      "phase": 4,
      "name": "Launch app",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-09-15",
      "finish": "2027-09-16",
      "predecessors": [
        24,
        20
      ],
      "sourceDependency": "24FS, 20FS"
    },
    {
      "id": 26,
      "wbs": "4.5",
      "phase": 4,
      "name": "Bug fixes",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-09-17",
      "finish": "2027-09-20",
      "predecessors": [
        25
      ],
      "sourceDependency": "25FS"
    },
    {
      "id": 28,
      "wbs": "5.1",
      "phase": 5,
      "name": "Botanical research- Plant needs",
      "duration": 1.0,
      "optimistic": 4.0,
      "mostLikely": 5.0,
      "pessimistic": 6.0,
      "sourceExpected": 5.0,
      "start": "2027-01-07",
      "finish": "2027-01-07",
      "predecessors": [],
      "sourceDependency": ""
    },
    {
      "id": 29,
      "wbs": "5.2",
      "phase": 5,
      "name": "HW/SW Design",
      "duration": 5.0,
      "optimistic": 4.0,
      "mostLikely": 5.0,
      "pessimistic": 6.0,
      "sourceExpected": 5.0,
      "start": "2027-01-08",
      "finish": "2027-01-14",
      "predecessors": [
        28
      ],
      "sourceDependency": "28FS"
    },
    {
      "id": 30,
      "wbs": "5.3",
      "phase": 5,
      "name": "Irrigation HW selection",
      "duration": 5.0,
      "optimistic": 3.0,
      "mostLikely": 5.0,
      "pessimistic": 7.0,
      "sourceExpected": 5.0,
      "start": "2027-01-15",
      "finish": "2027-01-21",
      "predecessors": [
        29
      ],
      "sourceDependency": "29FS"
    },
    {
      "id": 31,
      "wbs": "5.4",
      "phase": 5,
      "name": "Sensor selection",
      "duration": 5.0,
      "optimistic": 3.0,
      "mostLikely": 5.0,
      "pessimistic": 7.0,
      "sourceExpected": 5.0,
      "start": "2027-01-01",
      "finish": "2027-01-07",
      "predecessors": [],
      "sourceDependency": ""
    },
    {
      "id": 32,
      "wbs": "5.5",
      "phase": 5,
      "name": "Green House Integration and Test",
      "duration": 10.0,
      "optimistic": 7.0,
      "mostLikely": 10.0,
      "pessimistic": 13.0,
      "sourceExpected": 10.0,
      "start": "2027-07-28",
      "finish": "2027-08-11",
      "predecessors": [
        20,
        31
      ],
      "sourceDependency": "20FS, 31FS"
    },
    {
      "id": 33,
      "wbs": "5.6",
      "phase": 5,
      "name": "System Design Final Approval and release",
      "duration": 5.0,
      "optimistic": 3.0,
      "mostLikely": 5.0,
      "pessimistic": 7.0,
      "sourceExpected": 5.0,
      "start": "2027-08-11",
      "finish": "2027-08-18",
      "predecessors": [
        32
      ],
      "sourceDependency": "32FS"
    },
    {
      "id": 35,
      "wbs": "6.1",
      "phase": 6,
      "name": "Define requirements & plant types",
      "duration": 1.2,
      "optimistic": 1.0,
      "mostLikely": 1.0,
      "pessimistic": 2.0,
      "sourceExpected": 1.2,
      "start": "2027-01-01",
      "finish": "2027-01-04",
      "predecessors": [],
      "sourceDependency": ""
    },
    {
      "id": 36,
      "wbs": "6.2",
      "phase": 6,
      "name": "Select camera hardware",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-01-04",
      "finish": "2027-01-06",
      "predecessors": [
        35
      ],
      "sourceDependency": "35FS"
    },
    {
      "id": 37,
      "wbs": "6.3",
      "phase": 6,
      "name": "Install and position cameras",
      "duration": 1.2,
      "optimistic": 1.0,
      "mostLikely": 1.0,
      "pessimistic": 2.0,
      "sourceExpected": 1.2,
      "start": "2027-07-28",
      "finish": "2027-07-29",
      "predecessors": [
        36,
        20
      ],
      "sourceDependency": "36FS, 20FS"
    },
    {
      "id": 38,
      "wbs": "6.4",
      "phase": 6,
      "name": "Set up daily photo capture and storage",
      "duration": 1.3,
      "optimistic": 1.0,
      "mostLikely": 1.0,
      "pessimistic": 3.0,
      "sourceExpected": 1.3,
      "start": "2027-07-29",
      "finish": "2027-07-30",
      "predecessors": [
        37
      ],
      "sourceDependency": "37FS"
    },
    {
      "id": 39,
      "wbs": "6.5",
      "phase": 6,
      "name": "Configure AI image analysis (pre-trained model or API)",
      "duration": 3.2,
      "optimistic": 2.0,
      "mostLikely": 3.0,
      "pessimistic": 5.0,
      "sourceExpected": 3.2,
      "start": "2027-07-30",
      "finish": "2027-08-04",
      "predecessors": [
        38
      ],
      "sourceDependency": "38FS"
    },
    {
      "id": 40,
      "wbs": "6.6",
      "phase": 6,
      "name": "Test model accuracy",
      "duration": 2.2,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 4.0,
      "sourceExpected": 2.2,
      "start": "2027-08-05",
      "finish": "2027-08-09",
      "predecessors": [
        39
      ],
      "sourceDependency": "39FS"
    },
    {
      "id": 41,
      "wbs": "6.7",
      "phase": 6,
      "name": "Design alert rules",
      "duration": 1.2,
      "optimistic": 1.0,
      "mostLikely": 1.0,
      "pessimistic": 2.0,
      "sourceExpected": 1.2,
      "start": "2027-08-09",
      "finish": "2027-08-10",
      "predecessors": [
        40
      ],
      "sourceDependency": "40FS"
    },
    {
      "id": 42,
      "wbs": "6.8",
      "phase": 6,
      "name": "Integrate alerts with the dashboard",
      "duration": 2.2,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 4.0,
      "sourceExpected": 2.2,
      "start": "2027-08-10",
      "finish": "2027-08-12",
      "predecessors": [
        41
      ],
      "sourceDependency": "41FS"
    },
    {
      "id": 43,
      "wbs": "6.9",
      "phase": 6,
      "name": "Testing and handoff",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-08-12",
      "finish": "2027-08-16",
      "predecessors": [
        42
      ],
      "sourceDependency": "42FS"
    },
    {
      "id": 45,
      "wbs": "7.1",
      "phase": 7,
      "name": "Define solar power system requirements",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-01-01",
      "finish": "2027-01-04",
      "predecessors": [],
      "sourceDependency": ""
    },
    {
      "id": 46,
      "wbs": "7.2",
      "phase": 7,
      "name": "Estimate greenhouse energy consumption",
      "duration": 3.0,
      "optimistic": 2.0,
      "mostLikely": 3.0,
      "pessimistic": 4.0,
      "sourceExpected": 3.0,
      "start": "2027-01-05",
      "finish": "2027-01-07",
      "predecessors": [
        45
      ],
      "sourceDependency": "45FS"
    },
    {
      "id": 47,
      "wbs": "7.3",
      "phase": 7,
      "name": "Determine solar panel and battery capacity",
      "duration": 3.0,
      "optimistic": 2.0,
      "mostLikely": 3.0,
      "pessimistic": 4.0,
      "sourceExpected": 3.0,
      "start": "2027-01-08",
      "finish": "2027-01-12",
      "predecessors": [
        46
      ],
      "sourceDependency": "46FS"
    },
    {
      "id": 48,
      "wbs": "7.4",
      "phase": 7,
      "name": "Design solar panel layout and electrical system",
      "duration": 4.0,
      "optimistic": 3.0,
      "mostLikely": 4.0,
      "pessimistic": 5.0,
      "sourceExpected": 4.0,
      "start": "2027-01-13",
      "finish": "2027-01-18",
      "predecessors": [
        47
      ],
      "sourceDependency": "47FS"
    },
    {
      "id": 49,
      "wbs": "7.5",
      "phase": 7,
      "name": "Research and select solar panels, power system, control system",
      "duration": 3.0,
      "optimistic": 2.0,
      "mostLikely": 3.0,
      "pessimistic": 4.0,
      "sourceExpected": 3.0,
      "start": "2027-01-19",
      "finish": "2027-01-21",
      "predecessors": [
        48
      ],
      "sourceDependency": "48FS"
    },
    {
      "id": 50,
      "wbs": "7.6",
      "phase": 7,
      "name": "Procure solar panels and electrical components",
      "duration": 5.0,
      "optimistic": 4.0,
      "mostLikely": 5.0,
      "pessimistic": 6.0,
      "sourceExpected": 5.0,
      "start": "2027-01-22",
      "finish": "2027-01-28",
      "predecessors": [
        49
      ],
      "sourceDependency": "49FS"
    },
    {
      "id": 51,
      "wbs": "7.7",
      "phase": 7,
      "name": "Install solar panel mounting structures",
      "duration": 5.0,
      "optimistic": 4.0,
      "mostLikely": 5.0,
      "pessimistic": 6.0,
      "sourceExpected": 5.0,
      "start": "2027-07-28",
      "finish": "2027-08-04",
      "predecessors": [
        20
      ],
      "sourceDependency": "20FS"
    },
    {
      "id": 52,
      "wbs": "7.8",
      "phase": 7,
      "name": "Install and connect solar panels",
      "duration": 3.0,
      "optimistic": 2.0,
      "mostLikely": 3.0,
      "pessimistic": 4.0,
      "sourceExpected": 3.0,
      "start": "2027-08-04",
      "finish": "2027-08-09",
      "predecessors": [
        51
      ],
      "sourceDependency": "51FS"
    },
    {
      "id": 53,
      "wbs": "7.9",
      "phase": 7,
      "name": "Install battery storage and charge controller",
      "duration": 3.0,
      "optimistic": 2.0,
      "mostLikely": 3.0,
      "pessimistic": 4.0,
      "sourceExpected": 3.0,
      "start": "2027-08-09",
      "finish": "2027-08-12",
      "predecessors": [
        52
      ],
      "sourceDependency": "52FS"
    },
    {
      "id": 54,
      "wbs": "7.10",
      "phase": 7,
      "name": "Connect solar power to greenhouse sensors and control systems",
      "duration": 4.0,
      "optimistic": 3.0,
      "mostLikely": 4.0,
      "pessimistic": 5.0,
      "sourceExpected": 4.0,
      "start": "2027-08-12",
      "finish": "2027-08-18",
      "predecessors": [
        53
      ],
      "sourceDependency": "53FS"
    },
    {
      "id": 55,
      "wbs": "7.11",
      "phase": 7,
      "name": "Integrate energy generation and consumption data with dashboard",
      "duration": 4.0,
      "optimistic": 3.0,
      "mostLikely": 4.0,
      "pessimistic": 5.0,
      "sourceExpected": 4.0,
      "start": "2027-08-18",
      "finish": "2027-08-24",
      "predecessors": [
        54
      ],
      "sourceDependency": "54FS"
    },
    {
      "id": 56,
      "wbs": "7.12",
      "phase": 7,
      "name": "Test solar power generation, battery charging, and system performance",
      "duration": 5.0,
      "optimistic": 4.0,
      "mostLikely": 5.0,
      "pessimistic": 6.0,
      "sourceExpected": 5.0,
      "start": "2027-08-24",
      "finish": "2027-08-31",
      "predecessors": [
        55
      ],
      "sourceDependency": "55FS"
    },
    {
      "id": 58,
      "wbs": "8.1",
      "phase": 8,
      "name": "W1 Define stakeholder requirements and website acceptance criteria",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-01-01",
      "finish": "2027-01-04",
      "predecessors": [],
      "sourceDependency": ""
    },
    {
      "id": 59,
      "wbs": "8.2",
      "phase": 8,
      "name": "W2 Design site structure and responsive wireframes",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-01-05",
      "finish": "2027-01-06",
      "predecessors": [
        58
      ],
      "sourceDependency": "58FS"
    },
    {
      "id": 60,
      "wbs": "8.3",
      "phase": 8,
      "name": "W3 Set up website platform and document publishing workflow",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-01-07",
      "finish": "2027-01-08",
      "predecessors": [
        59
      ],
      "sourceDependency": "59FS"
    },
    {
      "id": 61,
      "wbs": "8.4",
      "phase": 8,
      "name": "W4 Build construction progress and project plan page",
      "duration": 3.0,
      "optimistic": 2.0,
      "mostLikely": 3.0,
      "pessimistic": 4.0,
      "sourceExpected": 3.0,
      "start": "2027-01-11",
      "finish": "2027-01-13",
      "predecessors": [
        60
      ],
      "sourceDependency": "60FS"
    },
    {
      "id": 62,
      "wbs": "8.5",
      "phase": 8,
      "name": "W5 Build AI Plant Monitoring tab",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-08-12",
      "finish": "2027-08-16",
      "predecessors": [
        42
      ],
      "sourceDependency": "42FS"
    },
    {
      "id": 63,
      "wbs": "8.6",
      "phase": 8,
      "name": "W6 Build Solar Panel System tab",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-08-31",
      "finish": "2027-09-02",
      "predecessors": [
        62,
        56
      ],
      "sourceDependency": "62FS, 56FS"
    },
    {
      "id": 64,
      "wbs": "8.7",
      "phase": 8,
      "name": "W7 Build Irrigation System tab",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-09-02",
      "finish": "2027-09-06",
      "predecessors": [
        63,
        32
      ],
      "sourceDependency": "63FS, 32FS"
    },
    {
      "id": 65,
      "wbs": "8.8",
      "phase": 8,
      "name": "W8 Build Mobile App Dashboard tab",
      "duration": 2.0,
      "optimistic": 1.0,
      "mostLikely": 2.0,
      "pessimistic": 3.0,
      "sourceExpected": 2.0,
      "start": "2027-09-17",
      "finish": "2027-09-20",
      "predecessors": [
        64,
        25
      ],
      "sourceDependency": "64FS, 25FS"
    },
    {
      "id": 66,
      "wbs": "8.9",
      "phase": 8,
      "name": "W9 Test website and obtain stakeholder approval",
      "duration": 3.0,
      "optimistic": 2.0,
      "mostLikely": 3.0,
      "pessimistic": 4.0,
      "sourceExpected": 3.0,
      "start": "2027-09-21",
      "finish": "2027-09-23",
      "predecessors": [
        65
      ],
      "sourceDependency": "65FS"
    },
    {
      "id": 67,
      "wbs": "8.10",
      "phase": 8,
      "name": "W10 Publish website and hand off maintenance guide",
      "duration": 1.0,
      "optimistic": 0.5,
      "mostLikely": 1.0,
      "pessimistic": 1.5,
      "sourceExpected": 1.0,
      "start": "2027-09-24",
      "finish": "2027-09-24",
      "predecessors": [
        66
      ],
      "sourceDependency": "66FS"
    }
  ]
};
