// OPER621 Business Process Management - Week 10
// Topic: The People Phase - Framework Phase 6.
// Author: Prof. Bassem Jarboui
//
// RUNNING CASE
// Qasr Hospitality Group - The Guest Host.
// Four pilot properties introduce a redesigned guest arrival process.
// Twenty-two former Front Desk Agents become Guest Hosts.
// The role combines guest assistance with kiosk exception resolution.
//
// OFFICIAL COURSE LEARNING OUTCOMES
// K3 - Assess the importance of change management in relation to BPM
//      and devise solutions to minimize employees' resistance.
// S3 - Coordinate people and the change process in organizations
//      to achieve BPM objectives.
//
// WEEKLY LEARNING OUTCOMES
// O1 - Assess the contribution of the People phase to delivering process change.
// O2 - Design roles, measures and incentives aligned to the new process.
// O3 - Coordinate people through the change process to achieve BPM objectives.
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
// LESSON PLAN
// l1 - The design is not the work
//   W10O1a - A process redesign changes people's jobs
//   W10O1b - What the People phase must deliver
//   W10O1c - Who does the work, and who answers for it?
// l2 - The Guest Host's impossible job
//   W10O2a - Authority without ambiguity
//   W10O2b - When the old measure defeats the new design
//   W10O2c - Designing a role people can actually perform
// l3 - Capability is more than attendance
//   W10O3a - Training for judgement, not just buttons
//   W10O3b - One organisation, two processes
//   W10O3c - The knowledge the redesign might lose
// l4 - Making the people design real
//   W10O2d - Repairing the Guest Host specification
//   W10O3d - The eleven-week decision
//   W10O3e - The handover and the next phase
//
// SOURCE INTEGRITY
// Observed kiosk adoption: 65% at week eleven.
// Desk-handled arrivals: 29%; not all are necessarily workarounds.
// Nine of twenty-two Guest Hosts refer every rate discrepancy upward.
// AED 400 waiver authority is absent from formal delegation.
// Updated job descriptions arrived three weeks after go-live.
// Existing objectives still reward check-in volume and speed.
// Two Guest Hosts resigned; individual motives are unknown.
// One pilot property reinstated a permanent desk.
// All twenty-two Guest Hosts attended a four-hour induction.
// No post-induction capability assessment was conducted.
// Green people-workstream status reflects induction attendance.
// Sixteen-week adoption curves are illustrative, not Qasr observations.
//
// FRAMEWORK CONTINUITY
// People: phase 6; Develop: phase 7; Implement: phase 8.
// Realize Value: phase 9; Sustainable Performance: phase 10.
// People and Develop remain coordinated.
// Project management, change management and leadership are continuous.
//
// CONTENT CONTRACT
// Four lessons, three sections each, two remedial lessons per section.
// Every narration line is [sentence, moment].
// Null retains the previous visual.
// Questions, section IDs, CLO mappings and voice code remain unchanged.
// Motion is optional and must not block narration.
// The four looks retain their own colours, fonts and layouts.
 
(() => {
  "use strict";
 
  const D = window.DIAG;
 
  const t = (kicker, text, count) =>
    ({ type: "title", kicker, text, count });
 
  const it = (n, of, icon, title, text) =>
    ({ type: "item", n, of, icon, title, text });
 
  const q = text =>
    ({ type: "question", text });
 
  const st = text =>
    ({ type: "statement", text });
 
  const iss = (text, effect) =>
    ({ type: "issue", text, effect });
 
  const cmp = (side, label, note, dir) =>
    ({ type: "compare", side, label, note, dir });
 
  const dg = (kicker, svg, caption) =>
    ({ type: "diagram", kicker, svg, caption });
 
  const fm = (label, num, den) =>
    ({ type: "formula", label, num, den });
 
  window.MOMENT_KIT = { t, it, q, st, iss, cmp, dg, fm };
 
  window.COURSE = {
    id: "oper621-w10",
    code: "OPER621",
    title: "Week 10 — The People Phase: Roles, Measures and Capability",
    subtitle: "Business Process Management \u00b7 Week 10",
    author: "Prof. Bassem Jarboui",
    teacher: {
      name: "Prof. Bassem Jarboui",
      email: "",
      sendReport: false
    },
    lessons: [
      {
        id: "l1",
        title: "The design is not the work",
        sections: [
          {
            title: "A process redesign changes people's jobs",
            sec: "W10O1a",
            lines: [
              ["Welcome to Week 10. At Qasr Hospitality Group, the redesigned arrival process looks promising, but a diagram cannot welcome a guest.", t("OPER621 - Week 10", "The People Phase: making redesigned work real.")],
              ["Remember the exhausted traveller whose arrival exposed problems across several departments? That experience started our improvement journey.", dg("The arrival that exposed the problem", D.flow(["Guest|arrives", "Booking|checked", "Rate|disputed", "!Room not|ready"]), "One difficult arrival revealed failures across departmental boundaries.")],
              ["Qasr now has a better process design. The question is whether its employees can actually deliver it.", st("A better process diagram does not automatically create better work.")],
              ["Imagine the new kiosks operating perfectly while employees continue sending difficult cases through the old approval chain.", iss("Technology changes, but familiar handoffs remain.", "The design is not the work")],
              ["The guest would still experience delays, because the organisation has changed its technology without changing the decisions people make.", null],
              ["At four pilot properties, twenty-two former Front Desk Agents have become Guest Hosts, supporting arrivals and handling kiosk exceptions.", dg("The redesigned guest arrival", D.flow(["Guest|arrives", "Self-service|kiosk", "!Exception|identified", "Guest Host|assists", "Arrival|continues"]), "The new process combines automated check-in with human judgement.")],
              ["Watch how the work changes. Routine transactions move towards the kiosk, while complex exceptions move towards the employee.", cmp("a", "Front Desk Agent", "Conventional desk transactions and routine check-ins.", "down")],
              ["The Guest Host now needs judgement, coordination and clear authority rather than simply greater transaction speed.", cmp("b", "Guest Host", "Guest assistance, exception investigation and appropriate resolution.", "up")],
              ["Consider a traveller whose confirmed corporate rate differs from the kiosk's displayed amount.", dg("A rate discrepancy", D.flow(["Corporate|booking", "!Rate|discrepancy", "Guest Host|investigates", "Decision|required"]), "The redesigned role must handle exceptions that automation cannot resolve.")],
              ["The Guest Host has been told that eligible discrepancies up to AED 400 may be waived without managerial referral.", dg("The local decision boundary", D.flow(["Rate|discrepancy", "Check|eligibility", "Within|AED 400?", "Appropriate|decision"]), "The case describes limited waiver authority, not unrestricted discretion.")],
              ["Yet a new title does not guarantee that employees understand their authority or feel organisationally supported when exercising it.", q("Would you make the waiver decision confidently if your formal authority remained unclear?")],
              ["An employee might refer the case upward, not because they reject change, but because the organisation has left uncertainty unresolved.", iss("Expected independence conflicts with unclear organisational support.", "A people-design problem")],
              ["That brings us to phase six of the BPM framework: People, which follows Innovate and prepares the redesigned work for implementation.", dg("The People phase", D.route([5]), "People is framework phase six, following Innovate.")],
              ["The framework then continues through Develop, Implement, Realize Value and Sustainable Performance, but these activities must remain coordinated.", st("BPM phases guide connected work rather than isolated departmental projects.")],
              ["People and Develop are especially connected, because technology must support the decisions employees are expected to make.", dg("People and technology develop together", D.flow(["Redesigned|process", "People|requirements", "Technology|support", "Reliable|operation"]), "Organisational responsibilities and supporting systems must fit together.")],
              ["For example, a kiosk cannot resolve an exception successfully if nobody knows who owns the decision when the kiosk stops.", null],
              ["The People phase therefore examines responsibilities, accountability, authority, capability, performance measures and the incentives shaping daily behaviour.", dg("Making the redesign performable", D.flow(["Clear|roles", "Decision|authority", "Practical|capability", "Aligned|measures", "Reliable|performance"]), "The People phase aligns organisational arrangements with the redesigned process.")],
              ["These elements reinforce each other. Employees need permission to decide, the ability to decide well, and measures that reward appropriate decisions.", st("Roles, authority, capability and incentives must support the same process.")],
              ["Project management, people change management and leadership also continue throughout the framework, because organisational change cannot be confined to one phase.", null],
              ["When these arrangements remain unchanged, the old process can quietly return even after management approves a new design.", iss("Old organisational arrangements recreate old operating behaviour.", "The redesign unravels")],
              ["This week, we will investigate Qasr's Guest Host role and discover why apparently sensible changes can produce disappointing results.", null],
              ["Our challenge is to make the redesigned guest experience dependable, not merely attractive on a process diagram.", q("What must change around the Guest Host so the redesigned process becomes everyday reality?")]
            ],
            review: [
              {
                title: "The hospital discharge that changed everyone's job",
                lines: [
                  ["Imagine a hospital redesigning discharge so patients can leave promptly after treatment finishes.", t("Another way to understand the People phase", "A hospital discharge redesign changes more than the workflow.")],
                  ["Its new digital system coordinates outstanding requirements instead of leaving departments to work through disconnected procedures.", dg("The redesigned discharge", D.flow(["Discharge|approved", "Requirements|coordinated", "Patient|prepared", "Departure|completed"]), "A coordinated discharge process replaces fragmented departmental activity.")],
                  ["Managers expect shorter waits, but the new diagram does not explain who resolves disagreements between departments.", q("Who should coordinate a discharge when several departments disagree about readiness?")],
                  ["A discharge coordinator receives responsibility for resolving delays, yet cannot authorise changes belonging to other professional roles.", iss("The coordinator owns the delay but lacks some necessary decision rights.", "Responsibility without authority")],
                  ["Patients continue waiting while managers exchange calls, even though the digital system works correctly.", null],
                  ["The problem is organisational: technology cannot compensate for unclear responsibilities and decision boundaries.", st("A functioning system does not guarantee a functioning process.")],
                  ["The hospital must define the coordinator's work while preserving clinical decisions for appropriately authorised professionals.", cmp("a", "Discharge coordinator", "Coordinates departure requirements and operational dependencies.", "up")],
                  ["Clinical professionals remain accountable for decisions requiring their professional authority and judgement.", cmp("b", "Clinical professionals", "Retain responsibility for clinical decisions and safeguards.", "up")],
                  ["Clear boundaries protect patients because faster coordination must never bypass essential clinical controls.", null],
                  ["The coordinator also needs realistic practice handling exceptions rather than simply learning the digital system.", dg("Preparing the coordinator", D.flow(["Define|responsibility", "Clarify|authority", "Practise|exceptions", "Assess|capability"]), "Role clarity and demonstrated capability support dependable discharge.")],
                  ["Performance measures should recognise successful coordination, not merely count the records processed during a shift.", st("Measures must reflect the redesigned contribution.")],
                  ["Otherwise, complicated discharges may appear unproductive even when the coordinator prevents a long patient delay.", iss("Transaction volume rewards easy records over difficult coordination.", "The wrong incentive")],
                  ["This resembles Qasr, where technology changes the work remaining for employees.", null],
                  ["Both organisations need roles, authority, capability and measures that support the intended process.", st("The People phase makes redesigned responsibilities practically achievable.")],
                  ["The lesson is simple: a process describes the desired journey, but organisational arrangements determine whether employees can deliver it.", q("Why must jobs change when a workflow changes, even if the technology works perfectly?")]
                ]
              },
              {
                title: "The online retailer that automated the easy work",
                lines: [
                  ["Imagine an online retailer automating straightforward customer returns to make refunds faster.", t("Another way to understand redesigned work", "Automation changes the work that remains for people.")],
                  ["Software now approves routine returns, while employees investigate damaged products, disputed information and unusual circumstances.", dg("The redesigned returns process", D.flow(["Return|requested", "Automatic|check", "Routine|approval", "!Complex|exception", "Specialist|resolution"]), "Automation handles routine work while employees handle exceptions.")],
                  ["The employee's job becomes more demanding because easy cases disappear from the manual workload.", st("Automation can increase the judgement required from remaining employees.")],
                  ["Imagine a customer disputing a refund after receiving a damaged product with conflicting delivery information.", null],
                  ["The software cannot decide whether the circumstances justify an exception, so an employee must investigate.", q("What would help this employee decide fairly without referring every difficult case to management?")],
                  ["The employee needs clear authority, practical guidance and an escalation route for cases beyond delegated limits.", dg("Supporting human judgement", D.flow(["Complex|case", "Evidence|reviewed", "Authority|checked", "Decision|made"]), "Clear decision rights support the work automation leaves behind.")],
                  ["Without these arrangements, the new system may reproduce the same approval delays it was intended to remove.", iss("Automation removes routine checking, but unclear authority preserves referrals.", "The old delay returns")],
                  ["Now imagine management continuing to measure employees by the number of returns processed per hour.", null],
                  ["Complex investigations take longer, so employees may appear less productive precisely when they provide more valuable service.", cmp("a", "Old measure", "Returns processed per hour.", "down")],
                  ["The redesigned contribution requires appropriate resolution of difficult returns, supported by decision-quality checks.", cmp("b", "New contribution", "Resolve complex returns fairly and within authority.", "up")],
                  ["The retailer should replace conflicting measures and provide realistic practice with unusual cases.", dg("Aligning people with automation", D.flow(["Defined|decisions", "Practical|training", "Relevant|measures", "Reliable|service"]), "Human judgement requires organisational support.")],
                  ["It must also clarify when specialists need assistance, because independence does not mean unlimited authority.", null],
                  ["Qasr faces the same challenge when kiosks handle routine arrivals and Guest Hosts inherit difficult exceptions.", st("Technology and employee roles must be designed together.")],
                  ["Installing automation changes which activities remain for people, so existing responsibilities cannot simply stay unchanged.", null],
                  ["The real redesign succeeds when employees can perform the work that automation leaves behind.", q("How should employee responsibilities change when software handles routine cases but people resolve exceptions?")]
                ]
              }
            ]
          },
          {
            title: "What the People phase must deliver",
            sec: "W10O1b",
            lines: [
              ["Qasr's sponsor now asks a practical question: what evidence would show that Guest Hosts are ready for their redesigned work?", t("Week 10 - The People Phase", "What must the organisation deliver?")],
              ["A new title and functioning kiosks are not enough, because neither proves employees can handle real exceptions.", q("What would convince you that Qasr is operationally ready?")],
              ["The People phase must deliver concrete arrangements: defined roles, decision authority, aligned measures, demonstrated capability and accountable adoption tracking.", st("Readiness requires evidence, not simply completed project activities.")],
              ["Start with the twenty-two employees who moved from Front Desk Agent positions into Guest Host roles.", dg("The redesigned Guest Host role", D.flow(["Guest|arrives", "Kiosk|processes", "!Exception|identified", "Guest Host|resolves"]), "The Guest Host supports arrivals and handles exceptions requiring human judgement.")],
              ["Their job description should explain the work, its boundaries, reporting relationships and expected contribution to guest service.", it(1, 5, "users", "Define the role", "Describe responsibilities, boundaries, reporting and expected outcomes.")],
              ["This matters because an unclear role encourages employees to return to responsibilities they understood before the redesign.", null],
              ["Changed judgement and accountability also justify reviewing job grades and rewards, although any adjustment requires proper evaluation.", st("Material changes in work require a justified review of employment arrangements.")],
              ["Next comes decision authority, because employees cannot perform independently when the necessary permissions remain uncertain.", it(2, 5, "key", "Document authority", "Specify permitted decisions and escalation beyond delegated limits.")],
              ["At Qasr, eligible rate discrepancies up to AED 400 may be waived, but that permission must be reflected in formal delegation.", dg("Making delegation usable", D.flow(["New|responsibility", "Decision|required", "Formal|authority", "Escalation|boundary"]), "Documented authority must support the decisions assigned to employees.")],
              ["A briefing alone cannot provide the same dependable organisational protection as an approved decision boundary.", iss("Expected decisions remain unclear in formal authority arrangements.", "Undocumented delegation")],
              ["Now examine performance measures. The previous role rewarded check-ins completed and average transaction speed.", cmp("a", "Previous objectives", "Conventional check-in volume and transaction speed.", "down")],
              ["The redesigned role instead needs recognition for appropriate guest assistance and exception resolution.", cmp("b", "Redesigned contribution", "Effective resolution of eligible exceptions with quality safeguards.", "up")],
              ["This is the third deliverable: measures and incentives that reward the work employees are actually expected to perform.", it(3, 5, "gauge", "Align measures", "Reward intended outcomes while protecting decision quality.")],
              ["Otherwise, employees may perform valuable exception work while appearing unsuccessful against inherited transaction targets.", iss("The new job and old scorecard reward different behaviours.", "Conflicting incentives")],
              ["The fourth deliverable concerns capability, because a new responsibility does not automatically create the skill to perform it.", it(4, 5, "brain", "Demonstrate capability", "Practise realistic cases and assess appropriate decisions.")],
              ["Guest Hosts must investigate unusual situations, apply judgement and recognise when managerial escalation is necessary.", dg("Building capability", D.flow(["Identify|skill gaps", "Practise|real cases", "Assess|judgement", "Support|performance"]), "Capability must be demonstrated through realistic decisions.")],
              ["Attendance records show participation, but they do not establish whether an employee can resolve a difficult guest exception.", st("Training attendance is not evidence of demonstrated decision capability.")],
              ["Finally, Qasr needs adoption evidence showing whether real arrivals follow the redesigned process.", it(5, 5, "chart", "Track adoption", "Assign an owner to measure use and investigate alternative paths.")],
              ["Someone must own that measure, explain deviations and coordinate corrective action when operating behaviour differs from the design.", dg("From readiness to adoption", D.flow(["Role|defined", "Authority|documented", "Capability|assessed", "Adoption|measured", "Owner|accountable"]), "People-phase outputs connect organisational readiness with actual process use.")],
              ["These deliverables must also connect with Develop, because technology and organisational responsibilities need to support the same operating design.", st("People and Develop remain coordinated throughout implementation.")],
              ["The sponsor should therefore ask for evidence of readiness, not simply a collection of approved documents.", null],
              ["Together, these outputs turn a promising redesign into work that employees can perform consistently.", q("Which missing People-phase deliverable would most seriously prevent Guest Hosts from doing their new jobs?")]
            ],
            review: [
              {
                title: "The airport that redesigned boarding but forgot the gate team",
                lines: [
                  ["Imagine an airport introducing automated boarding checks while asking gate agents to resolve unusual travel-document problems.", t("Remedial - People-phase deliverables", "Airport boarding shows why organisational arrangements matter.")],
                  ["Routine passengers pass through automated gates, leaving employees to investigate exceptions requiring human judgement.", dg("The redesigned boarding process", D.flow(["Passenger|arrives", "Automatic|check", "!Exception|identified", "Gate agent|assists", "Boarding|continues"]), "Automation handles routine boarding while employees investigate exceptions.")],
                  ["However, management leaves the old job descriptions and performance objectives unchanged.", iss("Technology changes, but formal employee responsibilities do not.", "An incomplete redesign")],
                  ["An agent encounters an unusual document and cannot determine whether local approval is permitted.", q("Which People-phase deliverable would clarify this decision?")],
                  ["Documented delegation should specify which decisions agents may make and when supervisory approval remains necessary.", st("Authority establishes permission; role definitions establish responsibility.")],
                  ["The revised role must also explain how exception handling fits into the agent's work.", null],
                  ["Now imagine the airport continuing to reward passengers processed per minute.", cmp("a", "Old objective", "Maximise passenger throughput.", "down")],
                  ["That measure may discourage the careful investigation required by difficult boarding exceptions.", cmp("b", "Redesigned contribution", "Resolve eligible exceptions accurately without unnecessary delay.", "up")],
                  ["The airport therefore needs outcome measures that recognise appropriate exception resolution while protecting decision quality.", null],
                  ["Agents also need realistic practice because operating a scanner differs from interpreting an unusual document.", dg("Developing capability", D.flow(["Identify|new decisions", "Practise|exceptions", "Test|judgement", "Provide|support"]), "Practical assessment tests readiness for the redesigned work.")],
                  ["A capability assessment should establish whether employees can apply the rules rather than merely attend training.", st("Readiness requires demonstrated performance.")],
                  ["The airport must then measure how frequently passengers actually follow the redesigned boarding process.", null],
                  ["A named owner should investigate workarounds because successful installation does not prove successful adoption.", dg("Tracking adoption", D.flow(["Observe|boarding", "Record|alternative paths", "Investigate|causes", "Correct|weaknesses"]), "Adoption tracking connects the intended process with actual operating behaviour.")],
                  ["Roles, authority, measures, capability and adoption evidence address different problems but support the same passenger journey.", null],
                  ["The airport becomes ready when these arrangements work together, rather than when its equipment installation is complete.", q("What is missing if employees have new roles but cannot demonstrate the required decision capability?")]
                ]
              },
              {
                title: "The service centre that looked ready on paper",
                lines: [
                  ["Imagine a service centre celebrating its redesigned complaint process because the software is installed and everyone attended training.", t("Remedial - Evidence of readiness", "Completed activities do not automatically prove operational readiness.")],
                  ["The dashboard shows green, but frontline employees are now expected to resolve complaints previously handled by specialists.", st("Project completion and employee readiness are different achievements.")],
                  ["Their existing job descriptions still tell them to record complaints and transfer difficult cases.", dg("The responsibility gap", D.flow(["Complaint|received", "New process|expects resolution", "!Old role|requires transfer", "Customer|waits"]), "The intended process conflicts with the existing formal role.")],
                  ["Employees continue transferring cases because their responsibilities and decision authority have not changed together.", iss("The new process expects decisions the old role does not authorise.", "An organisational contradiction")],
                  ["The centre must define the revised responsibilities and formally delegate appropriate complaint decisions.", q("What happens when employees are accountable for resolutions they cannot formally authorise?")],
                  ["They may escalate defensively, because making an unauthorised decision can feel riskier than keeping the customer waiting.", st("Responsibility requires usable decision authority.")],
                  ["Now suppose managers still evaluate employees according to how quickly they close complaint records.", cmp("a", "Inherited expectation", "Close records quickly and transfer difficult cases.", "down")],
                  ["The redesigned process instead requires careful investigation and appropriate resolution of eligible complaints.", cmp("b", "Redesigned expectation", "Resolve appropriate complaints while maintaining decision quality.", "up")],
                  ["A revised scorecard should recognise outcomes employees can influence and protect against rushed or inappropriate decisions.", null],
                  ["Employees also need realistic practice handling ambiguous complaints and recognising the limits of their authority.", dg("Evidence of readiness", D.flow(["Role|defined", "Authority|documented", "Measures|aligned", "Capability|tested", "Adoption|tracked"]), "Operational readiness requires connected organisational evidence.")],
                  ["Training attendance cannot demonstrate this judgement, so managers should assess performance using realistic cases.", st("Capability must be tested, not assumed.")],
                  ["After launch, the centre should track whether complaints actually follow the redesigned process.", null],
                  ["A named owner must investigate repeated transfers and alternative operating paths rather than relying on green milestones.", iss("Completed project activities may conceal continued use of the old process.", "A misleading green status")],
                  ["This resembles Qasr, where a new title and completed induction cannot establish complete organisational readiness.", null],
                  ["The People phase succeeds when roles, authority, measures, capability and adoption evidence support the redesigned work.", q("Would you declare the service centre ready if everyone attended training but nobody tested decision-making capability?")]
                ]
              }
            ]
          },
          {
            title: "Who does the work, and who answers for it?",
            sec: "W10O1c",
            lines: [
              ["Now imagine a Guest Host facing a traveller whose confirmed corporate rate differs from the amount displayed at check-in.", t("Who does the work, and who answers for it?", "Making responsibility and accountability visible.")],
              ["The employee can investigate the discrepancy, but revenue policy and managerial authority may also be involved.", dg("A cross-functional decision", D.flow(["Guest|raises issue", "Guest Host|investigates", "Revenue|policy", "Decision|required"]), "One guest exception may involve several organisational functions.")],
              ["Without clear ownership, the guest may be passed between employees who each expect somebody else to decide.", iss("Several people contribute, but final decision ownership remains unclear.", "The accountability gap")],
              ["A RACI matrix helps by distinguishing four contributions: Responsible, Accountable, Consulted and Informed.", st("RACI makes cross-functional responsibility and accountability explicit.")],
              ["Responsible identifies the person performing an activity, such as the Guest Host investigating the disputed rate.", it(1, 4, "users", "Responsible", "Performs the activity and gathers the necessary evidence.")],
              ["The employee may investigate successfully without possessing authority over every policy decision arising from that investigation.", dg("Responsibility in action", D.flow(["Guest|reports issue", "Guest Host|investigates", "Evidence|prepared"]), "Performing an investigation does not automatically confer decision authority.")],
              ["Accountable identifies the role ultimately answerable for an activity's result or governing decision.", it(2, 4, "target", "Accountable", "Ultimately answers for the activity or decision.")],
              ["Each activity should have one clearly identified accountable role, even when several employees contribute to its completion.", st("One activity, one accountable owner.")],
              ["Imagine two managers both claiming final approval while disagreeing about how the exception should be handled.", iss("Competing accountable owners create conflicting instructions.", "Two owners, no clear decision")],
              ["The Guest Host could be left waiting for agreement while the traveller experiences another unnecessary delay.", null],
              ["Consulted identifies someone whose expertise informs the decision, such as a revenue manager advising on rate policy.", it(3, 4, "brain", "Consulted", "Provides knowledge or advice before a decision is completed.")],
              ["Consultation improves judgement, but it does not automatically transfer accountability to the person providing advice.", dg("Advice supports the decision", D.flow(["Guest Host|investigates", "Revenue manager|advises", "Decision owner|decides"]), "Consultation provides input without necessarily changing decision ownership.")],
              ["Informed identifies someone who receives relevant updates without necessarily participating in or approving the decision.", it(4, 4, "link", "Informed", "Receives information about progress, decisions or outcomes.")],
              ["A senior manager may need visibility of exception patterns without approving every individual guest case.", st("Keeping someone informed does not create another approval stage.")],
              ["Now picture Qasr's RACI matrix covering operational, technical, commercial and executive roles.", dg("Cross-functional roles", D.flow(["Process|owner", "Front|desk", "IT", "Revenue|manager", "COO"]), "The RACI exhibit connects roles across the redesigned arrival process.")],
              ["Activities include defining standards, approving redesign, building workflows, running operations, monitoring performance and escalating exceptions.", null],
              ["Each activity needs a clear accountable owner, because shared participation must not become shared ambiguity.", st("Cross-functional participation does not remove the need for one accountable role.")],
              ["For example, the workflow-building activity needs explicit accountability rather than an empty or ambiguous assignment.", dg("Making accountability visible", D.flow(["Workflow|requirements", "Responsible|builder", "Accountable|owner", "Approved|workflow"]), "The workflow-building activity needs both execution responsibility and clear accountability.")],
              ["The matrix should follow the redesigned process rather than simply reproduce the previous departmental hierarchy.", iss("Copying old organisational boundaries into RACI can preserve outdated handoffs.", "The old structure returns")],
              ["At Qasr, the Guest Host must know which exceptions can be resolved locally and which require escalation.", dg("The decision boundary", D.flow(["Guest Host|investigates", "Within|authority?", "Resolve|locally", "Escalate|when required"]), "Delegated authority determines which decisions can be made locally.")],
              ["Remember that RACI clarifies who owns activities, while formal delegation specifies which decisions employees may make.", cmp("a", "RACI", "Clarifies responsibility, accountability, consultation and information.", "up")],
              ["Delegation provides the authorised decision boundary, so both arrangements must support the same redesigned work.", cmp("b", "Formal delegation", "Specifies permitted decisions and escalation limits.", "up")],
              ["When they agree, employees can act appropriately without repeatedly searching for somebody willing to accept responsibility.", st("Clear accountability and usable authority support dependable decisions.")],
              ["Qasr's goal is to make every important handoff understandable before the guest encounters another avoidable delay.", q("Does investigating a discrepancy automatically make the Guest Host accountable for every related policy decision?")]
            ],
            review: [
              {
                title: "The supplier payment that nobody owned",
                lines: [
                  ["Imagine a company struggling to pay suppliers because several departments participate in every invoice.", t("Remedial - Understanding RACI", "Doing the work is different from owning its result.")],
                  ["Purchasing checks orders, warehouse employees verify deliveries and finance reviews payment.", dg("The supplier payment journey", D.flow(["Invoice|received", "Order|checked", "Delivery|verified", "Payment|reviewed", "Supplier|paid"]), "Several departments contribute to one end-to-end process.")],
                  ["A price discrepancy appears, but purchasing expects finance to decide while finance expects purchasing to resolve it.", iss("Two departments participate, but neither accepts final ownership.", "An accountability gap")],
                  ["The invoice remains unpaid because participation does not establish who ultimately answers for the decision.", st("RACI distinguishes performing work from accountability for its result.")],
                  ["A purchasing officer investigates the disputed price by comparing the invoice with the approved purchase order.", dg("Responsible means performing", D.flow(["Purchasing|investigates", "Documents|compared", "Difference|identified"]), "The responsible employee establishes the facts.")],
                  ["That officer is responsible for investigating, but another authorised role may be accountable for approving the final treatment.", null],
                  ["The organisation should identify exactly one accountable role for that approval activity.", q("Why would assigning two accountable managers make this decision less reliable?")],
                  ["Competing owners could issue contradictory instructions, leaving employees uncertain about which decision is final.", iss("Multiple accountable owners create conflicting approval directions.", "Conflicting ownership")],
                  ["Consulted employees provide expertise without automatically becoming accountable for the decision.", cmp("a", "Accountable", "Ultimately answers for the decision or activity.", "up")],
                  ["For example, warehouse staff may clarify the delivered quantity before finance completes its review.", cmp("b", "Consulted", "Provides relevant information and advice.", "up")],
                  ["An informed stakeholder receives an update after the decision without needing to approve another stage.", dg("Information without another approval", D.flow(["Decision|completed", "Relevant|update", "Stakeholder|informed"]), "Information does not necessarily create additional approval.")],
                  ["This distinction prevents unnecessary referrals and keeps the supplier payment process moving.", null],
                  ["The company should assign RACI roles around the redesigned payment journey rather than historical departmental boundaries.", st("Accountability should support the process, not preserve unnecessary handoffs.")],
                  ["Qasr faces the same challenge when Guest Hosts investigate rate discrepancies involving operational and revenue considerations.", null],
                  ["Clear responsibility, accountability and escalation allow employees to resolve problems without sending customers through organisational loops.", q("Why might the person investigating a problem differ from the person accountable for its final resolution?")]
                ]
              },
              {
                title: "The university enrolment decision",
                lines: [
                  ["Imagine a university redesigning enrolment so students no longer contact several offices separately about unusual cases.", t("Remedial - Coordinating across departments", "RACI prevents competing decision owners.")],
                  ["A student adviser now coordinates cases involving academic requirements and financial obligations.", dg("The redesigned enrolment journey", D.flow(["Student|requests enrolment", "Adviser|reviews", "Exception|identified", "Decision|obtained", "Enrolment|completed"]), "One adviser coordinates the journey across organisational functions.")],
                  ["The adviser gathers information and helps each case move forward, but cannot approve every academic or financial exception.", iss("Coordination responsibility does not confer unlimited decision authority.", "Different roles, different decisions")],
                  ["Imagine a student requesting registration without satisfying a prerequisite for a particular course.", null],
                  ["The adviser checks the record and identifies the requirement preventing ordinary registration.", dg("The adviser's responsibility", D.flow(["Student|requests help", "Adviser|checks record", "Prerequisite|issue identified"]), "The adviser performs the investigation.")],
                  ["An authorised academic role must decide whether the applicable rules permit an exception.", st("Each decision activity needs one accountable owner.")],
                  ["A programme coordinator might be consulted because that person understands the academic consequences.", cmp("a", "Accountable role", "Answers for the academic exception decision.", "up")],
                  ["The consulted coordinator provides advice, but does not automatically become the final decision owner.", cmp("b", "Consulted role", "Provides relevant academic expertise.", "up")],
                  ["The adviser may then be informed so the student receives an accurate explanation.", dg("The RACI contributions", D.flow(["Responsible|performs", "Accountable|answers", "Consulted|advises", "Informed|receives updates"]), "RACI distinguishes four contributions.")],
                  ["Receiving the decision does not make the adviser accountable for the academic judgement behind it.", null],
                  ["Now suppose two university managers both claim final authority over the same prerequisite exception.", iss("Competing accountable managers delay a decision the student needs.", "Two owners, no resolution")],
                  ["A clear RACI assignment identifies one accountable decision owner and prevents that ambiguity.", st("One accountable role makes ownership understandable.")],
                  ["The university also needs documented escalation when unusual cases exceed the authority assigned to employees.", dg("From investigation to decision", D.flow(["Adviser|investigates", "Authority|checked", "Decision owner|decides", "Student|informed"]), "Responsibility and authority must connect through a clear process.")],
                  ["This brings us back to Qasr, where Guest Hosts coordinate exceptions without inheriting unlimited revenue authority.", null],
                  ["Their work becomes dependable when employees know who investigates, who decides, who advises and who receives updates.", q("Would making every participating department accountable for the same exception improve coordination or create confusion?")]
                ]
              }
            ]
          }
        ]
      },
      {
        id: "l2",
        title: "The Guest Host's impossible job",
        sections: [
          {
            title: "Authority without ambiguity",
            sec: "W10O2a",
            lines: [
              ["The Guest Host knows the job. But when a guest needs a decision, does the organisation actually permit it?", t("Authority without ambiguity", "A new responsibility needs a real decision right.")],
              ["Imagine a traveller whose confirmed corporate rate differs from the kiosk's calculation. The Guest Host investigates while the guest waits.", dg("The exception reaches a decision", D.flow(["Guest|arrives", "!Rate|discrepancy", "Guest Host|investigates", "Decision|required"]), "The redesigned arrival process depends on an employee being able to act.")],
              ["Qasr has told Guest Hosts they may waive eligible discrepancies up to AED 400 without referring every case to a manager.", st("AED 400: the communicated local waiver limit.")],
              ["But that permission appears in a briefing email, not the formal delegation schedule. It is also missing from the job description.", iss("The employee is expected to decide, but formal authority has not caught up.", "An authority gap")],
              ["Put yourself in that lobby. The guest wants an answer, but you cannot find written confirmation that management will support your decision.", q("Why might an employee hesitate even when the manager has encouraged independent decisions?")],
              ["This is not automatically resistance. An employee may understand the guest's problem while reasonably questioning whether the decision is authorised.", null],
              ["The operating evidence makes the contradiction urgent: nine of Qasr's twenty-two Guest Hosts refer every rate discrepancy upward.", dg("Nine employees always refer", D.flow(["22 Guest|Hosts", "9 always|refer", "Duty manager|decides", "Guest|waits"]), "Observed referrals are evidence of a problem, not proof of individual motives.")],
              ["We do not know why each employee refers. Unclear authority is one plausible cause that the programme must investigate.", st("Observe the behaviour. Investigate the cause. Do not invent the motive.")],
              ["Authority means recognised permission to make specified decisions. Accountability means being answerable for their quality and consequences.", cmp("a", "Authority", "Permission to decide within approved boundaries.", "up")],
              ["A dependable role needs both, because independence without accountability can create inconsistent decisions.", cmp("b", "Accountability", "Answerability for appropriate decisions and outcomes.", "up")],
              ["Picture four combinations of authority and accountability. Only one consistently supports confident, responsible local judgement.", dg("Authority and accountability", D.matrix2x2(["Low authority", "High authority"], ["High accountability", "Low accountability"], ["Defensive escalation", "Ownership", "Compliance without engagement", "Inconsistent local practice"]), "The desirable arrangement combines meaningful authority with clear accountability.")],
              ["With high accountability but low authority, employees may refer decisions defensively because they carry consequences without dependable permission.", iss("Expected to deliver the result, but unable to authorise the necessary action.", "High accountability, low authority")],
              ["With high authority but weak accountability, employees may interpret similar exceptions differently across properties.", st("Authority without accountability can create inconsistent local practice.")],
              ["The repair is not to tell employees to be braver. Qasr must make the intended decision boundary formally usable.", dg("Repair the decision boundary", D.flow(["Rate|discrepancy", "Check|eligibility", "Within AED|400 limit?", "Resolve|appropriately", "Escalate|outside limit"]), "The proposed formal delegation distinguishes eligible local decisions from cases requiring escalation.")],
              ["For a teaching simulation, imagine an eligible AED 320 discrepancy. Written authority allows the Guest Host to consider local resolution; an AED 460 case requires the appropriate escalation.", st("AED 320: consider local resolution. AED 460: escalate beyond the limit.")],
              ["The amounts illustrate the rule, not actual Qasr transactions. Eligibility and sound judgement still matter, even below AED 400.", null],
              ["Formal delegation, the job description and operating guidance must agree. Employees should not have to reconcile contradictory instructions during a guest encounter.", dg("One coherent authority arrangement", D.flow(["Defined|responsibility", "Formal|delegation", "Decision|guidance", "Quality|accountability"]), "The documents and operating arrangements must support the same decisions.")],
              ["The sponsor should also test whether Guest Hosts can apply that authority correctly rather than assume documentation alone will change behaviour.", null],
              ["Our aim is appropriate local resolution, not automatic waivers or unlimited independence.", q("What must Qasr change beyond repeating the AED 400 instruction in another briefing?")]
            ],
            review: [
              {
                title: "The delivery driver who could not solve a simple problem",
                lines: [
                  ["Imagine a delivery company asking drivers to resolve straightforward customer problems at the doorstep.", t("Remedial - Authority and accountability", "A driver needs permission as well as responsibility.")],
                  ["Previously, minor service adjustments required a call to the central office. The redesign promises faster local decisions.", dg("The intended delivery journey", D.flow(["Driver|arrives", "Customer|reports issue", "Driver|assesses", "Local|resolution"]), "The redesigned process aims to avoid unnecessary referrals.")],
                  ["But management announces the change without updating formal delegation.", iss("Drivers are expected to decide, but their decision rights remain undocumented.", "Responsibility without authority")],
                  ["A customer reports damaged packaging. The driver understands the problem but cannot establish whether a service adjustment is permitted.", q("Why might this driver still call a supervisor?")],
                  ["The employee may fear being held accountable for a decision that the organisation has not formally authorised.", st("High accountability with unclear authority can encourage defensive escalation.")],
                  ["This is different from a capability gap. The driver might know exactly what should happen but lack permission to do it.", cmp("a", "Capability gap", "The employee cannot reliably assess or resolve the problem.", "down")],
                  ["An authority gap exists when the employee understands the situation but lacks a dependable decision right.", cmp("b", "Authority gap", "The employee lacks clear permission to make the decision.", "up")],
                  ["The company should document permitted adjustments and identify when supervisory approval remains necessary.", dg("Documented delegation", D.flow(["Exception|identified", "Within|authority?", "Driver|resolves", "Supervisor|handles excess"]), "Local decisions and escalation require clear boundaries.")],
                  ["Accountability must accompany the permission, because customers should receive consistent and appropriate treatment.", null],
                  ["Giving drivers unlimited discretion would create a different risk: similar customers could receive inconsistent outcomes.", iss("Broad authority without appropriate accountability can undermine fairness.", "The opposite imbalance")],
                  ["The strongest arrangement combines responsibility, usable authority, practical guidance and accountability.", st("Employees need permission to decide and responsibility for decision quality.")],
                  ["This is also Qasr's challenge. Guest Hosts have been told about a limited waiver, but the formal delegation does not contain it.", dg("The shared design problem", D.flow(["New|responsibility", "Documented|authority", "Clear|accountability", "Appropriate|decision"]), "Formal arrangements must support the redesigned responsibility.")],
                  ["A briefing communicates an intention. Formal delegation makes the decision boundary organisationally dependable.", null],
                  ["The goal is not unrestricted independence, but appropriate decisions within agreed limits.", q("How would documented authority change the driver's ability to deliver the redesigned service?")]
                ]
              },
              {
                title: "The insurance adviser who always asked the manager",
                lines: [
                  ["An insurance company wants advisers to resolve eligible claims during customer conversations instead of referring every decision upward.", t("Remedial - Defensive escalation", "A confident employee still needs dependable authority.")],
                  ["The redesigned process gives advisers responsibility for investigating claims and applying specified rules.", dg("The intended claims journey", D.flow(["Customer|raises claim", "Adviser|investigates", "Eligibility|assessed", "Decision|communicated"]), "Eligible claims should follow a defined decision path.")],
                  ["Yet the formal job description still describes collecting information and recommending managerial decisions.", iss("The new process expects decisions while the old role still expects referrals.", "Conflicting expectations")],
                  ["An adviser identifies a claim that appears eligible but worries that independent approval might later be challenged.", q("Does this hesitation necessarily mean the adviser resists change?")],
                  ["No. The behaviour could reflect uncertain authority rather than unwillingness to serve customers.", st("Observed hesitation is not proof of resistance.")],
                  ["Repeating the instruction to act independently would increase pressure without correcting the formal contradiction.", cmp("a", "Repeat the instruction", "Demand independent decisions without changing formal authority.", "down")],
                  ["A stronger response documents permitted decisions, accountability and escalation boundaries.", cmp("b", "Repair the role", "Align decision rights, accountability and practical guidance.", "up")],
                  ["The company should identify which claims advisers may approve and which require specialist review.", dg("The claims decision boundary", D.flow(["Claim|assessed", "Within|authority?", "Adviser|decides", "Specialist|reviews excess"]), "Appropriate local decisions remain subject to defined limits.")],
                  ["This protects customers from unnecessary waiting while protecting the organisation against inappropriate approvals.", null],
                  ["The opposite imbalance also matters. Broad authority without decision-quality review may create inconsistent treatment.", iss("High authority with weak accountability can encourage inconsistent local decisions.", "An accountability gap")],
                  ["The solution therefore combines formal authority, clear responsibility, quality checks and realistic practice.", dg("A coherent role", D.flow(["Defined|responsibility", "Documented|authority", "Clear|accountability", "Appropriate|escalation"]), "The organisational arrangements must support one operating design.")],
                  ["Qasr's AED 400 waiver presents the same design challenge.", null],
                  ["Nine Guest Hosts always refer discrepancies, but their individual reasons remain unknown.", st("Investigate authority, capability and operating conditions before judging behaviour.")],
                  ["A sound diagnosis asks whether the expected decision is both possible and defensible.", q("Why might formal delegation achieve more than repeatedly asking advisers to show confidence?")]
                ]
              }
            ]
          },
          {
            title: "When the old measure defeats the new design",
            sec: "W10O2b",
            lines: [
              ["A Guest Host spends fifteen minutes resolving a difficult rate discrepancy. The traveller leaves satisfied, but the employee's performance score may suffer.", t("When the old measure defeats the new design", "The organisation may reward the very behaviour it wants to replace.")],
              ["Watch the difference between a routine kiosk transaction and a complicated exception requiring investigation.", dg("Two very different arrivals", D.flow(["Guest|arrives", "Kiosk|handles routine", "!Complex|exception", "Guest Host|investigates", "Appropriate|resolution"]), "Automation changes the work that remains for employees.")],
              ["The Guest Host checks the booking, explains the discrepancy and coordinates an appropriate decision. That takes time because judgement is involved.", st("Longer handling time can represent valuable redesigned work.")],
              ["Now reveal the inherited scorecard. Qasr still evaluates employees using check-ins completed per shift and average transaction time.", cmp("a", "Inherited objectives", "Conventional check-in volume and transaction speed.", "down")],
              ["Neither measure was designed around complex kiosk exceptions, and kiosk check-ins are not attributed to individual Guest Hosts.", iss("The employee performs valuable work that the inherited scorecard does not recognise.", "The measurement contradiction")],
              ["The organisation changed the job without changing the formal definition of good performance.", null],
              ["Imagine three tasks competing for attention: a routine check-in, a complicated exception and an unnecessary managerial referral.", dg("Which task looks productive?", D.flow(["Old|throughput target", "Employee|priorities", "Cases|selected", "Guest|outcome"]), "Performance measures influence which activities appear worthwhile.")],
              ["Under the old scorecard, quick transactions can look attractive while difficult investigations reduce apparent productivity.", st("Employees may respond to the incentive the organisation actually measures.")],
              ["That response can resemble resistance, even when employees are trying to meet the objectives management continues enforcing.", q("What behaviour does Qasr reward when it measures conventional check-in volume?")],
              ["The People phase must repair this contradiction because measurement is part of the operating design, not an administrative afterthought.", null],
              ["A proposed replacement is appropriate exceptions resolved without unnecessary escalation, supported by a sample checking decision quality.", cmp("b", "Redesigned contribution", "Resolve eligible exceptions appropriately, with quality safeguards.", "up")],
              ["The quality check matters. Without it, employees might waive cases beyond their authority merely to increase their resolution count.", iss("A resolution target without quality safeguards can reward inappropriate decisions.", "A new incentive risk")],
              ["So the redesigned measure must recognise both useful outcomes and compliance with the decision boundary.", dg("A balanced performance measure", D.flow(["Eligible|exception", "Appropriate|resolution", "Quality|sample", "Outcome|reviewed"]), "Resolution effectiveness and decision quality must be assessed together.")],
              ["The old conflicting objective must also be removed explicitly. Adding a new target beside it leaves employees with two competing instructions.", st("Replace the conflicting measure; do not merely add another one.")],
              ["Think of the scorecard as a set of signals. If one signal rewards speed and another rewards careful investigation, employees need to know which behaviour matters.", null],
              ["For Guest Hosts, appropriate exception resolution is a possible outcome measure, but Qasr's final revised scorecard has not yet been established.", dg("From old scorecard to new", D.flow(["Remove|conflicting target", "Define|relevant outcome", "Add|quality safeguard", "Review|behaviour"]), "This is a proposed design, not an already implemented Qasr arrangement.")],
              ["The organisation should also review grade and reward arrangements because the redesigned role requires different judgement and responsibility.", null],
              ["Such a review does not automatically justify higher rewards; it establishes whether employment arrangements still fit the work.", st("Role, measures and rewards should communicate consistent expectations.")],
              ["A perfectly accurate metric can still be harmful when it rewards the wrong behaviour.", iss("The problem is not inaccurate counting. It is counting the wrong success.", "A misleading measure")],
              ["Our test is straightforward: can employees improve their performance assessment by doing the redesigned work properly?", q("Why might retaining check-ins per shift discourage Guest Hosts from accepting complicated exceptions?")]
            ],
            review: [
              {
                title: "The hospital that rewarded speed instead of safe discharge",
                lines: [
                  ["A hospital redesigns discharge so coordinators resolve obstacles before patients experience unnecessary delays.", t("Remedial - Measures and incentives", "A useful intervention can look unproductive under the wrong scorecard.")],
                  ["The new role involves coordinating departments and resolving difficult departure problems.", dg("The redesigned discharge journey", D.flow(["Discharge|approved", "!Exception|identified", "Coordinator|resolves", "Patient|leaves"]), "The coordinator helps patients leave safely and promptly.")],
                  ["Previously, employees were assessed by how many discharge records they completed during a shift.", cmp("a", "Old objective", "Maximise administrative records completed.", "down")],
                  ["Imagine a coordinator spending twenty minutes resolving missing medication documentation that prevents safe departure.", iss("The employee protects the patient but completes fewer records.", "Valuable work, poor score")],
                  ["The old measure makes straightforward records look more productive than careful exception resolution.", q("Which work would employees prioritise if their assessment depended mainly on completed records?")],
                  ["They might favour simpler cases, not necessarily because they lack commitment, but because those cases improve the measured result.", st("Misaligned incentives can discourage the redesigned behaviour.")],
                  ["A better measure could recognise discharge obstacles resolved appropriately without unnecessary escalation.", cmp("b", "Redesigned contribution", "Resolve discharge exceptions while respecting clinical safeguards.", "up")],
                  ["However, speed must never override essential clinical requirements or decisions reserved for authorised professionals.", null],
                  ["The hospital should sample decision quality and check whether employees involved the right professionals.", dg("Outcome with safeguards", D.flow(["Exception|identified", "Appropriate|resolution", "Quality|review", "Safe|departure"]), "The measure must reward useful outcomes without encouraging unsafe shortcuts.")],
                  ["The conflicting old volume target should be removed rather than retained beside the replacement.", iss("Two contradictory objectives leave employees uncertain about what management values.", "Competing targets")],
                  ["The hospital should also review rewards against the judgement required by the new role.", st("Measures and rewards must reinforce the redesigned contribution.")],
                  ["Qasr faces the same contradiction because Guest Hosts inherited conventional front-desk objectives.", null],
                  ["Their work now centres on assisting arrivals and resolving exceptions that kiosks cannot handle independently.", dg("The shared measurement principle", D.flow(["New|responsibility", "Relevant|outcome", "Quality|safeguard", "Aligned|incentive"]), "Measure the contribution the redesigned process needs.")],
                  ["The lesson is not to ignore productivity, but to define it around the actual work and protect decision quality.", q("Why would adding an exception-resolution target without removing the old throughput target leave the hospital's problem unresolved?")]
                ]
              },
              {
                title: "The customer service team that avoided difficult complaints",
                lines: [
                  ["A telecommunications company redesigns complaint handling so trained agents resolve more problems during the first conversation.", t("Remedial - Designing the right incentive", "The scorecard must change when the job changes.")],
                  ["The previous process rewarded many calls completed and low average handling time.", cmp("a", "Inherited objective", "High call volume and short conversations.", "down")],
                  ["The new process requires investigation, judgement and appropriate decisions about complicated customer problems.", dg("The intended complaint journey", D.flow(["Customer|contacts", "Agent|investigates", "Decision|made", "Complaint|resolved"]), "The redesigned process aims to avoid repeated transfers.")],
                  ["Imagine an agent examining several disputed charges. Resolving the case properly takes longer than answering routine questions.", iss("The valuable investigation lowers the employee's old throughput score.", "A contradictory incentive")],
                  ["An agent might transfer the difficult complaint to protect measured performance, recreating the handoff the redesign intended to remove.", q("Which activity improves the old score, and which better serves the redesigned process?")],
                  ["The organisation should not assume that every transfer reflects poor motivation or deliberate resistance.", st("Employee behaviour can reflect the incentives management continues enforcing.")],
                  ["A replacement measure could recognise eligible complaints resolved appropriately without unnecessary escalation.", cmp("b", "Redesigned objective", "Appropriate resolution of eligible complex complaints.", "up")],
                  ["But a high resolution count is not enough if employees close cases superficially or approve inappropriate outcomes.", null],
                  ["Quality sampling should check whether decisions followed policy and genuinely addressed customer problems.", dg("Checking decision quality", D.flow(["Complaint|investigated", "Resolution|recorded", "Quality|sampled", "Outcome|verified"]), "A quality safeguard protects against superficial closure.")],
                  ["Employees must also know which decisions exceed their delegated authority.", st("Measures must reward appropriate resolution, not unauthorised independence.")],
                  ["The old call-volume target should be removed when it conflicts with the new responsibility.", iss("Keeping both targets sends employees competing behavioural instructions.", "Two incompatible objectives")],
                  ["Managers should review rewards and expectations because formal incentives communicate what the organisation values.", null],
                  ["Qasr's Guest Hosts face the same problem when exception handling is assessed through conventional check-in measures.", dg("Aligning the new role", D.flow(["Redesigned|work", "Relevant|measure", "Quality|review", "Aligned|reward"]), "The scorecard must support the new contribution.")],
                  ["The principle is simple: employees should succeed by performing the redesigned work well.", q("How could an exception-resolution measure improve behaviour while still creating risks if decision quality were ignored?")]
                ]
              }
            ]
          },
          {
            title: "Designing a role people can actually perform",
            sec: "W10O2c",
            lines: [
              ["Qasr now has two connected problems: unclear authority and performance measures that reward the previous job.", t("Designing a role people can actually perform", "Turn a new title into a workable organisational arrangement.")],
              ["The sponsor asks you to repair the Guest Host specification. Where would you begin?", q("What must be documented before this role can work reliably?")],
              ["Start with the actual purpose: Guest Hosts welcome arrivals and resolve exceptions that self-service kiosks cannot handle.", dg("The redesigned Guest Host role", D.flow(["Guest|arrives", "Kiosk|handles routine", "!Exception|identified", "Guest Host|assists"]), "The new role combines guest assistance with appropriate exception resolution.")],
              ["The specification must translate that purpose into responsibilities, boundaries and expected outcomes.", st("A role specification must describe work employees can actually perform.")],
              ["At Qasr, revised job descriptions arrived three weeks after go-live. Employees therefore began the redesigned work before receiving updated formal expectations.", iss("The redesigned responsibilities started before the role documentation caught up.", "A late role definition")],
              ["The repaired description should explain which exceptions Guest Hosts investigate and how their work connects with other functions.", dg("Connecting the role to the process", D.flow(["Guest Host|investigates", "Relevant role|advises", "Authorised role|decides", "Guest|receives outcome"]), "Operational responsibilities and decision ownership must fit together.")],
              ["RACI assignments should identify who performs activities and who is accountable for decisions, without simply reproducing outdated departmental handoffs.", null],
              ["Next, the specification needs formal authority for eligible rate waivers up to AED 400.", cmp("a", "Expected authority", "Eligible discrepancies may be waived locally up to AED 400.", "up")],
              ["The existing delegation schedule does not record that permission, so the formal arrangements must be corrected.", cmp("b", "Documented authority", "The AED 400 waiver remains absent from formal delegation.", "down")],
              ["The repair should define eligibility, the decision limit and escalation when a case exceeds the employee's authority.", dg("The proposed decision path", D.flow(["Rate|discrepancy", "Check|eligibility", "Within|delegation?", "Local|decision", "Escalate|when required"]), "Documented decision rights make the role operationally usable.")],
              ["A reporting relationship is also necessary so employees know where to obtain support. The case does not establish Qasr's final reporting line.", st("Choose and document a justified reporting arrangement; do not invent an existing one.")],
              ["Now turn to performance. Guest Hosts still inherit objectives based on check-in volume and transaction time.", iss("The new responsibility and old performance objectives pull in different directions.", "The incentive mismatch")],
              ["A proposed scorecard could recognise eligible exceptions resolved appropriately without unnecessary escalation, with a quality sample protecting decision accuracy.", dg("A proposed balanced measure", D.flow(["Eligible|exception", "Appropriate|resolution", "Quality|checked", "Outcome|reviewed"]), "This is a proposed measure, not an established Qasr result.")],
              ["The old conflicting targets should be removed because employees need one coherent definition of success.", st("Reward the redesigned contribution and protect decision quality.")],
              ["The unchanged job grade and reward arrangements also deserve review, because the role now involves different judgement and responsibility.", dg("Reviewing employment arrangements", D.flow(["Changed|responsibilities", "Evaluate|job grade", "Review|rewards", "Align|expectations"]), "A justified review is required; a higher grade is not automatic.")],
              ["The organisation must evaluate the work before deciding whether any grade or reward adjustment is appropriate.", null],
              ["Finally, Guest Hosts need practical capability. Formal authority cannot substitute for knowing how to investigate unusual cases.", iss("A coherent document still fails if employees cannot exercise the required judgement.", "The capability gap")],
              ["Realistic scenarios should test investigation, waiver decisions, escalation and the reasoning behind each response.", dg("From specification to capability", D.flow(["Define|decisions", "Practise|exceptions", "Assess|judgement", "Provide|support"]), "The capability plan must test the work the role requires.")],
              ["A named owner should then monitor whether the redesigned process is genuinely adopted across the four properties.", null],
              ["Bring these elements together: responsibilities, accountability, authority, reporting, measures, rewards and demonstrated capability.", dg("One coherent Guest Host design", D.flow(["Role|defined", "Authority|documented", "Measures|aligned", "Capability|assessed", "Adoption|owned"]), "The organisational arrangements must reinforce the same redesigned process.")],
              ["Each element supports the others. Changing only the title leaves the old operating conditions largely intact.", st("A workable role is a connected design, not a renamed position.")],
              ["Our next challenge is finding out whether the twenty-two Guest Hosts can actually perform the judgement their new role demands.", q("Which elements would you require before declaring the Guest Host role operationally ready?")]
            ],
            review: [
              {
                title: "Designing the hospital discharge coordinator",
                lines: [
                  ["A hospital introduces a discharge coordinator to help patients leave safely without unnecessary departmental delays.", t("Remedial - Building a complete role", "A coordinator needs more than a job title.")],
                  ["The redesigned process connects discharge approval, outstanding requirements and the patient's departure.", dg("The discharge journey", D.flow(["Discharge|approved", "Requirements|checked", "Exceptions|resolved", "Patient|leaves"]), "The coordinator supports the complete departure journey.")],
                  ["Imagine medication information and transport arrangements remaining incomplete. The coordinator must identify the obstacles and contact the right people.", q("What should the coordinator do, and which decisions must remain with authorised clinical professionals?")],
                  ["The role specification should describe investigation, communication and operational coordination.", st("Responsibilities translate the redesigned process into actual work.")],
                  ["Clinical decisions must remain with appropriately authorised professionals, even when the coordinator manages the wider journey.", cmp("a", "Discharge coordinator", "Coordinates operational requirements and appropriate administrative decisions.", "up")],
                  ["The authorised clinical role remains accountable for decisions requiring professional clinical judgement.", cmp("b", "Clinical decision owner", "Retains responsibility for clinical decisions and safeguards.", "up")],
                  ["The coordinator also needs documented authority for operational adjustments and escalation when issues exceed that authority.", dg("A defined decision boundary", D.flow(["Issue|identified", "Within|authority?", "Coordinator|resolves", "Specialist|decides"]), "Local decisions and specialist escalation must be distinguished.")],
                  ["Without that boundary, employees may repeatedly request approval for work the redesign intended to simplify.", iss("Coordination responsibility without usable authority recreates delays.", "An incomplete role")],
                  ["Performance measures should recognise appropriate resolution of discharge obstacles rather than merely counting records.", st("The scorecard must reflect the coordinator's redesigned contribution.")],
                  ["Quality safeguards matter because faster departure must not compromise patient safety.", dg("A balanced measure", D.flow(["Discharge|obstacle", "Appropriate|resolution", "Clinical|safeguards", "Safe|departure"]), "Outcome measures must protect necessary clinical requirements.")],
                  ["The hospital should review grade and reward arrangements against the actual responsibilities, without assuming a change is automatically justified.", null],
                  ["Coordinators also need realistic practice handling missing information, conflicting requirements and necessary escalation.", dg("Preparing the employee", D.flow(["Define|role", "Clarify|authority", "Align|measures", "Practise|cases", "Assess|capability"]), "A complete role combines formal arrangements and demonstrated capability.")],
                  ["Finally, the reporting relationship must show where operational support belongs when departments disagree.", null],
                  ["This is the same design problem Qasr faces with Guest Hosts coordinating guest exceptions across organisational boundaries.", st("A role becomes workable when its organisational arrangements support its decisions.")],
                  ["A detailed job description alone is insufficient when authority, measures and capability remain misaligned.", q("Why would the coordinator still struggle if the job description were updated but decision rights remained unclear?")]
                ]
              },
              {
                title: "The returns specialist whose job existed only on paper",
                lines: [
                  ["An online retailer automates routine refunds and creates a returns specialist role for unusual customer cases.", t("Remedial - Repairing an incomplete role", "A new title must be supported by a complete operating design.")],
                  ["The software handles straightforward returns, leaving employees with cases requiring investigation and judgement.", dg("The redesigned returns process", D.flow(["Return|requested", "Automatic|check", "!Complex|exception", "Specialist|investigates", "Decision|communicated"]), "Automation changes the work that remains for employees.")],
                  ["Management announces the new title but does not revise responsibilities or formal refund authority.", iss("The specialist is expected to decide without a documented decision boundary.", "A role without support")],
                  ["Imagine a damaged product return that appears to justify an exception. The employee understands the evidence but cannot confirm local approval permission.", q("Which missing role element prevents the specialist from completing the expected decision?")],
                  ["The immediate weakness is delegated authority, which must identify permitted decisions and escalation limits.", st("Responsibility explains the work; authority establishes permission to decide.")],
                  ["The specification should also clarify accountability and reporting relationships so employees know who owns difficult decisions.", dg("Repairing decision ownership", D.flow(["Specialist|investigates", "Authority|checked", "Appropriate|decision", "Escalation|when needed"]), "Clear decision rights support the redesigned role.")],
                  ["Now imagine the old performance system still rewarding returns processed per hour.", cmp("a", "Inherited measure", "Returns completed per hour.", "down")],
                  ["Complex investigations take longer, so employees can appear less productive while performing valuable work.", cmp("b", "Redesigned contribution", "Appropriate resolution of complicated returns.", "up")],
                  ["The retailer should replace conflicting throughput targets with outcome measures supported by decision-quality review.", dg("A balanced measure", D.flow(["Exception|investigated", "Appropriate|decision", "Quality|checked", "Outcome|recorded"]), "Performance measures must not encourage inappropriate refunds.")],
                  ["The organisation should review grade and rewards against the changed responsibilities rather than assume a new title requires higher pay.", null],
                  ["Specialists also need practice applying policy to ambiguous returns and recognising when escalation is necessary.", dg("Demonstrating capability", D.flow(["Identify|skills", "Practise|exceptions", "Test|decisions", "Provide|support"]), "Capability assessment tests the judgement required by the redesigned work.")],
                  ["A clear reporting relationship should identify support when unusual cases exceed local authority.", null],
                  ["The retailer must also monitor whether employees genuinely follow the redesigned process instead of returning to familiar referrals.", st("A complete role connects responsibilities, authority, measures, capability and adoption.")],
                  ["Qasr needs the same connected repair for Guest Hosts across its four pilot properties.", null],
                  ["The goal is not more paperwork. It is making the redesigned work understandable, authorised and achievable.", q("Which elements would you verify before declaring the returns specialist ready to work independently?")]
                ]
              }
            ]
          }
        ]
      },
      {
        id: "l3",
        title: "Capability is more than attendance",
        sections: [
          {
            title: "Training for judgement, not just buttons",
            sec: "W10O3a",
            lines: [
              ["Qasr has a new Guest Host role, but can employees actually make the decisions it requires?", t("Training for judgement, not just buttons", "A green training report is not proof of readiness.")],
              ["The sponsor opens the people-workstream dashboard. All twenty-two Guest Hosts attended a four-hour induction, and the status is green.", dg("The green dashboard", D.flow(["22 Guest|Hosts", "Four-hour|induction", "Attendance|complete", "Status|green"]), "All twenty-two employees attended induction, but capability was not assessed.")],
              ["That confirms participation. It does not show whether employees can resolve an unfamiliar guest exception appropriately.", cmp("a", "Attendance", "Confirms participation in the scheduled induction.", "up")],
              ["Demonstrated capability is different: employees must investigate, decide within authority and recognise when escalation is necessary.", cmp("b", "Capability", "Shows that employees can apply judgement in realistic situations.", "up")],
              ["Imagine a traveller whose corporate rate differs from the amount displayed by the kiosk.", dg("A real decision challenge", D.flow(["Guest|raises exception", "Host|investigates", "Judgement|required", "Appropriate|decision"]), "The employee must understand the discrepancy before deciding.")],
              ["The Guest Host knows where the waiver button is. But does the employee know whether using it would be appropriate?", q("Can someone operate the software correctly and still make the wrong process decision?")],
              ["Yes. A technically correct action can still exceed delegated authority or produce an inappropriate outcome.", iss("Knowing the interface does not establish sound decision-making.", "System knowledge is not process judgement")],
              ["System training explains where information appears and how actions are recorded.", it(1, 2, "dash", "System training", "Learn the interface, controls and technical actions.")],
              ["Process training explains why an action matters, what happens next and when judgement or escalation is required.", it(2, 2, "brain", "Process training", "Understand decisions, dependencies and authority boundaries.")],
              ["Both are necessary because an incorrect decision can travel through the guest journey even when the software works perfectly.", st("Employees need to understand both how and why.")],
              ["Qasr should therefore use realistic exception cases rather than relying entirely on presentations and interface demonstrations.", dg("Practising the decision", D.flow(["Case|presented", "Evidence|examined", "Decision|explained", "Feedback|provided"]), "Worked cases develop practical judgement.")],
              ["Start with an eligible rate discrepancy below AED 400. Ask the employee to explain the evidence, eligibility and appropriate response.", st("Practice case: an eligible discrepancy within the delegated limit.")],
              ["Now change the circumstances. The amount exceeds AED 400, so the employee must recognise the need for escalation.", dg("The decision changes", D.flow(["Discrepancy|identified", "Check|eligibility", "Outside|authority", "Escalate|appropriately"]), "A change in circumstances changes the authorised response.")],
              ["The important learning is not memorising an amount. It is understanding the decision boundary and applying it consistently.", null],
              ["During practice, an employee might approve a case that should have been escalated. That mistake becomes useful when a trainer explains why.", dg("Learning safely", D.flow(["Attempt|decision", "Review|reasoning", "Correct|misunderstanding", "Practise|again"]), "Safe practice exposes misunderstandings before they affect guests.")],
              ["Employees should explain their reasoning because selecting the right answer by chance does not demonstrate dependable capability.", st("A correct answer needs sound reasoning.")],
              ["After practice, Qasr should assess whether employees can investigate exceptions, apply waiver rules and escalate appropriately.", dg("A practical capability assessment", D.flow(["Realistic|case", "Employee|decision", "Quality|review", "Readiness|evidence"]), "Assessment tests the decisions required by the redesigned role.")],
              ["Decision quality matters as much as speed. A quick resolution is not successful when it breaches policy or authority.", cmp("a", "Decision effectiveness", "Can the employee resolve an eligible exception appropriately?", "up")],
              ["The quality check asks whether the employee respected the rules and recognised when further approval was required.", cmp("b", "Decision quality", "Was the decision accurate, authorised and appropriately escalated?", "up")],
              ["Qasr conducted no post-induction capability assessment, so individual readiness remains unverified.", iss("Training attendance is known; decision capability has not been tested.", "An evidence gap")],
              ["Nine Guest Hosts refer every rate discrepancy upward, but we cannot assume they all need more training.", dg("Diagnosing repeated referrals", D.branch("Repeated escalation", ["Unclear authority?", "Capability gap?", "Other operating difficulty?"]), "The observed behaviour may have several causes.")],
              ["An employee who understands the decision but lacks formal permission needs authority clarification, not another software demonstration.", st("Authority gaps and capability gaps require different remedies.")],
              ["The people-workstream report should therefore show assessed capability, unresolved risks and targeted support alongside training attendance.", dg("From attendance to readiness", D.flow(["Induction|completed", "Capability|assessed", "Gaps|identified", "Support|provided", "Readiness|reviewed"]), "A credible report connects participation with demonstrated performance.")],
              ["A green milestone can confirm that training happened. It cannot establish that employees are ready for every difficult guest encounter.", q("What evidence would convince you that a Guest Host can make appropriate decisions rather than merely operate the kiosk?")]
            ],
            review: [
              {
                title: "The pharmacy technician who knew the screen",
                lines: [
                  ["A pharmacy introduces a digital collection process that identifies unusual prescription cases requiring professional review.", t("Remedial - System training versus process capability", "Knowing the screen is not the same as understanding the decision.")],
                  ["Technicians learn to find records and complete routine collections, but some situations require a pharmacist.", dg("The redesigned collection process", D.flow(["Patient|arrives", "Record|checked", "!Exception|identified", "Pharmacist|reviews", "Collection|completed"]), "Routine operations and professional decisions have different boundaries.")],
                  ["Everyone attends training, so the manager reports completion. Yet nobody has tested how technicians handle exceptions.", iss("Attendance is confirmed, but judgement remains untested.", "The readiness gap")],
                  ["Imagine a patient whose information conflicts with the prescription record. The technician can open the screen but does not know what should happen next.", q("Does correct system navigation establish safe process capability?")],
                  ["No. System training teaches interface operation, while process training develops understanding of decisions and escalation.", cmp("a", "System training", "Navigate records and perform technical actions.", "up")],
                  ["Process training helps employees recognise when professional review is necessary and why that boundary matters.", cmp("b", "Process training", "Understand exceptions, professional boundaries and appropriate escalation.", "up")],
                  ["The pharmacy should practise realistic cases involving missing information, discrepancies and pharmacist intervention.", dg("Safe practice", D.flow(["Example|presented", "Technician|responds", "Trainer|reviews", "Understanding|improves"]), "Practice allows errors to be corrected before real patient care.")],
                  ["A technician might initially attempt to complete a collection that requires referral. The trainer can explain the error safely.", null],
                  ["The important question is whether the technician understands why the case must be escalated.", st("Capability includes recognising the limits of one's authority.")],
                  ["The manager should assess performance using new cases rather than assuming that attendance created the required judgement.", dg("Demonstrating capability", D.flow(["Recognise|exception", "Understand|boundary", "Escalate|appropriately", "Protect|service quality"]), "Assessment provides evidence of appropriate decisions.")],
                  ["Professional boundaries remain essential because technical competence does not authorise clinical decisions.", null],
                  ["Qasr faces a similar challenge when Guest Hosts distinguish eligible waivers from discrepancies requiring managerial consideration.", st("Technical skill, process judgement and authority must reinforce each other.")],
                  ["Employees need practice, feedback and assessment before their readiness can be established.", q("How could the pharmacy manager test process understanding rather than simply ask whether technicians remember the interface?")]
                ]
              },
              {
                title: "The insurance adviser who passed induction",
                lines: [
                  ["An insurance company introduces a claims process that allows advisers to resolve eligible cases without unnecessary managerial referrals.", t("Remedial - Demonstrating readiness", "Training completion and operational capability are different achievements.")],
                  ["Advisers attend induction and learn the new software. The programme manager reports that everyone is ready.", dg("The intended claims process", D.flow(["Customer|submits claim", "Adviser|investigates", "Eligibility|assessed", "Decision|communicated"]), "The process expects appropriate decisions within delegated authority.")],
                  ["But nobody has tested whether advisers can distinguish straightforward claims from those requiring specialist review.", iss("Attendance is recorded, but decision capability is unknown.", "Readiness remains untested")],
                  ["Imagine a claim with conflicting coverage information. The adviser knows the software but is uncertain about the appropriate decision.", q("What additional evidence would establish readiness?")],
                  ["A realistic assessment should require the employee to investigate the evidence and explain the decision.", cmp("a", "Attendance evidence", "Confirms participation in the scheduled induction.", "up")],
                  ["Capability evidence demonstrates appropriate investigation, judgement and escalation in unfamiliar cases.", cmp("b", "Capability evidence", "Shows the employee can perform the redesigned responsibility.", "up")],
                  ["Worked examples allow advisers to practise difficult situations and receive feedback before real customers are affected.", dg("Learning from safe mistakes", D.flow(["Case|presented", "Decision|attempted", "Error|explained", "Case|revisited"]), "Practice helps employees correct misunderstandings.")],
                  ["If an adviser incorrectly approves a claim, the trainer can explain the decision boundary and ask the employee to try another case.", null],
                  ["The organisation should then test whether the corrected reasoning transfers to a different situation.", st("Demonstrated capability requires application, not memorisation.")],
                  ["However, repeated escalation does not always indicate a training problem.", dg("Diagnosing the cause", D.branch("Repeated referral", ["Authority unclear?", "Capability insufficient?", "Operating support missing?"]), "Similar behaviour can arise from different causes.")],
                  ["An adviser who understands the rules but lacks formal approval authority needs a delegation correction.", iss("Repeating induction cannot repair missing decision rights.", "An authority gap")],
                  ["Managers should investigate the difficulty before choosing training, authority clarification or practical support.", dg("Targeted improvement", D.flow(["Observe|difficulty", "Identify|cause", "Choose|support", "Assess|improvement"]), "Different causes require different remedies.")],
                  ["This applies to Qasr's nine Guest Hosts who refer every rate discrepancy, for reasons not yet established.", null],
                  ["The organisation should test judgement while correcting formal authority and examining actual working conditions.", q("Why would repeating induction be ineffective if employees already understand the process but lack documented authority?")]
                ]
              }
            ]
          },
          {
            title: "One organisation, two processes",
            sec: "W10O3b",
            lines: [
              ["Qasr's kiosks are running, but are guests actually following the redesigned arrival process?", t("One organisation, two processes", "Implementation is not the same as adoption.")],
              ["Eleven weeks after go-live, the sponsor examines operating evidence from the four pilot properties.", dg("The week-eleven review", D.flow(["Redesigned|arrival", "Four pilot|properties", "Eleven weeks|after launch", "Adoption|review"]), "The sponsor needs evidence of actual process use.")],
              ["The technology is operational and Guest Hosts are assigned. Those achievements confirm implementation, not complete behavioural change.", cmp("a", "Implementation", "The redesigned process and supporting technology are available.", "up")],
              ["Adoption asks a different question: are actual arrivals following the intended process?", cmp("b", "Adoption", "Relevant cases genuinely use the redesigned operating arrangement.", "up")],
              ["At week eleven, Qasr reports sixty-five percent kiosk adoption.", dg("Observed kiosk adoption", D.progress("Week-eleven kiosk adoption", 65, 100, "%"), "The observed figure is 65% at week eleven.")],
              ["That is substantial use, but it does not mean the redesigned process has become the only operating arrangement.", st("65% adoption is an operating observation, not proof of complete change.")],
              ["The case also reports that twenty-nine percent of arrivals are handled at the desk.", dg("Observed desk handling", D.progress("Desk-handled arrivals", 29, 100, "%"), "The case reports 29% desk-handled arrivals.")],
              ["Before calling those arrivals workarounds, we need to know why they followed the desk route.", q("Does every desk-handled arrival represent resistance to the kiosk process?")],
              ["No. Property managers report that most desk-handled arrivals involve cases rejected by the kiosk.", dg("Classifying the desk route", D.branch("Desk-handled arrival", ["Kiosk-rejected exception", "Possible workaround", "Reason requires investigation"]), "The observed desk share does not establish how many cases are inappropriate workarounds.")],
              ["A guest whose case cannot be completed by the kiosk may legitimately need human assistance.", st("Necessary exception handling is not automatically a workaround.")],
              ["An avoidable workaround occurs when people bypass an available intended path without a justified operating need.", iss("An alternative route may conceal a weakness in the redesigned process.", "A possible workaround")],
              ["Imagine a Guest Host referring an eligible rate discrepancy upward because formal delegation remains unclear.", dg("The referral loop", D.flow(["Eligible|discrepancy", "Guest Host|hesitates", "Manager|referral", "Guest|waits"]), "Unclear authority may recreate a handoff the redesign intended to remove.")],
              ["The referral is observable. Its precise cause still needs investigation rather than an assumption about employee resistance.", null],
              ["Qasr should record alternative operating paths by type and frequency, then investigate why they occur.", dg("Learning from alternative paths", D.flow(["Observe|path", "Classify|reason", "Measure|frequency", "Investigate|cause", "Correct|weakness"]), "Workaround analysis turns deviations into diagnostic evidence.")],
              ["Weekly adoption tracking is also essential because one observation cannot show whether use is improving, stalling or declining.", st("Measure adoption weekly from go-live.")],
              ["The Week 10 illustration shows adoption rising before flattening near sixty-five percent, while workaround use changes over time.", dg("Illustrative adoption and workaround trends", D.lines(["Week 1", "Week 4", "Week 8", "Week 12", "Week 16"], [{ name: "Illustrative adoption", values: [18, 42, 59, 65, 65] }, { name: "Illustrative workaround use", values: [12, 24, 18, 12, 9] }]), "Conceptual sixteen-week curves; these plotted values are illustrative, not Qasr observations.")],
              ["Imagine moving along the curve. Early growth looks encouraging, but the later plateau signals that a persistent barrier may remain.", null],
              ["Do not confuse this illustration with Qasr's measured history. The verified adoption figure is sixty-five percent at week eleven.", st("Observed Qasr evidence: 65% at week eleven. Later plotted values: illustrative.")],
              ["When adoption remains incomplete, the organisation may effectively operate two processes at once.", dg("Two operating realities", D.branch("Guest arrival", ["Redesigned kiosk-supported path", "Alternative desk-handled path", "Investigate each case type"]), "The two paths may include legitimate exceptions and avoidable departures.")],
              ["That can increase complexity because employees must support both the intended design and alternative arrangements.", iss("The new process operates while elements of the old process may continue.", "Two processes at once")],
              ["One Qasr pilot property has reinstated a permanent desk position that the redesign removed.", dg("The reinstated desk", D.branch("Permanent desk restored", ["Protects necessary service?", "Recreates old practice?", "Investigate actual cases"]), "The reinstatement has competing interpretations.")],
              ["The desk may protect guests whose kiosk exceptions genuinely require assistance.", cmp("a", "Service protection", "Human support for cases that cannot follow the routine kiosk path.", "up")],
              ["Alternatively, it may encourage unnecessary conventional check-ins and weaken adoption.", cmp("b", "Redesign erosion", "Avoidable return to the previous operating arrangement.", "down")],
              ["Neither interpretation is established simply because the desk exists. The sponsor needs evidence about the cases it handles.", st("Classify actual cases before judging the desk.")],
              ["A named adoption owner should report kiosk use, exception types, alternative paths and corrective actions.", dg("A more useful sponsor dashboard", D.flow(["Adoption|measured", "Exceptions|classified", "Workarounds|investigated", "Action|owned"]), "Operating evidence should guide corrective decisions.")],
              ["The goal is not forcing every guest through a kiosk. It is ensuring that each arrival follows an appropriate, dependable path.", q("What evidence would help you decide whether Qasr's reinstated desk protects guests or undermines the redesign?")]
            ],
            review: [
              {
                title: "The hospital that launched a digital discharge process",
                lines: [
                  ["A hospital launches a digital discharge process so departments can coordinate patients' departure through shared information.", t("Remedial - Implementation versus adoption", "A live system does not guarantee changed working practices.")],
                  ["The system works, and employees can access it. Managers celebrate the successful launch.", dg("The intended discharge process", D.flow(["Discharge|approved", "Requirements|recorded", "Departments|coordinate", "Patient|leaves"]), "The new process uses shared information across departments.")],
                  ["But difficult cases still involve separate spreadsheets and telephone arrangements.", iss("The new system operates alongside familiar working methods.", "Implementation without full adoption")],
                  ["Implementation establishes availability. Adoption measures whether actual cases follow the redesigned process.", cmp("a", "Implementation", "The digital discharge system is operational.", "up")],
                  ["Adoption concerns whether departments genuinely use the intended coordination process.", cmp("b", "Adoption", "Actual discharges follow the redesigned arrangement.", "up")],
                  ["Imagine a patient waiting because transport arrangements remain unresolved. A coordinator may use the system or contact another department directly.", q("When is direct communication legitimate, and when might it become an avoidable workaround?")],
                  ["A telephone call can be appropriate when the process requires immediate coordination.", st("Not every alternative action is inappropriate.")],
                  ["A separate spreadsheet may be problematic if it creates conflicting records and bypasses the shared system.", iss("Unrecorded parallel work can undermine reliable coordination.", "A possible workaround")],
                  ["The hospital should classify alternative practices before deciding which require correction.", dg("Investigating alternative paths", D.flow(["Observe|practice", "Classify|reason", "Measure|frequency", "Correct|weakness"]), "Evidence distinguishes legitimate exceptions from avoidable departures.")],
                  ["Weekly adoption measurement would reveal whether use improves or stalls after launch.", dg("Adoption over time", D.flow(["Week|one", "Weekly|measurement", "Trend|review", "Action|selected"]), "Adoption requires continuing observation.")],
                  ["A named owner should interpret the evidence and coordinate improvements across departments.", null],
                  ["Otherwise, the project dashboard may remain green while employees continue maintaining competing arrangements.", iss("Completed milestones can conceal incomplete behavioural change.", "A misleading green status")],
                  ["Qasr faces the same challenge with sixty-five percent kiosk adoption and substantial desk-handled activity.", null],
                  ["Some desk cases may legitimately require assistance, so the sponsor must investigate rather than assume resistance.", st("Adoption analysis needs both measurement and explanation.")],
                  ["The programme succeeds when actual work increasingly follows the intended process without neglecting necessary exceptions.", q("Why must the hospital measure adoption after launch rather than rely on completed implementation milestones?")]
                ]
              },
              {
                title: "The retailer running two returns processes",
                lines: [
                  ["An online retailer introduces automatic approval for straightforward returns while specialists investigate unusual cases.", t("Remedial - Understanding workarounds", "Alternative paths can reveal unresolved design problems.")],
                  ["The intended process directs routine requests through automation and exceptions towards human judgement.", dg("The redesigned returns journey", D.flow(["Customer|submits return", "System|checks eligibility", "Routine|approval", "!Exception|to specialist"]), "The new process separates routine and exceptional work.")],
                  ["After launch, some stores continue accepting returns through the old manual procedure.", iss("Manual handling continues, but the reason is not yet known.", "An untested explanation")],
                  ["Management initially interprets this as resistance, but some customers may genuinely be unable to complete the online process.", cmp("a", "Necessary assistance", "Human support for customers facing a real process limitation.", "up")],
                  ["Other manual cases may reflect avoidable use of familiar methods when automation could handle the request.", cmp("b", "Avoidable workaround", "Bypassing an available redesigned path without an operational need.", "down")],
                  ["The same visible behaviour can therefore have different causes and require different responses.", q("Why is it unreliable to label every manual return as employee resistance?")],
                  ["A legitimate exception may reveal missing system functionality, while an avoidable workaround may reflect unclear guidance or incentives.", st("Investigate the cause before choosing the remedy.")],
                  ["The retailer should record each manual case and classify why it followed that path.", dg("Classifying manual returns", D.flow(["Manual|case observed", "Reason|identified", "Type|recorded", "Pattern|reviewed"]), "Workaround analysis identifies recurring operating weaknesses.")],
                  ["Weekly adoption tracking can show whether the redesigned returns process becomes the normal operating method.", null],
                  ["If adoption plateaus, managers should investigate barriers rather than simply repeat launch announcements.", iss("A stable adoption plateau may signal unresolved operating problems.", "Change has stalled")],
                  ["Imagine a store restoring a permanent manual returns counter. It could protect customers or preserve unnecessary old activity.", dg("The restored counter", D.branch("Manual counter restored", ["Necessary customer support?", "Avoidable old practice?", "Evidence required"]), "The counter's purpose must be established from actual cases.")],
                  ["The retailer should examine what the counter handles before deciding whether it should remain, change or disappear.", null],
                  ["Qasr faces the same judgement when one pilot property restores a permanent front desk.", cmp("a", "Service protection", "The desk supports guests with legitimate exceptions.", "up")],
                  ["It could also weaken adoption if routine arrivals unnecessarily return to conventional check-in.", cmp("b", "Redesign erosion", "The desk preserves avoidable old transactions.", "down")],
                  ["Neither conclusion follows automatically from reinstatement.", st("Observed activity needs interpretation grounded in case evidence.")],
                  ["Implementation shows availability, adoption shows use, and workaround analysis helps explain deviations.", q("What evidence would help the retailer decide whether its manual returns counter should remain?")]
                ]
              }
            ]
          },
          {
            title: "The knowledge the redesign might lose",
            sec: "W10O3c",
            lines: [
              ["We have examined visible operating problems. Now consider something less obvious: the knowledge that could disappear when jobs change.", t("The knowledge the redesign might lose", "Protect valuable experience without preserving inefficient routines.")],
              ["Imagine an experienced Front Desk Agent who has spent years handling unusual guest arrivals.", dg("Experience behind the old process", D.flow(["Unusual|guest problem", "Experienced|employee", "Practical|judgement", "Appropriate|resolution"]), "Experienced employees may hold knowledge that formal procedures do not capture.")],
              ["The employee recognises recurring booking discrepancies and knows which situations require careful investigation.", null],
              ["Some knowledge is written in procedures. Other knowledge develops through repeated encounters with difficult cases.", cmp("a", "Documented knowledge", "Formal procedures, system records and written rules.", "up")],
              ["Practical knowledge includes recognising unusual patterns, departmental dependencies and the reasons behind effective decisions.", cmp("b", "Experience-based knowledge", "Judgement developed through real operating situations.", "up")],
              ["A process diagram may show that an exception was resolved without explaining how an experienced employee recognised its cause.", st("A diagram rarely captures every judgement behind successful work.")],
              ["Qasr moved twenty-two former Front Desk Agents into Guest Host roles. Their previous experience may remain valuable.", dg("The role transition", D.flow(["Front Desk|Agent", "Existing|experience", "Guest Host|role", "New|responsibilities"]), "The transition should retain useful knowledge while changing the work.")],
              ["The organisation should not assume that every feature of the previous job was inefficient or obsolete.", null],
              ["An old handoff may need removal while the expertise that once helped employees manage it remains essential.", q("How can Qasr preserve useful judgement without preserving the old process?")],
              ["Imagine an experienced employee explaining that a particular rate discrepancy often follows an earlier reservation adjustment.", dg("An experienced insight", D.flow(["Rate|discrepancy", "Earlier|adjustment", "Cause|recognised", "Decision|supported"]), "Experience can reveal causes that are not obvious from the final system record.")],
              ["That explanation could become a worked exception used by Guest Hosts across all four properties.", st("Turn individual experience into reusable guidance.")],
              ["A worked example should describe the situation, evidence, authority boundary and reasoning behind the response.", dg("Capturing a worked exception", D.flow(["Employee|explains case", "Evidence|identified", "Reasoning|documented", "Guidance|shared"]), "Capture why the decision was appropriate, not just what happened.")],
              ["Employees can then practise the example and apply the reasoning to similar situations.", null],
              ["Copying the old job description would not achieve this because the important knowledge may never have appeared in that document.", iss("Documenting activities without decision reasoning can allow valuable expertise to disappear.", "Knowledge at risk")],
              ["The People phase should capture practical knowledge before roles change materially or experienced employees leave.", st("Knowledge preservation belongs inside the change plan.")],
              ["There is also a human concern. Employees may wonder whether the new role values the expertise they developed over many years.", cmp("a", "Unclear transition", "Employees cannot see how their experience fits the redesigned organisation.", "down")],
              ["A supported transition explains future responsibilities and invites employees to contribute their knowledge.", cmp("b", "Supported transition", "Employees understand their contribution and help improve the new process.", "up")],
              ["These arrangements matter because uncertainty about future roles can create retention risks.", null],
              ["Qasr reports that two of the twenty-two Guest Hosts have resigned since the redesign began.", dg("Observed departures", D.flow(["22 Guest|Hosts", "2 observed|resignations", "Reasons|unknown", "Risk|investigation"]), "The case reports two departures but does not establish individual motives.")],
              ["We must not attribute those departures to resistance or dissatisfaction without evidence.", iss("Two resignations are observed; their causes remain unknown.", "Do not invent motives")],
              ["Nevertheless, Qasr should investigate retention risks because losing experienced employees may also mean losing practical knowledge.", dg("Managing retention risk", D.flow(["Role|uncertainty", "Retention|risk", "Programme|register", "Mitigation|planned"]), "Retention and knowledge risks require deliberate management.")],
              ["Managers can involve experienced Guest Hosts in developing worked examples and improving exception guidance.", st("Employee involvement can support both knowledge transfer and organisational change.")],
              ["This does not mean protecting every old practice. It means separating valuable expertise from unnecessary handoffs.", dg("What changes and what remains", D.branch("Existing practice", ["Remove inefficient routine", "Preserve useful judgement", "Embed knowledge in new role"]), "The redesigned process should benefit from operational experience.")],
              ["A stronger redesign helps employees understand their future while making their practical knowledge available to colleagues.", q("How could Qasr capture experienced Guest Hosts' judgement without recreating the inefficient front-desk practices it replaced?")]
            ],
            review: [
              {
                title: "The maintenance technician who knew the machine",
                lines: [
                  ["A manufacturer installs sensors that monitor equipment and alert technicians when unusual conditions appear.", t("Remedial - Preserving practical knowledge", "Automation changes work, but experience may remain essential.")],
                  ["The new process replaces routine inspections with targeted responses to detected problems.", dg("The redesigned maintenance process", D.flow(["Sensors|monitor", "Alert|generated", "Technician|investigates", "Action|taken"]), "Automation identifies conditions requiring attention.")],
                  ["An experienced technician recognises subtle patterns that the sensor record alone cannot explain.", st("Operational experience can contain knowledge absent from formal records.")],
                  ["Imagine a warning that becomes serious only under particular production conditions.", dg("The warning and its context", D.flow(["Sensor|warning", "Operating|conditions", "Technician|interprets", "Appropriate|response"]), "The meaning of a warning may depend on context.")],
                  ["The system records the warning, but the technician understands why it matters.", cmp("a", "System record", "Captures readings and the detected warning.", "up")],
                  ["Experienced judgement explains how operating conditions affect the appropriate response.", cmp("b", "Practical knowledge", "Interprets the warning using accumulated experience.", "up")],
                  ["If roles change without capturing that reasoning, the organisation may lose valuable expertise.", iss("The reasoning behind effective decisions could disappear when experienced employees leave.", "Knowledge loss")],
                  ["Technicians should explain difficult cases while their knowledge remains available.", dg("Capturing a worked case", D.flow(["Warning|observed", "Context|explained", "Decision|documented", "Example|shared"]), "Worked examples preserve practical decision reasoning.")],
                  ["These examples can support training because employees learn why a response is appropriate.", null],
                  ["Knowledge capture should not preserve inefficient inspection routines simply because they are familiar.", st("Keep useful expertise while replacing outdated practices.")],
                  ["Managers should also explain future roles so employees understand how their experience contributes to the redesigned process.", q("How might employee involvement support both knowledge preservation and the transition?")],
                  ["The programme should record significant retention risks and plan mitigation before important expertise disappears.", dg("Supporting the transition", D.flow(["Explain|future role", "Recognise|expertise", "Transfer|knowledge", "Manage|retention risk"]), "Role clarity and knowledge transfer reinforce each other.")],
                  ["Qasr faces the same challenge as experienced Front Desk Agents become Guest Hosts.", null],
                  ["Their understanding of unusual guest situations may remain essential even when conventional desk transactions decline.", st("A successful redesign changes work without discarding valuable judgement.")],
                  ["Employees are not simply positions on a process chart. Their knowledge can make the new process dependable.", q("Why should the manufacturer capture technicians' reasoning before their roles change materially?")]
                ]
              },
              {
                title: "The university adviser whose experience was disappearing",
                lines: [
                  ["A university redesigns student advising so routine requests move online while advisers focus on complicated academic circumstances.", t("Remedial - Knowledge and retention", "A digital service still depends on experienced judgement.")],
                  ["The new process handles straightforward enquiries automatically and directs unusual cases to advisers.", dg("The redesigned advising process", D.flow(["Student|submits request", "System|handles routine", "!Complex|case", "Adviser|supports decision"]), "Automation changes the work remaining for advisers.")],
                  ["An experienced adviser understands how programme requirements interact and which cases require academic review.", st("Experienced employees may know more than formal procedures record.")],
                  ["But the university writes new job descriptions without asking advisers how they handle difficult cases.", iss("The workflow is documented, but the reasoning behind unusual decisions is overlooked.", "Incomplete knowledge transfer")],
                  ["Imagine a student whose previous study creates an unusual eligibility question.", dg("An unusual student case", D.flow(["Student|requests advice", "Previous|study reviewed", "Eligibility|uncertain", "Academic|decision needed"]), "Complex cases require evidence and appropriate decision ownership.")],
                  ["The adviser knows which evidence matters and which authorised academic role should decide.", q("What knowledge might disappear if experienced advisers are excluded from the redesign?")],
                  ["The university could lose practical understanding of recurring exceptions, relevant evidence and escalation relationships.", null],
                  ["A better approach invites advisers to develop worked examples explaining how they recognise and investigate unusual cases.", dg("Turning experience into guidance", D.flow(["Unusual|student case", "Adviser|explains reasoning", "Worked|example", "Guidance|shared"]), "Practical knowledge becomes reusable organisational guidance.")],
                  ["Those examples help colleagues recognise difficult situations without relying entirely on informal contacts.", st("Knowledge transfer should preserve judgement while respecting formal decision boundaries.")],
                  ["Employees also need to understand how their expertise remains valuable in the redesigned service.", cmp("a", "Unclear transition", "New instructions arrive without explaining the future role.", "down")],
                  ["A supported transition gives employees clear responsibilities and opportunities to contribute their experience.", cmp("b", "Supported transition", "Employees understand their contribution and help improve the service.", "up")],
                  ["Uncertainty can create retention risks even when the technology operates successfully.", iss("A technically successful redesign may still threaten valuable employee knowledge.", "The human transition matters")],
                  ["Managers should investigate concerns and record significant retention risks before experienced advisers leave.", dg("Managing knowledge and retention", D.flow(["Identify|concerns", "Capture|expertise", "Clarify|future roles", "Manage|risks"]), "Knowledge preservation and retention require early attention.")],
                  ["Qasr reports two Guest Host resignations, but their individual reasons are unknown.", st("Observed departures justify investigation, not assumptions about resistance.")],
                  ["The goal is to preserve useful experience without protecting outdated routines.", q("How could involving experienced Guest Hosts in worked exception cases support knowledge transfer and organisational change?")]
                ]
              }
            ]
          }
        ]
      },
      {
        id: "l4",
        title: "Making the people design real",
        sections: [
          {
            title: "Repairing the Guest Host specification",
            sec: "W10O2d",
            lines: [
              ["We have identified Qasr's authority gap, conflicting measures, untested capability and knowledge risks. Now the sponsor wants a repair, not another diagnosis.", t("Repairing the Guest Host specification", "Turn the People-phase findings into a workable role.")],
              ["Twenty-two former Front Desk Agents now support arrivals and investigate exceptions across four pilot properties.", dg("The Guest Host's real work", D.flow(["Guest|arrives", "Kiosk|handles routine", "!Exception|identified", "Guest Host|investigates"]), "The redesigned role combines human assistance with appropriate exception resolution.")],
              ["But their revised job descriptions arrived three weeks after go-live. Employees started new responsibilities before receiving updated formal expectations.", iss("New responsibilities began before the role documentation was ready.", "Three-week documentation delay")],
              ["The first repair is a role description explaining responsibilities, boundaries, reporting and the outcomes Guest Hosts should deliver.", it(1, 5, "users", "Define the work", "Document responsibilities, accountability and reporting relationships.")],
              ["RACI must agree with that description, because investigating an exception does not automatically make the Guest Host accountable for every policy decision.", dg("Responsibility and ownership", D.flow(["Guest Host|investigates", "Relevant role|advises", "Decision owner|decides", "Guest|receives outcome"]), "The redesigned role must connect with cross-functional accountability.")],
              ["Now examine the AED 400 waiver. Guest Hosts received this permission in a briefing, but it remains absent from formal delegation.", iss("The expected local decision lacks documented authority.", "The AED 400 gap")],
              ["The second repair formally defines eligible waivers, the decision limit and escalation beyond that limit.", it(2, 5, "key", "Document authority", "Make the permitted decision boundary organisationally dependable.")],
              ["Imagine an eligible AED 320 discrepancy. The Host should be able to consider local resolution, while an AED 460 case exceeds the communicated limit.", dg("Two illustrative decisions", D.branch("Rate discrepancy", ["AED 320: check eligibility", "AED 460: escalate", "Apply decision-quality rules"]), "These amounts illustrate the proposed decision boundary, not observed Qasr transactions.")],
              ["The limit is not permission to waive every smaller discrepancy. Eligibility, judgement and accountability still matter.", st("Authority enables appropriate decisions, not automatic approvals.")],
              ["The specification also needs a justified reporting relationship. Qasr's final Guest Host reporting line is not established in the case.", q("Who should provide operational support when a decision exceeds the Host's authority?")],
              ["Next, the inherited scorecard still rewards check-ins completed per shift and average transaction time.", cmp("a", "Inherited objectives", "Conventional check-in volume and transaction speed.", "down")],
              ["Those measures conflict with a role centred on difficult exceptions, especially because kiosk check-ins are not attributed to individual Hosts.", iss("The employee's valuable new work may reduce performance against the old targets.", "The incentive contradiction")],
              ["The third repair replaces conflicting throughput targets with appropriate exception-resolution outcomes and quality safeguards.", it(3, 5, "gauge", "Align performance", "Recognise eligible resolutions without rewarding inappropriate decisions.")],
              ["A quality sample should check whether employees followed policy, respected authority and escalated when necessary.", dg("A proposed balanced measure", D.flow(["Eligible|exception", "Appropriate|resolution", "Quality|sample", "Outcome|reviewed"]), "The measure is proposed; it is not an implemented Qasr scorecard.")],
              ["Qasr should also review the unchanged job grade and rewards against the redesigned responsibilities, without assuming that a higher grade is automatically justified.", st("Employment changes require evaluation of the actual work.")],
              ["The fourth repair is demonstrated capability. Employees must practise difficult cases and explain their decisions.", it(4, 5, "brain", "Assess capability", "Test investigation, judgement, waiver eligibility and escalation.")],
              ["All twenty-two attended induction, but nobody assessed their capability afterwards. A green attendance report cannot close that gap.", dg("Attendance versus readiness", D.flow(["22 attended|induction", "Capability|not assessed", "Realistic|cases", "Readiness|evidence"]), "Participation is confirmed; decision capability remains unverified.")],
              ["Finally, the fifth repair assigns ownership for adoption measurement and investigation of alternative operating paths.", it(5, 5, "chart", "Own adoption", "Measure actual use, classify exceptions and coordinate corrective action.")],
              ["That owner should examine the sixty-five percent adoption figure, desk-handled arrivals and repeated referrals without assuming every deviation is resistance.", dg("The complete role repair", D.flow(["Role|defined", "Authority|documented", "Measures|aligned", "Capability|assessed", "Adoption|owned"]), "Five connected changes support one redesigned process.")],
              ["These are recommendations, not completed corrections. The sponsor must approve, implement and test them.", st("A repair proposal becomes credible when operating evidence shows improvement.")],
              ["If you could begin with one documented contradiction, which would you correct first, and how would you know the correction worked?", q("Which Guest Host repair deserves priority, and what evidence would demonstrate improvement?")]
            ],
            review: [
              {
                title: "Repairing the university student success adviser role",
                lines: [
                  ["A university creates Student Success Adviser positions to coordinate complicated academic and administrative requests.", t("Remedial - Repairing a redesigned role", "A university adviser needs more than a new title.")],
                  ["The redesigned process expects advisers to investigate problems and help students obtain appropriate decisions.", dg("The redesigned support journey", D.flow(["Student|requests help", "Adviser|investigates", "Relevant|decision", "Student|receives outcome"]), "One adviser coordinates the student's journey across functions.")],
                  ["But the old job description still describes recording enquiries and referring students to separate offices.", iss("The new process expects coordination, but the formal role remains referral-based.", "An incomplete role")],
                  ["Imagine a student requesting an exception to an enrolment requirement. The adviser understands the problem but cannot establish who may approve it.", q("What must be clarified before expecting the adviser to resolve this case?")],
                  ["The university must define the adviser's responsibilities while preserving decisions reserved for authorised academic roles.", cmp("a", "Student Success Adviser", "Investigates and coordinates the student's case.", "up")],
                  ["The authorised decision owner remains accountable for approvals governed by academic or administrative rules.", cmp("b", "Authorised decision owner", "Makes decisions within the relevant delegated authority.", "up")],
                  ["Formal delegation should explain which administrative decisions advisers may make and when escalation is required.", dg("A usable decision boundary", D.flow(["Issue|identified", "Authority|checked", "Local|decision", "Escalation|when required"]), "Responsibilities and authority must agree.")],
                  ["Now imagine managers continuing to measure advisers by enquiries closed per shift.", iss("Complex coordination takes longer but may appear less productive.", "The wrong incentive")],
                  ["The university should replace conflicting targets with appropriate case-resolution outcomes and quality safeguards.", dg("Aligning performance", D.flow(["Redesigned|responsibility", "Relevant|outcome", "Quality|review", "Aligned|measure"]), "The scorecard should support the new contribution.")],
                  ["It should also review job grade and rewards against actual responsibilities, rather than assuming a new title automatically deserves higher pay.", st("Grade and reward decisions require justified evaluation.")],
                  ["Advisers need realistic practice with unusual cases, followed by assessment of their judgement and escalation decisions.", dg("Demonstrating readiness", D.flow(["Define|work", "Document|authority", "Align|measures", "Assess|capability", "Monitor|adoption"]), "A coherent role combines formal arrangements with demonstrated capability.")],
                  ["A named owner should then examine whether students genuinely receive support through the intended process.", null],
                  ["This is the same connected repair Qasr needs for its Guest Hosts.", st("A workable role aligns responsibility, authority, measures, capability and adoption.")],
                  ["Updating the job description alone would leave several operating contradictions unresolved.", q("Why would a revised adviser job description be insufficient without decision authority and aligned measures?")]
                ]
              },
              {
                title: "The insurance claims specialist's missing specification",
                lines: [
                  ["An insurance company automates routine claims and asks specialists to investigate complicated exceptions.", t("Remedial - A complete role-repair decision", "A claims specialist needs a coherent operating design.")],
                  ["The software handles straightforward cases, while specialists examine unusual evidence and make appropriate decisions.", dg("The redesigned claims journey", D.flow(["Claim|submitted", "Automatic|assessment", "!Complex|exception", "Specialist|investigates", "Decision|communicated"]), "Automation changes the work remaining for employees.")],
                  ["But the formal role still describes recommending approvals, and the delegation schedule omits the authority announced during briefing.", iss("Expected independent decisions conflict with formal responsibilities and delegation.", "A contradictory role")],
                  ["A specialist investigates a valid claim but refers it upward because independent approval might later be challenged.", q("Would repeating the instruction to act independently repair this problem?")],
                  ["No. The company must document permitted decisions, accountability and escalation beyond approved limits.", dg("Repairing authority", D.flow(["Specialist|investigates", "Delegation|checked", "Appropriate|decision", "Escalation|when needed"]), "Formal permission must support the redesigned responsibility.")],
                  ["The inherited performance measure also rewards claims processed per hour, although complicated investigations naturally take longer.", cmp("a", "Inherited objective", "Maximise claims processed per hour.", "down")],
                  ["A replacement should recognise appropriate resolution of eligible complex claims, supported by quality review.", cmp("b", "Redesigned contribution", "Resolve eligible exceptions accurately and within authority.", "up")],
                  ["Without quality safeguards, employees might approve questionable claims merely to increase their resolution count.", iss("A resolution target can encourage inappropriate approvals if decision quality is ignored.", "A new incentive risk")],
                  ["The company should review grade and rewards against changed responsibilities, but any adjustment requires evaluation.", st("Rewards must fit the work rather than the new title alone.")],
                  ["Specialists also need practice handling ambiguous evidence and recognising when specialist escalation is required.", dg("From role repair to readiness", D.flow(["Role|clarified", "Authority|documented", "Measures|aligned", "Capability|tested", "Support|provided"]), "Formal arrangements and demonstrated capability reinforce each other.")],
                  ["Managers should assess realistic decisions and provide targeted support when misunderstandings become visible.", null],
                  ["A named owner must also monitor whether claims follow the redesigned process rather than familiar referrals.", dg("Monitoring adoption", D.flow(["Observe|cases", "Classify|referrals", "Investigate|causes", "Correct|weaknesses"]), "Adoption evidence tests whether the new role works.")],
                  ["Qasr faces the same combination of authority, measurement and capability weaknesses.", st("A complete repair changes the organisational conditions shaping employee decisions.")],
                  ["The strongest priority is a documented contradiction supported by evidence, followed by testing its correction.", q("Which correction would you prioritise if specialists understood the claims rules but lacked formal approval authority?")]
                ]
              }
            ]
          },
          {
            title: "The eleven-week decision",
            sec: "W10O3d",
            lines: [
              ["Eleven weeks after launch, Qasr's sponsor opens a reassuring green dashboard. But does green mean the redesigned work is succeeding?", t("The eleven-week decision", "Look beyond milestones and choose defensible corrective action.")],
              ["The people workstream is green because all twenty-two Guest Hosts attended a four-hour induction.", dg("The green dashboard", D.flow(["22 Guest|Hosts", "Four-hour|induction", "Attendance|complete", "Status|green"]), "The status reflects completed induction attendance.")],
              ["Nobody assessed their capability afterwards. The dashboard confirms an activity, not readiness for difficult decisions.", iss("Attendance is complete, but operational capability remains unverified.", "A misleading readiness signal")],
              ["Now the sponsor reveals the operating evidence: kiosk adoption is sixty-five percent at week eleven.", dg("Observed adoption", D.progress("Week-eleven kiosk adoption", 65, 100, "%"), "The verified Qasr observation is 65% kiosk adoption at week eleven.")],
              ["That shows substantial use, but it does not establish that the redesigned process has become the normal path for every arrival.", st("Implementation is not complete adoption.")],
              ["Another twenty-nine percent of arrivals are desk-handled. Property managers report that most involve cases rejected by the kiosk.", dg("Desk-handled arrivals", D.progress("Desk-handled arrivals", 29, 100, "%"), "The 29% desk share includes cases that may legitimately require human assistance.")],
              ["The sponsor should not call every desk arrival a workaround without examining the reason for that path.", q("Which desk cases are necessary exceptions, and which might unnecessarily bypass the redesign?")],
              ["Next comes a more direct organisational contradiction: nine of the twenty-two Guest Hosts refer every rate discrepancy upward.", dg("Repeated escalation", D.flow(["22 Guest|Hosts", "9 always|refer", "Duty manager|decides", "Guest|waits"]), "The referral pattern is observed; individual motives remain unknown.")],
              ["The communicated AED 400 waiver is missing from formal delegation, even though eligible local decisions are part of the redesigned role.", iss("Expected authority and documented authority do not agree.", "A confirmed design weakness")],
              ["That makes formalising the waiver a defensible immediate priority, although the sponsor must still investigate why individual employees refer.", cmp("a", "Confirmed weakness", "The AED 400 waiver is absent from formal delegation.", "down")],
              ["The proposed correction is to document eligibility, decision limits and escalation, then test whether employees apply the rules correctly.", cmp("b", "Defensible response", "Formalise authority and assess decision capability.", "up")],
              ["Consider an eligible AED 320 discrepancy in a simulation. The Guest Host should understand when local resolution is appropriate.", dg("Testing the correction", D.flow(["Eligible|case", "Authority|confirmed", "Host|decides", "Quality|reviewed"]), "The example illustrates how formal authority and practical assessment work together.")],
              ["A case beyond AED 400 requires appropriate escalation, because clearer authority does not remove decision boundaries.", st("The correction must improve appropriate decisions, not simply reduce referrals.")],
              ["The sponsor also learns that two Guest Hosts resigned after the redesign began.", dg("Observed departures", D.flow(["22 Guest|Hosts", "2 observed|resignations", "Reasons|unknown", "Retention|review"]), "The case reports two departures without establishing their causes.")],
              ["Those departures justify investigating retention and knowledge risks, but they do not prove dissatisfaction or resistance.", iss("Observed resignations cannot establish individual motives.", "A retention question, not a verdict")],
              ["Finally, one pilot property reinstated a permanent desk that the redesign had removed.", dg("The reinstated desk", D.branch("Permanent desk restored", ["Necessary service support?", "Avoidable old practice?", "Investigate actual cases"]), "The decision has competing interpretations.")],
              ["It might protect guests whose kiosk exceptions genuinely require assistance.", cmp("a", "Service protection", "The desk supports legitimate exceptions.", "up")],
              ["Or it might encourage routine arrivals to return unnecessarily to conventional check-in.", cmp("b", "Redesign erosion", "The desk preserves avoidable old activity.", "down")],
              ["The sponsor needs classified case evidence before deciding whether to retain, modify or remove the desk.", st("Do not choose between plausible explanations without examining actual cases.")],
              ["Now bring the evidence together: adoption, desk activity, repeated referrals, untested capability and retention concerns.", dg("The sponsor's evidence board", D.flow(["65%|adoption", "29%|desk-handled", "9 always|refer", "Capability|untested", "2 observed|departures"]), "Each observation raises a distinct management question.")],
              ["A credible decision separates established facts, plausible causes and proposed actions rather than treating every concern as employee resistance.", dg("A defensible decision sequence", D.flow(["Confirm|evidence", "Diagnose|causes", "Prioritise|corrections", "Assign|owners", "Measure|results"]), "The sponsor needs accountable corrective action and evidence of improvement.")],
              ["Formal delegation is a strong starting point because its absence is documented. Capability assessment and adoption investigation should accompany it.", st("Prioritise confirmed contradictions while investigating unresolved causes.")],
              ["The sponsor should revise the green readiness interpretation and request operating evidence that tests whether the corrections work.", q("What would you tell Qasr's sponsor about the green status, and which correction would you defend first?")]
            ],
            review: [
              {
                title: "The hospital discharge programme that reported green",
                lines: [
                  ["A hospital redesigns discharge coordination and reports a green programme status after launching its system and completing training.", t("Remedial - Reading beyond the green status", "Completed activities do not automatically establish operational readiness.")],
                  ["The new system connects discharge requirements across clinical and administrative departments.", dg("The intended discharge process", D.flow(["Discharge|approved", "Requirements|coordinated", "Exceptions|resolved", "Patient|leaves"]), "Digital coordination and human judgement must work together.")],
                  ["All coordinators attended training, but nobody assessed how they handle difficult discharge cases.", iss("Training attendance is confirmed; practical capability remains untested.", "A readiness gap")],
                  ["The sponsor discovers that difficult cases still involve repeated telephone calls between departments.", q("Does that prove resistance, or could unclear authority and capability also explain the behaviour?")],
                  ["A coordinator may understand the system but lack permission to resolve an operational dependency.", cmp("a", "Authority gap", "The employee lacks clear permission to make an expected decision.", "down")],
                  ["Another coordinator may possess authority but struggle to recognise when specialist clinical input is necessary.", cmp("b", "Capability gap", "The employee cannot yet apply the required judgement reliably.", "down")],
                  ["These causes require different remedies. Repeating software training cannot create missing decision authority.", st("Diagnose the organisational cause before choosing corrective action.")],
                  ["The hospital should examine real cases and assess decisions using realistic discharge scenarios.", dg("Investigating readiness", D.flow(["Observe|case", "Identify|cause", "Assess|decision", "Choose|correction"]), "Operational evidence should guide the response.")],
                  ["The sponsor also needs adoption evidence showing whether departments use the redesigned coordination process.", null],
                  ["Alternative paths must be classified because some may protect patients while others recreate unnecessary delays.", dg("Classifying operating paths", D.branch("Alternative discharge path", ["Necessary coordination?", "Avoidable workaround?", "Evidence required"]), "Not every alternative activity is inappropriate.")],
                  ["Imagine one ward restoring a dedicated administrative desk. It could support complex discharges or preserve outdated arrangements.", iss("Restoring an old arrangement has competing interpretations.", "A decision requiring evidence")],
                  ["The sponsor should examine the cases handled before deciding what to change.", st("Distinguish observed facts from explanations that still require investigation.")],
                  ["This resembles Qasr's green people-workstream status despite untested Guest Host capability.", dg("A credible sponsor response", D.flow(["Evidence|reviewed", "Weakness|identified", "Correction|proposed", "Result|measured"]), "Management decisions should connect operating evidence with targeted action.")],
                  ["The lesson is that successful organisational change requires more than completed milestones.", q("Why should the hospital sponsor request capability and adoption evidence before accepting a green readiness status?")]
                ]
              },
              {
                title: "The retailer deciding whether to keep its manual counter",
                lines: [
                  ["An online retailer reviews its redesigned returns process after one store reinstates a permanent manual counter.", t("Remedial - Defending a corrective decision", "A restored service channel can have competing explanations.")],
                  ["Routine returns should receive automatic decisions, while specialists investigate unusual circumstances.", dg("The intended returns journey", D.flow(["Return|requested", "Automatic|assessment", "!Exception|identified", "Specialist|resolves"]), "The redesigned process separates routine and exceptional work.")],
                  ["The store manager argues that the counter protects customers who cannot complete digital returns.", cmp("a", "Service continuity", "The counter supports genuine exceptions or access difficulties.", "up")],
                  ["The programme manager worries that employees are sending ordinary requests back to familiar manual procedures.", cmp("b", "Redesign erosion", "The counter encourages unnecessary manual handling.", "down")],
                  ["Both explanations are plausible. The counter's existence alone cannot establish which one is correct.", q("What evidence would help determine whether the counter protects customers or undermines the redesign?")],
                  ["The retailer should classify the returns handled and examine whether the digital process could reasonably have completed them.", dg("Investigating the counter", D.flow(["Manual|case recorded", "Reason|classified", "Authority|checked", "Corrective|decision"]), "Case evidence helps distinguish necessary assistance from avoidable manual work.")],
                  ["Imagine specialists referring every disputed refund upward because their approval authority was never formally updated.", iss("Repeated referrals may reflect missing delegation rather than unwillingness to change.", "An authority contradiction")],
                  ["The retailer should document decision rights and assess whether employees understand how to apply them.", null],
                  ["Managers must also examine performance measures that might reward manual transaction volume instead of appropriate exception resolution.", st("Authority, capability and incentives should be investigated together.")],
                  ["Suppose the sponsor needs to choose a priority before every cause is known.", dg("Choosing a defensible priority", D.flow(["Confirmed|weakness", "Targeted|repair", "Operating|test", "Result|review"]), "Prioritise a documented contradiction and test its correction.")],
                  ["Assuming resistance would be weak reasoning. Correcting a missing formal delegation is stronger when that weakness is established.", cmp("a", "Weak response", "Assume employees resist and demand immediate compliance.", "down")],
                  ["A stronger response repairs the documented contradiction while continuing to investigate other causes.", cmp("b", "Evidence-based response", "Correct authority, assess capability and monitor operating behaviour.", "up")],
                  ["The sponsor should measure adoption and classify alternative paths after the correction.", null],
                  ["Qasr faces the same decision when a pilot property reinstates a permanent desk.", st("A justified decision protects necessary service while removing avoidable old practices.")],
                  ["The goal is not eliminating every alternative path. It is ensuring each path supports the intended process.", q("How would you defend a decision about the manual counter without claiming every customer's reason for using it is known?")]
                ]
              }
            ]
          },
          {
            title: "The handover and the next phase",
            sec: "W10O3e",
            lines: [
              ["We have reached the end of Qasr's People-phase investigation. What must the sponsor carry forward?", t("The handover and the next phase", "Turn People-phase findings into requirements for Develop.")],
              ["The redesigned arrival process needs organisational arrangements that make the new work possible, not merely functioning kiosks and new job titles.", st("The People phase prepares employees and the organisation to perform the redesigned process.")],
              ["First, Qasr needs role definitions that describe Guest Host responsibilities and identify accountability across the arrival journey.", dg("The People-phase handover", D.flow(["Redesigned|process", "Defined|roles", "Documented|authority", "Aligned|measures", "Assessed|capability"]), "The handover connects the approved process design with organisational requirements.")],
              ["Second, formal delegation must document the eligible AED 400 waiver and escalation when cases exceed authorised limits.", dg("From responsibility to authority", D.flow(["Guest Host|investigates", "Formal|delegation", "Appropriate|decision", "Escalation|when needed"]), "Employees need dependable decision rights and clear boundaries.")],
              ["Third, performance measures must recognise appropriate exception resolution rather than reward conventional check-in volume and speed.", cmp("a", "Inherited objectives", "Check-ins per shift and average transaction time.", "down")],
              ["A revised measure should recognise useful outcomes while checking decision quality and compliance with authority.", cmp("b", "Redesigned contribution", "Appropriate exception resolution with quality safeguards.", "up")],
              ["The conflicting old targets must be removed, because keeping both sends employees contradictory instructions.", st("Measures and rewards must reinforce the redesigned work.")],
              ["Fourth, capability must be demonstrated through realistic cases. Attendance at induction is not enough.", dg("From training to readiness", D.flow(["Induction|attended", "Realistic|practice", "Capability|assessed", "Gaps|addressed"]), "The programme needs evidence of practical judgement.")],
              ["Qasr knows that all twenty-two Guest Hosts attended induction, but their post-induction capability was not assessed.", iss("Completed training does not establish operational readiness.", "Capability remains unverified")],
              ["Fifth, adoption needs a named owner who reports actual use, classifies alternative paths and coordinates corrective action.", dg("Adoption ownership", D.flow(["Weekly|adoption", "Exceptions|classified", "Owner|reports", "Sponsor|reviews"]), "Adoption evidence must have clear accountability.")],
              ["At week eleven, kiosk adoption is sixty-five percent and twenty-nine percent of arrivals are desk-handled.", dg("The observed operating position", D.progress("Week-eleven kiosk adoption", 65, 100, "%"), "Qasr reports 65% kiosk adoption; desk handling requires separate investigation.")],
              ["Some desk-handled cases may legitimately require human assistance, so the sponsor must not label every alternative path a workaround.", st("Investigate actual cases before judging the operating path.")],
              ["These requirements must remain coordinated with technology development, because systems need to support the decisions employees are authorised to make.", dg("People and Develop together", D.flow(["People|requirements", "Technology|requirements", "Coordinated|design", "Operational|readiness"]), "Organisational and technical requirements must reinforce each other.")],
              ["For example, a workflow should recognise the approved waiver boundary and route cases beyond that authority appropriately.", q("What would happen if developers configured approval rules before Qasr clarified formal delegation?")],
              ["The next BPM framework phase is Develop, phase seven, where the programme builds, configures or acquires supporting components.", dg("The next phase", D.route([6]), "Develop follows People as framework phase seven.")],
              ["People and Develop are connected rather than isolated. Technical discoveries may reveal additional responsibilities, decision rules or capability needs.", cmp("a", "People", "Who performs the work, with what authority, capability and incentives?", "up")],
              ["Develop asks what supporting components must be built, configured or acquired for the approved design.", cmp("b", "Develop", "How will technology and operational components support the process?", "up")],
              ["Before leaving Week 10, you will apply this reasoning to an unfamiliar organisation in the discussion forum.", t("Week 10 discussion forum", "The Role That Was Never Designed")],
              ["Read the forum case and its exhibit. Your task is to design an appropriate role and explain how performance measures may influence behaviour.", dg("The forum challenge", D.flow(["Read|case and exhibit", "Design|role", "Explain|measures", "Defend|reasoning"]), "Use evidence from the actual forum case rather than assuming it mirrors Qasr.")],
              ["Post a substantive initial contribution by mid-week, then respond meaningfully to at least two classmates.", dg("Constructive discussion", D.flow(["Initial|analysis", "Peer|argument", "Reasoned|challenge", "Stronger|conclusion"]), "Academic disagreement should use evidence and BPM concepts.")],
              ["Include a reasoned disagreement that challenges or extends an argument rather than simply expressing approval.", null],
              ["Support your discussion with Jeston's Chapter 18 and read the facilitator's end-of-week summary.", st("Use the reading, the case exhibit and your own evidence-based reasoning.")],
              ["The forum is formative and contributes to Assessment 4, Participation, scheduled for Week 14.", null],
              ["Finally, remember that Qasr's corrections remain proposals until implementation and operating evidence demonstrate improvement.", dg("From People to performance", D.flow(["Role|ready", "Authority|usable", "Capability|demonstrated", "Adoption|measured", "Value|realised"]), "The People phase creates conditions for dependable future performance.")],
              ["A redesigned process becomes real when employees can perform it, managers support it and evidence shows that it works.", q("When Qasr enters Develop, what evidence would convince you that its people arrangements are ready?")]
            ],
            review: [
              {
                title: "The hospital preparing its digital discharge handover",
                lines: [
                  ["A hospital prepares to develop a digital discharge service that coordinates departments and supports safe patient departure.", t("Remedial - Preparing a credible handover", "Organisational requirements must accompany technology development.")],
                  ["The redesigned process uses shared information and a coordinator to manage outstanding requirements.", dg("The redesigned discharge journey", D.flow(["Discharge|approved", "Requirements|coordinated", "Exceptions|resolved", "Patient|leaves"]), "Digital coordination and human judgement work together.")],
                  ["The technology team is ready, but the sponsor asks whether employees have clear responsibilities and authority.", iss("A working application cannot compensate for incomplete organisational arrangements.", "An incomplete handover")],
                  ["Role definitions should explain what coordinators do and which decisions remain with authorised clinical professionals.", dg("Defining the role", D.flow(["Coordinator|investigates", "Operational|decision", "Clinical|authority", "Patient|supported"]), "Responsibilities must respect professional decision boundaries.")],
                  ["Accountability should follow the redesigned discharge journey rather than reproduce unnecessary departmental handoffs.", st("Role definitions and accountability must agree with the redesigned process.")],
                  ["Coordinators need documented authority for appropriate operational adjustments and escalation when specialist approval is required.", dg("Decision boundaries", D.flow(["Issue|identified", "Authority|checked", "Local|resolution", "Specialist|escalation"]), "Clear delegation supports appropriate decisions.")],
                  ["Now imagine coordinators still measured by administrative records completed per shift.", cmp("a", "Old objective", "Administrative records completed during a shift.", "down")],
                  ["That target can discourage difficult coordination work, so the hospital needs a measure recognising appropriate discharge-obstacle resolution.", cmp("b", "Redesigned contribution", "Resolve discharge obstacles while respecting clinical safeguards.", "up")],
                  ["The old conflicting target should be removed, and reward arrangements reviewed against the new responsibilities.", null],
                  ["Employees also need realistic practice handling missing information and recognising when clinical decisions require authorised professionals.", dg("Demonstrating capability", D.flow(["Realistic|case", "Coordinator|responds", "Decision|assessed", "Support|provided"]), "Capability is demonstrated through performance, not inferred from attendance.")],
                  ["A named owner should then measure whether actual discharges follow the redesigned process.", dg("The complete People handover", D.flow(["Roles|defined", "Authority|documented", "Measures|aligned", "Capability|assessed", "Adoption|owned"]), "Organisational readiness supports later implementation.")],
                  ["Technology developers can use these requirements to configure information, permissions and escalation routes.", st("People and technology requirements must be coordinated.")],
                  ["The handover does not end people-related work. Technical discoveries may require additional support or revised responsibilities.", null],
                  ["Qasr faces the same connection between Guest Host authority and kiosk-supported workflows.", q("Why should the hospital clarify responsibilities and decision rights before treating its digital discharge design as ready for development?")]
                ]
              },
              {
                title: "The retailer taking its redesigned returns process into development",
                lines: [
                  ["An online retailer prepares to develop technology for automatic routine returns and specialist handling of unusual cases.", t("Remedial - Connecting People with Develop", "Employee decision rights shape technology requirements.")],
                  ["The intended process sends routine requests through automation while specialists investigate exceptions.", dg("The redesigned returns journey", D.flow(["Return|requested", "Automatic|assessment", "!Exception|identified", "Specialist|resolves"]), "Automation and human judgement support different parts of the journey.")],
                  ["But specialist responsibilities and approval authority remain unclear as developers begin designing the workflow.", iss("Technology development begins before essential people requirements are settled.", "An incomplete specification")],
                  ["A developer asks which refund amounts specialists may approve without managerial permission.", q("Why is this an organisational question as well as a technology question?")],
                  ["The system must reflect formal authority, because workflow controls should support decisions employees are permitted to make.", dg("From people requirements to system controls", D.flow(["Defined|responsibility", "Required|information", "Decision|controls", "Supported|workflow"]), "Role requirements shape the supporting technology.")],
                  ["The retailer should document delegation and escalation before finalising approval rules.", st("People and Develop must remain coordinated.")],
                  ["Specialists also need information that supports investigation and communication with customers.", null],
                  ["Their inherited performance measures still reward transaction volume, although complex cases require more judgement.", cmp("a", "Old objective", "Maximise returns processed each hour.", "down")],
                  ["A better measure could recognise eligible exceptions resolved appropriately with a quality review.", cmp("b", "Redesigned contribution", "Resolve eligible complex returns accurately and within authority.", "up")],
                  ["The retailer should remove conflicting targets and review reward arrangements against the changed responsibilities.", null],
                  ["Employees need realistic practice applying refund rules and recognising cases requiring escalation.", dg("Preparing for implementation", D.flow(["Practise|cases", "Assess|judgement", "Address|gaps", "Support|operation"]), "Readiness requires demonstrated capability.")],
                  ["Training attendance alone cannot establish that employees can make appropriate decisions.", st("Capability evidence must go beyond completion of scheduled learning activities.")],
                  ["After launch, a named owner should measure adoption and classify alternative manual handling.", dg("Adoption after launch", D.flow(["Observe|returns", "Classify|manual paths", "Investigate|causes", "Correct|weaknesses"]), "Some manual cases may be necessary while others reveal avoidable workarounds.")],
                  ["The retailer should not assume that every manual case represents resistance or failure.", null],
                  ["This connects the People phase with implementation, value realisation and sustainable performance.", st("Organisational arrangements and technology must support the same process.")],
                  ["Qasr faces the same issue as it moves into Develop: its systems must reflect documented Guest Host authority.", q("What could go wrong if the retailer developed approval controls before deciding which exceptions specialists may authorise?")]
                ]
              }
            ]
          }
        ]
      }
    ]
  };
 
  COURSE.lessons.forEach((lesson) => {
    lesson.sections.forEach((section) => {
      section.script = section.lines.map((line) => line[0]).join(" ");
      if (Array.isArray(section.review)) {
        section.review.forEach((remedial) => {
          remedial.script = remedial.lines.map((line) => line[0]).join(" ");
        });
      }
    });
  });
 
  window.COURSE = COURSE;
})();
