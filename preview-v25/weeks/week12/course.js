// OPER621 Business Process Management · Week 12 · The Implement Phase.
// Source: Week 12 Session 1 slides and Week 12 Delivery Plan.
// Core reading: Jeston, Business Process Management: Practical Guidelines to Successful Implementation, 4th edition, Chapter 20.
// Running case: Qasr Hospitality Group, fourteen properties, one January, rollout sequencing and stopping decisions.
//
// COURSE LEARNING OUTCOMES
// K3: Assess the importance of change management in relation to BPM
//     and devise solutions to minimize employees' resistance.
// S2: Integrate new technologies to manage organizational changes.
// S3: Coordinate people and the change process in organizations
//     to achieve BPM objectives.
//
// WEEKLY LEARNING OUTCOMES
// O1 [S2; supporting K3, S3]: Evaluate implementation approaches against risk, benefit and organisational readiness.
// O2 [K3; supporting S3]: Devise a training and change approach that supports go-live.
// O3 [S3; supporting K3, S2]: Assess readiness and design contingency for implementation.
//
// WEEK 12 LESSON PLAN
// Lesson l1: Choosing how to arrive                       W12O1a, W12O1b, W12O1c   [O1; S2]
// Lesson l2: The first weeks after go-live                 W12O2a, W12O2b, W12O2c   [O2; K3]
// Lesson l3: Fourteen properties, different realities      W12O1d, W12O1e, W12O3a   [O1, O3; S2, S3]
// Lesson l4: The decision to go live — or stop             W12O3b, W12O3c, W12O3d   [O3; S3]
//
// FRAMEWORK POSITION
// Implement is phase eight of the ten-phase BPM implementation framework.
// It follows Develop and precedes Realize Value.
// Project management, people change management and leadership remain continuous across all phases.
// Implement introduces the developed capability into everyday operations;
// it does not itself establish that the expected benefits have been realised.
//
// PRODUCTION STRUCTURE
// Course ID: oper621-w12.
// Exactly four lessons, three narrated parts per lesson, twelve parts in total.
// Each part: 430–570 narration words, sentence-linked visual moments,
// two alternative remedial micro-lessons of 230–360 words each,
// and twelve automatically graded questions using the six existing types.
// Total: 24 remedial micro-lessons and 144 formative questions.
// Mastery: target 80%, window 5, minimum evidence 3.
// Section identifiers, lesson assignments and outcome mappings are fixed by this header.
// Never contradict the Week 12 slides or invent Qasr case evidence.
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
    id: "oper621-w12",
    code: "OPER621",
    title: "The Implement Phase",
    subtitle: "Business Process Management · Week 12",
    author: "Prof. Bassem Jarboui",
    teacher: { name: "Prof. Bassem Jarboui", email: "", sendReport: false },
    lessons: [
      { id: "l1", title: "Choosing how to arrive", sections: [
{
  title: "From a tested process to everyday operations",
  sec: "W12O1a",
  lines: [
    ["Welcome to Week 12, where Qasr Hospitality Group must introduce its redesigned arrival process into everyday operations.", t("OPER621 · Week 12", "The Implement Phase: going live without going backwards.")],
    ["Last week, we examined how Qasr developed the systems, rules and procedures needed to support that process.", null],
    ["The development team has completed its work, but fourteen properties must now adopt the new operating arrangements.", dg("From development to implementation", D.flow(["Approved|process", "Developed|capability", "Operational|introduction", "Everyday|use"]), "The Implement phase introduces the developed process into everyday operations rather than treating technical completion as successful deployment.")],
    ["Imagine the operations director asking whether successful testing guarantees that the process will work during actual guest arrivals.", null],
    ["The honest answer is no, because controlled testing and everyday operations expose the organisation to different conditions.", q("What changes when a tested process becomes the normal way employees serve real guests?")],
    ["This brings us to Implement, which occupies phase eight of our ten-phase Business Process Management framework.", null],
    ["Implement follows Develop and precedes Realize Value, creating a transition between operational preparation and demonstrated business improvement.", dg("Phase eight: Implement", D.route([7]), "Implement is phase eight of the BPM framework, following Develop and preceding Realize Value.")],
    ["Remember that Innovate established the intended future process, while People addressed the responsibilities needed to support it.", null],
    ["Develop then prepared and tested the operating capability, including technology, business rules, manual procedures and departmental handovers.", dg("The connected framework phases", D.flow(["Innovate|design", "People|responsibilities", "Develop|capability", "Implement|operation"]), "Implement introduces the operating capability prepared through the preceding design, people and development phases.")],
    ["Implement now asks whether that prepared capability can become dependable practice across the organisation's actual operating environment.", st("Implementation is the managed introduction of a developed process into everyday organisational operations.")],
    ["At Qasr, the redesigned arrival process includes kiosk-based handling alongside an assisted route for situations requiring employee intervention.", null],
    ["The technology may function correctly, but employees must still recognise exceptions and coordinate decisions during busy arrival periods.", dg("The complete arrival process", D.flow(["Guest|arrival", "Kiosk|processing", "Assisted|exception", "Completed|arrival"]), "Qasr's operating arrangements must support kiosk processing and the assisted handling required when normal processing cannot finish.")],
    ["That distinction matters because a working kiosk does not establish that the entire arrival process is operating successfully.", null],
    ["Guests experience the complete service, including waiting, clarification and assistance, rather than isolated software functions.", iss("Successful technology operation does not guarantee that the complete guest arrival process performs reliably.", "The implementation challenge")],
    ["Now consider what happens when employees encounter unfamiliar cases while other guests continue arriving at reception.", null],
    ["Even well-trained employees may need additional time, guidance and support while adapting to a changed process.", q("How should Qasr protect guest service while employees learn to operate the redesigned arrival process?")],
    ["Implementation therefore requires more than installing technology and announcing that employees should begin using the new procedures.", null],
    ["Managers must coordinate training, communication, operational support and the resources needed to absorb temporary disruption.", dg("Preparing the operating transition", D.flow(["Train|employees", "Prepare|support", "Introduce|process", "Monitor|operation"]), "Implementation coordinates employee preparation, operational support, process introduction and continuing monitoring.")],
    ["They must also establish how problems will be identified, escalated and resolved when ordinary procedures prove insufficient.", null],
    ["A problem reaching reception needs a dependable response, not another informal search for someone willing to help.", st("Operational readiness includes the people, procedures, support and decision authority required to use the developed process.")],
    ["This is where project management, people change management and leadership remain essential throughout the BPM framework.", null],
    ["Project management coordinates deployment activities, while change management helps employees understand and adopt their altered responsibilities.", cmp("Two connected implementation responsibilities", "Project management", "Coordinates deployment activities, resources and commitments.", "People change management", "Supports employee understanding, acceptance and adoption of changed working practices.")],
    ["Leadership provides direction when competing operational priorities require decisions that individual employees cannot reasonably make themselves.", null],
    ["These responsibilities continue across framework phases because introducing change requires coordinated technical, human and organisational decisions.", st("Project management, people change management and leadership remain continuous responsibilities throughout BPM implementation.")],
    ["Another distinction is equally important, because introducing the process does not prove that its expected benefits have materialised.", null],
    ["A property might begin using the new arrival process while still experiencing operational problems requiring further attention.", dg("Implementation is not benefits realisation", D.flow(["Develop|capability", "Implement|process", "Realize Value|benefits", "Sustainable|Performance"]), "Implement introduces the process, while subsequent phases establish realised benefits and sustain performance over time.")],
    ["Realize Value examines whether the intended improvements have actually been achieved through the process operating in practice.", null],
    ["Sustainable Performance then addresses how the organisation maintains and improves that performance beyond the initial implementation programme.", q("Would you declare Qasr successful merely because every property had switched to the new process?")],
    ["The answer depends on evidence about operational performance, employee adoption and the organisation's ability to sustain the change.", null],
    ["For now, Qasr must decide how to introduce the process without exposing fourteen properties to unnecessary disruption.", dg("Qasr's implementation decision", D.flow(["Tested|capability", "Choose|rollout", "Prepare|properties", "Manage|transition"]), "Qasr must choose an implementation approach that accounts for operational readiness, organisational change and the risks of introducing the process.")],
    ["Our next discussion examines four implementation approaches and the different risks each creates for Qasr's operations.", t("The decision ahead", "Choose how to introduce the process while protecting operational continuity and employee readiness.")]
  ],
  review: [
    {
      title: "The restaurant that was ready to change its service",
      lines: [
        ["Let's reconsider implementation through a restaurant preparing to introduce a redesigned ordering process during everyday customer service.", t("Another way to understand Implement", "A restaurant shows why tested technology must become a dependable operating process.")],
        ["The restaurant has developed a digital ordering application and tested whether ordinary customer requests reach the kitchen correctly.", null],
        ["Its employees have also helped test unusual orders requiring clarification before the kitchen begins preparing meals.", dg("The developed ordering capability", D.flow(["Customer|request", "Digital|ordering", "Kitchen|processing", "Completed|service"]), "The developed ordering process has been tested, but it has not yet been introduced into everyday restaurant operations.")],
        ["The manager is pleased because the application performs correctly during demonstrations and controlled testing sessions.", null],
        ["However, successful development does not establish how the restaurant will perform when customers begin using the new process.", st("Develop prepares and tests the operating capability, while Implement introduces that capability into everyday service.")],
        ["Imagine the restaurant introducing the application during a busy evening when employees must serve many customers simultaneously.", null],
        ["Some employees understand the application but need additional time to locate unfamiliar functions and complete unusual orders.", iss("Employees may work more slowly during transition even when the developed application performs correctly.", "The operational transition")],
        ["Other employees encounter requests that require clarification from colleagues who are already occupied with their normal responsibilities.", null],
        ["The manager now faces an implementation problem rather than a missing software feature or an unfinished process design.", q("What should the restaurant prepare before expecting employees to operate the redesigned service under real demand?")],
        ["Training matters because employees need confidence in the procedures they will perform rather than familiarity with screens alone.", null],
        ["Operational support matters because unexpected situations require assistance while customers continue waiting for their meals.", dg("Supporting the service transition", D.flow(["Prepare|employees", "Provide|support", "Introduce|service", "Monitor|problems"]), "The restaurant must coordinate employee preparation, immediate assistance, operational introduction and monitoring during implementation.")],
        ["The manager should also communicate why the process is changing and what responsibilities employees will retain.", null],
        ["That communication supports change management by connecting the redesigned process with the employees expected to use it.", st("Change management helps employees understand, accept and adopt the new operating arrangements.")],
        ["Suppose the restaurant introduces the application successfully but customers continue experiencing delays when unusual orders require clarification.", null],
        ["The technology has entered operation, yet the restaurant cannot claim that every intended service improvement has been achieved.", cmp("Two different achievements", "Implementation", "The redesigned ordering process becomes part of everyday service.", "Benefits realisation", "Evidence establishes whether the expected service improvements have actually occurred.")],
        ["The manager must distinguish introducing the process from demonstrating the benefits that justified the change.", null],
        ["That distinction explains why Realize Value follows Implement within the wider Business Process Management framework.", dg("From implementation to value", D.flow(["Develop|capability", "Implement|service", "Realize Value|improvement"]), "Introducing the developed ordering process precedes establishing whether it has delivered the intended improvement.")],
        ["The restaurant example helps us understand why Qasr cannot treat successful kiosk testing as proof of implementation success.", null],
        ["Both organisations must prepare employees, protect operations and monitor what happens when their redesigned processes become everyday practice.", q("Would you call the restaurant's implementation successful if the application worked but employees could not serve customers reliably?")]
      ]
    },
    {
      title: "The university registration service entering everyday use",
      lines: [
        ["Now imagine a university preparing to introduce a redesigned student-registration process after completing development and operational testing.", t("Understanding the transition to operations", "A university registration service illustrates the difference between technical readiness and implementation.")],
        ["The new application allows students to submit registration requests and receive decisions based on established academic requirements.", null],
        ["Administrative employees have tested ordinary requests and several situations requiring additional verification or human judgement.", dg("The developed registration process", D.flow(["Student|request", "Check|requirements", "Resolve|exceptions", "Confirm|registration"]), "The developed registration capability combines electronic processing with human handling for cases requiring additional verification.")],
        ["The development team reports that the system works and that the documented procedures have passed their tests.", null],
        ["However, the university must now introduce those arrangements while students continue depending on uninterrupted registration services.", st("A tested operating capability still requires a managed transition before it becomes dependable everyday practice.")],
        ["The registration manager recognises that employees will encounter unfamiliar situations when actual students begin using the process.", null],
        ["Some requests may require coordination between academic departments and administrative employees responsible for completing registration decisions.", iss("Unclear operational support can leave registration requests unresolved even when the electronic application functions correctly.", "The implementation risk")],
        ["The university therefore needs more than an announcement explaining when the new registration application will become available.", null],
        ["Employees require practical preparation, clear responsibilities and access to assistance when ordinary procedures cannot resolve a case.", q("What happens if students begin using the new service before employees know where to obtain operational assistance?")],
        ["The manager should coordinate training with the responsibilities employees will perform during real registration activity.", null],
        ["Support arrangements should also identify who can resolve problems involving system functionality and who can authorise process decisions.", dg("Preparing registration operations", D.flow(["Train|employees", "Assign|support", "Introduce|service", "Review|problems"]), "The university prepares employees, establishes support responsibilities, introduces the service and reviews problems during implementation.")],
        ["These activities belong to Implement because they help translate the developed capability into a functioning organisational service.", null],
        ["People change management also matters because employees may question unfamiliar procedures or worry about altered responsibilities.", st("Implementation combines operational preparation with support for employees adapting to changed responsibilities and working practices.")],
        ["Clear communication can explain why the university is changing the process and how employees will receive assistance.", null],
        ["Leadership remains necessary when departments disagree about priorities or when operating problems require decisions beyond individual authority.", cmp("Connected responsibilities", "Change management", "Helps employees understand and adopt the redesigned registration process.", "Leadership", "Provides direction and resolves organisational decisions affecting the transition.")],
        ["Project management coordinates the deployment activities, while operational managers protect the continuity of registration services.", null],
        ["Together, these responsibilities help the university introduce change without treating technical completion as the end of the programme.", dg("Managing the transition", D.flow(["Developed|service", "Coordinated|deployment", "Operational|adoption", "Performance|evidence"]), "Implementation requires coordinated deployment and adoption before the university can evaluate the resulting service performance.")],
        ["Even after students begin registering successfully, the university must investigate whether the expected improvements have actually occurred.", null],
        ["That later evaluation belongs to Realize Value rather than being assumed from the successful introduction of technology.", st("Implementation establishes operational use; benefits realisation establishes whether the intended improvements have been achieved.")],
        ["Qasr faces the same distinction as it prepares to introduce its redesigned arrival process across fourteen properties.", null],
        ["The central lesson is that dependable implementation requires working technology, prepared employees and coordinated operational support.", q("What evidence would persuade you that the university has introduced a dependable registration process rather than merely launched an application?")]
      ]
    }
  ]
},
{
  title: "Four ways to go live",
  sec: "W12O1b",
  lines: [
    ["Qasr now faces a practical decision about how its redesigned arrival process should reach the remaining properties.", t("Four ways to go live", "Choosing an implementation approach means choosing how operational risk will be managed.")],
    ["The process has been developed, but introducing it everywhere simultaneously would create a very different risk from gradual deployment.", null],
    ["The steering group must compare four approaches before deciding how much disruption the organisation can reasonably tolerate.", dg("Four implementation approaches", D.hier([
      ["Big bang", "One concentrated transition"],
      ["Phased", "Several smaller transitions"],
      ["Parallel", "Old and new processes operate together"],
      ["Pilot then roll", "Learn at limited scale before expanding"]
    ]), "The four approaches distribute implementation risk, operating effort and learning opportunities differently.")],
    ["Consider big bang, where an organisation switches from its existing process to the redesigned process at one defined moment.", null],
    ["Every affected location or operating unit changes together, concentrating the transition into a single coordinated event.", st("Big bang concentrates implementation exposure into one transition rather than spreading cutover across several occasions.")],
    ["That concentration creates substantial exposure because a serious failure can disrupt the entire population being converted.", null],
    ["However, the organisation avoids repeatedly reconciling different operating arrangements after a series of separate deployment waves.", cmp("Big-bang trade-off", "Advantage", "One coordinated transition without continuing reconciliation between successive rollout waves.", "Risk", "Maximum concentrated exposure if the redesigned process fails during cutover.")],
    ["For Qasr, a simultaneous change would expose many properties to the same implementation difficulties at once.", null],
    ["The programme director might appreciate the short transition, but the operations director would question the consequences of failure.", q("Would one rapid transition justify exposing every remaining property to the same operational problem?")],
    ["Phased implementation takes another approach by introducing the redesigned process through several smaller transitions over time.", null],
    ["Some properties adopt the process while others continue operating under their existing arrangements until their scheduled deployment.", dg("Phased implementation", D.flow(["Wave A|changes", "Wave B|changes", "Wave C|changes", "All sites|operating"]), "Phased implementation spreads deployment across several transitions, allowing later waves to benefit from earlier experience.")],
    ["This reduces the number of locations exposed during any individual transition, but it does not eliminate implementation risk.", null],
    ["Each wave creates another opportunity for difficulties, while the organisation temporarily supports different ways of working.", iss("Phased implementation reduces exposure per transition but creates repeated risk and sustained dual-operation costs.", "The phased trade-off")],
    ["Qasr might learn from one property group before introducing the process to another group with different operating conditions.", null],
    ["Yet managers would need to coordinate support, procedures and information while properties operate under different arrangements.", q("How much repeated transition effort can Qasr absorb while still meeting its January deadline?")],
    ["Parallel implementation keeps the old and new processes operating together while the organisation establishes confidence in the replacement.", null],
    ["The existing arrangement provides protection when the new process encounters problems, making parallel running the safest approach.", dg("Parallel running", D.hier([
      ["Existing process", "Remains available during transition"],
      ["Redesigned process", "Operates alongside the existing arrangement"],
      ["Management challenge", "Coordinate and reconcile both arrangements"]
    ]), "Parallel running provides protection through continued operation of the existing process, but it may be impractical.")],
    ["However, parallel running may be impossible when a resource or transaction can only be consumed once.", null],
    ["A guest arrival illustrates the difficulty because the same transaction cannot simply be completed independently through competing processes.", st("Parallel running is frequently impossible when the same resource or transaction cannot be consumed twice.")],
    ["Even where parallel operation is feasible, maintaining and reconciling both arrangements can create substantial additional work.", null],
    ["Managers must therefore distinguish the protection offered by parallel running from the practical ability to operate it.", q("Could Qasr genuinely process the same guest arrival through two independent operating arrangements?")],
    ["Pilot then roll introduces the process at limited scale, allowing the organisation to learn before committing more widely.", null],
    ["The approach offers valuable operational evidence, but its learning stages make it the slowest overall implementation route.", dg("Pilot then roll", D.flow(["Limited|pilot", "Observe|results", "Improve|approach", "Wider|rollout"]), "Pilot then roll uses limited deployment to generate learning before wider implementation, at the cost of a longer timeline.")],
    ["Qasr has already piloted the redesigned arrival process at Marina and Corniche, providing experience from actual operations.", null],
    ["That experience is useful, although successful pilot activity cannot establish readiness across properties with different operating constraints.", st("Pilot learning reduces uncertainty, but evidence from limited sites must be assessed before wider deployment.")],
    ["Notice that none of these approaches removes the need for training, support, monitoring and accountable operational decisions.", null],
    ["Their differences concern where risk is concentrated, how often transitions occur and how much parallel effort is required.", dg("Comparing implementation exposure", D.hier([
      ["Big bang", "Concentrated exposure"],
      ["Phased", "Repeated exposure and dual operation"],
      ["Parallel", "Protection with feasibility constraints"],
      ["Pilot then roll", "Learning with the longest timeline"]
    ]), "Selecting an implementation approach requires explicit comparison of risk concentration, repeated transitions, operating feasibility and learning time.")],
    ["Qasr must now determine which trade-off matters most under its deadline, property differences and operational responsibilities.", t("The next decision", "Choose the approach by examining the organisation's binding implementation constraints.")]
  ],
  review: [
    {
      title: "A bank choosing how to change its branch service",
      lines: [
        ["Imagine a bank introducing a redesigned customer-service process across branches that currently follow established operating procedures.", t("Implementation approaches in banking", "The same redesigned process can create different risks depending on how it is introduced.")],
        ["The redesigned process has been developed and tested, but managers must decide how branches should begin using it.", null],
        ["One proposal would switch every branch during the same weekend, creating a single coordinated transition across the organisation.", dg("One coordinated cutover", D.flow(["Prepare|branches", "Single|cutover", "All branches|operating"]), "A big-bang approach concentrates the bank's transition into one coordinated event.")],
        ["This is big bang, which avoids a prolonged sequence of branch conversions and repeated reconciliation between deployment waves.", null],
        ["However, a serious problem could affect every converted branch because all locations would encounter the change together.", st("Big bang combines one concentrated transition with maximum concentrated exposure to implementation failure.")],
        ["Another manager proposes converting branches in groups, allowing employees at later locations to learn from earlier experiences.", null],
        ["That proposal represents phased implementation because different branches begin operating the redesigned process at different times.", dg("Several branch transitions", D.flow(["Early|branches", "Middle|branches", "Later|branches", "Full|deployment"]), "Phased implementation distributes conversion across several waves while maintaining different operating arrangements during transition.")],
        ["The bank would limit exposure during each conversion, but it would repeatedly face the risks associated with switching procedures.", null],
        ["It would also need to support branches operating under different arrangements until the entire network had converted.", iss("Smaller deployment waves do not remove implementation risk or the cost of supporting different operating arrangements.", "The phased trade-off")],
        ["A third manager suggests keeping the old service process available while employees begin using the redesigned process.", null],
        ["Parallel running could protect operations if the new process failed, provided the bank could genuinely operate both arrangements.", q("Can the same customer transaction be handled through two processes without creating conflicting records or duplicated decisions?")],
        ["That question matters because parallel running may be impossible when a transaction or resource cannot be consumed twice.", null],
        ["Even where it is feasible, maintaining and reconciling two arrangements creates additional operational work for employees.", cmp("Parallel running", "Protection", "The existing process remains available while the redesigned process is introduced.", "Constraint", "Transactions may not be independently repeatable, and reconciliation can become costly.")],
        ["The bank could instead begin with a limited pilot and use the experience to improve wider implementation preparations.", null],
        ["This would provide learning from real operations, although pilot then roll generally creates the longest overall timeline.", dg("Learning before expansion", D.flow(["Pilot|branches", "Review|evidence", "Refine|support", "Expand|deployment"]), "Pilot then roll provides operational learning before wider commitment, while extending the implementation timeline.")],
        ["The important lesson is that these approaches distribute risk differently rather than offering a universally superior solution.", null],
        ["Managers must examine the consequences of failure, repeated transitions, parallel feasibility and the time available for learning.", st("The preferred implementation approach depends on the organisation's constraints and the risks it can responsibly manage.")],
        ["Qasr faces the same decision, although its guest arrivals and property differences create their own operating constraints.", null],
        ["Understanding these trade-offs prepares us to evaluate the factors that should determine Qasr's eventual rollout recommendation.", q("Which implementation risk would matter most if a bank could not tolerate simultaneous disruption across its branches?")]
      ]
    },
    {
      title: "A university introducing a new examination-registration service",
      lines: [
        ["Consider a university preparing to replace its existing examination-registration process with a redesigned digital service.", t("Four approaches in a university", "Implementation strategy determines how students and employees experience the transition.")],
        ["The new process has passed testing, but students will continue submitting requests while the university changes its operating arrangements.", null],
        ["The administration must therefore choose how to introduce the service without creating unacceptable disruption during registration activity.", dg("The registration transition", D.flow(["Tested|service", "Choose|approach", "Introduce|operation", "Support|students"]), "The university must choose a deployment approach that protects registration operations during the transition.")],
        ["A big-bang implementation would move every affected department to the redesigned process at one agreed time.", null],
        ["The university would avoid a prolonged sequence of conversions, but any serious failure could affect the entire service.", st("Big bang concentrates implementation risk because all affected operations change during one coordinated transition.")],
        ["A phased approach would introduce the redesigned service to different departments or student groups through separate deployment waves.", null],
        ["This could limit disruption during each wave while allowing later groups to benefit from earlier operating experience.", dg("Phased university deployment", D.flow(["Group A|changes", "Group B|changes", "Group C|changes", "University|converted"]), "Phased implementation spreads exposure across several transitions and requires temporary support for different arrangements.")],
        ["However, the university would repeatedly manage cutover risks and maintain different registration arrangements during the transition period.", null],
        ["That continuing operational burden matters when employees must explain different procedures to students using the same institutional service.", iss("Phased implementation can reduce exposure per wave while increasing the duration of dual-operation costs.", "The operating burden")],
        ["The university might consider running both registration processes together until employees become confident using the replacement.", null],
        ["Parallel running offers strong protection because the existing process remains available if the new arrangement encounters problems.", q("What happens if two registration processes independently attempt to allocate the same limited examination place?")],
        ["The university would need to prevent duplicate allocations and conflicting records, making genuine parallel operation potentially impractical.", null],
        ["The example illustrates why the safest implementation approach may still be unsuitable for a particular operating process.", cmp("Parallel feasibility", "Potential benefit", "The existing registration process can protect continuity during introduction.", "Potential problem", "Independent processing can create conflicting allocations and expensive reconciliation.")],
        ["A pilot approach would introduce the service to a limited group before extending it to the wider university.", null],
        ["Employees could identify practical difficulties and improve support arrangements before additional groups begin using the redesigned process.", dg("Pilot learning", D.flow(["Limited|group", "Observe|problems", "Improve|readiness", "Expand|service"]), "Pilot then roll provides evidence from limited operational use before wider implementation.")],
        ["The disadvantage is time, because learning and adjustment must occur before the university completes its wider deployment.", null],
        ["The four approaches therefore differ in concentrated exposure, repeated transitions, reconciliation demands and opportunities for learning.", st("Implementation approaches must be compared against the organisation's actual operational constraints rather than selected by preference alone.")],
        ["The university cannot determine its preferred approach merely by identifying which method sounds safest or fastest.", null],
        ["It must consider the consequences of failure and whether the operating process can support the proposed transition.", q("Which approach would you reject if examination places could not be allocated independently through two competing systems?")],
        ["Qasr must apply the same reasoning when deciding how its redesigned arrival process should reach additional properties.", null],
        ["The next challenge is identifying which organisational constraint should carry the greatest weight in that decision.", t("Return to Qasr", "Implementation choices become defensible when managers explain the constraints driving their recommendation.")]
      ]
    }
  ]
},
{
  title: "The factor that decides the rollout",
  sec: "W12O1c",
  lines: [
    ["Qasr's steering group now understands the four implementation approaches, but knowing their characteristics does not settle the decision.", t("The factor that decides the rollout", "A defensible implementation choice begins with the organisation's binding constraints.")],
    ["Each approach offers advantages, yet the organisation must identify which risks and constraints matter most in practice.", null],
    ["The question is not which method sounds safest, but which method fits Qasr's actual operating conditions.", st("Implementation approaches should be evaluated against the organisation's binding constraints rather than selected by general preference.")],
    ["Five factors deserve particular attention because they can change the relative attractiveness of the available implementation approaches.", null],
    ["Consider the external deadline, because Qasr must comply with the tourism authority's digital guest record requirement.", dg("The deadline constraint", D.hier([
      ["External requirement", "Digital guest records"],
      ["Effective date", "1 January"],
      ["Implementation challenge", "Complete compliant arrangements before the deadline"]
    ]), "A hard external deadline limits how much time the organisation can allocate to implementation and recovery.")],
    ["The requirement takes effect on 1 January, leaving five months within the case scenario for implementation preparations.", null],
    ["A deadline creates pressure for speed, but speed cannot compensate for an operating process that fails under real conditions.", iss("A hard deadline limits scheduling flexibility without removing the consequences of operational failure.", "Deadline pressure")],
    ["Now consider whether Qasr could keep the existing and redesigned arrival processes operating independently during the transition.", null],
    ["Parallel running provides strong protection, but the same guest arrival cannot automatically be completed through competing processes.", dg("The parallel-running constraint", D.flow(["Guest|arrival", "Single|transaction", "Consistent|record"]), "Parallel running may be infeasible when the same transaction cannot be independently completed through two operating arrangements.")],
    ["Where a transaction cannot be consumed twice, managers must consider alternative safeguards rather than assume parallel running is available.", null],
    ["That makes rollback planning especially important, because the organisation may need another way to recover from serious problems.", st("When parallel running is unavailable, implementation decisions require credible recovery arrangements and explicit authority.")],
    ["Organisational confidence also matters, particularly when employees have experienced an unsuccessful change and doubt another proposed implementation.", null],
    ["In such circumstances, a limited deployment can demonstrate whether the redesigned process works before wider commitments are made.", cmp("Confidence and implementation", "Low confidence", "Employees may distrust another major transition after previous failure.", "Pilot evidence", "Visible operational learning can help rebuild confidence before wider deployment.")],
    ["However, managers should not confuse reassurance with proof that the process will work equally well in every location.", null],
    ["A successful pilot supports learning, but its relevance depends on the operating conditions represented by the participating sites.", q("Would evidence from one operating environment establish readiness at every Qasr property?")],
    ["Site variation creates another constraint because properties may differ in physical arrangements, demand patterns and approved operating procedures.", null],
    ["A uniform rollout can become difficult when those differences require distinct preparations or registered process variants.", dg("Variation between sites", D.hier([
      ["Physical arrangements", "Different operating spaces"],
      ["Operating conditions", "Different exposure to disruption"],
      ["Process architecture", "Approved local variants"]
    ]), "Variation between sites affects whether pilot experience and implementation preparations can be transferred directly.")],
    ["Qasr must therefore assess whether lessons from its pilot properties can reasonably support implementation elsewhere.", null],
    ["The final factor concerns reconciliation costs when different processes or operating arrangements remain active during transition.", st("High reconciliation costs can make prolonged parallel or dual-operation arrangements unattractive.")],
    ["Maintaining separate arrangements can require additional coordination, consistent records and repeated checks across the organisation.", null],
    ["Those costs may undermine the apparent safety of an approach that otherwise seems operationally attractive.", dg("Comparing the five constraints", D.hier([
      ["Deadline", "Available implementation time"],
      ["Parallel feasibility", "Whether transactions can be repeated"],
      ["Confidence", "Trust following previous failure"],
      ["Site variation", "Differences between locations"],
      ["Reconciliation", "Cost of operating different arrangements"]
    ]), "The five selection factors can favour different implementation approaches and must be assessed together.")],
    ["Notice that these factors may point toward conflicting recommendations rather than producing one obvious implementation answer.", null],
    ["The January deadline encourages progress, while property differences and unresolved operating concerns may justify a more cautious sequence.", q("Which constraint should determine Qasr's recommendation when speed and operational protection pull in different directions?")],
    ["A binding constraint is the condition that most seriously limits which implementation options remain defensible.", null],
    ["Managers must identify that constraint, explain the trade-off and show how their recommendation protects essential operations.", dg("A defensible selection process", D.flow(["Identify|constraints", "Assess|exposure", "Compare|approaches", "Justify|choice"]), "Implementation selection requires evidence about binding constraints and explicit comparison of the resulting risks.")],
    ["They must also consider recovery, because a carefully selected rollout approach can still encounter serious operational difficulties.", null],
    ["Rollback provides a possible safeguard, but it must be planned, rehearsed and supported by clear decision authority.", st("Rollback is a planned recovery capability, not an assumption that the organisation can simply return to previous operations.")],
    ["Qasr's next challenge is preparing employees for the temporary disruption that can accompany even a well-designed implementation.", t("Looking ahead", "The next lesson examines the performance dip and the support employees need during go-live.")]
  ],
  review: [
    {
      title: "A hospital network facing a mandatory deadline",
      lines: [
        ["Imagine a hospital network introducing a redesigned patient-registration process across facilities with different operating conditions and staffing arrangements.", t("A deadline with competing constraints", "A hospital network illustrates why implementation choices require more than a preference for speed.")],
        ["The new process has been developed, but a mandatory external requirement establishes when the organisation must comply.", null],
        ["Managers immediately recognise that the deadline limits the time available for deployment, learning and recovery.", dg("The hospital's deadline", D.flow(["External|requirement", "Limited|time", "Implementation|decision"]), "A hard deadline restricts scheduling flexibility without eliminating operational risk.")],
        ["One manager recommends changing every hospital simultaneously because this would complete the transition through one coordinated event.", null],
        ["Another argues that different facilities should change gradually because their operating conditions are not identical.", cmp("Competing recommendations", "Rapid transition", "Concentrates implementation into a short period.", "Gradual transition", "Allows different facilities to change through separate deployment waves.")],
        ["Both arguments identify genuine considerations, but neither establishes which constraint should dominate the final decision.", null],
        ["The network must examine whether individual hospitals can absorb disruption without compromising essential registration services.", st("A binding constraint is the condition that most seriously limits the organisation's defensible implementation options.")],
        ["Suppose one hospital handles unusually complex registrations while another mainly processes routine administrative requests.", null],
        ["A successful deployment at the simpler location would provide useful learning without proving readiness at the more complex facility.", q("How much confidence should managers place in pilot evidence from a facility with different operating conditions?")],
        ["The network also considers operating the existing and redesigned registration processes together during the transition.", null],
        ["Parallel running might provide protection, but duplicate registration decisions could create conflicting patient records and operational confusion.", dg("Checking parallel feasibility", D.flow(["Patient|request", "Consistent|registration", "Reliable|record"]), "Managers must determine whether the same transaction can safely be handled through competing processes.")],
        ["Where independent processing is impractical, the organisation needs credible recovery arrangements rather than relying on assumed parallel protection.", null],
        ["Managers must also consider whether employees trust the programme, especially if an earlier implementation caused serious difficulties.", iss("Previous failure can reduce confidence and make visible evidence from limited deployment especially valuable.", "Organisational confidence")],
        ["A carefully selected pilot could demonstrate progress, although additional learning would consume time before wider deployment.", null],
        ["Maintaining different procedures across hospitals would also create coordination and reconciliation costs during the transition.", dg("The competing constraints", D.hier([
          ["Deadline", "Time available"],
          ["Parallel running", "Transaction feasibility"],
          ["Confidence", "Trust in the change"],
          ["Variation", "Differences between hospitals"],
          ["Reconciliation", "Cost of multiple arrangements"]
        ]), "The implementation decision must consider all five selection factors rather than treating one advantage as decisive.")],
        ["The appropriate recommendation therefore depends on which constraint most seriously threatens safe and timely implementation.", null],
        ["Managers should explain that judgement and identify how they would respond if their selected approach encountered problems.", st("A defensible implementation recommendation explains its binding constraint, accepted trade-offs and recovery arrangements.")],
        ["Qasr faces the same reasoning challenge because its January deadline does not remove differences between hospitality properties.", null],
        ["The lesson is to evaluate implementation approaches against actual constraints rather than assuming one method always wins.", q("Which hospital constraint would make a rapid network-wide transition unacceptable despite the approaching deadline?")]
      ]
    },
    {
      title: "A retailer rebuilding confidence after a failed rollout",
      lines: [
        ["Consider a retail chain preparing to introduce a redesigned returns process after an earlier technology rollout disrupted store operations.", t("When confidence becomes the constraint", "A retailer illustrates how previous failure can change the preferred implementation approach.")],
        ["The redesigned process has passed development testing, but employees remember the confusion caused by the previous implementation.", null],
        ["Store managers are concerned that another rapid deployment could undermine confidence even if the new technology performs correctly.", st("Low organisational confidence following failure is an important factor when selecting an implementation approach.")],
        ["Senior management initially favours one simultaneous transition because it would avoid prolonged differences between store procedures.", null],
        ["However, employees question whether the organisation has learned enough to prevent another widespread operating problem.", cmp("The competing concerns", "Management preference", "Complete deployment through one coordinated transition.", "Employee concern", "Avoid another widespread failure before confidence has recovered.")],
        ["A limited pilot offers another possibility by allowing selected stores to demonstrate how the redesigned process performs.", null],
        ["The organisation could observe employee difficulties, correct practical problems and communicate what the pilot actually established.", dg("Rebuilding confidence through evidence", D.flow(["Limited|deployment", "Observe|performance", "Correct|problems", "Share|learning"]), "Visible learning from limited implementation can help restore confidence before wider rollout.")],
        ["That approach does not guarantee success, but it provides evidence employees can evaluate rather than another unsupported assurance.", null],
        ["The disadvantage is additional time, which may matter if the retailer faces a fixed implementation deadline.", q("Would a slower pilot be worthwhile if another widespread failure could destroy confidence in the redesigned process?")],
        ["The retailer also discovers that some stores operate in buildings with different service-counter layouts and staffing arrangements.", null],
        ["These differences matter because the process may require distinct preparations even when the underlying design remains consistent.", dg("Variation between stores", D.hier([
          ["Store layout", "Physical operating constraints"],
          ["Staffing", "Different support capacity"],
          ["Returns demand", "Different exposure to disruption"]
        ]), "Site variation affects whether pilot experience can be transferred directly to other operating locations.")],
        ["A successful pilot in one store cannot automatically establish readiness across every other location in the chain.", null],
        ["Managers must assess whether the participating stores represent the conditions likely to affect wider implementation.", st("Pilot evidence supports learning, but its transferability depends on similarities between implementation environments.")],
        ["The retailer considers keeping both returns processes available, although this would create additional reconciliation and coordination work.", null],
        ["Employees might otherwise record the same return inconsistently when transactions move between the old and redesigned arrangements.", iss("High reconciliation costs can make prolonged dual operation unattractive even when it appears to offer additional protection.", "The operating cost")],
        ["Management must therefore compare confidence, site variation, parallel feasibility, deadlines and the cost of supporting different procedures.", null],
        ["The strongest recommendation will identify which factor most seriously limits the organisation's available implementation choices.", dg("Selecting the approach", D.flow(["Assess|constraints", "Identify|binding factor", "Compare|trade-offs", "Defend|recommendation"]), "The preferred approach follows from the organisation's binding constraint and an explicit assessment of implementation risks.")],
        ["A credible recommendation should also explain how the organisation would recover if serious problems emerged during deployment.", null],
        ["That requirement connects implementation selection with rollback planning and accountable operational decision-making.", st("A selected implementation approach still requires a credible recovery plan and clear decision authority.")],
        ["Qasr must apply the same discipline when balancing its deadline against the realities of fourteen different properties.", null],
        ["The important lesson is that implementation strategy should follow evidence about organisational constraints rather than managerial optimism.", q("Which evidence would help the retailer decide whether rebuilding confidence outweighs the pressure for rapid deployment?")]
      ]
    }
  ]
},
      ] },
      { id: "l2", title: "The first weeks after go-live", sections: [
{
  title: "The performance dip nobody wants to announce",
  sec: "W12O2a",
  lines: [
    ["Qasr has examined its rollout options, but even a carefully chosen approach cannot prevent every operational difficulty.", t("The performance dip nobody wants to announce", "Why performance may deteriorate temporarily when a redesigned process enters everyday operations.")],
    ["The steering group must now confront a problem that project schedules rarely make comfortable to discuss.", null],
    ["When employees begin using unfamiliar procedures, their performance can decline before the redesigned process delivers its intended improvements.", dg("The implementation performance dip", D.bars([["Before change", 72], ["Go-live", 72], ["Adjustment", 45], ["Recovery", 64], ["Improvement", 85]]), "Performance may decline after go-live as employees adapt, before recovering and potentially improving beyond the previous level.")],
    ["This temporary deterioration is called the implementation performance dip, and managers should anticipate it rather than express surprise.", null],
    ["The dip does not automatically mean the redesigned process is defective or that the implementation approach was wrong.", st("An initial performance dip can reflect the temporary cost of learning and adjusting to a redesigned process.")],
    ["Consider a Qasr receptionist who understands the new arrival procedure but has not yet developed fluency through repetition.", null],
    ["A familiar task may take longer because the employee must consciously recall steps previously performed almost automatically.", dg("Why performance initially declines", D.flow(["Unfamiliar|procedure", "Slower|execution", "Practical|learning", "Improving|fluency"]), "Employees may initially work more slowly while developing confidence and fluency in redesigned operating procedures.")],
    ["Meanwhile, guests continue arriving, supervisors answer questions, and colleagues must coordinate unfamiliar responsibilities during ordinary service.", null],
    ["The organisation therefore experiences transition costs even when its technology and process design are fundamentally sound.", iss("A functioning redesigned process can still create temporary disruption while employees learn to operate it.", "The transition cost")],
    ["However, managers must distinguish an expected learning dip from persistent failures that require corrective action or escalation.", null],
    ["Calling every problem temporary would be as dangerous as interpreting every slowdown as evidence of implementation failure.", q("How would you distinguish normal employee adjustment from a serious problem requiring intervention?")],
    ["The slides also describe a change curve involving announcement, resistance, exploration and eventual commitment to new working arrangements.", null],
    ["These stages help explain why employees may respond differently as they experience the practical consequences of organisational change.", dg("The employee change curve", D.flow(["Announcement|uncertainty", "Resistance|concern", "Exploration|learning", "Commitment|adoption"]), "The change curve illustrates a possible progression from initial uncertainty and resistance toward exploration and commitment.")],
    ["Announcement may generate uncertainty because employees cannot yet judge how the redesigned process will affect their responsibilities.", null],
    ["Resistance can emerge when unfamiliar procedures appear slower, more demanding or less reliable than established working practices.", cmp("Understanding employee responses", "Resistance", "Employees question unfamiliar procedures and their consequences.", "Exploration", "Employees begin testing, understanding and improving their use of the redesigned process.")],
    ["Exploration becomes possible when employees receive practical support and opportunities to understand how the new arrangements actually work.", null],
    ["Commitment develops as employees gain confidence that the redesigned process can support their responsibilities and service obligations.", st("The change curve helps managers anticipate employee responses rather than assuming immediate acceptance at go-live.")],
    ["These responses are not a guaranteed timetable, and individual employees may move through adjustment at different speeds.", null],
    ["Qasr should therefore prepare support around observed needs rather than assume everyone will become confident simultaneously.", q("What support would help a hesitant receptionist move from resistance toward practical exploration?")],
    ["The performance dip also creates a financial and operational burden that must be recognised before implementation begins.", null],
    ["Managers should forecast the likely depth and duration of disruption instead of promising immediate improvements after go-live.", dg("Planning for the dip", D.hier([
      ["Depth", "How far performance may deteriorate"],
      ["Duration", "How long recovery may require"],
      ["Capacity", "Temporary resources needed"],
      ["Support", "Assistance during adjustment"]
    ]), "Implementation planning should anticipate the expected performance dip and provide temporary capacity and support.")],
    ["Temporary staffing capacity, additional frontline assistance and tolerance for slower work can protect service during employee adjustment.", null],
    ["Sponsors also need realistic expectations because early performance reports may initially show deterioration rather than immediate benefits.", iss("Sponsors who expect instant improvement may abandon a viable programme during its most difficult adjustment period.", "The sponsor risk")],
    ["A programme judged only during its worst week may be cancelled before employees have an opportunity to recover.", null],
    ["Yet an anticipated dip must never become an excuse for ignoring serious operational failures or deteriorating guest service.", st("Managers must prepare for temporary disruption while continuing to investigate problems that threaten operational continuity.")],
    ["For Qasr, implementation success requires managing the transition while monitoring whether performance begins recovering as employees adapt.", null],
    ["Our next discussion examines how training and immediate operational support can help employees navigate that difficult adjustment period.", t("The management challenge", "Prepare employees and sponsors for the dip, support recovery, and respond when disruption becomes unacceptable.")]
  ],
  review: [
    {
      title: "Why a restaurant becomes slower before becoming better",
      lines: [
        ["Imagine a restaurant introducing a redesigned table-service process intended to reduce mistakes and improve coordination with its kitchen.", t("The performance dip in restaurant service", "A temporary slowdown can occur even when the redesigned process is sound.")],
        ["The restaurant has tested the procedures, and employees understand how the new service arrangements are supposed to operate.", null],
        ["However, the manager notices that customer service becomes slower when employees begin using the process during ordinary shifts.", dg("The restaurant performance dip", D.bars([["Established service", 72], ["Go-live", 72], ["Learning", 44], ["Recovery", 65], ["Improvement", 84]]), "Employees may initially perform more slowly while adapting to unfamiliar service procedures.")],
        ["Waiters must remember new responsibilities while coordinating requests with colleagues who are also learning unfamiliar routines.", null],
        ["The additional mental effort creates delays that were less visible during controlled demonstrations and training sessions.", st("Temporary performance deterioration can reflect employee learning rather than a fundamentally defective process.")],
        ["The manager becomes concerned because customers still expect dependable service regardless of the restaurant's internal improvement programme.", null],
        ["Some employees express frustration and suggest returning to the familiar procedures that previously allowed them to work quickly.", iss("Employee frustration during adjustment can resemble resistance even when employees are trying to protect service quality.", "The human response")],
        ["Other employees begin experimenting with the new arrangements and gradually discover how to complete their responsibilities more efficiently.", null],
        ["These different responses illustrate movement from uncertainty and resistance toward exploration and eventual commitment.", dg("The change curve", D.flow(["Announcement|uncertainty", "Resistance|frustration", "Exploration|practice", "Commitment|confidence"]), "Employees may respond to implementation through uncertainty, resistance, exploration and growing commitment.")],
        ["The manager should not assume that every employee will become confident after the same amount of practice.", null],
        ["Instead, support should respond to the difficulties employees actually encounter while serving customers under normal operating conditions.", q("Would additional practical assistance be more useful than simply telling employees to work faster?")],
        ["The restaurant could temporarily increase supervisory support and allow additional time for unfamiliar tasks during the transition.", null],
        ["These arrangements would help protect customer service while employees develop fluency in the redesigned procedures.", dg("Supporting recovery", D.flow(["Observe|slowdowns", "Provide|assistance", "Resolve|problems", "Review|recovery"]), "Managers support employee adjustment while monitoring whether service performance begins recovering.")],
        ["The manager should also explain the expected disruption to the restaurant owner before disappointing performance figures appear.", null],
        ["Otherwise, the owner might interpret an anticipated learning dip as proof that the entire improvement programme has failed.", st("Sponsors need realistic expectations about the temporary depth and duration of implementation disruption.")],
        ["However, managers must investigate persistent problems rather than automatically attributing every delay to employee learning.", null],
        ["A process that repeatedly prevents employees from serving customers requires corrective action, not unlimited patience.", cmp("Two different responses", "Expected learning dip", "Provide temporary support and monitor recovery.", "Persistent operating failure", "Investigate causes and take corrective action.")],
        ["The restaurant example explains why Qasr must prepare for slower performance without accepting every operational difficulty as normal.", null],
        ["A responsible implementation protects service while giving employees a realistic opportunity to develop confidence and competence.", q("What evidence would persuade the restaurant manager that performance is recovering rather than continuing to deteriorate?")]
      ]
    },
    {
      title: "A university registration team learns a new routine",
      lines: [
        ["Consider a university introducing a redesigned student-registration process immediately before a period of substantial administrative activity.", t("The performance dip in university administration", "Employee adjustment can temporarily reduce performance during a well-prepared implementation.")],
        ["The new application has passed testing, and administrative employees have completed the training provided before its introduction.", null],
        ["Nevertheless, registration requests begin taking longer because employees must apply unfamiliar procedures during actual student interactions.", dg("The registration performance dip", D.bars([["Previous process", 74], ["Go-live", 74], ["Adjustment", 46], ["Recovery", 66], ["Improvement", 85]]), "Registration performance may temporarily decline as employees develop fluency in the redesigned process.")],
        ["Employees who previously completed routine decisions almost automatically now pause to verify unfamiliar requirements and responsibilities.", null],
        ["Some requests also require coordination between departments whose employees are adapting to the same organisational change.", st("Training completion does not eliminate the learning effort required when employees begin using new procedures.")],
        ["The registration manager receives complaints about slower service and worries that the implementation has damaged student satisfaction.", null],
        ["However, the manager should investigate whether the slowdown reflects temporary learning or a persistent problem in the process.", q("What would distinguish a normal adjustment period from a registration problem that requires immediate correction?")],
        ["The university should examine processing performance while also listening to employees who encounter difficulties during real registration work.", null],
        ["Their concerns may reveal uncertainty about responsibilities, unfamiliar procedures or operating problems requiring management intervention.", dg("Understanding employee adjustment", D.flow(["Uncertainty|about change", "Resistance|to disruption", "Exploration|through practice", "Commitment|through confidence"]), "The change curve helps explain different employee responses during implementation without assuming everyone adjusts identically.")],
        ["Some employees may question the change because the previous process allowed them to complete familiar tasks more quickly.", null],
        ["Others may begin exploring the new procedures and identifying practical improvements through repeated use and support.", cmp("Employee responses", "Concern", "The redesigned process initially feels slower and less familiar.", "Exploration", "Employees practise the process and develop confidence through experience.")],
        ["The manager should recognise these responses without assuming that reluctance automatically reflects unwillingness to support improvement.", null],
        ["Additional frontline assistance can help employees resolve unfamiliar cases without leaving students waiting for prolonged periods.", st("Practical operational support helps employees move through adjustment while protecting the continuity of student services.")],
        ["Temporary administrative capacity may also be necessary if slower processing creates a backlog during the transition.", null],
        ["The university should anticipate that requirement instead of assuming existing capacity will absorb every consequence of change.", dg("Planning transition capacity", D.hier([
          ["Expected dip", "Temporary slower processing"],
          ["Support", "Assistance with unfamiliar cases"],
          ["Capacity", "Resources to protect service"],
          ["Monitoring", "Evidence of recovery"]
        ]), "Managers should forecast temporary disruption and provide capacity and support while monitoring operational performance.")],
        ["Senior university leaders must understand that immediate performance deterioration does not automatically demonstrate failure of the redesigned process.", null],
        ["Equally, they should not dismiss persistent registration problems merely because a temporary dip was expected.", iss("An anticipated performance dip requires support and monitoring, not automatic acceptance of every service failure.", "The management judgement")],
        ["The manager must examine whether employees are becoming more confident and whether registration performance is beginning to recover.", null],
        ["That evidence provides a stronger basis for decisions than judging the programme solely during its most difficult week.", st("Implementation performance should be interpreted through the expected adjustment period and evidence of actual recovery.")],
        ["Qasr faces a comparable challenge because reception employees must learn unfamiliar arrival procedures while continuing to serve guests.", null],
        ["The lesson is to prepare for temporary disruption while maintaining clear expectations about operational performance and corrective action.", q("How should university leaders respond when slower registration reflects learning rather than a persistent process failure?")]
      ]
    }
  ]
},
{
  title: "Training people to use the process — and helping them stay with it",
  sec: "W12O2b",
  lines: [
    ["Qasr now understands why performance may deteriorate after go-live, but anticipating disruption is not enough to manage it.", t("Training people to use the process — and helping them stay with it", "Effective implementation combines practical training, immediate support and rapid problem resolution.")],
    ["The organisation must prepare employees for their actual responsibilities and support them when unfamiliar situations arise during service.", null],
    ["That requires a change approach extending beyond the classroom and continuing after the redesigned process enters operation.", st("Go-live training prepares employees for their responsibilities, while operational support helps them perform those responsibilities under real conditions.")],
    ["Consider a receptionist who has completed kiosk training and understands how an ordinary guest arrival should proceed.", null],
    ["During a busy shift, a corporate booking is rejected by the kiosk and requires the assisted exception path.", dg("A corporate arrival exception", D.flow(["Corporate|arrival", "Kiosk|rejection", "Assisted|handling", "Completed|arrival"]), "Training must prepare reception employees to manage both normal kiosk arrivals and cases requiring the assisted exception path.")],
    ["The employee may understand the kiosk interface perfectly while remaining uncertain about the exception procedure and required authorisation.", null],
    ["This illustrates why technical instruction alone cannot prepare employees to operate the complete redesigned arrival process.", iss("Knowing how to operate the technology does not guarantee competence in the complete end-to-end process.", "The training gap")],
    ["Effective training should therefore reflect the work employees actually perform, including handovers, unusual cases and changed responsibilities.", null],
    ["Reception employees need practical experience with guest exceptions, while supervisors need confidence in escalation and operational decisions.", dg("Training around real responsibilities", D.hier([
      ["Reception employees", "Normal arrivals and assisted exceptions"],
      ["Supervisors", "Operational decisions and escalation"],
      ["Support personnel", "Diagnosis and resolution of problems"]
    ]), "Role-based preparation addresses the different responsibilities employees perform during the redesigned arrival process.")],
    ["Training should also explain why the process is changing, because employees need more than instructions about unfamiliar activities.", null],
    ["Understanding the purpose of change can reduce uncertainty and encourage employees to participate in making implementation work.", st("Change management connects practical training with employee understanding, confidence and adoption of new working arrangements.")],
    ["However, even realistic training cannot reproduce every situation that employees will encounter during their initial operating shifts.", null],
    ["The slides therefore emphasise intensive support during the initial six weeks after the redesigned process enters operation.", dg("The initial support period", D.flow(["Go-live|begins", "Frontline|assistance", "Daily|escalation", "Visible|corrections"]), "The initial six weeks require practical assistance, rapid escalation and visible resolution of operating problems.")],
    ["Support must be available where the work occurs, rather than depending entirely on distant technical assistance queues.", null],
    ["An employee facing a waiting guest needs practical guidance before an unresolved problem damages the service experience.", q("Would a delayed support ticket help a receptionist resolve an exception while guests continue arriving?")],
    ["Additional frontline capacity can also protect operations when employees temporarily require more time to complete unfamiliar tasks.", null],
    ["This support should be planned as part of implementation rather than treated as evidence that employees have failed.", st("Temporary capacity and accessible frontline assistance help protect service during the adjustment period.")],
    ["The support arrangement must distinguish problems involving technology from problems involving the design or operation of the process.", null],
    ["A technical specialist may repair a kiosk fault without having authority to change an unsuitable arrival procedure.", cmp("Two different escalation needs", "Technical problem", "Requires someone able to diagnose or correct system functionality.", "Process problem", "Requires someone authorised to clarify or change operating procedures.")],
    ["Qasr therefore needs escalation routes that reach people authorised to make the decisions required by each problem.", null],
    ["Problems should be raised daily, allowing managers to identify recurring difficulties before they become accepted workarounds.", dg("Daily operational escalation", D.flow(["Employee|reports", "Support|assesses", "Owner|decides", "Team|corrects", "Staff|informed"]), "Daily escalation connects frontline problems with authorised decisions, corrective action and communication to employees.")],
    ["Small problems should be corrected quickly whenever the appropriate authority can resolve them without undermining process control.", null],
    ["Employees also need to see that reported problems produce changes, otherwise they may stop sharing useful operational evidence.", iss("A support arrangement loses credibility when employees report problems but never hear what happened afterward.", "The feedback problem")],
    ["Visible communication of completed fixes demonstrates that management is listening and that practical improvement remains possible.", null],
    ["That feedback can strengthen confidence because employees see their experience contributing to a more dependable operating process.", st("Fast correction and visible communication help turn frontline feedback into confidence and sustained adoption.")],
    ["Qasr's training and support plan must therefore prepare employees, protect service and create a reliable route for resolving difficulties.", null],
    ["The next challenge is understanding what persistent workarounds reveal when employees continue using alternatives after the initial adjustment.", t("The next question", "What should Qasr conclude when employees remain dependent on an alternative arrival path?")]
  ],
  review: [
    {
      title: "Helping supermarket employees manage self-checkout exceptions",
      lines: [
        ["Imagine a supermarket introducing self-checkout machines while expecting employees to maintain dependable customer service during busy trading periods.", t("Training beyond the machine", "A supermarket illustrates why practical support must accompany technical instruction.")],
        ["Employees attend training sessions and learn how customers scan products, complete payments and receive transaction confirmations.", null],
        ["The demonstrations proceed successfully, and managers conclude that employees understand the basic operation of the new technology.", dg("The standard transaction", D.flow(["Scan|products", "Confirm|purchase", "Complete|payment", "Finish|transaction"]), "Technical training explains the ordinary self-checkout transaction but does not cover every operating exception.")],
        ["During actual trading, however, customers encounter products requiring additional verification and transactions that cannot finish automatically.", null],
        ["An employee understands the machine but hesitates because the unusual situation requires an unfamiliar operating decision.", iss("Technical competence does not automatically provide confidence in exception handling and operational decisions.", "The training limitation")],
        ["The supermarket therefore needs training that reflects the responsibilities employees perform when ordinary processing cannot continue.", null],
        ["Employees should practise realistic exceptions and understand when a supervisor must authorise the next action.", st("Role-based training prepares employees for normal processing, exceptions and the decisions required during actual operations.")],
        ["Even practical training cannot anticipate every difficulty that customers and employees will encounter after the machines become operational.", null],
        ["Managers should therefore provide accessible assistance during the initial period rather than relying entirely on remote support requests.", dg("Supporting the shop floor", D.flow(["Customer|problem", "Employee|assists", "Supervisor|decides", "Transaction|resolved"]), "Frontline assistance and clear escalation help employees resolve unfamiliar situations while protecting customer service.")],
        ["A customer waiting beside a malfunctioning machine needs immediate help, not an explanation about an unresolved technical ticket.", null],
        ["The supermarket must distinguish technical faults from operating procedures that require clarification or management authorisation.", cmp("Different support needs", "Technical fault", "A specialist investigates the machine or software.", "Process uncertainty", "An authorised manager clarifies the operating decision.")],
        ["Daily discussion of recurring problems can reveal which difficulties require additional training and which require process correction.", null],
        ["Managers should communicate completed fixes so employees recognise that reporting difficulties leads to practical improvements.", q("Why might employees stop reporting problems if management never explains what happened to their concerns?")],
        ["Visible responses strengthen confidence and encourage employees to continue using the redesigned service rather than developing informal alternatives.", null],
        ["Temporary staffing support may also be necessary while employees learn to assist customers without delaying other duties.", dg("Building confidence", D.flow(["Practical|training", "Accessible|support", "Rapid|correction", "Visible|feedback", "Confident|adoption"]), "Training, frontline support and visible problem resolution work together to strengthen employee confidence.")],
        ["The supermarket example shows that successful implementation requires an operating support arrangement rather than a completed training attendance record.", null],
        ["Qasr faces the same challenge when reception employees must manage corporate arrival exceptions during busy guest-service periods.", st("Implementation support must remain available where employees perform the work and encounter real operating difficulties.")],
        ["The central lesson is to prepare employees for real responsibilities and maintain assistance while unfamiliar procedures become routine.", null],
        ["Managers should treat employee feedback as evidence for improving the process rather than simply measuring training completion.", q("What support would help supermarket employees resolve unusual transactions without abandoning the redesigned checkout process?")]
      ]
    },
    {
      title: "A hospital registration team needs answers during service",
      lines: [
        ["Consider a hospital introducing a redesigned patient-registration process that combines electronic records with established clinical administration responsibilities.", t("Support where the work happens", "A hospital shows why implementation support must reach employees during actual service.")],
        ["Registration employees complete training and demonstrate that they can enter ordinary patient information into the redesigned application.", null],
        ["Managers are satisfied because the employees understand the screens and can complete the standard registration procedure.", dg("The normal registration process", D.flow(["Patient|arrives", "Details|entered", "Record|checked", "Registration|completed"]), "Standard training prepares employees for routine electronic registration but may not cover every operational exception.")],
        ["During actual service, an employee encounters a patient record requiring clarification from another department before registration can proceed.", null],
        ["The application works correctly, but the employee does not know who can authorise the required operating decision.", iss("A functioning application cannot resolve uncertainty about responsibilities or authority within the operating process.", "The escalation gap")],
        ["The hospital must therefore prepare employees for the complete registration process rather than teaching application functions alone.", null],
        ["Training should explain common exceptions, departmental responsibilities and the circumstances requiring supervisor involvement or specialist assistance.", st("Effective training reflects the actual work, including exceptions, handovers and decisions outside routine processing.")],
        ["However, the hospital cannot expect classroom instruction to anticipate every situation encountered during its initial operating period.", null],
        ["Employees need immediate access to knowledgeable colleagues while patients continue depending on timely registration services.", dg("The operational support route", D.flow(["Employee|reports", "Support|assesses", "Authorised|decision", "Problem|resolved"]), "Support must connect frontline employees with people able to resolve the particular technical or process problem.")],
        ["A distant ticket queue may be appropriate for some technical defects but inadequate for urgent operating decisions.", null],
        ["The support arrangement should distinguish system faults from questions requiring authority to clarify or change procedures.", cmp("Two escalation routes", "System issue", "Technical specialists investigate application functionality.", "Process issue", "Authorised operational personnel resolve procedure and responsibility questions.")],
        ["During the initial operating period, managers should review reported difficulties daily and identify problems appearing repeatedly.", null],
        ["Repeated uncertainty may indicate that employees need additional guidance or that the operating procedure itself requires correction.", q("Would repeating the same classroom lesson solve a problem caused by unclear authority between departments?")],
        ["The hospital should communicate completed corrections so employees understand how reported concerns have influenced the operating arrangements.", null],
        ["Visible feedback helps employees trust the support process and reduces the temptation to invent informal solutions.", dg("Turning reports into improvements", D.flow(["Report|difficulty", "Identify|cause", "Authorise|correction", "Communicate|solution"]), "Rapid investigation and visible communication encourage employees to report problems and adopt corrected procedures.")],
        ["Temporary administrative assistance may also protect service while employees require additional time to complete unfamiliar registration activities.", null],
        ["Such support recognises the practical demands of transition rather than treating slower work as individual employee failure.", st("Temporary capacity, practical assistance and rapid escalation help maintain service while employees adjust.")],
        ["The hospital example illustrates why change management depends on credible operational assistance as well as communication about organisational objectives.", null],
        ["Qasr must apply the same principle when reception employees encounter unfamiliar guest arrivals and need timely decisions.", q("How could hospital managers demonstrate that employee reports are producing meaningful improvements during implementation?")]
      ]
    }
  ]
},
{
  title: "When adoption stops at sixty-five percent",
  sec: "W12O2c",
  lines: [
    ["Qasr has prepared its employees and established go-live support, but the pilot now reveals a more persistent problem.", t("When adoption stops at sixty-five percent", "An adoption plateau can reveal limitations in the process, not simply resistance among employees.")],
    ["Eleven weeks after the pilot began at Marina and Corniche, kiosk adoption has stopped increasing beyond sixty-five percent.", null],
    ["The remaining thirty-five percent of arrivals continue through the reception desk, predominantly because corporate bookings are rejected.", dg("Qasr's pilot adoption", D.hier([
      ["Kiosk adoption", "65%"],
      ["Desk-handled arrivals", "35%"],
      ["Predominant exception", "Corporate bookings rejected by the kiosk"]
    ]), "Eleven weeks into the pilot, kiosk adoption has plateaued at 65%, while 35% of arrivals remain desk-handled.")],
    ["A manager might interpret this plateau as evidence that reception employees are unwilling to embrace the redesigned process.", null],
    ["That explanation sounds plausible until we examine which arrivals remain outside the normal kiosk route.", q("Are employees refusing to use the kiosk, or are some arrivals unable to complete its intended process?")],
    ["The distinction matters because resistance and process limitations require different management responses during implementation.", null],
    ["Additional encouragement cannot make an unsupported corporate booking complete successfully through a kiosk that rejects it.", st("An adoption plateau must be investigated before management attributes the remaining cases to employee resistance.")],
    ["The assisted exception path introduced after employee objections is working, but it operates considerably more slowly than kiosk processing.", null],
    ["A kiosk arrival takes two minutes, while an assisted exception requires nine minutes under the observed pilot arrangements.", cmp("Two operating paths", "Kiosk processing", "2 minutes per arrival.", "Assisted exception", "9 minutes per arrival.")],
    ["This difference creates an operational question about the continuing workload associated with arrivals that cannot use the kiosk.", null],
    ["However, processing time alone cannot establish the total cost without evidence about arrival volumes and staffing arrangements.", iss("The assisted path takes longer, but the case does not provide enough evidence to calculate its total operating cost.", "The measurement boundary")],
    ["Qasr should measure adoption from the beginning of implementation and review the proportion using the redesigned process weekly.", null],
    ["A rising adoption rate suggests increasing use, while a plateau indicates that further investigation may be necessary.", dg("Recognising an adoption plateau", D.bars([["Go-live", 22], ["Early use", 43], ["Learning", 59], ["Later use", 65], ["Week eleven", 65]]), "Illustrative curve: adoption increases before levelling at the case's reported 65% plateau; intermediate values are not case measurements.")],
    ["Managers should examine the remaining cases rather than rely exclusively on the headline adoption percentage.", null],
    ["They need to understand which arrivals fail, where difficulties occur and whether the same exceptions repeatedly appear.", dg("Investigating residual arrivals", D.flow(["Identify|residual cases", "Classify|exceptions", "Investigate|causes", "Decide|response"]), "Adoption analysis should investigate the cases remaining outside the redesigned process before selecting corrective action.")],
    ["This investigation also helps distinguish legitimate approved exceptions from informal workarounds that employees create without authorisation.", null],
    ["A workaround may indicate that the process does not adequately support a situation encountered during ordinary operations.", st("Workarounds are operational evidence that should be investigated, not automatically dismissed as employee resistance.")],
    ["Qasr must remember that its assisted exception path was introduced through an explicit response to frontline concerns.", null],
    ["The existence of an assisted path does not automatically make every use of that path an unauthorised workaround.", cmp("Two different situations", "Approved exception path", "A recognised operating arrangement for cases requiring assisted handling.", "Informal workaround", "An unapproved alternative that employees develop when the intended process does not work.")],
    ["Managers should catalogue recurring workarounds and determine whether they reveal training gaps, unclear procedures or genuine process limitations.", null],
    ["Where the process itself causes the difficulty, repeating the same training may leave the underlying problem unresolved.", q("What would another kiosk training session achieve for a corporate booking the kiosk cannot accept?")],
    ["The pilot also provides encouraging evidence because guest satisfaction increased from six point eight to seven point nine.", null],
    ["That improvement matters, but it does not establish that every arrival category is adequately supported by the redesigned process.", dg("Two different performance signals", D.hier([
      ["Guest satisfaction", "6.8 before the pilot"],
      ["Guest satisfaction", "7.9 after the pilot"],
      ["Kiosk adoption", "65% plateau"],
      ["Remaining arrivals", "35% desk-handled"]
    ]), "Improved guest satisfaction and incomplete kiosk adoption can coexist; neither measure replaces investigation of the other.")],
    ["Qasr therefore faces a judgement rather than a simple verdict about whether sixty-five percent adoption represents success.", null],
    ["The steering group must assess whether the residual cases form an acceptable operating arrangement or require further correction.", st("An adoption target becomes meaningful when managers understand the residual cases and their operational consequences.")],
    ["Employees should hear what management learns and which problems have been corrected, reinforcing the credibility of frontline reporting.", null],
    ["The next lesson asks whether evidence from these pilot properties can support implementation across twelve additional locations.", t("The decision ahead", "Investigate the residual population before assuming the pilot is ready for wider replication.")]
  ],
  review: [
    {
      title: "When an online university application cannot serve every student",
      lines: [
        ["Imagine a university introducing an online admissions service intended to reduce manual processing and improve the applicant experience.", t("An adoption plateau in university admissions", "Low adoption may reveal cases the redesigned process cannot handle.")],
        ["Most applicants begin using the new service, and administrative employees report that ordinary applications are easier to process.", null],
        ["However, a persistent group of applicants continues requiring assistance because their circumstances do not fit the electronic procedure.", dg("Two application routes", D.hier([
          ["Online route", "Applications supported by the digital process"],
          ["Assisted route", "Applications requiring additional human handling"]
        ]), "The university must distinguish ordinary digital processing from cases requiring an assisted application route.")],
        ["A manager complains that employees are failing to encourage applicants to use the online service consistently.", null],
        ["Before accepting that explanation, the admissions team investigates which applications remain outside the redesigned process.", q("Would additional encouragement solve a problem caused by an application type the online service cannot process?")],
        ["The investigation reveals that some applicants need document verification that the digital process does not currently support.", null],
        ["Those applicants cannot complete the ordinary route even when they understand the technology and want to use it.", st("An adoption plateau may reflect process capability rather than unwillingness to adopt the redesigned service.")],
        ["The university should therefore distinguish employee resistance, applicant preferences and limitations in the approved operating process.", null],
        ["Each explanation requires different evidence and may justify a different management response during implementation.", dg("Diagnosing incomplete adoption", D.flow(["Observe|plateau", "Examine|cases", "Identify|cause", "Select|response"]), "Managers should investigate the residual population before deciding whether training, support or process correction is needed.")],
        ["If employees misunderstand the procedure, additional practical training may help them guide applicants more effectively.", null],
        ["If the application cannot support a legitimate category, training alone cannot remove the underlying process limitation.", cmp("Different causes, different responses", "Knowledge gap", "Improve guidance and practical training.", "Process limitation", "Review the unsupported case and determine an authorised operating solution.")],
        ["The university should also distinguish an approved assisted route from an informal workaround invented by employees.", null],
        ["An approved exception path may be necessary, while an unauthorised alternative can create inconsistent records and unclear responsibilities.", st("Approved exceptions and informal workarounds are different operating arrangements and should not be treated as equivalent.")],
        ["Managers should catalogue recurring problems and communicate corrections so employees understand how their reports influence the service.", null],
        ["That feedback encourages continued reporting rather than quiet acceptance of unresolved difficulties or informal alternatives.", dg("Learning from residual cases", D.flow(["Record|exceptions", "Investigate|patterns", "Authorise|corrections", "Inform|employees"]), "Recurring exceptions should inform authorised process decisions and visible communication to operational employees.")],
        ["The university might still achieve better applicant satisfaction while retaining a substantial population requiring assisted processing.", null],
        ["Improved satisfaction would be encouraging, but it would not establish whether the remaining application cases were adequately supported.", iss("A positive overall outcome does not eliminate the need to investigate unresolved cases.", "The measurement lesson")],
        ["Qasr faces the same distinction because improved guest satisfaction accompanies incomplete kiosk adoption in its pilot.", null],
        ["The important question is whether the remaining cases represent an acceptable exception arrangement or an unresolved process problem.", q("What evidence would help the university decide whether its assisted application route should remain permanent?")]
      ]
    },
    {
      title: "A retailer discovers why employees bypass the returns application",
      lines: [
        ["Consider a retailer introducing a redesigned returns application intended to standardise how employees handle customer requests.", t("Workarounds as operational evidence", "A retail example shows why managers must investigate persistent alternatives to the intended process.")],
        ["Employees receive training, and the application successfully processes ordinary returns during the initial operating period.", null],
        ["Yet managers notice that some stores continue recording certain returns outside the redesigned application.", dg("The returns process", D.flow(["Customer|request", "Application|check", "Approved|return", "Record|completed"]), "The intended returns process relies on the redesigned application, but some transactions remain outside that route.")],
        ["The project manager assumes that employees prefer their familiar routines and recommends another round of generic training.", null],
        ["A store supervisor instead suggests examining the transactions that employees repeatedly handle through alternative arrangements.", q("What if employees understand the application but cannot complete certain legitimate returns through it?")],
        ["The investigation reveals that a particular return category requires information the application does not currently accept.", null],
        ["Employees have developed an informal method to finish those transactions because customers still expect their requests to be resolved.", iss("An informal workaround can reveal a process limitation rather than simple resistance to organisational change.", "The hidden signal")],
        ["This does not mean that every workaround should be accepted as a suitable permanent operating arrangement.", null],
        ["Unauthorised alternatives may undermine consistent records, process controls and accountability across different retail locations.", st("Workarounds should be documented and investigated before management decides whether to correct, approve or prohibit them.")],
        ["The retailer should examine the affected return categories and determine why the intended application cannot support them.", null],
        ["Managers must distinguish cases requiring additional employee guidance from cases requiring an authorised process or technology correction.", dg("Investigating workarounds", D.flow(["Catalogue|alternatives", "Classify|cases", "Find|causes", "Authorise|response"]), "A structured investigation connects recurring workarounds with their causes and appropriate management decisions.")],
        ["If employees simply misunderstand an available function, practical training may help them complete the transaction correctly.", null],
        ["If the application lacks the necessary capability, repeating training cannot make the unsupported transaction work.", cmp("Choosing the intervention", "Training problem", "Employees need guidance on an existing capability.", "Process problem", "The intended arrangement cannot adequately handle a legitimate case.")],
        ["The retailer should monitor the proportion of returns completed through the intended application and investigate persistent exceptions.", null],
        ["A stable adoption percentage is not sufficient evidence that employees have accepted or rejected the redesigned process.", st("Adoption measurement becomes useful when the remaining transactions are classified and their operating consequences understood.")],
        ["Managers should also communicate completed corrections so employees recognise that reporting difficulties leads to practical improvements.", null],
        ["Visible feedback encourages employees to share problems instead of hiding them through increasingly elaborate informal arrangements.", dg("Closing the feedback loop", D.flow(["Employee|reports", "Manager|investigates", "Owner|corrects", "Staff|informed"]), "Visible correction of recurring problems supports confidence and reduces reliance on unapproved alternatives.")],
        ["The retailer may decide that some exceptions require a formally approved assisted procedure rather than complete automation.", null],
        ["Such a decision should reflect operating evidence and appropriate authority rather than an assumption that every manual activity represents failure.", q("When should the retailer approve an exception path instead of demanding that every return use the application?")],
        ["Qasr must apply the same reasoning to its corporate arrivals, assisted processing and persistent kiosk adoption plateau.", null],
        ["The lesson is to investigate residual cases before attributing incomplete adoption to employees or declaring the process unsuccessful.", st("Incomplete adoption requires diagnosis, proportionate corrective action and continuing measurement of the actual operating process.")]
      ]
    }
  ]
},
      ] },
      { id: "l3", title: "Fourteen properties, different realities", sections: [
{
  title: "A pilot is not fourteen properties",
  sec: "W12O1d",
  lines: [
    ["Qasr has learned from Marina and Corniche, but the steering group must now decide how far that experience travels.", t("A pilot is not fourteen properties", "Successful pilot experience must be tested against the conditions of each implementation site.")],
    ["The pilot provides valuable evidence about actual arrivals, employee adjustment and the limitations of kiosk-based processing.", null],
    ["However, two operating locations cannot automatically represent every physical and organisational condition across fourteen different properties.", dg("From pilot to wider implementation", D.flow(["Marina and|Corniche", "Pilot|evidence", "Assess|transferability", "Other|properties"]), "Evidence from two pilot properties must be assessed before applying the same implementation arrangements across the remaining locations.")],
    ["This is the problem of pilot generalisability, which concerns whether lessons from limited deployment apply elsewhere.", null],
    ["A pilot can demonstrate that a process operates under observed conditions without proving that every location is equally ready.", st("Pilot success provides evidence from specific operating conditions, not automatic proof of readiness across every site.")],
    ["At Qasr, Marina and Corniche have already introduced the redesigned arrival process and revealed important operational lessons.", null],
    ["Their experience includes the persistent adoption plateau and the need to support corporate arrivals through assisted handling.", dg("What the pilot establishes", D.hier([
      ["Operational experience", "Two properties"],
      ["Kiosk adoption", "65% plateau"],
      ["Residual arrivals", "35% desk-handled"],
      ["Important lesson", "Corporate exceptions require attention"]
    ]), "The pilot provides operational evidence, but its findings must be interpreted before wider replication.")],
    ["These findings matter, yet the remaining properties have operating characteristics that differ from the pilot environment.", null],
    ["The heritage properties present a particularly clear example because their lobbies cannot accommodate the proposed kiosks.", q("Should Qasr force identical kiosk arrangements into buildings where the required physical space does not exist?")],
    ["The answer depends on understanding the distinction between a standard process and its approved operating variants.", null],
    ["During Process Architecture, Qasr registered assisted-path variants for properties requiring different arrangements because of physical constraints.", dg("Approved architectural variation", D.hier([
      ["Standard process", "Common arrival requirements"],
      ["Heritage variant", "Registered assisted path"],
      ["Architectural principle", "Controlled variation"]
    ]), "Registered assisted-path variants accommodate genuine property constraints without allowing uncontrolled local process redesign.")],
    ["These variants are not unauthorised workarounds invented by employees who prefer to avoid the redesigned process.", null],
    ["They are recognised architectural arrangements that implementation must support through suitable procedures, responsibilities and operational preparation.", st("A registered process variant is an approved operating arrangement, not evidence that local employees rejected standardisation.")],
    ["However, justified variation does not give every property permission to redesign the arrival process independently during deployment.", null],
    ["Qasr must preserve the approved process architecture while adapting implementation preparations to each property's legitimate operating requirements.", cmp("Two forms of variation", "Registered variant", "An approved difference that accommodates a genuine operating constraint.", "Uncontrolled redesign", "An unapproved local change that can undermine consistency and accountability.")],
    ["The implementation team must therefore examine whether each location has the infrastructure, procedures and people required for its approved arrangement.", null],
    ["A property may be technically prepared yet lack the operational support needed to handle its expected arrival exceptions.", dg("Assessing site readiness", D.flow(["Review|constraints", "Confirm|variant", "Prepare|employees", "Arrange|support", "Assess|readiness"]), "Site readiness includes physical conditions, approved operating variants, employee preparation and practical support.")],
    ["This assessment becomes especially important when the organisation intends to deploy the same improvement across many locations.", null],
    ["The team should transfer useful pilot learning while identifying conditions that require different preparations or additional safeguards.", q("Which lessons from Marina and Corniche remain useful when another property operates through a registered assisted path?")],
    ["Another risk appears as deployment progresses because implementation attention may become uneven across the remaining properties.", null],
    ["Later sites may benefit from accumulated experience, but they may also receive less direct assistance as resources become stretched.", dg("Support across implementation waves", D.flow(["Early|sites", "Capture|learning", "Later|sites", "Maintain|support"]), "Later implementation sites should benefit from accumulated learning without losing the operational support needed for successful adoption.")],
    ["Managers should deliberately allocate support rather than assume later deployments become effortless once the team gains experience.", null],
    ["The amount and type of assistance should reflect local readiness, operating complexity and the consequences of disruption.", st("Implementation support should follow site-specific risk and readiness rather than simply decline as deployment progresses.")],
    ["Qasr must also recognise that the pilot's unresolved corporate-arrival cases remain relevant when considering wider implementation.", null],
    ["Replicating the technology without addressing those cases could reproduce the same limitation across additional operating locations.", iss("Replicating a pilot without examining unresolved exceptions can spread an operating problem rather than solve it.", "The replication risk")],
    ["The steering group therefore needs evidence about each property's constraints before selecting the sequence for wider deployment.", null],
    ["The next discussion uses Exhibit 12 to compare the remaining properties and build a defensible rollout order.", t("The next decision", "Transfer pilot learning, preserve approved variants and assess each property's readiness before wider deployment.")]
  ],
  review: [
    {
      title: "One retail process, different store layouts",
      lines: [
        ["Imagine a retail chain introducing a redesigned customer-service process after completing a successful pilot in a modern flagship store.", t("The retail layout problem", "A successful pilot may not represent the physical conditions of every operating location.")],
        ["The flagship has spacious service counters, modern equipment and employees familiar with the proposed customer-handling arrangements.", null],
        ["Managers are pleased with the pilot and propose introducing exactly the same physical arrangement throughout the chain.", dg("The pilot environment", D.hier([
          ["Flagship store", "Spacious service area"],
          ["Pilot result", "Useful operating experience"],
          ["Management proposal", "Replicate the arrangement everywhere"]
        ]), "The pilot demonstrates performance in one store environment without establishing suitability across different layouts.")],
        ["However, several older stores have narrow counters that cannot accommodate the equipment used in the flagship.", null],
        ["Employees at those locations still need to complete the same customer-service objectives despite their different physical constraints.", q("Should the retailer treat every store without sufficient counter space as unwilling to adopt the redesigned process?")],
        ["The problem is not necessarily resistance because physical limitations can make an otherwise successful arrangement impractical.", null],
        ["The retailer must distinguish the common service process from the particular equipment configuration used during the pilot.", st("Pilot generalisability depends on whether the conditions supporting the pilot also exist at other implementation locations.")],
        ["Suppose the approved process architecture already includes a service-counter variant for stores with restricted operating space.", null],
        ["That registered variant should guide implementation rather than being treated as an unauthorised local workaround.", dg("Controlled process variation", D.hier([
          ["Common process", "Consistent customer-service requirements"],
          ["Approved variant", "Alternative arrangement for restricted space"],
          ["Implementation", "Prepare each store for its authorised design"]
        ]), "An approved variant accommodates a genuine operating constraint while preserving the common process architecture.")],
        ["Store managers should not independently invent new procedures simply because their buildings differ from the flagship.", null],
        ["They should confirm the approved arrangement and prepare employees to operate it under actual customer-service conditions.", cmp("Different responses", "Approved variation", "Use the registered operating arrangement appropriate to the location.", "Uncontrolled change", "Allow each store to create an unrelated process without authorisation.")],
        ["The implementation team must also assess whether employees have suitable equipment, practical training and accessible support.", null],
        ["A store with a valid process variant may still be unready if employees cannot operate it confidently.", st("Site readiness includes the ability to operate the approved process, not merely the existence of a suitable design.")],
        ["As more stores join the programme, managers may assume later locations need less help because implementation has become familiar.", null],
        ["Yet unfamiliar layouts and different operating demands can create additional support requirements at those later locations.", dg("Protecting later deployments", D.flow(["Pilot|learning", "Assess|new store", "Adapt|preparation", "Maintain|support"]), "Implementation learning should improve later deployments without reducing support below what local conditions require.")],
        ["The retailer should therefore transfer useful pilot lessons while examining which assumptions no longer hold in other stores.", null],
        ["That approach protects consistency without pretending that every location has identical physical and operational conditions.", q("What evidence would help the retailer determine whether a smaller store is ready for its approved service variant?")],
        ["Qasr faces the same challenge because its heritage properties cannot simply reproduce the kiosk arrangements used elsewhere.", null],
        ["The lesson is to distinguish controlled architectural variation from uncontrolled local redesign when scaling a successful pilot.", st("Successful multi-site implementation combines common process control with evidence-based preparation for legitimate local differences.")]
      ]
    },
    {
      title: "A university service expands beyond its pilot campus",
      lines: [
        ["Consider a university introducing a common student-support process after a successful pilot at its main campus.", t("From one campus to several", "Pilot learning must be examined before implementation expands into different operating environments.")],
        ["The pilot campus has experienced administrative employees, established service facilities and convenient access to specialist support.", null],
        ["The project team concludes that the redesigned process works and prepares to introduce it at additional campuses.", dg("The university pilot", D.flow(["Main|campus", "Successful|operation", "Review|evidence", "Other|campuses"]), "A successful campus pilot provides useful evidence but does not automatically establish readiness elsewhere.")],
        ["However, another campus operates with fewer administrative employees and depends on remote assistance for unusual student requests.", null],
        ["A smaller campus also has service facilities that differ from those used during the original implementation.", q("Can the university assume that every campus will achieve the same result with identical preparation?")],
        ["The pilot demonstrates what happened under the conditions present at the main campus, not under every possible arrangement.", null],
        ["Managers must assess whether staffing, facilities and support responsibilities differ enough to affect the redesigned service.", st("Pilot transferability requires examining whether important operating conditions are comparable across implementation sites.")],
        ["The university's approved process architecture may already recognise alternative procedures for campuses with different service arrangements.", null],
        ["Those registered variants should be introduced deliberately rather than allowing each campus to improvise its own solution.", dg("Preserving the process architecture", D.hier([
          ["Common service", "Shared student-support requirements"],
          ["Registered variant", "Approved local operating difference"],
          ["Implementation control", "Consistent responsibilities and procedures"]
        ]), "Approved variants preserve process consistency while accommodating genuine differences between campuses.")],
        ["An approved local variant is different from an employee bypassing the process because the new procedure feels inconvenient.", null],
        ["The university should investigate informal workarounds while preparing campuses to use their authorised operating arrangements.", cmp("Two operating differences", "Registered variant", "A formally approved response to a legitimate campus constraint.", "Informal workaround", "An unapproved alternative requiring investigation and management review.")],
        ["The implementation team must also verify that each campus has the people and support needed to operate its arrangement.", null],
        ["A campus can possess the correct procedures yet remain unready because employees lack practical preparation or assistance.", dg("Campus readiness", D.flow(["Review|conditions", "Confirm|variant", "Train|employees", "Arrange|support", "Assess|readiness"]), "Readiness requires more than technical availability; employees and support arrangements must match local operating conditions.")],
        ["Managers should use pilot learning to improve preparation without assuming that later campuses automatically require less implementation support.", null],
        ["The most complex location may need additional assistance even when several simpler campuses have already adopted the process.", st("Support allocation should reflect local operating risk and readiness rather than the position of a site in the rollout sequence.")],
        ["The university should also examine unresolved problems from the pilot before introducing the same limitations across other campuses.", null],
        ["A repeated exception may reveal a process weakness that becomes more consequential when the number of users increases.", iss("Scaling a pilot without investigating unresolved problems can multiply the effects of the same process limitation.", "The expansion risk")],
        ["The central management task is to transfer reliable learning while identifying conditions that require different implementation preparations.", null],
        ["That discipline helps the university expand its service without sacrificing architectural consistency or operational support.", q("Which campus differences would justify additional preparation before the redesigned student-support process goes live?")],
        ["Qasr must apply the same reasoning when extending its arrival process beyond Marina and Corniche.", null],
        ["The lesson is that a pilot provides evidence for implementation decisions, not permission to ignore differences between locations.", st("A successful pilot is a starting point for assessing wider readiness, not a substitute for that assessment.")]
      ]
    }
  ]
},
{
  title: "Sequencing the twelve remaining properties",
  sec: "W12O1e",
  lines: [
    ["Qasr now understands why pilot experience cannot simply be copied across every property without examining local operating conditions.", t("Sequencing the twelve remaining properties", "Fourteen properties, one January deadline, and a rollout sequence that must withstand operational disruption.")],
    ["The steering group must translate that understanding into a practical sequence for the twelve properties still awaiting implementation.", null],
    ["Exhibit 12 provides the evidence, and the differences between property groups make this decision more complicated than scheduling.", dg("Exhibit 12: Qasr's fourteen properties", D.hier([
      ["Marina and Corniche", "2 properties already piloted"],
      ["Standard-layout properties", "5 properties without identified constraints"],
      ["Heritage properties", "3 properties requiring registered assisted-path variants"],
      ["Peak-occupancy properties", "4 properties above 90% occupancy through January"]
    ]), "The fourteen properties comprise two pilot sites and twelve remaining locations with different implementation constraints.")],
    ["Marina and Corniche have already piloted the redesigned arrival process, leaving three distinct groups requiring deployment decisions.", null],
    ["Five standard-layout properties have no identified constraint, making them comparatively straightforward candidates for the next implementation wave.", st("The five standard-layout properties present no identified physical or occupancy constraint in Exhibit 12.")],
    ["That does not establish automatic readiness, because employee preparation, operational support and unresolved process issues still require assessment.", null],
    ["However, these properties may offer a reasonable opportunity to extend pilot learning without introducing additional architectural complexity.", dg("The standard-layout group", D.flow(["Pilot|learning", "Assess|readiness", "Prepare|support", "Standard|properties"]), "Standard-layout properties may provide a relatively straightforward deployment group, subject to operational readiness.")],
    ["Three heritage properties present a different challenge because their lobbies cannot accommodate the kiosks used elsewhere.", null],
    ["Their registered assisted-path variants must therefore be prepared as approved operating arrangements rather than treated as local exceptions.", q("Would a rollout sequence remain defensible if it ignored the heritage properties' approved architectural requirements?")],
    ["These properties may require different training and support arrangements, even though they remain part of the common process architecture.", null],
    ["Qasr should therefore assess the readiness of each registered variant before committing its property to a deployment wave.", dg("The heritage group", D.hier([
      ["Properties", "3"],
      ["Physical constraint", "No lobby space for kiosks"],
      ["Approved arrangement", "Registered assisted-path variants"],
      ["Implementation need", "Variant-specific preparation"]
    ]), "Heritage properties require implementation of their registered assisted-path variants rather than an unsuitable kiosk arrangement.")],
    ["Four additional properties face occupancy above ninety percent through January, creating a particularly demanding operating environment.", null],
    ["The slides state that these properties cannot absorb a January performance dip without unacceptable operational consequences.", iss("Peak-occupancy properties cannot safely be treated as ordinary January deployment candidates.", "The occupancy constraint")],
    ["That constraint makes deployment timing critical because employee adjustment may temporarily reduce performance even after careful preparation.", null],
    ["A defensible sequence must protect these properties from disruption during their exceptionally busy operating period.", st("Rollout sequencing should account for the consequences of disruption, not simply the number of properties remaining.")],
    ["The tourism authority's digital guest record requirement takes effect on 1 January, making the implementation deadline externally binding.", null],
    ["The programme director proposes beginning the remaining rollout in October and completing twelve properties over eight weeks.", dg("The proposed implementation window", D.flow(["October|start", "Eight-week|rollout", "December|completion", "Three-week|buffer", "January|deadline"]), "The programme director proposes an eight-week rollout beginning in October, leaving three weeks before the January requirement.")],
    ["The proposal would finish during December and leave three weeks before the regulatory requirement becomes effective.", null],
    ["That buffer offers some contingency, but its adequacy depends on the failures and recovery demands the programme might encounter.", q("Would three weeks remain sufficient if a serious problem disrupted the final implementation wave?")],
    ["The operations director sharpens this concern by asking what happens if the eighth week fails.", null],
    ["The question exposes the difference between a schedule that works as planned and one that survives unexpected disruption.", cmp("Two planning perspectives", "Planned completion", "Twelve properties deployed over eight weeks.", "Resilient completion", "Deployment remains defensible when problems require additional time or corrective action.")],
    ["Qasr must also remember that kiosk adoption remains at sixty-five percent after eleven weeks of pilot operation.", null],
    ["The remaining corporate-arrival cases could create additional operating demands if the same limitations appear across more properties.", dg("Pilot evidence affecting rollout", D.hier([
      ["Kiosk adoption", "65% plateau"],
      ["Desk-handled arrivals", "35%"],
      ["Assisted processing", "9 minutes"],
      ["Kiosk processing", "2 minutes"]
    ]), "The unresolved residual population must inform wider deployment preparations rather than being ignored during scheduling.")],
    ["A reasonable candidate sequence might begin with ready standard-layout properties while preparing heritage variants and protecting peak-occupancy operations.", null],
    ["However, that remains a conditional recommendation rather than an approved Qasr decision or a universally correct deployment order.", st("A defensible sequence must explain its assumptions, operating constraints and readiness conditions.")],
    ["The steering group should identify which group follows the pilots and which group faces the greatest timing risk.", null],
    ["It must also explain what evidence would justify delaying a wave despite the pressure of the January deadline.", dg("Building a defensible sequence", D.flow(["Compare|site groups", "Assess|readiness", "Sequence|deployment", "Protect|operations", "Plan|contingency"]), "The rollout sequence should combine site differences, readiness evidence, operational protection and contingency planning.")],
    ["Qasr now has a proposed schedule, but the steering group still needs objective evidence before authorising each deployment.", null],
    ["Our next discussion examines the go-live decision and why approval must be more than a routine project formality.", t("The decision ahead", "A schedule proposes when to deploy; a readiness decision establishes whether deployment should proceed.")]
  ],
  review: [
    {
      title: "A hospital network must sequence its admissions rollout",
      lines: [
        ["Imagine a hospital network introducing a redesigned admissions process across facilities with different operating demands and technical arrangements.", t("Sequencing a hospital network", "A defensible rollout order reflects readiness, operating constraints and the consequences of disruption.")],
        ["The network has completed a pilot and must now determine which remaining hospitals should adopt the process next.", null],
        ["Some hospitals have standard facilities and no identified constraint affecting the planned admissions arrangement.", dg("Different hospital conditions", D.hier([
          ["Standard facilities", "No identified additional constraint"],
          ["Specialist facilities", "Approved operating variants"],
          ["High-demand facilities", "Limited tolerance for disruption"]
        ]), "Different operating conditions create different implementation risks across the hospital network.")],
        ["Other hospitals require approved variations because their existing facilities cannot support exactly the same administrative arrangement.", null],
        ["A further group experiences unusually high patient demand during the period proposed for implementation.", st("Site variation and operating demand should influence deployment sequencing rather than being ignored for scheduling convenience.")],
        ["The project manager proposes deploying the redesigned process at every remaining hospital according to the available installation calendar.", null],
        ["The operations director challenges that approach because technical installation dates do not establish readiness for everyday patient services.", q("Would the earliest available installation date necessarily identify the safest hospital to deploy next?")],
        ["A hospital with standard facilities may be comparatively straightforward, provided its employees and support arrangements are ready.", null],
        ["A specialist hospital may require additional preparation to operate its approved process variant safely and consistently.", dg("Comparing readiness", D.flow(["Review|conditions", "Confirm|variant", "Prepare|employees", "Assess|support", "Approve|readiness"]), "Each hospital requires readiness assessment appropriate to its operating conditions and approved process arrangement.")],
        ["A high-demand hospital may need particularly careful timing because temporary performance deterioration could affect essential administrative services.", null],
        ["The network should therefore consider the consequences of disruption when deciding where each implementation wave belongs.", iss("A technically ready site may still face unacceptable operational exposure during a period of exceptionally high demand.", "The timing risk")],
        ["Suppose an external requirement establishes a fixed date by which every hospital must operate the redesigned admissions process.", null],
        ["The deadline increases scheduling pressure, but it does not remove the need for appropriate preparation and contingency.", cmp("Competing constraints", "External deadline", "Limits the time available for implementation.", "Operational protection", "Requires deployment timing that avoids unacceptable disruption.")],
        ["The manager should build a proposed sequence and explain why particular hospitals are included in each deployment wave.", null],
        ["That recommendation should also identify what happens if an early deployment requires more corrective work than expected.", dg("A resilient rollout plan", D.flow(["Assess|sites", "Choose|waves", "Prepare|support", "Monitor|results", "Adjust|sequence"]), "A defensible sequence combines readiness, operational risk and the ability to respond when deployment does not proceed as planned.")],
        ["A schedule with no credible response to failure is less dependable than its planned completion date might suggest.", null],
        ["Managers must distinguish the intended rollout sequence from the evidence needed to authorise actual deployment at each hospital.", st("A proposed deployment date is not equivalent to an evidence-based go-live decision.")],
        ["The same reasoning applies to Qasr's standard-layout, heritage and peak-occupancy properties under its January deadline.", null],
        ["The lesson is to sequence implementation according to defensible operating priorities rather than treating locations as interchangeable.", q("Which hospital group would require the strongest justification before deployment during its busiest operating period?")]
      ]
    },
    {
      title: "A retailer plans deployment before its busiest season",
      lines: [
        ["Consider a retail chain introducing a redesigned checkout process across stores with different layouts and seasonal trading patterns.", t("A retail rollout before peak demand", "Deployment order must account for operating conditions and the consequences of temporary disruption.")],
        ["The chain has completed a pilot and wants every remaining store operating the redesigned process before a fixed business deadline.", null],
        ["Some stores have standard checkout layouts and appear comparatively straightforward candidates for wider implementation.", dg("The remaining store groups", D.hier([
          ["Standard stores", "No identified layout constraint"],
          ["Older stores", "Approved alternative arrangements"],
          ["Peak-demand stores", "Limited tolerance for slower service"]
        ]), "The retail chain must distinguish stores by physical constraints and their ability to absorb implementation disruption.")],
        ["Older stores require approved alternatives because their service areas cannot accommodate the equipment used during the pilot.", null],
        ["Other stores face exceptionally high customer demand during the period when employees would be learning unfamiliar procedures.", st("The same redesigned process can create different implementation risks at locations with different operating conditions.")],
        ["The programme director proposes a rapid schedule based mainly on how quickly installation teams can visit each store.", null],
        ["However, that schedule may place difficult deployments during periods when stores cannot tolerate additional checkout delays.", q("Should installation convenience outweigh the risk of slower checkout service during peak customer demand?")],
        ["The operations team suggests examining which stores can absorb adjustment while employees develop confidence in the redesigned process.", null],
        ["Standard-layout stores may offer useful opportunities to extend pilot learning without adding substantial physical implementation complexity.", dg("A possible deployment approach", D.flow(["Pilot|learning", "Ready standard|stores", "Prepared|variants", "Protected|peak operations"]), "A conditional sequence may prioritise ready standard stores while preparing variants and protecting locations exposed to peak demand.")],
        ["Older stores still require their approved operating variants, with suitable equipment, training and operational support.", null],
        ["Those arrangements should be prepared deliberately rather than allowing local managers to invent inconsistent procedures during deployment.", cmp("Two implementation concerns", "Registered variant", "Requires preparation for an approved operating difference.", "Peak demand", "Requires timing that protects service from unacceptable disruption.")],
        ["The retailer must also decide whether its proposed completion buffer provides meaningful protection against implementation difficulties.", null],
        ["A short buffer may appear adequate when every deployment succeeds, but serious problems can consume that time quickly.", iss("A schedule that succeeds only when every wave proceeds perfectly may offer inadequate operational contingency.", "The schedule risk")],
        ["Managers should ask what happens if a late deployment fails and the remaining time cannot support correction.", null],
        ["That question encourages the organisation to plan recovery rather than treating the proposed schedule as a guarantee.", dg("Testing schedule resilience", D.flow(["Planned|completion", "Possible|failure", "Required|correction", "Available|buffer", "Deadline|exposure"]), "Schedule resilience depends on whether available contingency can accommodate credible implementation problems.")],
        ["The chain should therefore defend its deployment sequence using operating conditions, readiness and the consequences of delay.", null],
        ["A reasonable recommendation may prioritise straightforward stores, but only when their operational preparation is genuinely complete.", st("Implementation order should reflect evidence of readiness rather than assumptions based solely on store categories.")],
        ["Managers must also preserve flexibility to delay a deployment when important readiness conditions have not been satisfied.", null],
        ["That flexibility does not eliminate deadline pressure, but it makes the resulting decision more transparent and accountable.", q("What evidence should persuade the retailer to postpone a scheduled deployment despite pressure to finish quickly?")],
        ["Qasr faces a comparable decision when sequencing twelve properties before the tourism authority's January requirement.", null],
        ["The lesson is that a defensible rollout sequence must protect operations while explaining how the deadline will be met.", st("A good rollout plan connects site differences, readiness evidence, operating risk and credible contingency.")]
      ]
    }
  ]
},
{
  title: "The go-live decision is not a formality",
  sec: "W12O3a",
  lines: [
    ["Qasr has proposed a rollout sequence, but the steering group still needs evidence before authorising each property to proceed.", t("The go-live decision is not a formality", "A scheduled deployment becomes an authorised go-live only when predefined readiness conditions are satisfied.")],
    ["The programme director can identify a planned date, yet that date does not establish that operations are ready.", null],
    ["A go-live decision must examine whether the redesigned process can operate dependably under the property's actual conditions.", st("A deployment date is a planning commitment, while a go-live decision is an evidence-based authorisation.")],
    ["Imagine a Qasr property approaching its scheduled deployment with functioning kiosks and completed technical testing.", null],
    ["The technical team reports readiness, but reception employees have not completed practical preparation for corporate arrival exceptions.", dg("Two dimensions of readiness", D.hier([
      ["Technical readiness", "Systems and required functionality are prepared"],
      ["Operational readiness", "Employees, procedures and support can sustain actual service"]
    ]), "Technical completion does not automatically establish readiness to operate the complete redesigned arrival process.")],
    ["The operations director asks whether supervisors understand their responsibilities and whether immediate assistance will be available during busy shifts.", null],
    ["These questions concern operational readiness rather than whether the technology passed its development tests.", q("Should Qasr authorise go-live when the system works but employees cannot confidently manage essential exceptions?")],
    ["The slides require objective go or no-go criteria established before the decision meeting, not invented during discussion.", null],
    ["Such criteria convert general confidence into conditions that managers can assess using observable evidence.", dg("A readiness gate", D.flow(["Define|criteria", "Collect|evidence", "Review|conditions", "Authorise|decision"]), "Predefined criteria allow the steering group to assess readiness before approving or postponing deployment.")],
    ["Technical readiness might concern verified functionality, while operational readiness concerns training, support capacity and workable procedures.", null],
    ["Each criterion should specify what satisfactory evidence looks like before managers face pressure to approve deployment.", st("Objective readiness criteria must be agreed before the go-live meeting and evaluated against actual evidence.")],
    ["Qasr must also identify who holds authority to approve deployment and when that decision will occur.", null],
    ["Without a named decision-maker, disagreements may continue until the planned cutover effectively becomes unavoidable.", dg("Accountable go-live governance", D.hier([
      ["Decision authority", "Named person or authorised forum"],
      ["Decision timing", "Defined before cutover"],
      ["Decision evidence", "Pre-agreed readiness criteria"],
      ["Decision record", "Approval, postponement or documented waiver"]
    ]), "Go-live governance requires explicit authority, timing, evidence and a recorded decision.")],
    ["The decision meeting should therefore assess whether the agreed conditions are satisfied rather than celebrate completed project activities.", null],
    ["A successful installation or completed training attendance record may contribute evidence without establishing overall readiness.", cmp("Two kinds of evidence", "Activity completed", "Training was delivered or equipment was installed.", "Readiness demonstrated", "Employees can perform required work and operational support is available.")],
    ["Suppose a property meets most criteria but still lacks a fully prepared escalation arrangement for difficult arrivals.", null],
    ["The steering group may face pressure to approve deployment because delaying one property threatens the remaining schedule.", q("Would approving the date make the unresolved escalation problem disappear?")],
    ["A criterion should not be quietly ignored simply because the project has already committed resources to deployment.", null],
    ["If authorised management accepts a waiver, the exception and its justification must be explicitly recorded.", st("A readiness waiver requires accountable authorisation and a documented reason; silence is not evidence of approval.")],
    ["The record should explain which condition remains unmet and why proceeding is considered acceptable despite that weakness.", null],
    ["That transparency allows later reviewers to distinguish an informed exception from an overlooked readiness failure.", dg("Recording a readiness exception", D.flow(["Unmet|criterion", "Assess|consequence", "Authorise|waiver", "Record|reason"]), "A waiver documents an authorised exception to predefined readiness criteria rather than concealing an unresolved condition.")],
    ["However, documentation alone does not make an unsafe decision acceptable or remove the consequences of operational failure.", null],
    ["Some conditions may justify postponement because the organisation cannot responsibly operate without the required capability.", iss("A recorded waiver cannot substitute for essential operational capability or make unacceptable exposure safe.", "The governance boundary")],
    ["This is why the steering group must consider contingency before granting approval, especially when recovery may be difficult.", null],
    ["Qasr should know what happens if the process fails, who can intervene and which conditions would require stopping.", dg("Readiness and contingency", D.flow(["Assess|readiness", "Confirm|support", "Review|contingency", "Decide|go or no-go"]), "A responsible go-live decision considers operational readiness together with support and recovery arrangements.")],
    ["The January deadline increases pressure, but it cannot replace evidence that each property can operate its approved arrangement.", null],
    ["Heritage variants and peak-occupancy constraints make that judgement particularly important when deployment conditions differ across sites.", st("The same governance discipline applies across properties, while readiness evidence must reflect each site's approved operating arrangement.")],
    ["Qasr's steering group must therefore distinguish a desirable schedule from a defensible authorisation to begin operating.", null],
    ["Our next lesson examines the contingency question that becomes unavoidable when an authorised implementation encounters serious difficulty.", t("The decision ahead", "Define the evidence for proceeding, record accountable decisions and prepare for the possibility of stopping.")]
  ],
  review: [
    {
      title: "A university examination service faces its launch decision",
      lines: [
        ["Imagine a university preparing to introduce a redesigned examination-registration service immediately before students begin submitting important requests.", t("The university go-live gate", "A functioning application is not sufficient evidence that the complete service is ready.")],
        ["The technology team reports that the application works correctly and that the required system tests have been completed.", null],
        ["However, administrative employees have not finished practising how to resolve unusual registration cases involving departmental approval.", dg("Different readiness evidence", D.hier([
          ["Technical readiness", "The application passes required tests"],
          ["Operational readiness", "Employees can manage actual registration responsibilities"],
          ["Support readiness", "Assistance and escalation are available"]
        ]), "The university must assess technology, employees and support before authorising operational introduction.")],
        ["The project manager argues that postponement would disrupt the published implementation schedule and create additional coordination work.", null],
        ["The registration manager asks whether employees can resolve exceptions while students continue waiting for decisions.", q("Which concern should determine approval when technical testing is complete but essential operating responsibilities remain unclear?")],
        ["The university needs predefined readiness criteria rather than an informal judgement based on how confident managers feel.", null],
        ["Those criteria should identify the evidence required to establish that the service can operate dependably.", st("Objective go-live criteria convert general readiness claims into conditions that can be evaluated before deployment.")],
        ["The institution should also identify who has authority to approve launch and when the decision must occur.", null],
        ["Without explicit authority, departments may assume that another manager is responsible for accepting unresolved implementation risks.", dg("The decision arrangement", D.flow(["Agree|criteria", "Collect|evidence", "Review|readiness", "Record|decision"]), "An accountable launch decision uses agreed criteria, evidence and a documented authorisation.")],
        ["Suppose the application is ready but the university has not established an escalation route for disputed registrations.", null],
        ["A completed training attendance record cannot demonstrate that employees know how to obtain the required operating decisions.", cmp("Evidence versus activity", "Completed activity", "Employees attended the scheduled training.", "Demonstrated readiness", "Employees can perform the required work and obtain authorised assistance.")],
        ["The project manager proposes proceeding while promising to resolve the missing escalation arrangement after launch.", null],
        ["If management considers waiving the requirement, the responsible authority must evaluate and document that decision explicitly.", st("A waiver is an authorised and recorded exception, not an informal decision to overlook missing readiness evidence.")],
        ["The decision record should identify the unmet condition and explain why management considers the remaining exposure acceptable.", null],
        ["However, a documented waiver does not create the operational capability that the university still lacks.", iss("Recording an exception cannot make an essential but unavailable operating capability function.", "The readiness boundary")],
        ["If students cannot receive dependable registration decisions, postponement may be more responsible than preserving the original schedule.", null],
        ["The university should also consider recovery arrangements if the redesigned service encounters serious problems after introduction.", dg("A defensible launch decision", D.flow(["Technical|evidence", "Operational|evidence", "Support|evidence", "Contingency|review", "Go or|no-go"]), "The university should consider complete readiness and contingency before approving launch.")],
        ["This example illustrates why go-live governance protects operations from decisions driven primarily by project deadlines.", null],
        ["Qasr faces the same challenge when deciding whether each property is genuinely prepared to introduce its arrival process.", q("What evidence would justify postponing the university launch even though its application has passed every technical test?")]
      ]
    },
    {
      title: "An airport must decide whether its baggage process is ready",
      lines: [
        ["Consider an airport preparing to introduce a redesigned baggage-handling procedure during a period of continuing passenger operations.", t("A launch decision under pressure", "Go-live authority must assess operational evidence rather than merely endorse the project schedule.")],
        ["The equipment has passed its tests, and the project team reports that installation activities are complete.", null],
        ["However, some operating employees remain uncertain about the procedure for handling bags requiring additional manual intervention.", dg("The airport readiness picture", D.hier([
          ["Equipment", "Required technical tests completed"],
          ["Employees", "Some exception responsibilities remain unclear"],
          ["Operations", "Passenger service must continue"]
        ]), "Technical completion does not establish that employees can manage every essential operating responsibility.")],
        ["The airport's management team faces pressure because delaying introduction would disrupt commitments made across several departments.", null],
        ["Yet a launch decision made without sufficient operational preparation could create serious problems during actual passenger service.", q("Should the airport approve launch simply because the equipment is installed and the deployment date has arrived?")],
        ["The responsible managers need objective readiness criteria agreed before the final launch meeting takes place.", null],
        ["These criteria should cover the capability required to operate the redesigned procedure and manage foreseeable exceptions.", st("Readiness criteria should describe the operating conditions required for approval rather than merely record completed project activities.")],
        ["The airport must identify a named authority responsible for deciding whether deployment proceeds or is postponed.", null],
        ["That authority should receive evidence about employee preparation, operational support and the arrangements for handling serious problems.", dg("Accountable launch governance", D.flow(["Defined|criteria", "Verified|evidence", "Named|authority", "Recorded|decision"]), "A defensible go-live decision depends on predefined criteria, reliable evidence and accountable authorisation.")],
        ["Suppose managers discover that employees understand routine baggage processing but lack an approved escalation procedure for unusual cases.", null],
        ["The problem cannot be resolved by pointing to completed equipment testing or the number of training sessions delivered.", cmp("Different readiness dimensions", "Technical completion", "Equipment operates as tested.", "Operational readiness", "Employees can manage normal work and obtain authorised help for exceptions.")],
        ["The project team may request permission to proceed despite the unresolved procedure because postponement would be inconvenient.", null],
        ["If a waiver is considered, the authorised decision-maker must record the exception and its justification.", st("A documented waiver makes an accepted exception visible, but it does not remove the underlying operational risk.")],
        ["Some missing capabilities may make approval indefensible regardless of how carefully the exception is documented.", null],
        ["The airport should therefore distinguish a manageable readiness weakness from a condition that threatens dependable operations.", iss("A formal approval cannot transform an unacceptable operating risk into a safe implementation decision.", "The approval boundary")],
        ["Managers must also consider how the organisation would respond if serious difficulties emerged after the procedure entered operation.", null],
        ["Recovery arrangements and stopping authority should be understood before employees are required to rely on the redesigned process.", dg("Readiness with contingency", D.flow(["Review|capability", "Confirm|support", "Assess|recovery", "Decide|launch"]), "Launch approval should account for operating readiness and the ability to respond when serious problems arise.")],
        ["The airport example shows why the go-live meeting should challenge assumptions rather than simply confirm the published deployment date.", null],
        ["Qasr must apply the same discipline when assessing properties with different operating conditions and implementation risks.", q("Which unresolved airport condition would justify a no-go decision despite pressure to maintain the launch schedule?")]
      ]
    }
  ]
},
      ] },
      { id: "l4", title: "The decision to go live — or stop", sections: [
{
  title: "Eleven hours to go backwards",
  sec: "W12O3b",
  lines: [
    ["Qasr has established readiness gates, but approval alone cannot guarantee that every deployment will operate as intended.", t("Eleven hours to go backwards", "A credible rollout needs measurable stopping conditions, accountable authority and rehearsed recovery.")],
    ["The steering group must now confront the operations director's question about failure during the proposed rollout's eighth week.", null],
    ["If that deployment encounters serious problems, only the planned three-week buffer remains before the January regulatory deadline.", dg("The late-rollout dilemma", D.flow(["Eight-week|rollout", "Late|failure", "Three-week|buffer", "January|deadline"]), "A serious failure near the end of the proposed rollout could threaten the remaining contingency before the regulatory deadline.")],
    ["The programme director points to Qasr's rollback rehearsal as evidence that the organisation can recover from implementation difficulties.", null],
    ["However, the rehearsal occurred only at Marina and required eleven hours to complete under the tested conditions.", dg("What Qasr actually rehearsed", D.hier([
      ["Location", "Marina"],
      ["Rehearsals reported", "One"],
      ["Observed duration", "11 hours"],
      ["Live corporate bookings", "Not included"]
    ]), "Qasr has one reported eleven-hour rollback rehearsal at Marina, without live corporate-booking data.")],
    ["Crucially, that rehearsal did not include live corporate bookings, leaving an important part of operational recovery untested.", null],
    ["Eleven hours is therefore an observed rehearsal duration, not a guaranteed recovery time for every property.", st("A successful rehearsal demonstrates recovery under tested conditions, not universal rollback capability.")],
    ["Imagine a deployment failing while corporate arrivals are being processed through the redesigned system and assisted exception path.", null],
    ["Returning to previous arrangements could require careful treatment of transactions already completed or recorded during the transition.", q("What happens to live booking records if Qasr attempts to reverse a deployment after processing has begun?")],
    ["Managers must examine whether the old operating arrangement can safely resume without losing or conflicting with essential information.", null],
    ["That concern becomes especially important when parallel running is unavailable because transactions cannot simply be processed independently twice.", dg("The recovery challenge", D.flow(["Live|transactions", "Identify|affected records", "Restore|operations", "Verify|consistency"]), "Rollback planning must consider operational continuity and the integrity of transactions affected during the transition.")],
    ["Rollback means restoring an earlier operating arrangement when continuing with the redesigned process creates unacceptable operational exposure.", null],
    ["It requires more than a document describing what technicians might do if the new system encounters problems.", st("Rollback is a rehearsed operational recovery capability, not merely a written intention to restore the previous process.")],
    ["The slides require numerical rollback triggers so managers can recognise when a predefined condition demands intervention.", null],
    ["Those triggers should describe measurable failures rather than relying on vague statements that performance feels unsatisfactory.", dg("Designing measurable triggers", D.hier([
      ["Performance", "Defined unacceptable deterioration"],
      ["Exceptions", "Defined failure or backlog condition"],
      ["Recovery", "Defined operational limit"],
      ["Authority", "Named person empowered to act"]
    ]), "Numerical triggers should be agreed before deployment; these categories are design prompts, not approved Qasr thresholds.")],
    ["For example, management might propose a maximum unresolved exception backlog, supported by evidence about operating capacity.", null],
    ["The case supplies no approved numerical threshold, so any suggested value must remain a proposed management criterion.", iss("A learner-designed trigger must never be presented as an established Qasr operating rule.", "The evidence boundary")],
    ["A stop trigger and a rollback trigger are related, but they do not necessarily require the same action.", null],
    ["Stopping further deployment prevents additional exposure, while rollback attempts to reverse an implementation already operating.", cmp("Two contingency decisions", "Stop rollout", "Suspend further deployment waves while the problem is assessed.", "Rollback", "Restore an earlier operating arrangement when predefined conditions require recovery.")],
    ["The steering group must identify who can stop deployment and who has authority to initiate rollback.", null],
    ["Employees should not have to negotiate decision rights while guests are waiting and operating conditions are deteriorating.", st("Stopping and rollback authority must be explicit before go-live, not improvised during a serious incident.")],
    ["Managers must also define the point beyond which rollback is no longer technically or operationally feasible.", null],
    ["After that point, recovery may require a different contingency rather than an assumption that previous arrangements remain available.", dg("The rollback decision boundary", D.flow(["Monitor|conditions", "Trigger|reached", "Check|rollback feasibility", "Authorised|response"]), "A rollback decision requires evidence that its trigger is met and that restoration remains feasible.")],
    ["Qasr should rehearse recovery under representative conditions, including the corporate-booking situations absent from Marina's earlier test.", null],
    ["Further rehearsal would provide stronger evidence, although no test could guarantee that every possible failure has been eliminated.", q("Would you approve wider deployment based solely on a rehearsal that excluded live corporate bookings?")],
    ["The steering group must balance recovery capability with the deadline, property readiness and consequences of continuing a failing rollout.", null],
    ["Its contingency plan should identify triggers, authority, recovery actions and the evidence required before deployment resumes.", dg("A credible contingency plan", D.flow(["Detect|failure", "Apply|stop criteria", "Authorise|response", "Recover|operations", "Verify|readiness"]), "A credible contingency plan links measurable conditions with accountable decisions, recovery and evidence-based resumption.")],
    ["The operations director's eighth-week question is therefore a test of resilience rather than simple pessimism about the schedule.", null],
    ["Our next discussion asks what must be established before the implementation project can safely transfer responsibility to operations.", t("The next challenge", "Recovery planning protects go-live; operational ownership protects the process after the project team leaves.")]
  ],
  review: [
    {
      title: "A hospital must recover its patient-registration service",
      lines: [
        ["Imagine a hospital introducing a redesigned patient-registration process while continuing to admit patients throughout the operating day.", t("Recovery in a hospital", "A rollback plan must work with real transactions, not only in a controlled demonstration.")],
        ["The hospital has tested its new application and prepared employees to use the redesigned registration procedures.", null],
        ["Managers also possess a written document describing how the previous registration arrangement could be restored if necessary.", dg("The planned recovery", D.flow(["New|registration", "Serious|failure", "Restore|old process", "Verify|records"]), "Recovery must restore dependable operations while protecting registration records affected during the transition.")],
        ["However, the only rehearsal used test records rather than patients whose registrations had already been processed.", null],
        ["That distinction matters because live records may have changed after the redesigned process began operating.", q("Would a successful rehearsal using test records prove that the hospital could safely restore live patient registrations?")],
        ["The rehearsal provides useful evidence, but it cannot establish recovery capability under conditions that were never tested.", null],
        ["Managers must examine how affected transactions would be handled if the hospital returned to its earlier procedures.", st("Rollback evidence is limited to the operating conditions and transaction types included in the rehearsal.")],
        ["The hospital also needs predefined conditions for stopping further deployment when serious operating problems emerge.", null],
        ["Those conditions should be measurable so managers can distinguish an acceptable adjustment period from unacceptable service deterioration.", dg("Measurable stopping conditions", D.hier([
          ["Service performance", "A defined unacceptable condition"],
          ["Unresolved cases", "A measurable backlog limit"],
          ["Decision authority", "A named accountable manager"]
        ]), "The hospital should define measurable stop criteria and decision authority before introducing the redesigned process.")],
        ["A numerical threshold would require evidence about hospital capacity and patient-service requirements rather than an arbitrary value.", null],
        ["Managers must also distinguish stopping additional deployments from reversing a process already operating at one facility.", cmp("Different responses", "Stop deployment", "Prevent additional facilities from adopting the process.", "Rollback", "Restore an earlier arrangement at a facility already using the redesign.")],
        ["A decision to stop further rollout may be appropriate even when the hospital continues operating its current deployment.", null],
        ["Rollback requires separate consideration of feasibility, affected records and the risks associated with restoring earlier arrangements.", st("Stopping rollout and initiating rollback are distinct decisions requiring appropriate evidence and authority.")],
        ["The hospital should identify the person authorised to make these decisions before operational problems create immediate pressure.", null],
        ["It should also establish when rollback would become impractical because too many transactions depend on the redesigned arrangement.", dg("The recovery decision", D.flow(["Observe|failure", "Assess|trigger", "Check|feasibility", "Authorise|action", "Verify|service"]), "Recovery decisions require measurable evidence, feasible actions and accountable approval.")],
        ["Additional rehearsal with representative transactions would strengthen confidence without guaranteeing recovery from every possible incident.", null],
        ["After corrective action, managers should verify readiness before allowing suspended implementation activity to resume.", iss("Recovery does not automatically establish that the redesigned process is ready for another deployment attempt.", "The resumption decision")],
        ["Qasr faces a comparable limitation because its Marina rollback rehearsal excluded live corporate bookings.", null],
        ["The important lesson is to design contingency around real operating exposure rather than assuming a written plan guarantees recovery.", q("What evidence would the hospital need before approving another deployment after a serious registration failure?")]
      ]
    },
    {
      title: "A retailer stops a failing checkout rollout",
      lines: [
        ["Consider a retail chain introducing a redesigned checkout process through several deployment waves before a busy trading period.", t("Stopping a retail rollout", "A decision to pause expansion is different from reversing an existing deployment.")],
        ["The early stores have adopted the redesigned process, and the programme manager is preparing the next scheduled wave.", null],
        ["However, one operating store begins experiencing repeated transaction failures that create growing customer queues and unresolved purchases.", dg("A developing operating problem", D.flow(["New|checkout", "Repeated|failures", "Growing|queues", "Management|decision"]), "A serious problem at an operating store can justify intervention before additional stores are exposed.")],
        ["The manager argues that the rollout should continue because installation teams and employee training have already been scheduled.", null],
        ["The operations director instead asks whether the observed failures have reached the programme's predefined stopping conditions.", q("Should the retailer expose more stores while an unresolved problem threatens checkout operations at an existing deployment?")],
        ["A credible stop criterion should describe a measurable condition rather than rely entirely on managerial impressions.", null],
        ["The retailer might define a maximum unresolved transaction backlog after examining service capacity and acceptable operating exposure.", st("Numerical stop criteria should be justified by operating evidence and agreed before deployment begins.")],
        ["The organisation must not invent a threshold during the incident simply to defend the action management already prefers.", null],
        ["It should identify the authority responsible for suspending further deployment when the agreed trigger is reached.", dg("Stopping further exposure", D.flow(["Monitor|performance", "Identify|trigger", "Authorise|pause", "Investigate|cause"]), "A predefined trigger and named authority allow the retailer to suspend further deployment while investigating serious problems.")],
        ["Pausing the next wave would prevent additional stores from encountering the same unresolved operating problem.", null],
        ["However, that decision would not automatically restore the earlier checkout process at stores already using the redesign.", cmp("Stop versus rollback", "Stop rollout", "Suspend deployment to additional stores.", "Rollback", "Return an operating store to its earlier checkout arrangement.")],
        ["Rollback would require the retailer to determine how completed transactions and records could be handled safely during restoration.", null],
        ["A previous rehearsal using simulated purchases might not demonstrate recovery when live customer transactions have already occurred.", st("Rollback must be rehearsed under representative operating conditions, including relevant live transaction risks.")],
        ["The retailer should also define the point beyond which returning to the previous arrangement would no longer be feasible.", null],
        ["At that point, another recovery response may be necessary even if management wishes to reverse the deployment.", dg("Checking recovery feasibility", D.flow(["Assess|records", "Check|rollback limit", "Select|response", "Restore|service"]), "The recovery decision must consider transaction integrity and whether rollback remains operationally feasible.")],
        ["A named manager should authorise the response rather than leaving individual stores to make inconsistent emergency decisions.", null],
        ["After the immediate problem is controlled, the organisation must investigate the cause before restarting suspended deployment waves.", iss("A paused rollout should resume only after evidence supports the readiness of the corrected operating arrangement.", "The restart condition")],
        ["The retailer's original schedule may become difficult to achieve, but preserving dates cannot justify uncontrolled operational exposure.", null],
        ["Managers must explain the trade-off between deadline pressure and the consequences of extending an unresolved failure.", q("What evidence would justify restarting the retail rollout after the affected store has recovered?")],
        ["Qasr faces the same distinction between stopping additional property deployments and restoring a previous operating arrangement.", null],
        ["The lesson is that contingency requires measurable triggers, rehearsed recovery and authority established before serious failure occurs.", st("Responsible implementation protects operations through explicit stopping rules, feasible rollback and evidence-based resumption.")]
      ]
    }
  ]
},
{
  title: "When can the project team leave?",
  sec: "W12O3c",
  lines: [
    ["Qasr has considered how to stop a failing rollout, but another important decision arises when implementation appears successful.", t("When can the project team leave?", "Implementation closure requires operational ownership, performance evidence and accountable transfer of unresolved work.")],
    ["The project team cannot remain responsible for everyday arrival operations indefinitely, even after a demanding implementation programme.", null],
    ["However, leaving immediately after the final deployment could expose Qasr to problems that nobody is prepared to manage.", q("Who will maintain the redesigned arrival process when the implementation specialists are no longer available?")],
    ["The slides establish five closure conditions that distinguish a functioning operational process from a project simply reaching completion.", null],
    ["These conditions concern ownership, measurement, exceptions, operating procedures and the transfer of outstanding defects.", dg("Five implementation closure conditions", D.hier([
      ["Process owner", "Appointed and operating"],
      ["Performance measure", "Produced and reviewed end to end"],
      ["Exceptions", "Within the designed range"],
      ["Operating procedures", "Owned by operations"],
      ["Outstanding defects", "Transferred with owners and dates"]
    ]), "Implementation closure requires all five operating conditions rather than completion of deployment activities alone.")],
    ["Consider process ownership, because someone must remain accountable for the redesigned arrival process after the project closes.", null],
    ["An appointed name on an organisation chart is insufficient unless that person is actually exercising the responsibility.", st("The process owner must be appointed and operating before implementation can be considered ready for closure.")],
    ["At Qasr, the owner must coordinate decisions affecting arrival performance across properties and relevant operational responsibilities.", null],
    ["Without active ownership, recurring problems may remain unresolved because no one has responsibility for the complete process.", dg("Ownership after implementation", D.flow(["Operational|evidence", "Process|owner", "Authorised|decisions", "Continuing|improvement"]), "An operating process owner uses performance evidence to coordinate decisions and continuing improvement.")],
    ["Ownership also requires visibility, which explains why the closure conditions demand an end-to-end performance measure.", null],
    ["That measure must actually be produced and reviewed rather than merely defined in an earlier project document.", st("A documented performance measure is not sufficient; the organisation must produce and review it during operations.")],
    ["For Qasr, end-to-end measurement should illuminate the guest arrival experience rather than kiosk functionality alone.", null],
    ["The process includes assisted exceptions, so monitoring only successful kiosk transactions would conceal part of operational performance.", cmp("Two measurement perspectives", "Technology measure", "Describes an aspect of kiosk operation.", "End-to-end process measure", "Provides evidence about the complete arrival process, including assisted handling.")],
    ["The closure conditions also require exception volumes to remain within the range anticipated by the approved process design.", null],
    ["Qasr must therefore understand whether corporate arrival exceptions represent controlled operation or an unresolved capacity problem.", q("Can the project close if exception volumes exceed what the redesigned operating arrangements were designed to handle?")],
    ["The slides do not provide a numerical exception threshold, so Qasr must assess performance against its authorised design.", null],
    ["A convenient adoption percentage cannot substitute for evidence that exception handling remains within the designed operating range.", dg("Exception control at closure", D.flow(["Measure|exceptions", "Compare|designed range", "Investigate|deviation", "Confirm|control"]), "Closure requires evidence that exception volumes remain within the range anticipated by the approved process.")],
    ["Another condition concerns operating procedures, which must become the responsibility of operations rather than remain project documents.", null],
    ["Reception teams need maintained procedures that reflect approved kiosk handling, assisted exceptions and escalation responsibilities.", st("Operational procedures must be owned and maintained by the people responsible for continuing service delivery.")],
    ["This transfer prevents the project team from becoming the permanent source of answers about everyday operating responsibilities.", null],
    ["It also connects implementation closure with the accountability arrangements established during the earlier People phase.", dg("Transferring operating responsibility", D.flow(["Project|procedures", "Operations|ownership", "Routine|maintenance", "Continuing|accountability"]), "Operating procedures move from project preparation into continuing operational ownership and maintenance.")],
    ["Finally, unresolved defects must not disappear when the implementation programme closes or its temporary team is released.", null],
    ["Every outstanding defect requires a named owner and a date for its agreed follow-up or resolution.", iss("Closing the project without transferring unresolved defects creates accountability gaps rather than completing implementation.", "The handover risk")],
    ["The responsible owner must understand the remaining issue and have a workable arrangement for tracking its resolution.", null],
    ["This allows project closure without pretending that every minor problem has already been eliminated from operations.", dg("Controlled defect transfer", D.flow(["Record|defect", "Assign|owner", "Agree|date", "Transfer|responsibility", "Track|resolution"]), "Outstanding defects must transfer into operations with named owners and dates rather than becoming unassigned project leftovers.")],
    ["Together, these conditions establish whether Qasr can operate and manage the redesigned process without continued project dependence.", null],
    ["Implementation closure is therefore different from proving that every expected business benefit has already been realised.", cmp("Two different milestones", "Implementation closure", "Operations can own, measure and manage the process.", "Realize Value", "The organisation establishes whether intended business benefits have been achieved.")],
    ["The next phase examines realised value, while Sustainable Performance addresses the continuing management and improvement of process performance.", null],
    ["Before reaching that point, Qasr must make one integrated decision about deployment, stopping conditions and operational responsibility.", t("The final Qasr decision", "A defensible implementation must survive go-live and remain manageable after the project team leaves.")]
  ],
  review: [
    {
      title: "A university service project ends before its problems do",
      lines: [
        ["Imagine a university introducing a redesigned student-service process and preparing to close the implementation project after successful deployment.", t("Who owns the university service?", "Project completion does not automatically establish dependable operational ownership.")],
        ["Students can now submit requests through the redesigned service, and the project team has completed its scheduled activities.", null],
        ["However, administrative employees continue encountering unusual cases that require clarification from someone responsible for the complete process.", dg("The handover problem", D.flow(["Project|completion", "Unresolved|questions", "Missing|ownership", "Service|risk"]), "A deployed service remains vulnerable when continuing operating responsibilities have not been transferred.")],
        ["The project manager argues that remaining difficulties should be handled by ordinary departments after the project closes.", null],
        ["That may be reasonable, but only if those departments have accepted clearly defined responsibilities and workable support arrangements.", q("Who should resolve recurring registration problems when the project team is no longer responsible for everyday operations?")],
        ["The university needs an operating process owner who can coordinate decisions affecting the complete student-service process.", null],
        ["Simply naming a senior employee is insufficient unless that person is actually performing the required ownership responsibilities.", st("Implementation closure requires an appointed and operating process owner, not merely a name in a project document.")],
        ["The owner also needs performance evidence showing how the service operates across its complete sequence of activities.", null],
        ["A report describing application availability cannot establish whether students receive dependable decisions from the end-to-end process.", dg("End-to-end measurement", D.flow(["Student|request", "Administrative|processing", "Exception|handling", "Completed|service"]), "Operational measurement should cover the complete student-service process rather than technology functionality alone.")],
        ["The university must produce and review an end-to-end performance measure before treating implementation as ready for closure.", null],
        ["It should also verify that exception volumes remain within the range anticipated by the approved operating design.", cmp("Two closure tests", "Performance", "An end-to-end measure is produced and reviewed.", "Exceptions", "Volumes remain within the designed operating range.")],
        ["Operating procedures must then become the responsibility of the administrative teams who will maintain the service.", null],
        ["Otherwise, employees may continue depending on project specialists whenever an unfamiliar registration problem appears.", st("Operations must own the procedures needed to maintain the redesigned service after project closure.")],
        ["The project team should also transfer outstanding defects rather than assuming unresolved issues will disappear after handover.", null],
        ["Each remaining defect needs a named owner and an agreed date so progress remains visible and accountable.", dg("Defect handover", D.flow(["Identify|defect", "Name|owner", "Agree|date", "Transfer|tracking"]), "Outstanding defects require explicit ownership and dates when responsibility moves into operations.")],
        ["This arrangement does not require every minor defect to vanish before the project can close.", null],
        ["It requires the organisation to demonstrate that remaining work can be managed without continued project dependence.", iss("Unassigned defects and unclear responsibilities make project closure premature even when the technology is operational.", "The closure boundary")],
        ["The university can then examine whether the redesigned service actually delivers the improvements expected from the investment.", null],
        ["That benefits evaluation follows implementation and should not be confused with the operational conditions required for closure.", q("Would you close the university project if nobody owned the remaining defects or reviewed end-to-end service performance?")],
        ["Qasr faces the same challenge when transferring its arrival process from implementation specialists to ongoing property operations.", null],
        ["The lesson is that successful handover establishes continuing accountability rather than simply celebrating the end of deployment.", st("A sustainable operational handover requires active ownership, reviewed measures, controlled exceptions, maintained procedures and assigned defects.")]
      ]
    },
    {
      title: "A warehouse process keeps working after the consultants leave",
      lines: [
        ["Consider a distribution warehouse introducing a redesigned picking process intended to improve coordination between inventory and dispatch operations.", t("The warehouse handover", "A process must remain manageable after the implementation team completes its assignment.")],
        ["The redesigned process is operating, and the external implementation specialists are preparing to leave the warehouse.", null],
        ["Managers are pleased that employees can complete picking activities using the new procedures and supporting technology.", dg("From implementation to operations", D.flow(["Developed|process", "Operational|introduction", "Project|handover", "Continuing|management"]), "Implementation closure transfers the redesigned process into dependable ongoing operational management.")],
        ["However, several recurring exceptions still require decisions about inventory discrepancies and unusual customer orders.", null],
        ["The warehouse manager realises that employees have been asking the implementation specialists to resolve those cases.", q("What happens when the specialists leave and employees encounter the same exceptions during the next operating shift?")],
        ["The warehouse needs an appointed process owner who actively coordinates decisions across inventory, picking and dispatch responsibilities.", null],
        ["That owner must be operating rather than merely appearing on a list of project stakeholders.", st("Active process ownership ensures continuing accountability for the complete operating process after implementation.")],
        ["The owner also needs a reliable measure of end-to-end performance, not only reports about individual technology functions.", null],
        ["A scanner may work correctly while orders still experience delays between picking and dispatch.", dg("Measuring the complete process", D.flow(["Order|released", "Items|picked", "Exceptions|resolved", "Order|dispatched"]), "End-to-end measurement reveals operating performance across activities rather than focusing only on individual equipment.")],
        ["Managers should produce and review the measure to understand whether the redesigned process operates as intended.", null],
        ["They must also establish whether exception volumes remain within the range anticipated by the approved process design.", cmp("Operational control", "Performance measure", "Produced and reviewed across the complete process.", "Exception volume", "Compared with the designed operating range.")],
        ["If inventory exceptions consistently exceed that range, the warehouse cannot simply declare the operating arrangement stable.", null],
        ["The responsible owner must investigate the deviation and determine whether additional corrective action is required.", st("Controlled exceptions are part of operational readiness, while unmanaged excess exceptions indicate unresolved operating risk.")],
        ["The warehouse must also transfer ownership of operating procedures from the implementation team to its permanent operational managers.", null],
        ["Those managers should maintain instructions as approved practices change and new operating lessons become available.", dg("Procedure ownership", D.flow(["Project|documentation", "Operations|acceptance", "Routine|maintenance", "Updated|procedures"]), "Operational managers must own and maintain the procedures used after the project team leaves.")],
        ["The project team may still have outstanding defects when its planned activities reach completion.", null],
        ["Each defect requires a named owner and date so responsibility remains clear after the specialists depart.", iss("An unresolved defect without an accountable owner can become an invisible operating problem after project closure.", "The defect risk")],
        ["This handover allows remaining work to continue without pretending that the redesigned process is completely free from defects.", null],
        ["It also prevents the warehouse from relying indefinitely on temporary project personnel for routine operational decisions.", dg("Completing the handover", D.flow(["Confirm|owner", "Review|performance", "Control|exceptions", "Transfer|procedures", "Assign|defects"]), "The five closure conditions establish whether operations can manage the process without continued project dependence.")],
        ["The warehouse can subsequently assess whether the redesigned process delivers its intended business benefits through sustained operation.", null],
        ["That later evaluation differs from the immediate question of whether implementation responsibility can safely transfer to operations.", q("Which missing handover condition would make you postpone the departure of the warehouse implementation team?")],
        ["Qasr must apply the same discipline before treating its fourteen-property arrival programme as operationally complete.", null],
        ["The lesson is that implementation ends responsibly when ongoing management can maintain the process and resolve remaining problems.", st("Project closure is justified by operational capability and accountability, not merely by the completion of deployment activities.")]
      ]
    }
  ]
},
{
  title: "Fourteen properties, one defensible decision",
  sec: "W12O3d",
  lines: [
    ["Qasr's steering group has reached the decision that brings together everything we have examined during the Implement phase.", t("Fourteen properties, one defensible decision", "Choose a rollout, protect operations, define stopping conditions and establish continuing accountability.")],
    ["The programme director wants the remaining properties deployed before January, while the operations director questions the contingency.", null],
    ["Both concerns matter because regulatory compliance and dependable guest service must be protected throughout the transition.", dg("The steering group's dilemma", D.hier([
      ["Regulatory requirement", "Digital guest records from 1 January"],
      ["Remaining deployment", "12 properties"],
      ["Proposed schedule", "8 weeks with a 3-week buffer"],
      ["Central concern", "What happens if the final wave fails?"]
    ]), "Qasr must meet its January requirement without assuming that the proposed rollout will proceed without disruption.")],
    ["Begin with the pilot evidence, because Marina and Corniche provide useful experience without proving readiness everywhere.", null],
    ["Kiosk adoption has plateaued at sixty-five percent, leaving thirty-five percent of arrivals handled through the reception desk.", dg("The unresolved pilot population", D.hier([
      ["Kiosk adoption", "65%"],
      ["Desk-handled arrivals", "35%"],
      ["Kiosk processing", "2 minutes"],
      ["Assisted processing", "9 minutes"]
    ]), "The residual population requires investigation before Qasr treats pilot performance as sufficient evidence for wider deployment.")],
    ["These remaining arrivals are predominantly corporate bookings rejected by the kiosk, rather than demonstrated employee resistance.", null],
    ["Guest satisfaction nevertheless improved from six point eight to seven point nine, showing that different measures tell different stories.", cmp("Two performance signals", "Guest satisfaction", "Improved from 6.8 to 7.9.", "Kiosk adoption", "Plateaued at 65%, with unresolved corporate-arrival exceptions.")],
    ["The steering group must decide whether assisted handling represents an acceptable controlled arrangement or an unresolved limitation.", null],
    ["That judgement requires evidence about exception volumes, operating capacity and the consequences of retaining the assisted path.", q("Would you expand the rollout without understanding why corporate arrivals remain outside normal kiosk processing?")],
    ["Now consider the twelve remaining properties, whose differences make a uniform deployment sequence difficult to defend.", null],
    ["Five standard-layout properties have no identified constraint, making them comparatively straightforward candidates when readiness is demonstrated.", dg("Exhibit 12: remaining properties", D.hier([
      ["Standard layout", "5 properties"],
      ["Heritage", "3 properties"],
      ["Peak occupancy", "4 properties"]
    ]), "The twelve remaining properties differ in physical constraints and exposure to implementation disruption.")],
    ["Three heritage properties require their registered assisted-path variants because their lobbies cannot accommodate kiosks.", null],
    ["Four peak-occupancy properties exceed ninety percent occupancy through January and cannot absorb a January performance dip.", iss("The peak-occupancy constraint makes careless deployment timing particularly dangerous.", "The operating exposure")],
    ["A conditional recommendation might prioritise ready standard-layout properties while preparing heritage variants and protecting peak-occupancy operations.", null],
    ["However, that sequence remains a proposal whose feasibility depends on readiness evidence and the remaining implementation window.", st("A defensible rollout sequence explains its assumptions and operating constraints rather than claiming universal correctness.")],
    ["The steering group must also challenge the proposed eight-week rollout and its three-week buffer before January.", null],
    ["A late failure could consume that contingency, especially when recovery capability has not been demonstrated across all conditions.", dg("Testing the schedule", D.flow(["Proposed|waves", "Readiness|gates", "Possible|failure", "Recovery|capacity", "January|deadline"]), "The schedule must be assessed against credible failures and recovery requirements rather than planned completion alone.")],
    ["Qasr's only reported rollback rehearsal took eleven hours at Marina and excluded live corporate bookings.", null],
    ["That evidence cannot establish a guaranteed recovery duration for the remaining properties or their actual transaction conditions.", st("One limited rehearsal does not prove that rollback will remain feasible across every deployment.")],
    ["Before each go-live decision, managers need objective readiness criteria covering technology, employees, support and contingency.", null],
    ["They also need numerical stopping triggers, named decision authority and evidence supporting any authorised readiness waiver.", dg("The go-live decision", D.flow(["Review|readiness", "Check|contingency", "Apply|criteria", "Authorise|decision"]), "Each deployment requires predefined criteria, accountable approval and credible contingency arrangements.")],
    ["Stopping additional deployment and restoring an earlier operating arrangement remain different actions requiring separate consideration.", null],
    ["The steering group should specify what evidence permits resumption after a serious problem has been corrected.", cmp("Two decisions after failure", "Stop rollout", "Prevent additional properties from being exposed.", "Rollback", "Restore an earlier operating arrangement when feasible and authorised.")],
    ["Employees also need practical training and immediate support during the performance dip that may accompany operational introduction.", null],
    ["Managers should monitor adoption, investigate workarounds and communicate corrections rather than interpret every difficulty as resistance.", dg("Supporting adoption", D.flow(["Prepare|employees", "Support|go-live", "Monitor|adoption", "Resolve|problems"]), "Implementation combines employee preparation, frontline assistance, adoption evidence and visible corrective action.")],
    ["Eventually, Qasr must transfer the process into operations with active ownership, reviewed measures and controlled exceptions.", null],
    ["Operating procedures must belong to operations, while outstanding defects require named owners and agreed dates.", st("Implementation closure requires operational ownership and accountability, not merely completion of deployment activities.")],
    ["We cannot declare Qasr's final decision because the case provides competing evidence rather than an approved steering-group resolution.", null],
    ["Your responsibility is to defend a conditional recommendation and explain what evidence would change your judgement.", q("Which rollout would you recommend, what would make you stop, and who would authorise that decision?")],
    ["The asynchronous forum, One Weekend or Nine Months, asks you to apply this reasoning to an unfamiliar organisation.", null],
    ["Post your substantive recommendation before reading classmates' responses, then challenge or extend at least two contributions using Chapter 20.", t("Apply your judgement", "Defend an implementation approach, a rollout sequence and explicit conditions for stopping.")],
    ["Assessment Three is the separate group research project, while these VoiceLearn questions remain formative preparation for your decisions.", null],
    ["Week 13 moves into Realize Value, asking whether the implemented process actually delivers the improvements that justified investment.", t("Next week · Realize Value", "Going live establishes operational use; realised value requires evidence that the intended benefits have been achieved.")]
  ],
  review: [
    {
      title: "A hospital network must defend its final rollout",
      lines: [
        ["Imagine a hospital network preparing to introduce a redesigned admissions process across facilities with different operating pressures.", t("A hospital implementation decision", "A defensible recommendation integrates sequencing, readiness, stopping conditions and operational ownership.")],
        ["The pilot has produced encouraging results, but managers have identified unresolved exceptions affecting particular patient-registration categories.", null],
        ["Several hospitals have standard facilities, while others require approved variants or face periods of unusually high demand.", dg("The hospital decision", D.hier([
          ["Pilot evidence", "Encouraging but incomplete"],
          ["Standard facilities", "Potentially simpler deployments"],
          ["Specialist facilities", "Approved operating variants"],
          ["High-demand facilities", "Greater disruption exposure"]
        ]), "The hospital network must evaluate different site conditions rather than assume the pilot represents every facility.")],
        ["A regulatory deadline encourages rapid implementation, although the operations director worries about disruption during the busiest period.", null],
        ["The project manager proposes a schedule that appears feasible if every deployment proceeds without significant difficulty.", q("Would you approve the schedule without examining what happens when a late deployment fails?")],
        ["The hospital should examine whether comparatively straightforward facilities are ready before selecting them for an early deployment wave.", null],
        ["Specialist facilities require preparation for their approved variants, while high-demand locations need protection from unacceptable disruption.", st("A rollout sequence should reflect operating constraints, readiness evidence and the consequences of failure.")],
        ["The network must also investigate unresolved pilot exceptions before reproducing the same limitations across additional facilities.", null],
        ["Positive overall results cannot establish that every patient category is adequately supported by the redesigned process.", dg("Using pilot evidence", D.flow(["Review|results", "Classify|exceptions", "Assess|sites", "Choose|sequence"]), "Pilot learning should inform readiness and sequencing rather than automatically justify expansion.")],
        ["Each hospital should pass an objective readiness gate covering employees, technology, procedures and practical operational support.", null],
        ["The decision authority must be named, and any accepted waiver requires explicit documentation and justification.", cmp("Readiness governance", "Go decision", "Evidence demonstrates that predefined conditions are satisfied.", "No-go decision", "An important readiness condition remains unmet or exposure is unacceptable.")],
        ["The network also needs measurable stopping conditions before introducing the redesigned process at additional facilities.", null],
        ["A serious failure may justify suspending further deployment without automatically reversing every completed implementation.", st("Stopping further rollout and initiating rollback are distinct contingency decisions requiring appropriate authority.")],
        ["Rollback must be feasible under actual operating conditions, including the treatment of transactions already processed.", null],
        ["A rehearsal using limited test records cannot guarantee safe recovery when live patient registrations are involved.", dg("Credible recovery", D.flow(["Detect|failure", "Apply|trigger", "Authorise|response", "Recover|service", "Verify|readiness"]), "Recovery requires measurable triggers, accountable decisions, representative testing and evidence before resumption.")],
        ["Employees also require practical training and frontline assistance while adapting to unfamiliar responsibilities during everyday patient service.", null],
        ["After deployment, an operating process owner must review end-to-end performance and manage exceptions within the designed range.", iss("Deployment completion does not establish that the hospital can manage the redesigned process after project closure.", "The handover risk")],
        ["Operating procedures must transfer to permanent management, and outstanding defects need named owners and follow-up dates.", null],
        ["The steering group can then defend its recommendation without pretending that every uncertainty has disappeared.", q("What evidence would make you postpone a hospital deployment despite pressure from the regulatory deadline?")],
        ["The hospital example reinforces Qasr's central lesson about balancing implementation progress with dependable operational protection.", null],
        ["A responsible decision explains the chosen sequence, stopping conditions, recovery capability and continuing ownership.", st("Implementation judgement is demonstrated through explicit trade-offs, evidence-based readiness and accountable contingency.")]
      ]
    },
    {
      title: "A retailer faces one final decision before peak trading",
      lines: [
        ["Consider a retail chain preparing to introduce a redesigned checkout process across stores before its busiest trading period.", t("The retailer's final rollout decision", "Implementation must balance deadline pressure, operating risk, employee adoption and credible recovery.")],
        ["The pilot has improved customer experience, but some transactions still require assisted handling outside the intended automated route.", null],
        ["The remaining stores differ in layout, staffing and their ability to tolerate temporary checkout delays.", dg("The retail rollout challenge", D.hier([
          ["Pilot", "Improved experience with residual exceptions"],
          ["Store variation", "Different layouts and staffing"],
          ["Peak demand", "Limited tolerance for disruption"],
          ["Deadline", "Implementation required before busy trading"]
        ]), "The retailer must assess pilot limitations and site-specific operating conditions before selecting its rollout.")],
        ["The programme director recommends completing every remaining store quickly to preserve the published implementation deadline.", null],
        ["The operations director asks whether the plan would remain workable if a deployment failed near the end.", q("Would a schedule still be defensible if its completion depended on every implementation wave succeeding immediately?")],
        ["A reasonable proposal might begin with ready standard-layout stores while preparing approved variants for locations with physical constraints.", null],
        ["Stores facing exceptional demand may require different timing because temporary performance deterioration could damage customer service.", st("Implementation sequencing should reflect readiness and disruption exposure rather than simply the convenience of installation.")],
        ["The retailer should also examine the residual pilot transactions and determine whether assisted processing is an acceptable operating arrangement.", null],
        ["Employees may understand the technology perfectly while encountering legitimate transactions that the redesigned application cannot complete.", dg("Investigating incomplete adoption", D.flow(["Measure|adoption", "Identify|exceptions", "Investigate|cause", "Authorise|response"]), "Residual transactions require diagnosis before management attributes incomplete adoption to employee resistance.")],
        ["The steering group must therefore avoid treating positive customer feedback as proof that every operating limitation has disappeared.", null],
        ["It should examine adoption, exception handling and operating capacity together when assessing readiness for wider deployment.", cmp("Different evidence", "Customer experience", "Shows how customers perceive the service.", "Operational adoption", "Shows which transactions use the redesigned process and which remain outside it.")],
        ["Before each store goes live, managers should verify technology, employee preparation, support arrangements and contingency.", null],
        ["A scheduled installation cannot substitute for an authorised decision based on predefined readiness conditions.", st("Go-live requires objective criteria, named decision authority and documented treatment of unmet conditions.")],
        ["The retailer should establish measurable triggers for stopping additional deployment when serious checkout problems emerge.", null],
        ["It must also rehearse rollback under representative transaction conditions rather than assume the previous arrangement remains available.", dg("Contingency before cutover", D.flow(["Define|triggers", "Rehearse|recovery", "Name|authority", "Approve|readiness"]), "Stopping rules and credible recovery arrangements must exist before deployment exposes stores to operational risk.")],
        ["If an operating store fails, suspending later waves may prevent the same problem from spreading across the chain.", null],
        ["Restoring the earlier checkout process requires a separate assessment of transaction records and recovery feasibility.", iss("Stopping rollout does not automatically mean that reversing an existing deployment is feasible or necessary.", "The contingency distinction")],
        ["Employees need immediate practical support during adjustment, while managers monitor whether performance and adoption improve.", null],
        ["When deployment is complete, operating managers must own procedures, review performance and accept outstanding defects with dates.", dg("From rollout to operations", D.flow(["Support|adoption", "Review|performance", "Transfer|ownership", "Track|defects"]), "Operational handover ensures that the redesigned checkout process remains manageable after the implementation team leaves.")],
        ["The retailer's steering group should therefore defend a conditional decision rather than promise that implementation will encounter no problems.", null],
        ["That recommendation should explain the preferred sequence, unacceptable risks, stopping authority and conditions for resuming deployment.", q("Which unresolved risk would make you recommend delaying a store despite the approaching peak trading period?")],
        ["Qasr faces the same responsibility when deciding how to protect fourteen properties under its January deadline.", null],
        ["The lesson is that successful implementation requires defensible choices before, during and after go-live.", st("A credible implementation decision integrates rollout sequencing, operational readiness, contingency, employee support and continuing accountability.")]
      ]
    }
  ]
},
      ] },
    ]
  };
  // Claude review fixes (original line indices): sentence replacements, then removals in descending order.
  const FIX = [["W12O1c",-1,6,"A hard deadline pushes toward big bang, or toward a phased plan that finishes before it, yet speed cannot rescue a process that fails in real operation."],["W12O1c",-1,9,"When a transaction cannot be consumed twice, parallel running is off the table, so the choice tilts toward a pilot and heavier investment in rollback."],["W12O1c",-1,12,"In such circumstances a pilot with a visible early success makes sense, because people trust what they see working more than what they are promised."],["W12O1c",-1,16,"High variation between sites pushes toward a phased rollout, because each wave gives the team time to meet one site\u0027s particular conditions."],["W12O1c",-1,20,"When that reconciliation is expensive, the factor pushes toward big bang, because one clean cutover avoids paying to run two ways of working."],["W12O2a",-1,2,"When employees begin using unfamiliar procedures, their performance will decline before the redesigned process delivers its intended improvements."],["W12O2a",-1,3,"This temporary deterioration is called the implementation performance dip, and because it happens in every implementation, managers should plan for it rather than be surprised."],["W12O2b",-1,21,"Small problems should be fixed quickly and visibly, because those early wins buy the credibility management will need when larger problems arrive."],["W12O2c",-1,12,"A rising rate shows the new path taking hold, but a plateau below one hundred percent is a message about the design, not about the people."],["W12O1e",-1,12,"Exhibit 12 is explicit that these four cannot absorb a performance dip in January, because every slower arrival lands on an almost full house."],["W12O3c",-1,9,"Without an active owner, Sustainable Performance in phase ten has no mechanism, because nobody is accountable for the complete process."],["W12O3c",-1,15,"This matters because when exceptions run above the designed range, the exception path quietly stops being an exception and becomes the real process."],["W12O3c",1,18,"A clean handover also prevents the warehouse from relying indefinitely on temporary project personnel for routine operational decisions."],["W12O3d",-1,30,"Post your own recommendation before reading classmates\u0027 posts, then reply substantively to at least two, disagreeing with at least one and citing Chapter 20."]];
  const CUT = [["W12O3c",1,17],["W12O3c",1,1],["W12O3d",1,17],["W12O3d",1,11]];
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
