// OPER621 · Week 4 · Question Bank
// BPM and Organisational Change
//
// Week 1 bank.js structure and normalisation preserved.
// Six question types: mcq, tf, drop, visual, order, match.
// Correct MCQ, visual, and drop answers are authored first.
// The player handles answer shuffling at runtime.
//
// Week 4 learning outcomes:
// O1: Assess the importance of change management to the success of BPM.
// O2: Analyse the sources of employee resistance to process change.
// O3: Devise solutions that reduce resistance and secure adoption.
//
// This instalment contains 11 questions each for O1a and O1b.
// Each section contains:
// 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 1 match.
// No question type exceeds 30% within either section.

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

  // CHUNK: B-O1
  // ============================================================
  // O1a · Why good process designs fail on adoption
  // CLOs: K3, S3
  // Outcome: O1
  // 12 items: 3 mcq, 3 tf, 2 drop, 2 visual, 1 order, 1 match
  // ============================================================
  M(
    "w4-O1a-01", "O1a", 1,
    "Why can a technically sound BPM redesign still fail to deliver its expected benefits?",
    [
      "People may not adopt the new way of working",
      "Every redesign raises operating costs permanently",
      "Technical improvements always lower productivity",
      "Redesigned processes cannot improve service"
    ],
    "A design describes how work should happen, but its benefits arrive only when people actually work that way. Without adoption, familiar routines continue and the benefits never materialise."
  );
  M(
    "w4-O1a-02", "O1a", 2,
    "Qasr installs kiosks that work correctly, but receptionists still check most guests in manually. What is the most defensible conclusion?",
    [
      "The technology is installed, but adoption is incomplete",
      "The programme has succeeded because the kiosks work",
      "The old process has been proven superior in every case",
      "All human assistance at reception should be removed"
    ],
    "Working technology is not the same as changed work. Qasr must find out why staff still use the old route before deciding whether the cause is design, capability or resistance."
  );
  M(
    "w4-O1a-03", "O1a", 3,
    "A university's digital approvals pass testing, yet staff keep exchanging paper forms. Which response best reflects BPM change management?",
    [
      "Find out why staff avoid it, remove real barriers, and track actual use",
      "Declare success, because the system passed every technical test",
      "Repeat the efficiency benefits until staff accept the new workflow",
      "Cancel the redesign at once, because staff have not adopted it"
    ],
    "Change management connects the process with the people who must run it. The cause of continued paper use must be diagnosed and addressed, and actual use tracked, rather than relying on technical completion or persuasion."
  );
  TF(
    "w4-O1a-04", "O1a", 1,
    "Successfully installing a redesigned process guarantees that employees will adopt it.",
    false,
    "False. Installation only makes the new arrangements available. Adoption means people actually use them, which may still require involvement, training and support."
  );
  TF(
    "w4-O1a-05", "O1a", 2,
    "People change management should run through every BPM phase rather than appear only just before implementation.",
    true,
    "True. Jeston treats people change management as a continuous essential. Starting early surfaces concerns while there is still time to act on them."
  );
  DR(
    "w4-O1a-06", "O1a", 1,
    "Process redesign describes how work {1} happen, while adoption concerns how people {2} do the work.",
    [
      ["should", "previously", "rarely"],
      ["actually", "theoretically", "occasionally"]
    ],
    "Redesign specifies the intended way of working; adoption concerns real behaviour. That gap explains why an approved diagram does not guarantee improvement."
  );
  DR(
    "w4-O1a-07", "O1a", 2,
    "In Jeston's framework, people change management is a {1} essential, not an activity left until {2}.",
    [
      ["continuous", "temporary", "technical"],
      ["implementation", "planning", "measurement"]
    ],
    "People change management runs throughout the framework. Leaving it until implementation means concerns surface when they are most expensive to fix."
  );
  V(
    "w4-O1a-08", "O1a", 2,
    "Which sequence shows genuine adoption of Qasr's redesigned check-in?",
    [
      [
        D.flow([
          "New|process",
          "Staff|prepared",
          "Staff|use it",
          "Use|measured",
          "Benefits|realised"
        ]),
        "Staff are prepared, actually use the new process, and use is measured before benefits are claimed"
      ],
      [
        D.flow([
          "New|process",
          "Kiosks|installed",
          "Go-live|declared",
          "Staff use|old way",
          "+Milestones|green"
        ]),
        "Kiosks are installed and milestones are green, but staff keep using the old way"
      ],
      [
        D.flow([
          "New|process",
          "Benefits|announced",
          "Video|shared",
          "Staff not|consulted",
          "+Launch|complete"
        ]),
        "Benefits are announced and the launch is complete, but staff were never consulted"
      ],
      [
        D.flow([
          "Old|process",
          "New|process",
          "Both|continue",
          "No|tracking",
          "Benefits|assumed"
        ]),
        "Old and new processes both continue, untracked, and benefits are simply assumed"
      ]
    ],
    "Adoption means people actually use the new process, and that use is measured. Green milestones, announcements or assumed benefits do not show that work has changed."
  );
  V(
    "w4-O1a-09", "O1a", 3,
    "Which picture correctly places people change management in the BPM framework?",
    [
      [
        D.route([], { band: true }),
        "It runs continuously beneath all ten phases"
      ],
      [
        D.route([7]),
        "It belongs only to the Implement phase"
      ],
      [
        D.route([8]),
        "It begins only in the Realise Value phase"
      ],
      [
        D.route([9]),
        "It belongs only to Sustainable Performance"
      ]
    ],
    "People change management is one of the continuous essentials. It supports people across the whole journey rather than sitting inside a single phase."
  );
  OR(
    "w4-O1a-10", "O1a", 2,
    "Put these steps in a sensible order for securing adoption of a redesigned check-in.",
    [
      "Find out how the change affects the people who do the work",
      "Involve them in examining concerns and practical requirements",
      "Prepare them with training on the process and support",
      "Introduce the process with extra help on the desk",
      "Measure actual use and act on continuing difficulties"
    ],
    "Understanding and involvement come before preparation and launch. Measuring real use afterwards shows whether the process has actually been adopted."
  );
  MA(
    "w4-O1a-11", "O1a", 2,
    "Match each concept to its meaning.",
    [
      ["Process redesign", "Defining how the work should be done"],
      ["Organisational change", "Changing roles, routines and ways of working"],
      ["Adoption", "People actually using the new process"],
      ["People change management", "Preparing and supporting people through the transition"]
    ],
    "Redesign defines the intended work; organisational change is what it does to people's routines. Adoption is real use, and people change management is how the organisation gets there."
  );
  TF(
    "w4-O1a-12", "O1a", 2,
    "If staff already agree that a new process is faster, communicating its benefits more clearly is the most effective way to raise adoption.",
    false,
    "False. At Qasr, 71% of staff already agreed the design would be faster, yet they still opposed it. When the benefit is already believed, resistance comes from other causes, so more explanation changes very little."
  );
  // ============================================================
  // O1b · The performance dip: a cost to plan for
  // CLOs: K3, S3
  // Outcome: O1
  // 12 items: 3 mcq, 2 tf, 3 drop, 2 visual, 1 order, 1 match
  // ============================================================
  M(
    "w4-O1b-01", "O1b", 1,
    "What does the performance dip describe?",
    [
      "A temporary fall in performance while people adapt to new work",
      "A permanent loss of productivity caused by any process redesign",
      "The gap between a programme's budget and its final spending",
      "A decline that happens only when new technology is faulty"
    ],
    "Performance commonly falls below the pre-change baseline while people learn, then recovers. The area below the baseline is the cost of the change itself."
  );
  M(
    "w4-O1b-02", "O1b", 2,
    "In the opening weeks, Qasr's new check-in takes longer because staff still need help with unfamiliar steps. How should management read this?",
    [
      "As a likely transition dip that needs support and monitoring",
      "As proof that the redesign can never beat the old process",
      "As a reason to return permanently to the previous process",
      "As proof that every concern came from poor communication"
    ],
    "Early slowdown is consistent with the performance dip. Management should support staff and watch the recovery, investigating only problems that persist."
  );
  M(
    "w4-O1b-03", "O1b", 3,
    "A hospital promised its board immediate gains from a new registration process, and performance fell during training. What should the programme manager have done?",
    [
      "Forecast the dip, fund support for it, and set sponsors' expectations",
      "Promised immediate gains anyway, since doubts would weaken confidence",
      "Cancelled training so staff could concentrate on registering patients",
      "Measured only the go-live date, since early performance is irrelevant"
    ],
    "A credible change plan forecasts how deep and long the dip will be and resources it. Sponsors who expect it will not mistake a learning period for failure and cancel too early."
  );
  TF(
    "w4-O1b-04", "O1b", 1,
    "A temporary performance dip proves that the redesigned process is technically defective.",
    false,
    "False. Performance usually falls while people learn. Only measurement over time separates normal adaptation from a persistent design problem."
  );
  TF(
    "w4-O1b-05", "O1b", 2,
    "Good change management can make the performance dip shallower and shorter, but cannot honestly promise to remove it.",
    true,
    "True. Preparation, temporary capacity and support reduce the dip. Learning a new way of working still costs something, so the dip should be planned for, not denied."
  );
  DR(
    "w4-O1b-06", "O1b", 1,
    "During the dip, people are adapting to {1} procedures, so performance falls before it {2}.",
    [
      ["unfamiliar", "unchanged", "abandoned"],
      ["recovers", "disappears", "stops mattering"]
    ],
    "The dip exists because new procedures need extra attention and practice. As confidence grows, performance recovers toward and beyond the old baseline."
  );
  DR(
    "w4-O1b-07", "O1b", 2,
    "A realistic plan tells sponsors the expected {1} and length of the dip and provides temporary {2} while people learn.",
    [
      ["depth", "popularity", "ownership"],
      ["support", "advertising", "automation targets"]
    ],
    "Sponsors need to know how far and how long performance may fall. Temporary support protects service while competence develops."
  );
  V(
    "w4-O1b-08", "O1b", 2,
    "Which sequence matches the transition curve from the Week 4 slides?",
    [
      [
        D.flow([
          "Change|announced",
          "Resistance",
          "!Performance|dip",
          "Exploration",
          "Commitment"
        ]),
        "Announcement, resistance, performance dip, exploration, then commitment"
      ],
      [
        D.flow([
          "Change|announced",
          "Commitment",
          "Exploration",
          "!Performance|dip",
          "Resistance"
        ]),
        "Announcement, commitment, exploration, a dip, and resistance at the end"
      ],
      [
        D.flow([
          "Change|announced",
          "+Immediate|gains",
          "Exploration",
          "Commitment",
          "+Benefits|locked in"
        ]),
        "Announcement followed by immediate gains, with no dip at any stage"
      ],
      [
        D.flow([
          "Change|announced",
          "Resistance",
          "!Performance|dip",
          "!No|recovery",
          "!Permanent|decline"
        ]),
        "Announcement, resistance and a dip that never recovers"
      ]
    ],
    "On the slide, performance moves from the announcement through resistance into the dip, then exploration, and finally commitment above the old baseline. Gains are not immediate, and the dip is not permanent."
  );
  V(
    "w4-O1b-09", "O1b", 3,
    "Which sequence is the most appropriate management response to a forecast performance dip?",
    [
      [
        D.flow([
          "Forecast|depth",
          "Fund|capacity",
          "Support|learning",
          "Measure|recovery",
          "Adjust|support"
        ]),
        "Forecast the dip, fund capacity, support learning, measure recovery and adjust"
      ],
      [
        D.flow([
          "Promise|instant gains",
          "Remove|support",
          "Performance|falls",
          "Blame|staff",
          "+Targets|restated"
        ]),
        "Promise instant gains, remove support, and blame staff when performance falls"
      ],
      [
        D.flow([
          "Launch|process",
          "Ignore|results",
          "Wait",
          "No|evaluation",
          "+Success|declared"
        ]),
        "Launch, ignore results, and declare success without evaluating anything"
      ],
      [
        D.flow([
          "Cancel|training",
          "Keep old|targets",
          "Demand|speed",
          "Learning|pressure",
          "Queues|grow"
        ]),
        "Cancel training, keep old targets and demand speed from new users"
      ]
    ],
    "A sound plan forecasts the dip, resources it, supports learning and measures recovery. That is how management separates expected adaptation from problems that need further action."
  );
  OR(
    "w4-O1b-10", "O1b", 2,
    "Put these stages of the transition curve in the order shown in Week 4.",
    [
      "The change is announced",
      "People feel uncertainty and resistance",
      "Performance dips below the baseline",
      "People explore and gain confidence with the new way",
      "Commitment brings performance above the old baseline"
    ],
    "The curve runs from announcement through resistance and the dip, then exploration and commitment. With support, performance ends above where it started."
  );
  MA(
    "w4-O1b-11", "O1b", 2,
    "Match each way of managing the dip to its main purpose.",
    [
      ["Forecast the dip", "Set realistic expectations with sponsors"],
      ["Provide temporary capacity", "Protect service while staff learn"],
      ["Offer practical support", "Build confidence and competence faster"],
      ["Measure recovery", "Separate normal learning from lasting problems"]
    ],
    "Forecasting prepares sponsors, capacity protects guests, support speeds learning, and measurement shows whether recovery is on track."
  );
  DR(
    "w4-O1b-12", "O1b", 3,
    "The performance lost while results sit below the pre-change {1} is the cost of the change itself, and a programme judged only by its worst {2} may be cancelled before benefits appear.",
    [
      ["baseline", "budget", "forecast"],
      ["week", "supplier", "department"]
    ],
    "The shaded area below the baseline is a real cost that must be planned and funded. Sponsors who see only the worst week, without a forecast, may stop the programme just before recovery."
  );
// END-BLOCK
// CHUNK: B-O2
  // ============================================================
  // O2a · What employees stand to lose
  // CLO: K3
  // Outcome: O2
  // 12 items: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 2 match
  // ============================================================
  M(
    "w4-O2a-01", "O2a", 1,
    "In the Qasr survey, 71% of front-desk staff agree the new design will be faster, yet they oppose it. What does this most strongly suggest?",
    [
      "The resistance comes from something other than doubt about the benefit",
      "Staff have misunderstood the benefits and need a clearer explanation",
      "The survey must be wrong, because people do not oppose faster work",
      "The design is certainly defective, because staff have rejected it"
    ],
    "When staff already believe the benefit, explaining it again cannot be the answer. The causes lie elsewhere: lost expertise, a real case the design fails, memory of the last programme, job fears, or no involvement."
  );
  M(
    "w4-O2a-02", "O2a", 2,
    "The Old Town supervisor says, 'We were told the last system would make our jobs easier too.' Which cause of resistance does this reflect?",
    [
      "Organisational memory of a programme that broke its promise",
      "Knowledge that the kiosk fails a specific booking case",
      "Loss of expert status as the kiosk takes visible work",
      "Normal learning difficulty during the performance dip"
    ],
    "The objection names no case in the new design. It reflects what people learned from the previous programme, which promised the same and delivered redundancies, so today's promise is heard through that memory."
  );
  M(
    "w4-O2a-03", "O2a", 3,
    "Agents who have rescued broken bookings for years oppose a kiosk that will handle most arrivals. Which loss is most likely driving them?",
    [
      "Loss of the status and expertise their colleagues value",
      "Loss of pay, because kiosks reduce every agent's salary",
      "Loss of interest in guests, because work becomes routine",
      "Loss of access to the hotel's booking system altogether"
    ],
    "Hard-won expertise gives people standing. When a machine takes over the visible part of the work, that expertise can look worthless overnight, even if the new process is better."
  );
  TF(
    "w4-O2a-04", "O2a", 1,
    "Resistance to process change is usually irrational and tells management nothing useful about the design.",
    false,
    "False. Resistance is usually rational, because people weigh what they stand to lose. It is frequently informative, and some of it reveals that the design is wrong."
  );
  TF(
    "w4-O2a-05", "O2a", 2,
    "People who had no part in shaping a process tend to feel little ownership of the result.",
    true,
    "True. At Qasr, 83% of front-desk staff said they were not consulted. No involvement is a cause of resistance in its own right, separate from the design's quality."
  );
  DR(
    "w4-O2a-06", "O2a", 1,
    "Resistance should be treated as {1} first, because some of it is telling you the {2} is wrong.",
    [
      ["data", "disloyalty", "noise"],
      ["design", "workforce", "sponsor"]
    ],
    "Treating resistance as information protects the programme. An objection may reveal a real case the design cannot handle."
  );
  DR(
    "w4-O2a-07", "O2a", 2,
    "In Exhibit 4, only {1}% of staff believed the design handles their exceptions, and {2}% said they were consulted.",
    [
      ["18", "71", "79"],
      ["11", "83", "41"]
    ],
    "Staff believed the design was faster (71%) but not that it handled exceptions (18%), and only 11% were consulted. The numbers point to design gaps and no involvement, not to misunderstanding."
  );
  V(
    "w4-O2a-08", "O2a", 2,
    "Which picture correctly shows the causes of resistance discussed in Week 4?",
    [
      [
        D.flow([
          "Lost status|or expertise",
          "Design fails|a real case",
          "Memory of|last programme",
          "No|involvement",
          "!Resistance"
        ]),
        "Lost status or expertise, a design that fails a real case, memory of the last programme, and no involvement"
      ],
      [
        D.flow([
          "Benefits|unclear",
          "Staff|confused",
          "More|explanation",
          "Understanding",
          "+Support"
        ]),
        "Resistance comes only from unclear benefits, so more explanation removes it"
      ],
      [
        D.flow([
          "Staff|disloyal",
          "Change|opposed",
          "Discipline|applied",
          "Compliance",
          "+Adoption"
        ]),
        "Resistance is disloyalty, so discipline produces adoption"
      ],
      [
        D.flow([
          "Kiosk|installed",
          "Dip|passes",
          "Resistance|ends",
          "Nothing|needed",
          "+Adoption"
        ]),
        "Resistance is only the dip and disappears on its own"
      ]
    ],
    "Week 4 traces resistance to real losses and real knowledge. Explanation, discipline or simply waiting leave those causes untouched."
  );
  V(
    "w4-O2a-09", "O2a", 3,
    "Which sequence best shows how a manager should approach the three Qasr objections?",
    [
      [
        D.flow([
          "Hear each|objection",
          "Ask what|they lose",
          "Treat it|as data",
          "Check|the design",
          "Choose|a response"
        ]),
        "Hear each objection, ask what people lose, treat it as data, check the design, then respond"
      ],
      [
        D.flow([
          "Hear|objections",
          "Label them|resistance",
          "Repeat|benefits",
          "Push|go-live",
          "+On|schedule"
        ]),
        "Label every objection as resistance and push on with the benefits message"
      ],
      [
        D.flow([
          "Hear|objections",
          "Count|supporters",
          "Majority|decides",
          "Ignore|minority",
          "+Approved"
        ]),
        "Let a majority vote decide and ignore the rest"
      ],
      [
        D.flow([
          "Hear|objections",
          "Cancel|programme",
          "Old|process",
          "No|analysis",
          "+Peace|restored"
        ]),
        "Cancel the programme without analysing any objection"
      ]
    ],
    "Each objection carries information about a loss or a design gap. Diagnosing it before responding is what separates a defect from fear, memory or exclusion."
  );
  OR(
    "w4-O2a-10", "O2a", 2,
    "Put these steps in a sensible order for understanding a front-desk objection.",
    [
      "Listen to the objection in the supervisor's own words",
      "Identify what the people raising it stand to lose",
      "Check whether it names a case the design cannot handle",
      "Separate the confirmed facts from the fears",
      "Use the findings to choose a fitting response"
    ],
    "Understanding comes before judgement. Identifying the loss and checking the design leads to a response that fits the actual cause."
  );
  MA(
    "w4-O2a-11", "O2a", 2,
    "Match each Qasr objection to its cause.",
    [
      ["Marina: no path for 30% of corporate arrivals with wrong details", "Knowledge that the design fails a real case"],
      ["Corniche: costed on four fewer agents per shift", "Fear of job loss"],
      ["Old Town: the last system promised the same", "Organisational memory"],
      ["83% of staff not consulted on the design", "No involvement"]
    ],
    "Each objection has a different cause. Grouping them by cause, not by hotel, shows that one message cannot answer them all."
  );
  MA(
    "w4-O2a-12", "O2a", 3,
    "Match each Exhibit 4 figure to what it tells the director.",
    [
      ["79% agree current check-in frustrates guests", "Nobody is defending the old process"],
      ["71% agree the new design will be faster", "The benefit is already believed"],
      ["62% say it does not handle their exceptions", "Staff see a design gap"],
      ["41% expect their role to be gone in a year", "Fear of job loss is widespread"]
    ],
    "The numbers are the argument. Staff accept that change is needed and that the design is faster, so the resistance comes from exceptions and jobs, not from misunderstanding."
  );
  // ============================================================
  // O2b · Resistance or a genuine design defect?
  // CLOs: K3, S3
  // Outcome: O2
  // 12 items: 3 mcq, 2 tf, 2 drop, 2 visual, 2 order, 1 match
  // ============================================================
  M(
    "w4-O2b-01", "O2b", 1,
    "What is a genuine design defect?",
    [
      "A real case the process cannot handle, true whoever points it out",
      "Any objection raised by an experienced member of staff",
      "A preference for keeping familiar procedures in place",
      "A temporary slowdown while people learn the new process"
    ],
    "A design defect stays true whatever the stake of the person raising it. Dissatisfaction, habit or the learning dip are not defects in themselves."
  );
  M(
    "w4-O2b-02", "O2b", 2,
    "The Marina supervisor says 30% of corporate arrivals have wrong booking details and the kiosk has no path for them. What should the director do next?",
    [
      "Check booking records to confirm the claim, then change the design if it holds",
      "Explain the kiosk's speed benefits more clearly to the Marina team",
      "Treat it as resistance, since the kiosk handles ordinary bookings well",
      "Cancel the whole redesign without looking at any booking data"
    ],
    "The claim is specific and checkable. If the records confirm it, it is a design defect that persuasion cannot fix, so the design must change."
  );
  M(
    "w4-O2b-03", "O2b", 3,
    "Which pair of questions forms the Week 4 test for separating resistance from a design defect?",
    [
      "Can real data check it, and would it hold without a personal stake?",
      "Is the objector senior, and has the objection been put in writing?",
      "Do most staff agree, and has the sponsor already approved the plan?",
      "Is the objection polite, and was it raised before the go-live date?"
    ],
    "A defect names a case that operating data can confirm, and it would still be true if the person raising it had nothing to lose. Seniority, majority or timing do not decide it."
  );
  TF(
    "w4-O2b-04", "O2b", 1,
    "Treating a genuine design defect as resistance is costly because the flaw is carried into go-live.",
    true,
    "True. If a real gap is dismissed as resistance, guests meet the flaw at the desk. That is the most expensive error the test protects against."
  );
  TF(
    "w4-O2b-05", "O2b", 2,
    "Because the Old Town objection names no checkable case, it can safely be ignored.",
    false,
    "False. It fails the data test, so it is not a defect, but it is rational resistance about trust. It still needs a real answer, such as co-design and fewer, better-spaced changes."
  );
  DR(
    "w4-O2b-06", "O2b", 1,
    "An objection is a design defect when it names a case that real {1} can check and would hold even without a personal {2}.",
    [
      ["data", "opinion", "seniority"],
      ["stake", "title", "budget"]
    ],
    "The two parts of the test are checkability against data and independence from the objector's own interest."
  );
  DR(
    "w4-O2b-07", "O2b", 2,
    "The Corniche objection about four fewer agents per shift is not a design {1}, because the process would work either way; it is rational {2}.",
    [
      ["defect", "benefit", "milestone"],
      ["resistance", "adoption", "commitment"]
    ],
    "The staffing assumption can be checked, but it does not show the check-in flow failing a case. It is fear of job loss, which deserves a straight answer."
  );
  V(
    "w4-O2b-08", "O2b", 2,
    "Which sequence correctly tests the Marina objection?",
    [
      [
        D.flow([
          "Specific|claim",
          "Pull booking|records",
          "Count wrong|details",
          "Compare|with 30%",
          "Verdict"
        ]),
        "State the claim, pull the records, count the cases, compare with 30%, then decide"
      ],
      [
        D.flow([
          "Claim|raised",
          "Repeat|benefits",
          "Supervisor|persuaded",
          "+Claim|withdrawn",
          "+Go-live"
        ]),
        "Repeat the benefits until the supervisor withdraws the claim"
      ],
      [
        D.flow([
          "Claim|raised",
          "Check|seniority",
          "Judge the|person",
          "+Label|resistance",
          "+Proceed"
        ]),
        "Judge the person raising it and label the claim resistance"
      ],
      [
        D.flow([
          "Claim|raised",
          "Delay",
          "Go-live",
          "Wait for|complaints",
          "+Fix|later"
        ]),
        "Wait for guest complaints after go-live and fix things then"
      ]
    ],
    "A checkable claim should be checked before go-live. Persuasion, judging the person or waiting for complaints all risk launching a known flaw."
  );
  V(
    "w4-O2b-09", "O2b", 3,
    "Which picture shows the trap the Qasr director nearly fell into?",
    [
      [
        D.flow([
          "Three|objections",
          "!All treated as|misunderstanding",
          "!Communicate|benefits",
          "!Defect|goes live",
          "!Resistance|remains"
        ]),
        "Every objection is treated as misunderstanding, so a defect goes live and resistance remains"
      ],
      [
        D.flow([
          "Three|objections",
          "Test|each one",
          "Defect|found",
          "Design|changed",
          "Fear|answered"
        ]),
        "Each objection is tested, the defect is fixed and the fear is answered"
      ],
      [
        D.flow([
          "Three|objections",
          "Group by|cause",
          "Match|responses",
          "State|costs",
          "Track|adoption"
        ]),
        "Objections are grouped by cause and matched to costed responses"
      ],
      [
        D.flow([
          "Three|objections",
          "Co-design|exceptions",
          "Written|position",
          "Fewer|changes",
          "Adoption|rises"
        ]),
        "Co-design, a written position and fewer changes lift adoption"
      ]
    ],
    "The advice to communicate the benefits more clearly assumes every objection is a misunderstanding. With 71% already believing the benefit, that path carries the Marina defect into go-live."
  );
  OR(
    "w4-O2b-10", "O2b", 2,
    "Put these steps in order for applying the resistance-or-defect test.",
    [
      "Write down the objection exactly as raised",
      "Ask whether it names a case that data can check",
      "Gather the operating data and check the claim",
      "Ask whether it would hold without a personal stake",
      "Classify it as a defect or as resistance and respond"
    ],
    "The test moves from the claim to the data, then to the question of personal stake. Only then is the objection classified and answered."
  );
  OR(
    "w4-O2b-11", "O2b", 3,
    "Put the Marina case in the order the director should handle it.",
    [
      "The supervisor reports the 30% of corporate arrivals with wrong details",
      "The director pulls last month's corporate booking records",
      "The records confirm a large share with wrong details",
      "The director adds a staffed path for those arrivals",
      "The director explains publicly why the design changed"
    ],
    "A confirmed defect is fixed in the design, and the change is explained publicly so staff see that raising a real problem changes things."
  );
  MA(
    "w4-O2b-12", "O2b", 2,
    "Match each Qasr objection to the verdict the test gives.",
    [
      ["Marina: no kiosk path for wrong corporate bookings", "Design defect: checkable and true whoever raises it"],
      ["Corniche: four fewer agents per shift", "Rational resistance: fear of job loss"],
      ["Old Town: the last system promised the same", "Resistance about trust: names no checkable case"],
      ["Staff say they were never consulted", "Resistance from no involvement"]
    ],
    "Only the Marina claim is a defect. The others are rational resistance, and each still needs its own real answer."
  );
  // ============================================================
  // O2c · Match the response to the cause
  // CLOs: K3, S3
  // Outcome: O2
  // 12 items: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 2 match
  // ============================================================
  M(
    "w4-O2c-01", "O2c", 1,
    "What does Week 4 say works when staff fear losing their jobs?",
    [
      "An explicit, written redeployment position",
      "Reassurance that nobody needs to worry",
      "A launch event celebrating the new process",
      "Extra training on the new kiosk screens"
    ],
    "Reassurance without commitment leaves the fear untouched. A written redeployment position states what happens to each affected person, and ambiguity does more damage than bad news."
  );
  M(
    "w4-O2c-02", "O2c", 2,
    "The agents who rescue broken bookings fear their expertise will no longer matter. Which response fits that cause?",
    [
      "Give them a role in designing the new standard for exception handling",
      "Send them on more training, so they learn the kiosk screens properly",
      "Remind them that the kiosk will cut check-in time to five minutes",
      "Exclude them from design work, since they have already objected"
    ],
    "For lost status or expertise, more training is the response that fails because it treats experts as beginners. A design role turns their know-how into part of the new process."
  );
  M(
    "w4-O2c-03", "O2c", 3,
    "After three systems in two years, Old Town staff are worn out by change. Which response fits?",
    [
      "Fewer, larger, better-spaced changes",
      "Another launch event to rebuild energy",
      "A newsletter explaining the next system",
      "Faster rollout so the change ends sooner"
    ],
    "Change fatigue is answered by fewer, larger, better-spaced changes, so people can absorb one before the next arrives. Another launch event confirms the suspicion that it is the same show again."
  );
  TF(
    "w4-O2c-04", "O2c", 1,
    "When staff had no involvement in a design, a well-produced communication campaign is the right fix.",
    false,
    "False. A campaign tells people more but gives them no ownership. No involvement is answered by co-design with the people doing the work."
  );
  TF(
    "w4-O2c-05", "O2c", 2,
    "When the design is genuinely flawed, the director should change it and say publicly why.",
    true,
    "True. Persuasion cannot repair a missing path. Explaining the change publicly also shows staff that raising a real problem leads to action."
  );
  DR(
    "w4-O2c-06", "O2c", 1,
    "Fear of job loss calls for an explicit, written {1} position, while no involvement calls for {2}, not a communication campaign.",
    [
      ["redeployment", "marketing", "training"],
      ["co-design", "newsletters", "discipline"]
    ],
    "Each cause has its own working response. Commitments in writing answer job fear; real influence over the design answers exclusion."
  );
  DR(
    "w4-O2c-07", "O2c", 2,
    "For lost expert status, more {1} does not work; what works is a role in designing the new {2}.",
    [
      ["training", "co-design", "recognition"],
      ["standard", "poster", "budget"]
    ],
    "Training experts as beginners deepens the insult. Involving them in the new standard keeps their knowledge valued and improves the design."
  );
  V(
    "w4-O2c-08", "O2c", 2,
    "Which picture correctly matches each cause to the response that works?",
    [
      [
        D.flow([
          "Flawed design|change it",
          "Lost expertise|design role",
          "Job fear|written position",
          "Fatigue|space changes",
          "No voice|co-design"
        ]),
        "Change the design, give a design role, write a position, space the changes, co-design"
      ],
      [
        D.flow([
          "Flawed design|persuade",
          "Lost expertise|train more",
          "Job fear|reassure",
          "Fatigue|launch event",
          "+No voice|campaign"
        ]),
        "Persuade, train more, reassure, hold a launch event, run a campaign"
      ],
      [
        D.flow([
          "Flawed design|ignore",
          "Lost expertise|ignore",
          "Job fear|ignore",
          "Fatigue|ignore",
          "+Go-live|on time"
        ]),
        "Ignore every cause and go live on time"
      ],
      [
        D.flow([
          "Every cause|one message",
          "Video",
          "Posters",
          "Town hall",
          "+Done"
        ]),
        "Answer every cause with one message, a video, posters and a town hall"
      ]
    ],
    "Each cause has a response that fails and a response that works. Only the matched responses change something real for the people resisting."
  );
  V(
    "w4-O2c-09", "O2c", 3,
    "Which sequence shows the wrong way to answer the Corniche fear of job loss?",
    [
      [
        D.flow([
          "Job fear|raised",
          "!Nobody needs|to worry",
          "!Nothing|written",
          "!Rumours|spread",
          "!Fear|grows"
        ]),
        "Verbal reassurance, nothing written, and the fear grows"
      ],
      [
        D.flow([
          "Job fear|raised",
          "Check|business case",
          "Write|position",
          "Name|destinations",
          "Publish|early"
        ]),
        "Check the business case and publish a written position early"
      ],
      [
        D.flow([
          "Job fear|raised",
          "Say|so openly",
          "Redeploy|in writing",
          "Answer|questions",
          "Trust|rebuilt"
        ]),
        "Say so openly, commit in writing and answer questions"
      ],
      [
        D.flow([
          "Job fear|raised",
          "Confirm|the 4 roles",
          "State where|they go",
          "Put it|in writing",
          "Fear|addressed"
        ]),
        "Confirm the roles, say where people go and put it in writing"
      ]
    ],
    "Reassurance without commitment is the response that does not work. People fill silence with the worst outcome, so the fear grows."
  );
  OR(
    "w4-O2c-10", "O2c", 2,
    "Put these steps in order for responding to resistance at Qasr.",
    [
      "Diagnose the cause of each objection",
      "Choose the response that works for that cause",
      "State what each response will cost",
      "Carry out the responses well before go-live",
      "Track adoption to see whether they worked"
    ],
    "Diagnosis decides the response. Stating costs makes the plan approvable, and tracking adoption shows whether it changed behaviour."
  );
  MA(
    "w4-O2c-11", "O2c", 2,
    "Match each cause of resistance to the response that does NOT work.",
    [
      ["Fear of job loss", "Reassurance without commitment"],
      ["Loss of expert status", "More training"],
      ["Change fatigue", "Another launch event"],
      ["No involvement", "A communication campaign"]
    ],
    "These are the tempting, cheap responses. Each one leaves its cause untouched, which is why they fail."
  );
  MA(
    "w4-O2c-12", "O2c", 3,
    "Match each cause of resistance to the response that works.",
    [
      ["Design genuinely flawed", "Change the design and say publicly why"],
      ["Loss of expert status", "A role in designing the new standard"],
      ["Fear of job loss", "An explicit, written redeployment position"],
      ["Change fatigue", "Fewer, larger, better-spaced changes"]
    ],
    "Every working response changes something real: a design, a role, a commitment or a schedule. That is why they work where messages do not."
  );
// END-BLOCK
// CHUNK: B-O3abc
  // ============================================================
  // O3a · The stakeholder power–interest grid
  // CLOs: K3, S3
  // Outcome: O3
  // 12 items: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 2 match
  // ============================================================
  M(
    "w4-O3a-01", "O3a", 1,
    "On the power–interest grid, what does 'power' mean?",
    [
      "How much someone can affect the outcome, including blocking it",
      "How senior someone appears on the organisation chart alone",
      "How strongly someone supports the change at the moment",
      "How many people someone manages in their own department"
    ],
    "Power is the ability to affect the outcome, through authority, budget, approval or the ability to block. Job title alone can mislead, because informal influence also counts."
  );
  M(
    "w4-O3a-02", "O3a", 2,
    "At Qasr, legal rarely deals with check-in but can refuse to approve how the kiosk handles identity documents. Where does legal sit on the grid?",
    [
      "Keep satisfied: high power, lower interest",
      "Manage closely: high power, high interest",
      "Keep informed: lower power, high interest",
      "Monitor: low power, low interest"
    ],
    "Legal has the power to stop the programme but little day-to-day interest in check-in. That is the keep satisfied corner, where a late objection can stop everything."
  );
  M(
    "w4-O3a-03", "O3a", 3,
    "The Marina supervisor has little formal authority, but her whole shift follows her lead. How should the director treat her on the grid?",
    [
      "Recognise her informal power and engage her more closely than her title suggests",
      "Place her strictly by job title, because the grid uses formal authority only",
      "Leave her off the grid, because supervisors are not real stakeholders",
      "Move her to monitor, because she has already objected in writing"
    ],
    "Power includes informal influence. If she stays opposed, her shift may drift back to the old routine, so placing people honestly needs judgement about real influence."
  );
  TF(
    "w4-O3a-04", "O3a", 1,
    "The power–interest grid decides how much engagement each group needs, not whose concerns deserve respect.",
    true,
    "True. The grid sorts attention, not respect. Everyone's concerns still deserve an honest hearing, but effort goes where it counts most."
  );
  TF(
    "w4-O3a-05", "O3a", 2,
    "Because front-line staff have little formal power, a newsletter is enough to keep them informed.",
    false,
    "False. Front-line staff do the work. Keeping them informed means consulting them on the design and explaining decisions, not a one-way newsletter."
  );
  DR(
    "w4-O3a-06", "O3a", 1,
    "The grid places stakeholders by their {1} against their {2}, and the engagement plan differs by quadrant.",
    [
      ["power", "salary", "age"],
      ["interest", "loyalty", "location"]
    ],
    "Power is the ability to affect the outcome; interest is how much the change touches their own work or worries. Together they decide the engagement each group needs."
  );
  DR(
    "w4-O3a-07", "O3a", 2,
    "At Qasr, the COO and the process owner sit in {1}, while the external auditor sits in {2}.",
    [
      ["manage closely", "monitor", "keep satisfied"],
      ["monitor", "manage closely", "keep informed"]
    ],
    "The COO and process owner have high power and high interest, so they shape the outcome. The auditor is low on both for this programme, so periodic updates are enough."
  );
  V(
    "w4-O3a-08", "O3a", 2,
    "Which sequence shows a sound way to build a stakeholder grid?",
    [
      [
        D.flow([
          "List|stakeholders",
          "Judge real|power",
          "Judge|interest",
          "Place on|the grid",
          "Plan|engagement"
        ]),
        "List stakeholders, judge real power and interest, place them, then plan engagement"
      ],
      [
        D.flow([
          "Copy the|org chart",
          "Rank by|title",
          "Skip|interest",
          "One|message",
          "+Send to|all"
        ]),
        "Copy the organisation chart, rank by title and send one message to all"
      ],
      [
        D.flow([
          "List|supporters",
          "Ignore|critics",
          "Place|supporters",
          "Engage|supporters",
          "+Grid|complete"
        ]),
        "Place only supporters and ignore critics"
      ],
      [
        D.flow([
          "Plan|engagement",
          "Send|messages",
          "Then list|stakeholders",
          "Then judge|power",
          "+Grid|filed"
        ]),
        "Plan and send messages before listing or judging anyone"
      ]
    ],
    "Engagement should follow an honest placement on both axes. Titles alone, ignoring critics, or engaging before analysing all waste effort where it counts."
  );
  V(
    "w4-O3a-09", "O3a", 3,
    "Which picture correctly pairs each quadrant with its engagement need?",
    [
      [
        D.flow([
          "Manage closely|co-design",
          "Keep satisfied|manage expectations",
          "Keep informed|consult and explain",
          "Monitor|periodic updates",
          "Effort where|it counts"
        ]),
        "Co-design, manage expectations, consult and explain, periodic updates"
      ],
      [
        D.flow([
          "Manage closely|newsletter",
          "Keep satisfied|ignore",
          "Keep informed|co-design",
          "Monitor|weekly meetings",
          "+Effort|everywhere"
        ]),
        "Newsletter, ignore, co-design, weekly meetings"
      ],
      [
        D.flow([
          "Manage closely|monitor",
          "Keep satisfied|consult",
          "Keep informed|ignore",
          "Monitor|co-design",
          "+Plan|done"
        ]),
        "Monitor, consult, ignore, co-design"
      ],
      [
        D.flow([
          "All four|same email",
          "Same|depth",
          "Same|channel",
          "Same|timing",
          "+Fair to|all"
        ]),
        "The same email, depth, channel and timing for all four quadrants"
      ]
    ],
    "Each quadrant needs a different depth of engagement. Treating them identically spends effort where it matters least and neglects where it matters most."
  );
  OR(
    "w4-O3a-10", "O3a", 2,
    "Put these steps in order for building and using a stakeholder grid at Qasr.",
    [
      "List everyone who can affect the change or is affected by it",
      "Judge each one's real power, including informal influence",
      "Judge how much the change touches each one's own work",
      "Place each stakeholder in a quadrant",
      "Plan the engagement each quadrant needs"
    ],
    "Analysis comes before engagement. Judging real power, not just titles, and real interest decides the quadrant, and the quadrant decides the engagement."
  );
  MA(
    "w4-O3a-11", "O3a", 2,
    "Match each Qasr stakeholder to their quadrant at the start of the programme.",
    [
      ["The COO and the process owner", "Manage closely"],
      ["Legal", "Keep satisfied"],
      ["The front-line staff", "Keep informed"],
      ["The external auditor", "Monitor"]
    ],
    "Placement follows power and interest at this moment. Positions can change later, which is why the grid is revisited."
  );
  MA(
    "w4-O3a-12", "O3a", 3,
    "Match each quadrant to the risk of getting it wrong.",
    [
      ["Manage closely", "They shape the outcome without you"],
      ["Keep satisfied", "A late objection stops everything"],
      ["Keep informed", "The people doing the work feel excluded"],
      ["Monitor", "Effort is wasted where it counts least"]
    ],
    "Each quadrant has its own failure mode. Knowing the risk explains why the engagement plan differs by quadrant."
  );
  // ============================================================
  // O3b · Four engagement strategies
  // CLOs: K3, S3
  // Outcome: O3
  // 12 items: 3 mcq, 2 tf, 2 drop, 2 visual, 2 order, 1 match
  // ============================================================
  M(
    "w4-O3b-01", "O3b", 1,
    "What does 'manage closely' mean in practice?",
    [
      "Co-design and frequent contact, because they shape the outcome",
      "A short note at each milestone, because they rarely need detail",
      "Periodic updates with minimal effort, to save time for others",
      "A newsletter, because they are already persuaded of the benefit"
    ],
    "High-power, high-interest stakeholders shape the outcome. They should help design the change and hear about trade-offs early, not just be told about them."
  );
  M(
    "w4-O3b-02", "O3b", 2,
    "The director visits the Corniche desk, asks what still breaks, then explains which suggestions changed the design and why. Which strategy is this?",
    [
      "Keep informed: consult on the design and explain decisions",
      "Keep satisfied: manage expectations to prevent a late objection",
      "Monitor: send periodic updates with minimal effort",
      "Manage closely: delegate the design to the sponsor"
    ],
    "Front-line staff do the work. Consulting them and explaining decisions in both directions is what keep informed means, and it is very different from a one-way newsletter."
  );
  M(
    "w4-O3b-03", "O3b", 3,
    "The director sends legal a brief note in week one on how the kiosk stores identity data. Why is this good practice?",
    [
      "It answers legal's likely question early, so no late objection stops go-live",
      "It keeps legal fully involved in co-designing every check-in step",
      "It replaces any need to consult the front-line staff on the design",
      "It hides open problems from legal until after the go-live date"
    ],
    "Keep satisfied means managing expectations honestly and early. The same question raised in week ten could freeze the launch, and hiding problems would collapse confidence later."
  );
  TF(
    "w4-O3b-04", "O3b", 1,
    "Sending one identical message to every stakeholder is an efficient form of engagement.",
    false,
    "False. Each quadrant needs a different purpose, depth and channel. One message for everyone wastes effort where it counts."
  );
  TF(
    "w4-O3b-05", "O3b", 2,
    "For the monitor quadrant, periodic updates and minimal effort are a deliberate choice, not neglect.",
    true,
    "True. Saving effort on low-power, low-interest stakeholders frees time for the corners that decide adoption."
  );
  DR(
    "w4-O3b-06", "O3b", 1,
    "Keep satisfied means managing {1} early, because a {2} objection from that corner can stop everything.",
    [
      ["expectations", "salaries", "workarounds"],
      ["late", "minor", "anonymous"]
    ],
    "High-power stakeholders with low interest may only engage near the end. Early, honest expectation management prevents a late objection."
  );
  DR(
    "w4-O3b-07", "O3b", 2,
    "Co-design means the people in the room are {1} the process together, rather than {2} finished slides.",
    [
      ["changing", "observing", "auditing"],
      ["approving", "writing", "designing"]
    ],
    "Co-design gives real influence over decisions. A workshop that only approves a finished plan is not co-design."
  );
  V(
    "w4-O3b-08", "O3b", 2,
    "Which week of engagement best matches the four strategies?",
    [
      [
        D.flow([
          "Sun|co-design with COO",
          "Mon|brief legal early",
          "Tue|consult the desk",
          "Thu|update auditor",
          "Effort where|it counts"
        ]),
        "Co-design with the sponsor, brief legal early, consult the desk, update the auditor"
      ],
      [
        D.flow([
          "Sun|email all",
          "Mon|email all",
          "Tue|email all",
          "Thu|email all",
          "+Everyone|informed"
        ]),
        "Email everyone the same message every day"
      ],
      [
        D.flow([
          "Sun|co-design with auditor",
          "Mon|ignore legal",
          "Tue|newsletter to desk",
          "Thu|brief COO",
          "+Week|done"
        ]),
        "Co-design with the auditor, ignore legal, and only brief the COO"
      ],
      [
        D.flow([
          "Sun|no meetings",
          "Mon|no meetings",
          "Tue|wait",
          "Thu|go-live memo",
          "+Launch"
        ]),
        "No engagement until a go-live memo"
      ]
    ],
    "The director's calendar follows the grid: deepest engagement with those who shape the outcome, early expectation management for legal, consultation for staff and light updates for the auditor."
  );
  V(
    "w4-O3b-09", "O3b", 3,
    "Which picture shows the difference between a newsletter and keep informed?",
    [
      [
        D.flow([
          "Ask what|still breaks",
          "Record|answers",
          "Change|the design",
          "Explain|decisions",
          "Staff|shape it"
        ]),
        "Ask, record, change the design, and explain decisions back to staff"
      ],
      [
        D.flow([
          "Write|newsletter",
          "Send|to staff",
          "No|replies",
          "No|changes",
          "+Staff|informed"
        ]),
        "Write and send a newsletter, with no replies and no changes"
      ],
      [
        D.flow([
          "Decide|design",
          "Announce|it",
          "Post|on wall",
          "Close|questions",
          "+Done"
        ]),
        "Decide, announce, post it and close questions"
      ],
      [
        D.flow([
          "Survey|staff",
          "File|results",
          "Ignore|them",
          "Launch",
          "+Consulted"
        ]),
        "Survey staff, file the results and ignore them"
      ]
    ],
    "Keep informed works in both directions: staff knowledge reaches the design, and decisions return with reasons. A one-way message or an ignored survey does neither."
  );
  OR(
    "w4-O3b-10", "O3b", 2,
    "Put these steps in order for consulting the front desk properly.",
    [
      "Show staff the current design",
      "Ask what still breaks in their real cases",
      "Record every answer in front of them",
      "Change the design where the evidence supports it",
      "Explain which suggestions changed it and why others did not"
    ],
    "Consultation moves from showing to asking, recording and acting. Explaining the decisions closes the loop, because staff accept a reasoned no far more easily than silence."
  );
  OR(
    "w4-O3b-11", "O3b", 3,
    "Put these steps in order for keeping legal satisfied at Qasr.",
    [
      "Anticipate the question legal is most likely to ask",
      "Write a short, honest note that answers it",
      "Send it early, long before go-live is booked",
      "Check again with legal at each milestone",
      "Reach go-live with no late objection"
    ],
    "Keep satisfied means managing expectations early and honestly. Answering the likely question in advance is what prevents a late objection from stopping everything."
  );
  MA(
    "w4-O3b-12", "O3b", 2,
    "Match each strategy to what it looks like in practice.",
    [
      ["Manage closely", "Co-design sessions and frequent contact"],
      ["Keep satisfied", "An early, honest note answering their likely question"],
      ["Keep informed", "Consult on the design and explain decisions"],
      ["Monitor", "A short periodic update"]
    ],
    "Each strategy has its own purpose, depth and channel. That is why the director's calendar looks different for each group."
  );
  // ============================================================
  // O3c · Stakeholders move: revisit the grid
  // CLOs: K3, S3
  // Outcome: O3
  // 12 items: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 2 match
  // ============================================================
  M(
    "w4-O3c-01", "O3c", 1,
    "When should the stakeholder grid be re-run?",
    [
      "At every phase boundary of the programme",
      "Only once, at the programme kickoff",
      "Only when a stakeholder complains formally",
      "Only after go-live, to record who helped"
    ],
    "Power and interest move as the programme becomes real. Re-running the grid at each phase boundary catches movement before it becomes a late objection."
  );
  M(
    "w4-O3c-02", "O3c", 2,
    "At Qasr, the finance director sat in keep satisfied at kickoff. At month four, invoicing comes into scope. What should happen?",
    [
      "Finance moves to manage closely, and engagement shifts to co-design",
      "Finance stays in keep satisfied, because placement is fixed at kickoff",
      "Finance moves to monitor, because invoicing is not about check-in",
      "Finance is removed from the grid until the invoicing work is complete"
    ],
    "When their own process comes into scope, interest rises sharply and the stakeholder moves. Engagement must change with them, from a periodic briefing to co-design."
  );
  M(
    "w4-O3c-03", "O3c", 3,
    "Finance keeps receiving the same monthly summary, and objects just before go-live to invoicing steps designed without them. What went wrong?",
    [
      "Nobody noticed that finance had moved on the grid when invoicing entered scope",
      "Finance was placed in keep satisfied at kickoff, which was a wrong judgement",
      "The monthly summaries were too long, so finance stopped reading them",
      "Finance should have been placed in monitor and given minimal updates"
    ],
    "The kickoff placement was sound. The failure was treating it as fixed. Failing to notice that a stakeholder has moved is how late objections arrive."
  );
  TF(
    "w4-O3c-04", "O3c", 1,
    "A stakeholder's position on the grid is a snapshot, not a fixed attribute.",
    true,
    "True. Position describes one moment. Power and interest change as scope widens and the programme becomes real."
  );
  TF(
    "w4-O3c-05", "O3c", 2,
    "Once the grid has been redrawn, the engagement plan can stay the same.",
    false,
    "False. A redrawn grid matters only when engagement changes with it. Otherwise the redrawing achieves nothing."
  );
  DR(
    "w4-O3c-06", "O3c", 1,
    "Stakeholder position is a {1}, not an attribute, so the grid is re-run at every phase {2}.",
    [
      ["snapshot", "contract", "ranking"],
      ["boundary", "meeting", "budget"]
    ],
    "Phase boundaries are when scope widens and new people feel the change, so they are the natural moments to look again."
  );
  DR(
    "w4-O3c-07", "O3c", 2,
    "When a stakeholder's own process comes into scope, their {1} rises sharply; failing to notice this is how {2} objections arrive.",
    [
      ["interest", "salary", "seniority"],
      ["late", "polite", "anonymous"]
    ],
    "Finance's interest rose when invoicing entered scope. Missing that movement lets the design be settled without them, and the objection arrives late."
  );
  V(
    "w4-O3c-08", "O3c", 2,
    "Which sequence shows the finance director's correct movement at Qasr?",
    [
      [
        D.flow([
          "Keep|satisfied",
          "Invoicing|in scope",
          "Interest|rises",
          "Manage|closely",
          "Co-design"
        ]),
        "Keep satisfied, invoicing enters scope, interest rises, manage closely, co-design"
      ],
      [
        D.flow([
          "Keep|satisfied",
          "Invoicing|in scope",
          "Same|summary",
          "!Design|settled",
          "!Late|objection"
        ]),
        "Keep satisfied with the same summary, leading to a late objection"
      ],
      [
        D.flow([
          "Manage|closely",
          "Invoicing|in scope",
          "Interest|falls",
          "Monitor",
          "+Fewer|meetings"
        ]),
        "Manage closely, then down to monitor when invoicing enters scope"
      ],
      [
        D.flow([
          "Monitor",
          "Invoicing|in scope",
          "Still|monitor",
          "Periodic|update",
          "+No|change"
        ]),
        "Monitor throughout, with no change when invoicing enters scope"
      ]
    ],
    "Finance began in keep satisfied. When invoicing came into scope at month four, interest rose and finance moved to manage closely, so engagement became co-design."
  );
  V(
    "w4-O3c-09", "O3c", 3,
    "Which sequence shows the right routine at each phase boundary?",
    [
      [
        D.flow([
          "Phase|ends",
          "Re-run|the grid",
          "Spot who|moved",
          "Adjust|engagement",
          "Next|phase"
        ]),
        "Phase ends, re-run the grid, spot who moved, adjust engagement, next phase"
      ],
      [
        D.flow([
          "Phase|ends",
          "Keep kickoff|grid",
          "Same|messages",
          "Next|phase",
          "+On|plan"
        ]),
        "Keep the kickoff grid and send the same messages"
      ],
      [
        D.flow([
          "Phase|ends",
          "Re-run|the grid",
          "Spot who|moved",
          "File|the grid",
          "+Same|engagement"
        ]),
        "Re-run the grid and spot movement, but keep the same engagement"
      ],
      [
        D.flow([
          "Phase|ends",
          "Wait for|complaints",
          "React",
          "Next|phase",
          "+Grid|unchanged"
        ]),
        "Wait for complaints and react, leaving the grid unchanged"
      ]
    ],
    "The routine only pays off when engagement changes with the grid. Filing a redrawn grid or waiting for complaints leaves movement unanswered."
  );
  OR(
    "w4-O3c-10", "O3c", 2,
    "Put the finance director's story at Qasr in order.",
    [
      "At kickoff, finance is placed in keep satisfied",
      "At month four, invoicing comes into scope",
      "Finance's interest rises sharply",
      "The grid is re-run at the phase boundary",
      "Engagement shifts to co-design of the invoicing steps"
    ],
    "Scope moves, interest rises, and the phase-boundary re-run catches it. Engagement then changes to match the new position."
  );
  MA(
    "w4-O3c-11", "O3c", 2,
    "Match each change to the movement it causes on the grid.",
    [
      ["A stakeholder's own process enters scope", "Interest rises; engage more closely"],
      ["A stakeholder's process leaves scope", "Interest falls; drift toward monitor"],
      ["Colleagues start following a supervisor's lead", "Informal power grows"],
      ["The grid is redrawn but nothing else changes", "No benefit from the redrawing"]
    ],
    "Movement can go up or down, and power can be informal. Each movement matters only if engagement changes with it."
  );
  MA(
    "w4-O3c-12", "O3c", 3,
    "Match each idea to its meaning.",
    [
      ["Snapshot", "Position at one moment, not a fixed attribute"],
      ["Phase boundary", "Where one stage ends and the next begins"],
      ["Late objection", "What arrives when movement goes unnoticed"],
      ["Re-running the grid", "Placing stakeholders again and adjusting engagement"]
    ],
    "These ideas explain why the grid is a recurring tool rather than a one-off kickoff exercise."
  );
// END-BLOCK
// CHUNK: B-O3de
  // ============================================================
  // O3d · Adoption, workarounds and parallel processes
  // CLOs: K3, S3
  // Outcome: O3
  // 12 items: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 2 match
  // ============================================================
  M(
    "w4-O3d-01", "O3d", 1,
    "What does Week 4 mean by 'adoption is a measure, not a feeling'?",
    [
      "Track the proportion of real cases through the new process, weekly, from day one",
      "Ask managers each month whether staff seem positive about the new process",
      "Count how many staff attended training before the go-live date",
      "Record the date on which the new system was switched on"
    ],
    "Seeming positive cannot show how work is actually done. Adoption is the share of real cases running through the new process, measured weekly from the start."
  );
  M(
    "w4-O3d-02", "O3d", 2,
    "A Marina agent types a corporate guest's details by hand because the kiosk rejects the booking. How should the director read this workaround?",
    [
      "As a design defect reporting itself, to be tracked and fixed",
      "As disobedience that calls for a disciplinary warning",
      "As proof that the agent misunderstood the kiosk's benefits",
      "As a normal habit that will fade without any action"
    ],
    "A workaround shows exactly where the process failed a real case. Tracking it explicitly turns it into evidence for the improvement backlog instead of hiding it through punishment."
  );
  M(
    "w4-O3d-03", "O3d", 3,
    "Sixteen weeks after go-live, Qasr's adoption has plateaued at about 65%. What does this mean?",
    [
      "Two processes are running at once, and will keep doing so without action",
      "The programme is nearly there and can now be closed as a success",
      "The remaining 35% of cases will move to the new process unaided",
      "Adoption has peaked, so effort should shift to the next programme"
    ],
    "A plateau at 65% is not nearly there. It means a third of cases still use the old process, so Qasr pays for two processes indefinitely and the benefits never fully arrive."
  );
  TF(
    "w4-O3d-04", "O3d", 1,
    "Adoption should be reported to the sponsor alongside delivery milestones.",
    true,
    "True. Otherwise the programme will look finished when it is not, because every delivery milestone can be green while many cases still use the old process."
  );
  TF(
    "w4-O3d-05", "O3d", 2,
    "In the Week 4 chart, workarounds settle at zero within a few weeks of go-live.",
    false,
    "False. Workarounds peaked near 42% and settled near 9%, not zero. The remaining workarounds point to cases the design still does not handle."
  );
  DR(
    "w4-O3d-06", "O3d", 1,
    "Every workaround is a design {1} reporting itself, so workarounds should be tracked {2}.",
    [
      ["defect", "success", "budget"],
      ["explicitly", "occasionally", "anonymously"]
    ],
    "A workaround shows where the official process does not fit a real case. Explicit tracking makes that evidence visible and actionable."
  );
  DR(
    "w4-O3d-07", "O3d", 2,
    "In the Week 4 chart, workarounds peak near {1}% and settle near {2}%.",
    [
      ["42", "65", "9"],
      ["9", "42", "65"]
    ],
    "Workarounds peak early near 42% and settle around 9%, while adoption plateaus at about 65%."
  );
  V(
    "w4-O3d-08", "O3d", 2,
    "Which sequence shows what happens when adoption stalls and nobody acts?",
    [
      [
        D.flow([
          "Go-live",
          "Adoption|rises",
          "!Plateau|at 65%",
          "!Old process|survives",
          "!Two processes|indefinitely"
        ]),
        "Adoption rises, plateaus at 65%, and the old process survives beside the new one"
      ],
      [
        D.flow([
          "Go-live",
          "Adoption|rises",
          "Plateau|at 65%",
          "Old process|fades",
          "+Full|adoption"
        ]),
        "Adoption plateaus, but the old process fades on its own to full adoption"
      ],
      [
        D.flow([
          "Go-live",
          "Instant|100%",
          "No|workarounds",
          "Benefits|arrive",
          "+Programme|closed"
        ]),
        "Adoption reaches 100% at once with no workarounds"
      ],
      [
        D.flow([
          "Go-live",
          "Adoption|falls",
          "Old process|only",
          "New process|switched off",
          "+Back to|start"
        ]),
        "Adoption falls and the new process is switched off"
      ]
    ],
    "A plateau left alone does not resolve itself. The organisation runs two processes indefinitely and pays for both."
  );
  V(
    "w4-O3d-09", "O3d", 3,
    "Which sequence shows the right response to a workaround?",
    [
      [
        D.flow([
          "Workaround|seen",
          "Track|it",
          "Find the|failed case",
          "Add to|backlog",
          "+Design|fixed"
        ]),
        "Track it, find the failed case, add it to the backlog, and fix the design"
      ],
      [
        D.flow([
          "Workaround|seen",
          "!Warning|letter",
          "!Workaround|hidden",
          "!Defect|stays",
          "+Compliance|reported"
        ]),
        "Issue a warning letter, which hides the workaround and leaves the defect"
      ],
      [
        D.flow([
          "Workaround|seen",
          "Ignore|it",
          "Report|milestones",
          "Close|programme",
          "+Success"
        ]),
        "Ignore it, report milestones and close the programme"
      ],
      [
        D.flow([
          "Workaround|seen",
          "Retrain|everyone",
          "Same|design",
          "Workaround|returns",
          "Retrain|again"
        ]),
        "Retrain everyone on the same design, again and again"
      ]
    ],
    "A workaround is evidence of a design defect. Tracking it and fixing the failed case removes the reason for it; punishment or retraining on an unchanged design does not."
  );
  OR(
    "w4-O3d-10", "O3d", 2,
    "Put these adoption practices in a sensible order after go-live.",
    [
      "Measure adoption weekly from day one",
      "Track every workaround explicitly",
      "Find the case each workaround reveals",
      "Fix the design through the improvement backlog",
      "Report adoption to the sponsor alongside milestones"
    ],
    "Measurement and workaround tracking produce the evidence; fixing the design acts on it; reporting keeps the sponsor's attention on real adoption."
  );
  MA(
    "w4-O3d-11", "O3d", 2,
    "Match each Week 4 figure or idea to its meaning.",
    [
      ["Adoption plateau at about 65%", "Two processes running at once"],
      ["Workarounds peak near 42%", "Many early cases do not fit the new design"],
      ["Workarounds settle near 9%", "Some real cases are still unhandled"],
      ["All milestones green", "The programme can look finished when it is not"]
    ],
    "Read together, the figures show that delivery is complete but adoption is not, so the work is not finished."
  );
  MA(
    "w4-O3d-12", "O3d", 3,
    "Match each term to its meaning.",
    [
      ["Adoption", "The share of real cases through the new process"],
      ["Workaround", "An unofficial way of getting work done when the process does not fit"],
      ["Improvement backlog", "The running list of fixes the process still needs"],
      ["Parallel processes", "Old and new ways running side by side"]
    ],
    "These terms describe the reality after go-live, which must be tracked as seriously as delivery was before it."
  );
  // ============================================================
  // O3e · Design an intervention with explicit costs
  // CLOs: K3, S3
  // Outcome: O3
  // 12 items: 3 mcq, 2 tf, 2 drop, 2 visual, 2 order, 1 match
  // ============================================================
  M(
    "w4-O3e-01", "O3e", 1,
    "Which of these is change management that is NOT just communication?",
    [
      "Changing agents' measures so the new behaviour is rewarded",
      "Sending a weekly newsletter about the kiosk's benefits",
      "Holding a launch event to celebrate the new check-in",
      "Putting posters about faster check-in in the staff room"
    ],
    "Messages tell people about the work; interventions change the work. Changing measures and incentives alters what is rational for each agent."
  );
  M(
    "w4-O3e-02", "O3e", 2,
    "Qasr's agents are still rated on how many guests they personally check in. Why does this threaten adoption?",
    [
      "Sending a guest to the kiosk makes an agent look less productive",
      "The measure is too complicated for agents to understand",
      "The measure rewards agents for using the kiosk too much",
      "The measure has no effect on what agents choose to do"
    ],
    "If measures and incentives stay the same, the old behaviour remains rational. Changing the measure to resolved arrivals makes the new way the sensible choice."
  );
  M(
    "w4-O3e-03", "O3e", 3,
    "Qasr's training plan shows agents only which kiosk screens to press. What should the director change?",
    [
      "Train on the process, including when to step in and how exceptions are resolved",
      "Add more screen-by-screen sessions, so agents memorise every button",
      "Cancel training, since the kiosk is simple enough to use unaided",
      "Train only supervisors, who can then tell agents what to press"
    ],
    "The system is only one part of the new way of working. Training on the process covers the decisions and exceptions that the screens do not show."
  );
  TF(
    "w4-O3e-04", "O3e", 1,
    "A strong intervention plan states what each measure will cost.",
    true,
    "True. Stating costs turns good intentions into a plan the sponsor can approve. A plan without costs only looks cheaper, and the bill arrives later as a surprise."
  );
  TF(
    "w4-O3e-05", "O3e", 2,
    "Publishing an explicit position on employment consequences early does more damage than staying silent.",
    false,
    "False. Ambiguity does more damage than bad news. Being explicit and early answers the fear of job loss honestly."
  );
  DR(
    "w4-O3e-06", "O3e", 1,
    "Train on the {1}, not only on the {2}.",
    [
      ["process", "posters", "budget"],
      ["system", "process", "sponsor"]
    ],
    "Screens are only part of the change. People also need to know when to step in, how exceptions are handled and who does what next."
  );
  DR(
    "w4-O3e-07", "O3e", 2,
    "Change the measures and {1}, or the old behaviour will remain {2}.",
    [
      ["incentives", "posters", "uniforms"],
      ["rational", "illegal", "invisible"]
    ],
    "People respond sensibly to how they are measured. If the old measures stay, the old behaviour stays the sensible choice."
  );
  V(
    "w4-O3e-08", "O3e", 2,
    "Which sequence describes a defensible intervention plan?",
    [
      [
        D.flow([
          "Diagnose|the cause",
          "Change|something real",
          "State|the cost",
          "Track|adoption",
          "+Adoption|rises"
        ]),
        "Diagnose the cause, change something real, state the cost and track adoption"
      ],
      [
        D.flow([
          "Communicate|benefits",
          "More|posters",
          "Town|hall",
          "Launch|video",
          "+Done"
        ]),
        "Communicate the benefits through posters, a town hall and a video"
      ],
      [
        D.flow([
          "Change|everything",
          "No|costs",
          "No|tracking",
          "Go-live",
          "Hope"
        ]),
        "Change everything without costs or tracking, and hope"
      ],
      [
        D.flow([
          "Diagnose|the cause",
          "Write|a report",
          "File|it",
          "Same|process",
          "+Reviewed"
        ]),
        "Diagnose the cause, write a report and change nothing"
      ]
    ],
    "A defensible plan links each cause to a real, costed change and tracks adoption to show whether it worked."
  );
  V(
    "w4-O3e-09", "O3e", 3,
    "Which set of measures matches the Week 4 intervention for Qasr?",
    [
      [
        D.flow([
          "Co-design|exceptions",
          "Written|redeployment",
          "Train on|process",
          "Change|measures",
          "Track|adoption"
        ]),
        "Co-design, written redeployment, process training, new measures and adoption tracking"
      ],
      [
        D.flow([
          "Launch|video",
          "Reassure|verbally",
          "Train on|screens",
          "Keep old|measures",
          "+Track|milestones"
        ]),
        "A launch video, verbal reassurance, screen training and old measures"
      ],
      [
        D.flow([
          "Discipline|workarounds",
          "Cut|training",
          "Keep old|measures",
          "Ignore|fears",
          "+On|budget"
        ]),
        "Discipline, cut training, keep old measures and ignore fears"
      ],
      [
        D.flow([
          "Newsletter",
          "Posters",
          "Town hall",
          "Survey",
          "+Engaged"
        ]),
        "A newsletter, posters, a town hall and a survey"
      ]
    ],
    "Each Week 4 measure changes something real at the desk and has a cost. The other sets mostly say things rather than change them."
  );
  OR(
    "w4-O3e-10", "O3e", 2,
    "Put these steps in order for building an intervention plan.",
    [
      "Diagnose the cause of each objection",
      "Choose a change to the work that fits each cause",
      "State what each change will cost",
      "Get the sponsor's approval for the costed plan",
      "Track adoption after go-live to see whether it worked"
    ],
    "Diagnosis decides the change; costs make it approvable; adoption tracking shows whether it changed behaviour."
  );
  OR(
    "w4-O3e-11", "O3e", 3,
    "Put the Qasr director's actions in the order the lesson presents them.",
    [
      "Invite agents from all three desks to co-design the exceptions path",
      "Publish a written redeployment position for Corniche",
      "Replace screen training with training on the process",
      "Change the agents' measure to resolved arrivals",
      "Track adoption after go-live as seriously as delivery"
    ],
    "The plan moves from involvement and commitments, through capability and incentives, to measurement that shows whether everything worked."
  );
  MA(
    "w4-O3e-12", "O3e", 2,
    "Match each intervention to its cost at Qasr.",
    [
      ["Co-design the exceptions path", "Supervisor time and design workshops"],
      ["Written redeployment position", "A firm management commitment"],
      ["Training on the process", "Rehearsal shifts and desk cover"],
      ["Change measures and incentives", "A revision of the scorecard"]
    ],
    "Every real change costs something. Naming the cost is what turns a list of good intentions into a plan the sponsor can approve."
  );
// END-BLOCK
// CHUNK: B-O3fg
  // ============================================================
  // O3f · The case: three objections, one decision
  // CLOs: K3, S3
  // Outcome: O3
  // 12 items: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 2 match
  // ============================================================
  M(
    "w4-O3f-01", "O3f", 1,
    "With 71% of Qasr staff already agreeing the design is faster, which objections could 'communicating the benefits more clearly' fix?",
    [
      "Almost none, because the benefit is already believed",
      "All three, because each is a misunderstanding",
      "Only Marina's, because it concerns guest arrivals",
      "Only Corniche's, because it concerns staffing"
    ],
    "Grouped by cause, the objections are a design defect, fear of job loss and organisational memory, all beneath a lack of involvement. None of these is a misunderstanding of the benefit."
  );
  M(
    "w4-O3f-02", "O3f", 2,
    "Which objection passes both parts of the resistance-or-defect test?",
    [
      "Marina: no kiosk path for the 30% of corporate arrivals with wrong details",
      "Corniche: the business case assumes four fewer agents per shift",
      "Old Town: the last system promised to make jobs easier too",
      "Staff feel the kiosk is impersonal and guests will dislike it"
    ],
    "Marina's claim names a case that booking data can check, and it stays true whoever raises it. The others are rational resistance that still deserves real answers."
  );
  M(
    "w4-O3f-03", "O3f", 3,
    "Which eleven-week plan best answers the three Qasr objections?",
    [
      "Change the design for wrong bookings, publish a written redeployment position, and co-design with Old Town",
      "Run a stronger campaign on the benefits, with a video and town halls at all three hotels",
      "Delay go-live by a year until every supervisor withdraws their objection in writing",
      "Train every agent on the kiosk screens and reassure them that nobody needs to worry"
    ],
    "Each step matches a diagnosed cause and changes something real. Campaigns, delay or screen training with reassurance leave the causes untouched."
  );
  TF(
    "w4-O3f-04", "O3f", 1,
    "The objections should be grouped by cause rather than by the hotel they came from.",
    true,
    "True. Grouping by cause shows the director that she faces different problems, each needing its own response."
  );
  TF(
    "w4-O3f-05", "O3f", 2,
    "Once the plan changes real things, the director should stop explaining her decisions to staff.",
    false,
    "False. She still explains every decision. Communication works when it explains real changes, not when it replaces them."
  );
  DR(
    "w4-O3f-06", "O3f", 1,
    "Be specific about what you would {1}, not only what you would {2}.",
    [
      ["change", "announce", "promise"],
      ["say", "change", "fund"]
    ],
    "The intervention is judged by what actually changes at the desk, not by the messages that accompany it."
  );
  DR(
    "w4-O3f-07", "O3f", 2,
    "Marina's objection is a design {1}, while Corniche and Old Town are rational {2}.",
    [
      ["defect", "benefit", "preference"],
      ["resistance", "defects", "support"]
    ],
    "Only Marina's claim is checkable and independent of the objector's stake. The other two still need real answers, not dismissal."
  );
  V(
    "w4-O3f-08", "O3f", 2,
    "Which sequence shows how the director should work through the case?",
    [
      [
        D.flow([
          "Group by|cause",
          "Test for|defects",
          "Match each|response",
          "State|the costs",
          "Track|adoption"
        ]),
        "Group by cause, test for defects, match responses, state costs and track adoption"
      ],
      [
        D.flow([
          "Hear|objections",
          "Repeat|benefits",
          "Hear|again",
          "Repeat|louder",
          "Go-live"
        ]),
        "Hear the objections and repeat the benefits more loudly"
      ],
      [
        D.flow([
          "Hear|objections",
          "Count|votes",
          "Majority|wins",
          "Ignore|minority",
          "Go-live"
        ]),
        "Count votes and let the majority decide"
      ],
      [
        D.flow([
          "Hear|objections",
          "Postpone|decision",
          "Wait|11 weeks",
          "No|changes",
          "Go-live"
        ]),
        "Postpone the decision for eleven weeks and change nothing"
      ]
    ],
    "The case is worked by cause: test which objection is a defect, match each cause to a response that works, cost it, and then measure adoption."
  );
  V(
    "w4-O3f-09", "O3f", 3,
    "Which set of actions answers the three Qasr objections correctly?",
    [
      [
        D.flow([
          "Marina|change design",
          "Corniche|written position",
          "Old Town|co-design",
          "Space|other changes",
          "Explain|decisions"
        ]),
        "Change the design, a written position, co-design, spaced changes and explained decisions"
      ],
      [
        D.flow([
          "Marina|more training",
          "Corniche|verbal reassurance",
          "Old Town|launch event",
          "All|newsletter",
          "Go-live"
        ]),
        "More training, verbal reassurance, a launch event and a newsletter"
      ],
      [
        D.flow([
          "Marina|ignore",
          "Corniche|ignore",
          "Old Town|ignore",
          "Proceed|on time",
          "Go-live"
        ]),
        "Ignore all three and proceed on time"
      ],
      [
        D.flow([
          "Marina|discipline",
          "Corniche|discipline",
          "Old Town|discipline",
          "Enforce|kiosk",
          "Go-live"
        ]),
        "Discipline all three supervisors and enforce the kiosk"
      ]
    ],
    "A defect is answered by changing the design, job fear by a written commitment, and broken trust by co-design and fewer changes. Every step is real and costed."
  );
  OR(
    "w4-O3f-10", "O3f", 2,
    "Put the three in-class questions in the order the director works through them.",
    [
      "Group the objections by cause and ask which communication could fix",
      "Apply the test that separates resistance from a design defect",
      "Decide what to change in the next eleven weeks and what each change costs"
    ],
    "Diagnosis comes before the test, and the test comes before the plan. Only then can the director commit resources with confidence."
  );
  MA(
    "w4-O3f-11", "O3f", 2,
    "Match each Qasr objection to the action that answers it.",
    [
      ["Marina: no path for wrong corporate bookings", "Change the design and say publicly why"],
      ["Corniche: four fewer agents per shift", "Publish a written redeployment position"],
      ["Old Town: the last system promised the same", "Co-design and hold back unrelated changes"],
      ["83% of staff never consulted", "Involve staff in shaping the process"]
    ],
    "Each action fits its cause. That is why the plan works where a single message would not."
  );
  MA(
    "w4-O3f-12", "O3f", 3,
    "Match each step of the plan to its cost.",
    [
      ["Staffed path for wrong bookings", "Design effort before go-live"],
      ["Written redeployment position", "A firm management commitment"],
      ["Co-design with Old Town agents", "Workshop and supervisor time"],
      ["Holding back unrelated changes", "Delaying other planned updates"]
    ],
    "Every real change has a cost. Stating it lets the sponsor approve the plan knowingly instead of meeting the bill later."
  );
  // ============================================================
  // O3g · The forum and the week ahead
  // CLOs: K3, S3
  // Outcome: O3
  // 12 items: 3 mcq, 3 tf, 2 drop, 2 visual, 1 order, 1 match
  // ============================================================
  M(
    "w4-O3g-01", "O3g", 1,
    "According to the forum rules, when should you read your peers' posts?",
    [
      "After you have posted your own diagnosis",
      "Before writing anything, to see the best ideas",
      "Only after the facilitator summary appears",
      "Never, because the forum is individual work"
    ],
    "Post before reading peers, so your own thinking stays your own. Reading a confident classmate early quietly pulls your answer toward theirs."
  );
  M(
    "w4-O3g-02", "O3g", 2,
    "Which reply best meets the forum's expectations?",
    [
      "A reasoned challenge to a peer's diagnosis, grounded in the case and Chapter 25",
      "A short note praising a peer's post and agreeing with all of it",
      "A summary of your own post repeated under a peer's reply",
      "A question asking the facilitator for the model answer"
    ],
    "Replies should challenge or extend reasoning rather than agree. You must respond to at least two peers and disagree with at least one, citing the chapter."
  );
  M(
    "w4-O3g-03", "O3g", 3,
    "Why is the forum case set in a different organisation from Qasr?",
    [
      "To test whether you can diagnose resistance somewhere unfamiliar",
      "Because the Qasr case has already been fully answered in class",
      "So you can copy Qasr's answers into a new setting directly",
      "Because Qasr's objections are not relevant to Week 4 outcomes"
    ],
    "The session outcome is to diagnose resistance in an unfamiliar organisation and defend a change approach. The causes there may not be the causes at Qasr."
  );
  TF(
    "w4-O3g-04", "O3g", 1,
    "In the forum, you must disagree with at least one peer.",
    true,
    "True. Disagreement is a service, because a challenged argument becomes stronger than a praised one."
  );
  TF(
    "w4-O3g-05", "O3g", 2,
    "Citing Jeston's Chapter 25 is optional in the forum post.",
    false,
    "False. The forum rules ask you to cite the chapter, which gives everyone a shared evidence base."
  );
  TF(
    "w4-O3g-06", "O3g", 2,
    "The Week 4 forum is formative and also contributes to the participation assessment in Week 14.",
    true,
    "True. Activities are formative, and the forum contributes to Assessment 4, Participation, in Week 14."
  );
  DR(
    "w4-O3g-07", "O3g", 1,
    "Post {1} reading peers, respond to at least {2} peers, and disagree with at least one.",
    [
      ["before", "after", "instead of"],
      ["two", "five", "zero"]
    ],
    "These are the forum rules from the slides. Posting first keeps your diagnosis independent, and the replies push reasoning further."
  );
  DR(
    "w4-O3g-08", "O3g", 2,
    "Next week moves to the Organization {1} phase, which tells us which {2} matter most.",
    [
      ["Strategy", "Launch", "Audit"],
      ["processes", "posters", "suppliers"]
    ],
    "Week 5 begins the Organization Strategy phase. Strategy directs where process effort, and this week's people effort, should land."
  );
  V(
    "w4-O3g-09", "O3g", 2,
    "Which sequence shows a strong forum post?",
    [
      [
        D.flow([
          "Read case|and exhibit",
          "Diagnose|the causes",
          "Test for|defects",
          "Propose|with costs",
          "Cite|Jeston Ch. 25"
        ]),
        "Read the evidence, diagnose causes, test for defects, propose costed changes and cite the chapter"
      ],
      [
        D.flow([
          "Read|peers",
          "Copy best|ideas",
          "Agree|with all",
          "No|citation",
          "Post"
        ]),
        "Read peers, copy the best ideas, agree with all and skip the citation"
      ],
      [
        D.flow([
          "Skim|case",
          "General|statements",
          "Change|matters",
          "Communicate|more",
          "Post"
        ]),
        "Skim the case and post general statements about communication"
      ],
      [
        D.flow([
          "Reuse|Qasr answer",
          "Same|causes",
          "Same|actions",
          "No|exhibit",
          "Post"
        ]),
        "Reuse the Qasr answer without reading the exhibit"
      ]
    ],
    "A strong post moves from the case evidence to diagnosis, testing, costed proposals and a citation. Copying or general statements do not show diagnosis in an unfamiliar setting."
  );
  V(
    "w4-O3g-10", "O3g", 3,
    "Which sequence follows the forum process across the week?",
    [
      [
        D.flow([
          "Read case|and exhibit",
          "Post by|mid-week",
          "Reply to|two peers",
          "Disagree|with one",
          "Read|summary"
        ]),
        "Read the case, post by mid-week, reply to two peers, disagree with one, read the summary"
      ],
      [
        D.flow([
          "Read peers",
          "Write|own post",
          "Skip|replies",
          "Ignore|summary",
          "Done"
        ]),
        "Read peers, write your post, skip replies and ignore the summary"
      ],
      [
        D.flow([
          "Wait for|summary",
          "Copy|summary",
          "Post",
          "Agree|with all",
          "Done"
        ]),
        "Wait for the summary, copy it and agree with everyone"
      ],
      [
        D.flow([
          "Post|late",
          "One|reply",
          "Praise|only",
          "No|citation",
          "Done"
        ]),
        "Post late, write one reply of praise and cite nothing"
      ]
    ],
    "The forum asks for an independent post by mid-week, at least two replies including one disagreement, and reading the facilitator summary at the end."
  );
  OR(
    "w4-O3g-11", "O3g", 2,
    "Put the forum activities in order.",
    [
      "Read the case 'Twenty-Two Years of Knowing How' and its exhibit",
      "Post your own diagnosis by mid-week, before reading peers",
      "Respond to at least two peers, disagreeing with at least one",
      "Read the facilitator summary at the end of the week"
    ],
    "The order protects independent thinking, then builds discussion, and closes with the facilitator's synthesis."
  );
  MA(
    "w4-O3g-12", "O3g", 2,
    "Match each Week 4 idea to the lesson it carries forward.",
    [
      ["Change management", "Continuous through every phase, not a phase of its own"],
      ["Resistance", "Usually rational; treat it as data and match the response to the cause"],
      ["Stakeholders", "Engage by quadrant and re-run the grid at each phase boundary"],
      ["Adoption", "A weekly measure, reported alongside milestones"]
    ],
    "These four ideas summarise the week and carry into the forum and into the BPM phases that follow."
  );
// END-BLOCK
//__MORE_ITEMS__


  // ---------- normalise to the documented schema ----------

  const A = window.ADAPTIVE;

  B.forEach((x) => {
    x.lo = A.sections[x.sec].lo;
    x.clo = A.outcomes[x.lo].clo;
    x.outcome = A.outcomes[x.lo].full;
    x.rem = `review:${x.sec}`;

    if (x.type === "mcq" || x.type === "visual") {
      x.ans = 0;
    }

    if (x.type === "tf") {
      x.o = ["True", "False"];
    }

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