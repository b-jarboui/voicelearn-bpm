// OPER621 Business Process Management · Week 11 · The Develop Phase.
// Source: Week 11 Session 1 slides and Week 11 Delivery Plan.
// Running case: Qasr Hospitality Group, corporate-rate approval, three build routes.
//
// COURSE LEARNING OUTCOMES
// S1: Design a framework for BPM and explain and assess related phases
//     in the context of a regional company.
// S2: Integrate new technologies to manage organizational changes.
//
// WEEKLY LEARNING OUTCOMES
// O1 [S1]: Explain the purpose and the boundaries of the Develop phase.
// O2 [S1, S2]: Evaluate what should and should not be automated, particularly exception handling.
// O3 [S2]: Integrate new technology into process delivery without encoding existing dysfunction.
//
// WEEK 11 LESSON PLAN
// Lesson l1: The design meets the tool                  W11O1a, W11O1b, W11O1c   [O1; S1]
// Lesson l2: The configure, extend or change decision   W11O3a, W11O3b, W11O3c   [O3; S2]
// Lesson l3: Building the process people will use       W11O2a, W11O2b, W11O2c   [O2; S1, S2]
// Lesson l4: The decision that survives go-live         W11O3d, W11O3e, W11O3f   [O3; S2]
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
    id: "oper621-w11",
    code: "OPER621",
    title: "The Develop Phase",
    subtitle: "Business Process Management · Week 11",
    author: "Prof. Bassem Jarboui",
    teacher: { name: "Prof. Bassem Jarboui", email: "", sendReport: false },
    lessons: [
      { id: "l1", title: "The design meets the tool", sections: [
{
  title: "From a process design to an operating capability",
  sec: "W11O1a",
  lines: [
    ["Welcome to Week 11, where Qasr Hospitality Group faces the challenge of turning a promising design into operational reality.", t("OPER621 · Week 11", "The Develop Phase: building what was designed.")],
    ["We've followed Qasr through its investigation of guest arrival and the development of a better process.", null],
    ["Now imagine the programme sponsor asking whether that redesigned process could actually serve guests across Qasr's properties.", q("What must exist before a redesigned process can become everyday operational practice?")],
    ["A process diagram may explain the intended work beautifully, but employees cannot operate a diagram by itself.", null],
    ["They need working systems, clear rules and practical procedures that connect the design with real decisions.", dg("Turning design into capability", D.flow(["Approved|design", "Systems|and rules", "Working|procedures", "Tested|capability"]), "Develop converts the approved process design into systems, rules and procedures that can support actual operations.")],
    ["This is the purpose of Develop, which occupies phase seven of our ten-phase Business Process Management framework.", null],
    ["The earlier Innovate phase established how the improved process should operate, while People addressed the responsibilities involved.", dg("Phase seven: Develop", D.route([6]), "Develop follows Innovate and People, preparing the operational capability required before Implement begins.")],
    ["Develop now connects those decisions with the practical arrangements needed to make the designed process usable.", st("Develop builds the operational capability required to perform the redesigned process, rather than redesigning it again.")],
    ["Let's return to Qasr's corporate-rate approval problem, where the redesigned process aims to remove a recurring wait.", null],
    ["The design calls for corporate rates to be resolved overnight against the relevant agreement before guests arrive.", dg("Qasr's intended corporate-rate process", D.flow(["Corporate|agreement", "Overnight|resolution", "Confirmed|rate", "Guest|arrival"]), "The approved design resolves corporate rates before arrival so guests do not encounter the original approval wait.")],
    ["But achieving that outcome requires more than displaying the intended sequence on a process diagram.", null],
    ["Someone must establish how the agreement is evaluated, which system supports it and what happens when evaluation fails.", iss("A designed approval rule cannot remove waiting unless the organisation develops a reliable way to operate it.", "Design without delivery")],
    ["Those arrangements include interfaces, meaning connections through which systems exchange the information required for process activities.", null],
    ["They also include business rules, which specify how particular decisions should be made under defined conditions.", st("Systems exchange information, while business rules determine how that information should influence operational decisions.")],
    ["Yet not every activity can be automated, because some situations still require human judgement or intervention.", null],
    ["Develop must therefore produce manual procedures explaining how employees perform work that software does not complete.", dg("The complete operating process", D.flow(["System|activity", "Business|rule", "Manual|handling", "Completed|outcome"]), "A developed process combines automated activities with documented human work whenever the operating situation requires it.")],
    ["Consider an arrival whose corporate agreement cannot be evaluated through the normal route because required information is unavailable.", null],
    ["That case needs an exception path, meaning an agreed method for handling situations outside normal processing.", iss("An exception without a developed handling path can leave employees unable to complete the redesigned process.", "An unfinished operating design")],
    ["The responsible employee needs sufficient authority, clear instructions and a practical route for resolving the problem.", null],
    ["Otherwise, people may return to familiar workarounds, undermining the improvements that the programme intended to deliver.", q("Would Qasr's process really be ready if ordinary arrivals worked but difficult cases remained unresolved?")],
    ["Develop must also establish test evidence, meaning recorded results showing whether the solution performs under realistic conditions.", null],
    ["A polished demonstration cannot establish reliability when unusual cases or heavy workloads have never been properly tested.", dg("Testing beyond the demonstration", D.flow(["Historical|cases", "Difficult|exceptions", "Peak|volume", "Recorded|defects"]), "Credible development testing examines realistic cases, demanding operating conditions and defects rather than only successful demonstrations.")],
    ["Employees performing the work should test the procedures and handovers, because software screens reveal only part of operations.", null],
    ["Their findings help expose weaknesses before those weaknesses affect guests during the subsequent implementation phase.", st("Develop tests the complete operating arrangement, including manual work and handovers, before the organisation implements it.")],
    ["Notice why calling Develop simply the IT phase would misunderstand what the organisation actually needs.", null],
    ["Much of its output consists of procedures, rules and training material rather than newly written software.", cmp("Two different views of Develop", "Technology-only view", "Concentrates on whether the software functions.", "Operational capability view", "Checks whether systems, rules, people and procedures work together.")],
    ["Project management, people change management and leadership remain important throughout this work because development requires coordinated decisions.", null],
    ["Finally, remember that Develop prepares the capability, while Implement puts that capability into operation across the organisation.", dg("From development to operation", D.flow(["Innovate|design", "People|responsibilities", "Develop|capability", "Implement|operation"]), "Develop prepares and tests what Innovate designed and People organised before Implement introduces it into operations.")],
    ["Qasr's challenge is therefore not merely making technology work, but ensuring the complete redesigned process can work.", null],
    ["Our next question is how Qasr should choose the technology route that makes this possible without sacrificing its design.", q("What would convince you that Qasr has developed a usable process rather than merely purchased functioning software?")]
  ],
  review: [
    {
      title: "The restaurant that redesigned its ordering service",
      lines: [
        ["Let's explore Develop through a restaurant that wants to improve how customers order meals during busy evenings.", t("Another way to understand Develop", "A restaurant shows why designing a better service is different from making it operational.")],
        ["Imagine the restaurant manager discovering that orders regularly reach the kitchen with missing instructions or unclear customer requests.", null],
        ["The team redesigns the ordering process so employees capture complete information before sending each order for preparation.", dg("The proposed ordering process", D.flow(["Customer|orders", "Check|details", "Send to|kitchen", "Prepare|meal"]), "The redesigned process checks order information before kitchen preparation begins, reducing the opportunity for unclear instructions.")],
        ["Everyone agrees that the design looks sensible, but the manager must now make it work during actual service.", null],
        ["That practical challenge resembles Develop, where an approved process design becomes an operational capability rather than another proposal.", st("Develop establishes the arrangements needed to perform an approved process design under real operating conditions.")],
        ["Suppose the restaurant purchases an ordering application that sends customer selections directly to a kitchen display.", null],
        ["The application works perfectly during a demonstration, but it cannot interpret every unusual customer request.", iss("The ordering application handles standard selections but leaves unusual requests without a reliable operating procedure.", "A capability gap")],
        ["A customer might request an ingredient substitution that requires checking availability with the kitchen before confirming the order.", null],
        ["The restaurant therefore needs a business rule explaining when substitutions are permitted and who can authorise them.", st("A business rule establishes how a decision should be made when particular operating conditions arise.")],
        ["Employees also need a manual procedure explaining what to do when the application cannot resolve the request.", null],
        ["Without that procedure, different employees may improvise different responses, creating inconsistent service and unnecessary confusion.", dg("Handling an unusual request", D.flow(["Customer|request", "Check|rule", "!Manual|clarification", "Confirm|order"]), "The operating process needs a documented exception route when an unusual request cannot be resolved automatically.")],
        ["Now imagine the manager testing only ordinary orders before announcing that the new service is ready.", null],
        ["The demonstration would establish that the standard route functions, but it would not prove the complete process works.", q("What might happen during a busy evening if several unusual orders arrive and nobody knows who should resolve them?")],
        ["Employees should therefore test realistic orders, unusual requests and the handovers between customer service and kitchen staff.", null],
        ["They should record defects, meaning problems that prevent the process from performing as required under those conditions.", dg("Testing the operating service", D.flow(["Routine|orders", "Unusual|requests", "Busy|service", "Record|defects"]), "Operational testing examines ordinary and difficult situations before the redesigned ordering process is introduced.")],
        ["The manager must also prepare instructions and training so employees understand both the application and their remaining responsibilities.", null],
        ["These materials matter because the restaurant cannot deliver consistent service through software alone, however well that software performs.", st("A developed operating capability includes systems, rules, manual procedures, testing and the information employees need.")],
        ["Only after those arrangements are ready can the restaurant introduce the redesigned process into everyday operations.", null],
        ["That later introduction corresponds to Implement, while Develop prepares and tests the capability that employees will use.", q("Would you call the restaurant ready if its application worked but employees still lacked procedures for unusual orders?")],
        ["The important lesson is that successful development prepares the entire service, not merely its most visible technology.", null]
      ]
    },
    {
      title: "The university certificate service that was not ready",
      lines: [
        ["Now consider a university planning to improve how graduating students request and receive their official certificates.", t("Another way to understand operational readiness", "A university certificate service reveals the difference between working software and a usable process.")],
        ["The existing service requires several administrative exchanges, so the university designs a more coordinated request process.", null],
        ["Its proposed design allows students to submit requests electronically and receive certificates after the required checks are completed.", dg("The designed certificate service", D.flow(["Student|requests", "Verify|eligibility", "Approve|release", "Issue|certificate"]), "The proposed service connects electronic requests with the verification and approval activities needed before certificates can be issued.")],
        ["The design describes the intended journey, but it does not establish that every required operational arrangement already exists.", null],
        ["The university must now develop the systems, rules and procedures that make the designed journey possible.", st("An approved process design becomes operational only when its required capabilities have been developed and tested.")],
        ["Suppose the electronic request form works correctly and students can submit their information without technical difficulty.", null],
        ["However, the certificate cannot be released until the university confirms that the student's academic requirements are satisfied.", iss("A functioning request form does not complete the service when eligibility verification remains unresolved.", "A missing operational dependency")],
        ["The university needs an interface connecting the request process with the information used to verify academic eligibility.", null],
        ["An interface allows systems to exchange information, reducing dependence on employees repeatedly transferring the same details.", dg("Connecting the required information", D.flow(["Student|request", "Eligibility|information", "Verification|decision", "Certificate|release"]), "The developed service must connect the request with the information and decisions required for certificate release.")],
        ["But imagine an older student record that cannot be verified through the normal electronic process.", null],
        ["That situation requires an exception path, meaning a documented way to resolve a case outside normal processing.", q("Who should handle an unresolved academic record, and what authority would that person need before releasing a certificate?")],
        ["The university must identify the responsible employee and explain how the necessary verification should be completed.", null],
        ["Otherwise, students may experience delays while departments exchange messages without knowing who owns the unresolved request.", st("An exception path needs clear responsibility and decision authority so unusual cases can progress safely.")],
        ["Now imagine testing the new service with only students whose records are complete and immediately available.", null],
        ["Those successful tests would provide encouraging evidence, but they would not demonstrate readiness for more difficult cases.", dg("Testing the certificate process", D.flow(["Complete|records", "Unresolved|records", "Manual|handover", "Verify|results"]), "Testing must cover routine requests, difficult records and the manual work required when electronic verification cannot finish.")],
        ["Administrative employees should therefore test realistic records, investigate failures and check how unresolved requests pass between departments.", null],
        ["Their findings should be recorded as defects when the developed process fails to meet its intended requirements.", iss("A process that succeeds only with uncomplicated records may fail when students most need administrative assistance.", "Testing the comfortable cases")],
        ["The university must also document manual procedures and prepare employees to support the new service after introduction.", null],
        ["That preparation belongs to Develop because operational readiness depends on coordinated human and technical capabilities.", st("Develop prepares the complete operating process, while Implement introduces that prepared capability into everyday university operations.")],
        ["The distinction matters because installing an application does not automatically mean that students receive a dependable service.", null],
        ["A successful development phase leaves the university with tested arrangements that employees can actually operate.", q("What evidence would persuade you that the university has developed the complete certificate service rather than only its electronic form?")],
        ["Remember that the real deliverable is a usable process, supported by technology but never reduced to technology alone.", null]
      ]
    }
  ]
},
{
  title: "Four ways to deliver the same capability",
  sec: "W11O1b",
  lines: [
    ["Qasr Hospitality Group now understands what Develop must produce, but another difficult decision is waiting for its team.", t("Four ways to deliver the same capability", "The development route shapes process fit, delivery effort and future flexibility.")],
    ["The redesigned corporate-rate process needs technology that can support decisions before guests arrive at the hotel.", null],
    ["Yet choosing technology is not simply about finding software that appears capable during an impressive demonstration.", q("Should Qasr adapt its process to the available technology, or adapt the technology to preserve its process design?")],
    ["The Develop phase offers several routes, and each creates a different balance between convenience, control and future responsibility.", null],
    ["Understanding those routes helps Qasr avoid treating every technology requirement as though it demands the same solution.", dg("Development routes", D.flow(["Buy|standard", "Configure|settings", "Extend|capability", "Build|custom"]), "Different capabilities can require different development routes, depending on process fit and long-term consequences.")],
    ["Buying standard means adopting an existing product largely as supplied, without changing its underlying functionality.", null],
    ["This can reduce development effort when the organisation's requirements already match what the product reliably provides.", st("Buying standard is attractive when an existing capability satisfies the process requirement without substantial adaptation.")],
    ["Imagine Qasr needing a routine administrative function that does not distinguish its guest experience from competitors.", null],
    ["Developing unique software for that function could create unnecessary maintenance responsibilities without delivering a meaningful strategic advantage.", iss("Custom development can create avoidable complexity when standard functionality already satisfies an ordinary business requirement.", "Unnecessary differentiation")],
    ["Configuration offers another possibility, allowing the organisation to adjust supported settings without changing the product's underlying code.", null],
    ["Qasr might configure approval routing or responsibility assignments where the product already provides suitable options.", dg("Configuration", D.flow(["Standard|product", "Supported|settings", "Configured|workflow"]), "Configuration adapts supported product settings while retaining the standard software's underlying functionality.")],
    ["Because configuration remains within supported functionality, future upgrades are generally easier than with unsupported custom changes.", null],
    ["However, configuring an approval route does not necessarily give the system the ability to evaluate an agreement automatically.", q("If software can route an approval but cannot make the required decision, has configuration preserved Qasr's redesigned process?")],
    ["Extension takes a different approach by adding functionality that the standard product does not already provide.", null],
    ["For Qasr, an additional rules component could potentially evaluate corporate agreements rather than merely request human approval.", dg("Extension", D.flow(["Standard|product", "Additional|rules", "Required|capability"]), "An extension adds functionality beyond the standard product when the approved process requires capabilities that configuration cannot provide.")],
    ["That stronger process fit may justify additional development, but extensions can also increase maintenance and upgrade difficulties.", null],
    ["The team must therefore investigate vendor support before assuming that a technically successful extension will remain sustainable.", iss("An extension that works today may create substantial future obligations if the vendor does not support its upgrade path.", "Long-term dependency")],
    ["Building custom functionality gives the organisation greater control over capabilities that standard products cannot adequately support.", null],
    ["Yet ownership brings responsibility for development, testing, maintenance and adaptation as technology and business requirements change.", st("Custom building offers control, but the organisation also accepts responsibility for sustaining what it creates.")],
    ["This is why the four routes should not be treated as competing answers for an entire transformation programme.", null],
    ["Different capabilities deserve different decisions because their strategic importance and technical requirements are not identical.", cmp("Choosing a development route", "Necessary but ordinary capability", "Prefer a suitable standard solution when it meets the requirement.", "Strategically differentiating capability", "Consider additional control when the capability genuinely supports competitive distinction.")],
    ["Remember our earlier distinction between core, supporting and management processes, which helps explain where differentiation matters.", null],
    ["A core process may deserve closer protection when its distinctive design contributes directly to customer value.", dg("Process importance and development choice", D.flow(["Classify|capability", "Assess|process fit", "Consider|future cost", "Choose|route"]), "The development decision should reflect the capability's strategic role, required process fit and long-term obligations.")],
    ["Supporting processes may benefit from established solutions, while management processes still require appropriate control and reliable information.", null],
    ["Stable regulatory requirements can also favour supported standard capabilities when those capabilities satisfy the required obligations.", st("The best development route depends on the specific capability, not a blanket preference for standard or custom software.")],
    ["Before committing, Qasr should examine delivery speed, upgrade support, maintenance exposure and the cost of later changes.", null],
    ["A reversible configuration may preserve flexibility, while unsupported customisation can make future improvements harder and more expensive.", q("Which route protects the intended process without creating responsibilities that Qasr cannot sustain?")],
    ["The essential lesson is that technology should serve a deliberate process decision rather than silently replace it.", null],
    ["Next, we will examine what happens when seemingly small software concessions begin changing the process Qasr originally approved.", t("The decision to carry forward", "Choose the development route for each capability while protecting the intended process outcome.")]
  ],
  review: [
    {
      title: "The hotel room that needs a different kind of lock",
      lines: [
        ["Let's revisit the development routes through a hotel choosing how guests will access their rooms.", t("Choosing the right development route", "A room-access system shows how standard functionality, configuration, extension and custom building differ.")],
        ["Imagine a hotel replacing its existing room-access arrangements with a system that better supports everyday guest arrivals.", null],
        ["The management team finds a standard product that already issues access credentials and records their permitted validity.", dg("The standard capability", D.flow(["Guest|assigned", "Access|issued", "Room|opened"]), "A standard access system may already provide the ordinary capability needed for room entry.")],
        ["If those functions meet the hotel's requirements, buying standard avoids developing capabilities that already work reliably.", null],
        ["The hotel gains little from creating unique software merely to reproduce an ordinary access function.", st("Buying standard makes sense when the supplied product already performs the required work satisfactorily.")],
        ["Now imagine the hotel wants different access permissions for guests, housekeeping employees and maintenance personnel.", null],
        ["If the product already supports those permissions through settings, the hotel can configure them without rewriting software.", dg("Configuring access permissions", D.flow(["Standard|access system", "Supported|permissions", "Configured|roles"]), "Configuration uses supported product settings to adapt an existing capability to operational requirements.")],
        ["This distinction matters because supported settings are generally easier to maintain through ordinary product upgrades.", null],
        ["However, suppose the hotel requires a particular access decision that the standard system cannot perform.", iss("A required decision may fall outside the product's supported configuration options.", "A genuine capability gap")],
        ["The hotel could consider an extension that adds the missing decision capability while retaining the existing product.", null],
        ["That extension might preserve the desired process, but the hotel must investigate maintenance and future upgrade consequences.", q("Would adding a missing capability still be attractive if every major software upgrade required additional development work?")],
        ["Alternatively, the hotel could build a custom access solution when the requirement genuinely justifies greater control.", null],
        ["Custom building creates more freedom, but the hotel becomes responsible for sustaining the resulting functionality over time.", st("Greater technical control brings greater responsibility for testing, maintenance and future changes.")],
        ["The important point is that no development route deserves automatic preference merely because it sounds more sophisticated.", null],
        ["A routine capability may work best with standard functionality, while a distinctive requirement may justify additional development.", cmp("Different needs, different choices", "Ordinary room access", "Use standard capability when it meets the operating requirement.", "Distinctive access requirement", "Assess whether configuration, extension or custom building is justified.")],
        ["The hotel should therefore examine each capability separately instead of demanding a single development approach for everything.", null],
        ["That reasoning transfers directly to Qasr, where corporate-rate evaluation must be considered against the approved process design.", dg("The decision principle", D.flow(["Required|outcome", "Available|capability", "Future|obligations", "Defensible|choice"]), "A sound development decision balances the required outcome with existing functionality and long-term responsibilities.")],
        ["The best choice is the route that delivers the needed capability without creating unnecessary future complexity.", null],
        ["Remember that the objective is dependable process performance, not the greatest possible amount of custom software.", q("What would you ask before deciding that a hotel genuinely needs to build its own access functionality?")]
      ]
    },
    {
      title: "The university admissions system that almost dictated the process",
      lines: [
        ["Consider a university preparing a redesigned admissions process intended to make application decisions more consistent and timely.", t("Protecting the process from the tool", "An admissions system illustrates why technology fit must be judged against the approved process design.")],
        ["The university selects an application platform that can receive documents, route cases and record decisions.", null],
        ["At the demonstration, everything appears straightforward because the platform handles ordinary applications without difficulty.", dg("The standard admissions workflow", D.flow(["Receive|application", "Route|case", "Record|decision"]), "The standard platform provides useful functions for receiving applications, routing work and recording decisions.")],
        ["Yet the redesigned process also requires a particular eligibility decision based on information already available to the university.", null],
        ["The standard platform can send that decision to an employee, but it cannot evaluate the requirement automatically.", iss("The platform supports the movement of work but does not perform the decision required by the redesigned process.", "Partial process fit")],
        ["The project team now faces a choice resembling Qasr's corporate-rate problem, although the operating context is different.", null],
        ["It could accept the standard workflow, but doing so might preserve manual work the redesign intended to reduce.", q("Would the university achieve its intended improvement if the new system simply routed the same decisions between employees?")],
        ["The team should examine configuration before assuming that additional software development is necessary.", null],
        ["Configuration changes supported settings, such as available routing options, without altering the product's underlying functionality.", dg("Checking configuration", D.flow(["Required|decision", "Supported|settings", "Assess|fit"]), "The team checks whether supported settings can deliver the required decision before considering additional development.")],
        ["If the missing decision cannot be configured, an extension might provide the required evaluation capability.", null],
        ["However, the university must consider whether the vendor will support that extension through future upgrades.", st("An extension can improve process fit while introducing obligations that continue beyond the initial development project.")],
        ["The team could also build custom functionality, although that choice creates greater responsibility for maintenance and change.", null],
        ["Such responsibility may be justified for strategically important capabilities, but not simply because custom development is possible.", cmp("Two competing considerations", "Immediate process fit", "Does the technology perform the decision required by the approved design?", "Long-term sustainability", "Can the university maintain and change the capability responsibly?")],
        ["Alternatively, the university might revise its process to fit the standard platform rather than extend the technology.", null],
        ["That choice should be explicit because changing the process may sacrifice improvements the organisation previously approved.", iss("A convenient software compromise can become an unintended process redesign when its consequences are not examined.", "Design drift")],
        ["The project team should therefore explain the proposed compromise and obtain appropriate approval before changing the intended process.", null],
        ["It should also consider whether the chosen route remains manageable as operational requirements and technology evolve.", dg("A defensible development choice", D.flow(["Approved|design", "Assess|technology fit", "Examine|future costs", "Approve|decision"]), "The development route should preserve the approved outcome or make any proposed process compromise explicit.")],
        ["This example shows why buying standard, configuring, extending and building are management decisions rather than merely technical preferences.", null],
        ["Each route changes the balance between delivery convenience, process performance and responsibility for future development.", st("Choose the development route according to the required capability and its long-term consequences, not the software demonstration alone.")],
        ["When we return to Qasr, the same reasoning will help us judge whether the technology genuinely supports its redesigned process.", q("How would you defend a development choice that costs less today but preserves a problem the redesign was meant to remove?")]
      ]
    }
  ]
},
{
  title: "When the software starts changing the design",
  sec: "W11O1c",
  lines: [
    ["Qasr Hospitality Group has reached a delicate moment, because its selected technology cannot fully support the approved process design.", t("When the software starts changing the design", "A technical limitation becomes a management decision when it changes the intended process outcome.")],
    ["The team understands its development options, but choosing among them involves more than comparing technical capabilities.", null],
    ["Imagine the vendor explaining that the standard workflow cannot automatically evaluate Qasr's corporate-rate agreements.", iss("Vendor C can route an approval request, but its standard workflow cannot automatically evaluate the corporate agreement.", "A genuine capability gap")],
    ["Someone suggests keeping human approval because changing the software would require additional development effort and future support.", null],
    ["That suggestion sounds practical, yet it could preserve the very delay the redesigned process intended to remove.", q("When does adapting to a software limitation become an unintended redesign of the business process?")],
    ["This is where we must distinguish a technical constraint from a management choice about responding to that constraint.", null],
    ["The product's missing capability is a constraint, but accepting its consequences is a decision requiring justification.", cmp("Constraint or decision?", "Technical constraint", "The standard product cannot automatically evaluate the agreement.", "Management decision", "Qasr must decide whether to configure, extend or change its process.")],
    ["A vendor may accurately describe what its software cannot do without determining what Qasr should accept.", null],
    ["The approved design remains our reference because it expresses the improvement the organisation originally intended to achieve.", st("Technology limitations describe available capabilities; they do not automatically authorise changes to the approved process.")],
    ["Remember that Qasr redesigned corporate-rate approval to resolve agreements overnight and avoid the recurring arrival wait.", null],
    ["If development restores unnecessary approval work, the organisation risks rebuilding the problem inside a newer system.", dg("Protecting the approved improvement", D.flow(["Approved|design", "Technology|constraint", "Assess|consequences", "Authorised|decision"]), "A technology constraint should trigger an explicit assessment rather than an automatic change to the approved process.")],
    ["Such changes sometimes appear individually harmless because each concession seems small compared with the overall development programme.", null],
    ["However, several concessions can accumulate until the delivered process differs substantially from what the organisation approved.", iss("Small technical concessions can accumulate into design drift, where the delivered process no longer matches the approved improvement.", "Design drift")],
    ["We call this design drift, meaning gradual movement away from the intended process without a deliberate redesign decision.", null],
    ["Preventing drift requires the team to record each proposed deviation and explain its operational consequences clearly.", st("A design deviation should identify what changes, why it changes and which intended benefits may be affected.")],
    ["At Qasr, the record should explain whether corporate arrivals still avoid the original approval delay.", null],
    ["It should also identify any additional staffing, manual work or future technology obligations created by the compromise.", dg("Recording a proposed deviation", D.flow(["Original|requirement", "Proposed|change", "Operational|impact", "Named|approval"]), "The decision record connects the proposed change with its consequences and the authority responsible for accepting them.")],
    ["The decision must reach a named authority because developers should not independently surrender an approved business improvement.", null],
    ["That authority should understand the original design and accept responsibility for the consequences of changing it.", q("Who should authorise a compromise that saves development effort but weakens the guest experience Qasr intended to improve?")],
    ["The team must also look beyond implementation cost, because a convenient adjustment can become expensive to maintain.", null],
    ["A four-year view helps reveal recurring operating costs, upgrade exposure and the difficulty of future changes.", cmp("Looking beyond initial delivery", "Immediate convenience", "A compromise may reduce development effort or shorten delivery.", "Four-year consequences", "The organisation may inherit recurring work, maintenance costs or upgrade limitations.")],
    ["Extensions deserve particular attention because additional functionality can preserve process fit while creating technical dependencies.", null],
    ["Reviewing extensions annually helps Qasr reconsider whether their benefits still justify their maintenance and upgrade obligations.", st("Extension governance continues after development because the cost and value of custom functionality can change over time.")],
    ["Notice that governance does not mean rejecting every compromise or insisting that technology must reproduce every design detail.", null],
    ["It means making trade-offs visible so responsible managers can choose knowingly rather than inherit accidental decisions.", dg("A governed development decision", D.flow(["Identify|gap", "Evaluate|trade-offs", "Record|deviation", "Obtain|approval", "Review|impact"]), "Governance makes technology-driven process changes explicit, authorised and subject to continuing review.")],
    ["Qasr can accept a justified compromise, but it must understand what happens to the improvement it promised.", null],
    ["That discipline protects the redesigned process from becoming an expensive reproduction of the organisation's earlier dysfunction.", q("Would you approve a cheaper solution if its operating consequences recreated the delay the redesign was meant to eliminate?")],
    ["Our next lesson brings this tension into focus through Vendor C's concrete development alternatives and their consequences.", t("The principle to remember", "A software limitation is evidence for a decision, not permission to abandon the approved design.")]
  ],
  review: [
    {
      title: "The clinic appointment system that preserved the queue",
      lines: [
        ["Let's examine design drift through a clinic that wants to reduce unnecessary waiting before patients receive their appointments.", t("Recognising design drift", "A clinic shows how adapting to software can quietly undermine an approved process improvement.")],
        ["The clinic redesigns its appointment process so routine requests can be confirmed without repeated administrative approval.", null],
        ["Its managers expect the new arrangement to reduce delays while keeping unusual requests under appropriate human supervision.", dg("The intended appointment process", D.flow(["Patient|request", "Check|eligibility", "Confirm|routine case", "Handle|exception"]), "The approved design separates routine confirmations from situations that genuinely require additional judgement.")],
        ["During development, the team discovers that its selected application can route requests but cannot evaluate every eligibility condition.", null],
        ["The vendor recommends sending all requests to an administrator because that arrangement fits the existing software.", iss("The proposed workaround preserves manual approval for routine requests that the redesign intended to simplify.", "A familiar problem returns")],
        ["Attractive as this suggestion sounds, it changes the process rather than merely adjusting the technology.", null],
        ["The software limitation is real, but the decision to preserve unnecessary approvals belongs to clinic management.", cmp("Two different questions", "What can the software do?", "It can route requests to an administrator.", "What should the clinic accept?", "Management must assess whether that route preserves the intended improvement.")],
        ["Suppose the team accepts the workaround without recording how it affects patient waiting or administrative workload.", null],
        ["The clinic could eventually operate a modern application while retaining the same underlying approval problem.", st("Design drift occurs when practical concessions gradually move the delivered process away from its approved purpose.")],
        ["The team should therefore document the proposed deviation and explain which parts of the intended improvement would change.", null],
        ["A named decision-maker should evaluate that evidence because accepting reduced performance is a business responsibility.", dg("Making the compromise visible", D.flow(["Approved|process", "Proposed|workaround", "Assess|impact", "Authorise|change"]), "A documented deviation allows management to judge the operational consequences before changing the approved design.")],
        ["The clinic should also examine whether configuration or additional functionality could preserve the intended routine confirmation process.", null],
        ["Those alternatives may involve development effort, but their consequences should be compared with recurring administrative work.", q("Would a lower development cost remain attractive if the clinic continued paying employees to approve routine requests?")],
        ["Looking beyond immediate delivery helps managers understand whether a convenient workaround creates a continuing operational burden.", null],
        ["The team should also review any extensions because future upgrades may change their maintenance requirements.", st("The right decision considers process performance, long-term obligations and the authority needed to approve compromises.")],
        ["The clinic may ultimately accept a compromise, provided the choice is deliberate and its consequences are understood.", null],
        ["That is the same discipline Qasr needs when Vendor C cannot automatically evaluate corporate agreements.", dg("Protecting the intended outcome", D.flow(["Understand|constraint", "Compare|responses", "Approve|trade-off", "Protect|outcome"]), "A technical limitation should lead to an informed management choice rather than an unexamined process change.")],
        ["The lesson is not that every original design must remain untouched regardless of cost or feasibility.", null],
        ["It is that changes should be justified against the improvement the organisation intended to deliver.", q("What evidence would you request before allowing the clinic to restore routine manual approval?")]
      ]
    },
    {
      title: "The warehouse system that changed the work",
      lines: [
        ["Consider a distribution warehouse redesigning how employees locate and prepare customer orders for dispatch.", t("Governing technology-driven changes", "A warehouse illustrates why small software concessions need explicit business approval.")],
        ["The approved process uses product-location information to guide employees directly toward the items required for each order.", null],
        ["Managers expect this arrangement to reduce unnecessary searching and make order preparation more consistent.", dg("The intended warehouse process", D.flow(["Receive|order", "Identify|location", "Collect|items", "Prepare|dispatch"]), "The approved design uses location information to guide order preparation and reduce unnecessary searching.")],
        ["During development, the selected system cannot provide the location information in the form required by the design.", null],
        ["A developer suggests printing order details and asking employees to locate products through their existing knowledge.", iss("The proposed workaround changes how employees perform the work and may preserve the searching problem.", "A technology-driven concession")],
        ["The developer is responding to a genuine limitation, but the workaround also changes the approved operating method.", null],
        ["That distinction matters because a technical team should not independently decide which business improvements can be sacrificed.", st("A software constraint explains the difficulty; management must authorise any resulting change to the approved process.")],
        ["The warehouse manager should ask whether supported configuration could provide the required information without changing the underlying software.", null],
        ["If configuration cannot help, an extension might provide the missing capability while introducing additional maintenance responsibilities.", dg("Examining the available responses", D.flow(["System|limitation", "Check|configuration", "Assess|extension", "Evaluate|process change"]), "The team should compare feasible responses before accepting a workaround that changes the approved operating method.")],
        ["Changing the process may still be defensible, but its consequences must be described rather than hidden inside development decisions.", null],
        ["The team should record how the workaround affects employee searching, process consistency and the intended operational improvement.", q("How could management judge the compromise fairly if nobody recorded which part of the redesigned process would be lost?")],
        ["A named authority should then evaluate the proposed deviation against the original process objectives and available alternatives.", null],
        ["This creates accountability because the person accepting the compromise also understands its likely operational consequences.", dg("A controlled deviation", D.flow(["Describe|change", "Explain|impact", "Compare|alternatives", "Obtain|approval"]), "Documenting and approving deviations prevents technical workarounds from becoming accidental business decisions.")],
        ["The manager should also consider future costs because a workaround may require repeated manual effort after implementation.", null],
        ["An extension might reduce that effort, but unsupported functionality could make future software upgrades more difficult.", cmp("Different long-term burdens", "Manual workaround", "The organisation may retain recurring employee effort and inconsistent handling.", "Software extension", "The organisation may gain better process fit while accepting maintenance and upgrade obligations.")],
        ["A four-year perspective encourages the warehouse to examine those continuing consequences rather than compare development effort alone.", null],
        ["If an extension is chosen, periodic review helps determine whether it remains valuable and sustainable.", st("Good governance connects immediate development choices with future operating costs, technical dependencies and process performance.")],
        ["Notice how several small concessions could gradually restore the warehouse's original searching and coordination problems.", null],
        ["That gradual departure from the approved design is precisely the danger we call design drift.", iss("Repeated minor concessions can collectively recreate the dysfunction that the redesign was intended to remove.", "Accumulating design drift")],
        ["The warehouse should therefore preserve the intended improvement unless responsible managers explicitly approve a justified alternative.", null],
        ["Qasr faces the same question when deciding whether Vendor C's limitations should change corporate-rate approval.", q("Would you accept the warehouse workaround without comparing its continuing operating burden with the cost of preserving the design?")]
      ]
    }
  ]
},
      ] },
      { id: "l2", title: "The configure, extend or change decision", sections: [
{
  title: "Vendor C fits — but not quite",
  sec: "W11O3a",
  lines: [
    ["Qasr Hospitality Group has selected Vendor C, but the development team now faces a problem the selection decision did not resolve.", t("Vendor C fits — but not quite", "A selected product can be attractive without fully supporting the approved process design.")],
    ["The vendor offers a moderate feature set, relatively inexpensive changes after go-live and opportunities to train internal staff.", null],
    ["Those advantages matter because Qasr needs a solution it can maintain as its operating requirements evolve.", st("Vendor C offers manageable future changes and internal capability development, but process fit still needs examination.")],
    ["However, selecting a promising product does not establish that its standard functionality can deliver every intended process improvement.", null],
    ["Qasr discovers this distinction when the team examines how corporate-rate agreements will be evaluated before guests arrive.", dg("The intended corporate-rate process", D.flow(["Corporate|agreement", "Overnight|evaluation", "Confirmed|rate", "Guest|arrival"]), "The approved design resolves corporate rates overnight against the relevant agreement before guests arrive.")],
    ["Remember the recurring forty-seven-minute wait that Qasr's redesigned process was intended to eliminate.", null],
    ["That delay matters because guests should not have to wait while employees complete an approval that could happen earlier.", iss("The redesigned process aims to remove a recurring 47-minute corporate-rate approval wait at arrival.", "The problem Qasr intended to solve")],
    ["The approved design therefore moves corporate-rate resolution overnight, using the relevant agreement to determine the appropriate rate.", null],
    ["For this improvement to work, the operating capability must evaluate the agreement rather than simply forward an approval request.", q("What happens if Qasr moves the approval request earlier but still depends on someone making every decision?")],
    ["Vendor C's standard workflow can request approval and keep the case open while that approval remains outstanding.", null],
    ["Unfortunately, it cannot automatically evaluate the corporate agreement, which is the capability the redesigned process requires.", cmp("The critical capability gap", "Vendor C's standard workflow", "Requests approval and keeps the case open.", "Qasr's approved design", "Evaluates the corporate agreement so the rate can be resolved overnight.")],
    ["This is partial process fit, meaning the product supports some required activities but cannot perform the complete intended process.", null],
    ["The distinction is important because moving information between employees is not equivalent to making a decision automatically.", st("Approval routing moves a decision request; automatic rule evaluation determines the result using defined business conditions.")],
    ["Imagine Qasr configuring Vendor C to send every corporate-rate request to the revenue office during the night.", null],
    ["The approval might be completed before arrival, but only if employees clear the overnight queue in time.", dg("A configured approval route", D.flow(["Corporate|booking", "Request|approval", "Revenue|office", "Confirmed|rate"]), "Configuration can move approval work overnight, but employees must still complete the decisions before guests arrive.")],
    ["That arrangement could remove the arrival wait without delivering the automatic agreement evaluation specified in the original design.", null],
    ["The difference matters because the process would remain dependent on staffing, workload and timely manual intervention.", iss("Moving manual approval overnight may hide the original waiting problem without removing its underlying dependence on human approval.", "Relocating the bottleneck")],
    ["Alternatively, an added rules component could evaluate corporate agreements and preserve the intended automatic decision capability.", null],
    ["Such an extension would improve process fit, although Qasr would need to examine its development and upgrade consequences.", dg("Adding the missing capability", D.flow(["Corporate|booking", "Agreement|rules", "Automatic|evaluation", "Resolved|rate"]), "A rules extension could evaluate the agreement directly rather than relying on routine human approval.")],
    ["The team could also consider changing the process to use standard functionality differently, accepting a different operating outcome.", null],
    ["That possibility deserves evaluation, but it cannot be treated as equivalent to delivering the approved design.", st("Changing the process may reduce development effort, but the resulting operating capability must be assessed against the original improvement.")],
    ["Notice that none of these alternatives becomes correct merely because Vendor C has already been selected.", null],
    ["The development decision must still consider process fit, operational consequences and the responsibilities created by each route.", q("Should Qasr accept a familiar approval workflow simply because the selected software can deliver it conveniently?")],
    ["The team should return to the approved design and identify exactly which capability the standard product cannot provide.", null],
    ["That comparison protects Qasr from confusing successful software operation with successful delivery of its intended process improvement.", dg("Evaluating partial process fit", D.flow(["Approved|requirement", "Standard|capability", "Identify|gap", "Compare|responses"]), "The team must identify the missing capability before choosing how to respond to Vendor C's limitation.")],
    ["Our next discussion examines Qasr's concrete alternatives, including their costs, delivery periods and continuing operational consequences.", null],
    ["For now, remember that a product can work exactly as advertised while still failing to deliver the process an organisation designed.", t("The central lesson", "Technology fit must be judged against the required process outcome, not merely the software's available functions.")]
  ],
  review: [
    {
      title: "The hospital discharge system that could route but not decide",
      lines: [
        ["Let's revisit partial process fit through a hospital trying to make patient discharge more predictable and coordinated.", t("Understanding partial process fit", "A hospital illustrates the difference between routing a decision and evaluating its requirements.")],
        ["Imagine the hospital redesigning discharge preparation so routine eligibility checks can be completed before patients are ready to leave.", null],
        ["The intended improvement depends on evaluating available information early rather than waiting for repeated administrative exchanges.", dg("The intended discharge process", D.flow(["Patient|information", "Check|requirements", "Confirm|readiness", "Prepare|discharge"]), "The redesigned process evaluates discharge requirements before the patient reaches the final administrative stage.")],
        ["The hospital selects a workflow application that can send approval requests to the appropriate department.", null],
        ["During its demonstration, the application routes requests correctly and displays their current approval status.", st("A workflow application may route and track decisions without possessing the capability to evaluate those decisions.")],
        ["However, the application cannot determine whether the hospital's defined administrative discharge conditions have been satisfied.", null],
        ["Someone must still examine the information and approve each case before the process can continue.", iss("The system successfully moves approval requests but cannot perform the eligibility decision required by the redesigned process.", "A missing decision capability")],
        ["This is partial process fit because the technology supports part of the workflow without delivering its complete intended outcome.", null],
        ["The hospital could configure approval routing so requests reach employees earlier in the discharge process.", dg("Moving the approval work earlier", D.flow(["Prepare|request", "Route|approval", "Employee|decision", "Complete|discharge"]), "Earlier routing may reduce waiting, but the process remains dependent on timely manual approval.")],
        ["That arrangement might improve performance, but it would still depend on employees completing the approval work promptly.", null],
        ["The hospital should therefore distinguish moving a decision earlier from removing unnecessary manual decision activity.", q("Would an earlier approval request achieve the redesign's purpose if employees still faced an unresolved queue?")],
        ["An extension might instead evaluate the defined administrative conditions automatically using information already available to the organisation.", null],
        ["That approach could improve process fit, although the hospital would need to examine maintenance and upgrade obligations.", dg("Adding evaluation capability", D.flow(["Patient|information", "Defined|rules", "Automatic|evaluation", "Confirmed|status"]), "Additional rules functionality can support automatic evaluation when the standard workflow only routes requests.")],
        ["The hospital could also revise its process to accommodate the standard application rather than extend the software.", null],
        ["Such a change should be explicit because it may sacrifice an improvement that the organisation previously approved.", st("A process change is a management decision, not an automatic consequence of missing software functionality.")],
        ["The team must compare these responses against the intended outcome rather than assume the selected application determines the answer.", null],
        ["A functioning workflow is valuable, but its value depends on whether it supports the redesigned service.", cmp("What should be evaluated?", "Software functionality", "Can the application route requests and record approvals?", "Process performance", "Can the developed arrangement deliver the intended discharge improvement?")],
        ["This is precisely the distinction Qasr faces when Vendor C can route corporate-rate approvals but cannot evaluate agreements.", null],
        ["The lesson is to examine the missing decision capability before choosing configuration, extension or process change.", q("What would you ask the hospital team before accepting manual approval as the permanent operating arrangement?")]
      ]
    },
    {
      title: "The university scholarship system that only moved the paperwork",
      lines: [
        ["Now consider a university redesigning how it evaluates applications for a scholarship programme.", t("When automation only moves the paperwork", "A scholarship process shows why electronic routing is not the same as automated decision evaluation.")],
        ["The university wants eligible applications to progress through clearly defined checks without unnecessary administrative waiting.", null],
        ["Its redesigned process uses documented scholarship criteria to determine whether an application satisfies the relevant requirements.", dg("The intended scholarship process", D.flow(["Student|application", "Scholarship|criteria", "Evaluate|eligibility", "Record|outcome"]), "The redesigned process applies defined eligibility criteria rather than relying on repeated manual routing for routine checks.")],
        ["The university purchases a standard workflow system that receives applications and sends them to administrative employees.", null],
        ["The system also records whether each application is awaiting review, approved or returned for clarification.", st("Receiving applications and tracking their status are useful capabilities, but they do not automatically evaluate eligibility.")],
        ["During development, the team discovers that the system cannot apply the university's scholarship criteria to submitted information.", null],
        ["The application therefore routes every case to an employee who must perform the eligibility evaluation manually.", iss("The technology digitises the movement of applications but leaves the underlying eligibility decision unchanged.", "Electronic routing without evaluation")],
        ["This matters because a digital process can reproduce an old administrative dependency while appearing more modern.", null],
        ["The university must distinguish between automating the movement of work and automating a defined decision.", cmp("Two kinds of automation", "Workflow routing", "Moves applications to the people responsible for making decisions.", "Rule evaluation", "Uses defined criteria to determine whether the relevant requirements are satisfied.")],
        ["The team could configure the workflow to route applications earlier or assign them to particular administrative employees.", null],
        ["That might improve coordination, but it would not provide the missing automatic evaluation capability.", q("Would faster electronic routing fully deliver the redesign if every routine application still required manual eligibility checking?")],
        ["An extension could potentially apply the documented scholarship rules and identify cases requiring additional human judgement.", null],
        ["However, the university would need to evaluate whether the added capability justified its development and maintenance responsibilities.", dg("Extending the scholarship workflow", D.flow(["Submitted|application", "Apply|defined rules", "Evaluate|routine case", "Refer|exception"]), "Additional rules functionality can distinguish routine eligibility decisions from cases requiring human intervention.")],
        ["The university could instead revise its process to accept the standard workflow's limitations.", null],
        ["That choice might be defensible, but managers should understand which intended improvements would remain incomplete.", st("The organisation should explicitly assess any process compromise rather than assume standard software defines the correct operating method.")],
        ["The development team should therefore return to the approved design and examine the exact capability gap.", null],
        ["It should compare the available responses against process performance, operational effort and future technical obligations.", dg("Making the development decision", D.flow(["Approved|outcome", "Identify|missing function", "Compare|responses", "Choose|route"]), "The development route should be selected after examining how the technology supports the intended process outcome.")],
        ["The scholarship example demonstrates why a successful software demonstration is not sufficient evidence of complete process fit.", null],
        ["The same reasoning applies when Qasr discovers that Vendor C can request approval but cannot evaluate corporate agreements.", q("What evidence would convince you that the university has improved scholarship decisions rather than merely digitised their movement?")]
      ]
    }
  ]
},
{
  title: "Three options, three different futures",
  sec: "W11O3b",
  lines: [
    ["Qasr Hospitality Group now faces a decision that could shape how its corporate-rate process operates for years.", t("Three options, three different futures", "The cheapest development route may not produce the strongest operating process.")],
    ["Vendor C can route approvals, but its standard workflow cannot automatically evaluate the corporate agreements Qasr intended to resolve overnight.", null],
    ["The development team has prepared three alternatives, and each offers a different balance between cost, speed and process fit.", dg("Qasr's development alternatives", D.flow(["Configure|standard workflow", "Extend|agreement rules", "Change|process design"]), "Qasr must compare three feasible responses to Vendor C's missing agreement-evaluation capability.")],
    ["Let's examine what Qasr would actually receive, rather than treating the alternatives as competing software quotations.", null],
    ["Configuration would cost AED 180,000 and take six weeks, using supported settings without adding custom code.", st("Configure: AED 180,000, six weeks, no custom code and supported upgrades.")],
    ["The revenue office would clear the corporate-rate approval queue overnight, before guests reach the hotel.", null],
    ["This could remove the recurring forty-seven-minute arrival wait, provided every relevant approval is completed before 06:00.", dg("Configuration: moving approval overnight", D.flow(["Corporate|booking", "Overnight|approval queue", "Revenue|office", "Guest|arrival"]), "Configuration can remove the arrival wait when the revenue office clears the approval queue before 06:00.")],
    ["However, the arrangement requires two additional overnight shifts each week and retains human approval for every corporate arrival.", null],
    ["Qasr would therefore move the work earlier without eliminating its dependence on routine manual decisions.", iss("Configuration preserves human approval and adds two overnight shifts each week, even when guests no longer wait.", "The continuing operating burden")],
    ["Now consider extension, which would add a rules component capable of evaluating corporate agreements automatically.", null],
    ["This option costs AED 540,000 and requires four months, making it substantially more expensive and slower to deliver.", st("Extend: AED 540,000, four months and automatic agreement evaluation.")],
    ["Unlike configuration, extension matches the approved phase five design and removes the forty-seven-minute approval wait.", null],
    ["It also avoids the additional ongoing operational shifts required by the configured alternative.", dg("Extension: evaluating the agreement", D.flow(["Corporate|booking", "Agreement|rules", "Automatic|evaluation", "Resolved|rate"]), "The extension preserves automatic agreement evaluation and removes the original approval wait.")],
    ["That stronger process fit comes with a serious qualification, because Vendor C has confirmed an important support limitation.", null],
    ["The vendor states in writing that this extension falls outside its supported upgrade paths.", iss("Vendor C confirms that the proposed rules extension is outside supported upgrade paths.", "Future upgrade exposure")],
    ["The extension could therefore preserve today's design while making future software changes more difficult to manage.", null],
    ["Qasr must consider that exposure rather than assuming the higher initial cost purchases a permanently trouble-free solution.", q("Would you accept an unsupported extension if it delivered the exact process improvement Qasr originally approved?")],
    ["The remaining alternative changes the process itself, using standard functionality to retrieve corporate rates when bookings are made.", null],
    ["This costs AED 95,000 and takes three weeks, making it the least expensive and fastest option.", st("Change the design: AED 95,000, three weeks and supported upgrades.")],
    ["However, it resolves only seventy-one percent of corporate arrivals through the revised standard process.", null],
    ["The remaining twenty-nine percent involve bookings arriving within twenty-four hours and retain the old approval path.", dg("Design change: uneven process coverage", D.flow(["Corporate|bookings", "71%|resolved", "29%|old approval"]), "The standard process resolves 71% of arrivals, while 29% remain on the previous approval path.")],
    ["That difference matters because a faster implementation does not guarantee that every guest receives the intended improvement.", null],
    ["Qasr would accept a deliberate compromise in process coverage rather than deliver the complete approved design.", iss("The design-change option leaves 29% of corporate arrivals exposed to the old approval process.", "A remaining service gap")],
    ["Notice that configuration and design change retain supported upgrades, while the proposed extension does not.", null],
    ["The alternatives also differ in continuing manual work, even though their initial quotations appear straightforward.", cmp("What the alternatives really exchange", "Lower initial cost", "Faster delivery may retain manual work or leave arrivals on the old path.", "Stronger process fit", "Automatic evaluation removes the wait but creates unsupported upgrade exposure.")],
    ["The right decision cannot emerge from price alone, because each route changes what Qasr must operate afterward.", null],
    ["The team must compare delivery time, guest outcomes, staffing requirements and future support before recommending a route.", q("Which disadvantage would you find hardest to defend to the manager who approved Qasr's original redesign?")],
    ["Our next discussion will examine those consequences over four years, including the competing demands on Qasr's delivery team.", t("The decision to carry forward", "Compare the operating futures created by each option, not merely their initial prices.")]
  ],
  review: [
    {
      title: "The clinic booking system with three possible futures",
      lines: [
        ["Let's explore the same development dilemma through a clinic replacing its appointment booking process.", t("Three routes, different consequences", "A clinic illustrates why initial convenience and long-term process performance must be considered together.")],
        ["The clinic wants routine appointments confirmed without unnecessary administrative waiting, while unusual requests receive appropriate human attention.", null],
        ["Its selected application can route booking requests but cannot evaluate every condition required by the redesigned process.", dg("The clinic's capability gap", D.flow(["Appointment|request", "Required|decision", "Missing|evaluation"]), "The selected application can move requests but cannot perform every decision required by the approved process.")],
        ["The clinic could configure the application to send requests to administrators earlier in the working day.", null],
        ["That might prevent patients from waiting at the final booking stage, provided employees complete the queue promptly.", st("Configuration may improve timing without removing the underlying dependence on manual approval.")],
        ["However, employees would still perform routine decisions, so the clinic would retain an ongoing administrative obligation.", null],
        ["The apparent improvement would depend on whether staffing and workload allowed the queue to be cleared reliably.", iss("Moving approval work earlier does not eliminate the recurring effort required to complete those approvals.", "A relocated workload")],
        ["Alternatively, the clinic could extend the application with rules that evaluate routine appointment requirements automatically.", null],
        ["That extension might deliver stronger process fit because employees would concentrate on cases requiring judgement.", dg("Extending the clinic application", D.flow(["Appointment|request", "Apply|defined rules", "Confirm|routine case", "Refer|exception"]), "An extension can evaluate routine requirements while directing genuinely unusual cases to employees.")],
        ["Yet the clinic must investigate whether the vendor supports the additional functionality through future software upgrades.", null],
        ["A technically successful extension could create maintenance obligations that continue long after the development project ends.", st("Better process fit can justify additional development, but future support responsibilities remain part of the decision.")],
        ["The clinic could also change its process to use the application's standard booking functionality without adding new capabilities.", null],
        ["This might simplify delivery, although some appointment requests could remain dependent on the original manual route.", dg("Changing the operating design", D.flow(["Appointment|requests", "Standard|handling", "Remaining|manual cases"]), "A process change can simplify technology delivery while leaving some requests outside the intended improvement.")],
        ["The clinic must therefore examine which patients benefit and which continue experiencing the earlier administrative process.", null],
        ["That distribution matters because a process improvement should be judged by its operating consequences, not its installation speed.", q("Would the fastest development route still look attractive if difficult appointments continued through the old approval process?")],
        ["Notice that each alternative changes the clinic's future responsibilities in a different way.", null],
        ["Configuration retains manual work, extension introduces technical obligations, and process change may preserve an unresolved service gap.", cmp("Three different obligations", "Operating consequences", "Manual work or unresolved cases may continue after deployment.", "Technical consequences", "Additional functionality may require future maintenance and upgrade support.")],
        ["A responsible manager should compare those consequences against the intended improvement before approving any development route.", null],
        ["This is the same reasoning Qasr needs when evaluating its corporate-rate alternatives.", st("Development choices should be evaluated against the process they create and the obligations they leave behind.")],
        ["The clinic example reminds us that a successful technology decision must also be a defensible operating decision.", q("Which information would you request before recommending configuration, extension or process change for the clinic?")]
      ]
    },
    {
      title: "The university admissions process that could not serve everyone",
      lines: [
        ["Now imagine a university redesigning admissions so routine eligibility decisions can be completed without unnecessary administrative delays.", t("When the standard route covers only some cases", "An admissions example reveals why partial coverage must be distinguished from complete process improvement.")],
        ["The university selects a platform that receives applications and supports several standard eligibility checks.", null],
        ["However, the platform cannot automatically evaluate every condition included in the approved admissions design.", dg("The admissions capability gap", D.flow(["Student|application", "Required|checks", "Incomplete|automation"]), "The selected platform supports some eligibility checks but cannot deliver the complete approved evaluation process.")],
        ["The development team proposes using standard functionality for applications that satisfy the available checks.", null],
        ["Other applications would continue through the existing manual assessment route because the platform cannot resolve them automatically.", iss("The proposed arrangement improves routine handling while retaining the old process for applications outside standard coverage.", "Partial process improvement")],
        ["This may be a reasonable compromise, but the university should not describe it as complete delivery of the approved design.", null],
        ["Managers need to understand which applications benefit and which remain dependent on the previous process.", st("Partial coverage must be reported explicitly because it determines how widely the intended improvement reaches applicants.")],
        ["The university could instead configure supported workflow settings to move manual eligibility checks earlier.", null],
        ["That might reduce waiting, but it would still require employees to complete the decisions on time.", dg("Configuring earlier review", D.flow(["Application|received", "Route|review", "Employee|decision", "Record|outcome"]), "Configuration can change when manual work occurs without necessarily removing the work itself.")],
        ["Alternatively, an extension could add rules that evaluate the missing eligibility conditions automatically.", null],
        ["This might preserve the intended process, although the university would inherit additional development and maintenance responsibilities.", q("Would stronger eligibility automation justify an extension if the vendor could not support it through ordinary upgrades?")],
        ["The team should investigate those obligations before assuming that the closest process fit is automatically the strongest choice.", null],
        ["Likewise, the simplest standard solution should not win merely because it requires less development effort.", cmp("The competing considerations", "Standard functionality", "May simplify delivery but leave some applications on the old path.", "Additional rules", "May improve coverage but create future maintenance and upgrade obligations.")],
        ["The university should compare how each route affects applicants, employees and the sustainability of the admissions service.", null],
        ["It should also distinguish initial development costs from continuing administrative work after the new process begins operating.", st("The cost of a development route includes the responsibilities and operating consequences that continue after implementation.")],
        ["A proposal that improves most applications can still leave a significant problem for the remaining applicants.", null],
        ["That limitation should be visible to the managers responsible for approving the final process design.", dg("Evaluating the proposed compromise", D.flow(["Approved|outcome", "Actual|coverage", "Remaining|exceptions", "Authorised|decision"]), "Management should understand the achieved coverage and remaining exceptions before accepting a process compromise.")],
        ["Qasr faces the same issue because its design-change option resolves seventy-one percent of corporate arrivals.", null],
        ["The remaining twenty-nine percent continue through the old approval path, so the improvement is not universal.", iss("A 71% improvement in process coverage does not mean the remaining 29% have received the same benefit.", "The unresolved population")],
        ["The university example helps us recognise why development decisions must be judged through their effects on real service users.", null],
        ["A defensible recommendation explains both the improvement achieved and the limitations the organisation chooses to retain.", q("How would you defend a faster admissions solution while acknowledging the applicants still dependent on manual approval?")]
      ]
    }
  ]
},
{
  title: "The four-year decision",
  sec: "W11O3c",
  lines: [
    ["Qasr Hospitality Group now has three development alternatives, but their initial prices tell only part of the story.", t("The four-year decision", "A defensible build choice considers process fit, future obligations and competing delivery commitments.")],
    ["Imagine presenting these alternatives to the manager who approved the redesigned corporate-rate process during the Innovate phase.", null],
    ["That manager wants to know whether the chosen solution will actually remove the recurring forty-seven-minute arrival wait.", q("Can Qasr defend its development choice against the improvement the original process design promised?")],
    ["Configuration costs AED 180,000, extension costs AED 540,000, and changing the process costs AED 95,000.", null],
    ["Those figures establish initial expenditure, but they cannot establish the total cost of operating each solution.", dg("Known initial development costs", D.flow(["Change|AED 95,000", "Configure|AED 180,000", "Extend|AED 540,000"]), "The three initial costs are known, but they do not represent four-year ownership costs.")],
    ["Extension therefore costs AED 360,000 more initially than configuration, a difference that deserves careful examination.", null],
    ["However, choosing the cheaper route does not automatically mean Qasr will spend less over four years.", iss("The AED 360,000 difference compares initial costs only, not the complete four-year consequences.", "Initial price is not total cost")],
    ["Configuration requires two additional overnight shifts each week because employees must continue approving every corporate arrival.", null],
    ["Those shifts create recurring operating obligations, although the exhibit does not provide their monetary cost.", dg("Configuration's continuing obligation", D.flow(["Corporate|requests", "Overnight|queue", "Additional|shifts", "Manual|approval"]), "Configuration retains human approval and requires two additional overnight shifts each week.")],
    ["Qasr must estimate that cost before claiming configuration is cheaper over the entire decision horizon.", null],
    ["The team should also consider what happens when overnight workload prevents approvals from finishing before 06:00.", q("What happens to the promised improvement if the overnight approval queue is not cleared on time?")],
    ["Extension avoids those additional shifts and preserves automatic agreement evaluation, matching the approved phase five design.", null],
    ["Yet Vendor C has confirmed that its rules extension falls outside the supported software upgrade paths.", iss("The extension preserves the intended process but creates exposure to unsupported future upgrades.", "The cost of stronger process fit")],
    ["That limitation could require additional technical work when the underlying product changes, although the amount remains unknown.", null],
    ["A responsible comparison must acknowledge this uncertainty rather than invent maintenance fees or future upgrade costs.", st("Known development costs and unknown future obligations must remain clearly distinguished in the decision record.")],
    ["Changing the design appears attractive because AED 95,000 and three weeks represent the lowest initial commitment.", null],
    ["However, the standard solution resolves only seventy-one percent of corporate arrivals through the revised process.", dg("The design-change compromise", D.flow(["Corporate|arrivals", "71%|resolved", "29%|old path"]), "The cheaper design-change option leaves 29% of arrivals on the previous approval path.")],
    ["The remaining twenty-nine percent involve bookings arriving within twenty-four hours and retain the old approval process.", null],
    ["That unresolved population matters because the original improvement was intended to remove unnecessary approval waiting.", iss("A lower development price does not establish that the remaining service gap is acceptable.", "The cost of incomplete coverage")],
    ["Qasr must also consider delivery capacity because the same team faces a January regulatory deadline seven months away.", null],
    ["The four-month extension could compete with that work, even though the case does not quantify the scheduling conflict.", cmp("Competing delivery considerations", "Corporate-rate development", "Choose a route that delivers a defensible process outcome.", "Regulatory commitment", "Protect the same team's capacity to meet the January deadline.")],
    ["This creates a resource decision, not merely a software comparison, because development work consumes organisational capacity.", null],
    ["The team should examine whether each route leaves sufficient capacity for the regulatory commitment before recommending approval.", st("A technically attractive solution may still be unsuitable if its delivery demands threaten another important commitment.")],
    ["Remember our earlier distinction between core, supporting and management processes when judging how much differentiation deserves investment.", null],
    ["A capability central to guest experience may justify stronger process fit than an ordinary administrative function.", dg("A defensible development assessment", D.flow(["Strategic|importance", "Process|fit", "Four-year|obligations", "Delivery|capacity", "Decision|conditions"]), "The recommendation should reflect strategic value, process performance, long-term obligations and available delivery capacity.")],
    ["Still, strategic importance cannot erase maintenance risks or justify ignoring the regulatory deadline.", null],
    ["Qasr therefore needs a conditional recommendation explaining which uncertainties must be resolved before committing.", q("What evidence would persuade you that the preferred route remains defensible after four years of operation?")],
    ["The manager should receive a comparison of known costs, unresolved estimates, operational consequences and required approvals.", null],
    ["Only then can Qasr choose deliberately without allowing the cheapest quotation to determine its future process.", t("The decision principle", "Defend the operating future created by the choice, not merely the initial development price.")]
  ],
  review: [
    {
      title: "The clinic scheduling system with hidden operating costs",
      lines: [
        ["Let's reconsider four-year development decisions through a clinic planning to improve how routine appointments are confirmed.", t("Looking beyond the purchase price", "A clinic reveals why the cheapest development route may carry continuing operating obligations.")],
        ["The clinic has redesigned appointment confirmation so routine requests can be resolved without repeated administrative waiting.", null],
        ["Its selected application can route approval requests, but it cannot automatically evaluate every required booking condition.", dg("The clinic's development problem", D.flow(["Appointment|request", "Required|evaluation", "Missing|capability"]), "The standard application routes work but cannot perform every decision required by the redesigned appointment process.")],
        ["A configuration proposal would send routine requests to administrators earlier, reducing the chance of patients waiting later.", null],
        ["This appears economical because the clinic would use existing software settings instead of developing additional functionality.", st("Configuration may reduce initial development effort while retaining recurring manual approval work.")],
        ["However, administrators would still need to evaluate the requests, creating an operating obligation that continues after implementation.", null],
        ["The clinic should estimate that recurring effort rather than treating the configuration quotation as its complete cost.", iss("A lower initial development price can conceal continuing administrative work that must be funded and managed.", "The hidden operating burden")],
        ["An extension could evaluate routine booking conditions automatically and reduce dependence on employees for those decisions.", null],
        ["That option might require greater initial investment, while potentially avoiding some recurring administrative activity.", dg("Comparing operating arrangements", D.flow(["Manual|approval", "Recurring|effort", "Automatic|evaluation", "Technical|obligations"]), "Different development routes exchange continuing manual work for different technical and maintenance responsibilities.")],
        ["Yet the clinic must examine whether the vendor supports the extension through future product upgrades.", null],
        ["An unsupported extension could become expensive to maintain when the standard application changes.", q("Would you approve the extension without knowing how future upgrades might affect its additional functionality?")],
        ["The clinic might instead change its process to accept the standard application's existing capabilities.", null],
        ["That could simplify development, but some patients might remain dependent on the previous approval arrangement.", st("A process compromise should be evaluated against the improvement patients were originally expected to receive.")],
        ["The manager therefore needs more than quotations showing which alternative costs least to develop.", null],
        ["A sound comparison considers process coverage, recurring employee effort, technical support and future change obligations.", cmp("Two views of development cost", "Initial expenditure", "What the organisation pays to prepare the capability.", "Long-term consequences", "What the organisation must operate, maintain and change afterward.")],
        ["A four-year perspective makes those continuing responsibilities visible without requiring the manager to invent missing financial figures.", null],
        ["Where costs remain unknown, the team should identify the estimates needed before making a confident recommendation.", dg("Building the decision evidence", D.flow(["Known|costs", "Operating|obligations", "Upgrade|exposure", "Decision|conditions"]), "A defensible recommendation distinguishes established costs from obligations that still require investigation.")],
        ["The clinic may reasonably choose any suitable route, provided management understands what that choice will require afterward.", null],
        ["That is the same challenge facing Qasr when comparing overnight staffing with an unsupported rules extension.", q("What information would you request before declaring the clinic's cheapest development option its best long-term choice?")]
      ]
    },
    {
      title: "The university service competing with a regulatory deadline",
      lines: [
        ["Now consider a university developing a new student-record service while another important compliance project requires the same technical team.", t("When development competes for capacity", "A university example shows why the preferred technology route must fit the organisation's wider commitments.")],
        ["The student-record redesign requires reliable information checks before employees can complete routine requests.", null],
        ["The selected platform handles standard workflow routing but cannot perform every evaluation required by the approved design.", dg("The student-record capability gap", D.flow(["Student|request", "Required|checks", "Standard|workflow", "Missing|evaluation"]), "The standard platform supports routing but does not deliver the complete evaluation capability required by the redesign.")],
        ["The university could configure the platform, extend its functionality or change the process to fit existing features.", null],
        ["Each alternative would demand different development effort and leave different responsibilities after the service begins operating.", st("A development decision must consider delivery capacity alongside process fit and long-term obligations.")],
        ["Suppose the extension offers the closest match to the approved design but requires substantial work from specialist developers.", null],
        ["Those developers are also needed for a separate compliance commitment that the university cannot simply ignore.", iss("A development route can threaten another organisational commitment when both depend on the same limited team.", "Competing delivery capacity")],
        ["The manager must therefore consider whether the extension can be completed without undermining the compliance work.", null],
        ["A technically superior design may become difficult to justify if its delivery demands create unacceptable scheduling risks.", q("Should the university approve the closest process fit before checking whether the required developers are available?")],
        ["Configuration might require less development effort, allowing the team to preserve capacity for the other commitment.", null],
        ["However, the university would need to examine whether configuration retains manual work that the redesign intended to remove.", dg("Configuration and continuing work", D.flow(["Supported|settings", "Manual|evaluation", "Operating|responsibility"]), "Configuration may simplify development while leaving employees responsible for recurring manual decisions.")],
        ["Changing the process could reduce development demands further, but it might leave some student requests on the old route.", null],
        ["That compromise should be measured against the intended service improvement rather than accepted solely for scheduling convenience.", st("Protecting delivery capacity does not automatically justify abandoning the approved process outcome.")],
        ["The manager also needs to distinguish known development expenditure from future costs that remain uncertain.", null],
        ["An extension may create maintenance and upgrade obligations, while manual processing may create recurring operating effort.", cmp("Different kinds of exposure", "Delivery exposure", "The chosen route may compete with another important project.", "Operating exposure", "The developed process may retain manual work or create technical maintenance obligations.")],
        ["These consequences belong in the same decision because they affect the organisation beyond the initial development period.", null],
        ["The university should document the trade-offs and identify any conditions required before approving its preferred route.", dg("A conditional recommendation", D.flow(["Process|requirements", "Available|capacity", "Future|obligations", "Approval|conditions"]), "The decision should explain how the chosen route protects process outcomes and wider organisational commitments.")],
        ["If essential cost or capacity information is missing, the recommendation should acknowledge that uncertainty explicitly.", null],
        ["Inventing precise estimates would create false confidence rather than strengthen the university's decision.", iss("Unknown costs and unverified capacity should remain explicit uncertainties until reliable evidence becomes available.", "Avoiding false precision")],
        ["Qasr faces a comparable challenge because its delivery team must also complete work for a January regulatory deadline.", null],
        ["Its four-year decision must therefore consider whether the selected development route remains sustainable and deliverable.", q("How would you defend a technically attractive option if it placed another important organisational commitment at risk?")]
      ]
    }
  ]
},
      ] },
      { id: "l3", title: "Building the process people will actually use", sections: [
{
  title: "What happens when the normal path fails?",
  sec: "W11O2a",
  lines: [
    ["Qasr Hospitality Group has compared its development alternatives, but an important question remains about the guests they actually serve.", t("What happens when the normal path fails?", "Develop must prepare exception handling, not merely automate the easiest cases.")],
    ["Imagine a corporate guest arriving with a booking that the new standard process cannot resolve automatically.", null],
    ["The reception employee sees an unresolved rate, although the redesigned process was supposed to prevent approval delays.", q("What should happen when a booking cannot follow the normal corporate-rate process?")],
    ["This situation introduces an exception, meaning a case that cannot proceed through the normal process without additional handling.", null],
    ["An exception path explains how that case will be resolved, who is responsible and what authority they need.", dg("Normal and exception handling", D.flow(["Corporate|booking", "Check|agreement", "Resolve|normally", "Handle|exception"]), "The developed process must support normal agreement resolution and provide a defined route when normal processing cannot finish.")],
    ["Qasr's design-change option makes this challenge particularly visible because its standard functionality does not cover every arrival.", null],
    ["It resolves seventy-one percent of corporate arrivals, while twenty-nine percent remain on the previous approval path.", st("The design-change option resolves 71% of corporate arrivals but leaves 29% on the old approval route.")],
    ["Those remaining cases involve bookings arriving within twenty-four hours, making the unresolved population an explicit operating concern.", null],
    ["The percentage matters because a process cannot be judged only by how smoothly its easiest cases proceed.", iss("The remaining 29% still depend on the old approval path, so the intended improvement does not reach every arrival.", "Incomplete process coverage")],
    ["Qasr must therefore decide whether this residual approval work represents an acceptable compromise or an unresolved design problem.", null],
    ["Automating routine cases does not automatically eliminate exceptions, especially when the underlying reason for manual approval remains.", cmp("Automation versus elimination", "Automating the exception", "Technology moves or handles an existing exception more efficiently.", "Eliminating the exception", "The process removes the condition that made the exception necessary.")],
    ["This distinction becomes clearer when we remember Qasr's original forty-seven-minute corporate-rate approval wait.", null],
    ["Moving an approval request overnight may reduce visible waiting without removing the requirement for routine human approval.", dg("Moving rather than removing approval", D.flow(["Corporate|request", "Overnight|queue", "Human|decision", "Resolved|rate"]), "Earlier routing can improve timing while preserving the manual decision that caused the original dependency.")],
    ["The Develop team should ask why the exception exists before deciding whether additional automation is appropriate.", null],
    ["Some exceptions genuinely require judgement, while others reveal unnecessary rules or weaknesses in the existing process.", q("Should Qasr automate every approval request, or investigate whether some approvals are needed at all?")],
    ["The answer requires evidence, particularly measured exception volumes and information about the causes behind those cases.", null],
    ["Without that evidence, Qasr could invest in automating work that a better process would simply remove.", st("Exception volumes and causes should inform development decisions before the organisation commits to automating them.")],
    ["For exceptions that remain necessary, employees need a clear handling procedure rather than permission to improvise.", null],
    ["That procedure should identify the responsible role, the required decision authority and the expected handling arrangements.", dg("A developed exception path", D.flow(["Identify|exception", "Assign|owner", "Apply|authority", "Resolve|case"]), "An exception path must establish responsibility and authority so employees can resolve cases consistently.")],
    ["These responsibilities connect directly with the People phase, where the organisation established who performs and owns process work.", null],
    ["Develop must translate those responsibilities into practical procedures that employees can follow during real guest arrivals.", iss("An exception without a responsible owner or sufficient authority can leave the guest waiting while employees seek informal approval.", "An unresolved handover")],
    ["The team should also consider how long exception handling takes, because a separate route can still become a bottleneck.", null],
    ["A process that accelerates routine arrivals while making difficult cases slower may create an uneven guest experience.", cmp("Two dimensions of exception performance", "Exception frequency", "How often cases cannot follow the normal process.", "Exception handling time", "How long employees need to resolve those cases.")],
    ["After go-live, Qasr should monitor exception volumes and causes to understand whether the developed arrangements remain effective.", null],
    ["Recurring workarounds deserve particular attention because they may indicate that employees cannot operate the process as intended.", st("Monitoring exceptions after go-live helps reveal recurring problems, ineffective procedures and opportunities for further improvement.")],
    ["Remember that an exception path is not permission to preserve every weakness inherited from the original process.", null],
    ["It is a controlled response to situations that genuinely remain outside normal processing after the redesign.", dg("A disciplined exception decision", D.flow(["Measure|exceptions", "Investigate|causes", "Remove|unnecessary work", "Develop|remaining paths"]), "The team should examine exception causes before deciding which cases need automation and which require documented human handling.")],
    ["Qasr must protect the intended improvement while ensuring that unusual arrivals receive dependable treatment rather than improvised assistance.", null],
    ["Our next discussion will examine how realistic testing reveals whether those exception arrangements actually work under pressure.", q("Would you approve Qasr's new process without knowing how the remaining corporate arrivals will be handled?")]
  ],
  review: [
    {
      title: "The restaurant order that does not fit the menu",
      lines: [
        ["Let's revisit exception handling through a restaurant introducing a digital ordering system for its customers.", t("Understanding exceptions through restaurant orders", "A normal ordering route needs a reliable alternative when a request cannot be completed automatically.")],
        ["The restaurant wants ordinary orders to move directly from customer selection to kitchen preparation without unnecessary clarification.", null],
        ["Its digital system can recognise standard menu choices and send complete orders to the kitchen.", dg("The normal ordering route", D.flow(["Customer|selection", "Check|menu", "Send|order", "Prepare|meal"]), "Standard orders follow a defined route because the system can interpret the selected menu items.")],
        ["However, imagine a customer requesting a substitution that the ordering system cannot evaluate using its existing rules.", null],
        ["The order now becomes an exception because it cannot continue through the normal automated route.", iss("An unusual substitution requires additional handling because the standard ordering rules cannot resolve the request.", "An exception appears")],
        ["The restaurant could send every unusual request to a manager, but that response deserves careful examination.", null],
        ["Some substitutions might be permitted through clear rules, making repeated managerial approval unnecessary.", q("Should the restaurant automate requests for managerial approval, or remove approval when a clear rule already permits the substitution?")],
        ["This distinction separates automating an exception from eliminating the reason the exception occurs.", null],
        ["Automating the request may move it faster, while improving the rule may allow the normal process to resolve it.", cmp("Two possible responses", "Automate approval routing", "Send the unusual request to a manager more efficiently.", "Remove unnecessary approval", "Allow the system to resolve requests that satisfy an established rule.")],
        ["The restaurant should examine how often substitutions occur and why the system cannot handle them.", null],
        ["Measured volumes and causes help determine whether the problem deserves a rule change or a separate handling procedure.", st("Exception decisions should reflect observed cases and their causes rather than assumptions about what customers usually request.")],
        ["Some unusual requests may still require human judgement because the available information does not support an automatic decision.", null],
        ["For those cases, employees need instructions identifying who can approve the substitution and how the kitchen receives confirmation.", dg("Handling a genuine exception", D.flow(["Unusual|request", "Check|authority", "Confirm|decision", "Inform|kitchen"]), "A genuine exception needs a responsible decision-maker and a clear route back into normal service.")],
        ["Without that arrangement, employees may improvise different answers and create confusion during busy service periods.", null],
        ["The restaurant should also monitor how frequently exceptions occur and how long employees take to resolve them.", iss("A functioning normal route does not guarantee good service when unusual requests repeatedly become delayed or unresolved.", "The hidden service problem")],
        ["Recurring workarounds may reveal that the ordering rules no longer reflect what customers regularly need.", null],
        ["That evidence can support further process improvement rather than simply adding more manual approval activity.", st("Monitoring exception causes helps distinguish necessary judgement from avoidable weaknesses in the process.")],
        ["Qasr faces the same distinction when corporate-rate approvals remain outside the standard automatic evaluation route.", null],
        ["The objective is not to automate every old exception, but to develop a process that handles necessary exceptions reliably.", q("What would you investigate before deciding that every unusual restaurant order needs managerial approval?")]
      ]
    },
    {
      title: "The university application that remains unresolved",
      lines: [
        ["Now consider a university developing an electronic admissions process that automatically checks routine application requirements.", t("When routine automation leaves difficult cases behind", "A university admissions example shows why exception ownership and handling time matter.")],
        ["The redesigned process aims to reduce unnecessary administrative exchanges by evaluating information already available in the application.", null],
        ["Most routine applications can proceed when the system confirms that the required information satisfies established conditions.", dg("The normal admissions route", D.flow(["Student|application", "Check|requirements", "Confirm|eligibility", "Record|decision"]), "The normal process uses defined requirements to evaluate routine applications consistently.")],
        ["However, imagine an applicant whose academic record cannot be evaluated through the standard electronic checks.", null],
        ["The application becomes an exception because additional verification is required before the university can make its decision.", iss("An unresolved academic record requires a defined alternative route rather than indefinite waiting in the electronic workflow.", "An exception needing ownership")],
        ["The university could automatically forward such applications between departments, but routing alone would not resolve missing information.", null],
        ["Someone must understand the issue, possess the necessary authority and know how the case should proceed.", q("Would automatic forwarding improve the student's experience if nobody had responsibility for completing the verification?")],
        ["The development team should therefore define an exception path that identifies the responsible role and required decision authority.", null],
        ["This arrangement connects technology with the human responsibilities established during the earlier process-design work.", dg("An accountable exception route", D.flow(["Unresolved|record", "Assign|owner", "Verify|information", "Complete|decision"]), "The exception route must identify who investigates the unresolved record and how the case reaches a decision.")],
        ["The university should also examine whether repeated exceptions arise from unnecessary administrative requirements rather than genuine uncertainty.", null],
        ["If a requirement adds no necessary control, automating its approval may preserve avoidable work.", cmp("Different causes require different responses", "Unnecessary requirement", "Examine whether the process can remove the condition creating the exception.", "Genuine verification need", "Provide an authorised and documented route for completing the required check.")],
        ["The team needs evidence about exception frequency because isolated unusual cases may require different arrangements from recurring problems.", null],
        ["Handling time matters as well because students experience delays even when the university eventually reaches correct decisions.", st("Exception performance depends on how often cases occur and how effectively employees resolve them.")],
        ["Suppose administrators repeatedly exchange messages to discover who should investigate an unresolved academic record.", null],
        ["That behaviour suggests the developed process lacks clear responsibility, even if the electronic application works correctly.", iss("Repeated informal handovers can indicate that exception ownership and decision authority were never properly established.", "A recurring workaround")],
        ["The university should document the necessary procedure and test it with employees who will perform the work.", null],
        ["After implementation, monitoring exception volumes and causes can reveal whether the arrangements remain effective.", dg("Learning from exceptions", D.flow(["Record|cases", "Measure|handling", "Investigate|causes", "Improve|process"]), "Monitoring helps the university identify recurring weaknesses and improve the handling of unresolved applications.")],
        ["The same reasoning applies to Qasr's corporate arrivals that remain on the previous approval path.", null],
        ["Those guests need reliable handling, but Qasr should also question whether the underlying approval dependency remains necessary.", st("A strong Develop phase handles genuine exceptions while challenging unnecessary work inherited from the old process.")],
        ["The important lesson is that successful automation cannot be judged only by the applications that proceed without difficulty.", null],
        ["It must also account for the people whose cases require additional attention and the employees responsible for resolving them.", q("What evidence would convince you that the university has developed a dependable exception process rather than another administrative queue?")]
      ]
    }
  ]
},
{
  title: "Testing the cases nobody wants to demonstrate",
  sec: "W11O2b",
  lines: [
    ["Qasr Hospitality Group has examined exception handling, but a documented procedure does not prove that employees can operate it.", t("Testing the cases nobody wants to demonstrate", "A successful demonstration is not the same as evidence of operational readiness.")],
    ["Imagine Vendor C demonstrating a corporate arrival where the agreement is available and the required approval completes smoothly.", null],
    ["The screen looks convincing, and the project team feels relieved because the technology appears to be working.", q("Would you trust that demonstration to establish readiness for every corporate arrival Qasr must handle?")],
    ["The difficulty is that demonstrations usually follow conditions chosen to show the system performing successfully.", null],
    ["Real operations include incomplete information, unusual requests and several demanding cases arriving together.", cmp("Demonstration versus testing", "Successful demonstration", "Shows that a selected case works under prepared conditions.", "Operational testing", "Examines whether the complete process works under realistic and difficult conditions.")],
    ["Develop must therefore test the operating process rather than merely confirm that its software screens function.", null],
    ["The strongest starting point is evidence from actual historical cases, including situations that previously caused difficulties.", st("Historical cases provide realistic evidence because they reflect situations the organisation has already encountered.")],
    ["At Qasr, the team should revisit corporate arrivals that experienced approval problems under the earlier process.", null],
    ["Those cases help reveal whether the developed solution genuinely addresses the weaknesses that motivated the redesign.", dg("Testing against previous experience", D.flow(["Historical|cases", "Previous|failures", "Developed|process", "Verify|outcomes"]), "Previously difficult cases should be tested against the developed process to establish whether the original problems have been addressed.")],
    ["Testing only straightforward bookings would leave the team uncertain about arrivals requiring additional approval or clarification.", null],
    ["This matters particularly because the design-change option leaves twenty-nine percent of corporate arrivals on the old approval path.", iss("A solution that handles routine arrivals successfully may still leave the remaining 29% exposed to unresolved approval problems.", "Testing beyond normal cases")],
    ["The team must also examine peak volume, meaning periods when the process faces unusually demanding workloads.", null],
    ["A workflow that handles isolated requests may behave differently when many approvals require attention during the same period.", dg("Testing operating pressure", D.flow(["Routine|volume", "Peak|volume", "Approval|capacity", "Observe|delays"]), "Peak-volume testing examines whether the developed process remains dependable when demand places pressure on its operating capacity.")],
    ["For configured overnight approvals, Qasr should test whether the revenue office can clear the queue before 06:00.", null],
    ["The test should expose delays rather than assume the additional overnight shifts will always provide sufficient capacity.", q("What would happen if the overnight approval queue remained unfinished when corporate guests began arriving?")],
    ["Employees who actually perform the work must participate because they understand practical difficulties that demonstrations may conceal.", null],
    ["Reception and revenue staff can reveal unclear instructions, awkward handovers and missing information during realistic case testing.", st("Performer-led testing uses the experience of employees who will operate the process to identify practical weaknesses.")],
    ["A handover occurs when responsibility or information passes between people, departments or systems during process execution.", null],
    ["Testing must establish whether that transfer works when a corporate booking requires additional investigation.", dg("Testing a departmental handover", D.flow(["Reception|identifies issue", "Revenue|receives case", "Decision|completed", "Reception|informed"]), "A handover test checks whether the receiving role obtains the information and authority needed to continue the case.")],
    ["When something fails, the team should record a defect, meaning a problem that prevents the process meeting its requirements.", null],
    ["A useful defect record identifies the failed situation and explains the difference between expected and observed behaviour.", iss("An unrecorded failure may reappear during implementation because nobody has responsibility for correcting it.", "Defects need evidence")],
    ["Manual procedures deserve testing too, because software cannot resolve every exception without employee intervention.", null],
    ["The team should verify that employees understand the procedure and possess the authority needed to complete difficult cases.", dg("Testing the complete operating arrangement", D.flow(["System|functions", "Manual|procedures", "Departmental|handovers", "Recorded|defects"]), "Operational testing covers technology, human procedures and handovers while recording problems requiring correction.")],
    ["Interfaces also require attention because missing or incorrectly transferred information can prevent otherwise sound decisions.", null],
    ["A successful individual screen does not prove that connected systems exchange the information required by the complete process.", st("Testing must follow the work across system boundaries rather than evaluate each application screen in isolation.")],
    ["Develop is ready to hand over only when credible evidence supports the operating arrangements and identified defects are addressed.", null],
    ["That does not mean implementation has succeeded, because introducing the developed capability belongs to the next framework phase.", q("What evidence would convince you that Qasr's difficult corporate arrivals can be handled without recreating the original delay?")],
    ["Our next discussion examines the manual procedures and support arrangements that must accompany this tested capability.", t("The testing principle", "Test the cases that could defeat the process, not merely those that make the software look successful.")]
  ],
  review: [
    {
      title: "The restaurant system that passed its demonstration",
      lines: [
        ["Let's revisit operational testing through a restaurant introducing a digital ordering system before a busy service period.", t("Testing beyond the perfect demonstration", "A restaurant reveals why realistic workloads and unusual cases matter.")],
        ["The restaurant manager watches a demonstration where an employee enters a standard meal and the kitchen receives it immediately.", null],
        ["The order appears correctly, and everyone agrees that the new application looks ready for everyday use.", dg("The successful demonstration", D.flow(["Enter|standard order", "Transmit|request", "Kitchen|receives"]), "A prepared demonstration shows that the standard ordering route can function under favourable conditions.")],
        ["However, the demonstration has not shown what happens when customers request substitutions or several orders arrive together.", null],
        ["Those situations matter because the restaurant must serve real customers rather than reproduce a carefully prepared example.", iss("A successful standard order does not establish that the complete ordering process can handle unusual requests or heavy demand.", "The demonstration gap")],
        ["The manager should therefore test orders resembling situations employees have already found difficult during service.", null],
        ["Historical cases are valuable because they expose problems that actually occurred rather than problems imagined by the vendor.", st("Previously difficult cases help establish whether the developed process addresses known operational weaknesses.")],
        ["Suppose a customer requests a substitution that the application cannot evaluate using its standard menu rules.", null],
        ["The employee needs a documented procedure explaining who can approve the change and how the kitchen receives confirmation.", dg("Testing an unusual order", D.flow(["Unusual|request", "Employee|checks rule", "Authorised|decision", "Kitchen|informed"]), "The test follows the exception through human decision-making and the handover needed to complete the order.")],
        ["The restaurant should also test a busy period when several orders require attention at the same time.", null],
        ["Peak-volume testing reveals whether employees and systems can maintain reliable processing when demand becomes demanding.", q("Would a single successful order prove that the kitchen can manage several unusual requests during a busy evening?")],
        ["Employees who normally take orders and prepare meals should participate because they understand practical operating constraints.", null],
        ["Their experience may reveal missing instructions, unclear responsibilities or information that fails to reach the kitchen.", cmp("Two kinds of evidence", "Vendor demonstration", "Shows that selected functionality operates under prepared conditions.", "Performer-led testing", "Shows whether employees can complete realistic work across the whole process.")],
        ["When the team discovers a failure, it should record a defect describing what happened and what should have happened.", null],
        ["That record allows the development team to investigate the problem and confirm that its correction actually works.", st("Defect logging turns observed failures into evidence that can guide correction and further testing.")],
        ["The restaurant should not declare readiness while important exception procedures or kitchen handovers remain untested.", null],
        ["A dependable operating capability includes working technology and the human arrangements needed when ordinary processing fails.", dg("Evidence of readiness", D.flow(["Routine|orders", "Difficult|orders", "Peak|demand", "Resolve|defects"]), "Credible readiness evidence covers normal cases, exceptions, demanding workloads and correction of identified problems.")],
        ["Qasr faces the same challenge when its corporate-rate process must handle difficult arrivals rather than only successful demonstrations.", null],
        ["The lesson is that testing should challenge the process before customers experience its weaknesses.", q("Which restaurant test would reveal more about readiness than repeating the original successful demonstration?")]
      ]
    },
    {
      title: "The university certificate service under pressure",
      lines: [
        ["Now consider a university preparing an electronic certificate service for students who have completed their academic requirements.", t("Testing the complete service", "A university example shows why system interfaces, employee handovers and historical failures must be tested together.")],
        ["The university has developed a request form that allows students to submit certificate applications electronically.", null],
        ["During a demonstration, a complete student record passes the eligibility check and produces the expected approval.", dg("The demonstrated certificate request", D.flow(["Student|request", "Complete|record", "Eligibility|confirmed", "Approval|recorded"]), "The demonstration confirms that a routine certificate request can pass through the electronic workflow.")],
        ["The project team is encouraged, but the service must also handle records that cannot be verified automatically.", null],
        ["An older academic record might require an employee to investigate information held outside the normal electronic route.", iss("A successful electronic request does not establish that unresolved academic records can be handled reliably.", "The difficult case remains")],
        ["The university should examine historical requests that previously required additional investigation or departmental clarification.", null],
        ["Those cases help determine whether the developed service can resolve problems that the earlier process struggled to handle.", st("Historical failures are useful test cases because they connect development evidence with known operating difficulties.")],
        ["The team should also test whether the electronic service exchanges the required information with the academic records system.", null],
        ["An interface connects systems, so incorrect or missing information can prevent the certificate decision from being completed.", dg("Testing the information connection", D.flow(["Certificate|request", "Academic|records", "Eligibility|check", "Decision|returned"]), "Interface testing verifies that the information required for eligibility decisions moves correctly between connected systems.")],
        ["However, technology testing alone cannot establish that employees know how to handle unresolved records.", null],
        ["The university must test the manual procedure and the handover between the administrative roles involved.", q("What happens if the system identifies an unresolved record but nobody knows who must investigate it?")],
        ["Employees who perform certificate processing should participate because they understand the information and authority required for decisions.", null],
        ["Their testing may reveal that an apparently complete electronic workflow still leaves important human responsibilities unclear.", cmp("Different testing responsibilities", "Technical testing", "Checks whether systems exchange information and perform their required functions.", "Operational testing", "Checks whether employees can complete realistic cases and departmental handovers.")],
        ["The team should also examine periods when many students submit requests within a relatively short time.", null],
        ["Peak-volume testing helps reveal whether the service remains dependable when several cases require simultaneous attention.", dg("Testing demanding conditions", D.flow(["Multiple|requests", "System|capacity", "Employee|handover", "Observe|outcomes"]), "Demanding tests examine how the complete service performs when workload places pressure on systems and employees.")],
        ["When a test fails, the team should record the defect and describe the expected and observed results.", null],
        ["The development team can then correct the weakness and repeat the relevant test to establish whether it works.", st("A recorded defect provides evidence for correction and helps prevent known failures from reaching implementation.")],
        ["The university should not confuse a functioning request form with a fully developed certificate service.", null],
        ["Operational readiness requires credible evidence that routine requests, difficult records and employee handovers can all be managed.", iss("Incomplete exception testing can leave students exposed to delays even when the electronic application works correctly.", "A false sense of readiness")],
        ["Qasr needs the same discipline when testing corporate-rate approvals, particularly cases that cannot follow the normal route.", null],
        ["The strongest evidence comes from realistic cases that challenge the complete process rather than showcase isolated software functions.", q("What would you test before allowing the university to introduce its certificate service into everyday operations?")]
      ]
    }
  ]
},
{
  title: "The manual half of the new process",
  sec: "W11O2c",
  lines: [
    ["Qasr Hospitality Group has tested its corporate-rate technology, but reliable guest service still depends on what employees do.", t("The manual half of the new process", "A developed process needs documented human work alongside functioning technology.")],
    ["Imagine a reception employee facing a corporate booking whose agreement cannot be evaluated through the normal system.", null],
    ["The software identifies the unresolved case, but the employee still needs a dependable way to complete it.", q("What must Qasr provide when the system identifies a problem but cannot resolve it?")],
    ["This is why Develop includes manual procedures, meaning documented instructions for work that people must perform themselves.", null],
    ["Those procedures connect automated activities with human decisions, preventing unresolved cases from becoming improvised guest-service problems.", dg("The complete operating process", D.flow(["System|activity", "Business|rule", "Manual|handling", "Completed|outcome"]), "The developed process combines automated functionality with documented human work when normal processing cannot finish.")],
    ["At Qasr, the corporate-rate design depends on information moving correctly between systems and the employees responsible for decisions.", null],
    ["An interface supports information exchange, while a business rule explains how that information should determine an outcome.", st("Interfaces exchange required information, while business rules establish how defined decisions should be made.")],
    ["However, an unavailable agreement or unresolved approval may still require an authorised employee to intervene.", null],
    ["The procedure must explain what the employee should investigate and how the case returns to normal processing.", dg("Resolving an unusual arrival", D.flow(["Identify|unresolved case", "Check|required information", "Obtain|authorised decision", "Complete|arrival"]), "A manual procedure provides a controlled route for resolving cases that cannot complete normal processing.")],
    ["Without that guidance, reception employees may contact different colleagues or repeat approval requests without resolving the underlying problem.", null],
    ["Such workarounds can recreate the delays that Qasr's redesigned process was intended to eliminate.", iss("A functioning application cannot prevent inconsistent service when employees lack clear procedures for unresolved cases.", "The manual capability gap")],
    ["The team therefore needs an exception catalogue, a documented collection of unusual situations and their agreed handling arrangements.", null],
    ["Each entry should identify the problem, responsible role, required authority and procedure for reaching a decision.", dg("An exception catalogue entry", D.flow(["Exception|condition", "Responsible|role", "Decision|authority", "Resolution|procedure"]), "The catalogue connects each recognised exception with its owner, authority and practical handling procedure.")],
    ["This responsibility connects with the People phase, where Qasr established who should perform and own process activities.", null],
    ["Develop turns those responsibilities into instructions that employees can actually follow during demanding operating situations.", st("The People phase establishes responsibilities; Develop makes those responsibilities usable through operating procedures.")],
    ["Rules also need named owners because operating requirements may change after the new process enters everyday use.", null],
    ["A rule owner is accountable for deciding whether a business rule should change and authorising that change appropriately.", q("Who should decide when Qasr's corporate-rate evaluation rules need to be updated?")],
    ["The development team should establish a change route explaining how proposed rule modifications are reviewed and approved.", null],
    ["Otherwise, informal adjustments could gradually change the process without the knowledge of its responsible managers.", dg("Controlling rule changes", D.flow(["Identify|change need", "Consult|rule owner", "Approve|revision", "Update|procedure"]), "A defined change route keeps business rules and operating procedures aligned with authorised decisions.")],
    ["Departmental handovers require equal attention because unresolved corporate-rate cases may move between reception and revenue employees.", null],
    ["A handover should transfer the required information and responsibility without leaving either department uncertain about the next action.", iss("An incomplete handover can leave an unresolved booking between departments even when both departments understand their individual tasks.", "A broken operating connection")],
    ["Qasr should therefore test whether the receiving employee has the information and authority needed to continue the case.", null],
    ["The procedure should also explain how the completed decision reaches the employee responsible for serving the guest.", dg("A complete departmental handover", D.flow(["Reception|identifies issue", "Revenue|receives case", "Authorised|decision", "Reception|continues"]), "The handover is complete only when the responsible employee receives the information needed to continue guest service.")],
    ["Support arrangements matter because employees will eventually encounter questions that ordinary procedures do not fully anticipate.", null],
    ["They need to know where to obtain assistance without creating another informal chain of unresolved requests.", st("Operational support must provide a dependable route for assistance when employees cannot resolve a problem through documented procedures.")],
    ["Writing these arrangements after go-live would expose guests to weaknesses that development should have addressed earlier.", null],
    ["The team must prepare and test them before handing the developed capability to the Implement phase.", cmp("Two views of readiness", "Technical completion", "The software performs its required functions.", "Operational readiness", "Employees can use the systems, rules, procedures and support arrangements together.")],
    ["Remember that Develop does not mean every possible situation can be automated or predicted perfectly.", null],
    ["It means Qasr has prepared a coherent operating capability that supports routine work and handles recognised exceptions responsibly.", q("Would you declare Qasr ready if the software worked but nobody owned the procedures for unresolved arrivals?")],
    ["Our next lesson will connect these operating responsibilities with the long-term consequences of Qasr's development choices.", t("The principle to remember", "A process is not developed until its automated and manual components can work together.")]
  ],
  review: [
    {
      title: "The pharmacy prescription that needs human judgement",
      lines: [
        ["Let's explore manual procedures through a pharmacy introducing an electronic prescription-processing system.", t("When software needs a human partner", "A pharmacy illustrates why automated checks and documented human decisions must work together.")],
        ["The pharmacy wants routine prescriptions to move through established checks without unnecessary administrative exchanges.", null],
        ["Its electronic system can receive prescription information and apply rules to identify whether normal processing can continue.", dg("The normal prescription route", D.flow(["Receive|prescription", "Apply|defined checks", "Confirm|routine case", "Prepare|medicine"]), "The electronic system supports routine processing when the required information satisfies established conditions.")],
        ["However, imagine a prescription containing information that the system cannot interpret confidently using its existing rules.", null],
        ["The application identifies the problem, but identifying an exception does not resolve the professional decision involved.", iss("The system can identify an unresolved prescription without possessing the authority or information needed to resolve it.", "An exception requiring judgement")],
        ["A pharmacist must investigate the issue and follow the appropriate professional procedures before the prescription can proceed.", null],
        ["The operating process therefore needs documented instructions explaining responsibility, authority and the route for obtaining clarification.", st("Manual procedures define how authorised employees complete work that automated processing cannot safely resolve.")],
        ["Without those instructions, employees might repeatedly transfer the prescription or seek assistance through inconsistent informal channels.", null],
        ["The pharmacy should document recognised exception situations so employees understand how each type should be handled.", dg("Documenting exception handling", D.flow(["Recognise|exception", "Identify|responsibility", "Apply|procedure", "Complete|decision"]), "An exception catalogue connects recognised problems with the responsible role and agreed handling procedure.")],
        ["The catalogue should not encourage employees to bypass professional judgement merely because the electronic system appears convenient.", null],
        ["Instead, it should help the appropriate professional exercise that judgement through a consistent operating arrangement.", q("Would an electronic prescription system be operationally ready if employees lacked instructions for unresolved cases?")],
        ["The pharmacy also needs clear ownership of its processing rules because requirements and operating arrangements can change.", null],
        ["A named owner should review proposed changes before employees begin applying revised rules in everyday work.", dg("Managing a rule change", D.flow(["Proposed|revision", "Responsible|owner", "Authorised|change", "Updated|procedure"]), "Rule ownership helps ensure that changes are reviewed and reflected in the procedures employees use.")],
        ["This prevents informal adjustments from producing inconsistent decisions across the pharmacy's operating activities.", null],
        ["Employees must also know where to obtain support when a problem falls outside the documented procedure.", st("Operational support complements documented procedures by providing a reliable route for unresolved questions.")],
        ["Testing should include difficult prescriptions and the handovers required to obtain authorised clarification.", null],
        ["A successful routine transaction cannot establish that those human and technical arrangements work together.", cmp("What readiness requires", "Working software", "The system receives information and applies its defined checks.", "Working process", "Employees can resolve exceptions through documented, authorised and tested procedures.")],
        ["The pharmacy should prepare these arrangements before introducing the system into everyday service.", null],
        ["Qasr faces the same challenge when its corporate-rate workflow identifies an arrival requiring additional approval.", dg("The shared development lesson", D.flow(["Automated|processing", "Recognised|exception", "Human|decision", "Completed|service"]), "Reliable service depends on connecting automated processing with controlled human intervention.")],
        ["The important lesson is that human work is not evidence of failed automation when the process genuinely requires judgement.", null],
        ["The failure occurs when necessary human work has no clear owner, procedure or supporting arrangement.", q("What would you test before declaring the pharmacy's complete prescription process ready for operation?")]
      ]
    },
    {
      title: "The airport baggage case nobody owned",
      lines: [
        ["Now imagine an airport introducing a baggage-tracking process intended to help employees resolve unusual baggage situations consistently.", t("When a handover becomes the problem", "An airport example reveals why responsibility, information and support must travel together.")],
        ["The tracking system records baggage movements and allows employees to check the latest available status.", null],
        ["For routine journeys, the system provides the information needed to direct baggage through the normal operating process.", dg("The normal baggage process", D.flow(["Register|baggage", "Track|movement", "Confirm|location", "Complete|handling"]), "The tracking system supports routine baggage handling when the required information remains available.")],
        ["However, imagine a passenger reporting baggage whose recorded location does not match the expected handling information.", null],
        ["The system identifies the discrepancy, but it cannot determine every action needed to resolve the situation.", iss("A recorded discrepancy does not become a resolved case merely because the tracking application displays it.", "An unresolved operating problem")],
        ["An employee must investigate the discrepancy and may need assistance from another operational department.", null],
        ["The developed process therefore requires a documented procedure explaining how responsibility passes between the relevant roles.", st("A departmental handover must transfer both responsibility and the information needed to continue the work.")],
        ["Suppose the receiving department gets a message but cannot identify which baggage record requires investigation.", null],
        ["The sending employee may believe the handover is complete, while the receiving employee cannot take meaningful action.", dg("An incomplete handover", D.flow(["Problem|identified", "Message|sent", "Missing|information", "Case|unresolved"]), "Sending a message is insufficient when the receiving role lacks the information required to investigate the case.")],
        ["This reveals why a handover should be tested as a complete operating activity rather than an isolated communication.", null],
        ["The team must verify that the receiving employee understands the issue and has authority to continue.", q("Who owns the passenger's unresolved baggage case while the departments exchange incomplete information?")],
        ["The airport should maintain an exception catalogue identifying recognised discrepancies and the appropriate handling arrangements.", null],
        ["Each entry should connect the situation with the responsible role and the procedure needed for resolution.", dg("An accountable exception procedure", D.flow(["Identify|discrepancy", "Assign|owner", "Investigate|case", "Communicate|outcome"]), "The procedure establishes ownership and ensures the completed decision reaches the employee serving the passenger.")],
        ["Employees also need a dependable support route when a case cannot be resolved through the documented procedure.", null],
        ["Otherwise, they may invent informal workarounds that produce inconsistent handling and repeated requests for assistance.", st("Support arrangements prevent unresolved exceptions from depending entirely on personal contacts or improvised communication.")],
        ["The airport must also identify who owns the rules governing baggage status and exception classification.", null],
        ["Proposed changes should follow an authorised route so different employees do not apply conflicting interpretations.", cmp("Two responsibilities", "Rule ownership", "Controls how operating rules are reviewed and changed.", "Case ownership", "Establishes who is responsible for resolving a particular exception.")],
        ["Testing should include unusual baggage cases and verify the handovers between the employees involved.", null],
        ["The developed process is not ready merely because the tracking screen displays baggage information correctly.", iss("Technical visibility does not guarantee operational resolution when responsibility and handover procedures remain unclear.", "The readiness gap")],
        ["Qasr faces a similar risk when reception identifies an unresolved corporate-rate booking requiring revenue-office intervention.", null],
        ["The process must ensure that the responsible employee receives the case and communicates the completed decision.", dg("Connecting systems and people", D.flow(["System|identifies issue", "Employee|takes ownership", "Department|resolves case", "Customer|receives service"]), "A complete operating process connects technical information with accountable human action.")],
        ["The central lesson is that reliable development includes the manual work connecting departments and resolving exceptional situations.", null],
        ["When those connections are documented and tested, employees can provide consistent service even when automation cannot finish.", q("What evidence would convince you that the airport's baggage exceptions have genuine owners rather than merely electronic records?")]
      ]
    }
  ]
},
      ] },
      { id: "l4", title: "The decision that survives go-live", sections: [
{
  title: "The cost of changing the process — and the cost of not changing it",
  sec: "W11O3d",
  lines: [
    ["Qasr Hospitality Group has explored how to develop its process, but the consequences of that choice will continue after implementation.", t("The cost of changing the process", "A development decision creates obligations that may last long after the initial project ends.")],
    ["Imagine the programme sponsor examining Vendor C's alternatives and asking which solution will remain manageable over four years.", null],
    ["The cheapest quotation looks attractive, yet the sponsor knows that purchasing technology is not the same as sustaining it.", q("What will Qasr still be paying for, maintaining or working around after the development team has finished?")],
    ["Configuration requires AED 180,000 initially and uses supported settings, which helps preserve compatibility with future product upgrades.", null],
    ["However, the revenue office must provide two additional overnight shifts each week to clear the approval queue.", dg("Configuration's continuing burden", D.flow(["Supported|configuration", "Overnight|approval", "Additional|shifts", "Recurring|work"]), "Configuration preserves supported upgrades but retains manual approval and recurring overnight staffing obligations.")],
    ["Those shifts represent an ongoing operating commitment, although the case provides no monetary estimate for their cost.", null],
    ["Qasr must therefore distinguish the known development price from the continuing expense of operating the configured process.", st("Initial development expenditure does not include every cost created by the future operating arrangement.")],
    ["Extension presents the opposite tension because AED 540,000 buys automatic agreement evaluation and stronger alignment with the approved design.", null],
    ["The rules component removes the original forty-seven-minute approval wait without requiring the additional overnight operational shifts.", dg("Extension's process advantage", D.flow(["Corporate|agreement", "Automatic|rules", "Resolved|rate", "No extra|shifts"]), "Extension preserves the intended automatic decision capability and avoids the additional overnight shifts required by configuration.")],
    ["Yet Vendor C confirms that the extension falls outside its supported upgrade paths, creating an important future dependency.", null],
    ["When the underlying product changes, Qasr may need additional technical work to preserve the extension's functionality.", iss("An unsupported extension can preserve today's process design while making future upgrades harder to manage.", "The customisation burden")],
    ["That risk does not prove extension is wrong, but it must be recognised before management accepts the commitment.", null],
    ["The team should examine future maintenance responsibilities without inventing costs that the case evidence does not provide.", st("Unsupported upgrade exposure is a known risk, while its eventual monetary cost remains uncertain.")],
    ["Changing the process offers another apparent saving, costing AED 95,000 and requiring only three weeks of development.", null],
    ["However, the standard solution resolves seventy-one percent of corporate arrivals while leaving twenty-nine percent on the old approval path.", dg("The continuing process compromise", D.flow(["Corporate|arrivals", "71%|resolved", "29%|old approval"]), "The design-change option reduces initial expenditure but leaves part of the corporate-arrival population on the previous process.")],
    ["That remaining population matters because Qasr originally redesigned corporate-rate approval to remove unnecessary waiting at arrival.", null],
    ["A cheaper system may therefore carry an enduring service compromise even when its technical maintenance remains straightforward.", iss("Supported software can still deliver an incomplete process improvement when the organisation changes its design to fit the tool.", "The cost of compromise")],
    ["Notice how the alternatives exchange different burdens rather than simply offering expensive and inexpensive versions of the same outcome.", null],
    ["Configuration retains recurring manual work, extension introduces unsupported upgrade exposure, and design change leaves incomplete process coverage.", cmp("Three different future obligations", "Operating burden", "Configuration retains overnight approval work.", "Technical and service burden", "Extension creates upgrade exposure, while design change preserves the old path for some arrivals.")],
    ["A four-year assessment helps management compare these consequences beyond the immediate development budget and delivery schedule.", null],
    ["The comparison should identify known expenditure, estimate material future obligations and state clearly where evidence remains unavailable.", dg("A four-year decision view", D.flow(["Initial|cost", "Operating|burden", "Upgrade|exposure", "Process|performance", "Decision|conditions"]), "The assessment combines known development costs with continuing obligations and the performance consequences of each route.")],
    ["Governance matters because small compromises can accumulate until the delivered process no longer resembles the approved improvement.", null],
    ["Every material deviation should therefore be recorded and accepted by a named authority responsible for the process outcome.", st("A technology-driven process deviation requires explicit justification and appropriate business approval.")],
    ["Extensions also deserve annual review because their benefits and maintenance obligations may change as Vendor C evolves.", null],
    ["Such reviews help Qasr decide whether additional functionality still justifies the responsibilities it creates.", dg("Continuing extension governance", D.flow(["Approved|extension", "Monitor|performance", "Review|annually", "Decide|future action"]), "Annual review keeps extension value, maintenance obligations and upgrade exposure visible after development.")],
    ["The strongest recommendation will explain which burden Qasr is accepting and why that trade-off remains defensible.", null],
    ["It will also protect the original process improvement unless responsible managers deliberately approve a justified alternative.", q("Which future obligation would you accept, and what evidence would you require before defending that choice?")],
    ["Our next discussion brings these considerations together in Qasr's final development-route recommendation.", t("The governing principle", "Choose the operating future deliberately, not merely the development quotation that looks cheapest today.")]
  ],
  review: [
    {
      title: "The library system that became expensive to maintain",
      lines: [
        ["Let's revisit long-term development costs through a university library replacing its electronic borrowing and reservation system.", t("The cost beyond installation", "A library illustrates how supported configuration and custom extensions create different future obligations.")],
        ["The library wants students to reserve available materials without unnecessary manual intervention from administrative employees.", null],
        ["Its selected platform supports ordinary reservations, but the approved process requires additional rules for certain borrowing situations.", dg("The library's capability gap", D.flow(["Student|reservation", "Borrowing|rules", "Required|decision"]), "The redesigned service requires rules that the standard reservation functionality does not fully provide.")],
        ["The library could configure supported settings and ask employees to handle the remaining decisions manually.", null],
        ["That approach may reduce development effort, but the recurring administrative work would continue after implementation.", st("Configuration can preserve supported upgrades while leaving ongoing manual responsibilities.")],
        ["Alternatively, the library could extend the platform with additional rules that perform the missing evaluation automatically.", null],
        ["This might improve process fit, although the library would need to investigate the vendor's support arrangements.", dg("Adding the missing rules", D.flow(["Standard|platform", "Additional|rules", "Automatic|decision"]), "An extension can preserve the intended process capability by adding functionality absent from the standard product.")],
        ["Suppose the vendor cannot guarantee that the extension will remain supported through ordinary product upgrades.", null],
        ["The library would then inherit responsibility for investigating compatibility whenever the underlying software changes.", iss("A technically successful extension may create maintenance obligations that continue beyond the original development project.", "Future upgrade exposure")],
        ["The manager should not assume those obligations are negligible merely because their exact monetary cost remains unknown.", null],
        ["Equally, the manager should not reject the extension without examining the value of removing recurring manual decisions.", q("Would you prefer lower development expenditure if library employees had to keep approving routine reservations indefinitely?")],
        ["The library could also change its reservation process to fit the standard product's existing functionality.", null],
        ["That might simplify future upgrades, but some students could remain dependent on the earlier manual arrangement.", cmp("Different development consequences", "Standard process compromise", "Simpler technology may leave some manual work unresolved.", "Additional functionality", "Stronger process fit may create continuing technical responsibilities.")],
        ["A responsible decision therefore examines both the service improvement achieved and the obligations created by each route.", null],
        ["The manager should consider initial expenditure, continuing employee effort and future software maintenance over a suitable horizon.", st("Long-term cost evaluation connects development expenditure with the operating process the organisation must sustain.")],
        ["If an extension is selected, the library should establish responsibility for reviewing its continuing value and support requirements.", null],
        ["Periodic review helps determine whether the extension remains justified as the platform and service requirements evolve.", dg("Reviewing the extension", D.flow(["Develop|capability", "Operate|service", "Review|obligations", "Decide|changes"]), "Continuing governance helps the organisation manage the value and responsibilities associated with custom functionality.")],
        ["The library example reveals why the cheapest development route cannot automatically be considered the cheapest operating solution.", null],
        ["Qasr faces the same tension between overnight staffing, unsupported extension maintenance and incomplete corporate-arrival coverage.", q("What additional evidence would you request before recommending the library's lowest-priced development alternative?")]
      ]
    },
    {
      title: "The municipal permit service that kept its old delays",
      lines: [
        ["Now consider a municipality developing an electronic permit service intended to reduce unnecessary administrative waiting.", t("The cost of preserving an old process", "A permit service shows why supported software can still create an expensive operating compromise.")],
        ["The redesigned process uses defined eligibility conditions to resolve routine permit requests without repeated manual approval.", null],
        ["However, the selected platform cannot automatically evaluate every condition included in the approved process design.", dg("The intended permit process", D.flow(["Permit|request", "Check|eligibility", "Resolve|routine case", "Handle|exception"]), "The redesigned service aims to resolve routine requests through defined rules while retaining controlled handling for genuine exceptions.")],
        ["The project team proposes changing the process so the standard platform handles requests within its existing capabilities.", null],
        ["Other requests would continue through the previous approval route because the required automatic evaluation remains unavailable.", iss("Changing the process to fit standard software may preserve delays that the redesign was intended to remove.", "An enduring service compromise")],
        ["This proposal may reduce development effort, and the municipality would retain the convenience of supported standard functionality.", null],
        ["However, the manager must examine what happens to residents whose requests remain on the old approval path.", st("A lower development cost does not establish that the approved service improvement has been fully delivered.")],
        ["The team should measure the affected request population and investigate the continuing administrative work associated with those cases.", null],
        ["Without that evidence, management cannot judge whether the process compromise is acceptable over the longer term.", dg("Understanding the compromise", D.flow(["Standard|coverage", "Remaining|requests", "Manual|approval", "Service|consequence"]), "The decision should identify which requests benefit from the new process and which retain the previous operating burden.")],
        ["The municipality could instead consider extending the platform to perform the missing eligibility evaluations automatically.", null],
        ["That option might protect the approved design but introduce development, maintenance and future upgrade responsibilities.", q("Would stronger automation justify additional technical obligations if it removed recurring approval work for residents?")],
        ["The manager must compare these consequences rather than assume either standard functionality or custom development is automatically superior.", null],
        ["A four-year view helps distinguish immediate project expenditure from continuing operational and technical responsibilities.", cmp("Two kinds of long-term cost", "Operating cost", "Employees may continue performing approvals that the redesign intended to remove.", "Technical cost", "Additional functionality may require maintenance and adaptation during future upgrades.")],
        ["The municipality should also document any proposed departure from the approved process before accepting it as the new operating arrangement.", null],
        ["A named authority should evaluate the consequences because the compromise affects service performance rather than technology alone.", st("Material process deviations require explicit business approval, even when they arise from genuine software limitations.")],
        ["If additional functionality is developed, the organisation should review its continuing value and maintenance obligations periodically.", null],
        ["That governance prevents earlier technology decisions from becoming permanent commitments without further examination.", dg("Governing the operating future", D.flow(["Assess|trade-off", "Approve|deviation", "Monitor|performance", "Review|obligations"]), "Governance connects the initial decision with continuing service performance and future responsibilities.")],
        ["The permit example demonstrates that doing less development can still leave the organisation with more work after implementation.", null],
        ["Qasr encounters the same concern when its design-change option leaves twenty-nine percent of arrivals on the old approval path.", iss("The apparent saving from standard functionality must be weighed against the unresolved population and its continuing service consequences.", "Incomplete improvement")],
        ["The best recommendation explains which compromises remain, why they are acceptable and how management will monitor their consequences.", null],
        ["That is more defensible than presenting the cheapest quotation as proof of the strongest long-term decision.", q("How would you defend the municipality's standard solution if residents continued experiencing the delays the redesign promised to remove?")]
      ]
    }
  ]
},
{
  title: "Defending Qasr's build decision",
  sec: "W11O3e",
  lines: [
    ["Qasr Hospitality Group must now defend a development choice that will shape corporate arrivals long after implementation.", t("Defending Qasr's build decision", "A credible recommendation protects the intended improvement and makes its trade-offs explicit.")],
    ["Imagine sitting beside the programme sponsor as the development team presents its recommendation for Vendor C.", null],
    ["The sponsor asks whether the proposed solution still delivers the process approved during the Innovate phase.", q("Can Qasr defend its preferred development route without ignoring what the original redesign promised?")],
    ["That question matters because the redesign sought to remove a recurring forty-seven-minute corporate-rate approval wait.", null],
    ["The approved process resolves corporate agreements overnight, allowing the rate to be settled before guests arrive.", dg("The approved process outcome", D.flow(["Corporate|agreement", "Overnight|evaluation", "Resolved|rate", "Guest|arrival"]), "The original design requires corporate-rate resolution before arrival rather than routine approval while guests wait.")],
    ["Vendor C cannot automatically evaluate those agreements through its standard workflow, so Qasr faces a genuine capability gap.", null],
    ["The decision is whether to configure the available workflow, extend its functionality or change the approved process.", st("The development decision must respond to a genuine technology limitation without silently abandoning the intended process outcome.")],
    ["Configuration costs AED 180,000 and takes six weeks, retaining supported upgrades without introducing custom code.", null],
    ["However, the revenue office must provide two additional overnight shifts each week to complete routine approvals.", dg("Configuration's operating arrangement", D.flow(["Corporate|booking", "Overnight|queue", "Revenue|approval", "Resolved|rate"]), "Configuration retains manual approval and depends on the revenue office clearing the queue before 06:00.")],
    ["This route can remove the arrival wait if employees clear the queue before 06:00, but automatic evaluation remains absent.", null],
    ["The sponsor should therefore examine whether continuing manual approval is an acceptable departure from the approved design.", iss("Configuration can improve arrival timing while preserving the manual approval dependency the redesign intended to remove.", "A conditional improvement")],
    ["Extension costs AED 540,000 and requires four months, adding rules that evaluate corporate agreements automatically.", null],
    ["It matches the approved design and removes the original wait without requiring the additional overnight operational shifts.", dg("Extension's operating arrangement", D.flow(["Corporate|booking", "Agreement|rules", "Automatic|evaluation", "Resolved|rate"]), "Extension delivers automatic agreement evaluation and preserves the intended process improvement.")],
    ["However, Vendor C confirms that the extension falls outside supported upgrade paths, creating future technical exposure.", null],
    ["The sponsor must understand that stronger process fit brings obligations whose eventual maintenance cost remains unquantified.", iss("The extension protects the process design but introduces unsupported upgrade exposure that requires explicit management acceptance.", "A technical commitment")],
    ["Changing the process costs AED 95,000 and takes three weeks, making it the fastest and least expensive alternative.", null],
    ["Its standard functionality resolves seventy-one percent of corporate arrivals, while twenty-nine percent retain the old approval path.", dg("Design change and remaining coverage", D.flow(["Corporate|arrivals", "71%|resolved", "29%|old approval"]), "The design-change option leaves bookings arriving within 24 hours on the previous approval path.")],
    ["Those remaining bookings arrive within twenty-four hours, so the intended improvement would not reach every corporate guest.", null],
    ["This compromise requires business approval because supported software does not automatically justify incomplete process coverage.", q("Would the sponsor accept a cheaper solution knowing that some guests remain exposed to the original approval problem?")],
    ["The financial comparison also needs discipline because initial quotations do not establish four-year total ownership costs.", null],
    ["Extension costs AED 360,000 more initially than configuration, but their continuing obligations have not been fully priced.", cmp("What the cost comparison establishes", "Known expenditure", "Initial development quotations allow direct comparison.", "Unresolved expenditure", "Staffing, maintenance and upgrade obligations require reliable estimates.")],
    ["Qasr also faces a January regulatory deadline seven months away, requiring work from the same delivery team.", null],
    ["The recommendation must therefore explain whether the chosen route leaves sufficient capacity for that commitment.", st("Delivery feasibility depends on the shared team's capacity, not merely the duration quoted for corporate-rate development.")],
    ["A defensible recommendation identifies its preferred route, the improvement delivered and the disadvantages management would accept.", null],
    ["It also states which cost estimates, capacity checks and approvals remain necessary before commitment.", dg("A defensible recommendation", D.flow(["Preferred|route", "Process|outcome", "Accepted|trade-offs", "Required|evidence", "Authorised|decision"]), "The recommendation must connect the selected route with process performance, known risks and conditions for approval.")],
    ["No alternative wins automatically because each creates a different combination of operational, technical and delivery consequences.", null],
    ["The strongest answer is the one Qasr can defend against its approved design and sustain over time.", q("Which route would you recommend, and what conditions would you require before the sponsor approves it?")],
    ["Our final discussion will examine what the development team must hand over before Qasr begins implementation.", t("The decision principle", "Defend the complete operating future, including what improves, what remains unresolved and what Qasr must sustain.")]
  ],
  review: [
    {
      title: "The clinic manager who challenged the cheapest proposal",
      lines: [
        ["Let's practise defending a development decision through a clinic redesigning how routine appointment requests are confirmed.", t("Defending a process decision", "A clinic manager challenges a recommendation that looks economical but may preserve unnecessary approval work.")],
        ["The approved process aims to resolve routine appointment requirements without repeated administrative approval before patients receive confirmation.", null],
        ["However, the selected application can route requests but cannot automatically evaluate every required booking condition.", dg("The clinic's capability gap", D.flow(["Appointment|request", "Required|evaluation", "Standard|workflow", "Missing|decision"]), "The application supports workflow routing but cannot perform the complete decision required by the approved design.")],
        ["The development team recommends configuration because supported settings can move approval requests to administrators earlier.", null],
        ["The manager appreciates the simpler delivery route but asks whether the original improvement will actually be achieved.", q("Does moving routine approval earlier eliminate unnecessary approval, or merely change when employees perform it?")],
        ["The team explains that configuration may reduce waiting while retaining manual decisions and their continuing workload.", null],
        ["That distinction matters because the manager approved a process improvement rather than a more convenient approval queue.", iss("An earlier manual approval can improve timing without eliminating the dependency that motivated the redesign.", "A partial solution")],
        ["An extension could instead evaluate routine conditions automatically, preserving more of the intended process design.", null],
        ["However, additional functionality may create maintenance and upgrade responsibilities that the clinic must investigate.", dg("The extension alternative", D.flow(["Booking|information", "Defined|rules", "Automatic|evaluation", "Confirmed|outcome"]), "An extension can deliver missing evaluation capability while creating additional technical responsibilities.")],
        ["The clinic could also change its process to fit the standard application and retain manual handling for some requests.", null],
        ["That might simplify development, but management must understand which patients would continue using the previous route.", cmp("Different development compromises", "Configuration", "May preserve recurring manual approval work.", "Process change", "May leave some requests outside the intended improvement.")],
        ["The manager should compare each alternative against the approved service outcome rather than select the lowest quotation automatically.", null],
        ["Initial expenditure matters, but recurring employee effort and future maintenance responsibilities also affect the decision.", st("A credible recommendation compares the process delivered with the continuing obligations required to sustain it.")],
        ["If those future costs remain unknown, the team should identify the estimates needed instead of presenting unsupported totals.", null],
        ["The recommendation should also explain whether the clinic has sufficient capacity to develop and support the chosen solution.", dg("Preparing the management case", D.flow(["Required|outcome", "Preferred|route", "Operating|consequences", "Missing|evidence", "Approval|conditions"]), "The management case should connect the recommended route with its process outcome, risks and required evidence.")],
        ["The clinic manager may approve a justified compromise, provided the decision and its consequences are explicitly documented.", null],
        ["That approval should come from someone responsible for the business process rather than from the software vendor alone.", st("Technology constraints inform the decision, but accountable managers must accept material changes to the approved process.")],
        ["Qasr faces the same challenge when choosing among configuration, extension and changing its corporate-rate design.", null],
        ["The lesson is that a defensible recommendation explains both the improvement delivered and the responsibilities it creates.", q("How would you defend the clinic's preferred route without hiding the manual work or technical obligations it retains?")]
      ]
    },
    {
      title: "The university admissions decision under competing commitments",
      lines: [
        ["Now consider a university developing an admissions service while the same technical team supports another important compliance project.", t("Defending a conditional recommendation", "An admissions decision shows why process fit, delivery capacity and unresolved costs belong together.")],
        ["The approved admissions design requires routine eligibility decisions to use defined criteria rather than repeated manual review.", null],
        ["The selected platform supports application routing but cannot automatically evaluate every condition included in the redesign.", dg("The admissions development choice", D.flow(["Approved|design", "Platform|limitation", "Compare|routes", "Choose|capability"]), "The university must choose a development response that addresses the platform's missing evaluation capability.")],
        ["An extension could preserve the intended decision process, but it would require additional development from specialist employees.", null],
        ["Those employees are also needed for the compliance project, creating a potential conflict over delivery capacity.", iss("A technically attractive extension may be difficult to justify if it threatens another important organisational commitment.", "Competing delivery demands")],
        ["The admissions manager asks whether the extension can be completed without placing the compliance work at risk.", null],
        ["The project team cannot answer confidently until it examines the shared team's availability and competing requirements.", q("Should management approve the closest process fit before establishing whether the organisation can deliver it responsibly?")],
        ["Configuration might reduce development demands by retaining manual eligibility decisions through supported workflow settings.", null],
        ["However, the university would need to understand the continuing administrative work that this arrangement creates.", dg("The configuration alternative", D.flow(["Application|received", "Supported|routing", "Manual|evaluation", "Decision|recorded"]), "Configuration can simplify technical delivery while retaining the recurring effort of manual eligibility evaluation.")],
        ["Changing the process might simplify delivery further, although some applications could remain on the previous assessment route.", null],
        ["That compromise would require explicit approval because it changes the improvement the university originally intended to deliver.", cmp("Two competing responsibilities", "Process responsibility", "Protect the intended improvement or justify any approved compromise.", "Delivery responsibility", "Ensure the selected route does not undermine other important commitments.")],
        ["The manager also asks which alternative will cost least over the longer term.", null],
        ["The team should distinguish known development expenditure from recurring administrative work and future technical maintenance.", st("Unknown future costs should be identified as uncertainties requiring evidence, not converted into unsupported financial claims.")],
        ["A conditional recommendation can explain the preferred route while identifying information needed before final commitment.", null],
        ["For example, approval might depend on confirming technical support arrangements and sufficient delivery-team capacity.", dg("A conditional decision", D.flow(["Preferred|route", "Required|evidence", "Capacity|check", "Named|approval"]), "A conditional recommendation makes unresolved evidence and approval requirements explicit before development commitments are accepted.")],
        ["The team should also explain what happens to applicants whose cases remain outside the standard automated process.", null],
        ["That question matters because a successful software implementation does not necessarily mean every applicant receives the intended improvement.", iss("A development route can meet its technical objectives while leaving an important part of the approved service improvement incomplete.", "The process-fit test")],
        ["The university should therefore present its recommendation as a management judgement supported by evidence rather than a technical preference.", null],
        ["Qasr needs the same discipline because its development choice competes with a January regulatory commitment.", st("A defensible recommendation protects the process outcome while acknowledging delivery constraints and continuing obligations.")],
        ["The strongest answer does not pretend that every uncertainty has disappeared or that one route has no disadvantages.", null],
        ["It explains which trade-offs are acceptable, why they matter and what management must verify before approval.", q("How would you defend the university's development choice while protecting both the admissions redesign and the compliance commitment?")]
      ]
    }
  ]
},
{
  title: "From Develop to Implement — and your forum",
  sec: "W11O3f",
  lines: [
    ["Qasr Hospitality Group has examined its development choices, and now we must consider what operations will actually receive.", t("From Develop to Implement", "A developed capability must be ready for people to operate before implementation begins.")],
    ["Imagine the programme sponsor asking whether the corporate-rate process is ready to move beyond development.", null],
    ["The answer cannot depend only on whether Vendor C performs its required software functions.", q("What must Qasr hand over so employees can operate the redesigned process reliably?")],
    ["Develop must provide tested systems, business rules, interfaces and procedures that support the approved operating design.", null],
    ["These components matter because a successful transaction means little if other arrivals remain unresolved.", dg("The developed operating capability", D.flow(["Working|systems", "Business|rules", "Manual|procedures", "Tested|handovers"]), "Develop prepares the technical and human arrangements required to operate the redesigned process.")],
    ["Qasr also needs an exception catalogue describing recognised situations that cannot follow normal corporate-rate processing.", null],
    ["Each entry should explain the required response, responsible role and authority needed to complete the case.", st("An exception catalogue connects unusual operating situations with documented handling procedures and accountable decision-makers.")],
    ["This becomes especially important when corporate bookings require clarification beyond the standard agreement-evaluation route.", null],
    ["Without clear ownership, reception and revenue employees could exchange requests while the guest continues waiting.", iss("An unresolved exception can recreate the original approval delay when nobody owns the decision or handover.", "The operational readiness risk")],
    ["The handover must therefore identify who receives the case and how the completed decision reaches reception.", null],
    ["Testing should establish that employees can follow this route under realistic conditions rather than merely describe it.", dg("A tested exception handover", D.flow(["Reception|identifies issue", "Revenue|receives case", "Authorised|decision", "Reception|continues"]), "A complete handover transfers responsibility and information until the guest-service activity can continue.")],
    ["Business rules also require named owners because operating requirements and approved decisions may change after implementation.", null],
    ["A rule owner provides accountability, while an authorised change route prevents informal modifications from undermining the process.", st("Rule ownership and change control protect the approved process as operating requirements evolve.")],
    ["Employees also need dependable support arrangements when documented procedures cannot resolve an unfamiliar operating problem.", null],
    ["These arrangements should be prepared before go-live, because improvisation during guest service creates unnecessary risk.", q("Would you consider Qasr ready if the software worked but employees lacked support for unresolved arrivals?")],
    ["Now we can distinguish the Develop phase from Implement without confusing their responsibilities.", null],
    ["Develop builds and tests the capability, while Implement introduces that prepared capability into everyday organisational operations.", cmp("Two connected framework phases", "Develop", "Builds and tests systems, rules, procedures and operating arrangements.", "Implement", "Introduces the developed process into actual operations.")],
    ["This distinction matters because technical completion does not establish that deployment has succeeded or benefits have been realised.", null],
    ["Qasr must carry credible testing evidence and clear operating responsibilities into the next phase.", dg("The framework handover", D.flow(["Approved|design", "Developed|capability", "Operational|handover", "Implement|process"]), "The tested capability moves from Develop into Implement without treating preparation as completed deployment.")],
    ["Our Week 12 challenge will involve implementing the process across fourteen properties without disrupting existing operations.", null],
    ["That wider deployment requires confidence that the developed process can support both routine arrivals and recognised exceptions.", iss("A weakness left unresolved during Develop can become a wider operational problem when implementation reaches multiple properties.", "The risk of scaling defects")],
    ["Before moving forward, you will apply this reasoning independently through the discussion forum called Automating the Exception.", null],
    ["The forum presents an unfamiliar organisation, so you must examine its evidence rather than simply repeat Qasr's circumstances.", t("Discussion forum", "Automating the Exception: make and defend a development decision for an unfamiliar organisation.")],
    ["Your task is to defend a configure-or-customise position while considering whether the exception itself should remain.", null],
    ["A convincing response explains the process outcome, acknowledges trade-offs and supports its reasoning using Jeston Chapter 19.", st("A strong forum contribution defends a build decision through process reasoning and evidence rather than software preference alone.")],
    ["Post your substantive response by mid-week, then engage critically with at least two classmates' contributions.", null],
    ["Challenge or extend their reasoning rather than merely agreeing, and read the facilitator's summary at week's end.", q("Can you challenge another recommendation respectfully by identifying a process consequence its author has overlooked?")],
    ["The forum is formative, and its participation contributes to Assessment Four in Week 14.", null],
    ["As we close, remember that successful development protects the process improvement while preparing people to operate it.", dg("The Week 11 decision", D.flow(["Protect|design", "Develop|capability", "Test|exceptions", "Prepare|handover"]), "The Develop phase connects the approved improvement with a tested capability ready for implementation.")],
    ["Next week, Qasr must introduce that capability across fourteen properties, where operational consistency becomes the central challenge.", t("Looking ahead to Week 12", "Implementing the developed process across fourteen properties without disrupting existing operations.")]
  ],
  review: [
    {
      title: "The university certificate service ready for handover",
      lines: [
        ["Let's revisit the Develop handover through a university preparing an electronic certificate service for graduating students.", t("Preparing a complete operational handover", "A university service shows why working software is only one part of readiness.")],
        ["The university has developed an application that receives certificate requests and checks available academic eligibility information.", null],
        ["During routine testing, the application processes complete student records and returns the expected decisions.", dg("The routine certificate process", D.flow(["Student|request", "Academic|verification", "Eligibility|decision", "Certificate|release"]), "The electronic service supports routine requests when the required academic information is available.")],
        ["However, some academic records cannot be verified through the normal electronic route and require administrative investigation.", null],
        ["The university must prepare procedures explaining who investigates those records and who can authorise their resolution.", iss("A functioning application does not establish readiness when unresolved academic records lack an accountable handling route.", "The incomplete handover")],
        ["An exception catalogue should describe recognised verification problems and connect them with the appropriate administrative procedures.", null],
        ["Employees need this guidance because they cannot provide consistent service by inventing a response whenever an unusual record appears.", st("Exception catalogues make recognised problems manageable through documented procedures and clear responsibility.")],
        ["The university should also identify the owner responsible for reviewing changes to its academic eligibility rules.", null],
        ["Without that ownership, informal rule adjustments could produce inconsistent certificate decisions across administrative departments.", dg("Controlling eligibility rules", D.flow(["Proposed|rule change", "Named|owner", "Authorised|decision", "Updated|procedure"]), "Rule ownership ensures that changes to eligibility requirements follow an accountable and documented route.")],
        ["The development team must test departmental handovers using records that previously caused difficulties.", null],
        ["That testing establishes whether employees receive the information and authority needed to complete unresolved requests.", q("Would the certificate service be ready if departments could exchange messages but nobody could finish an unusual case?")],
        ["Employees also need support arrangements for problems that fall outside the documented exception procedures.", null],
        ["These arrangements should be established before implementation because students should not experience preventable administrative confusion.", st("Operational readiness includes tested procedures, accountable decisions and dependable support alongside functioning technology.")],
        ["Once those components are prepared, the university can hand the developed capability to the implementation team.", null],
        ["That handover does not prove successful deployment because introducing the service into everyday operations remains a separate responsibility.", cmp("Development and implementation", "Develop", "Prepares and tests the certificate service and its operating arrangements.", "Implement", "Introduces the prepared service into everyday university operations.")],
        ["The implementation team should receive the tested procedures and evidence needed to understand how the service operates.", null],
        ["Otherwise, the university risks discovering unresolved responsibilities only after students begin using the new process.", dg("A complete handover", D.flow(["Tested|systems", "Exception|procedures", "Rule|ownership", "Operational|support"]), "The developed service must include the technical and human arrangements needed for reliable operation.")],
        ["The university example reinforces the same principle guiding Qasr's transition from Develop to Implement.", null],
        ["A process is ready for handover when its complete operating capability has been developed and credibly tested.", q("What evidence would you request before allowing the university to introduce its certificate service to students?")]
      ]
    },
    {
      title: "The distribution warehouse preparing to go live",
      lines: [
        ["Now imagine a distribution warehouse preparing to introduce a redesigned order-picking process across its operating locations.", t("From a tested design to everyday operation", "A warehouse illustrates why implementation depends on the quality of the developed operating capability.")],
        ["The redesigned process uses product-location information to guide employees toward the items required for customer orders.", null],
        ["The development team has prepared the supporting system and confirmed that ordinary orders can be processed correctly.", dg("The developed picking process", D.flow(["Customer|order", "Location|information", "Collect|items", "Prepare|dispatch"]), "The system supports routine order preparation by providing the information needed to locate products.")],
        ["However, imagine an employee discovering that the recorded location does not match where an item can actually be found.", null],
        ["The software identifies the discrepancy, but someone must investigate it before the order can be completed.", iss("A recorded discrepancy remains an operating problem until an authorised employee can resolve it.", "The unresolved exception")],
        ["The warehouse therefore needs a documented exception procedure identifying who investigates missing or incorrectly located products.", null],
        ["That procedure should explain how responsibility transfers and how the corrected information reaches the employee preparing the order.", st("A complete exception procedure connects the recognised problem with an owner, an authorised response and a usable outcome.")],
        ["The team should maintain an exception catalogue covering the unusual situations employees are likely to encounter.", null],
        ["It should also identify who owns the rules governing product-location updates and changes to picking procedures.", dg("Preparing operational control", D.flow(["Recognised|exception", "Assigned|owner", "Approved|correction", "Updated|information"]), "Documented exception handling and rule ownership keep operating decisions consistent across the warehouse.")],
        ["These arrangements matter because local workarounds can spread when employees lack clear instructions or dependable support.", null],
        ["Different locations might then perform the same work differently despite using identical software.", q("Would a common application guarantee consistent warehouse operations if employees followed different undocumented exception procedures?")],
        ["Before implementation, employees should test difficult orders and the handovers needed to resolve location discrepancies.", null],
        ["Testing should reveal whether the system, manual procedures and responsible roles operate together under realistic conditions.", cmp("Two readiness questions", "Does the technology work?", "The application provides the required information and supports routine processing.", "Can people operate the process?", "Employees can resolve exceptions, complete handovers and obtain support.")],
        ["The development team should record defects and correct material weaknesses before preparing the operational handover.", null],
        ["The implementation team then receives a tested capability rather than an application whose practical procedures remain unfinished.", st("Develop prepares and tests the operating capability; Implement introduces that capability into actual operations.")],
        ["Introducing the process across several locations creates an additional challenge because operational weaknesses may affect more employees.", null],
        ["That makes consistent procedures and clear support arrangements especially important before wider deployment begins.", dg("Preparing for wider implementation", D.flow(["Tested|capability", "Documented|procedures", "Operational|handover", "Wider|deployment"]), "Reliable implementation depends on receiving a developed capability with consistent procedures and tested exception handling.")],
        ["The warehouse should not assume that successful development means the new process has already delivered its intended benefits.", null],
        ["Those outcomes depend on what happens when the capability is introduced and used in everyday operations.", iss("Technical completion is not evidence of successful deployment or realised operational benefits.", "A framework boundary")],
        ["Qasr faces the same transition as it prepares to implement its corporate-rate process across fourteen properties.", null],
        ["Its next challenge is to preserve the intended improvement while introducing consistent operating arrangements across those properties.", q("What would you insist on receiving from the warehouse development team before approving wider implementation?")]
      ]
    }
  ]
},
      ] },
    ]
  };
  // Claude review fixes (original line indices): sentence replacements, then removals in descending order.
  const FIX = [["W11O3b",-1,11,"Unlike configuration, extension matches the approved phase five design exactly and removes the forty-seven-minute wait without depending on an overnight queue."]];
  const CUT = [];
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
