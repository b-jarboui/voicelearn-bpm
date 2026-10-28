// OPER621 Business Process Management — Week 7
// Adaptive layer: CLOs, weekly outcomes, section mappings, mastery rules and remedial micro-lessons.
// Topic: The Launch Pad Phase — Framework Phase 3.
// Sources: OPER621 Week 7 slides, Week 7 Delivery Plan, and Jeston, Chapter 15.
// Author: Prof. Bassem Jarboui
//
// Official CLOs:
// K2 — Evaluate various factors that impact on the successful implementation of BPM in public and private sector organizations.
// S1 — Design a framework for BPM and explain and assess related phases in the context of a regional company.
//
// Weekly outcomes:
// O1 — Explain how the Launch Pad phase determines where a BPM programme begins.
// O2 — Apply prioritisation criteria when many processes are underperforming.
// O3 — Justify a starting scope and defend it against stakeholders who preferred another.
//
// Primary CLO mappings: O1 -> S1; O2 -> K2; O3 -> S1.
// Supporting CLO mappings: O1 -> K2; O2 -> S1; O3 -> K2.
// Each outcome retains one primary CLO in the runtime schema.
//
// The question bank itself is in bank.js.
// Remedial micro-lessons are used ONLY in remediation, never in the main lessons.
// Each remedial variant uses a fresh example and a different explanatory angle.
// Narration uses complete spoken sentences, with meaningful visual moments.
// Each sentence contains 6–30 words; each remedial variant contains 230–360 spoken words.
// No mechanical spoken enumeration.
 
(() => {
  const D = window.DIAG, { t, it, q, st, iss, cmp, dg } = window.MOMENT_KIT;
 
  window.ADAPTIVE = {
    target: 0.8,          // mastery threshold per section, per outcome and per CLO
    window: 5,            // section mastery = share correct in the learner's last 5 answers on that section
    minEvidence: 3,       // a section needs at least 3 answers before it can count as mastered
    firstCheck: 4,        // minimum items per lesson check (spread evenly over the lesson's sections)
    firstCheckPerSection: 3, // at least 3 items per section in every lesson check
    perWeak: 3,           // fresh items per weak section in every remediation round
 
    clos: {
      K2: {
        name: "K2",
        full: "Evaluate various factors that impact on the successful implementation of BPM in public and private sector organizations"
      },
      S1: {
        name: "S1",
        full: "Design a framework for BPM and explain and assess related phases in the context of a regional company"
      },
    },
 
    outcomes: {
      O1: {
        clo: "S1",
        name: "Explain the Launch Pad",
        full: "Explain how the Launch Pad phase determines where a BPM programme begins"
      },
      O2: {
        clo: "K2",
        name: "Prioritise candidate processes",
        full: "Apply prioritisation criteria when many processes are underperforming"
      },
      O3: {
        clo: "S1",
        name: "Justify the starting scope",
        full: "Justify a starting scope and defend it against stakeholders who preferred another"
      },
    },
 
    sections: {
      O1a: { lo: "O1", lesson: "l1", name: "Why the Launch Pad matters" },
      O1b: { lo: "O1", lesson: "l1", name: "The five decisions that make a project possible" },
      O1c: { lo: "O1", lesson: "l1", name: "What a completed Launch Pad must deliver" },
 
      O2a: { lo: "O2", lesson: "l2", name: "Choosing a process that matters and can be delivered" },
      O2b: { lo: "O2", lesson: "l2", name: "Qasr's four competing candidates" },
      O2c: { lo: "O2", lesson: "l2", name: "Making a defensible first choice" },
 
      O3a: { lo: "O3", lesson: "l3", name: "Drawing a boundary that solves the problem" },
      O3b: { lo: "O3", lesson: "l3", name: "The people who can make the project succeed" },
      O3c: { lo: "O3", lesson: "l3", name: "Turning disagreement into an agreed commitment" },
 
      O3d: { lo: "O3", lesson: "l4", name: "Establishing the baseline before redesign" },
      O3e: { lo: "O3", lesson: "l4", name: "The one-page Launch Pad decision" },
      O3f: { lo: "O3", lesson: "l4", name: "From Qasr's decision to your forum" },
    },
 
    // Remedial micro-lessons: two per section, each using a different angle and a fresh example.
    // Round 1 of remediation on a section plays variant 0, round 2 plays variant 1, then they alternate.
    review: {
 
O1a: [
  {
    title: "The school that tried to fix everything",
    lines: [
      ["Imagine a school receiving complaints about enrolment delays, timetable problems, and replacement identification cards.", t("Why the Launch Pad matters", "A school cannot improve every process simultaneously, even when several problems deserve attention.")],
      ["Every department wants immediate improvement, but the school has only one small improvement team.", null],
      ["The principal announces that all departments should begin improving their services simultaneously.", iss("Several processes need attention, but the school has only one improvement team.", "Too many priorities")],
      ["Soon, employees attend overlapping meetings, decisions remain unresolved, and the team becomes overwhelmed.", null],
      ["Everyone appears busy, but no process receives enough attention to produce dependable improvement.", q("Why can launching more improvement projects actually reduce the organisation's chances of success?")],
      ["The problem is not unwilling employees but the absence of a realistic starting commitment.", null],
      ["The principal examines the school's strategy, which emphasises reliable services for families joining the school.", null],
      ["Its process architecture identifies enrolment as a journey connecting admissions, finance, academic administration, and student services.", dg("From strategy to a starting project", D.flow(["School|strategy", "Process|architecture", "Launch|Pad", "+Enrolment|project"]), "Strategy and process architecture inform the decision about where improvement should begin.")],
      ["Enrolment therefore appears strategically relevant, but the principal must still investigate whether improvement is deliverable.", null],
      ["She examines available employees, management support, process boundaries, and evidence of families' difficulties.", it(1, 3, "target", "Strategic relevance", "The proposed project should address an important organisational objective.")],
      ["The improvement team proposes concentrating on the enrolment journey rather than redesigning every school service.", null],
      ["A manageable boundary would allow limited resources to address a connected customer experience.", it(2, 3, "users", "Delivery readiness", "The organisation needs sufficient people, authority, and capacity to begin the selected work.")],
      ["The principal also identifies a sponsor and considers how improvements in enrolment performance could be measured.", null],
      ["These commitments turn a broad ambition into a project that managers can realistically begin.", it(3, 3, "check", "A practical commitment", "The Launch Pad establishes a supported starting point with responsibilities and measures.")],
      ["Timetable and identification-card problems remain important, even though they cannot receive the team's immediate attention.", null],
      ["The principal records these deferred concerns rather than pretending they have disappeared.", st("The Launch Pad converts strategic priorities into a realistic starting commitment.")],
      ["The school can now concentrate its improvement capacity while maintaining appropriate attention to other responsibilities.", null],
      ["Remember that a BPM programme becomes actionable when meaningful work receives the resources and leadership needed to succeed.", null]
    ]
  },
  {
    title: "A city map is not a journey",
    lines: [
      ["Imagine a city council seeking faster public services after residents complain about unnecessary waiting.", t("From architecture to action", "Process architecture describes organisational work, while the Launch Pad selects a practical improvement starting point.")],
      ["Its leaders have agreed that reducing delays is an important strategic objective.", null],
      ["The council has also mapped building permits, parking permits, business licences, and community facility registrations.", dg("The council's process landscape", D.flow(["Building|permits", "Parking|permits", "Business|licences", "Community|facilities"]), "The architecture identifies important processes without determining which improvement should begin.")],
      ["A manager proudly presents this process architecture and announces that improvement can now begin.", null],
      ["However, the improvement team asks which process it should investigate with its limited resources.", q("Does knowing how processes fit together determine which one should be improved now?")],
      ["The architecture describes organisational work but does not establish an immediate improvement commitment.", null],
      ["Imagine having a detailed city map showing every road and possible destination.", null],
      ["The map explains available routes but cannot decide where you should travel or whether the journey is practical.", cmp("a", "Process Architecture", "A map of organisational processes and their relationships.")],
      ["The Launch Pad provides the missing decision by identifying where meaningful improvement can realistically begin.", cmp("b", "Launch Pad", "A justified starting process with agreed scope, people, measures, and expected benefits.")],
      ["Suppose building-permit delays frustrate residents and businesses waiting to begin construction.", null],
      ["The council considers this process because delays may affect economic activity and public confidence.", null],
      ["However, strategic importance alone cannot establish whether the project is ready.", iss("Building permits may offer substantial value, but delivery conditions remain unconfirmed.", "Value without readiness")],
      ["The team examines sponsorship, available expertise, dependencies, and the proposed project boundary.", null],
      ["It also considers whether another process could produce meaningful results with fewer delivery obstacles.", it(1, 3, "target", "Choose the starting point", "Identify a worthwhile candidate using strategic relevance and process evidence.")],
      ["Once a process is recommended, managers must confirm leadership support and the people needed for investigation.", it(2, 3, "users", "Prepare the commitment", "Agree the proposed boundary, leadership support, and participation arrangements.")],
      ["The council must also establish how current performance and future improvements will be measured.", it(3, 3, "gauge", "Make success measurable", "Define the baseline approach and expected improvement measures.")],
      ["Only then can the Understand team investigate the selected process with a clear purpose.", null],
      ["The architecture remains valuable because it helps explain how the selected work connects with other services.", st("Strategy establishes direction, Process Architecture establishes context, and Launch Pad establishes the starting commitment.")],
      ["Remember that each framework phase answers a management question left unresolved by the preceding work.", null]
    ]
  }
],
 
O1b: [
  {
    title: "Preparing a community health clinic",
    lines: [
      ["Imagine a community health clinic receiving complaints about delays in arranging specialist appointments.", t("Five decisions behind a viable project", "A clinic improvement project needs more than agreement that appointment booking is slow.")],
      ["The director announces an improvement project, but employees disagree about which activities it should include.", null],
      ["Some want to redesign telephone booking, while others believe the online system causes most problems.", iss("The clinic has announced an improvement project without agreeing on its boundaries.", "An unclear commitment")],
      ["Nobody knows who can approve changes involving doctors' schedules or how improvement will be measured.", q("Can a project begin effectively when its boundaries and decision authority remain unclear?")],
      ["The director proposes examining the journey from a patient's specialist appointment request until confirmation is received.", dg("The proposed appointment process", D.flow(["Patient|requests", "Availability|checked", "Appointment|allocated", "+Confirmation|received"]), "The boundary follows the patient's appointment request through confirmation.")],
      ["This boundary excludes broader clinical treatment while including the scheduling handoffs relevant to appointment delays.", null],
      ["The director identifies an executive sponsor who can secure cooperation across the participating departments.", null],
      ["A process owner must also remain accountable for appointment performance after the improvement project finishes.", it(1, 3, "users", "People and authority", "The sponsor supports delivery, while the process owner remains accountable for performance.")],
      ["Receptionists, doctors, scheduling employees, and patient representatives contribute different perspectives on the journey.", null],
      ["Without their knowledge, the team might propose changes that appear efficient but cannot work operationally.", null],
      ["The director then asks how the clinic will demonstrate that appointment booking has improved.", q("What evidence would show that patients receive confirmed appointments more reliably?")],
      ["The team proposes measuring elapsed time between receiving an appointment request and confirming the booking.", null],
      ["Reliable records must establish current performance before managers agree on an improvement target.", it(2, 3, "gauge", "Performance evidence", "Measure request-to-confirmation time using a consistent method and reliable records.")],
      ["The clinic expects fewer repeated enquiries and less uncertainty for patients waiting for appointments.", null],
      ["However, these benefits remain expectations until later evidence demonstrates actual improvement.", null],
      ["The team also identifies risks involving unavailable appointment slots, incomplete records, and scheduling resistance.", iss("Limited appointment capacity and unreliable information could undermine the expected improvement.", "Initial delivery risks")],
      ["The project now has a selected process, proposed boundary, accountable people, and measurable objectives.", null],
      ["Its decision record also identifies expected benefits and risks requiring further attention.", it(3, 3, "check", "A prepared project", "Connect the improvement choice with scope, people, measures, benefits, and risks.")],
      ["The clinic can investigate current performance without assuming that the future solution is already known.", st("Launch Pad prepares the project; Understand investigates how the process actually works.")],
      ["Remember that agreeing a problem exists is not the same as preparing a viable improvement project.", null]
    ]
  },
  {
    title: "Why an enthusiastic sponsor is not enough",
    lines: [
      ["Imagine a university where students complain about delays when requesting academic transcripts.", t("A sponsor cannot replace project definition", "Leadership enthusiasm is valuable, but improvement also requires scope, measures, people, and risk awareness.")],
      ["The dean promises to support a project that makes transcript requests faster and more reliable.", null],
      ["Employees welcome the announcement, and the dean believes strong sponsorship makes the project ready.", null],
      ["However, the registrar and student services disagree about which activities belong inside the proposed improvement.", iss("Different departments have conflicting assumptions about the project's boundaries.", "Conflicting expectations")],
      ["The registrar focuses on transcript production, while student services includes receiving requests and checking eligibility.", null],
      ["Finance expects existing clearance procedures to remain outside any proposed changes.", q("Does having an enthusiastic sponsor mean the project is ready to begin?")],
      ["The team proposes examining the journey from receiving a complete request until the student receives the transcript.", dg("The proposed transcript journey", D.flow(["Request|received", "Eligibility|checked", "Transcript|prepared", "+Student|receives"]), "The proposed boundary follows a complete transcript request through delivery.")],
      ["This creates a shared boundary while allowing investigation of delays between departments.", null],
      ["The dean remains executive sponsor, but continuing process ownership must also be formally assigned.", cmp("a", "Executive sponsor", "Provides leadership support and helps resolve project barriers.")],
      ["The registrar could become process owner if the university grants appropriate responsibility and authority.", cmp("b", "Process owner", "Remains accountable for continuing process performance.")],
      ["Student services, academic administration, Finance, and students should contribute evidence about the actual journey.", null],
      ["Their involvement helps identify delays that departmental performance reports might overlook.", it(1, 3, "users", "Stakeholder participation", "Include people who perform, manage, support, and experience the process.")],
      ["The team proposes measuring elapsed time from a complete request until transcript delivery.", null],
      ["A verified baseline will describe current performance, while an agreed target will describe intended improvement.", it(2, 3, "gauge", "Evidence of success", "Define the measure and establish current performance before setting a target.")],
      ["Expected benefits include fewer student complaints and less administrative rework, but neither has been demonstrated.", null],
      ["Potential risks include incomplete records, delayed financial clearance, and limited employee availability.", iss("Expected benefits remain unproven until reliable evidence demonstrates actual change.", "Benefits and risks")],
      ["The dean asks the team to document these commitments before detailed investigation begins.", null],
      ["This decision strengthens sponsorship by connecting leadership support with practical project requirements.", it(3, 3, "check", "A complete commitment", "Document the selected process, boundary, people, measures, expected benefits, and risks.")],
      ["Remember that sponsorship enables improvement, but cannot replace the other decisions required for a viable project.", st("A credible Launch Pad connects leadership commitment with defined, measurable, and manageable work.")],
      ["The university can now investigate transcript delays without pretending it already knows the solution.", null]
    ]
  }
],
 
O1c: [
  {
    title: "The project handover nobody could use",
    lines: [
      ["Imagine a public library whose managers agree to improve how visitors register for membership.", t("What must the Launch Pad deliver?", "A verbal agreement is not enough to provide the next team with a useful handover.")],
      ["The director announces that membership registration should become faster and more convenient.", null],
      ["Employees welcome the decision, but the improvement team discovers that important commitments remain undocumented.", iss("The team has enthusiasm but no recorded project scope, ownership, or performance baseline.", "An unusable handover")],
      ["Nobody can explain precisely which activities belong inside the project or who can approve changes.", q("What can the team investigate confidently when the project commitments remain unclear?")],
      ["The director asks for a concise Launch Pad decision record before detailed investigation begins.", null],
      ["It identifies membership registration as the selected process and connects improvement to the library's service objectives.", null],
      ["The proposed boundary begins when a visitor requests membership and ends when a usable account becomes available.", dg("The membership boundary", D.flow(["Membership|requested", "Details|verified", "Account|created", "+Membership|available"]), "The proposed boundary follows the request until a usable membership account is available.")],
      ["The director agrees to sponsor the project and confirms a manager responsible for continuing registration performance.", null],
      ["Reception, membership administration, and digital services employees are identified as participants in the investigation.", it(1, 3, "users", "Accountable people", "Identify the sponsor, process owner, and relevant operational participants.")],
      ["The team proposes measuring the time required to establish a usable membership account.", null],
      ["Employees must verify whether existing records can establish a reliable baseline before agreeing on a target.", it(2, 3, "gauge", "Reliable measurement", "Document the measure, baseline evidence, target, and reporting responsibility.")],
      ["Expected benefits include shorter queues and fewer repeated enquiries, although these outcomes remain unproven.", null],
      ["The record also identifies risks involving outdated software, inconsistent information, and limited staff availability.", iss("Unreliable records and insufficient employee availability could prevent the library from achieving its expected benefits.", "Initial project risks")],
      ["Each unresolved issue receives an accountable person and a route for further investigation.", null],
      ["The team now receives a document explaining the decision and distinguishing confirmed commitments from assumptions.", dg("A usable Launch Pad handover", D.flow(["Selected|process", "Scope and|people", "Measures|and risks", "+Understand|phase"]), "The decision record gives the Understand team an actionable commitment and identifies outstanding assumptions.")],
      ["The document does not prescribe a complete redesign because the current process has not yet been investigated.", null],
      ["That investigation belongs to Understand, where employees examine actual work and identify causes.", q("Would a proposed solution be trustworthy before the team understands the causes of registration delays?")],
      ["The Launch Pad therefore prepares the investigation without pretending that the investigation has already happened.", it(3, 3, "check", "Ready for investigation", "Record agreed commitments and distinguish them from questions requiring investigation.")],
      ["Remember that a useful handover reduces uncertainty about the project without claiming to eliminate uncertainty about the process.", st("A successful Launch Pad handover is documented, actionable, and honest about unresolved evidence.")],
      ["The next team can now begin without inventing missing responsibilities or performance figures.", null]
    ]
  },
  {
    title: "The promise and the proof",
    lines: [
      ["Imagine a municipal recycling centre promising residents that household collections will become more reliable.", t("A promise is not yet a result", "The Launch Pad distinguishes expected benefits from demonstrated performance.")],
      ["The director announces a project to reduce missed collections after receiving repeated complaints.", null],
      ["Residents welcome the promise, but a colleague asks how many collections are currently missed.", null],
      ["The director cannot provide reliable figures because collection records have not been checked consistently.", iss("The organisation promises improvement without establishing its starting performance.", "A missing baseline")],
      ["This reveals the difference between an attractive improvement ambition and a measurable project commitment.", q("Can managers demonstrate improvement without knowing the original level of service reliability?")],
      ["The team proposes examining the journey from preparing collection schedules until outcomes are recorded.", dg("The collection process", D.flow(["Schedule|prepared", "Vehicle|dispatched", "Collection|attempted", "+Outcome|recorded"]), "The proposed boundary covers the work needed to determine whether scheduled collections were completed.")],
      ["The director sponsors the project, while an operations manager is proposed as continuing process owner.", null],
      ["Drivers, dispatch employees, customer service representatives, and residents contribute evidence about collection performance.", it(1, 3, "users", "Ownership and involvement", "Identify accountable leaders and people who understand the collection journey.")],
      ["The team defines reliability as the percentage of scheduled collections completed within the agreed service period.", null],
      ["Employees must agree how unsuccessful attempts are recorded so that different teams calculate performance consistently.", null],
      ["Without consistent definitions, apparently precise figures could conceal differences in recording practices.", iss("Inconsistent definitions can make reported improvements reflect recording changes rather than better service.", "Measurement risk")],
      ["The team examines verified records from a defined period to establish current performance.", null],
      ["Only then can managers agree on a realistic target and assign reporting responsibility.", it(2, 3, "gauge", "Baseline and target", "Establish current performance using reliable records before agreeing on intended improvement.")],
      ["The director expects fewer complaints and less repeated travel, but these benefits require later verification.", null],
      ["Potential risks include vehicle shortages, inaccurate schedules, and changing access conditions.", null],
      ["The decision record connects these risks with the proposed scope, people, measures, and benefits.", dg("The evidence trail", D.flow(["Launch Pad|commitment", "Understand|current work", "Improvement|delivered", "+Realise Value|verified"]), "The Launch Pad establishes commitments that later phases investigate, implement, and evaluate.")],
      ["When the project reaches Realise Value, verified results can be compared with the baseline.", null],
      ["That comparison helps determine whether the promised reliability improvement actually occurred.", q("What evidence would convince residents that collection reliability has genuinely improved?")],
      ["The Launch Pad cannot prove future success, but it can establish how success will be judged.", it(3, 3, "check", "An honest handover", "Document agreed commitments, unresolved assumptions, and the basis for later verification.")],
      ["Remember that a credible decision record connects today's management promises with tomorrow's performance evidence.", st("Launch Pad establishes the promise and its measurement basis; later phases determine whether it was fulfilled.")],
      ["This connection makes the handover useful for both the improvement team and accountable managers.", null]
    ]
  }
],
O2a: [
  {
    title: "The fire station with two urgent problems",
    lines: [
      ["Imagine a municipal fire service deciding which operational process should receive its limited improvement resources.", t("Choosing value and deliverability", "An important problem is not automatically the most suitable opening improvement project.")],
      ["The service has received complaints about delayed equipment maintenance and slow processing of fire safety inspection requests.", null],
      ["Both problems matter, but the improvement team has capacity to investigate only one process.", iss("Two important processes compete for one improvement team.", "A difficult starting choice")],
      ["The maintenance manager argues that unreliable equipment could have serious consequences for emergency readiness.", null],
      ["The inspection manager argues that delayed approvals frustrate businesses and create unnecessary administrative work.", null],
      ["The director asks which process would create the greatest benefit if its performance improved.", q("Should the process with the greatest potential benefit automatically receive the improvement team?")],
      ["That question concerns strategic value, meaning how strongly an improvement supports important organisational objectives.", null],
      ["Equipment maintenance may have substantial strategic value because dependable equipment supports emergency readiness.", it(1, 4, "target", "Strategic value", "Consider how strongly each process contributes to the organisation's objectives.")],
      ["However, the maintenance process depends on specialised suppliers and purchasing arrangements outside the director's immediate control.", null],
      ["The inspection process has a clearer boundary and employees who are available to participate.", dg("Different delivery conditions", D.flow(["Inspection|requests", "Available|employees", "Manageable|boundary", "+Potential|improvement"]), "The inspection process may offer a more manageable opening project because its delivery conditions are clearer.")],
      ["This introduces deliverability, meaning whether the organisation can realistically complete the improvement with its available capabilities.", null],
      ["The director also discovers that the inspection manager has volunteered to sponsor the work.", it(2, 4, "users", "Sponsor commitment", "A committed sponsor can support decisions, secure cooperation, and address barriers.")],
      ["The maintenance manager supports improvement but cannot yet secure the required supplier cooperation.", null],
      ["That difference matters because an important project can struggle without practical leadership support.", null],
      ["The inspection team proposes measuring how long businesses wait for completed inspection decisions.", it(3, 4, "eye", "Visibility", "A visible improvement produces results that stakeholders can recognise and verify.")],
      ["Reliable before-and-after measurements could help demonstrate whether the initial BPM project creates value.", null],
      ["The director now has evidence for comparing the candidates rather than relying on managerial enthusiasm.", q("Which process offers a credible combination of value, deliverability, sponsorship, and visible results?")],
      ["The inspection process may provide a defensible starting point, subject to confirming its readiness.", null],
      ["Nevertheless, equipment maintenance cannot be ignored if unresolved problems threaten essential emergency operations.", iss("Deferring an improvement project must not mean neglecting urgent operational or safety obligations.", "The cost of deferral")],
      ["The director therefore separates the improvement team's starting project from any immediate maintenance actions required.", null],
      ["This preserves essential responsibilities while concentrating limited BPM capacity on achievable improvement work.", it(4, 4, "check", "A balanced recommendation", "Select a worthwhile and deliverable project while addressing obligations that cannot wait.")],
      ["The lesson is that choosing where to begin requires balancing potential value against practical delivery conditions.", st("The best starting project is not necessarily the project with the greatest theoretical benefit.")],
      ["A defensible recommendation explains why the organisation can create meaningful results with the resources actually available.", null]
    ]
  },
  {
    title: "The charity that chose the easy project",
    lines: [
      ["Imagine a charitable organisation whose director wants to demonstrate that Business Process Management can improve its services.", t("The danger of choosing easy work", "A simple project may be deliverable without creating enough value to justify the investment.")],
      ["The charity supports families through emergency assistance, counselling, and the distribution of essential household supplies.", null],
      ["Its improvement team has identified problems in the emergency assistance process and the ordering of office stationery.", null],
      ["The stationery manager proposes improving purchase approvals because the procedure is straightforward and employees already cooperate.", iss("The easiest candidate may contribute little to the charity's most important objectives.", "An attractive shortcut")],
      ["The director likes this suggestion because a successful project could be completed without difficult organisational disagreements.", null],
      ["But the emergency assistance manager argues that families sometimes wait unnecessarily for urgent support.", null],
      ["The director must decide whether an easily delivered improvement would demonstrate meaningful BPM value.", q("Would faster stationery purchasing prove that the charity is improving the services families depend on?")],
      ["The stationery project has strong deliverability because its boundary is narrow and its employees are available.", null],
      ["Its manager is enthusiastic, providing the leadership commitment needed to support the proposed changes.", it(1, 3, "check", "An easy candidate", "Stationery purchasing has manageable work and willing leadership, but limited strategic importance.")],
      ["However, stationery purchasing contributes less directly to the charity's central mission than emergency assistance.", null],
      ["Improving it might create administrative savings without significantly changing the experience of families seeking help.", cmp("a", "Stationery purchasing", "Relatively easy to improve, but its contribution to the charity's mission is limited.")],
      ["Emergency assistance has greater strategic relevance because delays can affect people facing immediate difficulties.", null],
      ["Yet the process crosses several teams and requires careful coordination of eligibility decisions and available resources.", cmp("b", "Emergency assistance", "Potentially substantial value, but greater coordination and delivery challenges.")],
      ["The director therefore examines whether a manageable part of emergency assistance could become a realistic opening project.", null],
      ["The team considers the journey from receiving a complete assistance request until an eligibility decision is communicated.", dg("A focused assistance boundary", D.flow(["Request|received", "Eligibility|reviewed", "Decision|approved", "+Applicant|informed"]), "A focused boundary may allow meaningful improvement without attempting to redesign the charity's entire service.")],
      ["This narrower scope might preserve strategic value while reducing the delivery demands of the project.", null],
      ["The director must still confirm sponsorship, staff availability, and whether the proposed measures are reliable.", it(2, 3, "users", "Making value deliverable", "A valuable process becomes a credible candidate when leadership, scope, and capacity support improvement.")],
      ["The charity could measure how long applicants wait for decisions, using verified records to establish current performance.", null],
      ["That measure would make potential improvement visible to managers and the people receiving support.", it(3, 3, "eye", "Meaningful visibility", "Choose results that demonstrate improvement in the service the organisation exists to provide.")],
      ["The director now recognises that a convenient project is not automatically a worthwhile project.", null],
      ["The challenge is finding work that matters enough to justify investment and is realistic enough to deliver.", q("Can the charity make its strategically important process manageable without losing the outcome that matters?")],
      ["This is why selection criteria must be considered together rather than allowing ease or enthusiasm to dominate.", st("A credible starting project combines meaningful value with realistic delivery, committed sponsorship, and visible results.")],
      ["Remember that an easy success can still be a poor strategic choice if its benefits are insignificant.", null]
    ]
  }
],
O2b: [
  {
    title: "Four services competing at a university",
    lines: [
      ["Imagine a university committee reviewing four competing process improvement proposals.", t("Comparing four competing candidates", "Different processes combine strategic value, complexity, sponsorship, and urgency in different ways.")],
      ["The university has one improvement team, and leaders expect visible progress within the academic year.", null],
      ["Admissions faces delayed offers, research purchasing has costly errors, and classroom maintenance receives numerous requests.", null],
      ["The examination records system also faces an external reporting deadline that requires management attention.", iss("Four different problems compete for one improvement team.", "The university's dilemma")],
      ["Every manager argues that their own process deserves priority, but the committee needs consistent selection criteria.", null],
      ["The admissions director highlights reputational damage when prospective students wait too long for offers.", null],
      ["Admissions crosses academic departments and student services, making improvements potentially visible across the university.", it(1, 4, "target", "Student admissions", "Customer complaints and cross-functional work create a potentially valuable improvement opportunity.")],
      ["Research purchasing has documented errors that create unnecessary expenditure and administrative rework.", null],
      ["However, the finance director opposes changes to existing approvals, creating a sponsorship obstacle.", it(2, 4, "users", "Research purchasing", "Financial consequences support improvement, but leadership opposition creates delivery risk.")],
      ["Examination records present a different challenge because an external reporting deadline cannot simply be postponed.", null],
      ["The work depends on several systems, and no executive has yet accepted sponsorship.", iss("A mandatory deadline requires action even when delivery is difficult and sponsorship remains unresolved.", "Examination records")],
      ["Classroom maintenance has high transaction volume and a relatively narrow departmental boundary.", null],
      ["Its manageable scope may support delivery, but strategic importance still requires evaluation.", it(3, 4, "check", "Classroom maintenance", "High volume and manageable scope do not automatically establish the strongest strategic case.")],
      ["The committee recognises that complaint numbers or transaction volumes alone cannot determine the decision.", q("Would a mandatory deadline, financial loss, or high transaction volume automatically determine the BPM starting project?")],
      ["It compares strategic value, deliverability, sponsor commitment, and visibility using evidence from each candidate.", dg("Comparing the candidates", D.flow(["Strategic|value", "Delivery|conditions", "Sponsor|support", "+Visible|results"]), "Consistent criteria support comparison while preserving each candidate's distinctive circumstances.")],
      ["The committee also distinguishes deferrable improvements from obligations requiring immediate action.", null],
      ["Examination reporting may require a separately governed compliance response regardless of the BPM recommendation.", it(4, 4, "flag", "Mandatory obligations", "External deadlines require appropriate action even when another BPM project is selected.")],
      ["The final recommendation must explain the preferred project and the consequences of deferring alternatives.", null],
      ["This makes the decision stronger than simply accepting the most persuasive departmental presentation.", st("A sound comparison uses consistent criteria while recognising the evidence and obligations of each candidate.")],
      ["Remember that prioritisation means making a justified commitment, not declaring other organisational problems unimportant.", null]
    ]
  },
  {
    title: "The logistics company and its hidden constraints",
    lines: [
      ["Imagine a regional logistics company reviewing four processes after customers complain about unreliable service.", t("Looking beneath the obvious problem", "An attractive candidate can conceal dependencies that change its suitability as a starting project.")],
      ["The company has one improvement team serving several distribution centres.", null],
      ["Its candidates involve parcel tracking, invoice corrections, vehicle maintenance scheduling, and delivery-address verification.", null],
      ["The operations director immediately recommends parcel tracking because customers frequently complain about missing updates.", iss("The most visible complaint may conceal important delivery dependencies.", "An early favourite")],
      ["Tracking appears strategically important because customers need reliable information about their deliveries.", null],
      ["However, the system depends on an external provider that cannot confirm when necessary changes will be available.", q("Can a project be readily deliverable when a critical external dependency remains uncertain?")],
      ["Invoice corrections have caused customer disputes, repeated work, and avoidable financial consequences.", null],
      ["Yet the billing manager has not committed to supporting changes in the current process.", it(1, 4, "target", "Invoice corrections", "Customer and financial consequences create value, but uncertain sponsorship threatens delivery.")],
      ["Vehicle maintenance scheduling has a narrower boundary and a manager willing to support investigation.", null],
      ["The team must still determine whether scheduling improvements meaningfully support the company's strategic objectives.", it(2, 4, "check", "Maintenance scheduling", "Manageable scope and sponsorship support delivery, but strategic value still needs evidence.")],
      ["Delivery-address verification offers another possibility because incorrect addresses contribute to failed delivery attempts.", null],
      ["Customer service and dispatch already cooperate, and relevant transaction records appear accessible.", dg("Address verification", D.flow(["Address|received", "Details|checked", "Dispatch|prepared", "+Delivery|attempted"]), "Address verification connects customer information with dispatch preparation and delivery outcomes.")],
      ["The team investigates whether better verification could reduce avoidable delivery failures.", null],
      ["It also checks whether the participating managers will support the proposed project boundary.", it(3, 4, "users", "Address verification", "Existing cooperation and accessible records may support a feasible cross-functional improvement.")],
      ["Each candidate therefore combines attractive benefits with different practical uncertainties.", null],
      ["Parcel tracking has an external dependency, while invoice corrections face uncertain leadership support.", null],
      ["Maintenance scheduling appears manageable, and address verification may connect achievable changes with customer outcomes.", cmp("a", "Apparent value", "The importance or visibility of the problem that a process presents.")],
      ["The director must examine these conditions rather than simply selecting the process attracting the most complaints.", cmp("b", "Practical readiness", "The sponsorship, resources, dependencies, and evidence needed to deliver improvement.")],
      ["The team also documents which important problems will remain outside the initial improvement project.", q("Which candidate offers meaningful customer value without depending on unresolved conditions that could prevent delivery?")],
      ["Deferred work must retain appropriate management attention, especially when operational obligations cannot wait.", it(4, 4, "eye", "The complete decision", "Explain the preferred candidate, unresolved dependencies, and consequences for deferred work.")],
      ["Remember that the strongest recommendation often emerges after investigating constraints hidden behind attractive proposals.", st("Compare candidates using evidence about potential benefits and the conditions required to deliver them.")],
      ["Prioritisation selects a credible starting commitment rather than merely identifying the loudest problem.", null]
    ]
  }
],
 
O2c: [
  {
    title: "Defending the choice nobody expected",
    lines: [
      ["Imagine a public transport authority choosing between improving passenger complaints handling and replacing damaged bus shelters.", t("Defending a starting recommendation", "A credible decision explains the preferred process and addresses the strongest alternative argument.")],
      ["The authority has limited improvement capacity, and its board expects visible progress within six months.", null],
      ["The infrastructure director supports shelter replacement because damaged facilities inconvenience passengers and attract political attention.", null],
      ["Photographs of broken shelters make the problem visible, and local representatives demand action.", iss("A visible problem attracts pressure, but visibility alone cannot determine the BPM starting project.", "Pressure to act")],
      ["The customer services director proposes improving complaints handling because passengers receive inconsistent responses.", null],
      ["This process crosses customer services, operations, and teams responsible for resolving reported problems.", null],
      ["Its director volunteers to sponsor improvement and help secure cooperation across departments.", it(1, 3, "users", "A supported candidate", "Complaints handling offers cross-functional improvement with a committed executive sponsor.")],
      ["The team proposes measuring elapsed time from complaint submission until resolution.", null],
      ["Reliable records could establish current performance and demonstrate whether passengers receive better service.", dg("The complaints journey", D.flow(["Complaint|submitted", "Issue|assigned", "Response|prepared", "+Case|resolved"]), "The process connects the passenger's report with the organisation's response and resolution.")],
      ["The improvement team therefore recommends complaints handling as a potentially meaningful and deliverable opening project.", null],
      ["The infrastructure director objects that damaged shelters remain more visible to passengers.", q("How should the team respond when a stakeholder presents a reasonable argument against its recommendation?")],
      ["The team acknowledges that damaged shelters affect passenger comfort and may require urgent operational attention.", null],
      ["It does not claim that complaints handling is universally more important than safe passenger facilities.", cmp("a", "Shelter replacement", "A visible passenger problem requiring appropriate operational and safety responses.")],
      ["Instead, it explains that complaints handling offers clearer sponsorship and a manageable cross-functional improvement opportunity.", cmp("b", "Complaints handling", "A measurable customer journey with leadership support and opportunities to improve coordination.")],
      ["The recommendation remains conditional on confirming resources, ownership, and reliable performance records.", null],
      ["Urgent shelter hazards must continue through the authority's existing safety response arrangements.", iss("Deferring a BPM project must not delay necessary action on unsafe facilities.", "A separate obligation")],
      ["The team records the infrastructure director's objection and explains the consequences of deferring broader shelter improvements.", it(2, 3, "audit", "Acknowledge the alternative", "Record the strongest opposing argument and explain why the recommendation remains defensible.")],
      ["The board can now evaluate the recommendation without assuming every stakeholder prefers the same project.", null],
      ["A credible decision becomes stronger when managers can examine its evidence, trade-offs, and conditions.", q("Would the recommendation become stronger if the team concealed the shelter director's concerns?")],
      ["The decision record identifies the preferred process and explains how deferred work will be managed.", it(3, 3, "check", "A defensible commitment", "Explain the selected process, delivery conditions, strongest objection, and treatment of deferred work.")],
      ["Remember that defending a recommendation means demonstrating judgement rather than dismissing reasonable alternatives.", st("A strong starting decision explains why the chosen project should begin now and what happens to alternatives.")],
      ["The recommendation remains open to revision when reliable evidence changes the balance of benefits and risks.", null]
    ]
  },
  {
    title: "When the highest score is not the answer",
    lines: [
      ["Imagine a regional electricity provider using a scoring exercise to select its next improvement project.", t("Using scores without surrendering judgement", "Prioritisation scores support reasoning but cannot replace evidence about obligations and delivery conditions.")],
      ["The company compares customer connection requests with the process for correcting inaccurate electricity bills.", null],
      ["Managers evaluate strategic value, deliverability, sponsor commitment, and visibility before assigning ratings.", null],
      ["They calculate an overall score for each candidate and prepare to recommend the higher result.", dg("The selection exercise", D.flow(["Selection|criteria", "Evidence|reviewed", "Candidate|ratings", "+Management|decision"]), "The scoring exercise organises evidence without automatically determining the correct decision.")],
      ["Customer connections receive the higher score because faster service could support businesses and residential developments.", null],
      ["The connections manager welcomes the result and asks the improvement team to begin immediately.", null],
      ["However, the project depends on an external network contractor whose specialist employees remain unavailable.", iss("The highest-scoring project depends on an unconfirmed external resource.", "A hidden constraint")],
      ["The original deliverability rating therefore rests on an assumption that has not been verified.", q("Should managers approve the highest-scoring project when an important assumption behind its score is uncertain?")],
      ["The billing process receives a lower score but has a committed sponsor and accessible transaction records.", null],
      ["Its problems create customer complaints, repeated corrections, and avoidable administrative work.", it(1, 3, "target", "Billing improvement", "Documented problems, sponsorship, and accessible records may support a credible project.")],
      ["The team considers whether billing could deliver meaningful improvement while connections resolves its dependencies.", null],
      ["However, billing's strategic value and proposed scope still require careful evaluation.", cmp("a", "Higher score", "Customer connections appear attractive, but contractor availability remains uncertain.")],
      ["The team examines how the recommendation changes when uncertain deliverability assumptions are reconsidered.", null],
      ["Numerical ratings must remain connected to reliable evidence rather than becoming an automatic verdict.", cmp("b", "More dependable readiness", "Billing has confirmed sponsorship and accessible records, although its strategic value still requires evaluation.")],
      ["The company also faces a mandatory safety inspection deadline that requires accountable action.", null],
      ["That obligation cannot disappear because another process receives the improvement team's attention.", iss("Mandatory safety work cannot be postponed merely because it receives a lower improvement priority.", "A separate obligation")],
      ["The team proposes handling the safety requirement through an appropriately governed mandatory workstream.", null],
      ["It then presents both improvement candidates with their assumptions, benefits, and delivery risks.", it(2, 3, "audit", "Explain the trade-off", "Show how uncertain assumptions and mandatory obligations affect the recommendation.")],
      ["The director asks which candidate should begin and what conditions must be confirmed.", q("What evidence would justify choosing billing now while retaining connections as a future candidate?")],
      ["Billing may provide a credible opening project if its boundary and performance baseline are verified.", null],
      ["Customer connections remains under consideration while the contractor dependency is resolved.", null],
      ["The decision record identifies the preferred candidate, strongest objection, deferred work, and outstanding conditions.", it(3, 3, "check", "A reasoned recommendation", "Use scores to support a transparent decision rather than treating them as an automatic verdict.")],
      ["Remember that prioritisation tools organise judgement, but managers remain responsible for interpreting evidence and consequences.", st("A defensible recommendation combines consistent criteria with explicit assumptions, practical constraints, and honest treatment of alternatives.")],
      ["The strongest decision is one the organisation can explain and realistically support.", null]
    ]
  }
],
O3a: [
  {
    title: "The hospital project that became too large",
    lines: [
      ["Imagine a hospital deciding to improve how patients receive diagnostic test results.", t("Drawing a manageable boundary", "A project boundary must include the relevant journey without absorbing the hospital's entire operation.")],
      ["Patients complain about waiting for results, and managers agree that the process needs attention.", null],
      ["The clinical director proposes redesigning every activity involving laboratory services, doctors, and patient communication.", null],
      ["The improvement team quickly realises that this proposal includes far more work than its available capacity permits.", iss("An important improvement opportunity has expanded into an unmanageable project.", "Scope expansion")],
      ["The team asks which patient outcome the project should address and where the relevant journey begins.", null],
      ["It proposes examining the process from receiving a completed laboratory sample until the patient receives an authorised result.", dg("The diagnostic results boundary", D.flow(["Sample|received", "Test|completed", "Result|authorised", "+Patient|informed"]), "The proposed boundary follows the result journey from sample receipt to patient notification.")],
      ["This boundary includes laboratory processing, clinical authorisation, and the handoff responsible for communicating results.", null],
      ["It excludes unrelated hospital activities that do not contribute directly to the selected improvement problem.", q("Would excluding patient notification make the proposed boundary too narrow to address the complaint?")],
      ["A boundary ending when the laboratory completes testing might overlook delays in clinical authorisation or communication.", null],
      ["Conversely, including every hospital service would make the project unnecessarily difficult to investigate.", cmp("a", "Too narrow", "The project excludes handoffs that may explain the patient's experience.")],
      ["The team therefore selects a boundary that captures the complete result journey without redesigning unrelated clinical services.", cmp("b", "Manageable scope", "The project includes the relevant activities and handoffs while preserving delivery capacity.")],
      ["The director confirms that laboratory, clinical, and communication employees must participate in understanding the current process.", null],
      ["Their involvement does not mean every activity within their departments becomes part of the redesign.", st("Stakeholder involvement and project scope are related, but they are not identical.")],
      ["The team records its starting event, ending event, included handoffs, and explicit exclusions.", null],
      ["It also documents assumptions requiring investigation before the boundary becomes a final delivery commitment.", iss("The proposed boundary may need adjustment when investigation reveals previously unknown causes.", "Boundary uncertainty")],
      ["The improvement team can now investigate delays without taking responsibility for the hospital's entire operation.", null],
      ["Remember that a useful boundary follows the problem across departments while remaining realistic about available resources.", st("A defensible scope is wide enough to address the problem and narrow enough to deliver meaningful improvement.")]
    ]
  },
  {
    title: "The online retailer and the missing handoff",
    lines: [
      ["Imagine an online retailer receiving complaints because customers receive refunds much later than expected.", t("Finding the missing handoff", "A project boundary should follow the customer outcome rather than stop at a departmental boundary.")],
      ["The returns manager proposes improving the warehouse procedure for checking returned products.", null],
      ["Warehouse employees believe their work finishes when an accepted return is recorded in the inventory system.", null],
      ["However, customers continue waiting because Finance must separately authorise the payment reversal.", iss("The proposed warehouse boundary excludes a handoff that may explain the customer's delay.", "An incomplete scope")],
      ["The improvement team asks what outcome customers actually expect when they return an eligible product.", null],
      ["Customers want confirmation that their refund has been completed, not merely that the warehouse accepted their parcel.", q("Where should the project end if the intended improvement concerns the customer's refund experience?")],
      ["The team proposes starting when the returned parcel is received and ending when the refund is issued.", dg("The refund journey", D.flow(["Return|received", "Product|checked", "Refund|authorised", "+Payment|issued"]), "The proposed boundary includes the operational and financial handoffs needed to complete the refund.")],
      ["This scope includes the warehouse inspection, refund authorisation, and payment instruction activities.", null],
      ["It does not automatically include product design, advertising, or every possible reason customers request returns.", cmp("a", "Departmental boundary", "The warehouse finishes processing, but the customer's refund remains incomplete.")],
      ["The team also avoids extending the project into unrelated customer service activities after payment completion.", null],
      ["Its boundary remains focused on the outcome the retailer intends to improve.", cmp("b", "Outcome boundary", "The journey ends when the customer receives the intended refund outcome.")],
      ["Finance employees must participate because their decisions influence the complete journey.", null],
      ["The returns manager cannot assume that warehouse sponsorship provides authority over financial approvals.", iss("Cross-functional scope requires appropriate participation and decision authority.", "An ownership challenge")],
      ["The improvement team therefore identifies the required departments and seeks agreement on the proposed boundary.", null],
      ["It also defines how refund completion time could be measured using reliable transaction records.", st("A useful boundary connects the intended outcome with the activities and evidence needed to investigate it.")],
      ["The team remains willing to revise its assumptions if the Understand phase reveals additional dependencies.", null],
      ["That flexibility does not justify beginning with an unlimited project covering every customer service issue.", q("Would a wider project necessarily improve refunds more effectively, or merely increase delivery complexity?")],
      ["The retailer now has a focused investigation that follows the customer's experience across departmental boundaries.", null],
      ["Remember that the best boundary captures the problem's relevant causes without expanding beyond the intended improvement.", st("Define scope around the outcome, include essential handoffs, and document what remains outside the project.")]
    ]
  }
],
 
O3b: [
  {
    title: "The airport project without decision authority",
    lines: [
      ["Imagine an airport trying to improve the process passengers follow when reporting lost baggage.", t("Who can make the project succeed?", "A process improvement needs leadership authority and participation from the people who understand the work.")],
      ["The customer service manager volunteers to lead the project because passengers frequently complain about delayed baggage updates.", null],
      ["The improvement team welcomes her enthusiasm and begins discussing changes to the baggage reporting process.", null],
      ["However, baggage handling is managed by another department, while several information systems belong to external service providers.", iss("The enthusiastic manager cannot independently approve changes across the complete baggage reporting journey.", "An authority gap")],
      ["The team discovers that the customer service manager can improve communication scripts but cannot change baggage handling procedures.", null],
      ["This creates a risk that the project will address symptoms while leaving important causes untouched.", q("Can an enthusiastic manager deliver cross-functional improvement without authority to resolve wider barriers?")],
      ["The airport therefore identifies an executive sponsor with sufficient influence to secure cooperation across departments.", null],
      ["The sponsor can support decisions, obtain resources, and escalate disagreements that employees cannot resolve independently.", cmp("a", "Executive sponsor", "Provides leadership support and helps remove barriers to delivery.")],
      ["The airport must also confirm who remains accountable for baggage reporting performance after the project finishes.", null],
      ["That continuing responsibility belongs to an appropriately authorised process owner rather than automatically to the project team.", cmp("b", "Process owner", "Remains accountable for the performance of the agreed process.")],
      ["Baggage handlers, customer service employees, technology specialists, and airline representatives contribute different operational knowledge.", null],
      ["Their involvement helps the team understand where information becomes delayed or inconsistent.", dg("The stakeholder network", D.flow(["Executive|sponsor", "Process|owner", "Operational|participants", "+Passenger|experience"]), "Leadership authority and operational participation support a complete understanding of the passenger journey.")],
      ["Passengers can also explain which updates they need and where the current experience creates uncertainty.", null],
      ["The team documents who contributes evidence, who approves changes, and how unresolved issues will be escalated.", iss("Participation without clear decision rights can leave important changes blocked.", "Governance risk")],
      ["The team also maps each group by influence and interest, managing the sponsor closely and keeping baggage handlers informed.", null],
      ["The airport now has a stronger basis for investigating the complete baggage reporting journey.", q("What happens when a proposed improvement requires a decision outside the process owner's authority?")],
      ["The sponsor provides a route for resolving that obstacle while operational participants contribute practical evidence.", null],
      ["Remember that sponsorship, ownership, and participation perform different functions within a successful BPM project.", st("A viable project combines executive support, continuing accountability, and meaningful stakeholder involvement.")]
    ]
  },
  {
    title: "The bakery chain and the overlooked employees",
    lines: [
      ["Imagine a bakery chain planning to improve how its shops replenish freshly baked products each morning.", t("Why participation matters", "Formal leadership support cannot replace the practical knowledge of employees performing the process.")],
      ["The operations director sponsors the project and appoints a regional manager as the continuing process owner.", null],
      ["Both managers believe the replenishment process should become faster and produce less unsold stock.", null],
      ["They ask the improvement team to design new ordering rules using reports from headquarters.", null],
      ["However, shop employees and delivery drivers have not been invited to explain how replenishment actually works.", iss("The project has leadership support but lacks evidence from the people performing the work.", "Missing operational voices")],
      ["The team proposes reducing morning deliveries because fewer journeys appear likely to reduce transportation costs.", null],
      ["A shop supervisor explains that smaller shops have limited storage space and depend on timely replenishment.", q("What could happen if headquarters changes delivery frequency without understanding shop-level constraints?")],
      ["Delivery drivers also explain that loading arrangements and traffic conditions influence whether products arrive before peak demand.", null],
      ["Their evidence challenges the assumption that fewer deliveries would necessarily improve the overall process.", cmp("a", "Headquarters assumption", "Reducing delivery frequency appears efficient when viewed mainly through transport costs.")],
      ["The improvement team now recognises that the process crosses production planning, distribution, and retail operations.", null],
      ["Each group understands constraints that may be invisible to managers examining summary reports.", cmp("b", "Operational evidence", "Shop capacity, delivery conditions, and customer demand influence the complete process.")],
      ["The sponsor asks the team to involve representatives from production, logistics, shop management, and frontline employees.", null],
      ["The process owner remains accountable for performance, while participants contribute evidence and assess proposed changes.", dg("A supported improvement", D.flow(["Executive|sponsor", "Process|owner", "Frontline|knowledge", "+Workable|changes"]), "Leadership and operational knowledge must work together to support feasible improvement.")],
      ["The team also considers how customers experience product availability during busy morning periods.", null],
      ["This prevents the project from treating lower transport costs as its only measure of success.", iss("A local efficiency gain could create wider service problems if customer outcomes are ignored.", "An unintended consequence")],
      ["The team then maps stakeholders by influence and interest, so shop staff and drivers are kept informed and asked to test proposals.", null],
      ["It clarifies which managers can approve changes and which employees should test whether proposals are practical.", q("Would the project be stronger if frontline employees helped investigate problems before solutions were selected?")],
      ["The bakery chain now has a more credible foundation for understanding its replenishment process.", null],
      ["Remember that a committed sponsor creates opportunity, but informed participation helps turn that opportunity into workable improvement.", st("Effective BPM governance connects decision authority with the knowledge of people who perform and experience the process.")]
    ]
  }
],
 
O3c: [
  {
    title: "The university disagreement over student support",
    lines: [
      ["Imagine a university choosing student support enquiries as the starting point for its improvement programme.", t("Turning disagreement into commitment", "A defensible decision acknowledges competing interests and establishes how the organisation will proceed.")],
      ["The student services director supports the proposal because students complain about being transferred between departments.", null],
      ["The academic administration director disagrees because examination appeals have generated serious concerns about processing delays.", null],
      ["Both directors present legitimate evidence, but the university has only one improvement team.", iss("Two managers support different starting processes, and both can explain why their preferred work matters.", "Competing priorities")],
      ["The programme sponsor asks the directors to examine strategic value, deliverability, available leadership support, and measurable results.", null],
      ["Student support enquiries appear suitable because the university can investigate their cross-departmental journey with available employees.", null],
      ["Examination appeals remain important, but proposed changes depend on unresolved academic approval arrangements.", q("Should the university ignore examination appeals simply because student support appears easier to begin?")],
      ["The sponsor acknowledges that delayed appeals may affect students and require immediate management attention.", null],
      ["However, the improvement team cannot responsibly promise to redesign both processes with its current capacity.", cmp("a", "Student support", "A potentially manageable cross-functional improvement with available participation.")],
      ["The university therefore recommends student support while recording the academic administration director's concerns.", null],
      ["The decision explains why appeals are deferred and identifies any urgent actions that cannot wait.", cmp("b", "Examination appeals", "An important alternative with unresolved approval dependencies and continuing operational obligations.")],
      ["The directors agree to review the deferred candidate when delivery capacity and approval arrangements become clearer.", null],
      ["They also confirm the proposed sponsor, process owner, and departments needed for student support improvement.", dg("From disagreement to commitment", D.flow(["Competing|arguments", "Evidence|examined", "Decision|recorded", "+Responsibilities|agreed"]), "The decision becomes actionable when objections are considered and responsibilities are confirmed.")],
      ["The academic administration director does not have to pretend that the chosen process was personally preferred.", null],
      ["The essential requirement is a transparent decision and a workable commitment to the agreed starting project.", iss("Unresolved objections can undermine cooperation if managers conceal rather than address them.", "Political delivery risk")],
      ["The sponsor documents the strongest opposing argument instead of removing it from the decision record.", null],
      ["This makes the recommendation easier to evaluate when new evidence becomes available.", q("Would a decision become more credible if its strongest objection were recorded openly?")],
      ["The university can now begin with a shared understanding of the choice and its consequences.", null],
      ["Remember that commitment does not require eliminating disagreement; it requires addressing disagreement through evidence and accountable decisions.", st("A defensible Launch Pad decision records the trade-off, acknowledges alternatives, and secures practical commitment.")]
    ]
  },
  {
    title: "The municipality facing a powerful objection",
    lines: [
      ["Imagine a municipality recommending improvements to its business licensing process after receiving repeated complaints about delays.", t("Responding to a powerful objection", "Stakeholder resistance can reveal legitimate risks that should strengthen rather than derail a decision.")],
      ["The economic development director sponsors the proposal because faster licensing could support local businesses.", null],
      ["However, the legal affairs director objects that proposed simplifications might weaken important compliance checks.", null],
      ["The improvement team initially interprets this objection as resistance to change and considers excluding legal affairs.", iss("A stakeholder objection may contain evidence about risks that the improvement team has overlooked.", "The temptation to dismiss resistance")],
      ["The programme sponsor asks the team to explain what the legal affairs director is actually concerned about.", null],
      ["The director identifies statutory checks that must remain effective even if the licensing journey becomes faster.", q("Would removing compliance checks create genuine process improvement or merely transfer risk elsewhere?")],
      ["The team recognises that reducing elapsed time cannot be its only definition of success.", null],
      ["A credible improvement must protect mandatory controls while reducing avoidable waiting and repeated administrative work.", cmp("a", "Speed alone", "A faster process may create unacceptable risks if mandatory controls are weakened.")],
      ["The team therefore revises its proposed boundary to include the handoffs between application review and legal verification.", null],
      ["This allows employees to investigate unnecessary delays without assuming that statutory requirements should disappear.", cmp("b", "Balanced improvement", "Reduce avoidable delays while preserving necessary legal safeguards.")],
      ["The sponsor invites legal affairs representatives to participate in examining how the current checks are performed.", null],
      ["Their involvement provides expertise needed to distinguish necessary controls from avoidable duplication.", dg("Using the objection constructively", D.flow(["Concern|raised", "Risk|examined", "Boundary|refined", "+Commitment|secured"]), "The objection improves the project when managers investigate its evidence and adjust the proposed commitment.")],
      ["The team also documents who can approve changes affecting legal compliance.", null],
      ["This prevents the project from assuming that operational managers possess authority they have not been granted.", iss("Unclear approval authority could prevent implementation even when employees agree on a proposed improvement.", "Decision-rights risk")],
      ["The legal affairs director remains cautious but agrees to support an investigation that preserves statutory obligations.", null],
      ["The team records that commitment alongside the risks and conditions that must be respected.", q("Does a stakeholder need to agree with every proposed change before supporting a fair investigation?")],
      ["The municipality now has a stronger project because the objection exposed an important design constraint.", null],
      ["The sponsor can defend the starting choice without pretending that all concerns have disappeared.", st("Constructive resistance can improve a Launch Pad decision when its evidence is examined and responsibilities are clarified.")],
      ["Remember that political commitment becomes more durable when managers acknowledge legitimate concerns rather than suppress them.", null]
    ]
  }
],
 
O3d: [
  {
    title: "The call centre that claimed success too early",
    lines: [
      ["Imagine an insurance call centre launching a project to reduce the time customers spend waiting for assistance.", t("Why a baseline matters", "Improvement cannot be demonstrated without a reliable measurement of performance before changes begin.")],
      ["The service manager introduces new call routing arrangements and announces that customers should now receive faster responses.", null],
      ["Employees report that queues appear shorter, and the manager declares the project successful.", null],
      ["However, nobody recorded the average waiting time before the routing changes were introduced.", iss("The manager claims improvement without reliable evidence of the original performance level.", "A missing baseline")],
      ["The operations director asks whether waiting time has actually fallen or whether employees are remembering unusually busy days.", null],
      ["The manager cannot distinguish these explanations because the starting performance was never established.", q("Can the call centre demonstrate improvement when it does not know how long customers previously waited?")],
      ["The team defines waiting time as the interval between entering the service queue and reaching an employee.", null],
      ["It also agrees how abandoned calls will be recorded so that difficult cases are not silently excluded.", dg("Defining the measure", D.flow(["Call|enters queue", "Waiting|recorded", "Employee|answers", "+Result|reported"]), "A consistent definition allows waiting performance to be compared across reporting periods.")],
      ["The team examines available historical records to determine whether a trustworthy baseline can still be reconstructed.", null],
      ["If those records are inadequate, the manager must acknowledge the limitation rather than invent a starting figure.", st("A baseline must come from reliable evidence, not memory or a convenient assumption.")],
      ["The director also asks the team to establish a realistic target for future waiting performance.", null],
      ["That target represents the intended result, while the baseline describes verified current or historical performance.", cmp("a", "Baseline", "The measured performance level before the relevant improvement.")],
      ["The reporting manager receives responsibility for calculating the measure consistently during subsequent review periods.", null],
      ["The team also monitors abandoned calls to detect whether apparent improvements conceal a worsening customer experience.", cmp("b", "Target", "The agreed performance level the organisation intends to achieve.")],
      ["The project can now evaluate future changes more credibly, although its earlier success claim remains unverified.", null],
      ["Reliable comparisons will help managers distinguish actual improvement from changes in workload or recording practices.", iss("A misleading measure can make reported performance improve while customers continue experiencing problems.", "Measurement distortion")],
      ["The call centre learns that evidence must be planned before managers celebrate the expected benefits.", null],
      ["The baseline, target, calculation method, and reporting responsibility belong in the improvement commitment.", q("What evidence would convince you that customers are genuinely receiving faster assistance?")],
      ["Remember that a target is a promise, while demonstrated improvement requires trustworthy before-and-after evidence.", st("A credible Launch Pad establishes how success will be measured before the organisation claims that success occurred.")]
    ]
  },
  {
    title: "The delivery company and the changing denominator",
    lines: [
      ["Imagine a grocery delivery company trying to increase the percentage of orders delivered within the promised time window.", t("When the measure changes", "A performance percentage is only meaningful when its definition remains consistent across reporting periods.")],
      ["The delivery manager reports that punctuality has improved after introducing a new scheduling procedure.", null],
      ["The percentage appears higher, and senior managers congratulate the team on its achievement.", null],
      ["However, a dispatcher notices that failed deliveries are no longer included in the reported calculation.", iss("The reported improvement may reflect a changed calculation rather than better delivery performance.", "An inconsistent denominator")],
      ["Previously, every scheduled delivery counted when the company calculated its on-time performance.", null],
      ["The new report includes only deliveries that were successfully completed, excluding some difficult orders.", q("Can two performance percentages be compared fairly when they count different types of deliveries?")],
      ["The team returns to the intended customer outcome and defines which orders belong in the calculation.", null],
      ["It agrees that the reporting method must consistently address completed, late, and unsuccessful deliveries.", dg("A consistent performance measure", D.flow(["Scheduled|orders", "Delivery|outcomes", "Consistent|calculation", "+Comparable|results"]), "Reliable comparisons require stable definitions and consistent treatment of relevant transactions.")],
      ["The manager also establishes the reporting period and checks whether records contain missing or duplicated orders.", null],
      ["Without these controls, the calculation may produce precise figures that do not represent actual service performance.", st("Measurement reliability depends on consistent definitions, complete records, and transparent calculation rules.")],
      ["The team now examines historical data using the agreed method to establish a trustworthy baseline.", null],
      ["Managers then agree on an improvement target that reflects customer expectations and realistic delivery capacity.", cmp("a", "Baseline", "Verified performance calculated using the agreed method before redesign.")],
      ["The target remains an intended achievement rather than evidence that the new scheduling procedure already works.", null],
      ["The operations analyst receives responsibility for producing regular reports and explaining unusual changes.", cmp("b", "Target", "The future performance level agreed by managers using the same measurement definition.")],
      ["Customer complaints provide supporting evidence about whether reported punctuality corresponds with the delivery experience.", null],
      ["The team investigates discrepancies rather than assuming that every higher percentage represents better service.", iss("A favourable reported result can conceal customer problems when measurement rules change.", "False improvement")],
      ["The company can now compare performance using a consistent basis and identify whether genuine progress occurs.", null],
      ["Its Launch Pad record documents the calculation, data source, baseline, target, and reporting responsibility.", q("Would you trust a reported improvement if the organisation could not explain which deliveries were counted?")],
      ["Remember that a reliable baseline is not merely a number written into a project document.", st("A credible measure has a clear definition, trustworthy data, consistent calculation, and accountable reporting.")],
      ["Those conditions make later claims about improvement more defensible to managers and customers.", null]
    ]
  }
],
 
O3e: [
  {
    title: "The housing agency's missing decision record",
    lines: [
      ["Imagine a housing agency agreeing to improve how tenants report urgent maintenance problems.", t("A decision another team can use", "The Launch Pad record must communicate the agreed project without relying on undocumented conversations.")],
      ["The agency director announces that the improvement team should make urgent maintenance requests easier to resolve.", null],
      ["Employees welcome the decision because tenants have complained about repeated calls and uncertain repair arrangements.", null],
      ["However, the project manager discovers that nobody has documented the agreed scope or continuing process owner.", iss("The organisation has approved an improvement idea without establishing an actionable project commitment.", "An incomplete handover")],
      ["Some employees believe the project concerns receiving repair requests, while others expect changes to contractor scheduling.", null],
      ["The director asks the team to prepare a concise Launch Pad decision record before detailed investigation begins.", q("What information would another team need to understand exactly what the agency has committed to improve?")],
      ["The record identifies urgent maintenance requests as the selected process and explains their importance to tenant welfare.", null],
      ["Its proposed boundary begins when an urgent request is received and ends when the repair outcome is confirmed.", dg("The proposed maintenance boundary", D.flow(["Request|received", "Urgency|assessed", "Repair|arranged", "+Outcome|confirmed"]), "The proposed boundary includes the activities and handoffs needed to address an urgent maintenance request.")],
      ["Routine property inspections and unrelated planned renovations remain outside the proposed improvement scope.", null],
      ["The director agrees to sponsor the project and confirms a manager accountable for continuing process performance.", null],
      ["Maintenance coordinators, contractors, customer service employees, and tenant representatives are identified as relevant participants.", st("The decision record connects a defined process with leadership, ownership, and practical stakeholder involvement.")],
      ["The team proposes measuring the elapsed time from receiving an urgent request until the repair outcome is confirmed.", null],
      ["Its baseline must be verified before the agency agrees on a realistic improvement target.", cmp("a", "Expected benefit", "Faster and more reliable handling of urgent maintenance requests.")],
      ["The record also identifies contractor availability and inconsistent request classifications as potential delivery risks.", null],
      ["Managers assign responsibility for investigating these uncertainties rather than presenting them as resolved.", cmp("b", "Unresolved condition", "The project must verify performance evidence and confirm sufficient contractor cooperation.")],
      ["The completed record distinguishes agreed commitments from assumptions requiring investigation during the Understand phase.", null],
      ["It also explains why the agency selected urgent maintenance instead of other worthwhile improvement candidates.", iss("An undocumented decision can leave the next team guessing about scope, authority, and expected results.", "Handover risk")],
      ["The project manager now has a coherent starting point without pretending that the future solution is already known.", null],
      ["The record supports investigation while preserving accountability for the decisions that launched the work.", q("Could another team use this document without inventing missing responsibilities or performance figures?")],
      ["Remember that the one-page record is a management commitment rather than a complete redesign plan.", st("A useful Launch Pad record connects the choice, scope, people, measures, benefits, risks, and outstanding conditions.")]
    ]
  },
  {
    title: "The manufacturer and the conditional approval",
    lines: [
      ["Imagine a furniture manufacturer considering improvements to its process for handling customer orders containing incorrect specifications.", t("Conditional approval is responsible management", "A Launch Pad recommendation can be credible even when important readiness conditions remain unresolved.")],
      ["The sales director recommends the project because incorrect specifications create rework, delivery delays, and customer dissatisfaction.", null],
      ["The operations director supports investigating the problem but questions whether the current order records are reliable.", null],
      ["The production manager also warns that employees have limited availability during the seasonal demand peak.", iss("The proposed improvement has value, but its measurement evidence and delivery capacity remain uncertain.", "Readiness concerns")],
      ["The managing director asks whether the project should be rejected until every uncertainty has disappeared.", null],
      ["The improvement team explains that unresolved conditions can be documented without pretending they have been satisfied.", q("Can managers endorse a worthwhile project while requiring evidence before detailed work begins?")],
      ["The team proposes a boundary from receiving an accepted customer order until production receives verified specifications.", null],
      ["This includes the information handoffs between sales, order administration, and production planning.", dg("The proposed order boundary", D.flow(["Order|accepted", "Specifications|checked", "Discrepancy|resolved", "+Production|informed"]), "The project concentrates on specification accuracy before production begins.")],
      ["The sales director volunteers as sponsor, while the manufacturer must confirm continuing ownership across departments.", null],
      ["The record identifies the relevant employees and the authority required to approve changes to order verification.", st("Leadership enthusiasm must be connected to formal ownership and realistic participation arrangements.")],
      ["The team proposes measuring the percentage of accepted orders reaching production without specification corrections.", null],
      ["However, existing records must be checked before managers can establish a trustworthy baseline.", cmp("a", "Proposed benefit", "Fewer specification corrections and less avoidable production rework.")],
      ["The production manager must also confirm when employees can participate without jeopardising existing customer commitments.", null],
      ["These conditions become explicit requirements within the Launch Pad decision record.", cmp("b", "Approval conditions", "Verify the baseline, confirm ownership, and secure realistic employee availability.")],
      ["The managing director conditionally endorses the proposal rather than authorising unrestricted implementation.", null],
      ["The sponsor receives responsibility for resolving outstanding conditions and reporting whether the project is ready.", iss("Conditional approval must not be mistaken for evidence that unresolved risks have disappeared.", "False readiness")],
      ["The record also explains why alternative improvement candidates will not receive the team's immediate attention.", null],
      ["This makes the decision transparent while preserving management accountability for deferred work.", q("Would unconditional approval be more credible when important delivery assumptions remain unverified?")],
      ["The manufacturer now has a justified recommendation and a clear route for confirming readiness.", null],
      ["The Understand phase can begin appropriately once the agreed conditions are satisfied.", st("A strong Launch Pad record separates confirmed commitments from unresolved assumptions and assigns responsibility for closing the gaps.")],
      ["Remember that honest conditional approval can protect a valuable project from avoidable failure.", null]
    ]
  }
],
 
O3f: [
  {
    title: "Choosing where to begin at a sports centre",
    lines: [
      ["Imagine a community sports centre asking you to recommend where its improvement programme should begin.", t("Applying the Launch Pad elsewhere", "A defensible recommendation transfers selection principles without copying another organisation's answer.")],
      ["Members complain about membership renewals, class reservations, and the time required to obtain refunds.", null],
      ["The centre has one improvement team, and managers disagree about which process deserves attention.", null],
      ["The membership director argues that renewal problems threaten recurring income and damage relationships with existing members.", iss("Several worthwhile candidates compete for limited improvement capacity.", "The forum challenge")],
      ["The activities manager believes unreliable class reservations create more visible frustration among members.", null],
      ["The finance manager points to refund delays but cannot yet confirm employee availability for a project.", q("Which process would you recommend when the available evidence supports different organisational priorities?")],
      ["You examine strategic value, realistic delivery, sponsorship, and the visibility of potential results.", null],
      ["Membership renewals appear valuable, but their improvement may depend on changes to the centre's payment provider.", cmp("a", "Membership renewals", "Potentially important revenue benefits with an unresolved external dependency.")],
      ["Class reservations have a clearer operational boundary and a manager willing to sponsor investigation.", null],
      ["Refund delays remain important, although available delivery capacity and leadership commitment require confirmation.", cmp("b", "Class reservations", "A potentially manageable customer-facing process with available leadership support.")],
      ["You tentatively recommend class reservations while explaining why the other candidates remain relevant.", null],
      ["Your proposed boundary begins when a member requests a place and ends when the reservation outcome is confirmed.", dg("The proposed reservation boundary", D.flow(["Place|requested", "Availability|checked", "Reservation|processed", "+Outcome|confirmed"]), "The boundary follows the member's reservation request to a confirmed outcome.")],
      ["You identify the proposed sponsor, relevant employees, and evidence needed to establish current reservation performance.", null],
      ["You also explain how payment-provider dependencies and refund concerns should remain visible to management.", st("A strong recommendation explains both the preferred project and the treatment of alternatives.")],
      ["Now imagine a classmate arguing that membership renewals deserve priority because recurring income supports the entire centre.", null],
      ["Instead of dismissing the argument, you examine whether the financial evidence changes your assessment.", q("What additional evidence would make membership renewals a stronger opening candidate?")],
      ["This is the reasoning expected in your Week Seven forum discussion.", null],
      ["Read Where to Start When Everything Is Broken and its exhibit before recommending a starting process.", iss("The forum case has its own evidence, so Qasr's recommendation cannot simply be copied.", "A different organisation")],
      ["Support your post using relevant ideas from Jeston's Chapter Fifteen and the case evidence.", null],
      ["Respond substantively to at least two classmates, including a constructive challenge to an alternative recommendation.", st("The forum tests your ability to justify a starting choice and engage thoughtfully with competing evidence.")],
      ["Remember that prioritisation is a reasoned decision about where meaningful improvement can realistically begin.", null]
    ]
  },
  {
    title: "From the museum forum to Understand",
    lines: [
      ["Imagine a museum choosing to improve how visitors book guided educational tours.", t("From a starting decision to investigation", "The Launch Pad establishes the commitment that the Understand phase will investigate.")],
      ["The museum also faces complaints about ticket refunds and delays in processing school group enquiries.", null],
      ["Its improvement team recommends educational tour booking because school partnerships are strategically important and sponsorship is available.", null],
      ["However, the ticketing manager argues that refund problems affect more visitors and deserve earlier attention.", iss("A starting recommendation must survive a reasonable challenge from an alternative candidate.", "A competing argument")],
      ["The team explains that educational tour booking offers a manageable boundary and committed participation from relevant employees.", null],
      ["It also acknowledges the refund problem and records why broader ticketing improvements are being deferred.", q("What makes this recommendation defensible even when another manager prefers a different process?")],
      ["The proposed booking boundary begins when a school submits a complete tour request.", null],
      ["It ends when the museum communicates a confirmed reservation or a clear decision that the request cannot be accommodated.", dg("The educational booking journey", D.flow(["School|requests", "Availability|checked", "Booking|reviewed", "+Decision|communicated"]), "The proposed boundary captures the journey from a complete school request to a confirmed outcome.")],
      ["The education director sponsors the project, while the museum confirms who owns continuing booking performance.", null],
      ["Employees responsible for scheduling, visitor services, and educational programmes contribute their operational knowledge.", st("The Launch Pad connects a justified process choice with scope, accountability, and participation.")],
      ["The team proposes measuring how long schools wait for a confirmed booking decision.", null],
      ["A verified baseline and realistic target will help managers evaluate whether the project delivers improvement.", cmp("a", "Launch Pad", "Select the process, agree its boundary, confirm people, and establish measurement commitments.")],
      ["Now the Understand team begins investigating how booking requests actually move through the museum.", null],
      ["Employees discover that delays sometimes originate from unavailable guides rather than the reservation system.", cmp("b", "Understand", "Investigate actual activities, handoffs, delays, and causes before proposing changes.")],
      ["This finding challenges an earlier assumption that software improvements would resolve the booking problem.", null],
      ["The team must follow the evidence rather than defend an explanation that investigation has undermined.", iss("The original explanation may be wrong even when the selected improvement process remains worthwhile.", "New evidence")],
      ["The boundary may require reconsideration if important dependencies were excluded from the original commitment.", null],
      ["This does not mean the Launch Pad failed; it means the framework supports evidence-based learning.", q("Would you preserve an unsupported assumption simply because managers accepted it during Launch Pad?")],
      ["Your Week Seven forum develops the judgement needed to defend a starting recommendation against alternatives.", null],
      ["Week Eight then develops your ability to investigate the selected process before deciding how to improve it.", st("The Launch Pad establishes where and why to begin; Understand examines what actually happens and why.")],
      ["Remember that a defensible starting commitment remains open to revision when reliable evidence reveals important new facts.", null]
    ]
  }
],

    },
  };
})();