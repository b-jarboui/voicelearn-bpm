// W11-bank
//
// OPER621 Week 11 - The Develop Phase. Question bank, 12 items per part.
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



// W11O1a · From a process design to an operating capability
// Correct answers are written first; the bank player shuffles options.
 
M("W11O1a-01", "W11O1a", 1, "What is the main purpose of the Develop phase in the BPM framework?",
  ["Turn the approved process design into a tested operational capability that people can use", "Investigate how the existing process performs before identifying its underlying problems", "Develop alternative future process designs without preparing them for operation", "Demonstrate that the redesigned process has already delivered its expected benefits"],
  "Develop translates the approved design into working systems, business rules, interfaces, manual procedures and tested operating arrangements. Its purpose is to prepare a usable process for implementation, not to repeat earlier analysis or claim benefits that have not yet been achieved.");
 
M("W11O1a-02", "W11O1a", 2, "Qasr has approved a redesigned corporate-rate process, but employees still cannot resolve some arrivals without informal clarification. What should the Develop team do?",
  ["Develop the required rules, system connections and manual exception procedures before declaring the capability ready", "Approve the existing process diagram because the intended corporate-rate arrangement has already been designed", "Transfer the unresolved arrivals directly to Implement because operational exceptions are outside Develop", "Remove the unresolved arrivals from testing because the normal corporate-rate workflow is already functioning"],
  "An approved design does not establish that employees can operate the complete process. Develop must make the rules, interfaces and exception procedures usable, then test them under realistic conditions. Excluding difficult arrivals would leave a known operational weakness unresolved.");
 
TF("W11O1a-03", "W11O1a", 1, "Develop is phase seven of the ten-phase BPM framework, following Innovate and People and preceding Implement.", true,
  "This statement is true. Innovate establishes the future process design, and People addresses the responsibilities needed to support it. Develop prepares and tests the operational capability before Implement introduces the process into everyday operations.");
 
TF("W11O1a-04", "W11O1a", 2, "If Qasr's new corporate-rate software works during a demonstration, the Develop phase can be considered complete even when manual exception procedures remain undocumented.", false,
  "This statement is false. A successful software demonstration establishes only that the demonstrated functions operate under those conditions. Develop must also prepare manual procedures, exception paths, responsibilities and credible testing evidence so the complete process can operate beyond uncomplicated cases.");
 
DR("W11O1a-05", "W11O1a", 1, "The {1} phase establishes how the improved process should operate, while the {2} phase builds and tests the capability needed to perform that design.",
  [["Innovate", "Implement", "Realize Value"], ["Develop", "Understand", "Launch Pad"]],
  "Innovate develops the intended future process design. Develop translates that approved design into systems, rules, interfaces and procedures that can be tested before the organisation moves into implementation.");
 
DR("W11O1a-06", "W11O1a", 3, "Qasr's system exchanges corporate-agreement information through {1}. When the normal evaluation cannot be completed, employees need a documented {2} to resolve the case.", [["an interface", "a baseline", "a benefits target"], ["exception path", "process architecture", "strategic objective"]], "An interface connects systems so they can exchange the information a process needs. An exception path defines how cases outside normal processing are handled. Both are development responsibilities, because a usable process must support routine work and cases that need extra intervention.");
 
V("W11O1a-07", "W11O1a", 2, "Which diagram correctly identifies the Develop phase in the ten-phase BPM framework?", [
  [D.route([6]), "Develop is highlighted as phase seven of the BPM framework"],
  [D.route([5]), "People is highlighted as the phase currently being investigated"],
  [D.route([7]), "Implement is highlighted as the phase currently being investigated"],
  [D.route([4]), "Innovate is highlighted as the phase currently being investigated"]
], "Develop occupies phase seven of the ten-phase framework. It follows Innovate and People because the future process design and associated responsibilities must inform development. Implement follows Develop because the prepared capability must then be introduced into operations.");
 
V("W11O1a-08", "W11O1a", 3, "Which diagram best represents the work Qasr must complete before its redesigned corporate-rate process is ready for implementation?", [
  [D.flow(["Approved|process design", "Develop|systems and rules", "Prepare|manual exceptions", "Test|realistic cases", "Handover|capability"]), "Build the required systems and rules, prepare exception procedures, test realistic cases and hand over the developed capability"],
  [D.flow(["Approved|process design", "Demonstrate|standard workflow", "Declare|ready"]), "Treat a successful demonstration of the standard workflow as sufficient evidence of readiness"],
  [D.flow(["Approved|process design", "Install|software", "Ignore|exceptions", "Declare|complete"]), "Install the software and leave exception handling unresolved"],
  [D.flow(["Approved|process design", "Deploy|immediately", "Discover|problems", "Write|procedures"]), "Introduce the process before developing its manual procedures and testing arrangements"]
], "A defensible Develop phase prepares the complete operating capability before implementation. Qasr needs working systems, business rules, manual exception procedures and evidence from realistic testing. The alternative diagrams either omit essential development work or postpone it until after deployment.");
 
OR("W11O1a-09", "W11O1a", 2, "Put these activities in the logical order for turning Qasr's approved corporate-rate design into a capability ready for implementation.",
  ["Confirm the approved corporate-rate process design and the responsibilities established during People", "Develop the systems, interfaces and business rules needed to support the design", "Prepare manual procedures and exception paths for situations outside normal processing", "Test routine and difficult cases with the employees who will perform the work", "Resolve identified defects and prepare the developed capability for operational handover"],
  "Development begins with the approved design and the responsibilities already established. The team then prepares the technical and manual operating arrangements before testing them against realistic cases. Identified defects must be addressed so the capability handed to Implement is supported by credible operational evidence.");
 
OR("W11O1a-10", "W11O1a", 3, "Put these BPM activities in the framework sequence that takes Qasr from understanding its current process to operating an improved one.",
  ["Investigate the existing guest arrival process during Understand", "Develop the improved corporate-rate process design during Innovate", "Establish the responsibilities supporting the redesigned process during People", "Build and test the required operating capability during Develop", "Introduce the developed process into operations during Implement"],
  "Understand establishes evidence about current operations, while Innovate develops the future design. People addresses the responsibilities needed to support that design. Develop builds and tests the operational capability, and Implement introduces it into everyday work. These phases have connected but distinct purposes.");
 
MA("W11O1a-11", "W11O1a", 2, "Match each Develop component to its contribution to Qasr's redesigned corporate-rate process.",
  [["System interface", "Exchanges the information required between connected systems"], ["Business rule", "Specifies how a corporate-rate decision should be made under defined conditions"], ["Manual procedure", "Explains how employees perform work that software does not complete"], ["Exception path", "Defines how a case outside normal processing should be resolved"]],
  "System interfaces support information exchange, while business rules determine how defined decisions are made. Manual procedures explain the work employees must perform, and exception paths provide an agreed response when normal processing cannot finish. Together, these components help make the redesigned process operational.");
 
MA("W11O1a-12", "W11O1a", 3, "Match each Qasr development situation to the most defensible management response.",
  [["The vendor demonstrates a successful routine corporate arrival", "Test historical failures and difficult cases before accepting operational readiness"], ["A corporate agreement cannot be evaluated through the normal system route", "Provide a documented exception procedure with clear responsibility and authority"], ["Employees discover that a departmental handover does not work as designed", "Record the defect and correct the operating arrangement before implementation"], ["The developed solution passes realistic testing and its procedures are ready", "Prepare the operational handover to the Implement phase"]],
  "A successful routine demonstration does not establish that the complete process is ready. Qasr must test difficult cases, provide authorised exception handling and resolve defects affecting departmental handovers. Once the operating arrangements are adequately developed and tested, the capability can be handed to Implement without confusing technical completion with successful deployment.");

// W11O1b · Four ways to deliver the same capability
// Correct answers are written first; the bank player shuffles options.
 
M("W11O1b-01", "W11O1b", 1, "Qasr needs a routine administrative function that an existing product already performs satisfactorily. Which development route is most appropriate?",
  ["Buy the standard capability without unnecessary modification", "Build a unique application to reproduce the existing functionality", "Extend the product even though no additional capability is required", "Redesign the administrative process solely to justify custom development"],
  "Buying standard is appropriate when an existing product already satisfies the required capability. Creating unnecessary custom functionality would increase development and maintenance responsibilities without providing a meaningful process advantage.");
 
M("W11O1b-02", "W11O1b", 2, "Vendor C can route corporate-rate approvals, but its standard workflow cannot evaluate corporate agreements automatically. What does this limitation demonstrate?",
  ["The standard product only partially fits Qasr's approved process design", "The approved process can be delivered completely through ordinary approval routing", "The Develop phase should abandon the original corporate-rate improvement", "The missing decision capability proves that Qasr must build an entirely new system"],
  "Vendor C supports approval routing but cannot automatically evaluate the corporate agreement as the redesigned process requires. This is a partial process fit. Qasr must examine the available development routes rather than assume that routing alone delivers the intended improvement or that an entirely new system is necessary.");
 
TF("W11O1b-03", "W11O1b", 1, "Configuration adjusts functionality through supported product settings without requiring changes to the underlying software code.", true,
  "This statement is true. Configuration uses options already supported by the product, such as available workflow settings or responsibility assignments. It differs from extension, which adds functionality beyond what the standard product provides.");
 
TF("W11O1b-04", "W11O1b", 2, "Because custom building offers greater control over functionality, it is automatically the best development route for every strategically important process.", false,
  "This statement is false. Custom building offers control but also creates responsibility for development, testing, maintenance and future changes. Even strategically important processes may contain capabilities that standard products can support effectively. The development route should be selected for each capability according to its requirements and long-term consequences.");
 
DR("W11O1b-05", "W11O1b", 1, "When Qasr changes supported approval-routing settings without adding new software functionality, it is using {1}. When it adds a rules component that the standard product does not provide, it is using {2}.",
  [["configuration", "custom building", "process architecture"], ["extension", "standard purchasing", "benefits realisation"]],
  "Configuration adapts existing functionality through supported settings. Extension adds capabilities beyond those supplied by the standard product. The distinction matters because extensions may create additional maintenance obligations and upgrade risks.");
 
DR("W11O1b-06", "W11O1b", 3, "A development route should be evaluated against the capability's {1} and the organisation's ability to manage its {2}.",
  [["strategic importance", "screen appearance", "vendor demonstration length"], ["long-term maintenance and upgrade obligations", "original process documentation alone", "number of available software menus"]],
  "The strategic importance of a capability helps determine whether additional control or differentiation is justified. Long-term maintenance and upgrade obligations affect whether the chosen solution remains sustainable. A development decision must therefore consider more than immediate functionality or delivery convenience.");
 
V("W11O1b-07", "W11O1b", 2, "Which diagram best represents configuration rather than extension or custom building?", [
  [D.flow(["Standard|product", "Supported|settings", "Configured|workflow"]), "The organisation adapts the existing product using functionality and settings already supported by the vendor"],
  [D.flow(["Standard|product", "Additional|code", "New|capability"]), "The organisation adds software functionality that the standard product does not provide"],
  [D.flow(["Business|requirement", "Custom|development", "Owned|application"]), "The organisation develops a separate application to satisfy its particular requirements"],
  [D.flow(["Existing|product", "Unchanged|functionality", "Standard|operation"]), "The organisation adopts the existing product without configuring its functionality"]
], "Configuration changes supported settings while retaining the product's underlying functionality. Adding new code represents extension, developing a separate application represents custom building, and adopting unchanged functionality represents buying standard.");
 
V("W11O1b-08", "W11O1b", 3, "Qasr must choose how to deliver a capability that its selected product only partly supports. Which diagram shows the most defensible decision approach?", [
  [D.flow(["Required|capability", "Assess|product fit", "Compare|delivery routes", "Review|future obligations", "Choose|route"]), "Evaluate the required capability, available functionality, development alternatives and long-term responsibilities before deciding"],
  [D.flow(["Vendor|demonstration", "Accept|standard product", "Change|approved design"]), "Accept the demonstrated product and change the approved process without evaluating the consequences"],
  [D.flow(["Missing|functionality", "Build|custom solution", "Ignore|maintenance"]), "Treat every missing function as justification for custom development without examining future responsibilities"],
  [D.flow(["Lowest|initial cost", "Select|route", "Review|process fit later"]), "Choose the cheapest initial option and postpone consideration of whether it delivers the required process"]
], "A defensible development decision begins with the capability the process actually requires. The team then evaluates product fit, available development routes and future maintenance or upgrade obligations. Selecting technology before examining process fit can undermine the approved redesign.");
 
OR("W11O1b-09", "W11O1b", 2, "Put these activities in the logical order for choosing a development route for Qasr's corporate-rate capability.",
  ["Clarify the capability required by the approved corporate-rate process", "Examine which parts of that capability Vendor C already supports", "Identify the remaining gaps between standard functionality and the required process", "Compare suitable development routes and their long-term consequences", "Select and justify the route that best supports the required outcome"],
  "The approved process establishes what the technology must accomplish. Qasr should then assess existing functionality and identify genuine gaps before comparing development routes. This sequence prevents the software's limitations from silently determining the process design.");
 
OR("W11O1b-10", "W11O1b", 3, "Qasr is considering additional functionality for Vendor C. Put these management checks in the logical order before committing to an extension.",
  ["Confirm that the approved process requires functionality absent from the standard product", "Check whether supported configuration can satisfy the requirement", "Define the additional capability that an extension would provide", "Investigate vendor support, maintenance and future upgrade consequences", "Decide whether the improved process fit justifies the additional obligations"],
  "An extension should address a genuine capability gap rather than duplicate functionality already available through supported settings. Once the missing capability is defined, Qasr must examine vendor support and future obligations. The final decision should balance the value of preserving the process design against the responsibilities created by the extension.");
 
MA("W11O1b-11", "W11O1b", 2, "Match each development route to the situation it most directly describes.",
  [["Buy standard", "Qasr adopts an existing capability largely as supplied because it already meets the requirement"], ["Configure", "Qasr adjusts supported workflow settings without changing the underlying product code"], ["Extend", "Qasr adds a rules component that provides functionality absent from the standard product"], ["Build", "Qasr develops custom functionality and accepts responsibility for sustaining it"]],
  "Buying standard uses existing functionality largely unchanged. Configuration adapts supported settings, while extension adds functionality beyond the standard product. Custom building gives the organisation greater control but also creates responsibility for developing and maintaining the resulting capability.");
 
MA("W11O1b-12", "W11O1b", 3, "Match each development consideration to the management implication Qasr should recognise.",
  [["A routine supporting capability already meets its requirements through standard software", "Avoid unnecessary custom development that adds maintenance without meaningful differentiation"], ["A capability directly supports Qasr's distinctive guest experience", "Examine whether stronger process fit justifies additional development and control"], ["An extension falls outside the vendor's supported upgrade arrangements", "Account for future maintenance and upgrade exposure before approving the extension"], ["A supported configuration can deliver the required outcome", "Prefer the reversible supported adjustment when it avoids unnecessary technical complexity"]],
  "Development routes should reflect the strategic role of each capability and the obligations associated with delivering it. Standard functionality can be appropriate for ordinary requirements, while distinctive capabilities may justify additional control. Unsupported extensions create future exposure, and supported configuration can preserve flexibility when it satisfies the approved process.");

// W11O1c · When the software starts changing the design
// Correct answers are written first; the bank player shuffles options.
 
M("W11O1c-01", "W11O1c", 1, "Vendor C cannot automatically evaluate Qasr's corporate agreements. What should the development team recognise before changing the approved process?",
  ["The missing functionality is a technical constraint, but accepting a different process is a management decision", "The missing functionality automatically authorises the vendor to change the approved process", "The approved process must be abandoned whenever the selected software cannot reproduce it", "The technical limitation proves that the original corporate-rate improvement was unnecessary"],
  "Vendor C's inability to evaluate corporate agreements automatically is a genuine technical constraint. However, deciding whether to configure, extend or change the process requires management judgement. A software limitation does not automatically authorise abandoning an approved business improvement.");
 
M("W11O1c-02", "W11O1c", 2, "Qasr's developers propose retaining routine human approval because Vendor C cannot evaluate corporate agreements automatically. What is the main risk of accepting this proposal without further examination?",
  ["Qasr may recreate the approval delay that its redesigned process was intended to eliminate", "Qasr will necessarily lose the ability to record corporate agreements in its information systems", "Qasr will automatically become responsible for maintaining unsupported custom software", "Qasr will be unable to assign employees responsibility for handling unusual corporate arrivals"],
  "The approved redesign aims to resolve corporate rates overnight and remove the recurring arrival wait. Retaining unnecessary human approval could preserve the underlying problem even if the new software operates correctly. Qasr must examine whether the proposed compromise protects the intended process outcome.");
 
TF("W11O1c-03", "W11O1c", 1, "Design drift can occur when individually small technology-driven concessions gradually move the delivered process away from its approved design.", true,
  "This statement is true. Design drift describes the gradual departure from an approved process through accumulated changes or compromises. Each concession may appear manageable, but their combined effect can undermine the improvement the organisation originally intended to achieve.");
 
TF("W11O1c-04", "W11O1c", 2, "Once a software vendor confirms that a feature is unavailable, the development team may change the approved process without recording the deviation or obtaining business approval.", false,
  "This statement is false. A vendor can establish that particular functionality is unavailable, but the resulting process decision belongs to the organisation. Proposed deviations should be documented, their operational consequences assessed and approval obtained from a named authority responsible for the process design.");
 
DR("W11O1c-05", "W11O1c", 1, "When several small software compromises gradually change Qasr's approved process without a deliberate redesign decision, the organisation is experiencing {1}. The proposed changes should be recorded as design {2}.",
  [["design drift", "benefits realisation", "process classification"], ["deviations", "baselines", "interfaces"]],
  "Design drift occurs when accumulated concessions move the delivered process away from its approved design. Recording deviations makes those changes visible and allows responsible managers to examine their consequences before accepting them.");
 
DR("W11O1c-06", "W11O1c", 3, "Before approving a technology-driven change, Qasr should assess its effect on the {1} and examine the resulting costs and obligations over a {2}.",
  [["approved process outcome", "vendor demonstration schedule", "appearance of the software interface"], ["four-year horizon", "single demonstration session", "period ending when development finishes"]],
  "The approved process outcome provides the reference against which a proposed compromise should be judged. A four-year perspective helps reveal recurring operational costs, maintenance obligations and upgrade exposure that may not be apparent from the initial development cost.");
 
V("W11O1c-07", "W11O1c", 2, "Which diagram best represents a governed response when Vendor C cannot automatically evaluate Qasr's corporate agreements?", [
  [D.flow(["Approved|design", "Technology|constraint", "Assess|consequences", "Authorised|decision"]), "Compare the technical limitation with the approved design, assess its consequences and obtain an authorised decision"],
  [D.flow(["Technology|constraint", "Vendor|preference", "Change|process"]), "Allow the vendor's preferred workaround to determine the process without evaluating its consequences"],
  [D.flow(["Approved|design", "Missing|functionality", "Abandon|improvement"]), "Treat missing standard functionality as sufficient reason to abandon the approved improvement"],
  [D.flow(["Technology|constraint", "Informal|workaround", "Deploy|solution"]), "Introduce an informal workaround without documenting or approving the resulting process change"]
], "A governed development decision begins with the approved design and the identified technology constraint. The team must assess the operational consequences of available responses before an authorised decision is made. Vendor preferences and informal workarounds cannot replace business approval.");
 
V("W11O1c-08", "W11O1c", 3, "Qasr is considering a cheaper development route that would preserve some manual approval work. Which diagram best represents the information needed for a defensible deviation decision?", [
  [D.flow(["Original|requirement", "Proposed|change", "Operational|impact", "Named|approval"]), "Document the original requirement, proposed deviation, operational consequences and responsible approval authority"],
  [D.flow(["Initial|price", "Lowest|quotation", "Immediate|approval"]), "Choose the lowest initial development price without examining the effect on the approved process"],
  [D.flow(["Vendor|limitation", "Developer|workaround", "Automatic|acceptance"]), "Allow the development team to accept a workaround solely because the vendor reports a limitation"],
  [D.flow(["Proposed|change", "Deploy|solution", "Review|impact later"]), "Introduce the changed process and investigate its operational consequences only after deployment"]
], "A defensible deviation record connects the approved requirement with the proposed change and its operational consequences. It must also identify the authority responsible for accepting the trade-off. This prevents technical convenience from silently replacing an approved business decision.");
 
OR("W11O1c-09", "W11O1c", 2, "Put these activities in the logical order for managing a proposed technology-driven deviation from Qasr's approved corporate-rate process.",
  ["Identify the approved process requirement affected by the software limitation", "Describe the proposed deviation from that requirement", "Assess the deviation's operational consequences and effects on intended improvements", "Record the proposed change and obtain approval from the responsible authority", "Develop and test the authorised operating arrangement"],
  "The approved requirement establishes what the organisation intended to achieve. The team must then explain the proposed deviation and assess its consequences before obtaining authorisation. Development and testing should follow the authorised decision rather than turn an informal workaround into an accepted process change.");
 
OR("W11O1c-10", "W11O1c", 3, "Qasr is considering an extension that preserves automatic corporate-rate evaluation. Put these governance activities in the logical order from the development decision to continuing oversight.",
  ["Confirm that the extension addresses a genuine gap in the approved process capability", "Assess the extension's development cost and vendor upgrade support", "Compare its four-year obligations with the consequences of alternative routes", "Record the justification and obtain the appropriate development approval", "Review the extension annually to determine whether its benefits still justify its obligations"],
  "An extension should address a genuine capability gap rather than add unnecessary complexity. Before approval, Qasr must assess immediate costs, vendor support and longer-term obligations. Annual review remains important because maintenance requirements, upgrade exposure and the value of custom functionality can change after development.");
 
MA("W11O1c-11", "W11O1c", 2, "Match each situation in Qasr's development programme to the governance concept it illustrates.",
  [["Vendor C cannot automatically evaluate corporate agreements", "A technical constraint that requires examination of the available responses"], ["Several minor software compromises gradually alter the approved process", "Design drift that may undermine the intended improvement"], ["The team documents a proposed change and its operational consequences", "A design deviation record that makes the trade-off visible"], ["A named authority accepts a justified change to the approved process", "An authorised management decision about the process outcome"]],
  "A technical constraint describes a limitation in available functionality. Design drift occurs when accumulated concessions change the approved process. Deviation records make proposed compromises visible, while named approval establishes accountability for accepting their business consequences.");
 
MA("W11O1c-12", "W11O1c", 3, "Match each concern raised during Qasr's development decision to the management response it requires.",
  [["A cheaper solution may preserve the original corporate-rate approval delay", "Evaluate whether the compromise undermines the improvement established during process redesign"], ["A proposed workaround creates recurring overnight staffing obligations", "Include the continuing operating burden in the four-year assessment"], ["An extension falls outside the vendor's supported upgrade arrangements", "Assess future maintenance and upgrade exposure before accepting the extension"], ["Several approved extensions remain in operation after implementation", "Review their continuing value and obligations annually"]],
  "Development governance must protect the intended process outcome while recognising long-term consequences. Preserving unnecessary approval work can undermine the redesign, recurring staffing creates ongoing costs, and unsupported extensions increase upgrade exposure. Annual review helps ensure that extensions remain justified as operating conditions and technology change.");

// W11O3a · Vendor C fits — but not quite
// Correct answers are written first; the bank player shuffles options.
 
M("W11O3a-01", "W11O3a", 1, "Qasr selected Vendor C partly because it offers relatively inexpensive changes after go-live and opportunities to train internal staff. What must the Develop team still establish?",
  ["Whether Vendor C can deliver the capabilities required by Qasr's approved corporate-rate process", "Whether Vendor C can demonstrate any functioning workflow, regardless of its purpose", "Whether the vendor's attractive characteristics justify abandoning the approved process design", "Whether the original corporate-rate approval delay can be excluded from the development requirements"],
  "Vendor C offers useful characteristics, including relatively inexpensive changes after go-live and opportunities to develop internal capability. However, selecting a promising product does not establish complete process fit. The team must still determine whether its functionality supports the intended corporate-rate improvement.");
 
M("W11O3a-02", "W11O3a", 2, "Vendor C can request corporate-rate approval and keep the case open, but it cannot automatically evaluate the agreement. What is the most accurate interpretation?",
  ["Vendor C supports approval routing but lacks the automatic decision capability required by Qasr's redesign", "Vendor C fully supports the redesigned process because an approval request can be created electronically", "Vendor C cannot support any part of Qasr's corporate-rate process because automatic evaluation is unavailable", "Vendor C has already eliminated the original approval problem because its workflow records outstanding cases"],
  "Vendor C provides useful workflow functionality, but routing an approval request differs from evaluating the corporate agreement. The approved design requires the rate to be resolved overnight against that agreement. Vendor C therefore offers partial rather than complete process fit.");
 
TF("W11O3a-03", "W11O3a", 1, "Qasr's redesigned corporate-rate process aims to remove a recurring 47-minute approval wait by resolving rates overnight against the relevant corporate agreement.", true,
  "This statement is true. The original approval wait is the problem the redesigned process seeks to eliminate. Resolving corporate rates overnight is intended to prevent guests from encountering that delay when they arrive.");
 
TF("W11O3a-04", "W11O3a", 2, "If Vendor C routes every corporate-rate request to the revenue office overnight, Qasr has automatically achieved the agreement-evaluation capability specified in its approved design.", false,
  "This statement is false. Routing requests overnight changes when employees receive the work, but it does not automatically evaluate corporate agreements. The process remains dependent on employees completing the approvals before guests arrive. Moving manual work earlier is not equivalent to automating the underlying decision.");
 
DR("W11O3a-05", "W11O3a", 1, "Vendor C's standard workflow can {1} a corporate-rate approval request, but it cannot automatically {2} the corporate agreement.",
  [["route", "eliminate", "authorise"], ["evaluate", "archive", "display"]],
  "Vendor C can route approval requests and keep cases open while decisions remain outstanding. However, it cannot automatically evaluate corporate agreements. This missing decision capability creates the gap between the standard product and Qasr's approved process design.");
 
DR("W11O3a-06", "W11O3a", 3, "Configuring Vendor C to send corporate-rate requests to the revenue office overnight may remove the arrival wait if the {1} is cleared before guests arrive, but the process remains dependent on {2}.",
  [["approval queue", "software licence", "corporate-rate catalogue"], ["timely human approval", "automatic agreement evaluation", "unsupported custom code"]],
  "Overnight configuration can shift approval work away from guest arrival, provided employees clear the approval queue in time. However, it does not eliminate dependence on human approval. The redesigned process requires automatic evaluation of corporate agreements, so the configured arrangement delivers a different operating capability.");
 
V("W11O3a-07", "W11O3a", 2, "Which diagram best represents the corporate-rate capability Qasr's approved process design requires?", [
  [D.flow(["Corporate|booking", "Agreement|rules", "Automatic|evaluation", "Resolved|rate"]), "The corporate agreement is evaluated automatically so the rate can be resolved before arrival"],
  [D.flow(["Corporate|booking", "Approval|request", "Revenue|office", "Manual|decision"]), "Every corporate booking is routed to the revenue office for a manual approval decision"],
  [D.flow(["Corporate|booking", "Open|case", "Await|approval", "Guest|arrival"]), "The system keeps the approval case open while the guest approaches arrival"],
  [D.flow(["Corporate|booking", "Record|request", "Store|status", "Review|later"]), "The system records the request but leaves the corporate-rate decision for later review"]
], "Qasr's approved design requires corporate rates to be resolved overnight against the relevant agreement. Automatic rule evaluation provides the missing decision capability. Routing, recording or holding an approval request does not by itself deliver the intended improvement.");
 
V("W11O3a-08", "W11O3a", 3, "Qasr discovers that Vendor C only partly supports its redesigned corporate-rate process. Which diagram shows the most defensible development response?", [
  [D.flow(["Approved|requirement", "Standard|capability", "Identify|gap", "Compare|responses"]), "Compare the approved process requirement with Vendor C's functionality, identify the missing capability and examine suitable responses"],
  [D.flow(["Vendor|selected", "Accept|workflow", "Change|design"]), "Accept the standard workflow because the vendor has already been selected"],
  [D.flow(["Approval|routing", "Assume|automation", "Declare|complete"]), "Treat electronic approval routing as proof that automatic agreement evaluation has been delivered"],
  [D.flow(["Missing|capability", "Build|replacement", "Ignore|alternatives"]), "Replace the entire system without examining configuration, extension or process-change alternatives"]
], "The development decision should begin with the capability required by the approved process. Qasr must compare that requirement with Vendor C's standard functionality and identify the genuine gap. Only then can it evaluate configuration, extension or process change without allowing the selected technology to dictate the outcome automatically.");
 
OR("W11O3a-09", "W11O3a", 2, "Put these activities in the logical sequence for understanding why Vendor C only partly fits Qasr's corporate-rate process.",
  ["Recall the approved requirement to resolve corporate rates overnight against the relevant agreement", "Examine Vendor C's ability to request approvals and keep cases open", "Identify that the standard workflow cannot automatically evaluate corporate agreements", "Determine how that limitation affects the intended removal of the arrival wait", "Examine development responses that could address the identified capability gap"],
  "The approved design establishes the required outcome. Vendor C's standard workflow must then be assessed against that requirement. Identifying the missing automatic evaluation capability allows Qasr to examine its operational consequences and consider suitable development responses.");
 
OR("W11O3a-10", "W11O3a", 3, "Qasr is considering configuring overnight approval routing. Put these operating activities in the sequence that would occur under that arrangement.",
  ["A corporate booking creates a rate-approval requirement", "Vendor C routes the approval request to the revenue office", "The request remains open while the required human decision is outstanding", "An authorised employee evaluates the request and completes the approval", "The approved rate becomes available for the guest's arrival"],
  "Configuration can move corporate-rate approval work into the overnight period, but it does not automatically evaluate the agreement. The revenue office must still complete the decision. The intended arrival wait is avoided only when the approval is finished before the guest arrives.");
 
MA("W11O3a-11", "W11O3a", 2, "Match each element of Qasr's corporate-rate problem to its correct meaning.",
  [["Recurring 47-minute wait", "The arrival delay that Qasr's redesigned process is intended to eliminate"], ["Overnight agreement evaluation", "The decision capability required by the approved corporate-rate design"], ["Vendor C's standard workflow", "The functionality that can request approval and keep the case open"], ["Partial process fit", "The situation where available software supports some activities but not the complete intended process"]],
  "The recurring 47-minute wait establishes the improvement Qasr wants to achieve. Its approved design requires overnight evaluation of corporate agreements. Vendor C can support approval routing but cannot perform that evaluation automatically, creating a partial process fit.");
 
MA("W11O3a-12", "W11O3a", 3, "Match each possible response to Vendor C's limitation with the consequence Qasr must recognise.",
  [["Configure overnight approval routing", "The arrival wait may be removed if employees complete the approval queue before guests arrive"], ["Extend Vendor C with agreement-evaluation rules", "The required automatic decision capability can be added, subject to development and upgrade consequences"], ["Change the process to fit standard functionality", "Development may become simpler, but the resulting process must be assessed against the approved improvement"], ["Accept the standard workflow without examining the capability gap", "Qasr risks mistaking functioning approval routing for delivery of the redesigned process"]],
  "Configuration can shift manual approval work earlier without eliminating dependence on employees. Extension can provide the missing automatic evaluation capability but introduces additional development obligations. Changing the process may be defensible if its consequences are understood. Accepting standard functionality without examining process fit risks undermining the intended improvement.");

// W11O3b · Three options, three different futures
// Correct answers are written first; the bank player shuffles options.
 
M("W11O3b-01", "W11O3b", 1, "Qasr wants to retain supported upgrades, avoid custom code and remove the arrival wait by clearing approvals overnight. Which option matches these requirements?",
  ["Configure Vendor C for AED 180,000 over six weeks", "Extend Vendor C for AED 540,000 over four months", "Change the process for AED 95,000 over three weeks", "Build a completely new system instead of using Vendor C"],
  "Configuration costs AED 180,000 and takes six weeks. It uses supported settings without custom code and retains supported upgrades. The revenue office must clear the approval queue before 06:00, so the arrangement removes the arrival wait only when employees complete the required approvals on time.");
 
M("W11O3b-02", "W11O3b", 2, "Qasr considers changing its process to retrieve corporate rates when bookings are made. What is the most important limitation of this option?",
  ["It resolves 71% of corporate arrivals but leaves the remaining 29% on the old approval path", "It requires two additional overnight shifts every week to approve all corporate arrivals", "It requires an unsupported rules extension to evaluate every corporate agreement automatically", "It removes the original approval wait for every corporate arrival without changing the process design"],
  "The design-change option costs AED 95,000 and takes three weeks, but it resolves only 71% of corporate arrivals. Bookings arriving within 24 hours account for the remaining 29% and continue through the old approval path. The faster, cheaper route therefore does not deliver the intended improvement to every arrival.");
 
TF("W11O3b-03", "W11O3b", 1, "Qasr's extension option costs AED 540,000, takes four months and preserves the approved process by automatically evaluating corporate agreements.", true,
  "This statement is true. The extension adds rules that evaluate corporate agreements automatically, matches the approved phase five design and removes the recurring 47-minute wait. However, Vendor C confirms that the extension falls outside its supported upgrade paths, creating an important long-term consideration.");
 
TF("W11O3b-04", "W11O3b", 2, "Because configuration retains supported upgrades, Qasr can remove the recurring arrival wait without depending on employees to complete overnight approvals.", false,
  "This statement is false. Configuration retains supported upgrades but also retains human approval for every corporate arrival. The revenue office must clear the overnight queue before 06:00, requiring two additional overnight shifts each week. Supported upgrades do not eliminate the continuing manual approval dependency.");
 
DR("W11O3b-05", "W11O3b", 1, "Qasr's configuration option costs {1} and requires {2} to deliver.",
  [["AED 180,000", "AED 95,000", "AED 540,000"], ["six weeks", "three weeks", "four months"]],
  "The configuration option has an initial cost of AED 180,000 and a delivery period of six weeks. It uses supported settings without custom code, but it also requires the revenue office to complete overnight approvals before guests arrive.");
 
DR("W11O3b-06", "W11O3b", 3, "Under Qasr's design-change option, {1} of corporate arrivals are resolved through the revised standard process, while {2} remain on the old approval path.",
  [["71%", "29%", "100%"], ["29%", "71%", "0%"]],
  "The design-change option retrieves corporate rates at booking and resolves 71% of corporate arrivals. The remaining 29% involve bookings arriving within 24 hours and retain the old approval path. This distinction matters because partial process coverage is not equivalent to eliminating the original approval problem for everyone.");
 
V("W11O3b-07", "W11O3b", 2, "Which diagram correctly represents Qasr's configuration option?", [
  [D.flow(["Corporate|booking", "Overnight|approval queue", "Revenue|office", "Guest|arrival"]), "The revenue office completes manual approvals overnight so the rate can be ready before guest arrival"],
  [D.flow(["Corporate|booking", "Agreement|rules", "Automatic|evaluation", "Resolved|rate"]), "A new rules component evaluates corporate agreements automatically without routine human approval"],
  [D.flow(["Corporate|bookings", "71%|resolved", "29%|old approval"]), "Standard functionality resolves some bookings while the remaining arrivals retain the old approval path"],
  [D.flow(["Corporate|booking", "Guest|arrival", "Manual|approval", "Resolved|rate"]), "The guest arrives before the corporate-rate approval is completed through the original process"]
], "Configuration moves approval work into the overnight period but retains human approval for every corporate arrival. The revenue office must clear the queue before 06:00 to remove the arrival wait. Automatic agreement evaluation describes extension, while the 71% and 29% division describes the design-change option.");
 
V("W11O3b-08", "W11O3b", 3, "Which diagram correctly represents the coverage achieved by Qasr's AED 95,000 design-change option?", [
  [D.flow(["Corporate|bookings", "71%|resolved", "29%|old approval"]), "The revised standard process resolves 71% of arrivals while 29% continue through the previous approval path"],
  [D.flow(["Corporate|bookings", "100%|automatic evaluation", "No|manual approval"]), "Every corporate agreement is evaluated automatically without any remaining approval dependency"],
  [D.flow(["Corporate|bookings", "100%|overnight queue", "Revenue|approval"]), "Every corporate arrival requires approval through the overnight revenue-office queue"],
  [D.flow(["Corporate|bookings", "29%|resolved", "71%|old approval"]), "Only 29% of corporate arrivals are resolved while 71% retain the previous approval path"]
], "The design-change option uses standard functionality to retrieve corporate rates at booking. It resolves 71% of corporate arrivals, while the remaining 29% involve bookings arriving within 24 hours and continue through the old approval process. The improvement is therefore substantial but incomplete.");
 
OR("W11O3b-09", "W11O3b", 2, "Arrange Qasr's three development options from the shortest to the longest delivery period.",
  ["Change the process using standard functionality, taking three weeks", "Configure Vendor C's supported workflow, taking six weeks", "Extend Vendor C with automatic agreement-evaluation rules, taking four months"],
  "Changing the process is the fastest option at three weeks, followed by configuration at six weeks and extension at four months. However, delivery speed alone does not determine the best choice. The options differ in process coverage, continuing manual work and vendor upgrade support.");
 
OR("W11O3b-10", "W11O3b", 3, "Qasr is evaluating the configured overnight approval process. Put these activities in the sequence required to prevent the original arrival wait.",
  ["A corporate booking creates a rate-approval requirement", "Vendor C places the approval request in the overnight queue", "The revenue office evaluates the corporate-rate request", "The approval queue is cleared before 06:00", "The guest arrives with the corporate rate already resolved"],
  "Configuration does not automatically evaluate corporate agreements. Instead, the revenue office must complete the required human approvals overnight. The arrangement removes the recurring arrival wait only if the queue is cleared before 06:00, making timely manual processing essential to the option's success.");
 
MA("W11O3b-11", "W11O3b", 2, "Match each Qasr development option to its correct cost, delivery period and principal operating consequence.",
  [["Configure Vendor C", "AED 180,000 over six weeks, with overnight human approval and two additional shifts each week"], ["Extend Vendor C", "AED 540,000 over four months, with automatic agreement evaluation outside supported upgrade paths"], ["Change the process", "AED 95,000 over three weeks, resolving 71% of arrivals while 29% retain the old approval path"]],
  "Configuration preserves supported upgrades but requires continuing overnight manual approval. Extension matches the approved design and removes the wait, but its rules component is outside supported upgrade paths. Changing the process is faster and cheaper, but it leaves 29% of corporate arrivals on the old approval route.");
 
MA("W11O3b-12", "W11O3b", 3, "Match each concern raised by Qasr's managers to the development option it most directly affects.",
  [["The revenue office must provide two additional overnight shifts every week", "Configure Vendor C using supported workflow settings"], ["The vendor will not support the added rules component through its standard upgrade paths", "Extend Vendor C to evaluate corporate agreements automatically"], ["Bookings arriving within 24 hours will continue through the previous approval process", "Change the process to retrieve corporate rates at booking"], ["The organisation wants the closest match to its approved phase five design", "Extend Vendor C with the required automatic agreement-evaluation capability"]],
  "Each alternative creates a distinct operating future. Configuration retains manual approval and adds overnight staffing, while extension preserves automatic agreement evaluation but introduces unsupported upgrade exposure. Changing the process avoids additional custom functionality but leaves late-arriving bookings on the old approval path. Qasr must compare these consequences rather than select an option solely by initial cost.");

// W11O3c · The four-year decision
// Correct answers are written first; the bank player shuffles options.
 
M("W11O3c-01", "W11O3c", 1, "Qasr's extension costs AED 540,000, while configuration costs AED 180,000. What can the team correctly conclude from these figures?",
  ["Extension costs AED 360,000 more initially, but the four-year cost difference remains unknown", "Extension costs AED 360,000 more over four years because neither option creates continuing obligations", "Configuration saves AED 360,000 over four years because its overnight staffing requirements have no cost", "Extension is financially preferable over four years because automatic evaluation guarantees lower total expenditure"],
  "The initial cost difference is AED 360,000. However, configuration requires two additional overnight shifts each week, while extension creates unsupported upgrade exposure. The case does not quantify those continuing obligations, so the initial difference cannot establish which option has the lower four-year cost.");
 
M("W11O3c-02", "W11O3c", 2, "Qasr's manager asks why the AED 95,000 design-change option should not automatically be selected. Which response is most defensible?",
  ["Its lower initial cost must be weighed against the 29% of corporate arrivals that remain on the old approval path", "Its lower initial cost proves that it will deliver the greatest improvement in guest experience", "Its three-week delivery period guarantees that every corporate arrival will avoid the original approval wait", "Its supported upgrade path makes the remaining manual approvals irrelevant to the development decision"],
  "The design-change option is the cheapest and fastest alternative, but it resolves only 71% of corporate arrivals. The remaining 29% retain the old approval path. Qasr must judge whether that incomplete coverage is acceptable against the improvement established in the approved process design.");
 
TF("W11O3c-03", "W11O3c", 1, "Qasr's development decision must consider a January regulatory deadline seven months away because the same delivery team is responsible for that work.", true,
  "This statement is true. The same delivery team must complete the regulatory work, so development choices compete for organisational capacity. Qasr must consider whether the selected route can be delivered without placing that commitment at unacceptable risk.");
 
TF("W11O3c-04", "W11O3c", 2, "Because Vendor C confirms that the proposed rules extension is outside supported upgrade paths, Qasr can calculate its exact four-year maintenance cost from the case exhibit.", false,
  "This statement is false. The vendor's confirmation establishes an upgrade-support risk, but the exhibit does not quantify future maintenance or upgrade costs. Qasr should identify the exposure and obtain reliable estimates rather than invent a precise four-year figure.");
 
DR("W11O3c-05", "W11O3c", 1, "Configuration requires {1} each week, while the proposed extension falls outside Vendor C's {2}.",
  [["two additional overnight shifts", "four additional overnight shifts", "no additional overnight shifts"], ["supported upgrade paths", "standard approval queue", "corporate-rate agreements"]],
  "Configuration retains human approval for every corporate arrival and requires two additional overnight shifts each week. Extension removes the need for those additional shifts through automatic agreement evaluation, but Vendor C confirms that the extension is outside supported upgrade paths.");
 
DR("W11O3c-06", "W11O3c", 3, "A defensible four-year comparison must distinguish {1} from continuing obligations and treat unquantified maintenance or staffing costs as {2}.",
  [["known initial expenditure", "assumed future savings", "estimated guest satisfaction"], ["uncertainties requiring evidence", "costs that can safely be ignored", "proof that the cheapest option is best"]],
  "The case provides initial development costs but does not provide all future operating and technical costs. Qasr must distinguish established expenditure from unquantified obligations. Treating unknown costs as zero would produce a misleading four-year comparison.");
 
V("W11O3c-07", "W11O3c", 2, "Which diagram correctly orders Qasr's three alternatives by their known initial development costs, from lowest to highest?", [
  [D.flow(["Change|AED 95,000", "Configure|AED 180,000", "Extend|AED 540,000"]), "Changing the process has the lowest initial cost, followed by configuration and then extension"],
  [D.flow(["Configure|AED 180,000", "Change|AED 95,000", "Extend|AED 540,000"]), "Configuration has the lowest initial cost, followed by changing the process and then extension"],
  [D.flow(["Extend|AED 540,000", "Configure|AED 180,000", "Change|AED 95,000"]), "Extension has the lowest initial cost, followed by configuration and then changing the process"],
  [D.flow(["Change|AED 95,000", "Extend|AED 540,000", "Configure|AED 180,000"]), "Changing the process has the lowest initial cost, followed by extension and then configuration"]
], "The known initial costs are AED 95,000 for changing the process, AED 180,000 for configuration and AED 540,000 for extension. This ordering does not establish their four-year total costs because continuing staffing, maintenance and upgrade obligations have not all been quantified.");
 
V("W11O3c-08", "W11O3c", 3, "Which diagram best represents the evidence Qasr needs before making a defensible four-year development recommendation?", [
  [D.flow(["Strategic|importance", "Process|fit", "Four-year|obligations", "Delivery|capacity", "Decision|conditions"]), "Assess strategic importance, process fit, long-term obligations, delivery capacity and the conditions required for approval"],
  [D.flow(["Initial|quotation", "Lowest|price", "Immediate|approval"]), "Select the lowest initial quotation without examining operating consequences or delivery commitments"],
  [D.flow(["Approved|design", "Closest|technical fit", "Ignore|upgrade exposure"]), "Choose the closest technical fit without examining future maintenance or vendor support"],
  [D.flow(["Delivery|duration", "Fastest|option", "Assume|full coverage"]), "Choose the fastest route and assume it delivers the complete approved process"]
], "A defensible recommendation considers the capability's strategic importance, its fit with the approved process, continuing obligations and available delivery capacity. Qasr must also identify unresolved evidence and approval conditions. Initial cost, technical fit or delivery speed alone cannot settle the decision.");
 
OR("W11O3c-09", "W11O3c", 2, "Put these activities in the logical order for preparing Qasr's four-year development comparison.",
  ["Record the known initial costs and delivery periods of the three alternatives", "Identify how each alternative affects the approved corporate-rate process", "Identify recurring staffing, maintenance and upgrade obligations", "Obtain estimates for material costs and risks not quantified in the exhibit", "Compare the alternatives over four years and document the remaining uncertainties"],
  "The comparison should begin with established case evidence and the process outcomes each alternative delivers. Qasr must then identify continuing obligations and obtain reliable estimates for missing information. Only after those steps can management compare four-year consequences without confusing known figures with assumptions.");
 
OR("W11O3c-10", "W11O3c", 3, "Qasr's team must also complete regulatory work by January. Put these checks in the logical order before approving a development route.",
  ["Confirm the January regulatory commitment and its seven-month deadline", "Identify the delivery-team capacity required for the regulatory work", "Examine the delivery effort and duration of the proposed corporate-rate solution", "Assess whether the same team can meet both commitments", "Approve a feasible route or establish conditions that protect the regulatory deadline"],
  "The regulatory deadline is an existing organisational commitment that competes for the same delivery resources. Qasr must understand that commitment and the capacity required before evaluating the development route's scheduling consequences. A technically attractive option should not be approved without examining whether both commitments remain achievable.");
 
MA("W11O3c-11", "W11O3c", 2, "Match each Qasr development option to the long-term consequence management must examine.",
  [["Configure Vendor C", "Recurring staffing obligations from two additional overnight shifts each week"], ["Extend Vendor C", "Maintenance and upgrade exposure because the rules extension is outside supported upgrade paths"], ["Change the process", "Continuing use of the old approval path for 29% of corporate arrivals"], ["Commit the shared delivery team", "Possible competition between corporate-rate development and the January regulatory deadline"]],
  "Configuration retains manual approval and creates recurring overnight staffing obligations. Extension preserves automatic agreement evaluation but introduces unsupported upgrade exposure. Changing the process leaves 29% of arrivals on the old route. All alternatives must also be considered against the delivery team's regulatory commitment.");
 
MA("W11O3c-12", "W11O3c", 3, "Match each question from Qasr's approving manager to the evidence needed for a defensible development decision.",
  [["Does the selected route preserve the improvement approved during Innovate?", "Evidence of process fit and the treatment of the original 47-minute approval wait"], ["Which alternative has the lowest total cost over four years?", "Reliable estimates of continuing operating, maintenance and upgrade costs alongside known initial expenditure"], ["Can the team deliver the solution without jeopardising the January commitment?", "An assessment of shared delivery capacity and the competing project requirements"], ["What conditions must be satisfied before management accepts the recommendation?", "A documented decision identifying material uncertainties, trade-offs and required approvals"]],
  "A defensible recommendation must answer different management questions with appropriate evidence. Process fit establishes whether the intended improvement is protected, while four-year cost analysis requires estimates beyond initial quotations. Delivery capacity determines feasibility, and explicit conditions ensure that unresolved uncertainties and trade-offs are not concealed.");

// W11O2a · What happens when the normal path fails?
// Correct answers are written first; the bank player shuffles options.
 
M("W11O2a-01", "W11O2a", 1, "A corporate guest arrives at Qasr, but the booking cannot be resolved through the normal rate-evaluation process. What should the developed process provide?",
  ["A documented exception path identifying how the case is resolved and who has the necessary authority", "An instruction to leave the booking unresolved until the standard system can process it automatically", "Permission for any reception employee to invent an approval procedure without consulting the responsible role", "A requirement to exclude the booking from process monitoring because it does not follow the normal route"],
  "An exception occurs when a case cannot proceed through normal processing without additional handling. Develop must provide an agreed procedure identifying the responsible role, the required decision authority and the route for resolving the case. Otherwise, employees may improvise or leave guests waiting.");
 
M("W11O2a-02", "W11O2a", 2, "Qasr is considering automating every corporate-rate approval request. What should the team investigate before committing to that solution?",
  ["Whether the approvals are genuinely necessary or whether the underlying causes of some exceptions can be eliminated", "Whether electronic approval routing can reproduce every step of the old process without questioning its purpose", "Whether the software can create more approval requests to demonstrate greater automation activity", "Whether exception handling can be removed from the process documentation once approval requests become electronic"],
  "Automating an exception may make existing work faster without removing the condition that created it. Qasr should investigate exception causes and determine which approvals genuinely require human judgement. Unnecessary approvals should be challenged rather than automatically reproduced in technology.");
 
TF("W11O2a-03", "W11O2a", 1, "Under Qasr's design-change option, 29% of corporate arrivals remain on the old approval path because their bookings arrive within 24 hours.", true,
  "This statement is true. The design-change option resolves 71% of corporate arrivals through the revised standard process. The remaining 29% involve bookings arriving within 24 hours and continue through the previous approval path. These cases require explicit consideration when evaluating the improvement.");
 
TF("W11O2a-04", "W11O2a", 2, "Once Qasr automates the normal corporate-rate process, exception ownership and handling time no longer need to be monitored after go-live.", false,
  "This statement is false. Automation of routine processing does not eliminate every exception. Qasr must still monitor exception volumes, causes and handling times because unresolved cases and recurring workarounds may reveal weaknesses in the developed process.");
 
DR("W11O2a-05", "W11O2a", 1, "A booking that cannot proceed through Qasr's normal corporate-rate process is an {1}. The documented method for resolving that booking is its {2}.",
  [["exception", "interface", "baseline"], ["exception path", "process architecture", "benefits target"]],
  "An exception is a case that cannot complete normal processing without additional handling. An exception path defines the agreed response, including the responsible role, required authority and procedure for resolving the case.");
 
DR("W11O2a-06", "W11O2a", 3, "Before automating recurring approval exceptions, Qasr should examine their measured {1} and investigate their underlying {2}.",
  [["volumes", "software colours", "vendor demonstrations"], ["causes", "screen layouts", "licence names"]],
  "Measured exception volumes show how frequently cases require additional handling, while analysis of causes explains why those cases arise. This evidence helps Qasr distinguish genuinely necessary exceptions from avoidable work that process improvement could eliminate.");
 
V("W11O2a-07", "W11O2a", 2, "Which diagram best represents a developed exception path for a Qasr corporate booking that cannot be resolved normally?", [
  [D.flow(["Identify|exception", "Assign|owner", "Apply|authority", "Resolve|case"]), "Identify the exception, assign responsibility, apply the required decision authority and resolve the booking"],
  [D.flow(["Identify|exception", "Leave|unassigned", "Await|guest complaint"]), "Leave the exception without an owner until the guest requests assistance"],
  [D.flow(["Identify|exception", "Repeat|normal route", "Ignore|failure"]), "Repeat the failed normal process without investigating why the booking cannot be resolved"],
  [D.flow(["Identify|exception", "Allow|informal workaround", "Avoid|recording"]), "Permit an undocumented workaround without assigning responsibility or recording the problem"]
], "A developed exception path must provide a reliable route for cases outside normal processing. Qasr needs clear ownership, sufficient decision authority and a defined resolution procedure. Unassigned cases and informal workarounds create inconsistent handling and may reproduce the original arrival delay.");
 
V("W11O2a-08", "W11O2a", 3, "Qasr wants to avoid automating unnecessary corporate-rate approvals. Which diagram shows the most defensible approach?", [
  [D.flow(["Measure|exceptions", "Investigate|causes", "Remove|unnecessary work", "Develop|remaining paths"]), "Use exception evidence to remove avoidable work and develop reliable handling for genuinely necessary exceptions"],
  [D.flow(["Existing|exceptions", "Automate|every approval", "Preserve|old rules"]), "Automate every existing approval without investigating whether the underlying requirement remains necessary"],
  [D.flow(["Routine|automation", "Ignore|exceptions", "Declare|ready"]), "Concentrate on routine automation and leave exceptional bookings outside the developed process"],
  [D.flow(["Exception|reported", "Add|manual approval", "Increase|handoffs"]), "Respond to every exception by adding another approval activity without examining its cause"]
], "A disciplined development decision begins with evidence about exception frequency and causes. Qasr should remove unnecessary work where possible and establish controlled handling for cases that genuinely require intervention. Automating every inherited exception risks encoding the dysfunction the redesign was intended to eliminate.");
 
OR("W11O2a-09", "W11O2a", 2, "Put these activities in the logical order for developing a reliable exception path for unresolved corporate-rate bookings.",
  ["Identify the situations in which the normal corporate-rate process cannot complete", "Examine the causes and observed volumes of those exceptions", "Determine which exceptions genuinely require additional human handling", "Assign the responsible role and the authority needed to resolve each remaining exception", "Document and test the exception-handling procedure before implementation"],
  "The team must understand where normal processing fails and why those failures occur before designing additional handling. Avoidable exceptions should be challenged, while necessary exceptions require clear ownership and authority. Documenting and testing the procedure helps employees resolve unusual bookings consistently.");
 
OR("W11O2a-10", "W11O2a", 3, "Qasr notices recurring approval workarounds after go-live. Put these improvement activities in the logical order.",
  ["Record the recurring exceptions and workarounds observed during operations", "Measure how frequently they occur and how long resolution takes", "Investigate the underlying causes of the recurring problems", "Decide whether to remove unnecessary requirements or improve genuine exception handling", "Update the relevant process rules and procedures and continue monitoring"],
  "Recurring workarounds may indicate that the developed process does not support actual operating needs. Qasr should gather evidence about frequency, handling time and causes before changing the process. The response should address the underlying problem rather than simply automate or formalise an ineffective workaround.");
 
MA("W11O2a-11", "W11O2a", 2, "Match each exception-management concept to its meaning in Qasr's corporate-rate process.",
  [["Exception volume", "The number of corporate-rate cases that cannot follow the normal processing route"], ["Exception handling time", "The time employees need to resolve cases requiring additional intervention"], ["Exception ownership", "The responsibility assigned to a role for managing and resolving an unusual case"], ["Decision authority", "The permission required to make or approve the decision needed to resolve an exception"]],
  "Exception volume indicates how often normal processing fails, while handling time shows the effort or delay involved in resolution. Ownership establishes who is responsible, and decision authority establishes who may make the required decision. These elements are essential to dependable exception handling.");
 
MA("W11O2a-12", "W11O2a", 3, "Match each problem observed in Qasr's corporate-rate process to the most appropriate development response.",
  [["Routine approvals continue even when established rules could resolve the rate", "Investigate whether the unnecessary approval requirement can be eliminated"], ["A booking requires genuine judgement beyond the normal agreement rules", "Provide a documented exception route with an authorised decision-maker"], ["Employees repeatedly invent different workarounds for unresolved bookings", "Examine the recurring causes and establish consistent operating procedures"], ["Exceptional arrivals experience long delays despite smooth routine processing", "Measure exception handling time and improve the route used to resolve those cases"]],
  "Different exception problems require different responses. Unnecessary approvals should be challenged, while cases requiring genuine judgement need controlled human handling. Recurring workarounds indicate weaknesses in procedures, and long exception delays require investigation. The objective is to improve the complete process rather than merely automate its easiest cases.");

// W11O2b · Testing the cases nobody wants to demonstrate
// Correct answers are written first; the bank player shuffles options.
 
M("W11O2b-01", "W11O2b", 1, "Vendor C demonstrates a corporate arrival where the agreement is available and approval completes smoothly. What should Qasr conclude?",
  ["The demonstration confirms that the selected case works, but broader operational testing is still required", "The demonstration proves that every corporate arrival can be handled without difficulty", "The demonstration establishes that manual exception procedures are no longer necessary", "The demonstration confirms that the complete process is ready for implementation without further testing"],
  "A successful demonstration shows that the selected workflow functions under the conditions presented. It does not establish that Qasr can handle historical failures, unusual arrivals, peak workloads or departmental handovers. Develop requires evidence from realistic operational testing before the capability can be considered ready.");
 
M("W11O2b-02", "W11O2b", 2, "Qasr wants to know whether its developed corporate-rate process has corrected problems experienced under the previous process. Which testing approach provides the strongest evidence?",
  ["Retest historical corporate arrivals that previously experienced approval failures or delays", "Repeat the vendor's successful demonstration using the same uncomplicated booking", "Inspect the software screens without processing complete corporate-arrival cases", "Ask the vendor whether the workflow should perform correctly without testing previous failures"],
  "Historical cases are valuable because they reflect difficulties Qasr has actually experienced. Retesting previously failed arrivals helps establish whether the developed process addresses the problems that motivated the redesign. Repeating uncomplicated demonstrations would provide weaker evidence about those known weaknesses.");
 
TF("W11O2b-03", "W11O2b", 1, "Performer-led testing involves employees who will operate the developed process, helping reveal practical difficulties that software demonstrations may conceal.", true,
  "This statement is true. Reception and revenue employees understand the information, responsibilities and handovers required during real corporate arrivals. Their participation helps identify unclear instructions, missing information and operating weaknesses that may not appear during a vendor demonstration.");
 
TF("W11O2b-04", "W11O2b", 2, "If Qasr's corporate-rate system processes ordinary bookings successfully, there is no need to test manual exception procedures or departmental handovers before implementation.", false,
  "This statement is false. Routine processing tests do not establish that the complete operating process works. Qasr must also test exception procedures, manual decisions and handovers between responsible employees or departments. Otherwise, difficult arrivals may remain unresolved despite successful standard transactions.");
 
DR("W11O2b-05", "W11O2b", 1, "Testing Qasr's developed process with cases that previously caused approval problems is an example of using {1}. Testing unusually demanding workloads is known as {2}.",
  [["historical cases", "vendor quotations", "future benefits targets"], ["peak-volume testing", "process classification", "strategic alignment"]],
  "Historical cases help determine whether the developed process resolves problems previously encountered in actual operations. Peak-volume testing examines whether the process remains dependable when demand places greater pressure on systems, employees and approval capacity.");
 
DR("W11O2b-06", "W11O2b", 3, "When Qasr discovers that an unresolved booking fails to reach the responsible revenue employee, the team should record a {1} and investigate the failed departmental {2}.",
  [["defect", "benefit", "strategic objective"], ["handover", "classification", "investment horizon"]],
  "A defect is a problem that prevents the developed process from meeting its requirements. A departmental handover transfers responsibility or information between roles. Recording the failed handover allows Qasr to investigate the cause, correct the operating arrangement and test whether the correction works.");
 
V("W11O2b-07", "W11O2b", 2, "Which diagram best represents credible testing of Qasr's developed corporate-rate process?", [
  [D.flow(["Historical|cases", "Difficult|exceptions", "Peak|volume", "Recorded|defects"]), "Test previously encountered cases, difficult exceptions and demanding workloads while recording identified problems"],
  [D.flow(["Prepared|booking", "Successful|demonstration", "Declare|ready"]), "Use one prepared successful booking as sufficient evidence that the complete process is ready"],
  [D.flow(["Routine|bookings", "Exclude|exceptions", "Approve|handover"]), "Test ordinary bookings while excluding exceptional arrivals from readiness assessment"],
  [D.flow(["Software|screens", "Visual|inspection", "Assume|operation"]), "Inspect the application screens and assume the complete operating process will work"]
], "Credible development testing challenges the complete process with realistic conditions. Historical cases, difficult exceptions and peak workloads reveal weaknesses that prepared demonstrations may conceal. Recording defects provides evidence for correction before implementation.");
 
V("W11O2b-08", "W11O2b", 3, "A corporate booking requires additional investigation by Qasr's revenue office. Which diagram best represents the handover that should be tested?", [
  [D.flow(["Reception|identifies issue", "Revenue|receives case", "Decision|completed", "Reception|informed"]), "Test whether reception identifies the issue, revenue receives and resolves it, and reception receives the decision"],
  [D.flow(["Reception|identifies issue", "Case|left open", "Guest|waits"]), "Leave the case open without confirming that the responsible department receives it"],
  [D.flow(["Reception|identifies issue", "Revenue|unavailable", "Repeat|request"]), "Repeat the approval request without establishing responsibility or a resolution route"],
  [D.flow(["Reception|identifies issue", "Assume|approval", "Close|case"]), "Close the booking without confirming that an authorised decision has been completed"]
], "A handover test should follow the complete transfer of information and responsibility. Qasr must establish that the revenue office receives the case, can complete the required decision and communicates the result to reception. Merely sending a request does not prove that the handover works.");
 
OR("W11O2b-09", "W11O2b", 2, "Put these activities in the logical order for testing a previously failed corporate-rate booking.",
  ["Select a historical booking that previously experienced an approval problem", "Establish the expected result under Qasr's redesigned process", "Run the booking through the developed systems and operating procedures", "Compare the observed result with the expected process outcome", "Record any defect and verify the correction through further testing"],
  "Historical testing begins with a real problem and a clear expectation about how the redesigned process should handle it. The team then runs the case through the developed arrangement and compares actual performance with the expected outcome. Failures must be recorded and corrected rather than ignored.");
 
OR("W11O2b-10", "W11O2b", 3, "Qasr is preparing to test its configured overnight approval process. Put these testing activities in the logical order.",
  ["Define the requirement that the revenue office must clear the approval queue before 06:00", "Prepare realistic bookings that include ordinary and difficult approval cases", "Run the overnight workflow under demanding workload conditions", "Observe whether employees complete approvals and handovers within the required operating window", "Record failures, correct the relevant weaknesses and repeat the affected tests"],
  "The configured process depends on employees completing approvals before 06:00. Testing should therefore begin with that requirement and use realistic cases under demanding conditions. The team must observe whether the complete workflow meets the requirement, then correct and retest any failures before accepting readiness.");
 
MA("W11O2b-11", "W11O2b", 2, "Match each development-testing concept to its purpose in Qasr's corporate-rate process.",
  [["Historical-case testing", "Checks whether the developed process resolves situations that previously caused problems"], ["Peak-volume testing", "Examines whether the process remains dependable under demanding workloads"], ["Performer-led testing", "Uses employees' operating experience to reveal practical weaknesses"], ["Defect logging", "Records failures that require investigation, correction and further verification"]],
  "Historical cases connect testing with known operating problems. Peak-volume tests challenge capacity, while performer-led tests reveal practical difficulties experienced by the people who will use the process. Defect logging ensures that observed failures become actionable evidence rather than informal observations.");
 
MA("W11O2b-12", "W11O2b", 3, "Match each problem discovered during Qasr's testing to the most appropriate development response.",
  [["The overnight approval queue remains unfinished when the required processing window closes", "Investigate workload and approval capacity under peak operating conditions"], ["Reception sends an exception request but never receives the revenue office's decision", "Test and correct the departmental handover and communication procedure"], ["A corporate agreement fails because required information is missing from a connected system", "Investigate the interface and verify that the necessary information is exchanged correctly"], ["Employees cannot complete an unusual arrival because the manual procedure is unclear", "Revise the procedure with the responsible performers and retest the exceptional case"]],
  "Different test failures reveal different weaknesses in the developed operating capability. Queue delays require capacity investigation, incomplete decisions reveal handover problems, missing information indicates interface weaknesses, and unclear instructions require procedural correction. Qasr should address the specific cause and verify that the complete process works before implementation.");

// W11O2c · The manual half of the new process
// Correct answers are written first; the bank player shuffles options.
 
M("W11O2c-01", "W11O2c", 1, "Qasr's system identifies a corporate booking that cannot be resolved automatically. What must the developed process provide?",
  ["A documented manual procedure explaining how an authorised employee should resolve the booking", "An instruction to leave the booking open until the system can resolve it without intervention", "Permission for reception employees to invent different approval procedures whenever an exception occurs", "A requirement to exclude unresolved bookings from the developed process because they need human intervention"],
  "Develop must prepare manual procedures for work that automated functionality cannot complete. Qasr needs a documented route explaining what employees should investigate, who has the required authority and how the case should be resolved. Working software alone cannot guarantee reliable handling of exceptional arrivals.");
 
M("W11O2c-02", "W11O2c", 2, "Reception sends an unresolved corporate-rate case to the revenue office, but the receiving employee lacks the information needed to make a decision. What does this reveal?",
  ["The departmental handover is incomplete because responsibility and usable information have not been transferred effectively", "The handover is complete because reception successfully sent a message to another department", "The problem proves that every corporate-rate exception should be removed from the operating process", "The revenue office should approve the case without the missing information to avoid further delay"],
  "A handover is not complete merely because a request has been sent. The receiving employee needs sufficient information, clear responsibility and appropriate authority to continue the case. Qasr must develop and test these arrangements so unresolved bookings do not become trapped between departments.");
 
TF("W11O2c-03", "W11O2c", 1, "An exception catalogue should identify recognised unusual situations and connect them with responsible roles, decision authority and handling procedures.", true,
  "This statement is true. An exception catalogue documents the situations that require handling outside normal processing. It helps employees understand who owns each exception, what authority is required and which procedure should be followed to reach a consistent resolution.");
 
TF("W11O2c-04", "W11O2c", 2, "Once Qasr's corporate-rate software performs its automated functions correctly, manual procedures and operational support arrangements can safely be developed after go-live.", false,
  "This statement is false. Develop must prepare and test the complete operating capability before implementation. Leaving manual procedures and support arrangements until after go-live exposes employees and guests to unresolved exceptions, inconsistent workarounds and avoidable delays.");
 
DR("W11O2c-05", "W11O2c", 1, "An {1} allows Qasr's connected systems to exchange required information, while a {2} specifies how a decision should be made under defined conditions.",
  [["interface", "exception catalogue", "benefits target"], ["business rule", "delivery milestone", "process classification"]],
  "An interface supports the exchange of information between connected systems. A business rule defines how particular decisions should be made using that information. Both are necessary components of the developed operating capability, alongside the manual procedures required when normal processing cannot finish.");
 
DR("W11O2c-06", "W11O2c", 3, "When Qasr needs to revise a corporate-rate evaluation rule, the proposed change should be reviewed by the named {1} and follow an authorised {2}.",
  [["rule owner", "software demonstrator", "guest arriving at reception"], ["change route", "informal workaround", "unrecorded adjustment"]],
  "A named rule owner is accountable for reviewing changes to the relevant business rule. An authorised change route ensures that revisions are evaluated, approved and reflected in operating procedures. This prevents informal adjustments from gradually changing the approved process without appropriate oversight.");
 
V("W11O2c-07", "W11O2c", 2, "Which diagram best represents a complete manual exception-handling procedure for an unresolved corporate-rate booking?", [
  [D.flow(["Identify|unresolved case", "Check|required information", "Obtain|authorised decision", "Complete|arrival"]), "The employee identifies the problem, checks the required information, obtains an authorised decision and completes the arrival"],
  [D.flow(["Identify|unresolved case", "Send|informal message", "Leave|case open"]), "The employee sends an informal message without establishing how the booking will be resolved"],
  [D.flow(["Identify|unresolved case", "Assume|approval", "Complete|arrival"]), "The employee treats the unresolved rate as approved without obtaining the required decision"],
  [D.flow(["Identify|unresolved case", "Repeat|system request", "Ignore|failure"]), "The employee repeatedly submits the same request without addressing the reason normal processing failed"]
], "A developed manual procedure must provide a controlled route from identifying an exception to completing the required decision. Qasr's employee needs the relevant information and appropriate authority before resolving the arrival. Informal messages, unsupported assumptions and repeated failed requests do not constitute reliable exception handling.");
 
V("W11O2c-08", "W11O2c", 3, "Which diagram best represents the governance Qasr needs when changing a corporate-rate business rule?", [
  [D.flow(["Identify|change need", "Consult|rule owner", "Approve|revision", "Update|procedure"]), "Identify the required change, involve the responsible rule owner, obtain approval and update the operating procedure"],
  [D.flow(["Employee|suggestion", "Immediate|rule change", "Inform|others later"]), "Allow an employee to change the rule immediately and inform responsible managers afterward"],
  [D.flow(["Vendor|recommendation", "Automatic|acceptance", "Ignore|procedure"]), "Accept the vendor's recommendation without checking its effect on the approved process or procedures"],
  [D.flow(["Identify|change need", "Create|workaround", "Avoid|approval"]), "Introduce an informal workaround instead of following the authorised rule-change process"]
], "Business rules influence how Qasr makes operational decisions. Changes therefore require a named owner, appropriate authorisation and corresponding updates to procedures. An explicit change route protects process consistency and prevents technology or local workarounds from silently changing approved operating requirements.");
 
OR("W11O2c-09", "W11O2c", 2, "Put these activities in the logical order for resolving a corporate-rate exception that requires revenue-office intervention.",
  ["Reception identifies that the booking cannot complete normal corporate-rate processing", "Reception gathers the relevant booking information and identifies the required exception procedure", "The unresolved case is transferred to the responsible revenue-office role", "An authorised employee investigates the information and completes the required decision", "The decision is communicated to reception so the guest arrival can be completed"],
  "Reliable exception handling begins by identifying the unresolved case and the applicable procedure. The receiving role must obtain sufficient information and possess the necessary authority to make the decision. The process is complete only when the outcome reaches the employee responsible for continuing guest service.");
 
OR("W11O2c-10", "W11O2c", 3, "Qasr is preparing its manual operating arrangements for implementation. Put these development activities in the logical order.",
  ["Identify the recognised exceptions that require human intervention", "Assign responsible roles and establish the authority required for each exception", "Document the manual procedures and departmental handovers", "Test the procedures with employees who will perform the work", "Correct identified weaknesses and prepare the procedures and support arrangements for operational handover"],
  "Develop must establish what human work remains necessary and who is authorised to perform it. The team then documents and tests the procedures and handovers with the responsible employees. Identified weaknesses should be corrected before the operating arrangements are handed to Implement.");
 
MA("W11O2c-11", "W11O2c", 2, "Match each component of Qasr's developed process to its operational purpose.",
  [["Manual procedure", "Explains how employees perform work that the software cannot complete"], ["Exception catalogue", "Documents recognised unusual situations and their agreed handling arrangements"], ["Rule owner", "Provides accountability for reviewing and authorising changes to a business rule"], ["Operational support arrangement", "Provides employees with a dependable route for assistance when documented procedures cannot resolve a problem"]],
  "Manual procedures make necessary human work consistent, while an exception catalogue connects recognised problems with their handling arrangements. Rule ownership controls changes to business decisions, and operational support helps employees obtain assistance when ordinary procedures are insufficient. These elements complement automated functionality.");
 
MA("W11O2c-12", "W11O2c", 3, "Match each weakness discovered in Qasr's developed corporate-rate process to the most appropriate corrective action.",
  [["Reception employees use different informal methods to resolve the same exception", "Document and test a consistent manual procedure with clear responsibility"], ["A proposed change to agreement-evaluation rules has no identified approver", "Assign a named rule owner and establish an authorised change route"], ["The revenue office receives a case without the information required to decide it", "Correct the departmental handover so responsibility and usable information transfer together"], ["Employees encounter a problem that falls outside the documented exception procedure", "Provide a dependable operational support route for obtaining further assistance"]],
  "Each weakness reflects a different gap in operational readiness. Inconsistent handling requires documented procedures, uncontrolled rule changes require ownership and authorisation, incomplete handovers require better information transfer, and unfamiliar problems require reliable support. Qasr must address these gaps before treating its developed process as ready for implementation.");

// W11O3d · The cost of changing the process — and the cost of not changing it
// Correct answers are written first; the bank player shuffles options.
 
M("W11O3d-01", "W11O3d", 1, "Qasr's configuration option costs AED 180,000 initially. Why should management avoid treating this amount as the complete cost of the solution?",
  ["The configured process also requires two additional overnight shifts each week to complete manual approvals", "The configuration option requires an unsupported rules extension that must be rebuilt during every upgrade", "The configuration option leaves exactly 29% of corporate arrivals on the old approval path", "The initial quotation excludes the AED 540,000 required to purchase Vendor C's standard functionality"],
  "Configuration has a known initial cost of AED 180,000, but it retains human approval for every corporate arrival. The revenue office must provide two additional overnight shifts each week. Those recurring operating obligations matter when evaluating the solution over four years, even though their monetary cost is not supplied.");
 
M("W11O3d-02", "W11O3d", 2, "Qasr is tempted to write the rules extension mainly to avoid changing its approved process. What lasting cost must management recognise before approving it?", ["The extension sits outside supported upgrade paths, so Qasr will pay for it again at every subsequent Vendor C upgrade", "The extension requires two additional overnight shifts each week to clear the approval queue", "The extension leaves 29% of corporate arrivals on the old approval path", "The extension removes Qasr's ability to change any business rule after go-live"], "Vendor C has confirmed that the rules extension falls outside supported upgrade paths. An extension written to avoid a process change therefore creates a cost that returns at every later upgrade. The overnight shifts belong to configuration, and the 29% gap belongs to the design-change option.");
 
TF("W11O3d-03", "W11O3d", 1, "Vendor C confirms that Qasr's proposed rules extension falls outside supported upgrade paths, creating a future maintenance consideration.", true,
  "This statement is true. The extension preserves automatic agreement evaluation and matches the approved process design, but Vendor C does not support it through ordinary upgrade paths. Qasr must therefore consider the technical responsibilities and possible additional work associated with future software changes.");
 
TF("W11O3d-04", "W11O3d", 2, "Because Qasr's extension removes the recurring 47-minute approval wait, its higher initial cost proves that it will be the most economical solution over four years.", false,
  "This statement is false. The extension delivers strong process fit and avoids the additional overnight shifts required by configuration. However, it costs AED 540,000 initially and falls outside supported upgrade paths. The case does not quantify all future costs, so its four-year economic superiority cannot be established.");
 
DR("W11O3d-05", "W11O3d", 1, "Qasr's configuration option creates a continuing {1} obligation, while the extension creates exposure to future {2} difficulties.",
  [["overnight staffing", "custom software ownership", "unresolved booking coverage"], ["software upgrades", "guest registration", "corporate agreement classification"]],
  "Configuration retains manual approval and requires two additional overnight shifts each week. Extension removes that staffing requirement through automatic agreement evaluation, but its unsupported upgrade path creates future technical exposure. These are different obligations that must be considered alongside initial expenditure.");
 
DR("W11O3d-06", "W11O3d", 3, "When Qasr evaluates its development alternatives over four years, it should distinguish {1} from unquantified future obligations and obtain {2} before claiming a precise total cost.",
  [["known initial costs", "assumed future savings", "unverified maintenance charges"], ["reliable estimates", "vendor demonstrations", "automatic approval"]],
  "The case provides the initial costs of the three alternatives but does not quantify every recurring operating or technical obligation. Qasr should identify the missing information and obtain reliable estimates. Treating unknown costs as zero or inventing precise amounts would undermine the four-year comparison.");
 
V("W11O3d-07", "W11O3d", 2, "Which diagram correctly represents the continuing operational consequence of Qasr's configuration option?", [
  [D.flow(["Supported|configuration", "Overnight|approval", "Additional|shifts", "Recurring|work"]), "Configuration retains supported upgrades but requires continuing overnight manual approval and additional staffing"],
  [D.flow(["Rules|extension", "Automatic|evaluation", "No extra|shifts"]), "An added rules component evaluates corporate agreements without the additional overnight staffing requirement"],
  [D.flow(["Corporate|arrivals", "71%|resolved", "29%|old approval"]), "The standard process resolves some arrivals while the remaining bookings retain the previous approval path"],
  [D.flow(["Standard|workflow", "Automatic|evaluation", "No manual|approval"]), "The standard configured workflow evaluates every agreement automatically without human approval"]
], "Configuration uses supported settings and retains supported upgrades, but it does not automatically evaluate corporate agreements. The revenue office must continue completing approvals overnight, requiring two additional shifts each week. This recurring operating burden belongs in Qasr's long-term assessment.");
 
V("W11O3d-08", "W11O3d", 3, "Which diagram best represents a defensible four-year evaluation of Qasr's development alternatives?", [
  [D.flow(["Initial|cost", "Operating|burden", "Upgrade|exposure", "Process|performance", "Decision|conditions"]), "Compare initial expenditure, recurring obligations, technical exposure, process outcomes and approval conditions"],
  [D.flow(["Initial|quotation", "Lowest|price", "Approve|solution"]), "Select the lowest initial quotation without evaluating the resulting operating process"],
  [D.flow(["Closest|design fit", "Ignore|maintenance", "Approve|extension"]), "Choose the closest process fit without examining unsupported upgrade exposure"],
  [D.flow(["Supported|software", "Assume|full improvement", "Approve|change"]), "Assume supported standard software necessarily delivers the complete approved improvement"]
], "A four-year evaluation must consider more than the development quotation. Qasr should examine recurring staffing, upgrade exposure and the process performance each option delivers. The recommendation should also identify unresolved costs and conditions requiring management approval.");
 
OR("W11O3d-09", "W11O3d", 2, "Put these activities in the logical order for assessing the long-term consequences of Qasr's development alternatives.",
  ["Record the known initial costs and delivery characteristics of each option", "Identify the operating process that each option would actually deliver", "Examine recurring staffing, maintenance and upgrade obligations", "Obtain evidence for material future costs that remain unquantified", "Compare the four-year consequences and document the conditions for a defensible decision"],
  "A reliable comparison begins with established case evidence and the operating outcomes of each alternative. Qasr must then identify continuing obligations and investigate missing costs. The final assessment should distinguish known figures from estimates and make the decision conditions explicit.");
 
OR("W11O3d-10", "W11O3d", 3, "Qasr approves an extension that requires continuing technical oversight. Put these governance activities in their logical sequence.",
  ["Document the capability gap and the justification for the proposed extension", "Assess vendor support, maintenance exposure and the consequences for the approved process", "Obtain approval from the named authority responsible for accepting the development decision", "Develop and test the authorised extension before operational handover", "Review the extension annually to assess its continuing value and obligations"],
  "An extension should address a genuine capability gap and receive appropriate approval after its consequences have been assessed. Development and testing then establish whether the authorised solution works. Annual review helps Qasr determine whether the extension remains valuable and sustainable as technology and operating requirements evolve.");
 
MA("W11O3d-11", "W11O3d", 2, "Match each Qasr development option to the long-term burden or compromise it creates.",
  [["Configure Vendor C", "Retains manual approval and requires two additional overnight shifts each week"], ["Extend Vendor C", "Preserves automatic agreement evaluation but creates unsupported upgrade exposure"], ["Change the process", "Leaves 29% of corporate arrivals on the old approval path"], ["Accept a material design deviation", "Requires explicit justification and approval from a responsible authority"]],
  "Configuration creates continuing staffing obligations, extension introduces technical maintenance exposure, and changing the process leaves part of the guest population on the previous approval route. A material departure from the approved design also requires governance because its consequences affect the business process rather than technology alone.");
 
MA("W11O3d-12", "W11O3d", 3, "Match each concern raised during Qasr's four-year review to the appropriate management response.",
  [["The revenue office continues performing routine overnight approvals", "Estimate the recurring staffing burden and assess whether the manual dependency remains justified"], ["Vendor C changes its standard product while Qasr relies on an unsupported extension", "Review compatibility and the technical work needed to sustain the added functionality"], ["The standard design-change solution leaves some arrivals on the previous approval route", "Evaluate whether the remaining service gap is acceptable against the approved improvement"], ["Several extensions remain in operation after their original development projects have ended", "Review their value, maintenance obligations and upgrade exposure annually"]],
  "Long-term governance requires Qasr to examine the particular consequences of each development choice. Continuing manual approvals create operating obligations, unsupported extensions create technical exposure, and incomplete process coverage may preserve the original service problem. Annual reviews help prevent earlier development decisions from becoming unexamined permanent commitments.");

// W11O3e · Defending Qasr's build decision
// Correct answers are written first; the bank player shuffles options.
 
M("W11O3e-01", "W11O3e", 1, "Qasr's programme sponsor asks whether the recommended development route delivers the process approved during Innovate. What should the team demonstrate?",
  ["How the chosen route addresses the recurring 47-minute approval wait and any remaining departure from the approved design", "How the selected software compares visually with the applications demonstrated by competing vendors", "How the development team can complete its technical activities without involving the process owner", "How the lowest initial quotation can be accepted without examining the resulting corporate-arrival process"],
  "The approved redesign aims to resolve corporate rates overnight and remove the recurring 47-minute arrival wait. A defensible recommendation must explain whether the chosen route delivers that improvement and identify any remaining compromise. Technical functionality and initial price alone do not establish process fit.");
 
M("W11O3e-02", "W11O3e", 2, "Qasr's manager wants a recommendation that can be defended over four years. Which proposal provides the strongest basis for approval?",
  ["A preferred route supported by process-fit evidence, known costs, acknowledged risks and explicit conditions for unresolved issues", "The cheapest initial quotation, presented as proof that the route has the lowest four-year cost", "The option with the closest technical fit, presented without discussing maintenance or delivery capacity", "The fastest delivery route, presented without explaining which corporate arrivals remain on the old process"],
  "A defensible recommendation connects the preferred route with the approved process outcome and the obligations it creates. Qasr must distinguish known expenditure from uncertain future costs, assess delivery capacity and identify the conditions needed for approval. No single criterion automatically determines the best alternative.");
 
TF("W11O3e-03", "W11O3e", 1, "Qasr's extension option matches the approved phase five design and removes the original approval wait, but Vendor C confirms that it falls outside supported upgrade paths.", true,
  "This statement is true. The extension adds automatic corporate-agreement evaluation and preserves the intended process design. However, Vendor C confirms that the additional rules component is outside supported upgrade paths. Management must consider that technical exposure when deciding whether stronger process fit justifies the extension.");
 
TF("W11O3e-04", "W11O3e", 2, "Because the design-change option costs AED 95,000 and takes three weeks, Qasr can recommend it without explaining the consequences for bookings arriving within 24 hours.", false,
  "This statement is false. The design-change option resolves 71% of corporate arrivals, while the remaining 29% involve bookings arriving within 24 hours and retain the old approval path. A recommendation must explain that incomplete coverage and obtain appropriate approval for the resulting process compromise.");
 
DR("W11O3e-05", "W11O3e", 1, "Qasr's extension costs {1} more initially than configuration, while the design-change option leaves {2} of corporate arrivals on the old approval path.",
  [["AED 360,000", "AED 445,000", "AED 85,000"], ["29%", "71%", "100%"]],
  "Extension costs AED 540,000 initially, compared with AED 180,000 for configuration, producing a difference of AED 360,000. The design-change option resolves 71% of arrivals but leaves 29% on the old approval path. These figures describe different aspects of the decision and do not establish four-year total cost.");
 
DR("W11O3e-06", "W11O3e", 3, "Before recommending a development route, Qasr must consider the January regulatory deadline because the same {1} is needed for that work, and identify future costs that still require {2}.",
  [["delivery team", "software vendor's sales team", "corporate guest population"], ["reliable estimates", "automatic acceptance", "exclusion from the decision"]],
  "The January regulatory deadline is seven months away, and the same delivery team must complete that work. Qasr must assess whether its preferred development route leaves sufficient capacity for the regulatory commitment. Unquantified staffing, maintenance and upgrade costs also require reliable estimates before precise four-year comparisons can be made.");
 
V("W11O3e-07", "W11O3e", 2, "Which diagram best represents how Qasr should record its chosen development route so that the decision is not taken by default?", [[D.flow(["Phase 5|design", "Route|chosen", "What is|given up", "Named|approver"]), "Record the chosen route, what the organisation gives up against the phase 5 design and the named person who approved it"], [D.flow(["Vendor|default", "Route|accepted", "Go-live"]), "Accept the vendor's default route and proceed to go-live without a recorded decision"], [D.flow(["Lowest|quotation", "Approve|route", "Record|later"]), "Approve the cheapest route and write down the reasoning after delivery"], [D.flow(["Route|chosen", "Build|extension", "Never|revisit"]), "Build the chosen extension and leave it without any later review"]], "The route should be an explicit decision with a named approver. The record should state what the organisation gives up, in the words of the phase 5 design. Defaults, after-the-fact records and extensions that are never revisited let small concessions turn into an unapproved process.");
 
V("W11O3e-08", "W11O3e", 3, "Which diagram best represents a recommendation Qasr's programme sponsor could evaluate responsibly?", [
  [D.flow(["Preferred|route", "Process|outcome", "Accepted|trade-offs", "Required|evidence", "Authorised|decision"]), "Explain the preferred route, the process delivered, the trade-offs accepted, the evidence still required and the approval decision"],
  [D.flow(["Lowest|initial price", "Preferred|route", "Immediate|approval"]), "Select the cheapest option and approve it without examining operating consequences"],
  [D.flow(["Closest|technical fit", "Ignore|upgrade risk", "Approve|extension"]), "Choose the strongest technical fit without considering unsupported upgrade exposure"],
  [D.flow(["Fastest|delivery", "Assume|full coverage", "Declare|complete"]), "Choose the fastest option and assume it delivers the complete approved process"]
], "A defensible recommendation must make the selected route and its consequences visible. The sponsor needs evidence about process fit, known costs, future obligations and delivery capacity. Explicit approval conditions prevent unresolved uncertainties from being hidden behind an apparently attractive quotation.");
 
OR("W11O3e-09", "W11O3e", 2, "Put these activities in the logical order for preparing Qasr's final development-route recommendation.",
  ["Restate the approved corporate-rate improvement and the required operating capability", "Compare configuration, extension and design change against that requirement", "Identify the process compromises and continuing obligations created by each route", "Assess known costs, missing estimates and the competing regulatory commitment", "Recommend a route with explicit trade-offs, conditions and appropriate business approval"],
  "A defensible recommendation begins with the outcome Qasr originally approved. The team must then compare the available routes, identify their consequences and assess the evidence supporting each alternative. The recommendation should explain the preferred choice and the conditions required before management commits.");
 
OR("W11O3e-10", "W11O3e", 3, "Qasr's sponsor is considering approving a preferred development route conditionally. Put these checks in the logical order.",
  ["Confirm that the proposed route's effect on the approved corporate-rate process is understood", "Identify the material operational, technical and delivery risks associated with the route", "Determine which future costs and delivery-capacity assumptions still require evidence", "Document the conditions that must be satisfied before commitment", "Obtain an authorised decision accepting the justified trade-offs and required conditions"],
  "Conditional approval is appropriate when the preferred route is defensible but material uncertainties remain. Qasr should establish process fit, identify risks and specify the evidence needed before commitment. A named authority must then accept the documented trade-offs and conditions rather than treating unresolved assumptions as established facts.");
 
MA("W11O3e-11", "W11O3e", 2, "Match each Qasr development route to the principal argument and qualification its recommendation must address.",
  [["Configure Vendor C", "Supported upgrades and lower initial cost than extension, but continuing overnight human approval and additional shifts"], ["Extend Vendor C", "Automatic agreement evaluation matching the approved design, but higher initial expenditure and unsupported upgrade exposure"], ["Change the process", "Lowest initial cost and shortest delivery period, but 29% of arrivals remain on the old approval path"], ["Make a conditional recommendation", "Identify the preferred route while stating the evidence, trade-offs and approvals required before commitment"]],
  "Configuration retains supported upgrades but requires continuing manual approval. Extension preserves the approved automatic evaluation capability but introduces unsupported upgrade exposure. Changing the process reduces initial expenditure while leaving incomplete coverage. A conditional recommendation makes the resulting trade-offs and unresolved evidence explicit.");
 
MA("W11O3e-12", "W11O3e", 3, "Match each question from Qasr's programme sponsor to the evidence needed for a defensible answer.",
  [["Will the recommended route remove the problem identified during Innovate?", "Evidence showing how the route addresses the recurring 47-minute wait and any remaining approval dependency"], ["Can Qasr sustain the chosen solution over four years?", "Known initial costs together with reliable estimates of recurring staffing, maintenance and upgrade obligations"], ["Can the development team meet its other important commitment?", "Evidence that the selected route can be delivered without jeopardising the January regulatory deadline"], ["Who accepts any departure from the approved process design?", "A documented deviation and an authorised decision by the responsible business authority"]],
  "The sponsor must judge process performance, long-term sustainability, delivery feasibility and accountability. Each question requires different evidence. A strong recommendation connects the approved improvement with the actual operating outcome, distinguishes known costs from uncertainties, protects the regulatory commitment and makes material process deviations subject to explicit approval.");

// W11O3f · From Develop to Implement — and your forum
// Correct answers are written first; the bank player shuffles options.
 
M("W11O3f-01", "W11O3f", 1, "Qasr's programme sponsor asks what the Develop team must hand over before the corporate-rate process enters implementation. Which response is most complete?",
  ["Tested systems, business rules, manual procedures, exception handling arrangements and clear operational responsibilities", "A functioning software application without documented procedures because employees can establish those after go-live", "The approved process diagram alone because Implement is responsible for developing the operating capability", "A vendor demonstration showing successful routine bookings without evidence about difficult cases or departmental handovers"],
  "Develop prepares the complete operating capability, not merely functioning software. Qasr must provide tested systems, rules, interfaces, manual procedures, exception arrangements and clear responsibilities. These components allow Implement to introduce a process that employees can operate rather than discover essential gaps during deployment.");
 
M("W11O3f-02", "W11O3f", 2, "Qasr's corporate-rate software passes its technical tests, but reception employees still lack a reliable procedure for unresolved approvals. What should the programme sponsor conclude?",
  ["The capability is not operationally ready because essential manual exception handling remains incomplete", "The capability is ready because technical completion automatically establishes operational readiness", "The unresolved approvals should be excluded from implementation because they do not follow the normal workflow", "The capability has already delivered its intended benefits because the software functions correctly"],
  "Technical completion does not establish that employees can operate the entire process. Qasr must develop and test procedures for unresolved approvals, including responsibility, authority and departmental handovers. Leaving these arrangements incomplete could recreate the original arrival delay after implementation.");
 
TF("W11O3f-03", "W11O3f", 1, "Develop builds and tests the operational capability, while Implement introduces that prepared capability into everyday organisational operations.", true,
  "This statement is true. Develop prepares the systems, rules, procedures, exception paths and tested handovers required for operation. Implement is the subsequent framework phase, responsible for introducing the developed process into actual organisational practice. Completing development does not itself prove successful deployment.");
 
TF("W11O3f-04", "W11O3f", 2, "Once Qasr's developed corporate-rate process passes testing, the organisation can conclude that implementation has succeeded and the expected business benefits have already been realised.", false,
  "This statement is false. Successful development testing provides evidence that the operating capability is ready for implementation. It does not establish that the process has been deployed successfully or delivered its expected benefits. Implementation and benefits realisation remain distinct responsibilities within the BPM framework.");
 
DR("W11O3f-05", "W11O3f", 1, "In the BPM framework, {1} prepares and tests the operating capability, while {2} introduces that capability into everyday operations.",
  [["Develop", "Innovate", "Realize Value"], ["Implement", "Understand", "Launch Pad"]],
  "Develop is framework phase seven and prepares the complete operating capability. Implement follows Develop and introduces the prepared process into organisational operations. The distinction prevents technical completion from being confused with successful deployment.");
 
DR("W11O3f-06", "W11O3f", 3, "Before handing over Qasr's corporate-rate process, the team should provide {1} describing recognised unusual cases and identify the named {2} responsible for governing changes to business rules.", [["an exception catalogue", "an investment portfolio", "a benefits forecast"], ["rule owner", "software demonstrator", "corporate guest"]], "An exception catalogue documents the recognised cases that cannot complete normal processing and explains how each is handled. A named rule owner is accountable for reviewing and authorising changes to business rules. Both are needed to keep operations consistent after the developed capability is introduced.");
 
V("W11O3f-07", "W11O3f", 2, "Which diagram best represents the framework transition Qasr is preparing to make?", [
  [D.flow(["Approved|design", "Developed|capability", "Operational|handover", "Implement|process"]), "The approved design becomes a tested operating capability that is handed over for implementation"],
  [D.flow(["Approved|design", "Immediate|deployment", "Develop|procedures later"]), "The process is deployed before its operating procedures and exception arrangements are developed"],
  [D.flow(["Software|demonstration", "Assume|benefits", "Declare|complete"]), "A successful software demonstration is treated as evidence that the expected business benefits have been realised"],
  [D.flow(["Approved|design", "Implement|process", "Test|exceptions later"]), "The process enters everyday operation before its exception-handling arrangements have been tested"]
], "The approved design provides the basis for development. Develop builds and tests the complete operating capability, including technical functions and human procedures. That capability is then handed over to Implement, which introduces it into actual operations.");
 
V("W11O3f-08", "W11O3f", 3, "Qasr is preparing to implement its corporate-rate process across fourteen properties. Which diagram best represents the readiness evidence it should carry forward?", [
  [D.flow(["Tested|systems", "Exception|procedures", "Rule|ownership", "Operational|support"]), "Provide tested technical functionality, documented exception procedures, accountable rule ownership and dependable support arrangements"],
  [D.flow(["Working|software", "Ignore|manual work", "Deploy|widely"]), "Rely on functioning software while postponing manual procedures until after wider deployment"],
  [D.flow(["Approved|design", "Assume|readiness", "Deploy|properties"]), "Treat approval of the process design as sufficient evidence that the operating capability is ready"],
  [D.flow(["Routine|demonstration", "Exclude|exceptions", "Approve|rollout"]), "Use successful routine demonstrations while excluding difficult arrivals from readiness assessment"]
], "Wider implementation depends on receiving a complete and tested operating capability. Qasr needs evidence that systems, business rules, manual procedures, exception handling and support arrangements work together. Weaknesses left unresolved during Develop could affect operations across multiple properties.");
 
OR("W11O3f-09", "W11O3f", 2, "Put these activities in the logical order for preparing Qasr's developed corporate-rate capability for operational handover.",
  ["Confirm the approved corporate-rate process requirements and the operating capability needed", "Develop the systems, business rules, interfaces and manual procedures", "Document exception handling, decision authority, rule ownership and support arrangements", "Test routine and difficult cases, departmental handovers and identified corrections", "Hand over the tested capability and operating arrangements to the Implement phase"],
  "A reliable handover begins with the approved requirements and the development of the necessary technical and human capabilities. Exception arrangements and responsibilities must be documented before realistic testing establishes readiness. The tested operating capability can then be handed to Implement without leaving essential development work unfinished.");
 
OR("W11O3f-10", "W11O3f", 3, "Qasr identifies an unresolved corporate-rate exception during final readiness testing. Put these activities in the logical order before the capability is handed over.",
  ["Record the unresolved exception and the circumstances in which normal processing failed", "Identify the responsible role and the authority required to resolve the case", "Develop or correct the relevant manual procedure and departmental handover", "Retest the case with the employees who will perform the work", "Confirm that the corrected arrangement is documented and ready for operational handover"],
  "An unresolved exception must be understood and assigned to an accountable role before the operating procedure can be corrected. The responsible employees should then test the revised arrangement to establish whether it works. Documenting the verified procedure helps prevent the same weakness from reaching implementation.");
 
MA("W11O3f-11", "W11O3f", 2, "Match each item in Qasr's operational handover to the purpose it serves.",
  [["Exception catalogue", "Explains how recognised unusual corporate-rate cases should be handled"], ["Named rule owner", "Provides accountability for reviewing and authorising changes to business rules"], ["Tested departmental handover", "Establishes that information and responsibility reach the employee who must continue the case"], ["Operational support arrangement", "Provides employees with a dependable route for assistance when documented procedures are insufficient"]],
  "Each handover component addresses a different operating requirement. The exception catalogue supports consistent handling, rule ownership governs changes, tested handovers connect responsible employees, and support arrangements provide assistance for unresolved problems. Together, they help employees operate the developed process reliably.");
 
MA("W11O3f-12", "W11O3f", 3, "Match each Week 11 closing activity to the most appropriate expectation.",
  [["Completing Develop", "Provide a tested operating capability with documented procedures, responsibilities and support arrangements"], ["Preparing for Week 12", "Consider how the developed process can be implemented across fourteen properties without disrupting existing operations"], ["Writing the Automating the Exception forum response", "Defend a configure-or-customise position using process reasoning and evidence from Jeston Chapter 19"], ["Responding to classmates in the forum", "Challenge or extend the reasoning of at least two peers rather than merely expressing agreement"]],
  "Develop prepares the capability that Implement will introduce into operations. Week 12 extends Qasr's challenge to implementation across fourteen properties. The formative forum requires learners to transfer their development reasoning to an unfamiliar organisation, defend a position using the reading and engage substantively with classmates' arguments.");

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
