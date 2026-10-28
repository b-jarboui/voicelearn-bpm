// OPER621 Business Process Management Â· Week 8 Â· The Understand Phase.
// Source: Week 8 Session 1 slides and Week 8 Delivery Plan.
// Running case: Qasr Hospitality Group, guest arrival, three clocks.
//
// COURSE LEARNING OUTCOMES
// S1: Design a framework for BPM and explain and assess related phases
//     in the context of a regional company.
// K3: Assess the importance of change management in relation to BPM and
//     devise solutions to minimize employees' resistance.
//
// WEEKLY LEARNING OUTCOMES
// O1 [S1]: Model an as-is process and establish an agreed baseline of its performance.
// O2 [S1]: Evaluate conflicting measurements of the same process and determine which to trust.
// O3 [K3]: Assess the resistance encountered when current performance is made visible.
//
// WEEK 8 LESSON PLAN
// Lesson l1: What really happens at Qasr?          W8O1a, W8O1b, W8O1c   [O1; S1]
// Lesson l2: Three clocks, three different answers W8O2a, W8O2b, W8O2c   [O2; S1]
// Lesson l3: Where the time disappears             W8O1d, W8O1e, W8O2d   [O1, O2; S1]
// Lesson l4: When the numbers become personal      W8O3a, W8O3b, W8O3c   [O3; K3]
//
// ============================================================

(() => {
  "use strict";

  const D = window.DIAG;

  const t = (kicker, text, count) =>
    ({ type: "title", kicker, text, count });

  const it = (n, of, icon, title, text) =>
    ({ type: "item", n, of, icon, title, text });

  const q = (text) =>
    ({ type: "question", text });

  const st = (text) =>
    ({ type: "statement", text });

  const iss = (text, effect) =>
    ({ type: "issue", text, effect });

  const cmp = (side, label, note, dir) =>
    ({ type: "compare", side, label, note, dir });

  const dg = (kicker, svg, caption) =>
    ({ type: "diagram", kicker, svg, caption });

  const fm = (label, num, den) =>
    ({ type: "formula", label, num, den });

  window.MOMENT_KIT = {
    t, it, q, st, iss, cmp, dg, fm
  };


  window.COURSE = {
    id: "oper621-w8",
    code: "OPER621",
    title: "The Understand Phase",
    subtitle: "Business Process Management \u00b7 Week 8",
    author: "Prof. Bassem Jarboui",
    teacher: { name: "Prof. Bassem Jarboui", email: "", sendReport: false },
    lessons: [
      { id: "l1", title: "What really happens at Qasr?", sections: [
{
  title: "Understand before you improve",
  sec: "W8O1a",
  lines: [
    ["Welcome to Week 8, where we'll discover why improving a process begins with understanding what actually happens today.", t("OPER621 · Week 8", "The Understand Phase: what the process actually does today.")],
    ["Let's return to Qasr Hospitality Group, where our improvement programme has reached an important turning point.", null],
    ["You may remember the exhausted business traveller whose difficult arrival helped expose problems across Qasr Marina.", dg("The experience that started our journey", D.flow(["Guest|arrives", "Booking|checked", "Rate|confirmed", "!Room not|ready"]), "The original guest experienced a difficult arrival because connected activities failed to deliver a ready room.")],
    ["She spent twenty-three minutes at reception, yet the room she eventually received was not ready.", null],
    ["That experience gave Qasr's managers a compelling reason to investigate how their guest arrival process operates.", iss("The guest waited 23 minutes at reception and received a room that was not ready.", "A reason to investigate")],
    ["Since then, Qasr has connected its improvement ambitions to organisational strategy and examined its process architecture.", null],
    ["The team has also prepared its programme through the Launch Pad, establishing the foundations for coordinated work.", dg("The programme's journey", D.route([0, 1, 2]), "Organisation Strategy, Process Architecture, and Launch Pad establish the foundations before Qasr enters Understand.")],
    ["Now the programme reaches Understand, which is phase four of the ten-phase Business Process Management framework.", null],
    ["Understand investigates the current process so that later improvement decisions rest on evidence rather than assumptions.", dg("Phase four: Understand", D.route([3]), "Understand examines current performance before Innovate develops a better process, while the framework's continuous essentials remain active.")],
    ["But imagine Qasr's general manager asking the team to redesign check-in immediately because the guest complained.", null],
    ["Someone might suggest installing new software, while another manager might recommend changing reception staffing arrangements.", iss("Managers propose solutions before establishing what actually causes the guest's difficult arrival.", "Solutions before evidence")],
    ["Both suggestions might eventually prove useful, but neither is justified simply because the guest experienced a delay.", null],
    ["Without understanding the current process, Qasr could spend money fixing activities that aren't causing the problem.", q("How can Qasr choose an effective improvement before understanding why the current process fails?")],
    ["That's why Understand begins with an as-is model, meaning a description of how work is actually performed.", null],
    ["The model must include activities that employees perform routinely, even when those activities never appear in procedures.", st("An as-is model describes the process as employees actually perform it, including undocumented activities and workarounds.")],
    ["For example, receptionists might telephone colleagues because the information they need isn't available in their system.", null],
    ["That telephone call belongs in the model because it affects how long the guest waits for service.", dg("An undocumented activity matters", D.flow(["Find|booking", "!Telephone|colleague", "Confirm|rate", "Continue|check-in"]), "The actual process includes telephone confirmation when employees cannot obtain the required information directly.")],
    ["Understand also establishes a baseline, which is a measured description of current performance before improvements begin.", null],
    ["A useful baseline captures volumes, elapsed times, costs, errors and repeated work wherever reliable evidence exists.", st("A baseline records current performance so later results can be compared against a defensible starting point.")],
    ["These measures matter because a process can appear efficient when managers observe only its visible activities.", null],
    ["Waiting between departments may consume far more time than the activities employees actually perform.", dg("Work and waiting are different", D.flow(["Active|work", "!Waiting", "Active|work", "!Waiting", "Outcome"]), "The complete elapsed time includes waiting between activities, not merely the time employees spend working.")],
    ["The team must also discover where customer value is created and where information becomes delayed or disconnected.", null],
    ["This evidence helps distinguish genuine causes from symptoms that merely reveal something deeper is wrong.", st("Understand identifies how the process performs and why problems arise before anyone commits to a redesign.")],
    ["Now imagine the team discovering that several employees disagree with the process description prepared by management.", null],
    ["Their disagreement matters because employees may know about exceptions and workarounds that official records cannot reveal.", q("What important evidence might employees provide that a management report has overlooked?")],
    ["So the team must investigate openly and establish findings that both programme leaders and operational managers can accept.", null],
    ["Otherwise, managers may challenge the original baseline when the programme later claims that performance has improved.", iss("An unaccepted baseline can undermine later claims that the improvement programme delivered measurable benefits.", "A credibility problem")],
    ["Understand therefore produces evidence that Innovate will use to design changes addressing the causes of poor performance.", null],
    ["That same baseline will support Realize Value when Qasr evaluates whether its improvements delivered the intended benefits.", dg("Evidence connects improvement with results", D.flow(["Understand|baseline", "Innovate|design", "Implement|changes", "Realize|Value"]), "Understand establishes the baseline that guides redesign and supports later evaluation of realised benefits.")],
    ["Remember that Understand isn't simply preparation for redesign; its evidence makes the eventual redesign defensible.", null],
    ["Our next challenge is discovering how Qasr's guest arrival process really operates beyond its written procedures.", q("What would you need to observe before trusting Qasr's description of how guests actually arrive?")]
  ],
  review: [
    {
      title: "A medical diagnosis before treatment",
      lines: [
        ["Let's approach Understand through a familiar situation that shows why evidence must come before a proposed solution.", t("Another way to understand the phase", "A medical diagnosis shows why investigating causes must come before choosing treatment.")],
        ["Imagine visiting a doctor because you've been feeling unusually tired throughout the working day for several weeks.", null],
        ["You explain that your concentration has declined, and ordinary activities now require considerably more effort than before.", iss("A patient experiences persistent tiredness, but the underlying cause has not yet been established.", "A symptom without a diagnosis")],
        ["Suppose the doctor immediately recommends a particular treatment without asking questions or examining any relevant evidence.", null],
        ["You might reasonably worry because several different conditions or everyday circumstances could explain the same tiredness.", q("Would you trust a treatment chosen before the doctor investigated what was causing your symptoms?")],
        ["A careful doctor instead investigates your circumstances, considers possible explanations and gathers evidence appropriate to your symptoms.", null],
        ["The purpose isn't to delay treatment unnecessarily, but to avoid choosing an intervention that addresses the wrong problem.", st("A diagnosis establishes what is happening and investigates possible causes before a treatment is selected.")],
        ["Now imagine the doctor asking about your sleeping patterns, working hours and any recent changes in your routine.", null],
        ["Your answers provide useful information, but the doctor may also need observations or appropriate tests before drawing conclusions.", dg("Investigating before acting", D.flow(["Reported|symptoms", "Gather|evidence", "Investigate|causes", "Choose|treatment"]), "A defensible treatment decision follows an investigation of symptoms, evidence and possible causes.")],
        ["This resembles the Understand phase because a business process also produces symptoms without immediately revealing their causes.", null],
        ["A delayed delivery, for example, might result from poor scheduling, missing information or waiting between different teams.", iss("A delivery arrives late, but the delay alone does not establish which activity caused the problem.", "A process symptom")],
        ["Simply purchasing faster delivery vehicles might accomplish little if completed orders spend hours waiting for dispatch approval.", null],
        ["The organisation needs an as-is model showing how deliveries actually move through the existing process.", st("The as-is model records current activities, including waiting and undocumented practices that may explain poor performance.")],
        ["It also needs a baseline, meaning reliable measurements describing performance before the organisation introduces its proposed improvements.", null],
        ["Without that baseline, managers cannot confidently determine whether their eventual changes produced a meaningful improvement.", dg("Comparing performance", D.flow(["Measure|current state", "Investigate|causes", "Introduce|change", "Compare|results"]), "A measured starting point makes it possible to evaluate whether subsequent changes improve process performance.")],
        ["Now consider how a doctor uses earlier observations when reviewing whether a treatment has helped the patient.", null],
        ["The comparison matters because feeling slightly better does not necessarily establish the size or reliability of improvement.", q("How could you demonstrate improvement if nobody recorded the original condition or its severity?")],
        ["Business Process Management follows the same reasoning by connecting investigation, improvement decisions and later performance evaluation.", null],
        ["Understand establishes the evidence, while subsequent phases use that evidence to design changes and assess their results.", st("Understand makes later improvement defensible because decisions and performance comparisons rest on evidence.")],
        ["So remember that a convincing symptom can justify investigation without automatically justifying any particular solution.", null],
        ["The responsible response is to understand the present condition before deciding how that condition should change.", null]
      ]
    },
    {
      title: "The university transcript that took too long",
      lines: [
        ["Imagine a university receiving repeated complaints because students wait too long to obtain their official academic transcripts.", t("Another way to understand current performance", "A university transcript service shows why written procedures and actual work can differ.")],
        ["The registrar explains that transcript requests follow a clear procedure, with employees checking records before preparing documents.", null],
        ["According to the procedure, the request moves through a small number of straightforward administrative activities.", dg("The documented transcript procedure", D.flow(["Student|requests", "Check|record", "Prepare|transcript", "Release|document"]), "The written procedure presents transcript preparation as a straightforward sequence of administrative activities.")],
        ["But imagine following an actual student request from submission until the student finally receives the completed transcript.", null],
        ["You discover that employees sometimes email finance because an old payment record cannot be confirmed automatically.", iss("Employees must request additional payment confirmation when the system cannot verify an older student record.", "An undocumented workaround")],
        ["The request then waits in a shared mailbox until someone notices that finance has provided the information.", null],
        ["Neither the email exchange nor the waiting period appears in the registrar's official process description.", q("Can the university understand its delays if the process model excludes activities employees actually perform?")],
        ["The answer is no, because the written procedure describes intended work rather than everything happening in practice.", null],
        ["An as-is model must therefore include the email exchange and waiting, even though neither was formally designed.", dg("The process as performed", D.flow(["Student|requests", "Check|record", "!Email|finance", "!Wait for|reply", "Release|document"]), "The actual transcript process includes an undocumented finance handoff and waiting before the document can be released.")],
        ["This distinction matters because improving the documented steps alone might leave the student's real delay completely unchanged.", null],
        ["Now suppose the registrar reports that preparing a transcript requires only a short period of active employee work.", null],
        ["That figure may be accurate, but it does not describe how long students wait for their completed documents.", st("Employee working time and the student's total elapsed waiting time describe different aspects of the same service.")],
        ["Understand requires the university to define its measurement boundaries and collect reliable evidence about actual performance.", null],
        ["For the student's experience, the relevant journey begins with submitting the request and ends when the transcript arrives.", dg("The student's complete journey", D.flow(["Submit|request", "Verify|details", "Resolve|exceptions", "+Receive|transcript"], { bracket: [0, 3, "Request to receipt"] }), "The student-centred boundary includes the complete journey from requesting the transcript to receiving it.")],
        ["The university can then establish a baseline covering elapsed time, request volumes, errors and repeated work.", null],
        ["That baseline provides a starting point against which later improvements can be evaluated rather than merely assumed.", st("A reliable baseline records actual performance before the university introduces changes to the transcript service.")],
        ["But the investigation should also involve the employees who process requests because they understand the hidden difficulties.", null],
        ["Their explanations can reveal why workarounds exist and whether apparently unnecessary checks still protect important requirements.", q("What might employees know about the process that its written procedure and system records cannot explain?")],
        ["The university should validate its findings before deciding whether technology, staffing or procedural changes are appropriate.", null],
        ["That is the essential purpose of Understand: establish what happens, investigate why, and measure the starting position.", st("Understand produces evidence that makes later redesign decisions defensible and their results measurable.")],
        ["Once the current process is understood, the university can pursue improvements without confusing assumptions with established facts.", null]
      ]
    }
  ]
},
{
  title: "The process nobody wrote down",
  sec: "W8O1b",
  lines: [
    ["We have established why Qasr must understand its current process before deciding how guest arrival should improve.", t("The process nobody wrote down", "Discovering how guest arrival actually works at Qasr Hospitality Group.")],
    ["Now let's follow the work itself, because the official procedure may conceal activities that employees perform every day.", null],
    ["Imagine asking Qasr's reception manager to describe how a corporate guest receives a room after arriving.", q("Would the manager's description necessarily match what employees and guests experience during a busy arrival?")],
    ["The manager might describe a straightforward sequence involving reservation checks, rate confirmation, room assignment and key preparation.", null],
    ["That description sounds reasonable, but it doesn't establish how work actually moves between people and departments.", st("A documented procedure describes intended work, while an as-is model must capture work as actually performed.")],
    ["Qasr's investigation therefore follows the guest arrival process across the departments responsible for completing it.", null],
    ["The slide's swimlane model makes those responsibilities visible by placing activities within their relevant organisational lanes.", dg("Qasr's guest arrival swimlane", D.flow(["Guest|arrives", "Reception|checks booking", "Corporate rate|confirmed", "Room|released", "Guest|receives room"]), "A swimlane model identifies who performs each activity and where responsibility passes between participants.")],
    ["A swimlane is simply a process diagram that shows which participant or department performs each activity.", null],
    ["Its value comes from exposing handoffs, where work or information passes from one responsible party to another.", st("A handoff transfers work or information between participants, potentially introducing waiting, clarification or rework.")],
    ["The Qasr model contains four handoffs, making their consequences particularly important to the investigation.", null],
    ["Each handoff deserves attention because a completed activity doesn't guarantee that the next participant can proceed immediately.", iss("Work may be completed in one department while the next department remains unable to continue.", "The hidden cost of handoffs")],
    ["Consider a receptionist who cannot confirm a corporate rate without obtaining information from another authorised colleague.", null],
    ["The receptionist may use a telephone call or message to resolve the uncertainty and keep the guest moving.", dg("An illustrative workaround", D.flow(["Check|reservation", "!Request|clarification", "Receive|confirmation", "Continue|arrival"]), "An informal clarification may become part of the actual process even when the written procedure omits it.")],
    ["This is a workaround, meaning an informal method employees develop when the intended procedure doesn't meet operational needs.", null],
    ["Workarounds aren't automatically mistakes; they may represent practical responses to missing information or poorly connected systems.", st("An undocumented workaround can reveal an important process dependency rather than simply an employee's failure to follow instructions.")],
    ["However, excluding these activities would make the model appear simpler and faster than the process guests actually experience.", null],
    ["That's why the team must observe real arrivals rather than relying exclusively on interviews or existing procedure documents.", q("What could direct observation reveal that an official procedure or manager's explanation might overlook?")],
    ["Observation also helps identify exceptional paths, where a request follows a different route because something unusual occurs.", null],
    ["A booking discrepancy, unavailable room or missing approval might require additional activities before the guest can proceed.", dg("Normal and exceptional paths", D.flow(["Review|arrival", "Information|complete?", "Normal|processing", "!Exception|resolution", "Continue|service"]), "The as-is model must represent meaningful exceptions without becoming overwhelmed by every possible variation.")],
    ["But a useful model must balance completeness with clarity, because excessive detail can obscure the process's important relationships.", null],
    ["For Qasr, the appropriate detail reveals activities, responsibilities, handoffs and delays that influence the guest's experience.", st("Model enough detail to explain performance and responsibility, without documenting every keystroke or minor movement.")],
    ["The team should also distinguish what it observes from explanations offered by employees or assumptions made by managers.", null],
    ["When different accounts conflict, the investigators can examine additional cases and ask participants to explain the differences.", cmp("Evidence and interpretation", "Observed activity", "An activity directly witnessed or supported by a reliable record.", "Reported explanation", "A participant's account that may require comparison with other evidence.")],
    ["This validation matters because employees performing the work often understand dependencies that senior managers rarely encounter directly.", null],
    ["Their participation also makes the eventual model more credible, reducing the risk that important operational realities are dismissed.", iss("A process model prepared without employee validation may omit essential work and lose the trust of its users.", "A model nobody recognises")],
    ["Remember that Qasr isn't redesigning guest arrival yet; the immediate objective is an accurate picture of current practice.", null],
    ["Once that picture is agreed, the team can investigate why its handoffs and exceptions affect performance.", dg("From observation to understanding", D.flow(["Observe|real work", "Model|activities", "Validate|with staff", "Investigate|performance"]), "The as-is model becomes a trustworthy foundation for later analysis when actual performers validate its contents.")],
    ["So whenever a process diagram looks surprisingly simple, ask whether it describes the work people really perform.", null],
    ["That question will help you recognise the difference between a convenient procedure and a defensible as-is model.", q("Could you defend Qasr's process model if employees said it omitted the activities causing their greatest delays?")]
  ],
  review: [
    {
      title: "The pharmacy prescription nobody expected",
      lines: [
        ["Let's explore hidden process activities through a community pharmacy, where the written procedure appears reassuringly straightforward.", t("The pharmacy's hidden process", "Why the actual workflow may differ from the official prescription procedure.")],
        ["Imagine a patient arriving with a prescription and expecting the pharmacist to prepare the medicine without unnecessary delay.", null],
        ["The pharmacy's documented procedure shows the prescription being checked, the medicine prepared and the patient receiving it.", dg("The documented pharmacy process", D.flow(["Receive|prescription", "Check|details", "Prepare|medicine", "Hand over|medicine"]), "The official procedure describes the expected sequence without showing how employees handle missing information.")],
        ["However, imagine observing an actual prescription containing a dosage instruction that the pharmacist cannot confidently interpret.", null],
        ["The pharmacist contacts the prescribing clinic because dispensing medicine without clarification could create an unacceptable safety risk.", iss("The pharmacist cannot safely proceed until the prescribing clinic clarifies the dosage instruction.", "An essential exception")],
        ["The clinic's receptionist records the question, but the prescribing clinician is currently attending another patient.", null],
        ["The pharmacist therefore waits for confirmation while keeping the prescription separate from those ready for preparation.", q("Would a process model be accurate if it ignored the clarification and waiting required for safe dispensing?")],
        ["The written procedure doesn't mention this exchange, yet the actual process cannot continue safely without it.", null],
        ["An as-is model must capture the clarification because it affects both the patient's experience and the pharmacy's performance.", dg("The process as performed", D.flow(["Receive|prescription", "!Contact|clinic", "!Wait for|clarification", "Prepare|medicine", "Hand over|medicine"]), "The observed workflow includes an exception and a waiting period that the documented procedure omitted.")],
        ["Notice that the pharmacist's additional work isn't necessarily wasteful, because checking uncertain instructions protects the patient.", null],
        ["The investigation should therefore understand why the activity exists before recommending that anyone remove or shorten it.", st("An activity that creates waiting may still perform an essential safety or compliance function.")],
        ["Now imagine the pharmacy manager insisting that the prescription process normally takes only a few minutes.", null],
        ["That estimate might describe routine prescriptions, but it doesn't explain the longer journeys experienced by exceptional cases.", cmp("Routine and exceptional work", "Routine prescription", "The expected sequence proceeds without additional clarification.", "Exceptional prescription", "An uncertainty requires another participant's response before dispensing can continue.")],
        ["The investigator should observe different prescriptions and ask employees how frequently such interruptions actually occur.", null],
        ["Employees can explain which situations require clarification, while observations help establish whether their accounts match actual practice.", st("A trustworthy as-is model combines direct observation with explanations from the people performing the work.")],
        ["The model also needs appropriate detail, because recording every movement would distract from the important clinical dependency.", null],
        ["Showing the clinic handoff and the resulting wait is more useful than documenting every screen the pharmacist opens.", q("Which details would help you understand the delay without overwhelming the model with unnecessary information?")],
        ["Once the pharmacist and clinic confirm the model, the investigator has a stronger basis for analysing performance.", null],
        ["The lesson is that accurate modelling reveals necessary exceptions rather than assuming every departure from procedure is failure.", st("Model the work that actually happens, then investigate which activities are necessary and which problems deserve improvement.")],
        ["That distinction protects both service quality and the credibility of any improvement decisions made later.", null]
      ]
    },
    {
      title: "The online order that vanished between teams",
      lines: [
        ["Consider a small online retailer promising customers that orders will be dispatched promptly after payment confirmation.", t("The order that vanished between teams", "Using handoffs to reveal activities missing from a documented process.")],
        ["Its procedure shows a simple journey from receiving payment to picking, packing and handing parcels to the courier.", null],
        ["The operations manager believes this diagram accurately describes how employees fulfil every ordinary customer order.", dg("The documented order process", D.flow(["Payment|confirmed", "Pick|items", "Pack|order", "Courier|collection"]), "The written procedure suggests a continuous flow from payment confirmation to courier collection.")],
        ["But imagine following a particular order that remains uncollected long after the customer's payment has been accepted.", null],
        ["You discover that the warehouse cannot begin picking because the inventory system has temporarily reserved an unavailable item.", iss("Payment is confirmed, but the warehouse cannot release an order containing an unavailable reserved item.", "A hidden interruption")],
        ["A warehouse employee sends a message to customer service, requesting permission to substitute a comparable product.", null],
        ["Customer service then contacts the customer, who must approve the substitution before the order can continue.", dg("The actual exception route", D.flow(["Payment|confirmed", "!Stock|problem", "Customer|contacted", "!Await|approval", "Pick and|pack"]), "An inventory exception creates additional handoffs and waiting that the official order procedure does not show.")],
        ["None of these exchanges appears in the original process diagram, although each influences the customer's delivery time.", null],
        ["The missing activities matter because a manager might otherwise blame warehouse employees for delays they cannot independently resolve.", q("Who controls the waiting period when the warehouse needs a customer's decision before releasing an order?")],
        ["A swimlane model can clarify responsibility by showing which participant performs each activity and receives each request.", null],
        ["The handoffs become visible when the order moves between warehouse employees, customer service and the customer.", st("Swimlanes expose responsibility boundaries, while handoffs show where information or work must pass between participants.")],
        ["Now imagine the warehouse manager describing the customer-service messages as occasional interruptions rather than part of the process.", null],
        ["That description might be reasonable, but the investigator still needs evidence about how frequently the exception occurs.", cmp("Claims and observations", "Manager's account", "The exception is described as an occasional interruption.", "Observed cases", "Actual orders reveal whether the exception occurs and how it affects processing.")],
        ["Observing multiple orders helps distinguish an unusual incident from a recurring dependency that deserves explicit representation.", null],
        ["The investigator should also ask employees why they use messages rather than an established system function.", null],
        ["Their answers might reveal that the workaround compensates for missing information or an unresolved technical limitation.", iss("An informal message may be the only practical way to resolve an exception under current operating conditions.", "A workaround with a purpose")],
        ["The model shouldn't become an exhaustive record of every message, but it must show the consequential approval dependency.", null],
        ["This level of detail allows managers to understand the delay without losing sight of the complete customer journey.", st("Include activities that explain performance, responsibility and exceptions; omit minor details that add no analytical value.")],
        ["Finally, the people performing the work should examine the model and identify anything important the investigator missed.", null],
        ["Their validation matters because an elegant diagram is useless when it misrepresents the process employees actually operate.", q("Would you trust a process model that looks tidy but cannot explain why real customer orders remain delayed?")],
        ["The reliable model is the one that makes hidden work visible and supports a defensible investigation of performance.", null]
      ]
    }
  ]
},
{
  title: "Finding evidence that people can trust",
  sec: "W8O1c",
  lines: [
    ["We've discovered that Qasr's guest arrival process contains activities and handoffs that its written procedures may overlook.", t("Finding evidence that people can trust", "Investigating the real process through observation, interviews, records and validation.")],
    ["But drawing those activities is only useful when we can explain how we know they actually happen.", null],
    ["Imagine presenting Qasr's new process model to the front-office director, who immediately questions several activities shown.", q("What evidence would help you defend a process model when an experienced manager challenges its accuracy?")],
    ["The director remembers smooth arrivals, while receptionists describe frequent interruptions and guests remember waiting for assistance.", null],
    ["These accounts may all be sincere, yet each describes the process from a different operational perspective.", cmp("Three perspectives", "Management", "Describes expected operations and departmental responsibilities.", "Frontline employees", "Describe actual activities, exceptions and workarounds.")],
    ["Our task is not to choose the most confident speaker, but to investigate what the evidence supports.", null],
    ["Let's follow a real corporate arrival from the guest entering the lobby until entering a released room.", dg("Walk the complete case", D.flow(["Guest|enters lobby", "Reservation|checked", "Rate|confirmed", "Room|released", "Guest|enters room"]), "Following one complete arrival reveals activities and waiting across the process boundary.")],
    ["This is called walking a case, meaning tracing one actual transaction through its activities, decisions and handoffs.", null],
    ["Walking the complete journey matters because departmental observations can miss delays occurring between separate teams.", st("Walking a case follows an actual transaction end to end, revealing activities and dependencies that isolated observations may miss.")],
    ["Suppose the receptionist explains that corporate-rate confirmation sometimes requires assistance from another authorised colleague.", null],
    ["A supervisor might describe the same interaction as an occasional clarification that rarely affects normal operations.", cmp("Different accounts of the same activity", "Receptionist", "Describes the clarification needed to complete certain arrivals.", "Supervisor", "Describes how the process normally operates.")],
    ["Rather than treating either explanation as conclusive, investigators should interview employees and supervisors separately.", null],
    ["Separate interviews can reveal disagreements that participants might hesitate to express in front of their managers.", q("Why might an employee describe a recurring workaround differently when their supervisor is present?")],
    ["The investigators can then compare those accounts with observations and ask participants to explain any remaining differences.", null],
    ["This approach helps distinguish inaccurate recollections from genuine variations in how different cases are handled.", st("Interviews explain how participants understand the process, while observation provides evidence of what actually happens.")],
    ["Qasr also has operational records that can strengthen the investigation, particularly timestamps from its property management system.", null],
    ["However, a recorded transaction does not necessarily capture everything happening before or after that system event.", dg("Visible and invisible work", D.flow(["Recorded|event", "!Unrecorded|waiting", "Recorded|event", "!Informal|clarification", "Recorded|event"]), "System records may omit waiting and informal activities between recorded transactions.")],
    ["A key preparation timestamp, for example, cannot establish when the guest originally entered the lobby.", null],
    ["That distinction matters because accurate timestamps can still support misleading conclusions when measurement boundaries differ.", iss("A precise system measurement may exclude activities that matter to the guest's complete experience.", "Accurate but incomplete")],
    ["Now imagine observing only one uncomplicated arrival during a quiet period when every required room is available.", null],
    ["That case provides useful evidence, but it cannot establish how the process behaves under different conditions.", dg("Observe meaningful variation", D.flow(["Select|arrivals", "Routine|cases", "!Exceptional|cases", "Compare|findings"]), "A suitable sample includes routine and exceptional arrivals rather than one convenient observation.")],
    ["Sampling means selecting cases for investigation, with attention to variations that could affect the conclusions.", null],
    ["Qasr should therefore examine different operating periods and arrivals requiring additional checks or approvals.", st("A defensible sample captures meaningful process variation instead of treating one convenient case as representative.")],
    ["When interviews, observations and system records disagree, the investigators should examine why rather than conceal the contradiction.", null],
    ["Different process boundaries, missing records or exceptional activities may explain apparently incompatible accounts.", q("Could two accurate observations disagree because they begin or end at different points in the process?")],
    ["The team should document its sources, measurement definitions and unresolved uncertainties so others can scrutinise its reasoning.", null],
    ["Employees performing the work should then examine the emerging model and correct activities or handoffs that remain inaccurate.", dg("Building trustworthy evidence", D.flow(["Observe|cases", "Interview|participants", "Examine|records", "Reconcile|differences", "Validate|model"]), "The model becomes more defensible when multiple evidence sources are reconciled and actual performers validate it.")],
    ["This validation matters because an elegant diagram is worthless if employees cannot recognise the process it supposedly represents.", null],
    ["Their corrections may also reveal necessary controls that investigators initially mistake for unnecessary delays.", st("A trustworthy as-is model reflects observed work, explains its evidence and acknowledges important uncertainties.")],
    ["Remember that accepting the evidence doesn't require managers to welcome every finding about their department's performance.", null],
    ["It requires a transparent investigation whose definitions and conclusions can withstand informed questioning.", iss("Trust comes from defensible evidence and transparent measurement boundaries, not from selecting comfortable conclusions.", "Credibility before consensus")],
    ["Qasr can now move toward performance measurement with a clearer understanding of what its process actually includes.", null],
    ["Our next challenge is explaining why different measurements of that same process can produce conflicting figures.", q("Could you explain what Qasr observed, how it checked the evidence and why employees should trust the resulting model?")]
  ],
  review: [
    {
      title: "The laboratory results that told different stories",
      lines: [
        ["Let's explore trustworthy process evidence through a medical laboratory investigating complaints about delayed blood test results.", t("The laboratory evidence puzzle", "Reconciling observations, records and employee accounts before drawing conclusions.")],
        ["Imagine a patient reporting that several hours passed between providing a sample and receiving the laboratory result.", null],
        ["The laboratory supervisor insists that testing normally requires only a short period of active technical work.", cmp("Two descriptions of performance", "Patient", "Describes the complete wait from sample collection to receiving results.", "Supervisor", "Describes the time spent performing the laboratory analysis.")],
        ["Both descriptions might be accurate, but they measure different portions of the patient's complete service journey.", null],
        ["The investigator therefore needs to establish which activities occur between sample collection and result delivery.", dg("The complete laboratory journey", D.flow(["Collect|sample", "Transport|sample", "Analyse|sample", "Validate|result", "Deliver|result"]), "The patient experiences a complete process containing activities beyond the laboratory's technical analysis.")],
        ["Walking an actual sample through the process reveals where it moves, waits and requires additional attention.", null],
        ["This matters because observing laboratory equipment alone would overlook transport delays and administrative dependencies.", st("Walking a case means following one actual transaction through the complete process rather than examining isolated activities.")],
        ["Now imagine technicians explaining that some samples remain waiting because a required patient identifier is missing.", null],
        ["The supervisor describes these cases as rare, while technicians believe they interrupt work almost every day.", q("How could you investigate this disagreement without assuming either group is deliberately misleading you?")],
        ["Separate interviews would help participants describe their experiences without pressure to agree with managerial expectations.", null],
        ["The investigator could then examine sample records and observe whether missing identifiers actually interrupt processing.", dg("Reconciling evidence", D.flow(["Interview|technicians", "Interview|supervisor", "Examine|records", "Observe|samples", "Compare|findings"]), "Independent accounts and operational evidence help establish which explanations are supported.")],
        ["However, a laboratory information system may record analysis times without capturing how long samples wait for transportation.", null],
        ["Accurate records can therefore provide incomplete evidence when their boundaries exclude important parts of the service.", iss("A precise laboratory timestamp may omit waiting that the patient experiences before receiving the result.", "Incomplete measurement boundaries")],
        ["The investigator should also examine different samples because one uncomplicated case cannot represent every operating condition.", null],
        ["Sampling routine and exceptional cases helps distinguish recurring process behaviour from an isolated unusual event.", st("Representative sampling captures meaningful variation instead of relying on one convenient or memorable case.")],
        ["When evidence conflicts, the investigator should document the discrepancy and investigate its possible causes.", null],
        ["Technicians should then review the emerging process model and identify any missing activities or incorrect assumptions.", q("Would you trust a process model that laboratory employees say ignores the activities causing their greatest delays?")],
        ["Their validation strengthens the model because those employees understand operational dependencies that formal procedures may omit.", null],
        ["The resulting description should explain both the evidence supporting its conclusions and any remaining uncertainty.", st("Trustworthy evidence combines observation, records, independent explanations and validation by people performing the work.")],
        ["The laboratory can then investigate improvement opportunities without confusing technical processing time with the patient's complete experience.", null],
        ["That is how a defensible as-is model becomes the foundation for meaningful performance measurement.", null]
      ]
    },
    {
      title: "The university application that disappeared",
      lines: [
        ["Imagine a university investigating complaints from postgraduate applicants who receive admission decisions much later than expected.", t("The missing application", "Why evidence from one system cannot explain an entire administrative process.")],
        ["The admissions manager explains that applications move directly from document verification to academic review and final approval.", null],
        ["According to the admissions system, most recorded activities appear to be completed within reasonable processing periods.", dg("The documented admissions journey", D.flow(["Application|received", "Documents|verified", "Academic|review", "Decision|approved"]), "The official process shows the expected administrative activities without revealing all intervening work.")],
        ["But imagine following an applicant whose file remains unresolved despite every required document being submitted correctly.", null],
        ["You discover that admissions staff sometimes send informal reminders when academic reviewers haven't responded to assigned requests.", iss("An application remains unresolved while employees exchange reminders outside the formal admissions system.", "Hidden coordination work")],
        ["Those messages don't appear in the system's activity history, although they influence how quickly decisions are completed.", null],
        ["The investigator must therefore distinguish what the system records from what employees actually do between recorded events.", st("System records are useful evidence, but their completeness depends on which activities the system captures.")],
        ["Now suppose admissions employees describe frequent reminders, while academic reviewers insist that delays are relatively unusual.", null],
        ["These competing accounts should encourage investigation rather than an immediate judgement about which department is responsible.", q("What evidence would help determine whether informal reminders represent a recurring process problem?")],
        ["The investigator could interview admissions employees and reviewers separately to understand their different responsibilities and experiences.", null],
        ["Following selected applications would then reveal whether messages, waiting and additional checks occur outside the official workflow.", dg("Following real applications", D.flow(["Select|applications", "Trace|activities", "Inspect|messages", "Compare|records", "Validate|findings"]), "Tracing actual applications reveals whether recorded events omit consequential communication and waiting.")],
        ["The selection should include routine applications and those requiring clarification, because their journeys may differ substantially.", null],
        ["This sampling matters because one unusually delayed application cannot establish how the entire admissions process normally operates.", cmp("Two kinds of evidence", "Individual complaint", "Shows what happened to one applicant.", "Selected process cases", "Reveal patterns and variations across different applications.")],
        ["Suppose the investigator discovers that some reviewers receive incomplete information and must request additional documents before deciding.", null],
        ["That finding changes the interpretation because waiting may originate before the academic review activity officially begins.", iss("A missing information dependency can create waiting that neither department's summary report explains clearly.", "A hidden process dependency")],
        ["The investigator should record this evidence without immediately blaming reviewers or recommending additional staffing.", null],
        ["The purpose is to establish how the process operates before deciding which changes might improve performance.", st("Understand investigates actual activities and their causes before selecting solutions or assigning responsibility for poor performance.")],
        ["Admissions employees and academic reviewers should examine the emerging model and challenge any unsupported descriptions.", null],
        ["Their corrections may reveal additional exceptions or explain why certain checks remain necessary for academic quality.", q("Why might a model accepted by only one department fail to describe the complete admissions process?")],
        ["The investigator should document unresolved disagreements rather than disguising them as findings everyone has accepted.", null],
        ["Transparent evidence and clearly defined boundaries make the resulting model more credible across departmental responsibilities.", st("A defensible as-is model explains its evidence, represents actual work and remains open to informed correction.")],
        ["The university can then establish a meaningful baseline without confusing system activity times with applicants' complete waiting experiences.", null]
      ]
    }
  ]
},
      ] },
      { id: "l2", title: "Three clocks, three different answers", sections: [
{
  title: "Whose clock are we using?",
  sec: "W8O2a",
  lines: [
    ["We've established how Qasr can investigate guest arrival using observations, employee interviews and carefully examined operational records.", t("Whose clock are we using?", "Why different measurements of the same process can produce different answers.")],
    ["Now we face a new challenge, because measuring the process requires deciding exactly when our clock should run.", null],
    ["Imagine asking Qasr's reception manager how long it takes to complete a corporate guest's arrival.", q("When someone asks how long a process takes, which events should start and stop the clock?")],
    ["The manager might measure the time employees spend checking reservations, confirming details and preparing room keys.", null],
    ["But the guest experiences something broader, beginning with arrival and continuing until the room becomes accessible.", cmp("Two perspectives on process time", "Departmental perspective", "Measures activities performed within a particular function.", "Customer perspective", "Measures the complete elapsed journey experienced by the customer.")],
    ["Neither perspective is automatically dishonest, because each answers a different question about the same underlying process.", null],
    ["The crucial distinction concerns measurement boundaries, meaning the events chosen to start and stop the clock.", st("Measurement boundaries define exactly when a process measurement begins and ends.")],
    ["Let's consider an example from the slides before returning to Qasr's corporate arrivals.", null],
    ["One process has an elapsed duration of 21.1 days, although employees perform only 4.1 days of work.", cmp("Two clocks for one process", "21.1 days", "Total elapsed duration across the process.", "4.1 days", "Time spent performing the measured work.")],
    ["These figures aren't contradictory because the longer measurement includes intervals when work isn't actively being performed.", null],
    ["The difference is 17 days, illustrating how much process duration can exist outside the recorded active work.", fm("21.1 − 4.1 = 17.0", "days", "Elapsed duration minus active work time.")],
    ["Those remaining days may involve waiting, coordination or other intervals, depending on the activities actually observed.", null],
    ["We shouldn't automatically label every remaining hour as waste because some intervals may serve necessary operational purposes.", st("Elapsed time includes active work and intervening time; the purpose of each interval requires investigation.")],
    ["Now return to Qasr, where the original business traveller spent twenty-three minutes at reception.", null],
    ["That experience matters, but it doesn't necessarily capture everything between entering the hotel and accessing the room.", dg("The guest's wider journey", D.flow(["Enter|lobby", "Join|queue", "Complete|reception", "Await|room", "Enter|room"]), "The complete arrival journey may extend beyond activities recorded at the reception desk.")],
    ["The receptionist's working time could be shorter than the guest's waiting time without either measurement being incorrect.", null],
    ["That's because touch time measures active work, while elapsed time includes waiting between the chosen boundaries.", cmp("Touch time and elapsed time", "Touch time", "Time spent actively performing process work.", "Elapsed time", "Total duration between the defined starting and ending events.")],
    ["A guest may wait while an employee handles another request, even though nobody is actively processing that guest's arrival.", null],
    ["This distinction matters because improving employee activity speed may accomplish little when waiting dominates the customer's experience.", q("Would faster reception work necessarily improve guest arrival if the longest delay occurs elsewhere?")],
    ["We also need to distinguish internal time from delays attributable to customers or other participants.", null],
    ["An internal delay arises within the organisation, while customer-attributable waiting depends on information or action the customer must provide.", cmp("Understanding responsibility", "Internal delay", "Waiting caused by activities or dependencies within the organisation.", "Customer-attributable delay", "Waiting associated with a required customer action or response.")],
    ["These categories help explain responsibility, but they don't automatically determine which waiting periods belong in the customer journey.", null],
    ["A customer can experience the complete delay even when responsibility for individual intervals rests with different participants.", st("The process boundary defines the measured journey; responsibility explains who influences its different intervals.")],
    ["Now imagine Qasr reporting only the duration of activities controlled directly by the front-office department.", null],
    ["That figure could help manage reception productivity while excluding delays determining when guests actually receive their rooms.", iss("A departmental measure may look efficient while the complete customer journey remains slow.", "A boundary that hides waiting")],
    ["For programme evaluation, Qasr needs a baseline aligned with the improvement objective rather than departmental convenience.", null],
    ["If the objective concerns complete guest arrival, the measurement must include the relevant journey from arrival to room access.", dg("Choose the boundary deliberately", D.flow(["Guest|arrives", "Reception|activities", "Other|dependencies", "Room|available", "Guest|enters room"]), "An end-to-end boundary captures the complete journey relevant to the guest arrival improvement objective.")],
    ["The team should document its starting event, ending event and treatment of exceptional cases before comparing performance figures.", null],
    ["Otherwise, apparently impressive improvements might simply reflect a changed definition rather than a genuinely faster process.", iss("Changing measurement boundaries can create an apparent improvement without changing the customer's actual experience.", "A misleading comparison")],
    ["This is why baseline agreement requires more than collecting accurate timestamps from reliable information systems.", null],
    ["It requires a shared understanding of what those timestamps represent and which process question they answer.", st("A defensible baseline combines reliable measurements with explicit boundaries and a clear improvement purpose.")],
    ["Qasr is about to confront several apparently conflicting arrival figures, each produced using a different perspective.", null],
    ["Before deciding which figure deserves acceptance, remember to ask whose clock is running and what that clock includes.", q("Which measurement would best evaluate a programme intended to reduce the guest's complete arrival experience?")]
  ],
  review: [
    {
      title: "The parcel delivered in two hours",
      lines: [
        ["Let's explore measurement boundaries through a delivery company that proudly advertises exceptionally fast parcel processing.", t("The parcel delivery puzzle", "Why warehouse processing time differs from the customer's complete delivery experience.")],
        ["Imagine ordering a replacement laptop charger because your existing charger has stopped working before an important presentation.", null],
        ["The retailer promises prompt service, and its warehouse dashboard reports that your order was processed within two hours.", st("The warehouse measures processing time, beginning when an order enters its queue and ending when packing finishes.")],
        ["That sounds impressive, but your parcel doesn't arrive until three days after you submitted the original order.", null],
        ["You might reasonably wonder how a two-hour process produced a delivery experience lasting several days.", q("Can the warehouse's two-hour figure and the customer's three-day experience both be accurate?")],
        ["The answer depends on the starting and ending events used to define each measurement.", null],
        ["The warehouse clock begins when the order reaches processing and stops once employees finish preparing the parcel.", dg("The warehouse clock", D.flow(["Order|released", "Pick|items", "Pack|parcel", "Warehouse|complete"]), "The warehouse measurement covers only the activities inside its chosen processing boundary.")],
        ["Your clock begins when you place the order and stops when the parcel reaches your address.", null],
        ["That broader journey includes waiting before warehouse release, courier collection, transportation and final delivery.", dg("The customer's clock", D.flow(["Place|order", "Warehouse|processing", "Courier|collection", "Transport|parcel", "Receive|parcel"]), "The customer experiences the entire order-to-delivery journey, including waiting outside the warehouse.")],
        ["Neither clock is necessarily defective, because the measurements answer different questions about operational performance.", null],
        ["The warehouse figure helps managers understand internal productivity, while the customer figure reflects the complete service promise.", cmp("Different purposes", "Warehouse measure", "Supports management of internal processing activities.", "Customer measure", "Evaluates the elapsed time experienced across the complete delivery service.")],
        ["Now suppose the company introduces faster packing equipment and reduces warehouse processing time by thirty minutes.", null],
        ["That improvement may be genuine, but customers might notice little difference if courier collection remains delayed.", iss("Improving one activity does not guarantee a meaningful reduction in the complete customer journey.", "Local improvement, limited benefit")],
        ["This illustrates why the measurement boundary must match the objective the improvement programme intends to achieve.", null],
        ["If the promise concerns delivery speed, the baseline should measure the customer's complete order-to-delivery experience.", st("A programme baseline must cover the process outcome being improved, not merely the activities easiest to measure.")],
        ["The company should also identify waiting caused internally and delays requiring action from customers or delivery partners.", null],
        ["Those distinctions help assign responsibility without removing experienced waiting from the end-to-end measurement.", q("Would excluding courier delays make the customer's delivery experience any shorter or more satisfactory?")],
        ["Finally, the company must preserve the same measurement boundaries when evaluating results after implementing changes.", null],
        ["Otherwise, comparing different clocks could create the appearance of improvement without demonstrating a genuinely faster delivery.", st("Meaningful before-and-after comparisons require consistent starting events, ending events and measurement definitions.")],
        ["The lesson is that both clocks provide useful information, but only the appropriate clock answers the programme's question.", null]
      ]
    },
    {
      title: "The university certificate completed in fifteen minutes",
      lines: [
        ["Now imagine a university investigating complaints about delays in issuing official certificates to graduating students.", t("The certificate timing puzzle", "Distinguishing administrative working time from the student's complete waiting experience.")],
        ["The student services department reports that preparing an approved certificate requires approximately fifteen minutes of employee work.", null],
        ["However, a graduating student explains that the certificate arrived several days after submitting the original request.", cmp("Two descriptions of certificate processing", "Departmental measure", "Approximately fifteen minutes of active preparation work.", "Student experience", "Several days between submitting the request and receiving the certificate.")],
        ["Both accounts could be accurate because the department and the student are measuring different portions of the process.", null],
        ["Let's follow the student's journey to understand where the additional elapsed time might arise.", dg("The complete certificate journey", D.flow(["Submit|request", "Verify|eligibility", "Approve|release", "Prepare|certificate", "Receive|certificate"]), "The student's journey includes activities and waiting beyond the time spent preparing the certificate.")],
        ["The request may wait for eligibility confirmation before anyone begins the actual certificate preparation activity.", null],
        ["It may then require an authorised approval before the completed document can be released to the student.", iss("Administrative waiting can extend the student's experience even when certificate preparation itself is efficient.", "Time outside active work")],
        ["These intervals matter because the student experiences the entire delay rather than only the employee's active work.", null],
        ["Touch time describes active work, while elapsed time covers the complete interval between defined process events.", st("Touch time measures active processing; elapsed time measures the total duration within the chosen process boundaries.")],
        ["Now suppose the department improves its certificate template and reduces preparation time from fifteen minutes to ten minutes.", null],
        ["That change saves employee effort, but the student's waiting period may remain almost unchanged.", q("Would reducing preparation time by five minutes solve a delay lasting several days?")],
        ["The answer depends on where the remaining time occurs and whether the improvement addresses those intervals.", null],
        ["This is why managers must separate the purpose of a departmental productivity measure from a customer experience measure.", cmp("Different management questions", "Employee productivity", "How much active work is required to prepare a certificate?", "Student experience", "How long does the complete request-to-receipt journey take?")],
        ["The university should also investigate whether some waiting depends on students providing missing information.", null],
        ["Customer-attributable waiting may require a student response, while internal waiting arises from university activities or dependencies.", st("Classifying waiting helps explain responsibility without automatically removing those intervals from the complete journey.")],
        ["For example, a student might delay submitting a required document, extending the time before eligibility can be confirmed.", null],
        ["That interval deserves separate identification because the university cannot control every aspect of the student's response.", dg("Explaining the complete delay", D.flow(["Request|submitted", "!Missing|information", "Student|responds", "University|approves", "Certificate|received"]), "The complete elapsed journey can contain waiting associated with both customer actions and organisational activities.")],
        ["However, the student's experience still includes the delay, even when responsibility for individual intervals differs.", null],
        ["If the improvement objective concerns certificate delivery, the baseline should reflect the complete relevant service journey.", q("Which clock should the university use when evaluating whether students receive their certificates more quickly?")],
        ["The university must also retain consistent measurement boundaries when comparing performance before and after any changes.", null],
        ["Otherwise, excluding previously counted waiting could make results appear better without improving the actual service.", st("A credible baseline uses explicit boundaries that remain consistent when evaluating subsequent improvements.")],
        ["Remember that different clocks can answer legitimate questions without providing interchangeable measures of process performance.", null],
        ["The important decision is choosing the clock that matches the improvement objective and explaining exactly what it includes.", null]
      ]
    }
  ]
},
{
  title: "When the story and the data disagree",
  sec: "W8O2b",
  lines: [
    ["We've learned that different clocks can produce different measurements of the same process without either measurement being wrong.", t("When the story and the data disagree", "Why one memorable experience and a measured performance pattern tell different stories.")],
    ["Now let's examine another difficulty, because Qasr's improvement programme began with one particularly memorable guest experience.", null],
    ["Remember the exhausted business traveller who spent twenty-three minutes at reception and received a room that wasn't ready.", iss("The original guest spent 23 minutes at reception and received a room that was not ready.", "The experience that started the investigation")],
    ["Her experience was real, frustrating and important enough to make Qasr's managers question their existing arrival process.", null],
    ["But can one guest's experience tell us how the entire arrival process normally performs across fourteen properties?", q("Can one memorable experience establish the typical performance of an entire process?")],
    ["The answer is no, because a single observation cannot establish how frequently similar experiences occur.", null],
    ["In research terms, her experience is an individual case rather than a representative measure of overall performance.", cmp("Two kinds of evidence", "Individual case", "Shows what happened during one particular experience.", "Process measurement", "Examines performance across a defined selection of cases.")],
    ["That distinction doesn't make her complaint unimportant, because individual experiences can reveal problems worth investigating systematically.", null],
    ["Her story gives the investigation direction, while broader evidence helps establish how widespread the underlying problems are.", st("A compelling individual experience can identify a problem without establishing its frequency or typical severity.")],
    ["Imagine a manager remembering three exceptionally difficult arrivals during a particularly busy evening at Qasr Marina.", null],
    ["Those experiences might dominate the manager's memory, even if many other arrivals followed a different pattern.", dg("Different experiences within one process", D.flow(["Arrival|sample", "Routine|cases", "!Difficult|cases", "Compare|patterns"]), "Individual arrivals may follow different paths, so one memorable case cannot represent every guest.")],
    ["This happens because unusual events often attract more attention than routine experiences that leave little lasting impression.", null],
    ["The solution isn't to ignore personal accounts, but to investigate how those accounts relate to wider evidence.", q("What additional information would help determine whether a difficult arrival reflects a recurring process problem?")],
    ["Qasr needs a sample, meaning a selection of arrivals examined to understand performance across the wider process.", null],
    ["The sample should capture meaningful variation rather than concentrating exclusively on convenient or unusually troublesome cases.", st("Sampling helps investigators understand recurring performance patterns instead of generalising from one memorable observation.")],
    ["For example, arrival conditions may differ between quiet periods, busy periods and cases requiring additional corporate approvals.", null],
    ["Examining those variations helps the team understand whether particular delays occur routinely or under specific circumstances.", dg("Investigating different arrival conditions", D.flow(["Select|arrivals", "Observe|conditions", "Record|durations", "Identify|exceptions", "Compare|results"]), "A useful investigation considers different operating conditions and records the performance of selected cases.")],
    ["Now consider a performance report presenting the average duration across a properly defined sample of guest arrivals.", null],
    ["An average summarises observed durations, but it doesn't mean every guest experienced exactly that amount of time.", cmp("An individual observation and an average", "Individual duration", "The elapsed time experienced by one particular guest.", "Sample average", "A summary calculated from the durations of multiple observed arrivals.")],
    ["Some arrivals may be faster than the average, while others may take considerably longer.", null],
    ["That's why the team should examine the distribution, meaning how individual durations vary across the observed cases.", st("A distribution reveals variation that a single average cannot show, including unusually long or short experiences.")],
    ["A long delay might indicate an exceptional problem, while repeated long delays could reveal a systematic process weakness.", null],
    ["The distinction matters because Qasr needs improvements addressing recurring causes rather than reacting to every unusual incident.", q("Would you recommend the same intervention for one rare exception and a delay affecting many arrivals?")],
    ["But there is another danger when managers use averages to dismiss complaints about genuinely difficult individual experiences.", null],
    ["A reasonable average cannot erase the inconvenience experienced by guests whose arrivals take substantially longer.", iss("A satisfactory average can conceal difficult experiences among guests following exceptional or delayed process paths.", "The danger of averages")],
    ["The team should therefore examine both the overall pattern and the particular cases that reveal important exceptions.", null],
    ["Each provides a different contribution: systematic measurement establishes prevalence, while individual cases help explain mechanisms.", cmp("Complementary evidence", "Measured pattern", "Shows how frequently and extensively a performance problem occurs.", "Detailed case", "Helps explain what happened and why a particular delay developed.")],
    ["Remember that these conclusions also depend on using consistent measurement boundaries across the sampled arrivals.", null],
    ["Comparing reception time for one guest with complete arrival time for another would confuse different process definitions.", st("Meaningful comparisons require consistent boundaries, clearly defined cases and transparent measurement methods.")],
    ["Qasr must preserve the original traveller's experience while establishing a defensible baseline from broader operational evidence.", null],
    ["The story explains why the investigation matters, while the data establishes what performance the programme must improve.", dg("From experience to evidence", D.flow(["Guest|experience", "Investigate|cases", "Measure|patterns", "Explain|variation", "Establish|baseline"]), "A memorable experience motivates investigation, while systematic evidence supports a defensible process baseline.")],
    ["In our next section, we'll examine the conflicting figures Qasr's investigators have collected and decide what each means.", null],
    ["Before that decision, remember that neither a memorable complaint nor a reassuring average tells the complete story alone.", q("How would you explain the value of both individual guest experiences and systematic performance measurements?")]
  ],
  review: [
    {
      title: "The university examination that everyone remembered",
      lines: [
        ["Let's explore individual experiences and measured patterns through a university investigating complaints about examination result delays.", t("The examination results puzzle", "Why a memorable student experience cannot establish the performance of an entire service.")],
        ["Imagine a student waiting three weeks for an examination result needed to complete an important scholarship application.", null],
        ["The student describes the experience publicly, and classmates begin discussing whether the university's results process is unreliable.", iss("One student experiences a three-week delay and raises concerns about the university's examination results service.", "A memorable complaint")],
        ["The complaint deserves attention because delayed results can have serious consequences for students facing external deadlines.", null],
        ["However, the student's experience alone cannot establish how long the university normally takes to publish examination results.", q("What would you need to know before concluding that most students experience the same delay?")],
        ["The university should examine a defined selection of examination results rather than generalising from the original complaint.", null],
        ["Investigators could record the elapsed time between completed marking and the official release of each selected result.", dg("Measuring result publication", D.flow(["Marking|completed", "Results|verified", "Approval|obtained", "Results|released"]), "A consistent boundary allows investigators to compare the elapsed duration of different examination results.")],
        ["Using consistent starting and ending events matters because different measurement definitions could produce misleading comparisons.", null],
        ["The investigators should also include different courses and circumstances that might affect how results are processed.", st("A suitable sample captures meaningful variation instead of concentrating only on convenient or unusually delayed cases.")],
        ["Now imagine the university calculating an average publication time across the selected examination results.", null],
        ["That average summarises the sample, but it doesn't describe every student's individual experience.", cmp("Different kinds of evidence", "Student complaint", "Describes one student's actual delay and its consequences.", "Sample average", "Summarises measured durations across the selected examination results.")],
        ["Some results may appear quickly, while others require additional verification or approval before release.", null],
        ["The distribution reveals this variation by showing how individual durations differ across the observed cases.", st("A distribution shows the spread of measured durations, including unusually long delays that an average may conceal.")],
        ["Suppose the investigation identifies repeated delays whenever examination records require clarification from another department.", null],
        ["That pattern would provide stronger evidence of a recurring process weakness than the original complaint alone.", q("Why would repeated delays associated with the same activity justify closer investigation?")],
        ["However, the university shouldn't dismiss the original student's experience simply because most results were published sooner.", null],
        ["The complaint may reveal consequences that summary statistics cannot explain, including missed opportunities and unnecessary anxiety.", iss("A reasonable average does not eliminate the harm experienced by students whose results arrive unusually late.", "The limits of averages")],
        ["The university therefore needs both measured performance patterns and detailed explanations of difficult individual cases.", null],
        ["Together, they reveal how frequently delays occur and why particular students experience them.", dg("Combining complementary evidence", D.flow(["Student|experience", "Sample|results", "Measure|variation", "Investigate|causes", "Agree|baseline"]), "Individual experiences identify concerns, while systematic measurement establishes their prevalence and supports a baseline.")],
        ["The lesson is that a powerful complaint should motivate investigation without automatically becoming the measure of normal performance.", null],
        ["A defensible baseline requires consistent boundaries, suitable sampling and attention to the variation behind the average.", null]
      ]
    },
    {
      title: "The factory breakdown that changed everyone's memory",
      lines: [
        ["Imagine a manufacturing company where an unexpected equipment breakdown delays an important customer order for several days.", t("The factory breakdown puzzle", "Distinguishing an exceptional incident from the recurring performance of a production process.")],
        ["The customer complains strongly, and the production manager remembers the incident as evidence that manufacturing has become unreliable.", null],
        ["Employees also discuss the breakdown frequently because it disrupted schedules and required considerable effort to resolve.", iss("A major equipment breakdown creates a memorable delay and raises concerns about overall production reliability.", "An exceptional event")],
        ["The incident matters because it exposed a vulnerability that could affect future orders under similar conditions.", null],
        ["But the company cannot conclude that every production order experiences comparable delays simply because this incident was serious.", q("How could the company determine whether the breakdown reflects a recurring problem or an unusual exception?")],
        ["Investigators should examine production records across a suitable selection of completed orders and operating conditions.", null],
        ["For each selected order, they need consistent boundaries defining when production begins and when the order is completed.", dg("A consistent production boundary", D.flow(["Production|starts", "Components|processed", "Assembly|completed", "Quality|checked", "Order|finished"]), "Using the same starting and ending events allows meaningful comparisons between production orders.")],
        ["The resulting durations can reveal whether most orders finish within a similar period or vary considerably.", null],
        ["That variation is called a distribution, and it provides information that a single average cannot capture.", st("A distribution shows how measured performance varies across cases rather than reducing every experience to one number.")],
        ["Now imagine the company discovering that most orders finish routinely, while a smaller group experiences substantial delays.", null],
        ["Investigators should examine those delayed orders to identify whether they share common activities or dependencies.", cmp("Two analytical questions", "Overall pattern", "How frequently do production orders experience significant delays?", "Detailed investigation", "What circumstances explain the delays experienced by particular orders?")],
        ["Perhaps several delays involve the same equipment, suggesting a recurring weakness rather than unrelated exceptional incidents.", null],
        ["Alternatively, the original breakdown might remain unusual without representing the typical performance of the wider production process.", q("Would the same improvement decision be justified under both explanations?")],
        ["The distinction matters because recurring failures may require structural changes, while isolated incidents demand proportionate responses.", null],
        ["However, a rare incident can still deserve attention when its consequences are sufficiently serious.", st("Frequency helps establish how common a problem is, while consequences help determine how important it may be.")],
        ["A production manager should therefore avoid using a reassuring average to dismiss unusually damaging customer experiences.", null],
        ["Equally, the manager shouldn't treat the most dramatic breakdown as proof that every production order performs badly.", iss("Both a dramatic incident and a reassuring average can mislead when considered without the wider evidence.", "Two incomplete stories")],
        ["The investigation should preserve the incident's lessons while measuring the process through consistently defined observations.", null],
        ["That combination allows managers to distinguish typical performance, recurring exceptions and unusually severe events.", dg("From incident to understanding", D.flow(["Breakdown|reported", "Examine|orders", "Measure|variation", "Investigate|exceptions", "Establish|baseline"]), "Systematic evidence places a memorable breakdown within the wider pattern of production performance.")],
        ["The resulting baseline becomes more defensible because it reflects measured performance rather than the strongest recent memory.", null],
        ["Remember that good process analysis respects individual experiences while refusing to generalise beyond what the evidence supports.", null]
      ]
    }
  ]
},
{
  title: "Twenty-three minutes or eighty-two?",
  sec: "W8O2c",
  lines: [
    ["We've learned that one memorable guest experience cannot establish how Qasr's entire arrival process normally performs.", t("Twenty-three minutes or eighty-two?", "Qasr Hospitality Group: three measurements, one guest arrival process.")],
    ["Now the investigation reaches a difficult decision, because Qasr has three apparently conflicting measurements of guest arrival.", null],
    ["Each figure comes from a different perspective, and the programme must determine which one should become its baseline.", q("How can three different measurements describe the same process without necessarily contradicting one another?")],
    ["Let's return to the original business traveller whose frustrating experience helped launch Qasr's improvement programme.", null],
    ["She spent twenty-three minutes at reception, from joining the queue until leaving the desk.", st("23 minutes: the original guest's observed reception experience, measured from joining the queue to leaving the desk.")],
    ["Her experience was genuine, but it represents one particular arrival rather than the performance of every property.", null],
    ["Meanwhile, Qasr's property management system reports an average processing duration of just 12.4 minutes.", cmp("Two different clocks", "23 minutes", "One guest's observed reception experience.", "12.4 minutes", "The property system's reported processing duration.")],
    ["The system starts measuring when an employee opens the booking record and stops when the room key is encoded.", null],
    ["That boundary excludes activities occurring before the booking opens and after the key has been prepared.", dg("The property system's boundary", D.flow(["Guest|arrives", "Booking|opened", "Key|encoded", "Guest|enters room"]), "The 12.4-minute system measure covers booking-record opening through key encoding, not the complete guest journey.")],
    ["The system's figure may be accurate within its boundaries, but those boundaries answer a narrow departmental question.", null],
    ["Now consider the programme team's broader investigation, conducted across Qasr's fourteen hotels and resorts.", st("The programme investigated 310 corporate arrivals across Qasr's fourteen properties over six weeks.")],
    ["For these 310 corporate arrivals, investigators measured from entering the lobby until entering a released room.", null],
    ["Their resulting mean was 82.0 minutes, substantially longer than either the system figure or the original observation.", cmp("The programme's end-to-end measure", "82.0 minutes", "Mean elapsed time across 310 corporate arrivals.", "Complete boundary", "From entering the lobby to entering a released room.")],
    ["A mean is the arithmetic average, calculated by dividing the total measured duration by the number of cases.", null],
    ["It summarises the sampled arrivals, but it doesn't mean every guest waited exactly eighty-two minutes.", st("82.0 minutes is the sample mean for the defined end-to-end arrival process, not every guest's individual duration.")],
    ["So the apparent disagreement becomes understandable once we identify what each measurement includes and excludes.", null],
    ["The figures describe different boundaries and populations, making direct comparison misleading without those important qualifications.", dg("Three measurements, three definitions", D.flow(["System|12.4 min", "Original guest|23 min", "Programme|82.0 min"]), "The figures differ in measurement boundaries and, for the original guest, the number of observed cases.")],
    ["But Qasr's investigation reveals something more important than the numerical differences themselves.", null],
    ["A corporate-rate approval wait lasting 47 minutes affects 61 percent of the sampled corporate arrivals.", iss("A 47-minute corporate-rate approval wait affects 61% of the 310 sampled arrivals.", "A recurring process dependency")],
    ["That finding suggests a consequential dependency extending beyond the activities measured by the property management system.", null],
    ["It also demonstrates why investigating handoffs matters when customers experience delays spanning multiple organisational responsibilities.", q("Would reducing reception processing time eliminate a corporate-rate approval wait occurring elsewhere in the process?")],
    ["We shouldn't assume the approval can simply disappear, because its purpose and control requirements still need investigation.", null],
    ["However, excluding that waiting from the programme baseline would conceal an important part of the guest's experience.", st("A baseline must capture the process being improved, including relevant waiting across departmental boundaries.")],
    ["Now imagine presenting the 82-minute mean to Qasr's front-office director, who immediately challenges its fairness.", null],
    ["He argues that the figure includes delays outside his department and therefore misrepresents reception's performance.", cmp("Two legitimate management questions", "Front-office performance", "How efficiently does reception complete activities within its control?", "Programme performance", "How long does the guest's complete arrival journey take?")],
    ["His concern deserves examination because departmental accountability shouldn't automatically extend to activities controlled by other teams.", null],
    ["But responsibility for individual delays is different from deciding what belongs in the end-to-end process measurement.", st("Measurement boundaries define the complete process; accountability identifies who can influence its individual activities.")],
    ["For a programme intended to improve guest arrival, the 82.0-minute measure is the defensible baseline candidate.", null],
    ["The team should validate its definitions and evidence, then secure agreement before using that baseline for evaluation.", dg("A defensible baseline decision", D.flow(["Define|boundary", "Validate|310 cases", "Explain|differences", "Agree|baseline", "Track|improvement"]), "The programme needs an agreed end-to-end baseline with documented definitions and evidence.")],
    ["The narrower measures remain useful for departmental diagnosis, but they cannot replace the complete arrival measure.", null],
    ["Otherwise, Qasr might celebrate faster reception processing while guests continue experiencing substantial delays before accessing rooms.", iss("Improving a narrow departmental metric may leave the complete customer experience largely unchanged.", "Local success, programme failure")],
    ["The central decision isn't which number sounds most attractive, but which measurement answers the programme's improvement question.", null],
    ["Qasr must preserve all three figures while distinguishing individual experience, departmental activity and end-to-end performance.", q("How would you defend the 82-minute baseline while acknowledging the front-office director's legitimate accountability concerns?")]
  ],
  review: [
    {
      title: "The hospital discharge that took all afternoon",
      lines: [
        ["Let's examine conflicting measurements through a hospital investigating complaints about how long patients wait to leave after treatment.", t("The hospital discharge puzzle", "Why departmental processing time differs from the patient's complete discharge journey.")],
        ["Imagine a patient being told at ten o'clock that the doctor has approved discharge from the hospital.", null],
        ["The patient expects to leave shortly, but doesn't reach the hospital exit until two o'clock that afternoon.", iss("The patient experiences four hours between the discharge decision and leaving the hospital.", "The patient's complete wait")],
        ["Meanwhile, the billing department reports that preparing the final account requires only eighteen minutes of active work.", null],
        ["A nurse also remembers spending approximately thirty minutes explaining medication and arranging the patient's departure.", cmp("Three perspectives", "Patient", "Four hours from discharge approval to leaving the hospital.", "Billing", "Eighteen minutes of active account preparation.")],
        ["These measurements might all be accurate because they describe different activities and different time boundaries.", null],
        ["The billing clock excludes waiting before account preparation and activities occurring after the account is completed.", dg("The complete discharge journey", D.flow(["Discharge|approved", "Account|prepared", "Medication|explained", "Transport|arranged", "Patient|leaves"]), "The patient's elapsed journey includes several activities and waiting periods beyond billing preparation.")],
        ["The nurse's estimate describes another portion of the process rather than the patient's complete elapsed experience.", null],
        ["The investigator must therefore establish exactly when each measurement begins and ends before comparing the figures.", st("Different measurements can be accurate within their boundaries without representing the same process duration.")],
        ["Now suppose the hospital wants to reduce the time patients spend waiting after their discharge decision.", null],
        ["The relevant baseline should cover the complete interval from discharge approval until the patient leaves.", q("Would the billing department's eighteen-minute figure adequately measure the hospital's discharge improvement objective?")],
        ["The answer is no, although that figure remains useful for understanding the billing activity itself.", null],
        ["Investigators should follow actual discharges and record waiting between departments alongside the activities employees perform.", dg("Investigating the complete process", D.flow(["Observe|discharges", "Measure|elapsed time", "Identify|waiting", "Explain|handoffs", "Agree|baseline"]), "A defensible baseline requires evidence covering the complete discharge journey.")],
        ["Suppose they discover that transport arrangements frequently delay patients after their medical and administrative work is complete.", null],
        ["That finding would explain why faster billing alone might not substantially improve the patient's departure experience.", iss("A delay outside billing can dominate the complete discharge journey despite efficient account preparation.", "A cross-department dependency")],
        ["The billing manager might reasonably object to being held responsible for delays controlled by the transport team.", null],
        ["However, that accountability concern doesn't justify excluding transport waiting from the hospital's end-to-end measure.", st("The complete process measure and responsibility for individual delays are related but distinct management questions.")],
        ["The hospital should therefore preserve departmental measures while establishing a separate baseline for the entire discharge process.", null],
        ["This approach allows managers to investigate specific activities without losing sight of the patient's experience.", q("How could you acknowledge departmental accountability while defending a complete discharge baseline?")],
        ["The lesson is that choosing the right measurement requires understanding the improvement objective and its process boundaries.", null],
        ["A credible baseline captures the journey being improved rather than simply adopting the most favourable available figure.", null]
      ]
    },
    {
      title: "The insurance claim with three completion times",
      lines: [
        ["Imagine an insurance company investigating why customers complain about delays in receiving payment after submitting approved claims.", t("The insurance claim puzzle", "Reconciling different process measurements without confusing accuracy, boundaries and responsibility.")],
        ["The claims department reports that reviewing a complete application requires approximately forty minutes of active employee work.", null],
        ["A customer describes waiting twelve days between submitting a claim and receiving the payment.", cmp("Two different measurements", "Claims department", "Forty minutes of active review work.", "Customer", "Twelve days from claim submission to payment receipt.")],
        ["The finance team adds another figure, reporting that payment preparation normally takes one working day after authorisation.", null],
        ["These figures sound inconsistent until we recognise that each describes a different portion of the claims process.", q("Which figure should represent the process if the improvement objective concerns how quickly customers receive payment?")],
        ["Let's follow a claim from submission through review, authorisation, payment preparation and final receipt.", null],
        ["The complete journey includes activities and waiting periods that individual departments may not record together.", dg("The complete claims journey", D.flow(["Claim|submitted", "Documents|verified", "Claim|reviewed", "Payment|authorised", "Customer|paid"]), "The end-to-end process includes several departmental activities and intervening waiting periods.")],
        ["The forty-minute measure helps assess review effort, but it excludes the wider journey experienced by the customer.", null],
        ["The finance figure describes payment preparation, while the twelve-day observation covers the customer's complete experience.", st("A measurement must be interpreted using its starting event, ending event and population of observed cases.")],
        ["However, one customer's twelve-day experience cannot establish the average performance of the entire claims process.", null],
        ["The company needs a suitable sample of claims measured consistently from submission until payment receipt.", dg("Establishing a reliable baseline", D.flow(["Define|boundary", "Select|claims", "Measure|durations", "Examine|variation", "Agree|baseline"]), "A defensible programme baseline requires consistently measured cases rather than one memorable customer experience.")],
        ["Investigators should examine different claim types because additional verification requirements may affect how long particular cases take.", null],
        ["They should also distinguish waiting caused by internal activities from delays requiring information supplied by customers.", cmp("Explaining responsibility", "Internal waiting", "Time associated with organisational activities and dependencies.", "Customer-attributable waiting", "Time associated with required information or action from the customer.")],
        ["These distinctions help explain the measured duration without automatically removing inconvenient intervals from the customer journey.", null],
        ["Suppose the investigation reveals repeated waiting between claims authorisation and finance receiving the approved payment instruction.", iss("A cross-department handoff delays payment even when each department reports efficient internal processing.", "The hidden handoff")],
        ["The claims manager may argue that finance controls this waiting and shouldn't affect the claims team's performance assessment.", null],
        ["That argument concerns departmental accountability rather than the appropriate boundary for measuring customer payment speed.", st("Responsibility for individual activities should be distinguished from ownership of the complete process outcome.")],
        ["The company can retain departmental productivity measures while adopting a separate end-to-end baseline for the improvement programme.", null],
        ["This prevents local performance reports from concealing delays that matter to customers awaiting their payments.", q("Would faster claims review demonstrate programme success if customers still waited just as long for payment?")],
        ["Finally, the company must document the measurement definitions and preserve them when evaluating subsequent process improvements.", null],
        ["Otherwise, changing the clock could produce apparent progress without any meaningful improvement in customer experience.", st("A credible baseline measures the intended outcome consistently and remains transparent about its boundaries.")],
        ["Remember that different numbers need not compete when each has a clearly defined and legitimate management purpose.", null],
        ["The programme's task is to select the measurement that genuinely reflects the process outcome it intends to improve.", null]
      ]
    }
  ]
},
      ] },
      { id: "l3", title: "Where the time disappears", sections: [
{
  title: "Waiting is not working",
  sec: "W8O1d",
  lines: [
    ["We've established why Qasr needs an end-to-end baseline rather than relying exclusively on reception's processing figures.", t("Waiting is not working", "Understanding where time disappears inside the guest arrival process.")],
    ["Now let's investigate what happens inside that elapsed time, because a long process isn't necessarily a busy process.", null],
    ["Imagine watching a corporate guest waiting quietly while employees across several departments handle different arrival requirements.", q("If nobody is actively processing this guest's arrival, why does the process clock keep running?")],
    ["The answer is that elapsed time continues whenever the guest remains inside our defined process boundaries.", null],
    ["Some of that time involves useful work, but other intervals involve waiting, repeated activities or necessary checks.", st("Elapsed time includes active work, waiting, rework and checking within the defined process boundaries.")],
    ["Let's distinguish these categories carefully, because each suggests a different explanation for poor process performance.", null],
    ["Value-adding work directly contributes to the outcome the customer needs, such as preparing a usable room assignment.", dg("Different kinds of process time", D.flow(["Value-adding|work", "!Waiting", "Rework", "Checking", "Guest|receives room"]), "The complete guest journey contains different categories of activity and elapsed time.")],
    ["Waiting occurs when the process cannot progress because information, approval, capacity or another required condition remains unavailable.", null],
    ["Rework means repeating or correcting work because an earlier activity produced an incomplete or unsuitable result.", cmp("Waiting and rework", "Waiting", "The process pauses until something required becomes available.", "Rework", "An activity must be repeated or corrected before the process can continue.")],
    ["Checking involves verifying information or conditions, sometimes protecting quality, safety or compliance rather than directly creating customer value.", null],
    ["These distinctions matter because treating every minute as identical can lead managers toward ineffective improvement decisions.", st("Different time categories have different causes, so improvement requires understanding their purpose and consequences.")],
    ["Now consider the corporate-rate approval wait identified during Qasr's investigation of 310 corporate arrivals.", null],
    ["The evidence identifies a 47-minute approval wait affecting 61 percent of those sampled arrivals.", iss("A 47-minute corporate-rate approval wait affects 61% of the 310 sampled corporate arrivals.", "A consequential waiting dependency")],
    ["That finding directs attention toward a dependency between activities rather than simply assuming reception employees work too slowly.", null],
    ["A receptionist might complete the available work promptly while the arrival remains delayed pending an authorised decision.", dg("Work completed, process still waiting", D.flow(["Check|reservation", "!Await rate|approval", "Confirm|details", "Continue|arrival"]), "An approval dependency can extend elapsed time even when the preceding activity has been completed.")],
    ["This is why handoffs deserve attention, because work can accumulate between departments without anyone actively processing it.", null],
    ["A queue forms when cases wait for a resource or decision that cannot immediately accommodate them.", st("A queue is accumulated work awaiting processing, often at a departmental handoff or constrained activity.")],
    ["The longer that queue persists, the greater its potential contribution to the customer's complete elapsed experience.", null],
    ["However, we must investigate the queue's actual causes before assuming additional employees would solve the problem.", q("Would adding reception staff eliminate waiting caused by a corporate-rate approval dependency?")],
    ["The slides also illustrate how process time can be decomposed to reveal opportunities hidden inside an overall duration.", null],
    ["Their illustrative before-redesign process contains 14 minutes of value-adding work and 47 minutes of waiting.", cmp("Illustrative time decomposition", "14 minutes", "Value-adding work before redesign.", "47 minutes", "Waiting before redesign.")],
    ["It also includes 12 minutes of rework and 9 minutes of checking, producing 82 minutes altogether.", null],
    ["The illustration shows a possible redesigned total of 22 minutes, but this is not an achieved Qasr result.", cmp("Illustrative before and after", "82 minutes", "Before redesign: 14 work, 47 waiting, 12 rework, 9 checking.", "22 minutes", "After redesign: 12 work, 6 waiting, 0 rework, 4 checking.")],
    ["Notice that most of the illustrated reduction comes from waiting and rework rather than faster value-adding activity.", null],
    ["That matters because improving flow can deliver greater benefits than asking employees to perform essential work faster.", st("Reducing unnecessary waiting and rework may improve elapsed performance more than accelerating value-adding activities.")],
    ["Remember that the illustration's 14-minute value-adding category must not be confused with Qasr's separate observed evidence.", null],
    ["The Qasr exhibit reports 8.1 minutes of value-adding activity within its measured 82-minute arrival process.", cmp("Keep the evidence distinct", "Illustrative decomposition", "Uses 14 minutes of value-adding work within an 82-minute before-redesign example.", "Qasr observed evidence", "Reports 8.1 minutes of value-adding activity within the measured 82-minute arrival process.")],
    ["These figures belong to different analytical presentations, so combining their categories would misrepresent the source material.", null],
    ["For Qasr, the immediate task is understanding where observed time goes before selecting or claiming improvements.", dg("Investigate before redesign", D.flow(["Measure|elapsed time", "Classify|activities", "Locate|waiting", "Investigate|causes", "Inform|Innovate"]), "Understand identifies where time is spent and why before the programme designs a future process.")],
    ["We should also resist removing checks automatically, because some controls prevent errors that would otherwise create greater problems.", null],
    ["The responsible question is whether each activity serves a necessary purpose and whether its current arrangement creates avoidable delay.", q("How would you distinguish necessary checking from waiting or rework that could potentially be reduced?")],
    ["Qasr now has a clearer way to examine elapsed time without confusing employee effort with the guest's complete experience.", null],
    ["Our next challenge is investigating why these activities exist and identifying the underlying causes of poor performance.", st("Understand explains the current process and its time consumption; Innovate later develops and evaluates possible redesigns.")]
  ],
  review: [
    {
      title: "The repair workshop where nothing moved",
      lines: [
        ["Let's explore waiting and active work through an electronics repair workshop handling customers' damaged laptop computers.", t("The repair workshop puzzle", "Why a repair can take several days even when the technical work is brief.")],
        ["Imagine leaving your laptop at the workshop because its charging connection has stopped working reliably.", null],
        ["The technician explains that replacing the damaged component requires approximately forty minutes of actual repair work.", st("Touch time measures the period spent actively performing the repair, not the customer's complete waiting experience.")],
        ["However, the workshop returns your laptop four days later, leaving you wondering where the remaining time disappeared.", null],
        ["The difference becomes understandable when we follow the repair through its complete sequence of activities.", dg("The complete repair journey", D.flow(["Laptop|received", "!Await|diagnosis", "Inspect|device", "!Await|component", "Repair|completed", "Laptop|collected"]), "The customer's elapsed experience includes waiting between activities, not merely the technician's repair time.")],
        ["The laptop may wait for diagnosis because technicians already have other devices requiring attention.", null],
        ["After inspection, the workshop might discover that the required replacement component isn't currently available.", iss("The repair cannot continue until the required component becomes available, even though no technician is actively repairing it.", "A waiting dependency")],
        ["This delay is waiting rather than touch time because the device remains inactive while an external condition is unresolved.", null],
        ["Now imagine the technician installing a replacement component that fails the workshop's functional test.", q("Would correcting the unsuccessful installation count as waiting, checking or rework?")],
        ["The technician must repeat part of the repair, making that additional activity rework rather than normal value-adding work.", null],
        ["The functional test itself is checking, because it verifies that the repaired laptop operates safely and correctly.", cmp("Different kinds of time", "Rework", "Correcting or repeating work that failed to produce an acceptable result.", "Checking", "Verifying that the repaired device meets the required conditions.")],
        ["The test may be necessary even though it doesn't directly replace the damaged component.", null],
        ["Removing that test simply to reduce reported processing time could expose customers to unreliable repairs.", st("A necessary quality check should not automatically be treated as waste merely because it consumes time.")],
        ["The workshop should therefore investigate the causes of waiting and repeated work before choosing an improvement.", null],
        ["Perhaps component availability creates the longest delay, while the actual repair activity already operates efficiently.", dg("Finding the real opportunity", D.flow(["Measure|elapsed time", "Separate|activities", "Locate|waiting", "Explain|rework", "Investigate|causes"]), "A time decomposition reveals where the repair journey consumes time and which causes deserve investigation.")],
        ["Adding more technicians might accomplish little if every repair still waits for the same unavailable components.", null],
        ["The improvement question must therefore concern the complete process rather than one employee's apparent working speed.", q("Which evidence would help determine whether staffing or component availability causes the greater delay?")],
        ["A credible investigation records how much time each category consumes and why those intervals occur.", null],
        ["That evidence supports later redesign without pretending that the workshop has already solved its problems.", st("Understand identifies where elapsed time goes; later improvement work determines how the process should change.")],
        ["Remember that waiting, rework and checking have different meanings, even when all extend the customer's experience.", null],
        ["Separating them helps managers improve flow without sacrificing the activities needed to deliver reliable service.", null]
      ]
    },
    {
      title: "The publishing approval that took a week",
      lines: [
        ["Now imagine a publishing company preparing a short promotional article for release on its corporate website.", t("The publishing approval puzzle", "How queues, rework and necessary controls influence the time required to publish content.")],
        ["The writer completes the article quickly, and the editor needs relatively little time to review its language.", null],
        ["Yet the finished article remains unpublished for an entire week after the original draft was submitted.", iss("The article remains unpublished despite requiring relatively little active writing and editing time.", "A slow process with limited active work")],
        ["To understand the delay, we need to examine the activities and waiting periods across the publication journey.", null],
        ["The article passes through editorial review, brand approval and a final check before publication.", dg("The publication journey", D.flow(["Draft|article", "Editorial|review", "!Await brand|approval", "Final|check", "Publish|article"]), "The publication process includes active work and waiting between approval activities.")],
        ["Imagine the brand manager receiving many approval requests and reviewing them only when other commitments permit.", null],
        ["Completed articles accumulate in a queue, meaning they wait for a resource that cannot process them immediately.", st("A queue consists of work awaiting attention, often because a required resource or decision is unavailable.")],
        ["The writer may be completely available during this period, but that availability doesn't make the approval happen sooner.", null],
        ["This distinction matters because adding more writers wouldn't necessarily reduce the publication delay.", q("Would increasing writing capacity solve a queue caused by limited approval availability?")],
        ["Now suppose the brand manager rejects the article because its terminology conflicts with the organisation's communication guidelines.", null],
        ["The writer revises the text and returns it for another review, creating an additional cycle of work.", dg("An additional revision cycle", D.flow(["Draft|submitted", "Brand|review", "!Revision|required", "Text|corrected", "Review|repeated"]), "An unsuccessful review can generate rework and another approval cycle.")],
        ["That correction is rework because previously completed content must be changed before the process can continue.", null],
        ["However, the brand review itself may be a necessary control protecting accuracy and organisational consistency.", cmp("Different purposes", "Rework", "Correcting content that did not satisfy the required conditions.", "Necessary checking", "Verifying that published material meets established quality or brand requirements.")],
        ["We shouldn't automatically remove approval simply because the process takes too long.", null],
        ["The investigation should establish whether waiting results from approval capacity, unclear standards or repeated submission errors.", st("Understand investigates the causes of delay before deciding whether an activity should be changed or retained.")],
        ["Suppose the writer repeatedly receives corrections that could have been explained before drafting began.", null],
        ["That pattern might indicate an information problem rather than a need to eliminate the final review.", iss("Repeated corrections may reveal unclear requirements rather than unnecessary quality control.", "A possible root cause")],
        ["The company should measure elapsed time and separate active work from waiting, checking and repeated activities.", null],
        ["This decomposition reveals which intervals dominate the process without assuming every non-writing activity is wasteful.", dg("Understanding publication time", D.flow(["Measure|duration", "Identify|waiting", "Record|rework", "Assess|checks", "Explain|causes"]), "Classifying elapsed time helps distinguish delays from necessary activities and repeated work.")],
        ["A later redesign might improve approval availability or clarify requirements, but those decisions require supporting evidence.", null],
        ["The immediate objective is an accurate account of how the publication process currently operates.", q("What would you investigate before recommending that the company remove its brand approval activity?")],
        ["Remember that a process can remain slow even when employees complete their individual activities efficiently.", null],
        ["Understanding where work waits provides a stronger foundation for improvement than simply demanding faster employee performance.", st("Process improvement depends on understanding flow across activities, not merely accelerating isolated tasks.")],
        ["That is why waiting deserves investigation as carefully as the work itself.", null]
      ]
    }
  ]
},
{
  title: "Symptoms, causes and necessary controls",
  sec: "W8O1e",
  lines: [
    ["We've seen that Qasr's arrival process contains waiting, rework and checking alongside activities that directly serve guests.", t("Symptoms, causes and necessary controls", "Understanding why process problems occur before deciding what should change.")],
    ["Now we need to investigate why those activities exist, because identifying a delay doesn't explain what causes it.", null],
    ["Remember the corporate-rate approval wait affecting sixty-one percent of Qasr's sampled corporate arrivals.", iss("A 47-minute corporate-rate approval wait affects 61% of the 310 sampled arrivals.", "A visible performance problem")],
    ["That waiting is a symptom, meaning an observable indication that something within the process deserves investigation.", null],
    ["But what actually causes the delay, and why does the approval activity exist in its present form?", q("Does observing a long approval wait prove that the approval itself is unnecessary?")],
    ["The answer is no, because approval may protect contractual terms or prevent incorrect charges to corporate customers.", null],
    ["Removing it without understanding its purpose could exchange a visible delay for a more serious operational problem.", st("A process symptom identifies where something goes wrong; root cause analysis investigates why it happens.")],
    ["Let's distinguish the activities that create customer value from those that support or protect the process.", null],
    ["Value-adding activities directly contribute to the outcome the guest needs, such as obtaining access to a suitable room.", cmp("Different activity purposes", "Value-adding activity", "Directly contributes to the outcome the customer needs.", "Enabling activity", "Supports the process by providing necessary information or resources.")],
    ["Enabling activities make that outcome possible, even when guests don't experience them as direct benefits.", null],
    ["Checking activities verify conditions or requirements, sometimes preventing errors that would otherwise create additional rework.", st("Checking can protect accuracy, quality or compliance without directly creating the customer's desired outcome.")],
    ["These distinctions matter because an activity's purpose cannot be judged solely by whether it consumes time.", null],
    ["A corporate-rate check might be essential, while the way information reaches the approver could create avoidable waiting.", dg("Separate the control from its delay", D.flow(["Corporate|rate requested", "!Await|approval", "Rate|verified", "Arrival|continues"]), "The investigation must distinguish the purpose of rate verification from the waiting associated with obtaining approval.")],
    ["Now imagine Qasr's team asking why employees must request approval during particular corporate arrivals.", null],
    ["One explanation might involve missing information, while another might concern authority to confirm contractual rates.", q("What evidence would help distinguish a necessary approval from a poorly organised approval process?")],
    ["The investigators should examine actual cases and interview the people responsible for making and requesting decisions.", null],
    ["They must avoid presenting these possible explanations as established causes until the evidence supports them.", st("A plausible explanation is a hypothesis until observations, records and participant accounts provide supporting evidence.")],
    ["Root cause analysis means investigating underlying conditions that repeatedly produce the symptoms observed during process execution.", null],
    ["A useful technique is asking why a problem occurs, then examining the explanation for deeper dependencies.", dg("Investigating beneath the symptom", D.flow(["Observed|delay", "Immediate|explanation", "Underlying|dependency", "Evidence|checked"]), "Root cause analysis moves beyond the visible symptom while testing each explanation against evidence.")],
    ["The objective isn't to keep asking questions indefinitely, but to identify causes that evidence can reasonably support.", null],
    ["Several symptoms may also share one underlying cause, making clusters of related problems especially important.", st("A cluster of recurring symptoms may indicate a shared underlying process weakness rather than separate isolated failures.")],
    ["For example, repeated clarification requests and inconsistent rate information might arise from the same unresolved information dependency.", null],
    ["Investigating that relationship could reveal a more useful improvement opportunity than treating every interruption separately.", q("Why might solving one shared information problem be more effective than addressing several symptoms independently?")],
    ["However, some checks exist because earlier failures exposed risks that the organisation could not responsibly ignore.", null],
    ["Removing those controls merely to shorten processing time might recreate the very errors they were designed to prevent.", iss("A control introduced after previous failures may remain necessary even when it increases current processing time.", "The danger of removing safeguards")],
    ["The team should therefore document each activity's purpose, observed consequences and relationship with other process problems.", null],
    ["This evidence helps distinguish necessary controls from unnecessary duplication without committing prematurely to a particular redesign.", dg("Documenting defensible findings", D.flow(["Identify|symptoms", "Investigate|causes", "Assess|controls", "Record|evidence", "Inform|Innovate"]), "Understand establishes supported findings that later guide redesign without prematurely prescribing solutions.")],
    ["Remember that Qasr remains in Understand, where the task is explaining current performance rather than implementing changes.", null],
    ["The findings will help Innovate consider alternatives while preserving controls that protect legitimate business requirements.", st("Understand explains why the process performs as observed; Innovate later evaluates how its design should change.")],
    ["The strongest investigation doesn't merely identify slow activities; it explains their purpose and the causes of their delays.", null],
    ["That distinction protects Qasr from solving visible symptoms while leaving the underlying process weaknesses untouched.", q("How would you investigate Qasr's approval delay without assuming that eliminating the approval is the right solution?")]
  ],
  review: [
    {
      title: "The medicine check that prevented a mistake",
      lines: [
        ["Let's explore symptoms and necessary controls through a community pharmacy investigating complaints about prescription collection delays.", t("The pharmacy's necessary safeguard", "Why a slow activity may protect customers from a more serious failure.")],
        ["Imagine a patient arriving to collect prescribed medicine and discovering that the pharmacist cannot release it immediately.", null],
        ["The pharmacist explains that the prescription requires clarification because its dosage instructions are inconsistent.", iss("The prescription cannot be released until the pharmacist resolves an important dosage uncertainty.", "A visible delay")],
        ["The patient understandably experiences the delay as poor service, particularly after travelling to collect the medicine.", null],
        ["But the delay itself doesn't establish that the pharmacist's additional checking is unnecessary.", q("Would removing the dosage check improve the service if it exposed patients to incorrect medication instructions?")],
        ["The check serves a protective purpose because dispensing medicine with uncertain instructions could create serious consequences.", null],
        ["It is therefore a necessary control, meaning an activity intended to prevent an unacceptable error or risk.", st("A necessary control protects an important requirement even when it consumes time or creates additional work.")],
        ["However, the pharmacy should still investigate why unclear prescriptions repeatedly reach the dispensing stage.", null],
        ["Perhaps the original instructions lack required information, or clarification requests follow an unnecessarily complicated communication route.", dg("Investigating the delay", D.flow(["Prescription|received", "Dosage|unclear", "!Await|clarification", "Instructions|confirmed", "Medicine|released"]), "The investigation distinguishes the necessary safety check from the causes of waiting for clarification.")],
        ["These possibilities are hypotheses rather than established causes until observations and records provide supporting evidence.", null],
        ["The investigator should examine actual prescriptions and ask pharmacists how they resolve unclear instructions.", st("Root cause analysis tests explanations for recurring symptoms instead of treating plausible assumptions as proven facts.")],
        ["Now imagine discovering that several delayed prescriptions contain the same missing information from a particular submission route.", null],
        ["That pattern might indicate a shared information problem rather than unrelated mistakes by individual pharmacists.", cmp("Symptom and possible cause", "Observed symptom", "Patients wait while pharmacists request dosage clarification.", "Possible underlying cause", "Required dosage information is missing from certain submitted prescriptions.")],
        ["The pharmacy should investigate that relationship before deciding which changes could reduce unnecessary waiting.", null],
        ["Simply asking pharmacists to work faster wouldn't resolve missing information that must be clarified before dispensing.", q("Why would accelerating the final check fail to address a problem originating earlier in the process?")],
        ["The investigation should also identify which checks are essential and which repeated activities arise from avoidable errors.", null],
        ["This distinction helps preserve patient safety while revealing opportunities to improve the process's overall flow.", dg("Understanding before redesign", D.flow(["Observe|delay", "Identify|control", "Investigate|cause", "Validate|evidence", "Consider|improvement"]), "The investigation protects necessary controls while identifying the underlying causes of avoidable delays.")],
        ["The pharmacist's check may remain essential even if the process for obtaining accurate instructions can eventually improve.", null],
        ["That is why a good process investigation separates the purpose of an activity from the problems surrounding it.", st("Understand identifies supported causes and necessary safeguards before later phases consider changes to the process.")],
        ["Remember that eliminating visible waiting isn't automatically beneficial when the waiting protects an important requirement.", null],
        ["The responsible objective is understanding how to preserve necessary protection while investigating avoidable sources of delay.", null]
      ]
    },
    {
      title: "The factory inspection that kept finding defects",
      lines: [
        ["Now imagine a furniture manufacturer investigating why completed dining tables frequently require additional work before shipment.", t("The factory's recurring defects", "Finding shared causes without removing controls that protect product quality.")],
        ["The production manager notices that final inspections often delay shipments and concludes that inspection is slowing the factory.", null],
        ["Employees explain that inspectors sometimes discover unstable joints or damaged surfaces requiring correction before products can leave.", iss("Final inspections reveal defects that require correction, extending the time before finished furniture can be shipped.", "A recurring symptom")],
        ["The manager proposes reducing inspection because fewer checks would make the production schedule appear faster.", null],
        ["But removing inspection wouldn't necessarily prevent defects; it might simply allow defective products to reach customers.", q("Would eliminating final inspection solve the underlying problem of unstable joints and damaged surfaces?")],
        ["The inspection is a checking activity, meaning it verifies that completed products satisfy required quality conditions.", null],
        ["Its purpose matters because detecting defective furniture protects customers and reduces the consequences of unsuitable deliveries.", st("Checking activities may protect quality even when they do not directly create the product's intended customer value.")],
        ["The investigator should instead examine why defects occur and whether different problems share underlying causes.", null],
        ["Suppose several unstable joints appear after employees use components that do not consistently meet required specifications.", dg("Tracing the problem", D.flow(["Components|received", "Furniture|assembled", "!Defect|detected", "Product|corrected", "Quality|confirmed"]), "The investigation traces defects through earlier activities rather than treating final inspection as their cause.")],
        ["That observation suggests a possible materials problem, but the investigator must verify it before drawing conclusions.", null],
        ["Records from affected production batches could help establish whether particular components are associated with recurring defects.", st("A suspected root cause becomes credible when evidence consistently connects it with the observed process problem.")],
        ["Now consider damaged surfaces appearing after finished tables move between production areas without adequate protection.", null],
        ["Those defects may have a different cause, even though both problems become visible during final inspection.", cmp("Similar symptoms, different causes", "Unstable joints", "May be associated with unsuitable components or assembly conditions.", "Damaged surfaces", "May be associated with handling or protection during movement.")],
        ["The investigator shouldn't assume that every defect shares one explanation simply because inspectors discover them together.", null],
        ["However, related defects should be examined for patterns that might reveal common weaknesses across the production process.", q("What evidence would help determine whether several defects share one underlying cause or require separate explanations?")],
        ["This is root cause analysis, meaning the systematic investigation of conditions producing recurring process symptoms.", null],
        ["The goal is to understand why problems develop rather than merely correcting their visible consequences.", st("Root cause analysis distinguishes the underlying source of a problem from the symptom observed later in the process.")],
        ["The company should also investigate why particular inspection checks were introduced and which risks they currently control.", null],
        ["Some checks may have been added after previous failures and remain important safeguards against unacceptable product quality.", iss("Removing a control without understanding its purpose may recreate earlier failures rather than improve the process.", "A dangerous shortcut")],
        ["Investigators should document the evidence, distinguish supported causes from assumptions and validate findings with production employees.", null],
        ["That approach creates a defensible foundation for later redesign without prematurely committing to particular corrective actions.", dg("Building a sound diagnosis", D.flow(["Observe|defects", "Examine|patterns", "Test|causes", "Assess|controls", "Document|findings"]), "Understand produces evidence about recurring problems and necessary controls before redesign decisions are made.")],
        ["The factory can then consider improvements that address underlying weaknesses while preserving essential quality requirements.", null],
        ["Remember that a process activity can reveal a problem without being the activity that actually caused it.", st("A reliable investigation distinguishes symptoms, root causes and necessary controls before deciding what should change.")],
        ["That distinction helps organisations improve performance without sacrificing the protections that make their outcomes dependable.", null]
      ]
    }
  ]
},
{
  title: "The baseline that future results must beat",
  sec: "W8O2d",
  lines: [
    ["We've investigated Qasr's waiting, rework and checking activities, and we've learned why their underlying causes matter.", t("The baseline that future results must beat", "Turning the Understand investigation into evidence for improvement and benefits evaluation.")],
    ["Now we need to bring those findings together, because understanding a process should produce something managers can use.", null],
    ["Imagine Qasr's programme sponsor asking what the investigation has established before the team begins designing improvements.", q("What evidence should Qasr possess before deciding how its guest arrival process ought to change?")],
    ["A collection of interviews and observations isn't enough unless the team can explain what those findings establish.", null],
    ["The Understand phase therefore produces a validated process model and an agreed quantified baseline of current performance.", st("Understand produces an evidence-based as-is model and a quantified baseline that stakeholders can examine and defend.")],
    ["The as-is model shows how work actually moves between participants, including handoffs, exceptions and undocumented activities.", null],
    ["Validation means checking that this description reflects observed practice and can withstand informed scrutiny from operational employees.", dg("A validated as-is model", D.flow(["Observe|real cases", "Model|activities", "Check|handoffs", "Validate|with staff"]), "The model should reflect actual work and be checked with the people who perform it.")],
    ["But the model alone cannot establish whether subsequent changes improve the guest's experience by a meaningful amount.", null],
    ["That requires a baseline, meaning a documented measurement of performance before the proposed improvements are implemented.", st("A baseline records current performance using explicit boundaries, defined measures and supporting evidence.")],
    ["Remember that Qasr measured 310 corporate arrivals across its fourteen properties during a six-week investigation.", null],
    ["The programme found a mean of 82.0 minutes from entering the lobby until entering a released room.", cmp("Qasr's end-to-end baseline", "82.0 minutes", "Mean elapsed arrival time across 310 corporate arrivals.", "Measurement boundary", "From entering the lobby to entering a released room.")],
    ["That figure is the appropriate programme baseline because it measures the complete journey the improvement initiative addresses.", null],
    ["The narrower 12.4-minute system measure remains useful for departmental analysis, but it answers a different question.", cmp("Two legitimate measures", "82.0 minutes", "The programme's end-to-end mean across the sampled arrivals.", "12.4 minutes", "System processing from opening the booking record to encoding the key.")],
    ["The original guest's twenty-three-minute reception experience also remains important, although it represents one individual observation.", null],
    ["Keeping these distinctions visible prevents managers from comparing measurements that use different boundaries or populations.", q("Why would comparing a later reception-processing figure directly with the 82-minute baseline be misleading?")],
    ["Now imagine Qasr introducing changes and reporting that guest arrival has become considerably faster.", null],
    ["Without the original measurement definitions, we couldn't determine whether the improvement reflects better performance or a different clock.", iss("Changing the measurement boundary can create an apparent improvement without reducing the guest's actual elapsed experience.", "A false performance gain")],
    ["The programme must therefore preserve its starting event, ending event, sampling rules and treatment of exceptional arrivals.", null],
    ["Later measurements should use comparable definitions, while explaining any changes in operating conditions or customer populations.", st("Meaningful performance comparisons require consistent definitions and attention to differences between the populations being measured.")],
    ["Understand also produces root cause analysis, which explains the conditions responsible for recurring performance problems.", null],
    ["For Qasr, the 47-minute corporate-rate approval wait affecting 61 percent of sampled arrivals deserves particular investigation.", iss("A 47-minute corporate-rate approval wait affects 61% of the 310 sampled corporate arrivals.", "An important investigation finding")],
    ["The team must document why that waiting occurs rather than assuming the approval itself should disappear.", null],
    ["This matters because an approval may protect contractual accuracy while its surrounding arrangements create avoidable delays.", dg("From observation to explanation", D.flow(["Measure|waiting", "Investigate|dependency", "Assess|control", "Document|cause"]), "Root cause analysis investigates why waiting occurs while recognising that some controls may remain necessary.")],
    ["Another Understand output records known exceptions and their volumes, helping managers distinguish recurring problems from isolated experiences.", null],
    ["Documenting how frequently exceptions occur makes later priorities more defensible than relying on memorable complaints alone.", st("An exception register records meaningful variations and their observed frequency so the programme can assess their importance.")],
    ["The investigation may also identify quick wins, meaning limited improvements that appear achievable without a major redesign.", null],
    ["However, identifying a quick win doesn't mean Qasr has already implemented it or demonstrated its benefits.", cmp("Evidence and action", "Understand", "Identifies supported findings and potential quick wins.", "Later improvement work", "Evaluates, implements and measures changes against the agreed baseline.")],
    ["These findings provide the foundation for Innovate, where the team develops alternatives for how the process should operate.", null],
    ["The baseline also supports Realize Value, where actual outcomes are compared with the benefits the programme intended.", dg("The evidence connects the phases", D.flow(["Understand|baseline", "Innovate|alternatives", "Implement|changes", "Realize|Value"]), "Understand supplies the evidence needed to design improvements and later evaluate realised benefits.")],
    ["Remember that an attractive redesign proposal isn't evidence of improvement until comparable performance measurements demonstrate its effects.", null],
    ["Qasr's investigation therefore protects the programme from celebrating activity changes that deliver little meaningful customer benefit.", st("A defensible baseline makes improvement claims testable rather than dependent on enthusiasm or managerial opinion.")],
    ["We now have the essential outputs of Understand, but agreement becomes difficult when the findings challenge departmental performance claims.", null],
    ["Our next lesson examines why making current performance visible can provoke resistance even when the measurements are defensible.", q("How would you explain the value of Qasr's baseline to a manager who prefers the narrower departmental figure?")]
  ],
  review: [
    {
      title: "The university service that claimed success",
      lines: [
        ["Let's explore the importance of a baseline through a university trying to improve its postgraduate application process.", t("The university's missing baseline", "Why improvement claims require a measured and consistently defined starting point.")],
        ["Imagine university managers receiving complaints because applicants wait too long for decisions about their postgraduate applications.", null],
        ["The admissions department introduces a new workflow and proudly announces that applications are now processed much faster.", iss("The university claims improved admissions performance after introducing a new workflow, but its original measurement is unclear.", "An unsupported improvement claim")],
        ["That announcement sounds encouraging, but we need to understand exactly what the department measured before accepting it.", null],
        ["Suppose the reported processing time begins when an application reaches academic review and ends when the reviewer responds.", q("Would that measurement describe the complete experience of an applicant waiting for an admission decision?")],
        ["The answer is no, because applicants may also wait for document verification and final administrative approval.", null],
        ["A suitable end-to-end boundary would begin when the complete application is received and end when the decision is communicated.", dg("Defining the admissions journey", D.flow(["Complete|application", "Documents|verified", "Academic|review", "Decision|approved", "Applicant|notified"]), "The complete admissions measure should reflect the process outcome the improvement initiative intends to change.")],
        ["The university needs to measure that journey before introducing changes so later results have a meaningful reference point.", null],
        ["That original measurement is the baseline, which records performance under clearly documented conditions and definitions.", st("A baseline establishes the starting performance against which subsequent process changes can be evaluated.")],
        ["Now imagine discovering that the department recorded only reviewer working time before introducing the new workflow.", null],
        ["After implementation, managers begin reporting the elapsed time from application receipt until the final decision.", cmp("Incompatible measurements", "Original measure", "Active academic review time only.", "New measure", "Complete elapsed time from application receipt to decision communication.")],
        ["Comparing those figures wouldn't establish improvement because the measurements cover different portions of the process.", null],
        ["The university must preserve consistent boundaries and investigate differences between the groups of applications being compared.", st("Valid before-and-after comparisons require compatible definitions and consideration of relevant differences between observed cases.")],
        ["The investigation should also identify recurring exceptions, such as applications requiring additional document clarification.", null],
        ["Recording their frequency helps managers understand whether those exceptions contribute substantially to overall processing delays.", dg("Building the evidence", D.flow(["Validate|process model", "Measure|baseline", "Record|exceptions", "Investigate|causes", "Identify|opportunities"]), "Understand produces the evidence required before selecting and evaluating improvements.")],
        ["Suppose employees suggest clearer application instructions as a potential way to reduce repeated document requests.", null],
        ["That suggestion could become a quick win, but its benefits remain unproven until the university evaluates the change.", q("What evidence would demonstrate that clearer instructions actually reduced the applicant's complete waiting time?")],
        ["The university should therefore distinguish identifying an opportunity from implementing it and demonstrating measurable results.", null],
        ["This distinction protects the organisation from treating completed activities as proof that customers received better service.", st("Improvement becomes credible when comparable measurements demonstrate meaningful changes against the original baseline.")],
        ["The essential lesson is that a baseline connects current performance, proposed improvements and later evaluation.", null],
        ["Without that connection, even a promising redesign may produce claims that nobody can reliably verify.", null]
      ]
    },
    {
      title: "The water utility's invisible improvement",
      lines: [
        ["Now imagine a regional water utility receiving complaints about delays in repairing leaks reported by residential customers.", t("The water utility's improvement claim", "How a defensible baseline connects process evidence with later benefits.")],
        ["The utility launches an improvement initiative intended to reduce the time between receiving a report and restoring service.", null],
        ["Managers believe that introducing a new scheduling system will make field technicians respond more efficiently.", iss("The utility proposes a scheduling improvement before establishing a defensible measure of complete repair performance.", "A promising but untested solution")],
        ["However, the utility cannot demonstrate success unless it knows how the existing repair process performs.", null],
        ["Investigators therefore follow reported leaks through assessment, scheduling, technician dispatch and completed repair.", dg("The complete repair journey", D.flow(["Leak|reported", "Problem|assessed", "Repair|scheduled", "Technician|dispatched", "Service|restored"]), "The end-to-end boundary covers the customer's journey from reporting the leak until service restoration.")],
        ["The as-is model should show who performs each activity and where information or responsibility changes hands.", null],
        ["Employees must validate the model because actual repairs may involve workarounds that formal procedures overlook.", st("A validated as-is model reflects the process employees actually perform, including meaningful exceptions and handoffs.")],
        ["The utility should then establish a baseline using reliable measurements from a suitable selection of completed repairs.", null],
        ["Its definition must specify when the clock starts, when it stops and which repair cases are included.", q("Why would measuring only technician working time fail to capture the customer's complete repair experience?")],
        ["Technician working time describes one activity, while the customer's elapsed experience includes scheduling and waiting.", null],
        ["Both measures may be useful, but the programme baseline must match the outcome the initiative intends to improve.", cmp("Two different purposes", "Technician working time", "Measures active repair effort within the field operation.", "End-to-end repair time", "Measures elapsed duration from leak reporting until service restoration.")],
        ["Now suppose investigators discover that many repairs wait for approval before technicians can begin work.", null],
        ["They should examine why approval is required and whether its current arrangement creates avoidable delays.", iss("An approval dependency may extend repair time even when technicians complete their assigned work efficiently.", "A possible process constraint")],
        ["Some approvals may protect safety or financial controls, so removing them automatically would be irresponsible.", null],
        ["Root cause analysis must distinguish necessary safeguards from the conditions producing unnecessary waiting.", st("Understanding the purpose of controls prevents improvement proposals from sacrificing essential protections.")],
        ["The team should also record exceptional repairs, including cases requiring specialist equipment or additional authorisation.", null],
        ["Documenting their frequency helps explain variation and prevents unusual cases from distorting managerial interpretations.", dg("The Understand outputs", D.flow(["Validate|model", "Agree|baseline", "Investigate|causes", "Record|exceptions", "Identify|quick wins"]), "The investigation produces a defensible starting point and identifies opportunities without claiming improvements have occurred.")],
        ["A potential quick win might involve improving how repair information reaches the scheduling team.", null],
        ["However, the utility must evaluate whether that change actually reduces elapsed repair time after implementation.", q("How could the utility demonstrate that improved scheduling delivered benefits rather than merely changing administrative procedures?")],
        ["The answer requires comparable measurements collected after the change using the original baseline definitions.", null],
        ["That comparison connects the investigation to later benefits evaluation and makes the programme's claims testable.", st("A defensible baseline allows later performance results to be evaluated against the process's original measured condition.")],
        ["Remember that identifying a promising improvement isn't the same as demonstrating that customers experienced better service.", null],
        ["Understand establishes the evidence needed to make that distinction clear when the programme reports its results.", null]
      ]
    }
  ]
},
      ] },
      { id: "l4", title: "When the numbers become personal", sections: [
{
  title: "Why measuring a process feels threatening",
  sec: "W8O3a",
  lines: [
    ["We've established Qasr's end-to-end baseline, but a defensible measurement doesn't automatically become an accepted measurement.", t("Why measuring a process feels threatening", "Understanding the human resistance that emerges when current performance becomes visible.")],
    ["Now our investigation enters a sensitive area, because performance figures can challenge how people understand their responsibilities.", null],
    ["Imagine presenting Qasr's findings to the front-office director, who has spent years managing reception operations.", q("How might an experienced manager react when a new measurement makes their department appear less efficient?")],
    ["The director knows that reception employees work hard, handle demanding guests and regularly resolve unexpected booking difficulties.", null],
    ["Yet the programme reports an average arrival duration of 82.0 minutes across 310 sampled corporate arrivals.", st("The programme measured a mean of 82.0 minutes from entering the lobby to entering a released room.")],
    ["The director immediately challenges the figure because it includes delays occurring outside the front-office department.", null],
    ["He prefers the property management system's 12.4-minute measure, which reflects a much narrower processing boundary.", cmp("Two performance perspectives", "12.4 minutes", "System processing from opening the booking record to encoding the key.", "82.0 minutes", "Mean end-to-end arrival duration across 310 corporate arrivals.")],
    ["His objection may sound defensive, but let's consider why the distinction matters to someone managing operational performance.", null],
    ["If senior leaders interpret the broader figure as reception's individual failure, the director could face unfair criticism.", iss("The director fears being judged for delays involving activities outside his department's direct control.", "A perceived accountability threat")],
    ["That concern is legitimate because measuring the complete process doesn't mean one department controls every contributing activity.", null],
    ["We must distinguish process performance from individual performance before deciding how the results should be used.", cmp("Two different questions", "Process performance", "How effectively does the complete guest arrival journey operate?", "Individual performance", "How effectively does a particular employee fulfil responsibilities within their control?")],
    ["The distinction matters because employees may interpret process investigation as an attempt to identify people deserving blame.", null],
    ["When that happens, they may become reluctant to reveal workarounds, errors or delays that investigators need to understand.", q("Why might employees conceal operational difficulties if they believe the findings will be used against them?")],
    ["This is one reason baselining becomes contentious rather than remaining a purely technical measurement exercise.", null],
    ["Baselining makes current performance visible, and visibility can affect reputations, authority and established departmental expectations.", st("Baselining can create resistance because measured performance influences how people believe their work will be judged.")],
    ["Now consider the corporate-rate approval wait affecting 61 percent of Qasr's sampled arrivals.", null],
    ["The observed wait is 47 minutes, making this dependency important to understanding the complete guest experience.", iss("A 47-minute corporate-rate approval wait affects 61% of the 310 sampled corporate arrivals.", "A cross-department performance concern")],
    ["The director may reasonably argue that reception cannot independently eliminate waiting associated with another authorised decision.", null],
    ["However, excluding that delay would conceal an important part of the journey the improvement programme intends to address.", dg("One journey, several responsibilities", D.flow(["Guest|arrives", "Reception|checks", "!Rate|approval", "Room|released", "Guest|enters room"]), "The end-to-end measure includes dependencies across departments without assigning every delay to reception.")],
    ["This creates a tension between departmental accountability and end-to-end process ownership, which concerns the complete customer outcome.", null],
    ["The programme needs someone accountable for coordinating the whole journey, even when activities remain distributed across departments.", st("End-to-end process ownership coordinates the complete outcome without assuming one department directly controls every activity.")],
    ["Resistance may also arise when managers have relied on familiar indicators that previously made their departments appear successful.", null],
    ["A broader measurement can challenge those established interpretations, even when the original departmental figures remain accurate.", q("Would you welcome a new measure if senior leaders misunderstood it as proof that your earlier reports were misleading?")],
    ["The responsible response isn't to dismiss the director's concerns as obstruction or abandon the end-to-end baseline.", null],
    ["Instead, investigators should examine whether his objections reveal genuine weaknesses in measurement definitions or accountability arrangements.", st("Resistance can reveal legitimate measurement and accountability concerns that deserve investigation rather than automatic rejection.")],
    ["The team should explain what the figures measure and distinguish departmental productivity from the guest's complete experience.", null],
    ["They should also clarify how the evidence will be used before asking employees to support the investigation.", dg("Responding to measurement concerns", D.flow(["Listen to|concerns", "Explain|boundaries", "Separate|accountability", "Validate|evidence", "Build|trust"]), "Transparent explanations and fair accountability help prevent process measurement from becoming a blame exercise.")],
    ["These actions matter because trust influences whether employees share the operational knowledge needed for an accurate as-is model.", null],
    ["If people fear punishment, the programme may receive reassuring reports while important process weaknesses remain hidden.", iss("Fear of blame can reduce openness, weakening the evidence required for effective process improvement.", "A threat to evidence quality")],
    ["Remember that the director's objection doesn't invalidate the 82-minute baseline simply because the finding feels uncomfortable.", null],
    ["Equally, a defensible baseline doesn't justify ignoring legitimate concerns about responsibility for individual delays.", cmp("Two principles to preserve", "Measurement integrity", "Keep the complete process boundary aligned with the improvement objective.", "Fair accountability", "Distinguish responsibility for individual activities from the complete process outcome.")],
    ["Qasr must therefore address both measurement credibility and the human consequences of making performance visible.", null],
    ["Our next section explores how transparent communication and employee participation can help establish an accepted baseline.", q("How would you acknowledge the director's concerns without allowing departmental boundaries to hide the guest's complete experience?")]
  ],
  review: [
    {
      title: "The school attendance report that felt unfair",
      lines: [
        ["Let's explore resistance to measurement through a school introducing a new indicator for student attendance and punctuality.", t("The school attendance puzzle", "Why a broader performance measure can feel threatening to people with limited control.")],
        ["Imagine a school principal presenting a report showing that many students arrive late during the morning registration period.", null],
        ["The principal asks classroom teachers to explain why their classes have such disappointing punctuality figures.", iss("Teachers are questioned about student lateness, although several contributing factors may lie outside their control.", "A perceived accountability problem")],
        ["Some teachers become defensive because they believe the report unfairly reflects their professional performance.", null],
        ["They explain that transport delays, family circumstances and school entrance congestion influence when students reach classrooms.", q("Does measuring student lateness establish that classroom teachers caused every late arrival?")],
        ["The answer is no, because measuring an outcome differs from identifying responsibility for its contributing causes.", null],
        ["The attendance figure may accurately describe students' experiences without establishing which participant controls each delay.", cmp("Two different questions", "Attendance performance", "How frequently do students arrive after the required time?", "Teacher accountability", "Which responsibilities can classroom teachers reasonably influence?")],
        ["The principal still needs a reliable attendance baseline because persistent lateness can disrupt learning and school operations.", null],
        ["However, treating every late arrival as an individual teacher's failure could discourage honest reporting.", st("A valid process measure should not automatically become an unfair judgement of individual performance.")],
        ["Now imagine teachers noticing that some students are marked late while waiting at a congested school entrance.", null],
        ["Their objection may reveal a genuine measurement problem rather than simple resistance to accountability.", iss("A measurement may overlook where students experience delays before reaching their classrooms.", "A concern worth investigating")],
        ["The principal should therefore investigate when lateness is recorded and whether the definition matches the intended objective.", null],
        ["Teachers and administrative staff can help explain the arrival process and identify relevant operating conditions.", dg("Investigating the concern", D.flow(["Listen to|teachers", "Review|definitions", "Observe|arrivals", "Clarify|responsibility", "Agree|evidence"]), "Employee concerns can help improve measurement accuracy and clarify responsibility for different activities.")],
        ["This participation matters because employees are more likely to trust findings when their operational knowledge receives serious consideration.", null],
        ["The principal should also explain how the results will support improvement rather than automatically trigger personal blame.", st("Transparent communication reduces uncertainty about how performance evidence will be interpreted and used.")],
        ["Suppose the investigation confirms that entrance congestion contributes substantially to late classroom arrivals.", null],
        ["The school should preserve the accurate attendance measure while recognising that entrance management requires wider coordination.", q("Would excluding entrance delays improve student punctuality, or merely make the reported figure more comfortable?")],
        ["The complete arrival outcome remains important, even when responsibility for improving it extends beyond classroom teachers.", null],
        ["The principal can retain the baseline while assigning appropriate responsibilities across the school's different functions.", cmp("Preserving both principles", "Measurement integrity", "Record the complete student arrival outcome consistently.", "Fair accountability", "Assign improvement responsibilities according to actual influence and control.")],
        ["The lesson is that resistance may contain useful evidence about how measurement affects people and responsibilities.", null],
        ["Addressing those concerns strengthens the investigation without requiring the organisation to conceal uncomfortable performance findings.", st("Trustworthy baselining combines accurate measurement with transparent definitions and fair treatment of employees.")],
        ["Remember that employees may resist a measurement because they fear its consequences, not because they reject improvement.", null]
      ]
    },
    {
      title: "The call centre agent blamed for a slow service",
      lines: [
        ["Now imagine a telecommunications company introducing a new measure of how long customers wait for technical problems to be resolved.", t("The call centre measurement puzzle", "Separating end-to-end service performance from the responsibilities of individual employees.")],
        ["Previously, call centre agents were evaluated mainly on how efficiently they handled customer conversations.", null],
        ["The new measure follows each technical problem from the customer's original contact until the issue is resolved.", cmp("Two service measures", "Call handling time", "Measures the duration of an individual customer conversation.", "Resolution time", "Measures the complete journey from initial contact until the problem is resolved.")],
        ["The broader measure reveals that some customers wait several days for problems requiring specialist technical assistance.", null],
        ["Agents become anxious because managers might interpret those delays as evidence of poor individual performance.", iss("Agents fear being blamed for technical resolution delays that depend on specialist teams outside their control.", "A perceived personal threat")],
        ["Their anxiety matters because performance measurement can influence reputation, rewards and confidence in managerial fairness.", null],
        ["If agents expect punishment, they may hesitate to report complicated cases or recurring system difficulties.", q("Why might fear of personal blame make the company's process evidence less reliable?")],
        ["The company could then receive incomplete information about the very problems its improvement programme needs to understand.", null],
        ["This demonstrates how resistance can become an evidence-quality problem rather than merely a communication difficulty.", st("Employees may conceal process weaknesses when they believe measurement findings will be used to assign unfair blame.")],
        ["Now imagine an agent explaining that technical specialists sometimes require additional diagnostic information before accepting a case.", null],
        ["The agent's concern might reveal a genuine handoff problem that deserves investigation rather than dismissal.", dg("The complete technical support journey", D.flow(["Customer|contacts", "Agent|diagnoses", "!Specialist|handoff", "Technical|resolution", "Customer|informed"]), "End-to-end resolution time includes dependencies between customer service and specialist technical teams.")],
        ["The manager should examine the evidence and clarify which delays agents can reasonably influence through their own actions.", null],
        ["That distinction allows the organisation to preserve the complete customer measure without assigning every delay to individuals.", cmp("Two accountability levels", "Individual responsibility", "Activities and decisions within the agent's reasonable control.", "Process responsibility", "Coordination of the complete customer resolution journey across teams.")],
        ["The manager should also explain why the broader measure is necessary for understanding customer experience.", null],
        ["Customers care about having problems resolved, not simply about how quickly their initial conversations finish.", st("A customer-centred baseline measures the complete outcome even when several departments contribute to that outcome.")],
        ["However, introducing that measure without explaining its purpose could create unnecessary distrust among experienced employees.", null],
        ["Agents should have opportunities to question definitions and identify cases where the measurement misrepresents actual events.", q("How could employee participation improve the accuracy and acceptance of the new resolution measure?")],
        ["The organisation should investigate valid objections while remaining clear that uncomfortable findings cannot simply be excluded.", null],
        ["It can retain call handling measures for operational diagnosis alongside the broader customer resolution baseline.", dg("Building a fair measurement approach", D.flow(["Explain|purpose", "Hear|concerns", "Validate|boundaries", "Clarify|roles", "Preserve|baseline"]), "The organisation can address legitimate accountability concerns without abandoning end-to-end performance measurement.")],
        ["This approach protects the integrity of the evidence while showing employees that their operational knowledge matters.", null],
        ["The improvement programme then has a stronger foundation for investigating delays across the complete technical support process.", st("Fair accountability and transparent measurement can strengthen employee trust without weakening the programme's baseline.")],
        ["Remember that resistance sometimes reveals legitimate concerns about how performance figures will be interpreted and used.", null],
        ["A responsible manager investigates those concerns while keeping the customer's complete experience visible.", null]
      ]
    }
  ]
},
{
  title: "Building a baseline people will accept",
  sec: "W8O3b",
  lines: [
    ["We've seen why Qasr's front-office director feels threatened by a measurement that includes delays outside his department.", t("Building a baseline people will accept", "Creating trust through transparent measurement, employee participation and fair accountability.")],
    ["Now let's consider how the programme can protect its evidence while addressing the concerns behind that resistance.", null],
    ["Imagine meeting the director again, knowing that simply repeating the eighty-two-minute figure won't resolve his objections.", q("How can Qasr secure acceptance of its baseline without changing the measurement merely to satisfy a manager?")],
    ["The conversation should begin by explaining what the measurement will be used for and what it won't establish.", null],
    ["Qasr needs to evaluate the complete guest arrival process, not automatically judge individual reception employees.", st("The baseline measures end-to-end process performance, not the personal effectiveness of every employee involved.")],
    ["This distinction matters because employees are more likely to share operational problems when they understand the investigation's purpose.", null],
    ["The programme should also honour its commitments about measurement, especially promises concerning confidentiality and fair interpretation.", iss("Trust deteriorates when managers use process evidence for purposes that contradict earlier assurances.", "A broken measurement commitment")],
    ["If Qasr promises that findings will support process improvement, subsequent reporting must remain consistent with that commitment.", null],
    ["Otherwise, employees may conceal workarounds and errors during later investigations, weakening the programme's evidence.", q("Why would employees disclose difficult operational realities if earlier disclosures had been used unfairly against them?")],
    ["Now let's return to the three measurements that created the disagreement about Qasr's corporate arrivals.", null],
    ["The property system reports 12.4 minutes from opening the booking record until encoding the room key.", cmp("Two legitimate measurements", "12.4 minutes", "The property system's narrower processing measure.", "82.0 minutes", "The programme's end-to-end mean across 310 corporate arrivals.")],
    ["The programme reports 82.0 minutes from entering the lobby until entering a released room.", null],
    ["Rather than declaring the system figure wrong, investigators should explain why the two boundaries answer different questions.", st("Reconciling measurements means explaining their definitions and purposes rather than forcing different figures to agree.")],
    ["The director can retain the narrower measure for understanding reception operations while accepting the broader programme baseline.", null],
    ["That arrangement preserves useful departmental evidence without excluding waiting experienced by guests across the complete process.", dg("Different measures, different purposes", D.flow(["Reception|processing", "Other|dependencies", "Room|release", "Guest|enters room"]), "The departmental measure remains useful within the wider end-to-end arrival process.")],
    ["But explaining the numbers isn't enough if employees believe the underlying process model misrepresents their actual work.", null],
    ["Investigators should therefore share their findings with frontline employees before escalating conclusions to senior management.", q("What might receptionists identify in the model that senior managers or external investigators have overlooked?")],
    ["Employees may recognise missing handoffs, exceptional cases or necessary controls that the original observations failed to capture.", null],
    ["Their corrections should be examined against evidence, incorporated when justified and explained when they aren't supported.", st("Employee validation strengthens accuracy by allowing actual process performers to challenge and correct the emerging model.")],
    ["This participation matters because acceptance becomes more credible when people can influence accuracy without controlling inconvenient conclusions.", null],
    ["The programme should also disclose how the sample was selected and how its measurement boundaries were applied.", dg("Making the evidence transparent", D.flow(["Define|boundaries", "Explain|sampling", "Share|findings", "Review|objections", "Agree|baseline"]), "Transparent definitions and evidence review support informed agreement about the programme baseline.")],
    ["Remember that the 310 corporate arrivals were observed across Qasr's fourteen properties during six weeks.", null],
    ["The 47-minute corporate-rate approval wait affected 61 percent of those sampled arrivals, making it important to investigate.", iss("A 47-minute corporate-rate approval wait affects 61% of the sampled corporate arrivals.", "An important cross-department dependency")],
    ["The director may reasonably question whether reception should be accountable for delays requiring another department's authorisation.", null],
    ["The answer requires separating responsibility for individual activities from ownership of the complete guest arrival outcome.", cmp("Two accountability levels", "Departmental responsibility", "Activities and decisions a particular department can reasonably influence.", "End-to-end ownership", "Coordination and improvement of the complete guest arrival process.")],
    ["An end-to-end owner coordinates improvement across departmental boundaries without pretending to control every operational decision personally.", null],
    ["This matters because a process can remain slow even when every department reports satisfactory performance within its boundaries.", st("End-to-end ownership addresses dependencies that departmental performance measures cannot resolve independently.")],
    ["Qasr should therefore agree who owns the complete measure and how contributing departments will participate in improvement.", null],
    ["The agreement must preserve the original baseline definitions so later results can be compared meaningfully.", dg("From evidence to agreement", D.flow(["Validate|model", "Confirm|definitions", "Clarify|ownership", "Agree|baseline", "Preserve|comparison"]), "The programme establishes a credible baseline and clear responsibility for using it in later evaluation.")],
    ["Otherwise, managers might redefine the clock after implementation and report improvements that guests never actually experience.", null],
    ["The programme should document remaining disagreements rather than suggesting everyone must personally welcome the findings.", iss("Agreement on a measurement's validity does not require agreement that its findings are comfortable or desirable.", "Evidence versus preference")],
    ["A defensible baseline can be accepted as accurate even when managers disagree about the best response.", null],
    ["Qasr's objective is therefore informed agreement about evidence, boundaries and ownership rather than superficial consensus.", st("A credible baseline combines validated evidence, transparent definitions, fair accountability and consistent future measurement.")],
    ["With those foundations, the programme can investigate improvement opportunities without turning every uncomfortable finding into a personal accusation.", null],
    ["The director's concerns become useful information for designing fair governance rather than grounds for hiding the guest's experience.", q("How would you explain the baseline agreement to employees while protecting both measurement integrity and fair accountability?")]
  ],
  review: [
    {
      title: "The public library's disputed waiting time",
      lines: [
        ["Let's explore baseline acceptance through a public library investigating complaints about delays in issuing membership cards.", t("The library's disputed baseline", "How transparent boundaries and employee participation create confidence in performance measurement.")],
        ["Imagine library managers reporting that new members wait forty minutes before receiving their completed membership cards.", null],
        ["The membership desk supervisor objects because employees spend only twelve minutes actively processing each application.", cmp("Two different measurements", "Twelve minutes", "Active membership application processing time.", "Forty minutes", "Complete elapsed time experienced by the new member.")],
        ["The supervisor worries that senior management will interpret the broader figure as evidence of inefficient desk employees.", null],
        ["That concern deserves attention because waiting may arise from activities outside the membership team's direct control.", iss("The supervisor fears responsibility for waiting caused by dependencies beyond the membership desk.", "A perceived accountability threat")],
        ["However, removing those delays would misrepresent the complete experience the library intends to improve.", null],
        ["The investigator should explain that the broader measure evaluates the membership journey rather than individual employee performance.", st("A process baseline measures the complete outcome, while departmental measures support diagnosis of particular activities.")],
        ["Now imagine employees questioning whether the forty-minute figure includes applicants waiting for identity verification.", null],
        ["Their concern may reveal an important dependency that the original process description failed to explain clearly.", q("How should the library respond when employees identify a possible omission in its process model?")],
        ["The investigator should examine the evidence and invite employees to demonstrate how verification actually operates.", null],
        ["Supported corrections should improve the model, while unsupported claims should receive clear explanations rather than dismissal.", dg("Validating the library process", D.flow(["Share|model", "Hear|employees", "Check|evidence", "Correct|findings", "Confirm|baseline"]), "Employee participation improves accuracy when proposed corrections are examined against evidence.")],
        ["This matters because participation builds confidence without allowing individuals to remove findings simply because they appear unfavourable.", null],
        ["The library should also explain how measurements will be used and honour commitments about fair employee evaluation.", st("Trust depends on transparent purposes and consistent treatment of employees after performance findings become visible.")],
        ["Suppose identity verification requires approval from another administrative unit before the membership card can be issued.", null],
        ["The library should identify who controls that approval while retaining its waiting time within the complete membership journey.", cmp("Different responsibilities", "Membership desk", "Processes applications and prepares membership cards.", "Administrative approval", "Provides required verification before membership can be completed.")],
        ["A process owner can coordinate improvement across both units without assigning every delay to membership employees.", null],
        ["The baseline agreement should document its boundaries, evidence and responsibility for future performance comparisons.", dg("A credible baseline agreement", D.flow(["Define|journey", "Validate|evidence", "Clarify|roles", "Agree|measure", "Compare|later results"]), "The library preserves a consistent end-to-end measure while clarifying departmental accountability.")],
        ["This protects the library from reporting artificial improvements by excluding waiting that members still experience.", null],
        ["Employees may continue disliking the result while recognising that the measurement accurately describes current performance.", q("Must every employee welcome the reported figure before the organisation can accept it as a valid baseline?")],
        ["The answer is no, because informed acceptance concerns evidence and definitions rather than personal satisfaction.", null],
        ["The library can preserve measurement integrity while demonstrating that operational concerns receive serious and fair consideration.", st("A defensible baseline combines transparent evidence, employee validation and accountability aligned with actual responsibilities.")],
        ["Remember that trust grows when people can question findings without being allowed to conceal inconvenient process realities.", null]
      ]
    },
    {
      title: "The municipal permit office's difficult agreement",
      lines: [
        ["Now imagine a municipality investigating why residents wait so long to receive permits for minor building modifications.", t("The municipal permit agreement", "Building acceptance when several departments contribute to one service outcome.")],
        ["The permit office reports that its employees complete application checks promptly once all required documents are available.", null],
        ["However, residents experience much longer elapsed times because applications also require technical review and financial clearance.", dg("The complete permit journey", D.flow(["Application|submitted", "Documents|checked", "Technical|review", "Financial|clearance", "Permit|issued"]), "The resident's complete journey spans several departments and includes waiting between their activities.")],
        ["When the municipality proposes an end-to-end baseline, the permit manager objects to including delays from other departments.", null],
        ["The manager fears that senior leaders will blame permit employees for activities they cannot independently control.", iss("The permit manager challenges the broader measure because departmental accountability and process ownership are unclear.", "A legitimate governance concern")],
        ["The investigator should acknowledge this concern without allowing departmental boundaries to redefine the resident's complete experience.", null],
        ["A useful explanation separates the measurement of service performance from responsibility for particular activities.", cmp("Two management questions", "Service performance", "How long does the resident wait for the complete permit outcome?", "Departmental responsibility", "Which activities and delays can each participating department influence?")],
        ["This distinction matters because a municipality cannot improve a cross-department process through isolated performance reports alone.", null],
        ["The organisation needs an owner capable of coordinating the complete journey while respecting existing departmental responsibilities.", st("End-to-end process ownership coordinates shared outcomes without assuming direct control over every contributing activity.")],
        ["Now imagine technical reviewers arguing that the proposed baseline excludes applications requiring additional safety documentation.", null],
        ["Their objection could reveal an important sampling or measurement problem rather than resistance to transparency.", q("Why should the municipality investigate this objection before asking departments to accept the baseline?")],
        ["The investigator should examine how exceptional applications were selected and whether their treatment matches the stated definitions.", null],
        ["Any justified correction should be documented so everyone understands why the evidence or measurement has changed.", dg("Resolving the evidence dispute", D.flow(["Review|sample", "Check|exceptions", "Examine|objections", "Document|corrections", "Validate|measure"]), "A transparent review of sampling and exceptions helps establish confidence in the reported baseline.")],
        ["The municipality should also explain how the findings will support improvement rather than automatically trigger personal criticism.", null],
        ["That commitment must be honoured when results are presented to senior leaders and discussed across departments.", st("Fair use of performance evidence matters because employees may otherwise conceal difficulties or resist future investigations.")],
        ["Suppose the review confirms that technical approvals create substantial waiting within the complete permit journey.", null],
        ["The municipality should retain that waiting in the baseline while identifying the department responsible for the approval.", iss("Removing approval waiting from the reported journey would conceal delays that residents continue to experience.", "A misleading boundary change")],
        ["The agreement should preserve measurement definitions and identify how future performance will be compared against current results.", null],
        ["It should also record unresolved concerns rather than pretending that every participant is personally satisfied.", q("Can departments accept a measurement's validity while continuing to disagree about how the process should improve?")],
        ["They can, because agreeing on evidence is different from agreeing on a particular improvement solution.", null],
        ["The municipality gains a stronger foundation when participants understand the measure and trust its intended use.", dg("A defensible agreement", D.flow(["Explain|purpose", "Validate|evidence", "Clarify|ownership", "Agree|baseline", "Preserve|definitions"]), "Transparent measurement and fair accountability support credible evaluation of later improvements.")],
        ["Remember that a baseline becomes useful when its evidence survives scrutiny and its responsibilities are understood.", null],
        ["That agreement allows improvement work to proceed without sacrificing the resident's complete service experience.", st("A credible baseline preserves the customer journey while recognising the different responsibilities of participating departments.")],
        ["The goal is not comfortable numbers, but trustworthy evidence that people can use responsibly.", null]
      ]
    }
  ]
},
{
  title: "The decision, the forum and the next phase",
  sec: "W8O3c",
  lines: [
    ["We've explored how Qasr can build trust in its baseline without hiding uncomfortable findings or blaming individual employees.", t("The decision, the forum and the next phase", "Completing Understand and preparing Qasr Hospitality Group for Innovate.")],
    ["Now let's bring our investigation together, because the programme must turn its evidence into a defensible decision.", null],
    ["Imagine Qasr's programme sponsor inviting the front-office director to review the findings before the next phase begins.", q("What should the programme be ready to explain before asking its sponsor to accept the baseline?")],
    ["The director still prefers the property system's 12.4-minute figure, which measures a narrow reception processing interval.", null],
    ["The programme's 82.0-minute mean instead covers 310 corporate arrivals from entering the lobby until entering a released room.", cmp("The measurement decision", "12.4 minutes", "System processing from booking-record opening to key encoding.", "82.0 minutes", "Mean end-to-end arrival time across 310 corporate arrivals.")],
    ["Both measurements remain legitimate, but the broader boundary matches the programme's objective of improving complete guest arrival.", null],
    ["The original traveller's twenty-three-minute reception experience also remains valuable without becoming the programme's overall baseline.", st("Different measurements serve different purposes, but the programme baseline must match the complete outcome being improved.")],
    ["The sponsor should therefore support the 82.0-minute measure, subject to documented validation and agreement on its definitions.", null],
    ["That decision doesn't make reception responsible for every delay occurring elsewhere in the guest arrival journey.", iss("The complete process measure must not be confused with individual departmental accountability.", "A necessary distinction")],
    ["The programme needs clear end-to-end ownership alongside appropriate responsibilities for the departments performing individual activities.", null],
    ["This matters because the 47-minute corporate-rate approval wait affects 61 percent of the sampled arrivals.", dg("The cross-department dependency", D.flow(["Guest|arrives", "Reception|checks", "!Rate|approval", "Room|released", "Guest|enters room"]), "The observed approval wait is relevant to the complete arrival journey even when another department controls the decision.")],
    ["The director's concerns should inform accountability arrangements without changing the measurement simply to make departmental results attractive.", null],
    ["Now consider what Qasr must carry forward from Understand before anyone begins redesigning the process.", q("What evidence would make a proposed redesign more defensible than an attractive idea based on assumptions?")],
    ["The validated as-is model establishes how activities, decisions and handoffs actually operate across the guest arrival journey.", null],
    ["The quantified baseline records current performance using boundaries that later measurements must preserve for meaningful comparison.", st("The as-is model explains current operations, while the baseline establishes their measured starting performance.")],
    ["Root cause analysis investigates why recurring problems occur rather than merely identifying where their symptoms become visible.", null],
    ["The team also records known exceptions and their volumes, distinguishing recurring difficulties from unusual individual experiences.", dg("Understanding exceptions", D.flow(["Observe|cases", "Identify|exceptions", "Record|volumes", "Investigate|causes"]), "Documented exceptions and their observed frequency help establish which problems deserve closer attention.")],
    ["Potential quick wins complete the picture by identifying limited improvement opportunities supported by the investigation's findings.", null],
    ["However, identifying a quick win isn't evidence that Qasr has already implemented it or achieved measurable benefits.", st("Understand identifies supported opportunities; later phases evaluate, implement and measure changes against the baseline.")],
    ["These outputs matter together because redesign decisions require both an accurate process description and an explanation of performance.", null],
    ["Without that foundation, Qasr could invest in faster reception activities while leaving important approval delays unresolved.", iss("A redesign targeting visible activity speed may fail when the underlying problem involves cross-department waiting.", "The risk of premature redesign")],
    ["The programme should document its findings and unresolved questions rather than claiming certainty where evidence remains incomplete.", null],
    ["That honesty strengthens the next phase because proposed changes can be evaluated against clearly established operational problems.", dg("The Understand handover", D.flow(["Validated|model", "Agreed|baseline", "Root cause|analysis", "Exceptions|and volumes", "Potential|quick wins"]), "Understand provides five connected outputs that inform later improvement decisions.")],
    ["Now let's connect this investigation with your self-paced learning activity, which examines measurement disagreements in another organisation.", null],
    ["The discussion forum is called Whose Number Is Right, and it requires you to examine an unfamiliar case.", q("How would you decide which performance figure deserves acceptance when different stakeholders defend different measurement boundaries?")],
    ["Your task is to examine the supplied case and exhibit, then defend the measurement that matches its improvement objective.", null],
    ["Your explanation should address the measurement boundaries, supporting evidence and consequences of accepting competing figures.", st("A persuasive baseline argument explains what each figure measures and why the chosen boundary fits the improvement objective.")],
    ["After posting your substantive response, engage with at least two classmates by challenging or extending their reasoning.", null],
    ["Respectful disagreement matters because a strong baseline decision should survive informed scrutiny rather than depend on easy agreement.", dg("Developing a defensible argument", D.flow(["Examine|case", "Compare|measures", "Defend|choice", "Challenge|reasoning", "Refine|understanding"]), "The forum develops evidence-based reasoning through individual analysis and substantive peer discussion.")],
    ["The week's Virtual Lab assessment is separate from our formative practice and follows the instructions provided through Moodle.", null],
    ["Its purpose is to demonstrate analytical judgement rather than simply repeat the terminology introduced during our lessons.", st("Apply the process analysis and measurement principles to the assessment activity specified in the learning environment.")],
    ["Finally, Qasr's journey continues into Innovate, where the team will develop alternatives for how guest arrival should operate.", null],
    ["Understand has established what happens today; Innovate will explore how the process could perform better.", dg("The bridge to Innovate", D.flow(["Understand|current reality", "Innovate|future design", "Implement|changes", "Realize|Value"]), "The agreed baseline connects current performance with later redesign and benefits evaluation.")],
    ["Remember that Qasr hasn't demonstrated an improvement merely by completing its investigation or identifying promising opportunities.", null],
    ["The programme has achieved something essential: a defensible starting point against which future results can be judged.", q("Can you defend the baseline, explain its causes and show how the evidence prepares Qasr for Innovate?")]
  ],
  review: [
    {
      title: "The city bus service's disputed journey time",
      lines: [
        ["Let's bring the Understand phase together through a city transport authority investigating complaints about unreliable bus journeys.", t("The bus service baseline decision", "Using complete process evidence to prepare a defensible improvement programme.")],
        ["Imagine passengers reporting that their journeys take much longer than the travel times advertised by the transport authority.", null],
        ["The operations manager explains that buses normally complete their scheduled routes within the expected driving duration.", cmp("Two perspectives", "Operations measure", "Time spent travelling along the scheduled bus route.", "Passenger experience", "Time from arriving at the stop until reaching the intended destination.")],
        ["Both descriptions may be accurate, but passengers also experience waiting before boarding and delays during transfers.", null],
        ["The authority must decide which measurement best represents the improvement programme's intended outcome.", q("Which boundary would you defend if the programme promises to reduce passengers' complete journey time?")],
        ["A passenger-centred baseline should include the relevant journey from arriving at the stop until reaching the destination.", null],
        ["The narrower driving measure remains useful for investigating vehicle operations without replacing the broader service measure.", st("A defensible programme baseline measures the complete outcome being improved while preserving useful departmental indicators.")],
        ["Now imagine the operations manager objecting because traffic congestion and passenger transfers aren't entirely under driver control.", null],
        ["That concern deserves consideration, but it doesn't justify removing experienced delays from the complete journey.", iss("The manager challenges accountability for delays that extend beyond the driver's direct operational control.", "A legitimate responsibility concern")],
        ["The authority should distinguish the process owner coordinating service improvement from employees responsible for particular activities.", null],
        ["It should also explain how the baseline will be used and invite staff to correct inaccurate process descriptions.", dg("Building an accepted measure", D.flow(["Define|journey", "Validate|evidence", "Hear|employees", "Clarify|ownership", "Agree|baseline"]), "Transparent definitions and fair accountability strengthen confidence in the complete journey measure.")],
        ["These actions matter because employees may otherwise interpret performance measurement as a search for individual blame.", null],
        ["The investigation should then document how journeys operate, including handoffs, waiting and meaningful exceptional conditions.", st("A validated as-is model records actual process activities and dependencies rather than relying exclusively on official procedures.")],
        ["Reliable observations establish the baseline, while root cause analysis investigates why recurring delays occur.", null],
        ["Recording exceptions and their frequency helps distinguish systematic weaknesses from unusually difficult individual journeys.", dg("Preparing the improvement handover", D.flow(["Validated|model", "Measured|baseline", "Investigated|causes", "Recorded|exceptions", "Potential|quick wins"]), "Understand provides connected evidence that supports later redesign decisions.")],
        ["The authority might identify opportunities to improve transfer information or coordination between routes.", null],
        ["However, those opportunities remain proposals until changes are implemented and their effects measured against the baseline.", q("What evidence would demonstrate that a redesigned service actually shortened passengers' complete journeys?")],
        ["The answer requires comparable measurements using consistent starting events, ending events and relevant operating conditions.", null],
        ["That comparison allows later benefits evaluation to distinguish genuine service improvements from changes in reporting definitions.", st("A stable baseline connects the original investigation with defensible claims about later performance improvements.")],
        ["The authority can now enter redesign with a clear understanding of current performance and its contributing causes.", null],
        ["Remember that agreement on evidence doesn't require every participant to welcome the findings or prefer the same solution.", null],
        ["The essential achievement is a trustworthy foundation for improving the service passengers actually experience.", null]
      ]
    },
    {
      title: "The charity application that needed a decision",
      lines: [
        ["Now imagine a charitable foundation investigating complaints about delays in approving emergency financial assistance applications.", t("The charity's baseline decision", "Connecting current performance, fair accountability and evidence-based improvement.")],
        ["The foundation's application team reports that checking completed forms requires relatively little active employee time.", null],
        ["However, applicants describe much longer waits between submitting their requests and receiving final assistance decisions.", cmp("Two different measures", "Application checking", "Active time spent reviewing submitted information.", "Applicant journey", "Elapsed time from submitting the request until receiving the decision.")],
        ["The foundation wants to improve how quickly eligible applicants receive decisions during financially difficult circumstances.", null],
        ["Its baseline must therefore capture the complete relevant journey rather than only the easiest activity to measure.", q("Would faster form checking demonstrate success if applicants continued waiting just as long for decisions?")],
        ["The answer is no, because the programme's objective concerns the applicant's complete service experience.", null],
        ["Investigators should follow actual applications through verification, assessment, approval and communication of the final decision.", dg("The complete assistance journey", D.flow(["Application|submitted", "Documents|verified", "Eligibility|assessed", "Decision|approved", "Applicant|informed"]), "The programme's end-to-end boundary covers the complete application decision process.")],
        ["Employees should validate the resulting as-is model because informal workarounds may be missing from documented procedures.", null],
        ["The investigation also needs reliable measurements from a suitable selection of applications using consistent boundaries.", st("A validated model and quantified baseline establish how the current process operates and performs.")],
        ["Now imagine the application manager objecting because some delays involve decisions made by an independent approval committee.", null],
        ["The manager fears being held responsible for waiting that cannot be resolved by application employees alone.", iss("The application manager questions accountability for delays controlled by another decision-making body.", "A cross-department responsibility concern")],
        ["The foundation should acknowledge that concern while preserving committee waiting within the applicant's complete elapsed journey.", null],
        ["Process ownership must coordinate the overall outcome without assuming that one manager controls every contributing decision.", st("Fair accountability distinguishes responsibility for individual activities from ownership of the complete service outcome.")],
        ["The investigation should also examine why applications wait for committee approval and whether the existing controls remain necessary.", null],
        ["Some checks may protect fairness and responsible use of charitable funds, making their purpose important to understand.", q("Why would removing approval controls without investigating their purpose create risks for the foundation?")],
        ["Root cause analysis should distinguish necessary safeguards from the conditions creating avoidable waiting around those safeguards.", null],
        ["The team should document recurring exceptions and their observed frequency rather than generalising from memorable individual complaints.", dg("Investigating the causes", D.flow(["Observe|waiting", "Examine|controls", "Investigate|causes", "Record|exceptions", "Validate|findings"]), "The investigation explains why delays occur while preserving evidence about necessary controls.")],
        ["Potential quick wins may emerge, such as improving how application information reaches the approval committee.", null],
        ["However, identifying a promising opportunity doesn't establish that the foundation has already achieved better performance.", st("Understand identifies evidence-supported opportunities; later improvement work tests whether implemented changes deliver benefits.")],
        ["The foundation should document its baseline definitions and explain how future measurements will support fair evaluation.", null],
        ["Employees should understand that the findings support process improvement rather than automatic personal criticism.", iss("Unclear measurement purposes can create resistance and discourage employees from sharing important operational evidence.", "A threat to trust")],
        ["Transparent communication and opportunities to challenge inaccurate findings can strengthen acceptance without concealing difficult results.", null],
        ["The foundation can then enter redesign with a validated model, agreed baseline and documented understanding of recurring problems.", dg("From Understand to improvement", D.flow(["Validated|model", "Agreed|baseline", "Supported|causes", "Improvement|options", "Later|evaluation"]), "A defensible baseline provides the reference point for assessing whether future changes improve the complete service.")],
        ["Remember that an organisation cannot demonstrate improvement merely by adopting new procedures or reporting encouraging activity figures.", null],
        ["It must show that comparable evidence establishes better performance against the original process baseline.", q("How would you defend the foundation's baseline while recognising the legitimate concerns of its application manager?")],
        ["That is the essential bridge from understanding current reality to designing improvements that can later be evaluated.", null]
      ]
    }
  ]
},
      ] },
    ]
  };
  // Claude review fixes (original line indices): sentence replacements, then removals in descending order.
  const FIX = [["W8O1a",1,7,"So the written procedure cannot explain the delay, because it describes intended work rather than everything happening in practice."],["W8O1b",-1,9,"Qasr\u0027s model shows eight steps across four lanes with four handoffs, and the same guest data is typed in three separate times."],["W8O2a",-1,11,"On the slide, nine of those days sit unassigned in a shared mailbox, five await documents from the guest, and three await the payment run."],["W8O2a",-1,21,"So rather than arguing over one number, report internal time, customer-attributable time and the total separately, and let the process owner choose the target."],["W8O2b",-1,5,"The answer is no, and at Qasr the measured pattern later proved far worse than her story suggested."],["W8O2c",-1,5,"Her corporate rate was found by telephone in seven minutes because the revenue office happened to answer, so her arrival never met the long approval wait."],["W8O2c",-1,19,"It is the largest single component of the eighty-two minutes, and it arises whenever the revenue office does not answer immediately."],["W8O2c",0,11,"The billing figure cannot measure that interval, although it remains useful for understanding the billing activity itself."],["W8O1d",-1,3,"The clock keeps running because elapsed time continues whenever the guest remains inside our defined process boundaries."],["W8O1e",-1,5,"Its existence alone proves nothing, because approval may protect contractual terms or prevent incorrect charges to corporate customers."],["W8O2d",-1,25,"The investigation may also identify quick wins, limited improvements that can be delivered immediately to build the programme\u0027s credibility."],["W8O2d",0,5,"That clock misses part of the journey, because applicants may also wait for document verification and final administrative approval."],["W8O2d",1,19,"Demonstrating that requires comparable measurements collected after the change using the original baseline definitions."],["W8O3a",-1,17,"The director may reasonably argue that reception cannot eliminate a wait that sits inside the revenue office rather than at the front desk."],["W8O3a",0,5,"Yet measuring an outcome differs from identifying who controls its causes, so the figure alone cannot blame teachers."],["W8O3b",-1,23,"The director may reasonably question whether reception should answer for a wait that sits inside the revenue office."],["W8O3b",0,19,"That is possible because informed acceptance concerns evidence and definitions rather than personal satisfaction."],["W8O3c",-1,9,"The programme needs an end-to-end owner with enough authority across the front desk and revenue office to change how approval works."],["W8O3c",0,17,"Demonstrating that requires comparable measurements using consistent starting events, ending events and relevant operating conditions."],["W8O3c",-1,27,"Post your own answer before reading classmates\u0027 posts, then reply substantively to at least two, disagreeing with at least one."],["W8O3c",-1,29,"Assessment 2, the Virtual Lab worth twenty percent, is briefed this week and completed in the self-paced session, separately from formative practice."]];
  const CUT = [["W8O1d",1,19],["W8O1d",1,13],["W8O1e",1,21],["W8O1e",1,13],["W8O1e",1,9],["W8O2a",1,21],["W8O2a",1,11],["W8O2c",1,21],["W8O2c",1,9],["W8O3a",1,19],["W8O3a",1,7],["W8O3b",-1,31],["W8O3b",1,21],["W8O3b",1,19],["W8O3b",1,7],["W8O3c",-1,33],["W8O3c",-1,31],["W8O3c",-1,11],["W8O3c",1,21],["W8O3c",1,19],["W8O3c",1,11],["W8O3c",1,7],["W8O3c",1,5]];
  COURSE.lessons.forEach((l) => l.sections.forEach((s) => {
    const T = (v) => (v < 0 ? s.lines : s.review[v].lines);
    FIX.filter((f) => f[0] === s.sec).forEach((f) => { T(f[1])[f[2]][0] = f[3]; });
    CUT.filter((f) => f[0] === s.sec).forEach((f) => { T(f[1]).splice(f[2], 1); });
  }));

  // Plain-text scripts for tools that expect them.
  COURSE.lessons.forEach((l) =>
    l.sections.forEach((s) => {
      s.script = s.lines.map((x) => x[0]).join(" ");

      if (Array.isArray(s.review)) {
        s.review.forEach((r) => {
          r.script = r.lines.map((x) => x[0]).join(" ");
        });
      }
    })
  );

})();
