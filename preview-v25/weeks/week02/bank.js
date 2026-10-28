// OPER621 Week 2 question bank.
// File: week02-bank.js
//
// Sources:
// week02-session1-slides.pptx
// week02-delivery-plan.docx
// week02-course.js
// week02-adaptive-week.js
// week1-bank.js.txt
//
// STRUCTURAL CONTRACT
//
// Uses exactly the Week 1 question helpers:
// M, TF, DR, V, OR, MA.
//
// Supported question types:
// mcq, tf, drop, visual, order, match.
//
// Every question has one defensible correct response.
// MCQ and visual questions place the correct option first.
// Drop questions place the correct choice first in each blank.
// Order questions supply items in their correct sequence.
// Match questions supply the correct label-response pairs.
//
// The player handles shuffling and answer checking.
// Each question has a two- or three-sentence explanation.
// Difficulty values range from 1 to 3.
//
// TARGET DISTRIBUTION PER LESSON
//
// 33 questions across three sections.
// mcq:     9
// tf:      5
// drop:    5
// visual:  4
// order:   5
// match:   5
//
// No question type exceeds 30 percent of the lesson bank.
//
// WEEK 2 SECTION IDS
//
// W2O1a, W2O1b, W2O1c
// W2O2a, W2O2b, W2O2c
// W2O3a, W2O3b, W2O3c
// W2O4a, W2O4b, W2O4c
//
// All question IDs are prefixed W2 to avoid Week 1 collisions.
//
// IMPORTANT TERMINOLOGY
//
// A BPM programme trigger is the event that causes management
// to initiate a programme.
//
// It is distinct from the operational trigger that starts an
// individual business process.
//
// Normalisation follows Week 1:
// id, clo, lo, sec, diff, type, q, o, ans, why, rem.
//
// ================================================================

(() => {

  const D = window.DIAG, B = [];

  const add = (type, id, sec, diff, q, body, why) =>
    B.push(Object.assign(
      { id, sec, diff, type, q, why },
      body
    ));

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


  // ================================================================
  // LESSON W2L1
  // Why organisations finally act
  //
  // Sections:
  // W2O1a · Pressure builds before a programme begins
  // W2O1b · The event that changes everything
  // W2O1c · Reading the real brief behind a trigger
  //
  // Distribution:
  // mcq 9, tf 5, drop 5, visual 4, order 5, match 5.
  // ================================================================


  // ================================================================
  // W2O1a
  // Pressure builds before a programme begins
  //
  // 11 questions:
  // 3 mcq, 2 tf, 2 drop, 1 visual, 1 order, 2 match.
  // ================================================================

  M(
    "W2O1a-01", "W2O1a", 1,
    "Which statement best defines a driver of a BPM initiative?",
    [
      "An ongoing condition that creates pressure for organisational change",
      "A specific event that immediately causes management to approve funding",
      "The employee responsible for implementing a process improvement",
      "The final outcome delivered by a completed improvement programme"
    ],
    "A driver is a condition that makes organisational change increasingly desirable. The main trap is confusing continuing pressure with the specific event that triggers a funding decision."
  );

  M(
    "W2O1a-02", "W2O1a", 2,
    "Qasr's guest satisfaction has been declining, but management has not approved a major programme. What is the most defensible conclusion?",
    [
      "A driver exists, but management has not yet committed to a coordinated programme",
      "The decline cannot be a driver because no programme has started",
      "The organisation must already have a funded programme because the problem is serious",
      "The decline proves that the tourism authority has introduced a new requirement"
    ],
    "Declining satisfaction creates pressure for improvement even without an investment decision. A driver does not need to produce immediate action to qualify as a driver."
  );

  M(
  "W2O1a-03", "W2O1a", 3,
  "A company's managers recognise rising costs and worsening service, yet continue postponing process redesign. Which explanation is most defensible?",
  [
    "Managers may accept the need for change but disagree about solutions or favour other investments",
    "Recognised process problems automatically create an approved BPM programme once managers discuss them",
    "The absence of investment shows that the reported problems are less serious than they first appear",
    "BPM programmes can begin only when a regulator introduces a new obligation with a fixed deadline"
  ],
  "Management can recognise serious problems without agreeing on a solution or ranking them above other investments. The mistaken assumption is that awareness of a problem automatically produces organisational action."
);

  TF(
    "W2O1a-04", "W2O1a", 1,
    "A driver can continue creating pressure for several years without producing a funded BPM programme.",
    true,
    "True. Drivers can persist while managers postpone decisions or pursue other priorities. The duration of a problem does not establish that management has approved investment."
  );

  TF(
    "W2O1a-05", "W2O1a", 2,
    "External drivers always originate within the organisation, while internal drivers come from competitors and market conditions.",
    false,
    "False. External drivers arise outside the organisation, while internal drivers develop within it. The statement reverses the distinction between the two sources of pressure."
  );

  DR(
    "W2O1a-06", "W2O1a", 1,
    "A continuing condition that creates pressure for change is a {1}, while an approved investment represents an organisational {2}.",
    [
      ["driver", "trigger", "programme outcome"],
      ["commitment", "external pressure", "operational task"]
    ],
    "A driver creates pressure, while an approved investment demonstrates organisational commitment. The trap is treating the existence of pressure as equivalent to the decision to act."
  );

  DR(
  "W2O1a-07", "W2O1a", 2,
  "A competitor introducing mobile check-in creates {1} pressure on Qasr, while its rising operating costs create {2} pressure.",
  [
    ["external", "internal", "regulatory"],
    ["internal", "external", "regulatory"]
  ],
  "Competitor activity originates outside Qasr, so it is an external driver. Rising costs within Qasr's own operations are an internal driver, and neither development is a regulatory requirement."
);

  V(
    "W2O1a-08", "W2O1a", 2,
    "Which diagram best represents several BPM drivers accumulating without an approved programme?",
    [
      [
        D.flow([
          "Quality|pressure",
          "Competition",
          "Rising|costs",
          "!Decision|postponed"
        ]),
        "Several pressures accumulate, but management postpones investment"
      ],
      [
        D.flow([
          "Regulatory|announcement",
          "Funding|approved",
          "+Programme|launched"
        ]),
        "A regulatory announcement immediately produces programme funding"
      ],
      [
        D.flow([
          "Programme|approved",
          "Process|redesigned",
          "+Benefits|verified"
        ]),
        "An approved programme delivers verified benefits"
      ],
      [
        D.flow([
          "New|system",
          "Staff|trained",
          "+Implementation|complete"
        ]),
        "A technology implementation reaches completion"
      ]
    ],
    "The correct diagram shows business pressures accumulating while investment remains postponed. The other diagrams describe programme initiation or delivery rather than drivers existing without commitment."
  );

  OR(
    "W2O1a-09", "W2O1a", 2,
    "Arrange this illustrative management response from the emergence of a problem to continued postponement.",
    [
      "Customer satisfaction begins declining",
      "Managers recognise the worsening performance",
      "Departments propose different explanations",
      "Management debates competing improvement proposals",
      "The organisation postpones major investment"
    ],
    "The sequence illustrates how a driver can become visible without producing a funded programme. Recognising and discussing a problem does not necessarily establish agreement about action."
  );

  MA(
    "W2O1a-10", "W2O1a", 2,
    "Match each source of BPM pressure to its classification.",
    [
      ["Competitor introduces mobile check-in", "External competitive driver"],
      ["Operating costs increase", "Internal financial driver"],
      ["Guest satisfaction deteriorates", "Internal service-quality driver"],
      ["Customer expectations change", "External market driver"]
    ],
    "Competitors and market expectations create pressure from outside the organisation. Operating costs and declining service performance describe pressures within its operations."
  );

  MA(
  "W2O1a-11", "W2O1a", 3,
  "Match each management observation to the conclusion it supports.",
  [
    ["Managers repeatedly discuss declining satisfaction", "Management recognises an ongoing driver"],
    ["Departments disagree about the main cause", "No agreed problem yet exists to fund"],
    ["Other investments receive priority", "Competing priorities can postpone commitment"],
    ["A programme receives an approved budget", "Management has made an investment commitment"]
  ],
  "Discussion shows that a driver is recognised, while disagreement about causes means there is no agreed problem to fund. Competing priorities can postpone commitment, and only an approved budget shows that management has actually committed."
);


  // ================================================================
  // W2O1b
  // The event that changes everything
  //
  // 11 questions:
  // 3 mcq, 2 tf, 1 drop, 2 visual, 2 order, 1 match.
  // ================================================================

  M(
  "W2O1b-01", "W2O1b", 1,
  "What distinguishes a BPM programme trigger from an ongoing driver?",
  [
    "It is the specific event that makes management act at a particular moment",
    "It is any serious problem that has persisted long enough to worry the board",
    "It is the senior department that sponsors and leads the improvement work",
    "It is the benefit measured once the programme has been fully implemented"
  ],
  "A programme trigger explains why organisational action begins now. A longstanding driver explains the need for improvement, but it does not explain the timing of the decision."
);

  M(
  "W2O1b-02", "W2O1b", 2,
  "What was the decisive trigger for Qasr Hospitality's funded BPM programme?",
  [
    "The tourism authority's new digital guest-record rule",
    "Six consecutive quarters of declining guest satisfaction",
    "A competitor's launch of mobile check-in eighteen months earlier",
    "The nine percent rise in cost per occupied room"
  ],
  "The regulatory announcement created a defined obligation and was followed by a funded programme within five weeks. The other developments were genuine drivers, but none of them had produced the investment on its own."
);

  M(
    "W2O1b-03", "W2O1b", 3,
    "Why does identifying a programme's trigger help managers understand how its success will be judged?",
    [
      "The trigger reveals the immediate obligation or expectation that helped secure funding",
      "The trigger guarantees that every proposed improvement will be completed",
      "The trigger removes the need to establish measurable programme outcomes",
      "The trigger proves that the organisation's earlier drivers were unimportant"
    ],
    "The event that unlocks funding often shapes sponsors' deadlines and expectations. It does not guarantee delivery or eliminate the need to address wider organisational pressures."
  );

  TF(
    "W2O1b-04", "W2O1b", 1,
    "The event that triggers a BPM programme must also be the original cause of the underlying process weakness.",
    false,
    "False. A trigger can change the urgency of responding to weaknesses that already existed. Qasr's fragmented information systems preceded the regulatory announcement."
  );

  TF(
    "W2O1b-05", "W2O1b", 2,
    "A programme funded in response to a regulatory requirement should demonstrate that the relevant compliance outcome has been achieved.",
    true,
    "True. The original funding rationale creates an expectation that the required compliance result will be demonstrated. Wider benefits cannot replace evidence that the mandatory obligation has been satisfied."
  );

  DR(
    "W2O1b-06", "W2O1b", 2,
    "At Qasr, the regulatory announcement was the {1}, while fragmented guest information was an existing operational {2}.",
    [
      ["trigger", "benefit", "process owner"],
      ["weakness", "funding decision", "performance target"]
    ],
    "The announcement triggered organisational action, while fragmented information was an existing operational weakness. The trigger changed the urgency of addressing that weakness rather than creating it."
  );

  V(
    "W2O1b-07", "W2O1b", 2,
    "Which diagram correctly distinguishes longstanding drivers from Qasr's decisive trigger?",
    [
      [
        D.flow([
          "Existing|pressures",
          "Regulatory|announcement",
          "Funding|approved",
          "+Programme|launched"
        ]),
        "Existing pressures precede the regulatory announcement and funding decision"
      ],
      [
        D.flow([
          "Funding|approved",
          "Guest|satisfaction falls",
          "Regulatory|announcement"
        ]),
        "Funding occurs before the pressures and regulatory announcement"
      ],
      [
        D.flow([
          "Regulatory|announcement",
          "Guest|satisfaction falls",
          "Competition|appears"
        ]),
        "All business pressures begin after the regulatory announcement"
      ],
      [
        D.flow([
          "Operating|costs rise",
          "+Compliance|achieved",
          "Funding|approved"
        ]),
        "Compliance is achieved before the programme receives funding"
      ]
    ],
    "Qasr experienced several pressures before the regulatory announcement prompted investment. The incorrect diagrams reverse the chronology or confuse programme initiation with completed outcomes."
  );

  V(
    "W2O1b-08", "W2O1b", 3,
    "Which diagram best represents the obligation that shaped Qasr's original funding rationale?",
    [
      [
        D.flow([
          "Record|requested",
          "Guest|data assembled",
          "Complete|record",
          "+Within|24 hours"
        ]),
        "Produce a complete digital guest record within twenty-four hours of request"
      ],
      [
        D.flow([
          "Guest|arrives",
          "Reception|responds",
          "+Check-in|completed"
        ]),
        "Complete guest check-in without testing digital record production"
      ],
      [
        D.flow([
          "Competitor|innovates",
          "Qasr|copies",
          "+Mobile|check-in"
        ]),
        "Introduce mobile check-in to match a competitor"
      ],
      [
        D.flow([
          "Costs|reviewed",
          "Staffing|reduced",
          "+Savings|reported"
        ]),
        "Reduce operating costs without demonstrating record compliance"
      ]
    ],
    "Qasr's regulatory obligation concerns producing a complete digital guest record within twenty-four hours of request. Check-in, competition, and cost reduction are separate concerns that do not establish compliance."
  );

  OR(
    "W2O1b-09", "W2O1b", 1,
    "Put these Qasr events in the sequence that explains the programme's launch.",
    [
      "Operational pressures accumulate over time",
      "The tourism authority announces the new requirement",
      "Management recognises the gap between the requirement and existing capability",
      "The board approves programme funding",
      "A programme director is appointed"
    ],
    "Existing pressures preceded the regulatory announcement, which created urgency for investment. The subsequent funding and appointment show the organisation moving from concern to commitment."
  );

  OR(
    "W2O1b-10", "W2O1b", 3,
    "A new customer contract condition triggers BPM investment. Arrange the reasoning from event to demonstrable outcome.",
    [
      "The customer announces new contract conditions",
      "Management identifies the operational capability gap",
      "Management approves an improvement programme",
      "The programme changes the relevant process",
      "The organisation verifies performance against the conditions"
    ],
    "The triggering event creates a reason to assess the gap and commit resources. Success requires evidence that the redesigned process meets the conditions rather than merely completing implementation activities."
  );

  MA(
    "W2O1b-11", "W2O1b", 2,
    "Match each possible BPM trigger to the immediate expectation it can create.",
    [
      ["Regulatory announcement", "Demonstrate compliance with the new obligation"],
      ["Merger announcement", "Establish consistent operations across the combined organisation"],
      ["Board cost-reduction target", "Demonstrate defensible financial savings"],
      ["Major complaint incident", "Demonstrate a credible response to the service problem"]
    ],
    "Different triggers create different expectations about programme outcomes. The mistake is assuming that every BPM programme should be judged against the same immediate measure."
  );


  // ================================================================
  // W2O1c
  // Reading the real brief behind a trigger
  //
  // 11 questions:
  // 3 mcq, 1 tf, 2 drop, 1 visual, 2 order, 2 match.
  // ================================================================

  M(
  "W2O1c-01", "W2O1c", 1,
  "A programme is funded because of a regulatory deadline. Which result must its business case protect?",
  [
    "Evidenced compliance with the requirement by the fixed deadline",
    "A stronger public reputation as a modern, well-run organisation",
    "Completion of every proposed customer-experience improvement in scope",
    "Installation of the new software on schedule and within its budget"
  ],
  "A regulatory trigger makes the deadline immovable and requires compliance that can be evidenced. Reputation, optional improvements or on-time software installation cannot substitute for that required outcome."
);

  M(
  "W2O1c-02", "W2O1c", 2,
  "A merger triggers a BPM programme. What risk arises if the organisation merely connects two incompatible procedures?",
  [
    "Inconsistent ways of working survive inside one combined organisation",
    "The merger quietly removes the operational differences on its own over time",
    "Every useful practice from both businesses has to be abandoned",
    "The programme loses its purpose once the merger is formally announced"
  ],
  "A merger trigger calls for one way of working, quickly. Bolting two processes together without resolving their differences leaves the integration problem in place."
);

  M(
    "W2O1c-03", "W2O1c", 3,
    "A software replacement triggers a BPM programme. Which decision best avoids the technology trap?",
    [
      "Understand the required business process before accepting the vendor's proposed workflow",
      "Adopt the vendor's standard workflow without examining customer requirements",
      "Treat successful software installation as proof of improved process performance",
      "Allow technical configuration to determine every departmental responsibility"
    ],
    "The organisation should understand its business requirements before allowing software to shape the workflow. The technology trap occurs when implementation choices replace deliberate process design."
  );

  TF(
    "W2O1c-04", "W2O1c", 2,
    "A programme triggered by customer complaints may produce a visible response without removing the process weaknesses causing those complaints.",
    true,
    "True. A visible response can address immediate dissatisfaction while underlying process problems remain unresolved. Sustainable improvement requires attention to the causes rather than only the symptoms."
  );

  DR(
    "W2O1c-05", "W2O1c", 1,
    "A programme funded to meet a regulation must demonstrate {1}, while a programme funded to reduce costs must demonstrate defensible {2}.",
    [
      ["compliance", "customer popularity", "software installation"],
      ["savings", "complaints", "job titles"]
    ],
    "A regulatory rationale calls for compliance evidence, while a cost rationale calls for defensible financial savings. The trap is substituting an attractive secondary benefit for the outcome that justified funding."
  );

  DR(
    "W2O1c-06", "W2O1c", 3,
    "When software configuration determines the workflow without adequate business analysis, the programme risks letting {1} dictate {2}.",
    [
      ["technology", "customers", "process owners"],
      ["process design", "regulatory deadlines", "programme sponsorship"]
    ],
    "The technology trap occurs when software choices determine the business process instead of supporting deliberate process design. Business requirements should guide configuration rather than being assumed from the vendor's standard workflow."
  );

  V(
    "W2O1c-07", "W2O1c", 3,
    "Which diagram best represents a coherent response to a technology-replacement trigger?",
    [
      [
        D.flow([
          "Replacement|needed",
          "Business|requirements",
          "Process|designed",
          "+System|configured"
        ]),
        "Replacement need leads to business analysis, process design, and supporting configuration"
      ],
      [
        D.flow([
          "Replacement|needed",
          "Vendor|workflow",
          "!Process|dictated"
        ]),
        "The vendor's workflow determines the process without business analysis"
      ],
      [
        D.flow([
          "Software|installed",
          "+Success|declared"
        ]),
        "Successful installation alone is treated as the complete business outcome"
      ],
      [
        D.flow([
          "Vendor|selected",
          "Departments|excluded",
          "!Customer|needs ignored"
        ]),
        "The organisation excludes business users and ignores customer requirements"
      ]
    ],
    "A coherent replacement programme uses business requirements to shape process design and software configuration. The alternatives confuse technical implementation with business success or allow technology to dictate the process."
  );

  OR(
  "W2O1c-08", "W2O1c", 2,
  "Arrange the steps for running a programme triggered by a cost-reduction target so that its savings can be defended.",
  [
    "Identify the board's cost-reduction target",
    "Identify the processes that drive the relevant costs",
    "Record the current cost of those processes as a baseline",
    "Implement the agreed process changes",
    "Track costs against the baseline to verify the saving"
  ],
  "A cost trigger means the benefit case will be audited, so the baseline must be recorded before any change is made. Without that starting point, a saving can be claimed but never tracked, which is the main risk of this trigger."
);

  OR(
    "W2O1c-09", "W2O1c", 3,
    "A complaint incident triggers a service-improvement programme. Put the following actions in a defensible sequence.",
    [
      "Identify the complaint incident that created urgency",
      "Investigate the process conditions behind the complaints",
      "Design changes addressing the identified causes",
      "Implement the agreed process improvements",
      "Measure whether the underlying service problem has improved"
    ],
    "A credible response moves beyond the visible complaint to examine and address its causes. Simply responding publicly without testing the underlying process would risk leaving the original weakness unresolved."
  );

  MA(
  "W2O1c-10", "W2O1c", 2,
  "Match each programme trigger to its characteristic implementation risk.",
  [
    ["Regulatory deadline", "Meeting minimum compliance without broader process improvement"],
    ["Merger", "Bolting two incompatible processes together"],
    ["Cost-reduction target", "Claiming savings that are never tracked"],
    ["Software replacement", "Allowing vendor configuration to dictate the process"]
  ],
  "Each trigger carries its own main risk that programme managers need to recognise early. For a cost target, the typical failure is a saving claimed at launch but never tracked, which is why a baseline matters."
);

  MA(
    "W2O1c-11", "W2O1c", 3,
    "Match each proposed success claim to the evidence needed to make it defensible.",
    [
      ["Regulatory obligation satisfied", "Evidence that the required compliance outcome is achieved"],
      ["Operating costs reduced", "Verified financial results against an agreed baseline"],
      ["Guest experience improved", "Customer-experience results compared with starting performance"],
      ["New process adopted", "Evidence that employees consistently use the redesigned process"]
    ],
    "Different success claims require evidence appropriate to the outcome being asserted. Installing technology or announcing improvement cannot establish compliance, savings, customer benefits, or adoption without relevant verification."
  );

  // ================================================================
  // LESSON W2L2
  // Qasr Hospitality asks why now
  //
  // Sections:
  // W2O2a · Four pressures and one decisive event
  // W2O2b · The danger of two competing rationales
  // W2O2c · Writing a purpose the board can defend
  //
  // Distribution:
  // mcq 9, tf 5, drop 5, visual 4, order 5, match 5.
  // ================================================================


  // ================================================================
  // W2O2a
  // Four pressures and one decisive event
  //
  // 11 questions:
  // 3 mcq, 2 tf, 2 drop, 1 visual, 2 order, 1 match.
  // ================================================================

  M(
    "W2O2a-01", "W2O2a", 1,
    "Which Qasr development occurred two years before the programme's decisive regulatory trigger?",
    [
      "Guest satisfaction began declining",
      "The tourism authority announced its new digital record requirement",
      "The board appointed the BPM programme director",
      "The board approved the regulatory compliance programme"
    ],
    "Guest satisfaction had begun declining two years earlier, making it a longstanding driver. The regulatory announcement and subsequent programme approval occurred much later."
  );

  M(
    "W2O2a-02", "W2O2a", 2,
    "Qasr's cost per occupied room increased by nine percent twelve months earlier. How did management respond at that stage?",
    [
      "It initiated a cost-cutting review without launching the coordinated BPM programme",
      "It immediately approved the full regulatory compliance programme",
      "It appointed the programme director and established the January deadline",
      "It completed the redesign of all four guest information systems"
    ],
    "The nine percent increase prompted a cost-cutting review rather than the major BPM investment. A limited management response should not be confused with approval of a coordinated programme."
  );

  M(
  "W2O2a-03", "W2O2a", 3,
  "What makes the five-week period following Qasr's March announcement especially important when interpreting the board's decision?",
  [
    "It contrasts years of limited responses with rapid funding afterwards",
    "It shows that the earlier operational problems had disappeared by March",
    "It establishes that guest satisfaction was the board's main reason to invest",
    "It shows that Qasr had already met the new compliance requirement"
  ],
  "The rapid decision after the announcement supports its role as the decisive trigger. The timing does not show that earlier problems had disappeared, that satisfaction drove the decision, or that compliance had already been achieved."
);

  TF(
    "W2O2a-04", "W2O2a", 1,
    "Qasr's loss of two corporate accounts occurred six months before the decisive regulatory announcement.",
    true,
    "True. The loss of two corporate accounts was an earlier commercial pressure. It generated a sales response but did not independently produce the funded BPM programme."
  );

  TF(
    "W2O2a-05", "W2O2a", 2,
    "All four of Qasr's guest information systems were property-local, which prevented the group from producing complete digital records.",
    false,
    "False. The case identifies four information systems, of which three were property-local. Confusing the number of systems with the number of property-local systems misstates the evidence."
  );

  DR(
    "W2O2a-06", "W2O2a", 1,
    "Qasr's competitor introduced mobile check-in {1} months earlier, while the loss of two corporate accounts occurred {2} months earlier.",
    [
      ["eighteen", "twelve", "six"],
      ["six", "eighteen", "twenty-four"]
    ],
    "The competitor introduced mobile check-in eighteen months earlier, and Qasr lost two corporate accounts six months earlier. Both developments preceded the regulatory announcement without producing the major programme."
  );

  DR(
    "W2O2a-07", "W2O2a", 2,
    "Qasr operates {1} hotels and resorts, while its guest information is distributed across {2} systems.",
    [
      ["fourteen", "four", "twenty-four"],
      ["four", "three", "fourteen"]
    ],
    "The case describes fourteen hotels and resorts supported by fragmented information across four systems. Three systems were property-local, but that does not change the total number of systems."
  );

  V(
  "W2O2a-08", "W2O2a", 3,
  "Which diagram correctly shows why Qasr's response changed after March?",
  [
    [
      D.flow([
        "Four|drivers",
        "Limited|responses",
        "Regulatory|announcement",
        "+Programme|funded"
      ]),
      "Four drivers bring only limited responses, and then the announcement brings funding"
    ],
    [
      D.flow([
        "Satisfaction|declines",
        "+Programme|funded"
      ]),
      "The decline in guest satisfaction leads directly to programme funding"
    ],
    [
      D.flow([
        "Accounts|lost",
        "Sales|plan",
        "+Programme|funded"
      ]),
      "The lost corporate accounts lead, through the sales plan, to programme funding"
    ],
    [
      D.flow([
        "Regulatory|announcement",
        "Cost|review",
        "Sales|plan"
      ]),
      "The announcement produces only a cost review and a sales action plan"
    ]
  ],
  "The exhibit shows four drivers that produced only reports, discussion, a cost review and a sales plan. Only the March announcement was followed by a funded programme within five weeks, which is why it is the trigger."
);

  OR(
  "W2O2a-09", "W2O2a", 2,
  "Arrange Qasr's four drivers from the oldest to the most recent, as shown in the case exhibit.",
  [
    "Guest satisfaction begins declining",
    "A competitor launches mobile check-in",
    "Cost per occupied room rises by nine percent",
    "Qasr loses two corporate accounts"
  ],
  "The exhibit dates these events at two years, eighteen months, twelve months and six months before the March announcement. The sequence shows pressure building for two years without producing a funded programme."
);

  OR(
  "W2O2a-10", "W2O2a", 3,
  "Arrange the argument that explains to a board why one trigger achieved what four drivers did not.",
  [
    "Four drivers build over two years but bring only limited responses",
    "In March the tourism authority sets an obligation starting in January",
    "Qasr finds that its four fragmented systems cannot meet that obligation",
    "Doing nothing now carries a definite, dated consequence",
    "The board funds a programme and appoints a director within five weeks"
  ],
  "The argument moves from accumulated pressure to a specific obligation that Qasr cannot meet. Because inaction now has a dated consequence, the board commits quickly, which explains the five-week decision in terms a board would accept."
);

  MA(
    "W2O2a-11", "W2O2a", 2,
    "Match each Qasr development to the management response recorded in the case.",
    [
      ["Declining guest satisfaction", "Performance deterioration recorded in reports"],
      ["Competitor introduces mobile check-in", "Competitive development discussed without comparable investment"],
      ["Cost per occupied room rises", "Cost-cutting review initiated"],
      ["Two corporate accounts are lost", "Sales department prepares an action plan"]
    ],
    "Each pressure generated recognition, discussion, or a limited response rather than the major BPM programme. The regulatory announcement later produced a different level of organisational commitment."
  );


  // ================================================================
  // W2O2b
  // The danger of two competing rationales
  //
  // 11 questions:
  // 3 mcq, 2 tf, 1 drop, 2 visual, 1 order, 2 match.
  // ================================================================

  M(
  "W2O2b-01", "W2O2b", 1,
  "At Qasr, what is the central difference between the original funding rationale and the internal improvement rationale?",
  [
    "Funding followed a compliance rule, while managers now justify the programme by guest experience",
    "Funding followed falling guest satisfaction, while managers now justify the programme by compliance",
    "Funding followed the lost corporate accounts, while managers now justify the programme by cost savings",
    "There is no real difference, because both rationales rest on the same compliance obligation"
  ],
  "The board funded the programme after the new regulatory obligation, while managers increasingly justify it by guest experience. The two objectives can coexist, but treating them as identical creates conflicting expectations by month nine."
);

  M(
  "W2O2b-02", "W2O2b", 2,
  "At month nine, Qasr reports shorter guest-arrival delays but cannot demonstrate progress toward complete digital guest records. What is the main concern?",
  [
    "The results do not show progress on the obligation that justified funding",
    "Shorter arrival delays prove that the regulatory requirement is already satisfied",
    "Guest-experience gains must be rejected because they were not the original trigger",
    "The board should stop monitoring compliance once guest satisfaction starts improving"
  ],
  "Better arrival performance is valuable, but it does not demonstrate compliance with the guest-record requirement. The trap is substituting an additional benefit for the mandatory outcome that secured the investment."
);

  M(
  "W2O2b-03", "W2O2b", 3,
  "Qasr expects to satisfy its regulatory obligation soon, but the sponsor is considering withdrawing support for further improvements. Which response best protects programme continuity?",
  [
    "Document the continuing benefits, keep an accountable owner, and agree the resources",
    "Assume the regulatory announcement will keep executive attention on the programme indefinitely",
    "Close performance monitoring now, since the compliance requirement is almost satisfied",
    "Replace the purpose with a broader digital transformation ambition to win fresh support"
  ],
  "Once the trigger is resolved, attention tends to move on, so continuing benefits need a documented purpose, an owner and agreed resources. The original regulatory trigger cannot guarantee executive support for later improvements."
);

  TF(
    "W2O2b-04", "W2O2b", 1,
    "Qasr can legitimately pursue compliance and guest-experience improvement within the same programme if the outcomes are clearly distinguished.",
    true,
    "True. Compliance and guest-experience improvements can reinforce one another when their requirements and measures are explicit. The problem is not having multiple objectives but allowing them to create incompatible expectations."
  );

  TF(
    "W2O2b-05", "W2O2b", 2,
    "Once Qasr demonstrates compliance, its original executive sponsor must continue supporting every additional improvement automatically.",
    false,
    "False. The urgency that originally secured sponsorship may decline once compliance is achieved. Continuing improvement therefore requires a clear rationale, accountable ownership, and renewed organisational commitment."
  );

  DR(
    "W2O2b-06", "W2O2b", 2,
    "A recorded starting level of performance is a {1}, while checking whether expected improvements were achieved is benefits {2}.",
    [
      ["baseline", "trigger", "charter"],
      ["realisation", "announcement", "classification"]
    ],
    "A baseline establishes the starting performance against which changes can be assessed. Benefits realisation verifies outcomes rather than assuming that implementation activities have produced improvement."
  );

  V(
    "W2O2b-07", "W2O2b", 2,
    "Which diagram best illustrates Qasr's month-nine credibility risk?",
    [
      [
        D.flow([
          "Guest|delays reduced",
          "+Service|improves",
          "!Compliance|unverified",
          "!Board|questions"
        ]),
        "Guest service improves, but compliance remains unverified and the board questions delivery"
      ],
      [
        D.flow([
          "Records|complete",
          "+Compliance|verified",
          "+Board|satisfied"
        ]),
        "The original compliance obligation is verified"
      ],
      [
        D.flow([
          "Compliance|verified",
          "Guest|service improves",
          "+Both|measured"
        ]),
        "Compliance and guest experience are both supported by evidence"
      ],
      [
        D.flow([
          "Purpose|agreed",
          "Measures|defined",
          "+Benefits|tracked"
        ]),
        "The programme establishes clear purpose and performance measures"
      ]
    ],
    "The credibility risk arises when the programme reports attractive guest benefits without demonstrating the funded compliance outcome. The other diagrams describe verified success or arrangements that help prevent this problem."
  );

  V(
    "W2O2b-08", "W2O2b", 3,
    "Which diagram represents a programme that meets Qasr's compliance obligation but leaves the original guest-service weaknesses unresolved?",
    [
      [
        D.flow([
          "Digital|records",
          "+Compliance|achieved",
          "!Handoffs|unchanged",
          "!Guest|still waits"
        ]),
        "Compliance is achieved while guest-service handoffs remain problematic"
      ],
      [
        D.flow([
          "Digital|records",
          "+Compliance|achieved",
          "+Handoffs|improved",
          "+Guest|benefits"
        ]),
        "Compliance and guest-service improvements are both achieved"
      ],
      [
        D.flow([
          "Guest|delays reduced",
          "!Compliance|unverified"
        ]),
        "Guest service improves without verified compliance"
      ],
      [
        D.flow([
          "Programme|approved",
          "Director|appointed",
          "Deadline|established"
        ]),
        "The programme is initiated but no outcomes are demonstrated"
      ]
    ],
    "The correct diagram shows the original compliance outcome achieved while wider service problems persist. Meeting the regulatory requirement does not automatically resolve the departmental handoffs affecting guests."
  );

  OR(
    "W2O2b-09", "W2O2b", 3,
    "Arrange the steps a programme director should take to reconcile Qasr's two rationales before reporting benefits.",
    [
      "Confirm the compliance obligation that secured funding",
      "Identify the additional guest-experience improvements being pursued",
      "Agree which outcomes are mandatory and which are additional",
      "Establish separate baselines and measures where appropriate",
      "Report progress against each agreed outcome"
    ],
    "The director must establish the funded obligation before reconciling it with additional ambitions. Separate measures then prevent success in one area from being mistaken for evidence of success in another."
  );

  MA(
    "W2O2b-10", "W2O2b", 2,
    "Match each Qasr programme result to the stakeholder concern it most directly addresses.",
    [
      ["Complete records produced within the required period", "Board concern about regulatory compliance"],
      ["Reduced delays during guest arrival", "Operational concern about guest experience"],
      ["Benefits compared with recorded baselines", "Concern about whether improvements are genuine"],
      ["Continuing process ownership established", "Concern about performance after programme closure"]
    ],
    "Each result addresses a distinct programme expectation. Treating all these outcomes as interchangeable would obscure whether the original obligation and wider benefits have actually been delivered."
  );

  MA(
    "W2O2b-11", "W2O2b", 3,
    "Match each warning sign to the programme risk it indicates.",
    [
      ["Compliance evidence is missing from the progress report", "Credibility gap with the funding rationale"],
      ["The regulator's requirement is met but guest delays persist", "Minimum-compliance outcome"],
      ["The original sponsor leaves without agreed continuity arrangements", "Loss of executive commitment"],
      ["Guest satisfaction improves but no starting measure exists", "Benefits cannot be reliably verified"]
    ],
    "The warning signs concern different weaknesses in programme delivery and governance. Recognising the specific risk helps managers respond without confusing compliance, wider improvement, sponsorship, and measurement."
  );


  // ================================================================
  // W2O2c
  // Writing a purpose the board can defend
  //
  // 11 questions:
  // 3 mcq, 1 tf, 2 drop, 1 visual, 2 order, 2 match.
  // ================================================================

  M(
    "W2O2c-01", "W2O2c", 1,
    "Which proposed Qasr programme purpose is most defensible to the board?",
    [
      "Redesign guest-record processes to meet January's twenty-four-hour requirement while improving connected guest services",
      "Become the world's most innovative hospitality group through unlimited digital transformation",
      "Install modern technology across every department without specifying operational outcomes",
      "Improve guest satisfaction while leaving regulatory compliance outside the programme's responsibility"
    ],
    "The strongest statement connects the mandatory regulatory outcome with a realistic wider improvement ambition. The alternatives rely on vague aspirations, implementation activities, or omission of the funded obligation."
  );

  M(
  "W2O2c-02", "W2O2c", 2,
  "Qasr's director proposes measuring only the number of systems installed. What is the strongest objection?",
  [
    "Installation does not show that complete records appear within twenty-four hours",
    "System installation can never contribute anything useful to improving a business process",
    "The board should measure training attendance instead, since adoption matters most",
    "Counting systems would automatically prove that guest satisfaction has improved as well"
  ],
  "Installing systems is an implementation activity, not the required compliance outcome. The board needs evidence that complete records are reliably produced in time, not merely confirmation that technology has been deployed."
);

  M(
  "W2O2c-03", "W2O2c", 3,
  "Qasr has limited resources before January. Which scope decision best reflects a defensible programme charter?",
  [
    "Protect the compliance work and explicitly prioritise feasible guest-service improvements",
    "Include every proposed improvement, since all of them support the programme's wider purpose",
    "Remove the compliance work, because customer-experience improvements are far more visible",
    "Let each department expand the programme independently, as each knows its own priorities"
  ],
  "With a regulatory trigger the deadline is immovable but scope is negotiable, so mandatory work must be protected first. Unrestricted scope or independent departmental expansion would put the funded outcome at risk."
);

  TF(
    "W2O2c-04", "W2O2c", 2,
    "A programme charter can be credible without identifying any measurable outcome, provided its transformation ambition is sufficiently inspiring.",
    false,
    "False. A credible charter needs a clear purpose that decision makers can evaluate through meaningful evidence. Inspiring language cannot substitute for a testable organisational commitment."
  );

  DR(
    "W2O2c-05", "W2O2c", 1,
    "A programme {1} establishes its agreed purpose and direction, while programme {2} defines the work included within its boundaries.",
    [
      ["charter", "trigger", "baseline"],
      ["scope", "sponsorship", "benefits"]
    ],
    "The charter establishes the programme's agreed purpose and direction, while scope identifies the work included. Confusing purpose with boundaries makes it harder to judge whether the proposed activities support the intended outcome."
  );

  DR(
    "W2O2c-06", "W2O2c", 2,
    "For Qasr's regulatory obligation, the complete digital guest record must be produced within {1} hours of request, beginning in {2}.",
    [
      ["twenty-four", "twelve", "forty-eight"],
      ["January", "March", "September"]
    ],
    "The case specifies a twenty-four-hour record-production requirement beginning in January. March was the month of the regulatory announcement, not the month the new obligation begins."
  );

  V(
    "W2O2c-07", "W2O2c", 3,
    "Which diagram best connects Qasr's charter purpose with its required outcome and additional improvement ambition?",
    [
      [
        D.flow([
          "Fragmented|records",
          "Process|redesign",
          "+Compliance|demonstrated",
          "Guest|service improved"
        ]),
        "Process redesign addresses fragmented records, demonstrates compliance, and supports guest-service improvement"
      ],
      [
        D.flow([
          "Digital|marketing",
          "Brand|campaign",
          "+Awareness|increases"
        ]),
        "Marketing activities improve brand awareness without addressing guest records"
      ],
      [
        D.flow([
          "New|software",
          "+Installation|complete",
          "!Compliance|unverified"
        ]),
        "Software is installed but the required compliance outcome remains unverified"
      ],
      [
        D.flow([
          "Guest|survey",
          "Satisfaction|reported",
          "!Records|fragmented"
        ]),
        "Guest satisfaction is measured while fragmented records remain unresolved"
      ]
    ],
    "The correct diagram links the existing information weakness with process redesign and the required compliance outcome. The other diagrams omit compliance or confuse implementation and reporting activities with programme success."
  );

  OR(
  "W2O2c-08", "W2O2c", 2,
  "Arrange the steps for drafting the one-sentence purpose at the top of Qasr's programme charter.",
  [
    "Name the event that unlocked the funding",
    "State the obligation that event creates, with its January deadline",
    "Identify the process weakness that prevents Qasr meeting that obligation",
    "Write a purpose linking the redesign of that process to the obligation",
    "Add the wider guest-service ambition without presenting it as guaranteed"
  ],
  "Each step depends on the one before it, starting from the trigger that secured funding. The guest-service ambition is added last so that it supports, rather than obscures, the mandatory compliance commitment."
);

  OR(
    "W2O2c-09", "W2O2c", 3,
    "Qasr wants to substantiate a claim that guest-arrival performance has improved. Put the evaluation activities in a defensible order.",
    [
      "Define the guest-arrival outcome being measured",
      "Record performance before the proposed changes",
      "Implement the agreed process improvements",
      "Measure performance after implementation",
      "Compare results and evaluate whether improvement occurred"
    ],
    "A meaningful improvement claim requires defined measures and a baseline before changes are introduced. Measuring only after implementation cannot reliably establish how much performance has changed."
  );

  MA(
    "W2O2c-10", "W2O2c", 2,
    "Match each element of a defensible Qasr charter to its purpose.",
    [
      ["Programme purpose", "States the outcome the investment is intended to deliver"],
      ["Programme scope", "Defines the activities and processes included"],
      ["Process owner", "Maintains accountability for the complete process"],
      ["Performance measures", "Provide evidence of whether agreed outcomes are achieved"]
    ],
    "Purpose, scope, ownership, and measures serve different but connected functions. A charter becomes weak when it names ambitions without establishing the boundaries and accountability needed to deliver them."
  );

  MA(
    "W2O2c-11", "W2O2c", 3,
    "Match each board question to the charter element needed for a defensible answer.",
    [
      ["What must this investment achieve?", "A clear programme purpose"],
      ["Which changes are included?", "An agreed scope boundary"],
      ["Who can resolve cross-department disagreements?", "Accountable ownership with decision rights"],
      ["How will we know whether it worked?", "Defined outcomes and supporting evidence"]
    ],
    "Each question tests a different part of programme credibility. Clear answers allow the board to connect its funding decision with the work, authority, and evidence needed for delivery."
  );

  // ================================================================
  // LESSON W2L3
  // Managing the complete business process
  //
  // Sections:
  // W2O3a · A process owner needs a real mandate
  // W2O3b · Measuring the customer's clock
  // W2O3c · Keeping sponsorship and performance alive
  //
  // Distribution:
  // mcq 9, tf 5, drop 5, visual 4, order 5, match 5.
  // ================================================================


  // ================================================================
  // W2O3a
  // A process owner needs a real mandate
  //
  // 11 questions:
  // 3 mcq, 2 tf, 2 drop, 1 visual, 1 order, 2 match.
  // ================================================================

  M(
  "W2O3a-01", "W2O3a", 1,
  "At Qasr Marina, reception and housekeeping meet their departmental targets, but guests still experience delays. What does this reveal?",
  [
    "The complete guest process can perform poorly despite good departmental results",
    "Departmental targets are reliable proof that the guest journey is performing well",
    "Reception should be held responsible for every delay, whatever its actual cause",
    "The hotel should stop measuring departments and rely on guest surveys instead"
  ],
  "The guest experiences connected activities, not separate departmental reports. The main trap is assuming that satisfactory local results guarantee a satisfactory end-to-end process."
);

  M(
    "W2O3a-02", "W2O3a", 2,
    "Qasr appoints a guest-arrival process owner, but departmental managers can reject every proposed change. What is missing?",
    [
      "A recognised mandate providing sufficient authority to coordinate cross-department decisions",
      "A more impressive job title without additional decision-making responsibilities",
      "Exclusive responsibility for reception employees rather than the complete process",
      "A requirement that every department independently improves its own productivity"
    ],
    "The owner needs authority appropriate to the responsibility for complete process performance. A title without meaningful influence creates accountability without the ability to resolve cross-functional problems."
  );

  M(
    "W2O3a-03", "W2O3a", 3,
    "Qasr completes its digital guest-record programme and disbands the implementation team. Who should remain accountable for everyday process performance?",
    [
      "A designated process owner with continuing responsibility for the complete process",
      "The temporary programme team after its formal closure",
      "The software supplier regardless of operational responsibilities",
      "Each department separately, with nobody accountable for the complete process"
    ],
    "Process ownership must continue after the temporary change programme ends. Treating programme completion as the end of process accountability risks allowing familiar operational weaknesses to return."
  );

  TF(
    "W2O3a-04", "W2O3a", 1,
    "A process owner can be accountable for an end-to-end outcome even when the activities involved belong to several departments.",
    true,
    "True. End-to-end ownership concerns the combined process rather than a single department's activities. Effective accountability requires a mandate to coordinate the functions contributing to the outcome."
  );

  TF(
    "W2O3a-05", "W2O3a", 2,
    "Once a programme director has been appointed, a continuing process owner becomes unnecessary because both roles have identical responsibilities.",
    false,
    "False. The programme director coordinates the temporary change effort, while the process owner remains accountable for ongoing process performance. Confusing the roles can leave an ownership gap after implementation."
  );

  DR(
    "W2O3a-06", "W2O3a", 1,
    "A process owner's recognised decision-making authority is a {1}, while responsibility for the complete process is end-to-end {2}.",
    [
      ["mandate", "baseline", "trigger"],
      ["accountability", "installation", "classification"]
    ],
    "A mandate provides recognised authority to coordinate decisions, while accountability establishes responsibility for results. Responsibility without sufficient authority makes cross-department improvement difficult."
  );

  DR(
    "W2O3a-07", "W2O3a", 2,
    "The programme director primarily coordinates {1}, while the process owner maintains responsibility for ongoing process {2}.",
    [
      ["change delivery", "departmental recruitment", "regulatory announcements"],
      ["performance", "software purchasing", "marketing"]
    ],
    "The director coordinates delivery of the approved change programme, while the owner remains responsible for process performance. The distinction matters because operational accountability must survive programme closure."
  );

  V(
    "W2O3a-08", "W2O3a", 2,
    "Which diagram best illustrates a handoff problem that requires end-to-end process ownership?",
    [
      [
        D.flow([
          "Room|ready",
          "!Status|delayed",
          "Reception|unaware",
          "!Guest|waits"
        ]),
        "A delayed room-status update causes unnecessary waiting despite completed housekeeping work"
      ],
      [
        D.flow([
          "Room|ready",
          "Status|received",
          "+Guest|enters"
        ]),
        "Housekeeping communicates readiness promptly and the guest enters the room"
      ],
      [
        D.flow([
          "Guest|arrives",
          "Reception|responds",
          "+Check-in|complete"
        ]),
        "Reception completes a guest check-in without a visible handoff problem"
      ],
      [
        D.flow([
          "Housekeeping|reports",
          "Manager|reviews",
          "+Target|achieved"
        ]),
        "Housekeeping reports successful achievement of its local target"
      ]
    ],
    "The correct diagram shows a failure where information passes between housekeeping and reception. The other diagrams show successful activity or local reporting without demonstrating a problematic cross-department connection."
  );

  OR(
    "W2O3a-09", "W2O3a", 3,
    "Arrange these actions for establishing effective ownership of Qasr's complete guest-arrival process.",
    [
      "Define the complete guest-arrival process and its intended outcome",
      "Identify the departments and handoffs involved",
      "Appoint an accountable process owner",
      "Provide a mandate to coordinate cross-department decisions",
      "Establish continuing performance review"
    ],
    "Effective ownership begins with understanding the complete process and its organisational dependencies. A named owner needs authority and ongoing performance review rather than responsibility in name alone."
  );

  MA(
    "W2O3a-10", "W2O3a", 2,
    "Match each Qasr role to its primary responsibility.",
    [
      ["Executive sponsor", "Supports organisational commitment and important senior decisions"],
      ["Programme director", "Coordinates delivery of the approved change programme"],
      ["Process owner", "Maintains accountability for complete process performance"],
      ["Departmental manager", "Manages activities and resources within a particular function"]
    ],
    "These roles contribute differently to programme delivery and continuing operations. Confusing their responsibilities can leave cross-functional decisions unresolved or weaken accountability after implementation."
  );

  MA(
  "W2O3a-11", "W2O3a", 3,
  "Qasr runs its guest-arrival process in fourteen properties. Match each situation to its most likely consequence.",
  [
    ["One group owner works with a champion at each property", "Someone is accountable for the process at every site"],
    ["Champions report only to their general manager", "Local priorities quietly override the group standard"],
    ["Standard steps and permitted variations are written down", "Each site can adapt without drifting from the standard"],
    ["Local variation is left undocumented", "A pilot that succeeds at one hotel fails to scale"]
  ],
  "A group owner with local champions is the usual answer for a multi-site process, but it fails when champions answer only to their general manager. Writing down what is standard and what may vary is what allows a successful pilot to scale."
);


  // ================================================================
  // W2O3b
  // Measuring the customer's clock
  //
  // 11 questions:
  // 3 mcq, 2 tf, 1 drop, 2 visual, 2 order, 1 match.
  // ================================================================

  M(
  "W2O3b-01", "W2O3b", 1,
  "What does cycle time measure in a managed process?",
  [
    "The time from the customer's trigger to the outcome, including all waiting",
    "The time the team spends actively working on a case once it reaches their queue",
    "The number of cases each department completes during a working week",
    "The time from a programme's approval to the end of its implementation"
  ],
  "Cycle time runs from the customer's trigger to the outcome and includes every period of waiting. Measuring only the team's working time or departmental throughput hides the delays the customer actually experiences."
);

  M(
  "W2O3b-02", "W2O3b", 2,
  "In the claims example, the team's clock shows 4.1 days while the customer's clock shows 21.1 days. How many days fall outside the team's clock?",
  [
    "Seventeen days",
    "Fourteen days",
    "Nine days",
    "Twenty-one days"
  ],
  "The nine days in the shared mailbox, five days awaiting documents and three days awaiting the payment run add up to seventeen days. Choosing the team's clock makes those seventeen days someone else's problem."
);

  M(
  "W2O3b-03", "W2O3b", 3,
  "The claims team cuts its own working time from 4.1 days to 3 days, and nothing else changes. What is the customer's cycle time now?",
  [
    "20 days, because the delays outside the team's clock are untouched",
    "About 15 days, because the team's gain cuts the whole cycle by a quarter",
    "3 days, because the team's clock now defines the whole process",
    "21.1 days, because the team's work is not part of the customer's clock"
  ],
  "The customer's clock falls only from 21.1 to 20 days, because the seventeen days of waiting are unchanged. Faster local work barely changes the customer's experience when most of the time is lost between activities."
);

  TF(
    "W2O3b-04", "W2O3b", 1,
    "Waiting for information between departments can increase elapsed time even when each department performs its own activities efficiently.",
    true,
    "True. Handoff delays contribute to the customer's complete experience despite satisfactory local processing performance. End-to-end measurement helps reveal waiting that departmental productivity figures may overlook."
  );

  TF(
    "W2O3b-05", "W2O3b", 2,
    "A faster guest-arrival process necessarily delivers better service quality, even if room assignments become less accurate.",
    false,
    "False. Speed alone does not guarantee a satisfactory or reliable service outcome. Process measurement should consider accuracy and quality alongside the time customers experience."
  );

  DR(
    "W2O3b-06", "W2O3b", 2,
    "Time spent actively performing necessary work is {1} time, while time lost before work or information becomes available is {2} time.",
    [
      ["processing", "elapsed", "calendar"],
      ["waiting", "processing", "sponsorship"]
    ],
    "Processing time captures active work, while waiting time captures delays between activities or before work can proceed. Both contribute to elapsed time and must be distinguished when diagnosing performance."
  );

  V(
    "W2O3b-07", "W2O3b", 2,
    "Which diagram best explains why Qasr's guest can experience a long delay despite efficient reception processing?",
    [
      [
        D.flow([
          "Reception|processes",
          "!Room|status delayed",
          "Guest|waits",
          "Room|access granted"
        ]),
        "Reception completes its work, but delayed room-status information extends the guest's wait"
      ],
      [
        D.flow([
          "Reception|processes",
          "Room|ready",
          "+Guest|enters"
        ]),
        "Reception completes its work and the guest enters the room without delay"
      ],
      [
        D.flow([
          "Guest|arrives",
          "Reception|responds",
          "+Processing|complete"
        ]),
        "Only reception processing is represented, without any waiting or handoff"
      ],
      [
        D.flow([
          "Housekeeping|reports",
          "Manager|approves",
          "+Target|met"
        ]),
        "Housekeeping reports successful local performance without showing the guest journey"
      ]
    ],
    "The correct diagram shows how delayed information extends the customer's journey after reception processing. The alternatives omit the waiting problem or describe local performance without showing its effect on the guest."
  );

  V(
  "W2O3b-08", "W2O3b", 3,
  "Which chart correctly breaks down the customer's 21.1 days in the claims example?",
  [
    [
      D.bars([
        ["Mailbox", 9],
        ["Documents", 5],
        ["Team work", 4.1],
        ["Payment run", 3]
      ]),
      "Nine days in the mailbox, five awaiting documents, 4.1 of team work, three awaiting payment"
    ],
    [
      D.bars([
        ["Mailbox", 4.1],
        ["Documents", 5],
        ["Team work", 9],
        ["Payment run", 3]
      ]),
      "4.1 days in the mailbox, five awaiting documents, nine of team work, three awaiting payment"
    ],
    [
      D.bars([
        ["Mailbox", 9],
        ["Documents", 3],
        ["Team work", 4.1],
        ["Payment run", 5]
      ]),
      "Nine days in the mailbox, three awaiting documents, 4.1 of team work, five awaiting payment"
    ],
    [
      D.bars([
        ["Mailbox", 5],
        ["Documents", 9],
        ["Team work", 4.1],
        ["Payment run", 3]
      ]),
      "Five days in the mailbox, nine awaiting documents, 4.1 of team work, three awaiting payment"
    ]
  ],
  "The claim waits nine days unassigned in a shared mailbox and five days for documents, is worked for 4.1 days, and then waits three days for the payment run. Only the 4.1 days of team work appear on the team's clock, while the other seventeen days are waiting."
);

  OR(
    "W2O3b-09", "W2O3b", 2,
    "Arrange these activities to measure the complete guest-arrival journey rather than only reception productivity.",
    [
      "Define guest arrival as the beginning of the measured process",
      "Record when reception processing begins and ends",
      "Capture waiting caused by unavailable room information",
      "Record when the guest receives access to the room",
      "Calculate the total elapsed time across the journey"
    ],
    "End-to-end measurement requires defined boundaries and visibility into processing and waiting. Measuring only reception activity would omit delays that influence the guest's experience."
  );

  OR(
  "W2O3b-10", "W2O3b", 3,
  "A claims team reports 4.1 days, but customers say about three weeks. Arrange the reasoning that reconciles the two figures.",
  [
    "Ask where each clock starts: the team's queue or the customer's first contact",
    "Find the days that sit between those two starting points",
    "Recognise that both figures honestly measure different processes",
    "Conclude that only the customer's boundary can justify the programme",
    "Redefine the process boundary before measuring anything else"
  ],
  "The two figures differ because they start at different points, and the gap is nine days in a mailbox and five awaiting documents. Neither figure is wrong, but only the customer's boundary can justify a programme, so the boundary must be redefined before measuring."
);

  MA(
    "W2O3b-11", "W2O3b", 3,
    "Match each Qasr measurement concern to the most relevant evidence.",
    [
      ["Reception productivity", "Time spent actively processing guest arrivals"],
      ["Guest waiting", "Duration when the guest cannot proceed"],
      ["Regulatory record compliance", "Complete records produced within twenty-four hours of request"],
      ["Guest-service improvement", "End-to-end performance compared with its baseline"]
    ],
    "Each concern requires evidence appropriate to the outcome being assessed. Departmental productivity cannot substitute for end-to-end guest performance or proof that the separate regulatory obligation has been satisfied."
  );


  // ================================================================
  // W2O3c
  // Keeping sponsorship and performance alive
  //
  // 11 questions:
  // 3 mcq, 1 tf, 2 drop, 1 visual, 2 order, 2 match.
  // ================================================================

  M(
    "W2O3c-01", "W2O3c", 1,
    "Why can Qasr's executive attention decline after the immediate regulatory requirement has been satisfied?",
    [
      "The original trigger loses urgency as leaders redirect attention toward other priorities",
      "The organisation no longer needs any process management after demonstrating compliance",
      "The process owner automatically loses all operational authority",
      "The regulatory announcement guarantees permanent executive sponsorship"
    ],
    "The compliance trigger creates urgency that may diminish once the obligation is addressed. Continuing improvement needs governance and sponsorship rather than assuming the original event will sustain attention indefinitely."
  );

  M(
    "W2O3c-02", "W2O3c", 2,
    "Qasr's reception and housekeeping managers disagree about responsibility for room-readiness updates. Which arrangement should help resolve the disagreement?",
    [
      "A recognised process owner supported by clear cross-functional governance",
      "Independent departmental targets with no shared decision-making arrangement",
      "A software supplier deciding which department should control the complete process",
      "An assumption that the disagreement will disappear after programme closure"
    ],
    "A recognised process owner needs governance arrangements for coordinating decisions across departments. Separate local targets or technology alone cannot establish accountability for a disputed handoff."
  );

  M(
    "W2O3c-03", "W2O3c", 3,
    "A new Qasr executive questions continued improvement funding after the original sponsor leaves. Which evidence would best support continuity?",
    [
      "Documented programme purpose, verified benefits, continuing ownership, and agreed performance commitments",
      "The former sponsor's personal enthusiasm without supporting performance evidence",
      "A list of installed systems without information about operational outcomes",
      "An assumption that every improvement proposal deserves funding because compliance was achieved"
    ],
    "Documented purpose, evidence, and accountability help a successor evaluate continuing commitments. Personal enthusiasm or completed implementation activities cannot establish the value of further investment."
  );

  TF(
    "W2O3c-04", "W2O3c", 2,
    "Benefits realisation concerns whether the expected organisational improvements have actually been achieved, not merely whether implementation activities are complete.",
    true,
    "True. Benefits realisation requires evidence that agreed outcomes have been delivered. Completing activities or installing technology does not automatically establish that the expected business benefits exist."
  );

  DR(
    "W2O3c-05", "W2O3c", 1,
    "The senior leader supporting organisational commitment is the executive {1}, while the person accountable for continuing process performance is the process {2}.",
    [
      ["sponsor", "trigger", "analyst"],
      ["owner", "supplier", "auditor"]
    ],
    "The executive sponsor maintains senior support, while the process owner remains accountable for ongoing performance. Their responsibilities complement each other but should not be treated as identical."
  );

  DR(
    "W2O3c-06", "W2O3c", 2,
    "The arrangements governing decisions and accountability are called {1}, while a measure used to judge an important outcome is a performance {2}.",
    [
      ["governance", "installation", "competition"],
      ["indicator", "trigger", "mandate"]
    ],
    "Governance establishes how responsibilities and decisions are organised, while performance indicators help assess outcomes. Neither concept can replace the other because accountability and evidence serve different functions."
  );

  V(
    "W2O3c-07", "W2O3c", 2,
    "Which diagram best represents Qasr sustaining process improvement after its temporary programme closes?",
    [
      [
        D.flow([
          "Programme|delivers",
          "Ownership|continues",
          "Performance|reviewed",
          "+Benefits|sustained"
        ]),
        "The programme delivers changes, while ownership and performance monitoring continue"
      ],
      [
        D.flow([
          "Programme|delivers",
          "Ownership|ends",
          "!Monitoring|stops"
        ]),
        "Ownership and monitoring end when the programme closes"
      ],
      [
        D.flow([
          "Compliance|achieved",
          "Sponsor|leaves",
          "!Responsibilities|unclear"
        ]),
        "The compliance obligation is met but continuing responsibilities remain unclear"
      ],
      [
        D.flow([
          "Software|installed",
          "Team|disbanded",
          "+Success|assumed"
        ]),
        "Implementation completion is treated as proof of sustained improvement"
      ]
    ],
    "Sustainable BPM requires continuing ownership and performance monitoring after temporary delivery work ends. The other diagrams remove accountability or assume that completed implementation guarantees lasting benefits."
  );

  OR(
    "W2O3c-08", "W2O3c", 2,
    "Arrange these activities for transferring Qasr's improved process from temporary programme delivery into continuing operations.",
    [
      "Confirm that the agreed implementation outcomes have been delivered",
      "Identify the continuing operational process owner",
      "Transfer relevant responsibilities and process information",
      "Establish regular performance monitoring",
      "Use performance evidence to address emerging weaknesses"
    ],
    "The transition should establish continuing responsibility and monitoring after delivery. Without operational ownership, process weaknesses may reappear even when the temporary programme completed its work."
  );

  OR(
    "W2O3c-09", "W2O3c", 3,
    "Qasr notices that guest-arrival performance is deteriorating several months after implementation. Put the governance response in a defensible sequence.",
    [
      "Detect the deterioration through agreed performance indicators",
      "Investigate the process activities and handoffs involved",
      "Identify the decisions and responsibilities needed for correction",
      "Coordinate corrective changes through the process owner",
      "Review subsequent performance to verify the response"
    ],
    "Continuing governance uses evidence to identify problems, coordinate action, and verify results. Merely reporting deteriorating performance without accountable corrective action would not sustain the improvement."
  );

  MA(
    "W2O3c-10", "W2O3c", 2,
    "Match each mechanism supporting sustainable BPM to its contribution.",
    [
      ["Executive sponsorship", "Protects senior organisational commitment"],
      ["Process ownership", "Maintains accountability for the complete process"],
      ["Performance monitoring", "Detects changes in operational outcomes"],
      ["Benefits realisation", "Verifies whether expected improvements have been achieved"]
    ],
    "Sponsorship, ownership, monitoring, and benefits realisation provide complementary support for sustainable improvement. None alone guarantees that a redesigned process will continue delivering its intended outcomes."
  );

  MA(
    "W2O3c-11", "W2O3c", 3,
    "Match each post-implementation situation to the management response it requires.",
    [
      ["Executive sponsor changes role", "Reconfirm purpose and continuing leadership commitment"],
      ["Guest-arrival delays begin increasing", "Investigate performance evidence and process handoffs"],
      ["Departments dispute responsibility", "Use the process owner's recognised decision-making mandate"],
      ["Expected service benefits remain unverified", "Compare measured results with agreed baselines"]
    ],
    "Each situation requires a response appropriate to its governance or performance weakness. Sustainable BPM depends on maintaining leadership commitment, accountable decisions, and evidence of results after implementation."
  );

  // ================================================================
  // LESSON W2L4
  // From a promising brief to a credible programme
  //
  // Sections:
  // W2O4a · Questions that expose an incomplete brief
  // W2O4b · Making the board's business case coherent
  // W2O4c · Applying the distinction beyond Qasr
  //
  // Distribution:
  // mcq 9, tf 5, drop 5, visual 4, order 5, match 5.
  //
  // W2O4 is an instructional synthesis group.
  // Official weekly outcomes remain W2O1, W2O2, and W2O3.
  //
  // The separate "Three Pressures, One Budget" forum case
  // and its exhibit were not supplied.
  // Questions assess the documented forum learning outcomes
  // without inventing facts from that case.
  // ================================================================


  // ================================================================
  // W2O4a
  // Questions that expose an incomplete brief
  //
  // 11 questions:
  // 3 mcq, 2 tf, 2 drop, 1 visual, 1 order, 2 match.
  // ================================================================

  M(
    "W2O4a-01", "W2O4a", 1,
    "Qasr's proposed programme brief promises world-class hospitality through digital transformation. What is its most important weakness?",
    [
      "It does not identify the specific compliance outcome that originally justified funding",
      "It mentions digital transformation rather than describing only manual activities",
      "It includes customer experience among its possible organisational benefits",
      "It describes an ambition that may require cooperation between departments"
    ],
    "The original investment was justified by a specific digital guest-record obligation. Broad transformation language cannot replace a clear statement of the required outcome."
  );

  M(
    "W2O4a-02", "W2O4a", 2,
    "A proposal concentrates on replacing Qasr's reception software but ignores information held in other systems. What should the programme director investigate?",
    [
      "Whether the proposed scope includes all information and process activities needed to produce complete guest records",
      "Whether reception employees prefer the visual appearance of the replacement software",
      "Whether the supplier can install the new reception system without involving other departments",
      "Whether the board would accept installation completion as sufficient evidence of regulatory compliance"
    ],
    "Qasr's obligation concerns complete digital guest records, not simply reception technology. A narrow solution may leave the underlying information fragmentation unresolved."
  );

  M(
  "W2O4a-03", "W2O4a", 3,
  "A BPM proposal names an accountable director and measurable targets, but departments retain unrestricted power to reject necessary changes. Which weakness remains?",
  [
    "Governance gives too little authority to deliver cross-functional outcomes",
    "The targets are too ambitious to achieve before the January deadline arrives",
    "Accountability should be shared among several directors rather than one person",
    "Departments simply need more training before they will accept the changes"
  ],
  "Accountability needs authority that matches the decisions required for delivery. If departments can veto necessary changes, neither training nor extra directors gives the programme the mandate it lacks."
);

  TF(
    "W2O4a-04", "W2O4a", 1,
    "A programme brief should explain why the organisation is acting now, even when its operational problems have existed for years.",
    true,
    "True. The event that changes management's willingness to invest helps reveal the programme's funding rationale. Longstanding problems explain the need for change but may not explain the timing of commitment."
  );

  TF(
    "W2O4a-05", "W2O4a", 2,
    "A programme with a clearly defined purpose can safely leave its scope unspecified because departments will naturally agree which activities belong within it.",
    false,
    "False. Unclear scope allows departments to make conflicting assumptions and introduce unrelated work. A credible brief needs agreed boundaries connecting the proposed activities with the required outcome."
  );

  DR(
  "W2O4a-06", "W2O4a", 1,
  "A brief that cannot say what will be measured, and against what {1}, is not yet a programme; it is only {2}.",
  [
    ["baseline", "trigger", "sponsor"],
    ["an aspiration", "an obligation", "a mandate"]
  ],
  "A credible brief states what will be measured, from when to when, and against what baseline. A brief that cannot answer these questions is not yet a programme; it is an aspiration."
);

  DR(
    "W2O4a-07", "W2O4a", 2,
    "A credible brief should connect the event that secured {1} with an outcome that can be {2}.",
    [
      ["funding", "customer complaints", "departmental reports"],
      ["verified", "assumed", "advertised"]
    ],
    "The funding rationale should lead to a demonstrable organisational commitment. Merely advertising an ambition or assuming benefits have occurred does not provide evidence of successful delivery."
  );

  V(
    "W2O4a-08", "W2O4a", 3,
    "Which diagram best represents a complete logic for evaluating Qasr's proposed programme brief?",
    [
      [
        D.flow([
          "Funding|trigger",
          "Required|outcome",
          "Scope|and ownership",
          "+Evidence|of success"
        ]),
        "The brief connects its trigger with an outcome, delivery responsibilities, and evidence"
      ],
      [
        D.flow([
          "Software|selected",
          "System|installed",
          "+Success|assumed"
        ]),
        "The brief treats software installation as proof of business success"
      ],
      [
        D.flow([
          "Guest|complaints",
          "Brand|campaign",
          "+Publicity|increases"
        ]),
        "The brief substitutes publicity for process improvement"
      ],
      [
        D.flow([
          "Departments|propose",
          "Scope|expands",
          "!Deadline|ignored"
        ]),
        "The brief allows uncontrolled expansion without protecting the deadline"
      ]
    ],
    "The correct diagram links the funding rationale to a required outcome and credible delivery arrangements. The alternatives omit essential commitments or confuse implementation and promotional activities with business results."
  );

  OR(
  "W2O4a-09", "W2O4a", 2,
  "Arrange these review activities to move from understanding Qasr's investment decision toward testing its proposed brief.",
  [
    "Establish what changed to make the board fund the programme now",
    "Identify the mandatory outcome that this trigger creates",
    "Define which processes are in scope to deliver that outcome",
    "Name one owner with authority across every department in that scope",
    "Agree the measures and baseline that owner will be judged against"
  ],
  "Each step builds on the one before it, starting with why now. The outcome defines the scope, the scope defines where the owner needs authority, and the owner is then held to agreed measures against a baseline."
);

  MA(
    "W2O4a-10", "W2O4a", 2,
    "Match each weakness in a proposed programme brief to the question that would most directly expose it.",
    [
      ["Unclear funding rationale", "What changed that made management approve investment now?"],
      ["Undefined scope", "Which processes and activities are included?"],
      ["Insufficient process authority", "Who can resolve decisions across departmental boundaries?"],
      ["Unverifiable benefits", "What evidence will demonstrate that the outcomes were achieved?"]
    ],
    "Each question tests a different element of programme credibility. A brief may sound persuasive while remaining incomplete in its rationale, boundaries, authority, or evidence."
  );

  MA(
    "W2O4a-11", "W2O4a", 3,
    "Match each proposed Qasr activity to the programme concern it most directly addresses.",
    [
      ["Verify complete digital guest-record production", "Mandatory compliance outcome"],
      ["Identify affected information systems and handoffs", "Programme scope and process dependencies"],
      ["Establish cross-department decision rights", "Accountable governance"],
      ["Compare guest-arrival performance with its baseline", "Evidence of additional service benefits"]
    ],
    "These activities support distinct commitments within the programme. Their value depends on connecting each activity with the outcome or delivery requirement it is intended to address."
  );


  // ================================================================
  // W2O4b
  // Making the board's business case coherent
  //
  // 11 questions:
  // 3 mcq, 2 tf, 1 drop, 2 visual, 2 order, 1 match.
  // ================================================================

  M(
  "W2O4b-01", "W2O4b", 1,
  "Which evidence would most directly support Qasr's original business case after the redesigned guest-record process begins operating?",
  [
    "Verified production of complete guest records within twenty-four hours",
    "A well-attended launch event celebrating the new information systems",
    "A rise in the number of employees using the new digital devices daily",
    "Positive press coverage describing Qasr as an innovative hospitality group"
  ],
  "The original business case concerns meeting the digital guest-record requirement. Launch events, device usage and publicity do not demonstrate the required compliance outcome."
);

  M(
  "W2O4b-02", "W2O4b", 2,
  "Qasr's board asks why investment should address fragmented guest information rather than only introduce a faster reception interface. Which argument is strongest?",
  [
    "Fragmented data blocks reliable records, and a faster interface would leave that gap open",
    "A faster interface would automatically connect every existing guest information system",
    "Reception technology has no influence on any part of the guest's service experience",
    "Information dependencies should be avoided because they complicate the implementation plan"
  ],
  "The investment must address the information weakness that prevents the required outcome. A faster reception interface alone cannot make complete guest records reliably available."
);

  M(
  "W2O4b-03", "W2O4b", 3,
  "A board member challenges Qasr's proposed investment because the programme promises more benefits than its resources can reasonably deliver. What is the best response?",
  [
    "Separate mandatory compliance from extra benefits and agree realistic priorities",
    "Promise every proposed improvement anyway, since ambition helps secure board support",
    "Drop the compliance obligation from the case so the programme looks simpler",
    "Avoid setting priorities, since doing so might expose disagreement among stakeholders"
  ],
  "A defensible business case protects the funded obligation while making realistic choices about additional improvements. Unrestricted promises weaken credibility and put mandatory delivery at risk."
);

  TF(
    "W2O4b-04", "W2O4b", 1,
    "A business case can include additional guest-experience benefits without treating them as substitutes for Qasr's mandatory compliance outcome.",
    true,
    "True. Wider improvements can strengthen the investment case when they are clearly distinguished and measured. They cannot replace the obligation that originally justified programme funding."
  );

  TF(
    "W2O4b-05", "W2O4b", 2,
    "Once Qasr's new information systems have been installed, the board no longer needs evidence about process performance or employee adoption.",
    false,
    "False. Installation does not prove that the required process works reliably or that employees use it consistently. The board needs evidence of operational outcomes rather than implementation activity alone."
  );

  DR(
    "W2O4b-06", "W2O4b", 2,
    "A business case connects expected {1} with the resources and risks involved, while benefits realisation checks whether those outcomes were actually {2}.",
    [
      ["outcomes", "announcements", "job titles"],
      ["achieved", "advertised", "assumed"]
    ],
    "The business case explains the investment through expected outcomes, resources, and risks. Benefits realisation requires evidence of achievement rather than optimistic claims or completed activities."
  );

  V(
    "W2O4b-07", "W2O4b", 2,
    "Which diagram best represents a defensible connection between Qasr's existing weakness and its required programme outcome?",
    [
      [
        D.flow([
          "Fragmented|information",
          "Guest-record|redesign",
          "Complete|record",
          "+Compliance|verified"
        ]),
        "Process redesign addresses fragmented information and produces evidence of compliance"
      ],
      [
        D.flow([
          "Fragmented|information",
          "Brand|redesign",
          "+Awareness|improves"
        ]),
        "A branding initiative responds to fragmented information without changing the process"
      ],
      [
        D.flow([
          "Fragmented|information",
          "Software|installed",
          "+Success|declared"
        ]),
        "Software installation is treated as sufficient proof of success"
      ],
      [
        D.flow([
          "Guest|complaints",
          "Staff|survey",
          "+Programme|closed"
        ]),
        "The programme closes after collecting opinions without demonstrating record compliance"
      ]
    ],
    "The correct diagram connects the operational weakness with process redesign and a verifiable compliance outcome. The alternatives do not demonstrate that the funded problem has been resolved."
  );

  V(
    "W2O4b-08", "W2O4b", 3,
    "Which diagram best represents how Qasr should protect programme value after the original regulatory trigger has been addressed?",
    [
      [
        D.flow([
          "Compliance|achieved",
          "Process|ownership",
          "Benefits|monitored",
          "+Performance|sustained"
        ]),
        "Continuing ownership and monitoring protect benefits after compliance is achieved"
      ],
      [
        D.flow([
          "Compliance|achieved",
          "Ownership|removed",
          "!Monitoring|stopped"
        ]),
        "The organisation ends ownership and monitoring after achieving compliance"
      ],
      [
        D.flow([
          "Compliance|achieved",
          "Programme|closed",
          "+All|benefits assumed"
        ]),
        "Programme closure is treated as proof that every expected benefit exists"
      ],
      [
        D.flow([
          "Compliance|achieved",
          "Sponsor|leaves",
          "!Purpose|forgotten"
        ]),
        "The programme loses leadership support and its continuing purpose"
      ]
    ],
    "Continuing ownership and performance monitoring help sustain benefits after the original trigger loses urgency. Compliance achievement alone cannot guarantee permanent improvement in connected guest-service processes."
  );

  OR(
  "W2O4b-09", "W2O4b", 2,
  "Arrange the reasoning needed to present Qasr's regulatory investment as a coherent business case.",
  [
    "State the regulatory obligation that triggered the investment",
    "Show that fragmented guest data prevents Qasr meeting that obligation",
    "Describe the process redesign that removes that fragmentation",
    "Assign an owner and resources to deliver that redesign",
    "Show how the owner will evidence compliance once the redesign is live"
  ],
  "A coherent business case moves from the triggering obligation to the weakness that blocks it, and then to the response. Ownership, resources and evidence of compliance make the investment argument testable."
);

  OR(
  "W2O4b-10", "W2O4b", 3,
  "Resources before January cannot cover every proposed improvement. Arrange the scope decisions Qasr's director should make.",
  [
    "Confirm the work the January obligation cannot do without",
    "Protect that work in the plan and its budget",
    "List the guest-service improvements competing for what remains",
    "Choose which of them fit, and record who decided",
    "Schedule the rest explicitly for a later phase"
  ],
  "With a regulatory trigger the deadline is immovable but scope is negotiable, so mandatory work is protected first. Recording what is deliberately out of scope, and who decided, prevents departments making conflicting assumptions."
);

  MA(
    "W2O4b-11", "W2O4b", 3,
    "Match each business-case claim to the evidence that would most directly support it.",
    [
      ["Qasr meets the digital record requirement", "Complete records produced within the required period"],
      ["Guest-arrival delays have decreased", "End-to-end arrival results compared with the baseline"],
      ["Employees use the redesigned process", "Evidence of consistent operational adoption"],
      ["The improvement remains sustainable", "Continuing ownership and performance review"]
    ],
    "Each claim requires evidence corresponding to the outcome asserted. Compliance, customer performance, adoption, and sustainability cannot be established through one generic implementation measure."
  );


  // ================================================================
  // W2O4c
  // Applying the distinction beyond Qasr
  //
  // 11 questions:
  // 3 mcq, 1 tf, 2 drop, 1 visual, 2 order, 2 match.
  //
  // The questions use explicitly hypothetical organisations
  // and do not invent facts from the separate forum case.
  // ================================================================

  M(
  "W2O4c-01", "W2O4c", 1,
  "A museum has experienced rising costs for years, but approves BPM funding immediately after confirming a major exhibition date. Which interpretation is strongest?",
  [
    "Rising costs are a driver, and the confirmed exhibition is a possible trigger",
    "The exhibition date shows that rising costs were never relevant to the decision",
    "Rising costs must be the trigger because they existed before the exhibition did",
    "There can be no trigger here, because no regulator introduced a legal obligation"
  ],
  "Rising costs create continuing pressure, while the exhibition may change the urgency of investment. A trigger need not be regulatory, but its link to the funding decision should still be established."
);

  M(
  "W2O4c-02", "W2O4c", 2,
  "In a discussion about competing BPM investments, which response demonstrates the strongest analytical reasoning?",
  [
    "Use evidence, weigh competing priorities, and name the outcome funding should buy",
    "Back the proposal with the most ambitious transformation vision and the boldest slogan",
    "Reject the alternative views quickly so that the discussion reaches a decision sooner",
    "Divide the budget equally so that every pressure receives at least some attention"
  ],
  "A defensible recommendation connects evidence with a funding rationale and a measurable outcome. Slogans, dismissing alternatives or splitting the budget equally all avoid the reasoning that an informed decision requires."
);

  M(
    "W2O4c-03", "W2O4c", 3,
    "A classmate argues that a long-standing service problem must be the programme trigger because it is the organisation's most serious weakness. What is the best challenge?",
    [
      "Ask what event changed management's willingness to approve funding at that particular moment",
      "Assume that the most serious operational problem always determines the investment date",
      "Dismiss the service problem because only financial pressures can influence BPM investment",
      "Accept the argument because drivers and triggers have identical meanings"
    ],
    "A serious weakness can explain why improvement is needed without explaining why management acts now. Asking what changed the investment decision tests whether the classmate has distinguished a driver from a trigger."
  );

  TF(
    "W2O4c-04", "W2O4c", 2,
    "A strong BPM funding argument should consider reasonable alternative interpretations of the evidence rather than merely repeat the preferred conclusion.",
    true,
    "True. Evaluating alternatives helps expose assumptions and clarify why one rationale deserves priority. Repeating a conclusion without examining competing evidence does not provide a defensible organisational judgement."
  );

  DR(
    "W2O4c-05", "W2O4c", 1,
    "In a BPM funding discussion, ongoing organisational pressures are {1}, while the event that changes the decision to act is the {2}.",
    [
      ["drivers", "outcomes", "charters"],
      ["trigger", "baseline", "process owner"]
    ],
    "Drivers explain the continuing need for improvement, while the trigger explains the timing of organisational commitment. Treating them as identical obscures the rationale behind the funding decision."
  );

  DR(
    "W2O4c-06", "W2O4c", 3,
    "A defensible funding recommendation connects the available {1} with a justified priority and a {2} outcome.",
    [
      ["evidence", "publicity", "assumption"],
      ["measurable", "guaranteed", "undefined"]
    ],
    "A strong recommendation uses evidence to justify investment and identifies an outcome that can be evaluated. An unsupported assumption or undefined promise cannot establish that funding is warranted."
  );

  V(
    "W2O4c-07", "W2O4c", 2,
    "Which diagram best represents the reasoning expected when defending a BPM investment recommendation?",
    [
      [
        D.flow([
          "Case|evidence",
          "Funding|rationale",
          "Expected|outcome",
          "+Decision|defended"
        ]),
        "Evidence supports a funding rationale connected to an expected outcome"
      ],
      [
        D.flow([
          "Popular|proposal",
          "Funding|requested",
          "+Approval|assumed"
        ]),
        "Popularity is treated as sufficient justification for investment"
      ],
      [
        D.flow([
          "Technology|selected",
          "Costs|ignored",
          "+Success|promised"
        ]),
        "Technology is selected without considering resources or outcomes"
      ],
      [
        D.flow([
          "Manager|opinion",
          "Alternatives|dismissed",
          "+Decision|announced"
        ]),
        "A decision is announced without evaluating evidence or alternatives"
      ]
    ],
    "The correct diagram connects evidence, rationale, and a demonstrable outcome. The alternatives rely on popularity, technology assumptions, or unsupported managerial opinion rather than defensible analysis."
  );

  OR(
  "W2O4c-08", "W2O4c", 2,
  "Arrange your Week 2 forum activities in the order the course asks you to complete them.",
  [
    "Read the forum case and the exhibit supplied with it",
    "Post your own answer, citing the chapter, by mid-week",
    "Read your classmates' posts",
    "Reply to at least two classmates, disagreeing with at least one",
    "Read the facilitator's summary at the end of the week"
  ],
  "You must post your own answer before reading your classmates' posts, so that your first reasoning is genuinely yours. Replies come next, and the facilitator's summary is posted at the end of the week."
);

  OR(
  "W2O4c-09", "W2O4c", 3,
  "A classmate challenges your proposed BPM funding rationale. Arrange a constructive response that strengthens the analysis.",
  [
    "Identify exactly which assumption the classmate challenges",
    "Check that assumption against the case evidence",
    "Decide whether the evidence still supports your rationale",
    "Revise or reaffirm your recommendation accordingly",
    "Reply, explaining the evidence behind your final position"
  ],
  "Each step depends on the one before it, so the challenge is tested against evidence rather than dismissed. The final reply should show the evidence behind your position, because assertion without evidence earns no credit."
);

  MA(
    "W2O4c-10", "W2O4c", 2,
    "Match each statement in a hypothetical BPM discussion to the analytical role it performs.",
    [
      ["Customer complaints have increased over several years", "Identifies an ongoing driver"],
      ["A major contract introduces an immediate deadline", "Identifies a possible programme trigger"],
      ["The board should fund improved order tracking", "States a proposed investment decision"],
      ["Complete tracking information will be verified", "Specifies evidence of an expected outcome"]
    ],
    "These statements represent different stages of organisational reasoning. Distinguishing pressure, triggering events, investment decisions, and outcome evidence makes the argument more precise."
  );

  MA(
    "W2O4c-11", "W2O4c", 3,
    "Match each weakness in a forum argument to the improvement that would make it more defensible.",
    [
      ["The recommendation ignores competing priorities", "Evaluate reasonable alternative uses of funding"],
      ["The proposed trigger is unsupported", "Examine evidence linking the event to the funding decision"],
      ["The expected benefit is vague", "Define a measurable organisational outcome"],
      ["The argument assumes implementation guarantees success", "Specify how actual process performance will be verified"]
    ],
    "A strong BPM argument considers alternatives, establishes the reason for action, and defines evidence of success. Unsupported triggers and vague benefits weaken the connection between organisational problems and justified investment."
  );


  // ================================================================
  // NORMALISE TO THE WEEK 1 QUESTION SCHEMA
  //
  // Preserve the adaptive engine's existing field names.
  //
  // Each bank item receives:
  //   id, clo, lo, sec, diff, type, q, o, ans, why, rem
  //
  // The section-to-outcome mapping comes from window.ADAPTIVE.
  // The outcome-to-CLO mapping also comes from window.ADAPTIVE.
  //
  // Correct options remain first in the authored source.
  // The player is responsible for presentation shuffling.
  //
  // Every question points to the remediation for its section.
  // ================================================================

  const A = window.ADAPTIVE;
  B.forEach((x) => {
    x.lo = A.sections[x.sec].lo; x.clo = A.outcomes[x.lo].clo; x.outcome = A.outcomes[x.lo].full; x.rem = `review:${x.sec}`;
    if (x.type === "mcq" || x.type === "visual") x.ans = 0;
    if (x.type === "tf") x.o = ["True", "False"];
    if (x.type === "drop") { x.o = x.blanks; x.ans = x.blanks.map((b) => b[0]); }
    if (x.type === "order") { x.o = x.items; x.ans = x.items.slice(); }
    if (x.type === "match") { x.o = x.pairs; x.ans = x.pairs.map((p) => p[1]); }
  });
  A.bank = B;
})();
