// OPER621 Business Process Management · Week 5 · Organization Strategy Phase.
// Source: Week 5 Session 1 slides, Week 5 Delivery Plan, Jeston Chapter 13.
// Running case: Qasr Hospitality Group — three strategies, one budget.
//
// COURSE LEARNING OUTCOMES
// K2: Evaluate various factors that impact on the successful implementation
//     of BPM in public and private sector organizations.
// S1: Design a framework for BPM and explain and assess related phases
//     in the context of a regional company.
//
// WEEKLY LEARNING OUTCOMES
// O1 [K2, S1]: Explain the purpose of the Organization Strategy phase
//              within the BPM framework.
// O2 [K2, S1]: Analyse how strategic intent constrains which processes
//              should be improved.
// O3 [K2, S1]: Assess the risk of pursuing efficiency in directions
//              that conflict with strategy.
//
// SESSION 1 LEARNING OUTCOMES
// Describe the inputs, outputs and deliverables of Organization Strategy.
// Relate a process improvement decision to a stated strategic objective.
// Identify conflicts between competing strategic objectives.
//
// SESSION 2 LEARNING OUTCOMES
// Apply the strategy phase to an unfamiliar organisation.
// Contribute a reasoned position to the assessed discussion forum.
//
// WEEK 5 LESSON PLAN
//
// Lesson l1: Before improving anything, understand the strategy.
//   W5O1a [O1; K2, S1]: Why the framework begins with strategy.
//   W5O1b [O1; K2, S1]: From strategic intent to process measures.
//   W5O1c [O1, O2; K2, S1]: Making strategic objectives usable.
//
// Lesson l2: Choosing improvements that serve the strategy.
//   W5O2a [O2; K2, S1]: Tracing proposals to strategic objectives.
//   W5O2b [O2; K2, S1]: Qasr's three strategies and four proposals.
//   W5O2c [O2, O3; K2, S1]: Making a defensible funding decision.
//
// Lesson l3: When good improvements serve the wrong purpose.
//   W5O3a [O3; K2, S1]: Efficiency without strategic alignment.
//   W5O3b [O3; K2, S1]: Competing objectives and explicit trade-offs.
//   W5O3c [O1, O3; K2, S1]: Sponsors, decision rights and strategic scope.
//
// Lesson l4: Turning strategic choices into a BPM mandate.
//   W5O4a [O1, O2; K2, S1]: Deliverables and acceptance criteria.
//   W5O4b [O1, O3; K2, S1]: Benefits, baselines, targets and accountability.
//   W5O4c [O2, O3; K2, S1]: Strategic discipline and forum preparation.
//
// OUTCOME COVERAGE
// O1: W5O1a, W5O1b, W5O1c, W5O4a, W5O4b.
// O2: W5O1c, W5O2a, W5O2b, W5O2c, W5O4a, W5O4c.
// O3: W5O2c, W5O3a, W5O3b, W5O3c, W5O4b, W5O4c.
//
// ASSESSMENT
// Session 1: Formative questions and worked examples only.
// Session 2: Assessment 1, Contribution to Discussions, worth 15%.
// The forum assessment is linked to K1, K2 and S1 in the delivery plan.
// Week 5 instruction and mastery tracking focus on K2 and S1.
// The forum case is an unfamiliar organisation, not Qasr Hospitality.
//
// CONTENT ACCURACY
// Qasr's stated objectives are highest regional service rating,
// a 10% reduction in cost per occupied room, and 25% corporate growth.
// The programme can fund two of four proposed improvements.
// Exhibit 5 relationships must retain their stated strengths.
// Qualitative alignment scores do not replace sponsor judgement.
// An efficiency gain alone does not establish strategic priority.
//
// AUTHORING CONVENTIONS
// Each section contains [spoken sentence, visual moment] pairs.
// A null moment preserves the previous visual.
// New visual moments appear every one to three spoken sentences.
// Every diagram caption is a complete explanatory sentence.

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
    id: "oper621-w5",
    code: "OPER621",
    title: "Organization Strategy",
    subtitle: "Business Process Management \u00b7 Week 5",
    author: "Prof. Bassem Jarboui",
    teacher: { name: "Prof. Bassem Jarboui", email: "", sendReport: false },
    lessons: [
      { id: "l1", title: "Before improving anything, understand the strategy", sections: [
{
  title: "Why the framework begins with strategy",
  sec: "W5O1a",
  lines: [
    ["Welcome to Week Five, where we begin exploring how organisations turn Business Process Management into a purposeful improvement programme.", t("OPER621 · Week 5", "Organization Strategy is the first phase of the BPM implementation framework.")],
    ["You already know that improving a process means making connected work deliver better outcomes for its customers.", null],
    ["But today, I want you to consider a question that comes before deciding how any process should improve.", q("How do we know which improvements an organisation should pursue?")],
    ["Let's return to Qasr Hospitality Group, where our earlier discussions revealed difficulties in the guest arrival experience.", null],
    ["You may remember our tired business traveller, whose check-in involved unnecessary waiting and disconnected information across departments.", dg("Returning to Qasr Marina", D.flow(["Guest|arrives", "!Booking|delay", "!Rate|check", "!Room|not ready", "Guest|complains"]), "The guest's difficult arrival revealed process problems, but identifying those problems does not automatically establish improvement priorities.")],
    ["Imagine Qasr's management team gathering to decide which improvements deserve investment during the coming year.", null],
    ["The operations director wants faster check-in, while the finance director believes reducing operating costs deserves greater attention.", null],
    ["Meanwhile, the commercial director argues that corporate customers need more reliable billing before the group expands further.", iss("Three directors want different improvements, but the organisation cannot fund every proposal.", "Competing priorities")],
    ["Each director has a reasonable concern, and each proposed improvement could produce a genuine organisational benefit.", null],
    ["Yet those benefits do not automatically deserve equal priority, because Qasr has limited resources and competing ambitions.", q("If every proposal offers a benefit, how should Qasr decide which deserves funding?")],
    ["This is precisely why the BPM implementation framework begins with Organization Strategy rather than immediately redesigning processes.", dg("The framework begins with strategy", D.route([0]), "Organization Strategy comes before Process Architecture and the later phases because improvement decisions must follow the organisation's strategic direction.")],
    ["Organization Strategy means establishing what the organisation wants to achieve and how process improvements should support those ambitions.", null],
    ["Its purpose is not simply to repeat an impressive vision statement that everyone already recognises.", st("Organization Strategy turns organisational ambitions into agreed criteria for choosing and guiding process improvements.")],
    ["Instead, the phase makes strategic intentions specific enough to guide decisions about which processes deserve improvement.", null],
    ["At Qasr, the published strategy includes becoming the region's highest-rated hospitality group for service.", null],
    ["It also commits to reducing cost per occupied room by ten percent and growing corporate accounts by twenty-five percent.", dg("Qasr's three strategic objectives", D.flow(["*Service|leadership", "*Cost per room|down 10%", "*Corporate|growth 25%"]), "Qasr's published objectives concern service leadership, a ten percent cost reduction per occupied room, and twenty-five percent corporate-account growth.")],
    ["These objectives describe different organisational ambitions, and an improvement serving one may not serve the others equally.", null],
    ["For example, reducing reception staffing might lower costs while making the arrival experience less personal.", iss("A staffing reduction could support the cost objective while putting the service objective at risk.", "Strategic tension")],
    ["Without strategic guidance, managers might approve that change simply because its financial savings appear attractive.", null],
    ["But if service leadership has priority, the same proposal could undermine what Qasr wants to become.", q("Could an efficient process actually move Qasr away from its chosen strategy?")],
    ["That possibility reveals an important distinction between improving a process and improving the organisation's strategic position.", null],
    ["A process can become faster or cheaper without making the organisation more successful at its chosen objectives.", st("An efficiency gain does not establish strategic priority unless it supports an agreed organisational objective.")],
    ["The strategy phase therefore creates strategic alignment, meaning a demonstrable connection between improvement decisions and organisational objectives.", null],
    ["It also creates shared understanding, because executives must agree on what those objectives mean in practice.", null],
    ["When executives disagree, discovering that disagreement early prevents process designers from making strategic choices without authority.", dg("Agreement before design", D.flow(["Published|strategy", "Executive|agreement", "Improvement|criteria", "+Process|decisions"]), "The strategy phase establishes a shared interpretation of organisational objectives before improvement teams make detailed design decisions.")],
    ["Now imagine Qasr's steering group agreeing that guest experience and corporate growth should guide its immediate investment choices.", null],
    ["That agreement would provide a reasoned basis for comparing proposals, rather than rewarding whichever director argues most forcefully.", null],
    ["The group could then explain why a useful cost-saving proposal might be deferred despite its genuine benefits.", cmp("a", "Without strategic alignment", "Proposals compete through departmental influence and isolated benefits."),],
    ["Importantly, deferring an improvement does not mean denying its value or declaring its underlying process unimportant.", cmp("b", "With strategic alignment", "Proposals are judged against agreed objectives, resource constraints, and explicit trade-offs.")],
    ["It means recognising that scarce resources should support the organisation's chosen direction rather than every attractive opportunity.", null],
    ["The phase must therefore produce decisions that genuinely constrain later work, including decisions to reject proposals.", st("A useful strategy phase can justify rejecting an attractive improvement because it does not sufficiently support strategic priorities.")],
    ["And those decisions must remain traceable, so later teams can explain why particular processes received investment.", null],
    ["As we continue, you'll learn how to translate strategic ambitions into measurable objectives and practical process criteria.", null],
    ["For now, remember that Qasr must decide what success means before deciding which processes to improve.", q("Before asking how to improve a process, can you explain which strategic objective that improvement should serve?")]
  ],
  review: [
    {
      title: "A university with one improvement budget",
      lines: [
        ["Let's approach Organization Strategy through a university that wants to improve its students' experience and academic performance.", t("Another way to understand strategic alignment", "A university must choose improvements according to its educational priorities rather than departmental preferences.")],
        ["Imagine the university has received funding for one major improvement project during the coming academic year.", null],
        ["The admissions director proposes replacing the application system because students repeatedly struggle to submit their documents.", null],
        ["Meanwhile, the library director wants automated book sorting because employees spend considerable time handling returned materials.", iss("Two worthwhile improvement proposals compete for one available budget.", "A difficult investment choice")],
        ["Both proposals address genuine problems, and both could make particular university activities more efficient.", null],
        ["But the university cannot fund both, so managers need something more useful than competing descriptions of benefits.", q("Which proposal should receive funding when both promise genuine improvements?")],
        ["Now imagine the university's published strategy emphasises increasing student enrolment while improving the experience of new applicants.", null],
        ["That strategic direction changes how the proposals should be evaluated, because they contribute differently to those objectives.", null],
        ["The admissions proposal directly addresses obstacles that discourage prospective students from completing their applications.", dg("Linking admissions to strategy", D.flow(["Increase|enrolment", "Improve|applications", "Reduce|submission errors", "+Students|complete"]), "Improving the application process directly supports the university's strategic ambition to increase enrolment and improve applicant experience.")],
        ["The library proposal may save staff time, but its connection to the stated enrolment objective is less direct.", null],
        ["That does not make library efficiency unimportant, because the savings could still support other worthwhile activities.", null],
        ["It means the university should examine whether those savings justify diverting resources from its immediate strategic priority.", cmp("a", "Admissions improvement", "It directly supports the stated enrolment and applicant-experience objectives."),],
        ["This comparison illustrates strategic alignment, which means connecting proposed improvements to the organisation's agreed objectives.", cmp("b", "Library automation", "It offers operational savings, but its contribution to the stated objectives is less direct.")],
        ["Without that connection, managers may approve whichever project appears easiest, cheapest, or most strongly supported internally.", null],
        ["But with strategic alignment, they can explain their decision using shared organisational priorities rather than personal preferences.", st("Strategic alignment makes improvement decisions defensible because each proposal is evaluated against agreed organisational objectives.")],
        ["Suppose the university therefore chooses admissions improvement while recording why library automation must wait.", null],
        ["That decision becomes a useful instruction for later process designers, who now understand the outcome their work must support.", null],
        ["They should not merely accelerate internal document checking while leaving applicants confused about completing their applications.", iss("Faster internal processing would be insufficient if prospective students still struggle to complete their applications.", "The wrong improvement target")],
        ["Instead, they should investigate whether their changes genuinely help more applicants complete the journey successfully.", null],
        ["The important lesson is that Organization Strategy establishes the purpose against which improvement success should be judged.", null],
        ["So whenever two worthwhile projects compete, ask which one better advances the organisation's agreed strategic direction.", q("Can you defend an improvement decision by showing which organisational objective it advances?")]
      ]
    },
    {
      title: "The delivery company that became faster but less reliable",
      lines: [
        ["Imagine a delivery company that has built its reputation on transporting important medical supplies reliably between hospitals.", t("Another way to understand why strategy comes first", "A delivery company discovers that greater operational efficiency can conflict with its promise of reliable service.")],
        ["Its customers depend on predictable deliveries because missing supplies can disrupt scheduled treatments and hospital operations.", null],
        ["The company's published strategy therefore emphasises dependable service rather than offering the cheapest possible delivery.", null],
        ["Now imagine the operations manager discovering that combining several delivery routes could substantially reduce vehicle operating costs.", iss("Combining delivery routes promises lower costs but could make urgent medical deliveries less predictable.", "An efficiency dilemma")],
        ["The proposal looks attractive because fewer journeys would consume less fuel and require fewer driver hours.", null],
        ["If managers considered efficiency alone, they might approve the change without examining its effect on customers.", q("Should the company approve a cheaper delivery system if reliability might deteriorate?")],
        ["To answer properly, we must distinguish an operational improvement from an improvement that supports organisational strategy.", null],
        ["An operational improvement makes some aspect of work faster, cheaper, or less resource intensive.", null],
        ["Strategic alignment asks whether that change also helps the organisation achieve the objectives it has chosen.", dg("Two different questions", D.flow(["Lower|delivery cost", "Check|reliability", "Compare with|strategy", "Make|decision"]), "A proposed cost reduction must be assessed against the company's strategic commitment to dependable medical deliveries.")],
        ["For this company, lower operating costs matter, but reliability is central to the value customers expect.", null],
        ["Combining routes could introduce additional stops, making arrival times less predictable for hospitals awaiting essential supplies.", null],
        ["That risk deserves attention before the company changes its delivery process, not after customers begin complaining.", cmp("a", "Operational efficiency", "Combining routes could reduce fuel consumption and driver hours."),],
        ["This is why Organization Strategy comes before detailed process redesign in the BPM implementation framework.", cmp("b", "Strategic effectiveness", "The redesigned routes must still deliver the reliability promised to hospital customers.")],
        ["The phase clarifies which organisational objectives matter and establishes the criteria that proposed improvements must satisfy.", null],
        ["Here, management might require evidence that route consolidation will preserve agreed delivery reliability before approving investment.", null],
        ["If that evidence is unavailable, the company could defer the proposal or investigate a safer alternative.", st("A strategic objective can act as a constraint that prevents an attractive efficiency improvement from damaging customer value.")],
        ["Notice that rejecting a proposed change does not mean managers should ignore costs or abandon efficiency.", null],
        ["It means cost reductions must be pursued in ways that remain compatible with the organisation's chosen direction.", null],
        ["Perhaps better vehicle maintenance or improved loading arrangements could reduce expenditure without introducing unpredictable delivery delays.", dg("Improvement within strategic boundaries", D.flow(["Reliable|service", "Evaluate|cost ideas", "Protect|delivery times", "+Choose|aligned change"]), "The company should seek efficiency improvements that preserve the reliable service on which its strategy depends.")],
        ["These alternatives illustrate why strategic direction helps managers choose among several possible ways of improving operations.", null],
        ["The same principle applies whenever organisations face competing objectives, limited resources, or pressure for immediate savings.", null],
        ["So remember that successful BPM does not simply make processes efficient; it makes them serve organisational purpose.", q("Would you call a cheaper process successful if it undermined the promise that customers depend upon?")]
      ]
    }
  ]
},
{
  title: "From strategic intent to process measures",
  sec: "W5O1b",
  lines: [
    ["Qasr's steering group now understands why improvement choices must begin with the organisation's strategic direction rather than departmental preferences.", t("From strategic intent to process measures", "Strategic objectives become useful when managers connect them to observable process performance.")],
    ["But agreeing on strategic priorities creates another challenge, because broad ambitions rarely tell employees exactly what to change.", null],
    ["Consider Qasr's ambition to achieve the highest regional service rating, which sounds clear until managers discuss implementation.", q("What would service leadership actually require Qasr's processes to deliver?")],
    ["The reception manager interprets service leadership as shorter queues, while the guest relations manager emphasises personalised attention.", null],
    ["Both interpretations seem reasonable, yet they could produce different investments, staffing decisions, and expectations for employees.", iss("Different managers interpret the same strategic objective differently.", "An unclear improvement mandate")],
    ["This is where strategic intent must become operationally meaningful, connecting organisational ambitions with measurable process outcomes.", null],
    ["Strategic intent describes the direction an organisation wants to pursue and the competitive position it hopes to establish.", st("Strategic intent expresses what the organisation wants to achieve, while process measures show whether its operations support that ambition.")],
    ["A process measure is an observable indicator used to understand how well a particular process performs.", null],
    ["For Qasr's arrival process, relevant measures might include waiting time, booking accuracy, and guests' reported arrival experience.", dg("Making service leadership measurable", D.flow(["Service|leadership", "Guest arrival|experience", "Waiting time|and accuracy", "Guest|feedback"]), "Qasr can connect its service ambition to observable features of the guest arrival process.")],
    ["Notice that these measures capture different aspects of performance, because a fast arrival is not necessarily a welcoming one.", null],
    ["A receptionist might reduce waiting time by rushing conversations, while guests leave feeling ignored or poorly informed.", iss("Shorter waiting times could conceal a deterioration in the personal service guests value.", "A misleading success signal")],
    ["That is why managers need a balanced interpretation of success rather than relying on one convenient efficiency indicator.", null],
    ["Now consider Qasr's objective of reducing cost per occupied room by ten percent across its operations.", null],
    ["Cost per occupied room relates relevant operating expenditure to the number of rooms actually occupied during the measurement period.", fm("Cost per occupied room", "Relevant operating cost / Occupied room-nights", "The measure relates operating expenditure to occupied room-nights, making cost performance interpretable against hotel activity.")],
    ["The measure matters because total spending alone can change when occupancy rises or falls, even without process improvement.", null],
    ["Managers should therefore establish a baseline, meaning the documented starting performance against which later results are compared.", st("A baseline records starting performance, while a target specifies the improvement the organisation intends to achieve.")],
    ["For example, an illustrative baseline of four hundred dirhams would imply a target of three hundred sixty.", null],
    ["The calculation expresses Qasr's ten percent reduction objective, although actual targets require verified financial and occupancy data.", fm("Illustrative ten percent reduction", "400 × (1 - 0.10) = 360 AED", "An illustrative baseline of 400 AED per occupied room produces a target of 360 AED after a ten percent reduction.")],
    ["Yet achieving that financial target would not automatically justify changes that seriously damage Qasr's service leadership ambition.", null],
    ["The measures must therefore reveal important trade-offs rather than encourage managers to optimise one objective in isolation.", q("What additional evidence would you examine before celebrating a reduction in room operating costs?")],
    ["Qasr's corporate growth objective introduces another challenge, because increasing accounts differs from improving the processes serving those accounts.", null],
    ["Managers might examine quotation turnaround, contract accuracy, and billing disputes to identify barriers affecting corporate relationships.", dg("Connecting growth to process performance", D.flow(["Corporate|growth 25%", "Sales and|contracting", "Quotation|turnaround", "Billing|accuracy"]), "Measures of quotation turnaround and billing accuracy can help diagnose processes supporting Qasr's corporate-account growth objective.")],
    ["These indicators do not replace the twenty-five percent growth objective, but help explain whether operational changes support it.", null],
    ["A useful distinction emerges between strategic outcome measures and process performance measures that may influence those outcomes.", cmp("a", "Strategic outcome", "Corporate-account growth indicates whether Qasr is achieving its commercial ambition.")],
    ["Outcome measures describe organisational results, while process measures reveal aspects of work that managers can investigate and improve.", cmp("b", "Process performance", "Quotation turnaround and billing accuracy indicate how supporting processes are performing.")],
    ["The relationship between them should be tested rather than assumed, because several factors can influence strategic results.", null],
    ["Managers must also agree who owns each measure, where its data comes from, and how frequently performance is reviewed.", st("A useful measure needs a clear definition, a credible data source, an accountable owner, and an agreed review period.")],
    ["Without those arrangements, departments might report incompatible figures and mistake differences in measurement for genuine performance changes.", null],
    ["Qasr's steering group can now discuss improvement proposals using evidence connected to its three published strategic objectives.", null],
    ["That preparation matters because the next decision concerns which processes deserve attention when the budget cannot support everything.", q("Can you connect a strategic ambition to a meaningful process measure without confusing activity with organisational success?")]
  ],
  review: [
    {
      title: "A restaurant that wants customers to return",
      lines: [
        ["Let's explore strategic intent through a restaurant whose owners want customers to return regularly rather than visit only once.", t("Alternative explanation · The restaurant", "A restaurant translates its customer-loyalty ambition into measures of the dining experience.")],
        ["The owners describe their ambition as building lasting customer relationships through consistently enjoyable meals and attentive service.", null],
        ["That sounds encouraging, but the kitchen manager and service manager interpret the ambition in different ways.", iss("The kitchen manager values preparation speed, while the service manager emphasises attentive interactions.", "One ambition, different interpretations")],
        ["The kitchen manager proposes measuring preparation time, believing faster meals will encourage customers to visit more frequently.", null],
        ["The service manager prefers measuring complaints, believing customers return when employees respond thoughtfully to their needs.", null],
        ["Both measures offer useful information, but neither establishes customer loyalty without examining actual customer behaviour.", q("How could the restaurant tell whether faster preparation genuinely encourages customers to return?")],
        ["The owners therefore distinguish their desired strategic outcome from the process performance that might help achieve it.", null],
        ["Their strategic outcome concerns repeat visits, while supporting measures could include preparation time and order accuracy.", dg("Connecting restaurant strategy to measures", D.flow(["Customer|loyalty", "Dining|experience", "Preparation|time", "Order|accuracy"]), "Preparation time and order accuracy help managers investigate operational factors that may influence repeat visits.")],
        ["Customer feedback would add another perspective, because speed and accuracy cannot fully capture the quality of hospitality.", null],
        ["Together, these indicators help managers investigate whether process changes improve the experience customers actually receive.", null],
        ["Now imagine the kitchen introduces equipment that reduces preparation time but causes meals to arrive inconsistently cooked.", iss("Preparation becomes faster, but inconsistent food quality could undermine the restaurant's loyalty ambition.", "An incomplete performance picture")],
        ["Celebrating the faster preparation time alone would confuse an operational achievement with the restaurant's strategic success.", null],
        ["A more balanced assessment would examine preparation speed alongside food quality, complaints, and subsequent customer behaviour.", st("Process measures should help explain strategic outcomes rather than substitute for those outcomes.")],
        ["The restaurant also needs a baseline, meaning a reliable record of performance before introducing the equipment.", null],
        ["Without that starting point, managers cannot confidently determine whether observed changes represent genuine improvement.", null],
        ["They should define how each measure is collected, because inconsistent recording can create misleading comparisons.", fm("Repeat-visit rate", "Returning customers / Identified customers × 100", "A consistently defined repeat-visit rate can indicate whether the restaurant is strengthening customer loyalty over an agreed period.")],
        ["For example, the restaurant must decide which customers qualify as returning and what observation period applies.", null],
        ["Those definitions matter because changing the measurement rules could make performance appear better without changing customer behaviour.", null],
        ["This is the practical purpose of translating strategic intent into measures that employees can understand and managers can verify.", null],
        ["The same reasoning applies at Qasr, where service leadership requires more evidence than shorter reception queues.", q("Which combination of measures would help you judge whether an improvement strengthens customer loyalty?")]
      ]
    },
    {
      title: "A hospital measuring the patient journey",
      lines: [
        ["Imagine a hospital whose strategic ambition is to improve patients' experience while maintaining safe and dependable clinical care.", t("Alternative explanation · The hospital", "A hospital uses patient-journey measures to connect its strategic ambition with everyday operations.")],
        ["Hospital leaders agree that patients should experience coordinated care, but the ambition remains too broad for process improvement.", null],
        ["The outpatient manager suggests reducing waiting time, while the nursing manager emphasises reliable communication about treatment plans.", iss("Hospital departments propose different measures for the same patient-experience ambition.", "Translating strategy into practice")],
        ["Neither manager is necessarily mistaken, because patients experience the hospital through several connected activities and interactions.", null],
        ["However, improving one activity does not guarantee that the complete patient journey becomes safer or more satisfactory.", q("Would shorter waiting times establish success if patients still received confusing treatment instructions?")],
        ["The hospital therefore needs measures that reveal whether operational performance supports its broader strategic purpose.", null],
        ["Waiting time can indicate how efficiently patients move through registration, assessment, and consultation activities.", null],
        ["Communication quality can reveal whether patients understand what happens next and how to follow their treatment instructions.", dg("Measuring the patient journey", D.flow(["Patient|experience", "Registration|and assessment", "Consultation|and guidance", "Patient|understanding"]), "The hospital can examine waiting times and patient understanding to assess different aspects of the outpatient journey.")],
        ["Safety indicators remain essential because an apparently pleasant experience cannot compensate for preventable clinical harm.", null],
        ["These measures serve different purposes, so managers should avoid treating any single indicator as complete evidence.", cmp("a", "Process performance", "Waiting time and communication measures reveal how particular activities are working.")],
        ["A strategic outcome might concern overall patient experience, while process measures help explain its possible causes.", cmp("b", "Strategic outcome", "Patient-experience results indicate whether the hospital is achieving its broader service ambition.")],
        ["Now suppose managers introduce digital registration and discover that average waiting time decreases after implementation.", null],
        ["That result is encouraging, but they still need to establish whether the change benefits patients consistently.", null],
        ["Some older patients might struggle with digital forms, creating difficulties that average waiting times conceal.", iss("Average waiting time improves, but some patients experience new registration difficulties.", "A hidden trade-off")],
        ["The hospital should therefore examine accessibility and variation alongside its overall performance measures before declaring success.", null],
        ["It also needs a baseline, which records the situation before the registration process was changed.", null],
        ["A target then describes the intended improvement, allowing managers to compare results against an agreed expectation.", st("Baselines establish starting performance, targets define intended results, and consistent measurement makes comparisons meaningful.")],
        ["Reliable data collection matters because different departments might otherwise measure waiting time from different starting points.", null],
        ["One department might begin at arrival, while another begins only after patients complete their registration.", null],
        ["Those figures cannot support fair comparisons unless the hospital establishes a common definition and measurement method.", null],
        ["An accountable process owner should therefore ensure that results are reviewed and interpreted alongside patient feedback.", dg("A reliable measurement arrangement", D.flow(["Define|measure", "Record|baseline", "Agree|target", "Review|evidence"]), "Consistent definitions, verified baselines, agreed targets, and accountable reviews make process measures useful for strategic decisions.")],
        ["Remember that measurement is not merely about producing numbers, but about understanding whether operational changes support organisational purpose.", null],
        ["At Qasr, the same discipline will help managers distinguish genuine strategic progress from isolated improvements.", q("Can you explain why a process measure needs both a clear definition and a connection to strategic purpose?")]
      ]
    }
  ]
},
{
  title: "Making strategic objectives usable",
  sec: "W5O1c",
  lines: [
    ["Qasr's steering group now has meaningful measures, but those measures still need to guide actual improvement decisions.", t("Making strategic objectives usable", "A strategic objective becomes actionable when managers agree what it means for process improvement decisions.")],
    ["The challenge is turning strategic ambitions into instructions that different departments can interpret consistently and apply confidently.", null],
    ["Imagine the steering group meeting again, with proposals arriving from reception, housekeeping, finance, and corporate sales.", q("How can Qasr make consistent decisions when every department believes its improvement deserves attention?")],
    ["The directors agree that service leadership matters, yet they disagree about what protecting that ambition requires.", null],
    ["The reception director wants additional guest-facing staff, while finance proposes reducing labour costs through greater automation.", iss("Both directors claim strategic alignment, but their proposals imply different operational priorities.", "Agreement is not yet enough")],
    ["Their disagreement reveals why strategic objectives need practical interpretation before they can guide investment and redesign.", null],
    ["A usable objective specifies the desired result, its boundaries, and the evidence needed to judge progress.", st("A usable strategic objective clarifies the intended result, measurement basis, decision boundaries, and accountable authority.")],
    ["Consider Qasr's ambition to achieve the highest regional service rating, which requires an agreed basis for comparison.", null],
    ["Managers must establish which rating evidence matters, which competitors define the region, and when performance will be assessed.", dg("Clarifying service leadership", D.flow(["Service|ambition", "Rating|definition", "Comparison|basis", "Review|period"]), "Qasr must define its service rating and comparison basis before managers can assess progress toward regional leadership.")],
    ["Without those definitions, departments could report different versions of success while believing they serve the same strategy.", null],
    ["The steering group also needs to identify which process characteristics most strongly influence the intended customer experience.", null],
    ["For guest arrivals, reliability, clear communication, and appropriate personal attention may matter alongside waiting time.", dg("From objective to improvement criteria", D.flow(["Service|leadership", "Guest|expectations", "Arrival|requirements", "Improvement|criteria"]), "Guest expectations help translate Qasr's service ambition into criteria for evaluating arrival-process improvements.")],
    ["These characteristics become evaluation criteria, meaning agreed standards used to judge whether a proposed change is suitable.", null],
    ["A proposal that shortens queues but creates confusion would therefore require further investigation before receiving approval.", q("Would you approve faster check-in if guests became less confident about their reservations?")],
    ["Now consider the ten percent reduction in cost per occupied room, which also requires careful interpretation.", null],
    ["Finance must agree which costs belong in the calculation and how occupancy information will be verified.", fm("Cost reduction objective", "Target cost = Baseline cost × 0.90", "The ten percent reduction target must use a consistent cost definition and a verified baseline.")],
    ["Otherwise, apparent savings could result from changed accounting rules rather than genuine improvements in operating performance.", null],
    ["The steering group must also decide whether proposed savings are acceptable when they threaten important service outcomes.", iss("A cheaper process may conflict with Qasr's service leadership ambition.", "Strategic boundaries")],
    ["This introduces a strategic constraint, meaning a condition that an improvement must respect even when offering attractive benefits.", null],
    ["For example, management might require proposed cost reductions to preserve agreed guest-service standards before considering implementation.", st("Strategic constraints protect important organisational objectives when improvement proposals create competing benefits and risks.")],
    ["That requirement would be a proposed decision rule, not an established Qasr policy until its sponsors approve it.", null],
    ["The corporate growth objective requires similar discipline because increasing accounts depends on several connected organisational activities.", null],
    ["Sales, contracting, reservations, and billing must understand how their work contributes to the twenty-five percent growth ambition.", dg("Making corporate growth actionable", D.flow(["Corporate|growth 25%", "Sales and|contracting", "Reservations|and delivery", "Billing and|relationships"]), "Qasr's corporate growth ambition requires coordination across processes that attract, serve, and retain business customers.")],
    ["An improvement that accelerates quotations might support growth, but managers should examine whether it also preserves contract accuracy.", null],
    ["This is why usable objectives need both supporting measures and safeguards against unintended consequences.", null],
    ["They also need sponsors, meaning senior leaders authorised to resolve disagreements and approve strategic priorities.", st("A strategic sponsor provides authority for interpreting objectives, resolving conflicts, and approving the boundaries of improvement work.")],
    ["Process owners can recommend changes, but they should not independently decide which organisational ambition deserves priority.", null],
    ["At Qasr, the steering group must therefore agree how competing objectives influence the programme's investment decisions.", cmp("a", "Ambiguous objective", "Managers interpret success differently and defend proposals using departmental preferences.")],
    ["The resulting criteria should be documented so that proposals can be evaluated consistently rather than negotiated repeatedly.", cmp("b", "Usable objective", "Managers apply agreed measures, strategic constraints, and authorised decision criteria.")],
    ["These criteria will not eliminate judgement, because strategic benefits and trade-offs cannot always be reduced to numbers.", null],
    ["They will, however, make judgement more transparent and help explain why some worthwhile improvements must wait.", st("Decision criteria support sponsor judgement; they do not replace it with an automatic numerical ranking.")],
    ["Qasr can now move beyond describing ambitions and begin comparing proposals against an agreed strategic interpretation.", null],
    ["The next lesson will examine that choice directly, because the programme can fund only two proposed improvements.", q("Can you explain what evidence and decision rules would make a strategic objective genuinely usable?")]
  ],
  review: [
    {
      title: "A public transport operator defining reliability",
      lines: [
        ["Let's approach usable strategic objectives through a public transport operator promising passengers a more reliable daily journey.", t("Alternative explanation · Public transport", "A transport operator must define reliability before it can evaluate improvement proposals consistently.")],
        ["Its executives agree that reliability matters, but different departments attach different meanings to that commitment.", null],
        ["The scheduling manager interprets reliability as buses departing on time, while passengers care about reaching destinations predictably.", iss("Departure punctuality and passenger arrival reliability are related but different performance expectations.", "One objective, competing interpretations")],
        ["Both perspectives matter, yet measuring departures alone could conceal delays that passengers experience later in their journeys.", null],
        ["The organisation therefore needs a clearer definition of the outcome its strategic promise is intended to deliver.", q("Would passengers consider the service reliable if buses departed punctually but regularly arrived late?")],
        ["Executives might define reliability using arrival punctuality at important destinations, supported by consistent measurement rules.", null],
        ["They must also agree which journeys count, what tolerance applies, and how disruptions affect reported performance.", dg("Defining a usable reliability objective", D.flow(["Reliable|journeys", "Arrival|punctuality", "Agreed|tolerance", "Verified|records"]), "The operator must agree how arrival punctuality is defined and recorded before using it to assess reliability.")],
        ["Those details matter because departments cannot make consistent improvement decisions when they measure success differently.", null],
        ["Now imagine the maintenance department proposes reducing vehicle inspection time to increase the number of available buses.", null],
        ["The proposal could improve operational capacity, but managers must examine whether shorter inspections threaten service reliability.", iss("Shorter inspections could increase vehicle availability while creating additional risks of unexpected breakdowns.", "An important constraint")],
        ["A usable strategic objective helps managers evaluate that risk against the reliability customers have been promised.", null],
        ["The operator might require evidence that inspection changes preserve safety and dependable vehicle performance before granting approval.", st("A usable objective provides evaluation criteria and constraints that proposed process improvements must satisfy.")],
        ["Notice that this requirement does not automatically reject efficiency improvements or prevent managers from investigating alternatives.", null],
        ["It establishes the conditions under which efficiency gains would remain consistent with the organisation's strategic purpose.", null],
        ["The maintenance manager might instead investigate improved inspection scheduling that reduces delays without compromising inspection quality.", dg("Evaluating an aligned alternative", D.flow(["Reliability|objective", "Inspection|proposal", "Safety and|performance", "+Sponsor|decision"]), "An improvement proposal should demonstrate how it supports reliability while respecting safety and performance constraints.")],
        ["Senior sponsors must approve the relevant criteria because disagreements about organisational priorities extend beyond individual departments.", null],
        ["Their authority matters when a financially attractive proposal creates risks for another strategically important objective.", null],
        ["The agreed criteria should also be documented, allowing later teams to understand why particular changes received approval.", st("Documented criteria make strategic decisions understandable, consistent, and accountable across organisational departments.")],
        ["This is what makes an objective usable rather than merely inspiring, because it can guide actual operational choices.", null],
        ["At Qasr, the same reasoning applies when managers interpret service leadership and evaluate proposals affecting guest experience.", q("What definitions and constraints would you establish before approving an improvement intended to increase transport reliability?")]
      ]
    },
    {
      title: "A retailer turning sustainability into decisions",
      lines: [
        ["Imagine a regional retailer announcing that environmental sustainability will become a central part of its organisational strategy.", t("Alternative explanation · Sustainable retail", "A retailer must translate its sustainability ambition into measurable expectations and practical investment criteria.")],
        ["Employees welcome the announcement, but purchasing, logistics, and store operations propose very different improvement projects.", null],
        ["Purchasing wants recyclable packaging, logistics proposes fewer delivery journeys, and store managers recommend energy-efficient refrigeration equipment.", iss("Three departments propose different improvements under the same sustainability ambition.", "Strategic ambiguity")],
        ["Each proposal could offer environmental benefits, but the retailer cannot assume they contribute equally to its ambition.", null],
        ["Managers therefore need an agreed interpretation of sustainability before deciding where limited investment should go.", q("How could the retailer compare environmental proposals without relying entirely on departmental enthusiasm?")],
        ["The executive team might clarify that reducing operational greenhouse gas emissions is its immediate strategic priority.", null],
        ["That decision narrows the objective because it identifies the particular environmental outcome the organisation intends to improve.", null],
        ["Managers must then define the emissions covered, the reporting period, and the evidence used to measure progress.", dg("Clarifying the sustainability objective", D.flow(["Sustainability|ambition", "Operational|emissions", "Measurement|boundary", "Verified|performance"]), "The retailer makes sustainability more actionable by defining the emissions outcome and the measurement boundaries.")],
        ["Without those definitions, departments might report incompatible savings or claim improvements that fall outside the agreed scope.", null],
        ["The retailer also needs a baseline showing emissions before changes begin and a target describing intended progress.", null],
        ["Those elements make results assessable, but investment decisions still require evidence about individual proposals and their consequences.", st("An actionable objective combines a defined outcome, reliable measurement, and agreed criteria for evaluating improvement proposals.")],
        ["Suppose logistics proposes consolidating deliveries, expecting fewer journeys and lower fuel consumption across the distribution network.", null],
        ["The proposal appears aligned, but managers should examine whether larger loads increase spoilage or create additional handling requirements.", iss("Delivery consolidation may reduce journeys while creating other environmental and operational consequences.", "A possible unintended effect")],
        ["Those consequences matter because a narrow improvement could shift environmental impacts elsewhere rather than reduce them overall.", null],
        ["The retailer should therefore assess the proposal within its agreed measurement boundaries and operational constraints.", cmp("a", "Weak evaluation", "Approve delivery consolidation because fewer journeys appear environmentally beneficial.")],
        ["This approach does not demand perfect information, but it requires managers to acknowledge uncertainty before making commitments.", cmp("b", "Strategically grounded evaluation", "Examine verified emissions effects, operational consequences, and consistency with agreed sustainability priorities.")],
        ["Senior sponsors must also decide how sustainability should be balanced against service availability and financial viability.", null],
        ["Their involvement is necessary because individual process owners cannot independently settle disagreements about organisational priorities.", null],
        ["Once approved, these criteria give departments a consistent basis for developing and defending improvement proposals.", dg("From ambition to investment criteria", D.flow(["Defined|objective", "Evidence|requirements", "Strategic|constraints", "+Investment|decision"]), "Agreed evidence requirements and strategic constraints help the retailer make defensible investment decisions.")],
        ["Remember that numerical estimates can inform these decisions, but they cannot replace accountable managerial judgement about trade-offs.", null],
        ["The same principle will guide Qasr when its steering group compares improvements serving different strategic objectives.", q("Can you explain how a broad sustainability ambition becomes a practical rule for evaluating competing process improvements?")]
      ]
    }
  ]
},
      ] },
      { id: "l2", title: "Choosing improvements that serve the strategy", sections: [
{
  title: "Tracing proposals to strategic objectives",
  sec: "W5O2a",
  lines: [
    ["Qasr's steering group has clarified its strategic objectives, and department managers are now preparing their improvement proposals.", t("Tracing proposals to strategic objectives", "Every improvement proposal should demonstrate how its expected process changes contribute to an agreed strategic objective.")],
    ["The challenge is no longer understanding strategy, but establishing whether proposed changes genuinely contribute to achieving it.", null],
    ["Let's imagine the reception manager presenting an automated check-in proposal, promising shorter queues and lower staffing requirements.", q("Which of Qasr's strategic objectives would automated check-in actually support?")],
    ["The manager immediately claims that automation supports service leadership because guests will spend less time waiting.", null],
    ["Finance welcomes the same proposal because reducing routine reception work might also lower operating costs.", iss("One improvement proposal claims benefits for both service leadership and cost reduction.", "Multiple alignment claims")],
    ["Both claims are plausible, but plausibility alone cannot establish that the proposed investment deserves strategic priority.", null],
    ["The steering group needs traceability, meaning a clear explanation connecting proposed changes with specific organisational objectives.", st("Strategic traceability connects a proposed process change, its expected performance effects, and the organisational objective it should support.")],
    ["For automated check-in, the proposed change involves allowing eligible guests to complete routine arrival formalities digitally.", null],
    ["The expected process effect might be shorter waiting times, particularly during periods of concentrated guest arrivals.", dg("Tracing the check-in proposal", D.flow(["Digital|check-in", "Shorter|queues", "Better arrival|experience", "Service|leadership"]), "Automated check-in could support service leadership if shorter queues genuinely improve the arrival experience guests value.")],
    ["The strategic contribution depends on whether those shorter waits improve guest experience rather than merely processing speed.", null],
    ["Some guests may appreciate independence, while others may need reassurance or personalised assistance during arrival.", iss("Automation could reduce waiting while weakening the personal attention expected by some guests.", "An uncertain strategic benefit")],
    ["The proposal therefore needs evidence about customer preferences and service outcomes before its alignment can be judged confidently.", null],
    ["Notice how this reasoning differs from simply attaching the phrase service leadership to a technology investment.", null],
    ["A convincing proposal explains the mechanism, meaning how the operational change is expected to produce strategic value.", st("A strategic alignment claim needs a credible mechanism, relevant evidence, and recognition of possible unintended consequences.")],
    ["Now consider the finance director's claim that automated check-in will support Qasr's ten percent cost reduction objective.", null],
    ["Lower staffing requirements might reduce expenditure, but software licensing, maintenance, and employee support also create costs.", cmp("a", "Claimed benefit", "Automated check-in could reduce routine reception labour and associated operating expenditure.")],
    ["The relevant question concerns the net effect, meaning the savings remaining after accounting for additional operating expenses.", cmp("b", "Evidence required", "Estimate labour savings alongside software, maintenance, training, and support costs.")],
    ["Even a positive financial estimate requires comparison with Qasr's agreed definition of cost per occupied room.", null],
    ["Otherwise, the steering group might approve an apparently attractive saving that contributes little to its published objective.", q("What evidence would convince you that automation genuinely reduces cost per occupied room?")],
    ["Tracing proposals also requires managers to distinguish direct contributions from indirect or uncertain strategic relationships.", null],
    ["An improvement directly affecting billing accuracy may support corporate relationships more clearly than faster housekeeping scheduling.", dg("Different strengths of strategic connection", D.flow(["Proposed|change", "Expected|process effect", "Strategic|contribution", "Evidence|confidence"]), "Managers should distinguish the expected process effect from the strength and credibility of its strategic contribution.")],
    ["However, even a direct relationship does not guarantee a large benefit, because actual performance depends on implementation.", null],
    ["The steering group should therefore examine the strength of each connection without pretending every judgement is mathematically precise.", st("Alignment strength describes how convincingly an improvement supports an objective; it is not automatically a financial return.")],
    ["A proposal can also support one objective while creating risks for another, making trade-offs essential to evaluation.", null],
    ["For example, automated check-in could reduce labour costs while weakening the personal service experience Qasr wants recognised.", iss("An improvement may support one strategic objective while creating risks for another.", "Conflicting contributions")],
    ["Managers should document these competing effects rather than conceal them behind a single favourable alignment label.", null],
    ["This creates a transparent basis for comparing proposals when strategic objectives compete for the same investment budget.", null],
    ["Sponsors remain responsible for deciding which contributions matter most, because alignment evidence cannot establish priorities independently.", st("Strategic alignment analysis informs sponsor judgement; it does not replace decisions about organisational priorities and acceptable trade-offs.")],
    ["Qasr's steering group can now ask each proposer to explain the operational change and its strategic consequences.", null],
    ["The resulting evidence will help compare four improvement proposals competing for funding that can support only two.", q("Can you trace a proposal from its operational change to strategic value while recognising uncertainty and competing effects?")]
  ],
  review: [
    {
      title: "A courier company choosing a tracking system",
      lines: [
        ["Let's practise strategic traceability through a courier company whose competitive promise is dependable delivery information for customers.", t("Alternative explanation · Courier tracking", "A courier company must show how a technology proposal contributes to its strategic promise of dependable delivery information.")],
        ["The company wants customers to trust its delivery updates, especially when important packages encounter unexpected delays.", null],
        ["Its technology manager proposes installing a new tracking platform that records vehicle locations more frequently.", iss("The proposed tracking platform produces more location updates, but its strategic contribution remains uncertain.", "Technology versus customer value")],
        ["The manager argues that more frequent location updates will automatically improve customer trust and satisfaction.", null],
        ["That sounds reasonable, but the steering group should examine the steps connecting technology performance with customer outcomes.", q("Why would collecting more location data necessarily make customers trust delivery information?")],
        ["The proposed operational change involves capturing vehicle positions more frequently and updating delivery estimates using those records.", null],
        ["The expected process effect is improved information about package movements and potentially more accurate arrival predictions.", dg("Tracing the tracking proposal", D.flow(["Frequent|location data", "Better arrival|estimates", "Useful customer|updates", "Customer|trust"]), "The tracking platform supports the company's strategy only if additional location data improves information customers can use.")],
        ["The strategic contribution would emerge if customers received dependable updates that helped them plan around delivery uncertainty.", null],
        ["However, more frequent updates could become confusing if estimated arrival times changed repeatedly without useful explanations.", iss("More information could reduce confidence if customers receive unstable or contradictory delivery estimates.", "An unintended consequence")],
        ["The steering group should therefore request evidence about prediction accuracy and customers' understanding of delivery notifications.", null],
        ["This evidence tests the proposed mechanism, meaning the explanation connecting operational change with expected strategic value.", st("A convincing alignment claim explains how a proposed change produces an outcome that matters to organisational strategy.")],
        ["Now imagine another manager proposing improved procedures for reporting delivery exceptions, such as vehicle breakdowns or inaccessible addresses.", null],
        ["That proposal might generate fewer technology updates while providing clearer explanations when deliveries cannot proceed as planned.", cmp("a", "Tracking platform", "Potentially improves delivery estimates through more frequent vehicle-location information.")],
        ["Both proposals could support customer trust, but their contributions depend on different assumptions and implementation conditions.", cmp("b", "Exception reporting", "Potentially improves customer understanding when unexpected delivery problems occur.")],
        ["The company should examine these differences instead of assuming that the more technologically sophisticated proposal deserves funding.", null],
        ["Managers should also consider costs and operational risks, because useful customer information must remain financially sustainable.", null],
        ["A strategic connection can be strong without proving that a proposal offers the greatest overall investment value.", st("Strategic alignment and investment attractiveness are related considerations, but they are not identical judgements.")],
        ["The company's sponsors must decide which proposal best serves its priorities after examining the available evidence.", null],
        ["Their decision should document why the selected improvement offers a credible contribution to dependable customer information.", null],
        ["At Qasr, the same reasoning helps evaluate whether automated check-in genuinely advances service leadership or merely introduces technology.", q("Can you explain the complete connection between a proposed technology change and the strategic benefit it promises?")]
      ]
    },
    {
      title: "A manufacturer testing an energy-saving proposal",
      lines: [
        ["Imagine a regional manufacturer whose strategy includes reducing production costs while maintaining consistently reliable product quality.", t("Alternative explanation · Manufacturing efficiency", "A manufacturer must examine both strategic benefits and risks when evaluating an energy-saving improvement.")],
        ["Its production manager proposes operating industrial ovens at lower temperatures to reduce electricity consumption during manufacturing.", null],
        ["The manager expects lower energy expenditure and argues that the proposal directly supports the cost reduction objective.", iss("Lower oven temperatures could reduce energy costs but might also affect product quality.", "A strategic trade-off")],
        ["The connection appears straightforward because electricity is a genuine operating expense included in production costs.", null],
        ["However, the proposal must be assessed against the manufacturer's quality commitments rather than judged through energy savings alone.", q("Would lower electricity costs represent success if more finished products failed quality inspection?")],
        ["The steering group should trace the operational change through its expected effects before deciding whether implementation is justified.", null],
        ["Lower temperatures might reduce electricity consumption, but they could also increase processing time or produce inconsistent results.", dg("Tracing the energy-saving proposal", D.flow(["Lower oven|temperature", "Energy|consumption", "Production|cost", "Quality|requirements"]), "The proposed temperature change must demonstrate cost benefits while preserving the product quality required by strategy.")],
        ["Those possible consequences matter because the relevant strategic outcome concerns overall production performance, not electricity consumption alone.", null],
        ["The company therefore needs evidence from controlled trials rather than relying entirely on the manager's initial expectations.", null],
        ["Trial results could reveal energy savings alongside changes in processing duration, rejection rates, and equipment utilisation.", st("A proposal's strategic contribution depends on its combined effects, not merely the operational indicator it directly changes.")],
        ["Suppose the trial shows lower electricity consumption but also reveals a noticeable increase in rejected products.", null],
        ["The manager should then investigate whether wasted materials and additional processing offset the apparent financial savings.", iss("Energy savings may be cancelled by increased waste, rework, and quality failures.", "The net strategic effect")],
        ["This illustrates why tracing a proposal requires examining both intended benefits and possible consequences elsewhere in the process.", null],
        ["The steering group might compare the temperature proposal with improved equipment scheduling that reduces unnecessary heating periods.", cmp("a", "Lower operating temperature", "Potential energy savings accompanied by uncertainty about processing time and product quality.")],
        ["The scheduling alternative might preserve established production conditions while reducing electricity consumed during idle periods.", cmp("b", "Improved equipment scheduling", "Potential energy savings without deliberately changing the established production temperature.")],
        ["Neither proposal should receive automatic approval, because each requires evidence about costs, feasibility, and operational consequences.", null],
        ["The manufacturer's strategic priorities provide the basis for interpreting that evidence and identifying acceptable trade-offs.", null],
        ["A proposal with impressive savings could still be unsuitable if it undermines the quality customers expect.", st("Strategic traceability requires evaluating positive contributions and conflicting effects against the organisation's agreed objectives.")],
        ["Senior sponsors must decide whether the evidence justifies investment, rather than allowing departmental savings targets to determine priorities.", null],
        ["Their judgement should remain transparent, explaining which strategic objectives the selected proposal supports and which risks remain.", null],
        ["This is the discipline Qasr needs when comparing proposals that promise different combinations of service, cost, and growth.", q("Can you identify both the strategic contribution and the possible conflicting effects of an apparently efficient improvement?")]
      ]
    }
  ]
},
{
  title: "Qasr's three strategies and four proposals",
  sec: "W5O2b",
  lines: [
    ["The steering group now has a method for tracing improvement proposals, and Qasr's actual investment decision is approaching.", t("Qasr's three strategies and four proposals", "Four genuine improvement opportunities compete for a budget that can fund only two.")],
    ["Four directors have submitted proposals, but the programme can fund only two process improvements this year.", null],
    ["The programme director has brought everyone together to examine the evidence before departmental preferences dominate the discussion.", q("Which two improvements should Qasr fund, and what evidence would justify that choice?")],
    ["Remember that Qasr wants regional service leadership, a ten percent reduction in cost per occupied room, and corporate growth.", null],
    ["Its corporate growth target is twenty-five percent, creating another important consideration when comparing competing improvement proposals.", dg("Qasr's strategic commitments", D.flow(["Highest regional|service rating", "Cost per room|down 10%", "Corporate accounts|up 25%"]), "Qasr must evaluate every proposed improvement against its three published strategic objectives.")],
    ["The programme director presents Exhibit Five, which compares each proposal's contribution to those three objectives.", null],
    ["The relationships are classified as none, weak, moderate, or strong, reflecting their assessed strategic alignment.", st("Exhibit Five records the assessed strength of each proposal's relationship with Qasr's three strategic objectives.")],
    ["These categories describe strategic connections, not guaranteed financial returns or precisely measured implementation benefits.", null],
    ["Let's examine the evidence carefully, because the pattern matters more than any director's confidence.", q("Which proposal supports several strategic objectives rather than concentrating its benefits in one area?")],
    ["Redesigning guest arrival has strong alignment with service leadership and strong alignment with corporate growth.", null],
    ["Its relationship with cost reduction is moderate, giving this proposal a comparatively broad strategic contribution.", dg("Redesign guest arrival", D.flow(["Service|strong", "Cost|moderate", "Corporate growth|strong"]), "Exhibit Five rates guest arrival redesign as strong for service, moderate for cost, and strong for corporate growth.")],
    ["This makes sense because dependable arrivals can improve guest experiences and strengthen relationships with business travellers.", null],
    ["However, the cost contribution still requires evidence, since better service does not automatically reduce operating expenditure.", st("Guest arrival redesign has broad strategic alignment, but its expected benefits still require validation.")],
    ["Now consider automating stock counting, which the operations director believes will eliminate unnecessary manual work.", null],
    ["Exhibit Five rates its cost contribution as moderate, with no assessed contribution to service or corporate growth.", dg("Automate stock counting", D.flow(["Service|none", "Cost|moderate", "Corporate growth|none"]), "Exhibit Five identifies a moderate cost connection for stock counting and no connection to the other objectives.")],
    ["The proposed saving may be genuine, but its strategic contribution is narrower than the director suggests.", null],
    ["That distinction matters because operational savings alone do not establish priority when funding is scarce.", q("Should Qasr fund a genuine saving when other proposals support more of its strategic ambitions?")],
    ["Corporate billing offers a different pattern, with strong alignment to corporate growth and moderate alignment to service.", null],
    ["Its cost relationship is weak, so the steering group should avoid presenting billing redesign primarily as an efficiency initiative.", dg("Rebuild corporate billing", D.flow(["Service|moderate", "Cost|weak", "Corporate growth|strong"]), "Exhibit Five rates corporate billing as moderate for service, weak for cost, and strong for corporate growth.")],
    ["Accurate, understandable invoices could strengthen business relationships by reducing disputes and making corporate accounts easier to manage.", null],
    ["That provides a credible strategic mechanism, although its actual contribution to growth must still be demonstrated.", st("Corporate billing has a strong strategic connection to growth, but alignment does not guarantee the intended outcome.")],
    ["The remaining proposal concerns refitting the spa booking system, supported by the director controlling the programme budget.", null],
    ["Its service contribution is moderate, while Exhibit Five identifies no contribution to cost reduction or corporate growth.", dg("Refit spa booking", D.flow(["Service|moderate", "Cost|none", "Corporate growth|none"]), "Exhibit Five rates the spa booking refit as moderate for service and none for the other objectives.")],
    ["The improvement may benefit spa customers, but sponsorship authority cannot substitute for evidence of strategic priority.", null],
    ["This creates a governance challenge, because influential directors must face the same evaluation criteria as everyone else.", iss("The spa proposal's sponsor controls the budget, but its strategic alignment remains limited.", "Influence versus evidence")],
    ["We can now compare all four proposals without pretending that their benefits are identical or equally certain.", null],
    ["Guest arrival and corporate billing show broader alignment, while stock counting and spa booking have narrower contributions.", cmp("a", "Broader alignment", "Guest arrival supports service strongly, cost moderately, and growth strongly; corporate billing supports growth strongly, service moderately, and cost weakly.")],
    ["But broader alignment is not automatically decisive, because sponsors must also consider strategic priorities and implementation risks.", cmp("b", "Narrower alignment", "Stock counting supports cost moderately; spa booking supports service moderately, with no other assessed connections.")],
    ["Exhibit Five provides a defensible starting point, not an automatic formula for selecting the winning proposals.", null],
    ["The steering group must explain its priorities and acknowledge what the organisation sacrifices when it funds only two.", st("Qualitative alignment evidence informs the decision, while accountable sponsors determine priorities and acceptable trade-offs.")],
    ["In our next discussion, you will use this evidence to defend a funding decision under Qasr's resource constraints.", q("Which two proposals would you recommend, and which strategic trade-offs would your recommendation create?")]
  ],
  review: [
    {
      title: "A community bank choosing two improvements",
      lines: [
        ["Let's explore the same decision problem through a community bank that can finance only two improvement projects.", t("Alternative explanation · Community banking", "A community bank compares competing improvements against its strategic objectives before allocating limited investment.")],
        ["The bank wants stronger customer trust, lower operating costs, and sustainable growth among small business customers.", null],
        ["Its managers propose improving loan decisions, automating internal reporting, redesigning business onboarding, and upgrading branch interiors.", iss("Four worthwhile banking improvements compete for funding that can support only two.", "Limited resources")],
        ["Each manager believes the proposed improvement deserves investment, but their arguments emphasise different organisational benefits.", null],
        ["The bank therefore examines how each proposal contributes to its published strategic objectives rather than departmental convenience.", q("Which proposals would you investigate if small business growth and customer trust were especially important?")],
        ["Improving loan decisions could strengthen customer trust by making application outcomes clearer and more predictable.", null],
        ["It might also support business growth if eligible customers receive timely decisions without unnecessary administrative delays.", dg("Loan decision improvement", D.flow(["Clearer|decisions", "Better customer|experience", "Stronger|trust", "Business|growth"]), "Improved loan decisions could support trust and growth if they make lending decisions clearer and more dependable.")],
        ["However, the bank must protect lending quality because faster decisions cannot justify accepting unsuitable financial risks.", null],
        ["Automated internal reporting offers another benefit by reducing employee effort spent preparing routine management information.", null],
        ["Those savings may be genuine, but the proposal's connection to customer trust and business growth could be indirect.", st("A genuine operational benefit does not automatically establish a strong relationship with the organisation's strategic priorities.")],
        ["Business onboarding may offer a more direct contribution to growth by making account opening easier for eligible customers.", null],
        ["It could also strengthen trust when customers receive clear requirements and consistent information throughout the application process.", dg("Business onboarding improvement", D.flow(["Simpler|onboarding", "Fewer|errors", "Customer|confidence", "Business|growth"]), "Improved onboarding could support customer trust and business growth through clearer and more reliable account-opening experiences.")],
        ["Branch refurbishment might improve customers' surroundings, but its strategic contribution would require separate supporting evidence.", null],
        ["The bank should not dismiss refurbishment automatically, because some branches may have serious accessibility or service problems.", null],
        ["Nevertheless, the steering group must compare its expected benefits against those offered by the other proposals.", cmp("a", "Potentially broader contributions", "Loan decisions and business onboarding could support both trust and small business growth.")],
        ["The analysis reveals possible alignment patterns, but these remain hypotheses until supported by credible operational evidence.", cmp("b", "Potentially narrower contributions", "Internal reporting mainly offers efficiency, while branch refurbishment may improve the physical customer experience.")],
        ["Sponsors must also examine implementation costs, feasibility, risks, and the relative importance of their strategic objectives.", null],
        ["They should document their reasoning because rejected proposals may still be worthwhile investments at another time.", st("Strategic comparison makes funding decisions explainable without pretending that qualitative judgements are mathematically certain.")],
        ["Imagine recommending loan decisions and business onboarding because the bank currently places greatest emphasis on business growth.", null],
        ["That recommendation is defensible only if you explain the supporting evidence and acknowledge the improvements being deferred.", null],
        ["Qasr faces the same challenge when comparing guest arrival, stock counting, corporate billing, and spa booking.", q("Can you defend two investments without claiming that the remaining proposals have no value?")]
      ]
    },
    {
      title: "An airline comparing four improvement proposals",
      lines: [
        ["Imagine a regional airline reviewing four proposals while pursuing reliable service, lower operating costs, and corporate travel growth.", t("Alternative explanation · Airline strategy", "An airline uses strategic alignment to compare improvement proposals without confusing operational benefits with investment priorities.")],
        ["Its improvement budget can support only two projects, so executives must choose between several genuinely useful opportunities.", null],
        ["Managers propose redesigning boarding, automating inventory counts, improving corporate invoicing, and upgrading lounge reservations.", iss("Four airline improvement proposals compete for a budget that cannot support every worthwhile change.", "The investment dilemma")],
        ["The airline's programme director asks each manager to explain which strategic objectives the proposed change would support.", null],
        ["This question matters because the same operational improvement can have different strategic significance in different organisations.", q("Would faster boarding matter equally to an airline competing on reliability and one competing primarily on luxury?")],
        ["For an airline emphasising reliability, boarding redesign could reduce avoidable delays and improve passengers' departure experiences.", null],
        ["However, managers would still need evidence that boarding problems materially contribute to the delays customers experience.", dg("Boarding redesign", D.flow(["Boarding|redesign", "Fewer|delays", "Passenger|confidence", "Reliable|service"]), "Boarding redesign could support reliable service if evidence connects boarding problems with departure delays.")],
        ["Automating inventory counts might reduce manual effort and improve the accuracy of records for maintenance supplies.", null],
        ["Those benefits could support operating efficiency, although their wider strategic contribution would require careful investigation.", null],
        ["Managers should not invent additional benefits merely to make the proposal appear competitive with other investments.", st("Strategic alignment must reflect credible relationships rather than benefits added to strengthen a preferred proposal.")],
        ["Corporate invoicing offers another possible contribution because business customers depend on accurate and understandable travel charges.", null],
        ["Improving that process might reduce billing disputes and strengthen relationships with organisations purchasing frequent employee travel.", dg("Corporate invoicing", D.flow(["Accurate|invoices", "Fewer|disputes", "Business|confidence", "Corporate|growth"]), "Reliable corporate invoicing could support business customer relationships and the airline's corporate travel growth objective.")],
        ["The lounge reservation proposal might improve premium passenger convenience, but its contribution depends on the airline's priorities.", null],
        ["If premium customer experience were central to its strategy, the proposal might deserve considerably greater attention.", null],
        ["This illustrates why alignment cannot be judged independently of the particular organisation's strategic direction.", cmp("a", "Reliability-focused airline", "Boarding redesign may deserve attention because departure dependability is strategically important.")],
        ["The same proposal can be attractive under one strategic direction and less compelling under another.", cmp("b", "Premium-experience airline", "Lounge reservations may become more important when distinctive premium service is a strategic priority.")],
        ["Now suppose the lounge proposal comes from an influential executive who also controls part of the investment budget.", null],
        ["The steering group should still require comparable evidence because sponsorship influence does not establish strategic value.", iss("A powerful sponsor favours lounge reservations, but investment priority must remain grounded in strategic evidence.", "Governance under pressure")],
        ["The programme director can protect the process by recording alignment judgements and requiring sponsors to explain their decisions.", null],
        ["That record also makes it possible to revisit assumptions if later evidence challenges the original assessment.", st("Transparent comparison protects investment decisions from departmental influence while preserving accountable strategic judgement.")],
        ["Remember that qualitative alignment ratings support discussion rather than producing an unquestionable answer through simple addition.", null],
        ["The airline must still decide which objectives deserve emphasis and which opportunities can reasonably be deferred.", null],
        ["At Qasr, Exhibit Five serves exactly this purpose when four directors compete for two available investments.", q("Can you explain why strategic alignment must be judged within the organisation's own objectives and priorities?")]
      ]
    }
  ]
},
{
  title: "Making a defensible funding decision",
  sec: "W5O2c",
  lines: [
    ["The four proposals are now on the table, and Qasr's steering group must make its investment recommendation.", t("Making a defensible funding decision", "A defensible decision explains strategic priorities, supporting evidence, accepted risks, and the opportunities being deferred.")],
    ["The budget can support only two improvements, so approving one proposal necessarily means postponing another worthwhile opportunity.", null],
    ["I want you to imagine presenting your recommendation directly to the directors whose projects will not receive funding.", q("Could you defend your recommendation without simply claiming that your preferred projects are better?")],
    ["The programme director asks everyone to reconsider the alignment evidence before discussing individual project costs or preferences.", null],
    ["Guest arrival redesign supports service and corporate growth strongly, while its cost contribution is moderate.", dg("Guest arrival alignment", D.flow(["Service|strong", "Cost|moderate", "Growth|strong"]), "Guest arrival redesign has strong service and growth alignment, with a moderate contribution to cost reduction.")],
    ["Corporate billing supports growth strongly and service moderately, although its relationship with cost reduction is weak.", null],
    ["Stock counting supports cost reduction moderately, while spa booking supports service moderately without other assessed strategic contributions.", dg("The remaining alignment patterns", D.flow(["Corporate billing|growth strong", "Stock counting|cost moderate", "Spa booking|service moderate"]), "Corporate billing has broader alignment than stock counting or spa booking, but qualitative relationships do not determine funding automatically.")],
    ["These relationships provide evidence, but the directors still need to decide which strategic ambitions deserve immediate emphasis.", null],
    ["Suppose they agree that service leadership and corporate growth should guide this particular investment round.", st("Illustrative sponsor priority: protect service leadership while strengthening the processes supporting corporate-account growth.")],
    ["That priority would favour improvements addressing customer experience and the reliability of corporate relationships.", null],
    ["Guest arrival redesign becomes a credible candidate because it connects strongly with both selected strategic ambitions.", null],
    ["Corporate billing also becomes attractive because reliable invoicing can support the commercial relationships needed for growth.", dg("An illustrative funding recommendation", D.flow(["Guest arrival|redesign", "Corporate billing|redesign", "+Service and|growth priorities"]), "Funding guest arrival and corporate billing would be defensible if sponsors prioritise service leadership and corporate growth.")],
    ["Notice that this recommendation follows an explicitly stated strategic priority rather than a mechanical calculation of alignment ratings.", null],
    ["The ratings are qualitative judgements, so treating strong as three points would introduce unjustified numerical precision.", iss("Adding qualitative ratings can create a misleading impression of mathematical certainty.", "False precision")],
    ["A proposal's feasibility, implementation cost, dependencies, and likely benefits also matter when evaluating whether investment is justified.", null],
    ["The steering group should request credible estimates and identify uncertainties before turning this recommendation into an approved commitment.", q("What evidence could change your recommendation even if the strategic alignment ratings remained unchanged?")],
    ["Imagine that corporate billing requires an expensive system replacement that exceeds the programme's available implementation capacity.", null],
    ["The directors might reconsider timing, scope, or the investment combination rather than ignore that practical constraint.", st("Strategic alignment establishes relevance, while feasibility and resource evidence determine whether an aligned proposal can proceed responsibly.")],
    ["Now consider the stock counting proposal, which promises useful savings but has a narrower strategic contribution.", null],
    ["Deferring it does not deny those savings, because the decision reflects the agreed emphasis of this investment round.", cmp("a", "Fund now", "Guest arrival and corporate billing support the illustrative priority of service leadership and corporate growth.")],
    ["If cost reduction became the dominant immediate priority, the directors might reasonably reach a different conclusion.", cmp("b", "Defer for review", "Stock counting and spa booking remain potentially useful, but their assessed alignment is narrower under the stated priorities.")],
    ["That possibility matters because a defensible decision depends on declared priorities, not a supposedly universal project ranking.", null],
    ["The spa director may object, especially because that director also controls the programme's investment budget.", iss("The budget holder supports spa booking, creating pressure to favour a proposal with narrower assessed alignment.", "A governance challenge")],
    ["The programme director should acknowledge the objection while requiring the same evidence and criteria from every sponsor.", null],
    ["Budget authority provides decision responsibility, but it does not establish that the sponsor's preferred proposal creates greater strategic value.", st("Transparent governance requires influential sponsors to explain decisions using agreed strategic criteria rather than departmental authority.")],
    ["The final recommendation should document its rationale, expected benefits, unresolved assumptions, and risks to other strategic objectives.", null],
    ["It should also explain what Qasr sacrifices by deferring improvements that might still generate worthwhile operational benefits.", dg("Documenting the decision", D.flow(["Strategic|priority", "Supporting|evidence", "Accepted|trade-offs", "+Recorded|decision"]), "A defensible investment decision records its strategic rationale, evidence, accepted trade-offs, and accountable approval.")],
    ["The steering group can then revisit its choice if evidence changes without pretending that its earlier judgement was arbitrary.", null],
    ["This is strategic discipline: choosing deliberately, accepting consequences, and remaining accountable for the organisational direction selected.", q("Can you defend two investments while explaining why the rejected proposals still have genuine value?")]
  ],
  review: [
    {
      title: "A municipal council choosing public service improvements",
      lines: [
        ["Let's revisit defensible investment decisions through a municipal council that can finance only two public service improvements.", t("Alternative explanation · Municipal investment", "A council must justify which public service improvements deserve limited funding and which opportunities should wait.")],
        ["The council wants faster essential services, fairer access for residents, and more responsible use of public resources.", null],
        ["Its departments propose digital permit applications, improved waste collection scheduling, accessible service counters, and automated internal reporting.", iss("Four useful municipal improvements compete for funding that can support only two.", "Public investment priorities")],
        ["Each proposal addresses a genuine operational concern, but the council cannot responsibly promise to implement everything.", null],
        ["The councillors therefore agree to prioritise improvements that reduce barriers to essential services for residents.", q("Which proposals would deserve closer attention if accessible public services became the immediate priority?")],
        ["Digital permit applications might reduce unnecessary visits, particularly for residents who struggle to attend municipal offices.", null],
        ["Accessible service counters could help residents who cannot comfortably use digital systems or existing physical facilities.", dg("An illustrative municipal recommendation", D.flow(["Digital permit|applications", "Accessible|service counters", "+Improved|public access"]), "Funding digital permits and accessible counters could support the council's stated priority of improving access to essential services.")],
        ["These proposals appear complementary because they address different barriers rather than assuming every resident uses services identically.", null],
        ["However, the council must investigate implementation costs, accessibility requirements, and whether the proposed changes are technically feasible.", null],
        ["A strategically attractive project could still require redesign if its cost or implementation risks exceed available resources.", st("Strategic relevance is necessary for a sound recommendation, but practical feasibility must also be demonstrated.")],
        ["Waste collection scheduling might reduce vehicle costs, while automated reporting could save valuable administrative time.", null],
        ["Those benefits remain genuine even if the council postpones both proposals under its current access priority.", cmp("a", "Recommended investment", "Digital permits and accessible counters address different barriers to public service access.")],
        ["The council should explain this distinction rather than describe deferred proposals as unnecessary or poorly conceived.", cmp("b", "Deferred investment", "Waste scheduling and internal reporting may offer worthwhile efficiency benefits for a later funding round.")],
        ["Suppose the finance director argues that automated reporting would deliver the quickest measurable financial saving.", null],
        ["The councillors should examine that evidence while remembering their agreed emphasis on residents' access to essential services.", iss("A faster financial return creates pressure to abandon the council's declared service-access priority.", "Competing investment arguments")],
        ["If they change their priority, they should explain why rather than quietly adjusting the criteria to favour one proposal.", null],
        ["Their final decision should identify expected benefits, unresolved risks, accountable sponsors, and the consequences of postponement.", st("A defensible decision remains transparent about priorities, evidence, resource constraints, and opportunities sacrificed.")],
        ["The recommendation is not automatically correct simply because two projects appear strongly aligned with the chosen objective.", null],
        ["It becomes defensible when the council can explain its reasoning and respond honestly to competing evidence.", null],
        ["Qasr's directors face the same responsibility when deciding which two improvements should receive investment.", q("Could you justify the council's funding decision to residents whose preferred improvement was postponed?")]
      ]
    },
    {
      title: "A healthcare network facing an unexpected constraint",
      lines: [
        ["Imagine a healthcare network deciding between improvements to appointment scheduling, medical inventory, patient communication, and internal reporting.", t("Alternative explanation · Healthcare investment", "A strategically attractive proposal may need reconsideration when implementation constraints or risks change.")],
        ["The network wants more dependable patient access, safer service delivery, and better control of operating expenditure.", null],
        ["Its improvement budget can support two projects, and managers initially favour appointment scheduling and patient communication.", iss("Two patient-facing proposals appear attractive, but the network must still establish whether both are feasible.", "Alignment versus feasibility")],
        ["Both proposals could improve patients' experiences by reducing uncertainty about appointments and helping them understand important instructions.", null],
        ["The recommendation seems consistent with the network's emphasis on dependable access and effective patient communication.", q("Would you approve both projects immediately because they support important strategic objectives?")],
        ["Before approving investment, the steering group examines implementation requirements and discovers that both projects depend on one specialist team.", null],
        ["That team cannot deliver both changes safely within the planned period without additional resources or revised schedules.", dg("A shared implementation dependency", D.flow(["Appointment|scheduling", "Patient|communication", "Shared specialist|team", "Capacity|constraint"]), "Two strategically aligned projects compete for the same specialist capacity, creating an implementation constraint.")],
        ["This discovery does not weaken their strategic relevance, but it changes whether the original funding combination is practical.", null],
        ["The directors could postpone one project, reduce its scope, or investigate additional capacity before committing funds.", null],
        ["They might also reconsider medical inventory improvements if those changes offer important safety benefits with manageable implementation demands.", st("A funding recommendation must consider strategic contribution alongside feasibility, dependencies, and implementation risk.")],
        ["Suppose the inventory proposal could reduce the risk of essential supplies becoming unavailable during clinical treatment.", null],
        ["That possibility deserves serious consideration because safer service delivery is another declared organisational objective.", null],
        ["The steering group should examine supporting evidence rather than assuming patient-facing projects always deserve greater priority.", cmp("a", "Original recommendation", "Appointment scheduling and patient communication both support dependable patient access.")],
        ["The revised decision might fund appointment scheduling and medical inventory while postponing the communication project.", cmp("b", "Possible revised recommendation", "Appointment scheduling and medical inventory may balance access and safety while respecting implementation capacity.")],
        ["That choice would require an explanation of why the revised combination better serves the network under current constraints.", null],
        ["The directors must also acknowledge that postponing patient communication could delay improvements patients genuinely need.", iss("Revising the investment combination protects feasibility but postpones another strategically valuable improvement.", "An explicit trade-off")],
        ["This is an opportunity cost, meaning the value of the best alternative sacrificed when a particular choice is made.", null],
        ["Recognising opportunity cost helps managers explain why a worthwhile project may remain unfunded despite its potential benefits.", st("Every constrained investment decision sacrifices alternatives, so responsible sponsors should acknowledge those consequences explicitly.")],
        ["The network should record the evidence, accepted risks, and conditions that might justify revisiting its decision.", null],
        ["That record makes the decision accountable without pretending that the original recommendation was necessarily unreasonable.", null],
        ["Strategic alignment supports disciplined judgement, but new evidence can legitimately change the preferred investment combination.", null],
        ["At Qasr, the same principle applies if guest arrival or corporate billing presents unexpected implementation constraints.", q("Can you explain why a strongly aligned proposal might still be deferred without contradicting organisational strategy?")]
      ]
    }
  ]
},
      ] },
      { id: "l3", title: "When good improvements serve the wrong purpose", sections: [
{
  title: "Efficiency without strategic alignment",
  sec: "W5O3a",
  lines: [
    ["Qasr's steering group has considered a defensible funding recommendation, but one uncomfortable question remains about operational efficiency.", t("Efficiency without strategic alignment", "A process can become more efficient while making the organisation less effective at achieving its strategy.")],
    ["What happens when an improvement delivers exactly its promised savings but moves the organisation away from its ambitions?", null],
    ["Let's investigate that possibility before the directors finalise the scope of their proposed improvement programme.", q("Can a process improvement succeed operationally while failing strategically?")],
    ["Imagine Qasr's finance director proposing a reduction in reception staffing during periods when several guests arrive together.", null],
    ["The director expects lower labour expenditure and believes the change will support Qasr's cost reduction objective.", iss("Reducing reception staffing promises lower operating costs but could weaken the guest arrival experience.", "An efficiency proposal")],
    ["The proposal sounds attractive because labour represents a genuine operating expense, and Qasr has committed to reducing costs.", null],
    ["However, the organisation also wants the highest regional service rating, making guest experience strategically important.", st("Operational efficiency concerns resources used, while strategic effectiveness concerns whether organisational objectives are achieved.")],
    ["Efficiency means producing a given output with fewer resources, or achieving more output using comparable resources.", null],
    ["Effectiveness concerns achieving the intended result, which may involve quality, reliability, customer experience, or strategic growth.", cmp("a", "Operational efficiency", "Reception handles arrivals using fewer staff hours and potentially lower operating expenditure.")],
    ["A change can improve one without improving the other, because saving resources does not guarantee better organisational outcomes.", cmp("b", "Strategic effectiveness", "Guests experience the dependable, welcoming arrival service required by Qasr's strategic ambition.")],
    ["Suppose the staffing reduction succeeds financially, with reception labour costs falling during the next reporting period.", null],
    ["Yet guests begin waiting longer, and employees have less time to resolve booking problems or explain unexpected delays.", dg("The unintended service consequence", D.flow(["Fewer|reception staff", "Lower labour|cost", "!Longer|guest queues", "!Weaker|arrival experience"]), "Reducing reception staffing may save labour costs while creating service problems that undermine Qasr's service leadership objective.")],
    ["The finance report might celebrate the saving, while guest feedback reveals deterioration in the arrival experience.", null],
    ["Both reports could be accurate, which makes the strategic interpretation more important than either isolated result.", q("Which result should Qasr celebrate when financial efficiency improves but guest experience deteriorates?")],
    ["This situation illustrates local optimisation, meaning improving one activity without considering consequences for the wider organisation.", null],
    ["The reception department may meet its expenditure target while creating problems for guest relations and corporate account managers.", st("Local optimisation occurs when improving one activity creates consequences that weaken performance elsewhere in the organisation.")],
    ["Corporate travellers may become dissatisfied when repeated arrival delays disrupt schedules and reduce confidence in Qasr's reliability.", null],
    ["That risk matters because Qasr also aims to grow corporate accounts by twenty-five percent.", dg("Consequences beyond reception", D.flow(["Reception|cost saving", "!Arrival|reliability", "!Corporate guest|confidence", "!Growth|at risk"]), "A reception cost saving could create wider consequences for service leadership and corporate-account growth.")],
    ["The strategic damage is not inevitable, but managers must investigate the possibility before approving the proposed change.", null],
    ["They should examine waiting times, guest feedback, employee workload, and the financial savings expected from reduced staffing.", null],
    ["Those measures reveal whether the proposed efficiency gain remains compatible with Qasr's other strategic commitments.", st("An efficiency proposal should be evaluated against its intended savings and its possible effects on other strategic objectives.")],
    ["Now imagine another proposal that reduces unnecessary administrative work without removing employees from important guest interactions.", null],
    ["That alternative might achieve savings while preserving the personal attention that supports Qasr's service reputation.", cmp("a", "Reduce guest-facing capacity", "Potential labour savings accompanied by risks to waiting times and personal service.")],
    ["The steering group should compare these approaches rather than assume that every reduction in labour expenditure is equivalent.", cmp("b", "Remove unnecessary administrative work", "Potential efficiency gains while preserving employees' capacity to assist guests.")],
    ["This is why the Organization Strategy phase establishes boundaries before detailed process redesign begins.", null],
    ["It helps managers recognise when an attractive operational improvement conflicts with the organisation's chosen direction.", iss("An improvement should not receive automatic approval merely because its efficiency benefits are measurable.", "Strategic misalignment")],
    ["The lesson is not that efficiency is undesirable, because Qasr's cost objective makes responsible savings important.", null],
    ["The lesson is that efficiency must serve strategy rather than become an independent purpose that overrides it.", st("Strategically successful BPM improves resource use in ways that remain consistent with the organisation's agreed objectives.")],
    ["As Qasr prepares its investment mandate, the directors must decide which performance trade-offs they will accept.", null],
    ["That decision will determine whether future improvement teams optimise isolated activities or strengthen the organisation as a whole.", q("Can you explain why a financially successful process change might still represent a strategic failure?")]
  ],
  review: [
    {
      title: "A luxury restaurant that reduced service time",
      lines: [
        ["Let's examine strategic misalignment through a luxury restaurant whose reputation depends on attentive, personalised dining experiences.", t("Alternative explanation · Luxury dining", "Faster service is not necessarily better when customers value personal attention and an unhurried experience.")],
        ["Its management team wants to control operating costs while maintaining the distinctive service that attracts returning customers.", null],
        ["The restaurant manager proposes shortening every table's service time so employees can serve more customers each evening.", iss("Shorter service times could increase table turnover while weakening the dining experience customers expect.", "Efficiency versus experience")],
        ["The proposal appears efficient because serving more customers with existing staff could increase productivity and revenue.", null],
        ["However, the restaurant's strategic position depends on guests enjoying attentive service rather than completing meals quickly.", q("Would serving more customers represent success if loyal guests stopped enjoying their visits?")],
        ["Imagine employees being instructed to clear plates immediately and encourage guests to finish their meals sooner.", null],
        ["Average service time falls, and the manager reports that tables are becoming available more frequently.", dg("The efficiency improvement", D.flow(["Shorter|service time", "Higher table|turnover", "!Rushed|guest experience", "!Customer|loyalty at risk"]), "Faster table turnover may improve operational productivity while undermining the personalised experience that supports customer loyalty.")],
        ["Yet regular customers begin complaining that the restaurant feels hurried and employees no longer provide thoughtful attention.", null],
        ["The process has become faster, but the change may weaken the reason customers originally chose this restaurant.", null],
        ["This distinction separates operational efficiency from strategic effectiveness, which concerns achieving the organisation's intended outcomes.", cmp("a", "Efficiency result", "More customers can be served during an evening using comparable staffing resources.")],
        ["Efficiency measures describe resource use, while effectiveness measures help establish whether the organisation delivers its strategic promise.", cmp("b", "Strategic result", "Customers continue receiving the attentive experience that supports loyalty and the restaurant's reputation.")],
        ["The restaurant should therefore examine customer satisfaction and repeat visits alongside table turnover and labour productivity.", null],
        ["Without those measures, management might celebrate an operational improvement while overlooking deterioration in customer relationships.", st("A process improvement should be assessed against the customer value the organisation has chosen to provide.")],
        ["Now imagine the restaurant replacing handwritten kitchen orders with a system that reduces transcription mistakes.", null],
        ["That change could improve efficiency without requiring employees to rush conversations or reduce personal attention.", dg("An alternative improvement", D.flow(["Digital|kitchen orders", "Fewer order|errors", "Less|rework", "+Attentive|service preserved"]), "Reducing order transcription errors could improve efficiency while preserving the restaurant's personalised service.")],
        ["The alternative still requires testing, because technology can introduce unexpected problems even when its intentions appear sensible.", null],
        ["However, it demonstrates how managers can search for savings that remain compatible with their strategic commitments.", null],
        ["The important question is not whether an improvement makes work faster, but whether that speed creates appropriate value.", st("Strategic alignment requires efficiency improvements to respect the organisation's chosen basis for serving customers.")],
        ["This is precisely the concern facing Qasr when proposals promise lower reception costs through reduced guest-facing capacity.", null],
        ["A responsible manager should consider both the savings achieved and the experience those savings might compromise.", q("Which restaurant improvement would you investigate, and how would you establish that it supports the chosen strategy?")]
      ]
    },
    {
      title: "A university that automated student support",
      lines: [
        ["Imagine a university whose strategy emphasises accessible, supportive learning experiences for students from diverse educational backgrounds.", t("Alternative explanation · Student support", "Automating student services can reduce administrative effort while creating barriers that conflict with an accessibility strategy.")],
        ["The student services department faces increasing enquiries, and managers want to reduce the workload associated with routine requests.", null],
        ["They propose replacing most direct enquiries with an automated chatbot that answers common questions without employee involvement.", iss("A chatbot could reduce staff workload while making some students' problems harder to resolve.", "Efficiency versus accessibility")],
        ["The proposal appears attractive because automated responses could handle large numbers of enquiries at relatively low operating cost.", null],
        ["The university might also provide answers outside normal office hours, creating an additional potential service benefit.", q("Would fewer staff enquiries prove success if students with complicated problems could no longer obtain effective assistance?")],
        ["Imagine the chatbot successfully answering routine questions about academic calendars, registration dates, and standard administrative procedures.", null],
        ["The department reports fewer employee interactions and celebrates the reduction in time spent answering repetitive enquiries.", dg("The apparent efficiency gain", D.flow(["Automated|answers", "Fewer staff|enquiries", "Lower routine|workload", "Reported|efficiency"]), "Automating routine enquiries can reduce administrative workload, but that result alone does not establish strategic success.")],
        ["However, some students need personalised guidance because their circumstances do not match the chatbot's standard response categories.", null],
        ["International students may face unfamiliar procedures, while students with accessibility needs may require alternative communication arrangements.", null],
        ["If human assistance becomes difficult to reach, these students could experience greater barriers despite the department's improved efficiency.", iss("Students with complex needs may struggle to obtain appropriate assistance after routine enquiries become automated.", "An unintended accessibility barrier")],
        ["The university must therefore distinguish reducing administrative effort from achieving its strategic commitment to accessible support.", null],
        ["Operational efficiency concerns the resources required to handle enquiries, while strategic effectiveness concerns students receiving appropriate assistance.", cmp("a", "Operational efficiency", "The department handles routine questions with fewer employee interactions.")],
        ["Both outcomes matter, but the university should not assume that improving one automatically guarantees improvement in the other.", cmp("b", "Strategic effectiveness", "Students receive understandable, accessible, and appropriate support for their individual circumstances.")],
        ["Managers should examine successful problem resolution, student feedback, and access to human support alongside administrative workload.", null],
        ["These measures would reveal whether automation helps students or merely transfers unresolved difficulties away from employees.", st("Reducing recorded workload is not a strategic improvement when important customer needs remain unmet.")],
        ["A better design might automate routine information while providing clear access to employees for complicated or sensitive enquiries.", null],
        ["That arrangement could preserve efficiency benefits without abandoning students who require personalised assistance.", dg("An aligned support model", D.flow(["Routine|questions", "Automated|information", "Complex|student needs", "+Human|assistance available"]), "A blended support process can automate routine enquiries while preserving appropriate human assistance for complex student needs.")],
        ["The university would still need evidence that the blended approach works for students with different circumstances.", null],
        ["This illustrates why strategic objectives should guide process design rather than merely appear in the project's justification.", null],
        ["At Qasr, the same reasoning applies when automation promises savings but could weaken the guest experience.", st("Efficiency becomes strategically valuable when resource savings are achieved without undermining essential organisational commitments.")],
        ["The central lesson is that organisations must improve the right outcomes, not simply the easiest activities to measure.", q("How would you redesign student support to reduce unnecessary work without compromising the university's accessibility ambition?")]
      ]
    }
  ]
},
{
  title: "Competing objectives and explicit trade-offs",
  sec: "W5O3b",
  lines: [
    ["Qasr's directors now recognise that an efficient process can undermine another strategic objective, even when savings are genuine.", t("Competing objectives and explicit trade-offs", "Strategic trade-offs require managers to identify competing benefits, acknowledge sacrifices, and make accountable choices.")],
    ["But recognising a possible conflict is easier than deciding what the organisation should actually sacrifice.", null],
    ["Let's return to the steering group, where the proposed guest arrival redesign has raised another difficult question.", q("What should Qasr do when two desirable strategic outcomes cannot both be maximised?")],
    ["The operations director suggests introducing express check-in for corporate travellers, reducing delays during busy arrival periods.", null],
    ["The guest relations director worries that prioritising corporate travellers could increase waiting times for other guests.", iss("Express corporate check-in may support business relationships while creating unequal waiting experiences.", "A competing-objectives problem")],
    ["Both directors raise legitimate concerns, because Qasr wants corporate growth and the highest regional service rating.", null],
    ["This creates a trade-off, meaning a decision where gaining one benefit involves accepting a disadvantage elsewhere.", st("A strategic trade-off occurs when improving one valued outcome requires accepting a cost, risk, or limitation affecting another.")],
    ["The important point is that neither objective becomes irrelevant simply because management chooses to emphasise the other.", null],
    ["Instead, the steering group must identify what improves, what might deteriorate, and which consequences are acceptable.", dg("The express check-in trade-off", D.flow(["Corporate|priority", "Faster business|arrivals", "Shared reception|capacity", "!Other guest|waiting risk"]), "Prioritising corporate arrivals may improve business travel experiences while increasing waiting pressure for other guests.")],
    ["Imagine the directors agreeing that corporate travellers need predictable arrivals because their schedules are often tightly constrained.", null],
    ["That reasoning supports the growth objective, but it does not establish that other guests should receive poor service.", q("How much inconvenience for other guests would be acceptable, and who should authorise that decision?")],
    ["The steering group could establish a service safeguard, meaning a condition that the proposed change must respect.", null],
    ["For example, it might require acceptable waiting performance across guest groups rather than examining corporate averages alone.", st("A service safeguard protects an important strategic commitment while allowing managers to pursue another objective.")],
    ["Such a condition would need sponsor approval and evidence about available staffing, arrival patterns, and guest expectations.", null],
    ["The team might then investigate appointment-based arrivals or flexible staffing instead of permanently reserving reception capacity.", cmp("a", "Dedicated corporate capacity", "Could improve corporate arrival predictability while reducing flexibility for other guests.")],
    ["These alternatives matter because managers should investigate whether apparent conflicts can be reduced through better process design.", cmp("b", "Flexible arrival capacity", "Could respond to changing demand while preserving service across different guest groups.")],
    ["However, not every conflict can disappear, especially when money, employee capacity, and implementation time remain limited.", null],
    ["Qasr can fund only two improvements, so choosing guest arrival and corporate billing necessarily postpones other opportunities.", iss("Funding two strategically attractive proposals means accepting the benefits forgone from the other two.", "The unavoidable sacrifice")],
    ["The deferred stock counting proposal might have reduced costs, while spa booking might have improved particular guest experiences.", null],
    ["Those forgone benefits represent opportunity cost, meaning the value of the best alternative sacrificed by a decision.", st("Opportunity cost makes the sacrifice visible: choosing one investment means forgoing benefits from an alternative use of resources.")],
    ["The directors should therefore explain what they are giving up rather than describe the rejected proposals as worthless.", null],
    ["They must also distinguish a deliberate sacrifice from an unintended consequence that nobody considered before approving investment.", dg("Making a trade-off explicit", D.flow(["Expected|benefit", "Possible|sacrifice", "Acceptable|boundary", "Sponsor|decision"]), "A defensible trade-off records the expected benefit, possible sacrifice, agreed boundary, and accountable decision.")],
    ["A deliberate trade-off identifies the competing outcomes and establishes why the chosen balance supports organisational priorities.", null],
    ["An unmanaged conflict leaves departments pursuing separate targets until the consequences emerge in customer experience or financial results.", cmp("a", "Unmanaged conflict", "Departments optimise their own targets without agreeing which organisational consequences are acceptable.")],
    ["This distinction is especially important when managers face pressure to demonstrate quick savings or impressive performance improvements.", cmp("b", "Explicit strategic trade-off", "Sponsors acknowledge competing outcomes, establish safeguards, and document the rationale for their choice.")],
    ["Qualitative alignment ratings can inform the discussion, but they cannot decide how much service deterioration is acceptable.", null],
    ["That judgement belongs to authorised sponsors who understand the organisation's strategic commitments and available evidence.", st("Strategic trade-offs require accountable judgement because qualitative alignment evidence cannot determine acceptable sacrifices automatically.")],
    ["Qasr's programme director can now ask each sponsor to state the benefit pursued and the consequence potentially accepted.", null],
    ["The resulting agreement will help later improvement teams avoid making strategic decisions without the authority to do so.", q("Can you defend a strategic trade-off by explaining its benefit, sacrifice, safeguard, and accountable decision-maker?")]
  ],
  review: [
    {
      title: "A city balancing bus frequency and coverage",
      lines: [
        ["Let's understand explicit trade-offs through a city transport authority deciding how to improve its public bus network.", t("Alternative explanation · Public transport", "Transport planners must balance frequent services with geographical coverage when available operating resources are limited.")],
        ["The authority wants shorter passenger waiting times while maintaining reasonable access for communities across the city.", null],
        ["Its planners propose concentrating buses on busy routes, where additional departures could benefit large numbers of passengers.", iss("More frequent buses on busy routes may require reducing services elsewhere in the network.", "Frequency versus coverage")],
        ["The proposal appears attractive because heavily used routes currently experience overcrowding and long intervals between departures.", null],
        ["However, the authority has limited vehicles and drivers, so increasing frequency may require reallocating existing resources.", q("Should the authority improve busy routes if residents elsewhere lose convenient access to public transport?")],
        ["This is a strategic trade-off because improving one valued outcome could weaken another important public service objective.", null],
        ["Higher frequency supports shorter waits, while geographical coverage supports access for residents living farther from major corridors.", dg("The transport trade-off", D.flow(["More buses|on busy routes", "Shorter|waiting times", "Limited|vehicle capacity", "!Coverage|at risk"]), "Increasing frequency on busy routes may reduce resources available to maintain services in less populated areas.")],
        ["The authority should therefore examine passenger demand, travel needs, alternative transport options, and the consequences of reduced coverage.", null],
        ["These details matter because a lightly used route may provide essential access for people without other travel choices.", null],
        ["A simple passenger-count comparison could overlook the social importance of maintaining that connection.", st("A defensible trade-off considers the value and consequences of competing objectives, not merely the easiest performance indicator.")],
        ["Imagine planners recommending additional buses on busy corridors while protecting minimum service levels in less populated neighbourhoods.", null],
        ["Those minimum levels would act as safeguards, limiting the disadvantages created by concentrating resources elsewhere.", cmp("a", "Frequency improvement", "Additional departures could reduce waiting times and overcrowding on heavily used routes.")],
        ["The authority might also investigate smaller vehicles or revised timetables before accepting substantial reductions in coverage.", cmp("b", "Coverage safeguard", "Minimum service requirements could preserve essential access for communities with fewer transport alternatives.")],
        ["These alternatives could reduce the conflict, although they might not eliminate the underlying resource constraint.", null],
        ["The authority must then explain why its chosen balance reflects public priorities and available operating resources.", null],
        ["It should acknowledge residents who experience reduced convenience rather than pretending every community benefits equally.", iss("A chosen network design may benefit many passengers while imposing inconvenience on others.", "An acknowledged sacrifice")],
        ["This transparency matters because affected residents deserve to understand the reasoning behind changes to essential public services.", null],
        ["Authorised decision-makers should approve the trade-off and establish how its consequences will be monitored after implementation.", st("An explicit trade-off records the chosen benefit, accepted sacrifice, protective conditions, and accountable authority.")],
        ["The same discipline applies at Qasr when improving corporate arrivals could affect service experienced by other guests.", null],
        ["Neither organisation should allow operational teams to settle strategic priorities through isolated process changes.", q("What safeguard would you propose before reallocating buses from quieter neighbourhoods to busy routes?")]
      ]
    },
    {
      title: "An online retailer balancing speed and sustainability",
      lines: [
        ["Imagine an online retailer whose strategy promises convenient deliveries while reducing the environmental impact of its operations.", t("Alternative explanation · Online retail", "A retailer must decide how delivery speed and environmental commitments should influence fulfilment choices.")],
        ["Customers appreciate receiving purchases quickly, but the retailer also wants fewer unnecessary journeys and lower transport emissions.", null],
        ["Its fulfilment manager proposes offering same-day delivery across every neighbourhood, believing speed will improve customer satisfaction.", iss("Universal same-day delivery could improve convenience while increasing journeys and transport emissions.", "Speed versus sustainability")],
        ["The sustainability director objects because urgent deliveries may require vehicles to travel with relatively small loads.", null],
        ["Both managers are pursuing legitimate objectives, yet their preferred operating arrangements create different resource requirements.", q("Should every customer receive the fastest possible delivery when that choice may undermine environmental commitments?")],
        ["The retailer needs to examine the actual consequences rather than assume that faster deliveries always increase emissions.", null],
        ["Route density, vehicle technology, delivery distances, and customer demand could substantially change the environmental result.", dg("Examining delivery consequences", D.flow(["Same-day|delivery", "Vehicle|utilisation", "Transport|emissions", "Customer|convenience"]), "The retailer should assess vehicle utilisation and emissions alongside customer convenience before deciding how broadly to offer same-day delivery.")],
        ["This evidence matters because an apparent conflict may be reduced through better scheduling or more efficient route design.", null],
        ["Suppose the retailer discovers that same-day deliveries are practical in dense neighbourhoods but inefficient in remote areas.", null],
        ["Management could then consider offering different delivery options according to location and available transport capacity.", st("A strategic trade-off should reflect evidence about actual consequences rather than assumptions about competing objectives.")],
        ["One possibility is offering customers a choice between urgent delivery and a slower consolidated delivery service.", null],
        ["The slower option could combine orders more efficiently, while urgent delivery remains available where operationally justified.", cmp("a", "Urgent delivery", "Offers greater convenience but may require additional journeys under certain operating conditions.")],
        ["However, customer choice alone does not guarantee lower emissions unless the retailer measures actual delivery performance.", cmp("b", "Consolidated delivery", "May improve vehicle utilisation and reduce journeys when orders can be grouped effectively.")],
        ["The retailer should therefore establish evidence requirements and identify environmental conditions that proposed delivery changes must respect.", null],
        ["Those conditions become strategic safeguards, protecting the sustainability objective while allowing improvements in customer convenience.", null],
        ["Senior sponsors must decide whether any remaining environmental disadvantage is acceptable under the organisation's declared priorities.", iss("Management may need to accept slower deliveries in some locations to protect its environmental commitments.", "A deliberate compromise")],
        ["That decision involves opportunity cost because choosing one service arrangement means sacrificing benefits available from another.", null],
        ["The retailer should document the expected benefits, accepted disadvantages, and assumptions supporting its chosen delivery policy.", st("Explicit trade-offs make strategic sacrifices visible and prevent departments from quietly prioritising their own performance targets.")],
        ["After implementation, managers should monitor customer satisfaction and transport emissions to determine whether expectations were justified.", null],
        ["Unexpected deterioration would justify reconsidering the arrangement rather than defending it simply because management previously approved it.", null],
        ["At Qasr, the same principle applies when service leadership, cost reduction, and corporate growth compete for resources.", q("How would you justify a delivery policy that deliberately balances convenience against environmental performance?")]
      ]
    }
  ]
},
{
  title: "Sponsors, decision rights and strategic scope",
  sec: "W5O3c",
  lines: [
    ["Qasr's steering group has examined competing objectives, but identifying trade-offs does not establish who may authorise them.", t("Sponsors, decision rights and strategic scope", "The Organization Strategy phase establishes who can make strategic decisions and what the improvement programme is authorised to pursue.")],
    ["The programme director now faces a governance question that could determine whether the agreed priorities survive implementation.", null],
    ["Imagine the guest arrival team discovering that its proposed redesign requires changes to corporate reservations and reception staffing.", q("Who should decide when an improvement affects departments with different objectives and responsibilities?")],
    ["The reception manager believes the team should proceed because improving guest arrivals falls within reception's responsibilities.", null],
    ["However, the corporate sales director objects because the changes could affect commitments made to important business customers.", iss("Reception wants to proceed, but corporate sales believes the proposed changes affect its customer commitments.", "A decision-rights conflict")],
    ["Both managers have legitimate responsibilities, yet neither should independently resolve a disagreement about Qasr's strategic priorities.", null],
    ["This is why the strategy phase must establish governance, meaning arrangements for authority, accountability, and organisational decision-making.", st("Governance establishes who recommends improvements, who approves strategic choices, and who remains accountable for their consequences.")],
    ["A sponsor is a senior leader who provides organisational authority and support for an improvement programme.", null],
    ["Sponsorship matters because process changes often cross departmental boundaries and require decisions beyond individual managers' authority.", dg("Governance across departments", D.flow(["Strategic|sponsor", "Programme|director", "Process|owners", "Delivery|teams"]), "A sponsor provides strategic authority, while programme leaders and process owners coordinate the work needed to implement approved improvements.")],
    ["The sponsor should ensure that investment choices remain consistent with Qasr's agreed service, cost, and growth priorities.", null],
    ["But sponsorship should not mean approving a proposal simply because it benefits the sponsor's own department.", iss("A sponsor's departmental interests may conflict with the wider organisation's strategic priorities.", "Sponsorship versus influence")],
    ["Remember that Qasr's spa proposal comes from the director controlling the programme budget, despite its narrower alignment.", null],
    ["That situation makes transparent decision rights especially important because financial authority and strategic justification are different considerations.", st("Budget authority does not automatically establish strategic priority; decisions still require evidence and accountable justification.")],
    ["Decision rights specify which individuals or groups have authority to make particular choices within the programme.", null],
    ["For example, a process owner might approve routine operational adjustments within an already authorised improvement scope.", cmp("a", "Operational decision", "A process owner adjusts work arrangements within approved objectives, resources, and service constraints.")],
    ["But changing investment priorities or accepting significant deterioration in guest service requires appropriate strategic authorisation.", cmp("b", "Strategic decision", "An authorised sponsor or steering group approves changes affecting priorities, investment, or accepted strategic risks.")],
    ["These distinctions prevent improvement teams from making consequential organisational choices while believing they are merely solving technical problems.", null],
    ["Now consider strategic scope, which defines the organisational boundaries and intended outcomes of an authorised improvement programme.", q("How far should the guest arrival team be allowed to change Qasr's operations?")],
    ["A narrow scope might cover reception procedures, while a broader scope could include reservations, housekeeping coordination, and corporate arrivals.", dg("Defining improvement scope", D.flow(["Guest arrival|objective", "Included|processes", "Department|boundaries", "Approved|constraints"]), "Strategic scope identifies which processes and organisational boundaries the improvement programme is authorised to address.")],
    ["Neither scope is automatically preferable because the appropriate boundary depends on the outcomes Qasr intends to achieve.", null],
    ["An excessively narrow scope could prevent the team from addressing problems originating outside the reception department.", null],
    ["An excessively broad scope could consume resources and introduce changes unrelated to the approved strategic purpose.", st("Strategic scope should be broad enough to address relevant causes but controlled enough to protect resources and priorities.")],
    ["The steering group should therefore clarify included activities, excluded activities, dependencies, and circumstances requiring renewed approval.", null],
    ["These arrangements also establish escalation, meaning referring decisions beyond delegated authority to the appropriate organisational level.", dg("Escalating a strategic conflict", D.flow(["Process team|identifies conflict", "Process owner|assesses impact", "Sponsor|reviews trade-off", "Authorised|decision"]), "A conflict affecting strategic priorities should be escalated to the authority responsible for approving those trade-offs.")],
    ["Suppose reception discovers that faster corporate arrivals require additional staffing expenditure beyond the agreed improvement budget.", null],
    ["The team should present the evidence and alternatives rather than quietly exceed its authority or weaken service safeguards.", iss("A proposed change exceeds the approved budget and affects service commitments across departments.", "Escalation required")],
    ["The authorised sponsor can then decide whether to revise scope, provide resources, or reject the proposed adjustment.", null],
    ["That decision should be recorded so later teams understand the rationale and the limits of their authority.", st("Clear decision rights and documented scope protect strategic alignment when implementation reveals new constraints or conflicts.")],
    ["Qasr is now approaching the point where strategic choices must become an explicit mandate for improvement work.", null],
    ["The next lesson will examine the deliverables needed to communicate that mandate clearly and make progress accountable.", q("Can you distinguish who may recommend a change, who may approve it, and what the programme is authorised to change?")]
  ],
  review: [
    {
      title: "A hospital redesigning emergency admissions",
      lines: [
        ["Let's understand decision rights through a hospital preparing to redesign how patients enter its emergency department.", t("Alternative explanation · Hospital governance", "Cross-department process improvements require clear authority because operational changes can affect clinical safety and organisational priorities.")],
        ["Hospital leaders want shorter admission delays while maintaining safe clinical assessment and appropriate care for every patient.", null],
        ["The emergency department manager proposes changing registration procedures so patients can move more quickly toward clinical assessment.", iss("Emergency registration changes could improve patient flow while affecting clinical and administrative responsibilities.", "A cross-department decision")],
        ["The registration team welcomes the proposal, but nursing leaders worry that important patient information might become unavailable.", null],
        ["Both departments have legitimate concerns because registration efficiency and clinical safety contribute to the hospital's objectives.", q("Should the registration manager approve the change independently when clinical responsibilities may also be affected?")],
        ["The hospital needs decision rights that distinguish routine operational adjustments from changes requiring wider organisational approval.", null],
        ["The registration manager may have authority to revise administrative procedures within agreed clinical and information requirements.", null],
        ["However, changing mandatory patient information or clinical assessment arrangements requires approval from appropriately authorised leaders.", cmp("a", "Delegated operational authority", "Registration managers adjust administrative activities within approved clinical requirements and resource limits.")],
        ["This distinction matters because responsibility for one department does not automatically confer authority over connected clinical processes.", cmp("b", "Higher-level approval", "Authorised clinical and organisational leaders decide changes affecting patient safety or cross-department commitments.")],
        ["The hospital might appoint an executive sponsor to maintain strategic direction and resolve disagreements between affected departments.", null],
        ["That sponsor would support the programme without replacing the professional responsibilities of qualified clinical decision-makers.", st("Sponsorship provides organisational authority, but decisions must remain with people holding the appropriate professional and delegated responsibilities.")],
        ["The hospital must also define scope, meaning which activities and organisational boundaries the improvement programme may address.", null],
        ["A registration-only scope might be insufficient if delays arise from bed availability or communication with clinical teams.", dg("Defining the admissions scope", D.flow(["Emergency|admission", "Registration|activities", "Clinical|coordination", "Approved|boundaries"]), "The hospital should define a scope that addresses relevant admission problems without authorising unrelated clinical changes.")],
        ["However, including every hospital process would make the project difficult to manage and weaken accountability for results.", null],
        ["The sponsor should therefore approve boundaries that address relevant causes while respecting available resources and clinical responsibilities.", null],
        ["Suppose the improvement team discovers that its proposed solution requires changing how clinical priorities are assigned.", iss("The improvement team identifies a clinical decision outside its delegated authority.", "An escalation point")],
        ["The team should escalate that issue rather than treating it as a routine registration adjustment.", null],
        ["Escalation means referring a decision to the appropriate authority when its consequences exceed existing approval limits.", st("Clear escalation arrangements prevent operational teams from making strategic or professional decisions beyond their authority.")],
        ["The resulting decision should be documented so everyone understands the approved change and its underlying justification.", null],
        ["At Qasr, the same principle applies when guest arrival improvements affect corporate commitments and staffing decisions.", q("Who should authorise an admissions change that affects clinical responsibilities beyond the registration department?")]
      ]
    },
    {
      title: "A manufacturer controlling the scope of automation",
      lines: [
        ["Imagine a manufacturer whose executives approve a programme to improve order fulfilment without compromising product quality.", t("Alternative explanation · Manufacturing scope", "An improvement mandate must define its boundaries and identify who can approve changes beyond them.")],
        ["The production manager proposes automating packaging activities because manual handling creates delays during busy operating periods.", null],
        ["The executive sponsor supports investigating the proposal, provided the improvement remains consistent with quality and cost objectives.", iss("Packaging automation is approved for investigation, but its organisational boundaries remain unclear.", "A scope question")],
        ["The project team begins examining packaging equipment and discovers that many delays originate in warehouse scheduling.", null],
        ["Improving packaging alone may therefore achieve little unless the team also addresses how completed products reach the warehouse.", q("Should the project team change warehouse scheduling when its original mandate concerned packaging automation?")],
        ["The answer depends on the approved scope and the decision rights established for the improvement programme.", null],
        ["Scope identifies which processes, activities, and organisational boundaries the team is authorised to investigate or change.", st("Strategic scope defines what an improvement programme may address and prevents uncontrolled expansion beyond its approved purpose.")],
        ["A packaging-only scope may be too narrow if warehouse scheduling is an important cause of the observed delays.", null],
        ["However, expanding into every warehouse activity could introduce costs and responsibilities unrelated to the intended improvement.", dg("Choosing a workable scope", D.flow(["Order fulfilment|objective", "Packaging|activities", "Warehouse|dependency", "Approved|scope"]), "The project scope should include relevant dependencies while remaining limited to activities necessary for the agreed improvement objective.")],
        ["The team should therefore present evidence showing how warehouse scheduling affects the packaging process and overall fulfilment performance.", null],
        ["That evidence allows the sponsor to decide whether extending the programme's scope is strategically justified.", null],
        ["The production manager should not assume that identifying a related problem automatically grants authority to redesign another department.", cmp("a", "Within approved scope", "The team improves packaging procedures and equipment under its delegated authority.")],
        ["Warehouse leaders also need involvement because changes to scheduling may affect staffing, storage capacity, and other commitments.", cmp("b", "Beyond approved scope", "Changing warehouse scheduling requires appropriate approval and coordination across departmental responsibilities.")],
        ["Suppose the sponsor authorises limited warehouse coordination changes but excludes a complete warehouse system replacement.", null],
        ["That decision gives the team a workable boundary while preventing the programme from becoming an uncontrolled technology investment.", st("A clear mandate identifies included activities, excluded activities, dependencies, and the authority required for changes.")],
        ["Now imagine the team discovering that automation would require expenditure beyond the approved investment allocation.", null],
        ["The project manager should escalate the issue rather than committing additional funds without the necessary authority.", iss("The proposed automation exceeds the approved budget and requires a higher-level investment decision.", "A decision-rights boundary")],
        ["The sponsor can then consider reducing scope, approving additional resources, or selecting a different improvement approach.", null],
        ["Recording that decision matters because later teams need to understand why particular options were authorised or rejected.", null],
        ["The same reasoning applies at Qasr when guest arrival redesign reveals dependencies involving reservations and corporate services.", st("Effective governance allows justified changes while protecting strategic priorities, accountability, and agreed resource limits.")],
        ["Remember that clear boundaries are not intended to prevent learning, but to ensure new discoveries receive appropriate authorisation.", q("How would you distinguish a justified scope extension from uncontrolled expansion of an improvement programme?")]
      ]
    }
  ]
},
      ] },
      { id: "l4", title: "Turning strategic choices into a BPM mandate", sections: [
{
  title: "Deliverables and acceptance criteria",
  sec: "W5O4a",
  lines: [
    ["Qasr's steering group has clarified strategic priorities, investment choices, decision rights, and the boundaries of authorised improvement work.", t("Deliverables and acceptance criteria", "The Organization Strategy phase must produce an agreed mandate that later BPM phases can use.")],
    ["The programme director now asks how those decisions will reach the teams responsible for designing improvements.", null],
    ["A productive strategy meeting is not enough if its conclusions remain scattered across presentations and personal recollections.", q("What must Qasr produce before its improvement teams can begin working with confidence?")],
    ["The answer involves deliverables, meaning tangible outputs that communicate decisions and provide a basis for subsequent work.", null],
    ["For Qasr, these should include an agreed strategic interpretation, improvement priorities, scope, responsibilities, and expected benefits.", st("Strategy-phase deliverables communicate agreed objectives, improvement priorities, authorised scope, responsibilities, and expected outcomes.")],
    ["Think of these outputs as a practical agreement between organisational leadership and the people who will improve processes.", null],
    ["Without that agreement, teams might interpret the same strategic objective differently and develop incompatible solutions.", dg("From strategic agreement to mandate", D.flow(["Strategic|objectives", "Investment|priorities", "Approved|scope", "Improvement|mandate"]), "The strategy phase converts organisational decisions into an improvement mandate that guides subsequent BPM work.")],
    ["Imagine the guest arrival team receiving instructions to improve service without any explanation of the approved investment boundaries.", null],
    ["Its members might propose replacing every reservation system, even though management authorised a more focused improvement.", iss("An unclear mandate allows improvement teams to expand work beyond the intended strategic purpose.", "A scope problem")],
    ["The mandate should therefore explain which organisational outcomes matter and which processes the team may investigate.", null],
    ["It should also identify important exclusions, dependencies, and decisions requiring renewed approval from the authorised sponsor.", st("A useful mandate identifies included work, excluded work, dependencies, and the authority required to change its boundaries.")],
    ["Now consider the investment recommendation involving guest arrival and corporate billing, which remains subject to sponsor approval.", null],
    ["If approved, each initiative needs a documented rationale connecting its proposed changes with Qasr's strategic objectives.", dg("Documenting strategic justification", D.flow(["Selected|initiative", "Strategic|contribution", "Expected|benefits", "Sponsor|approval"]), "Each authorised initiative should retain a clear explanation of its strategic contribution and expected benefits.")],
    ["That rationale matters because implementation teams will encounter alternatives that appear attractive for operational reasons alone.", null],
    ["A documented strategic connection helps them judge whether those alternatives remain consistent with the original investment purpose.", null],
    ["But producing documents does not automatically mean the Organization Strategy phase has been completed successfully.", q("How can Qasr determine whether its strategy-phase deliverables are actually ready for use?")],
    ["The steering group needs acceptance criteria, meaning agreed conditions that deliverables must satisfy before receiving formal approval.", st("Acceptance criteria define the conditions under which a deliverable is considered sufficiently complete, clear, and usable.")],
    ["For example, the strategic objectives should have agreed interpretations rather than competing definitions across different departments.", null],
    ["The proposed scope should identify relevant process boundaries, and the investment rationale should explain important trade-offs.", cmp("a", "Document produced", "A strategy document exists, but objectives, boundaries, and decision responsibilities may remain ambiguous.")],
    ["These requirements make acceptance more meaningful than checking whether a presentation or report has been submitted.", cmp("b", "Deliverable accepted", "Authorised sponsors confirm that objectives, priorities, scope, and responsibilities are sufficiently clear.")],
    ["Acceptance should also establish whether unresolved assumptions are recorded and assigned to people responsible for investigating them.", null],
    ["Not every uncertainty must disappear, but important uncertainties should not be concealed behind confident approval language.", iss("An unresolved assumption about corporate billing costs could affect whether the proposed investment remains feasible.", "An acceptance concern")],
    ["Suppose Qasr's billing proposal depends on integrating systems whose technical compatibility has not yet been verified.", null],
    ["The steering group might authorise further investigation while withholding approval for a costly implementation commitment.", st("Conditional acceptance can permit further investigation without pretending that unresolved implementation risks have been eliminated.")],
    ["This distinction protects the organisation from confusing strategic approval with permission to proceed regardless of emerging evidence.", null],
    ["The accepted mandate should also identify who can approve revisions when new information changes costs, benefits, or scope.", dg("Acceptance and controlled handover", D.flow(["Review|deliverables", "Resolve or record|gaps", "Authorised|acceptance", "Controlled|handover"]), "The handover should occur only when authorised decision-makers accept the deliverables and establish how unresolved issues will be managed.")],
    ["Once accepted, the outputs provide a stable starting point for subsequent BPM phases without preventing justified learning.", null],
    ["Teams can investigate processes confidently because they understand the strategic purpose and the limits of their authority.", null],
    ["Qasr's strategy phase has therefore achieved something more valuable than agreement during a meeting.", st("The phase succeeds when its accepted outputs provide a usable, accountable basis for selecting and guiding subsequent improvement work.")],
    ["It has created an authorised direction that later process analysis and redesign can follow and test against evidence.", q("What would you require before accepting Qasr's strategy-phase mandate as ready for handover?")]
  ],
  review: [
    {
      title: "A university preparing an admissions improvement mandate",
      lines: [
        ["Let's understand strategy-phase deliverables through a university preparing to improve its postgraduate admissions process.", t("Alternative explanation · University admissions", "A clear improvement mandate converts strategic intentions into agreed boundaries, responsibilities, and acceptance conditions.")],
        ["The university wants applicants to receive clearer information and more dependable decisions without compromising academic admission standards.", null],
        ["Its leadership approves investigating admissions improvement, but the project team receives only a brief instruction to simplify applications.", iss("The improvement team receives a broad ambition without clear boundaries or agreed expectations.", "An incomplete mandate")],
        ["The team begins proposing changes to academic entry requirements, believing fewer requirements would make applications easier.", null],
        ["Faculty representatives object because changing academic standards was never part of the approved improvement purpose.", q("How could a clearer strategy-phase deliverable have prevented this disagreement?")],
        ["The university needs a documented mandate explaining the strategic objective and the processes authorised for investigation.", null],
        ["It might include application guidance, document submission, administrative checking, and communication of admission decisions.", dg("Defining the admissions mandate", D.flow(["Applicant|experience", "Administrative|processes", "Academic|standards protected", "Approved|mandate"]), "The mandate should identify administrative improvement opportunities while preserving academic admission standards outside the authorised scope.")],
        ["The document should also clarify that changing academic eligibility requirements requires separate approval from the appropriate academic authorities.", null],
        ["That boundary matters because simplifying administrative work does not automatically justify changing the university's educational standards.", null],
        ["The mandate becomes a useful deliverable only when its meaning is clear to everyone responsible for implementation.", st("A strategy-phase deliverable must communicate strategic purpose, authorised scope, responsibilities, and important constraints.")],
        ["The university should therefore establish acceptance criteria before declaring the mandate ready for the improvement team.", null],
        ["Acceptance might require agreement on the applicant journey being examined and the academic requirements that remain unchanged.", null],
        ["It should also identify who owns the process and who can authorise changes affecting other departments.", cmp("a", "Incomplete mandate", "The team receives a general instruction to simplify admissions without clear boundaries.")],
        ["These conditions matter because producing a document does not guarantee that it provides usable operational guidance.", cmp("b", "Accepted mandate", "The team receives agreed objectives, process boundaries, academic safeguards, and decision responsibilities.")],
        ["Suppose the team still lacks reliable evidence about where applicants encounter the greatest administrative difficulties.", null],
        ["The sponsor could authorise investigation while requiring that evidence before approving a specific redesign investment.", iss("The improvement opportunity is strategically relevant, but the causes of applicant difficulties remain insufficiently understood.", "A condition for further work")],
        ["This approach distinguishes permission to investigate from approval to implement a particular solution.", null],
        ["It also allows learning without abandoning the strategic boundaries agreed by university leadership.", st("Acceptance criteria make handover disciplined while allowing unresolved questions to be investigated under controlled conditions.")],
        ["At Qasr, the same reasoning applies when guest arrival teams receive their authorised improvement mandate.", null],
        ["The deliverable must explain what the team may change and what requires renewed strategic approval.", q("What acceptance condition would protect academic standards while allowing admissions processes to become easier for applicants?")]
      ]
    },
    {
      title: "A logistics company preparing a warehouse improvement handover",
      lines: [
        ["Imagine a logistics company that wants to improve warehouse reliability while controlling the cost of handling customer orders.", t("Alternative explanation · Warehouse handover", "Strategy-phase deliverables help a logistics company move from executive agreement to controlled process improvement.")],
        ["Its executives agree that reducing fulfilment errors matters, but several managers interpret the improvement opportunity differently.", null],
        ["Warehouse managers want better picking procedures, while technology managers propose replacing the entire inventory management system.", iss("Managers support the same strategic objective but disagree about the appropriate improvement scope.", "A handover risk")],
        ["Both proposals might offer benefits, yet the company has not authorised a complete technology replacement.", null],
        ["The programme sponsor therefore needs to communicate what leadership has actually approved before detailed improvement work begins.", q("What should the project team receive so that it does not mistake investigation authority for investment approval?")],
        ["A strategy-phase mandate could identify fulfilment reliability as the intended outcome and define the relevant warehouse processes.", null],
        ["It could authorise examining picking, verification, and inventory information while excluding an immediate commitment to system replacement.", dg("Warehouse improvement mandate", D.flow(["Fulfilment|reliability", "Picking and|verification", "Inventory|information", "Approved|boundaries"]), "The mandate authorises investigation of fulfilment problems without automatically approving a replacement inventory system.")],
        ["The document should explain why those processes matter and identify the organisational benefits the improvement programme expects.", null],
        ["It should also record important dependencies, including cooperation between warehouse operations, information technology, and customer service.", null],
        ["These details make the mandate useful because process problems often extend beyond one department's immediate responsibilities.", st("A usable deliverable connects strategic purpose with process boundaries, expected benefits, dependencies, and accountable decision-makers.")],
        ["The sponsor must then decide whether the mandate satisfies agreed acceptance criteria before handing it to the improvement team.", null],
        ["Those criteria might require a clear objective, defined boundaries, named responsibilities, and documented unresolved assumptions.", null],
        ["The team should understand which decisions it may make independently and which require renewed sponsor approval.", cmp("a", "Document completion", "A project description has been written, but its authority and boundaries may remain uncertain.")],
        ["Acceptance is therefore a judgement about readiness for controlled work, not simply confirmation that paperwork exists.", cmp("b", "Formal acceptance", "The sponsor confirms that the mandate provides sufficient direction, authority, and conditions for the next phase.")],
        ["Suppose the team discovers that unreliable inventory records are causing errors across several warehouse activities.", null],
        ["The mandate may allow further investigation, but replacing the inventory system could exceed the approved investment scope.", iss("Evidence suggests a wider technology problem, but the proposed replacement exceeds existing authorisation.", "A controlled change decision")],
        ["The team should present its findings and request a scope decision rather than quietly committing to the replacement.", null],
        ["That approach preserves accountability while allowing new evidence to influence the eventual improvement solution.", st("Accepted deliverables provide stable direction without preventing justified changes through authorised decision-making.")],
        ["The same principle applies at Qasr when guest arrival and corporate billing teams encounter unexpected process dependencies.", null],
        ["Their accepted mandates should guide investigation while protecting the strategic choices already made by leadership.", q("How would you distinguish an accepted investigation mandate from permission to implement an expensive technology replacement?")]
      ]
    }
  ]
},
{
  title: "Benefits, baselines, targets and accountability",
  sec: "W5O4b",
  lines: [
    ["Qasr's proposed improvement mandate now has clear boundaries, but the steering group still needs a credible benefits agreement.", t("Benefits, baselines, targets and accountability", "A benefits agreement identifies expected strategic value, starting performance, intended results, and responsibility for demonstrating achievement.")],
    ["The programme director asks how anyone will know whether the authorised improvements eventually deliver their promised strategic value.", null],
    ["Completing a redesign is not enough, because implementation activity and organisational improvement are different achievements.", q("What evidence would convince you that Qasr's investment has actually delivered its intended benefits?")],
    ["Imagine the guest arrival team reporting that its redesigned procedures have been introduced across participating hotels.", null],
    ["That confirms implementation, but it does not establish whether guests experience better arrivals or stronger service.", iss("The redesigned process is operating, but its contribution to Qasr's strategic objectives remains unverified.", "Delivery versus benefit")],
    ["A benefit is a valuable organisational improvement expected from a change, such as greater reliability or lower costs.", null],
    ["Benefits should connect to strategic objectives rather than merely describe activities completed or technology installed.", st("A benefit describes valuable organisational change, while a deliverable describes something the programme produces or implements.")],
    ["For guest arrivals, a proposed benefit might be fewer avoidable delays and more dependable experiences for corporate travellers.", null],
    ["The team needs evidence showing whether those outcomes improve after the redesigned process begins operating.", dg("Connecting delivery to benefits", D.flow(["Redesigned|arrival process", "More reliable|arrivals", "Improved guest|experience", "Strategic|contribution"]), "Completing an arrival redesign creates an opportunity for benefits, but actual guest outcomes must demonstrate its strategic contribution.")],
    ["That evidence begins with a baseline, meaning the documented performance level before the improvement is introduced.", null],
    ["Suppose an illustrative study finds that guests currently wait twelve minutes on average during defined peak arrival periods.", fm("Illustrative arrival baseline", "Average peak waiting time = 12 minutes", "The illustrative twelve-minute baseline requires an agreed definition of waiting time and the peak periods being measured.")],
    ["The steering group might provisionally target eight minutes, subject to checking feasibility and service consequences.", null],
    ["That target represents intended performance, not a verified prediction or an existing commitment from Qasr's management.", st("A baseline records starting performance, while a target states the intended result under agreed measurement conditions.")],
    ["Managers must also consider variation, because an improved average could conceal unusually long waits for particular guests.", null],
    ["Guest feedback and booking accuracy could provide safeguards against achieving speed through rushed or unreliable service.", q("Would an eight-minute average prove success if some corporate guests still experienced unacceptable delays?")],
    ["Corporate billing requires its own benefits logic because implementing a new procedure does not guarantee stronger customer relationships.", null],
    ["The team might measure disputed invoices and resolution times alongside feedback from corporate account representatives.", dg("Corporate billing benefits", D.flow(["Billing|redesign", "Fewer invoice|disputes", "More reliable|relationships", "Corporate growth|support"]), "Billing measures can test whether process improvements strengthen the relationships supporting Qasr's corporate growth objective.")],
    ["These measures indicate possible contributions to growth, but they cannot independently prove that billing changes caused account growth.", null],
    ["Market conditions, pricing, sales activity, and customer preferences may also influence Qasr's commercial results.", st("Benefits evaluation should distinguish observed performance changes from claims that a particular improvement caused them.")],
    ["The steering group therefore needs agreed measurement definitions, credible data sources, and appropriate review periods.", null],
    ["It also needs accountability, meaning identifiable responsibility for monitoring results and responding when expected benefits do not emerge.", cmp("a", "Delivery accountability", "The programme manager confirms that authorised process changes have been implemented within agreed boundaries.")],
    ["A project manager may be responsible for implementation, while a business process owner remains responsible for operational performance.", cmp("b", "Benefits accountability", "The business owner monitors actual performance and explains whether expected organisational benefits are being realised.")],
    ["These responsibilities should be agreed rather than assumed, because successful implementation does not automatically establish benefits ownership.", null],
    ["Sponsors must also review significant deviations when actual results threaten other strategic commitments.", iss("Arrival waiting times improve, but guest satisfaction declines after implementation.", "A benefits conflict")],
    ["The responsible owner should investigate that conflict rather than report only the favourable waiting-time result.", null],
    ["The sponsor can then authorise corrective action when resolving the problem requires changes beyond delegated authority.", dg("Accountable benefits review", D.flow(["Verified|baseline", "Agreed|target", "Measured|result", "Owner|review"]), "Benefits accountability requires consistent measurement, comparison with agreed targets, and action when results diverge from expectations.")],
    ["Qasr's mandate should therefore identify expected benefits, measurement arrangements, accountable owners, and conditions for strategic review.", null],
    ["Those commitments allow later BPM phases to demonstrate value rather than simply celebrate completed improvement activities.", q("Can you distinguish a completed deliverable from a realised benefit and identify who should account for each?")]
  ],
  review: [
    {
      title: "A public library measuring service improvement",
      lines: [
        ["Let's understand benefits accountability through a public library introducing self-service borrowing to improve access and reduce routine administration.", t("Alternative explanation · Public library", "A library must distinguish installing self-service technology from demonstrating better service and responsible resource use.")],
        ["The library wants visitors to borrow materials conveniently while preserving assistance for people who need personal support.", null],
        ["Its project manager proposes self-service terminals and promises shorter queues at the borrowing desk.", iss("Installing self-service terminals may reduce queues, but the expected service benefit remains unverified.", "Implementation versus outcome")],
        ["The library approves the project, and the terminals become operational after employees receive appropriate training.", null],
        ["The project manager celebrates successful installation, but the library director asks whether visitors actually benefit.", q("What evidence would show that self-service borrowing has improved the library experience?")],
        ["The director needs a baseline describing borrowing performance before the new terminals were introduced.", null],
        ["Imagine an illustrative measurement showing an average borrowing wait of six minutes during defined busy periods.", fm("Illustrative library baseline", "Average busy-period wait = 6 minutes", "The illustrative six-minute baseline records borrowing waits before the proposed self-service improvement.")],
        ["The library might provisionally target three minutes, provided the change remains accessible and practical for visitors.", null],
        ["That target gives managers something specific to evaluate, but shorter waits alone cannot establish complete success.", null],
        ["Some visitors may struggle with the terminals and require more assistance than the original borrowing process demanded.", iss("Average waiting time falls, but some visitors experience greater difficulty borrowing materials.", "An incomplete benefit")],
        ["The library should therefore examine successful borrowing, visitor feedback, and access to employee assistance alongside waiting time.", null],
        ["Those measures help establish whether the technology improves the service experience rather than merely transferring work to visitors.", st("Benefits measurement should capture the intended organisational improvement and important consequences for different service users.")],
        ["The project manager can confirm installation, while the library operations manager monitors whether borrowing performance improves.", null],
        ["These responsibilities differ because delivering equipment and sustaining a better service require different forms of accountability.", cmp("a", "Project delivery", "The terminals are installed, tested, and available for visitors to use.")],
        ["The operations manager should investigate unexpected difficulties and recommend adjustments when the intended benefits do not appear.", cmp("b", "Benefit realisation", "Visitors complete borrowing successfully with shorter waits and appropriate assistance.")],
        ["The library director may need to authorise additional resources if corrective changes exceed the operations manager's authority.", null],
        ["This arrangement keeps responsibility visible after the installation project has formally ended.", dg("Library benefits accountability", D.flow(["Baseline|recorded", "Target|agreed", "Visitor results|measured", "Owner|responds"]), "The library should compare actual visitor outcomes with agreed targets and assign responsibility for responding to performance problems.")],
        ["Remember that an improvement becomes valuable through its organisational consequences, not simply because a planned solution was delivered.", null],
        ["At Qasr, the same distinction applies when redesigned arrivals and corporate billing procedures begin operating.", q("Who should demonstrate that self-service borrowing improves the library experience after the installation team finishes?")]
      ]
    },
    {
      title: "A manufacturer testing whether savings are real",
      lines: [
        ["Imagine a manufacturer investing in automated packaging equipment to reduce waste while maintaining dependable product quality.", t("Alternative explanation · Manufacturing benefits", "A manufacturer must establish whether promised savings become verified organisational benefits after implementation.")],
        ["The production director expects the equipment to reduce packaging material consumption and improve consistency across production shifts.", null],
        ["The project team installs the equipment successfully and reports that the new packaging process is operating.", iss("The equipment is installed, but its promised waste reduction and quality benefits still require evidence.", "Delivery is not realisation")],
        ["The finance director asks whether material consumption has actually fallen after accounting for changes in production volume.", null],
        ["That question matters because total material use can increase when production expands, even if packaging becomes more efficient.", q("How could the manufacturer measure waste reduction without confusing it with changes in production volume?")],
        ["A useful measure might express discarded packaging material relative to the number of acceptable units produced.", null],
        ["The manufacturer must define acceptable units consistently so changes in quality reporting do not distort the comparison.", fm("Packaging waste intensity", "Discarded material / Acceptable units produced", "Packaging waste intensity relates discarded material to acceptable production output using consistent measurement definitions.")],
        ["Imagine an illustrative baseline of fifty grams of discarded packaging material per acceptable unit before automation.", null],
        ["Management might set a provisional target of forty grams, representing a twenty percent reduction from that starting level.", fm("Illustrative waste reduction", "(50 - 40) / 50 × 100 = 20%", "Reducing illustrative waste intensity from fifty to forty grams per acceptable unit represents a twenty percent improvement.")],
        ["The target provides a clear expectation, but managers must still investigate whether the equipment can achieve it reliably.", null],
        ["They should also examine packaging defects because reducing material consumption must not compromise product protection.", iss("Lower material consumption could create additional damage if packaging quality deteriorates.", "A conflicting performance effect")],
        ["A balanced review would therefore consider waste intensity, packaging defects, rework, and actual material expenditure.", null],
        ["Those measures help establish whether the apparent efficiency improvement produces the financial and quality benefits originally expected.", st("Verified benefits require consistent baselines, credible targets, and evidence about both intended gains and unintended consequences.")],
        ["Now suppose waste intensity reaches the target, but damaged products increase during transportation to customers.", null],
        ["The production manager should investigate whether thinner packaging contributed to damage before declaring the project successful.", cmp("a", "Reported efficiency", "Packaging waste intensity reaches the agreed reduction target.")],
        ["The project team may have delivered the equipment correctly, even though the wider organisational benefit remains uncertain.", cmp("b", "Strategic benefit", "Material savings are achieved while acceptable product quality and customer protection are maintained.")],
        ["The manufacturer therefore needs separate accountability for project delivery and continuing operational performance after implementation.", null],
        ["The production process owner should monitor results and explain significant deviations from the expected benefits.", dg("Manufacturing benefits review", D.flow(["Equipment|delivered", "Waste|measured", "Quality|checked", "Owner|accountable"]), "Benefits accountability continues after installation through monitoring of waste, quality, and the organisational consequences of automation.")],
        ["If corrective changes require additional investment, the authorised sponsor should review the evidence and approve the appropriate response.", null],
        ["That arrangement prevents the organisation from treating installation success as proof that its strategic investment has succeeded.", null],
        ["At Qasr, equivalent accountability will be needed when service improvements and cost reductions are evaluated together.", st("An improvement is strategically successful when verified organisational benefits justify the investment without unacceptable damage elsewhere.")],
        ["Remember that baselines, targets, and accountable owners make benefits claims testable rather than merely persuasive.", q("How would you demonstrate that packaging automation delivers genuine savings without weakening product quality?")]
      ]
    }
  ]
},
{
  title: "Strategic discipline and forum preparation",
  sec: "W5O4c",
  lines: [
    ["Qasr's steering group is ready to close the strategy phase, with its proposed improvement mandate awaiting final approval.", t("Strategic discipline and forum preparation", "Strategic discipline means keeping improvement choices, implementation decisions, and expected benefits connected to organisational purpose.")],
    ["Before leaving Qasr, I want you to consider what makes this work valuable beyond the immediate funding decision.", null],
    ["The organisation has learned to question attractive proposals without dismissing the genuine operational benefits they might offer.", q("What would prevent Qasr's strategic priorities from disappearing once detailed process improvement begins?")],
    ["The answer is strategic discipline, meaning consistently testing improvement decisions against the organisation's agreed strategic direction.", null],
    ["That discipline matters because new information, departmental pressure, and implementation difficulties can gradually redirect an improvement programme.", st("Strategic discipline keeps improvement decisions consistent with agreed objectives, authorised boundaries, and accountable organisational choices.")],
    ["Imagine Qasr's guest arrival team discovering that a cheaper redesign would remove personal assistance during busy periods.", null],
    ["The proposal might appear attractive financially, but the team must examine its consequences for service leadership.", iss("A cheaper redesign could undermine the guest experience that originally justified the improvement investment.", "A strategic consistency test")],
    ["The team should not assume that an approved project gives it permission to pursue every available efficiency opportunity.", null],
    ["Instead, it should examine whether the proposed adjustment remains within the mandate and respects agreed service safeguards.", dg("Testing a proposed adjustment", D.flow(["Proposed|change", "Strategic|purpose", "Approved|boundaries", "Authorised|decision"]), "A proposed adjustment should be checked against strategic purpose and approved boundaries before implementation proceeds.")],
    ["If the change creates a significant conflict, the team should present evidence to the appropriate sponsor.", null],
    ["That approach protects accountability without preventing teams from learning or identifying better ways to achieve results.", st("Strategic discipline allows justified adaptation while requiring appropriate authority for changes affecting strategic commitments.")],
    ["Now imagine the corporate billing team reporting fewer disputes after introducing its redesigned invoicing procedures.", null],
    ["The improvement appears encouraging, but the sponsor should still examine whether corporate relationships have genuinely strengthened.", q("What evidence would distinguish a successful billing redesign from a strategically valuable improvement?")],
    ["The team should compare verified performance with agreed baselines and examine the benefits expected from the investment.", null],
    ["It should also recognise that corporate growth depends on other factors, including sales activity and market conditions.", dg("Reviewing strategic benefits", D.flow(["Process|performance", "Verified|benefits", "Strategic|contribution", "Sponsor|review"]), "Benefits review examines whether improved process performance contributes credibly to Qasr's strategic objectives.")],
    ["This completes our exploration of Organization Strategy as the foundation for subsequent BPM implementation decisions.", null],
    ["You have seen how strategic objectives influence investment choices, acceptable trade-offs, governance, and benefits accountability.", null],
    ["The important achievement is not memorising terminology, but developing a defensible way to reason about improvement decisions.", st("A defensible BPM recommendation connects strategic purpose, expected process effects, competing consequences, and accountable decisions.")],
    ["You will now apply that reasoning to a different organisation in your Week Five discussion forum.", null],
    ["The forum case is called Efficient in Every Direction at Once, and it introduces an unfamiliar organisational setting.", t("Week 5 · Session 2", "The assessed discussion forum asks you to apply the Organization Strategy phase to an unfamiliar organisation.")],
    ["Unlike our Qasr exercises, this activity contributes to Assessment One, Contribution to Discussions, worth fifteen percent.", null],
    ["The forum also connects with course learning outcomes K1, K2, and S1, as specified in the delivery plan.", st("Assessment 1 is a graded discussion worth 15%; Week 5 instruction and mastery tracking focus on K2 and S1.")],
    ["You should read the complete forum case and its exhibit before developing your position on the assigned question.", null],
    ["Look for the organisation's stated objectives and examine whether proposed efficiencies genuinely support those ambitions.", q("Which improvements advance the organisation's strategy, and which might create conflicts that require explicit judgement?")],
    ["Your response should explain the reasoning behind your position rather than simply identify an attractive operational improvement.", null],
    ["Use evidence from the case to connect expected process effects with strategic objectives and possible unintended consequences.", dg("Building a reasoned forum contribution", D.flow(["Case|evidence", "Strategic|interpretation", "Defended|position", "Acknowledged|trade-offs"]), "A strong discussion contribution uses case evidence to justify a strategic position while acknowledging competing consequences.")],
    ["Where objectives conflict, explain what the organisation might sacrifice and why your recommended balance is defensible.", null],
    ["Avoid inventing precise financial returns or treating qualitative alignment judgements as automatic investment decisions.", st("A persuasive strategic argument distinguishes evidence from assumptions and explains why its proposed trade-offs are justified.")],
    ["The delivery plan asks you to post a substantive response by mid-week and engage thoughtfully with classmates.", null],
    ["You should respond to at least two peers, challenging or extending their reasoning rather than offering simple agreement.", cmp("a", "Limited discussion response", "States a preferred improvement without explaining strategic consequences or engaging with alternative reasoning.")],
    ["A constructive reply might question an assumption, introduce a neglected strategic objective, or examine an overlooked implementation risk.", cmp("b", "Substantive discussion response", "Defends a position with case evidence and develops the discussion through reasoned engagement with peers.")],
    ["Read the facilitator's end-of-week summary to compare your reasoning with the wider discussion and identify remaining questions.", null],
    ["Remember that the assessed case is different from Qasr, so transfer the reasoning rather than copying our recommendation.", st("Transferable strategic judgement matters more than reproducing the funding choice developed in the Qasr case.")],
    ["You are now ready to evaluate improvement proposals through the strategic purpose they serve and the consequences they create.", q("Can you defend an improvement decision while recognising uncertainty, competing objectives, and the sacrifices your recommendation requires?")]
  ],
  review: [
    {
      title: "A museum preparing for its strategic improvement debate",
      lines: [
        ["Let's practise transferring your reasoning through a museum that wants to attract more visitors while preserving educational quality.", t("Alternative explanation · Museum strategy", "A museum must evaluate visitor growth initiatives against its educational purpose and limited operating resources.")],
        ["Its managers propose faster ticketing, shorter guided tours, additional exhibitions, and reduced staffing in quieter galleries.", null],
        ["Each proposal offers a possible benefit, but the museum cannot assume that every efficiency gain supports its strategy.", iss("The museum wants visitor growth and educational quality, but some proposed efficiencies may create conflicts.", "Competing strategic outcomes")],
        ["The operations manager favours shorter tours because guides could serve more visitors during each operating day.", null],
        ["The education manager worries that shorter tours might remove the explanations that make visits meaningful for school groups.", q("Would serving more visitors represent success if the museum's educational experience became less valuable?")],
        ["This question requires distinguishing operational performance from strategic contribution rather than simply choosing the faster process.", null],
        ["Shorter tours might increase capacity, but managers should investigate whether visitors still achieve the intended learning experience.", dg("Testing the museum proposal", D.flow(["Shorter|guided tours", "Higher visitor|capacity", "Educational|experience", "Strategic|judgement"]), "The museum should examine whether greater visitor capacity can be achieved without weakening its educational purpose.")],
        ["The museum could consider offering different tour formats while preserving appropriate educational experiences for groups needing deeper explanations.", null],
        ["That alternative might reduce the conflict, although it would still require evidence about staffing and visitor demand.", null],
        ["Managers should also recognise opportunity cost because resources allocated to one improvement cannot support another simultaneously.", st("Strategic discipline requires examining intended benefits, competing consequences, and the opportunities sacrificed by investment choices.")],
        ["Now imagine the museum's executive sponsor approving a limited trial of revised tours before committing to permanent changes.", null],
        ["The trial could examine visitor satisfaction, educational feedback, and the number of visitors served during comparable periods.", null],
        ["Those measures would help determine whether the proposed efficiency supports the museum's strategic objectives.", cmp("a", "Operational evidence", "The trial measures tour capacity, staffing requirements, and visitor waiting times.")],
        ["The sponsor should establish acceptable conditions and require renewed approval if the trial reveals important educational disadvantages.", cmp("b", "Strategic evidence", "The trial examines whether visitors continue receiving the educational experience the museum promises.")],
        ["This arrangement allows experimentation without allowing operational teams to redefine organisational priorities independently.", null],
        ["The museum's final recommendation should explain the expected benefit, possible sacrifice, supporting evidence, and responsible decision-maker.", st("A defensible recommendation explains why a proposed improvement serves strategy and how important risks will be managed.")],
        ["This is the reasoning you should bring to your Week Five discussion, even though its actual case differs.", null],
        ["Read the assigned case carefully and use its evidence rather than importing assumptions from this museum example.", null],
        ["Your classmates may reach different conclusions, so examine whether their arguments reveal neglected objectives or alternative trade-offs.", q("How would you challenge a recommendation that celebrates higher visitor numbers without examining educational quality?")]
      ]
    },
    {
      title: "A regional food distributor preparing a strategic argument",
      lines: [
        ["Imagine a regional food distributor whose strategy emphasises dependable deliveries, affordable operations, and strong relationships with restaurant customers.", t("Alternative explanation · Food distribution", "A distributor must defend improvement choices by connecting operational changes with strategic benefits and acceptable risks.")],
        ["Its managers propose larger delivery loads, automated ordering, fewer delivery windows, and improved handling of damaged products.", null],
        ["The operations director recommends larger loads because combining orders could reduce the number of delivery journeys.", iss("Larger delivery loads may reduce transport costs while affecting delivery reliability and product handling.", "A strategic tension")],
        ["The proposal seems financially attractive, but the distributor must examine whether it supports dependable service for restaurant customers.", null],
        ["Restaurants often depend on receiving ingredients within agreed delivery periods to prepare meals and manage inventory.", q("Would fewer delivery journeys justify an improvement if restaurants began receiving essential ingredients unpredictably?")],
        ["The distributor should investigate whether larger loads affect route duration, vehicle capacity, product condition, and delivery punctuality.", null],
        ["These relationships matter because a transport saving may create additional handling costs or weaken customer confidence.", dg("Examining the distribution proposal", D.flow(["Larger|delivery loads", "Fewer|journeys", "Delivery|reliability", "Customer|relationships"]), "The distributor should assess whether consolidated loads reduce costs without undermining reliable deliveries and customer relationships.")],
        ["Suppose the evidence suggests that consolidation works well for nearby customers but creates delays on longer routes.", null],
        ["Managers might recommend selective consolidation rather than applying the same operating rule throughout the distribution network.", null],
        ["That recommendation would recognise differences in operating conditions instead of assuming one efficient solution suits every customer.", st("Strategic reasoning evaluates where an improvement creates value and where its consequences may become unacceptable.")],
        ["The proposal should also identify who can approve changes affecting customer delivery commitments or additional operating expenditure.", null],
        ["A warehouse supervisor may adjust loading procedures, but changing contractual delivery arrangements could require higher-level authorisation.", cmp("a", "Operational authority", "The supervisor adjusts loading arrangements within approved service commitments and resource limits.")],
        ["Clear decision rights matter because process teams should not independently decide which strategic commitments may be weakened.", cmp("b", "Strategic authority", "The authorised sponsor decides whether proposed changes to customer commitments are acceptable.")],
        ["Now imagine another manager recommending improved damaged-product handling to reduce waste and strengthen customer confidence.", null],
        ["That proposal may offer different strategic benefits, requiring comparison rather than automatic rejection of the consolidation idea.", iss("Two improvements offer different combinations of cost savings, reliability, and customer relationship benefits.", "A funding choice")],
        ["A defensible recommendation would identify which objectives deserve emphasis and explain the consequences of choosing one proposal.", null],
        ["The distributor should also define how expected benefits will be measured after implementation and who remains accountable.", st("Strategic discipline continues after approval through benefits measurement, accountable ownership, and review of unexpected consequences.")],
        ["For your assessed forum, use the same approach when evaluating the unfamiliar organisation described in the assigned case.", null],
        ["Develop a reasoned position, acknowledge uncertainty, and examine how alternative recommendations might change the strategic balance.", null],
        ["When responding to classmates, challenge assumptions constructively and explain how different evidence could influence the decision.", dg("Reasoned discussion", D.flow(["Interpret|the case", "Defend|a position", "Examine|alternatives", "Engage|with peers"]), "A substantive forum contribution explains a strategic position and develops the discussion through thoughtful examination of alternatives.")],
        ["Remember that convincing arguments do not require pretending every trade-off can be resolved without sacrificing something valuable.", null],
        ["They require explaining why the selected balance is appropriate under the organisation's stated objectives and constraints.", q("Can you defend a recommendation while explaining what evidence might reasonably lead another manager to disagree?")]
      ]
    }
  ]
},
      ] },
    ]
  };
  // Claude review fixes (original line indices): sentence replacements, then removals in descending order.
  const FIX = [["W5O2b",-1,4,"That growth ambition means twenty-five percent more corporate accounts, so every proposal must be tested against three different targets."],["W5O2b",-1,7,"The slide also totals them, giving guest arrival eight and billing six, yet those weights remain a judgement, not a financial return."],["W5O2c",-1,13,"The slide does total the ratings, eight for arrival and six for billing, but those weights remain a judgement someone must own."],["W5O4a",-1,4,"For Qasr, the slide names agreed objectives with measures, a map from objectives to processes, signed trade-offs, and agreed exclusions."],["W5O4a",-1,26,"Once accepted, these outputs become the acceptance criteria for the whole programme, so every later phase is judged against them."],["W5O4b",-1,21,"The slide is explicit: the benefit belongs to the line owner who keeps the process, not to the project manager."],["W5O4c",-1,28,"Post your own answer by mid-week, before reading classmates\u0027 posts, and cite Jeston\u0027s chapter, because unsupported assertion earns no credit."],["W5O4c",-1,29,"Then reply substantively to at least two peers, and disagree with at least one, explaining the evidence behind your view."]];
  const CUT = [["W5O1b",1,19],["W5O1b",1,18],["W5O1b",1,12],["W5O1b",1,5],["W5O2b",1,21],["W5O2b",1,20],["W5O2b",1,13],["W5O2b",1,8],["W5O2c",1,20],["W5O2c",1,19],["W5O2c",1,11],["W5O2c",1,3],["W5O4c",1,18],["W5O4c",1,15],["W5O4c",1,10],["W5O4c",1,3]];
  COURSE.lessons.forEach((l) => l.sections.forEach((s) => {
    FIX.filter((f) => f[0] === s.sec).forEach((f) => { (f[1] < 0 ? s.lines : s.review[f[1]].lines)[f[2]][0] = f[3]; });
    CUT.filter((f) => f[0] === s.sec).forEach((f) => { s.review[f[1]].lines.splice(f[2], 1); });
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
