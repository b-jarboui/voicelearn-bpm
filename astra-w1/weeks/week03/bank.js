// OPER621 Week 3 question bank. Every item: one correct response, checked automatically, with a "why".
// Week 3: BPM Technology and Critical Success Factors.
// CLOs: K2 — Evaluate factors affecting successful BPM implementation.
//       S2 — Integrate new technologies to manage organisational change.
// Outcomes: W3O1 — Technology enables rather than determines process design.
//           W3O2 — Critical success and failure factors for BPM implementation.
//           W3O3 — BPM suite selection, including the cost of change after go-live.
// Types: mcq (4 options) · tf (true/false) · drop (fill blanks from fixed lists) · visual (pick the right diagram)
//        order (put a short sequence in order; checked as one exact answer) · match (pair items; checked as one exact answer)
// Authoring convention: the correct option / blank choice is written FIRST; the player shuffles at runtime.
// For order questions, items are authored in their correct sequence; the player shuffles them.
// For match questions, pairs are authored correctly; the player shuffles the matching choices.
// Every question has exactly one defensible correct answer and a full explanation of why it is correct.
// Every explanation uses at least two complete sentences and connects the answer to BPM reasoning.
// Distractors represent plausible misunderstandings rather than obviously absurd alternatives.
// Questions use concrete situations and language understandable without specialist technical knowledge.
// Difficulty values: 1 = foundational understanding; 2 = application; 3 = analysis and judgement.
// Each section has 11 items, distributed across all six types with no type exceeding 30%.
// The bank provides distinct questions for initial checks and fresh remediation rounds.
// After loading, each item is normalised to the schema in DESIGN.md: id, clo, lo, sec, diff, type, q, o, ans, why, rem.

(() => {
  const D = window.DIAG, B = [];

  const add = (type, id, sec, diff, q, body, why) =>
    B.push(Object.assign({ id, sec, diff, type, q, why }, body));

  const M = (id, sec, d, q, o, why) =>
    add("mcq", id, sec, d, q, { o }, why);

  const TF = (id, sec, d, q, ans, why) =>
    add("tf", id, sec, d, q, { ans }, why);

  const DR = (id, sec, d, q, blanks, why) =>
    add("drop", id, sec, d, q, { blanks }, why);

  const V = (id, sec, d, q, opts, why) =>
    add("visual", id, sec, d, q, {
      o: opts.map((x) => x[1]),
      svg: opts.map((x) => x[0])
    }, why);

  const OR = (id, sec, d, q, items, why) =>
    add("order", id, sec, d, q, { items }, why);

  const MA = (id, sec, d, q, pairs, why) =>
    add("match", id, sec, d, q, { pairs }, why);


  // ---------------- W3O1a · A powerful tool, but whose process? ----------------
  // Outcome: W3O1 · Primary CLO: S2 · Supporting CLO: K2
  // Slides: 1–4, 7, 21
  // Distribution: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 1 match.


  M(
    "w3-o1a-01", "W3O1a", 1,
    "Which statement best explains the difference between BPM and a BPM suite?",
    [
      "BPM is the continuing management discipline, while a BPM suite is software that can support it",
      "BPM is the software licence, while a BPM suite is the organisation's improvement strategy",
      "BPM and a BPM suite are different names for exactly the same software product",
      "BPM is used before installation, while a BPM suite takes over all management responsibilities afterward"
    ],
    "Business Process Management is the continuing discipline of designing, owning, measuring, and improving processes. A BPM suite provides technological capabilities that support those responsibilities but cannot replace them."
  );


  M(
    "w3-o1a-02", "W3O1a", 2,
    "Qasr Marina buys mobile check-in software, but guests still wait because room information is disconnected. What should management conclude?",
    [
      "The technology improved one activity without resolving the underlying end-to-end process problem",
      "The mobile application has solved the process problem because guests can now use their phones",
      "The hotel should purchase a larger application before investigating its current process",
      "The problem must be caused entirely by reception employees because the software works"
    ],
    "A mobile interface cannot eliminate delays caused by disconnected information and unclear coordination. Qasr needs to understand and redesign the complete guest arrival process before deciding which technological capabilities will help."
  );


  M(
    "w3-o1a-03", "W3O1a", 3,
    "A vendor demonstrates a beautiful hospital discharge workflow before the hospital has agreed how discharge should work. What is the greatest process-design risk?",
    [
      "The hospital may adopt the vendor's assumptions instead of designing a process around clinical and patient needs",
      "The hospital will necessarily spend more money than every competing hospital",
      "The vendor's software will automatically eliminate every unnecessary discharge activity",
      "The hospital will no longer need clinicians to make clinical decisions"
    ],
    "A demonstration reflects the workflow and assumptions built into the software. Without an independently agreed future process, the hospital risks allowing the vendor's design to determine how its employees work."
  );


  TF(
    "w3-o1a-04", "W3O1a", 1,
    "Installing a BPM suite automatically means that an organisation is practising effective Business Process Management.",
    false,
    "A BPM suite is a technological tool, while BPM requires continuing process ownership, measurement, governance, and improvement. Installing software does not establish that these management responsibilities are being performed."
  );


  TF(
    "w3-o1a-05", "W3O1a", 2,
    "A process should be understood and redesigned before deciding how technology will support its future operation.",
    true,
    "Understanding the current process reveals the causes of problems, while redesign defines the intended way of working. Technology can then be selected and developed to support that design rather than dictate it."
  );


  DR(
    "w3-o1a-06", "W3O1a", 1,
    "Business Process Management is a continuing management {1}, while a BPM suite is a technological {2}.",
    [
      ["discipline", "licence", "demonstration"],
      ["enabler", "strategy", "process owner"]
    ],
    "BPM is a management discipline because it involves continuing responsibility for how organisational processes perform. A BPM suite is an enabler because its software capabilities can support processes that management has designed."
  );


  DR(
    "w3-o1a-07", "W3O1a", 2,
    "Qasr should {1} its future check-in process before selecting technology to {2} that process.",
    [
      ["design", "automate without examining", "purchase"],
      ["support", "determine", "replace"]
    ],
    "Qasr must design the improved guest journey around operational needs and customer outcomes. Technology should support that design rather than determine which activities the hotel must preserve."
  );


  V(
    "w3-o1a-08", "W3O1a", 2,
    "Which diagram shows the soundest approach to introducing BPM technology?",
    [
      [
        D.flow([
          "Understand|current work",
          "Design|better process",
          "Choose|technology",
          "+Measure|outcomes"
        ]),
        "Understand the work, design the process, choose technology, and measure outcomes"
      ],
      [
        D.flow([
          "Choose|technology",
          "Copy|demonstration",
          "Train|employees",
          "+Declare|success"
        ]),
        "Choose technology, copy the demonstration, train employees, and declare success"
      ],
      [
        D.flow([
          "Buy|software",
          "Automate|current work",
          "Add|features",
          "+Close|project"
        ]),
        "Buy software, automate current activities, add features, and close the project"
      ],
      [
        D.flow([
          "Choose|vendor",
          "Configure|system",
          "Discover|problems",
          "+Design|process"
        ]),
        "Choose a vendor, configure the system, discover problems, and design the process afterward"
      ]
    ],
    "The sound approach begins by understanding current work and designing the intended future process. Technology is then chosen to support that design, while measurement checks whether the expected improvement actually occurs."
  );


  V(
    "w3-o1a-09", "W3O1a", 3,
    "A hotel has repeated booking checks that add no value for guests. Which diagram best illustrates the danger of automating the existing process without redesign?",
    [
      [
        D.flow([
          "Booking|received",
          "!Duplicate|check",
          "!Repeated|entry",
          "Guest|served"
        ]),
        "The process retains duplicate checks and repeated entry even after automation"
      ],
      [
        D.flow([
          "Booking|received",
          "Unnecessary|checks removed",
          "Information|shared",
          "+Guest|served"
        ]),
        "Unnecessary checks are removed and information is shared before the guest is served"
      ],
      [
        D.flow([
          "Guest|arrives",
          "Booking|confirmed",
          "Room|ready",
          "+Guest|settled"
        ]),
        "The guest moves through a redesigned arrival process without repeated checks"
      ],
      [
        D.flow([
          "Process|investigated",
          "Duplication|removed",
          "Workflow|connected",
          "+Result|measured"
        ]),
        "The organisation investigates the process, removes duplication, connects work, and measures the result"
      ]
    ],
    "The correct diagram preserves unnecessary duplicate activities, which illustrates an automated mess. Automation may make those activities faster without correcting the underlying process design."
  );


  OR(
    "w3-o1a-10", "W3O1a", 2,
    "Put these decisions in a sensible order for improving a university's student registration process.",
    [
      "Investigate why students experience registration delays",
      "Design a registration process that addresses the identified causes",
      "Select technology that supports the redesigned registration process",
      "Measure whether students complete registration more efficiently"
    ],
    "The university needs evidence about the existing problem before designing a better process. Technology should support the agreed design, and later measurement establishes whether students receive the intended benefit."
  );


  MA(
    "w3-o1a-11", "W3O1a", 2,
    "Match each responsibility or capability to its appropriate BPM role.",
    [
      [
        "Process design",
        "Deciding how the organisation should perform its work"
      ],
      [
        "Process ownership",
        "Remaining accountable for the complete process outcome"
      ],
      [
        "BPM suite",
        "Providing software capabilities that support the chosen process"
      ],
      [
        "Process monitoring",
        "Observing performance to identify problems and improvement opportunities"
      ]
    ],
    "Process design and ownership are management responsibilities, while a BPM suite provides supporting technological capabilities. Monitoring supplies performance evidence so responsible managers can continue improving the process."
  );


  // ---------------- W3O1b · Inside the suite: from drawings to real work ----------------
  // Outcome: W3O1 · Primary CLO: S2 · Supporting CLO: K2
  // Slides: 5–6, 21
  // Distribution: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 1 match.


  M(
    "w3-o1b-01", "W3O1b", 1,
    "A hospital draws a diagram showing how patients move from discharge approval to leaving the ward. Which BPM suite capability is being used?",
    [
      "Process modelling",
      "Workflow execution",
      "Business rules execution",
      "Performance monitoring"
    ],
    "Process modelling creates a representation of activities, decisions, and their relationships. Drawing the process does not by itself execute the work or establish whether the hospital performs it successfully."
  );


  M(
    "w3-o1b-02", "W3O1b", 2,
    "At Qasr Marina, a corporate booking needs approval from the revenue team. Which BPM suite capability can automatically direct the request to the responsible employee?",
    [
      "Workflow execution",
      "Process modelling alone",
      "A performance dashboard alone",
      "Integration and APIs alone"
    ],
    "Workflow execution coordinates real work by directing tasks to the appropriate people or systems. A process model can describe the approval, but the model alone does not send the request to the revenue employee."
  );


  M(
    "w3-o1b-03", "W3O1b", 3,
    "Noor Health has a dashboard that is not connected to its hospital information system. What is the most defensible concern?",
    [
      "The dashboard may lack the operational information needed to monitor the actual discharge process",
      "The dashboard automatically makes every discharge decision clinically unsafe",
      "The hospital no longer needs a process owner because the dashboard exists",
      "The disconnected dashboard proves that every process model developed by the analysts is incorrect"
    ],
    "Monitoring depends on relevant and reliable information from the process being managed. Without the necessary integration, a dashboard may not provide the operational visibility needed to understand discharge performance."
  );


  TF(
    "w3-o1b-04", "W3O1b", 2,
    "Because the modelling, workflow, rules and integration layers do the real work, an organisation can safely defer the monitoring layer until later.",
    false,
    "Monitoring is the layer that turns a project into management, because it shows managers how the process performs while work is still running. It is also the layer organisations most often defer, and deferring it leaves nobody able to see whether the new process delivers the promised improvement."
  );


  TF(
    "w3-o1b-05", "W3O1b", 2,
    "A business rules engine can help an organisation apply defined decision conditions consistently across different cases.",
    true,
    "A rules engine applies decision logic established by the organisation, such as conditions governing corporate hotel rates. It supports consistent decisions, although management remains responsible for defining appropriate rules."
  );


  DR(
    "w3-o1b-06", "W3O1b", 1,
    "In a BPM suite, {1} describes the process, while {2} coordinates real tasks as the process operates.",
    [
      ["modelling", "monitoring", "integration"],
      ["workflow execution", "process documentation", "licence management"]
    ],
    "Modelling creates a shared representation of how the process should work. Workflow execution helps ensure that real activities are directed and coordinated according to the intended process."
  );


  DR(
    "w3-o1b-07", "W3O1b", 2,
    "A hotel uses {1} to exchange booking information between applications and {2} to identify unusual check-in delays.",
    [
      ["integration", "modelling", "staff scheduling"],
      ["monitoring", "licensing", "process drawing"]
    ],
    "Integration connects applications so information needed by the process can be exchanged. Monitoring observes operational performance and helps managers identify delays or exceptions requiring attention."
  );


  V(
    "w3-o1b-08", "W3O1b", 2,
    "Which diagram best illustrates workflow execution coordinating a hotel check-in across departments?",
    [
      [
        D.lanes(
          ["Reception", "Revenue", "Housekeeping"],
          [
            [0, "Request"],
            [1, "Approve"],
            [2, "Release"],
            [0, "Complete"]
          ]
        ),
        "A request moves from reception to revenue and housekeeping before reception completes it"
      ],
      [
        D.lanes(
          ["Reception", "Revenue", "Housekeeping"],
          [
            [0, "Receive"],
            [0, "Record"],
            [0, "File"],
            [0, "Close"]
          ]
        ),
        "Reception completes four administrative activities without coordinating work with the other departments"
      ],
      [
        D.flow([
          "Write|policy",
          "Store|document",
          "Archive|document"
        ]),
        "Employees create and store a policy document without executing a guest request"
      ],
      [
        D.flow([
          "Purchase|licence",
          "Install|software",
          "Close|project"
        ]),
        "The hotel purchases and installs software without showing operational workflow"
      ]
    ],
    "Workflow execution coordinates actual tasks across the employees and departments responsible for completing a case. The correct swimlane shows the request moving through revenue and housekeeping before reception completes the guest's check-in."
  );


  V(
    "w3-o1b-09", "W3O1b", 3,
    "A university wants its registration system to use information already stored in its student records. Which diagram best represents the required integration?",
    [
      [
        D.flow([
          "Student|records",
          "Data|connection",
          "Registration|system",
          "+Decision|supported"
        ]),
        "Student records are connected to the registration system so existing information supports the decision"
      ],
      [
        D.flow([
          "Student|records",
          "!Manual|copy",
          "!Repeated|entry",
          "Registration|system"
        ]),
        "Employees repeatedly copy information manually between disconnected systems"
      ],
      [
        D.flow([
          "Registration|request",
          "Process|diagram",
          "Diagram|stored"
        ]),
        "The university creates and stores a registration process diagram without connecting applications"
      ],
      [
        D.flow([
          "Student|arrives",
          "!Information|missing",
          "Employee|calls",
          "Student|waits"
        ]),
        "Missing information forces employees to telephone another department while the student waits"
      ]
    ],
    "Integration allows applications to exchange information needed to complete a process. The correct diagram connects student records with the registration system instead of relying on repeated manual entry or disconnected information."
  );


  OR(
    "w3-o1b-10", "W3O1b", 2,
    "Put these events in order for a BPM-supported library reservation that requires staff approval.",
    [
      "A student submits a request to reserve a book",
      "The workflow sends the request to the responsible librarian",
      "The librarian reviews the request using the relevant borrowing rules",
      "The reservation system records the decision and notifies the student"
    ],
    "The student's request triggers the operational workflow, which directs the work to the responsible librarian. The librarian applies the relevant rules before the system records and communicates the reservation decision."
  );


  MA(
    "w3-o1b-11", "W3O1b", 2,
    "Match each BPM suite capability to its practical use in a hospital.",
    [
      [
        "Process modelling",
        "Showing how discharge activities and decisions are connected"
      ],
      [
        "Workflow execution",
        "Directing a pending discharge task to the responsible employee"
      ],
      [
        "Business rules",
        "Applying defined conditions to determine whether an approval is required"
      ],
      [
        "Integration",
        "Exchanging relevant information with the hospital information system"
      ],
      [
        "Monitoring and analytics",
        "Identifying discharge delays and examining performance patterns"
      ]
    ],
    "Each capability supports a different part of operating and managing a process. Modelling describes work, workflow coordinates tasks, rules support decisions, integration connects information, and monitoring reveals performance."
  );

// ---------------- W3O2a · The people behind a successful process ----------------
// Outcome: W3O2 · Primary CLO: K2 · Supporting CLO: S2
// Slides: 9–12, 21
// Distribution: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 1 match.

M(
  "w3-o2a-01", "W3O2a", 1,
  "A company director approves a BPM budget but stops participating when departments disagree, and escalated issues wait months for an answer. Which success factor is missing?",
  [
    "Visible, sustained and decisive executive sponsorship",
    "A larger collection of software features",
    "A more attractive vendor demonstration",
    "Additional process diagrams without management involvement"
  ],
  "Executive sponsorship means a senior leader who stays visible, sustains attention after the launch, and answers escalated issues in days, not quarters. Approving the budget and then delegating everything is effectively a withdrawal of sponsorship, even though nobody announces it."
);

M(
  "w3-o2a-02", "W3O2a", 2,
  "A university appoints someone responsible for improving student admissions, but that person cannot influence departmental decisions. What should university leadership address?",
  [
    "Give the process owner clear decision rights and a way to resolve cross-department problems",
    "Replace the process owner with another person who has the same limited authority",
    "Ask each department to optimise its own activities without coordinating with the owner",
    "Remove the end-to-end admissions measure because several departments contribute to it"
  ],
  "A process owner needs sufficient authority to influence the activities that determine the complete process outcome. Without decision rights or an effective escalation route, the appointment creates responsibility without the ability to improve performance."
);

M(
  "w3-o2a-03", "W3O2a", 3,
  "Noor Health's analysts developed 91 process models without involving clinicians. What is the strongest reason to question this approach?",
  [
    "The models may overlook practical clinical activities and exceptions that written policies do not capture",
    "Clinicians must personally operate every software component for the models to be valid",
    "A process model becomes inaccurate whenever it contains more than ten activities",
    "The absence of clinicians proves that every documented procedure is incorrect"
  ],
  "Clinicians possess practical knowledge about how discharge activities and exceptions occur during real work. Excluding them creates a risk that the models reflect written procedures without adequately representing operational reality."
);

TF(
  "w3-o2a-04", "W3O2a", 1,
  "A process owner can be effective without any authority to influence the departments involved in the process.",
  false,
  "A process owner must be able to influence decisions affecting the complete process. Without authority or an effective escalation arrangement, the owner may recognise problems but remain unable to resolve them."
);

TF(
  "w3-o2a-05", "W3O2a", 2,
  "Employee concerns about a proposed workflow can provide useful evidence about weaknesses in its design.",
  true,
  "Employees understand practical constraints and exceptions that may not appear in formal process documentation. Investigating their concerns can reveal genuine design problems and improve the likelihood of successful adoption."
);

DR(
  "w3-o2a-06", "W3O2a", 1,
  "A successful BPM programme needs active executive {1} and a process owner with sufficient {2} to resolve problems.",
  [
    ["sponsorship", "advertising", "licensing"],
    ["authority", "seniority of job title alone", "software access alone"]
  ],
  "Executive sponsorship provides continuing leadership and support for the programme. Process ownership becomes effective when the responsible person has sufficient authority to influence decisions across the process."
);

DR(
  "w3-o2a-07", "W3O2a", 1,
  "BPM success factors cluster around leadership, people and {1}, and very little of what decides success is {2}.",
  [
    ["method", "marketing", "pricing"],
    ["technical", "organisational", "managerial"]
  ],
  "The success factors fall into three families: leadership, people and method. Very little of it is technical, which is why buying a powerful suite cannot by itself make a BPM programme succeed."
);

V(
  "w3-o2a-08", "W3O2a", 2,
  "Which diagram best represents effective leadership and process ownership during BPM implementation?",
  [
    [
      D.flow([
        "Active|sponsor",
        "Empowered|owner",
        "Employees|involved",
        "+Process|improved"
      ]),
      "Active sponsorship supports an empowered owner who involves employees in improving the process"
    ],
    [
      D.flow([
        "Budget|approved",
        "!Sponsor|absent",
        "!Conflict|unresolved",
        "Project|delayed"
      ]),
      "Management approves funding but leaves departmental conflicts unresolved"
    ],
    [
      D.flow([
        "Owner|appointed",
        "!No decision|rights",
        "!Departments|disagree",
        "Problem|continues"
      ]),
      "A process owner is appointed without the authority needed to resolve disagreements"
    ],
    [
      D.flow([
        "Vendor|selected",
        "Software|installed",
        "!Employees|excluded",
        "System|launched"
      ]),
      "The system is launched without involving the employees who must use it"
    ]
  ],
  "Effective BPM implementation combines sustained leadership, empowered ownership, and employee involvement. The correct diagram shows these organisational conditions working together to support process improvement."
);

V(
  "w3-o2a-09", "W3O2a", 3,
  "A hospital wants its discharge redesign to reflect real clinical practice. Which picture shows the most appropriate involvement?",
  [
    [
      D.lanes(
        ["Clinicians", "Process team", "Leadership"],
        [
          [0, "Explain work"],
          [1, "Design process"],
          [0, "Test exceptions"],
          [2, "Resolve issues"]
        ]
      ),
      "Clinicians explain and test the work while the process team designs it and leadership resolves issues"
    ],
    [
      D.lanes(
        ["Clinicians", "Process team", "Leadership"],
        [
          [1, "Read manual"],
          [1, "Draw models"],
          [1, "Approve models"],
          [2, "Launch"]
        ]
      ),
      "The process team develops the models without consulting clinicians"
    ],
    [
      D.flow([
        "Vendor|demonstrates",
        "Managers|approve",
        "Employees|informed"
      ]),
      "Employees are informed about the chosen design only after management approval"
    ],
    [
      D.flow([
        "Policy|manual",
        "Models|produced",
        "Software|configured"
      ]),
      "The redesign relies on written policies without checking actual clinical work"
    ]
  ],
  "Clinician involvement helps the organisation understand real discharge activities, exceptions, and operational constraints. The correct diagram combines clinical knowledge, process design, practical testing, and leadership support."
);

OR(
  "w3-o2a-10", "W3O2a", 2,
  "A public library is redesigning its reservation service. Put these implementation activities in a sensible order.",
  [
    "Secure continuing leadership support for improving the reservation service",
    "Give a process owner authority to coordinate the departments involved",
    "Involve library employees in designing and testing the new reservation process",
    "Train employees to use the agreed process before operational launch"
  ],
  "Leadership support and empowered ownership create the conditions needed to coordinate the improvement. Employee involvement informs the design, while practical training prepares staff to operate the agreed process."
);

MA(
  "w3-o2a-11", "W3O2a", 2,
  "Match each BPM success factor to its practical contribution.",
  [
    [
      "Executive sponsorship",
      "Resolves major conflicts and protects resources throughout implementation"
    ],
    [
      "Process ownership",
      "Maintains accountability for the complete process across departments"
    ],
    [
      "Employee involvement",
      "Brings practical working knowledge into process design"
    ],
    [
      "Change management",
      "Helps people understand, prepare for, and adopt new ways of working"
    ],
    [
      "Internal capability",
      "Allows the organisation to operate and improve the process without permanent external dependence"
    ]
  ],
  "Each success factor addresses a different organisational requirement for sustainable BPM implementation. Together, they connect leadership, accountability, practical knowledge, adoption, and continuing improvement capability."
);


// ---------------- W3O2b · A promise needs a baseline and an owner ----------------
// Outcome: W3O2 · Primary CLO: K2 · Supporting CLO: S2
// Slides: 10, 13–15
// Distribution: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 1 match.

M(
  "w3-o2b-01", "W3O2b", 1,
  "A restaurant installs a new ordering system and reports that every software feature works. What additional evidence is needed to judge process improvement?",
  [
    "Whether customers receive their meals more efficiently compared with a reliable starting measure",
    "Whether the supplier has completed its final installation invoice",
    "Whether the restaurant has purchased every optional software feature",
    "Whether employees prefer the appearance of the new screens"
  ],
  "Technical completion establishes that the system has been delivered, not that the restaurant's service has improved. A reliable comparison of customer outcomes before and after implementation provides evidence about the intended benefit."
);

M(
  "w3-o2b-02", "W3O2b", 2,
  "Noor Health promised to reduce average discharge time by 30 percent from a baseline of 4.1 hours. What average time would meet that promise?",
  [
    "2.87 hours",
    "3.90 hours",
    "3.80 hours",
    "1.23 hours"
  ],
  "A thirty-percent reduction leaves seventy percent of the original discharge time. Multiplying 4.1 hours by 0.70 gives a target of 2.87 hours."
);

M(
  "w3-o2b-03", "W3O2b", 3,
  "A hospital's discharge time improves from 4.1 to 3.9 hours after introducing a BPM suite. Which conclusion is best supported?",
  [
    "The observed reduction is approximately 4.9 percent, but the figures alone do not establish why the promised improvement was missed",
    "The hospital achieved its promised thirty-percent reduction because discharge time became shorter",
    "The entire performance shortfall must have been caused by the unused rules engine",
    "The result proves that BPM technology cannot improve hospital processes"
  ],
  "The observed reduction is 0.2 hours, which is approximately 4.9 percent of the original 4.1 hours. This is far below the promised thirty percent, but identifying the causes requires further investigation."
);

TF(
  "w3-o2b-04", "W3O2b", 1,
  "Go-live proves that the expected BPM benefits have been achieved because the software is now operating.",
  false,
  "Go-live means the system has begun operating in the real working environment. Benefits must still be measured against defined outcomes because technical operation does not guarantee process improvement."
);

TF(
  "w3-o2b-05", "W3O2b", 2,
  "A process owner should continue monitoring performance after the technology implementation project has closed.",
  true,
  "Process performance can deteriorate after implementation when circumstances change or employees return to previous practices. Continuing ownership and monitoring help sustain benefits and identify new improvement opportunities."
);

DR(
  "w3-o2b-06", "W3O2b", 1,
  "A {1} records process performance before improvement, while a benefit owner remains accountable for the intended {2}.",
  [
    ["baseline", "software licence", "vendor demonstration"],
    ["outcome", "installation date", "number of screens"]
  ],
  "A baseline provides the starting measurement needed to evaluate change. Benefits ownership ensures that someone remains responsible for achieving and sustaining the intended process outcome."
);

DR(
  "w3-o2b-07", "W3O2b", 2,
  "A hotel measures guest waiting time from arrival until the guest receives a ready room. This measure is {1}, and it should be sustained through continuing process {2}.",
  [
    ["end-to-end", "department-only", "software-only"],
    ["governance", "licensing", "advertising"]
  ],
  "An end-to-end measure captures the complete experience that matters to the guest rather than one department's activity. Continuing governance, designed to outlive the project team, keeps responsibility and attention on that performance after implementation."
);

V(
  "w3-o2b-08", "W3O2b", 2,
  "Which diagram shows a credible way to evaluate whether a new BPM system delivers its promised benefit?",
  [
    [
      D.flow([
        "Define|outcome",
        "Measure|baseline",
        "Implement|change",
        "+Compare|results"
      ]),
      "Define the intended outcome, establish a baseline, implement the change, and compare results"
    ],
    [
      D.flow([
        "Buy|software",
        "Install|system",
        "Celebrate|launch"
      ]),
      "Purchase the system, complete installation, and treat launch as proof of success"
    ],
    [
      D.flow([
        "Vendor|demonstrates",
        "Features|counted",
        "Contract|signed"
      ]),
      "Judge improvement through the demonstration and number of features purchased"
    ],
    [
      D.flow([
        "Process|changed",
        "New|result",
        "!No earlier|measure"
      ]),
      "Measure performance after implementation without establishing a comparable starting value"
    ]
  ],
  "A credible benefits evaluation requires a defined outcome and a reliable baseline before the change is assessed. Comparing later results with that baseline helps establish whether the intended improvement occurred."
);

V(
  "w3-o2b-09", "W3O2b", 3,
  "A university installs an admissions system and wants to measure the complete student experience. Which diagram uses the most appropriate measurement boundary?",
  [
    [
      D.flow(["Measure from|application", "Documents|checked", "Decision|made", "+Measure to|student informed"]),
      "Measure from the student's application until the admission decision is communicated"
    ],
    [
      D.flow(["Student|applies", "Measure only|document checks", "Decision|made", "Student|informed"]),
      "Measure only the time spent checking documents"
    ],
    [
      D.flow(["Student|applies", "Documents|checked", "Measure only|decision recording", "Student|informed"]),
      "Measure only the time spent recording the admission decision"
    ],
    [
      D.flow(["Student|applies", "Measure from|document checks", "Measure to|decision made", "Student|informed"]),
      "Measure internal checking and decision-making without the student's complete wait"
    ]
  ],
  "The student's outcome is receiving the admission decision, so the measure should begin with the application and end when the decision is communicated. A shorter boundary can hide waiting time between activities and give an incomplete picture of improvement."
);

OR(
  "w3-o2b-10", "W3O2b", 2,
  "Put these activities in order for a hotel that wants to demonstrate a sustained reduction in guest waiting time.",
  [
    "Define the guest waiting-time measure and its starting and ending points",
    "Record the baseline using the agreed measurement definition",
    "Introduce the redesigned check-in process and supporting technology",
    "Compare later waiting times with the baseline using the same definition",
    "Continue monitoring performance and correcting problems after implementation"
  ],
  "A meaningful comparison requires a consistent measure and baseline before the redesigned process is evaluated. Continuing monitoring and corrective action help prevent the improvement from disappearing after the project closes."
);

MA(
  "w3-o2b-11", "W3O2b", 2,
  "Match each benefits-management concept to its meaning.",
  [
    [
      "Baseline",
      "The starting performance value used for comparison"
    ],
    [
      "Business benefit",
      "A valuable improvement in an organisational or customer outcome"
    ],
    [
      "Benefits owner",
      "The person accountable for achieving and sustaining the intended improvement"
    ],
    [
      "Governance",
      "The arrangements through which responsibilities and performance remain managed"
    ],
    [
      "Strategic alignment",
      "The connection between process improvement and the organisation's important goals"
    ]
  ],
  "These concepts connect a technology investment to meaningful organisational results. Baselines support measurement, ownership and governance sustain accountability, and strategic alignment ensures that the improvement serves an important purpose."
);


// ---------------- W3O2c · Five ways a promising programme falls apart ----------------
// Outcome: W3O2 · Primary CLO: K2 · Supporting CLO: S2
// Slides: 14–15, 21
// Distribution: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 1 match.

M(
  "w3-o2c-01", "W3O2c", 1,
  "A bank's analysts produce dozens of detailed process models, but no manager is responsible for them and nobody ever opens them after the project. Which failure pattern does this most clearly illustrate?",
  [
    "Shelfware",
    "Automated mess",
    "Rejection at go-live",
    "Pilot that never scales"
  ],
  "Shelfware looks like a model nobody opens. Its root cause is modelling done for its own sake with no owner, so the models describe work but never help anyone manage it."
);

M(
  "w3-o2c-02", "W3O2c", 2,
  "A bank automates three unnecessary approval steps without questioning why those approvals exist. Which BPM failure pattern is most likely?",
  [
    "An automated mess",
    "A pilot that has successfully scaled",
    "Benefits sustained through governance",
    "A process redesigned around customer needs"
  ],
  "An automated mess occurs when technology accelerates activities that should have been challenged or redesigned. The bank may process unnecessary approvals faster while preserving the underlying inefficiency."
);

M(
  "w3-o2c-03", "W3O2c", 3,
  "A logistics company redesigns its order-handling process with excellent results, but no other process is ever improved because there is no process map or governance deciding what comes next. What is the main root cause?",
  [
    "No process architecture and no governance",
    "Too few software features in the suite",
    "Change management that started too late",
    "A missing baseline for the redesigned process"
  ],
  "A pilot that never scales looks like one good process, then nothing. Its root cause is missing process architecture, meaning a map of how processes fit together, and missing governance, so nobody decides which process to improve next. A late start to change management or a missing baseline produce different failures, namely rejection at go-live and evaporating benefits."
);

TF(
  "w3-o2c-04", "W3O2c", 1,
  "One successful process redesign will naturally spread to the rest of the organisation, even without process architecture or governance.",
  false,
  "Without process architecture and governance, nobody decides which process should be improved next, so the pattern is one good process, then nothing. This is the failure called the pilot that never scales, and it is prevented by building the architecture and governance that carry the programme forward."
);

TF(
  "w3-o2c-05", "W3O2c", 2,
  "When employees avoid a new workflow, managers should investigate whether its design fits real working conditions before assuming employees oppose improvement.",
  true,
  "Avoidance may indicate that the workflow creates practical difficulties or overlooks important operational exceptions. Investigating employee experience helps distinguish genuine design weaknesses from unfamiliarity with change."
);

DR(
  "w3-o2c-06", "W3O2c", 1,
  "A process model nobody opens is called {1}, while automating unnecessary activities without redesign creates an automated {2}.",
  [
    ["shelfware", "governance", "integration"],
    ["mess", "benefit", "baseline"]
  ],
  "Shelfware describes a model nobody opens, because modelling was done for its own sake with no owner. An automated mess is a faster bad process, which happens when teams skip the Understand and Innovate phases."
);

DR(
  "w3-o2c-07", "W3O2c", 2,
  "When managers claim savings but the budget stays unchanged, benefits have {1}, usually because there was no baseline, no owner and no measurement {2}.",
  [
    ["evaporated", "scaled", "been integrated"],
    ["date", "software", "demonstration"]
  ],
  "Evaporating benefits look like savings claimed while the budget remains unchanged. The root cause is the absence of a baseline, an accountable owner and an agreed date on which results would be measured, so nobody can prove or bank the gain."
);

V(
  "w3-o2c-08", "W3O2c", 2,
  "Which diagram best illustrates a BPM pilot that never scales?",
  [
    [
      D.flow(["One process|improved", "+Good|results", "!No architecture|or governance", "!Nothing|follows"]),
      "One process improves, but without architecture or governance nothing else follows"
    ],
    [
      D.flow(["One process|improved", "Architecture|mapped", "Governance|decides next", "+Programme|continues"]),
      "Architecture and governance carry the programme on to the next process"
    ],
    [
      D.flow(["Process|designed", "Employees|trained", "System|launched", "+Benefits|measured"]),
      "Employees are prepared and the organisation measures results after launch"
    ],
    [
      D.flow(["Pilot|tested", "Problems|identified", "Design|improved", "+Pilot|retested"]),
      "The organisation uses pilot evidence to improve the design before going further"
    ]
  ],
  "A pilot that never scales looks like one good process, then nothing. The correct diagram shows the missing process architecture and governance that would have decided which process to improve next."
);

V(
  "w3-o2c-09", "W3O2c", 3,
  "A company reports large savings from its BPM programme, yet its operating budget has not changed at all. Which picture best represents the weakness that should be investigated?",
  [
    [
      D.flow(["!No|baseline", "!No|owner", "!No measurement|date", "!Savings claimed,|budget unchanged"]),
      "No baseline, owner or measurement date, so claimed savings never reach the budget"
    ],
    [
      D.flow(["Baseline|recorded", "Owner|named", "Date|agreed", "+Savings|banked"]),
      "A baseline, owner and measurement date allow the savings to be confirmed"
    ],
    [
      D.flow(["Guest|arrives", "!Duplicate|entry", "!Repeated|checks", "Key|issued"]),
      "Duplicate activities are automated without redesign"
    ],
    [
      D.flow(["New|workflow", "!Late|preparation", "!Workarounds|appear", "!Low|adoption"]),
      "Late change management leads to workarounds after launch"
    ]
  ],
  "Benefits evaporate when savings are claimed but the budget stays unchanged. The root cause is having no baseline, no owner and no measurement date, which the correct diagram shows, while the other diagrams show an automated mess, rejection at go-live, or a sound benefits process."
);

OR(
  "w3-o2c-10", "W3O2c", 2,
  "A hospital discovers that clinicians are bypassing its new discharge workflow. Put these diagnostic actions in a sensible order.",
  [
    "Observe how clinicians currently complete discharge activities",
    "Ask clinicians why they bypass the new workflow",
    "Determine whether the concerns reveal genuine process-design or capability problems",
    "Revise the workflow or supporting arrangements using the evidence",
    "Test whether clinicians can now use the improved process effectively"
  ],
  "A responsible diagnosis begins by understanding actual behaviour and investigating the reasons behind it. Changes should address the identified causes, and practical testing should establish whether the revised process supports effective adoption."
);

MA(
  "w3-o2c-11", "W3O2c", 3,
  "Match each BPM failure pattern to what it looks like in practice.",
  [
    ["Shelfware", "A model nobody opens, because no owner ever needed it"],
    ["Automated mess", "A faster bad process, because Understand and Innovate were skipped"],
    ["Pilot that never scales", "One good process, then nothing, because there is no architecture or governance"],
    ["Benefits evaporate", "Savings claimed but budget unchanged, because there is no baseline, owner or measurement date"],
    ["Rejection at go-live", "Workarounds within weeks, because change management started too late"]
  ],
  "Each failure pattern has a visible sign and a deeper root cause. Recognising the sign helps managers trace it back to the missing success factor in leadership, people or method rather than blaming the technology."
);
// ---------------- W3O3a · When a beautiful demonstration becomes the design ----------------
// Outcome: W3O3 · Primary CLO: S2 · Supporting CLO: K2
// Slides: 7–8, 16–17, 19
// Distribution: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 1 match.

M(
  "w3-o3a-01", "W3O3a", 1,
  "A hotel has not agreed how its future check-in process should work. What should it establish before choosing a BPM suite?",
  [
    "An agreed future-state process describing how guests should be served",
    "A preferred vendor based on the most attractive demonstration",
    "A commitment to reproduce every existing approval procedure",
    "A final software contract before discussing operational requirements"
  ],
  "A future-state process describes the improved way the organisation intends to perform its work. Establishing that design before selection allows the hotel to evaluate software against its needs rather than adopt the vendor's assumptions."
);

M(
  "w3-o3a-02", "W3O3a", 2,
  "A vendor claims its software perfectly reproduces Qasr Marina's existing corporate booking approvals. Why might this apparent strength be a warning?",
  [
    "The existing approvals may contain unnecessary steps that the hotel should remove during redesign",
    "Matching existing procedures always makes software technically unreliable",
    "A close match proves that employees will reject the new system",
    "The hotel must replace every existing approval regardless of its purpose"
  ],
  "Current-process fit is not necessarily desirable when the existing process contains unnecessary activities or delays. Reproducing those activities in software may preserve the problems that motivated the improvement programme."
);

M(
  "w3-o3a-03", "W3O3a", 3,
  "Qasr's IT director favours the suite with the strongest integration layer, the operations director favours the suite whose demo showed the mobile check-in guests seem to want, and the finance director asks which suite Qasr can still change cheaply in four years. Nobody has written down the to-be process. How should the programme director proceed?",
  [
    "Outline the to-be process first, then judge every suite and every director's concern against it",
    "Let the IT director decide because the investment is a software purchase",
    "Choose the suite from the most impressive demonstration because guests will see it",
    "Average the three directors' preferences without examining their evidence"
  ],
  "Each director raises a legitimate concern, but without a written to-be process the demonstration is doing the design. Outlining the future process first gives the committee a common basis for judging integration, guest experience and the cost of future change."
);

TF(
  "w3-o3a-04", "W3O3a", 1,
  "A vendor demonstration should determine the organisation's future process whenever the demonstrated software appears efficient.",
  false,
  "A demonstration reflects the vendor's assumptions and the scenarios chosen for presentation. The organisation must define its intended process independently and use demonstrations to test whether the software supports that design."
);

TF(
  "w3-o3a-05", "W3O3a", 2,
  "Testing a BPM suite with realistic operational exceptions can reveal limitations that a flawless standard demonstration conceals.",
  true,
  "Standard demonstrations often use uncomplicated cases in which every activity proceeds as expected. Testing realistic exceptions helps managers evaluate whether the software can support the difficult situations encountered during everyday operations."
);

DR(
  "w3-o3a-06", "W3O3a", 1,
  "A future-state process describes how work {1} operate after improvement, while vendor demonstrations should {2} the proposed software against that design.",
  [
    ["should", "currently must", "previously happened to"],
    ["test", "replace", "determine"]
  ],
  "The future-state process expresses the organisation's intended way of working after redesign. Vendor demonstrations should provide evidence about whether the software can support that design rather than determine it."
);

DR(
  "w3-o3a-07", "W3O3a", 2,
  "A system that perfectly matches today's procedures may preserve existing {1}, so Qasr should evaluate its fit with the {2} process.",
  [
    ["inefficiencies", "benefits automatically", "software licences"],
    ["redesigned", "unchanged", "vendor-defined"]
  ],
  "Current procedures may include unnecessary checks, duplication, or delays that should be removed. Evaluating the redesigned process helps Qasr avoid embedding those weaknesses in its selected technology."
);

V(
  "w3-o3a-08", "W3O3a", 2,
  "Which diagram shows a process-led approach to evaluating a vendor demonstration?",
  [
    [
      D.flow([
        "Understand|problems",
        "Design|future process",
        "Define|requirements",
        "+Test|vendor"
      ]),
      "Understand current problems, design the future process, define requirements, and test the vendor"
    ],
    [
      D.flow([
        "Vendor|demonstrates",
        "Managers|approve",
        "Process|copied",
        "Staff|trained"
      ]),
      "Accept the demonstrated process and train employees to follow it"
    ],
    [
      D.flow([
        "Features|counted",
        "Vendor|ranked",
        "Contract|signed",
        "Process|discovered"
      ]),
      "Rank vendors by features and investigate the process after signing"
    ],
    [
      D.flow([
        "Current|procedures",
        "Exact|software fit",
        "Existing|steps retained",
        "Project|closed"
      ]),
      "Choose software that reproduces current procedures without challenging unnecessary activities"
    ]
  ],
  "A process-led evaluation begins with understanding problems and designing the intended future way of working. Vendor demonstrations then test defined requirements instead of substituting for management's process-design decisions."
);

V(
  "w3-o3a-09", "W3O3a", 3,
  "Qasr wants to test how a suite handles an early-arriving corporate guest whose room is unavailable. Which diagram represents the strongest demonstration scenario?",
  [
    [
      D.flow([
        "Guest|arrives",
        "!Room|unavailable",
        "Departments|coordinate",
        "+Guest|informed"
      ]),
      "The system coordinates a realistic room exception and supports communication with the guest"
    ],
    [
      D.flow([
        "Guest|arrives",
        "Room|available",
        "Key|issued",
        "+Guest|settled"
      ]),
      "The demonstration assumes the requested room is available"
    ],
    [
      D.flow([
        "Booking|confirmed",
        "Rate|accepted",
        "Room|assigned",
        "+Check-in|complete"
      ]),
      "The demonstration assumes that every booking condition is already satisfied"
    ],
    [
      D.flow([
        "Vendor|presents",
        "Features|displayed",
        "Managers|applaud",
        "Contract|prepared"
      ]),
      "The vendor presents attractive features without testing a difficult guest situation"
    ]
  ],
  "A realistic exception tests whether the suite can coordinate decisions when the normal process cannot proceed. The correct diagram examines an unavailable room and the required response rather than assuming an uncomplicated check-in."
);

OR(
  "w3-o3a-10", "W3O3a", 2,
  "A university wants to select software for postgraduate admissions. Arrange these activities into a defensible selection process.",
  [
    "Investigate why applicants currently experience delays and confusion",
    "Agree on the improved admissions process with the departments involved",
    "Translate the redesigned process into practical software requirements",
    "Ask vendors to demonstrate realistic admissions cases and exceptions",
    "Evaluate the evidence before recommending a supplier"
  ],
  "Understanding and redesigning admissions establishes what the university needs its technology to support. Realistic demonstrations and evidence-based evaluation then allow the university to assess suitability without surrendering process design to the vendor."
);

MA(
  "w3-o3a-11", "W3O3a", 2,
  "Match each Qasr stakeholder or decision concept to its main contribution.",
  [
    ["IT director", "Favours the suite with the strongest integration layer"],
    ["Operations director", "Favours the suite whose demo showed the mobile check-in guests seem to want"],
    ["Finance director", "Asks which suite Qasr can still change cheaply in four years"],
    ["To-be process", "Defines how Qasr intends to serve guests after redesign"],
    ["Realistic vendor test", "Checks whether a suite supports Qasr's own hardest case"]
  ],
  "The three directors each see a different part of the decision, and none of their preferences is wrong on its own. The to-be process gives a common basis for judging them, while a realistic test with Qasr's own hardest case supplies evidence that a polished demonstration cannot."
);


// ---------------- W3O3b · The best fit today may cost the most to change ----------------
// Outcome: W3O3 · Primary CLO: S2 · Supporting CLO: K2
// Slides: 8, 17–19
// Distribution: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 1 match.

M(
  "w3-o3b-01", "W3O3b", 1,
  "What does the cost of change mean when evaluating a BPM suite?",
  [
    "The resources required to modify the system after it begins supporting real operations",
    "Only the amount paid for the original software licence",
    "Only the expense of preparing the vendor's demonstration",
    "The purchase price of replacing employees with automated activities"
  ],
  "Cost of change concerns the effort and expense of adapting a system as business requirements evolve. It can include development, configuration, testing, training, operational disruption, and specialist support."
);

M(
  "w3-o3b-02", "W3O3b", 2,
  "A hotel expects its corporate booking rules to change regularly. Which vendor capability would most directly reduce routine modification effort?",
  [
    "Supported configuration that authorised employees can adjust and test safely",
    "A requirement to rewrite the application whenever a corporate contract changes",
    "A larger collection of unrelated demonstration features",
    "A promise that the hotel will never need to change its booking process"
  ],
  "Supported configuration can allow organisations to adjust defined settings without rewriting the underlying application. This may reduce change effort when the product's configurable capabilities genuinely support the hotel's requirements."
);

M(
  "w3-o3b-03", "W3O3b", 3,
  "In Exhibit 3, Vendor B has the highest feature count and a close fit to Qasr's current process, but a high cost to change, custom code for the rate rules, and vendor-only training. Vendors A and C fit partially, with a low cost to change, no custom code, and in-house training. Qasr is redesigning check-in. What is the strongest conclusion?",
  [
    "Vendor B wins on features and fit but loses on cost to change, which matters more because Qasr's process is about to change",
    "Vendor B should win because it has the most features and fits the current process best",
    "Vendors A and C should be rejected because they fit the current process only partially",
    "The vendors are equivalent because each one can run today's booking process"
  ],
  "Vendor B wins on features and fit, and loses on cost to change, because custom code and vendor-only training make every later change slow and expensive. Since Qasr is redesigning its process, a close fit to the old process is worth less than the freedom to change cheaply after go-live."
);

TF(
  "w3-o3b-04", "W3O3b", 1,
  "The vendor offering the greatest number of features necessarily provides the best long-run BPM value.",
  false,
  "Features create value only when they support important organisational requirements and can be used effectively. A feature-rich product may still be difficult to integrate, maintain, adopt, or modify as the process changes."
);

TF(
  "w3-o3b-05", "W3O3b", 2,
  "Custom code may satisfy an immediate business requirement while increasing future maintenance and upgrade risks.",
  true,
  "Custom code extends or changes standard software behaviour to address specific requirements. Such modifications may require additional testing, specialist support, or rework when the underlying product is upgraded."
);

DR(
  "w3-o3b-06", "W3O3b", 1,
  "Changing supported product settings without rewriting the underlying application is called {1}, while specially written software is called {2}.",
  [
    ["configuration", "integration", "monitoring"],
    ["custom code", "a baseline", "a process owner"]
  ],
  "Configuration adjusts supported product settings to accommodate operational requirements. Custom code involves specially written software and may introduce additional maintenance or upgrade responsibilities."
);

DR(
  "w3-o3b-07", "W3O3b", 2,
  "A tool that fits 80% and is {1} beats one that fits 100% and is {2}.",
  [
    ["adopted", "customised", "demonstrated"],
    ["resisted", "configured", "integrated"]
  ],
  "A perfectly fitting tool creates no value if people work around it, while a good-enough tool that people actually use delivers the improvement. This is why adoption, not completeness of fit, should carry the most weight in selection."
);

V(
  "w3-o3b-08", "W3O3b", 2,
  "Which diagram best represents a realistic financial evaluation of a BPM suite?",
  [
    [
      D.flow([
        "Acquire",
        "Integrate",
        "Operate",
        "Change"
      ]),
      "Consider acquisition, integration, operation, and future change costs"
    ],
    [
      D.flow([
        "Licence|price",
        "Vendor|discount",
        "Contract|signed"
      ]),
      "Consider only the initial licence price and discount"
    ],
    [
      D.flow([
        "Feature|count",
        "Demo|score",
        "Vendor|selected"
      ]),
      "Select the vendor using feature count and demonstration score alone"
    ],
    [
      D.flow([
        "Purchase|software",
        "Install|software",
        "Ignore|future costs"
      ]),
      "Complete the purchase without examining future expenditure"
    ]
  ],
  "A realistic financial evaluation considers the costs of acquiring, integrating, operating, and changing the system. The correct diagram reflects total ownership costs rather than limiting the decision to the initial purchase."
);

V(
  "w3-o3b-09", "W3O3b", 3,
  "A business introduces a new approval rule after its BPM suite goes live. Which diagram shows the most adaptable response?",
  [
    [
      D.flow([
        "New|requirement",
        "Supported|configuration",
        "Change|tested",
        "+Rule|activated"
      ]),
      "The organisation uses supported configuration and tests the change before activation"
    ],
    [
      D.flow([
        "New|requirement",
        "!Custom|rewrite",
        "!Upgrade|conflict",
        "Delay"
      ]),
      "A routine rule change requires extensive programming and creates an upgrade conflict"
    ],
    [
      D.flow([
        "New|requirement",
        "Manual|workaround",
        "Duplicate|records",
        "Rule|unchanged"
      ]),
      "Employees work around the system because the rule cannot be changed easily"
    ],
    [
      D.flow([
        "New|requirement",
        "Vendor|contacted",
        "!Change|untested",
        "Rule|activated"
      ]),
      "The organisation activates a vendor modification without testing its consequences"
    ]
  ],
  "Supported configuration can reduce the effort required to accommodate routine business changes when the product provides appropriate capabilities. Testing remains necessary because flexibility should not introduce uncontrolled operational risks."
);

OR(
  "w3-o3b-10", "W3O3b", 2,
  "A retailer wants to compare the long-run flexibility of two BPM suites. Arrange these evaluation activities logically.",
  [
    "Identify a realistic future change to the retailer's order process",
    "Ask both vendors to demonstrate how their systems would support the change",
    "Record the configuration, programming, integration, and testing effort required",
    "Estimate the financial and operational consequences of each approach",
    "Compare the evidence alongside current process suitability before deciding"
  ],
  "A realistic change scenario provides a common basis for testing vendor flexibility. Comparing the required effort, costs, risks, and current suitability supports a more defensible decision than relying on general claims."
);

MA(
  "w3-o3b-11", "W3O3b", 2,
  "Match each BPM suite selection concept to the concern it addresses.",
  [
    [
      "Configuration",
      "Adjusting supported product settings to accommodate requirements"
    ],
    [
      "Custom code",
      "Specially written software that may create maintenance dependencies"
    ],
    [
      "Integration",
      "Connecting the suite with information held in other applications"
    ],
    [
      "Cost to change",
      "The effort and expense of changing the process after go-live"
    ],
    [
      "Internal capability",
      "Enabling employees to operate and adapt the system without unnecessary external dependence"
    ]
  ],
  "These concepts address different dimensions of long-run technology suitability. A defensible evaluation considers how the system connects, changes, costs, and can be managed by the organisation after implementation."
);


// ---------------- W3O3c · What must happen before Qasr signs? ----------------
// Outcome: W3O3 · Primary CLO: S2 · Supporting CLO: K2
// Slides: 7–8, 15, 17–19
// Distribution: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 1 match.

M(
  "w3-o3c-01", "W3O3c", 1,
  "Qasr's steering committee is ready to sign a BPM suite contract, but no future check-in process has been approved. What is the most responsible next step?",
  [
    "Agree on the redesigned check-in process and use it to establish selection requirements",
    "Sign immediately because the vendor demonstrations have already been completed",
    "Choose the vendor with the highest feature count and redesign the process afterward",
    "Ask the supplier to determine the hotel's operational responsibilities without management involvement"
  ],
  "The future process establishes what Qasr expects its technology to support. Signing before agreeing on that design risks allowing software assumptions to determine important operational decisions."
);

M(
  "w3-o3c-02", "W3O3c", 2,
  "A supplier claims its suite can connect Qasr's booking, corporate rate, and room-readiness systems. What evidence should the committee request?",
  [
    "A realistic integration demonstration with clear responsibilities, costs, and maintenance arrangements",
    "A written promise that integration is always simple for every hotel",
    "A demonstration using unrelated sample data without showing any system connections",
    "A comparison of the colours and layouts available on the vendor's dashboard"
  ],
  "Integration claims should be tested against the information connections required by Qasr's redesigned process. The committee also needs evidence about implementation responsibilities, ongoing maintenance, and likely costs."
);

M(
  "w3-o3c-03", "W3O3c", 3,
  "Qasr has a credible future process and a technically suitable vendor, but employees have not been trained and no process owner has been appointed. What should the steering committee conclude?",
  [
    "The technology may be suitable, but organisational readiness and accountability remain unresolved",
    "The investment is guaranteed to succeed because the vendor meets the technical requirements",
    "The hotel should remove employee involvement from the implementation plan",
    "The process owner can be appointed only after performance has already deteriorated"
  ],
  "Technical suitability is necessary but does not establish organisational readiness for implementation. Qasr needs capable employees, accountable process ownership, and continuing leadership to translate the investment into sustained improvement."
);

TF(
  "w3-o3c-04", "W3O3c", 1,
  "Once a BPM vendor has achieved the highest demonstration score, further investigation of process requirements is unnecessary.",
  false,
  "A demonstration score reflects the criteria and evidence included in the evaluation. Missing process requirements, integration needs, or future change costs can make the apparent ranking misleading."
);

TF(
  "w3-o3c-05", "W3O3c", 2,
  "A steering committee can make a more defensible selection by testing realistic process exceptions and future changes before signing.",
  true,
  "Realistic exceptions reveal whether the system can support difficult operational situations rather than only ideal cases. Future change tests provide evidence about flexibility, modification effort, and long-run suitability."
);

DR(
  "w3-o3c-06", "W3O3c", 1,
  "Before signing, Qasr should establish an agreed {1} process and test whether the vendor can support realistic operational {2}.",
  [
    ["future-state", "vendor-owned", "unchanged historical"],
    ["exceptions", "advertisements", "licence descriptions"]
  ],
  "The future-state process describes the intended way of serving guests after redesign. Testing realistic exceptions establishes whether the software can support operational situations that may be absent from polished demonstrations."
);

DR(
  "w3-o3c-07", "W3O3c", 2,
  "A responsible BPM investment needs a process {1} who remains accountable after go-live and a reliable {2} for measuring the promised improvement.",
  [
    ["owner", "advertiser", "demonstrator"],
    ["baseline", "feature count", "licence discount"]
  ],
  "Process ownership provides continuing accountability for the complete operational outcome. A reliable baseline makes it possible to evaluate whether the redesigned process achieves the promised improvement."
);

V(
  "w3-o3c-08", "W3O3c", 2,
  "Which diagram shows the strongest evidence-based preparation for Qasr's BPM investment decision?",
  [
    [
      D.flow([
        "Agreed|process",
        "Realistic|testing",
        "Clear|ownership",
        "+Ready|organisation"
      ]),
      "Qasr agrees on the process, tests the technology, establishes ownership, and prepares the organisation"
    ],
    [
      D.flow([
        "Impressive|demo",
        "High|score",
        "Contract|signed",
        "Staff|informed"
      ]),
      "Qasr signs after an impressive demonstration and informs employees afterward"
    ],
    [
      D.flow([
        "Lowest|price",
        "Vendor|chosen",
        "Process|copied",
        "Project|closed"
      ]),
      "Qasr chooses the lowest price and copies the vendor's process"
    ],
    [
      D.flow([
        "Features|counted",
        "Software|installed",
        "!No process|owner",
        "Benefits|assumed"
      ]),
      "Qasr installs feature-rich software without establishing ownership or measuring benefits"
    ]
  ],
  "A responsible investment decision connects the agreed process with realistic technical testing and organisational readiness. The correct diagram includes process design, evidence about suitability, accountability, and preparation for adoption."
);

V(
  "w3-o3c-09", "W3O3c", 3,
  "Qasr wants to ensure that a corporate booking exception can be resolved without repeated manual calls. Which diagram provides the most useful test of the proposed suite?",
  [
    [
      D.lanes(
        ["Reception", "Revenue", "Housekeeping"],
        [
          [0, "Exception raised"],
          [1, "Rate reviewed"],
          [2, "Room confirmed"],
          [0, "Guest informed"]
        ]
      ),
      "The exception is coordinated across departments until reception can inform the guest"
    ],
    [
      D.flow([
        "Guest|arrives",
        "Booking|valid",
        "Room|ready",
        "+Key|issued"
      ]),
      "The system demonstrates an uncomplicated check-in without an exception"
    ],
    [
      D.flow([
        "Corporate|booking",
        "!Repeated|calls",
        "!Manual|checks",
        "Guest|waits"
      ]),
      "Employees continue using repeated calls and manual checks to resolve the exception"
    ],
    [
      D.flow([
        "Vendor|presents",
        "Screens|displayed",
        "Features|counted",
        "Demo|completed"
      ]),
      "The vendor displays software features without showing how the exception is resolved"
    ]
  ],
  "The useful test follows a realistic corporate booking exception through the departments responsible for resolving it. The correct swimlane shows coordinated operational work rather than an ideal case or a demonstration of unrelated features."
);

OR(
  "w3-o3c-10", "W3O3c", 2,
  "Qasr's programme director is preparing the final recommendation. Arrange these activities into a defensible decision sequence.",
  [
    "Confirm the redesigned guest arrival process and intended performance outcomes",
    "Translate the process into operational and integration requirements",
    "Test shortlisted vendors using realistic exceptions and future changes",
    "Evaluate costs, risks, process ownership, and organisational readiness",
    "Present an evidence-based recommendation to the steering committee"
  ],
  "A sound recommendation begins with the intended process and the outcomes Qasr needs to achieve. Vendor testing and evaluation of organisational conditions then provide evidence for a responsible selection decision."
);

MA(
  "w3-o3c-11", "W3O3c", 3,
  "Match each pre-contract question to the evidence Qasr should obtain.",
  [
    [
      "Will the suite support our redesigned check-in?",
      "A demonstration based on agreed future-state requirements"
    ],
    [
      "Can it connect our existing hotel systems?",
      "Tested integration arrangements and clear technical responsibilities"
    ],
    [
      "What happens when corporate booking rules change?",
      "Evidence about configuration effort, testing, and future modification costs"
    ],
    [
      "Who remains responsible for guest waiting time?",
      "An empowered process owner and an agreed performance measure"
    ],
    [
      "Can employees operate the new process?",
      "Evidence of practical training, involvement, and operational readiness"
    ]
  ],
  "Each question addresses a different risk that could undermine the investment after signing. Together, the evidence connects process suitability, integration, flexibility, accountability, and adoption to the intended guest outcome."
);


// ---------------- W3O2d · The suite nobody opened, and the lesson it leaves ----------------
// Outcome: W3O2 · Primary CLO: K2 · Supporting CLO: S2
// Slides: 4–6, 10–15, 20–21
// Distribution: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 1 match.

M(
  "w3-o2d-01", "W3O2d", 1,
  "Noor Health's analysts developed discharge models from a policy manual without consulting clinicians. Which implementation condition most clearly requires investigation?",
  [
    "Whether practical clinical knowledge was adequately incorporated into process design",
    "Whether the models were drawn in the vendor's preferred notation",
    "Whether ninety-one models were enough to cover all five hospitals",
    "Whether the 2019 policy manual had been formally approved by management"
  ],
  "Clinicians understand practical discharge activities and exceptions that may not appear in written procedures. Their exclusion creates a risk that the models do not reflect how the process operates in practice, whereas notation, model count or approval of the manual do not address that gap."
);

M(
  "w3-o2d-02", "W3O2d", 2,
  "Noor Health purchased a BPM suite with a rules engine that was never used. What is the strongest supported interpretation?",
  [
    "The purchased rules capability was not incorporated into operational use",
    "The rules engine necessarily caused the entire discharge-time shortfall",
    "The hospital had no clinical decision rules before purchasing the suite",
    "The software supplier deliberately prevented clinicians from using the rules engine"
  ],
  "The case establishes that the rules engine was purchased but remained unused. This supports concern about operational utilisation, but it does not establish why the capability was unused or how much it contributed to the performance shortfall."
);

M(
  "w3-o2d-03", "W3O2d", 3,
  "Noor's discharge time fell from 4.1 to 3.9 hours against a promised thirty-percent reduction. Which forum argument uses the evidence most responsibly?",
  [
    "The target was missed substantially, so the organisation should investigate process design, adoption, integration, and governance before assigning causes",
    "The unused rules engine explains exactly thirty percent of the hospital's remaining discharge time",
    "The improvement proves the suite succeeded because discharge time decreased by any amount",
    "The missing clinician involvement proves that every other implementation factor was satisfactory"
  ],
  "The observed improvement was approximately 4.9 percent, substantially below the promised thirty percent. The case identifies important implementation concerns, but further evidence is needed to determine their relative contribution to the disappointing result."
);

TF(
  "w3-o2d-04", "W3O2d", 1,
  "The existence of 91 process models proves that Noor Health's clinicians adopted the redesigned discharge process.",
  false,
  "Process models document how work is represented, but their existence does not establish operational adoption. Noor's models were developed without clinician involvement, making actual use and practical suitability important questions for investigation."
);

TF(
  "w3-o2d-05", "W3O2d", 2,
  "A defensible recommendation about Noor Health should distinguish established case facts from possible explanations that require further evidence.",
  true,
  "The case provides facts about the investment, modelling approach, unused capabilities, integration gap, and discharge-time result. Responsible analysis uses those facts to identify plausible concerns without presenting unverified causes as established conclusions."
);

DR(
  "w3-o2d-06", "W3O2d", 1,
  "Noor Health's discharge time improved from 4.1 to 3.9 hours, an observed reduction of approximately {1}, compared with a promised reduction of {2}.",
  [
    ["4.9%", "30%", "20%"],
    ["30%", "4.9%", "50%"]
  ],
  "The observed reduction was 0.2 hours, which is approximately 4.9 percent of the original 4.1 hours. The promised thirty-percent reduction would have required a much lower average discharge time of approximately 2.87 hours."
);

DR(
  "w3-o2d-07", "W3O2d", 2,
  "Noor's disconnected dashboard raises concerns about process {1}, while excluding clinicians raises concerns about practical process {2}.",
  [
    ["monitoring", "modelling", "integration testing"],
    ["understanding", "automation", "licensing"]
  ],
  "A dashboard disconnected from the hospital information system cannot monitor actual discharge performance. Excluding clinicians risks overlooking the practical activities and exceptions that shape the discharge process, which is a gap in understanding rather than in automation."
);

V(
  "w3-o2d-08", "W3O2d", 2,
  "Which diagram most accurately represents the implementation concerns established by the Noor Health case?",
  [
    [
      D.flow(["Policy-based|models", "!Clinicians|excluded", "!Capabilities|unused", "!Target|missed"]),
      "Policy-based models without clinicians, unused capabilities, and a missed target"
    ],
    [
      D.flow(["Clinicians|involved", "Policy-based|models", "!Dashboard|disconnected", "!Target|missed"]),
      "Clinicians were involved, but the dashboard was disconnected and the target was missed"
    ],
    [
      D.flow(["Policy-based|models", "!Clinicians|excluded", "Rules engine|used", "+Target|achieved"]),
      "Clinicians were excluded, but the rules engine was used and the target was achieved"
    ],
    [
      D.flow(["Policy-based|models", "Dashboard|connected", "!Rules engine|unused", "!Target|missed"]),
      "The dashboard was connected, but the rules engine was unused and the target was missed"
    ]
  ],
  "The case establishes that analysts built policy-based models without clinicians, that the rules engine was unused and the dashboard disconnected, and that discharge time fell only from 4.1 to 3.9 hours against a promised 30 percent. Each other diagram contradicts at least one of these facts."
);

V(
  "w3-o2d-09", "W3O2d", 3,
  "A consultant is asked to diagnose Noor Health without inventing missing facts. Which diagram represents the most responsible analytical approach?",
  [
    [
      D.flow([
        "Case|evidence",
        "Possible|causes",
        "Further|investigation",
        "+Reasoned|recommendation"
      ]),
      "Identify established evidence, consider possible causes, investigate them, and develop a supported recommendation"
    ],
    [
      D.flow([
        "Poor|result",
        "One|cause assumed",
        "Vendor|blamed",
        "New|suite purchased"
      ]),
      "Assume one cause from the poor result and immediately recommend replacing the vendor"
    ],
    [
      D.flow([
        "Models|produced",
        "Success|assumed",
        "Problems|ignored",
        "Project|closed"
      ]),
      "Treat the number of process models as proof of successful implementation"
    ],
    [
      D.flow([
        "Unused|rules",
        "All delays|attributed",
        "Cause|declared",
        "Analysis|ended"
      ]),
      "Attribute the entire discharge-time shortfall to the unused rules engine without further evidence"
    ]
  ],
  "Responsible diagnosis distinguishes what the case establishes from explanations that remain uncertain. The correct approach investigates plausible causes before developing a recommendation supported by evidence."
);

OR(
  "w3-o2d-10", "W3O2d", 2,
  "A healthcare manager wants to learn from Noor Health before recommending another BPM investment. Arrange these analytical activities logically.",
  [
    "Identify the established facts about the investment and observed discharge performance",
    "Compare the promised improvement with the measured result",
    "Examine possible weaknesses in process design, adoption, integration, and governance",
    "Identify which explanations require additional operational evidence",
    "Develop a recommendation that connects a selection criterion to the documented risks"
  ],
  "A sound evaluation begins with established evidence and a clear comparison between promised and observed outcomes. Investigating plausible causes before recommending a selection criterion prevents unsupported conclusions and improves the quality of the decision."
);

MA(
  "w3-o2d-11", "W3O2d", 3,
  "Match each Noor Health case observation to the most appropriate BPM concern.",
  [
    [
      "Clinicians excluded from modelling",
      "Risk that practical clinical knowledge was missing from process design"
    ],
    [
      "Rules engine never used",
      "Purchased decision capability not incorporated into operational practice"
    ],
    [
      "Dashboard not integrated",
      "Possible lack of reliable information for monitoring the discharge process"
    ],
    [
      "Discharge time reached 3.9 hours",
      "Observed improvement substantially below the promised target"
    ],
    [
      "AED 6.2 million suite licence",
      "A substantial technology investment requiring evidence of realised benefits"
    ]
  ],
  "Each observation raises a distinct question about process understanding, operational utilisation, integration, benefits, or investment value. Matching the evidence to the appropriate concern supports careful diagnosis without assuming that any single weakness explains the entire outcome."
);


  // ---------- normalise to the documented schema ----------
  const A = window.ADAPTIVE;

  B.forEach((x) => {
    x.lo = A.sections[x.sec].lo;
    x.clo = A.outcomes[x.lo].clo;
    x.outcome = A.outcomes[x.lo].full;
    x.rem = `review:${x.sec}`;

    if (x.type === "mcq" || x.type === "visual") x.ans = 0;
    if (x.type === "tf") x.o = ["True", "False"];
    if (x.type === "drop") {
      x.o = x.blanks;
      x.ans = x.blanks.map((b) => b[0]);
    }
    if (x.type === "order") {
      x.o = x.items;
      x.ans = x.items.slice();
    }
    if (x.type === "match") {
      x.o = x.pairs;
      x.ans = x.pairs.map((p) => p[1]);
    }
  });

  A.bank = B;
})();