// OPER621 Business Process Management - Week 10
// Topic: The People Phase - Framework Phase 6.
// Sources: OPER621_Week10_Delivery_Plan.docx,
// OPER621_Week10_Session1_Slides.pptx, Jeston Chapter 18,
// and the Week 8 VoiceLearn structural reference.
// Author: Prof. Bassem Jarboui
//
// RUNNING CASE
// Qasr Hospitality Group - The Guest Host.
// Four pilot properties introduce a redesigned guest arrival process.
// Twenty-two former Front Desk Agents become Guest Hosts.
// The new role combines guest assistance with kiosk exception resolution.
// The case examines roles, authority, accountability, measures,
// incentives, capability, adoption and organisational change.
//
// OFFICIAL COURSE LEARNING OUTCOMES
// K3 - Assess the importance of change management in relation to BPM
//      and devise solutions to minimize employees' resistance.
// S3 - Coordinate people and the change process in organizations
//      to achieve BPM objectives.
//
// WEEKLY LEARNING OUTCOMES
// O1 - Assess the contribution of the People phase to delivering
//      process change.
// O2 - Design roles, measures and incentives aligned to the new process.
// O3 - Coordinate people through the change process to achieve
//      BPM objectives.
//
// PRIMARY CLO MAPPINGS
// O1: K3
// O2: S3
// O3: S3
//
// SUPPORTING CLO MAPPINGS
// O1: S3
// O2: K3
// O3: K3
//
// Each outcome retains one primary CLO in the adaptive runtime schema.
// O3 integrates K3 and S3, with S3 as its primary runtime mapping.
//
// LESSON AND SECTION PLAN
//
// l1 - The design is not the work
//   W10O1a - A process redesign changes people's jobs
//   W10O1b - What the People phase must deliver
//   W10O1c - Who does the work, and who answers for it?
//
// l2 - The Guest Host's impossible job
//   W10O2a - Authority without ambiguity
//   W10O2b - When the old measure defeats the new design
//   W10O2c - Designing a role people can actually perform
//
// l3 - Capability is more than attendance
//   W10O3a - Training for judgement, not just buttons
//   W10O3b - One organisation, two processes
//   W10O3c - The knowledge the redesign might lose
//
// l4 - Making the people design real
//   W10O2d - Repairing the Guest Host specification
//   W10O3d - The eleven-week decision
//   W10O3e - The handover and the next phase
//
// RUNTIME SECTION KEYS
// W10O1a, W10O1b, W10O1c,
// W10O2a, W10O2b, W10O2c,
// W10O3a, W10O3b, W10O3c,
// W10O2d, W10O3d, W10O3e.
//
// CONTENT STRUCTURE
// Four lessons with three parts each: twelve narrated sections.
// Each section contains 430-570 spoken narration words.
// Each section includes two remedial micro-lessons of 230-360 words.
// Every spoken sentence contains 6-30 words.
// Target average sentence length is 15-18 words.
// Narration is warm, connected, conversational and story-led.
// Avoid mechanical enumeration, arrows and spoken bullet lists.
// Avoid the banned patterns first, second, and third followed by commas.
// Every narration line uses the structure [sentence, moment].
// Null moments retain the previous visual.
// Introduce a meaningful visual moment every 1-3 sentences.
// Use only existing MOMENT_KIT helpers and DIAG diagram types.
//
// QUESTION BANK
// The question bank is maintained separately in bank.js.
// Each section has twelve questions across six supported types.
// Three questions support the initial section check.
// Three fresh questions support each of three remediation rounds.
// Each question has one unambiguous correct answer.
// Question ids use the format W10O1a-01 through W10O3e-12.
//
// ADAPTIVE LEARNING
// Mastery target: 0.8.
// Evidence window: 5.
// Minimum evidence: 3.
// Initial check: 4.
// Initial questions per section: 3.
// Questions per weak section: 3.
// Remediation round 1 uses review variant 0.
// Remediation round 2 uses review variant 1.
// Subsequent remediation rounds alternate between variants.
//
// WEEK 10 SOURCE ACCURACY
// Qasr's observed kiosk adoption is 65% at week eleven.
// Desk-handled arrivals account for 29%.
// Not every desk-handled arrival is necessarily a workaround.
// Nine of twenty-two Guest Hosts refer every rate discrepancy upward.
// The AED 400 waiver is absent from formal delegation.
// Updated job descriptions were issued three weeks after go-live.
// Existing performance objectives still reward check-in volume and speed.
// Two Guest Hosts resigned; their individual motives are unknown.
// One pilot property reinstated a permanent desk.
// All twenty-two Guest Hosts attended a four-hour induction.
// No post-induction capability assessment was conducted.
// The green people-workstream status reflects induction attendance.
// The sixteen-week adoption chart is illustrative, not Qasr history.
// Distinguish observed evidence from proposed corrective actions.
// Do not invent facts from the separate Week 10 forum case.
//
// FRAMEWORK CONTINUITY
// People is framework phase 6.
// Develop is framework phase 7.
// Implement is framework phase 8.
// Realize Value is framework phase 9.
// Sustainable Performance is framework phase 10.
// People and Develop must remain coordinated.
// Project management, people change management and leadership
// operate continuously across the BPM framework.
//
// END OF WEEK 10 HEADER
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
    id: "oper621-w10",
    code: "OPER621",
    title: "Week 10 — The People Phase: Roles, Measures and Capability",
    subtitle: "Business Process Management \u00b7 Week 10",
    author: "Prof. Bassem Jarboui",
    teacher: { name: "Prof. Bassem Jarboui", email: "", sendReport: false },
    lessons: [
      { id: "l1", title: "The design is not the work", sections: [
{
  title: "A process redesign changes people's jobs",
  sec: "W10O1a",
  lines: [
    ["Welcome to Week 10, where we'll explore why changing a process also means changing people's everyday work.", t("OPER621 · Week 10", "The People Phase: making a redesigned process work through people.")],
    ["Let's return to Qasr Hospitality Group, where our improvement journey has reached another important turning point.", null],
    ["You may remember the exhausted business traveller whose difficult arrival exposed weaknesses across Qasr's hotel operations.", dg("The experience that started our journey", D.flow(["Guest|arrives", "Booking|checked", "Rate|confirmed", "!Room not|ready"]), "The original guest's difficult arrival revealed problems that crossed departmental boundaries.")],
    ["That experience encouraged Qasr to investigate its guest arrival process and consider how the service could improve.", null],
    ["The programme has since examined current performance and developed ideas for a better way of serving guests.", null],
    ["But imagine the redesigned process looking excellent on paper while employees continue following their familiar routines.", iss("A redesigned process exists, but employees continue performing the work according to their previous roles.", "The design is not the work")],
    ["The organisation might have improved its process diagram without improving what guests actually experience during arrival.", null],
    ["This happens because processes are performed by people whose responsibilities, decisions and working relationships shape daily operations.", st("A process redesign succeeds only when people can perform the new work as intended.")],
    ["Now Qasr is introducing a different approach to guest arrival, supported by self-service kiosks and redesigned responsibilities.", null],
    ["At four pilot properties, the traditional Front Desk Agent role has been replaced by a Guest Host.", dg("The redesigned arrival experience", D.flow(["Guest|arrives", "Self-service|kiosk", "!Exception|identified", "Guest Host|assists", "Arrival|continues"]), "The redesigned process combines self-service technology with human assistance when guests need additional support.")],
    ["Twenty-two existing agents have moved into this new role, which changes what the organisation expects from them.", null],
    ["Instead of concentrating on conventional desk transactions, Guest Hosts greet arrivals and resolve exceptions requiring human judgement.", cmp("The work has changed", "Front Desk Agent", "The previous role centred on conventional front-desk transactions.", "Guest Host", "The redesigned role supports arrivals and resolves exceptions that kiosks cannot handle.")],
    ["They can also waive certain rate discrepancies up to AED 400 without referring the decision upward.", null],
    ["That responsibility matters because resolving an exception immediately may prevent another frustrating delay in the guest's journey.", st("The new role requires employees to exercise judgement and resolve eligible exceptions without unnecessary referral.")],
    ["But changing someone's job title doesn't automatically give that person the authority or confidence to make decisions.", null],
    ["Imagine a Guest Host facing a disputed corporate rate while worrying whether management will support the decision.", q("Would a new job title alone give this employee the confidence and authority to resolve the discrepancy?")],
    ["The employee might refer the guest to a manager, even though the redesigned process intended to avoid that delay.", null],
    ["The problem would not necessarily be unwillingness to change, because the organisation may have left important arrangements unresolved.", iss("The process expects independent decisions, but the employee may lack clear organisational support for making them.", "A people-design problem")],
    ["This brings us to the People phase, which occupies position six in the ten-phase BPM implementation framework.", null],
    ["It follows Innovate, where the organisation develops alternatives for how its processes should operate in the future.", dg("Phase six: People", D.route([5]), "People follows Innovate and prepares the organisational arrangements required to perform the redesigned process.")],
    ["The framework continues through Develop, Implement, Realize Value and Sustainable Performance as the improvement programme progresses.", null],
    ["However, these phases should not be treated as isolated boxes that prevent related work from happening together.", st("The BPM framework guides coordinated improvement rather than requiring every activity to occur in a rigid sequence.")],
    ["In particular, People must work alongside Develop because employee responsibilities and supporting technology influence each other's design.", null],
    ["A kiosk cannot replace a transaction successfully unless someone understands what happens when that transaction encounters an exception.", dg("People and technology must fit together", D.flow(["Redesigned|process", "People|requirements", "Technology|requirements", "Coordinated|operation"]), "People and technology requirements must be developed together so the redesigned process can operate reliably.")],
    ["Likewise, assigning employees new responsibilities without suitable system support may simply create additional work and frustration.", null],
    ["Project management, people change management and leadership therefore remain important throughout the entire BPM improvement journey.", st("Project management, people change management and leadership support every framework phase, not only the People phase.")],
    ["The People phase concentrates on making the organisation ready to perform work that its previous arrangements never anticipated.", null],
    ["It asks whether employees understand their responsibilities, possess appropriate authority and can develop the capabilities they need.", null],
    ["It also examines whether performance measures and rewards encourage the behaviour that the redesigned process actually requires.", dg("Making the redesign performable", D.flow(["New|responsibilities", "Clear|authority", "Required|capability", "Aligned|measures", "Actual|performance"]), "The redesigned process depends on responsibilities, authority, capability and measures that support the intended work.")],
    ["These questions matter because employees naturally respond to the expectations and constraints they encounter during everyday operations.", null],
    ["When those arrangements contradict the redesign, familiar practices can return despite everyone's stated commitment to improvement.", iss("Old organisational arrangements can recreate old process behaviour even after the process model has changed.", "The redesign can unravel")],
    ["Our challenge this week is therefore understanding how Qasr can turn its redesigned arrival process into dependable practice.", null],
    ["We'll examine the Guest Host's responsibilities, decision authority, performance measures and readiness to handle unfamiliar situations.", null],
    ["Remember that successful redesign requires more than telling employees that their jobs have changed.", q("What must Qasr change around the Guest Host so the redesigned guest experience becomes everyday reality?")]
  ],
  review: [
    {
      title: "The hospital discharge that changed everyone's job",
      lines: [
        ["Let's explore the People phase through a hospital that wants patients to leave promptly after treatment finishes.", t("Another way to understand the People phase", "A hospital discharge redesign shows why changing a workflow also changes people's responsibilities.")],
        ["Patients currently wait for several departments to complete separate activities before they can finally go home.", null],
        ["The hospital redesigns discharge around one coordinated journey, supported by a shared digital information system.", dg("The redesigned discharge journey", D.flow(["Discharge|approved", "Requirements|coordinated", "Patient|prepared", "Departure|completed"]), "The redesigned process coordinates activities around the patient's complete departure rather than separate departmental tasks.")],
        ["Managers expect the new arrangement to reduce waiting because staff can now see which activities remain unfinished.", null],
        ["However, the process diagram doesn't establish who should act when several departments disagree about discharge readiness.", q("Who should resolve a disagreement when the redesigned process requires coordination across different professional responsibilities?")],
        ["Imagine a discharge coordinator receiving responsibility for resolving delays that previously required several separate telephone calls.", null],
        ["The coordinator understands the new system but cannot authorise changes to another department's established working arrangements.", iss("The coordinator is expected to resolve cross-department delays without having clear authority to coordinate the required decisions.", "Responsibility without sufficient authority")],
        ["As a result, difficult cases still move between managers while patients continue waiting for their departure.", null],
        ["The digital system may function correctly, yet the organisation hasn't created the conditions for using it effectively.", st("A functioning information system cannot compensate for unclear responsibilities and decision authority.")],
        ["This is why the People phase examines jobs and working relationships alongside the redesigned process itself.", null],
        ["The hospital must clarify what the coordinator owns and which decisions remain with clinical professionals.", cmp("Two connected responsibilities", "Discharge coordinator", "Coordinates the overall departure process and addresses operational dependencies.", "Clinical professionals", "Retain responsibility for clinical decisions within their professional authority.")],
        ["Clear boundaries matter because coordination should improve service without removing essential clinical safeguards or professional accountability.", null],
        ["The coordinator also needs practical training in handling exceptions rather than merely learning which system buttons to select.", null],
        ["Realistic cases can reveal whether the employee knows when to act independently and when escalation remains necessary.", dg("Preparing the coordinator", D.flow(["Define|responsibility", "Clarify|authority", "Practise|exceptions", "Assess|capability", "Support|performance"]), "The hospital must prepare employees to make appropriate decisions within clearly defined responsibilities.")],
        ["Performance measures should reflect the coordinator's actual contribution rather than reward only the number of records processed.", null],
        ["Otherwise, employees may concentrate on easy administrative transactions while complicated discharge problems remain unresolved.", iss("A transaction-volume measure may reward quick administrative work rather than successful coordination of difficult departures.", "The wrong behaviour rewarded")],
        ["Notice how the hospital's difficulty resembles Qasr's challenge when Front Desk Agents become Guest Hosts.", null],
        ["Both organisations have changed the intended process, but employees need suitable arrangements to perform their redesigned work.", st("The People phase aligns employee responsibilities, authority, capability and measures with the process the organisation intends to operate.")],
        ["Remember that the process diagram describes the desired journey, while organisational arrangements determine whether people can deliver it.", null],
        ["The hospital succeeds only when its employees can coordinate the new process without compromising necessary professional controls.", q("Could you explain why a redesigned workflow needs redesigned jobs even when its technology works correctly?")]
      ]
    },
    {
      title: "The online retailer that automated the easy work",
      lines: [
        ["Now imagine an online retailer introducing automation to make customer returns faster and easier to manage.", t("Another way to understand redesigned work", "An automated returns service reveals how technology changes the responsibilities of employees.")],
        ["Previously, customer service employees checked return requests, confirmed eligibility and arranged refunds through a familiar manual procedure.", null],
        ["The redesigned process allows software to approve straightforward returns automatically when they satisfy established conditions.", dg("The redesigned returns process", D.flow(["Return|requested", "Automatic|eligibility check", "Routine|approval", "!Complex|exception", "Specialist|resolution"]), "Automation handles routine returns while employees remain responsible for exceptions requiring additional judgement.")],
        ["Managers expect employees to spend less time on repetitive checking and more time resolving complicated customer problems.", null],
        ["That expectation sounds sensible, but it changes the knowledge and decisions required from the remaining service employees.", st("Automation changes employee work when routine activities move into software and complex exceptions remain with people.")],
        ["Imagine an employee receiving a disputed return involving a damaged product and conflicting information about delivery.", null],
        ["The software cannot decide whether the circumstances justify an exception to the retailer's ordinary refund conditions.", q("What support would help this employee make a fair decision without sending every difficult case to management?")],
        ["The employee needs clear authority, practical guidance and confidence about when an exception should be escalated.", null],
        ["Without those arrangements, the supposedly faster process may recreate the same approval delays through repeated managerial referrals.", iss("Automation removes routine checking, but unclear employee authority causes difficult returns to wait for managerial decisions.", "The old delay returns")],
        ["Now imagine that the retailer continues measuring employees by the number of returns processed during each shift.", null],
        ["Automated cases no longer require employee attention, leaving staff with a greater concentration of difficult requests.", cmp("The measurement problem", "Old measure", "Rewards the number of transactions completed during a shift.", "New work", "Requires careful resolution of complicated returns that automation cannot approve.")],
        ["Employees may appear less productive even when they provide more valuable assistance to customers with complex problems.", null],
        ["That contradiction matters because performance measures influence which activities employees prioritise during busy working periods.", st("Measures inherited from the old process can discourage employees from performing the redesigned work as intended.")],
        ["The retailer should therefore examine whether its measures recognise successful exception resolution and appropriate decision quality.", null],
        ["Employees also need realistic practice with unusual cases because operating software differs from exercising sound customer-service judgement.", dg("Aligning people with automation", D.flow(["Redesigned|returns", "Defined|decisions", "Practical|training", "Relevant|measures", "Reliable|service"]), "The redesigned returns process requires aligned decision rights, capability and performance expectations.")],
        ["The organisation must also clarify how employees obtain assistance when a difficult case exceeds their delegated authority.", null],
        ["These arrangements allow automation and human judgement to complement each other instead of creating competing operating methods.", null],
        ["This is the same principle behind Qasr's decision to introduce Guest Hosts alongside its self-service kiosks.", st("Technology and employee roles must be designed together because each determines how the other performs.")],
        ["A new system changes which tasks remain for people, so their responsibilities cannot simply remain unchanged.", null],
        ["Remember that installing automation is not equivalent to preparing employees for the work that automation leaves behind.", q("How would you redesign employee responsibilities when software handles routine cases but people must resolve the exceptions?")]
      ]
    }
  ]
},
{
  title: "What the People phase must deliver",
  sec: "W10O1b",
  lines: [
    ["We have seen why Qasr's redesigned arrival process cannot succeed through technology and process diagrams alone.", t("Week 10 · The People Phase", "What must the organisation deliver so employees can perform the redesigned process?")],
    ["Now imagine the programme sponsor asking a practical question about whether the organisation is genuinely ready.", null],
    ["The sponsor wants evidence that Guest Hosts can perform their new responsibilities without recreating familiar front-desk delays.", q("What evidence would convince you that Qasr is ready to operate its redesigned arrival process?")],
    ["A new job title would not be convincing because naming a role does not establish how it works.", null],
    ["The People phase must produce concrete organisational arrangements that make the redesigned process possible in everyday operations.", st("The People phase turns redesigned responsibilities into roles, authority, measures, capability and adoption arrangements.")],
    ["Consider the twenty-two employees who have moved from Front Desk Agent positions into Qasr's new Guest Host role.", null],
    ["Their responsibilities now include greeting arrivals and resolving exceptions that the self-service kiosks cannot handle.", dg("The Guest Host's redesigned work", D.flow(["Guest|arrives", "Kiosk|processes", "!Exception|identified", "Guest Host|resolves", "Arrival|continues"]), "The Guest Host supports the redesigned arrival process by resolving exceptions requiring human assistance.")],
    ["The organisation therefore needs a role definition describing the work, its boundaries and its expected contribution.", null],
    ["An updated job description should translate that definition into responsibilities employees and managers can understand consistently.", cmp("A title is not a role specification", "Guest Host title", "Names the position without defining its operating arrangements.", "Complete role definition", "Explains responsibilities, boundaries, authority and expected outcomes.")],
    ["This matters because an unclear role encourages employees to rely on the responsibilities they understood previously.", null],
    ["Qasr must also examine whether the changed responsibilities justify reviewing the existing job grade and reward arrangements.", st("Material changes in work require the organisation to review job descriptions, grades and rewards where appropriate.")],
    ["A redesigned job may demand more judgement or accountability even when its title sounds less administrative.", null],
    ["Leaving reward arrangements untouched without reviewing them risks sending employees conflicting messages about their new contribution.", null],
    ["But defining responsibilities is not enough when employees must make decisions that previously belonged to managers.", dg("Responsibility needs decision authority", D.flow(["New|responsibility", "Required|decision", "Documented|authority", "Defined|escalation"]), "Employees need clear authority for decisions within their role and an escalation route beyond that authority.")],
    ["At Qasr, Guest Hosts may waive certain rate discrepancies up to AED 400 without seeking approval.", null],
    ["That authority should appear in the formal delegation arrangements rather than depend entirely on an informal briefing.", iss("A decision may be expected in the redesigned process while remaining unclear in the organisation's formal authority arrangements.", "Undocumented delegation")],
    ["Formal delegation matters because employees need to know which decisions they may make and when escalation remains necessary.", null],
    ["The People phase must therefore deliver documented decision rights that support the judgement required by the redesign.", st("Documented delegated authority connects employee responsibility with permission to make the necessary decisions.")],
    ["Now consider how Qasr will judge whether Guest Hosts are performing their new work successfully.", null],
    ["The previous Front Desk Agent objectives emphasised check-ins completed per shift and average transaction time.", cmp("Measures must follow the redesigned work", "Previous objectives", "Check-ins completed per shift and average transaction time.", "New role requirements", "Support arrivals and resolve exceptions requiring human judgement.")],
    ["Those measures may no longer represent the contribution expected from employees supporting kiosk-based arrivals and difficult exceptions.", null],
    ["If old objectives remain influential, employees may favour familiar transactions rather than the redesigned process's intended outcomes.", iss("An inherited performance measure can reward behaviour that the redesigned process was intended to replace.", "Conflicting incentives")],
    ["The People phase must deliver revised performance measures and consider whether reward arrangements reinforce the intended behaviour.", null],
    ["Measures should reflect outcomes employees can influence while protecting the quality of their decisions and service.", st("Performance measures and incentives should reinforce the work the redesigned process actually requires.")],
    ["There is another difficulty because employees cannot automatically perform unfamiliar work simply because management expects them to.", null],
    ["Guest Hosts need practical capability to interpret exceptions, exercise judgement and recognise situations requiring managerial support.", dg("Capability must be demonstrated", D.flow(["Identify|skill gaps", "Practise|real cases", "Assess|decisions", "Support|performance"]), "A capability plan identifies gaps and assesses whether employees can perform the redesigned work.")],
    ["The People phase therefore needs a capability plan identifying learning requirements and assessing whether employees can perform.", null],
    ["Training attendance alone cannot establish that someone can make a sound decision during a difficult guest encounter.", st("Capability requires evidence of performance, not merely evidence that employees attended training.")],
    ["Finally, Qasr needs to know whether actual arrivals follow the redesigned process rather than established workarounds.", null],
    ["An adoption measure should track genuine use of the new process and have someone accountable for reporting it.", dg("From readiness to adoption", D.flow(["Role|defined", "Authority|documented", "Capability|assessed", "Adoption|measured", "Owner|accountable"]), "People-phase outputs support implementation and provide evidence that the redesigned process is being adopted.")],
    ["These deliverables support later implementation, value realisation and sustainable performance because organisational readiness affects every stage.", null],
    ["They also connect with Develop, where technology must support the responsibilities and decisions assigned to employees.", st("People and Develop must remain coordinated so organisational arrangements and technology support the same process design.")],
    ["So the sponsor should ask for evidence of aligned roles, measures, authority, capability and accountable adoption tracking.", null],
    ["Together, these outputs make the redesigned process something employees can perform rather than merely something management has approved.", q("Which missing People-phase deliverable would most seriously prevent Qasr's Guest Hosts from performing their redesigned work?")]
  ],
  review: [
    {
      title: "The airport that redesigned boarding but forgot the gate team",
      lines: [
        ["Let's revisit the People phase through an airport introducing a redesigned boarding process for departing passengers.", t("Remedial · Making the People phase concrete", "An airport boarding redesign reveals why organisational deliverables matter.")],
        ["The airport wants passengers to board more smoothly, using automated checks and clearer handling of unusual travel documents.", null],
        ["Its new process looks promising because routine passengers can move through automated gates without repeated manual checks.", dg("The redesigned boarding process", D.flow(["Passenger|arrives", "Automated|document check", "!Exception|identified", "Gate agent|assists", "Boarding|continues"]), "Automation handles routine checks while gate agents resolve cases requiring human judgement.")],
        ["However, gate agents previously concentrated on checking documents and moving passengers through the boarding queue quickly.", null],
        ["The redesign now expects them to investigate exceptions and decide whether certain problems can be resolved locally.", null],
        ["Imagine the airport changing the equipment while leaving every employee's existing job description and performance objectives untouched.", iss("The technology changes, but the organisation continues defining employee work through the previous boarding procedure.", "An incomplete redesign")],
        ["An agent encounters a passenger whose document requires clarification and cannot determine whether local approval is permitted.", null],
        ["The employee calls a supervisor because the organisation has never documented the new decision boundary.", q("Which People-phase output would clarify whether the gate agent may resolve this exception independently?")],
        ["The missing output is documented delegated authority, which specifies decisions employees may make within their responsibilities.", null],
        ["A revised role definition would also explain how exception handling fits into the agent's redesigned work.", st("Role definitions explain responsibilities, while delegated authority explains which decisions employees may make.")],
        ["Now imagine management continuing to reward agents according to the number of passengers processed every minute.", null],
        ["An employee handling complicated documents might appear less productive than someone supervising straightforward automated boarding.", cmp("What the measure rewards", "Old objective", "Maximise passengers processed during a short period.", "Redesigned contribution", "Resolve difficult boarding exceptions accurately without unnecessary delay.")],
        ["The airport therefore needs performance measures that recognise effective exception resolution while safeguarding decision quality.", null],
        ["Employees also need practical training because knowing how to operate a scanner differs from interpreting an unusual document.", dg("Building the required capability", D.flow(["Identify|new decisions", "Practise|exceptions", "Test|judgement", "Provide|support"]), "Capability development prepares employees for decisions that the redesigned process now requires.")],
        ["A capability assessment would show whether agents can apply their authority correctly rather than merely complete training.", null],
        ["The airport should also measure how many passengers genuinely use the redesigned boarding process during actual operations.", null],
        ["Someone must own that adoption measure because unreported workarounds can conceal problems after technical implementation finishes.", st("Adoption measurement shows whether the redesigned process is being performed, with a named owner responsible for reporting.")],
        ["Notice how these arrangements address different problems while supporting the same intended passenger experience.", null],
        ["Role definitions establish expectations, authority enables decisions, measures reinforce behaviour and capability supports reliable performance.", null],
        ["Adoption evidence then reveals whether the organisation has translated those arrangements into everyday operating practice.", q("Could you identify which People-phase output is missing when a redesigned job exists but employees cannot demonstrate its required capability?")]
      ]
    },
    {
      title: "The service centre that looked ready on paper",
      lines: [
        ["Imagine a customer service centre preparing to launch a redesigned process for handling complex customer complaints.", t("Remedial · Evidence of organisational readiness", "A service centre shows why completing project activities does not prove readiness.")],
        ["The programme manager proudly reports that the new software is installed and every employee has attended training.", null],
        ["The redesigned process also appears in the operating manual, so the project dashboard displays a reassuring green status.", st("Completed project activities do not automatically demonstrate that employees can perform the redesigned process.")],
        ["However, the new process expects frontline employees to resolve complaints that previously required specialist approval.", null],
        ["Their existing job descriptions still describe recording complaints and transferring difficult cases to another department.", dg("The gap between design and responsibility", D.flow(["Complaint|received", "New process|expects resolution", "!Old role|requires transfer", "Customer|waits"]), "The redesigned process requires decisions that the existing role definition does not support.")],
        ["Employees therefore continue transferring complaints because the formal role has not changed alongside the intended process.", null],
        ["The programme needs updated role definitions that explain responsibilities and the boundaries of the new work.", null],
        ["But those documents will not solve the problem unless employees also receive authority to make appropriate decisions.", q("What happens when management expects employees to resolve complaints but never formally authorises the necessary decisions?")],
        ["They may escalate defensively because the consequences of making an unauthorised decision feel greater than the benefits.", null],
        ["Documented delegation would clarify which complaints employees can resolve and which situations still require specialist approval.", st("Authority must match responsibility so employees can perform their assigned work without unnecessary escalation.")],
        ["Now suppose the centre continues evaluating staff according to how quickly they close individual complaint records.", null],
        ["Employees may rush complicated cases or transfer them because careful investigation reduces their apparent transaction speed.", iss("The old speed measure rewards quick record closure rather than effective resolution of complex customer problems.", "Misaligned performance objectives")],
        ["A revised performance measure should recognise appropriate complaint resolution while checking that decisions remain accurate and fair.", null],
        ["The organisation should also review whether existing rewards support the greater judgement expected from the redesigned role.", cmp("Two performance expectations", "Old expectation", "Close complaint records quickly and transfer difficult cases.", "New expectation", "Resolve appropriate complaints effectively while maintaining decision quality.")],
        ["Training introduces the new process, but employees still need practice with cases requiring judgement and unfamiliar decisions.", null],
        ["A realistic assessment can reveal whether they understand their authority and know when escalation remains appropriate.", dg("Evidence of readiness", D.flow(["Role|defined", "Authority|documented", "Measures|aligned", "Capability|tested", "Adoption|tracked"]), "Readiness requires aligned organisational arrangements and evidence that employees can perform the new work.")],
        ["Finally, the service centre must observe whether real complaints follow the redesigned process after the launch.", null],
        ["A named owner should track adoption because successful software installation does not establish successful behavioural change.", st("Adoption evidence connects the redesigned process with what employees actually do during operations.")],
        ["This is why Qasr's sponsor should ask for more than job titles, induction attendance and completed project milestones.", null],
        ["The People phase must provide evidence that employees have suitable responsibilities, authority, incentives and demonstrated capability.", null],
        ["Those outputs prepare the organisation for implementation and help protect the value expected from the redesign.", q("Would you consider this service centre ready if every employee attended training but nobody had tested their decision-making capability?")]
      ]
    }
  ]
},
{
  title: "Who does the work, and who answers for it?",
  sec: "W10O1c",
  lines: [
    ["We have seen that Qasr needs clear roles and authority before its redesigned arrival process can work.", t("Who does the work, and who answers for it?", "Understanding responsibility, accountability and cross-functional coordination.")],
    ["Now imagine a Guest Host meeting a traveller whose confirmed corporate rate differs from the kiosk's calculation.", null],
    ["The guest wants an immediate answer, but the discrepancy touches reception operations, revenue policy and managerial authority.", dg("A decision crossing departmental boundaries", D.flow(["Guest|raises discrepancy", "Guest Host|investigates", "Revenue|policy", "Decision|required"]), "One guest problem may involve several organisational functions.")],
    ["The Guest Host can investigate the problem, but someone must own the decision when responsibilities overlap.", null],
    ["Without that clarity, the guest may be transferred between employees who each believe someone else should decide.", iss("Several employees participate, but nobody has clearly accepted accountability for the decision.", "The accountability gap")],
    ["This is where a RACI matrix becomes useful, because it clarifies different contributions to process activities.", null],
    ["RACI identifies who performs work, who answers for it, who provides advice and who receives information.", st("RACI separates responsibility, accountability, consultation and information so cross-functional work can be coordinated.")],
    ["Let's begin with responsibility, which identifies the person or role actually performing a particular activity.", null],
    ["At Qasr, a Guest Host might investigate a discrepancy and gather the information needed for resolution.", dg("Responsible means performing the work", D.flow(["Guest|reports issue", "Guest Host|investigates", "Evidence|prepared"]), "The responsible role carries out the activity needed to move the process forward.")],
    ["That employee performs the investigation, but performing work does not automatically confer authority over every resulting decision.", null],
    ["Accountability identifies the role that ultimately answers for an activity's result or the decision governing it.", cmp("Responsibility and accountability", "Responsible", "Performs the activity and contributes directly to its completion.", "Accountable", "Ultimately answers for the activity's result or governing decision.")],
    ["This distinction matters because several employees may contribute while one clearly identified role remains answerable for the outcome.", null],
    ["The Week 10 framework therefore recommends one accountable party for each activity rather than competing accountable owners.", st("Each RACI activity should have exactly one accountable role to prevent ambiguity over final ownership.")],
    ["Imagine two managers both claiming final approval authority while disagreeing about how a guest exception should be handled.", null],
    ["Employees could receive conflicting instructions, leaving the guest waiting while the managers attempt to resolve their disagreement.", iss("Multiple accountable owners create competing instructions and uncertainty about who can settle the decision.", "Conflicting accountability")],
    ["Consultation is different because a consulted role provides knowledge or advice before the activity or decision is completed.", null],
    ["A revenue manager might advise on rate policy without personally performing every investigation involving a disputed rate.", dg("Consulted means providing input", D.flow(["Guest Host|investigates", "Revenue manager|advises", "Decision owner|decides"]), "Consultation contributes expertise without automatically transferring accountability.")],
    ["Information is different again because an informed role receives relevant updates without necessarily participating in the decision.", null],
    ["A senior manager might need visibility of exception patterns without approving every individual case that employees resolve.", cmp("Consulted and informed", "Consulted", "Provides input before an activity or decision is completed.", "Informed", "Receives relevant information about progress, decisions or outcomes.")],
    ["The slide illustrates these distinctions through a RACI matrix for activities supporting the redesigned arrival process.", null],
    ["Its roles include the process owner, front desk, IT, revenue manager and chief operating officer.", dg("Roles across the redesigned process", D.flow(["Process|owner", "Front|desk", "IT", "Revenue|manager", "COO"]), "The RACI exhibit spans operational, technical, commercial and executive roles.")],
    ["The activities include defining standards, approving redesign, building workflows, running operations, monitoring performance and escalating exceptions.", null],
    ["Each activity receives one accountable owner, even when several roles contribute to completing the work.", st("The RACI matrix coordinates cross-functional activities without treating every contributor as an accountable decision owner.")],
    ["Notice that these assignments should follow the redesigned process rather than reproduce the previous departmental organisation automatically.", null],
    ["Otherwise, the matrix may preserve the very boundaries that the process redesign was intended to overcome.", iss("Copying the old organisational chart into RACI can preserve outdated handoffs and decision bottlenecks.", "The old structure returns")],
    ["For Qasr, the redesigned Guest Host role must therefore connect clearly with revenue management and operational leadership.", null],
    ["The employee needs to know which exceptions can be resolved locally and which require escalation beyond delegated authority.", dg("A clear escalation boundary", D.flow(["Guest Host|investigates", "Within|authority?", "Resolve|locally", "Escalate|when required"]), "A defined escalation route supports decisions that exceed the employee's authority.")],
    ["Remember that RACI clarifies accountability, while formal delegation specifies which decisions an employee is authorised to make.", null],
    ["Those arrangements must agree, because assigning responsibility without usable authority can create defensive referrals and unnecessary delays.", st("RACI and delegated authority must support each other, but they answer different organisational questions.")],
    ["Qasr's challenge is to make every important handoff and decision understandable before guests encounter another frustrating exception.", null],
    ["When employees know their responsibilities and escalation routes, the redesigned process has a stronger chance of working consistently.", q("If a Guest Host performs an investigation, does that automatically make the employee accountable for every related policy decision?")]
  ],
  review: [
    {
      title: "The supplier payment that nobody owned",
      lines: [
        ["Let's explore RACI through a company struggling to pay suppliers accurately and without unnecessary delays.", t("Remedial · Understanding RACI", "A supplier payment problem reveals the difference between doing work and owning its result.")],
        ["A supplier submits an invoice, but several departments become involved before the company can release payment.", null],
        ["Purchasing confirms the order, warehouse employees verify delivery and finance checks whether the invoice can be paid.", dg("The supplier payment journey", D.flow(["Invoice|received", "Order|checked", "Delivery|verified", "Payment|reviewed", "Supplier|paid"]), "Several departments contribute to completing one end-to-end payment process.")],
        ["The process becomes difficult when an invoice contains a price discrepancy that nobody knows how to resolve.", null],
        ["Purchasing believes finance should decide, while finance expects purchasing to settle the difference with the supplier.", iss("Both departments participate, but neither accepts clear accountability for resolving the disputed invoice.", "An ownership gap")],
        ["The invoice remains unpaid because participation in an activity does not establish who ultimately answers for its completion.", null],
        ["A RACI matrix can clarify the situation by assigning distinct roles to the work and its decisions.", st("RACI distinguishes employees who perform activities from the role ultimately accountable for each activity.")],
        ["Imagine a purchasing officer investigating the disputed price by comparing the invoice with the approved purchase order.", null],
        ["That officer is responsible for the investigation because the employee performs the work needed to establish the facts.", dg("Responsibility in practice", D.flow(["Purchasing|investigates", "Documents|compared", "Difference|identified"]), "The responsible role performs the activity rather than necessarily owning every subsequent decision.")],
        ["However, the organisation must separately identify who is accountable for approving the final treatment of the discrepancy.", null],
        ["Exactly one accountable role should be designated for that activity so competing decision owners cannot create confusion.", q("Why would assigning two accountable managers to the same approval activity make the payment process less reliable?")],
        ["The answer concerns conflicting authority, because employees may receive different instructions about the same disputed payment.", null],
        ["Consulted employees provide relevant expertise before a decision, without automatically becoming accountable for the final result.", cmp("Two different contributions", "Accountable", "Ultimately answers for the activity or governing decision.", "Consulted", "Provides knowledge or advice needed to make a sound decision.")],
        ["For example, warehouse staff might clarify whether the delivered quantity matches the information recorded on the invoice.", null],
        ["Their advice improves the decision, but it does not necessarily make them responsible for approving payment.", null],
        ["An informed role receives relevant updates after decisions or progress changes, without needing to approve the activity.", dg("Information without unnecessary approval", D.flow(["Decision|completed", "Relevant|update", "Stakeholder|informed"]), "Keeping stakeholders informed does not require adding another approval stage.")],
        ["This distinction matters because unnecessary approvals can turn a straightforward process into repeated departmental referrals.", null],
        ["The company should therefore define its RACI assignments around the redesigned payment journey rather than historical departmental boundaries.", st("Cross-functional accountability should support the redesigned process instead of preserving unnecessary old handoffs.")],
        ["Now return to Qasr, where a Guest Host investigates a disputed rate involving operational and revenue considerations.", null],
        ["The same principle applies because investigating an exception does not automatically establish accountability for every policy decision.", null],
        ["Clear responsibility, accountability and escalation help employees resolve cases without sending customers through avoidable organisational loops.", q("Can you explain why the person investigating a problem and the person accountable for its resolution may differ?")]
      ]
    },
    {
      title: "The university enrolment decision",
      lines: [
        ["Now imagine a university redesigning student enrolment to make registration easier and reduce unnecessary administrative delays.", t("Remedial · Coordinating across departments", "A university enrolment case shows how RACI prevents competing decision owners.")],
        ["Students previously contacted several offices separately when their enrolment involved an unusual academic or financial condition.", null],
        ["The university introduces a coordinated service process in which one adviser helps students navigate these exceptions.", dg("The redesigned enrolment journey", D.flow(["Student|requests enrolment", "Adviser|reviews", "Exception|identified", "Decision|obtained", "Enrolment|completed"]), "A coordinated process helps students navigate decisions involving different university functions.")],
        ["The adviser becomes responsible for gathering information and ensuring that each student's case moves toward resolution.", null],
        ["However, some cases require academic approval while others involve decisions about outstanding financial obligations.", null],
        ["The adviser cannot simply assume authority over decisions belonging to different university functions or established policies.", iss("The adviser coordinates the student's case but does not automatically own every academic or financial decision.", "Coordination is not unlimited authority")],
        ["Imagine a student requesting registration despite not satisfying a prerequisite for a particular course.", null],
        ["The adviser investigates the record and identifies the requirement that prevents ordinary registration from proceeding.", dg("The adviser's responsibility", D.flow(["Student|requests help", "Adviser|checks record", "Prerequisite|issue identified"]), "The adviser performs the investigation needed to identify the enrolment exception.")],
        ["An authorised academic role must then decide whether the applicable rules permit an exception to that prerequisite.", null],
        ["The university should identify one accountable role for that decision rather than leave competing offices claiming ownership.", st("Each decision activity needs one accountable role, even when several people contribute information or advice.")],
        ["A programme coordinator might be consulted because that person understands the academic consequences of the proposed exception.", null],
        ["Consultation provides useful knowledge, but it does not necessarily transfer accountability from the authorised decision owner.", cmp("Accountable versus consulted", "Accountable role", "Answers for the academic exception decision under the applicable rules.", "Consulted role", "Provides relevant academic advice before the decision is completed.")],
        ["The adviser may then be informed of the decision so the student receives an accurate explanation.", null],
        ["Receiving that information does not make the adviser accountable for the academic judgement that produced the decision.", null],
        ["The distinction prevents employees from confusing communication, advice, operational work and ultimate ownership of a decision.", dg("RACI contributions", D.flow(["Responsible|performs", "Accountable|answers", "Consulted|advises", "Informed|receives updates"]), "RACI distinguishes four contributions that should not be treated as interchangeable.")],
        ["Now suppose two university managers both claim final authority over the same prerequisite exception and disagree.", null],
        ["The adviser may wait for their agreement, leaving the student uncertain about whether registration can proceed.", iss("Competing accountable roles can delay decisions even when every employee understands the underlying student problem.", "Two owners, no resolution")],
        ["A clear RACI assignment prevents that ambiguity by identifying the accountable decision owner for the activity.", null],
        ["The university also needs an escalation route when an unusual case exceeds the authority assigned to employees.", st("RACI clarifies ownership, while documented decision rights and escalation rules make that ownership operationally usable.")],
        ["This brings us back to Qasr, where Guest Hosts must coordinate exceptions without inheriting unlimited revenue authority.", null],
        ["Their investigations may involve several departments, but each activity still needs clear responsibility and accountability.", null],
        ["The redesigned process becomes more dependable when employees understand who acts, who decides and who must be informed.", q("Would assigning every participating department accountability for the same exception make coordination clearer or more confusing?")]
      ]
    }
  ]
},
      ] },
      { id: "l2", title: "The Guest Host's impossible job", sections: [
{
  title: "Authority without ambiguity",
  sec: "W10O2a",
  lines: [
    ["We have clarified who performs Qasr's redesigned work and who remains accountable for important process decisions.", t("Authority without ambiguity", "The Guest Host's decision rights must match the responsibilities of the redesigned role.")],
    ["Now let's examine what happens when employees understand their responsibilities but remain uncertain about their decision-making authority.", null],
    ["Imagine a Guest Host welcoming a traveller whose confirmed corporate rate differs from the kiosk's displayed amount.", dg("A rate discrepancy at Qasr", D.flow(["Guest|arrives", "Kiosk|shows discrepancy", "Guest Host|investigates", "Decision|required"]), "The redesigned process expects the Guest Host to help resolve exceptions that the kiosk cannot handle.")],
    ["The traveller wants the discrepancy resolved quickly, because another referral would reproduce the frustrating experience Qasr redesigned.", null],
    ["The Guest Host has been told that certain rate discrepancies can be waived without obtaining managerial approval.", st("Guest Hosts may waive rate discrepancies up to AED 400 without referral.")],
    ["However, this authority was communicated through a briefing email rather than incorporated into the formal delegation schedule.", null],
    ["The waiver is also missing from the job description and the employee's existing performance objectives.", iss("The process expects independent decisions, but formal organisational documents do not clearly establish the Guest Host's authority.", "An authority gap")],
    ["Imagine being that employee while a dissatisfied guest waits for your decision at the lobby kiosk.", null],
    ["Would you confidently exercise the waiver, knowing that the formal documents do not confirm your permission?", q("Why might an employee hesitate to exercise authority communicated informally but absent from formal delegation?")],
    ["The hesitation could reflect uncertainty about consequences rather than opposition to the redesigned guest experience.", null],
    ["Qasr's evidence makes this concern important because nine of twenty-two Guest Hosts refer every rate discrepancy upward.", dg("Observed escalation at Qasr", D.flow(["22 Guest|Hosts", "9 always|refer discrepancies", "Manager|decides", "Guest|waits"]), "Nine Guest Hosts refer every rate discrepancy upward, although the redesigned role includes limited waiver authority.")],
    ["We cannot establish each employee's motive from that observation, but the organisational mismatch deserves careful investigation.", null],
    ["The People phase offers a useful way to understand this problem through authority and accountability.", st("Authority concerns permission to decide, while accountability concerns responsibility for the result.")],
    ["Authority means having recognised permission to make decisions within defined limits while performing assigned responsibilities.", null],
    ["Accountability means being answerable for the outcome, including whether the employee's decisions meet expected standards.", cmp("Two different organisational requirements", "Authority", "Permission to make specified decisions within defined limits.", "Accountability", "Responsibility for the result and the quality of decisions.")],
    ["The Week 10 slide combines these dimensions into a matrix showing four possible organisational arrangements.", null],
    ["When authority and accountability are both high, employees can take ownership of decisions and their consequences.", dg("Authority and accountability", D.matrix2x2(["Low authority", "High authority"], ["High accountability", "Low accountability"], ["Defensive escalation", "Ownership", "Compliance without engagement", "Inconsistent local practice"]), "The matrix contrasts the behavioural consequences of different combinations of authority and accountability.")],
    ["That combination supports the redesign because employees can act independently while remaining answerable for appropriate decisions.", null],
    ["High accountability with low authority creates a different situation, where employees face consequences without sufficient decision rights.", iss("Employees are expected to deliver results but lack clear permission to make the decisions those results require.", "High accountability, low authority")],
    ["Defensive escalation becomes understandable because referring decisions upward may feel safer than exercising uncertain authority.", null],
    ["High authority with low accountability creates another risk because employees may develop inconsistent local practices.", st("Authority without sufficient accountability can produce inconsistent decisions across employees or operating locations.")],
    ["When both authority and accountability are low, compliance without engagement and quiet workarounds can become more likely.", null],
    ["The matrix therefore highlights why assigning responsibility alone cannot guarantee that employees will perform redesigned work.", cmp("The design principle", "Responsibility without authority", "Employees may avoid decisions and refer cases unnecessarily.", "Authority with accountability", "Employees can exercise judgement within defined limits and answer for their decisions.")],
    ["For Qasr, the immediate design issue is making the Guest Host's waiver authority formally usable.", null],
    ["The delegation schedule should specify the AED 400 boundary and identify how cases beyond that authority are escalated.", dg("A documented decision boundary", D.flow(["Rate|discrepancy", "Within AED 400|authority?", "Guest Host|may resolve", "Escalate|outside authority"]), "Formal delegation should clarify the permitted decision boundary and the escalation route beyond it.")],
    ["The job description and accountability arrangements should reinforce the same decision rights rather than contradict them.", null],
    ["Employees also need realistic guidance about applying the waiver appropriately, because authority does not eliminate judgement.", st("Clear delegation must be supported by consistent responsibilities, decision guidance and accountability for quality.")],
    ["Remember that formalising authority does not mean encouraging employees to waive every discrepancy automatically.", null],
    ["It means enabling appropriate decisions within agreed limits while preserving escalation when a case exceeds those limits.", null],
    ["Qasr's challenge is to replace uncertainty with a dependable decision arrangement that supports the redesigned arrival experience.", q("If Qasr expects Guest Hosts to resolve eligible discrepancies, what must change beyond simply repeating the briefing email?")]
  ],
  review: [
    {
      title: "The delivery driver who could not solve a simple problem",
      lines: [
        ["Let's explore authority and accountability through a delivery company trying to resolve customer problems during the final delivery.", t("Remedial · Authority and accountability", "A delivery exception reveals why responsibility must be supported by usable decision rights.")],
        ["The company redesigns its service so drivers can address straightforward delivery exceptions without contacting the central office.", null],
        ["Previously, customers waited while drivers requested approval for minor changes to delivery arrangements or service recovery.", dg("The redesigned delivery process", D.flow(["Driver|arrives", "Customer|reports problem", "Driver|assesses", "Local|resolution"]), "The redesigned process expects drivers to resolve appropriate delivery exceptions without unnecessary referral.")],
        ["Management now expects drivers to protect customer satisfaction by making reasonable decisions within approved operational boundaries.", null],
        ["However, the company announces this expectation during a briefing without updating the formal delegation policy.", iss("Drivers are expected to make local decisions, but their formal authority remains unclear.", "Responsibility without documented authority")],
        ["Imagine a driver discovering that a customer's parcel was delivered with damaged packaging but the contents remain intact.", null],
        ["The customer requests an immediate service adjustment, while the driver worries about exceeding an undocumented approval limit.", q("Why might the driver contact a supervisor even when management encourages employees to resolve problems locally?")],
        ["The driver may fear being held accountable for a decision that the organisation has not formally authorised.", null],
        ["This situation illustrates high accountability combined with low authority, which can encourage defensive escalation.", st("High accountability with insufficient authority can encourage employees to refer decisions upward for protection.")],
        ["The driver might understand the customer's problem perfectly while still lacking confidence about making the required decision.", null],
        ["That distinction matters because additional technical training alone cannot correct a missing organisational decision right.", cmp("Two different problems", "Capability gap", "The employee does not know how to assess or resolve the situation.", "Authority gap", "The employee understands the situation but lacks clear permission to decide.")],
        ["The company should document which service adjustments drivers may approve and when supervisory escalation remains necessary.", null],
        ["A clear delegation boundary allows employees to act confidently without assuming unlimited authority over customer compensation.", dg("Making delegation usable", D.flow(["Exception|identified", "Within|delegation?", "Driver|resolves", "Supervisor|handles excess"]), "Defined decision rights distinguish local resolution from cases requiring supervisory approval.")],
        ["Accountability must accompany that authority because employees should remain answerable for decisions made within approved limits.", null],
        ["Without accountability, different drivers might grant inconsistent adjustments that undermine fairness and operational control.", st("High authority without appropriate accountability can produce inconsistent local decisions.")],
        ["When both authority and accountability are low, employees may simply follow routines without engaging with improvement objectives.", null],
        ["The strongest arrangement combines meaningful authority with clear accountability and practical guidance for exercising judgement.", null],
        ["This is the same challenge facing Qasr's Guest Hosts when they encounter eligible rate discrepancies.", dg("The shared design problem", D.flow(["New|responsibility", "Formal|authority", "Clear|accountability", "Appropriate|decision"]), "Employees need authority and accountability that support the responsibilities of the redesigned process.")],
        ["A briefing may communicate management's intention, but formal delegation makes the decision boundary organisationally dependable.", null],
        ["The objective is not unrestricted independence, because some exceptions still require decisions beyond the employee's authority.", null],
        ["The objective is appropriate local resolution supported by clear limits and a reliable escalation route.", q("How would documenting the driver's decision rights change the behaviour encouraged by the redesigned delivery process?")]
      ]
    },
    {
      title: "The insurance adviser who always asked the manager",
      lines: [
        ["Now imagine an insurance company redesigning how advisers resolve straightforward customer claims and policy discrepancies.", t("Remedial · Diagnosing defensive escalation", "An insurance claims example shows how unclear authority can recreate unnecessary managerial referrals.")],
        ["The company wants advisers to resolve eligible cases during customer conversations rather than transferring every decision to supervisors.", null],
        ["The redesigned process therefore gives advisers responsibility for investigating claims and applying specified decision rules.", dg("The intended claims journey", D.flow(["Customer|raises claim", "Adviser|investigates", "Eligibility|assessed", "Decision|communicated"]), "The redesigned process expects advisers to resolve eligible claims through clearly defined decision rules.")],
        ["However, the formal job description still describes advisers as employees who collect information and recommend managerial decisions.", null],
        ["Their performance objectives emphasise timely handling, but the revised approval authority has not been formally documented.", iss("The adviser is expected to resolve claims while formal documents continue describing a referral-based role.", "Conflicting organisational expectations")],
        ["Imagine an adviser reviewing a claim that appears to satisfy the conditions for a straightforward approval.", null],
        ["The employee understands the policy but hesitates because approving the claim might later be questioned by management.", q("Does this hesitation necessarily demonstrate resistance to change, or could it reveal a weakness in the role design?")],
        ["The behaviour could reflect uncertainty about authority rather than unwillingness to serve the customer effectively.", null],
        ["The authority-accountability matrix helps explain why employees may protect themselves by escalating decisions they could otherwise resolve.", st("Defensive escalation can be a predictable response when employees face accountability without dependable decision authority.")],
        ["Suppose management responds by reminding advisers that the redesigned process requires greater independence and faster decisions.", null],
        ["That message might increase pressure without resolving the formal contradiction that makes independent decisions feel risky.", cmp("Two management responses", "Repeat the instruction", "Tell employees to make more decisions without changing their formal authority.", "Repair the role design", "Document decision rights, clarify accountability and establish escalation boundaries.")],
        ["A stronger response would identify the decisions advisers should make and record those rights in formal delegation arrangements.", null],
        ["The organisation should also specify when complex claims exceed local authority and require specialist or managerial review.", dg("The decision boundary", D.flow(["Claim|assessed", "Within|authority?", "Adviser|decides", "Specialist|reviews excess"]), "The adviser resolves eligible claims while cases outside delegated authority follow a defined escalation route.")],
        ["This arrangement protects customers because routine decisions can proceed without unnecessary waiting or repeated transfers.", null],
        ["It also protects the organisation because decisions remain subject to clear accountability and consistent operating standards.", st("Useful delegation combines local decision authority with accountability for appropriate and consistent outcomes.")],
        ["Now consider the opposite problem, where advisers receive broad approval authority but nobody reviews their decision quality.", null],
        ["Different employees might interpret similar claims inconsistently, creating unfair outcomes and avoidable operational risks.", iss("High authority without meaningful accountability can encourage inconsistent local practices.", "The opposite imbalance")],
        ["The solution is therefore not simply increasing authority, because authority must fit responsibilities and accountability together.", null],
        ["Qasr faces the same design challenge with Guest Hosts authorised to waive eligible discrepancies up to AED 400.", null],
        ["The organisation should formalise that boundary while clarifying how employees exercise judgement and escalate exceptional cases.", dg("A coherent role arrangement", D.flow(["Defined|responsibility", "Documented|authority", "Clear|accountability", "Appropriate|escalation"]), "Responsibilities, authority, accountability and escalation must support the same redesigned process.")],
        ["Remember that an employee's repeated referrals are evidence worth investigating rather than automatic proof of personal resistance.", null],
        ["A sound diagnosis examines whether the organisation has made the expected decision both possible and defensible.", q("Why might changing formal delegation be more effective than repeatedly instructing advisers to show greater confidence?")]
      ]
    }
  ]
},
{
  title: "When the old measure defeats the new design",
  sec: "W10O2b",
  lines: [
    ["We have seen how unclear authority can make Qasr's Guest Hosts hesitate when guests need immediate decisions.", t("When the old measure defeats the new design", "How performance measures and incentives can recreate the behaviour a process redesign was meant to replace.")],
    ["Now let's examine another problem, one that can undermine the redesign even when employees understand their responsibilities.", null],
    ["Imagine a Guest Host spending fifteen minutes resolving a complicated rate discrepancy for a tired business traveller.", dg("The difficult arrival", D.flow(["Guest|arrives", "Kiosk|rejects case", "Guest Host|investigates", "Exception|resolved"]), "The redesigned role requires careful attention to exceptions that automated check-in cannot resolve.")],
    ["The employee investigates the booking, explains the discrepancy and helps the guest continue the arrival process.", null],
    ["From the guest's perspective, that careful intervention may be exactly what the redesigned service should provide.", st("Successful exception resolution can create value even when it takes longer than a routine transaction.")],
    ["But imagine the employee's performance review still rewarding the number of check-ins completed during each shift.", null],
    ["A complicated exception consumes time while contributing little to the transaction volume recognised by that measure.", iss("The employee performs valuable redesigned work, but the existing performance measure may treat that work as unproductive.", "The measurement contradiction")],
    ["This is the problem Qasr faces because its Guest Hosts inherited performance objectives established earlier in January.", null],
    ["Those objectives still measure check-ins completed per shift and the average time taken for each transaction.", cmp("Qasr's inherited objectives", "Check-ins per shift", "Rewards the volume of conventional front-desk transactions.", "Average transaction time", "Rewards completing individual transactions quickly.")],
    ["Neither measure was designed specifically around the Guest Host's new responsibility for resolving difficult kiosk exceptions.", null],
    ["Kiosk check-ins are also not attributed to individual employees, making the old volume measure particularly problematic.", st("The old scorecard no longer corresponds reliably to the work assigned to Guest Hosts.")],
    ["The organisation has changed what employees should accomplish without changing how their contribution is formally evaluated.", null],
    ["That mismatch matters because employees naturally pay attention to activities that influence their performance assessments and rewards.", dg("How measures influence behaviour", D.flow(["Performance|measure", "Employee|priorities", "Daily|behaviour", "Process|outcome"]), "Performance measures influence which activities employees prioritise during everyday work.")],
    ["Even committed employees can experience pressure when the activities management praises differ from the redesigned process's requirements.", null],
    ["The Week 10 slides illustrate this danger through an exception handler whose previous objective rewarded transaction throughput.", iss("An employee expected to resolve complex exceptions remains evaluated according to the number of transactions completed.", "Old objectives survive")],
    ["Once automation handles straightforward cases, the employee receives more difficult work that naturally takes longer to resolve.", null],
    ["If throughput remains the dominant measure, avoiding complicated exceptions can appear more attractive than investigating them thoroughly.", dg("The unintended incentive", D.flow(["Complex|exception", "Longer|handling time", "Lower|throughput", "Pressure|to avoid"]), "A transaction-volume target can discourage employees from accepting complicated cases.")],
    ["The resulting behaviour may resemble resistance, although the organisation itself has created incentives favouring the old process.", null],
    ["This is why performance measurement belongs inside the People phase rather than being treated as an administrative detail.", st("A redesigned process needs measures that reinforce its intended behaviour rather than reward displaced activities.")],
    ["For the exception handler, the slides recommend measuring exceptions resolved without unnecessary escalation instead of transaction volume.", null],
    ["That measure recognises the employee's contribution to resolving cases that the automated process cannot complete independently.", cmp("Replacing the conflicting measure", "Old objective", "Transactions completed per shift.", "Redesigned objective", "Exceptions resolved without escalation, supported by a quality sample.")],
    ["However, counting locally resolved exceptions alone could encourage employees to make decisions beyond their authority.", null],
    ["The recommended quality sample therefore checks whether resolutions are appropriate rather than merely quick or independent.", st("Outcome measures need quality safeguards so employees are not rewarded for making inappropriate decisions.")],
    ["The old objective must also be removed explicitly because retaining contradictory targets can preserve conflicting behavioural instructions.", null],
    ["Adding a new measure without removing the old one may leave employees uncertain about which expectations matter most.", dg("A coherent performance redesign", D.flow(["Remove|old target", "Measure|new outcome", "Check|decision quality", "Align|behaviour"]), "The replacement measure should reinforce exception resolution while protecting decision quality.")],
    ["Now return to Qasr, where Guest Hosts are expected to support arrivals rather than maximise conventional desk transactions.", null],
    ["Their measures should reflect contributions they can reasonably influence within the redesigned guest arrival process.", null],
    ["Exception-resolution effectiveness could be useful, provided the organisation also checks appropriate decisions and service quality.", cmp("A possible Guest Host scorecard", "Useful outcome", "Appropriate resolution of eligible guest exceptions.", "Necessary safeguard", "Decision quality and compliance with delegated authority.")],
    ["The precise revised scorecard remains a design decision because the slides do not establish one already implemented.", null],
    ["Qasr should also review grade and reward arrangements because materially changed responsibilities may justify different organisational treatment.", st("Roles, measures and rewards must be reviewed together so the organisation communicates consistent expectations.")],
    ["Otherwise, employees may hear enthusiastic messages about the redesign while their formal objectives continue favouring familiar transactions.", null],
    ["Remember that a measure can be calculated accurately while still encouraging behaviour that damages the intended process.", iss("Accurate measurement is not enough when the chosen indicator rewards the wrong behaviour.", "Measuring the wrong success")],
    ["The central question is whether employees improve their assessed performance by doing the work the redesign actually requires.", null],
    ["If the answer is no, the organisation must repair the measure rather than simply demand greater employee commitment.", q("Why might retaining check-ins per shift encourage Guest Hosts to avoid the very exceptions they were hired to resolve?")]
  ],
  review: [
    {
      title: "The hospital that rewarded speed instead of safe discharge",
      lines: [
        ["Let's explore performance alignment through a hospital redesigning how patients leave after completing their treatment.", t("Remedial · When measures contradict the process", "A hospital discharge example shows how an inherited target can undermine redesigned work.")],
        ["The hospital wants discharge coordinators to resolve complicated departure problems before patients experience unnecessary waiting.", null],
        ["Previously, administrative employees were evaluated mainly by how many discharge records they completed during each shift.", dg("The redesigned discharge journey", D.flow(["Discharge|approved", "Exception|identified", "Coordinator|resolves", "Patient|leaves"]), "The redesigned process requires employees to resolve problems that prevent patients from leaving safely and promptly.")],
        ["The new role involves contacting departments, clarifying missing information and coordinating decisions when ordinary arrangements fail.", null],
        ["These activities can take longer than processing a straightforward discharge record through the existing information system.", null],
        ["Imagine a coordinator spending twenty minutes resolving a medication documentation problem that prevents a patient's safe departure.", iss("The coordinator protects the patient's discharge, but the inherited throughput target rewards completing more routine records.", "Valuable work, poor score")],
        ["The employee has improved the patient's experience while appearing less productive under the previous transaction-volume measure.", null],
        ["This creates a contradiction because the hospital wants careful exception resolution but continues rewarding administrative speed.", q("What behaviour might employees prioritise if their performance assessment still depends mainly on completed discharge records?")],
        ["Some employees might favour simpler cases because those activities improve their measured performance more quickly.", null],
        ["That behaviour would not necessarily demonstrate unwillingness to help patients or support the redesigned discharge process.", st("Employees may respond rationally to performance incentives that contradict the organisation's stated improvement objectives.")],
        ["The hospital should therefore replace the conflicting target with a measure reflecting successful resolution of discharge exceptions.", null],
        ["However, rewarding resolved exceptions without safeguards could encourage employees to rush decisions involving important clinical requirements.", cmp("A balanced measure", "Outcome", "Discharge exceptions resolved appropriately without unnecessary escalation.", "Safeguard", "Review decision quality and compliance with relevant clinical requirements.")],
        ["A quality review should establish whether the coordinator followed appropriate procedures and involved authorised professionals when necessary.", null],
        ["This protects patients because faster discharge is not valuable when it compromises essential safety requirements.", dg("Outcome with quality protection", D.flow(["Exception|identified", "Appropriate|resolution", "Quality|review", "Safe|departure"]), "Performance measures should reward useful outcomes without encouraging employees to bypass necessary safeguards.")],
        ["The old transaction-volume objective must also be removed rather than retained beside the replacement measure.", null],
        ["Otherwise, employees receive competing instructions about whether they should prioritise difficult cases or routine administrative throughput.", iss("Keeping both objectives can preserve the incentive to avoid complicated discharge cases.", "Conflicting targets remain")],
        ["The hospital should also consider whether its reward arrangements recognise the judgement required by the redesigned role.", null],
        ["This connects performance measurement with the broader People-phase responsibility for aligning jobs, incentives and capability.", st("Measures and rewards should reinforce the responsibilities employees must perform under the redesigned process.")],
        ["Qasr faces the same problem because its Guest Hosts inherited objectives designed for conventional front-desk transactions.", null],
        ["Their redesigned contribution concerns assisting arrivals and resolving exceptions that kiosks cannot handle independently.", null],
        ["The lesson is to measure the contribution the new process needs while protecting the quality of employee decisions.", q("Why would adding an exception-resolution target without removing the old throughput target leave the hospital's problem unresolved?")]
      ]
    },
    {
      title: "The customer service team that avoided difficult complaints",
      lines: [
        ["Now imagine a telecommunications company redesigning its customer complaint process to reduce repeated transfers between departments.", t("Remedial · Designing the right incentive", "A complaint-handling example reveals why measures must match the work employees now perform.")],
        ["The previous process rewarded agents for completing many customer interactions while keeping average handling time low.", null],
        ["Management introduces a redesigned process allowing trained agents to resolve more complicated complaints during the initial conversation.", dg("The intended complaint process", D.flow(["Customer|contacts", "Agent|investigates", "Decision|made", "Complaint|resolved"]), "The redesigned process aims to resolve eligible complaints without repeated transfers.")],
        ["The new responsibility requires employees to investigate service histories and apply judgement when customers describe unusual circumstances.", null],
        ["However, the organisation continues evaluating agents according to call volume and average handling time.", iss("The redesigned role requires deeper investigation, but the inherited measures reward short conversations and high transaction volume.", "A contradictory scorecard")],
        ["Imagine an agent receiving a complicated billing complaint that requires careful examination of several previous charges.", null],
        ["Resolving the complaint properly could take longer than handling several simple requests that involve no investigation.", q("Which activity improves the employee's old performance score, and which activity better supports the redesigned process?")],
        ["The old score favours quick interactions, while the redesigned process values appropriate resolution of difficult complaints.", null],
        ["An employee might therefore transfer the complicated case instead of completing the investigation during the conversation.", st("Misaligned measures can recreate the handoffs that a redesigned process was intended to eliminate.")],
        ["The problem is not necessarily poor employee motivation because the organisation continues rewarding behaviour associated with its previous process.", null],
        ["A better measure could recognise eligible complaints resolved without unnecessary escalation, provided decisions remain appropriate.", cmp("Redesigning the objective", "Inherited measure", "Calls completed and average handling time.", "Replacement measure", "Eligible complaints resolved appropriately without unnecessary escalation.")],
        ["However, the company should not reward agents simply for claiming that every complaint has been resolved.", null],
        ["A quality sample should examine whether the resolution followed policy and genuinely addressed the customer's problem.", dg("Checking the quality of resolution", D.flow(["Complaint|investigated", "Resolution|recorded", "Quality|sampled", "Outcome|verified"]), "Quality review protects against superficial closure and inappropriate decisions.")],
        ["The organisation must also distinguish cases employees can resolve from those requiring specialist or managerial authority.", null],
        ["Otherwise, a poorly designed target might encourage agents to make decisions beyond their delegated limits.", st("Performance incentives must respect decision authority while encouraging appropriate resolution of eligible cases.")],
        ["The previous call-volume objective should be removed when it conflicts with the work required by the redesign.", null],
        ["Keeping both targets may create pressure to close conversations quickly while simultaneously demanding deeper complaint investigation.", iss("Contradictory objectives can leave employees uncertain about which behaviour management genuinely expects.", "Two competing instructions")],
        ["Managers should also review whether reward arrangements recognise the greater judgement and responsibility involved in the redesigned role.", null],
        ["This matters because employees interpret formal measures and rewards as evidence of what the organisation truly values.", null],
        ["Qasr's Guest Hosts face a comparable contradiction when conventional check-in targets remain attached to exception-handling responsibilities.", dg("The shared design principle", D.flow(["Redesigned|responsibility", "Relevant|outcome measure", "Quality|safeguard", "Aligned|incentive"]), "The measure should recognise the new contribution while protecting appropriate decisions.")],
        ["The central principle is that performance measures should make desirable process behaviour worthwhile rather than accidentally penalise it.", null],
        ["When employees succeed by performing the redesigned work properly, measurement becomes a practical support for organisational change.", q("How could an exception-resolution measure improve behaviour while still creating problems if decision quality were ignored?")]
      ]
    }
  ]
},
{
  title: "Designing a role people can actually perform",
  sec: "W10O2c",
  lines: [
    ["We have discovered two problems at Qasr: uncertain decision authority and performance measures inherited from the old process.", t("Designing a role people can actually perform", "Bringing responsibilities, authority, accountability, measures and capability into one coherent role.")],
    ["Now imagine the programme sponsor asking you to repair the Guest Host role rather than explain its weaknesses.", null],
    ["The challenge is to create a specification that employees can understand and managers can support during operations.", q("What would make the Guest Host a genuinely workable role rather than simply a new job title?")],
    ["Let's return to the four pilot properties, where twenty-two former Front Desk Agents now work as Guest Hosts.", null],
    ["Their redesigned responsibilities include greeting arriving guests and resolving exceptions that self-service kiosks cannot handle.", dg("The Guest Host's operating purpose", D.flow(["Guest|arrives", "Kiosk|handles routine case", "!Exception|requires help", "Guest Host|supports resolution"]), "The redesigned role supports arrivals and handles exceptions requiring human assistance.")],
    ["That gives us the role's purpose, but a purpose alone does not establish everything employees need.", null],
    ["A usable specification must translate the process design into responsibilities that can be performed and evaluated consistently.", st("A complete role specification connects the redesigned process with the employee's actual work.")],
    ["At Qasr, updated job descriptions were issued three weeks after go-live rather than before employees began operating.", null],
    ["That timing matters because employees needed clear expectations from the moment their responsibilities changed.", iss("Employees began performing redesigned work before updated job descriptions were available.", "Role definition arrived late")],
    ["The specification should explain which arrival problems Guest Hosts investigate and what successful resolution means.", null],
    ["It should also clarify their relationship with other roles involved in guest service and revenue decisions.", dg("Connecting the role to the process", D.flow(["Guest Host|investigates", "Relevant role|provides input", "Authorised role|decides", "Guest|receives outcome"]), "Responsibilities and decision ownership must support the redesigned arrival journey.")],
    ["Remember our RACI discussion, where responsibility identifies who performs an activity and accountability identifies who answers for it.", null],
    ["Those assignments should reflect the redesigned process rather than simply reproduce Qasr's former departmental arrangements.", st("The role specification should agree with the redesigned RACI responsibilities and accountability arrangements.")],
    ["Now consider the Guest Host's authority to waive eligible rate discrepancies up to AED 400.", null],
    ["The organisation communicated that permission through a briefing email without updating its formal delegation schedule.", cmp("Expected authority and documented authority", "Redesigned expectation", "Guest Hosts may waive eligible discrepancies up to AED 400.", "Formal arrangements", "The waiver remains absent from the delegation schedule and job description.")],
    ["A workable specification should identify this decision boundary and explain when employees must seek additional approval.", null],
    ["Formal delegation matters because employees should not have to guess whether management will support an appropriate decision.", dg("The Guest Host's decision boundary", D.flow(["Rate|discrepancy", "Within|delegation?", "Resolve|when appropriate", "Escalate|outside authority"]), "The formal role should distinguish permitted local decisions from cases requiring escalation.")],
    ["The specification also needs a clear reporting relationship so employees know where operational support and escalation belong.", null],
    ["The slides do not establish Qasr's final Guest Host reporting line, so choosing one remains a design decision.", st("A proposed reporting line must be justified and documented rather than presented as an existing Qasr arrangement.")],
    ["Now imagine the employee resolving a difficult exception carefully while the performance system continues rewarding quick check-ins.", null],
    ["That contradiction would make the redesigned responsibility less attractive despite the employee's contribution to guest service.", iss("The role requires exception resolution, but inherited objectives still reward conventional transaction volume and speed.", "The incentive mismatch")],
    ["Qasr therefore needs measures reflecting outcomes Guest Hosts can influence within their actual responsibilities and authority.", null],
    ["Appropriate exceptions resolved without unnecessary escalation could provide useful evidence of the role's intended contribution.", cmp("A proposed performance approach", "Relevant outcome", "Eligible guest exceptions resolved appropriately without unnecessary escalation.", "Quality safeguard", "Check decision accuracy and compliance with delegated authority.")],
    ["However, resolution counts need quality safeguards because employees must not be rewarded for making inappropriate waiver decisions.", null],
    ["The old transaction measures should be removed where they contradict the redesigned role's intended contribution.", st("Performance measures should reward the new work while protecting decision quality and appropriate escalation.")],
    ["The organisation must also review whether changed responsibilities justify adjustments to job grade and reward arrangements.", null],
    ["Qasr's existing grade remains unchanged, but the evidence does not establish what revised grade would be appropriate.", dg("Reviewing the employment arrangements", D.flow(["Changed|responsibilities", "Review|job grade", "Review|reward", "Align|expectations"]), "Materially changed work should trigger a justified review of grade and reward arrangements.")],
    ["A review is necessary because greater judgement and accountability should be considered within the organisation's employment arrangements.", null],
    ["But raising the grade automatically would be another unsupported decision without evaluating the role's actual requirements.", st("Grade and reward changes require assessment rather than assumptions based only on a new role title.")],
    ["Finally, the specification should identify the capabilities employees need to handle unfamiliar exceptions and exercise sound judgement.", null],
    ["Practical training and assessment should demonstrate those capabilities rather than merely record attendance at an induction session.", dg("From role design to capability", D.flow(["Required|decisions", "Identify|capability gaps", "Practise|exceptions", "Assess|performance"]), "The capability plan prepares employees to perform the responsibilities and decisions defined in their role.")],
    ["Qasr can then assign ownership for monitoring whether employees actually perform the redesigned arrival process consistently.", null],
    ["Together, these arrangements turn the Guest Host into a role supported by the organisation rather than an isolated instruction.", st("A workable role aligns responsibilities, accountability, authority, reporting, measures, reward and demonstrated capability.")],
    ["Notice how each element reinforces the others, because changing one without the rest can recreate old operating behaviour.", null],
    ["Our next challenge is determining whether employees have developed the judgement required to perform this coherent role.", q("Which elements would you insist on documenting before declaring Qasr's redesigned Guest Host role operationally ready?")]
  ],
  review: [
    {
      title: "Designing the hospital discharge coordinator",
      lines: [
        ["Let's practise designing a complete role through a hospital introducing a discharge coordinator for patients leaving after treatment.", t("Remedial · Building a complete role", "A hospital discharge coordinator illustrates how role specifications connect process responsibilities with organisational support.")],
        ["The hospital has redesigned discharge so patients no longer wait while departments complete disconnected administrative activities.", null],
        ["A coordinator now helps manage the journey from discharge approval until the patient can leave safely.", dg("The redesigned discharge journey", D.flow(["Discharge|approved", "Requirements|checked", "Exceptions|resolved", "Patient|leaves"]), "The coordinator supports the complete departure journey rather than one isolated administrative transaction.")],
        ["However, simply creating the coordinator title does not explain what the employee should do during difficult cases.", null],
        ["Imagine a patient whose departure is delayed because medication information and transport arrangements remain incomplete.", q("What responsibilities should the coordinator perform, and which decisions must remain with authorised clinical professionals?")],
        ["The coordinator might investigate outstanding requirements, contact relevant departments and maintain communication with the patient.", null],
        ["Those responsibilities should appear explicitly in the role specification because they define the employee's actual contribution.", st("A role specification translates the redesigned process into clear responsibilities employees can perform.")],
        ["The hospital must also distinguish coordinating an activity from being accountable for every professional decision involved.", null],
        ["Clinical approval should remain with the authorised professional, while operational coordination follows its own accountability arrangements.", cmp("Different responsibilities", "Discharge coordinator", "Coordinates operational requirements and resolves appropriate administrative dependencies.", "Clinical decision owner", "Retains accountability for clinical decisions within professional authority.")],
        ["The specification should identify which operational adjustments the coordinator may authorise without requesting additional managerial approval.", null],
        ["It should also define escalation when an issue exceeds that authority or requires specialist clinical judgement.", dg("Documented decision rights", D.flow(["Issue|identified", "Within|authority?", "Coordinator|resolves", "Specialist|decides"]), "Clear authority boundaries enable local action while protecting decisions requiring specialist approval.")],
        ["Without those boundaries, the coordinator may spend time seeking permission for decisions the redesigned process intended to simplify.", null],
        ["The hospital must then consider how the coordinator's performance will be evaluated under the new arrangements.", null],
        ["Counting completed discharge records alone would overlook the employee's contribution to resolving complicated departure problems.", iss("The role requires coordination and exception resolution, but an inherited transaction measure may reward only administrative throughput.", "The wrong measure")],
        ["A better measure could recognise appropriately resolved discharge obstacles while checking that essential clinical safeguards remain intact.", null],
        ["The hospital should also review whether the changed responsibilities justify different grade or reward arrangements.", st("Measures and rewards should reflect the role's actual contribution without encouraging unsafe shortcuts.")],
        ["The employee needs practical capability in communication, coordination and recognising situations requiring escalation to clinical professionals.", null],
        ["Training should therefore include realistic discharge cases followed by assessment of how the coordinator handles them.", dg("Preparing the employee", D.flow(["Define|role", "Clarify|authority", "Align|measures", "Practise|cases", "Assess|capability"]), "A complete role design connects responsibilities, authority, incentives and demonstrated capability.")],
        ["Finally, the reporting relationship must clarify where the coordinator obtains support when departmental requirements conflict.", null],
        ["This is precisely the challenge Qasr faces when defining the Guest Host's responsibilities across operational and revenue boundaries.", null],
        ["A role becomes workable when its organisational arrangements support the decisions and activities required by the redesigned process.", q("Why would a detailed job description still be insufficient if the coordinator lacked authority and appropriate performance measures?")]
      ]
    },
    {
      title: "The returns specialist whose job existed only on paper",
      lines: [
        ["Now imagine an online retailer creating a returns specialist role after automating straightforward customer refund requests.", t("Remedial · Repairing an incomplete role", "An automated returns process demonstrates how missing role elements undermine otherwise sensible redesigns.")],
        ["The new software approves routine returns automatically, leaving employees responsible for cases involving unusual circumstances or disputed information.", null],
        ["Management renames several customer service positions as returns specialists and announces that employees should resolve more exceptions.", dg("The redesigned returns process", D.flow(["Return|requested", "Automatic|check", "!Complex|exception", "Specialist|investigates", "Resolution|communicated"]), "Automation handles routine cases while employees investigate exceptions requiring judgement.")],
        ["However, the organisation has not revised the existing job descriptions or documented which refund decisions specialists may approve.", null],
        ["Employees therefore understand the general ambition but remain uncertain about their responsibilities and decision boundaries.", iss("The new title exists, but responsibilities and delegated decision rights remain incomplete.", "A role without operational support")],
        ["Imagine a specialist investigating a damaged product return that appears to justify an exception to ordinary policy.", null],
        ["The employee knows how to assess the evidence but cannot establish whether local approval is formally permitted.", q("Which missing role element prevents the specialist from completing a decision that the redesigned process expects?")],
        ["The immediate problem is unclear delegated authority, which should specify permitted decisions and appropriate escalation limits.", null],
        ["A complete role specification would also describe the investigation responsibilities and identify accountability for relevant decisions.", st("Responsibilities explain the work, while documented authority establishes which decisions employees may make.")],
        ["Now suppose the specialist's manager continues measuring performance through the number of returns processed each hour.", null],
        ["Complex investigations reduce that count, making employees appear less productive when they perform their redesigned responsibilities.", cmp("The inherited measurement problem", "Old measure", "Returns processed per hour.", "Redesigned contribution", "Appropriate resolution of complicated returns that automation cannot approve.")],
        ["The retailer should replace contradictory measures with indicators reflecting the outcomes specialists can reasonably influence.", null],
        ["A measure of appropriate exception resolution could help, provided the organisation also reviews decision quality.", dg("Measuring the redesigned contribution", D.flow(["Exception|investigated", "Appropriate|decision", "Quality|checked", "Outcome|recorded"]), "Performance measures should recognise useful resolutions without encouraging inappropriate approvals.")],
        ["Without a quality safeguard, employees might approve questionable refunds simply to increase their recorded resolution rate.", null],
        ["The company must also review whether greater judgement and responsibility justify changes to grade or reward.", null],
        ["Such changes require evaluation because a new title alone does not establish the appropriate employment arrangements.", st("Grade and reward reviews should reflect actual changes in responsibility rather than assumptions about job titles.")],
        ["Employees also need training that goes beyond navigating the returns software and explains how to handle unusual cases.", null],
        ["Realistic practice should test whether specialists understand policy, apply delegated authority and recognise necessary escalation.", dg("Demonstrating capability", D.flow(["Identify|skills", "Practise|exceptions", "Test|decisions", "Provide|support"]), "Capability assessment establishes whether employees can perform the redesigned role in realistic situations.")],
        ["Finally, the organisation should clarify the specialist's reporting relationship and the support available when decisions become difficult.", null],
        ["That arrangement prevents employees from inventing informal approval routes when the redesigned process encounters unfamiliar situations.", null],
        ["Notice how these elements form one coherent design rather than separate administrative documents with unrelated purposes.", st("A complete role aligns work, accountability, authority, reporting, measures, rewards and capability.")],
        ["Qasr must apply the same reasoning when repairing the Guest Host role across its four pilot properties.", null],
        ["The goal is not to produce more paperwork but to make the redesigned work understandable and practically achievable.", q("Which role elements would you check before concluding that the returns specialist can operate independently and responsibly?")]
      ]
    }
  ]
},
      ] },
      { id: "l3", title: "Capability is more than attendance", sections: [
{
  title: "Training for judgement, not just buttons",
  sec: "W10O3a",
  lines: [
    ["We have designed a more coherent Guest Host role, but another question now deserves our attention.", t("Training for judgement, not just buttons", "Why completing induction does not demonstrate readiness to perform redesigned work.")],
    ["Can Qasr's employees actually perform the decisions and responsibilities that the redesigned arrival process requires?", null],
    ["Imagine the programme sponsor opening the latest progress report and noticing that the people workstream is green.", dg("The people workstream report", D.flow(["22 Guest|Hosts", "Four-hour|induction", "Attendance|complete", "Status|green"]), "The programme reports successful induction attendance, but attendance alone does not demonstrate operational capability.")],
    ["The explanation sounds reassuring because all twenty-two Guest Hosts attended the required four-hour induction.", null],
    ["Every employee participated, so the programme can legitimately report that its scheduled induction activity was completed.", st("All twenty-two Guest Hosts attended the four-hour induction, but their capability was not tested afterwards.")],
    ["However, the sponsor should ask whether attendance establishes that employees can handle unfamiliar guest exceptions independently.", null],
    ["A completed training session tells us who participated, not whether participants can perform the required work.", cmp("Two different kinds of evidence", "Training attendance", "Shows that employees participated in a scheduled learning activity.", "Demonstrated capability", "Shows that employees can perform required decisions and activities appropriately.")],
    ["This distinction matters because the Guest Host role involves more than operating a kiosk or following instructions.", null],
    ["Employees must interpret unusual situations, exercise judgement and recognise when an exception exceeds their delegated authority.", dg("The Guest Host's capability challenge", D.flow(["Guest|raises exception", "Host|investigates", "Judgement|required", "Appropriate|decision"]), "The redesigned role requires practical judgement when automated check-in cannot complete an arrival.")],
    ["Imagine a traveller presenting a corporate booking whose confirmed rate differs from the amount displayed during check-in.", null],
    ["The Guest Host must understand the discrepancy before deciding whether the permitted waiver can resolve it.", null],
    ["Simply knowing where the waiver button appears cannot establish whether using that button would be appropriate.", iss("An employee may operate the software correctly while making an inappropriate decision about the guest's rate discrepancy.", "System knowledge is not process judgement")],
    ["This is why the slides distinguish system training from process training when preparing employees for redesigned responsibilities.", null],
    ["System training explains how to operate an interface, including where information appears and how actions are recorded.", cmp("Two complementary learning needs", "System training", "Explains how to operate the interface and complete technical actions.", "Process training", "Explains why actions matter, what should happen next and when judgement is required.")],
    ["Process training explains why an action is needed, what should happen next and how decisions affect others.", null],
    ["Both matter because technical competence without process understanding can create errors that travel through the guest journey.", st("Employees need to understand both how the system works and why the redesigned process requires particular actions.")],
    ["Consider a Guest Host who correctly records a waiver but fails to recognise that the case exceeds delegated authority.", null],
    ["The interface may accept the entry, yet the employee's decision could still violate the intended operating arrangements.", iss("Successful system operation does not guarantee that an employee has exercised appropriate decision-making authority.", "A capability gap")],
    ["The People phase therefore requires training that develops judgement through realistic situations rather than presentation slides alone.", null],
    ["A useful exercise might present several rate discrepancies with different causes, amounts and escalation requirements.", dg("Learning through realistic exceptions", D.flow(["Case|presented", "Evidence|examined", "Decision|explained", "Feedback|provided"]), "Worked cases help employees practise applying the redesigned process to unfamiliar situations.")],
    ["Employees should explain their reasoning because choosing an answer without understanding its consequences does not demonstrate dependable capability.", null],
    ["They also need opportunities to make mistakes safely before facing dissatisfied guests during live operations.", st("Realistic practice allows employees to develop judgement and receive feedback without exposing actual guests to avoidable errors.")],
    ["Imagine an employee initially approving a case that should have been escalated under the formal delegation arrangements.", null],
    ["A trainer can use that mistake to explain the decision boundary and help the employee practise again.", dg("Safe practice and feedback", D.flow(["Attempt|decision", "Review|reasoning", "Correct|misunderstanding", "Practise|again"]), "Safe mistakes during training provide evidence about learning needs before employees handle real exceptions.")],
    ["That approach builds confidence through understanding rather than simply encouraging employees to act more independently.", null],
    ["However, practice alone is insufficient unless the organisation assesses whether employees can perform the required decisions.", st("Capability assessment tests whether employees can apply the redesigned process appropriately in realistic situations.")],
    ["A practical assessment should examine exception investigation, appropriate waiver decisions and escalation beyond delegated authority.", null],
    ["It should also consider decision quality because resolving cases quickly is not useful when the resolution is inappropriate.", cmp("A meaningful capability assessment", "Decision effectiveness", "Can the employee resolve an eligible exception appropriately?", "Decision quality", "Does the employee respect policy, authority and necessary escalation?")],
    ["Qasr has not conducted such an assessment, so the actual capability of individual Guest Hosts remains unknown.", null],
    ["The nine employees who refer every rate discrepancy may face authority uncertainty, capability gaps or other difficulties.", iss("Repeated escalation is observable, but its precise causes cannot be established without investigating the employees' circumstances.", "Evidence requires diagnosis")],
    ["We should not assume that additional training alone will correct behaviour caused by missing formal decision rights.", null],
    ["The organisation must distinguish what employees cannot do from what they are not clearly authorised to do.", st("Capability gaps and authority gaps require different remedies, even when both produce repeated escalation.")],
    ["The people workstream should therefore report assessed readiness and unresolved capability risks alongside completed training activities.", null],
    ["That evidence would help the sponsor decide whether employees need further practice, clearer authority or additional support.", dg("From attendance to readiness", D.flow(["Induction|completed", "Capability|assessed", "Gaps|identified", "Support|provided", "Readiness|reviewed"]), "A credible people-readiness report connects training participation with demonstrated capability and unresolved risks.")],
    ["Remember that capability development is part of delivering process change, not merely an administrative training requirement.", null],
    ["Qasr needs evidence that Guest Hosts can exercise sound judgement before declaring its redesigned roles operationally ready.", q("What evidence would convince you that a Guest Host can resolve appropriate exceptions rather than merely operate the kiosk?")]
  ],
  review: [
    {
      title: "The pharmacy technician who knew the screen",
      lines: [
        ["Let's examine capability through a pharmacy introducing a redesigned process for handling prescription collection and unusual requests.", t("Remedial · System training versus process capability", "A pharmacy example shows why knowing the interface does not establish sound judgement.")],
        ["The pharmacy installs a new system that displays prescriptions, confirms collection details and identifies cases requiring professional review.", null],
        ["Technicians attend a training session where they learn how to search records and record completed collections.", dg("The redesigned collection process", D.flow(["Patient|arrives", "Record|checked", "!Exception|identified", "Professional|reviews", "Collection|completed"]), "The system supports routine collections while unusual cases require appropriate professional decisions.")],
        ["Every technician completes the session, so the manager reports that the training programme has been successfully delivered.", null],
        ["However, the redesigned process also requires technicians to recognise when a pharmacist must review an unusual situation.", iss("Employees can operate the collection system but may not recognise when professional review is required.", "The difference between operation and judgement")],
        ["Imagine a patient arriving with information that conflicts with the prescription record displayed on the screen.", null],
        ["The technician knows how to open the record but is uncertain about the appropriate response to the discrepancy.", q("Does knowing how to navigate the system establish that the technician can handle this exception safely?")],
        ["The answer is no, because technical operation and process judgement are different capabilities requiring different learning activities.", null],
        ["System training teaches employees where information appears and how routine actions are recorded within the interface.", cmp("Two different training purposes", "System training", "Develops the ability to navigate records and operate the interface.", "Process training", "Develops understanding of decisions, professional boundaries and appropriate escalation.")],
        ["Process training explains why certain situations require further investigation and when responsibility passes to an authorised professional.", null],
        ["The pharmacy should therefore provide realistic cases involving discrepancies, incomplete information and situations requiring pharmacist intervention.", st("Realistic examples develop the judgement needed to recognise exceptions and follow the appropriate process.")],
        ["During practice, a technician might incorrectly attempt to complete a collection that should have been referred.", null],
        ["The trainer can explain the error while the exercise remains safely separated from actual patient care.", dg("Safe practice", D.flow(["Example|presented", "Technician|responds", "Trainer|reviews", "Understanding|improves"]), "Safe practice helps employees learn from mistakes before encountering real operational consequences.")],
        ["That feedback matters because employees need to understand the reasoning behind correct actions rather than memorise responses.", null],
        ["The manager should then assess whether technicians can recognise exceptions and apply the appropriate escalation arrangements.", null],
        ["Attendance records alone cannot establish that these capabilities have developed to the required standard.", st("Demonstrated capability requires assessment of performance, not simply confirmation that employees attended training.")],
        ["The assessment should also respect professional boundaries because technicians must not be encouraged to make unauthorised clinical decisions.", null],
        ["Clear authority and appropriate training must therefore reinforce each other within the redesigned collection process.", dg("Capability within authority", D.flow(["Recognise|exception", "Understand|boundary", "Escalate|appropriately", "Protect|service quality"]), "Employees need the capability to act appropriately within their authorised responsibilities.")],
        ["Now return to Qasr, where Guest Hosts must recognise when an eligible rate discrepancy can be resolved locally.", null],
        ["They also need to identify situations that exceed their authority and require further managerial consideration.", null],
        ["The shared lesson is that completing technical training does not prove readiness for unfamiliar decisions.", q("How could the pharmacy manager test whether technicians understand the redesigned process rather than merely remember the interface?")]
      ]
    },
    {
      title: "The insurance adviser who passed induction",
      lines: [
        ["Now imagine an insurance company introducing a redesigned claims process that gives advisers greater responsibility for resolving straightforward cases.", t("Remedial · Demonstrating readiness", "An insurance example distinguishes training attendance, decision capability and formal authority.")],
        ["The company wants customers to receive appropriate decisions without waiting for repeated referrals between advisers and managers.", null],
        ["Advisers attend a scheduled induction explaining the new claims system and the intended operating arrangements.", dg("The redesigned claims journey", D.flow(["Customer|submits claim", "Adviser|investigates", "Eligibility|assessed", "Decision|communicated"]), "The redesigned process expects advisers to handle eligible cases while escalating decisions outside their authority.")],
        ["After everyone attends, the programme manager records training completion and describes the workforce as ready.", null],
        ["However, no assessment has established whether advisers can distinguish straightforward claims from cases requiring specialist review.", iss("The organisation has evidence of attendance but no evidence that advisers can make the required decisions appropriately.", "Readiness remains untested")],
        ["Imagine an adviser encountering a claim with conflicting information about the customer's policy coverage.", null],
        ["The employee understands the software but cannot confidently determine whether the discrepancy permits local resolution.", q("What additional evidence would establish whether the adviser can handle this situation under the redesigned process?")],
        ["A realistic assessment could require the adviser to investigate the evidence and explain the appropriate decision.", null],
        ["The assessor should examine whether the employee understands the policy and recognises the limits of delegated authority.", cmp("Attendance versus capability", "Attendance evidence", "Confirms participation in the scheduled induction.", "Capability evidence", "Demonstrates appropriate investigation, judgement and escalation in realistic cases.")],
        ["This distinction matters because an employee can remember instructions without understanding how to apply them when circumstances change.", null],
        ["Worked examples allow advisers to practise unusual situations and receive feedback before handling real customer claims.", st("Judgement develops through realistic practice, explanation and feedback rather than interface demonstrations alone.")],
        ["Suppose an adviser incorrectly approves a claim that should have been referred for specialist consideration.", null],
        ["A safe training exercise can expose that misunderstanding without creating an inappropriate real-world approval.", dg("Learning from a safe mistake", D.flow(["Case|presented", "Decision|attempted", "Error|explained", "Case|revisited"]), "Practice helps employees correct misunderstandings before they affect customers.")],
        ["The organisation should then assess whether the adviser can apply the corrected reasoning to a different example.", null],
        ["That assessment provides stronger evidence than simply asking whether the employee understood the training presentation.", null],
        ["However, capability is not the only possible reason employees might continue referring eligible claims upward.", iss("Repeated escalation could reflect uncertain authority, insufficient capability or other operational concerns.", "Do not assume the cause")],
        ["Imagine an adviser who understands the correct decision but cannot find that authority in the formal delegation policy.", null],
        ["Additional training would not resolve the contradiction because the employee still lacks dependable organisational permission to decide.", st("An authority gap requires formal clarification, while a capability gap requires appropriate learning and assessment.")],
        ["The programme should therefore investigate whether each difficulty concerns knowledge, decision rights or practical operating support.", null],
        ["Managers can then provide targeted remedies instead of repeating the same induction for every employee.", dg("Diagnosing the readiness problem", D.flow(["Observe|difficulty", "Identify|cause", "Choose|support", "Assess|improvement"]), "Different causes of poor performance require different corrective actions.")],
        ["This reasoning applies directly to Qasr's nine Guest Hosts who refer every rate discrepancy to a manager.", null],
        ["Their behaviour is observable, but the organisation has not established each employee's reason for escalating.", null],
        ["Qasr should therefore test judgement while correcting unclear delegation and examining the working conditions employees encounter.", q("Why would repeating induction be an incomplete response when employees already understand the process but lack documented authority?")]
      ]
    }
  ]
},
{
  title: "One organisation, two processes",
  sec: "W10O3b",
  lines: [
    ["We have seen why Qasr must test employee capability rather than assume induction attendance proves operational readiness.", t("One organisation, two processes", "Understanding adoption, workarounds and the difference between technical implementation and real process change.")],
    ["Now let's examine what happens after the redesigned arrival process begins operating across Qasr's pilot properties.", null],
    ["Eleven weeks after go-live, the programme sponsor receives evidence about how guests are actually checking in.", dg("Qasr at week eleven", D.flow(["Redesigned|arrival process", "Four pilot|properties", "Eleven weeks|after go-live", "Adoption|review"]), "The programme must examine actual process adoption rather than rely only on implementation milestones.")],
    ["The kiosks are operating, and Guest Hosts have been assigned to support arrivals and resolve exceptions.", null],
    ["However, installing the technology and assigning employees do not establish that the redesigned process is consistently followed.", st("Technical implementation and actual process adoption are different measures of BPM success.")],
    ["Adoption means the proportion of relevant cases genuinely following the redesigned process rather than alternative operating arrangements.", null],
    ["This distinction matters because a process can be available without becoming the normal way employees perform their work.", cmp("Two different questions", "Implementation", "Has the redesigned process been introduced and made operational?", "Adoption", "Are actual cases following the redesigned process as intended?")],
    ["At Qasr, the observed kiosk adoption figure is sixty-five percent eleven weeks after the new process launched.", null],
    ["That result shows substantial use of the kiosks, but it also raises questions about arrivals following other paths.", dg("Observed kiosk adoption", D.progress("Kiosk adoption at week eleven", 65, 100, "%"), "Qasr reports 65% kiosk adoption eleven weeks after go-live.")],
    ["The case also reports that twenty-nine percent of arrivals are handled at the desk.", null],
    ["We should not automatically classify every desk-handled arrival as resistance, failure or an inappropriate workaround.", st("A desk-handled arrival is an observed operating path, not automatic proof that someone bypassed the intended process.")],
    ["Property managers report that most desk-handled arrivals involve guests whose cases were rejected by the kiosk.", null],
    ["Those cases may require legitimate human assistance, making the distinction between necessary exceptions and avoidable workarounds important.", dg("Different reasons for desk handling", D.branch("Desk-handled arrival", ["Kiosk-rejected exception", "Possible workaround", "Reason requires investigation"]), "Desk activity must be classified before managers can distinguish necessary exception handling from avoidable departures from the design.")],
    ["A workaround occurs when people use an alternative method instead of the intended process to complete their work.", null],
    ["Some workarounds expose design weaknesses, while others reveal missing support or unresolved operational requirements.", st("Workarounds are diagnostic evidence because their causes can reveal weaknesses in the redesigned process.")],
    ["Imagine a Guest Host repeatedly referring an eligible rate discrepancy upward because the formal delegation schedule remains unclear.", null],
    ["The guest may eventually receive a resolution, but the unnecessary referral could undermine the intended improvement.", iss("The redesigned process expects local resolution, but uncertain authority may recreate an avoidable managerial referral.", "A possible workaround")],
    ["The organisation should investigate such patterns rather than assume employees are deliberately resisting the change.", null],
    ["This is why the slides recommend recording workarounds by type and frequency throughout the adoption period.", dg("Learning from workarounds", D.flow(["Observe|alternative path", "Record|type", "Measure|frequency", "Investigate|cause", "Correct|problem"]), "Classifying and measuring workarounds helps the programme identify which operating problems require correction.")],
    ["The programme also needs weekly adoption measurement from go-live rather than waiting until implementation appears complete.", null],
    ["Weekly evidence can reveal whether adoption improves, stalls or deteriorates as employees encounter practical difficulties.", st("Adoption should be measured weekly from go-live and reported alongside programme delivery milestones.")],
    ["The Week 10 slides illustrate this principle using a sixteen-week chart of adoption and workaround use.", null],
    ["Its adoption curve rises before levelling near sixty-five percent, while the workaround curve changes over time.", dg("Illustrative adoption and workaround trends", D.lines(["Week 1", "Week 4", "Week 8", "Week 12", "Week 16"], [{ name: "Illustrative adoption", values: [18, 42, 59, 65, 65] }, { name: "Illustrative workaround use", values: [12, 24, 18, 12, 9] }]), "Conceptual illustration of adoption plateauing and workaround use declining. These plotted values are illustrative, not Qasr observations.")],
    ["Remember that this chart illustrates a possible pattern rather than documenting Qasr's actual sixteen-week operating history.", null],
    ["Qasr's verified adoption observation concerns sixty-five percent at week eleven, not the chart's later periods.", st("Do not confuse illustrative adoption curves with the observed evidence from Qasr's eleven-week pilot.")],
    ["The slides warn that a process operating around sixty percent adoption effectively leaves two processes running together.", null],
    ["Employees must then manage the intended process alongside alternative arrangements, potentially increasing complexity and operational inconsistency.", cmp("Two operating realities", "Redesigned process", "Arrivals follow the intended kiosk-supported process and defined exception arrangements.", "Alternative arrangements", "Arrivals follow other paths that may include legitimate exceptions or avoidable workarounds.")],
    ["Qasr provides another warning because one pilot property has reinstated a permanent desk position removed by the redesign.", null],
    ["That decision might protect guests who cannot complete kiosk check-in, but it might also preserve unnecessary old practices.", iss("Restoring the permanent desk could protect service continuity or undermine the redesign, depending on how it operates.", "A decision requiring evidence")],
    ["We cannot determine which interpretation is correct without examining the desk's actual cases and operating responsibilities.", null],
    ["The sponsor should therefore request adoption evidence alongside information about exception types, referrals and alternative operating paths.", dg("A more informative sponsor review", D.flow(["Adoption|measured", "Exceptions|classified", "Workarounds|investigated", "Corrective|action"]), "The sponsor needs operating evidence to distinguish legitimate service support from avoidable departures from the redesigned process.")],
    ["An adoption measure also needs a named owner who can explain changes and coordinate necessary corrective action.", null],
    ["Otherwise, the programme may celebrate completed milestones while the organisation continues performing substantial parts of its previous process.", st("Delivery milestones show implementation progress, while adoption evidence shows whether the organisation is changing its behaviour.")],
    ["The challenge is not forcing every guest through a kiosk when human intervention is genuinely necessary.", null],
    ["It is ensuring that actual operating paths support the intended service design rather than silently recreate avoidable delays.", q("What evidence would help you decide whether Qasr's reinstated desk protects guests or undermines the redesigned process?")]
  ],
  review: [
    {
      title: "The hospital that launched a digital discharge process",
      lines: [
        ["Let's explore adoption through a hospital that introduces a digital process for coordinating patients' departure after treatment.", t("Remedial · Implementation versus adoption", "A hospital discharge redesign shows why a live system does not guarantee changed working practices.")],
        ["The hospital installs a shared discharge system and trains employees to record outstanding requirements in one place.", null],
        ["Managers celebrate the launch because the technology works and every department can access the new information.", dg("The intended discharge process", D.flow(["Discharge|approved", "Requirements|recorded", "Departments|coordinate", "Patient|leaves"]), "The redesigned process uses shared information to coordinate activities across departments.")],
        ["However, several employees continue relying on telephone calls and separate spreadsheets when difficult discharge cases arise.", null],
        ["The hospital now operates its new digital process alongside familiar arrangements that survived the implementation.", iss("The system is operational, but employees continue using alternative methods for some discharge cases.", "Implementation without full adoption")],
        ["This distinction matters because launching a process does not establish that employees consistently perform work through it.", null],
        ["Adoption concerns actual cases following the redesigned process rather than merely the availability of its technology.", st("Adoption measures whether the redesigned process is genuinely used during everyday operations.")],
        ["Imagine a discharge coordinator discovering that a patient cannot leave because transport arrangements remain unresolved.", null],
        ["The coordinator might use the shared system appropriately or return to informal telephone arrangements for assistance.", q("How could the hospital distinguish necessary human coordination from an avoidable workaround that bypasses the new process?")],
        ["The answer requires examining why employees choose each operating path and whether it supports the intended design.", null],
        ["A telephone call might be entirely appropriate when the redesigned process explicitly requires direct coordination.", cmp("Two possible interpretations", "Legitimate exception handling", "The alternative action supports a defined need within the redesigned process.", "Avoidable workaround", "The alternative action bypasses an intended arrangement because an unresolved problem remains.")],
        ["However, maintaining separate spreadsheets could create conflicting records when employees fail to update the shared system.", null],
        ["The hospital should therefore record alternative practices by type and frequency before deciding which require correction.", dg("Investigating alternative practices", D.flow(["Observe|practice", "Classify|reason", "Measure|frequency", "Correct|weakness"]), "Workaround evidence helps managers distinguish necessary exceptions from process weaknesses.")],
        ["Weekly adoption tracking would show whether employees increasingly use the redesigned discharge process during actual operations.", null],
        ["A stable adoption rate below the intended level would signal that important barriers may remain unresolved.", st("Weekly adoption measurement helps reveal whether implementation is producing sustained changes in working practices.")],
        ["The hospital should also assign someone responsibility for interpreting adoption evidence and coordinating improvements across departments.", null],
        ["Otherwise, the project may remain green while employees continue maintaining two competing operating arrangements.", iss("Completed delivery milestones can conceal persistent reliance on the previous process.", "A misleading green status")],
        ["This resembles Qasr, where kiosk adoption reaches sixty-five percent while substantial desk-handled activity remains.", null],
        ["Not every desk interaction is inappropriate because kiosk-rejected cases may legitimately require Guest Host assistance.", null],
        ["The important task is identifying which activities support the redesign and which recreate unnecessary old behaviour.", st("Adoption analysis must distinguish legitimate exception handling from avoidable departures from the intended process.")],
        ["A successful programme therefore examines actual work rather than assuming that technology installation proves organisational change.", q("Why should the hospital measure adoption after launch instead of relying entirely on completed implementation milestones?")]
      ]
    },
    {
      title: "The retailer running two returns processes",
      lines: [
        ["Now imagine an online retailer introducing a redesigned returns process that automatically approves straightforward customer requests.", t("Remedial · Understanding workarounds", "A retail returns example shows how alternative operating paths can reveal unresolved design problems.")],
        ["The new system allows customers to submit requests online while specialists investigate returns requiring additional judgement.", null],
        ["Management expects the arrangement to reduce unnecessary manual handling and improve the consistency of customer decisions.", dg("The intended returns process", D.flow(["Customer|submits return", "System|checks eligibility", "Routine|approval", "!Exception|to specialist"]), "Automation handles routine requests while specialists investigate exceptions requiring human judgement.")],
        ["After launch, managers notice that employees still accept some returns through the previous manual procedure.", null],
        ["The programme initially interprets this activity as evidence that employees are unwilling to use the redesigned process.", iss("Employees continue using the previous procedure, but management has not investigated why those cases follow another path.", "An untested explanation")],
        ["However, a closer examination might reveal that some customers cannot complete the online process because required information is unavailable.", null],
        ["Other manual cases might reflect employees choosing familiar methods even when the new system could handle them.", cmp("Different causes of manual handling", "Necessary assistance", "The customer encounters a genuine limitation requiring human support.", "Avoidable workaround", "The employee bypasses an available redesigned path without an operational need.")],
        ["These situations require different responses because the same visible behaviour can arise from different underlying causes.", null],
        ["Managers should therefore classify manual returns before deciding whether training, system changes or clearer responsibilities are needed.", q("Why would treating every manually handled return as employee resistance produce an unreliable diagnosis?")],
        ["A legitimate exception may reveal a missing system capability rather than a problem with employee commitment.", null],
        ["An avoidable workaround might instead indicate unclear instructions, contradictory incentives or confidence in familiar procedures.", st("Workarounds provide useful diagnostic evidence when their causes are investigated rather than assumed.")],
        ["The retailer should record each alternative operating path and examine how frequently different types occur.", null],
        ["This information allows managers to identify recurring weaknesses instead of responding to isolated examples without context.", dg("Classifying workarounds", D.flow(["Manual|case observed", "Reason|identified", "Type|recorded", "Pattern|reviewed"]), "Recording workaround types and frequency supports evidence-based corrective action.")],
        ["Weekly adoption measurement would also reveal whether the redesigned returns process becomes more widely used over time.", null],
        ["A plateau could indicate that the organisation has reached a persistent barrier requiring attention from the programme.", st("Adoption trends help distinguish temporary transition difficulties from continuing weaknesses in the operating design.")],
        ["Imagine one store reinstating a permanent manual returns counter after employees report difficulties with the online process.", null],
        ["That decision could protect customers who genuinely need assistance, but it might also preserve avoidable manual transactions.", iss("Restoring the old service channel can support continuity or undermine redesign, depending on the cases it handles.", "A competing interpretation")],
        ["The retailer should investigate the counter's cases before deciding whether its reinstatement represents success or failure.", null],
        ["This is precisely the judgement required when Qasr restores a permanent desk at one pilot property.", cmp("The Qasr parallel", "Service protection", "The desk may support guests whose cases genuinely require human intervention.", "Redesign erosion", "The desk may encourage unnecessary return to conventional check-in practices.")],
        ["Neither interpretation can be established simply by observing that the desk or counter has been reinstated.", null],
        ["Managers need evidence about actual cases, exception causes and whether alternative arrangements follow the intended design.", null],
        ["The broader lesson is that adoption measures behaviour while workaround analysis explains why behaviour differs from expectations.", st("Implementation establishes availability, adoption measures use, and workaround analysis helps diagnose departures from the design.")],
        ["Qasr's sponsor should therefore examine operating evidence before deciding how to respond to the eleven-week adoption results.", q("What information would help the retailer decide whether its manual returns counter should remain, change or disappear?")]
      ]
    }
  ]
},
{
  title: "The knowledge the redesign might lose",
  sec: "W10O3c",
  lines: [
    ["We have seen how Qasr's redesigned arrival process can coexist with familiar practices when adoption remains incomplete.", t("The knowledge the redesign might lose", "Protecting practical expertise and managing retention risks during process change.")],
    ["Now let's consider something less visible than kiosk adoption, but potentially just as important to successful change.", null],
    ["What happens to valuable employee knowledge when an organisation changes jobs without understanding everything those employees know?", q("Could Qasr lose important process knowledge while replacing its traditional Front Desk Agent role?")],
    ["Imagine an experienced Front Desk Agent who has spent years helping guests through difficult arrival situations.", null],
    ["This employee knows which booking discrepancies require investigation and which unusual circumstances deserve immediate managerial attention.", dg("Experience behind the old process", D.flow(["Unusual|guest problem", "Experienced|employee", "Practical|judgement", "Appropriate|resolution"]), "Experienced employees may possess practical knowledge that formal process documentation does not capture.")],
    ["Some of that knowledge may appear in procedures, but much of it develops through repeated operational experience.", null],
    ["Employees learn how departments interact, where information becomes unreliable and which exceptions require particular care.", st("Long-serving employees often hold practical process knowledge that is not fully documented in systems or procedures.")],
    ["This matters because a process diagram usually describes intended activities without capturing every judgement employees make.", null],
    ["A system record may show that a discrepancy was resolved without explaining how the employee recognised its cause.", cmp("Two kinds of process knowledge", "Documented knowledge", "Formal procedures, system records and written decision rules.", "Practical knowledge", "Experience-based judgement about unusual situations, dependencies and exceptions.")],
    ["The People phase must therefore consider what useful expertise could disappear when existing responsibilities are redesigned.", null],
    ["At Qasr, twenty-two former Front Desk Agents have moved into the Guest Host role across four properties.", dg("The role transition", D.flow(["Front Desk|Agent", "Existing|experience", "Guest Host|role", "New|responsibilities"]), "The transition should preserve useful operational knowledge while changing how employees perform their work.")],
    ["The organisation should not assume that everything valuable about the previous role belongs to an outdated process.", null],
    ["Some established practices may be inefficient, while the knowledge behind them remains essential for handling exceptional cases.", st("Redesigning old work does not mean discarding every insight developed by employees who performed that work.")],
    ["Imagine an agent recognising that a particular booking discrepancy usually originates in an earlier reservation adjustment.", null],
    ["That insight could help the redesigned process resolve similar exceptions without repeated investigation or unnecessary referrals.", dg("Turning experience into reusable knowledge", D.flow(["Experienced|observation", "Cause|explained", "Decision rule|documented", "Guest Host|supported"]), "Practical knowledge can be translated into guidance that supports the redesigned process.")],
    ["However, the organisation cannot preserve such knowledge merely by copying the old job description into a new document.", null],
    ["It needs employees to explain how they recognise exceptions and why particular responses are appropriate.", iss("Important judgement may disappear when organisations document activities without capturing the reasoning behind them.", "Knowledge at risk")],
    ["The slides recommend capturing this expertise before roles change materially, while experienced employees remain available.", null],
    ["Useful methods include documenting explicit decision rules and developing worked examples of difficult operational exceptions.", dg("Capturing practical expertise", D.flow(["Employee|explains case", "Decision|reasoning", "Worked|example", "Reusable|guidance"]), "Worked exceptions preserve the reasoning employees use when handling unusual situations.")],
    ["A worked example should explain the situation, relevant evidence, decision boundary and reasons for the chosen response.", null],
    ["That approach supports training because new Guest Hosts can practise applying knowledge previously held by experienced colleagues.", st("Worked exceptions turn individual experience into shared organisational capability.")],
    ["Now consider the personal uncertainty employees may experience when their familiar roles are replaced by redesigned responsibilities.", null],
    ["An employee might wonder whether previous expertise remains valued or whether the new position offers a meaningful future.", cmp("Two possible employee experiences", "Unclear transition", "Employees cannot see how their experience fits the redesigned organisation.", "Supported transition", "Employees understand their future responsibilities and how their expertise remains useful.")],
    ["Those concerns matter because uncertainty about future roles can create retention risks during organisational change.", null],
    ["The People phase should therefore help employees understand their place in the redesigned process and its future.", st("Employees need clarity about their future roles, not merely instructions about their immediate new tasks.")],
    ["Qasr's case reports that two of its twenty-two Guest Hosts have resigned since the redesigned process began.", null],
    ["The evidence does not establish why those employees resigned, so attributing their departures to resistance would be unjustified.", iss("Two resignations are observed, but the individual reasons for leaving have not been established.", "Do not invent motives")],
    ["Nevertheless, the departures justify investigating whether the transition creates risks to employee retention and operational knowledge.", null],
    ["Such risks belong in the programme risk register because losing experienced employees can affect implementation and service continuity.", dg("Managing retention risk", D.flow(["Role|uncertainty", "Retention|risk", "Programme|register", "Mitigation|planned"]), "Retention risks should be identified and managed before valuable experience is lost.")],
    ["The organisation should investigate concerns rather than wait until more employees leave and their practical expertise disappears.", null],
    ["Managers can involve experienced Guest Hosts in developing exception examples and clarifying the redesigned role's responsibilities.", st("Employee involvement can support knowledge transfer while helping the organisation understand practical transition concerns.")],
    ["This does not mean preserving every old practice, because some practices may contradict the intended redesign.", null],
    ["It means separating useful expertise from outdated routines so the new process benefits from operational experience.", cmp("What should change and what should remain", "Outdated practice", "Unnecessary handoffs and activities that undermine the redesigned process.", "Valuable expertise", "Practical judgement that improves appropriate exception handling and guest service.")],
    ["Qasr must therefore manage employee capability, knowledge transfer and retention as connected parts of the People phase.", null],
    ["The redesigned process becomes stronger when employees understand their future and contribute knowledge that technology cannot supply.", q("How could Qasr preserve experienced employees' judgement without preserving the inefficient front-desk practices it redesigned?")]
  ],
  review: [
    {
      title: "The maintenance technician who knew the machine",
      lines: [
        ["Let's explore knowledge retention through a manufacturing company introducing automated equipment monitoring across its production facilities.", t("Remedial · Preserving practical knowledge", "A manufacturing example shows why experienced employees' judgement matters during process redesign.")],
        ["The company installs sensors that monitor machine conditions and automatically alert employees when unusual readings appear.", null],
        ["Managers expect the redesigned maintenance process to replace routine inspections with targeted responses to detected problems.", dg("The redesigned maintenance process", D.flow(["Sensors|monitor", "Alert|generated", "Technician|investigates", "Action|taken"]), "Automation changes how maintenance employees identify and respond to equipment problems.")],
        ["However, an experienced technician has spent years recognising subtle machine behaviour that the new system cannot fully explain.", null],
        ["The technician understands which combinations of vibration, temperature and operating conditions usually indicate developing mechanical problems.", st("Experienced employees may hold practical knowledge that automated records and formal procedures do not fully capture.")],
        ["Imagine the technician recognising that a particular sensor warning becomes serious only under certain production conditions.", null],
        ["The system records the warning, but it does not necessarily explain the employee's reasoning about its significance.", cmp("Recorded information and practical judgement", "System record", "Captures the warning and the equipment conditions recorded by sensors.", "Experienced judgement", "Explains how operating context influences the appropriate response.")],
        ["If the company changes maintenance roles without capturing that reasoning, useful knowledge could disappear from daily operations.", null],
        ["The problem becomes especially important when experienced employees retire, transfer or leave during the transition.", iss("The organisation may lose the reasoning behind effective maintenance decisions when experienced employees depart.", "Knowledge loss")],
        ["The company should therefore invite technicians to explain difficult cases while their practical expertise remains available.", null],
        ["Those discussions can produce worked examples describing the warning, relevant conditions and appropriate maintenance response.", dg("Capturing a worked exception", D.flow(["Warning|observed", "Context|explained", "Decision|documented", "Example|shared"]), "Worked examples preserve the reasoning behind practical decisions for other employees.")],
        ["The resulting guidance can support training because employees learn why a response is appropriate rather than memorising instructions.", null],
        ["However, knowledge capture should not become an excuse for preserving every inefficient feature of the previous maintenance process.", st("The redesign should preserve valuable expertise while replacing unnecessary or outdated working practices.")],
        ["The company must also consider how technicians understand their future roles within the redesigned maintenance organisation.", null],
        ["Employees may worry that automation makes their experience less valuable even when their judgement remains essential.", q("How could involving experienced technicians in the redesign help preserve knowledge and address uncertainty about their future roles?")],
        ["Managers should explain the new responsibilities and identify how experienced employees can contribute to improved maintenance decisions.", null],
        ["Uncertainty about future roles can create retention risks that deserve attention before valuable employees leave.", dg("Supporting the transition", D.flow(["Explain|future role", "Recognise|expertise", "Transfer|knowledge", "Manage|retention risk"]), "A supported transition connects future responsibilities with the preservation of valuable operational knowledge.")],
        ["The programme should record significant retention risks and identify actions that reduce avoidable loss of expertise.", null],
        ["This resembles Qasr, where experienced Front Desk Agents have moved into the redesigned Guest Host role.", null],
        ["Their knowledge of unusual guest situations may remain valuable even when conventional desk transactions become less important.", st("A successful People phase changes work while retaining the knowledge needed to perform the redesigned process reliably.")],
        ["The central lesson is that employees are not merely resources to be reassigned when process diagrams change.", null],
        ["They are also sources of knowledge that can make the redesigned process more dependable and effective.", q("Why should the manufacturer capture experienced technicians' reasoning before their roles change materially?")]
      ]
    },
    {
      title: "The university adviser whose experience was disappearing",
      lines: [
        ["Now imagine a university redesigning student advising so learners receive coordinated support through a new digital service.", t("Remedial · Knowledge and retention during change", "A university advising example shows how role transitions can threaten valuable organisational knowledge.")],
        ["The redesigned process allows students to submit requests online while advisers concentrate on complex academic circumstances.", null],
        ["Routine questions are answered automatically, leaving advisers responsible for situations requiring interpretation and individual judgement.", dg("The redesigned advising process", D.flow(["Student|submits request", "System|handles routine issue", "!Complex|case", "Adviser|supports decision"]), "Automation handles routine requests while advisers concentrate on complex student needs.")],
        ["An experienced adviser has spent years helping students whose circumstances do not fit ordinary academic procedures.", null],
        ["The adviser understands how programme requirements interact and which unusual cases need additional academic consideration.", st("Experienced advisers may possess practical knowledge about exceptional student circumstances that formal records do not fully explain.")],
        ["However, the university prepares new role descriptions without consulting advisers about the difficult cases they routinely resolve.", null],
        ["The redesigned documents describe standard activities but overlook the reasoning employees use when circumstances become complicated.", iss("The university documents the new workflow without capturing important judgement developed through years of advising experience.", "An incomplete knowledge transfer")],
        ["Imagine a student whose previous study creates an unusual question about eligibility for a particular academic pathway.", null],
        ["The experienced adviser knows which evidence matters and which authorised academic role should review the exception.", q("What knowledge might disappear if the university replaces the old advising arrangements without consulting experienced employees?")],
        ["The university could lose practical understanding of recurring exceptions, relevant evidence and appropriate escalation relationships.", null],
        ["A useful response would involve experienced advisers in developing worked cases that explain their decision-making reasoning.", dg("Turning experience into guidance", D.flow(["Unusual|student case", "Adviser|explains reasoning", "Worked|example", "Guidance|shared"]), "Worked cases make experienced employees' practical knowledge available to the redesigned service.")],
        ["These examples could help other advisers recognise complex situations without relying entirely on informal personal contacts.", null],
        ["They would also clarify which decisions remain with authorised academic staff rather than the advising function.", st("Knowledge transfer should preserve useful judgement while respecting the redesigned process's formal decision boundaries.")],
        ["Now imagine experienced advisers worrying that automation will remove the parts of their work they previously valued.", null],
        ["Some might question whether the university recognises their expertise or offers a meaningful role in the future.", cmp("Two approaches to transition", "Unclear transition", "Employees receive new instructions without understanding how their expertise remains valuable.", "Supported transition", "Employees understand their responsibilities and contribute knowledge to the redesigned service.")],
        ["The university should address those concerns through clear communication and meaningful involvement in developing the new arrangements.", null],
        ["Uncertainty about future roles may create retention risks even when the redesigned process appears technically successful.", iss("A technically successful redesign can still face retention risks when employees cannot see their future contribution.", "The human transition matters")],
        ["Managers should investigate emerging concerns and record significant retention risks within the programme's risk arrangements.", null],
        ["Waiting until experienced advisers leave could make valuable knowledge harder to recover or transfer to colleagues.", dg("Managing knowledge and retention", D.flow(["Identify|concerns", "Capture|expertise", "Clarify|future roles", "Manage|risks"]), "The People phase should address knowledge preservation and retention before important expertise disappears.")],
        ["This reasoning applies directly to Qasr's transition from Front Desk Agents to Guest Hosts across four properties.", null],
        ["Two Guest Hosts have resigned, although the available evidence does not establish the reasons for their departures.", st("Observed resignations justify investigating retention risks, but they do not prove that employees resisted the redesign.")],
        ["Qasr should preserve useful exception-handling knowledge while helping employees understand their place in the redesigned arrival process.", null],
        ["The objective is not protecting outdated routines but ensuring that valuable experience strengthens the organisation's future performance.", q("How could involving experienced Guest Hosts in developing worked exception cases support both knowledge transfer and organisational change?")]
      ]
    }
  ]
},
      ] },
      { id: "l4", title: "Making the people design real", sections: [
{
  title: "Repairing the Guest Host specification",
  sec: "W10O2d",
  lines: [
    ["We have examined Qasr's authority gaps, conflicting measures, untested capability and the practical knowledge employees might lose.", t("Repairing the Guest Host specification", "Turning the People-phase diagnosis into a coherent and workable role design.")],
    ["Now the programme sponsor wants something more useful than another explanation of why the redesigned arrival process struggles.", null],
    ["The sponsor asks you to recommend changes that would make the Guest Host role genuinely workable.", q("What would you change so Guest Hosts can perform the redesigned work confidently and consistently?")],
    ["Let's begin with what Qasr actually knows about the role across its four pilot properties.", null],
    ["Twenty-two former Front Desk Agents now greet arriving guests and handle exceptions that self-service kiosks cannot resolve.", dg("The redesigned Guest Host role", D.flow(["Guest|arrives", "Kiosk|handles routine case", "!Exception|requires help", "Guest Host|investigates"]), "The role combines guest assistance with resolution of exceptions that automated check-in cannot handle.")],
    ["However, their updated job descriptions arrived three weeks after go-live, leaving an important transition period without revised documentation.", null],
    ["The repair should begin by aligning the formal role description with the responsibilities already established in the redesign.", st("The role specification must describe the work employees are actually expected to perform.")],
    ["That description should explain how Guest Hosts investigate exceptions, support arrivals and coordinate decisions involving other functions.", null],
    ["It should also distinguish activities employees perform from decisions for which another role remains accountable.", cmp("Two connected role requirements", "Operational responsibility", "Investigate guest exceptions and support their appropriate resolution.", "Decision accountability", "Identify the authorised role answerable for each relevant decision.")],
    ["Remember our RACI discussion, because cross-functional work becomes unreliable when nobody knows who owns an important decision.", null],
    ["Qasr should therefore align the Guest Host specification with its redesigned accountability and escalation arrangements.", st("Role responsibilities, RACI assignments and escalation routes must describe the same operating process.")],
    ["Now consider the AED 400 waiver, which allows Guest Hosts to resolve eligible rate discrepancies without referral.", null],
    ["That authority was communicated through a briefing email but remains absent from the formal delegation schedule.", iss("The redesigned role expects local decisions, but formal delegation does not document the AED 400 waiver.", "The authority gap")],
    ["The proposed correction is to document the decision boundary and explain when managerial approval becomes necessary.", null],
    ["Employees should understand that eligible cases may be resolved locally while decisions beyond their authority require escalation.", dg("A formal decision boundary", D.flow(["Rate|discrepancy", "Check|delegation", "Eligible|local resolution", "Outside limit|escalation"]), "The proposed delegation arrangement distinguishes appropriate local decisions from cases requiring further authority.")],
    ["This would make the expected judgement organisationally defensible rather than dependent on employees interpreting an informal message.", null],
    ["The specification should also identify the reporting relationship through which Guest Hosts obtain operational support.", st("A workable role needs a documented reporting relationship and a clear route for decisions requiring additional authority.")],
    ["The slides do not establish Qasr's final reporting line, so selecting one requires a justified management decision.", null],
    ["We should not invent an existing arrangement simply because a particular reporting structure appears convenient.", null],
    ["Next, the sponsor must confront the performance objectives that still reward conventional front-desk transactions.", cmp("The inherited scorecard", "Existing objectives", "Check-ins completed per shift and average transaction time.", "Redesigned responsibilities", "Support arrivals and resolve exceptions requiring human judgement.")],
    ["Those objectives were established in January and do not reflect the Guest Host's changed contribution to arrivals.", null],
    ["Kiosk check-ins are not attributed to individual employees, making the inherited transaction-volume measure especially unsuitable.", iss("Employees are expected to support kiosk-based arrivals while their objectives continue rewarding individual transaction throughput.", "The incentive contradiction")],
    ["The slides recommend replacing conflicting throughput measures with appropriate exception resolution supported by quality sampling.", null],
    ["For Qasr, a proposed measure could examine eligible exceptions resolved appropriately without unnecessary managerial escalation.", dg("A proposed performance measure", D.flow(["Eligible|exception", "Appropriate|resolution", "Quality|sample", "Outcome|reviewed"]), "A revised measure should recognise effective exception handling while protecting decision quality.")],
    ["Quality matters because employees should never receive rewards for approving discrepancies that exceed their delegated authority.", null],
    ["The conflicting old objectives should be removed explicitly rather than retained alongside measures that encourage different behaviour.", st("A revised scorecard should reward intended outcomes without preserving contradictory incentives from the previous process.")],
    ["Qasr must also review the unchanged job grade and reward arrangements against the role's revised responsibilities.", null],
    ["That review does not automatically justify a higher grade, because the appropriate outcome requires evaluation of the work.", cmp("A justified employment review", "What is known", "The Guest Host grade remains unchanged despite materially different responsibilities.", "What must be decided", "Whether the revised work justifies changes to grade or reward arrangements.")],
    ["Now imagine the sponsor approving these documents while employees still struggle with unfamiliar kiosk exceptions.", null],
    ["The role would remain incomplete because formal authority and incentives cannot substitute for demonstrated practical capability.", iss("A formally coherent role can still fail when employees cannot perform the required decisions reliably.", "Capability remains essential")],
    ["Qasr should therefore assess judgement through realistic cases involving rate discrepancies, waiver boundaries and appropriate escalation.", null],
    ["The assessment should reveal capability gaps that require practice, guidance or additional operational support.", dg("Demonstrating readiness", D.flow(["Realistic|case", "Employee|decision", "Quality|assessment", "Targeted|support"]), "Capability assessment should test how employees handle the actual decisions required by the redesigned role.")],
    ["Finally, someone must own adoption measurement and explain whether Guest Hosts are following the intended operating arrangements.", null],
    ["These proposed corrections connect responsibilities, authority, accountability, measures, reward and capability into one coherent design.", st("A complete role repair aligns the organisational arrangements that determine whether redesigned work can be performed.")],
    ["None of these corrections should be reported as completed, because Qasr's case establishes the problems rather than their resolution.", null],
    ["The sponsor now has a defensible repair proposal, but its effectiveness must still be tested through operating evidence.", q("Which proposed correction would you prioritise, and what evidence would show that it improved Guest Host performance?")]
  ],
  review: [
    {
      title: "Repairing the university student success adviser role",
      lines: [
        ["Let's practise repairing a role through a university that has redesigned how students receive academic and administrative support.", t("Remedial · Repairing a redesigned role", "A student success adviser illustrates how responsibilities, authority and measures must fit together.")],
        ["The university introduces a Student Success Adviser who coordinates complex requests previously handled by several separate offices.", null],
        ["The redesigned process expects advisers to investigate problems and help students obtain appropriate decisions without repeated transfers.", dg("The redesigned student support process", D.flow(["Student|requests help", "Adviser|investigates", "Relevant|decision", "Student|receives outcome"]), "The adviser coordinates the student's journey across organisational functions.")],
        ["However, the existing job description still concentrates on recording enquiries and directing students to other departments.", null],
        ["Advisers are expected to coordinate resolutions without clear documentation of their new responsibilities or decision boundaries.", iss("The redesigned process expects coordination, but the formal role continues describing a referral-based service.", "An incomplete role")],
        ["Imagine an adviser encountering a student whose enrolment requires an exception to an ordinary administrative requirement.", null],
        ["The employee understands the problem but cannot determine whether local approval is permitted under university rules.", q("What must the university clarify before expecting the adviser to resolve this case independently?")],
        ["The role specification should identify responsibilities while distinguishing administrative decisions from approvals reserved for authorised academic staff.", null],
        ["A formal delegation arrangement should clarify which decisions advisers may make and when escalation remains necessary.", st("Responsibilities and delegated authority must agree so employees can act appropriately within their role.")],
        ["The university should also identify who is accountable for decisions involving different organisational functions.", null],
        ["A RACI arrangement can prevent advisers from becoming responsible for outcomes they lack authority to approve.", cmp("Two different contributions", "Student Success Adviser", "Coordinates the case and performs the assigned investigation.", "Authorised decision owner", "Answers for decisions within the relevant academic or administrative authority.")],
        ["Now imagine management continuing to measure advisers by the number of enquiries closed during each shift.", null],
        ["Complex cases take longer, so employees may appear less productive when they provide the support students actually need.", iss("The inherited transaction measure can discourage the careful coordination required by the redesigned process.", "The wrong incentive")],
        ["The university could instead assess appropriate case resolution while checking accuracy and compliance with relevant requirements.", null],
        ["The previous measure should be removed when it contradicts the contribution expected from the redesigned role.", dg("Aligning performance", D.flow(["Redesigned|responsibility", "Relevant|outcome", "Quality|review", "Aligned|measure"]), "Performance measures should recognise the new contribution while protecting decision quality.")],
        ["The university should also review whether changed responsibilities justify different grade or reward arrangements.", null],
        ["However, any change should follow evaluation rather than assumptions about the importance of a new job title.", st("Grade and reward decisions should reflect the actual responsibilities and judgement required by the redesigned role.")],
        ["Advisers then need realistic practice handling unusual cases and recognising when decisions exceed their authority.", null],
        ["A capability assessment would establish whether employees can perform those responsibilities rather than merely attend training.", dg("Completing the role repair", D.flow(["Define|work", "Document|authority", "Align|measures", "Assess|capability", "Monitor|adoption"]), "A coherent role combines formal arrangements with evidence that employees can perform the redesigned work.")],
        ["Finally, a named owner should monitor whether students genuinely receive support through the intended process.", null],
        ["This resembles Qasr, where the Guest Host role needs organisational support beyond a revised title.", null],
        ["The central lesson is that role repair requires connected changes rather than isolated amendments to administrative documents.", q("Why would updating the adviser's job description alone leave the redesigned student support process vulnerable to failure?")]
      ]
    },
    {
      title: "The insurance claims specialist's missing specification",
      lines: [
        ["Now imagine an insurance company creating a claims specialist role after automating straightforward customer claims.", t("Remedial · A complete role-repair decision", "An insurance example shows how to diagnose and correct several connected role-design weaknesses.")],
        ["The redesigned process allows software to handle routine claims while employees investigate cases requiring additional judgement.", null],
        ["Management expects specialists to resolve eligible exceptions without sending every decision to a senior claims manager.", dg("The redesigned claims process", D.flow(["Claim|submitted", "Automatic|assessment", "!Complex|exception", "Specialist|investigates", "Decision|communicated"]), "Automation handles routine claims while specialists address cases requiring human judgement.")],
        ["However, the formal role still describes collecting information and recommending decisions rather than approving eligible claims.", null],
        ["The company's delegation schedule also omits the approval authority that managers announced during a team briefing.", iss("The specialist is expected to decide, but formal responsibilities and delegation continue supporting the previous process.", "A contradictory role")],
        ["Imagine a specialist investigating a valid claim while worrying that independent approval might later be challenged.", null],
        ["The employee refers the case upward because the organisation has not made the intended authority dependable.", q("Would repeating the instruction to act independently resolve the missing formal delegation?")],
        ["The stronger correction is to document permitted decisions and define escalation when claims exceed those limits.", null],
        ["The role description should then identify the investigations employees perform and the outcomes for which they are accountable.", st("A workable specification connects assigned responsibilities with clear decision rights and accountability.")],
        ["Now consider the specialist's performance objectives, which still reward the number of claims processed each hour.", null],
        ["Complicated investigations reduce throughput, creating pressure to avoid cases the redesigned role was created to resolve.", cmp("Conflicting performance expectations", "Inherited objective", "Maximise claims processed during each hour.", "Redesigned contribution", "Resolve eligible complex claims appropriately without unnecessary escalation.")],
        ["The company should replace contradictory throughput targets with measures reflecting appropriate resolution of eligible claims.", null],
        ["A quality sample should protect against inappropriate approvals and ensure employees respect their delegated decision boundaries.", dg("A balanced claims measure", D.flow(["Eligible|claim", "Appropriate|decision", "Quality|checked", "Outcome|recorded"]), "The proposed measure recognises resolution while protecting decision accuracy and compliance.")],
        ["The organisation should also review whether greater judgement and responsibility justify changes to grade or reward.", null],
        ["That review requires evidence about the role rather than automatically increasing rewards whenever a position is redesigned.", st("Reward arrangements should reinforce the redesigned contribution while remaining justified by the role's actual requirements.")],
        ["However, the repair would remain incomplete if employees lacked the capability to investigate unfamiliar claims correctly.", null],
        ["Specialists need realistic practice involving ambiguous evidence, approval limits and situations requiring escalation.", iss("Clear authority cannot compensate for insufficient capability when employees must exercise unfamiliar judgement.", "A remaining readiness gap")],
        ["A practical assessment should establish whether employees understand the rules and apply them appropriately in different cases.", null],
        ["Managers should then provide targeted support where the assessment reveals gaps in decision-making capability.", dg("From role repair to readiness", D.flow(["Role|clarified", "Authority|documented", "Measures|aligned", "Capability|tested", "Support|provided"]), "The redesigned role becomes more dependable when formal arrangements and demonstrated capability reinforce each other.")],
        ["The company also needs a clear reporting relationship and a named owner for monitoring process adoption.", null],
        ["Those arrangements help identify whether employees are performing the redesigned process or returning to familiar referrals.", null],
        ["This is exactly the reasoning required when Qasr repairs its Guest Host specification across four pilot properties.", st("A coherent role repair addresses responsibilities, authority, measures, reward, capability and adoption together.")],
        ["The proposed changes should be evaluated through operating evidence rather than reported as successful before implementation.", null],
        ["The objective is not simply completing documents but making the redesigned work practically achievable and consistently performed.", q("Which correction would you prioritise if specialists understood the claims rules but still lacked formally documented approval authority?")]
      ]
    }
  ]
},
{
  title: "The eleven-week decision",
  sec: "W10O3d",
  lines: [
    ["We have developed a proposal to repair Qasr's Guest Host role, but the sponsor now needs a decision.", t("The eleven-week decision", "Using operating evidence to diagnose the People phase and choose defensible corrective action.")],
    ["Imagine joining the programme review eleven weeks after the redesigned arrival process began operating at four pilot properties.", null],
    ["The project dashboard looks reassuring because the people workstream carries a green status against its planned activities.", dg("The sponsor's opening dashboard", D.flow(["People|workstream", "Induction|completed", "Status|green", "Operating|evidence?"]), "The green status reflects completed induction attendance rather than demonstrated capability or adoption.")],
    ["All twenty-two Guest Hosts attended a four-hour induction, so the programme can legitimately report completed training attendance.", null],
    ["However, nobody tested their capability afterwards, leaving an important question about operational readiness unanswered.", st("Training attendance is confirmed, but the capability of individual Guest Hosts remains untested.")],
    ["The sponsor should therefore distinguish evidence that an activity happened from evidence that the intended change succeeded.", null],
    ["This distinction matters because completing training cannot establish whether employees make appropriate decisions during difficult guest encounters.", cmp("Two different conclusions", "Supported conclusion", "All twenty-two Guest Hosts attended the scheduled induction.", "Unsupported conclusion", "All Guest Hosts can independently perform the redesigned role.")],
    ["Now consider the operating results, which provide a different perspective on the programme's progress.", null],
    ["Kiosk adoption stands at sixty-five percent, eleven weeks after the redesigned process went live.", dg("Observed kiosk adoption", D.progress("Week-eleven kiosk adoption", 65, 100, "%"), "Qasr reports 65% kiosk adoption eleven weeks after go-live.")],
    ["This indicates substantial use of the redesigned arrangement, but it does not establish complete adoption across arrivals.", null],
    ["Another twenty-nine percent of arrivals are handled at the desk, which requires careful interpretation rather than immediate condemnation.", st("Desk-handled arrivals must be investigated before being classified as legitimate exceptions or avoidable workarounds.")],
    ["Property managers report that most desk-handled arrivals involve guests whose cases were rejected by the kiosk.", null],
    ["Those observations suggest that some desk activity may provide necessary assistance rather than undermine the intended process.", dg("Interpreting desk activity", D.branch("Desk-handled arrival", ["Kiosk-rejected case", "Possible workaround", "Reason requires evidence"]), "The observed desk share does not establish how many cases represent inappropriate workarounds.")],
    ["However, the evidence does not establish the precise frequency of avoidable workarounds or their underlying causes.", null],
    ["The sponsor should request classified exception records before deciding whether desk activity represents a persistent design weakness.", st("Workaround diagnosis requires evidence about case types, frequency and reasons for using alternative operating paths.")],
    ["Now examine another result that directly concerns the Guest Host's redesigned responsibility for handling rate discrepancies.", null],
    ["Nine of the twenty-two Guest Hosts refer every rate discrepancy to a duty manager.", dg("Observed escalation behaviour", D.flow(["22 Guest|Hosts", "9 always|refer discrepancies", "Duty manager|decides", "Guest|waits"]), "Nine Guest Hosts consistently refer rate discrepancies upward rather than exercising local waiver authority.")],
    ["This pattern matters because the redesigned role permits eligible rate discrepancies to be waived up to AED 400.", null],
    ["Yet that authority appears only in a briefing email and remains absent from the formal delegation schedule.", iss("The role expects local decisions, but formal authority documentation does not support the expected behaviour.", "A documented design weakness")],
    ["The authority-accountability matrix suggests that employees facing responsibility without clear authority may escalate defensively.", null],
    ["That explanation is plausible, but the available evidence does not establish why each of the nine employees escalates.", st("Observed escalation supports investigating authority and capability gaps, but individual employee motives remain unverified.")],
    ["The sponsor must therefore decide which correction deserves priority without pretending that every uncertainty has already been resolved.", null],
    ["Formalising the waiver is a defensible priority because the missing delegation directly contradicts an essential role responsibility.", cmp("A defensible priority", "Observed weakness", "The AED 400 waiver is absent from formal delegation.", "Proposed correction", "Document the decision boundary and clarify escalation beyond authorised limits.")],
    ["However, documenting authority should accompany capability assessment because employees must also understand how to exercise judgement appropriately.", null],
    ["The programme should test realistic exception decisions rather than assume that clearer documents automatically produce competent performance.", dg("Linking correction to evidence", D.flow(["Document|authority", "Assess|judgement", "Observe|decisions", "Review|outcomes"]), "The proposed correction should be tested through appropriate decision-making and observed operating behaviour.")],
    ["The sponsor also learns that two Guest Hosts have resigned since the redesigned process began operating.", null],
    ["Their reasons remain unknown, so the departures cannot automatically be attributed to resistance or dissatisfaction with redesign.", iss("Two resignations are observed, but their individual causes have not been established.", "Retention evidence needs investigation")],
    ["Nevertheless, the departures justify reviewing retention risks and protecting practical knowledge held by experienced employees.", null],
    ["One pilot property has also reinstated a permanent desk position that the redesigned arrival process removed.", dg("The reinstated desk", D.branch("Permanent desk restored", ["Protects necessary service?", "Recreates old process?", "Investigate actual cases"]), "The desk may protect service continuity or undermine redesign, depending on the work it performs.")],
    ["The sponsor should consider whether that decision protects guests whose kiosk exceptions genuinely require human assistance.", null],
    ["The competing interpretation is that a permanent desk encourages unnecessary returns to conventional check-in practices.", cmp("Two competing interpretations", "Service protection", "The desk supports guests whose exceptions genuinely require assistance.", "Redesign erosion", "The desk preserves avoidable conventional check-in activity.")],
    ["Neither conclusion follows automatically from reinstatement, so the programme must examine the desk's actual operating cases.", null],
    ["A credible sponsor report should therefore combine adoption, classified workarounds, decision quality and demonstrated employee capability.", st("A meaningful people-readiness report connects operating outcomes with the organisational arrangements producing them.")],
    ["The green workstream status should be reconsidered because induction attendance alone cannot demonstrate readiness for the redesigned process.", null],
    ["The sponsor now needs corrective priorities, named owners and evidence showing whether the organisation's behaviour actually improves.", dg("A more credible sponsor decision", D.flow(["Diagnose|evidence", "Prioritise|corrections", "Assign|owners", "Measure|improvement"]), "The decision should connect observed weaknesses with accountable corrective action and measurable results.")],
    ["Remember that good change management neither dismisses employee behaviour nor assumes every deviation reflects resistance.", null],
    ["It investigates how responsibilities, authority, incentives and capability shape the work people perform under real conditions.", q("What would you tell Qasr's sponsor about the green status, and which correction would you defend as the priority?")]
  ],
  review: [
    {
      title: "The hospital discharge programme that reported green",
      lines: [
        ["Let's practise interpreting a programme dashboard through a hospital that has redesigned its patient discharge process.", t("Remedial · Reading beyond the green status", "A hospital discharge case distinguishes completed training activities from genuine operational readiness.")],
        ["The hospital introduces a shared digital system intended to coordinate discharge requirements across several clinical and administrative departments.", null],
        ["Managers report that the system is operational and all discharge coordinators have attended the scheduled training.", dg("The hospital's progress report", D.flow(["System|launched", "Training|attended", "Status|green", "Readiness|unverified"]), "Completed implementation activities do not establish that employees can perform the redesigned process.")],
        ["The programme therefore receives a green status, even though nobody has assessed coordinators using realistic discharge exceptions.", null],
        ["Imagine the sponsor discovering that difficult cases still require repeated telephone calls between departments before patients leave.", iss("The project reports completed activities while the operating process continues experiencing avoidable coordination difficulties.", "The evidence gap")],
        ["The sponsor should not immediately conclude that employees are resisting the redesigned process or refusing to cooperate.", null],
        ["Instead, the programme needs evidence explaining why cases continue moving through the previous arrangements.", q("What would distinguish a training problem from unclear authority or an unavoidable clinical requirement?")],
        ["A coordinator might understand the new system but lack permission to resolve an operational dependency independently.", null],
        ["Another employee might possess the necessary authority but struggle to recognise when specialist clinical input is required.", cmp("Different possible causes", "Authority gap", "The employee lacks clear permission to make an expected decision.", "Capability gap", "The employee cannot yet apply the required judgement reliably.")],
        ["These problems require different corrective actions because repeating system training cannot establish missing decision authority.", null],
        ["The hospital should examine actual discharge cases and assess how coordinators make decisions under realistic conditions.", st("A credible readiness assessment investigates both organisational authority and demonstrated employee capability.")],
        ["The sponsor should also request adoption evidence showing how often departures follow the redesigned coordination process.", null],
        ["Alternative arrangements should be classified because some may protect patients while others recreate unnecessary departmental delays.", dg("Investigating operating paths", D.flow(["Case|observed", "Reason|classified", "Cause|investigated", "Action|selected"]), "The programme must distinguish legitimate exceptions from avoidable workarounds before selecting corrective action.")],
        ["Imagine one ward restoring a dedicated administrative desk because staff believe the new system cannot handle complicated departures.", null],
        ["That decision might preserve essential support, but it might also encourage continued reliance on outdated arrangements.", iss("Restoring an old operating arrangement can protect service or undermine redesign, depending on the cases it handles.", "Two plausible interpretations")],
        ["The sponsor needs case evidence before deciding whether the desk should remain, change or disappear.", null],
        ["A defensible report would separate established observations from interpretations that still require investigation.", st("Management decisions should distinguish observed facts, plausible explanations and proposed corrective actions.")],
        ["This is exactly the challenge facing Qasr when its people workstream remains green despite untested capability.", null],
        ["The Guest Host evidence also includes repeated escalation, incomplete adoption and a reinstated permanent desk.", null],
        ["Those observations justify investigation and correction without establishing every employee's motives or every workaround's cause.", dg("A defensible management response", D.flow(["Evidence|reviewed", "Weakness|identified", "Correction|proposed", "Result|measured"]), "The sponsor should connect operating evidence with targeted action and subsequent assessment.")],
        ["The important lesson is that completed project activities are not equivalent to successful organisational change.", null],
        ["A green dashboard becomes meaningful only when its evidence reflects the capabilities and behaviours required by the redesign.", q("Why would the hospital sponsor need capability and adoption evidence before accepting the programme's green readiness status?")]
      ]
    },
    {
      title: "The retailer deciding whether to keep its manual counter",
      lines: [
        ["Now imagine an online retailer reviewing a redesigned returns process several weeks after its new service launched.", t("Remedial · Defending a corrective decision", "A retail returns case shows how to compare competing explanations before choosing a response.")],
        ["The retailer expects straightforward returns to proceed automatically while employees investigate exceptions requiring additional judgement.", null],
        ["However, one store has reinstated a permanent manual returns counter that the redesigned process originally removed.", dg("The operating decision", D.branch("Manual counter restored", ["Necessary customer support?", "Avoidable old practice?", "Evidence required"]), "The reinstated counter has competing interpretations that must be tested against actual operating evidence.")],
        ["The store manager argues that the counter protects customers who cannot complete the digital returns process.", null],
        ["The programme manager worries that employees are directing ordinary requests back toward the familiar manual procedure.", cmp("Two management interpretations", "Service continuity", "The counter supports customers with genuine exceptions or access difficulties.", "Redesign erosion", "The counter encourages unnecessary manual handling of routine returns.")],
        ["Both explanations are plausible, but the counter's existence alone cannot establish which interpretation is correct.", null],
        ["The sponsor should therefore examine the types of returns handled and why customers use the manual arrangement.", q("What evidence would help determine whether the reinstated counter protects service or undermines the redesigned process?")],
        ["A useful review would classify cases according to whether the digital process could reasonably have handled them.", null],
        ["The programme should also investigate whether employees have appropriate authority to resolve exceptions without unnecessary managerial referrals.", dg("Investigating the counter", D.flow(["Manual|case recorded", "Reason|classified", "Authority|checked", "Corrective|decision"]), "Case evidence and decision rights help explain whether manual handling is necessary or avoidable.")],
        ["Imagine specialists referring every disputed refund upward because their formal delegation remains unchanged after the redesign.", null],
        ["That behaviour could reflect uncertainty about authority rather than deliberate rejection of the new process.", iss("Repeated referral may arise from an organisational design weakness rather than employee unwillingness to change.", "Avoid assuming resistance")],
        ["The programme should document appropriate decision rights and test whether employees understand how to exercise them.", null],
        ["It should also review performance measures that might still reward manual transaction volume over appropriate exception resolution.", st("Authority, capability and incentives must be investigated together when redesigned work does not operate as intended.")],
        ["Suppose the sponsor asks which correction deserves priority before every cause has been fully established.", null],
        ["The programme should select a correction supported by a clear observed weakness and explain the reasoning.", cmp("A defensible priority decision", "Weak reasoning", "Assume employees resist change and demand immediate compliance.", "Stronger reasoning", "Identify documented contradictions, propose targeted repairs and test their effects.")],
        ["If formal delegation is missing, clarifying it provides a defensible response to an established organisational problem.", null],
        ["However, the programme must still assess whether employees can apply the revised authority correctly during difficult cases.", dg("Testing the correction", D.flow(["Delegation|clarified", "Capability|assessed", "Behaviour|observed", "Outcome|reviewed"]), "A proposed correction should be evaluated through observed decisions and process performance.")],
        ["The sponsor should monitor adoption alongside the frequency and causes of alternative operating paths.", null],
        ["This evidence would show whether the retailer increasingly follows its intended process without neglecting customers needing assistance.", st("Successful change requires genuine adoption while preserving appropriate support for legitimate exceptions.")],
        ["Qasr faces the same decision when one pilot property restores a permanent desk after the arrival redesign.", null],
        ["Its sponsor must distinguish observed operating evidence from assumptions about employee motivation and service requirements.", null],
        ["The objective is not eliminating every alternative path but removing unnecessary departures from the intended process.", q("How would you defend a decision about the manual counter without claiming that every customer's reason for using it is known?")]
      ]
    }
  ]
},
{
  title: "The handover and the next phase",
  sec: "W10O3e",
  lines: [
    ["We have reached the end of Qasr's People-phase investigation, and the sponsor now understands what must change.", t("The handover and the next phase", "Turning the People-phase findings into organisational readiness and preparing for Develop.")],
    ["The redesigned arrival process needs more than functioning kiosks and employees carrying the new Guest Host title.", null],
    ["It needs organisational arrangements that allow people to perform the intended work consistently and with appropriate judgement.", st("The People phase prepares the organisation to perform the redesigned process, not merely to acknowledge its existence.")],
    ["Imagine the sponsor asking what Qasr should carry forward before the programme moves deeper into development and implementation.", null],
    ["The answer begins with role definitions that accurately describe the responsibilities created by the redesigned arrival process.", dg("The People-phase handover", D.flow(["Redesigned|process", "Defined|roles", "Documented|authority", "Aligned|measures", "Assessed|capability"]), "The People phase produces organisational arrangements that support the redesigned process.")],
    ["For Guest Hosts, those definitions must explain how employees support arrivals and resolve exceptions that kiosks cannot handle.", null],
    ["They must also clarify accountability because cross-functional decisions become unreliable when responsibility and ownership remain confused.", st("Updated role definitions and job descriptions should reflect the redesigned process and its accountability arrangements.")],
    ["The handover also needs documented delegated authority, including the permitted AED 400 waiver for eligible rate discrepancies.", null],
    ["That authority should be supported by an escalation route for situations exceeding the employee's approved decision boundary.", dg("From responsibility to usable authority", D.flow(["Guest Host|responsibility", "Formal|delegation", "Appropriate|decision", "Defined|escalation"]), "Documented authority allows employees to act within agreed limits while preserving appropriate escalation.")],
    ["Without this arrangement, Qasr risks continuing the defensive referrals that undermine the intended guest experience.", null],
    ["Performance measures and reward arrangements must also support the redesigned responsibilities rather than conventional front-desk transactions.", cmp("The required measurement change", "Inherited objectives", "Check-ins completed per shift and average transaction time.", "Redesigned contribution", "Appropriate exception resolution supported by decision-quality safeguards.")],
    ["The People phase should therefore provide revised measures that recognise outcomes employees can reasonably influence.", null],
    ["Conflicting old objectives must be removed because they can continue rewarding behaviour the redesign intended to replace.", st("Revised measures and reward arrangements should reinforce the intended process rather than preserve contradictory incentives.")],
    ["Qasr also needs a capability plan that identifies learning requirements and tests employees through realistic guest exceptions.", null],
    ["All twenty-two Guest Hosts attended induction, but that attendance does not establish their ability to exercise judgement.", dg("From training to demonstrated readiness", D.flow(["Induction|attended", "Realistic|practice", "Capability|assessed", "Gaps|addressed"]), "The capability plan must provide evidence of performance rather than relying solely on training attendance.")],
    ["The programme should assess decisions within delegated authority and recognise when additional managerial support is necessary.", null],
    ["That evidence matters because untested capability can remain hidden behind reassuring project milestones and green status reports.", iss("Completed training activities do not demonstrate that employees can perform the redesigned process reliably.", "Readiness must be evidenced")],
    ["The handover also requires an adoption measure with a named owner responsible for reporting actual operating behaviour.", null],
    ["Qasr's observed kiosk adoption is sixty-five percent at week eleven, leaving important questions about alternative operating paths.", dg("Adoption requires ownership", D.flow(["Weekly|adoption", "Exceptions|classified", "Owner|reports", "Sponsor|reviews"]), "A named owner should monitor adoption and help coordinate responses to persistent operating problems.")],
    ["The twenty-nine percent desk-handled share needs investigation because kiosk-rejected guests may legitimately require human assistance.", null],
    ["A reinstated permanent desk could protect service continuity or preserve unnecessary old practices, depending on actual cases.", st("Adoption analysis must distinguish necessary exception handling from avoidable departures from the redesigned process.")],
    ["These outputs support later implementation, value realisation and sustainable performance because organisational readiness shapes operational results.", null],
    ["They must also remain coordinated with technology development so systems support the decisions employees are expected to make.", dg("People and Develop working together", D.flow(["People|requirements", "Technology|requirements", "Coordinated|design", "Operational|readiness"]), "Roles and technology must be developed together rather than treated as unrelated programme activities.")],
    ["This brings us to the next framework phase, Develop, which occupies position seven after People.", null],
    ["Develop concerns building what has been designed and deciding how much technology to buy, configure or build.", st("The next phase is Develop, where the programme turns its approved design into supporting technical and operational components.")],
    ["The phases remain connected because changing technology requirements can reveal additional responsibilities or capability needs.", null],
    ["Likewise, unclear employee authority can expose decisions that the supporting systems must recognise and control.", cmp("Two connected design questions", "People", "Who performs the work, with what authority, capability and incentives?", "Develop", "What supporting components must be built, configured or acquired?")],
    ["Before leaving Week 10, you will apply this reasoning to an unfamiliar organisation through the discussion forum.", null],
    ["The forum case is called The Role That Was Never Designed, and it includes an accompanying exhibit.", dg("The Week 10 forum challenge", D.flow(["Read|case and exhibit", "Develop|reasoning", "Post|response", "Challenge|peers"]), "The forum asks learners to transfer People-phase reasoning to an organisation outside the Qasr case.")],
    ["Your task is to design an appropriate role and explain how its performance measures could influence employee behaviour.", null],
    ["Use the actual forum case and exhibit rather than assuming its circumstances resemble Qasr in every detail.", st("A defensible forum response must apply the People-phase concepts to the evidence supplied in the unfamiliar case.")],
    ["The delivery plan asks for a substantive initial contribution by mid-week before engaging with classmates' reasoning.", null],
    ["You should respond meaningfully to at least two peers, including a reasoned disagreement that challenges or extends an argument.", dg("Constructive academic discussion", D.flow(["Your|analysis", "Peer|argument", "Evidence-based|challenge", "Stronger|reasoning"]), "Constructive disagreement should use case evidence and BPM concepts rather than merely express approval or opposition.")],
    ["Support your reasoning with Jeston's Chapter 18 and read the facilitator's summary at the end of the week.", null],
    ["The activity is formative and contributes to the participation assessment scheduled for Week 14.", st("The forum develops applied judgement and contributes to Assessment 4, Participation, in Week 14.")],
    ["As we close, remember that Qasr's proposed corrections remain recommendations until implementation and operating evidence demonstrate improvement.", null],
    ["The People phase succeeds when responsibilities, authority, incentives and capability make the redesigned process genuinely performable.", q("When Qasr enters Develop, what evidence would convince you that its people arrangements are ready to support the new process?")]
  ],
  review: [
    {
      title: "The hospital preparing its digital discharge handover",
      lines: [
        ["Let's revisit the People-phase handover through a hospital preparing to develop a redesigned digital discharge service.", t("Remedial · Preparing a credible handover", "A hospital discharge example shows how organisational requirements must accompany technology development.")],
        ["The hospital wants patients to leave safely without waiting for disconnected administrative activities across several departments.", null],
        ["Its redesigned process uses shared information and a discharge coordinator to manage outstanding requirements before departure.", dg("The redesigned discharge journey", D.flow(["Discharge|approved", "Requirements|coordinated", "Exceptions|resolved", "Patient|leaves"]), "The new process combines digital coordination with human judgement when exceptions arise.")],
        ["The technology team is ready to develop the supporting system, but the programme sponsor questions organisational readiness.", null],
        ["A working application cannot guarantee success if employees lack clear responsibilities or authority to resolve operational problems.", iss("The system may support the redesigned workflow while organisational arrangements still prevent employees from performing it.", "An incomplete handover")],
        ["The hospital therefore needs role definitions describing what discharge coordinators do and which decisions remain with clinical professionals.", null],
        ["Those definitions should connect with accountability arrangements so employees understand how responsibilities cross departmental boundaries.", st("Role definitions and accountability must reflect the redesigned process rather than preserve outdated departmental assumptions.")],
        ["The organisation must also document which operational adjustments coordinators may authorise and when specialist approval remains necessary.", null],
        ["Otherwise, employees might repeatedly refer straightforward issues upward despite the redesigned process's intention to reduce delays.", dg("Documented decision boundaries", D.flow(["Issue|identified", "Authority|checked", "Local|resolution", "Specialist|escalation"]), "Clear delegation distinguishes appropriate local decisions from situations requiring further approval.")],
        ["Now imagine coordinators remaining evaluated according to the number of administrative records they complete each shift.", null],
        ["That measure could discourage them from spending time resolving complicated problems that delay patients' departure.", cmp("The measurement handover", "Old objective", "Administrative records completed during a shift.", "Redesigned contribution", "Appropriate resolution of discharge obstacles with necessary quality safeguards.")],
        ["The hospital should replace contradictory measures and review whether rewards reflect the redesigned responsibilities.", null],
        ["Employees also need realistic training that develops coordination and judgement rather than merely demonstrating the system interface.", st("Capability must be demonstrated through appropriate decisions, not inferred from attendance at software training.")],
        ["A practical assessment could examine how coordinators handle missing information while respecting clinical decision boundaries.", null],
        ["The programme should then assign someone responsibility for measuring whether actual discharges follow the redesigned process.", dg("The complete people handover", D.flow(["Roles|defined", "Authority|documented", "Measures|aligned", "Capability|assessed", "Adoption|owned"]), "The People phase provides organisational requirements and readiness evidence for later implementation.")],
        ["This adoption evidence would reveal whether departments continue relying on disconnected records or unnecessary informal arrangements.", null],
        ["The technology team can then develop supporting components around clearly defined responsibilities and decision requirements.", st("People and technology development must remain coordinated because the redesigned process depends on both.")],
        ["Notice that the handover does not mean people-related work ends when technical development begins.", null],
        ["New technical discoveries may require additional training, revised responsibilities or changes to operational support arrangements.", null],
        ["This is the same principle guiding Qasr as its People phase connects with Develop.", q("Why should the hospital clarify responsibilities and decision authority before treating its digital discharge design as ready for development?")]
      ]
    },
    {
      title: "The retailer taking its redesigned returns process into development",
      lines: [
        ["Now imagine an online retailer preparing to develop the technology supporting its redesigned customer returns process.", t("Remedial · Connecting People with Develop", "A returns redesign illustrates why role requirements must guide technology development and later adoption.")],
        ["The proposed process allows routine returns to receive automatic decisions while specialists handle unusual customer circumstances.", null],
        ["Management wants the technology team to begin building the workflow, but several employee responsibilities remain unclear.", dg("The intended returns process", D.flow(["Return|requested", "Automatic|assessment", "!Exception|identified", "Specialist|resolves"]), "Automation handles routine returns while employees investigate exceptions requiring judgement.")],
        ["The specialists are expected to approve certain exceptions, yet the organisation has not documented their decision authority.", null],
        ["Their performance measures also continue rewarding transaction volume rather than appropriate resolution of complicated cases.", iss("The redesigned process requires new decisions, but authority and performance expectations still reflect the previous work.", "People requirements remain incomplete")],
        ["Imagine developers asking which refund amounts specialists may approve without requesting additional managerial permission.", null],
        ["Without a documented decision boundary, the team cannot confidently configure approval controls around the intended responsibilities.", q("Why does unclear employee authority create a technology-development problem rather than only a human-resources problem?")],
        ["The answer is that software must support the decisions employees are authorised to make during the redesigned process.", null],
        ["The retailer should therefore clarify delegation before finalising the workflow's approval and escalation arrangements.", st("People requirements and technology requirements must be designed together because each constrains the other.")],
        ["The role specification should also describe how specialists investigate exceptions and communicate outcomes to customers.", null],
        ["Those responsibilities help developers understand which information employees need when making appropriate decisions.", dg("From role requirements to system support", D.flow(["Defined|responsibility", "Required|information", "Decision|controls", "Supported|workflow"]), "The supporting technology should reflect the work and decision boundaries defined by the redesigned role.")],
        ["The organisation must then revise performance measures so specialists are not penalised for handling difficult returns.", null],
        ["A useful measure could recognise eligible exceptions resolved appropriately while including a quality review of decisions.", cmp("Aligning the new role", "Conflicting old objective", "Maximise the number of returns processed each hour.", "Relevant new objective", "Resolve eligible exceptions appropriately while protecting decision quality.")],
        ["The old objective should be removed where it contradicts the work expected under the redesigned process.", null],
        ["Specialists also need realistic practice applying refund rules and recognising cases that exceed their delegated authority.", st("Capability assessment should demonstrate that employees can exercise the judgement required by the redesigned workflow.")],
        ["Training attendance alone cannot establish readiness because employees may operate the interface without understanding appropriate decisions.", null],
        ["The programme should therefore test realistic cases and provide targeted support when capability gaps become visible.", dg("Preparing employees for implementation", D.flow(["Practise|cases", "Assess|judgement", "Address|gaps", "Support|operation"]), "Readiness depends on demonstrated capability rather than completion of scheduled training activities.")],
        ["After launch, the retailer must measure whether actual returns follow the intended automated and specialist-supported paths.", null],
        ["Alternative manual handling should be classified because some cases may genuinely require assistance while others reveal workarounds.", iss("Manual activity cannot automatically be classified as resistance without investigating why customers and employees use that path.", "Adoption requires interpretation")],
        ["A named adoption owner should report these patterns so the programme can coordinate necessary corrective action.", null],
        ["This creates a practical connection between the People phase, implementation and the eventual realisation of process benefits.", st("The People phase supplies roles, authority, measures, capability and adoption ownership needed for sustainable process performance.")],
        ["The same reasoning applies to Qasr as its programme moves from People into the Develop phase.", null],
        ["Develop will address what supporting components should be built, configured or acquired for the approved process design.", null],
        ["Those decisions must remain consistent with the organisational arrangements employees need to perform their redesigned responsibilities.", q("What would go wrong if the retailer developed its approval workflow before deciding which exceptions specialists may authorise?")]
      ]
    }
  ]
},
      ] },
    ]
  };

  // Claude review fixes (original line indices): sentence replacements, then removals in descending order.
  const FIX = [["W10O1a",-1,3,"That experience led Qasr to investigate its guest arrival process and design a better way of serving guests."],["W10O1c",-1,21,"Its roles include the process owner, front desk lead, IT, revenue manager and chief operating officer."],["W10O1c",-1,22,"The activities include defining the process standard, approving the redesign, building the workflow, training the team, monitoring performance and escalating exceptions."],["W10O2b",-1,7,"This is the problem Qasr faces, because its Guest Hosts inherited annual performance objectives set in January."],["W10O2c",-1,33,"Notice how each element reinforces the others, because changing one alone can recreate old behaviour."],["W10O3a",-1,34,"That is why the slides treat capability test results as a project risk, not an HR matter."],["W10O3b",-1,22,"Its adoption curve rises steeply before levelling near sixty-five percent, while workaround use peaks early and settles near nine percent."],["W10O3c",-1,1,"Now let\u0027s consider something less visible than kiosk adoption, but just as important."],["W10O3e",-1,26,"The phases stay connected, because unclear employee authority can expose decisions that systems must recognise and control."],["W10O2c",1,1,"The new software approves routine returns automatically, leaving employees with unusual or disputed cases."],["W10O2c",1,3,"However, nobody has revised the job descriptions or documented which refund decisions specialists may approve."],["W10O3a",1,20,"This applies directly to Qasr\u0027s nine Guest Hosts who refer every rate discrepancy, for reasons not yet established."],["W10O3e",1,3,"Specialists are expected to approve certain exceptions, yet the organisation has not documented their decision authority."]];
  const CUT = [["W10O1a",-1,4],["W10O2c",-1,27],["W10O2c",1,19],["W10O2c",1,16],["W10O2d",-1,18],["W10O2d",-1,3],["W10O2d",1,22],["W10O2d",1,20],["W10O2d",1,1],["W10O3a",-1,30],["W10O3a",-1,24],["W10O3a",1,21],["W10O3a",1,14],["W10O3b",-1,29],["W10O3b",-1,17],["W10O3b",1,19],["W10O3b",1,17],["W10O3b",1,7],["W10O3c",-1,29],["W10O3c",1,15],["W10O3c",1,11],["W10O3c",1,1],["W10O3d",-1,13],["W10O3d",-1,9],["W10O3d",-1,7],["W10O3e",-1,35],["W10O3e",-1,25],["W10O3e",-1,11],["W10O3e",-1,5],["W10O3e",1,15],["W10O3e",1,11],["W10O3e",1,1]];
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
