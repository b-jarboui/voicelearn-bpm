// OPER621 Business Process Management · Week 14 · The Sustainable Performance Phase.
// Source: Week 14 Session 1 slides and Week 14 Delivery Plan.
// Core reading: Jeston, Business Process Management: Practical Guidelines to Successful Implementation, 4th edition, Chapter 22.
// Running case: Qasr Hospitality Group, fourteen properties, twenty-two months after the first go-live, and the gradual erosion of a previously successful arrival process.
// Case title: The Measure Nobody Reads.
//
// COURSE LEARNING OUTCOMES
// K1: Analyse the utilization of Business Process Management in today's business environment.
// K3: Assess the importance of change management in relation to BPM
//     and devise solutions to minimize employees' resistance.
// S3: Coordinate people and the change process in organizations
//     to achieve BPM objectives.
//
// OFFICIAL WEEKLY LEARNING OUTCOMES
// O1 [K1; supporting K3, S3]: Assess how process performance is sustained after a programme ends.
// O2 [K3; supporting K1, S3]: Analyse the drift back towards prior performance when no individual has done anything wrong.
// O3 [S3; supporting K1, K3]: Devise governance that maintains and continuously improves processes.
//
// WEEK 14 LESSON PLAN
// Lesson l1: Why a successful process starts to decay       W14O1a, W14O2a, W14O2b   [O1, O2; K1, K3]
// Lesson l2: The measure nobody reads                      W14O2c, W14O1b, W14O1c   [O2, O1; K3, K1]
// Lesson l3: Governance that holds the gain                 W14O3a, W14O3b, W14O3c   [O3; S3]
// Lesson l4: Twenty-two months later: the Qasr decision    W14O2d, W14O3d, W14O1d   [O2, O3, O1; K3, S3, K1]
//
// FRAMEWORK POSITION
// Sustainable Performance is phase ten of the ten-phase BPM implementation framework.
// It follows Realize Value and establishes the continuing management of process performance.
// The ten phases are Organization Strategy, Process Architecture, Launch Pad,
// Understand, Innovate, People, Develop, Implement, Realize Value,
// and Sustainable Performance.
// Project management, people change management and leadership remain continuous across the framework.
// Sustainable Performance is not a terminal phase: evidence from operations
// can return the organisation deliberately to earlier phases.
// Sustaining performance means making BPM part of normal management,
// rather than treating improvement as a completed project.
//
// SOURCE-FAITHFUL CONTENT BOUNDARIES
// Explain the five mechanisms of decay identified in the slides:
// loss of ownership, unreviewed measures, accumulating local changes,
// informal retraining after staff turnover, and organisational change
// that is not reflected in the process.
// Explain the owner-centred cycle: measure, review, improve, embed.
// Distinguish reporting a measure from actively managing performance.
// Cover end-to-end measurement, adoption, exceptions, workarounds,
// local variants, review frequency, pre-agreed thresholds and responses.
// Preserve the four change-governance routes from the slides:
// below materiality: owner decides, with changes logged and reviewed
// in aggregate quarterly;
// changes affecting the end-to-end measure: owner plus affected functions,
// with the modelled effect stated before approval;
// controls added after incidents: owner plus risk, testing whether the risk
// remains live and whether the proposed control is the cheapest;
// changes to the process boundary: steering group and return to phase 3 scoping.
// Avoid a blanket approval gate that delays every legitimate change.
// Cover formal transfer from programme to line management, including
// a named recipient, transfer date, agreed obligations, process objectives,
// measure production, review meeting, and outstanding defects with owners and dates.
// Explain internal BPM capability, a centre of excellence, process maturity,
// and the ability to improve another process without funding a new programme.
//
// QASR CASE FACTS — EXHIBIT 14
// The group operates fourteen properties.
// The original phase 4 baseline for lobby-to-room arrival time was 82 minutes.
// At month 5 after full rollout, arrival time was 24 minutes and kiosk adoption was 65%.
// At month 13, arrival time was 28 minutes and kiosk adoption was 61%.
// At month 22, arrival time is 39 minutes and kiosk adoption is 48%.
// Arrival time has increased in each of the last six months.
// The appointed process owner was promoted to general manager of the Marina property
// nine months ago and was not replaced.
// Accountability was absorbed by the group operations director, who has thirteen direct reports.
// An analyst continues producing the end-to-end measure monthly.
// The measure appears on page four of the operations pack.
// It was last discussed at an operations meeting seven months ago,
// when arrival time was 28 minutes.
// Four separately approved changes were made after rollout:
// passport re-verification following a regulatory inspection;
// reduction of the rate waiver threshold from AED 400 to AED 150;
// addition of a loyalty enrolment prompt;
// and reinstatement of a permanent desk position at two heritage properties.
// Together these changes account for 13 of the 15 minutes added since month 5.
// Do not invent additional Qasr observations, measured effects, approvals or outcomes.
// Distinguish documented case evidence from proposed management interventions.
//
// PERFORMANCE TRIGGERS FROM THE SLIDES
// End-to-end measure worse than delivered by 10%: owner reports to operations meeting.
// Adoption below the rollout plateau by 5 percentage points: investigate residual cases.
// Exception volume above the designed range: revisit phase 5 exception design.
// Any unregistered process variant: initiate architecture review.
// These are proposed governance triggers, not evidence that Qasr already operated them.
// Distinguish percentage-point changes from relative percentage changes.
//
// TEACHING AND ASSESSMENT BOUNDARIES
// Session 1 uses formative questioning and worked examples; it has no graded assessment.
// The Qasr case supports analysis of governance, accountability and intervention priorities.
// Session 2 uses a different organisation in the forum case Nobody Did Anything Wrong.
// Do not invent that separate case or supply its answers.
// Brief Assessment 4 — Participation (10%) without presenting VoiceLearn checks as graded work.
// The participation assessment is linked to K1, K2, K3, S1, S2 and S3,
// but the Week 14 teaching and adaptive mappings use only K1, K3 and S3.
// The forum requires an initial substantive contribution, at least two substantive
// peer replies, engagement with a contrasting view, and support from Chapter 22.
//
// VISUAL AND NARRATION RULES
// Every narrated sentence is paired with a visual moment or null.
// Use the existing MOMENT_KIT helpers and existing moment types only.
// The only permitted diagram constructors are D.flow, D.lanes, D.hier,
// D.stairs, D.org, D.bars, D.route and D.cycle.
// Do not introduce new diagram or moment types.
// Every diagram caption must be a complete explanatory sentence.
// Narration should address the learner directly, use natural spoken language,
// and explain the reasoning behind management decisions.
// Use the Qasr case where it illuminates the slides and use distinct everyday
// examples in remediation without inventing source evidence.
//
// PRODUCTION STRUCTURE
// Course ID: oper621-w14.
// Exactly four lessons, three narrated parts per lesson, twelve parts in total.
// Each part: 430–570 narration words, sentence-linked visual moments,
// two alternative remedial micro-lessons of 230–360 words each,
// and twelve automatically graded questions using the six existing types.
// Total: 24 remedial micro-lessons and 144 formative questions.
// Mastery: target 80%, window 5, minimum evidence 3.
// Section identifiers, lesson assignments and outcome mappings are fixed by this header.
// Never contradict the Week 14 slides or invent Qasr case evidence.
//

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
    id: "oper621-w14",
    code: "OPER621",
    title: "Sustainable Performance",
    subtitle: "Business Process Management · Week 14",
    author: "Prof. Bassem Jarboui",
    teacher: { name: "Prof. Bassem Jarboui", email: "", sendReport: false },
    lessons: [
      { id: "l1", title: "Why a successful process starts to decay", sections: [
{
  title: "Phase ten: when BPM becomes management",
  sec: "W14O1a",
  lines: [
    ["Welcome to Week 14, where we explore what happens after a successful process improvement programme has finished.", t("OPER621 · Week 14", "The Sustainable Performance Phase: holding a gain that wants to decay.")],
    ["You have followed Qasr Hospitality Group from its original arrival problems through redesign, implementation and benefits realisation.", null],
    ["Now our attention moves from achieving an improvement to keeping that improvement alive during ordinary business operations.", dg("From improvement to sustainability", D.flow(["Redesign|the process", "Implement|the change", "Realize|the benefits", "Sustain|performance"]), "Sustainable Performance establishes how an organisation maintains and improves the benefits achieved through its BPM programme.")],
 
    ["This distinction matters because a successful project can finish while the process it improved gradually becomes less effective.", null],
    ["Imagine Qasr celebrating shorter guest arrival times, only to discover that those times are increasing again.", q("What protects a process improvement after the people who delivered it have returned to their normal responsibilities?")],
 
    ["We are now examining Sustainable Performance, which occupies phase ten of the ten-phase Business Process Management framework.", null],
    ["It follows Realize Value, the phase that examines whether the expected business improvements have actually been achieved.", dg("Phase ten: Sustainable Performance", D.route([9]), "Sustainable Performance is phase ten of the BPM framework and follows the Realize Value phase.")],
 
    ["Realize Value asks whether the redesigned process delivered its promised benefits, using evidence rather than implementation announcements.", null],
    ["Sustainable Performance asks whether the organisation can maintain those benefits while its people, priorities and operating conditions change.", cmp("Two connected responsibilities", "Realize Value", "Establishes whether the intended business benefits have actually been achieved.", "Sustainable Performance", "Maintains and improves process performance as organisational conditions change.")],
 
    ["Think about a restaurant that improves service speed while a specialist project team closely supervises its employees.", null],
    ["Once that team leaves, the restaurant still needs someone responsible for protecting the improved customer experience.", st("Sustainable performance requires continuing management responsibility rather than temporary attention from a project team.")],
 
    ["At Qasr, the original lobby-to-room arrival time was eighty-two minutes before the redesigned process was introduced.", null],
    ["Within five months of full rollout, that measure had fallen to twenty-four minutes across the fourteen properties.", dg("Qasr's original improvement", D.bars([["Baseline", 82], ["Month 5", 24]]), "Qasr reduced its lobby-to-room arrival time from 82 minutes to 24 minutes within five months of full rollout.")],
 
    ["That improvement demonstrated substantial progress, but it did not guarantee that the organisation would maintain the result indefinitely.", null],
    ["Twenty-two months after the initial go-live, Qasr's arrival time has increased to thirty-nine minutes.", iss("Qasr achieved a major improvement, but its later performance shows that realised benefits can deteriorate.", "The sustainability challenge")],
 
    ["The important question is not simply whether the original project succeeded, because the earlier improvement was real.", null],
    ["We must examine what happened to the management arrangements that were supposed to protect the improved process.", q("What would you investigate when a previously successful process begins losing its improvement?")],
 
    ["This is where BPM must stop depending on a temporary programme and become part of normal organisational management.", null],
    ["A programme is a coordinated effort with defined objectives, resources and an eventual conclusion, unlike continuing operational responsibility.", st("Sustainability begins when managing process performance becomes part of everyday organisational responsibility.")],
 
    ["The organisation therefore needs a process owner who remains accountable for performance after the implementation team has departed.", null],
    ["That owner needs authority to address problems, because responsibility without decision-making power cannot reliably protect an end-to-end process.", dg("Accountability beyond the programme", D.org("process", {top: "Process owner", depts: ["Operational functions", "Performance review", "Improvement decisions"]}), "A continuing process owner coordinates operational responsibilities, performance review and improvement decisions after the programme ends.")],
 
    ["The owner also needs meaningful performance information, discussed regularly by people who can take action when results deteriorate.", null],
    ["Simply producing a monthly report does not protect performance if nobody uses its evidence to make decisions.", iss("A performance measure supports sustainability only when responsible managers review it and act on its findings.", "Measurement must influence decisions")],
 
    ["Sustainable management follows a repeating cycle in which people measure performance, review results, improve weaknesses and embed changes.", null],
    ["Embedding means making an improvement part of normal working practice, so employees do not depend on temporary project supervision.", dg("The sustainable performance cycle", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The process owner sustains improvement through a repeating cycle of measurement, review, improvement and embedding.")],
 
    ["Notice that this final framework phase does not mean the organisation has finished learning about its processes.", null],
    ["Evidence from everyday operations may reveal problems requiring another examination of strategy, architecture, scope or process design.", dg("The framework remains connected", D.flow(["Operational|evidence", "Identify|new needs", "Revisit|earlier phases", "Improve|the process"]), "Sustainable Performance uses operational evidence to return deliberately to earlier BPM phases when further improvement is necessary.")],
 
    ["Project management, people change management and leadership remain important because sustained improvement still requires coordination and organisational commitment.", null],
    ["Next, we will examine why performance can deteriorate even when individual employees believe they are doing their jobs properly.", t("The question ahead", "Why can a successful process deteriorate when nobody has deliberately done anything wrong?")]
  ],
  review: [
    {
      title: "The clinic that kept its improvement alive",
      lines: [
        ["Let's explore sustainable performance through an illustrative example involving a clinic that wants to improve its appointment service.", t("Another way to understand sustainability", "A clinic illustrates why a successful improvement needs continuing management after its project ends.")],
 
        ["Imagine the clinic redesigning appointment scheduling because patients regularly wait too long between requesting and receiving an appointment.", null],
        ["A temporary improvement team studies the delays, removes unnecessary steps and introduces a clearer scheduling procedure for employees.", dg("The clinic improvement programme", D.flow(["Identify|delays", "Redesign|scheduling", "Introduce|changes", "Evaluate|results"]), "The clinic redesigns its scheduling process and evaluates whether the changes improve appointment access.")],
 
        ["The clinic then observes shorter waiting times, suggesting that the redesigned process has delivered the improvement it intended.", null],
        ["The project manager announces completion, and the specialist team returns to its other responsibilities within the organisation.", st("A completed improvement project does not automatically create the management arrangements needed to sustain its results.")],
 
        ["Now imagine that new employees join the clinic and learn scheduling procedures informally from colleagues working beside them.", null],
        ["Those colleagues may explain familiar shortcuts without recognising that the shortcuts gradually undermine the redesigned appointment process.", q("Who will notice when everyday scheduling practices begin moving away from the agreed process?")],
 
        ["The clinic needs a named process owner whose responsibilities include maintaining appointment performance across the complete patient journey.", null],
        ["That person must have sufficient authority to coordinate employees when scheduling problems involve more than one department.", dg("Continuing process ownership", D.org("process", {top: "Scheduling owner", depts: ["Reception", "Clinical teams", "Appointment support"]}), "The scheduling owner coordinates the functions responsible for maintaining the complete appointment process.")],
 
        ["The owner also needs a measure showing how long patients actually wait, rather than how quickly individual departments complete tasks.", null],
        ["A regular review meeting allows managers to identify deterioration and agree practical responses before delays become established.", st("Sustained performance depends on end-to-end measures being reviewed by people who can make corrective decisions.")],
 
        ["Suppose the clinic discovers that appointment delays are increasing because staff have gradually reintroduced unnecessary approval steps.", null],
        ["The owner can investigate those steps, agree appropriate changes and ensure employees understand the revised operating procedure.", dg("The clinic's sustaining cycle", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The clinic sustains appointment performance by reviewing results, correcting weaknesses and embedding agreed improvements.")],
 
        ["Embedding the improvement means updating everyday instructions and helping new employees learn the approved procedure rather than inherited shortcuts.", null],
        ["The clinic can then maintain its scheduling process without requiring the original improvement team to return whenever difficulties arise.", cmp("Two different achievements", "Project completion", "The redesigned appointment process has been introduced and evaluated.", "Sustainable management", "The clinic can maintain and improve appointment performance through its normal management arrangements.")],
 
        ["This example helps you understand why Qasr's successful arrival redesign could not guarantee permanently shorter guest waiting times.", null],
        ["Both organisations need continuing ownership, active measurement and the ability to improve their processes after implementation ends.", q("What would convince you that the clinic has developed sustainable management rather than completed another temporary improvement project?")]
      ]
    },
    {
      title: "The delivery company that learned to improve without another project",
      lines: [
        ["Now consider an illustrative delivery company that improves parcel handling but wants those improvements to survive changing business conditions.", t("From project success to organisational capability", "A delivery company illustrates how continuous process management becomes an internal organisational capability.")],
 
        ["Imagine the company introducing a redesigned parcel-sorting process after discovering repeated delays between receiving parcels and dispatching them.", null],
        ["A specialist project team develops clearer procedures, trains employees and helps the organisation introduce the new operating arrangements.", dg("The delivery improvement programme", D.flow(["Understand|delays", "Redesign|sorting", "Train|employees", "Introduce|process"]), "The delivery company uses a temporary improvement programme to redesign and introduce its parcel-sorting process.")],
 
        ["The redesigned process performs better during the initial operating period, and senior managers recognise the programme's achievement.", null],
        ["However, the company cannot assume that changing delivery volumes and employee responsibilities will leave its new process unaffected.", st("An improvement must remain effective as the organisation and its operating environment continue to change.")],
 
        ["Suppose parcel volumes increase and employees begin developing informal methods to handle pressure during their busiest working periods.", null],
        ["Those methods may appear reasonable locally, but their combined effect could create delays elsewhere in the delivery process.", q("How can the company respond to changing conditions without repeatedly launching expensive improvement programmes?")],
 
        ["The answer begins with giving operational managers responsibility for monitoring and improving the process as part of normal work.", null],
        ["A named owner coordinates the complete parcel journey, ensuring that local decisions consider consequences for other activities.", dg("Managing the complete parcel journey", D.flow(["Receive|parcels", "Sort|parcels", "Prepare|dispatch", "Deliver|parcels"]), "End-to-end process ownership helps the delivery company evaluate how local operating decisions affect the complete parcel journey.")],
 
        ["The company also develops internal improvement capability, meaning employees can diagnose problems and design better working arrangements themselves.", null],
        ["A centre of excellence can support this capability by preserving process knowledge, methods and expertise across different improvement activities.", st("Internal BPM capability allows an organisation to improve processes without depending entirely on temporary external specialists.")],
 
        ["That capability matters because consultants and project teams eventually leave, while the organisation continues facing new operational problems.", null],
        ["Managers should therefore maintain useful measures, review performance and support employees in proposing improvements based on operational evidence.", dg("Continuous improvement in everyday management", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The delivery company develops a continuing improvement cycle supported by operational managers and internal process expertise.")],
 
        ["Over time, this approach can strengthen process maturity, which describes how systematically an organisation manages and improves its processes.", null],
        ["The practical test is whether employees can improve another process without waiting for a separately funded transformation programme.", cmp("Temporary improvement versus lasting capability", "Project-based improvement", "A dedicated team delivers a defined change before completing its assignment.", "Organisational BPM capability", "Operational managers and internal specialists can maintain and improve processes continuously.")],
 
        ["Qasr faces the same challenge because its fourteen properties must protect the arrival improvement after the original programme ends.", null],
        ["Sustainable Performance makes that responsibility permanent while allowing new evidence to trigger further redesign when circumstances genuinely require it.", q("Would you describe the delivery company as mature if every new process problem still required another externally managed improvement programme?")]
      ]
    }
  ]
},
{
  title: "Five ways a good process quietly deteriorates",
  sec: "W14O2a",
  lines: [
    ["Last time, we saw why a successful improvement needs continuing management after the original programme has finished.", t("Why good processes deteriorate", "Five mechanisms can gradually erode a successful improvement without any deliberate wrongdoing.")],
    ["Now let's examine how a well-designed process can gradually lose performance while everyone continues working conscientiously.", null],
    ["This matters because blaming employees can distract managers from weaknesses in the arrangements surrounding the process itself.", q("How can a process become less effective when the people involved believe they are doing their jobs properly?")],
 
    ["Think of process deterioration as a gradual movement away from the performance achieved when the improvement was introduced.", null],
    ["That movement is called performance drift, and it often develops through several small changes rather than one dramatic failure.", dg("How performance drift develops", D.flow(["Improvement|achieved", "Small changes|accumulate", "Performance|drifts", "Benefits|erode"]), "Performance drift occurs when accumulated operational changes gradually weaken the benefits delivered by an improved process.")],
 
    ["At Qasr Hospitality Group, the redesigned arrival process reduced lobby-to-room time from eighty-two minutes to twenty-four minutes.", null],
    ["Yet twenty-two months after the initial go-live, the same measure had increased to thirty-nine minutes.", dg("Qasr's performance drift", D.bars([["Baseline", 82], ["Month 5", 24], ["Month 22", 39]]), "Qasr's lobby-to-room arrival time improved to 24 minutes before increasing to 39 minutes by month 22.")],
 
    ["One important mechanism is the disappearance of clear process ownership when the person originally responsible changes roles.", null],
    ["Qasr's appointed process owner was promoted to general manager of the Marina property nine months ago.", dg("When ownership becomes diluted", D.org("process", {top: "Group operations director", depts: ["Thirteen direct reports", "Arrival process accountability"]}), "After the appointed process owner was promoted, arrival process accountability was absorbed by a group operations director with thirteen direct reports.")],
 
    ["The group operations director absorbed that accountability while already managing thirteen direct reports, making focused oversight more difficult.", null],
    ["Without a dedicated owner, problems crossing departmental boundaries may remain unresolved because nobody coordinates the complete process.", st("A process needs continuing end-to-end accountability, especially when operational responsibilities or reporting relationships change.")],
 
    ["Another mechanism appears when performance measures continue being produced but stop influencing decisions made by operational managers.", null],
    ["At Qasr, an analyst still prepares the arrival measure monthly, and it appears on page four of the operations pack.", dg("The measure nobody reads", D.flow(["Analyst|produces measure", "Operations pack|contains measure", "Management review|not sustained"]), "Qasr continues producing the arrival measure, but its presence in the operations pack has not ensured sustained management attention.")],
 
    ["The measure was last discussed at an operations meeting seven months ago, when arrival time was twenty-eight minutes.", null],
    ["This distinction matters because reporting provides information, while governance requires someone to interpret that information and respond.", q("What value does a performance measure provide if nobody uses it to decide whether intervention is necessary?")],
 
    ["A further mechanism develops when individual departments introduce reasonable local changes without examining their combined end-to-end consequences.", null],
    ["Qasr approved passport re-verification, a lower rate waiver threshold, a loyalty enrolment prompt and additional permanent desk staffing.", dg("Local decisions can accumulate", D.flow(["Local|decisions", "Additional|process steps", "Combined|operational effect", "Longer|arrival time"]), "Individually approved changes can accumulate and affect end-to-end performance even when each decision has a reasonable local justification.")],
 
    ["Together, these changes account for thirteen of the fifteen additional minutes recorded since Qasr achieved its month-five result.", null],
    ["The lesson is not that every change was mistaken, but that local approval alone cannot protect overall process performance.", iss("A locally reasonable decision can still weaken end-to-end performance when its cumulative effects are not assessed.", "Local logic is not system logic")],
 
    ["Performance can also drift when employee turnover leads to informal retraining that gradually replaces the originally agreed operating procedure.", null],
    ["For illustration, imagine experienced receptionists teaching new colleagues familiar shortcuts instead of the approved arrival process.", dg("How informal retraining creates drift", D.flow(["Approved|procedure", "Informal|instruction", "Repeated|shortcuts", "Changed|practice"]), "Informal retraining can gradually replace the agreed process with inherited working habits.")],
 
    ["Those shortcuts may feel helpful during busy periods, yet repeated departures from the design can undermine consistent performance.", null],
    ["We should treat this as a possible mechanism, not as an established explanation for Qasr's documented deterioration.", st("The Qasr evidence establishes ownership, measurement and local-change problems; informal retraining remains a general risk rather than a confirmed case finding.")],
 
    ["Organisational change creates another vulnerability when the process remains unchanged despite new responsibilities, structures or operating conditions.", null],
    ["A previously effective design may no longer fit its environment, so managers must reconsider how the process should operate.", dg("Keeping process design aligned", D.cycle("loop", {mid: "Monitor|conditions|Review|process fit|Adapt|design|Embed|changes"}), "Sustainable management requires reviewing whether the process still fits changing organisational conditions.")],
 
    ["Notice how these mechanisms reinforce one another when ownership weakens, measurement loses attention and local changes accumulate unchecked.", null],
    ["That is why sustainable performance requires a management system rather than another reminder asking employees to work harder.", cmp("Two explanations for deterioration", "Individual blame", "Assumes performance deteriorates mainly because employees fail to follow instructions.", "System diagnosis", "Examines ownership, measurement, accumulated changes, learning practices and organisational conditions.")],
 
    ["In our next part, we will investigate why individually reasonable decisions can collectively produce an unreasonable operational result.", t("The question ahead", "How can everyone make defensible local decisions while the complete process becomes steadily worse?")]
  ],
  review: [
    {
      title: "The library where small changes became a big delay",
      lines: [
        ["Let's examine performance drift through an illustrative public library that previously improved its book reservation and collection process.", t("Another way to understand process drift", "A library illustrates how individually reasonable operational changes can accumulate into slower service.")],
 
        ["Imagine the library redesigning reservations so readers can collect requested books quickly from a clearly organised service counter.", null],
        ["The improvement works well initially because responsibilities are clear and employees follow a shared procedure for preparing collections.", dg("The improved library process", D.flow(["Receive|reservation", "Locate|book", "Prepare|collection", "Release|book"]), "The library's redesigned reservation process coordinates activities to reduce the time readers spend collecting books.")],
 
        ["Later, the original process owner moves into another role, and responsibility becomes distributed across several library supervisors.", null],
        ["Each supervisor remains conscientious, but nobody regularly examines whether the complete reservation process still performs as intended.", st("When end-to-end ownership becomes unclear, local responsibilities can continue while overall process performance loses attention.")],
 
        ["Now imagine one supervisor introducing additional identity checks because several readers collected books reserved under similar names.", null],
        ["Another supervisor adds a confirmation step to reduce misplaced reservations, while colleagues introduce extra recordkeeping for accountability.", dg("Accumulating local changes", D.flow(["Identity|check", "Additional|confirmation", "Extra|recordkeeping", "Longer|collection time"]), "Several locally justified controls can increase total collection time when their combined effects are not reviewed.")],
 
        ["Each decision has a reasonable explanation, so individual supervisors may see little reason to question their own changes.", null],
        ["However, readers experience the combined process, not the separate intentions that motivated each additional activity.", q("Who should examine whether the combined service remains efficient after several individually reasonable changes?")],
 
        ["Suppose the library continues collecting waiting-time information but rarely discusses it during its regular management meetings.", null],
        ["The numbers might reveal deterioration, yet the organisation gains little benefit unless managers interpret them and take action.", st("Producing a measure does not sustain performance unless someone is accountable for reviewing and responding to its findings.")],
 
        ["New employees might also learn the increasingly complicated procedure informally, making temporary adjustments seem like permanent requirements.", null],
        ["Over time, these inherited practices can become difficult to distinguish from the originally approved reservation process.", dg("How deterioration becomes normal", D.cycle("loop", {mid: "Local changes|Informal learning|Established habits|Further changes"}), "Repeated local adjustments and informal learning can normalise practices that differ from the intended process.")],
 
        ["The library therefore needs a named owner who can examine performance across the complete reservation and collection journey.", null],
        ["That owner should review meaningful measures and assess proposed changes against their consequences for readers and employees.", cmp("Managing local decisions", "Without process governance", "Each supervisor evaluates a change mainly against the needs of their own activity.", "With process governance", "A process owner evaluates local changes against the performance of the complete service.")],
 
        ["This example helps explain Qasr's deterioration without assuming that its employees deliberately ignored their responsibilities or harmed guests.", null],
        ["The important diagnosis concerns the management arrangements that allowed separate decisions to weaken the performance of the whole process.", q("Would blaming the library assistants solve the underlying problem, or would restoring process ownership provide a stronger response?")]
      ]
    },
    {
      title: "The warehouse where the process stopped fitting the work",
      lines: [
        ["Now consider an illustrative warehouse where an effective order-picking process gradually becomes less suitable for everyday operations.", t("A different source of performance drift", "A warehouse illustrates how organisational change and informal retraining can undermine an established process.")],
 
        ["Imagine the warehouse introducing a redesigned picking procedure that reduces unnecessary walking and helps employees prepare orders more efficiently.", null],
        ["The new procedure works because storage locations, employee responsibilities and order volumes match the assumptions behind its design.", dg("The warehouse's original improvement", D.flow(["Receive|order", "Locate|items", "Pick|items", "Prepare|dispatch"]), "The redesigned warehouse process coordinates order picking and dispatch around the operating conditions present when it was introduced.")],
 
        ["Over time, imagine the warehouse expanding its product range and reorganising storage areas to accommodate additional categories of merchandise.", null],
        ["Employees now encounter conditions that differ from those considered when the original picking routes and responsibilities were established.", st("An effective process can become less suitable when the organisation changes but the process design remains unchanged.")],
 
        ["Experienced employees respond by developing practical shortcuts that help them navigate the revised warehouse layout during busy periods.", null],
        ["Their intention is to complete orders efficiently, but different teams may gradually develop incompatible ways of working.", dg("Informal adaptation after organisational change", D.flow(["Changed|conditions", "Local|shortcuts", "Different|practices", "Process|variation"]), "When operating conditions change without a coordinated redesign, local adaptations can create inconsistent process variants.")],
 
        ["Now imagine new employees learning these shortcuts from experienced colleagues rather than receiving consistent training in an approved procedure.", null],
        ["The warehouse gradually loses a shared understanding of how orders should move through the complete picking and dispatch process.", q("How would a new employee distinguish an approved procedure from a shortcut that colleagues have simply used for years?")],
 
        ["This illustrates informal retraining, where operational knowledge passes between colleagues without systematic reference to the agreed process design.", null],
        ["Informal learning is not inherently harmful, but it becomes risky when nobody checks whether inherited practices remain appropriate.", st("Employee experience is valuable, but sustainable performance requires keeping practical knowledge aligned with the approved process.")],
 
        ["Suppose the warehouse still measures completed orders while overlooking delays created between picking, checking and final dispatch.", null],
        ["Managers might celebrate strong departmental productivity even as customers experience slower delivery across the complete order journey.", dg("Local measures versus end-to-end performance", D.flow(["Picking|productivity", "Checking|delays", "Dispatch|waiting", "Customer|experience"]), "Strong performance in one activity does not guarantee that the complete warehouse process delivers the intended customer outcome.")],
 
        ["A process owner should therefore examine whether operating conditions, employee practices and performance measures still support the intended outcome.", null],
        ["When the original design no longer fits, the appropriate response may involve redesigning the process rather than enforcing outdated instructions.", cmp("Responding to deterioration", "Enforce the old procedure", "Assumes the original design remains appropriate despite changes in operating conditions.", "Review process fit", "Examines changed conditions and updates the design when evidence shows that adaptation is necessary.")],
 
        ["Remember that these warehouse developments are illustrative, not additional facts about Qasr Hospitality Group or its arrival process.", null],
        ["They help you recognise why sustainable BPM must combine operational discipline with the ability to adapt intelligently.", q("When working conditions change substantially, why might enforcing an outdated process make performance worse rather than better?")]
      ]
    }
  ]
},
{
  title: "Nobody did anything wrong - so why did performance fall?",
  sec: "W14O2b",
  lines: [
    ["We have seen how ownership gaps, neglected measures and accumulating changes can gradually weaken a successful process.", t("Nobody did anything wrong", "Why individually reasonable decisions can produce collectively disappointing performance.")],
    ["Now I want you to examine a more difficult possibility, where everyone acts reasonably but overall performance deteriorates.", null],
    ["This matters because finding someone to blame is not the same as understanding why the process stopped working.", q("Can every local decision be defensible while the complete process becomes less effective?")],
 
    ["Return to Qasr Hospitality Group, where the redesigned arrival process initially reduced waiting time to twenty-four minutes.", null],
    ["Twenty-two months after the initial go-live, arrival time has reached thirty-nine minutes, despite the earlier successful redesign.", dg("Qasr's performance trajectory", D.bars([["Baseline", 82], ["Month 5", 24], ["Month 13", 28], ["Month 22", 39]]), "Qasr's arrival time fell from 82 to 24 minutes before gradually increasing to 39 minutes by month 22.")],
 
    ["The increase represents fifteen additional minutes since month five, with arrival time rising during each of the latest six months.", null],
    ["That pattern suggests sustained deterioration rather than an isolated operational incident, so we need to investigate its underlying mechanisms.", st("Repeated deterioration calls for a system-level diagnosis rather than an explanation based on one disappointing observation.")],
 
    ["Consider the passport re-verification requirement introduced after a regulatory inspection, which added another step to guest arrivals.", null],
    ["The requirement had a compliance justification, so removing it without examining that obligation would be an irresponsible response.", dg("A locally justified control", D.flow(["Regulatory|inspection", "Passport|re-verification", "Additional|arrival activity"]), "Passport re-verification was introduced following a regulatory inspection and became an additional activity within Qasr's arrival process.")],
 
    ["Qasr also reduced the rate waiver threshold from four hundred dirhams to one hundred and fifty dirhams.", null],
    ["That decision changed the financial discretion available within the process, although the exhibit does not establish its individual time impact.", cmp("Financial control and process performance", "Local decision", "The rate waiver threshold was reduced from AED 400 to AED 150.", "End-to-end question", "How does the revised decision rule affect the complete guest arrival experience?")],
 
    ["A loyalty enrolment prompt was added, creating another interaction within the arrival journey that managers needed to consider.", null],
    ["Two heritage properties also reinstated a permanent desk position, introducing a local variation into the redesigned operating arrangements.", dg("Four approved changes", D.hier([["Passport re-verification", ""], ["Lower rate waiver threshold", ""], ["Loyalty enrolment prompt", ""], ["Permanent desk at two properties", ""]]), "Four separately approved changes altered Qasr's arrival process after the successful rollout.")],
 
    ["Each change may have addressed a legitimate local concern, but approval did not establish that their combined effect was acceptable.", null],
    ["Together, the four changes account for thirteen of the fifteen additional minutes recorded since the month-five result.", iss("The combined effect of locally approved changes can undermine the performance of the complete process.", "Local approval is not end-to-end governance")],
 
    ["This is a coordination problem because separate decision makers may optimise their responsibilities without evaluating consequences across departmental boundaries.", null],
    ["The guest experiences the complete arrival journey, not the individual explanations supporting each decision made along that journey.", dg("Local decisions and the guest journey", D.flow(["Local|requirements", "Separate|approvals", "Accumulated|activities", "Guest|arrival time"]), "Separate local decisions can increase the time experienced by guests when their combined effects are not governed.")],
 
    ["Notice another important distinction between a decision being reasonable and its consequences remaining acceptable as circumstances change.", null],
    ["Managers can respect legitimate controls while examining whether their implementation creates unnecessary waiting or duplicated work.", q("How could Qasr protect necessary controls while reconsidering the way those controls operate within the arrival journey?")],
 
    ["The governance weakness becomes clearer when we remember that Qasr's appointed process owner was promoted nine months ago.", null],
    ["Accountability moved to a group operations director with thirteen direct reports, leaving the process without a dedicated replacement.", dg("The missing coordinating role", D.org("process", {top: "Group operations director", depts: ["Thirteen direct reports", "Arrival process accountability"]}), "Arrival process accountability was absorbed by the group operations director after the appointed owner was promoted.")],
 
    ["Meanwhile, the analyst continued producing monthly performance information, but management discussion of the measure had not been sustained.", null],
    ["These conditions help explain how deterioration could continue without requiring an assumption that employees deliberately ignored their duties.", st("Weak ownership and inactive performance review can allow reasonable local decisions to produce unmanaged cumulative consequences.")],
 
    ["Our diagnosis therefore separates individual intentions from system outcomes, because good intentions cannot substitute for coordinated process governance.", null],
    ["In the next lesson, we will examine how a measure becomes useful only when managers actually read and act upon it.", t("The lesson to carry forward", "Sustaining performance requires someone to evaluate the combined consequences of reasonable local decisions.")]
  ],
  review: [
    {
      title: "The university admissions process where everyone followed the rules",
      lines: [
        ["Let's explore this problem through an illustrative university admissions process where departments introduce sensible controls for different reasons.", t("Another way to understand system-level failure", "A university illustrates how legitimate departmental requirements can collectively create unnecessary delays.")],
 
        ["Imagine a university redesigning postgraduate admissions so applicants receive decisions more quickly without weakening academic or administrative standards.", null],
        ["The redesigned process initially works because departments coordinate their responsibilities and avoid requesting the same information repeatedly.", dg("The improved admissions process", D.flow(["Receive|application", "Check|eligibility", "Review|academic fit", "Communicate|decision"]), "The university's redesigned admissions process coordinates administrative checks and academic review to reduce unnecessary waiting.")],
 
        ["Later, imagine the finance department requesting additional documentation to reduce the risk of incorrect fee classifications.", null],
        ["The academic department introduces another verification step because reviewers want greater confidence in applicants' supporting qualifications.", dg("Separate departmental requirements", D.hier([["Finance documentation", ""], ["Academic verification", ""], ["Administrative checks", ""]]), "Different university departments introduce additional requirements to address concerns within their own responsibilities.")],
 
        ["Each department has a legitimate concern, and its employees may be following the approved instructions completely correctly.", null],
        ["However, applicants experience the combined sequence of requirements, including any waiting created between separate departmental activities.", q("Who is responsible for evaluating whether the complete admissions journey remains acceptable after these changes?")],
 
        ["Suppose nobody has been appointed to manage admissions performance across the entire journey from application to final decision.", null],
        ["Department managers continue meeting their individual obligations, while the university loses visibility over the applicant's complete experience.", st("Departmental compliance does not guarantee satisfactory end-to-end performance when no owner coordinates the complete process.")],
 
        ["The university might still produce monthly admissions reports, but those reports cannot improve performance without meaningful management discussion.", null],
        ["A useful review would examine where delays accumulate and whether the additional controls achieve their intended purposes efficiently.", dg("Turning information into governance", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "Admissions managers need a recurring process for interpreting performance evidence and coordinating improvements across departments.")],
 
        ["The appropriate response is not automatically to remove financial or academic checks, because some controls may remain essential.", null],
        ["Instead, a process owner should examine whether checks can be coordinated, simplified or performed without unnecessary waiting.", cmp("Two responses to slow admissions", "Blame departments", "Assumes employees caused the delays by failing to perform their assigned responsibilities.", "Examine the system", "Evaluates how legitimate requirements interact across the complete admissions process.")],
 
        ["This distinction also matters at Qasr, where the approved changes may have served legitimate regulatory and operational purposes.", null],
        ["The management failure lies in allowing their combined consequences to escape sustained end-to-end review and coordination.", q("Why would asking university employees to work harder be less effective than examining how departmental requirements interact?")]
      ]
    },
    {
      title: "The hospital discharge process with competing responsibilities",
      lines: [
        ["Now consider an illustrative hospital discharge process where different professionals protect important outcomes but patients still experience unnecessary delays.", t("A different angle on collective performance", "A hospital illustrates how competing professional responsibilities can create delays without individual negligence.")],
 
        ["Imagine a hospital redesigning discharge procedures so patients can leave promptly once their treatment and necessary arrangements are complete.", null],
        ["The improved process coordinates clinical decisions, medication preparation and administrative clearance around the patient's complete discharge journey.", dg("The hospital discharge journey", D.flow(["Clinical|clearance", "Medication|preparation", "Administrative|completion", "Patient|departure"]), "The discharge process depends on several professional activities being coordinated around the patient's departure.")],
 
        ["Later, imagine the pharmacy department introducing an additional medication verification step to reduce the possibility of dispensing errors.", null],
        ["The administrative team also adds a confirmation requirement because previous documentation problems created difficulties after patients departed.", dg("Reasonable local safeguards", D.hier([["Medication verification", ""], ["Documentation confirmation", ""], ["Clinical clearance", ""]]), "Different hospital functions introduce safeguards that address legitimate concerns within their own professional responsibilities.")],
 
        ["Neither change necessarily represents poor judgement, because patient safety and accurate records are important organisational responsibilities.", null],
        ["Yet the combined discharge process may become slower if the additional checks introduce waiting between departments.", st("A locally justified safeguard can still create an undesirable system-level consequence when its operational effects are not coordinated.")],
 
        ["Imagine the hospital measuring how quickly each department completes its own tasks without measuring the patient's total discharge time.", null],
        ["Every department could report acceptable performance while patients continue waiting for the complete sequence of activities to finish.", dg("Local performance versus patient experience", D.flow(["Department|measures", "Separate|completion", "Unmanaged|waiting", "Patient|departure"]), "Departmental measures may overlook waiting between activities that determines the patient's complete discharge experience.")],
 
        ["A process owner would need to examine the entire discharge journey while respecting the professional responsibilities of each department.", null],
        ["The owner could investigate whether necessary checks might be coordinated differently without compromising safety or administrative accuracy.", q("How can the hospital protect important safeguards while reducing waiting that those safeguards unintentionally create?")],
 
        ["The answer requires distinguishing the purpose of a control from the particular procedure currently used to implement it.", null],
        ["Managers can preserve a legitimate requirement while exploring whether its timing, coordination or supporting information could be improved.", cmp("Control purpose and implementation", "Preserve the purpose", "Maintain necessary clinical safety and administrative assurance.", "Review the implementation", "Examine whether required checks can be coordinated without unnecessary delays.")],
 
        ["Regular end-to-end measurement would reveal whether discharge performance is deteriorating even when individual departments meet their targets.", null],
        ["A recurring management review would then connect that evidence to decisions about responsibilities, coordination and process improvement.", dg("Sustaining discharge performance", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The hospital sustains discharge performance by reviewing the complete journey and embedding coordinated improvements.")],
 
        ["Remember that this hospital example is illustrative and does not add evidence about the decisions made at Qasr.", null],
        ["It reinforces our central insight that organisational performance depends on how reasonable decisions interact across the complete process.", q("When every professional follows the rules but patients still wait unnecessarily, what should management investigate before assigning blame?")]
      ]
    }
  ]
},
      ] },
      { id: "l2", title: "The measure nobody reads", sections: [
{
  title: "The difference between reporting and managing",
  sec: "W14O2c",
  lines: [
    ["We have seen how reasonable local decisions can gradually weaken a process when nobody examines their combined consequences.", t("The measure nobody reads", "Why producing performance information is different from using it to manage a process.")],
    ["Now let's explore why collecting accurate performance information does not necessarily prevent an organisation from losing its improvements.", null],
    ["This distinction matters because a dashboard can appear reassuring even when the management system behind it has stopped working.", q("If a performance measure is produced every month, does that mean someone is managing the process?")],
 
    ["Return to Qasr Hospitality Group, where an analyst continues producing the lobby-to-room arrival measure every month.", null],
    ["The measure appears on page four of the operations pack, so the organisation has not stopped collecting information.", dg("Qasr's reporting arrangement", D.flow(["Arrival|data", "Monthly|analysis", "Operations|pack", "Page four|measure"]), "Qasr continues producing the monthly arrival measure and including it on page four of the operations pack.")],
 
    ["Yet the measure was last discussed at an operations meeting seven months ago, when arrival time was twenty-eight minutes.", null],
    ["By month twenty-two, arrival time had reached thirty-nine minutes, revealing deterioration that routine reporting had not prevented.", dg("Performance changed despite reporting", D.bars([["Month 5", 24], ["Last discussion", 28], ["Month 22", 39]]), "Qasr's arrival time increased from 24 to 39 minutes, while the measure had not been discussed for seven months.")],
 
    ["Reporting means recording and communicating what happened, usually through measures, dashboards or recurring management information packs.", null],
    ["Managing goes further because someone interprets the evidence, decides whether intervention is necessary and follows through on action.", cmp("Reporting versus managing", "Reporting", "Produces and communicates performance information about the process.", "Managing", "Interprets evidence, makes decisions, assigns action and checks whether performance improves.")],
 
    ["Think about a thermometer showing that a room is becoming warmer, while nobody adjusts the cooling system.", null],
    ["The instrument may work perfectly, but the temperature continues rising because measurement alone cannot change the conditions.", st("A reliable measure describes performance, but sustained management requires decisions and action based on its evidence.")],
 
    ["Qasr's analyst therefore should not automatically be blamed for deterioration, because producing the measure remains an assigned responsibility.", null],
    ["The deeper question concerns who was accountable for reviewing the result and coordinating a response across the arrival process.", dg("From information to accountability", D.flow(["Measure|produced", "Owner|reviews", "Decision|made", "Action|assigned", "Result|checked"]), "Effective process management connects performance information to accountable review, corrective decisions and verification of results.")],
 
    ["Remember that Qasr's appointed process owner was promoted nine months ago and was not replaced in that dedicated role.", null],
    ["The group operations director absorbed accountability while managing thirteen direct reports, making sustained attention harder to maintain.", dg("The accountability gap", D.org("process", {top: "Group operations director", depts: ["Thirteen direct reports", "Arrival process accountability"]}), "The arrival process lost its dedicated owner when accountability was absorbed by the group operations director.")],
 
    ["A process owner should connect the monthly measure with an agreed review meeting where operational managers examine meaningful changes.", null],
    ["That meeting needs a clear purpose because discussing every number without identifying decisions can become another reporting exercise.", st("A performance review becomes useful when it produces a decision, a responsible person and a way to check the outcome.")],
 
    ["Managers should ask whether the result remains acceptable, what explains any deterioration and which intervention deserves attention.", null],
    ["For Qasr, the documented increase invites examination of accumulated process changes rather than an unsupported assumption about employee effort.", q("What should Qasr's managers investigate when the arrival measure continues worsening despite regular reporting?")],
 
    ["A useful review also distinguishes ordinary variation from deterioration serious enough to require an agreed management response.", null],
    ["Pre-agreed thresholds help because they reduce the temptation to postpone difficult decisions whenever an unfavourable result appears.", dg("Turning measures into management", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "Sustainable Performance requires managers to measure results, review deviations, improve the process and embed agreed changes.")],
 
    ["The owner should then follow up, because assigning corrective action without checking its effect merely creates another administrative record.", null],
    ["If performance remains poor, the organisation must reconsider its explanation and decide whether a different intervention is needed.", iss("Closing the management loop means checking whether the agreed response actually improves end-to-end process performance.", "Follow-through completes the decision")],
 
    ["Notice that this approach does not require an enormous dashboard filled with every available operational statistic.", null],
    ["It requires a small number of meaningful measures that managers understand, discuss regularly and connect to accountable decisions.", cmp("Two uses of performance information", "Passive reporting", "The measure appears regularly, but management discussion and follow-through are absent.", "Active governance", "The owner reviews results, agrees responses and checks whether corrective action works.")],
 
    ["Qasr's difficulty therefore illustrates why sustainable performance depends on the management behaviour surrounding a measure, not its production.", null],
    ["Next, we will identify the signals that deserve continued attention and examine how they can reveal emerging deterioration.", t("The question ahead", "Which performance signals should managers keep reading after an improvement programme has ended?")]
  ],
  review: [
    {
      title: "The school attendance report that changed nothing",
      lines: [
        ["Let's examine reporting and managing through an illustrative school that wants to improve student attendance across its classes.", t("Another way to understand active management", "A school illustrates why accurate reports cannot improve performance without accountable decisions.")],
 
        ["Imagine the school introducing a digital attendance system that records whether students arrive for their scheduled lessons.", null],
        ["Teachers enter attendance information consistently, and an administrator produces a detailed report for the leadership team every month.", dg("The school's reporting process", D.flow(["Teachers|record", "System|collects", "Administrator|reports", "Leaders|receive"]), "The school's attendance information is collected and reported regularly to its leadership team.")],
 
        ["The system works reliably, so school leaders believe they have established effective monitoring of student attendance.", null],
        ["However, imagine that the reports are circulated without a regular discussion of patterns or responsibility for responding.", st("Reliable information systems cannot improve attendance unless managers use their evidence to guide appropriate action.")],
 
        ["Suppose attendance gradually declines in several classes, although teachers continue completing their reporting duties correctly.", null],
        ["The administrator also fulfils the assigned responsibility by preparing each report accurately and distributing it on schedule.", q("Who should respond when everyone produces the required information but attendance continues deteriorating?")],
 
        ["The school needs someone accountable for interpreting attendance patterns and coordinating responses across the relevant teaching teams.", null],
        ["That person should arrange a review where managers distinguish isolated absences from persistent patterns requiring investigation.", dg("From reporting to managing attendance", D.flow(["Attendance|measure", "Pattern|review", "Response|agreed", "Responsibility|assigned", "Effect|checked"]), "Active attendance management requires interpreting evidence, agreeing appropriate responses and checking whether those responses work.")],
 
        ["For illustration, imagine the review revealing that repeated transport difficulties are contributing to absences among some students.", null],
        ["The school might then examine practical support arrangements instead of assuming that every absence reflects poor student motivation.", st("An effective management response addresses an evidenced cause rather than relying on assumptions about individual behaviour.")],
 
        ["The responsible manager should also examine subsequent attendance results to determine whether the agreed support has made a difference.", null],
        ["Without that follow-up, the school could celebrate completing an intervention while remaining uncertain about its actual effectiveness.", dg("The attendance improvement cycle", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The school sustains attendance improvement by reviewing results, addressing causes and embedding effective responses.")],
 
        ["Notice that the administrator's reporting work remains valuable because managers cannot investigate patterns without trustworthy attendance information.", null],
        ["The missing element was not another report, but an accountable process connecting existing information with meaningful decisions.", cmp("Two different management arrangements", "Reports without review", "Attendance information is produced regularly but does not reliably influence management decisions.", "Reports supporting action", "Attendance patterns trigger investigation, coordinated responses and follow-up evaluation.")],
 
        ["This example helps explain why Qasr's monthly arrival report did not prevent deterioration after the process lost dedicated ownership.", null],
        ["The measure remained available, but the management arrangements needed to interpret and act upon it had weakened.", q("Would a more colourful attendance dashboard solve the school's problem if leaders still avoided discussing the results?")]
      ]
    },
    {
      title: "The water utility that learned to respond to its measures",
      lines: [
        ["Now consider an illustrative water utility that measures service interruptions but wants to manage reliability more effectively.", t("A different angle on performance measurement", "A water utility illustrates how measures become useful through review, response and follow-through.")],
 
        ["Imagine the utility recording how long customers experience interruptions whenever faults affect its local water distribution network.", null],
        ["A reporting team compiles the information monthly, allowing managers to observe patterns across different service areas.", dg("Measuring service reliability", D.flow(["Service|events", "Duration|recorded", "Monthly|report", "Management|information"]), "The utility records interruption durations and produces regular information about service reliability.")],
 
        ["The report provides useful evidence, but imagine that managers rarely examine whether interruption durations are becoming unacceptable.", null],
        ["Individual repair teams continue completing assigned work while the overall customer experience gradually becomes less reliable.", st("Operational activity can continue normally even when nobody is accountable for interpreting deterioration across the complete service.")],
 
        ["Suppose the utility appoints a process owner responsible for coordinating how interruptions are detected, investigated and resolved.", null],
        ["The owner establishes a regular review focused on service outcomes rather than simply counting completed repair activities.", dg("Ownership of the complete response", D.flow(["Detect|interruption", "Investigate|cause", "Coordinate|repair", "Restore|service", "Review|outcome"]), "The process owner coordinates the complete interruption response and evaluates the outcome experienced by customers.")],
 
        ["During each review, managers compare current results with an agreed acceptable range and investigate meaningful deterioration.", null],
        ["An acceptable range defines performance boundaries, helping managers recognise when a result requires more than routine observation.", q("Why should managers agree what counts as unacceptable performance before a difficult result appears?")],
 
        ["Pre-agreed thresholds reduce ambiguity because everyone understands when the process owner must investigate and coordinate a response.", null],
        ["For illustration, imagine repeated interruptions revealing delays between identifying a fault and assigning an available repair crew.", dg("Using evidence to identify a response", D.flow(["Unfavourable|result", "Investigate|delay", "Agree|response", "Assign|owner", "Check|effect"]), "The utility uses performance evidence to identify an operational weakness, assign corrective action and evaluate the result.")],
 
        ["Managers could examine how repair crews are allocated, while preserving necessary safety procedures and technical responsibilities.", null],
        ["The important principle is to respond to the diagnosed delay rather than demanding that every employee simply work faster.", st("Good process management connects corrective action to an evidenced weakness while protecting legitimate operational requirements.")],
 
        ["After changing the allocation procedure, the owner should review subsequent interruption results to determine whether reliability improves.", null],
        ["If the results remain disappointing, the team needs to reconsider its explanation rather than declaring success prematurely.", dg("The reliability management cycle", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The utility maintains service reliability through continuing measurement, evidence-based review, improvement and embedding.")],
 
        ["This illustrates why reporting and managing are complementary responsibilities rather than competing activities within an effective BPM system.", null],
        ["Qasr similarly needs trustworthy arrival measures connected to ownership, timely decisions and verification of corrective action.", cmp("Reporting and managing together", "Reporting contribution", "Provides reliable evidence about what happened across the process.", "Management contribution", "Uses that evidence to investigate, intervene and determine whether performance improves.")],
 
        ["The central lesson is that information becomes valuable when someone is responsible for converting it into appropriate organisational action.", null],
        ["Sustainable Performance therefore requires an active management loop rather than a reporting routine that continues without meaningful decisions.", q("How would you recognise that the utility was genuinely managing reliability rather than merely producing increasingly detailed reports?")]
      ]
    }
  ]
},
{
  title: "Four signals that the gain is slipping",
  sec: "W14O1b",
  lines: [
    ["We have seen why producing a performance report is different from using that report to manage a process.", t("Four signals that the gain is slipping", "Sustainable performance depends on reading a small number of measures that reveal deterioration and trigger action.")],
    ["Now let's identify the signals that help an owner recognise deterioration before an improvement loses its value.", null],
    ["The aim is not to measure everything, because excessive reporting can bury the information managers actually need.", q("Which signals would tell you that a successful process is gradually moving away from its intended performance?")],
 
    ["Think about Qasr Hospitality Group, where lobby-to-room arrival time fell from eighty-two minutes to twenty-four minutes.", null],
    ["By month twenty-two, arrival time had reached thirty-nine minutes, showing that the earlier improvement was gradually eroding.", dg("The arrival-time signal", D.bars([["Baseline", 82], ["Month 5", 24], ["Month 13", 28], ["Month 22", 39]]), "Qasr's arrival time improved to 24 minutes before deteriorating to 28 minutes at month 13 and 39 minutes at month 22.")],
 
    ["This end-to-end measure captures the time guests experience across the complete arrival journey, rather than one department's activity.", null],
    ["It matters because local efficiency can appear satisfactory while waiting accumulates between activities that different departments manage.", st("An end-to-end performance measure reveals the outcome experienced across the complete process, including delays between organisational functions.")],
 
    ["A useful governance proposal is to investigate when performance becomes more than ten percent worse than the delivered result.", null],
    ["For Qasr, ten percent above twenty-four minutes is twenty-six point four minutes, making the proposed boundary quite clear.", dg("Illustrative performance trigger", D.bars([["Delivered", 24], ["10% boundary", 26.4], ["Month 22", 39]]), "A proposed 10% deterioration threshold would place Qasr's arrival-time boundary at 26.4 minutes, well below its month-22 result.")],
 
    ["Another signal concerns adoption, meaning the extent to which employees and customers actually use the redesigned process.", null],
    ["At Qasr, kiosk adoption reached sixty-five percent at month five but declined to forty-eight percent by month twenty-two.", dg("The adoption signal", D.bars([["Month 5", 65], ["Month 13", 61], ["Month 22", 48]]), "Qasr's kiosk adoption declined from 65% at month 5 to 61% at month 13 and 48% at month 22.")],
 
    ["That seventeen-percentage-point decline matters because benefits may disappear when fewer people use the process as originally designed.", null],
    ["A proposed trigger is adoption falling five percentage points below the rollout plateau, prompting investigation of remaining non-adoption cases.", st("A five-percentage-point adoption trigger would prompt investigation below 60% at Qasr, using its 65% month-five plateau.")],
 
    ["Notice that percentage points describe the direct difference between two percentages, rather than their relative proportional change.", null],
    ["This distinction prevents managers from misreading the trigger and delaying investigation until adoption has fallen much further.", q("Why would confusing five percentage points with a five percent relative decline change when managers investigate adoption?")],
 
    ["We should also watch exception volume, which records cases requiring treatment outside the process's normal operating path.", null],
    ["An increase beyond the designed range suggests that the original exception arrangements may no longer match everyday operational needs.", dg("The exception-volume signal", D.flow(["Exception|volume", "Designed|range", "Excess|identified", "Review|exception design"]), "Exception volume above the designed range should prompt reconsideration of the exception arrangements developed during phase five.")],
 
    ["For illustration, imagine repeated arrival cases requiring manual intervention because the standard procedure cannot handle a recurring situation.", null],
    ["The owner should investigate that pattern instead of assuming that every additional exception reflects an employee's personal mistake.", st("Frequent exceptions may reveal a process-design weakness that requires investigation rather than repeated local improvisation.")],
 
    ["A further signal is an unregistered process variant, meaning a different operating method introduced without being recorded in governance.", null],
    ["Even one unregistered variant deserves attention because the organisation cannot assess a change it does not know exists.", dg("The process-variant signal", D.flow(["Local|variation", "Variant|identified", "Architecture|review", "Governed|decision"]), "An unregistered process variant should initiate an architecture review to assess its implications for the approved process.")],
 
    ["Qasr's permanent desk positions at two heritage properties illustrate why local differences need visibility within end-to-end governance.", null],
    ["Their reinstatement is documented, but the evidence does not establish that those arrangements were unregistered process variants.", iss("A documented local variation is not automatically an unregistered variant; governance must establish its actual registration and approval status.", "Distinguish evidence from inference")],
 
    ["Together, these signals reveal whether performance, adoption, exception handling and process consistency remain aligned with the delivered design.", null],
    ["They become useful only when a named owner reviews them, investigates meaningful changes and follows through on agreed responses.", dg("A focused sustaining dashboard", D.hier([["End-to-end performance", ""], ["Process adoption", ""], ["Exception volume", ""], ["Unregistered variants", ""]]), "A small sustaining dashboard combines end-to-end performance, adoption, exception volume and process-variant visibility.")],
 
    ["In the next part, we will turn these signals into clear management triggers that specify when action becomes necessary.", t("The question ahead", "How can managers agree intervention thresholds before deterioration becomes difficult to ignore?")]
  ],
  review: [
    {
      title: "The airport baggage process that needed more than one measure",
      lines: [
        ["Let's explore the four sustainability signals through an illustrative airport that has redesigned its baggage-handling process.", t("Another way to read process performance", "An airport illustrates why several complementary signals reveal deterioration more effectively than one headline measure.")],
 
        ["Imagine the airport introducing a redesigned baggage journey that moves checked luggage more reliably from acceptance to aircraft loading.", null],
        ["The initial improvement works because employees follow the agreed process and baggage moves smoothly between operational teams.", dg("The baggage journey", D.flow(["Accept|baggage", "Screen|items", "Sort|baggage", "Load|aircraft"]), "The airport's baggage process coordinates several activities to deliver luggage to the correct aircraft.")],
 
        ["The process owner naturally monitors total baggage-handling time because passengers and airlines care about reliable end-to-end performance.", null],
        ["However, that measure alone cannot explain whether emerging delays reflect changing adoption, exceptions or inconsistent local practices.", st("End-to-end performance reveals the outcome, while complementary signals help managers investigate why that outcome changes.")],
 
        ["For illustration, imagine some handling teams gradually returning to familiar manual sorting methods instead of using the redesigned procedure.", null],
        ["The owner would monitor adoption because declining use of the approved method may threaten the improvement's expected benefits.", dg("The adoption signal", D.flow(["Approved|method", "Actual|usage", "Adoption|review", "Cause|investigated"]), "Monitoring adoption helps the airport recognise when employees increasingly use methods outside the redesigned process.")],
 
        ["Now imagine that unusual baggage cases require additional manual handling more frequently than the original design anticipated.", null],
        ["An exception measure would reveal this pressure and help managers reconsider whether the designed exception arrangements remain suitable.", q("Why might growing manual handling indicate a process-design problem rather than simply slower employee performance?")],
 
        ["Suppose another team introduces a different baggage-routing practice without registering the change within the airport's process governance.", null],
        ["That unregistered variant matters because its consequences may remain invisible to managers responsible for the complete baggage journey.", dg("Recognising an unregistered variant", D.flow(["Different|routing", "Variant|detected", "Architecture|review", "Decision|recorded"]), "An unregistered baggage-routing variant should prompt an architecture review rather than remain an unmanaged local practice.")],
 
        ["The owner therefore needs complementary information about journey time, adoption, exceptions and variations from the approved process.", null],
        ["Together, those signals provide a more useful explanation than a large dashboard containing unrelated operational statistics.", dg("The airport's sustaining dashboard", D.hier([["Total handling time", ""], ["Approved-method adoption", ""], ["Manual exceptions", ""], ["Process variants", ""]]), "The airport combines four complementary signals to understand whether its redesigned baggage process remains sustainable.")],
 
        ["Each signal should connect to a management response because recognising deterioration without acting does not protect the improvement.", null],
        ["Managers can then investigate causes, coordinate necessary changes and check whether baggage performance returns to acceptable levels.", st("Sustainability measures become valuable when managers connect meaningful deviations to investigation and corrective action.")],
 
        ["This illustrative airport faces the same general challenge as Qasr, although its operating activities and performance measures differ.", null],
        ["Both organisations need to understand whether the redesigned process remains effective and whether people continue using it appropriately.", q("Which signal would help the airport detect declining use of its redesigned process before total baggage-handling time deteriorates?")]
      ]
    },
    {
      title: "The digital permit service that looked successful on paper",
      lines: [
        ["Now consider an illustrative municipal permit service that has introduced an online application process to replace unnecessary paper handling.", t("A different angle on sustaining measures", "A digital permit service illustrates how adoption, exceptions and process variants reveal hidden deterioration.")],
 
        ["Imagine the municipality redesigning permit applications so residents can submit information online and receive decisions through coordinated administrative review.", null],
        ["The new process initially reduces completion time, encouraging managers to believe the digital transformation has delivered lasting improvement.", dg("The digital permit journey", D.flow(["Submit|application", "Verify|information", "Review|request", "Issue|decision"]), "The redesigned permit process coordinates online submission, verification, review and decision-making.")],
 
        ["The municipality continues measuring total application time because that result captures the experience of residents using the service.", null],
        ["Yet imagine some residents returning to paper submissions because they find particular online requirements difficult to complete.", st("An improving headline measure may conceal weakening adoption if managers do not examine how customers actually use the redesigned service.")],
 
        ["Adoption measures would reveal whether residents continue using the intended digital process rather than reverting to older arrangements.", null],
        ["The owner could then investigate obstacles before assuming that declining digital usage reflects unwillingness to accept change.", dg("Monitoring digital adoption", D.flow(["Digital|submissions", "Usage|measured", "Decline|identified", "Barriers|investigated"]), "The municipality monitors digital adoption to identify barriers that may weaken the redesigned permit process.")],
 
        ["Now imagine staff repeatedly handling applications that cannot proceed through the standard online verification procedure.", null],
        ["Those cases are exceptions, and their frequency may reveal that the design does not adequately accommodate recurring applicant circumstances.", q("Why should repeated exceptions prompt a review of process design rather than endless manual workarounds?")],
 
        ["Suppose a local office also introduces an alternative approval route without registering that difference in the process architecture.", null],
        ["The owner needs visibility because an unregistered variant can create inconsistent service and complicate future improvement decisions.", dg("Reviewing local process variants", D.flow(["Alternative|route", "Variant|identified", "Architecture|review", "Approved|arrangement"]), "An unregistered alternative approval route should trigger an architecture review of its effects on the complete permit process.")],
 
        ["A focused sustaining dashboard would therefore monitor application time alongside digital adoption, exception volume and process variants.", null],
        ["The measures complement one another because each reveals a different way that the original improvement could gradually weaken.", dg("The permit sustainability dashboard", D.hier([["Application time", ""], ["Digital adoption", ""], ["Exception volume", ""], ["Unregistered variants", ""]]), "The permit service uses complementary measures to monitor outcomes, process usage, exceptional cases and local variations.")],
 
        ["The process owner should agree when each signal requires investigation, so deteriorating results do not depend on individual attention.", null],
        ["Those thresholds must reflect the delivered process and its operating requirements rather than arbitrary targets copied from another organisation.", st("Effective triggers are grounded in the process's delivered performance and designed operating conditions.")],
 
        ["Remember that this municipality is illustrative, while Qasr's arrival and kiosk adoption figures come from the documented case.", null],
        ["The common lesson is to select a few measures that reveal whether the process still delivers its intended benefits.", cmp("A useful sustaining dashboard", "Too narrow", "Reports completion time without revealing adoption, exceptions or process variation.", "Balanced and focused", "Connects the end-to-end outcome with signals that help explain emerging deterioration.")],
 
        ["Sustainable performance depends on interpreting these measures together and using their evidence to coordinate timely improvement decisions.", null],
        ["The goal is not more reporting, but earlier recognition of problems that could otherwise become normal operating practice.", q("Why would the municipality need to investigate declining digital adoption even if its reported application time remained acceptable?")]
      ]
    }
  ]
},
{
  title: "Setting the trigger before the trend turns",
  sec: "W14O1c",
  lines: [
    ["We have identified the signals that reveal whether a successful process is beginning to lose its improvement.", t("Setting the trigger before the trend turns", "Agree what requires attention before deteriorating results become accepted as normal.")],
    ["Now let's decide when those signals should lead managers to investigate, rather than simply record another disappointing result.", null],
    ["This matters because recognising deterioration without an agreed response can leave everyone waiting for somebody else to act.", q("How can managers decide when a worsening result deserves intervention rather than another month of observation?")],
 
    ["A performance trigger is a pre-agreed condition that requires a particular management response when a measure crosses its boundary.", null],
    ["The trigger connects evidence with responsibility, so action does not depend entirely on someone's memory or personal concern.", dg("How a performance trigger works", D.flow(["Measure|performance", "Compare|with trigger", "Notify|owner", "Investigate|cause", "Agree|response"]), "A performance trigger connects an observed result to a defined management responsibility and response.")],
 
    ["Return to Qasr Hospitality Group, where the delivered lobby-to-room arrival time was twenty-four minutes at month five.", null],
    ["The Week 14 governance proposal requires owner reporting when the end-to-end measure becomes more than ten percent worse.", dg("The proposed deterioration boundary", D.bars([["Delivered", 24], ["Boundary", 26.4], ["Month 22", 39]]), "A 10% deterioration boundary places Qasr's proposed arrival-time trigger at 26.4 minutes, compared with 39 minutes at month 22.")],
 
    ["Ten percent of twenty-four minutes is two point four minutes, giving a reference boundary of twenty-six point four minutes.", null],
    ["A result above that boundary would require the owner to report the deterioration at the operations meeting.", st("The proposed rule requires reporting when end-to-end performance is more than 10% worse than the delivered result.")],
 
    ["Notice that the trigger does not automatically prescribe a solution, because the same deterioration could have several different causes.", null],
    ["Instead, it ensures that accountable managers examine the evidence and decide which explanation deserves further investigation.", q("Why should crossing a threshold trigger investigation rather than an automatic redesign of the entire process?")],
 
    ["Qasr also needs an adoption trigger because its redesigned arrival process depends partly on continued use of the kiosks.", null],
    ["Kiosk adoption reached sixty-five percent at month five but had fallen to forty-eight percent by month twenty-two.", dg("The adoption deterioration", D.bars([["Rollout plateau", 65], ["Trigger boundary", 60], ["Month 22", 48]]), "A proposed five-percentage-point decline from Qasr's 65% rollout plateau gives an adoption investigation boundary of 60%.")],
 
    ["The proposed rule calls for investigating residual adoption cases when usage falls five percentage points below the rollout plateau.", null],
    ["That makes sixty percent the reference boundary, while the documented forty-eight percent indicates substantially greater deterioration.", st("An adoption trigger should prompt investigation of remaining non-adoption cases rather than an unsupported assumption about employee resistance.")],
 
    ["The distinction between percentage points and relative percentages matters because confusing them would change the timing of management intervention.", null],
    ["Here, five percentage points means subtracting five directly from sixty-five, not calculating five percent of sixty-five.", cmp("Two different calculations", "Percentage-point decline", "65% less 5 percentage points gives 60%.", "Relative percentage decline", "65% reduced by 5% of itself gives 61.75%, which is not the proposed trigger.")],
 
    ["Other triggers concern exception volume and process variants, which reveal problems that headline performance measures might overlook.", null],
    ["When exceptions exceed their designed range, the owner should revisit the exception design developed during framework phase five.", dg("The exception trigger", D.flow(["Exception|volume", "Designed|range exceeded", "Owner|investigates", "Phase five|design reviewed"]), "Exception volume above its designed range should initiate a review of the process's exception design.")],
 
    ["An unregistered process variant requires an architecture review because unmanaged differences can undermine consistency across the organisation.", null],
    ["The rule concerns registration status, so a known local variation must not automatically be described as unregistered.", dg("The variant trigger", D.flow(["Variant|detected", "Registration|checked", "Unregistered|confirmed", "Architecture|review"]), "An unregistered process variant should trigger an architecture review after its registration status has been established.")],
 
    ["These triggers become useful only when the organisation assigns an owner, defines the response and checks whether action works.", null],
    ["Without that follow-through, thresholds merely create additional information that can disappear into another management report.", dg("Closing the sustaining loop", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "Sustainable governance uses agreed triggers to support accountable review, improvement and embedding.")],
 
    ["For Qasr, the proposed arrival-time and adoption boundaries would both have been exceeded by the documented month-twenty-two results.", null],
    ["That conclusion supports investigation, but it does not establish that Qasr previously operated these proposed governance rules.", iss("The Week 14 thresholds are proposed sustaining mechanisms, not evidence that Qasr had already adopted or enforced them.", "Keep proposals separate from case facts")],
 
    ["The deeper lesson is to establish management expectations while performance is healthy, rather than negotiating responsibility during deterioration.", null],
    ["Next, we will examine how the process owner turns these expectations into a continuing cycle of improvement.", t("The question ahead", "Who should review a triggered measure, decide the response and verify that the improvement lasts?")]
  ],
  review: [
    {
      title: "The university helpdesk that agreed when to intervene",
      lines: [
        ["Let's explore performance triggers through an illustrative university helpdesk that has improved how quickly it resolves student support requests.", t("Another way to understand performance triggers", "A university helpdesk illustrates why intervention rules should be agreed before service performance deteriorates.")],
 
        ["Imagine the helpdesk redesigning its support process so students receive faster answers without repeatedly contacting different university departments.", null],
        ["After implementation, the service owner records the achieved resolution time as the reference for continuing performance management.", dg("The improved support process", D.flow(["Receive|request", "Classify|need", "Resolve|issue", "Confirm|outcome"]), "The helpdesk's redesigned process coordinates support activities around the student's complete request journey.")],
 
        ["For illustration, suppose the improved service resolves requests within twenty hours, compared with much longer delays before redesign.", null],
        ["The owner wants to recognise deterioration early, rather than waiting until students begin making repeated complaints.", st("A delivered performance result provides a reference against which future deterioration can be assessed.")],
 
        ["Imagine managers agreeing that resolution time more than ten percent above the delivered result requires formal review.", null],
        ["Ten percent of twenty hours is two hours, so the proposed boundary becomes twenty-two hours.", dg("Illustrative helpdesk threshold", D.bars([["Delivered", 20], ["Boundary", 22], ["Observed", 25]]), "In this illustration, a 10% deterioration boundary places the helpdesk's review threshold at 22 hours.")],
 
        ["If the average reaches twenty-five hours, the owner should investigate because the agreed boundary has clearly been exceeded.", null],
        ["The trigger does not prove that employees are working slowly, since delays may originate elsewhere in the support journey.", q("Why would immediately blaming support advisers be weaker than investigating where resolution time is increasing?")],
 
        ["Suppose the investigation reveals that requests increasingly require clarification from several departments before advisers can provide answers.", null],
        ["The owner could examine those handoffs and agree a coordinated response instead of demanding faster work from individual advisers.", dg("From trigger to response", D.flow(["Threshold|exceeded", "Delay|investigated", "Handoffs|reviewed", "Response|assigned", "Result|checked"]), "The helpdesk owner investigates the cause of deterioration and checks whether the agreed response improves resolution time.")],
 
        ["The owner should then monitor subsequent results because completing an action does not establish that the service has recovered.", null],
        ["If resolution time remains unacceptable, managers need to reconsider the diagnosis and explore another appropriate intervention.", st("A trigger starts management action, while follow-up evidence determines whether that action has actually worked.")],
 
        ["Notice that the twenty-hour result and twenty-two-hour boundary belong only to this illustrative university helpdesk example.", null],
        ["Qasr's documented delivered arrival time remains twenty-four minutes, giving its proposed ten-percent boundary of twenty-six point four minutes.", cmp("Illustration and documented case", "University helpdesk illustration", "A hypothetical 20-hour result produces a 22-hour boundary.", "Qasr Hospitality Group", "The documented 24-minute result produces a proposed 26.4-minute boundary.")],
 
        ["The common principle is to connect a meaningful performance deviation with a named owner and an agreed management response.", null],
        ["That arrangement helps organisations intervene before deterioration becomes an accepted feature of everyday operations.", q("What would happen if the university agreed a threshold but never assigned anyone responsibility for reviewing breaches?")]
      ]
    },
    {
      title: "The online retailer that distinguished warning signs from solutions",
      lines: [
        ["Now consider an illustrative online retailer that has redesigned its order-fulfilment process to improve reliability and customer experience.", t("A different angle on intervention thresholds", "An online retailer illustrates why a trigger identifies a problem without automatically determining its solution.")],
 
        ["Imagine the retailer introducing a redesigned process that coordinates order acceptance, stock allocation, packing and dispatch more effectively.", null],
        ["The organisation then establishes regular monitoring because the improved process must continue performing during changing demand conditions.", dg("The order-fulfilment journey", D.flow(["Accept|order", "Allocate|stock", "Pack|items", "Dispatch|order"]), "The retailer's redesigned process coordinates activities that determine the customer's complete order-fulfilment experience.")],
 
        ["For illustration, suppose the retailer expects its approved digital fulfilment procedure to be used for eighty percent of orders.", null],
        ["Managers agree that a decline of five percentage points below that established level requires investigation of remaining adoption barriers.", dg("Illustrative adoption threshold", D.bars([["Established", 80], ["Boundary", 75], ["Observed", 70]]), "In this illustration, adoption falling below 75% triggers investigation relative to an established 80% usage level.")],
 
        ["Now imagine adoption falling to seventy percent, even though overall order completion time has not yet deteriorated significantly.", null],
        ["The owner should still investigate because weakening adoption may threaten future performance before the headline outcome becomes unacceptable.", st("An adoption trigger can reveal emerging sustainability problems before they appear in the main end-to-end performance measure.")],
 
        ["Suppose employees explain that the digital procedure cannot accommodate certain recurring combinations of products and delivery requirements.", null],
        ["The owner should examine those cases because the problem may concern process design rather than unwillingness to adopt change.", q("Why should declining adoption prompt investigation instead of automatically triggering another employee training campaign?")],
 
        ["Imagine that the same unusual orders repeatedly require manual intervention outside the normal fulfilment route.", null],
        ["Growing exception volume would strengthen the case for reviewing whether the designed exception arrangements remain suitable.", dg("Connecting adoption and exceptions", D.flow(["Adoption|declines", "Exceptions|increase", "Causes|examined", "Design|reviewed"]), "Combined adoption and exception signals can indicate that the standard process no longer accommodates recurring operating needs.")],
 
        ["A further investigation might reveal an alternative packing route introduced locally without registration in the approved process architecture.", null],
        ["That finding would require an architecture review because managers need visibility over variations affecting the complete fulfilment process.", st("An unregistered process variant requires architectural review, even when the local team believes its alternative method is helpful.")],
 
        ["The owner should choose corrective action only after understanding which mechanism explains the observed deterioration in the retailer's operations.", null],
        ["Depending on the evidence, an appropriate response might involve process redesign, clearer instructions or better coordination between functions.", dg("Evidence before intervention", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The retailer uses performance evidence to select, implement and sustain an appropriate improvement response.")],
 
        ["Remember that these retailer figures are illustrative and do not describe actual adoption or exception patterns at Qasr.", null],
        ["Qasr's documented kiosk adoption declined from sixty-five percent at month five to forty-eight percent at month twenty-two.", cmp("Two adoption contexts", "Retailer illustration", "Hypothetical adoption declines from an established 80% to 70%.", "Qasr case evidence", "Documented kiosk adoption declines from 65% to 48%.")],
 
        ["Both situations demonstrate why a threshold should create a duty to investigate rather than dictate a predetermined corrective action.", null],
        ["Sustainable governance depends on recognising meaningful deviations and selecting responses that address their actual causes.", q("Why might automatic retraining be ineffective when the real reason for declining adoption is an unsuitable process design?")]
      ]
    }
  ]
},
      ] },
      { id: "l3", title: "Governance that holds the gain", sections: [
{
  title: "Measure, review, improve, embed: the owner's loop",
  sec: "W14O3a",
  lines: [
    ["You have seen how performance triggers can reveal deterioration before a successful improvement loses too much value.", t("The process owner's sustaining loop", "Measure, review, improve and embed: a continuing responsibility after the BPM programme ends.")],
    ["Now let's explore how a process owner turns those warning signals into a dependable management routine.", null],
    ["The central idea is simple: sustainable performance requires repeated decisions, not occasional attention when problems become embarrassing.", dg("The sustaining loop", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The process owner sustains performance through a repeating cycle of measurement, review, improvement and embedding.")],
 
    ["Imagine returning to Qasr Hospitality Group, where the redesigned arrival process once achieved a twenty-four-minute result.", null],
    ["By month twenty-two, arrival time had increased to thirty-nine minutes, while kiosk adoption had declined to forty-eight percent.", dg("Qasr's sustainability challenge", D.bars([["Delivered", 24], ["Month 13", 28], ["Month 22", 39]]), "Qasr's arrival time increased from 24 minutes at month five to 39 minutes at month twenty-two.")],
 
    ["These figures describe deterioration, but they cannot restore performance unless somebody accepts responsibility for interpreting their meaning.", null],
    ["That responsibility belongs to a named process owner who can coordinate decisions across the complete guest arrival journey.", st("End-to-end process ownership connects performance evidence with the authority to coordinate corrective action.")],
 
    ["The sustaining loop begins with measurement, which means collecting reliable evidence about outcomes and how the process operates.", null],
    ["At Qasr, the analyst already produces the arrival measure monthly, so the immediate weakness is not missing reporting.", dg("Measurement provides the evidence", D.flow(["Arrival|activity", "Performance|data", "Monthly|measure", "Owner|receives"]), "Qasr already produces monthly arrival information, which a process owner should use to assess end-to-end performance.")],
 
    ["The owner should also examine adoption, exceptions and process variants because these signals help explain emerging performance problems.", null],
    ["Together, they reveal whether the process remains effective, widely used and consistent with its approved operating arrangements.", dg("A focused sustaining dashboard", D.hier([["End-to-end result", ""], ["Adoption", ""], ["Exceptions", ""], ["Process variants", ""]]), "A focused dashboard combines the outcome measure with signals that help explain deterioration.")],
 
    ["Measurement becomes management during review, when responsible people interpret results and decide whether intervention is necessary.", null],
    ["Qasr's arrival measure was last discussed seven months ago, demonstrating why producing information cannot replace active review.", cmp("Measurement and review", "Measurement", "Provides reliable information about what is happening across the process.", "Review", "Interprets that information and determines whether management action is required.")],
 
    ["A useful review examines the size of deterioration, its likely causes and the consequences of leaving conditions unchanged.", null],
    ["It also identifies who will investigate each concern, because discussion without ownership rarely produces sustained improvement.", q("What should Qasr's owner do when the arrival measure exceeds its proposed deterioration threshold?")],
 
    ["Improvement follows when the owner coordinates a response that addresses the evidence rather than an assumed employee failure.", null],
    ["For Qasr, the documented local changes deserve examination because their combined effect accounts for thirteen additional arrival minutes.", dg("From diagnosis to improvement", D.flow(["Review|evidence", "Investigate|causes", "Agree|response", "Assign|responsibility", "Check|effect"]), "The process owner coordinates evidence-based corrective action and verifies whether the response improves performance.")],
 
    ["However, improving performance does not necessarily mean removing controls introduced for legitimate regulatory or operational reasons.", null],
    ["The owner must work with affected functions to preserve necessary requirements while reconsidering how those requirements operate.", st("Effective improvement protects legitimate requirements while reducing unnecessary consequences for the complete process.")],
 
    ["Embedding completes the loop by making agreed improvements part of ordinary responsibilities, instructions and operating practices.", null],
    ["Without embedding, employees may gradually return to familiar methods, allowing the same weaknesses to reappear after management attention fades.", dg("Embedding makes improvement durable", D.flow(["Agree|change", "Update|procedure", "Support|adoption", "Monitor|results"]), "Embedding integrates an approved improvement into normal working practices and continued performance monitoring.")],
 
    ["The owner must then measure again, because even a carefully designed response may produce unexpected consequences during daily operations.", null],
    ["This repeated cycle turns improvement into a normal management responsibility rather than another temporary project requiring special attention.", dg("The loop continues", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "Sustainable Performance repeats the management cycle so that improvements remain effective as operating conditions change.")],
 
    ["Remember that Qasr's appointed process owner was promoted nine months ago and no dedicated replacement was appointed.", null],
    ["A sensible governance proposal would restore named ownership with sufficient authority, review time and responsibility for following through.", dg("Restoring accountable ownership", D.org("process", {top: "Proposed arrival process owner", depts: ["Performance review", "Affected functions", "Corrective action", "Follow-up"]}), "A proposed dedicated owner would coordinate performance review, affected functions, corrective action and follow-up.")],
 
    ["The important test is whether managers can explain what changed, why they responded and whether the response worked.", null],
    ["Next, we will examine how governance can protect end-to-end performance without making every legitimate local change unnecessarily difficult.", t("The question ahead", "How can a process owner govern changes without turning continuous improvement into another bureaucratic obstacle?")]
  ],
  review: [
    {
      title: "The hotel housekeeping process that needed a continuing owner",
      lines: [
        ["Let's explore the sustaining loop through an illustrative hotel that has redesigned how guest rooms become ready for arriving visitors.", t("Another way to understand the owner's loop", "A hotel housekeeping process illustrates how measurement becomes lasting improvement through accountable management.")],
 
        ["Imagine the hotel introducing a clearer housekeeping process that coordinates room cleaning, inspection and release to reception.", null],
        ["The redesigned arrangement initially reduces waiting because departments understand their responsibilities and communicate room availability more reliably.", dg("The housekeeping process", D.flow(["Guest|departure", "Room|cleaning", "Quality|inspection", "Room|release"]), "The redesigned housekeeping process coordinates cleaning, inspection and room release to support timely guest arrivals.")],
 
        ["After the improvement team leaves, imagine room readiness gradually deteriorating despite employees continuing their normal assigned duties.", null],
        ["A housekeeping manager notices the change but needs a structured way to investigate rather than immediately demand faster cleaning.", st("Sustaining performance requires understanding the complete process before assigning corrective action to individual employees.")],
 
        ["The manager begins by measuring the time between guest departure and confirmation that the room is available.", null],
        ["That measure captures the complete readiness journey, including waiting between activities managed by different hotel employees.", dg("Measuring the guest-ready outcome", D.flow(["Departure|recorded", "Cleaning|completed", "Inspection|completed", "Availability|confirmed"]), "End-to-end room readiness measurement includes the activities and handoffs required before reception can allocate a room.")],
 
        ["During review, the manager examines whether deterioration occurs during cleaning, inspection or communication between the relevant teams.", null],
        ["Imagine the evidence showing that completed rooms sometimes wait unnecessarily before inspectors receive notification of their availability.", q("Would asking cleaners to work faster solve a delay caused by communication between cleaning and inspection?")],
 
        ["The manager coordinates an improvement that clarifies how completed rooms are communicated to inspectors and how exceptions are handled.", null],
        ["This response addresses the diagnosed handoff problem rather than assuming that employees have become less productive.", dg("Improving the identified weakness", D.flow(["Review|handoff", "Clarify|notification", "Assign|responsibility", "Check|readiness"]), "The manager improves the communication handoff and checks whether room readiness becomes more reliable.")],
 
        ["Embedding requires updating normal operating instructions so employees understand the revised communication arrangements during everyday shifts.", null],
        ["New employees should learn the approved procedure, preventing informal training from gradually restoring the earlier communication weakness.", st("An improvement becomes sustainable when employees learn and use the revised procedure without depending on temporary project supervision.")],
 
        ["The manager continues measuring readiness because operational conditions may change and the revised procedure might need further adjustment.", null],
        ["This creates a repeating management cycle rather than treating the successful correction as another completed project.", dg("The housekeeping sustaining loop", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The housekeeping manager sustains room readiness by repeatedly measuring, reviewing, improving and embedding operational practices.")],
 
        ["This example is illustrative, but the underlying responsibility resembles what Qasr needs for its complete arrival process.", null],
        ["A named owner must connect reliable measures with decisions, coordinated action and continued verification of the result.", cmp("Two management approaches", "Temporary correction", "A manager addresses the immediate delay without establishing continuing review and follow-up.", "Sustained management", "An accountable owner embeds the correction and keeps checking whether the process remains effective.")],
 
        ["The lesson is that sustainable improvement depends on maintaining the management routine after the immediate problem appears resolved.", null],
        ["That routine allows the organisation to recognise new weaknesses before they become accepted features of daily operations.", q("Which activity would prevent the hotel from repeating the same improvement project whenever room readiness deteriorates?")]
      ]
    },
    {
      title: "The insurance claims process that learned to close the loop",
      lines: [
        ["Now consider an illustrative insurance company that has improved its claims process but struggles to maintain consistent service afterward.", t("A different angle on the sustaining loop", "An insurance claims process illustrates why corrective action must be embedded and checked rather than merely announced.")],
 
        ["Imagine the company redesigning claims handling so customers receive decisions more quickly and avoid repeated requests for the same documents.", null],
        ["The new process coordinates claim registration, document verification, assessment and communication across several operational teams.", dg("The redesigned claims journey", D.flow(["Register|claim", "Verify|documents", "Assess|claim", "Communicate|decision"]), "The insurance company's claims process coordinates activities that determine the customer's complete decision experience.")],
 
        ["The company measures total claim resolution time because customers experience the combined duration of all these activities.", null],
        ["For illustration, imagine that this measure gradually worsens even while individual departments report completing their assigned work.", st("End-to-end measures can reveal deterioration that departmental activity measures fail to explain.")],
 
        ["A process owner reviews the evidence and investigates whether waiting between verification and assessment has increased.", null],
        ["Suppose the investigation reveals that assessors receive incomplete information because the verification checklist is no longer consistently applied.", dg("Diagnosing the handoff", D.flow(["Verification|completed", "Information|transferred", "Assessment|begins", "Missing data|discovered"]), "The illustrative investigation identifies incomplete information transferred between verification and assessment.")],
 
        ["The owner coordinates a revised checklist and agrees how employees should confirm that essential information is complete.", null],
        ["However, publishing the checklist does not prove that employees understand it or that the claims process has improved.", q("What evidence would convince you that the revised checklist has genuinely corrected the handoff problem?")],
 
        ["Embedding requires incorporating the checklist into normal working instructions and ensuring employees understand when it should be used.", null],
        ["The owner also needs to examine subsequent claims results because a revised procedure may introduce unexpected delays elsewhere.", dg("Embedding and checking the improvement", D.flow(["Revise|checklist", "Update|instructions", "Support|employees", "Measure|results"]), "The owner embeds the revised checklist and evaluates whether it improves the complete claims journey.")],
 
        ["Imagine the revised checklist reduces missing information but adds unnecessary checks for straightforward claims that rarely require additional documentation.", null],
        ["The owner should reconsider those checks because sustainable improvement involves balancing control requirements with end-to-end performance.", st("Embedding does not mean protecting every change permanently; evidence may justify further refinement when unintended consequences appear.")],
 
        ["The process owner therefore returns to measurement and review instead of assuming that the latest intervention has permanently solved the problem.", null],
        ["That continuing responsibility makes the claims process adaptable without requiring a new transformation programme for every operational difficulty.", dg("The continuing claims management cycle", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The insurance company sustains claims performance by repeatedly reviewing evidence, refining the process and embedding effective changes.")],
 
        ["Remember that this insurance example is illustrative and does not describe the causes of Qasr's documented arrival-time deterioration.", null],
        ["It demonstrates why Qasr needs a continuing owner who can investigate, coordinate and verify improvements across departmental boundaries.", cmp("Closing the improvement loop", "Action without verification", "The organisation introduces a change but does not establish whether it improves the complete process.", "Action with verification", "The owner embeds the change, measures subsequent results and revises the response when necessary.")],
 
        ["The central lesson is that a corrective decision remains incomplete until the organisation checks its consequences and embeds effective practice.", null],
        ["Sustainable Performance therefore turns operational learning into a recurring management responsibility rather than an occasional reaction to failure.", q("Why would the insurer's improvement remain fragile if managers introduced the checklist but never reviewed its subsequent effects?")]
      ]
    }
  ]
},
{
  title: "Governing changes without blocking improvement",
  sec: "W14O3b",
  lines: [
    ["We have seen how a process owner sustains performance by measuring results, reviewing evidence and embedding effective improvements.", t("Governing changes without blocking improvement", "Give decisions the oversight they need without making every useful change unnecessarily difficult.")],
    ["Now let's examine how that owner can govern changes without making everyday improvement painfully slow or bureaucratic.", null],
    ["The challenge is balancing local flexibility with accountability for the performance of the complete end-to-end process.", q("How can managers approve useful changes while protecting the improvements already achieved?")],
 
    ["Return to Qasr Hospitality Group, where four separately approved changes altered the redesigned guest arrival process.", null],
    ["Together, those changes account for thirteen of the fifteen additional minutes recorded since the month-five improvement.", dg("Qasr's accumulating changes", D.hier([["Passport re-verification", ""], ["Rate waiver threshold", ""], ["Loyalty enrolment prompt", ""], ["Permanent desk positions", ""]]), "Four separately approved changes collectively account for 13 of the 15 additional arrival minutes since month five.")],
 
    ["The problem is not necessarily that individual approvals were unreasonable, because each change may address a legitimate concern.", null],
    ["The weakness is that separate approvals did not adequately protect the performance experienced across the complete arrival journey.", st("Effective change governance evaluates both the local justification and the cumulative consequences for end-to-end performance.")],
 
    ["Change governance means establishing who can approve a process change, what evidence they need and when wider consultation becomes necessary.", null],
    ["The aim is proportionate oversight, meaning the level of scrutiny should reflect the significance and consequences of the change.", dg("Proportionate change governance", D.stairs(-1, {labels: ["Minor change", "End-to-end impact", "Risk control", "Process boundary"]}), "Change governance applies different decision routes according to a proposed change's significance and consequences.")],
 
    ["Consider a small adjustment that remains below the agreed materiality threshold, meaning its effect is not significant enough for escalation.", null],
    ["The process owner can approve it, provided the change is recorded and the accumulated changes receive quarterly review.", dg("The minor-change route", D.flow(["Assess|materiality", "Owner|decides", "Change|logged", "Quarterly|aggregate review"]), "Changes below materiality are decided by the process owner, logged and reviewed together each quarter.")],
 
    ["That arrangement protects flexibility because managers do not need a steering committee meeting for every harmless operational adjustment.", null],
    ["The quarterly review still matters because individually minor changes can become significant when their effects accumulate over time.", st("Lightweight approval should preserve a record of small changes so their combined consequences remain visible.")],
 
    ["A different route applies when a proposed change could affect the measure covering the complete process.", null],
    ["The owner must involve affected functions and state the modelled performance effect before approving the proposed adjustment.", dg("The end-to-end impact route", D.flow(["Identify|measure impact", "Model|effect", "Consult|affected functions", "Owner|decides"]), "Changes affecting the end-to-end measure require the owner and affected functions to consider the modelled effect before approval.")],
 
    ["A modelled effect is an evidence-based estimate of how the proposed change could influence performance before implementation.", null],
    ["This requirement matters because separate departments may otherwise underestimate the waiting their decisions create for guests.", q("Why should Qasr estimate a proposed change's effect on arrival time before deciding whether to approve it?")],
 
    ["Controls introduced after incidents require another route because their purpose may involve risks that managers cannot simply disregard.", null],
    ["The owner should work with risk specialists to establish whether the original risk remains relevant and whether the control is economical.", dg("The incident-control route", D.flow(["Review|incident control", "Test|current risk", "Assess|control cost", "Owner and risk|decide"]), "Controls added after incidents require the process owner and risk specialists to test whether the risk remains live and whether the proposed control is the cheapest.")],
 
    ["Qasr's passport re-verification followed a regulatory inspection, making careful examination more appropriate than automatic removal for speed.", null],
    ["Managers should preserve necessary compliance while exploring whether the control can operate with less unnecessary disruption.", st("A necessary control should be retained where required, while its implementation can still be examined for avoidable cost and delay.")],
 
    ["Changes affecting the process boundary need wider authority because they can alter what the improvement programme actually covers.", null],
    ["The steering group should review such proposals and return to phase three, Launch Pad, for renewed scoping.", dg("The process-boundary route", D.flow(["Boundary|change proposed", "Steering group|reviews", "Phase three|scoping", "Scope|decision"]), "Changes to the process boundary require steering-group review and a return to phase-three scoping.")],
 
    ["These routes are proposed governance arrangements, not evidence that Qasr previously applied them to its documented changes.", null],
    ["Their purpose is to prevent another accumulation of locally approved decisions whose combined consequences remain unmanaged.", cmp("Two approaches to change approval", "Blanket approval gate", "Every adjustment faces the same formal scrutiny, potentially delaying legitimate improvements.", "Proportionate governance", "Approval authority and evidence requirements reflect the change's significance and consequences.")],
 
    ["Good governance therefore does not freeze the redesigned process, because changing conditions will continue creating legitimate improvement opportunities.", null],
    ["It gives those opportunities an appropriate decision route while protecting the benefits that the organisation worked to achieve.", t("The question ahead", "How does an organisation transfer these continuing responsibilities from its BPM programme into ordinary line management?")]
  ],
  review: [
    {
      title: "The supermarket that governed changes without slowing every decision",
      lines: [
        ["Let's explore proportionate governance through an illustrative supermarket that has redesigned its online grocery collection process.", t("Another way to understand proportionate governance", "A supermarket illustrates why different changes require different levels of approval.")],
 
        ["Imagine the supermarket improving how employees prepare grocery orders and transfer completed purchases to customers at collection points.", null],
        ["The redesigned process works because picking, checking and customer handover follow coordinated procedures across several operational teams.", dg("The grocery collection journey", D.flow(["Receive|order", "Pick|items", "Check|order", "Handover|purchase"]), "The supermarket's collection process coordinates activities from order receipt through customer handover.")],
 
        ["Now imagine a supervisor proposing a minor change to the position of collection labels on prepared grocery containers.", null],
        ["If its expected effect falls below the agreed materiality threshold, the process owner could approve and record it.", dg("A minor operational adjustment", D.flow(["Assess|materiality", "Owner|approves", "Change|recorded", "Quarterly|review"]), "A change below materiality can be approved by the process owner and reviewed with other minor changes quarterly.")],
 
        ["Requiring senior executives to approve such a small adjustment would consume attention without necessarily improving the decision.", null],
        ["However, recording it still matters because several small adjustments might eventually affect the complete collection process.", st("Proportionate governance allows minor improvements while retaining visibility over their cumulative effects.")],
 
        ["Now imagine the picking team proposing another verification activity that could increase the time customers wait for collection.", null],
        ["Because the proposal affects the end-to-end measure, the owner should consult affected functions and estimate its likely impact.", dg("A change affecting collection time", D.flow(["Proposed|verification", "Estimate|waiting effect", "Consult|functions", "Owner|decides"]), "Changes affecting collection time require consultation and a modelled estimate before approval.")],
 
        ["The supermarket should not assume that better checking automatically justifies any increase in waiting, regardless of customer consequences.", null],
        ["Managers need evidence about the expected benefits and costs before deciding whether the change represents an improvement.", q("Why would approving the verification activity without estimating its effect on customer waiting be poor governance?")],
 
        ["Suppose a safety incident also leads someone to propose an additional control within the collection process.", null],
        ["The owner and risk specialists should assess whether the risk remains live and whether the proposed control is economical.", dg("A control introduced after an incident", D.flow(["Incident|reviewed", "Current risk|tested", "Control cost|assessed", "Owner and risk|decide"]), "An incident-related control requires assessment of the continuing risk and the cost of the proposed safeguard.")],
 
        ["Finally, imagine management proposing to extend the collection process into home delivery, changing its intended operating boundary.", null],
        ["That proposal requires steering-group review and renewed scoping because the organisation would be redefining the process being governed.", dg("A change to process scope", D.flow(["Scope|extension", "Steering group|reviews", "Launch Pad|revisited", "Boundary|agreed"]), "A process-boundary change requires steering-group consideration and renewed phase-three scoping.")],
 
        ["The supermarket example is illustrative, but its governance logic directly supports the sustainable performance principles applied to Qasr.", null],
        ["Different decisions receive appropriate scrutiny without creating an expensive approval obstacle for every useful operational adjustment.", cmp("Approval approaches", "Uniform bureaucracy", "Every proposal receives the same approval burden regardless of its significance.", "Proportionate oversight", "Approval authority and evidence requirements reflect the proposed change's consequences.")],
 
        ["The central lesson is that process governance should enable responsible adaptation while protecting end-to-end performance.", null],
        ["Managers should make changes visible, assess their consequences and escalate only when the nature of the decision requires it.", q("Why would the supermarket need both lightweight local approval and stronger oversight for changes affecting customer waiting?")]
      ]
    },
    {
      title: "The medical laboratory that balanced safety and improvement",
      lines: [
        ["Now consider an illustrative medical laboratory that has improved how patient samples move from registration to completed test results.", t("A different angle on change governance", "A laboratory illustrates why legitimate controls need risk-sensitive governance rather than automatic acceptance or removal.")],
 
        ["Imagine the laboratory redesigning sample handling to reduce unnecessary waiting while preserving the accuracy of identification and testing.", null],
        ["The improved process coordinates sample registration, preparation, analysis and result release across several professional responsibilities.", dg("The laboratory process", D.flow(["Register|sample", "Prepare|material", "Analyse|sample", "Release|result"]), "The laboratory's process coordinates sample handling activities while protecting the reliability of test results.")],
 
        ["Later, imagine a minor identification incident prompting a proposal for an additional verification step before samples enter analysis.", null],
        ["The proposed control has a legitimate safety purpose, but managers still need to examine its effectiveness and operating consequences.", st("A legitimate risk concern does not remove the need to evaluate how a proposed control affects the complete process.")],
 
        ["The process owner should consult risk specialists because the decision involves patient safety rather than only operational convenience.", null],
        ["Together, they should establish whether the underlying risk remains live and whether the proposed safeguard is the cheapest suitable option.", dg("Risk-sensitive change review", D.flow(["Incident|examined", "Risk|reassessed", "Options|compared", "Owner and risk|decide"]), "The process owner and risk specialists evaluate the continuing risk and compare the cost of suitable controls.")],
 
        ["Suppose the proposed verification would add waiting before every sample could proceed to the analysis stage.", null],
        ["The laboratory should estimate that effect while examining whether a different control could protect identification accuracy more economically.", q("Why would simply removing the verification step be as weak as approving it without examining alternatives?")],
 
        ["The answer lies in separating the necessary safety objective from the particular procedure proposed to achieve that objective.", null],
        ["A different arrangement might preserve identification assurance while reducing avoidable waiting, although evidence must support that conclusion.", cmp("Safety purpose and implementation", "Control purpose", "Protect accurate sample identification and reduce relevant patient safety risks.", "Control implementation", "Select an effective and economical arrangement while considering its end-to-end consequences.")],
 
        ["Now imagine the laboratory considering a broader service that includes sample collection outside its existing operating boundary.", null],
        ["That proposal changes the process scope and therefore requires steering-group consideration rather than routine approval by one operational manager.", dg("Reviewing a boundary change", D.flow(["New service|proposed", "Boundary|assessed", "Steering group|reviews", "Phase three|scoping"]), "A proposed extension beyond the existing process boundary requires steering-group review and renewed Launch Pad scoping.")],
 
        ["The laboratory also needs a record of smaller adjustments so managers can examine whether their combined effects become significant.", null],
        ["That record supports improvement without forcing every minor change through the same formal approval arrangements as a major redesign.", st("Good governance combines visible local changes with escalation when performance, risk or process boundaries require wider authority.")],
 
        ["Remember that this laboratory is illustrative and does not establish additional facts about Qasr's regulatory inspection or passport controls.", null],
        ["At Qasr, passport re-verification followed a regulatory inspection, so any proposed adjustment must respect the relevant compliance requirement.", cmp("Illustration and Qasr evidence", "Laboratory illustration", "A hypothetical identification incident prompts evaluation of a proposed verification control.", "Qasr case", "Passport re-verification was introduced following a regulatory inspection.")],
 
        ["Both situations demonstrate why sustainable governance must protect legitimate requirements while examining how those requirements are implemented.", null],
        ["The objective is not to prevent change, but to ensure that changes remain justified and compatible with process performance.", q("How should the laboratory distinguish a minor operating adjustment from a risk-related change requiring specialist review?")]
      ]
    }
  ]
},
{
  title: "The handover that makes accountability real",
  sec: "W14O3c",
  lines: [
    ["We have seen how proportionate governance allows useful process changes while protecting the improvements already achieved.", t("The handover that makes accountability real", "Sustainable Performance requires a formal transfer from the BPM programme into continuing line management.")],
    ["Now let's examine what happens when the improvement programme ends and operational managers inherit responsibility for the redesigned process.", null],
    ["This transition matters because project completion does not automatically establish who will protect performance during ordinary operations.", q("What must be transferred when a BPM programme finishes, beyond the redesigned process itself?")],
 
    ["Think about Qasr Hospitality Group, where the redesigned arrival process initially reduced waiting time to twenty-four minutes.", null],
    ["Twenty-two months after the initial go-live, arrival time had increased to thirty-nine minutes despite that earlier achievement.", dg("Qasr's sustainability challenge", D.bars([["Baseline", 82], ["Month 5", 24], ["Month 22", 39]]), "Qasr's arrival process improved substantially before its performance deteriorated during subsequent operations.")],
 
    ["The improvement was real, but sustaining it required continuing responsibilities that could survive changes in organisational roles.", null],
    ["Qasr's appointed process owner was promoted nine months ago, and no dedicated replacement was appointed afterward.", dg("The ownership transition", D.org("process", {top: "Group operations director", depts: ["Thirteen direct reports", "Arrival process accountability"]}), "After the appointed owner was promoted, arrival process accountability was absorbed by a group operations director with thirteen direct reports.")],
 
    ["The group operations director absorbed accountability while managing thirteen direct reports, making dedicated process oversight harder to maintain.", null],
    ["This illustrates why accountability must belong to an enduring management arrangement rather than depend entirely on one individual's availability.", st("A sustainable ownership arrangement must survive promotions, departures and changes in organisational responsibilities.")],
 
    ["A formal handover transfers responsibility from the temporary programme into line management, meaning the managers running everyday operations.", null],
    ["It identifies a named recipient and an agreed transfer date, removing uncertainty about when continuing accountability begins.", dg("Transferring responsibility", D.flow(["BPM|programme", "Named|recipient", "Agreed|transfer date", "Line|management"]), "Formal handover establishes who receives process accountability and when responsibility transfers into normal operations.")],
 
    ["The handover must also specify obligations, because naming someone without defining their responsibilities leaves important work vulnerable.", null],
    ["Those obligations include maintaining process objectives and ensuring that meaningful performance measures continue being produced and reviewed.", dg("The continuing obligations", D.hier([["Process objectives", ""], ["Measure production", ""], ["Performance review", ""], ["Corrective decisions", ""]]), "The receiving process owner accepts defined responsibilities for objectives, measurement, review and continuing improvement.")],
 
    ["At Qasr, the analyst still produces the monthly arrival measure, demonstrating that reporting can continue without effective management review.", null],
    ["A proper handover would identify the review meeting and establish who must respond when performance crosses agreed boundaries.", cmp("Reporting and accountable ownership", "Reporting continues", "An analyst produces the arrival measure for the operations pack.", "Management responsibility", "A named owner reviews results, coordinates decisions and follows through on corrective action.")],
 
    ["The receiving owner also needs sufficient authority to coordinate departments whose decisions affect the complete guest arrival journey.", null],
    ["Without that authority, responsibility becomes symbolic because the owner cannot resolve problems crossing functional or property boundaries.", q("Why is naming a process owner insufficient if that person cannot coordinate the functions affecting arrival performance?")],
 
    ["Another essential handover element concerns outstanding defects, meaning known problems that remain unresolved when the programme concludes.", null],
    ["Each defect needs an accountable owner and a target date, preventing unfinished work from disappearing after project closure.", dg("Outstanding work remains visible", D.flow(["Record|defect", "Assign|owner", "Agree|date", "Review|resolution"]), "Outstanding defects transfer with named owners and dates so unresolved problems remain visible after programme completion.")],
 
    ["This does not establish that Qasr had particular unresolved defects at handover, because the case provides no such inventory.", null],
    ["It explains what a sound transfer should contain so future operational problems do not fall between organisational responsibilities.", st("A proposed handover checklist must not be confused with evidence that Qasr completed those arrangements.")],
 
    ["The handover should also establish how the owner will manage changes while preserving legitimate controls and end-to-end performance.", null],
    ["That connection matters because individually approved changes later accounted for thirteen additional minutes in Qasr's arrival process.", dg("Handover supports continuing governance", D.flow(["Named|ownership", "Performance|review", "Change|governance", "Sustained|improvement"]), "Continuing ownership connects operational performance review with proportionate governance of subsequent process changes.")],
 
    ["A completed transfer therefore means more than receiving documents, because the recipient must accept practical decision-making obligations.", null],
    ["The real test is whether the organisation can maintain the process without relying on the original programme team.", dg("The continuing management loop", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "A successful handover enables line management to sustain the repeating performance improvement cycle.")],
 
    ["For Qasr, restoring dedicated ownership would be a sensible proposal, although the case does not establish an approved appointment.", null],
    ["The next lesson will use the documented evidence to examine how managers should diagnose deterioration and choose a defensible response.", t("The question ahead", "What should Qasr's managers do now that the original improvement has deteriorated and dedicated ownership has disappeared?")]
  ],
  review: [
    {
      title: "The hospital appointment project that ended before accountability was secure",
      lines: [
        ["Let's explore formal handover through an illustrative hospital that has redesigned how patients book and confirm outpatient appointments.", t("Another way to understand formal handover", "A hospital illustrates why project completion must include a clear transfer of continuing management responsibility.")],
 
        ["Imagine the hospital introducing a redesigned appointment process that reduces repeated calls and helps patients receive confirmations more reliably.", null],
        ["A temporary improvement team coordinates the redesign, supports employees and checks whether the new arrangements deliver their intended benefits.", dg("The redesigned appointment journey", D.flow(["Receive|request", "Allocate|appointment", "Confirm|booking", "Inform|patient"]), "The hospital's redesigned appointment process coordinates booking activities around the patient's complete experience.")],
 
        ["The programme achieves its immediate objectives, and the improvement team prepares to return to other organisational assignments.", null],
        ["However, imagine that nobody has formally accepted responsibility for maintaining appointment performance after the team departs.", st("Successful implementation does not guarantee sustainability when continuing process accountability remains undefined.")],
 
        ["The hospital needs a named operational recipient who accepts responsibility for the complete appointment process rather than one isolated activity.", null],
        ["The transfer should specify when that responsibility begins, preventing uncertainty between the programme team and everyday management.", dg("A formal ownership transfer", D.flow(["Programme|team", "Named|recipient", "Transfer|date", "Operational|ownership"]), "A formal handover identifies the receiving manager and establishes when continuing accountability begins.")],
 
        ["The receiving manager must also understand which objectives remain important and which measures reveal whether patients receive timely service.", null],
        ["Regular review arrangements should establish who examines those measures and who coordinates action when results deteriorate.", dg("Continuing management responsibilities", D.hier([["Service objectives", ""], ["Performance measures", ""], ["Review meeting", ""], ["Improvement decisions", ""]]), "The receiving owner accepts continuing responsibilities for objectives, measurement, review and coordinated improvement.")],
 
        ["Now imagine the project team has identified an unresolved problem affecting appointment confirmations for a particular category of patients.", null],
        ["The problem should transfer with a named owner and target date rather than disappear when the programme formally closes.", q("What could happen if the project team leaves without assigning responsibility for an unresolved appointment problem?")],
 
        ["The receiving owner also needs authority to coordinate reception, clinical departments and appointment support when problems cross their boundaries.", null],
        ["Without that authority, the owner might recognise deterioration but remain unable to secure an effective organisational response.", st("Real accountability combines clearly assigned obligations with sufficient authority to coordinate the complete process.")],
 
        ["Once responsibility transfers, the manager should continue measuring performance, reviewing evidence and embedding improvements into everyday procedures.", null],
        ["That routine allows the hospital to maintain the redesigned service without repeatedly recalling the original improvement team.", dg("The sustaining management cycle", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The operational owner sustains appointment performance through continuing measurement, review, improvement and embedding.")],
 
        ["This hospital example is illustrative, but it helps explain the importance of the ownership gap documented at Qasr.", null],
        ["Qasr's appointed owner was promoted without a dedicated replacement, leaving accountability absorbed by an already busy director.", cmp("Two ownership arrangements", "Informal continuity", "Responsibility is assumed without a dedicated recipient and clearly defined continuing obligations.", "Formal continuity", "A named owner accepts authority, measures, review duties and outstanding work through an agreed transfer.")],
 
        ["The lesson is that a handover succeeds when someone can demonstrate continuing responsibility, not merely acknowledge receiving project documents.", null],
        ["That distinction protects improvements when employees change roles and the original programme becomes part of organisational history.", q("Which handover element would help the hospital maintain accountability if its receiving manager were later promoted?")]
      ]
    },
    {
      title: "The public transport service that transferred the process, not just the paperwork",
      lines: [
        ["Now consider an illustrative public transport operator that has redesigned its vehicle maintenance scheduling process to improve service reliability.", t("A different angle on handover", "A transport operator illustrates why transferring documents is weaker than transferring authority and operating obligations.")],
 
        ["Imagine a BPM programme introducing clearer maintenance scheduling so vehicles receive necessary attention without unnecessary disruption to planned services.", null],
        ["The redesigned process coordinates maintenance planning, vehicle availability and operational decisions across several departments within the organisation.", dg("The maintenance scheduling journey", D.flow(["Identify|maintenance", "Plan|work", "Coordinate|availability", "Release|vehicle"]), "The redesigned maintenance process coordinates technical work with vehicle availability and operational requirements.")],
 
        ["When the programme concludes, imagine its manager sending the operating procedures and performance dashboard to the maintenance department.", null],
        ["The documents arrive successfully, but no meeting establishes who will own the complete process or resolve future disagreements.", st("Transferring documents does not establish accountability when decision rights and continuing management obligations remain unclear.")],
 
        ["Suppose operations managers later request schedule adjustments that make sense for service coverage but disrupt planned maintenance activities.", null],
        ["Maintenance supervisors may defend technical requirements while operational managers focus on keeping enough vehicles available for passengers.", dg("Responsibilities across functions", D.org("process", {top: "Proposed process owner", depts: ["Maintenance planning", "Transport operations", "Performance review"]}), "A continuing process owner would coordinate maintenance and operations decisions affecting the complete scheduling process.")],
 
        ["Neither department necessarily acts irresponsibly, because both are protecting legitimate responsibilities within the organisation's service system.", null],
        ["The difficulty arises when nobody has sufficient authority to evaluate the combined consequences and agree a coordinated response.", q("Who should resolve a conflict when maintenance requirements and service availability both affect the complete process?")],
 
        ["A proper handover would name the receiving process owner and establish an agreed date for transferring accountability.", null],
        ["It would also specify objectives, measures and the management meeting where emerging performance problems must be reviewed.", dg("The handover agreement", D.hier([["Named recipient and date", ""], ["Objectives and measures", ""], ["Review obligations", ""], ["Outstanding defects", ""]]), "A formal handover transfers named accountability, performance obligations, review arrangements and unresolved work.")],
 
        ["Imagine the programme also leaves an unresolved scheduling problem affecting a particular type of maintenance activity.", null],
        ["The receiving owner should accept that defect with an assigned responsible person and target date for resolution.", st("Outstanding defects must remain visible and accountable after the programme team completes its assignment.")],
 
        ["The operator should also establish how future scheduling changes will be evaluated against technical requirements and end-to-end performance.", null],
        ["That governance allows managers to adapt responsibly without letting separate local decisions gradually undermine the redesigned process.", dg("Continuing operational governance", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The receiving owner maintains performance through continuing review, coordinated improvement and embedding.")],
 
        ["This transport example is illustrative and does not establish additional facts about Qasr's original programme handover arrangements.", null],
        ["It demonstrates why Qasr's continuing ownership must involve more than assigning accountability to an already occupied senior manager.", cmp("Paperwork versus responsibility", "Document transfer", "Procedures and reports are delivered without clearly assigning continuing authority or review obligations.", "Accountability transfer", "A named owner accepts decision rights, measures, review responsibilities and outstanding work.")],
 
        ["The essential test is whether operational managers know who can make decisions when the redesigned process encounters new difficulties.", null],
        ["A successful handover gives the organisation that capability before the original improvement team is no longer available.", q("Why would a complete set of maintenance procedures still be insufficient if nobody could coordinate decisions across departments?")]
      ]
    }
  ]
},
      ] },
      { id: "l4", title: "Twenty-two months later: the Qasr decision", sections: [
{
  title: "Exhibit 14: twenty-two months of gradual decay",
  sec: "W14O2d",
  lines: [
    ["We have explored how ownership, measurement and change governance should protect an improvement after its programme ends.", t("Exhibit 14: twenty-two months of gradual decay", "Qasr Hospitality Group · The Measure Nobody Reads · Diagnose the evidence before choosing an intervention.")],
    ["Now let's examine Qasr Hospitality Group's complete sustainability problem and distinguish documented evidence from possible explanations.", null],
    ["This distinction matters because a convincing diagnosis must explain the deterioration without inventing failures or blaming individuals.", q("What does the evidence establish about Qasr's decline, and what still requires investigation?")],
 
    ["Qasr operates fourteen properties, where the original lobby-to-room arrival process took eighty-two minutes before improvement.", null],
    ["Five months after full rollout, arrival time had fallen to twenty-four minutes, demonstrating substantial realised improvement.", dg("The original improvement", D.bars([["Baseline", 82], ["Month 5", 24]]), "Qasr reduced lobby-to-room arrival time from 82 minutes to 24 minutes within five months of full rollout.")],
 
    ["At month thirteen, arrival time had increased to twenty-eight minutes, while kiosk adoption had declined to sixty-one percent.", null],
    ["By month twenty-two, arrival time reached thirty-nine minutes, and kiosk adoption had fallen to forty-eight percent.", dg("Twenty-two months of performance evidence", D.bars([["Baseline", 82], ["Month 5", 24], ["Month 13", 28], ["Month 22", 39]]), "Qasr's arrival time improved substantially before deteriorating to 28 minutes at month 13 and 39 minutes at month 22.")],
 
    ["The arrival measure had increased during each of the latest six months, indicating persistent deterioration rather than one isolated incident.", null],
    ["Meanwhile, kiosk adoption had fallen seventeen percentage points from its month-five level of sixty-five percent.", dg("Kiosk adoption also deteriorated", D.bars([["Month 5", 65], ["Month 13", 61], ["Month 22", 48]]), "Qasr's kiosk adoption declined from 65% at month five to 48% at month twenty-two.")],
 
    ["These measures establish declining performance and adoption, but they do not independently prove why every change occurred.", null],
    ["We therefore need to examine the documented management arrangements and process changes before drawing conclusions about causation.", st("A sound diagnosis separates observed deterioration from explanations that still require supporting evidence.")],
 
    ["Qasr's appointed process owner was promoted to general manager of the Marina property nine months ago.", null],
    ["No dedicated replacement was appointed, and accountability moved to a group operations director managing thirteen direct reports.", dg("The ownership gap", D.org("process", {top: "Group operations director", depts: ["Thirteen direct reports", "Arrival process accountability"]}), "Qasr's dedicated process ownership disappeared after the appointed owner was promoted nine months ago.")],
 
    ["This arrangement creates a plausible governance weakness because end-to-end performance requires continuing attention across several operational functions.", null],
    ["However, the evidence does not establish that the director deliberately neglected responsibilities or personally caused the deterioration.", st("An ownership gap supports a governance diagnosis without establishing individual negligence or deliberate wrongdoing.")],
 
    ["The analyst continued producing the arrival measure monthly, and the result remained on page four of the operations pack.", null],
    ["Yet managers last discussed that measure seven months ago, when the reported arrival time was twenty-eight minutes.", dg("The measure nobody reads", D.flow(["Analyst|produces", "Operations pack|includes", "Management review|not sustained"]), "Qasr continued producing the arrival measure, but management discussion of that measure had not been sustained.")],
 
    ["This evidence reveals a broken management loop, where reporting continued without regular interpretation and accountable corrective decisions.", null],
    ["The weakness concerns how information was used, rather than whether the analyst fulfilled the reporting responsibility.", q("What could an active process owner have done when the reported arrival time began exceeding its delivered result?")],
 
    ["The exhibit also identifies four separately approved changes introduced after the successful rollout of the redesigned process.", null],
    ["They involved passport re-verification, a lower rate waiver threshold, a loyalty enrolment prompt and permanent desk positions.", dg("The four documented changes", D.hier([["Passport re-verification", ""], ["Rate waiver threshold", ""], ["Loyalty enrolment prompt", ""], ["Permanent desk positions", ""]]), "Four separately approved changes altered Qasr's arrival process after the successful rollout.")],
 
    ["Together, these changes account for thirteen of the fifteen additional minutes recorded between month five and month twenty-two.", null],
    ["That finding strongly supports examining cumulative change effects, without proving that every individual approval was inappropriate.", dg("Explaining the additional minutes", D.bars([["Four changes", 13], ["Other increase", 2], ["Total increase", 15]]), "The four documented changes account for 13 of the 15 additional arrival minutes since month five, leaving two minutes not attributed to those changes.")],
 
    ["The remaining two minutes are not explained by the exhibit, so assigning them to employee behaviour would be speculation.", null],
    ["Likewise, the evidence does not establish which individual change contributed a particular number of minutes to the deterioration.", st("The exhibit supports a combined 13-minute effect, not an invented allocation of minutes across individual changes.")],
 
    ["Our diagnosis therefore combines measurable deterioration, weakened ownership, inactive review and the cumulative effects of approved changes.", null],
    ["The next challenge is deciding which sustaining intervention deserves priority while respecting legitimate operational and regulatory requirements.", t("The decision ahead", "Which intervention would restore accountable management of Qasr's arrival process and prevent further unmanaged deterioration?")]
  ],
  review: [
    {
      title: "The university enrolment process that lost its improvement",
      lines: [
        ["Let's practise evidence-based diagnosis through an illustrative university that previously improved its student enrolment process.", t("Another way to diagnose gradual deterioration", "A university enrolment example illustrates how to distinguish measured decline from explanations requiring investigation.")],
 
        ["Imagine the university redesigning enrolment so students complete administrative requirements without repeatedly visiting different service departments.", null],
        ["The improvement team coordinates document verification, fee confirmation and course registration to reduce unnecessary waiting between activities.", dg("The redesigned enrolment journey", D.flow(["Submit|documents", "Verify|eligibility", "Confirm|fees", "Register|courses"]), "The university's redesigned enrolment process coordinates administrative activities around the student's complete journey.")],
 
        ["For illustration, suppose average enrolment completion time falls from ten days to four days after the redesigned process begins.", null],
        ["Eighteen months later, the university measures an average of seven days, indicating that some improvement has been lost.", dg("Illustrative enrolment deterioration", D.bars([["Original", 10], ["Delivered", 4], ["Later", 7]]), "In this illustration, enrolment time improves from ten to four days before deteriorating to seven days.")],
 
        ["The figures establish deterioration, but they do not explain whether staff behaviour, process changes or management arrangements caused it.", null],
        ["A careful analyst should therefore investigate the operating system before attributing the result to individual employee performance.", st("Observed deterioration establishes what happened, while a defensible causal explanation requires additional evidence.")],
 
        ["Now imagine the original enrolment owner moving to another position without anyone formally accepting continuing end-to-end responsibility.", null],
        ["Department managers still perform their assigned duties, but nobody coordinates decisions affecting the complete student experience.", dg("The ownership problem", D.org("process", {top: "Administrative management", depts: ["Admissions", "Finance", "Registration"]}), "The illustrative university lacks a dedicated owner coordinating enrolment performance across its administrative functions.")],
 
        ["Suppose the university also produces monthly completion-time reports that managers receive without discussing the emerging deterioration.", null],
        ["The reporting system continues functioning, yet the organisation has no dependable routine for interpreting results and agreeing corrective action.", q("Why would producing another enrolment report be insufficient if nobody accepts responsibility for responding to deterioration?")],
 
        ["Imagine further investigation revealing that departments introduced additional verification activities without assessing their combined effect on completion time.", null],
        ["Those activities might address legitimate concerns, so the university should examine their necessity and coordination before removing them.", dg("Investigating cumulative changes", D.flow(["Local|requirements", "Combined|waiting", "Owner|investigates", "Response|agreed"]), "The university examines whether separately justified requirements collectively increase enrolment time.")],
 
        ["The owner should distinguish confirmed findings from possible explanations and avoid assigning numerical effects without supporting operational evidence.", null],
        ["A useful response would restore accountable review and investigate the actual causes before selecting changes to the process.", cmp("Two approaches to diagnosis", "Assumption-driven", "Blames employees or removes controls before establishing why performance deteriorated.", "Evidence-driven", "Separates observed results from causes and coordinates investigation across the complete process.")],
 
        ["This university example is illustrative, while Qasr's arrival figures and documented governance problems come from the Week 14 case.", null],
        ["Both situations demonstrate why sustainable improvement requires reliable measures connected to ownership and coordinated management decisions.", st("A defensible diagnosis explains the evidence without claiming more certainty than the available information supports.")],
 
        ["The essential skill is recognising what the evidence establishes and what managers still need to investigate before intervening.", null],
        ["That discipline protects organisations from replacing one poorly coordinated decision with another unsupported corrective action.", q("Which parts of the university diagnosis are established by its illustrative measures, and which require further investigation?")]
      ]
    },
    {
      title: "The logistics centre where local controls accumulated",
      lines: [
        ["Now consider an illustrative logistics centre that improved parcel dispatch but gradually lost some of its original performance.", t("A different angle on the Qasr diagnosis", "A logistics centre illustrates how to examine cumulative changes without inventing individual contributions.")],
 
        ["Imagine the centre redesigning parcel handling so orders move efficiently from sorting through verification to dispatch.", null],
        ["The original improvement reduces delays because employees follow coordinated procedures and unnecessary handoffs have been removed.", dg("The redesigned dispatch process", D.flow(["Sort|parcels", "Verify|orders", "Prepare|loads", "Dispatch|vehicles"]), "The logistics centre's redesigned process coordinates parcel handling activities to improve dispatch performance.")],
 
        ["Later, imagine several supervisors introducing additional checks to address separate concerns about accuracy, security and delivery documentation.", null],
        ["Each adjustment has a reasonable purpose, but managers do not evaluate how the changes affect total dispatch time.", dg("Accumulating local controls", D.hier([["Accuracy verification", ""], ["Security check", ""], ["Documentation review", ""]]), "Several locally justified controls may collectively increase dispatch time when their combined effects are not evaluated.")],
 
        ["For illustration, suppose dispatch time rises by twelve minutes after the original improvement, prompting a review of accumulated changes.", null],
        ["An operational investigation establishes that the additional controls collectively account for nine of those twelve minutes.", dg("Illustrative cumulative effect", D.bars([["Controls", 9], ["Unexplained", 3], ["Total increase", 12]]), "In this illustration, documented controls explain nine of twelve additional dispatch minutes, leaving three minutes unexplained.")],
 
        ["That evidence supports examining the controls together, but it does not establish how much time each individual control contributes.", null],
        ["The remaining three minutes also require investigation rather than an invented explanation about employees becoming less productive.", st("A documented combined effect should not be converted into unsupported estimates for individual changes or unexplained deterioration.")],
 
        ["Suppose the centre's performance report continues being produced while management meetings rarely examine the worsening dispatch result.", null],
        ["The reporting activity remains useful, but the absence of active review allows deterioration to continue without coordinated intervention.", q("What does this situation reveal about the difference between collecting performance information and managing the process?")],
 
        ["A named process owner should examine the complete dispatch journey and involve functions responsible for the additional controls.", null],
        ["The owner must preserve necessary requirements while investigating whether their implementation creates avoidable waiting or duplicated activities.", dg("An evidence-based response", D.flow(["Review|performance", "Examine|controls", "Consult|functions", "Agree|changes", "Check|results"]), "The process owner investigates cumulative effects, coordinates affected functions and verifies the consequences of agreed changes.")],
 
        ["For example, managers might discover opportunities to coordinate existing checks, although any proposed solution would require operational validation.", null],
        ["The important principle is to investigate before intervening rather than assuming that every additional control should disappear.", st("Legitimate controls should be evaluated for necessity and efficiency rather than automatically retained or removed.")],
 
        ["This logistics example is illustrative, and its numerical values are not additional observations from Qasr Hospitality Group.", null],
        ["Qasr's documented changes explain thirteen of fifteen additional arrival minutes, while the remaining two minutes lack an established explanation.", cmp("Illustration and Qasr evidence", "Logistics illustration", "Hypothetical controls explain nine of twelve additional dispatch minutes.", "Qasr Hospitality Group", "Four documented changes explain thirteen of fifteen additional arrival minutes.")],
 
        ["Both cases demonstrate why a sound diagnosis combines numerical evidence with examination of ownership and management review arrangements.", null],
        ["The goal is to restore the organisation's ability to recognise deterioration and coordinate effective responses across the process.", q("Why should the logistics owner investigate the unexplained three minutes instead of attributing them to employee mistakes?")]
      ]
    }
  ]
},
{
  title: "One intervention, four candidates, one defensible choice",
  sec: "W14O3d",
  lines: [
    ["We have examined Qasr's gradual deterioration and the management arrangements that allowed its earlier improvement to weaken.", t("One intervention, four candidates, one defensible choice", "Use Exhibit 14 to choose a sustaining intervention that addresses the underlying governance weakness.")],
    ["Now imagine advising Qasr's leadership, knowing that management can prioritise only one intervention for immediate attention.", null],
    ["Your challenge is to choose a response that addresses the evidence without inventing causes or disregarding legitimate requirements.", q("Which intervention would most directly restore Qasr's ability to sustain its arrival process?")],
 
    ["Remember that arrival time increased from twenty-four minutes at month five to thirty-nine minutes at month twenty-two.", null],
    ["Kiosk adoption also declined from sixty-five to forty-eight percent, showing deterioration in both performance and process usage.", dg("The evidence requiring action", D.bars([["Month 5", 24], ["Month 13", 28], ["Month 22", 39]]), "Qasr's lobby-to-room arrival time increased from 24 to 39 minutes after its successful rollout.")],
 
    ["The evidence also identifies four approved changes accounting for thirteen of the fifteen additional minutes since month five.", null],
    ["Meanwhile, dedicated process ownership disappeared, although the analyst continued producing monthly performance information for the operations pack.", dg("The governance problem", D.flow(["Owner|promoted", "Dedicated role|vacant", "Measure|still produced", "Review|not sustained"]), "Qasr lost dedicated process ownership while monthly reporting continued without sustained management review.")],
 
    ["Consider four possible interventions as alternatives for our decision exercise, rather than actions already approved by Qasr.", null],
    ["We could prioritise renewed employee training, remove accumulated process steps, introduce more detailed reporting or restore accountable ownership.", dg("Four intervention candidates", D.hier([["Renew employee training", ""], ["Remove accumulated steps", ""], ["Expand performance reporting", ""], ["Restore process ownership", ""]]), "Four proposed interventions address different possible weaknesses in Qasr's arrival process.")],
 
    ["Renewed training might improve consistency, but the exhibit does not establish that employee knowledge caused the documented deterioration.", null],
    ["Choosing training immediately would therefore assume a problem that has not yet been demonstrated by the available evidence.", st("An intervention should address an evidenced weakness rather than rely on an unsupported explanation about employee behaviour.")],
 
    ["Removing accumulated steps appears attractive because the four approved changes explain thirteen additional minutes of arrival time.", null],
    ["However, passport re-verification followed a regulatory inspection, so removing controls without examining their obligations would be irresponsible.", dg("The risk of automatic removal", D.flow(["Identify|added steps", "Examine|requirements", "Assess|alternatives", "Protect|necessary controls"]), "Qasr should examine the cumulative effects of added steps without automatically removing legitimate regulatory or operational controls.")],
 
    ["Expanding reporting might also appear useful, but Qasr already produces the arrival measure every month.", null],
    ["The weakness is that managers stopped discussing that measure regularly, not that the analyst lacked another dashboard.", cmp("More reporting versus active management", "More reporting", "Adds information without necessarily changing how managers interpret or use existing measures.", "Active management", "Connects existing performance evidence to accountable review, decisions and follow-through.")],
 
    ["Restoring dedicated process ownership addresses a documented gap and creates a foundation for coordinating the other necessary responses.", null],
    ["A named owner could organise performance reviews, investigate declining adoption and evaluate the accumulated changes across affected functions.", dg("The proposed priority", D.org("process", {top: "Dedicated arrival process owner", depts: ["Performance review", "Adoption investigation", "Change governance", "Corrective follow-up"]}), "Restoring dedicated ownership would establish accountability for reviewing performance and coordinating evidence-based improvement.")],
 
    ["That makes ownership the most defensible immediate priority, although the exhibit does not prove it will independently restore arrival time.", null],
    ["Its advantage is creating the management capacity needed to diagnose problems and select subsequent interventions responsibly.", iss("Restoring ownership is a reasoned recommendation based on the documented governance gap, not a guaranteed performance outcome.", "A defensible priority")],
 
    ["The proposed owner should have sufficient authority to coordinate decisions across Qasr's fourteen properties and relevant operational functions.", null],
    ["The appointment should also establish a recurring review meeting where deterioration triggers investigation and accountable corrective decisions.", dg("Making the appointment operational", D.flow(["Name|owner", "Confirm|authority", "Schedule|reviews", "Assign|actions", "Check|results"]), "A proposed ownership intervention requires decision authority, recurring reviews, assigned actions and verification of results.")],
 
    ["The owner would then examine the four changes while respecting regulatory obligations and testing their combined end-to-end consequences.", null],
    ["That investigation should distinguish the thirteen explained additional minutes from the remaining two minutes requiring further evidence.", dg("Investigating the additional time", D.bars([["Documented changes", 13], ["Unexplained", 2], ["Total increase", 15]]), "The four documented changes account for 13 additional minutes, while two minutes remain unexplained by the exhibit.")],
 
    ["The owner should also investigate declining kiosk adoption rather than assuming resistance, because several different mechanisms could explain reduced usage.", null],
    ["Any proposed corrective action would need subsequent measurement to establish whether arrival performance and adoption actually improve.", dg("The sustaining response", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The proposed owner would sustain improvement by connecting performance evidence to review, corrective action and embedding.")],
 
    ["Notice that our recommendation prioritises a management capability rather than promising that one operational adjustment will solve every problem.", null],
    ["That distinction matters because Qasr needs continuing governance capable of responding to future changes after the immediate deterioration is addressed.", cmp("Choosing the intervention", "Immediate symptom correction", "Targets a visible problem without necessarily restoring the organisation's continuing management capability.", "Sustaining governance", "Restores accountability for diagnosing, coordinating and verifying improvements over time.")],
 
    ["Our choice is therefore to restore dedicated process ownership, supported by authority, regular review and proportionate change governance.", null],
    ["Next, we will connect that decision to the wider ambition of becoming an organisation that improves processes continuously.", t("The decision to defend", "Restore accountable process ownership, then use evidence to select and verify the necessary operational improvements.")]
  ],
  review: [
    {
      title: "The university service centre that chose ownership over another dashboard",
      lines: [
        ["Let's practise intervention selection through an illustrative university service centre where student request handling has gradually deteriorated.", t("Another way to choose a defensible intervention", "A university illustrates why restoring accountability can be more useful than expanding reporting.")],
 
        ["Imagine the university previously redesigning its student support process so requests move efficiently between administrative departments.", null],
        ["The improved process initially reduces waiting because staff understand the handoffs and managers coordinate decisions across the service.", dg("The student support journey", D.flow(["Receive|request", "Identify|need", "Coordinate|response", "Resolve|request"]), "The university's redesigned support process coordinates departmental activities around the student's complete request.")],
 
        ["Later, imagine request resolution time increasing while the university continues producing accurate monthly service performance reports.", null],
        ["The reports circulate regularly, but nobody has accepted responsibility for discussing deterioration across all participating departments.", st("Accurate reporting cannot sustain performance when continuing end-to-end management responsibility remains unclear.")],
 
        ["University leaders consider introducing a more detailed dashboard because they believe additional information will improve managerial awareness.", null],
        ["However, the existing reports already reveal deterioration, making the absence of accountable review a more immediate concern.", dg("Two possible interventions", D.hier([["Expand reporting", ""], ["Restore process ownership", ""]]), "The university must decide whether additional reporting or restored ownership better addresses its documented management weakness.")],
 
        ["Another proposal involves retraining service employees, although the available evidence does not establish that inadequate knowledge caused delays.", null],
        ["Training might eventually help, but selecting it immediately would substitute an assumption for a demonstrated explanation.", q("Why would retraining be a weak immediate priority when the university has not established that employee knowledge caused deterioration?")],
 
        ["A stronger recommendation is to appoint a named process owner with authority to coordinate the complete student support journey.", null],
        ["That owner would establish regular reviews, investigate worsening results and assign corrective action to the appropriate operational functions.", dg("Restoring accountable management", D.org("process", {top: "Student support process owner", depts: ["Performance review", "Department coordination", "Corrective decisions", "Follow-up"]}), "A named owner coordinates the university's service performance review and evidence-based improvement decisions.")],
 
        ["The owner might discover that repeated handoffs are creating delays, although the illustration does not establish that explanation beforehand.", null],
        ["Further investigation would then determine whether changing handoff arrangements is justified and what consequences require management attention.", st("Restoring ownership enables investigation without predetermining the operational solution.")],
 
        ["After agreeing an improvement, the owner should examine subsequent resolution times to establish whether student service has actually recovered.", null],
        ["That follow-up matters because completing an action does not prove that the underlying performance problem has been solved.", dg("The continuing improvement cycle", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The university sustains improvement by reviewing evidence, coordinating action and checking the resulting performance.")],
 
        ["This university example is illustrative, but its decision logic closely resembles the documented management gap at Qasr.", null],
        ["Both organisations need someone accountable for converting existing performance information into coordinated decisions and verified improvement.", cmp("Two management responses", "Expand information", "Produces more reports without necessarily addressing the absence of accountable review.", "Restore accountability", "Creates responsibility for interpreting measures, coordinating decisions and checking corrective results.")],
 
        ["The central lesson is to prioritise the intervention most directly supported by the evidence rather than the most visible activity.", null],
        ["A defensible decision also acknowledges uncertainty and establishes how managers will learn whether their chosen response works.", q("What evidence would the university need before deciding that employee retraining should become its next intervention?")]
      ]
    },
    {
      title: "The food manufacturer that protected safety while improving flow",
      lines: [
        ["Now consider an illustrative food manufacturer whose packaging process has become slower after several additional quality controls were introduced.", t("A different angle on intervention choice", "A food manufacturer illustrates why removing visible delays is not always the most defensible immediate response.")],
 
        ["Imagine the manufacturer redesigning packaging to improve throughput while maintaining the safety and quality requirements of its products.", null],
        ["The improved process coordinates filling, sealing, inspection and dispatch so completed products move reliably through production.", dg("The packaging journey", D.flow(["Fill|products", "Seal|packages", "Inspect|quality", "Release|dispatch"]), "The manufacturer's packaging process coordinates production activities while preserving necessary quality assurance.")],
 
        ["Later, imagine several supervisors introducing additional checks after separate concerns arise about packaging accuracy and product traceability.", null],
        ["Each check addresses a legitimate local concern, but the combined process gradually becomes slower than its delivered performance.", dg("Accumulating controls", D.hier([["Accuracy checks", ""], ["Traceability checks", ""], ["Quality verification", ""]]), "Several locally justified checks can collectively increase processing time when their combined effects are not governed.")],
 
        ["Management considers removing the added checks immediately because their presence coincides with the observed deterioration in throughput.", null],
        ["However, removing them without examining safety obligations could create risks that outweigh the expected improvement in speed.", st("A visible delay does not justify removing a control before its continuing purpose and requirements have been evaluated.")],
 
        ["Another proposal involves asking packaging employees to work faster, although no evidence establishes that individual effort caused the deterioration.", null],
        ["That response would place pressure on employees without addressing how the additional controls interact across the complete process.", q("Why would demanding greater employee effort be weaker than examining the combined effect of the approved quality controls?")],
 
        ["Suppose the manufacturer also lacks a named process owner responsible for balancing throughput with quality requirements across departments.", null],
        ["Restoring ownership would create a coordinating role capable of evaluating changes without ignoring legitimate professional responsibilities.", dg("A coordinating process owner", D.org("process", {top: "Packaging process owner", depts: ["Production", "Quality assurance", "Risk review", "Performance management"]}), "A dedicated owner coordinates production performance with quality assurance and appropriate risk review.")],
 
        ["The owner could examine whether checks remain necessary and whether their implementation creates avoidable waiting or duplicated effort.", null],
        ["Quality specialists would participate because technical requirements must remain protected while managers consider more efficient operating arrangements.", dg("An evidence-based control review", D.flow(["Identify|controls", "Assess|current risks", "Evaluate|alternatives", "Agree|response", "Verify|results"]), "The manufacturer evaluates the necessity and consequences of controls before approving any operational change.")],
 
        ["This approach does not guarantee that every delay can be removed, because some activities may remain necessary for product safety.", null],
        ["Instead, it establishes a defensible process for balancing operational performance with requirements that the organisation must respect.", st("A sound intervention protects necessary controls while testing whether their implementation can become more efficient.")],
 
        ["After implementing any approved adjustment, the owner should review both throughput and relevant quality outcomes for unintended consequences.", null],
        ["That follow-up prevents a narrow improvement in speed from concealing deterioration in another important dimension of performance.", dg("Sustaining balanced performance", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The manufacturer sustains improvement by reviewing both process efficiency and the continuing effectiveness of necessary controls.")],
 
        ["Remember that this manufacturer is illustrative and does not establish additional facts about Qasr's passport re-verification requirement.", null],
        ["At Qasr, that requirement followed a regulatory inspection, making automatic removal inappropriate without examining the applicable obligation.", cmp("Illustration and Qasr", "Manufacturer illustration", "Hypothetical quality controls require examination before changes are approved.", "Qasr case", "Passport re-verification followed a regulatory inspection and requires appropriate compliance consideration.")],
 
        ["Both situations show why sustainable governance should restore coordinated decision-making rather than promise immediate gains through indiscriminate removal.", null],
        ["A defensible intervention addresses documented weaknesses while creating a reliable way to investigate and manage remaining uncertainty.", q("Why would restoring accountable governance provide a stronger foundation than immediately removing every additional packaging control?")]
      ]
    }
  ]
},
{
  title: "From one successful project to a self-improving organisation",
  sec: "W14O1d",
  lines: [
    ["We have followed Qasr Hospitality Group from a successful arrival redesign to the difficult challenge of sustaining its benefits.", t("From one successful project to a self-improving organisation", "The final ambition of Sustainable Performance is an organisation capable of managing and improving its own processes.")],
    ["Now let's step back and consider what the organisation must learn from that experience beyond correcting arrival time.", null],
    ["The deeper objective is developing the ability to maintain and improve processes without repeatedly launching separate transformation programmes.", q("What would convince you that an organisation can improve its processes without depending on another temporary project?")],
 
    ["Remember that Qasr originally reduced lobby-to-room arrival time from eighty-two minutes to twenty-four minutes after full rollout.", null],
    ["By month twenty-two, arrival time had increased to thirty-nine minutes, showing that realised benefits can gradually deteriorate.", dg("Qasr's improvement and deterioration", D.bars([["Baseline", 82], ["Month 5", 24], ["Month 22", 39]]), "Qasr achieved a substantial arrival-time improvement before performance deteriorated during subsequent operations.")],
 
    ["The evidence also revealed weakened ownership, neglected management review and approved changes whose combined effects increased arrival time.", null],
    ["These findings suggest that delivering an improved process and developing lasting management capability are different organisational achievements.", cmp("Two different achievements", "Successful BPM project", "Delivers a redesigned process and demonstrates the intended improvement.", "Sustainable BPM capability", "Maintains ownership, reviews performance and coordinates further improvement during normal operations.")],
 
    ["A self-improving organisation treats process performance as an ordinary management responsibility rather than a temporary project concern.", null],
    ["Its managers know which outcomes matter, who owns them and how deteriorating results should trigger investigation.", dg("Management responsibility continues", D.org("process", {top: "Process owner", depts: ["Operational functions", "Performance review", "Change governance", "Improvement decisions"]}), "A self-improving organisation assigns continuing process ownership and coordinates operational decisions around end-to-end performance.")],
 
    ["This capability depends on preserving process knowledge, because employees and managers will inevitably change roles over time.", null],
    ["Documented procedures, agreed measures and clear decision rights help new owners maintain continuity when experienced colleagues leave.", st("Sustainable BPM capability survives changes in personnel because knowledge and responsibilities are embedded in organisational arrangements.")],
 
    ["The organisation also needs people who can analyse processes and improve them without depending entirely on external specialists.", null],
    ["A BPM centre of excellence can support this capability by maintaining methods, expertise and shared improvement knowledge.", dg("Developing internal BPM capability", D.hier([["Process ownership", ""], ["Shared methods", ""], ["Improvement expertise", ""], ["Performance governance", ""]]), "Internal BPM capability combines accountable ownership, shared methods, improvement expertise and continuing performance governance.")],
 
    ["A centre of excellence is a supporting organisational capability, not necessarily another department that approves every operational adjustment.", null],
    ["Its value comes from helping managers apply consistent methods while preserving appropriate responsibility within their own processes.", st("A BPM centre of excellence should strengthen internal improvement capability without replacing operational process ownership.")],
 
    ["Over time, these arrangements contribute to process maturity, meaning how systematically an organisation manages and improves its processes.", null],
    ["Maturity is demonstrated through dependable practices, not simply through the number of projects completed or diagrams produced.", dg("Growing process maturity", D.stairs(-1, {labels: ["Project dependence", "Defined ownership", "Active governance", "Continuous improvement"]}), "Process maturity grows as organisations move from temporary project dependence towards systematic ownership and continuous improvement.")],
 
    ["Consider whether Qasr could diagnose another process problem without immediately commissioning a new programme to rediscover familiar lessons.", null],
    ["If its managers can measure, investigate and coordinate improvement themselves, the organisation has developed a more durable capability.", q("Why is the ability to improve another process a stronger test of maturity than celebrating one successful redesign?")],
 
    ["Sustainable Performance also keeps the ten-phase BPM framework connected, rather than treating its final phase as a permanent endpoint.", null],
    ["Operational evidence may reveal a need to reconsider strategy, architecture, process scope or earlier design decisions.", dg("Sustainability reconnects the framework", D.flow(["Operational|evidence", "Identify|new needs", "Revisit|earlier phases", "Improve|process", "Sustain|results"]), "Sustainable Performance uses operational evidence to revisit earlier BPM phases when further improvement becomes necessary.")],
 
    ["That flexibility matters because organisational conditions change, and yesterday's effective design may not remain appropriate indefinitely.", null],
    ["The organisation must therefore preserve necessary controls while remaining willing to reconsider how its processes achieve intended outcomes.", st("Sustainability means maintaining the ability to improve, not freezing the process exactly as it was originally implemented.")],
 
    ["For Qasr, our proposed priority was restoring dedicated ownership with authority to coordinate performance review and improvement decisions.", null],
    ["That recommendation remains a proposal, because the case does not establish that Qasr has implemented it or recovered performance.", dg("The proposed Qasr response", D.flow(["Restore|ownership", "Review|evidence", "Govern|changes", "Verify|results"]), "A proposed sustaining response would restore ownership, activate review, govern changes and verify subsequent performance.")],
 
    ["The owner would need to investigate declining kiosk adoption and the cumulative effects of approved arrival-process changes.", null],
    ["Subsequent measures would establish whether agreed interventions actually improved performance, rather than relying on confident management announcements.", dg("The continuing management loop", D.cycle("loop", {mid: "Measure|Review|Improve|Embed"}), "The owner sustains performance by repeatedly measuring outcomes, reviewing evidence, improving weaknesses and embedding effective changes.")],
 
    ["As Week 14 concludes, remember that the self-paced forum asks you to diagnose deterioration in a different organisation.", null],
    ["Your contribution should defend a sustaining mechanism, explain its cost and engage substantively with contrasting peer arguments.", t("Week 14 · Self-paced application", "Apply the Sustainable Performance principles to the separate forum case, Nobody Did Anything Wrong.")],
 
    ["The lasting lesson is that successful BPM creates more than an improved process; it develops the organisation's capacity to keep improving.", null],
    ["That is how Sustainable Performance turns a temporary achievement into an enduring responsibility shared across everyday organisational management.", t("The Sustainable Performance Phase", "The programme ends, but accountable process management and continuous improvement must continue.")]
  ],
  review: [
    {
      title: "The public library that learned to improve without another programme",
      lines: [
        ["Let's explore organisational BPM capability through an illustrative public library that has improved its reservation and collection service.", t("Another way to understand a self-improving organisation", "A library illustrates how improvement becomes a continuing internal capability rather than a succession of temporary projects.")],
 
        ["Imagine the library previously completing a successful project that reduced delays between reserving a book and collecting it.", null],
        ["The redesigned process coordinates reservation requests, book preparation and collection notifications across the relevant library employees.", dg("The redesigned library service", D.flow(["Receive|reservation", "Locate|book", "Prepare|collection", "Notify|reader"]), "The library's redesigned process coordinates reservation activities to provide a more reliable collection service.")],
 
        ["The project finishes successfully, but the library continues facing new operational challenges as reader needs and working arrangements change.", null],
        ["Its managers must decide whether every difficulty requires another specialist improvement programme or can be addressed through normal management.", q("What would allow library managers to improve the service without repeatedly depending on temporary project teams?")],
 
        ["A named process owner could maintain responsibility for the complete reservation journey and review meaningful service performance measures.", null],
        ["When delays emerge, that owner would coordinate investigation across the activities affecting the reader's experience.", dg("Continuing service ownership", D.org("process", {top: "Reservation process owner", depts: ["Library operations", "Performance review", "Improvement decisions"]}), "A continuing owner coordinates library operations and performance decisions across the complete reservation process.")],
 
        ["The library could also preserve process knowledge through documented procedures and practical training for employees joining the service.", null],
        ["That knowledge would help prevent informal working habits from gradually replacing the improvements established by the original redesign.", st("Preserving process knowledge allows improved practices to survive employee turnover and changes in operational responsibilities.")],
 
        ["Imagine the library developing a small internal group that helps departments analyse problems and apply consistent improvement methods.", null],
        ["This group illustrates a centre of excellence, which supports process expertise without taking ownership away from operational managers.", dg("Supporting internal improvement capability", D.hier([["Process owners", ""], ["Shared methods", ""], ["Staff knowledge", ""], ["Improvement support", ""]]), "Internal improvement capability combines operational ownership with shared methods, preserved knowledge and specialist support.")],
 
        ["Suppose another library service later develops delays, requiring managers to examine how requests move between different employees.", null],
        ["The organisation can apply its established methods rather than commissioning another programme to rediscover basic process-management practices.", dg("Applying capability to another process", D.flow(["Identify|problem", "Measure|performance", "Analyse|causes", "Improve|process", "Sustain|results"]), "The library applies its internal BPM capability to diagnose and improve another service.")],
 
        ["That ability demonstrates process maturity because improvement has become a repeatable organisational practice rather than an exceptional event.", null],
        ["Managers still need evidence and appropriate governance, but they no longer depend entirely on the original project team.", cmp("Two organisational capabilities", "Project dependence", "Improvement requires another temporary programme whenever an operational problem emerges.", "Internal BPM maturity", "Managers use established ownership, measures and methods to improve processes continuously.")],
 
        ["This library example is illustrative, but it helps explain the broader ambition of Qasr's Sustainable Performance phase.", null],
        ["Qasr needs more than restored arrival performance; it needs management arrangements capable of protecting future improvements.", st("Sustainable BPM creates an enduring ability to maintain and improve processes after individual programmes have ended.")],
 
        ["The important question is whether the organisation can recognise deterioration, coordinate decisions and embed effective changes through normal operations.", null],
        ["When those responsibilities become dependable, improvement is no longer something that happens only during a special project.", q("Why would improving a second library service without launching another transformation programme demonstrate stronger BPM maturity?")]
      ]
    },
    {
      title: "The manufacturer that turned operational learning into lasting capability",
      lines: [
        ["Now consider an illustrative manufacturer that has improved its production process but wants to make continuous improvement part of everyday management.", t("A different angle on organisational maturity", "A manufacturer illustrates how operational evidence, internal expertise and accountable governance support continuing improvement.")],
 
        ["Imagine the manufacturer completing a successful redesign that reduces unnecessary waiting between assembly, inspection and product packaging.", null],
        ["The programme achieves its intended improvement, and the specialist team prepares to transfer responsibility into normal production management.", dg("The improved production journey", D.flow(["Assemble|product", "Inspect|quality", "Package|product", "Release|output"]), "The manufacturer's redesigned process coordinates production activities to reduce unnecessary waiting while preserving quality.")],
 
        ["A weak organisation might celebrate completion and assume that the redesigned process will continue performing without dedicated attention.", null],
        ["A more mature organisation establishes continuing ownership because operating conditions and production requirements will change over time.", st("Process maturity requires continuing responsibility for performance rather than assuming a completed redesign will remain effective indefinitely.")],
 
        ["Imagine the manufacturer appointing a process owner who regularly examines total production time alongside relevant quality and adoption information.", null],
        ["The owner coordinates decisions across departments because local improvements can create unintended consequences elsewhere in the production journey.", dg("Continuing production governance", D.org("process", {top: "Production process owner", depts: ["Assembly", "Quality assurance", "Packaging", "Performance review"]}), "A continuing owner coordinates production functions and reviews the performance of the complete process.")],
 
        ["Suppose the company later introduces a new product that requires different handling during inspection and packaging.", null],
        ["The existing process may need adaptation, even though its original design was appropriate when the improvement programme finished.", q("Why should the manufacturer reconsider its process design when product requirements change rather than insist on preserving every original step?")],
 
        ["The owner can use operational evidence to determine whether the new requirements affect the process boundary or its established performance.", null],
        ["Where necessary, the organisation can deliberately revisit earlier BPM phases instead of treating Sustainable Performance as a final destination.", dg("Reconnecting to earlier BPM phases", D.flow(["Operational|change", "Review|process fit", "Revisit|earlier phase", "Adapt|design", "Sustain|performance"]), "Operational evidence can justify returning to earlier BPM phases when changed conditions require renewed analysis or design.")],
 
        ["Imagine the manufacturer also maintaining internal specialists who support process analysis, performance measurement and improvement methods.", null],
        ["A centre of excellence could preserve that expertise while operational owners remain accountable for decisions within their processes.", dg("Internal BPM expertise", D.hier([["Process ownership", ""], ["Performance methods", ""], ["Improvement expertise", ""], ["Knowledge preservation", ""]]), "Internal BPM capability combines continuing ownership with shared methods, specialist expertise and preserved organisational knowledge.")],
 
        ["The manufacturer could then apply those methods when another production process begins experiencing delays or inconsistent operating practices.", null],
        ["That repeatability matters because improvement becomes an organisational capability rather than a service purchased whenever difficulties arise.", st("A self-improving organisation can apply established BPM capabilities to new problems without rebuilding its management approach each time.")],
 
        ["Process maturity therefore concerns the reliability of management practices, not simply the number of successful projects the organisation reports.", null],
        ["Managers should be able to explain ownership, measurement, governance and how operational learning leads to verified improvement.", cmp("Project success and organisational maturity", "Project success", "One redesigned process delivers a demonstrated improvement.", "Organisational maturity", "Established management capabilities sustain improvements and support further process changes.")],
 
        ["This manufacturing example is illustrative and does not establish that Qasr has already developed comparable internal BPM capabilities.", null],
        ["Qasr's documented deterioration instead shows why continuing ownership and active performance governance remain important after implementation.", st("The ability to sustain and improve performance must be demonstrated through continuing management practices, not assumed from past success.")],
 
        ["The final lesson is that Sustainable Performance preserves improvement while allowing organisations to learn from changing operational conditions.", null],
        ["When managers can repeat that learning across processes, BPM becomes part of how the organisation normally works.", q("What evidence would show that the manufacturer has become genuinely self-improving rather than simply completing another successful project?")]
      ]
    }
  ]
},
      ] },
    ]
  };
  // Claude review fixes (original line indices): sentence replacements, then removals in descending order.
  const FIX = [["W14O2a",-1,16,"Qasr approved passport re-verification, a lower rate waiver threshold, a loyalty enrolment prompt and a reinstated desk position at two heritage properties."],["W14O3c",-1,12,"Those obligations include writing the process into the recipient\u0027s own objectives and keeping its measures produced, discussed and acted upon."],["W14O3a",-1,25,"Staff performing the process also need a route to report when it no longer works, because they often see problems before any measure does."]];
  const CUT = [["W14O1d",1,15],["W14O1d",1,9],["W14O3d",1,19]];
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
