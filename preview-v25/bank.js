// OPER621 Week 1 question bank. Every item: one correct response, checked automatically, with a "why".
// Types: mcq (4 options) · tf (true/false) · drop (fill blanks from fixed lists) · visual (pick the right diagram)
//        order (put a short sequence in order; checked as one exact answer) · match (pair items; checked as one exact answer)
// Authoring convention: the correct option / blank choice is written FIRST; the player shuffles at runtime.
// After loading, each item is normalised to the schema in DESIGN.md: id, clo, lo, sec, diff, type, q, o, ans, why, rem.
(() => {
  const D = window.DIAG, B = [];
  const add = (type, id, sec, diff, q, body, why) => B.push(Object.assign({ id, sec, diff, type, q, why }, body));
  const M = (id, sec, d, q, o, why) => add("mcq", id, sec, d, q, { o }, why);
  const TF = (id, sec, d, q, ans, why) => add("tf", id, sec, d, q, { ans }, why);
  const DR = (id, sec, d, q, blanks, why) => add("drop", id, sec, d, q, { blanks }, why);
  const V = (id, sec, d, q, opts, why) => add("visual", id, sec, d, q, { o: opts.map((x) => x[1]), svg: opts.map((x) => x[0]) }, why);
  const OR = (id, sec, d, q, items, why) => add("order", id, sec, d, q, { items }, why);
  const MA = (id, sec, d, q, pairs, why) => add("match", id, sec, d, q, { pairs }, why);

  // ---------------- O1a · What a process is ----------------
  M("O1a-01", "O1a", 1, "Which of these best describes a business process?",
    ["A set of activities that together produce an outcome of value to a customer", "A list of tasks done inside one department", "The organisation chart of a company", "A software system that stores customer data"],
    "A process is defined by the outcome it delivers to a customer, and it usually crosses several teams. A single department's to-do list is not a process.");
  M("O1a-02", "O1a", 2, "You book a taxi in an app. What is the trigger of this process?",
    ["You request the ride in the app", "The driver ends the trip", "Your card is charged", "The app asks you for a rating"],
    "The trigger is what starts the process, and here that is your request. Everything else happens later, in the sequence or at the end.");
  M("O1a-03", "O1a", 3, "A government office calls 'Scan and archive files' its key process. Using Jeston's test, what is the best response?",
    ["Ask who the customer is and what outcome they get; if nobody can say, it is a task, not yet a process", "Accept it, because anything with steps is a process", "Rename it 'Archive Management' so it sounds like a process", "Count how many files are scanned per hour"],
    "Jeston's test says: if you can't name the customer and the outcome, you haven't found a process. Scanning is probably one task inside a bigger process.");
  TF("O1a-04", "O1a", 1, "Work only counts as a process, rather than a task list, when it crosses more than one function.", true,
    "True. Crossing functions is what makes it a process. Steps done inside one team are closer to a task list.");
  TF("O1a-05", "O1a", 2, "A process ends when the last department finishes its part, whether or not the customer has received anything.", false,
    "False. The end state is the outcome of value to the customer, like food at your door, not the moment one team stops working.");
  DR("O1a-06", "O1a", 1, "Every process has a {1}, a sequence of steps, and a defined {2}.",
    [["trigger", "budget", "manager"], ["end state", "department", "software"]],
    "Trigger, sequence, end state: what starts it, the steps in between, and the outcome the customer gets.");
  DR("O1a-07", "O1a", 2, "When you order food on an app, tapping Order is the {1}, and hot food at your door is the {2}.",
    [["trigger", "end state", "handoff"], ["end state", "trigger", "task"]],
    "Your tap starts the process, so it is the trigger. Food at your door is what you wanted, so it is the end state.");
  V("O1a-08", "O1a", 2, "Which diagram shows a complete process for an online grocery order?", [
    [D.flow(["Tap|Order", "Pick|items", "Deliver", "+Groceries|at home"]), "Tap Order, pick items, deliver, groceries at home"],
    [D.flow(["Pick|items", "Pack", "Load|van"]), "Pick items, pack, load the van"],
    [D.flow(["Tap|Order", "Pick|items"]), "Tap Order, then pick items, and it stops there"],
    [D.flow(["Load|van", "Pick|items", "Tap|Order", "Groceries|at home"]), "Load the van, pick items, tap Order, groceries at home"],
  ], "A complete process runs from the customer's trigger, through the steps in the right order, to the outcome the customer values.");
  V("O1a-09", "O1a", 3, "Which picture shows work that crosses functions, which makes it a process rather than a task list?", [
    [D.lanes(["Kitchen", "Rider", "Support"], [[2, "Order"], [0, "Cook"], [1, "Deliver"]]), "Three steps passing between support, the kitchen and the rider"],
    [D.lanes(["Kitchen", "Rider", "Support"], [[0, "Chop"], [0, "Cook"], [0, "Plate"]]), "Three steps that all stay inside the kitchen"],
    [D.lanes(["Kitchen", "Rider", "Support"], [[1, "Wait"], [1, "Wait"], [1, "Wait"]]), "One rider waiting three times"],
    [D.lanes(["Kitchen", "Rider", "Support"], [[2, "Log"], [2, "File"], [2, "Close"]]), "Three steps that all stay with support"],
  ], "Only the first picture moves across teams. Work that stays inside one team is a task list, however long it is.");
  OR("O1a-10", "O1a", 1, "Put the steps of a taxi-app ride in order, from trigger to end state.",
    ["You request a ride", "A driver accepts", "The driver picks you up", "You arrive, and the trip ends"],
    "The request is the trigger, the accept and pick-up are the sequence, and arriving is the end state you wanted.");
  MA("O1a-11", "O1a", 2, "Renewing an Emirates ID: match each part of the process to its example.",
    [["Trigger", "You submit the renewal online"], ["Sequence", "Biometrics, payment and printing"], ["End state", "The new card is in your hand"]],
    "The trigger starts it, the sequence is the work in between, and the end state is the outcome you value: the card in your hand.");

  // ---------------- O1b · Levels and boundaries ----------------
  M("O1b-01", "O1b", 1, "In the process hierarchy, which level is the widest?",
    ["The value chain", "The task", "The activity", "The sub-process"],
    "The value chain sits at the top and holds everything else: processes, sub-processes, activities and tasks.");
  M("O1b-02", "O1b", 2, "At Qasr, 'Open the corporate account portal' belongs to which level?",
    ["Task", "Process", "Value chain", "Sub-process"],
    "It is one action by one person, so it is a task, the smallest level of the hierarchy.");
  M("O1b-03", "O1b", 3, "Two managers argue for an hour. One is mapping 'Check a guest in'; the other is mapping 'Check rate and guarantee'. What is the most likely cause?",
    ["They are modelling different levels of the hierarchy", "One of them is using the wrong software", "Check-in is not a real process", "They disagree about who the customer is"],
    "One is drawing a process, the other an activity inside it. Most mapping arguments are level disagreements, so agree the level first.");
  TF("O1b-04", "O1b", 1, "You should agree which level of the hierarchy you are modelling before you start drawing a process map.", true,
    "True. Agreeing the level first prevents most process-mapping arguments.");
  TF("O1b-05", "O1b", 2, "A check-in process that ends when the key card is printed has a good boundary.", false,
    "False. It ends too early. The guest's outcome is being settled in the right room, not a printed card.");
  DR("O1b-06", "O1b", 1, "From widest to narrowest: value chain, process, {1}, activity, {2}.",
    [["sub-process", "department", "project"], ["task", "value chain", "process"]],
    "The five levels are value chain, process, sub-process, activity and task.");
  DR("O1b-07", "O1b", 2, "A good process boundary starts at the customer's {1} and ends at the customer's {2}.",
    [["trigger", "first complaint", "invoice"], ["outcome", "first handoff", "department exit"]],
    "Draw the boundary from the customer's side: from what starts the process for them to the outcome they receive.");
  const ret = ["Click|Return", "Courier", "Parcel|arrives", "Parcel|checked", "Refund|received"];
  V("O1b-08", "O1b", 2, "Which diagram draws the best boundary for an online return process?", [
    [D.flow(ret, { bracket: [0, 4, "Boundary"] }), "From clicking Return to the refund received"],
    [D.flow(ret, { bracket: [2, 3, "Boundary"] }), "From the parcel arriving at the warehouse to the parcel checked"],
    [D.flow(ret, { bracket: [0, 2, "Boundary"] }), "From clicking Return to the parcel arriving at the warehouse"],
    [D.flow(ret, { bracket: [3, 4, "Boundary"] }), "From the parcel checked to the refund received"],
  ], "The best boundary runs from the customer's trigger, clicking Return, to the customer's outcome, the refund. Shorter boundaries hide delays.");
  const hl = (names) => D.hier(names.map((n) => [n, ""]), -1, { alt: names.join(", ") });
  V("O1b-09", "O1b", 1, "Which diagram shows the process hierarchy in the right order, from widest to narrowest?", [
    [hl(["Value chain", "Process", "Sub-process", "Activity", "Task"]), "Value chain, process, sub-process, activity, task"],
    [hl(["Task", "Activity", "Sub-process", "Process", "Value chain"]), "Task, activity, sub-process, process, value chain"],
    [hl(["Process", "Value chain", "Activity", "Sub-process", "Task"]), "Process, value chain, activity, sub-process, task"],
    [hl(["Value chain", "Activity", "Process", "Task", "Sub-process"]), "Value chain, activity, process, task, sub-process"],
  ], "From the top: value chain, process, sub-process, activity, task. Each level sits inside the one above it.");
  OR("O1b-10", "O1b", 2, "Put these Qasr examples in order, from the widest level to the narrowest.",
    ["Serve the guest", "Check a guest in", "Verify the booking", "Check rate and guarantee", "Open the corporate account portal"],
    "Serve the guest is the value chain, then the check-in process, the verify-booking sub-process, the rate-check activity, and the portal task.");
  MA("O1b-11", "O1b", 2, "A retail bank: match each example to its level in the hierarchy.",
    [["Value chain", "Serve retail customers"], ["Process", "Open a new account"], ["Activity", "Check identity documents"], ["Task", "Photocopy the passport"]],
    "Serving customers is the whole value chain. Opening an account is a process. Checking documents is an activity inside it, and photocopying is a single task.");

  // ---------------- O2a · Vertical departments, horizontal customers ----------------
  M("O2a-01", "O2a", 1, "At Qasr Marina, every department met its target, yet the guest scored her stay 4 out of 10. What does this show?",
    ["Departments can succeed while the end-to-end process fails", "The guest was being unreasonable", "One department secretly missed its target", "Targets should be removed completely"],
    "Each department hit its own standard, but nobody managed the journey across them. Functional excellence and process failure can live side by side.");
  M("O2a-02", "O2a", 2, "Departments are managed vertically. How does the customer experience the organisation?",
    ["Horizontally, across many departments", "Vertically, inside one department", "Only through senior managers", "Only through the website"],
    "The customer's journey runs across the organisation chart, from one department to the next.");
  M("O2a-03", "O2a", 3, "At a telecom company, the sales, installation and billing teams all hit their monthly targets, yet new customers wait three weeks for internet. What is the best explanation?",
    ["Each team is measured on its own slice, and nobody measures the whole journey", "Installation staff need customer-service training", "The targets are too easy and should be doubled", "Customers ordered at a busy time"],
    "Like Qasr, no team is broken. The gap sits between the teams, where nobody is measured or responsible.");
  TF("O2a-04", "O2a", 1, "If every department meets its own target, the customer outcome must be good.", false,
    "False. Every department can hit its target while the end-to-end process fails the customer.");
  TF("O2a-05", "O2a", 2, "In the Qasr case, the guest's long wait was caused by one department that missed its standard.", false,
    "False. Every department met its standard. The time was lost in the gaps between them.");
  DR("O2a-06", "O2a", 1, "Departments optimise {1}; customers experience the {2} flow.",
    [["vertically", "horizontally", "randomly"], ["horizontal", "vertical", "financial"]],
    "Departments look up and down their own column. The customer moves across all the columns.");
  DR("O2a-07", "O2a", 2, "At Qasr, the front desk met its {1} standard, yet the guest waited {2} minutes.",
    [["90-second", "10-minute", "45-minute"], ["23", "9", "45"]],
    "The front desk met 90 seconds per transaction, but the guest's whole wait was 23 minutes.");
  V("O2a-08", "O2a", 1, "Which picture shows the customer's view of the organisation?", [
    [D.org("process"), "The guest's journey runs across every department"],
    [D.org("silo"), "Each department pushes its own column upward"],
    [D.flow(["General|manager", "Front|desk"]), "A line from the general manager down to the front desk"],
    [D.flow(["~Reservations", "~Revenue", "~Housekeeping"]), "Three separate departments with no journey shown"],
  ], "The customer sees the horizontal flow across departments, not each department's own column.");
  V("O2a-09", "O2a", 3, "Which picture best explains 'every department met its target, but the guest scored 4 out of 10'?", [
    [D.flow(["+Front desk|met", "+Revenue|met", "+House-|keeping met", "!Guest|4 / 10"]), "Every department green, but the guest red"],
    [D.flow(["!Front desk|missed", "+Revenue|met", "+House-|keeping met", "!Guest|4 / 10"]), "The front desk missed its target, so the guest is unhappy"],
    [D.flow(["+Front desk|met", "+Revenue|met", "+Guest|9 / 10"]), "Every department green, and a happy guest"],
    [D.flow(["!Front desk", "!Revenue", "!House-|keeping"]), "Every department failed"],
  ], "All departments passed their own measures, and the guest still had a poor experience. That is the gap between departmental and end-to-end performance.");
  OR("O2a-10", "O2a", 2, "Put the guest's evening at Qasr Marina in order.",
    ["She lands after a delayed flight", "She reaches the hotel at 7:40 pm", "She waits 23 minutes at the desk", "She is given a room that isn't ready", "She scores the stay 4 out of 10"],
    "This is the guest's horizontal journey. Each step touched a different department, and the score came at the end.");
  MA("O2a-11", "O2a", 2, "Match each Qasr department to the standard it met.",
    [["Front desk", "90 seconds per transaction"], ["Revenue office", "10-minute service level"], ["Housekeeping", "45-minute room release"]],
    "Each department met its own standard. None of these standards measured the guest's total wait.");

  // ---------------- O2b · Handoffs and end-to-end measures ----------------
  M("O2b-01", "O2b", 1, "What is a handoff?",
    ["The moment work passes from one team to another", "The final step, when the customer gets the outcome", "A meeting between two managers", "A department's monthly target"],
    "A handoff is where work moves between teams. That is where time, information and responsibility are most often lost.");
  M("O2b-02", "O2b", 2, "In Exhibit 1, how many of the guest's 23 minutes added value for her?",
    ["1 minute", "7 minutes", "13 minutes", "23 minutes"],
    "Only handing over the key and directions, one minute, added value. The other 22 minutes were queues, searches, re-typing and phone calls.");
  M("O2b-03", "O2b", 3, "A hospital speeds up triage in the emergency department, but patients now wait longer for a bed upstairs. What is this called?",
    ["Local optimisation", "Process maturity", "End-to-end measurement", "Business Process Improvement"],
    "One part got faster, and the queue simply moved downstream. Improving a part can make the whole worse.");
  TF("O2b-04", "O2b", 1, "Handoffs are where time, information and accountability are often lost.", true,
    "True. Each time work changes hands, it can wait, lose details, or lose its owner.");
  TF("O2b-05", "O2b", 2, "Making one department faster always makes the whole process faster.", false,
    "False. If the next step can't keep up, the work just piles up there. That is local optimisation.");
  DR("O2b-06", "O2b", 1, "At each handoff, three things can leak away: time, {1}, and {2}.",
    [["information", "budget", "software"], ["responsibility", "marketing", "training"]],
    "Work waits, details get lost or re-typed, and nobody is sure whose job it is.");
  DR("O2b-07", "O2b", 2, "The measure that matters runs {1}, and almost nobody {2} it.",
    [["end to end", "department by department", "once a year"], ["owns", "reports", "needs"]],
    "The customer feels the end-to-end result, yet usually no single person is responsible for it.");
  V("O2b-08", "O2b", 2, "Which swimlane has the fewest handoffs?", [
    [D.lanes(["Team A", "Team B", "Team C"], [[0, "Step 1"], [0, "Step 2"], [0, "Step 3"], [1, "Step 4"]]), "Three steps in team A, then one move to team B: one handoff"],
    [D.lanes(["Team A", "Team B", "Team C"], [[0, "Step 1"], [1, "Step 2"], [0, "Step 3"], [1, "Step 4"]]), "Work bounces between team A and team B: three handoffs"],
    [D.lanes(["Team A", "Team B", "Team C"], [[0, "Step 1"], [1, "Step 2"], [2, "Step 3"], [0, "Step 4"]]), "Work moves A, B, C, then back to A: three handoffs"],
    [D.lanes(["Team A", "Team B", "Team C"], [[0, "Step 1"], [2, "Step 2"], [1, "Step 3"], [2, "Step 4"]]), "Work moves A, C, B, then C: three handoffs"],
  ], "Each orange dot is a handoff. The first lane moves between teams only once, so it loses the least time and information.");
  const ex = [["Queue at desk", 6, false], ["Find booking", 4, false], ["Re-key details", 3, false], ["Call revenue", 7, false], ["Room released?", 2, false], ["Hand over key", 1, true]];
  V("O2b-09", "O2b", 3, "Which chart matches Exhibit 1 at Qasr: many minutes lost, very little value added?", [
    [D.bars(ex), "Five steps with no value for the guest, 22 minutes, and handing over the key, 1 minute, which adds value"],
    [D.bars(ex.map(([l, m]) => [l, m, true])), "All 23 minutes add value"],
    [D.bars([["Hand over key", 20, true], ["Queue at desk", 3, false]]), "Handing over the key takes 20 minutes"],
    [D.bars([["Queue at desk", 1, false], ["Call revenue", 1, false], ["Hand over key", 21, true]]), "Most of the time adds value"],
  ], "In the exhibit, only one minute out of 23 added value. The rest was lost in queues, searches, re-typing and handoffs.");
  OR("O2b-10", "O2b", 2, "Local optimisation at a hotel: put the chain of events in order.",
    ["Sales starts booking rooms faster", "More guests arrive than rooms are ready", "A queue builds at the front desk", "Guests wait longer, and scores fall"],
    "Speeding up one part, sales, pushed the problem downstream to housekeeping and the front desk.");
  MA("O2b-11", "O2b", 1, "Match each leak at a handoff to its everyday example.",
    [["Time", "Your file waits in a queue"], ["Information", "You re-type the same details"], ["Responsibility", "Each team says it's the next team's job"]],
    "These are the three leaks: waiting time, lost information, and lost responsibility.");

  // ---------------- O3a · What process-centred organisations do ----------------
  M("O3a-01", "O3a", 1, "In a process-centred organisation, who owns a process?",
    ["A named owner with authority over the whole flow", "Each department head, for their own slice", "The IT department", "Nobody; processes run themselves"],
    "A process-centred organisation names one owner for the whole flow, with real authority across departments.");
  M("O3a-02", "O3a", 2, "Which measure best fits a process-centred bank's loan process?",
    ["Days from application to money in the account", "Applications logged per sales clerk", "Pages printed by operations", "Number of credit meetings held"],
    "Process-centred organisations measure end to end, from the customer's trigger to the customer's outcome.");
  M("O3a-03", "O3a", 3, "A hotel group wants to become process-centred. Which change matters most?",
    ["Give a check-in owner real authority and an end-to-end measure, and fund improvement of the whole check-in flow", "Redraw the organisation chart with new colours", "Send front-desk staff on a smile course", "Add a fifth IT system for room status"],
    "It combines three of the four practices: a named owner with authority, end-to-end measurement, and budgets that follow the process.");
  TF("O3a-04", "O3a", 1, "In a process-centred organisation, the organisation chart disappears.", false,
    "False. The chart stays. The process view is laid over it.");
  TF("O3a-05", "O3a", 2, "In a process-centred organisation, budgets and improvement effort follow processes, not departments.", true,
    "True. Money and improvement effort go where the customer's flow needs them.");
  DR("O3a-06", "O3a", 1, "In a process-centred organisation, performance is measured from the customer's {1} to the customer's {2}.",
    [["trigger", "manager", "invoice"], ["outcome", "department", "budget"]],
    "End to end means from the moment the customer starts the process to the outcome they receive.");
  DR("O3a-07", "O3a", 2, "Staff can describe the whole {1} they work in, not only their own {2}.",
    [["process", "building", "contract"], ["step", "salary", "manager"]],
    "In a process-centred organisation, people understand the whole flow, so they can see how their step affects the customer.");
  V("O3a-08", "O3a", 2, "Which picture shows a process-centred organisation?", [
    [D.org("process"), "Departments stay, and one managed flow runs across them"],
    [D.org("silo"), "Each department chases its own column"],
    [D.flow(["~Department|A", "~Department|B", "~Department|C"]), "Separate departments with no connection"],
    [D.flow(["Customer", "+Outcome"]), "A flow with no departments at all; the chart has vanished"],
  ], "The organisation chart does not disappear. The process view is laid over it, with the flow managed across departments.");
  const rf = ["Click|Return", "Courier", "Warehouse", "Finance", "Money|back"];
  V("O3a-09", "O3a", 3, "Which returns process has real end-to-end ownership?", [
    [D.flow(rf, { bracket: [0, 4, "Owner"] }), "One owner from clicking Return to money back"],
    [D.flow(rf, { bracket: [2, 2, "Owner"] }), "An owner for the warehouse step only"],
    [D.flow(rf, { bracket: [0, 1, "Owner"] }), "An owner for the courier pick-up only"],
    [D.flow(rf, { bracket: [3, 4, "Owner"] }), "An owner for the refund only"],
  ], "End-to-end ownership covers the whole flow, from the customer's trigger to the customer's outcome.");
  OR("O3a-10", "O3a", 1, "Put the online return process in order, as its end-to-end owner sees it.",
    ["The customer clicks Return", "The courier collects the parcel", "The warehouse checks the item", "Finance issues the refund", "The money lands in the customer's account"],
    "The owner looks at the whole journey, from the customer's click to the money in their account.");
  MA("O3a-11", "O3a", 2, "Match each process-centred practice to its example.",
    [["Named owner", "One manager is accountable from click to refund"], ["End-to-end measure", "Days to refund"], ["Budget follows process", "Improvement money goes to the returns process"], ["Staff see the whole", "A warehouse worker can explain the full return journey"]],
    "These are the four practices of a process-centred organisation, each in a concrete form.");

  // ---------------- O3b · Two lenses, ownership without authority ----------------
  M("O3b-01", "O3b", 1, "In the functional view, what is the unit of focus?",
    ["The department", "The end-to-end flow", "The customer journey", "The process owner"],
    "The functional view looks at departments. The process view looks at the end-to-end flow.");
  M("O3b-02", "O3b", 2, "Which measure belongs to the process view?",
    ["Cycle time from request to outcome", "Calls answered per agent", "Budget spent per department", "Number of staff per floor"],
    "The process view measures cycle time, quality and cost to serve. The others measure departmental efficiency.");
  M("O3b-03", "O3b", 3, "Qasr names a check-in process owner, but she cannot change systems, schedules or targets. Why is this worse than having no owner at all?",
    ["Everyone believes the problem is handled, so nobody pushes for change", "Because owners always cost more money", "Because guests can see her title", "It isn't worse; any owner is better than none"],
    "Ownership without authority hides the problem. People relax because someone 'owns' it, yet nothing can change.");
  TF("O3b-04", "O3b", 1, "The typical failure of the functional view is 'local wins, global loss'.", true,
    "True. Each department wins locally, and the customer's overall result suffers.");
  TF("O3b-05", "O3b", 2, "Naming a process owner always fixes a broken process, even if she has no authority.", false,
    "False. An owner with no authority over the flow, the measures or the budget cannot change anything.");
  DR("O3b-06", "O3b", 1, "The functional view optimises the {1}; the process view optimises the {2}.",
    [["part", "whole", "budget"], ["whole", "part", "staff"]],
    "Functional thinking improves each part. Process thinking improves the whole flow.");
  DR("O3b-07", "O3b", 2, "The process view has its own typical failure: ownership without {1}.",
    [["authority", "a job title", "a meeting", "a logo"]],
    "A process owner needs authority, over the flow, the measures and the budget, or the role is only a title.");
  V("O3b-08", "O3b", 2, "Which picture shows ownership without authority?", [
    [D.flow(["~Systems", "~Targets", "~Budget"]), "An owner whose systems, targets and budget are all out of reach"],
    [D.flow(["*Systems", "*Targets", "*Budget"]), "An owner who controls systems, targets and budget"],
    [D.org("silo"), "Departments each chasing their own targets"],
    [D.cycle("loop"), "A loop of own, measure, govern"],
  ], "Dashed, empty boxes mean no levers. The owner has the title but cannot change the systems, the targets or the budget.");
  V("O3b-09", "O3b", 3, "Which picture shows the functional view's typical failure?", [
    [D.flow(["+Dept A|target met", "+Dept B|target met", "+Dept C|target met", "!Customer|4 / 10"]), "Every department meets its target, and the customer scores 4 out of 10"],
    [D.flow(["!Dept A|missed", "!Dept B|missed", "!Customer|unhappy"]), "Every department misses its target, so the customer is unhappy"],
    [D.flow(["+Dept A", "+Dept B", "+Customer|happy"]), "Every department and the customer are happy"],
    [D.flow(["~Owner", "~No levers"]), "An owner with no levers"],
  ], "Local wins, global loss: each department succeeds, and the customer still loses. The last picture is the process view's failure, not the functional view's.");
  MA("O3b-10", "O3b", 2, "Match each row of the comparison to the PROCESS view's answer.",
    [["Unit of focus", "End-to-end flow"], ["Measure", "Cycle time, quality, cost to serve"], ["Optimises", "The whole"], ["Sees the customer", "Directly"]],
    "The process view focuses on the end-to-end flow, measures cycle time, quality and cost to serve, optimises the whole, and sees the customer directly.");
  MA("O3b-11", "O3b", 3, "Match each statement to the view it describes.",
    [["Measures departmental efficiency", "Functional view"], ["Sees the customer directly", "Process view"], ["Optimises the part", "Functional view"], ["Optimises the whole", "Process view"]],
    "The functional view looks at departments and their efficiency. The process view looks at the whole flow and the customer.");

  // ---------------- O4a · BPM versus BPI ----------------
  M("O4a-01", "O4a", 1, "Business Process Improvement, or BPI, is best described as…",
    ["A project: fix one process, then finish", "A permanent management discipline", "A type of workflow software", "A level of process maturity"],
    "BPI is a project with a start and an end. BPM is the ongoing discipline.");
  M("O4a-02", "O4a", 2, "What does BPM add on top of BPI?",
    ["Ownership, measurement and governance that outlive any single project", "A bigger budget for one project", "More software licences", "A new organisation chart"],
    "BPM includes improvement projects, and keeps processes owned, measured and governed after the project ends.");
  M("O4a-03", "O4a", 3, "A bank ran an excellent project in 2021 to speed up loans. By 2024, loans are slow again, and a new project starts. What is missing?",
    ["BPM: ongoing ownership, measurement and governance", "More BPI projects", "A higher maturity score on paper", "Customer-service training"],
    "Without governance, gains fade. An organisation that only does BPI fixes the same process every few years.");
  TF("O4a-04", "O4a", 1, "BPM includes BPI.", true,
    "True. BPM includes improvement projects, and adds ownership, measurement and governance around them.");
  TF("O4a-05", "O4a", 2, "An organisation that only runs BPI projects keeps its improvements for good.", false,
    "False. Without ongoing governance, performance slips back, and the same process needs fixing again.");
  DR("O4a-06", "O4a", 1, "BPI is a {1}; BPM is a management {2}.",
    [["project", "discipline", "software"], ["discipline", "project", "department"]],
    "BPI: fix this process, then finish. BPM: govern processes continuously.");
  DR("O4a-07", "O4a", 2, "The key difference between BPM and BPI is {1}.",
    [["governance", "the software used", "the size of the budget", "the number of staff"]],
    "Governance, who keeps owning and measuring the process after the project, is what separates BPM from BPI.");
  V("O4a-08", "O4a", 1, "Which picture represents BPM?", [
    [D.cycle("loop"), "A continuous loop: own, measure, govern, year after year"],
    [D.cycle("line"), "A project: start, fix the process, finish"],
    [D.stairs(-1), "Five maturity levels"],
    [D.flow(["Project|1", "Project|2", "Project|3"]), "A series of separate projects"],
  ], "BPM is continuous: processes are owned, measured and governed over time. A single project is BPI.");
  V("O4a-09", "O4a", 3, "Which picture shows an organisation that only does BPI?", [
    [D.flow(["*Fix|2019", "!Slips|back", "*Fix|2022", "!Slips|back", "*Fix|2025"]), "Fix, slip back, fix again every three years"],
    [D.cycle("loop"), "A continuous loop of ownership"],
    [D.stairs(4), "A process at level 5, optimising"],
    [D.flow(["*Fix", "+Owner keeps|measuring"]), "A fix, followed by an owner who keeps measuring"],
  ], "With projects only and no governance, improvements fade and the same process is fixed again and again.");
  OR("O4a-10", "O4a", 2, "Put the life of a BPI-only improvement in order.",
    ["A project fixes the process", "The project closes", "Nobody keeps measuring", "Performance slips back", "A new project starts, three years later"],
    "This is the BPI-only cycle. BPM breaks it by keeping ownership and measurement after the project closes.");
  MA("O4a-11", "O4a", 2, "Match each example to BPI or BPM.",
    [["A six-month project to cut check-in time", "BPI"], ["A check-in owner reviewing measures monthly for years", "BPM"], ["A one-off fix to a billing error", "BPI"], ["Governing processes year after year", "BPM"]],
    "Projects with an end are BPI. Continuous ownership, measurement and governance are BPM.");

  // ---------------- O4b · Process maturity ----------------
  M("O4b-01", "O4b", 1, "At which maturity level is a process standardised across the whole organisation?",
    ["Level 3, defined", "Level 1, initial", "Level 2, repeatable", "Level 5, optimising"],
    "Level 3, defined, means the process is standardised everywhere, not just documented in one place.");
  M("O4b-02", "O4b", 2, "A clinic has no agreed way of booking appointments, so each receptionist uses a different method, and results vary a lot from person to person. Which maturity level fits best?",
    ["Level 1, initial", "Level 3, defined", "Level 4, managed", "Level 5, optimising"],
    "There is no agreed procedure, and results depend on which person you get. That is the picture of level 1, where the work relies on individual effort rather than a shared way of working.");
  M("O4b-03", "O4b", 3, "A call centre at level 1 wants to launch an advanced continuous-improvement programme. What is the best advice?",
    ["First document one standard way of working; level-5 techniques fail at level 1", "Go ahead; ambition raises maturity", "Skip documentation and buy AI tools", "Claim level 3 to motivate staff"],
    "Maturity tells you which interventions will work. A level-1 process needs documenting before it can absorb continuous improvement.");
  TF("O4b-04", "O4b", 1, "Process maturity is a score to chase, not a diagnosis.", false,
    "False. Maturity is a diagnosis. It tells you which fixes will work and which will be rejected.");
  TF("O4b-05", "O4b", 2, "Different processes in the same organisation can sit at different maturity levels.", true,
    "True. That is why you assess the process, not the whole company.");
  DR("O4b-06", "O4b", 1, "Level 4 is {1}: the process is measured and controlled against {2}.",
    [["managed", "defined", "initial"], ["targets", "rumours", "job titles"]],
    "Level 4, managed, means the process is measured and controlled against targets.");
  DR("O4b-07", "O4b", 2, "The most common misuse of maturity models is claiming a level without {1}.",
    [["evidence", "a budget", "a consultant", "a logo"]],
    "A maturity level only means something if there is evidence for it.");
  V("O4b-08", "O4b", 1, "Which staircase highlights level 2, repeatable?", [
    [D.stairs(1), "Level 2, repeatable, highlighted"],
    [D.stairs(0), "Level 1, initial, highlighted"],
    [D.stairs(2), "Level 3, defined, highlighted"],
    [D.stairs(3), "Level 4, managed, highlighted"],
  ], "Level 2 is the second step: documented, and followed most of the time.");
  V("O4b-09", "O4b", 3, "A hotel's check-in is ad hoc, but its billing is measured and controlled against targets. Which picture fits?", [
    [D.stairs([0, 3], { alt: "Check-in at level 1, billing at level 4" }), "Check-in at level 1, billing at level 4"],
    [D.stairs(2, { alt: "The whole company at level 3" }), "The whole company at level 3"],
    [D.stairs([3, 4], { alt: "Levels 4 and 5" }), "Processes at levels 4 and 5"],
    [D.stairs([0, 1], { alt: "Levels 1 and 2" }), "Processes at levels 1 and 2"],
  ], "Ad hoc is level 1, initial. Measured and controlled is level 4, managed. One company can have both.");
  OR("O4b-10", "O4b", 1, "Put the maturity levels in order, from lowest to highest.",
    ["Initial", "Repeatable", "Defined", "Managed", "Optimising"],
    "Initial, repeatable, defined, managed, optimising: from heroic effort to continuous improvement by the people doing the work.");
  MA("O4b-11", "O4b", 2, "Match each maturity level to its description.",
    [["Initial", "Heroic effort; results vary by person"], ["Repeatable", "Documented and followed most of the time"], ["Managed", "Measured and controlled against targets"], ["Optimising", "Improved continuously by the people doing it"]],
    "Each level adds something: documentation, then standards, then measurement, then continuous improvement.");

  // ---------------- O4c · The framework: a route, not a ratchet ----------------
  M("O4c-01", "O4c", 1, "How many phases does this course's BPM framework have?",
    ["Ten", "Five", "Three", "Fourteen"],
    "There are ten phases, worked across weeks 5 to 14.");
  M("O4c-02", "O4c", 2, "Which three essentials run through every phase of the framework?",
    ["Project management, people change management and leadership", "Strategy, architecture and launch pad", "Develop, implement and realise value", "Budget, software and training"],
    "These three are not phases. They are present in every phase.");
  M("O4c-03", "O4c", 3, "In the Understand phase, a team discovers its process architecture was wrong. What should it do?",
    ["Go back to the process architecture work; the framework is a route, not a ratchet", "Carry on, because phases can never be revisited", "Restart the whole programme from week 1", "Skip ahead to Implement to save time"],
    "Later learning routinely sends you back. Returning to the architecture work is the framework working as intended.");
  TF("O4c-04", "O4c", 1, "The three continuous essentials are a separate phase, done once in week 7.", false,
    "False. Project management, people change management and leadership run through every phase.");
  TF("O4c-05", "O4c", 2, "The phases are worked in sequence, but what you learn later can send you back to an earlier phase.", true,
    "True. That is what 'a route, not a ratchet' means.");
  TF("O4c-06", "O4c", 3, "Treating the framework as a strict checklist is the safest way to deliver a system people will use.", false,
    "False. Programmes that treat the framework as a checklist are the ones that deliver a system nobody uses.");
  DR("O4c-07", "O4c", 1, "The framework is a {1}, not a {2}.",
    [["route", "ratchet", "rulebook"], ["ratchet", "route", "map"]],
    "A ratchet only turns one way. A route lets you go back when you learn something new.");
  DR("O4c-08", "O4c", 2, "The first phase is organisation {1}, and the last is sustainable {2}.",
    [["strategy", "budget", "culture"], ["performance", "profit", "growth"]],
    "The framework runs from organisation strategy in week 5 to sustainable performance in week 14.");
  V("O4c-09", "O4c", 2, "Which picture shows 'a route, not a ratchet'?", [
    [D.route([1, 3], { back: [3, 1], alt: "Phases in order, with an arrow back from Understand to Process architecture" }), "Phases in order, with an arrow going back to an earlier phase"],
    [D.cycle("line"), "Start, fix, finish"],
    [D.stairs(-1), "A staircase of five levels"],
    [D.flow(["Phase|1", "Phase|2", "Phase|3", "!No way|back"]), "Phases that only move forward, with no way back"],
  ], "A route is followed in order, but you go back when later learning shows an earlier phase was wrong.");
  V("O4c-10", "O4c", 1, "Which picture highlights the three continuous essentials?", [
    [D.route([], { band: true }), "The band under all ten phases is highlighted"],
    [D.route([0, 1, 2]), "The first three phases are highlighted"],
    [D.route([6, 7, 8, 9]), "The last four phases are highlighted"],
    [D.route([3, 4, 5]), "The middle three phases are highlighted"],
  ], "The essentials are the band running underneath every phase, not a phase of their own.");
  OR("O4c-11", "O4c", 2, "Put these phases in the order the framework follows.",
    ["Organisation strategy", "Process architecture", "Launch pad", "Understand", "Innovate"],
    "These are the first five phases, weeks 5 to 9.");
  OR("O4c-12", "O4c", 3, "Put these later phases in order.",
    ["People", "Develop", "Implement", "Realise value", "Sustainable performance"],
    "These are the last five phases, weeks 10 to 14.");
  MA("O4c-13", "O4c", 2, "Match each phase to its week in the course.",
    [["Organisation strategy", "Week 5"], ["Understand", "Week 8"], ["People", "Week 10"], ["Sustainable performance", "Week 14"]],
    "The ten phases run from week 5 to week 14, one phase per week.");

  // ---------------- Additions from the GPT-6 review (verified, rewritten in plain sentences, types rebalanced) ----------------
  M("O1a-13", "O1a", 3, "A company says its complaint process is finished when an employee closes the complaint record. Which question best tests whether the process has really delivered its outcome?",
    ["Has the complaint actually been resolved, and has the customer been told the result?", "Has the employee closed the required number of complaint records this week?", "Has the department met its weekly productivity target?", "Has the complaint record been moved to the archive?"],
    "Closing a record inside the company is not the same as solving the customer's problem. A process ends with the outcome the customer values, so you have to check whether the complaint was resolved and the customer was told.");
  V("O1b-12", "O1b", 3, "A university wants to find out why students wait ten days between asking for a transcript and receiving it. Which boundary should the process map use?", [
    [D.flow(["Student|requests", "Registrar|checks", "Finance|confirms", "Printing", "Student|receives"], { bracket: [0, 4, "Boundary"] }), "From the student's request to the student receiving the transcript"],
    [D.flow(["Student|requests", "Registrar|checks", "Finance|confirms", "Printing", "Student|receives"], { bracket: [1, 1, "Boundary"] }), "Only the registrar's check"],
    [D.flow(["Student|requests", "Registrar|checks", "Finance|confirms", "Printing", "Student|receives"], { bracket: [3, 3, "Boundary"] }), "Only the printing step"],
    [D.flow(["Student|requests", "Registrar|checks", "Finance|confirms", "Printing", "Student|receives"], { bracket: [2, 3, "Boundary"] }), "From the finance check to printing"],
  ], "The question is about the student's whole ten-day wait, so the boundary must start at the student's request and end when the student has the transcript. Any shorter map would leave some of the waiting outside the picture.");
  TF("O1b-13", "O1b", 3, "A map of only the warehouse part of an online return can still be useful, for example to study warehouse performance, even though it cannot explain the customer's whole return experience.", true,
    "True. The right boundary depends on the question you are asking. A warehouse map helps with a warehouse question, but to explain the customer's experience you need the boundary from clicking Return to the refund.");
  DR("O2a-12", "O2a", 3, "A bank's sales, credit and operations teams all meet their targets, yet customers complain about slow loans. The best measure of the whole process is the time from {1} to {2}.",
    [["the customer's application", "the first sales call", "the weekly credit meeting"], ["the decision being communicated to the customer", "the credit analyst's report", "the end of the working day"]],
    "Each team's own target only covers its slice. The customer feels the whole journey, so the measure that matters runs from the application to the moment the customer hears the decision.");
  M("O2a-13", "O2a", 3, "A university cuts the time to check student documents from two days to one. But students still wait twelve days for an admission decision, because applications sit in queues between departments. What is the most sensible conclusion?",
    ["The faster document check is useful, but the whole admission process still needs attention", "The improvement has failed, because the total waiting time did not fall straight away", "The university should stop measuring each department and only ask students how satisfied they are", "The admission process is now efficient, because the document check takes only one day"],
    "A local improvement can be worth keeping even when it does not fix the whole journey. The twelve-day wait comes from the queues between departments, so that is where the university should look next.");
  TF("O2b-12", "O2b", 3, "A request takes ten days in total, but people actively work on it for only two of those days. Managers should look first at the eight days of waiting between the steps.", true,
    "True. Most of the time is spent waiting, not working. Speeding up the work itself could save very little, while reducing the queues between steps could save most of the ten days.");
  M("O2b-13", "O2b", 3, "A hospital cannot remove the handoff between the emergency department and a specialist ward, because each team has different expertise. Which change is most likely to improve that handoff?",
    ["Make sure the ward receives complete patient information and clearly accepts responsibility for the next step", "Remove every performance measure that relates to the transfer", "Ask the emergency team to carry out the ward's specialist treatment as well", "Delay each transfer until every department has finished its monthly reports"],
    "Some handoffs are necessary. A good handoff passes on complete information and makes it clear who is responsible next, so the patient does not wait and nothing is lost along the way.");
  DR("O2b-14", "O2b", 3, "A shop halves the time it takes to process an order, but deliveries arrive no sooner, because every order still waits for the {1}. This shows that improving one step does not necessarily shorten the {2} time.",
    [["daily courier collection", "order-processing team", "payment check"], ["complete order-to-delivery", "order-processing", "courier's driving"]],
    "The order now waits longer for the same daily courier, so the customer sees no difference. Before improving a step, look at the whole flow to find what really decides the total time.");
  M("O3a-12", "O3a", 3, "A hospital wants to reduce how long patients wait between their emergency assessment and getting a bed on a ward. Several departments contribute to the delay. Which arrangement is most likely to help?",
    ["Appoint a patient-flow owner, measure the whole wait from assessment to bed, and coordinate changes across the departments involved", "Ask each department to improve its own productivity without looking at the patient's whole journey", "Give the emergency department sole responsibility for every step of patient flow", "Introduce a separate dashboard for each department, without making anyone responsible for the overall wait"],
    "No single department can fix a delay that sits between departments. A named owner, an end-to-end measure and coordinated changes are exactly what a process-centred organisation puts in place.");
  DR("O3a-13", "O3a", 3, "A retailer appoints a returns process owner, while the warehouse and finance teams keep their own managers. The owner is responsible for the {1} returns process, and works through agreed {2} with those managers.",
    [["complete", "warehouse part of the", "finance part of the"], ["decision rights", "job titles", "office space"]],
    "The departments keep their managers, but one person owns the whole returns flow. That only works if everyone has agreed what the owner is allowed to decide across the departments.");
  M("O3b-12", "O3b", 3, "A bank's complaints process owner finds a delay caused by two departments arguing about who is responsible. She cannot settle the argument herself. What would help most?",
    ["A clear escalation route to senior managers who can make a decision across both departments", "A rule that the owner must personally do the work of both departments", "A rule that stops departments from sharing performance information", "A decision to stop measuring how long complaints take to resolve"],
    "An owner needs a way to get cross-department problems decided. A clear escalation route gives her that authority indirectly, so the problem does not simply sit between the two departments.");
  TF("O3b-13", "O3b", 3, "A university measures how quickly its admissions staff check documents, and also the total time from application to decision. Using both measures together is a sensible way to see both the department and the whole process.", true,
    "True. The department's measure shows how one step is working, and the end-to-end measure shows what the student actually experiences. Together they tell a much fuller story than either one alone.");
  M("O3b-14", "O3b", 3, "A hotel appoints a check-in process owner and measures the total time guests take to reach their rooms. But the owner cannot influence the booking systems, the room-cleaning schedule or any department's priorities. What should senior management fix first?",
    ["Give the owner clear decision rights, and set up cooperation and an escalation route with the departments", "Remove the end-to-end measure, because the owner cannot control every step", "Give the owner more reports to write, without changing what she is allowed to decide", "Go back to department measures only, and stop coordinating check-in"],
    "The owner and the measure are both right; what is missing is authority. Without decision rights or a way to escalate, the owner has a title but no way to change the things that slow the guest down.");
  M("O4a-12", "O4a", 3, "A bank has a process owner who reviews loan performance every month. When processing time starts to rise, the bank runs a project to remove unnecessary approval steps. Which description is most accurate?",
    ["The bank uses BPM to manage the loan process continuously, and a BPI project to improve it", "The bank only uses BPI, because the project has a clear objective", "The bank only uses BPM, because an owner reviews the performance", "The bank is not using BPM, because projects should never be part of ongoing management"],
    "The monthly review by an owner is BPM, the ongoing discipline. The project to remove approval steps is BPI. BPM includes BPI projects like this one, and keeps watching afterwards.");
  M("O4a-13", "O4a", 3, "A hospital redesigns patient registration and cuts waiting time by 30 percent. Six months later, nobody is checking how registration is performing. What is the main risk?",
    ["The gains may fade, and new problems may go unnoticed, because nobody is watching the process", "The redesign must be repeated, because improvement projects never produce any results", "The hospital should remove the registration process owner", "The improvement does not count, because it was done as a project"],
    "The project worked, but without ongoing ownership and measurement nobody will notice if waiting times creep back up. That is exactly the gap that BPM's governance is meant to close.");
  DR("O4a-14", "O4a", 3, "A retailer identifies its main processes, appoints owners, sets performance measures and reviews improvement priorities regularly. This is {1}, and not just a single {2}.",
    [["Business Process Management", "functional reporting", "a maturity level"], ["improvement project", "department", "software tool"]],
    "Owning, measuring and regularly reviewing processes is the ongoing discipline of BPM. A single improvement project would stop when it finished.");
  M("O4a-16", "O4a", 3, "A company installs workflow software to automate customer requests, but nobody owns the process and nobody checks whether service has improved. Which conclusion is most defensible?",
    ["Automation alone is not BPM, because ownership and performance measurement are still missing", "The company has fully implemented BPM, because the software now controls the work", "The company has finished BPI, because every manual step has been removed", "Process ownership is no longer needed once the work is automated"],
    "Software can support BPM, but it does not replace it. Without an owner and without measuring the results, nobody is managing whether the process actually serves the customer better.");
  MA("O4a-17", "O4a", 3, "Match each activity to its main purpose in managing processes.",
    [["Removing duplicate data entry", "Improving how the process performs"], ["Making one person accountable for the process for good", "Establishing process ownership"], ["Reviewing the cycle time every month", "Monitoring process performance"], ["Agreeing how decisions across departments are made", "Establishing process governance"]],
    "Removing duplicate typing improves the work itself. Naming an accountable person creates ownership, the monthly review is monitoring, and agreeing how cross-department decisions are made is governance.");
  TF("O4b-12", "O4b", 3, "A manager says a process is at level 4, managed, because written procedures exist, even though no performance measures are collected. The evidence supports level 4.", false,
    "False. Level 4 means the process is measured and controlled against targets. Written procedures alone do not show that, so the claim is not supported by evidence.");
  M("O4b-13", "O4b", 3, "A service process gives inconsistent results, because each employee follows a different procedure. What is the best first priority?",
    ["Understand the differences, and agree one reliable basic way of working", "Introduce advanced optimisation software before looking at the current process", "Give the process a higher maturity rating to encourage the staff", "Stop collecting performance information until the process reaches level 4"],
    "When everyone works differently, there is no standard to measure or improve yet. Agreeing one reliable way of working comes first, and the more advanced methods can follow later.");
  OR("O4c-14", "O4c", 3, "During the Innovate phase, a team discovers that its new design does not address the main cause of customer delays. Put the sensible next steps in order.",
    ["Record what the new evidence shows", "Go back to the earlier analysis of the cause", "Revise the design so that it addresses that cause", "Then continue towards implementation"],
    "The framework is a route, not a ratchet. When new evidence shows the design misses the cause, the team goes back, fixes the design, and only then moves forward again.");
  TF("O4c-15", "O4c", 3, "A hotel installs a new check-in system on time and within budget, but guests wait just as long as before. This shows that the Realise Value phase has succeeded.", false,
    "False. Delivering the system on time and on budget is not the same as delivering the benefit. Realise Value asks whether guests actually wait less, and here they do not.");
  MA("O4c-16", "O4c", 3, "Match each part of the BPM framework to its main contribution.",
    [["Project management", "Coordinates activities, resources and delivery"], ["People change management", "Helps employees understand and adopt new ways of working"], ["Leadership", "Gives direction, commitment and support"], ["The Realise Value phase", "Checks whether the expected benefits have actually been achieved"]],
    "Project management, people change management and leadership run through every phase. Realise Value is different: it is one of the ten phases, and it checks whether the promised benefits really arrived.");

  // ---------- normalise to the documented schema ----------
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
