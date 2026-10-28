// W08-bank
//
// OPER621 Week 8 - The Understand Phase. Question bank, 12 items per part.
// Types: mcq, tf, drop, visual, order, match. Correct option is written FIRST; the player shuffles.
// Visual questions use only: flow, lanes, hier, stairs, org, bars, route, cycle.

(() => {
  "use strict";

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
    add(
      "visual",
      id,
      sec,
      d,
      q,
      {
        o: opts.map((x) => x[1]),
        svg: opts.map((x) => x[0])
      },
      why
    );

  const OR = (id, sec, d, q, items, why) =>
    add("order", id, sec, d, q, { items }, why);

  const MA = (id, sec, d, q, pairs, why) =>
    add("match", id, sec, d, q, { pairs }, why);



// W8O1a · Understand before you improve
// Correct answers are written first; the bank player shuffles options.
 
M("W8O1a-01", "W8O1a", 1, "What is the main purpose of the Understand phase in the BPM framework?",
  ["Establish how the current process actually operates and performs before designing improvements", "Implement the process changes approved during Launch Pad", "Select the software that will automate the redesigned process", "Demonstrate that the improvement programme has already delivered its expected benefits"],
  "Understand establishes an evidence-based picture of the current process, including its activities, performance and problems. This foundation allows later redesign decisions to address demonstrated needs rather than assumptions.");
 
M("W8O1a-02", "W8O1a", 2, "Qasr's general manager wants to install new reception software immediately after a guest complains. What is the most defensible response?",
  ["Investigate the actual guest arrival process and its causes of delay before selecting a solution", "Install the software because the complaint demonstrates that existing technology is inadequate", "Increase reception staffing because every arrival delay must originate at the front desk", "Postpone all investigation until the proposed software has been implemented"],
  "A complaint establishes that a problem deserves attention, but it does not establish its underlying cause. Understand prevents premature investment by examining actual activities and dependencies before choosing improvements.");
 
TF("W8O1a-03", "W8O1a", 1, "Understand is phase four of the ten-phase BPM framework, following Organisation Strategy, Process Architecture and Launch Pad.", true,
  "This statement is true. Understand follows the three preparatory phases and establishes evidence about current process performance before Innovate develops possible future designs.");
 
TF("W8O1a-04", "W8O1a", 2, "An as-is model should exclude informal employee workarounds because they do not appear in the organisation's approved procedures.", false,
  "This statement is false. An as-is model describes work as employees actually perform it. Informal workarounds may reveal missing information, operational dependencies or activities that materially affect process performance.");
 
DR("W8O1a-05", "W8O1a", 1, "During Understand, the team develops an {1} model of current operations and establishes a measured {2} for later comparison.",
  [["as-is", "to-be", "automated"], ["baseline", "redesign", "implementation"]],
  "An as-is model describes how the current process operates. A baseline records its measured performance, allowing later changes to be evaluated against a documented starting position.");
 
DR("W8O1a-06", "W8O1a", 3, "A process model describes how employees actually work, but managers cannot determine whether later changes improved performance. The missing evidence is a quantified {1}, which will support the {2} of realised benefits.",
  [["baseline", "organisation chart", "software specification"], ["evaluation", "assumption", "announcement"]],
  "A quantified baseline provides the original performance measure needed for meaningful comparison. Later benefits evaluation requires comparable evidence rather than relying on claims that a redesigned process should perform better.");
 
V("W8O1a-07", "W8O1a", 2, "Which diagram correctly places Understand within the BPM framework?", [
  [D.route([3]), "Understand is highlighted as phase four of the ten-phase framework"],
  [D.route([2]), "Launch Pad is highlighted as the phase currently being investigated"],
  [D.route([4]), "Innovate is highlighted as the phase currently being investigated"],
  [D.route([0]), "Organisation Strategy is highlighted as the phase currently being investigated"]
], "Understand is phase four, following Organisation Strategy, Process Architecture and Launch Pad. Innovate follows Understand because evidence about the current process should inform the development of future process designs.");
 
V("W8O1a-08", "W8O1a", 3, "Which diagram best represents a defensible investigation of Qasr's current guest arrival process?", [
  [D.flow(["Observe|real arrivals", "Model|actual work", "Measure|performance", "Investigate|causes", "Validate|findings"]), "Observe actual arrivals, model the work, measure performance, investigate causes and validate findings"],
  [D.flow(["Choose|software", "Install|system", "Train|employees", "Assume|improvement"]), "Select and install software before investigating the existing process"],
  [D.flow(["Read|procedure", "Copy|activities", "Ignore|exceptions", "Approve|model"]), "Copy the written procedure and exclude operational exceptions"],
  [D.flow(["Guest|complains", "Blame|reception", "Increase|staffing", "Close|investigation"]), "Treat one complaint as proof that reception staffing causes the problem"]
], "A defensible Understand investigation examines actual work, measures current performance and investigates causes before validating its findings. The alternatives select solutions or conclusions without sufficient evidence.");
 
OR("W8O1a-09", "W8O1a", 2, "Put these activities in the logical order for investigating Qasr's current arrival process before redesign.",
  ["Observe how guest arrivals actually operate", "Document activities, handoffs and undocumented work", "Measure current performance using defined boundaries", "Investigate the causes of observed problems", "Validate the findings with employees performing the work"],
  "The investigation begins by establishing what actually happens, then develops a model and supporting performance evidence. Investigating causes and validating findings create a defensible foundation for later redesign.");
 
OR("W8O1a-10", "W8O1a", 3, "Put these BPM activities in the framework sequence that connects programme preparation with later benefits evaluation.",
  ["Establish the programme foundations through Launch Pad", "Investigate current operations during Understand", "Develop future process alternatives during Innovate", "Implement the selected process changes", "Evaluate achieved benefits during Realize Value"],
  "Launch Pad prepares the programme, and Understand establishes current process evidence. Innovate develops alternatives, implementation puts selected changes into operation, and Realize Value evaluates whether the intended benefits were achieved.");
 
MA("W8O1a-11", "W8O1a", 2, "Match each Understand concept to its contribution to Qasr's investigation.",
  [["As-is model", "Describes the activities and handoffs employees actually perform"], ["Baseline", "Records current performance for later comparison"], ["Root cause analysis", "Investigates why recurring process problems occur"], ["Employee validation", "Checks whether the model reflects operational reality"]],
  "The as-is model explains how work currently operates, while the baseline quantifies its performance. Root cause analysis investigates underlying problems, and employee validation helps establish whether the description accurately reflects actual practice.");
 
MA("W8O1a-12", "W8O1a", 3, "Match each proposed management action to the BPM purpose it serves.",
  [["Observe undocumented reception activities", "Understand the current process"], ["Design a different corporate-rate approval arrangement", "Innovate the future process"], ["Put the approved process design into operation", "Implement the selected changes"], ["Compare subsequent guest arrival performance with the original baseline", "Evaluate realised benefits"]],
  "Observing current work belongs to Understand because it establishes operational evidence. Developing alternatives belongs to Innovate, putting approved changes into operation belongs to implementation, and comparing outcomes with the baseline supports benefits evaluation.");

// W8O1b · The process nobody wrote down
// Correct answers are written first; the bank player shuffles options.
 
M("W8O1b-01", "W8O1b", 1, "What is the most important difference between an official procedure and an as-is process model?",
  ["The as-is model describes how work actually happens, including activities missing from the procedure", "The as-is model describes how managers want employees to work after redesign", "The official procedure always provides more reliable evidence than direct observation", "The as-is model includes only activities formally approved by senior management"],
  "An official procedure describes intended work, while an as-is model captures how employees actually perform it. The model must include consequential undocumented activities, exceptions and handoffs because these affect real process performance.");
 
M("W8O1b-02", "W8O1b", 2, "At Qasr, a receptionist telephones another colleague to clarify a corporate booking, although the written procedure never mentions this call. What should the investigator do?",
  ["Include the clarification activity in the as-is model and investigate why it occurs", "Exclude the call because it is not part of the approved procedure", "Treat the call as proof that the receptionist is performing poorly", "Immediately replace the telephone call with automated approval software"],
  "The telephone call is part of the actual process when employees use it to complete guest arrivals. Including it makes the model more accurate, while investigating its purpose helps explain operational dependencies without prematurely selecting a solution.");
 
M("W8O1b-03", "W8O1b", 3, "A process investigator produces a diagram containing every mouse click, screen change and keyboard action at reception. What is the strongest criticism?",
  ["The excessive detail may obscure the activities, responsibilities and handoffs needed to understand performance", "An as-is model must always contain fewer than five activities", "Individual tasks should never appear in any process model", "The diagram is invalid unless every activity crosses a departmental boundary"],
  "An appropriate level of detail depends on the investigation's purpose. The model should reveal meaningful activities, responsibilities, exceptions and delays without allowing minor operational details to obscure important process relationships.");
 
TF("W8O1b-04", "W8O1b", 1, "A swimlane diagram helps investigators identify which participant performs each activity and where responsibility passes between participants.", true,
  "This statement is true. Swimlanes make responsibilities visible by placing activities within their corresponding participants or departments. Changes between lanes reveal handoffs that may introduce waiting, clarification or rework.");
 
TF("W8O1b-05", "W8O1b", 2, "An undocumented workaround should automatically be eliminated because it proves that employees are ignoring the correct process.", false,
  "This statement is false. A workaround may compensate for missing information, poorly connected systems or necessary operational dependencies. Understand investigates why employees use it before deciding whether any change is justified.");
 
DR("W8O1b-06", "W8O1b", 1, "A process diagram that places activities within the departments performing them is a {1} model. A transfer of work or information between participants is called a {2}.",
  [["swimlane", "maturity", "financial"], ["handoff", "baseline", "target"]],
  "A swimlane model makes responsibility for each activity visible. A handoff occurs when work or information passes between participants, potentially introducing waiting, lost information or unclear responsibility.");
 
DR("W8O1b-07", "W8O1b", 2, "When an arrival requires additional approval, it follows an {1} path. The as-is model should capture meaningful variations while maintaining an appropriate level of {2}.",
  [["exceptional", "automated", "completed"], ["detail", "profitability", "authority"]],
  "An exceptional path differs from the routine process because additional conditions or activities are involved. Appropriate detail makes consequential exceptions visible without overwhelming the model with unnecessary operational information.");
 
V("W8O1b-08", "W8O1b", 2, "Which diagram best represents a swimlane model showing a guest arrival that requires coordination between departments?", [
  [D.lanes(["Reception", "Revenue", "Housekeeping"], [[0, "Check booking"], [1, "Confirm rate"], [0, "Assign room"], [2, "Release room"]]), "Reception checks the booking, revenue confirms the rate, reception assigns the room and housekeeping releases it"],
  [D.lanes(["Reception", "Revenue", "Housekeeping"], [[0, "Check booking"], [0, "Confirm rate"], [0, "Assign room"], [0, "Release room"]]), "Every activity is assigned to reception, including rate confirmation and room release"],
  [D.lanes(["Reception", "Revenue", "Housekeeping"], [[1, "Check booking"], [1, "Confirm rate"], [1, "Assign room"], [1, "Release room"]]), "Every activity is assigned to revenue, including reception and housekeeping work"],
  [D.lanes(["Reception", "Revenue", "Housekeeping"], [[2, "Check booking"], [2, "Confirm rate"], [2, "Assign room"], [2, "Release room"]]), "Every activity is assigned to housekeeping, including booking and rate confirmation"]
], "The correct swimlane separates activities according to the participants responsible for performing them. This makes cross-department handoffs visible and helps investigators understand where coordination or waiting may affect the guest.");
 
V("W8O1b-09", "W8O1b", 3, "Which diagram best represents an as-is investigation that captures an undocumented clarification before a guest can continue?", [
  [D.flow(["Check|reservation", "!Request|clarification", "Receive|confirmation", "Continue|arrival"]), "The model includes the clarification request and response before the arrival continues"],
  [D.flow(["Check|reservation", "Continue|arrival"]), "The model omits clarification because it does not appear in the official procedure"],
  [D.flow(["Check|reservation", "Install|software", "Continue|arrival"]), "The model replaces the current clarification activity with a proposed software solution"],
  [D.flow(["Check|reservation", "!Blame|employee", "Continue|arrival"]), "The model treats the clarification as evidence of employee failure without investigating its purpose"]
], "An as-is model must represent consequential activities that actually occur, including undocumented clarification work. The other diagrams either omit observed work or introduce premature conclusions and redesign decisions.");
 
OR("W8O1b-10", "W8O1b", 2, "Put these activities in the logical order for developing and validating Qasr's as-is guest arrival model.",
  ["Observe how employees handle actual guest arrivals", "Identify activities, participants and departmental handoffs", "Document routine activities and meaningful exceptional paths", "Compare the emerging model with employee accounts", "Correct supported omissions and validate the model with process performers"],
  "A defensible model begins with evidence about actual work. Investigators then represent activities and exceptions, compare the description with operational knowledge, and validate corrections before relying on the model for further analysis.");
 
MA("W8O1b-11", "W8O1b", 2, "Match each process modelling concept to its meaning.",
  [["Swimlane", "Shows which participant or department performs each activity"], ["Handoff", "Transfers work or information between participants"], ["Workaround", "An informal method used to overcome an operational difficulty"], ["Exceptional path", "A variation requiring activities beyond the routine process"]],
  "Swimlanes clarify responsibility, while handoffs reveal transfers between participants. Workarounds show how employees overcome practical difficulties, and exceptional paths capture meaningful variations from routine processing.");
 
MA("W8O1b-12", "W8O1b", 3, "Match each finding during an as-is investigation to the most appropriate response.",
  [["Employees report an undocumented approval call", "Observe the activity and include it when evidence confirms its occurrence"], ["A manager and receptionist describe different arrival procedures", "Compare their accounts with actual cases and investigate the differences"], ["The model contains hundreds of minor screen actions", "Retain the detail needed to explain responsibilities, handoffs and performance"], ["Employees identify a missing exception during validation", "Examine the evidence and correct the model when the omission is confirmed"]],
  "An as-is investigation aims to establish an accurate and usable description of current operations. Observed work should be represented, conflicting accounts investigated, unnecessary detail controlled, and supported employee corrections incorporated before the model is accepted.");

// W8O1c · Finding evidence that people can trust
// Correct answers are written first; the bank player shuffles options.
 
M("W8O1c-01", "W8O1c", 1, "What is the main purpose of walking a case during Qasr's Understand investigation?",
  ["Trace an actual guest arrival through its activities, decisions, waiting and handoffs", "Confirm that employees follow every step of the approved procedure", "Measure only the activities performed directly by reception employees", "Identify which individual employee should be blamed for the longest delay"],
  "Walking a case means following an actual transaction through the relevant process from beginning to end. This reveals activities, dependencies and waiting that may remain invisible when investigators examine departments separately.");
 
M("W8O1c-02", "W8O1c", 2, "A receptionist describes frequent corporate-rate clarifications, but the supervisor says they rarely occur. What should the investigator do?",
  ["Compare their separate accounts with observations and records from actual arrivals", "Accept the supervisor's explanation because managers have greater operational authority", "Accept the receptionist's explanation because frontline employees always know the complete process", "Remove corporate-rate clarification from the model until both participants provide identical accounts"],
  "Different participants may describe the same process differently because their responsibilities and experiences differ. The investigator should reconcile their accounts using independent evidence rather than automatically accepting either person's authority or recollection.");
 
M("W8O1c-03", "W8O1c", 3, "Qasr's system records the exact time a room key is encoded. Why might this timestamp still be insufficient for measuring the complete arrival process?",
  ["It does not establish when the guest entered the lobby or what happened before key encoding", "A system timestamp is unreliable whenever employees perform activities outside the system", "The timestamp becomes useful only when every guest follows exactly the same arrival path", "The timestamp proves that all waiting before key encoding was caused by reception employees"],
  "A precise timestamp establishes when a recorded event occurred, but it does not automatically capture the complete customer journey. Investigators must understand the measurement boundary and identify relevant activities outside the recorded events.");
 
TF("W8O1c-04", "W8O1c", 1, "Interviewing employees and supervisors separately can reveal operational disagreements that participants might hesitate to express together.", true,
  "This statement is true. Separate interviews can reduce pressure to agree with managerial descriptions and reveal different experiences of the process. Investigators should subsequently compare those accounts with observations and other available evidence.");
 
TF("W8O1c-05", "W8O1c", 2, "Observing one uncomplicated guest arrival during a quiet period is sufficient to establish how Qasr's arrival process normally operates.", false,
  "This statement is false. One uncomplicated arrival cannot establish how the wider process behaves under different conditions. A suitable sample should include meaningful variation, including routine and exceptional cases.");
 
DR("W8O1c-06", "W8O1c", 1, "Following one actual guest arrival through its activities and handoffs is called {1}. Examining selected arrivals across relevant operating conditions is called {2}.",
  [["walking a case", "designing a future state", "automating a workflow"], ["sampling", "implementation", "process ownership"]],
  "Walking a case reveals what happens during an individual transaction. Sampling examines a selection of cases to understand variation and recurring patterns across the wider process.");
 
DR("W8O1c-07", "W8O1c", 3, "When interviews and system records disagree, the investigator should {1} the discrepancy. Before accepting the resulting as-is model, the team should seek {2} from people performing the work.",
  [["investigate", "conceal", "average away"], ["validation", "redesign approval", "software certification"]],
  "Conflicting evidence may reveal different measurement boundaries, undocumented activities or exceptional process paths. Investigating the discrepancy and validating the model with process performers strengthens its accuracy and credibility.");
 
V("W8O1c-08", "W8O1c", 2, "Which diagram represents the strongest evidence-gathering approach for Qasr's as-is investigation?", [
  [D.flow(["Observe|cases", "Interview|participants", "Examine|records", "Reconcile|differences", "Validate|model"]), "Combine observation, interviews and records before reconciling differences and validating the model"],
  [D.flow(["Read|procedure", "Accept|description", "Approve|model"]), "Rely on the documented procedure without examining actual operational behaviour"],
  [D.flow(["Interview|manager", "Discard|disagreements", "Approve|model"]), "Accept the manager's account and remove conflicting employee explanations"],
  [D.flow(["Inspect|timestamps", "Assume|complete", "Publish|baseline"]), "Treat system timestamps as a complete description of the process without checking their boundaries"]
], "The strongest approach combines complementary evidence sources and investigates disagreements before validating the resulting model. No single source automatically captures every activity, dependency or exception within the actual process.");
 
V("W8O1c-09", "W8O1c", 3, "Which diagram best represents an investigation that avoids generalising from one convenient arrival?", [
  [D.flow(["Select|arrivals", "Include|routine cases", "!Include|exceptions", "Compare|observations", "Validate|findings"]), "Examine routine and exceptional arrivals before comparing observations and validating findings"],
  [D.flow(["Observe|quiet arrival", "Assume|typical", "Approve|model"]), "Treat one uncomplicated arrival as representative of the entire process"],
  [D.flow(["Select|complaints", "Exclude|routine cases", "Generalise|findings"]), "Examine only difficult arrivals and assume they represent every guest"],
  [D.flow(["Ask|supervisor", "Estimate|frequency", "Ignore|records"]), "Use managerial estimates without examining actual cases or available records"]
], "A suitable sample should capture meaningful variation rather than relying exclusively on convenient or unusually difficult cases. Comparing routine and exceptional arrivals helps investigators distinguish recurring process behaviour from isolated experiences.");
 
OR("W8O1c-10", "W8O1c", 2, "Put these activities in the logical order for resolving a disagreement about Qasr's guest arrival process.",
  ["Identify the conflicting descriptions of the activity", "Clarify what each participant means and which cases they describe", "Examine relevant observations and operational records", "Reconcile the accounts using the available evidence", "Document the conclusion and validate the corrected model"],
  "The investigator must understand the disagreement before selecting evidence capable of resolving it. Comparing observations and records supports a defensible conclusion, which should then be documented and checked with process performers.");
 
MA("W8O1c-11", "W8O1c", 2, "Match each evidence source to its principal contribution during the Understand investigation.",
  [["Direct observation", "Reveals activities and waiting as they occur during actual cases"], ["Employee interviews", "Explain workarounds, responsibilities and operational difficulties"], ["System records", "Provide recorded events and timestamps within the system's boundaries"], ["Employee validation", "Identifies omissions or inaccuracies in the emerging process model"]],
  "Each evidence source contributes something different to understanding the current process. Combining observation, participant explanations, system records and validation reduces dependence on any single incomplete perspective.");
 
MA("W8O1c-12", "W8O1c", 3, "Match each evidence problem to the most defensible investigative response.",
  [["The system records key encoding but not lobby arrival", "Clarify the system boundary and obtain evidence of the missing journey"], ["A supervisor and receptionist disagree about approval frequency", "Compare their accounts with observations and relevant transaction records"], ["The sample contains only uncomplicated arrivals", "Include meaningful operating variation and exceptional cases"], ["Employees identify an omitted handoff in the draft model", "Investigate the omission and incorporate it when supported by evidence"]],
  "Trustworthy process evidence requires explicit measurement boundaries, suitable sampling and careful reconciliation of conflicting accounts. Supported employee corrections should improve the model, while conclusions must remain traceable to observations and reliable records.");

// W8O2a · Whose clock are we using?
// Correct answers are written first; the bank player shuffles options.
 
M("W8O2a-01", "W8O2a", 1, "What determines the measurement boundary of a process duration?",
  ["The events selected to start and stop the measurement clock", "The department employing the largest number of process participants", "The amount of active work performed by the busiest employee", "The performance target preferred by the process manager"],
  "Measurement boundaries define when the process clock begins and ends. Different boundaries can produce different valid durations because they include different activities and waiting periods.");
 
M("W8O2a-02", "W8O2a", 2, "A reception manager reports efficient processing, but guests still wait for rooms to become available. What is the most defensible interpretation?",
  ["Reception processing may be efficient while waiting elsewhere extends the complete guest journey", "The reception manager's processing measurement must be technically inaccurate", "Guests must be exaggerating because efficient reception processing guarantees rapid room access", "The programme should exclude room availability because reception employees cannot control it"],
  "A departmental measure describes performance within its defined boundaries. Guests experience the complete arrival journey, including dependencies outside reception, so efficient local processing does not necessarily produce a short end-to-end duration.");
 
M("W8O2a-03", "W8O2a", 3, "A manager wants to demonstrate improvement by excluding approval waiting from the new arrival measurement, although it was included in the original baseline. What is the main problem?",
  ["Changing the measurement boundary prevents a valid comparison of the same process outcome", "Approval waiting can never be included in a customer-centred process measure", "The new figure must be more accurate because it contains fewer activities", "A process improvement is demonstrated whenever the reported duration becomes shorter"],
  "A shorter reported duration does not establish improvement when the measurement definition has changed. Comparable before-and-after measurements must preserve relevant boundaries so observed differences reflect performance rather than reporting choices.");
 
TF("W8O2a-04", "W8O2a", 1, "Touch time measures active work, while elapsed time includes the duration between the defined starting and ending events.", true,
  "This statement is true. Touch time concerns active processing, whereas elapsed time includes waiting and other intervals within the measurement boundary. The distinction explains why a process can take much longer than its active work.");
 
TF("W8O2a-05", "W8O2a", 2, "If a delay is caused by another department, it must be excluded from the end-to-end customer journey measurement.", false,
  "This statement is false. The complete customer journey may include waiting across several departments. Responsibility for a delay is a separate question from whether that delay belongs within the process boundary.");
 
DR("W8O2a-06", "W8O2a", 1, "In the slide example, the process has an elapsed duration of {1} days and active work of {2} days.",
  [["21.1", "17.0", "4.1"], ["4.1", "21.1", "17.0"]],
  "The slide example reports 21.1 days of elapsed duration and 4.1 days of active work. The difference illustrates how substantial process time can occur outside active processing.");
 
DR("W8O2a-07", "W8O2a", 3, "A delay caused by an activity within the organisation is classified as {1} waiting, while waiting for information the customer must provide is {2} waiting.",
  [["internal", "customer-attributable", "value-adding"], ["customer-attributable", "internal", "automated"]],
  "Internal waiting arises from organisational activities or dependencies. Customer-attributable waiting involves a required customer action or response. Both may remain part of the complete elapsed journey, depending on the defined boundary.");
 
V("W8O2a-08", "W8O2a", 2, "Which diagram best represents the complete guest arrival boundary needed to evaluate Qasr's end-to-end improvement objective?", [
  [D.flow(["Guest|enters lobby", "Reception|processing", "!Other|dependencies", "Room|released", "Guest|enters room"]), "Measure from entering the lobby until entering a released room, including intervening dependencies"],
  [D.flow(["Booking|opened", "Reservation|checked", "Key|encoded"]), "Measure only the property system's booking-record processing interval"],
  [D.flow(["Reception|begins", "Reception|finishes"]), "Measure only the activities directly performed at reception"],
  [D.flow(["Room|released", "Guest|enters room"]), "Measure only the final interval after the room becomes available"]
], "The programme aims to improve the complete guest arrival experience. Its measurement boundary must therefore include the journey from entering the lobby until entering a released room, rather than only a narrower departmental activity.");
 
V("W8O2a-09", "W8O2a", 3, "Which diagram best illustrates why active work can be much shorter than the complete elapsed process duration?", [
  [D.flow(["Active|work", "!Waiting", "Active|work", "!Waiting", "Process|completed"]), "Active work is separated by waiting intervals that remain inside the complete process boundary"],
  [D.flow(["Active|work", "Active|work", "Active|work", "Process|completed"]), "Every interval consists of uninterrupted active work"],
  [D.flow(["Process|completed", "Active|work", "Process|started"]), "The measurement begins after the process has already finished"],
  [D.flow(["Customer|arrives", "Process|excluded", "Customer|leaves"]), "The measurement excludes the activities and waiting experienced by the customer"]
], "Elapsed time continues during waiting between activities, even when employees are not actively processing the case. A process containing substantial waiting can therefore have a much longer elapsed duration than its touch time.");
 
OR("W8O2a-10", "W8O2a", 2, "Put these activities in the logical order for establishing a defensible end-to-end process duration measure.",
  ["Identify the customer outcome the improvement programme intends to improve", "Define the event that starts the measurement clock", "Define the event that stops the measurement clock", "Identify relevant activities and waiting within those boundaries", "Document the definition for consistent future measurement"],
  "The improvement objective determines which journey must be measured. Explicit starting and ending events establish its boundary, while documenting included intervals allows later performance to be compared consistently.");
 
MA("W8O2a-11", "W8O2a", 2, "Match each measurement concept to its correct meaning.",
  [["Touch time", "Time spent actively performing process work"], ["Elapsed time", "Total duration between the defined starting and ending events"], ["Measurement boundary", "The events determining which portion of the process is measured"], ["Customer-attributable waiting", "Waiting associated with information or action required from the customer"]],
  "Touch time measures active processing, while elapsed time measures the complete interval within a defined boundary. Measurement boundaries determine what is included, and customer-attributable waiting identifies a particular source of delay without automatically excluding it from the journey.");
 
MA("W8O2a-12", "W8O2a", 3, "Match each management question to the measurement most appropriate for answering it.",
  [["How long do employees actively process a booking?", "Reception touch time"], ["How long does a guest wait from lobby arrival until room access?", "End-to-end guest arrival elapsed time"], ["How much delay depends on a required customer response?", "Customer-attributable waiting time"], ["Did the complete guest journey improve after redesign?", "Comparable end-to-end measurements before and after implementation"]],
  "Different management questions require different measurement boundaries. Departmental touch time supports local diagnosis, while end-to-end elapsed time reflects the customer journey. Improvement claims require comparable measurements using consistent definitions.");

// W8O2b · When the story and the data disagree
// Correct answers are written first; the bank player shuffles options.
 
M("W8O2b-01", "W8O2b", 1, "What can Qasr legitimately conclude from the original guest's twenty-three-minute reception experience?",
  ["The experience identifies a genuine problem worth investigating but does not establish typical process performance", "The experience proves that every corporate guest waits at least twenty-three minutes at reception", "The experience establishes the average reception duration across Qasr's fourteen properties", "The experience should be discarded because individual complaints cannot contribute to process analysis"],
  "The original guest's experience provides valuable evidence of a particular service failure. However, one observation cannot establish how frequently similar problems occur or how the wider arrival process normally performs.");
 
M("W8O2b-02", "W8O2b", 2, "A manager remembers several unusually difficult arrivals and concludes that most guests experience similar problems. What is the strongest response?",
  ["Examine a suitable sample of arrivals to determine how frequently those difficulties actually occur", "Accept the conclusion because memorable incidents provide the clearest evidence of normal performance", "Ignore the difficult arrivals because exceptional experiences cannot reveal process weaknesses", "Calculate the average duration of the remembered incidents and adopt it as the programme baseline"],
  "Memorable incidents can reveal important problems, but they may not represent the wider process. A suitable sample helps establish whether the observed difficulties are recurring patterns or unusual experiences.");
 
M("W8O2b-03", "W8O2b", 3, "Qasr's 82.0-minute mean summarises 310 corporate arrivals, yet some guests wait far longer than others. What should the programme investigate next?",
  ["The distribution of arrival durations and the process conditions associated with unusually long cases", "Only the mean, because individual variation becomes irrelevant once the average is calculated", "Only the longest arrival, because the most difficult case automatically represents normal performance", "Whether the longest cases can be excluded to make the reported mean more reassuring"],
  "A mean summarises measured durations but does not show how individual experiences vary. Examining the distribution and investigating the delayed cases, such as those affected by the corporate-rate approval wait, reveals recurring exceptions and possible causes that the mean conceals.");
 
TF("W8O2b-04", "W8O2b", 1, "A single guest complaint can reveal a genuine process problem even when it cannot establish how frequently that problem occurs.", true,
  "This statement is true. An individual experience can identify a failure that deserves investigation. Systematic measurement is then needed to establish its frequency, typical severity and relationship with wider process performance.");
 
TF("W8O2b-05", "W8O2b", 2, "Because the original guest waited only 23 minutes at the desk, her arrival shows that the 47-minute corporate-rate approval wait is rare.", false,
  "This statement is false. Her corporate rate was located by telephone in seven minutes because the revenue office happened to answer, so her single case could not reveal a wait that occurred in 61 percent of the 310 sampled arrivals. Only the measured distribution shows how often that wait happens.");
 
DR("W8O2b-06", "W8O2b", 1, "A selection of arrivals examined to understand wider process performance is called a {1}. The pattern of variation among their measured durations is called a {2}.",
  [["sample", "baseline target", "redesign"], ["distribution", "procedure", "handoff"]],
  "A sample contains selected cases used to investigate the wider process. A distribution describes how their measured values vary, revealing patterns and exceptional experiences that a single summary figure may conceal.");
 
DR("W8O2b-07", "W8O2b", 3, "A memorable guest complaint helps identify a possible process {1}, while systematic measurement helps establish its {2} across observed arrivals.",
  [["problem", "solution", "target"], ["prevalence", "ownership", "implementation"]],
  "An individual complaint can reveal a possible process problem without establishing how widespread it is. Systematic measurement helps determine prevalence, meaning how frequently the problem occurs within the population being investigated.");
 
V("W8O2b-08", "W8O2b", 2, "Which diagram best represents an investigation that respects the original guest's complaint without treating it as typical performance?", [
  [D.flow(["Guest|complaint", "Select|arrivals", "Measure|durations", "Examine|variation", "Investigate|causes"]), "Use the complaint to motivate a wider investigation of measured arrivals and their variation"],
  [D.flow(["Guest|complaint", "Assume|typical", "Set|baseline"]), "Treat the original complaint as sufficient evidence of normal performance"],
  [D.flow(["Guest|complaint", "Ignore|experience", "Use|average"]), "Discard the individual experience and rely exclusively on a summary average"],
  [D.flow(["Guest|complaint", "Choose|solution", "Implement|change"]), "Select and implement an improvement without establishing the wider performance pattern"]
], "The strongest investigation uses the individual experience to identify a concern and then examines a suitable sample. Measuring variation and investigating causes establishes whether the problem is recurring without dismissing the original guest's experience.");
 
V("W8O2b-09", "W8O2b", 3, "Which diagram best represents a sampling approach that can reveal both routine arrivals and important exceptions?", [
  [D.flow(["Define|boundary", "Select|varied cases", "Measure|durations", "!Examine|exceptions", "Compare|patterns"]), "Measure varied arrivals consistently and examine exceptional cases alongside the overall pattern"],
  [D.flow(["Select|complaints", "Measure|delays", "Assume|typical"]), "Examine only complaints and generalise their durations to every arrival"],
  [D.flow(["Select|quiet period", "Observe|one guest", "Approve|baseline"]), "Use one uncomplicated arrival to represent the complete process"],
  [D.flow(["Select|arrivals", "Change|boundaries", "Compare|durations"]), "Measure different arrivals using changing starting and ending events"]
], "A defensible sampling approach includes meaningful operating variation and uses consistent measurement boundaries. It examines exceptional cases without assuming they represent every arrival, allowing investigators to distinguish patterns from isolated incidents.");
 
OR("W8O2b-10", "W8O2b", 2, "Put these activities in the logical order for investigating whether Qasr's original guest experience reflects a recurring problem.",
  ["Document the original guest's experience and the problem it suggests", "Define consistent starting and ending events for measuring arrivals", "Select arrivals covering meaningful operating variation", "Measure durations and examine their distribution", "Investigate recurring delays and important exceptional cases"],
  "The original experience identifies a concern, but broader conclusions require consistently defined measurements. Sampling varied arrivals and examining their distribution helps determine whether the problem recurs and which cases require deeper investigation.");
 
MA("W8O2b-11", "W8O2b", 2, "Match each form of process evidence to the question it can most directly help answer.",
  [["Individual guest account", "What happened during one particular arrival?"], ["Sample average", "What was the arithmetic mean duration across the measured arrivals?"], ["Distribution of durations", "How did individual arrival times vary across the sample?"], ["Detailed investigation of delayed cases", "What activities or conditions contributed to particular long waits?"]],
  "Different evidence forms answer complementary questions. Individual accounts describe specific experiences, averages summarise measured performance, distributions reveal variation, and detailed case investigations help explain why delays occur.");
 
MA("W8O2b-12", "W8O2b", 3, "Match each questionable conclusion to the most appropriate analytical correction.",
  [["One difficult arrival proves every guest experiences the same delay", "Examine a suitable sample before generalising about typical performance"], ["A satisfactory average proves nobody experienced a serious delay", "Inspect the distribution and investigate unusually long cases"], ["Two arrival durations can be compared despite different starting events", "Use consistent measurement boundaries before interpreting differences"], ["An unusual complaint should be ignored because it is not representative", "Preserve the individual evidence and investigate its significance within the wider pattern"]],
  "Sound process analysis avoids generalising from isolated incidents and avoids using averages to dismiss genuine difficult experiences. Consistent measurement boundaries, suitable sampling and attention to variation allow individual stories and systematic evidence to inform one another.");

// W8O2c · Twenty-three minutes or eighty-two?
// Correct answers are written first; the bank player shuffles options.
 
M("W8O2c-01", "W8O2c", 1, "Which measurement is the most defensible baseline for Qasr's programme to improve the complete corporate guest arrival experience?",
  ["The 82.0-minute mean measured from lobby entry until entry into a released room", "The 12.4-minute property system measure from booking-record opening to key encoding", "The original guest's twenty-three-minute experience at reception", "The 47-minute corporate-rate approval wait affecting some sampled arrivals"],
  "The 82.0-minute mean covers the complete arrival journey that Qasr intends to improve. It was measured across 310 corporate arrivals, making it more appropriate for programme evaluation than a narrower departmental measure or one individual experience.");
 
M("W8O2c-02", "W8O2c", 2, "The front-office director argues that the 82-minute figure includes delays outside reception. What is the strongest response?",
  ["Retain the end-to-end measure while distinguishing departmental accountability from responsibility for the complete process", "Replace the programme baseline with 12.4 minutes because reception cannot control every delay", "Assign every minute of the 82-minute duration to reception employees", "Remove approval waiting from the sample because it occurs outside the reception desk"],
  "The director raises a legitimate accountability concern, but that concern does not invalidate the complete process boundary. Qasr should preserve the end-to-end baseline while identifying which departments influence its different activities and delays.");
 
M("W8O2c-03", "W8O2c", 3, "Why would adopting the original guest's twenty-three-minute reception experience as Qasr's programme baseline be misleading?",
  ["It represents one guest and a narrower boundary rather than the sampled end-to-end arrival process", "It is invalid because observations made by guests can never contribute reliable evidence", "It must be rejected because every individual arrival is shorter than the programme mean", "It measures the same complete process as the 82-minute figure but uses a different calculation method"],
  "The twenty-three-minute figure describes one guest's experience from joining the reception queue until leaving the desk. The programme's 82.0-minute mean covers 310 corporate arrivals from lobby entry until entry into a released room, so the figures differ in both scope and population.");
 
TF("W8O2c-04", "W8O2c", 1, "Qasr's property management system measures 12.4 minutes from opening the booking record until encoding the room key.", true,
  "This statement is true. The system's 12.4-minute figure describes a narrower processing interval. It can support departmental analysis but does not capture the complete guest arrival journey.");
 
TF("W8O2c-05", "W8O2c", 2, "The programme's 82.0-minute mean establishes that every one of the 310 sampled corporate guests experienced exactly 82 minutes of arrival time.", false,
  "This statement is false. A mean summarises the measured durations across a sample and does not describe every individual observation. Some arrivals may be shorter or longer than the reported average.");
 
DR("W8O2c-06", "W8O2c", 1, "Qasr's programme measured {1} corporate arrivals across fourteen properties and reported a mean end-to-end duration of {2} minutes.",
  [["310", "23", "47"], ["82.0", "12.4", "23"]],
  "The investigation covered 310 corporate arrivals across Qasr's fourteen properties during six weeks. Their mean duration was 82.0 minutes, measured from entering the lobby until entering a released room.");
 
DR("W8O2c-07", "W8O2c", 3, "The observed corporate-rate approval wait lasted {1} minutes and affected {2} percent of the sampled corporate arrivals.",
  [["47", "23", "12.4"], ["61", "47", "82"]],
  "The investigation identified a 47-minute corporate-rate approval wait affecting 61 percent of the 310 sampled arrivals. This recurring dependency deserves investigation because it contributes to the complete process experience beyond narrow reception processing.");
 
V("W8O2c-08", "W8O2c", 2, "Which diagram correctly represents the boundary of Qasr's 82.0-minute programme measure?", [
  [D.flow(["Guest|enters lobby", "Reception|processing", "!Corporate rate|approval", "Room|released", "Guest|enters room"]), "The complete journey begins at lobby entry and ends when the guest enters a released room"],
  [D.flow(["Booking|record opened", "Reservation|checked", "Room key|encoded"]), "The measurement begins when the booking record opens and ends when the key is encoded"],
  [D.flow(["Guest|joins queue", "Reception|processing", "Guest|leaves desk"]), "The measurement covers the original guest's reception experience"],
  [D.flow(["Rate|approval requested", "!Approval|waiting", "Rate|approved"]), "The measurement covers only the corporate-rate approval interval"]
], "The programme's 82.0-minute measure covers the complete arrival journey from entering the lobby until entering a released room. The other diagrams represent narrower intervals that answer different operational questions.");
 
V("W8O2c-09", "W8O2c", 3, "Which diagram best represents a defensible decision when Qasr's three arrival measurements appear to disagree?", [
  [D.flow(["Identify|three measures", "Define|boundaries", "Check|populations", "Match|objective", "Agree|baseline"]), "Explain each measure's boundaries and population before selecting the one aligned with the programme objective"],
  [D.flow(["Compare|figures", "Choose|smallest", "Approve|baseline"]), "Select the smallest duration because it presents the most favourable performance"],
  [D.flow(["Review|complaint", "Choose|23 minutes", "Ignore|sample"]), "Adopt the original guest's experience without considering the wider sample"],
  [D.flow(["Find|approval delay", "Exclude|waiting", "Report|processing"]), "Remove cross-department waiting so the programme measure matches reception processing"]
], "A defensible decision explains what each figure measures and which cases it represents. The programme should then select the measurement aligned with its end-to-end improvement objective rather than choosing the most attractive number.");
 
OR("W8O2c-10", "W8O2c", 2, "Put these activities in the logical order for reconciling Qasr's conflicting arrival measurements.",
  ["Identify the three reported arrival figures", "Establish the starting and ending events for each figure", "Determine whether each figure represents one case or a sample", "Evaluate which measure matches the complete arrival improvement objective", "Document and validate the selected programme baseline"],
  "The figures cannot be interpreted properly without understanding their boundaries and populations. Once those differences are clear, Qasr can defend the end-to-end measure and document the evidence needed for future comparison.");
 
MA("W8O2c-11", "W8O2c", 2, "Match each Qasr figure to what it actually represents.",
  [["12.4 minutes", "Property system processing from booking-record opening to key encoding"], ["23 minutes", "The original guest's experience from joining the reception queue to leaving the desk"], ["82.0 minutes", "Mean from lobby entry to entering a released room across 310 corporate arrivals"], ["47 minutes", "Corporate-rate approval waiting affecting 61 percent of sampled arrivals"]],
  "The four figures describe different aspects of Qasr's arrival process. The 12.4-minute and twenty-three-minute measures use narrower boundaries, the 82.0-minute mean covers the sampled end-to-end journey, and the 47-minute figure identifies an important approval dependency.");
 
MA("W8O2c-12", "W8O2c", 3, "Match each management concern to the most defensible interpretation.",
  [["Reception reports efficient internal processing", "Retain the departmental measure for diagnosing reception activities"], ["Guests experience delays beyond reception", "Use the end-to-end arrival measure for programme evaluation"], ["The director disputes responsibility for approval waiting", "Separate departmental accountability from complete process ownership"], ["Managers want to demonstrate improvement after redesign", "Compare later results against the validated baseline using consistent boundaries"]],
  "Departmental and end-to-end measurements serve different legitimate purposes. Qasr should preserve useful local measures, clarify accountability across departments and evaluate programme benefits using a consistently defined complete arrival baseline.");

// W8O1d · Waiting is not working
// Correct answers are written first; the bank player shuffles options.
 
M("W8O1d-01", "W8O1d", 1, "Why can a process have a long elapsed duration even when employees perform relatively little active work?",
  ["Waiting between activities can extend the complete process without increasing active work time", "Every minute of elapsed time must involve an employee actively performing a task", "The process clock stops whenever employees are waiting for another department", "A long elapsed duration proves that employees are performing unnecessary checks"],
  "Elapsed time includes waiting and other intervals between the defined process boundaries. Employees may complete individual activities efficiently while the overall process remains slow because work waits for information, decisions or available resources.");
 
M("W8O1d-02", "W8O1d", 2, "Qasr's receptionist completes the available work promptly, but the guest still waits for corporate-rate approval. What should investigators examine?",
  ["The approval dependency and the conditions causing waiting between activities", "Whether reception employees can perform their completed activities more quickly", "Whether the approval wait can be excluded from the guest arrival measurement", "Whether every corporate-rate approval should be eliminated immediately"],
  "The observed delay involves a dependency rather than necessarily slow reception work. Investigators should establish why approval is required and what causes the waiting before considering improvements or changes to necessary controls.");
 
M("W8O1d-03", "W8O1d", 3, "A manager proposes eliminating every checking activity because checking consumes time without directly creating customer value. What is the strongest objection?",
  ["Some checks protect quality, accuracy or compliance and must be assessed before removal", "Checking activities always create more customer value than the activities they verify", "All checking time should automatically be classified as employee inactivity", "Removing checks is always appropriate when the process contains substantial waiting"],
  "Checking may be necessary to prevent errors or protect important operational requirements. Understand examines the purpose and consequences of each activity rather than assuming that every interval outside direct value-adding work is unnecessary.");
 
TF("W8O1d-04", "W8O1d", 1, "Rework occurs when an activity must be repeated or corrected because earlier work did not produce an acceptable result.", true,
  "This statement is true. Rework consumes additional effort because previously completed work requires correction or repetition. Identifying rework helps investigators understand why a process takes longer than its intended sequence suggests.");
 
TF("W8O1d-05", "W8O1d", 2, "The slides demonstrate that Qasr has already reduced its actual guest arrival time from 82 minutes to 22 minutes.", false,
  "This statement is false. The 82-minute and 22-minute before-and-after decomposition is an analytical illustration, not evidence of an implemented Qasr redesign. Understand establishes current performance before later phases develop and evaluate improvements.");
 
DR("W8O1d-06", "W8O1d", 1, "Work that directly contributes to the customer's desired outcome is {1} work. Repeating an activity to correct an unacceptable result is {2}.",
  [["value-adding", "customer-attributable", "duplicated"], ["rework", "waiting", "checking"]],
  "Value-adding work directly contributes to the outcome the customer needs. Rework involves correcting or repeating earlier work, so distinguishing these categories helps investigators explain how process time is consumed.");
 
DR("W8O1d-07", "W8O1d", 3, "In the slides' illustrative before-redesign decomposition, waiting accounts for {1} minutes and rework accounts for {2} minutes.",
  [["47", "14", "9"], ["12", "9", "14"]],
  "The illustrative before-redesign process contains 14 minutes of value-adding work, 47 minutes of waiting, 12 minutes of rework and 9 minutes of checking. These categories total 82 minutes and must not be confused with the separate Qasr observation reporting 8.1 minutes of value-adding activity.");
 
V("W8O1d-08", "W8O1d", 2, "Which diagram best illustrates a process where waiting extends elapsed time despite limited active work?", [
  [D.flow(["Active|work", "!Waiting", "Active|work", "!Waiting", "Outcome|completed"]), "Active work is separated by waiting intervals that remain inside the process boundary"],
  [D.flow(["Active|work", "Active|work", "Active|work", "Outcome|completed"]), "The process contains only uninterrupted active work"],
  [D.flow(["Outcome|completed", "!Waiting", "Process|started"]), "The process begins after the outcome has already been completed"],
  [D.flow(["Active|work", "Outcome|completed", "!Waiting"]), "The waiting occurs entirely after the defined process has ended"]
], "Waiting between activities contributes to elapsed duration even when nobody is actively processing the case. The correct diagram keeps those waiting intervals within the process boundary, explaining why elapsed time can greatly exceed touch time.");
 
V("W8O1d-09", "W8O1d", 3, "Which diagram best represents the investigation Qasr should conduct before proposing changes to its corporate-rate approval process?", [
  [D.flow(["Observe|approval wait", "Measure|duration", "Investigate|dependency", "Assess|control", "Document|causes"]), "Measure the waiting, investigate its causes and assess the approval's purpose before considering redesign"],
  [D.flow(["Observe|approval wait", "Remove|approval", "Assume|improvement"]), "Eliminate the approval immediately because waiting has been observed"],
  [D.flow(["Observe|approval wait", "Exclude|duration", "Report|reception time"]), "Remove the approval interval from the programme measurement"],
  [D.flow(["Observe|approval wait", "Increase|reception staff", "Close|investigation"]), "Assume reception staffing causes the delay without investigating the approval dependency"]
], "Understand investigates the observed waiting and the reasons for the approval before selecting changes. This protects necessary controls and prevents the programme from treating an assumed solution as an established response to the evidence.");
 
OR("W8O1d-10", "W8O1d", 2, "Put these activities in the logical order for investigating where elapsed time disappears in Qasr's guest arrival process.",
  ["Define the complete guest arrival measurement boundary", "Measure elapsed time across observed arrivals", "Separate active work, waiting, rework and checking", "Identify handoffs and activities associated with substantial delays", "Investigate the causes and purposes of those activities"],
  "The investigation needs a consistent boundary before measuring and decomposing elapsed time. Classifying activities and identifying significant delays then supports investigation of their causes without prematurely prescribing improvements.");
 
MA("W8O1d-11", "W8O1d", 2, "Match each process time category to its meaning.",
  [["Value-adding work", "Activity directly contributing to the customer's required outcome"], ["Waiting", "Time when the process cannot progress because something required is unavailable"], ["Rework", "Repeating or correcting work that did not produce an acceptable result"], ["Checking", "Verifying information or conditions against required standards"]],
  "These categories describe different uses of process time. Value-adding work creates the required outcome, waiting delays progress, rework corrects earlier problems, and checking verifies conditions that may protect quality or compliance.");
 
MA("W8O1d-12", "W8O1d", 3, "Match each finding to the most defensible interpretation.",
  [["Qasr's approval wait affects 61 percent of sampled arrivals", "A recurring dependency deserves investigation within the complete process"], ["The illustrative redesign reduces waiting from 47 to 6 minutes", "The example demonstrates a possible improvement rather than an achieved Qasr result"], ["Qasr's observed process contains 8.1 minutes of value-adding activity", "This figure belongs to the separate Qasr evidence and must not be replaced by the illustrative 14-minute category"], ["A verification activity delays progress but prevents incorrect decisions", "Its protective purpose must be assessed before considering removal"]],
  "Sound analysis preserves the distinction between observed evidence and illustrative redesign figures. It also recognises that recurring waiting deserves investigation while necessary checks may protect important requirements. These distinctions prevent misleading performance claims and premature redesign decisions.");

// W8O1e · Symptoms, causes and necessary controls
// Correct answers are written first; the bank player shuffles options.
 
M("W8O1e-01", "W8O1e", 1, "What is the main difference between a process symptom and a root cause?",
  ["A symptom is an observed problem, while a root cause explains the underlying conditions producing it", "A symptom is always caused by employee behaviour, while a root cause is always technological", "A symptom describes the future process, while a root cause describes its performance target", "A symptom is established through measurement, while a root cause can be accepted without evidence"],
  "A symptom reveals that something is wrong, such as excessive waiting or repeated corrections. Root cause analysis investigates the underlying conditions responsible for producing that problem, using evidence rather than unsupported assumptions.");
 
M("W8O1e-02", "W8O1e", 2, "Qasr discovers a substantial corporate-rate approval wait. Why should investigators avoid immediately recommending that the approval be removed?",
  ["The approval may protect contractual accuracy, while the waiting could result from how the approval is organised", "Every approval activity must remain unchanged regardless of its purpose or consequences", "The approval wait should be excluded because it occurs outside reception's direct responsibility", "A long approval wait proves that reception employees are performing unnecessary work"],
  "An approval may serve a necessary control purpose, such as preventing incorrect corporate charges. Understand investigates both the reason for the approval and the conditions creating waiting before deciding whether any redesign is appropriate.");
 
M("W8O1e-03", "W8O1e", 3, "Several Qasr employees repeatedly request clarification about corporate rates. What would provide the strongest evidence of a shared root cause?",
  ["Multiple observed cases show that the clarification requests arise from the same recurring information deficiency", "One experienced manager believes that employees should already understand the corporate rates", "The clarification requests occur in different departments and therefore must have unrelated causes", "The programme assumes that installing new software will eliminate every clarification request"],
  "A shared root cause becomes credible when evidence consistently connects several symptoms to the same underlying condition. Repeated observations of a common information deficiency support investigation of that dependency rather than treating every clarification separately.");
 
TF("W8O1e-04", "W8O1e", 1, "An activity can be necessary even when it does not directly create the outcome the customer wants.", true,
  "This statement is true. Enabling activities and checking controls may provide necessary information, protect accuracy or satisfy important requirements. Their value must be assessed through their purpose and consequences rather than active processing time alone.");
 
TF("W8O1e-05", "W8O1e", 2, "A plausible explanation for a recurring delay should be recorded as a confirmed root cause before investigators examine supporting evidence.", false,
  "This statement is false. A plausible explanation remains a hypothesis until observations, records or other reliable evidence support it. Treating assumptions as established causes can lead to inappropriate redesign decisions.");
 
DR("W8O1e-06", "W8O1e", 1, "An observable indication of poor process performance is a {1}. Investigating the underlying conditions that produce recurring problems is called {2}.",
  [["symptom", "target", "control"], ["root cause analysis", "process implementation", "benefits realisation"]],
  "A symptom is an observable sign of a process problem, such as repeated waiting or rework. Root cause analysis investigates why that problem occurs so later improvements can address underlying conditions rather than visible consequences alone.");
 
DR("W8O1e-07", "W8O1e", 2, "An activity that directly contributes to the guest's required outcome is {1}, while an activity that verifies important requirements is classified as {2}.",
  [["value-adding", "customer-attributable", "exceptional"], ["checking", "waiting", "rework"]],
  "Value-adding activities directly contribute to the outcome the customer needs. Checking activities verify conditions or requirements and may protect quality, accuracy or compliance even when they do not directly create customer value.");
 
V("W8O1e-08", "W8O1e", 2, "Which diagram best represents a defensible investigation of Qasr's corporate-rate approval delay?", [
  [D.flow(["Observe|approval wait", "Investigate|reasons", "Assess|control purpose", "Verify|causes", "Document|findings"]), "Investigate the waiting, establish why approval exists and verify the causes before documenting conclusions"],
  [D.flow(["Observe|approval wait", "Remove|approval", "Assume|success"]), "Eliminate approval immediately because waiting has been observed"],
  [D.flow(["Observe|approval wait", "Blame|reception", "Increase|staffing"]), "Assume reception staffing causes the approval delay"],
  [D.flow(["Observe|approval wait", "Exclude|duration", "Report|faster process"]), "Remove the waiting interval from the performance measure"]
], "Understand requires investigators to examine the causes of waiting and the purpose of the approval control. The correct approach tests explanations against evidence rather than removing safeguards, assigning blame or changing measurement boundaries prematurely.");
 
V("W8O1e-09", "W8O1e", 3, "Which diagram best represents an investigation that distinguishes a visible symptom from a possible underlying information problem?", [
  [D.flow(["Repeated|clarifications", "Examine|affected cases", "Identify|common dependency", "Test|explanation", "Validate|cause"]), "Investigate repeated clarifications and test whether a common information dependency explains them"],
  [D.flow(["Repeated|clarifications", "Assume|employee error", "Close|investigation"]), "Treat repeated clarification requests as proof of employee failure"],
  [D.flow(["Repeated|clarifications", "Remove|all checks", "Assume|resolution"]), "Remove every verification activity without examining its purpose"],
  [D.flow(["Repeated|clarifications", "Choose|software", "Declare|root cause"]), "Select a technological solution before establishing the underlying cause"]
], "Repeated clarification requests are observable symptoms rather than automatic proof of their underlying cause. Examining affected cases, identifying common dependencies and testing explanations produces a stronger basis for later improvement decisions.");
 
OR("W8O1e-10", "W8O1e", 2, "Put these activities in the logical order for investigating a recurring process problem without prematurely selecting a solution.",
  ["Identify and describe the observed process symptom", "Collect evidence from actual cases showing when the problem occurs", "Develop possible explanations for the recurring problem", "Test those explanations and assess any necessary controls", "Document the supported causes and remaining uncertainties"],
  "Root cause analysis begins with a clearly described problem and evidence about its occurrence. Investigators then examine possible explanations, test them against the evidence and document supported findings without presenting unverified assumptions as established causes.");
 
MA("W8O1e-11", "W8O1e", 2, "Match each process analysis concept to its meaning.",
  [["Symptom", "An observable indication that the process is experiencing a problem"], ["Root cause", "An underlying condition responsible for producing a recurring problem"], ["Enabling activity", "Work that provides information or resources needed for the process"], ["Necessary control", "A check or approval that protects an important operational requirement"]],
  "Symptoms reveal where problems become visible, while root causes explain the conditions producing them. Enabling activities support process execution, and necessary controls protect requirements that should not be discarded merely to shorten reported processing time.");
 
MA("W8O1e-12", "W8O1e", 3, "Match each Qasr investigation finding to the most defensible analytical response.",
  [["A corporate-rate approval wait affects 61 percent of sampled arrivals", "Investigate the recurring dependency and the conditions producing the waiting"], ["The approval may protect contractual rate accuracy", "Separate the control's purpose from the waiting that surrounds it"], ["Several clarification requests appear linked to missing information", "Test whether one shared information deficiency explains the recurring symptoms"], ["A manager proposes removing every check to accelerate arrival", "Reject blanket removal until each check's purpose and risk have been assessed"]],
  "The Understand phase distinguishes observed symptoms, supported causes and necessary controls. Recurring waiting and clarification problems deserve investigation, while a protective check must be assessed on its own purpose before anyone removes it. This approach helps Qasr avoid treating visible symptoms while leaving underlying weaknesses untouched or creating new risks.");

// W8O2d · The baseline that future results must beat
// Correct answers are written first; the bank player shuffles options.
 
M("W8O2d-01", "W8O2d", 1, "Why does Qasr need an agreed quantified baseline before implementing improvements to guest arrival?",
  ["It provides a measured starting point against which later performance can be compared", "It proves that the proposed redesign will achieve its intended benefits", "It eliminates the need to investigate the causes of current delays", "It allows managers to replace the complete guest journey with departmental productivity measures"],
  "A quantified baseline records current performance using explicit measurement definitions and supporting evidence. Later results can be compared with this starting point to determine whether implemented changes produced meaningful improvements.");
 
M("W8O2d-02", "W8O2d", 2, "Qasr implements a redesigned arrival process and reports a shorter duration measured only until room key encoding. Why is this insufficient evidence of programme success?",
  ["The new measurement excludes part of the journey included in the original end-to-end baseline", "Room key encoding can never provide useful information about reception performance", "A shorter reported duration automatically proves improvement regardless of measurement boundaries", "The original baseline becomes irrelevant once a redesigned process has been implemented"],
  "Qasr's programme baseline measures from entering the lobby until entering a released room. A later measurement ending at key encoding uses a different boundary, so the figures cannot establish whether the complete guest experience improved.");
 
M("W8O2d-03", "W8O2d", 3, "The investigation identifies a possible way to reduce corporate-rate approval waiting. What can Qasr legitimately report at the end of Understand?",
  ["The team has identified an evidence-supported improvement opportunity whose benefits remain to be demonstrated", "The programme has already achieved a reduction in guest arrival time", "The approval delay has been eliminated because its underlying cause was investigated", "The proposed change should replace the original baseline before implementation"],
  "Understand can identify potential quick wins and other improvement opportunities based on the investigation's findings. However, identifying an opportunity is not the same as implementing a change or demonstrating benefits through comparable performance measurements.");
 
TF("W8O2d-04", "W8O2d", 1, "A validated as-is model and an agreed quantified baseline provide different but complementary outputs from Understand.", true,
  "This statement is true. The as-is model explains how the current process operates, including activities and handoffs. The quantified baseline records its measured performance so later improvements can be evaluated against a defensible starting point.");
 
TF("W8O2d-05", "W8O2d", 2, "Once Qasr agrees on an 82.0-minute baseline, later measurements can use different starting and ending events without affecting the validity of performance comparisons.", false,
  "This statement is false. Meaningful comparisons require consistent measurement boundaries and compatible definitions. Changing the starting or ending event can create an apparent improvement even when the guest's complete arrival experience remains unchanged.");
 
DR("W8O2d-06", "W8O2d", 1, "The {1} model describes how Qasr's current process operates, while the quantified {2} records its performance before improvements are implemented.",
  [["as-is", "to-be", "automated"], ["baseline", "target", "redesign"]],
  "The as-is model documents current activities, responsibilities and dependencies. The baseline quantifies current performance, creating the reference point needed to evaluate later changes.");
 
DR("W8O2d-07", "W8O2d", 2, "Understand investigates recurring problems through {1} and records meaningful process variations and their observed frequency in an {2}.",
  [["root cause analysis", "benefits realisation", "software implementation"], ["exception register", "future-state design", "implementation schedule"]],
  "Root cause analysis investigates the underlying conditions responsible for recurring performance problems. An exception register documents important variations and their observed frequency, helping managers distinguish systematic weaknesses from isolated cases.");
 
V("W8O2d-08", "W8O2d", 2, "Which diagram best represents the evidence Qasr should carry forward from Understand before redesign begins?", [
  [D.flow(["Validated|as-is model", "Agreed|baseline", "Root cause|analysis", "Recorded|exceptions", "Potential|quick wins"]), "Carry forward the validated model, quantified baseline, investigated causes, documented exceptions and potential quick wins"],
  [D.flow(["Choose|software", "Install|system", "Train|employees", "Declare|success"]), "Implement technology and declare success without establishing current performance"],
  [D.flow(["Guest|complaint", "Select|solution", "Approve|redesign"]), "Use the original complaint as sufficient evidence for choosing a redesign"],
  [D.flow(["Report|reception time", "Exclude|waiting", "Approve|baseline"]), "Use only reception processing time and exclude waiting outside the department"]
], "Understand produces a connected body of evidence about the current process. Its outputs include the validated as-is model, quantified baseline, root cause analysis, documented exceptions and potential quick wins, rather than implemented redesigns or unsupported improvement claims.");
 
V("W8O2d-09", "W8O2d", 3, "Which diagram best represents a valid approach to evaluating Qasr's performance after a future redesign?", [
  [D.flow(["Define|original boundary", "Record|82.0-minute mean", "Implement|approved changes", "Measure|same boundary", "Compare|results"]), "Preserve the original end-to-end definition and compare later performance after implementation"],
  [D.flow(["Record|82.0-minute mean", "Exclude|approval waiting", "Report|shorter time"]), "Remove approval waiting from the later measure and report the resulting reduction"],
  [D.flow(["Record|guest complaint", "Implement|change", "Assume|benefit"]), "Treat the original complaint and completed implementation as sufficient evidence of improvement"],
  [D.flow(["Measure|reception only", "Compare|82.0 minutes", "Declare|success"]), "Compare a later reception-only duration with the original end-to-end mean"]
], "A valid evaluation compares performance using compatible definitions before and after implementation. Preserving the original process boundary prevents changes in measurement scope from being mistaken for genuine improvements.");
 
OR("W8O2d-10", "W8O2d", 2, "Put these activities in the logical order connecting Qasr's Understand findings with later benefits evaluation.",
  ["Validate the as-is model and agree on the current performance baseline", "Investigate root causes and document meaningful exceptions", "Use the findings to develop improvement alternatives during Innovate", "Implement the selected process changes", "Measure subsequent performance and evaluate results against the baseline"],
  "Understand establishes the current process and explains its performance problems. Innovate uses that evidence to develop alternatives, implementation introduces selected changes, and later evaluation determines whether comparable measurements demonstrate realised benefits.");
 
MA("W8O2d-11", "W8O2d", 2, "Match each Understand output to its contribution to Qasr's improvement programme.",
  [["Validated as-is model", "Explains current activities, responsibilities and handoffs"], ["Quantified baseline", "Establishes measured performance before improvements"], ["Root cause analysis", "Investigates underlying conditions producing recurring problems"], ["Exception register", "Documents meaningful variations and their observed frequency"]],
  "The as-is model establishes how work currently operates, while the baseline records its performance. Root cause analysis explains recurring problems, and the exception register preserves evidence about variations that may affect improvement priorities.");
 
MA("W8O2d-12", "W8O2d", 3, "Match each management claim to the most defensible interpretation.",
  [["The programme's mean arrival time is 82.0 minutes", "Use the validated end-to-end measure as the programme's starting performance reference"], ["The system reports 12.4 minutes of reception processing", "Retain the narrower figure for departmental diagnosis without replacing the programme baseline"], ["A 47-minute approval wait affects 61 percent of sampled arrivals", "Investigate the recurring dependency and its underlying causes"], ["A proposed quick win could shorten approval waiting", "Treat the expected benefit as unproven until implementation and comparable measurement"]],
  "Qasr's figures describe different aspects of current performance and must retain their original meanings. The end-to-end mean supports programme evaluation, narrower measures support diagnosis, recurring waiting requires investigation, and proposed improvements require later evidence before benefits can be claimed.");

// W8O3a · Why measuring a process feels threatening
// Correct answers are written first; the bank player shuffles options.
 
M("W8O3a-01", "W8O3a", 1, "Why might employees feel threatened when an organisation begins measuring its current process performance?",
  ["They may fear that process problems will be interpreted as evidence of their personal failure", "They know that every process measurement automatically identifies an individual responsible for delays", "They believe that accurate measurement always requires removing necessary operational controls", "They understand that process measurement eliminates the need for employee participation"],
  "Employees may interpret process measurement as personal evaluation, especially when findings affect reputation or perceived accountability. This fear can create resistance even when the investigation aims to understand and improve the complete process.");
 
M("W8O3a-02", "W8O3a", 2, "Qasr's front-office director objects to the 82.0-minute arrival measure because it includes delays outside reception. What is the most defensible interpretation?",
  ["His concern about departmental accountability deserves investigation without invalidating the end-to-end measure", "His objection proves that the programme's measurement is inaccurate", "His resistance establishes that reception employees deliberately conceal poor performance", "His departmental responsibility means every delay outside reception must be removed from the baseline"],
  "The director raises a legitimate distinction between the complete process outcome and activities controlled by reception. Qasr should preserve the end-to-end measurement while clarifying responsibility for individual delays and investigating valid objections.");
 
M("W8O3a-03", "W8O3a", 3, "Employees become reluctant to disclose informal workarounds after hearing that process findings may influence individual performance evaluations. What is the greatest risk to Understand?",
  ["The investigation may receive incomplete evidence and produce an inaccurate description of actual work", "The process automatically becomes faster because employees stop discussing operational difficulties", "The organisation can replace direct observation with managerial estimates without losing accuracy", "The programme must abandon its end-to-end baseline because employee concerns invalidate measurement"],
  "Fear of blame can discourage employees from revealing errors, exceptions and undocumented activities. This weakens the evidence needed to understand actual operations, making resistance a potential threat to the quality of the investigation.");
 
TF("W8O3a-04", "W8O3a", 1, "A valid end-to-end process measure can include delays that no single department controls independently.", true,
  "This statement is true. The complete customer journey may involve activities and waiting across several departments. Measuring that journey does not mean assigning every contributing delay to one department or employee.");
 
TF("W8O3a-05", "W8O3a", 2, "When an experienced manager challenges a new performance measure, investigators should automatically treat the objection as resistance without examining its substance.", false,
  "This statement is false. A manager's objection may reveal legitimate concerns about measurement boundaries, evidence or accountability. Investigators should examine those concerns while preserving findings that remain supported by reliable evidence.");
 
DR("W8O3a-06", "W8O3a", 1, "A measure describing the complete customer journey concerns {1} performance, while evaluating activities within an employee's responsibility concerns {2} performance.",
  [["process", "individual", "financial"], ["individual", "end-to-end", "customer"]],
  "Process performance describes how the complete journey operates across relevant activities and participants. Individual performance concerns responsibilities within a particular employee's control. Confusing these levels can create unfair interpretations and resistance.");
 
DR("W8O3a-07", "W8O3a", 2, "When employees believe process findings will be used to assign personal blame, their willingness to disclose operational problems may {1}, reducing the {2} of the investigation's evidence.",
  [["decrease", "increase", "remain guaranteed"], ["completeness", "profitability", "automation"]],
  "Fear of blame may discourage employees from revealing workarounds, exceptions or errors. The resulting evidence can become incomplete, making it harder for investigators to establish how the process actually operates.");
 
V("W8O3a-08", "W8O3a", 2, "Which diagram best illustrates why Qasr's front-office director questions responsibility for the complete arrival duration?", [
  [D.flow(["Guest|arrives", "Reception|checks", "!Rate|approval", "Room|released", "Guest|enters room"]), "The complete guest journey includes a corporate-rate approval dependency beyond reception's immediate activities"],
  [D.flow(["Reception|starts", "Reception|checks", "Reception|finishes"]), "The journey contains only activities performed directly by reception"],
  [D.flow(["Booking|opened", "Key|encoded"]), "The measurement includes only the property system's processing interval"],
  [D.flow(["Guest|enters room", "Reception|checks", "Guest|arrives"]), "The process begins after the guest has already entered the room"]
], "Qasr's end-to-end measure includes activities and dependencies across departmental boundaries. The director's accountability concern arises because reception does not independently control every activity contributing to the complete arrival duration.");
 
V("W8O3a-09", "W8O3a", 3, "Which diagram best represents a constructive response when employees challenge a process measurement?", [
  [D.flow(["Hear|concerns", "Check|definitions", "Examine|evidence", "Clarify|accountability", "Preserve|valid findings"]), "Investigate objections, clarify responsibility and retain findings supported by evidence"],
  [D.flow(["Hear|concerns", "Dismiss|employees", "Publish|findings"]), "Dismiss objections without checking whether they reveal measurement problems"],
  [D.flow(["Hear|concerns", "Remove|waiting", "Report|better results"]), "Exclude uncomfortable delays so employees will accept the reported performance"],
  [D.flow(["Hear|concerns", "Assign|blame", "End|investigation"]), "Treat resistance as proof of individual failure and close the investigation"]
], "A constructive response takes employee concerns seriously while protecting measurement integrity. Investigators should test objections against evidence, explain the process boundaries and distinguish individual accountability from the complete process outcome.");
 
OR("W8O3a-10", "W8O3a", 2, "Put these activities in the logical order for responding to Qasr's front-office director without abandoning the programme baseline.",
  ["Listen to the director's concerns about the reported arrival duration", "Clarify the starting and ending events of the measurement", "Examine which activities and delays fall outside reception's direct control", "Distinguish departmental accountability from end-to-end process ownership", "Explain why the validated complete journey remains the programme's measurement"],
  "The programme should understand the objection before explaining its measurement and accountability implications. This approach respects legitimate managerial concerns while retaining the complete guest journey required for meaningful programme evaluation.");
 
MA("W8O3a-11", "W8O3a", 2, "Match each source of resistance to the concern it represents.",
  [["Fear of personal blame", "Employees worry that process problems will be interpreted as individual failures"], ["Departmental accountability", "Managers question responsibility for delays outside their direct control"], ["Attachment to familiar measures", "Managers prefer indicators that previously demonstrated departmental success"], ["Distrust of measurement purposes", "Employees worry that findings may be used differently from what was explained"]],
  "Resistance can arise from concerns about fairness, reputation, established performance expectations and the intended use of evidence. Recognising these different concerns helps investigators respond constructively instead of assuming that every objection reflects unwillingness to improve.");
 
MA("W8O3a-12", "W8O3a", 3, "Match each Qasr finding or concern to the most defensible management interpretation.",
  [["The system reports 12.4 minutes of reception processing", "Retain the figure as a useful measure of a narrower departmental activity"], ["The programme reports an 82.0-minute mean across 310 corporate arrivals", "Use the validated figure to describe the complete arrival journey"], ["A 47-minute approval wait affects 61 percent of sampled arrivals", "Investigate the cross-department dependency without automatically blaming reception"], ["Employees fear that revealing workarounds will damage their evaluations", "Clarify the investigation's purpose and address concerns about fair use of evidence"]],
  "The figures describe different aspects of Qasr's process and should not be treated as interchangeable. Fair accountability requires distinguishing departmental activities from end-to-end performance, while addressing employee concerns helps protect the completeness and credibility of operational evidence.");

// W8O3b · Building a baseline people will accept
// Correct answers are written first; the bank player shuffles options.
 
M("W8O3b-01", "W8O3b", 1, "What is the most important condition for building employee trust in a new process performance baseline?",
  ["Explain the measurement's purpose, use reliable evidence and honour commitments about how findings will be used", "Select the performance figure that employees find most reassuring", "Avoid discussing measurement definitions because technical details may create disagreement", "Promise that no process activities or departmental responsibilities will ever change"],
  "Trust depends on transparent measurement purposes, defensible evidence and consistent treatment of employees. When the organisation honours its commitments, employees have stronger reasons to share operational difficulties rather than conceal them.");
 
M("W8O3b-02", "W8O3b", 2, "Qasr's front-office director accepts the system's 12.4-minute figure but challenges the programme's 82.0-minute mean. What should the programme do?",
  ["Explain the different boundaries and retain both measures for their appropriate management purposes", "Replace the programme baseline with 12.4 minutes to secure the director's agreement", "Reject the system measure because only end-to-end measurements can provide useful information", "Calculate the average of the two figures and adopt it as a compromise baseline"],
  "The system measure describes processing from booking-record opening to key encoding, while the programme measure covers the complete arrival journey. Both can remain useful, but the 82.0-minute end-to-end mean matches the programme's improvement objective.");
 
M("W8O3b-03", "W8O3b", 3, "Reception employees identify a missing handoff in Qasr's draft as-is model. What response best combines employee participation with measurement integrity?",
  ["Investigate the handoff using operational evidence and correct the model if the omission is confirmed", "Add the handoff immediately because every employee statement must be accepted without verification", "Ignore the concern because the programme team has already completed its original observations", "Remove other documented delays to compensate for the additional activity employees identified"],
  "Employee participation strengthens the model when operational knowledge is examined against evidence. Supported corrections should be incorporated, while unsupported claims require explanation rather than automatic acceptance or dismissal.");
 
TF("W8O3b-04", "W8O3b", 1, "Managers can accept a baseline as valid even when they dislike the performance results or disagree about the best improvement solution.", true,
  "This statement is true. Agreement on measurement validity concerns the evidence, definitions and boundaries supporting the figure. It does not require every stakeholder to welcome the findings or support the same redesign proposal.");
 
TF("W8O3b-05", "W8O3b", 2, "Once employees participate in validating the as-is model, Qasr can change the baseline's measurement boundaries after redesign without affecting comparison validity.", false,
  "This statement is false. Employee validation improves the credibility of the current process description, but later performance comparisons still require consistent measurement definitions. Changing the boundary can create apparent improvement without changing the guest's actual experience.");
 
DR("W8O3b-06", "W8O3b", 1, "Employees are more likely to trust process measurement when its intended {1} is explained clearly and commitments about fair {2} are honoured.",
  [["purpose", "target", "software"], ["use", "automation", "redesign"]],
  "Explaining the purpose of measurement reduces uncertainty about why operational evidence is collected. Honouring commitments about its use helps employees trust the investigation and disclose information needed for an accurate as-is model.");
 
DR("W8O3b-07", "W8O3b", 3, "The person coordinating improvement across the complete guest arrival journey exercises {1} ownership, while responsibility for specific departmental activities remains a matter of {2} accountability.",
  [["end-to-end process", "individual task", "software system"], ["departmental", "customer-attributable", "financial reporting"]],
  "End-to-end process ownership concerns coordination of the complete customer outcome across organisational boundaries. Departmental accountability concerns activities and decisions within each department's reasonable influence, so the two responsibilities should not be confused.");
 
V("W8O3b-08", "W8O3b", 2, "Which diagram best represents a credible approach to securing acceptance of Qasr's guest arrival baseline?", [
  [D.flow(["Explain|purpose", "Share|evidence", "Hear|objections", "Validate|findings", "Agree|baseline"]), "Explain the purpose, share evidence, investigate objections, validate findings and establish agreement"],
  [D.flow(["Report|82 minutes", "Dismiss|objections", "Declare|agreement"]), "Announce the figure and dismiss operational concerns without investigation"],
  [D.flow(["Hear|objections", "Choose|smallest figure", "Approve|baseline"]), "Select the most favourable measurement to avoid disagreement"],
  [D.flow(["Ask|employees", "Accept|all claims", "Publish|model"]), "Treat every employee statement as confirmed evidence without validation"]
], "A credible baseline agreement combines transparent communication with evidence-based review of stakeholder concerns. Investigators should correct supported inaccuracies without allowing uncomfortable findings to be removed merely to obtain agreement.");
 
V("W8O3b-09", "W8O3b", 3, "Which diagram best represents the relationship between Qasr's end-to-end measurement and departmental responsibilities?", [
  [D.flow(["Guest|enters lobby", "Reception|processing", "!Rate|approval", "Room|released", "Guest|enters room"]), "Measure the complete arrival journey while identifying the departments responsible for its activities"],
  [D.flow(["Booking|opened", "Reception|processing", "Key|encoded"]), "Replace the complete arrival measure with reception's narrower processing interval"],
  [D.flow(["Guest|enters lobby", "Reception|responsible for all delays", "Guest|enters room"]), "Assign every activity and delay in the complete journey to reception"],
  [D.flow(["Guest|enters lobby", "Exclude|approval waiting", "Guest|enters room"]), "Remove cross-department waiting because responsibility is distributed"]
], "The programme must preserve the complete customer journey while distinguishing responsibility for individual activities. End-to-end measurement does not mean that reception controls every delay, and distributed accountability does not justify excluding waiting experienced by guests.");
 
OR("W8O3b-10", "W8O3b", 2, "Put these activities in the logical order for resolving a legitimate objection to Qasr's baseline.",
  ["Invite the stakeholder to explain the concern about the measurement", "Clarify the measurement's purpose and defined process boundaries", "Examine the objection against observations and operational records", "Correct any supported inaccuracies and explain the remaining findings", "Document the agreed baseline and clarify responsibility for its future use"],
  "A constructive response begins by understanding the objection and explaining the measurement. Evidence-based review supports justified corrections, while documented definitions and clear accountability allow the baseline to be used consistently during later evaluation.");
 
MA("W8O3b-11", "W8O3b", 2, "Match each practice to its contribution to a trustworthy baseline agreement.",
  [["Explaining measurement purposes", "Reduces uncertainty about how performance evidence will be used"], ["Employee validation", "Allows process performers to identify and correct supported inaccuracies"], ["Transparent sampling definitions", "Makes the population and evidence behind the reported figure understandable"], ["Clear process ownership", "Establishes responsibility for coordinating the complete customer outcome"]],
  "Trustworthy baselining requires more than a technically accurate number. Clear purposes, employee participation, transparent evidence and defined ownership help stakeholders understand the measurement and use it responsibly.");
 
MA("W8O3b-12", "W8O3b", 3, "Match each Qasr management situation to the most defensible response.",
  [["The director prefers the 12.4-minute system measure", "Retain it for departmental diagnosis while preserving the end-to-end programme baseline"], ["Employees identify an omitted exception in the process model", "Investigate the evidence and incorporate a supported correction"], ["A 47-minute approval wait affects 61 percent of sampled arrivals", "Preserve the waiting in the complete measure while clarifying departmental responsibility"], ["Managers propose changing measurement boundaries after implementation", "Maintain comparable definitions so later results can be evaluated against the original baseline"]],
  "The programme should preserve legitimate departmental measures without replacing the complete arrival baseline. Supported employee corrections strengthen the evidence, while clear accountability and consistent boundaries protect the validity of future performance comparisons.");

// W8O3c · The decision, the forum and the next phase
// Correct answers are written first; the bank player shuffles options.
 
M("W8O3c-01", "W8O3c", 1, "What should Qasr's programme sponsor accept as the baseline for evaluating improvements to the complete corporate guest arrival process?",
  ["The validated 82.0-minute mean measured from lobby entry until entry into a released room", "The 12.4-minute property system measure covering booking-record processing", "The original guest's twenty-three-minute reception experience", "The 47-minute corporate-rate approval wait affecting some sampled arrivals"],
  "The 82.0-minute mean covers the complete journey that the programme intends to improve. It was measured across 310 corporate arrivals, making it the appropriate end-to-end baseline once its evidence and definitions have been validated.");
 
M("W8O3c-02", "W8O3c", 2, "The front-office director accepts the evidence but disputes responsibility for delays outside reception. What should the sponsor do?",
  ["Preserve the end-to-end baseline while clarifying departmental accountability and ownership of the complete process", "Replace the programme baseline with reception processing time to eliminate disagreement", "Assign every minute of the complete arrival duration to the front-office director", "Exclude cross-department waiting because no single department controls the entire journey"],
  "The director's accountability concern is legitimate, but it does not invalidate the complete process measurement. Clear end-to-end ownership and appropriate departmental responsibilities allow Qasr to preserve measurement integrity without assigning unfair blame.");
 
M("W8O3c-03", "W8O3c", 3, "A Qasr manager argues that identifying a promising quick win proves the Understand phase has already delivered measurable benefits. What is the strongest response?",
  ["The opportunity remains unproven until an implemented change produces comparable performance evidence", "Identifying a quick win automatically establishes that the original baseline has been exceeded", "The programme should replace the original baseline with the quick win's expected performance", "A quick win eliminates the need to investigate exceptions and root causes"],
  "Understand identifies evidence-supported improvement opportunities but does not establish that they have delivered benefits. Demonstrating improvement requires implementation followed by comparable measurements against the agreed baseline.");
 
TF("W8O3c-04", "W8O3c", 1, "The Understand handover should include a validated as-is model, quantified baseline, root cause analysis, documented exceptions and potential quick wins.", true,
  "This statement is true. These connected outputs establish how the process operates, how it performs and which problems deserve attention. They provide the evidence needed for subsequent redesign decisions.");
 
TF("W8O3c-05", "W8O3c", 2, "A manager must personally agree with every proposed improvement before accepting the evidence supporting a process baseline.", false,
  "This statement is false. Accepting a baseline as valid concerns its evidence, definitions and measurement boundaries. Stakeholders may agree that the measurement is defensible while disagreeing about accountability or the best improvement solution.");
 
DR("W8O3c-06", "W8O3c", 1, "The Understand phase establishes the current process and its {1}, while the subsequent Innovate phase develops alternatives for the process's {2}.",
  [["baseline", "implementation", "future target"], ["future design", "historical performance", "original complaint"]],
  "Understand establishes an evidence-based description and measured baseline of current operations. Innovate uses those findings to develop possible future process designs rather than treating proposed improvements as already achieved.");
 
DR("W8O3c-07", "W8O3c", 3, "In the discussion forum, a defensible argument should connect the chosen measurement to the process {1} and support its interpretation using the supplied {2}.",
  [["improvement objective", "departmental preference", "lowest reported figure"], ["case evidence", "personal authority", "preferred solution"]],
  "A strong baseline argument explains why its measurement boundary matches the intended improvement outcome. The supplied case evidence should support that reasoning rather than relying on managerial preference or the most attractive number.");
 
V("W8O3c-08", "W8O3c", 2, "Which diagram best represents the evidence Qasr should carry from Understand into Innovate?", [
  [D.flow(["Validated|as-is model", "Agreed|baseline", "Root cause|analysis", "Recorded|exceptions", "Potential|quick wins"]), "Carry forward the validated model, agreed baseline, supported causes, documented exceptions and potential quick wins"],
  [D.flow(["Guest|complaint", "Choose|software", "Implement|immediately"]), "Select and implement technology using the original complaint alone"],
  [D.flow(["Report|reception time", "Exclude|approval waiting", "Declare|success"]), "Exclude cross-department waiting and declare the programme successful"],
  [D.flow(["Propose|redesign", "Assume|benefits", "Close|programme"]), "Treat a proposed redesign as proof that the expected benefits have been achieved"]
], "Understand provides evidence about current operations rather than an implemented future process. Its validated model, baseline, root cause findings, exception evidence and potential quick wins create a defensible foundation for Innovate.");
 
V("W8O3c-09", "W8O3c", 3, "Which diagram best represents a defensible decision process when stakeholders disagree about the programme baseline?", [
  [D.flow(["Compare|measurements", "Explain|boundaries", "Validate|evidence", "Clarify|ownership", "Agree|baseline"]), "Reconcile measurement definitions, validate evidence, clarify responsibility and establish the programme baseline"],
  [D.flow(["Compare|measurements", "Choose|smallest", "Declare|agreement"]), "Choose the most favourable figure to avoid further disagreement"],
  [D.flow(["Hear|objection", "Remove|waiting", "Approve|new figure"]), "Exclude disputed waiting without investigating whether it belongs in the complete journey"],
  [D.flow(["Report|82 minutes", "Blame|reception", "Close|discussion"]), "Assign every delay to reception without distinguishing departmental accountability"]
], "A defensible baseline decision requires transparent boundaries, reliable evidence and fair accountability. Stakeholder concerns should be investigated without allowing departmental preferences to conceal the complete customer experience.");
 
OR("W8O3c-10", "W8O3c", 2, "Put these activities in the logical order for completing Qasr's Understand handover and preparing for Innovate.",
  ["Validate the as-is process model with operational participants", "Confirm the quantified baseline and its measurement definitions", "Document supported root causes, exceptions and potential quick wins", "Clarify end-to-end ownership and departmental responsibilities", "Use the agreed findings to develop future process alternatives"],
  "The handover must establish credible current-state evidence before future designs are developed. Validated models, consistent measurements, documented findings and clear responsibilities allow Innovate to address demonstrated process problems.");
 
MA("W8O3c-11", "W8O3c", 2, "Match each Understand output to its role in preparing Qasr for the next phase.",
  [["Validated as-is model", "Describes how current guest arrival activities and handoffs actually operate"], ["Agreed quantified baseline", "Establishes the performance reference for later comparison"], ["Root cause analysis", "Explains underlying conditions producing recurring process problems"], ["Potential quick wins", "Identifies limited improvement opportunities whose benefits remain to be demonstrated"]],
  "The Understand outputs contribute different but complementary evidence. The model explains current operations, the baseline measures performance, root cause analysis investigates recurring problems, and potential quick wins identify opportunities for later evaluation.");
 
MA("W8O3c-12", "W8O3c", 3, "Match each final Week 8 decision or learning activity to its most defensible purpose.",
  [["Retain the 82.0-minute programme baseline", "Measure the complete corporate guest arrival journey consistently"], ["Preserve the 12.4-minute system figure", "Support diagnosis of narrower reception processing activities"], ["Clarify responsibility for the corporate-rate approval wait", "Address departmental accountability without excluding the delay from the complete journey"], ["Defend a measurement in the Whose Number Is Right forum", "Apply evidence-based reasoning to a different organisation's baseline dispute"]],
  "Qasr's end-to-end baseline and departmental measures answer different management questions. Clarifying accountability protects fair interpretation, while the forum transfers the same analytical principles to an unfamiliar case requiring a justified measurement decision.");

  // ==========================================================
  // NORMALISE TO THE DOCUMENTED WEEK 1 SCHEMA
  //
  // Required fields:
  // id, clo, lo, sec, diff, type, q, o, ans, why, rem
  //
  // The correct option is authored first for MCQ and visual.
  // The correct blank choice is authored first for drop.
  // Order items are authored in the correct sequence.
  // Match pairs are authored with their correct relationships.
  //
  // The player handles runtime shuffling.
  // ==========================================================

  const A = window.ADAPTIVE;

  B.forEach((x) => {

    x.lo = A.sections[x.sec].lo;

    x.clo = A.outcomes[x.lo].clo;

    x.outcome = A.outcomes[x.lo].full;

    x.rem = `review:${x.sec}`;

    if (
      x.type === "mcq" ||
      x.type === "visual"
    ) {
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
// END-BLOCK
