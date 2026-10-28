// OPER621 Business Process Management - Week 13 - The Realize Value Phase.
// Source: Week 13 Session 1 slides and Week 13 Delivery Plan.
// Core reading: Jeston, Business Process Management: Practical Guidelines to Successful Implementation, 4th edition, Chapter 21.
// Running case: Qasr Hospitality Group, eleven months after the first go-live, the audit committee benefits review.
// Case: Six Hundred And Twenty, Or Five Hundred And Five.
// Business case: AED 620,000 promised annual benefit; AED 505,000 tracked; AED 115,000 reported gap.
// Claimed components: AED 240,000 front-desk labour, AED 180,000 retained corporate revenue, AED 85,000 avoided regulatory penalty.
// Evidence limitations: headcount fell by four rather than the eleven assumed; corporate rates fell by 4% during the renewal quarter; the avoided penalty is contingent on enforcement.
// Seven of fourteen properties went live within the last four months; the programme director argues timing, while the finance director disputes financial reconciliation.
// These figures are case evidence and claims, not independently verified realised benefits.
//
// COURSE LEARNING OUTCOMES
// K2: Evaluate various factors that impact on the successful implementation
//     of BPM in public and private sector organizations.
// S1: Design a framework for BPM and explain and assess related phases
//     in the context of a regional company.
//
// WEEKLY LEARNING OUTCOMES
// O1 [S1; supporting K2]: Explain how benefits are defined, tracked and realised across a BPM programme.
// O2 [K2; supporting S1]: Evaluate why expected benefits frequently cannot be located after implementation.
// O3 [S1; supporting K2]: Design a benefits management approach with accountable ownership.
// These outcomes preserve the three official Week 13 weekly learning outcomes.
// Primary CLO mappings support adaptive tracking; both CLOs remain relevant across the week.
//
// WEEK 13 LESSON PLAN
// Lesson l1: Benefits are managed, not discovered          W13O1a, W13O1b, W13O1c   [O1; S1]
// Lesson l2: Proving what really changed                  W13O1d, W13O2a, W13O2b   [O1, O2; S1, K2]
// Lesson l3: The benefits nobody can find                 W13O2c, W13O2d, W13O2e   [O2; K2]
// Lesson l4: Making benefits accountable                  W13O3a, W13O3b, W13O3c   [O3; S1]
//
// FRAMEWORK POSITION
// Realize Value is phase nine of the ten-phase BPM implementation framework.
// It follows Implement and precedes Sustainable Performance.
// Project management, people change management and leadership remain continuous across all phases.
// Realize Value establishes whether promised benefits were delivered, assesses attribution,
// identifies actions needed to capture benefits and reports the evidence honestly.
// Benefits management is designed from the beginning of the programme, not invented after implementation.
// Phase 1 establishes strategic objectives; phase 3 establishes the agreed baseline;
// phase 5 revises the benefit estimate; phase 9 evaluates actual results against those commitments.
// Implementation establishes operational use, not proof that financial benefits have been realised.
// Sustainable Performance subsequently addresses maintaining and improving achieved performance.
//
// PRODUCTION STRUCTURE
// Course ID: oper621-w13.
// Exactly four lessons, three narrated parts per lesson, twelve parts in total.
// Each part: 430-570 narration words, sentence-linked visual moments,
// two alternative remedial micro-lessons of 230-360 words each,
// and twelve automatically graded questions using the six existing types.
// Total: 24 remedial micro-lessons and 144 formative questions.
// Question types: 3 mcq, 2 tf, 2 drop, 2 visual, 1 order, 2 match per section.
// Mastery: target 80%, window 5, minimum evidence 3.
// First check: 4; firstCheckPerSection: 3; perWeak: 3.
// Each section has enough questions for an initial check of three and three fresh remediation rounds of three.
// Section identifiers, lesson assignments and outcome mappings are fixed by this header.
// Continue the Qasr Hospitality Group narrative from Week 12 without inventing case evidence.
// Distinguish claimed, tracked, attributable, financially realised and unrealised benefits.
// Do not present the AED 505,000 tracked figure as independently verified financial benefit.
// Do not invent accounting entries, approved thresholds, comparison data or attribution percentages.
// Any illustrative calculation or proposed management action must be explicitly identified as such.
// Do not invent a final audit committee decision or a resolution of the disagreement.
// The Week 13 forum concerns a different organisation; do not invent its facts or provide its answers.
// Narration must use connected, natural teacher-to-student speech with complete explanatory sentences.
// Average sentence length: 15-18 words; no sentence over 30 words or under 6 words.
// Avoid spoken lists, mechanical enumeration and unsupported certainty.
// Use only existing moment helpers and diagram types from the Week 12 template.
// Never contradict the Week 13 slides or Delivery Plan.
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
    id: "oper621-w13",
    code: "OPER621",
    title: "The Realize Value Phase",
    subtitle: "Business Process Management · Week 13",
    author: "Prof. Bassem Jarboui",
    teacher: { name: "Prof. Bassem Jarboui", email: "", sendReport: false },
    lessons: [
      { id: "l1", title: "Benefits are managed, not discovered", sections: [
{
  title: "Going live is not the same as delivering value",
  sec: "W13O1a",
  lines: [
    ["Welcome to Week 13, where Qasr Hospitality Group faces a question that every successful implementation eventually encounters.", t("OPER621 - Week 13", "The Realize Value Phase: proving that operational change delivered business value.")],
    ["The redesigned arrival process has entered operations, but the audit committee now wants evidence of its financial contribution.", null],
    ["The original business case promised AED 620,000 in annual benefits, while the programme currently reports AED 505,000 tracked.", dg("Qasr's benefits review", D.bars([["Promised", 620], ["Tracked", 505], ["Gap", 115]]), "Amounts in AED thousands. The AED 505,000 is reported as tracked benefits, not independently verified financial realisation.")],
    ["Both figures matter, yet neither tells us whether the organisation has actually captured the value it expected.", null],
    ["That distinction brings us to Realize Value, phase nine of our ten-phase Business Process Management framework.", dg("Framework phase nine", D.route([8]), "Realize Value follows Implement and precedes Sustainable Performance in the ten-phase BPM framework.")],
    ["Implement introduced the redesigned process into everyday operations, while Realize Value examines whether its promised benefits materialised.", null],
    ["Sustainable Performance then addresses how achieved performance can be maintained and improved beyond the original implementation programme.", dg("From implementation to lasting value", D.flow(["Implement|Operational use", "Realize Value|Verified benefits", "Sustainable Performance|Maintain results"]), "Operational use, benefits realisation and sustained performance represent different responsibilities within the BPM framework.")],
    ["Imagine the programme director explaining that the redesigned process is operating across Qasr's properties and employees have adapted.", null],
    ["That statement could demonstrate implementation progress, but it would not establish that Qasr's operating budget has improved.", q("What evidence would turn a successful operational launch into a defensible claim about business value?")],
    ["A benefit is a valuable outcome attributable to change, rather than simply an activity completed during implementation.", null],
    ["For example, faster guest processing represents an operational improvement, but its financial consequences require a separate examination.", cmp("Improvement versus benefit", "Operational improvement", "Guest arrivals require less processing time.", "Realised financial benefit", "Evidence shows an attributable financial gain or reduction in actual expenditure.")],
    ["The difference matters because time released from work does not automatically become money removed from an operating budget.", null],
    ["Employees might use their available time to provide additional service while the organisation continues paying their existing salaries.", iss("Released employee capacity is not automatically equivalent to reduced operating expenditure.", "The financial conversion problem")],
    ["That additional capacity may still be valuable, but management must explain its use before claiming a financial saving.", null],
    ["Qasr's front-desk labour claim illustrates why this distinction deserves attention during the benefits review.", dg("Examining the labour claim", D.flow(["Process|Improvement", "Employee|Capacity", "Staffing|Decision", "Budget|Evidence"]), "An operational improvement becomes a defensible labour saving only when the associated staffing and financial consequences are established.")],
    ["The programme claims AED 240,000 in labour benefits, although headcount fell by four rather than the eleven originally assumed.", null],
    ["That evidence creates a question about financial conversion, rather than automatically proving that the entire labour claim failed.", q("How much of the claimed labour benefit actually changed expenditure, and what happened to the remaining capacity?")],
    ["Realize Value therefore requires managers to examine the connection between operational changes and the outcomes originally promised.", null],
    ["That connection is called benefits traceability, meaning each claim can be followed back to its objective and supporting evidence.", dg("Tracing a benefit claim", D.flow(["Strategic|Objective", "Expected|Benefit", "Operational|Measure", "Financial|Evidence"]), "Benefits traceability connects strategic intentions with measurable operating results and evidence of financial consequences.")],
    ["Benefits management should begin when objectives are agreed, rather than waiting until implementation has already finished.", null],
    ["Otherwise, managers may discover that nobody established the baseline needed to judge whether the process produced improvement.", st("Benefits must be defined and prepared for measurement before managers can credibly claim that they have been realised.")],
    ["A baseline records the relevant position before change, allowing later results to be compared against an agreed starting point.", null],
    ["Even a favourable comparison needs careful interpretation because other developments may have influenced the measured result.", dg("Evidence before a benefits claim", D.flow(["Agreed|Baseline", "Observed|Result", "Investigate|Other causes", "Assess|Attribution"]), "A measured change requires a baseline and examination of alternative explanations before it can support a benefit claim.")],
    ["At Qasr, seven properties went live within the last four months, creating a genuine question about benefit timing.", null],
    ["Recent deployment may explain delayed realisation, but timing alone cannot establish that the missing value will eventually appear.", cmp("Two explanations requiring evidence", "Timing", "Recent deployments may not have completed their benefit realisation period.", "Unrealised value", "Some expected gains may not translate into attributable financial results.")],
    ["The programme director and finance director therefore approach the same figures through different concerns about evidence and recognition.", null],
    ["Their disagreement should prompt investigation rather than an immediate assumption that either perspective must be entirely mistaken.", st("A credible benefits review separates what was promised, what was measured and what has been financially realised.")],
    ["Notice how this changes the meaning of success from completing activities to demonstrating outcomes that the organisation can defend.", null],
    ["Our next discussion will examine how those outcomes are defined, measured and traced through the entire BPM programme.", t("The question ahead", "A completed implementation is the beginning of the benefits test, not proof that the promised value exists.")]
  ],
  review: [
    {
      title: "The delivery van that saved time but not money",
      lines: [
        ["Let's approach benefits realisation through a delivery company that introduces route-planning software to reduce unnecessary driving.", t("Another way to understand Realize Value", "A delivery company shows why saving time does not automatically mean saving money.")],
        ["The software works correctly, and drivers begin following routes that require less travelling between customer addresses.", null],
        ["The operations manager celebrates because deliveries now take less time than they did under the previous arrangements.", dg("The operational improvement", D.flow(["New|Route planning", "Shorter|Driving time", "Released|Capacity"]), "The redesigned delivery process releases operating capacity, but its financial value remains to be established.")],
        ["However, the finance manager asks whether the company has actually reduced its expenditure or merely changed how employees work.", null],
        ["The drivers still receive their salaries, and the company continues operating the same number of delivery vehicles.", q("If the company pays the same salaries and vehicle costs, where would the claimed financial saving appear?")],
        ["This question reveals the difference between operational improvement and a financially realised benefit that changes actual expenditure.", null],
        ["The shorter routes may allow drivers to complete additional deliveries without increasing the resources already employed.", cmp("Two possible outcomes", "Capacity released", "Drivers can complete more work within their existing paid hours.", "Cost removed", "Evidence shows that actual operating expenditure has decreased.")],
        ["Additional delivery capacity could create value, but that value should not be confused with an automatic reduction in salary costs.", null],
        ["Management must establish what happened to the released capacity before assigning a financial amount to the improvement.", st("Time saved becomes a defensible financial benefit only when its actual economic consequences are established.")],
        ["Suppose the company subsequently reduces paid overtime because the shorter routes allow employees to finish their assigned work earlier.", null],
        ["That change could support a financial benefit claim if payroll evidence confirms an attributable reduction in overtime expenditure.", dg("From improvement to evidence", D.flow(["Shorter|Routes", "Reduced|Overtime", "Payroll|Comparison", "Verified|Saving"]), "An attributable reduction in actual overtime expenditure could support a realised financial benefit.")],
        ["However, the company would still need to compare expenditure against an agreed baseline and examine other possible explanations.", null],
        ["For example, fewer customer orders might also reduce overtime, making it misleading to credit the entire change to software.", iss("A favourable financial result does not establish that the redesigned process caused the whole improvement.", "The attribution problem")],
        ["This is why benefits management must connect the original objective with operational measurements and evidence from financial records.", null],
        ["The implementation team can demonstrate that the software operates, while management must establish what economic value actually followed.", dg("Two different management questions", D.flow(["Implement|Routes operating", "Realize Value|Benefits evidenced", "Sustain|Performance maintained"]), "Introducing the redesigned process is different from demonstrating and sustaining its economic contribution.")],
        ["Now return to Qasr, where the front-desk labour claim also depends on what happened to employee capacity.", null],
        ["Four fewer employees than before cannot automatically establish the financial value originally associated with eleven assumed reductions.", q("What additional evidence would help Qasr distinguish released reception capacity from actual reductions in labour expenditure?")],
        ["The essential lesson is that managers must prove the financial consequence rather than simply celebrate a faster process.", null],
        ["Realize Value asks whether the organisation captured the promised benefit, not merely whether employees completed work differently.", st("Successful implementation establishes operational change; benefits realisation requires evidence of the value that change produced.")]
      ]
    },
    {
      title: "The apartment renovation that looked successful",
      lines: [
        ["Now imagine an apartment owner installing energy-efficient cooling equipment because the supplier promises lower electricity expenditure.", t("A different view of benefits evidence", "An apartment renovation shows why completion and favourable results are not enough.")],
        ["The installation finishes successfully, and the new equipment operates without any apparent problems during ordinary household use.", null],
        ["The owner feels satisfied because the apartment is comfortable and the promised improvement seems technically achievable.", dg("The completed renovation", D.flow(["Equipment|Installed", "Cooling|Operating", "Comfort|Maintained"]), "Successful installation establishes that the new cooling arrangement operates, not that its promised financial benefit has materialised.")],
        ["However, the original investment was justified partly by an expectation that monthly electricity expenditure would decrease.", null],
        ["The owner must therefore examine actual bills rather than assume that installing efficient equipment automatically produces savings.", q("Would you declare the investment financially successful without comparing electricity expenditure before and after installation?")],
        ["A useful comparison requires a baseline, meaning an agreed measurement of electricity use or expenditure before the renovation.", null],
        ["Without that starting point, a later bill provides little evidence about how much the equipment actually improved performance.", st("A baseline establishes the starting position against which the promised improvement can be evaluated.")],
        ["Suppose the latest bill is lower than an earlier bill, creating an encouraging indication of possible savings.", null],
        ["The owner should still examine whether outdoor temperatures or household occupancy changed between the two measurement periods.", dg("Testing the apparent saving", D.flow(["Earlier|Bill", "Later|Bill", "Check|Other causes", "Assess|Saving"]), "A lower bill requires examination of other influences before the change can be attributed to the renovation.")],
        ["A cooler month could reduce electricity consumption even if the equipment itself contributed relatively little to the difference.", null],
        ["Similarly, fewer people occupying the apartment might reduce demand independently of the new cooling system.", cmp("Two explanations for a lower bill", "Equipment effect", "The redesigned cooling arrangement may reduce electricity consumption.", "Other influences", "Weather or occupancy may also change electricity demand.")],
        ["This creates an attribution problem because the owner must determine how much improvement reasonably belongs to the investment.", null],
        ["The owner also needs to distinguish reduced consumption from reduced expenditure when electricity prices change between measurement periods.", iss("An observed reduction in expenditure may reflect several influences rather than the equipment improvement alone.", "The evidence challenge")],
        ["Notice that none of these questions means the installation was unsuccessful or that the promised savings are impossible.", null],
        ["They simply show why operational completion and financial realisation require different evidence before management can claim success.", dg("The benefits evidence chain", D.flow(["Expected|Saving", "Agreed|Baseline", "Measured|Outcome", "Supported|Attribution", "Financial|Result"]), "A defensible benefits claim connects the original promise with measurement, attribution and actual financial consequences.")],
        ["At Qasr, the same reasoning applies when managers compare promised annual benefits with the amount currently tracked.", null],
        ["The reported AED 505,000 deserves examination because tracking a benefit does not independently establish its financial realisation.", q("Which evidence would persuade you that a tracked Qasr benefit genuinely resulted from the redesigned arrival process?")],
        ["The programme should preserve the distinction between promising value, observing improvement and demonstrating an attributable financial result.", null],
        ["Realize Value gives that distinction practical importance because the organisation must defend the investment using reliable evidence.", st("A credible benefit claim requires an agreed baseline, measured outcomes, reasonable attribution and evidence of actual value.")]
      ]
    }
  ]
},
{
  title: "The promise, the baseline and the measured result",
  sec: "W13O1b",
  lines: [
    ["Let us return to Qasr's benefits review, where the audit committee faces two figures that seem difficult to reconcile.", t("The promise, the baseline and the measured result", "Week 13 - Realize Value - W13O1b")],
    ["The business case promised AED 620,000 annually, while the programme currently reports AED 505,000 in tracked benefits.", dg("Qasr's reported position", D.bars([["Promised", 620], ["Tracked", 505], ["Gap", 115]]), "Amounts in AED thousands. Tracked benefits are not automatically verified financial benefits.")],
    ["Before deciding which figure deserves confidence, we need to understand how a benefit becomes measurable and defensible.", null],
    ["That journey begins much earlier than implementation, when management decides what the BPM programme should accomplish.", dg("The benefits journey", D.flow(["Strategic|Objective", "Agreed|Baseline", "Revised|Estimate", "Measured|Result", "Verified|Benefit"]), "The evidence chain connects early programme decisions with the eventual benefits review.")],
    ["During phase one, Strategy, managers establish the business objectives that justify investing resources in process improvement.", null],
    ["An objective expresses the desired business result, rather than describing the technology or activities required to achieve it.", cmp("Objective versus activity", "Business objective", "Reduce operating expenditure while maintaining service quality.", "Implementation activity", "Introduce a redesigned process into everyday operations.")],
    ["This distinction matters because completing an activity cannot demonstrate whether the organisation achieved its underlying business objective.", null],
    ["A useful objective therefore gives managers a reason to measure outcomes rather than merely celebrate implementation milestones.", st("The strategic objective explains why the change matters and what business value management expects.")],
    ["The next challenge is establishing a baseline, which records the agreed position before the improvement takes effect.", null],
    ["During phase three, Launch Pad, baseline evidence helps establish the starting conditions against which future performance will be judged.", dg("Why the baseline matters", D.flow(["Before|Baseline", "After|Measurement", "Compare|Difference", "Investigate|Cause"]), "A baseline supports comparison, but attribution still requires examination of other influences.")],
    ["Without a credible baseline, managers may observe improvement without knowing how much change actually occurred.", null],
    ["Even with a baseline, they must check whether other developments influenced the result during the measurement period.", q("If performance improves after implementation, how would you determine whether the redesigned process caused that improvement?")],
    ["Now consider phase five, Innovate, where the emerging process design allows the expected benefits to be reconsidered.", null],
    ["The revised estimate should reflect what the proposed design can realistically deliver, rather than preserve unsupported optimism.", dg("Refining the benefit expectation", D.flow(["Original|Expectation", "Proposed|Design", "Revised|Estimate", "Agreed|Commitment"]), "Design knowledge should inform a realistic benefit estimate before the organisation commits to implementation.")],
    ["This creates an important distinction between an early business case and the estimate management eventually accepts for delivery.", null],
    ["A changed estimate should remain traceable, allowing decision makers to understand why the expected value was revised.", st("A credible benefits commitment preserves the reasoning behind the estimate, not merely its final financial amount.")],
    ["When phase nine arrives, Realize Value compares actual results with those earlier commitments and their supporting assumptions.", null],
    ["The comparison must also establish whether operational improvements produced benefits that the organisation can genuinely recognise.", dg("Phase nine evidence test", D.flow(["Promised|Value", "Observed|Change", "Test|Attribution", "Confirm|Realisation"]), "A reported improvement becomes a defensible benefit only after its contribution and realisation are examined.")],
    ["At Qasr, the AED 620,000 promise provides a reference point, but it does not establish realised value.", null],
    ["Likewise, the AED 505,000 tracked figure requires supporting evidence before anyone treats it as financially verified.", cmp("Two different questions", "AED 620,000 promised", "What value did the business case expect?", "AED 505,000 tracked", "What value has the programme reported, and how much is defensible?")],
    ["The difference is AED 115,000, yet that arithmetic cannot explain whether the gap reflects timing or unrealised benefits.", null],
    ["Seven properties went live within the last four months, so deployment timing deserves investigation rather than automatic acceptance.", iss("Recent deployment may explain delayed benefits, but timing does not prove that the missing value will eventually materialise.", "The timing question")],
    ["The programme director emphasises timing, while the finance director questions whether the reported value reconciles with financial evidence.", null],
    ["Both concerns belong in a responsible review because measurement and financial recognition answer related but different questions.", dg("Two necessary perspectives", D.flow(["Programme|Tracked results", "Finance|Financial evidence", "Review|Reconciled claim"]), "A defensible benefits review considers both operational measurement and financial reconciliation.")],
    ["Notice that benefits traceability connects the original objective, agreed baseline, revised expectation and observed result.", null],
    ["If any connection is missing, the audit committee cannot confidently explain how the claimed value was produced.", st("Traceability allows managers to follow a benefit from strategic intention to measurable and defensible business value.")],
    ["In our next discussion, we will examine why different kinds of benefit require different forms of evidence.", t("The central lesson", "A promise establishes the target, a baseline establishes the starting point, and evidence establishes what was realised.")]
  ],
  review: [
    {
      title: "The cafe that promised shorter waiting times",
      lines: [
        ["Imagine a neighbourhood cafe introducing a new ordering arrangement because customers regularly complain about waiting too long.", t("A cafe's improvement promise", "Understanding objectives, baselines and measured results through an everyday service process.")],
        ["The owner believes the redesigned arrangement will improve customer experience, but that expectation still needs measurable evidence.", null],
        ["The business objective concerns shorter waiting times, while installing ordering equipment is merely one possible implementation activity.", cmp("Purpose versus activity", "Business objective", "Reduce the time customers spend waiting for orders.", "Implementation activity", "Introduce a redesigned ordering arrangement.")],
        ["Before changing the process, the owner measures how long customers currently wait during comparable periods of operation.", null],
        ["That measurement becomes the baseline, providing an agreed starting point for evaluating whether the redesign produces improvement.", dg("Establishing the baseline", D.flow(["Existing|Process", "Measure|Waiting time", "Record|Baseline"]), "The baseline describes performance before the redesigned ordering process begins.")],
        ["Suppose the owner later observes shorter queues and concludes that the new arrangement has achieved its purpose.", null],
        ["That conclusion may be reasonable, but the owner should examine actual waiting times rather than rely on appearances.", q("Could a shorter queue reflect fewer customers rather than a genuinely faster ordering process?")],
        ["Customer demand might have declined, meaning the apparent improvement could partly reflect circumstances unrelated to the redesign.", null],
        ["The owner therefore compares similar operating periods and investigates alternative explanations before attributing improvement to the change.", dg("Testing the result", D.flow(["Baseline|Waiting time", "Current|Waiting time", "Check|Customer demand", "Assess|Improvement"]), "Comparisons become more credible when managers consider influences beyond the redesigned process.")],
        ["Even a demonstrated reduction in waiting time would not automatically establish that the cafe earned additional profit.", null],
        ["The owner would need separate evidence connecting improved service with financial consequences before claiming a monetary benefit.", iss("A measured service improvement does not automatically establish an attributable financial gain.", "The financial evidence gap")],
        ["Now return to Qasr, where the programme similarly needs evidence connecting its original expectations with observed operational results.", null],
        ["The promised AED 620,000 establishes an expectation, while the tracked AED 505,000 remains subject to further verification.", dg("Applying the same logic to Qasr", D.flow(["Original|Promise", "Agreed|Baseline", "Observed|Result", "Verified|Value"]), "Each claimed Qasr benefit needs a traceable relationship between the expectation and supporting evidence.")],
        ["The audit committee should therefore examine the assumptions and measurements supporting each claimed benefit rather than compare totals alone.", null],
        ["That approach makes disagreements more productive because managers can investigate specific evidence instead of defending competing headline figures.", st("A credible benefit claim connects the original objective, baseline, measured improvement and evidence of realised value.")],
        ["Remember that a completed process redesign establishes what changed, while benefits measurement establishes what the change achieved.", null],
        ["The distinction helps managers recognise genuine improvements without claiming financial value that the available evidence cannot support.", t("What the cafe teaches us", "Measure the starting point, investigate the change, and verify the claimed business consequence.")]
      ]
    },
    {
      title: "The home water-saving promise",
      lines: [
        ["Consider a household replacing its old shower fittings because the family hopes to reduce monthly water expenditure.", t("A household benefits review", "A familiar example of promises, baselines, measurement and financial verification.")],
        ["The new fittings are installed successfully, but the family cannot yet know whether the expected savings have materialised.", null],
        ["The installation demonstrates that the planned change occurred, whereas the promised benefit concerns actual water use and expenditure.", cmp("Two different achievements", "Implementation", "Water-saving fittings have been installed and are operating.", "Benefits realisation", "Evidence demonstrates an attributable reduction in water use or expenditure.")],
        ["Before installation, the family could record its normal water consumption and expenditure over a representative comparison period.", null],
        ["Those records establish the baseline, allowing later results to be assessed against the household's previous position.", dg("Building the evidence", D.flow(["Previous|Consumption", "Agreed|Baseline", "New|Consumption", "Compare|Results"]), "A meaningful comparison requires a recorded starting point and a measured result.")],
        ["Suppose the family expected lower monthly bills but discovers that expenditure remains almost unchanged after the renovation.", null],
        ["The family should investigate the difference instead of immediately declaring either complete success or complete failure.", q("What could explain unchanged expenditure even when the new fittings reduce water consumption?")],
        ["Perhaps household water use increased elsewhere, offsetting the reduction achieved through the redesigned shower fittings.", null],
        ["Alternatively, changes in the price of water could affect expenditure independently of changes in physical consumption.", dg("Understanding the difference", D.flow(["Expected|Saving", "Measured|Consumption", "Check|Other influences", "Assess|Expenditure"]), "Water consumption and expenditure are related measures, but they do not necessarily change by identical amounts.")],
        ["These possibilities illustrate why a benefit estimate should remain connected to the assumptions supporting its original calculation.", null],
        ["When assumptions change, managers need to explain whether the expected benefit remains realistic and how it should be measured.", st("A benefit estimate is credible when its assumptions, measurement method and expected outcome remain transparent.")],
        ["Imagine that the household later confirms lower water consumption but cannot yet establish a corresponding financial saving.", null],
        ["The family can report the operational improvement honestly while keeping the financial benefit subject to further examination.", cmp("Honest reporting", "Measured improvement", "Water consumption has decreased against a comparable baseline.", "Financial benefit", "An attributable reduction in actual expenditure still requires verification.")],
        ["That distinction resembles Qasr's challenge, where tracked benefits must not automatically be presented as financially realised value.", null],
        ["The programme director's timing concern and the finance director's reconciliation concern both require evidence rather than assumptions.", dg("The Qasr evidence chain", D.flow(["Business|Expectation", "Measured|Outcome", "Review|Attribution", "Financial|Reconciliation"]), "Qasr needs to connect its original benefit expectations with measured and financially defensible outcomes.")],
        ["A strong review would preserve the original promise while explaining what has been measured and what remains uncertain.", null],
        ["It would also identify the evidence needed to resolve uncertainty without inventing results or assuming future benefits are guaranteed.", st("The promise is not the result, and the measured result is not automatically the realised financial benefit.")],
        ["This reasoning prepares us to examine different benefit categories, because each requires evidence suited to its economic meaning.", t("The household lesson", "Keep the promise, baseline, measured outcome and verified financial consequence clearly connected.")]
      ]
    }
  ]
},
{
  title: "Five kinds of benefit, five different tests",
  sec: "W13O1c",
  lines: [
    ["Let us return to Qasr's audit committee, where the promised benefits look convincing until someone examines their meaning.", t("Five kinds of benefit, five different tests", "Week 13 - Realize Value - W13O1c")],
    ["The difficulty is that different benefits require different evidence, even when managers express every claim in monetary terms.", null],
    ["A useful way to understand this problem is to distinguish five forms of value that process improvements might create.", dg("Five benefit categories", D.flow(["Cost removed", "Cost avoided", "Revenue gained", "Risk reduced", "Capacity released"]), "These categories describe different economic consequences and therefore require different tests.")],
    ["Consider cost removed, where an improvement allows the organisation to eliminate expenditure that previously appeared in its accounts.", null],
    ["The essential test is whether actual expenditure decreased because of the redesigned process, rather than merely becoming theoretically avoidable.", cmp("Cost removed", "Operational change", "The redesigned process requires fewer resources.", "Financial test", "Evidence confirms an attributable reduction in actual expenditure.")],
    ["Qasr's AED 240,000 front-desk labour claim raises precisely this question because its original assumptions involved staffing reductions.", null],
    ["Headcount fell by four rather than the eleven assumed, so the financial consequence requires examination rather than automatic acceptance.", q("If employees become more productive but salaries remain unchanged, has the organisation actually removed those salary costs?")],
    ["Now consider cost avoided, which concerns expenditure the organisation would otherwise reasonably expect to incur in the future.", null],
    ["Unlike cost removed, this benefit depends on a defensible comparison with a future situation that did not occur.", dg("Cost avoided", D.flow(["Expected|Future cost", "Process|Intervention", "Cost|Not incurred", "Test|Credibility"]), "Avoided cost requires evidence that the expenditure would otherwise have been reasonably expected.")],
    ["For example, a process might prevent additional staffing expenditure that growing demand would otherwise have required.", null],
    ["However, management must support that expected expenditure rather than treat every hypothetical future cost as a saving.", st("Cost avoided requires a credible counterfactual, meaning a supported account of what would otherwise have happened.")],
    ["Revenue gained presents another challenge because increased sales do not necessarily translate into an equivalent increase in profit.", null],
    ["The organisation must establish whether the process caused additional revenue and what financial contribution actually followed.", dg("Testing revenue gained", D.flow(["Process|Improvement", "Additional|Business", "Attribution|Evidence", "Financial|Contribution"]), "Additional revenue requires causal evidence, while its economic contribution may differ from its gross amount.")],
    ["Qasr claims AED 180,000 in retained corporate revenue, but corporate rates also fell during the renewal quarter.", null],
    ["That four percent rate reduction complicates attribution because retention may reflect pricing decisions alongside improvements in service.", iss("Retained revenue cannot automatically be attributed entirely to the redesigned process when pricing also changed.", "The revenue attribution problem")],
    ["Risk reduced concerns a lower likelihood or consequence of an undesirable event, rather than necessarily producing immediate cash.", null],
    ["Qasr's AED 85,000 avoided regulatory penalty illustrates why a potential exposure must not automatically become realised financial value.", cmp("Risk reduction versus realised saving", "Reduced exposure", "A process may lower the likelihood of regulatory penalties.", "Realised financial saving", "A defensible financial claim requires evidence that the relevant cost was genuinely avoided.")],
    ["The penalty remains contingent on enforcement, so its treatment requires careful explanation of the underlying assumptions.", null],
    ["A risk reduction may be valuable even when finance cannot recognise its estimated exposure as realised expenditure savings.", st("Risk reduction has economic significance, but estimated exposure and realised financial benefit are not interchangeable.")],
    ["Finally, capacity released means the same resources can perform additional work because the redesigned process requires less effort.", null],
    ["This may improve service or accommodate demand, but its financial value depends on how management uses that capacity.", dg("Testing released capacity", D.flow(["Less|Processing effort", "Available|Capacity", "Management|Decision", "Demonstrated|Value"]), "Released capacity becomes a defensible benefit when its subsequent use and consequences are established.")],
    ["At Qasr, fewer employees than originally assumed make this distinction especially important when examining front-desk labour benefits.", null],
    ["The programme should identify what capacity was released and whether that capacity produced measurable organisational value.", q("Could Qasr demonstrate a genuine operational improvement without demonstrating the full labour saving originally promised?")],
    ["Notice how these categories explain why combining benefit claims into one total can conceal important differences in evidence.", null],
    ["Each claim needs an appropriate test before management can confidently describe the combined amount as financially realised.", dg("Different claims, different evidence", D.flow(["Identify|Benefit type", "Select|Evidence test", "Assess|Attribution", "Confirm|Realisation"]), "The benefits review must apply evidence appropriate to each claimed economic consequence.")],
    ["The audit committee should therefore examine the nature of every Qasr claim rather than accept its monetary label.", null],
    ["That discipline protects genuine improvements while preventing uncertain, contingent or unrealised value from being reported as established savings.", t("The central lesson", "The benefit category determines the evidence needed to demonstrate realisation.")]
  ],
  review: [
    {
      title: "The bakery that became more productive",
      lines: [
        ["Imagine a small bakery introducing equipment that helps employees prepare bread more quickly without changing the finished product.", t("The bakery's benefits puzzle", "Why greater productivity can create several different kinds of value.")],
        ["The owner notices that employees now complete their morning preparation earlier, leaving additional time before the shop opens.", null],
        ["That improvement releases capacity because the same employees can accomplish their original work with less processing effort.", dg("The bakery improvement", D.flow(["Faster|Preparation", "Less|Employee time", "Released|Capacity"]), "Productivity creates available capacity, but the economic consequence depends on its subsequent use.")],
        ["The owner initially calls this a labour saving, although every employee continues receiving the same salary.", null],
        ["That description is misleading because faster work has not yet removed expenditure from the bakery's accounts.", cmp("Capacity versus cost", "Capacity released", "Employees finish their existing preparation work earlier.", "Cost removed", "Actual payroll expenditure decreases because of the improvement.")],
        ["Suppose the owner uses the available time to prepare additional products that customers subsequently purchase.", null],
        ["The resulting sales could represent additional revenue, provided the bakery can establish that the improvement enabled them.", q("Would the value of additional sales necessarily equal the profit earned from those sales?")],
        ["The bakery must consider the associated costs before interpreting extra revenue as an equivalent financial contribution.", null],
        ["Alternatively, the owner might avoid hiring another employee when customer demand increases during a busy period.", dg("Another possible benefit", D.flow(["Higher|Demand", "Available|Capacity", "No additional|Employee", "Avoided|Hiring cost"]), "Avoided hiring expenditure requires credible evidence that an additional employee would otherwise have been necessary.")],
        ["That would be cost avoided rather than cost removed because the bakery prevented expenditure instead of reducing existing payroll.", null],
        ["However, the owner must demonstrate that the additional employee would otherwise have been needed under realistic operating conditions.", st("The same productivity improvement can support different benefit claims, but each claim requires its own evidence.")],
        ["Now imagine the equipment also makes preparation more consistent, reducing the likelihood of products failing quality checks.", null],
        ["That change may reduce operational risk, although its estimated value should not automatically be treated as realised cash.", dg("The evidence test", D.flow(["Identify|Claim", "Measure|Change", "Examine|Alternative causes", "Verify|Economic result"]), "The bakery must connect each claimed benefit to its actual economic consequence.")],
        ["The distinction helps explain Qasr's difficulty when evaluating labour savings, retained revenue and avoided regulatory penalties.", null],
        ["Those claims describe different kinds of value, so they cannot all be verified using the same financial test.", q("Which evidence would demonstrate that Qasr actually removed labour expenditure rather than merely released employee capacity?")],
        ["A responsible benefits review preserves genuine operational achievements while separating them from financially realised outcomes.", null],
        ["The bakery teaches us that benefit categories are not labels chosen for convenience but distinct economic claims.", st("Identify what changed, determine the benefit category, and test the financial consequence before claiming realisation.")]
      ]
    },
    {
      title: "The family car and the meaning of savings",
      lines: [
        ["Consider a family replacing its older car with a more efficient vehicle to reduce everyday transport expenditure.", t("The family car example", "Understanding why different financial benefits require different evidence.")],
        ["The new car uses less fuel per journey, creating an operational improvement that the family can measure.", null],
        ["However, lower fuel consumption does not automatically establish the amount of money saved over an entire month.", dg("From efficiency to financial value", D.flow(["Lower|Fuel consumption", "Actual|Travel", "Fuel|Expenditure", "Verified|Saving"]), "Financial savings depend on actual expenditure, not efficiency alone.")],
        ["If the family drives considerably farther than before, total fuel expenditure might remain unchanged despite improved efficiency.", null],
        ["The family therefore needs actual expenditure records and comparable driving conditions before claiming that costs were removed.", cmp("Efficiency versus expenditure", "Operational improvement", "The vehicle consumes less fuel for comparable journeys.", "Cost removed", "Actual attributable fuel expenditure decreases.")],
        ["Now suppose the family expects the efficient vehicle to prevent future expenditure on additional fuel during longer journeys.", null],
        ["That expectation represents potential cost avoidance, but its credibility depends on the journeys that would otherwise occur.", q("Can the family claim avoided expenditure for journeys that were never realistically expected to happen?")],
        ["The answer depends on whether the assumed future expenditure is supported rather than merely imagined for the calculation.", null],
        ["Imagine also that the new vehicle requires fewer repairs, reducing the family's exposure to unexpected mechanical problems.", dg("Understanding risk reduction", D.flow(["Improved|Reliability", "Lower|Breakdown risk", "Reduced|Exposure", "Assess|Financial effect"]), "Reduced risk can be valuable without automatically establishing a realised monetary saving.")],
        ["The family might estimate the cost of a breakdown, but avoiding a possible event is not equivalent to receiving cash.", null],
        ["Any financial claim must distinguish a credible reduction in risk from expenditure that was actually prevented.", st("Risk reduction and realised savings describe related but different economic consequences.")],
        ["The efficient vehicle might also allow the family to complete its regular travel with fewer refuelling stops.", null],
        ["That convenience releases time, but the time does not automatically translate into additional household income.", cmp("Time released versus income gained", "Capacity released", "The family spends less time refuelling during regular travel.", "Financial contribution", "Evidence shows that the available time produced additional economic value.")],
        ["Suppose someone uses that available time for paid work, creating income that would otherwise have been unavailable.", null],
        ["The family would still need to establish the connection before attributing the additional income to the vehicle.", dg("Matching claims with evidence", D.flow(["Describe|Improvement", "Classify|Benefit", "Test|Attribution", "Confirm|Value"]), "Different benefit categories require evidence suited to their actual economic meaning.")],
        ["Return now to Qasr, where labour, retained revenue and regulatory exposure also represent different economic claims.", null],
        ["The audit committee should therefore avoid treating their reported monetary amounts as equally certain or equally realised.", q("Why would a contingent regulatory penalty require different evidence from a reduction in actual salary expenditure?")],
        ["Because the economic mechanisms differ, a defensible review must explain the assumptions and evidence supporting each claim.", null],
        ["That approach makes the benefits total more meaningful by showing which components have genuinely been established.", st("A reliable benefits review tests each claimed value according to its economic nature and supporting evidence.")]
      ]
    }
  ]
},
      ] },
      { id: "l2", title: "Proving what really changed", sections: [
{
  title: "When two causes change the same result",
  sec: "W13O1d",
  lines: [
    ["Let us continue Qasr's benefits review by examining a problem that can make genuine improvements surprisingly difficult to prove.", t("When two causes change the same result", "Week 13 - Realize Value - W13O1d")],
    ["A measured result may improve after implementation, yet the redesigned process might not explain the entire improvement.", null],
    ["This is the problem of attribution, which means establishing how much of an observed change belongs to a particular cause.", dg("The attribution problem", D.flow(["Process|Change", "Other|Influences", "Observed|Result", "Assess|Contribution"]), "Several influences can affect one measured outcome, so attribution requires more than observing improvement.")],
    ["Consider the example of debtor days, which measures how long customers typically take to settle outstanding invoices.", null],
    ["Suppose debtor days fall from forty-seven to thirty-one after an organisation introduces a redesigned collection process.", dg("The observed improvement", D.bars([["Before", 47], ["After", 31]]), "Illustrative debtor days. The observed reduction is sixteen days, but its cause remains uncertain.")],
    ["The reduction of sixteen days looks impressive because the organisation now appears to collect outstanding payments more quickly.", null],
    ["However, imagine that management also introduced a late-payment penalty during the same period as the process redesign.", iss("Two changes occurred during the same period, so the observed improvement cannot automatically be attributed to one.", "The competing causes")],
    ["Customers might pay earlier because collection reminders became more effective, or because late payment now carries an additional cost.", null],
    ["Both explanations are plausible, and their contributions cannot be separated merely by comparing the original and final figures.", dg("Two possible causes", D.flow(["Redesigned|Collections", "Late-payment|Penalty", "Faster|Customer payment"]), "The process redesign and the new penalty may both influence the same debtor-days result.")],
    ["This distinction matters because the programme should not claim financial value that another management intervention actually produced.", null],
    ["A credible benefits review therefore investigates alternative explanations before assigning the observed improvement to the BPM programme.", st("An improvement occurring after implementation is not necessarily an improvement caused entirely by implementation.")],
    ["One useful approach is to examine comparable groups that experienced different combinations of the relevant changes.", null],
    ["For example, a comparison group might experience the collection redesign without receiving the new late-payment penalty.", dg("A possible comparison design", D.lanes(["Group A", "Group B"], [[0, "Redesigned collections"], [0, "No new penalty"], [1, "Redesigned collections"], [1, "New penalty"]]), "This hypothetical comparison could help investigate the penalty's contribution, provided the groups are sufficiently comparable.")],
    ["Differences between their outcomes might provide useful evidence, although customer characteristics and other influences would still matter.", null],
    ["The purpose is not to manufacture certainty but to improve the explanation of what genuinely produced the result.", q("If both groups improve, what additional evidence would help distinguish the process effect from the penalty effect?")],
    ["Now return to Qasr, where the retained corporate revenue claim creates a similar attribution challenge.", null],
    ["The programme claims AED 180,000 in retained corporate revenue, while corporate rates fell by four percent during renewal.", dg("Qasr's competing explanations", D.flow(["Redesigned|Arrival process", "Corporate|Rate reduction", "Contract|Retention", "Assess|Attribution"]), "Corporate retention may reflect service improvements, pricing decisions or their combined influence.")],
    ["The redesigned process may have contributed to retention, but the rate reduction provides another plausible explanation.", null],
    ["Without additional evidence, management cannot confidently assign the entire retained revenue claim to the process improvement.", cmp("Observed outcome versus attribution", "Observed retention", "Corporate business was retained during a period when rates also changed.", "Attributed benefit", "Evidence establishes the contribution reasonably attributable to the redesigned process.")],
    ["Notice that uncertainty about attribution does not mean the redesigned process created no value for the organisation.", null],
    ["It means the available evidence must support the amount claimed rather than simply confirm that retention occurred.", st("Uncertain attribution requires an honest qualification, not an automatic assumption of either complete success or complete failure.")],
    ["Qasr's labour claim raises another question because headcount fell by four rather than the eleven originally assumed.", null],
    ["That difference requires investigation of actual expenditure, staffing decisions and any capacity released through the redesigned process.", dg("Testing the labour claim", D.flow(["Original|Staffing assumption", "Actual|Headcount change", "Payroll|Evidence", "Defensible|Benefit"]), "A staffing assumption and an observed headcount change do not independently establish the realised labour saving.")],
    ["The audit committee therefore needs evidence connecting each claimed benefit with the changes that reasonably produced it.", null],
    ["A lower figure supported by credible attribution may be more useful than a larger figure supported by assumptions.", q("Would you prefer a large benefits claim with uncertain causes or a smaller claim supported by defensible evidence?")],
    ["The objective is not to diminish genuine programme achievements but to distinguish demonstrated contribution from unsupported financial credit.", null],
    ["That discipline makes benefits reporting more trustworthy and helps management understand which interventions actually deserve continued investment.", t("The central lesson", "Measure the change, investigate competing causes, and claim only the contribution the evidence can defend.")]
  ],
  review: [
    {
      title: "The garden that improved after two changes",
      lines: [
        ["Imagine a gardener introducing a new watering schedule because several plants have been growing more slowly than expected.", t("The garden attribution puzzle", "Two interventions can influence the same observed improvement.")],
        ["During the same week, the gardener also replaces the old soil with a mixture designed to support healthier growth.", null],
        ["A month later, the plants look healthier, and their growth appears considerably stronger than before either change.", dg("The observed result", D.flow(["New|Watering schedule", "Improved|Soil", "Healthier|Plants"]), "Both changes occurred before the improvement, so their separate contributions remain uncertain.")],
        ["The gardener immediately credits the new watering schedule, believing that the experiment has demonstrated its effectiveness.", null],
        ["However, the improved soil offers another plausible explanation because plant growth depends on several interacting conditions.", iss("The improvement followed the watering change, but another intervention occurred during the same period.", "The attribution problem")],
        ["This is why observing an improvement after an intervention does not establish that the intervention caused the entire result.", null],
        ["The gardener could investigate comparable plants receiving different treatments, provided their growing conditions remain sufficiently similar.", dg("A possible comparison", D.lanes(["Group A", "Group B", "Group C"], [[0, "New watering"], [0, "Original soil"], [1, "Original watering"], [1, "Improved soil"], [2, "New watering"], [2, "Improved soil"]]), "Hypothetical comparison groups can help investigate separate and combined effects when other growing conditions are comparable.")],
        ["Such comparisons might reveal whether watering, soil quality or their combination contributes most strongly to healthier growth.", null],
        ["However, differences in sunlight or plant varieties could still complicate the interpretation of the observed results.", q("What would happen to your conclusion if the healthiest plants also received substantially more sunlight?")],
        ["That additional influence demonstrates why attribution requires attention to circumstances beyond the intervention being evaluated.", null],
        ["The gardener should therefore describe the observed improvement honestly while acknowledging any remaining uncertainty about its causes.", st("A credible explanation distinguishes what improved from what can reasonably be credited with producing the improvement.")],
        ["Now return to Qasr, where corporate retention occurred during a period that also included a rate reduction.", null],
        ["The redesigned arrival process may have contributed, but pricing provides another explanation that management must investigate.", dg("Applying the garden lesson", D.flow(["Process|Improvement", "Pricing|Change", "Corporate|Retention", "Investigate|Contribution"]), "Qasr must distinguish the contribution of service improvement from other influences on corporate retention.")],
        ["Without sufficient evidence, assigning the entire AED 180,000 claim to the redesigned process would overstate what is established.", null],
        ["That uncertainty does not invalidate the process improvement, but it limits the strength of the financial attribution claim.", cmp("Two different conclusions", "Defensible observation", "Corporate retention occurred while service and pricing conditions changed.", "Unsupported conclusion", "The redesigned process alone produced the entire claimed retention benefit.")],
        ["The lesson is that managers should investigate competing explanations before translating an observed improvement into financial credit.", null],
        ["Benefits reporting becomes more trustworthy when claims reflect evidence rather than the desire to demonstrate programme success.", st("Claim the contribution supported by evidence, and explain honestly what remains uncertain.")]
      ]
    },
    {
      title: "The student's improved examination result",
      lines: [
        ["Consider a student who begins using a new study application because previous examination results have been disappointing.", t("The examination improvement puzzle", "Why an improved outcome may have several contributing causes.")],
        ["At the same time, the student joins a study group that meets regularly to discuss difficult course concepts.", null],
        ["The next examination result improves considerably, encouraging the student to recommend the application to everyone.", dg("Two changes, one result", D.flow(["Study|Application", "Study|Group", "Improved|Examination result"]), "The observed improvement follows two learning interventions, making their separate contributions uncertain.")],
        ["However, the improved result cannot automatically be attributed entirely to the application because the study group also changed.", null],
        ["Both interventions may have helped, and their combined effect could differ from either intervention operating independently.", cmp("Observation versus explanation", "Observed improvement", "The examination result improved after both study changes.", "Causal explanation", "Evidence establishes which changes contributed and how strongly.")],
        ["The student might compare performance across different topics where the application and study group received different levels of use.", null],
        ["Such comparisons could provide useful clues, although differences in topic difficulty would still complicate the conclusions.", dg("Investigating contribution", D.flow(["Record|Study activities", "Compare|Topic results", "Check|Difficulty", "Assess|Contribution"]), "Evidence about exposure and comparable outcomes can help investigate the contribution of each learning intervention.")],
        ["The student should also consider whether the later examination was easier or whether previous experience improved examination technique.", null],
        ["These possibilities illustrate how an observed outcome can reflect influences that were not part of the original intervention.", q("Would a higher examination score prove that the application alone caused the student's improvement?")],
        ["The sensible answer is that the application may have helped, but the available evidence does not establish its entire contribution.", null],
        ["The student can celebrate the improvement while remaining careful about the explanation offered to other learners.", st("Recognising an improvement and establishing its cause are separate analytical tasks.")],
        ["Now consider Qasr's retained corporate revenue claim, where the redesigned process and changed corporate rates coexist.", null],
        ["A retained contract demonstrates an outcome, but it does not independently establish why the customer chose to renew.", dg("The same attribution challenge", D.flow(["Service|Improvement", "Corporate|Pricing", "Customer|Decision", "Assess|Contribution"]), "Customer retention may reflect several influences, requiring evidence before assigning financial credit.")],
        ["The programme therefore needs evidence explaining how much retention can reasonably be associated with the process redesign.", null],
        ["Without that evidence, the AED 180,000 claim remains a reported benefit whose attribution requires further examination.", iss("A reported monetary benefit is not automatically a verified contribution from the BPM programme.", "The financial attribution limit")],
        ["This distinction also matters when Qasr examines labour savings against the staffing reductions originally assumed in its business case.", null],
        ["Management must connect the observed staffing changes with actual financial consequences rather than rely on the original assumptions.", q("What evidence would help separate a genuine process contribution from changes caused by other management decisions?")],
        ["The aim is not to reject uncertain benefits but to identify which claims are supported and which need further investigation.", null],
        ["A defensible benefits review gives decision makers a clearer explanation of the value their investment actually created.", st("Better attribution produces more credible benefits claims and more informed decisions about future process investments.")]
      ]
    }
  ]
},
{
  title: "The gap between promised and tracked",
  sec: "W13O2a",
  lines: [
    ["Let us return to Qasr's audit committee, where a difference between two benefit figures demands careful explanation.", t("The gap between promised and tracked", "Week 13 - Realize Value - W13O2a")],
    ["The business case promised AED 620,000 annually, while the programme currently reports AED 505,000 in tracked benefits.", dg("Qasr's benefits position", D.bars([["Promised", 620], ["Tracked", 505], ["Gap", 115]]), "Amounts in AED thousands. The tracked figure is not automatically verified financial value.")],
    ["The difference is AED 115,000, but subtraction alone cannot explain why the expected value has not appeared.", null],
    ["We need to distinguish benefits awaiting realisation from benefits requiring management action and benefits that may never materialise.", dg("Possible explanations for the gap", D.flow(["Timing", "Action required", "Unrealisable expectation"]), "These are possible explanations to investigate, not established allocations of Qasr's AED 115,000 gap.")],
    ["Consider timing, because some improvements take time to produce measurable results after a redesigned process begins operating.", null],
    ["At Qasr, seven of fourteen properties went live within the last four months, making timing a relevant consideration.", dg("Qasr's deployment timing", D.bars([["Recent go-lives", 7], ["Other properties", 7]]), "Seven of fourteen properties went live within the last four months. The chart does not establish benefit maturity or realisation.")],
    ["The programme director argues that recent deployment helps explain why the reported benefits remain below the original promise.", null],
    ["That explanation deserves investigation, but it does not prove that the missing benefits will eventually become financially real.", iss("Recent implementation can delay benefits, but delayed realisation must be demonstrated rather than assumed.", "The timing explanation")],
    ["A timing claim becomes more credible when managers identify the expected measurement period and evidence of emerging improvement.", null],
    ["They should also explain when the benefit can reasonably be assessed and what would challenge the original expectation.", dg("Testing a timing explanation", D.flow(["Deployment|Date", "Expected|Benefit period", "Measured|Progress", "Review|Evidence"]), "A timing explanation needs a defensible measurement period and observable evidence, not simply an expectation of future improvement.")],
    ["Now consider benefits that require additional management action before operational improvements can produce the expected financial consequences.", null],
    ["A faster process might release employee capacity without reducing expenditure because staffing arrangements remain unchanged.", cmp("Improvement versus capture", "Operational improvement", "The redesigned process requires less employee effort.", "Financial capture", "Management decisions convert the improvement into an attributable economic benefit.")],
    ["The improvement may be genuine, but someone must decide how the released capacity will create measurable organisational value.", null],
    ["Without that decision, a benefit can remain theoretically available while never appearing in the operating accounts.", st("Some benefits require deliberate management action after implementation before their financial value can be captured.")],
    ["Qasr's labour claim makes this distinction important because the original assumption involved eleven fewer employees.", null],
    ["Actual headcount fell by four, so the claimed AED 240,000 requires examination against real staffing and expenditure evidence.", dg("Examining the labour assumption", D.bars([["Assumed reduction", 11], ["Actual reduction", 4]]), "The staffing figures describe headcount changes, not verified financial savings.")],
    ["Management should investigate whether additional capacity exists and what decisions would be needed to realise its potential value.", null],
    ["However, no additional labour saving should be recognised merely because management might take those decisions later.", q("Would you count a possible future staffing decision as a saving already realised in the current accounts?")],
    ["The remaining possibility is that some expectations were unrealistic or depended on assumptions that subsequent evidence cannot support.", null],
    ["For example, retained revenue may reflect pricing changes, making the process contribution smaller or less certain than expected.", dg("Testing an expectation", D.flow(["Original|Assumption", "Observed|Conditions", "Assess|Attribution", "Revise|Claim"]), "A benefit estimate must be reconsidered when its underlying assumptions are not supported by observed conditions.")],
    ["Qasr's corporate rates fell by four percent during renewal, complicating attribution of its AED 180,000 retained revenue claim.", null],
    ["The AED 85,000 avoided regulatory penalty also requires caution because the underlying exposure remains contingent on enforcement.", cmp("Different sources of uncertainty", "Retained revenue", "Pricing changes complicate attribution to the redesigned process.", "Avoided penalty", "Contingent enforcement complicates recognition of a realised financial saving.")],
    ["Neither uncertainty establishes the exact amount of Qasr's unrealised benefits, but both challenge automatic recognition.", null],
    ["The finance director therefore needs reconciliation between reported benefits and evidence of actual financial consequences.", st("A tracked benefit is not necessarily a financially realised benefit, even when the reported amount appears precise.")],
    ["The audit committee should request explanations supported by dates, measurements, assumptions and accountable management decisions.", null],
    ["It should avoid assigning the entire AED 115,000 gap to timing without evidence supporting that specific conclusion.", dg("A defensible gap review", D.flow(["Identify|Difference", "Investigate|Causes", "Test|Evidence", "Assign|Actions", "Report|Uncertainty"]), "The review should explain the gap without inventing allocations or treating future possibilities as realised benefits.")],
    ["Notice that an honest review can recognise genuine progress while acknowledging benefits that remain uncertain or unrealised.", null],
    ["That approach protects the programme's credibility because management learns what has happened and what still requires attention.", t("The central lesson", "A benefits gap needs an evidence-based explanation, not an optimistic assumption or an unsupported financial adjustment.")]
  ],
  review: [
    {
      title: "The gym that promised lower operating costs",
      lines: [
        ["Imagine a neighbourhood gym installing automated entry equipment because its owner expects to reduce everyday operating expenditure.", t("The gym's missing savings", "Why promised savings may be delayed, require action or prove unrealistic.")],
        ["The equipment begins operating successfully, and members can enter without waiting for an employee to check their membership.", null],
        ["The owner celebrates the improvement but notices that monthly operating expenditure has not fallen as originally expected.", dg("The gym's benefits gap", D.flow(["Automated|Entry", "Less|Manual checking", "Expected|Saving", "Unchanged|Expenditure"]), "An operational improvement does not automatically create the financial saving used to justify the investment.")],
        ["One possible explanation is timing, because the new arrangement may not have operated long enough for changes to appear.", null],
        ["However, the owner needs evidence showing when the expected expenditure reduction should reasonably become visible.", cmp("Timing versus evidence", "Timing explanation", "The expected benefit may require a longer observation period.", "Evidence requirement", "Records must support the expected date and emerging financial effect.")],
        ["Another possibility is that the gym continues paying employees who previously checked memberships at the entrance.", null],
        ["Their available time may now support other activities, but existing salary expenditure has not automatically disappeared.", q("What management decision would be necessary before released employee time could become an actual payroll saving?")],
        ["The owner might reorganise duties or use the capacity to provide additional services that create measurable value.", null],
        ["Until the economic consequence is established, the released capacity should remain distinct from a realised financial saving.", dg("The management action gap", D.flow(["Released|Capacity", "Management|Decision", "Operational|Consequence", "Financial|Evidence"]), "A possible benefit may require deliberate action before its economic value can be demonstrated.")],
        ["A different explanation is that the original savings estimate assumed staffing changes that the gym cannot realistically implement.", null],
        ["If employees must remain available for safety and customer assistance, the expected reduction may never become achievable.", iss("An unrealistic original assumption cannot be repaired simply by allowing more time for benefits to appear.", "The expectation problem")],
        ["The owner should therefore investigate the missing savings instead of assuming that every expected benefit is merely delayed.", null],
        ["This resembles Qasr, where the labour claim depends on staffing assumptions that differ from the observed headcount change.", dg("Applying the lesson to Qasr", D.flow(["Original|Labour assumption", "Actual|Headcount change", "Review|Expenditure", "Assess|Benefit"]), "Qasr must investigate the financial consequences of actual staffing changes rather than rely solely on the original estimate.")],
        ["The gym example also shows why an honest review can recognise successful automation without claiming unsupported financial results.", null],
        ["Managers should explain which benefits are delayed, which require decisions and which expectations need reconsideration.", st("A benefits gap is a management problem to investigate, not a figure that disappears through optimistic reporting.")],
        ["The purpose is to understand the real economic consequences of improvement and identify actions that remain justified.", null],
        ["That discipline gives decision makers a stronger foundation for future investments and more credible performance reporting.", t("The gym lesson", "Separate delayed value, uncaptured value and unsupported expectations before explaining a benefits gap.")]
      ]
    },
    {
      title: "The household solar investment that missed its target",
      lines: [
        ["Consider a family installing rooftop solar panels because the expected electricity savings appear sufficient to justify the investment.", t("The household savings gap", "A different way to investigate the difference between expected and realised benefits.")],
        ["The panels begin generating electricity, and the family can observe that the installation is technically operating.", null],
        ["However, the reduction in electricity expenditure remains smaller than the amount originally used to justify the purchase.", dg("The expected benefit chain", D.flow(["Solar|Installation", "Electricity|Generated", "Grid use|Reduced", "Bill|Saving"]), "Generating electricity is an operational result; the realised financial benefit depends on actual billing consequences.")],
        ["The family should not immediately conclude that the equipment has failed, because several explanations remain possible.", null],
        ["The installation may have operated for only part of the measurement period, making the current result incomplete.", cmp("A possible timing explanation", "Short observation period", "The equipment has not operated throughout the expected comparison period.", "Required evidence", "Generation and billing records establish the period actually measured.")],
        ["Yet timing alone cannot prove that the original annual savings estimate will eventually be achieved.", null],
        ["The family must compare actual generation and expenditure with the assumptions used in the original calculation.", q("Would a short operating period justify claiming the full annual saving before supporting measurements become available?")],
        ["Another possibility is that the household has increased electricity consumption since the panels were installed.", null],
        ["Additional consumption could absorb some generated electricity, reducing the visible financial saving despite genuine energy production.", dg("Investigating the observed result", D.flow(["Solar|Generation", "Household|Consumption", "Grid|Purchases", "Actual|Expenditure"]), "Financial results depend on the relationship between generated electricity, household demand and billing arrangements.")],
        ["The family may need to adjust electricity use if it wants to capture more of the potential benefit.", null],
        ["Such adjustments represent management actions rather than savings that can already be treated as realised.", st("Potential value and captured value remain different until the necessary actions produce measurable results.")],
        ["The original estimate might also have assumed electricity prices or consumption patterns that no longer reflect actual conditions.", null],
        ["If those assumptions were unrealistic, waiting longer would not necessarily eliminate the difference between expected and actual savings.", iss("Some benefit gaps arise from assumptions that need revision rather than benefits that merely need more time.", "The unrealistic estimate")],
        ["The family should document the evidence and revise its expectations instead of treating the original estimate as guaranteed.", null],
        ["Qasr faces a comparable responsibility when examining the AED 620,000 promise against AED 505,000 in tracked benefits.", dg("The Qasr review", D.flow(["Promised|AED 620,000", "Tracked|AED 505,000", "Gap|AED 115,000", "Investigate|Explanation"]), "The reported difference is established arithmetically, but its causes and financial consequences require evidence.")],
        ["Recent property deployments may affect timing, while staffing assumptions and corporate pricing create other questions about realisation.", null],
        ["The audit committee therefore needs a supported explanation rather than an invented allocation of the missing amount.", q("Which evidence would help distinguish a delayed benefit from an expectation that can no longer be supported?")],
        ["The household example reminds us that an investment can work technically while delivering less financial value than expected.", null],
        ["A credible review identifies what has been achieved, what remains uncertain and which actions could improve realisation.", st("Explain the gap using evidence, preserve uncertainty and never report possible future savings as money already realised.")]
      ]
    }
  ]
},
{
  title: "Why real improvements disappear from the accounts",
  sec: "W13O2b",
  lines: [
    ["Let us return to Qasr, where the benefits review reveals a problem that can survive even successful implementation.", t("Why real improvements disappear from the accounts", "Week 13 - Realize Value - W13O2b")],
    ["A process may genuinely improve, yet the expected financial benefit never becomes visible in the organisation's accounts.", null],
    ["Understanding this apparent contradiction requires us to examine what happens between operational improvement and financial realisation.", dg("The missing connection", D.flow(["Process|Improvement", "Released|Value", "Management|Action", "Financial|Realisation"]), "An operational improvement may require a separate management decision before its financial value becomes visible.")],
    ["Imagine a redesigned process that reduces employee effort while allowing the same team to complete its existing workload.", null],
    ["The improvement releases capacity, meaning employees have time available for work that previously exceeded their practical capacity.", cmp("Two different results", "Operational result", "Employees complete the same work with less effort.", "Financial result", "Actual expenditure decreases or additional economic value is demonstrated.")],
    ["However, salaries remain payable unless management changes staffing arrangements or establishes another economically valuable use for that capacity.", null],
    ["The improvement is real, but the original financial promise may remain unrealised because nobody converted capacity into value.", st("Operational improvement creates potential value, while benefits realisation requires evidence that the organisation captured it.")],
    ["Qasr's front-desk labour claim illustrates why this distinction matters when financial expectations depend on staffing assumptions.", null],
    ["The programme claims AED 240,000, although headcount fell by four rather than the eleven originally assumed.", dg("Qasr's staffing evidence", D.bars([["Assumed reduction", 11], ["Actual reduction", 4]]), "The comparison concerns headcount reductions, not independently verified financial savings.")],
    ["That difference does not prove the redesigned process failed, but it challenges the original calculation of financial value.", null],
    ["Management must establish whether remaining capacity created measurable benefits and whether actual labour expenditure changed.", q("Who should make the staffing decisions needed to convert released capacity into a financially defensible benefit?")],
    ["This brings us to benefit ownership, which means assigning responsibility for delivering an expected business outcome.", null],
    ["The implementation team can introduce a redesigned process, but operational managers control many decisions affecting its financial consequences.", dg("Different responsibilities", D.lanes(["Programme team", "Business management", "Finance"], [[0, "Deliver process capability"], [0, "Demonstrate operational change"], [1, "Decide resource use"], [1, "Capture expected benefit"], [2, "Examine financial evidence"], [2, "Reconcile reported value"]]), "The diagram illustrates distinct responsibilities needed for credible benefits realisation.")],
    ["Without an accountable business owner, a promised benefit can remain nobody's practical responsibility after implementation finishes.", null],
    ["The programme may then close successfully while the organisation continues operating with costs that were expected to disappear.", iss("Completing the project does not automatically assign responsibility for converting operational improvements into financial outcomes.", "The ownership gap")],
    ["Another danger arises when the implementation team disbands before the expected benefits have matured or been verified.", null],
    ["Knowledge about original assumptions may disappear, leaving managers unable to explain how the promised amounts were calculated.", dg("When knowledge disappears", D.flow(["Business|Assumptions", "Programme|Delivery", "Team|Disbands", "Evidence|Missing"]), "Benefits become difficult to verify when supporting assumptions and responsibilities are not preserved.")],
    ["Sponsor turnover can create similar problems because a new executive may not inherit the commitments made during programme approval.", null],
    ["Without a clear handover, benefit monitoring can lose priority even when the redesigned process continues operating.", st("Benefits accountability must survive changes in project teams, operational managers and executive sponsors.")],
    ["Incentives also matter because managers may be rewarded for implementation milestones rather than financially realised business outcomes.", null],
    ["When success means completing deployment, nobody has a strong reason to investigate benefits that remain missing.", cmp("Two definitions of success", "Delivery success", "The redesigned process enters operational use.", "Benefits success", "The organisation demonstrates the value actually achieved.")],
    ["Reporting culture creates another risk when managers fear that acknowledging a shortfall will make the programme appear unsuccessful.", null],
    ["They may preserve optimistic estimates instead of explaining which benefits remain uncertain, delayed or financially unrealised.", iss("Reluctance to report disappointing results can conceal the information management needs to recover missing value.", "The reporting problem")],
    ["At Qasr, the programme director emphasises deployment timing, while the finance director questions reconciliation with financial evidence.", null],
    ["Their disagreement should trigger investigation rather than pressure to accept either figure without examining its underlying assumptions.", dg("Making the disagreement productive", D.flow(["Identify|Claim", "Check|Ownership", "Examine|Evidence", "Resolve|Actions", "Report|Status"]), "The review should identify who can explain and act on each benefit, while preserving unresolved uncertainty.")],
    ["The audit committee needs to know which benefits have owners, what evidence exists and what management actions remain necessary.", null],
    ["It should also distinguish an operational improvement from an amount that has actually changed the organisation's financial position.", q("Would a completed implementation deserve full financial credit when nobody can demonstrate where the promised savings appeared?")],
    ["Notice that missing financial benefits do not always indicate a defective process; organisational decisions can prevent value capture.", null],
    ["Realize Value therefore examines accountability, management action and honest reporting alongside the technical performance of redesigned processes.", t("The central lesson", "Real improvements can disappear financially when nobody owns, captures, measures or honestly reports their economic consequences.")]
  ],
  review: [
    {
      title: "The restaurant that saved time but not money",
      lines: [
        ["Imagine a restaurant introducing a faster kitchen preparation method because its owner expects lower operating costs.", t("The restaurant's missing benefit", "Why a genuine improvement may never appear in financial records.")],
        ["The new method works well, allowing employees to prepare the same meals with considerably less effort.", null],
        ["The kitchen manager celebrates because orders move more smoothly and employees experience less pressure during busy periods.", dg("The operational achievement", D.flow(["Faster|Preparation", "Less|Employee effort", "Available|Capacity"]), "The redesigned preparation method creates operational capacity without automatically reducing expenditure.")],
        ["However, the restaurant continues employing the same team, and its regular salary expenditure remains unchanged.", null],
        ["The improvement is genuine, but the owner cannot automatically describe the released employee time as removed labour expenditure.", cmp("Improvement versus financial capture", "Operational improvement", "Employees prepare meals more efficiently.", "Financial realisation", "Evidence demonstrates an attributable reduction in expenditure or additional economic contribution.")],
        ["Suppose the kitchen manager assumes that someone else will decide how to use the additional employee capacity.", null],
        ["Meanwhile, the owner believes the kitchen manager has already converted the improvement into a financial saving.", q("What happens when everyone expects another manager to deliver the promised financial benefit?")],
        ["The answer is an ownership gap, where a potential benefit remains unrealised because nobody accepts responsibility for capturing it.", null],
        ["A named business owner could examine whether the capacity supports additional sales or permits justified changes in expenditure.", dg("Closing the ownership gap", D.flow(["Released|Capacity", "Named|Owner", "Management|Decision", "Measured|Outcome", "Financial|Evidence"]), "The benefit owner connects operational improvement with decisions and evidence needed for financial realisation.")],
        ["However, possible future decisions must not be reported as savings that have already appeared in the accounts.", null],
        ["The owner must also preserve the original assumptions so later reviewers can compare expectations with actual financial results.", st("Accountability means responsibility for achieving and demonstrating value, not simply acknowledging that improvement occurred.")],
        ["Now return to Qasr, where the front-desk labour claim depends on staffing assumptions that actual headcount changes did not match.", null],
        ["The redesigned process may have released useful capacity, but management must establish its actual economic consequences.", dg("The Qasr parallel", D.flow(["Labour|Expectation", "Actual|Staffing", "Business|Decision", "Verified|Benefit"]), "Qasr needs evidence linking staffing changes and management decisions to financially defensible labour benefits.")],
        ["Without that evidence, the programme should not treat its entire labour claim as an established financial saving.", null],
        ["The restaurant example shows why successful process improvement and successful benefits realisation are different management achievements.", q("Which manager should remain accountable when a process improvement requires further action after implementation?")],
        ["The practical lesson is to assign ownership and preserve evidence until the expected economic value is genuinely demonstrated.", null],
        ["That discipline prevents useful improvements from becoming financial promises that nobody can locate or defend.", st("A real improvement needs an accountable owner and an evidenced financial consequence before its benefit can be claimed.")]
      ]
    },
    {
      title: "The school that installed a faster registration system",
      lines: [
        ["Consider a school introducing an online registration system because administrators expect to reduce the workload associated with enrolment.", t("The school's benefits ownership problem", "Why completed projects can leave promised benefits without an accountable owner.")],
        ["The system launches successfully, and families can submit registration information without completing the previous paper-based process.", null],
        ["Administrative employees spend less time entering information, creating capacity for other activities within the school.", dg("The successful implementation", D.flow(["Online|Registration", "Less|Manual entry", "Released|Staff capacity"]), "The new system improves administrative efficiency, but its financial consequences remain to be established.")],
        ["The project team celebrates the launch and moves to another assignment after handing the system to school administrators.", null],
        ["However, the original business case expected financial savings that nobody has yet connected to actual expenditure.", cmp("Two different responsibilities", "Project delivery", "Introduce a functioning online registration system.", "Benefits realisation", "Demonstrate how the improvement produced the expected organisational value.")],
        ["The administrative manager assumes finance will calculate the savings, while finance expects operational management to provide evidence.", null],
        ["Neither department has been assigned clear responsibility for converting the released capacity into a measurable benefit.", q("Can a financial saving be demonstrated when nobody owns the decisions and evidence needed to establish it?")],
        ["This creates a gap between technical success and economic accountability, even though the redesigned registration process works.", null],
        ["The school needs an operational owner who can explain what happened to employee time after manual work decreased.", dg("Restoring accountability", D.flow(["Identify|Benefit", "Assign|Business owner", "Decide|Capacity use", "Measure|Result", "Verify|Value"]), "Clear ownership connects operational improvement with the decisions and measurements needed for benefits realisation.")],
        ["Finance can then examine whether any claimed monetary benefit corresponds to actual expenditure or another defensible economic consequence.", null],
        ["The school must also retain the original baseline and assumptions because the project team may no longer be available.", st("Benefits evidence and accountability must remain accessible after the implementation team has completed its work.")],
        ["Imagine that a new school director arrives and receives no explanation of the financial benefits promised during project approval.", null],
        ["The system continues operating, but the expected savings may disappear from management attention because nobody maintains the commitment.", iss("Leadership changes can interrupt benefits monitoring when ownership and supporting evidence are not formally transferred.", "The continuity problem")],
        ["Now consider Qasr, where recent deployments and disputed financial claims make continued ownership especially important.", null],
        ["The programme director's timing argument and the finance director's reconciliation concerns both require evidence and accountable follow-up.", dg("The Qasr accountability chain", D.flow(["Claimed|Benefit", "Responsible|Owner", "Supporting|Evidence", "Required|Action", "Reported|Status"]), "Each Qasr benefit needs a clear responsibility for evidence, action and honest reporting.")],
        ["A benefits register can preserve these responsibilities, although the register itself cannot replace management decisions or financial verification.", null],
        ["The school example demonstrates how organisational arrangements can prevent genuine process improvements from becoming financially visible.", q("What should happen to benefit ownership when the project team finishes but the expected financial result remains unverified?")],
        ["Responsibility should continue with the business until management can demonstrate the benefit or explain why it remains unrealised.", null],
        ["That is why Realize Value requires sustained accountability rather than relying on successful implementation as proof of financial success.", st("Projects deliver process capability, while accountable business management must capture and demonstrate the resulting value.")]
      ]
    }
  ]
},
      ] },
      { id: "l3", title: "The benefits nobody can find", sections: [
{
  title: "Four fewer employees, eleven assumed",
  sec: "W13O2c",
  lines: [
    ["Let us return to Qasr's audit committee, where the front-desk labour claim raises a particularly uncomfortable question.", t("Four fewer employees, eleven assumed", "Week 13 - Realize Value - W13O2c")],
    ["The business case included AED 240,000 in labour benefits, supported by an assumption involving eleven fewer employees.", null],
    ["Yet the observed headcount reduction was only four, leaving a substantial difference between expectation and actual staffing.", dg("Qasr's staffing assumption", D.bars([["Assumed reduction", 11], ["Actual reduction", 4]]), "The original assumption involved eleven fewer employees, while the observed reduction was four. Neither figure independently establishes financial savings.")],
    ["The immediate temptation is to calculate a smaller saving by multiplying the original claim by four divided by eleven.", null],
    ["That calculation would produce approximately AED 87,273, but it would not establish Qasr's actual realised labour benefit.", dg("A tempting but unsupported calculation", D.flow(["Claim|AED 240,000", "Ratio|4 of 11", "Estimate|AED 87,273", "Status|Unverified"]), "This is an illustrative proportional calculation, not a verified Qasr benefit. Actual employment costs and the original calculation are unknown.")],
    ["The difficulty is that employees may have different employment costs, while the original estimate may contain additional assumptions.", null],
    ["We therefore need evidence from staffing decisions and actual expenditure before recognising any specific financial amount.", st("A staffing ratio cannot substitute for evidence of actual labour expenditure and the assumptions behind the original estimate.")],
    ["Now consider what the redesigned arrival process might have achieved even without the expected staffing reduction.", null],
    ["If employees complete reception activities more efficiently, the same workforce may have capacity for other useful work.", dg("The capacity question", D.flow(["Redesigned|Arrival process", "Less|Processing effort", "Released|Capacity", "Management|Decision"]), "Released capacity may be valuable, but its existence and subsequent use require measurement.")],
    ["That capacity represents operational potential, rather than proof that salary expenditure has disappeared from the operating budget.", null],
    ["The distinction matters because financial realisation depends on what management actually does with the available resources.", cmp("Two different claims", "Capacity released", "Employees may have time available for additional productive work.", "Cost removed", "Actual attributable labour expenditure decreases and the reduction is supported by financial evidence.")],
    ["Imagine the finance director asking whether the remaining employees were reassigned, performed additional services or continued their existing duties.", null],
    ["Those questions would investigate possible value without assuming that any particular staffing arrangement actually occurred at Qasr.", q("What evidence would distinguish additional employee capacity from a reduction in actual labour expenditure?")],
    ["The programme director might reasonably emphasise operational improvement, but that argument cannot independently establish financial realisation.", null],
    ["Finance must examine the relevant payroll and budget evidence before deciding what portion of the claim is defensible.", dg("Testing the labour benefit", D.flow(["Original|Assumptions", "Actual|Staffing", "Payroll|Evidence", "Budget|Effect", "Defensible|Claim"]), "The financial review must connect original assumptions with actual staffing decisions and expenditure consequences.")],
    ["This is also where benefit ownership becomes important, because implementation teams cannot independently control every staffing decision.", null],
    ["An accountable business manager must determine how released capacity will be used and what economic result follows.", st("A business benefit needs an owner who can convert operational improvement into demonstrable organisational value.")],
    ["However, assigning responsibility does not mean management should automatically remove employees simply to satisfy an earlier financial estimate.", null],
    ["Staffing decisions must remain consistent with operational requirements, service expectations and the organisation's actual business needs.", iss("An original savings target does not justify unsupported staffing decisions or the recognition of expenditure reductions that never occurred.", "The management decision")],
    ["Qasr must therefore distinguish an unrealistic original assumption from a valuable improvement that requires further action.", null],
    ["It must also avoid treating the entire difference between eleven and four as proof of a specific monetary shortfall.", dg("Three questions for Qasr", D.flow(["What|Changed?", "What|Value followed?", "What|Evidence supports it?"]), "The review should separate operational change, economic consequence and supporting evidence.")],
    ["Remember that seven properties went live within the last four months, making the timing of benefits another relevant consideration.", null],
    ["Yet recent deployment cannot establish that the remaining assumed staffing reductions will eventually occur or become financially appropriate.", cmp("Timing versus realisation", "Possible timing effect", "Recent deployment may affect when operational benefits become measurable.", "Required proof", "Staffing and financial evidence must support any eventual labour saving.")],
    ["The audit committee should therefore request a reconciled explanation rather than accept either the original claim or a proportional adjustment.", null],
    ["That explanation should preserve uncertainty wherever the available evidence cannot establish the actual realised financial amount.", q("Would you report AED 240,000, a proportional estimate, or an explicitly unverified labour benefit pending financial evidence?")],
    ["The defensible response is to report what can be established while identifying the evidence needed to resolve the claim.", null],
    ["Qasr's experience reminds us that fewer processing hours, fewer employees and lower expenditure are three different observations.", t("The central lesson", "Four fewer employees do not automatically establish the financial value originally calculated using eleven assumed reductions.")]
  ],
  review: [
    {
      title: "The supermarket that expected fewer checkout employees",
      lines: [
        ["Imagine a supermarket introducing self-service checkout equipment because management expects customers to complete purchases more efficiently.", t("The supermarket staffing puzzle", "Why a staffing assumption is not the same as a realised labour saving.")],
        ["The business case assumes that the equipment will reduce the number of employees needed at traditional checkout counters.", null],
        ["After implementation, customers use the new equipment, but the supermarket retains more employees than originally anticipated.", dg("Expectation versus staffing", D.flow(["Self-service|Equipment", "Expected|Staff reduction", "Actual|Staffing", "Review|Financial effect"]), "The expected staffing consequence must be compared with actual employment decisions and expenditure.")],
        ["Some employees may still be needed to assist customers, resolve payment problems and maintain acceptable service levels.", null],
        ["Their continued employment does not necessarily mean the new equipment failed to improve checkout efficiency.", cmp("Two different outcomes", "Operational improvement", "Customers complete checkout activities with less direct employee involvement.", "Financial realisation", "Actual attributable employment expenditure decreases.")],
        ["The supermarket might also use released employee capacity to replenish shelves or provide additional customer assistance.", null],
        ["Those activities could create value, but management must demonstrate their consequences before assigning a financial amount.", q("Would moving an employee from checkout to shelf replenishment automatically reduce the supermarket's salary expenditure?")],
        ["The employee remains on the payroll, so reassignment alone does not establish that labour expenditure has been removed.", null],
        ["However, the reassignment might improve other operations, creating a separate benefit that requires its own measurement.", dg("Following released capacity", D.flow(["Less|Checkout work", "Available|Employee time", "New|Activity", "Measured|Outcome", "Verified|Value"]), "Released capacity can support other activities, but its economic contribution must be established.")],
        ["Suppose management calculates savings using the number of employees originally expected to become unnecessary after implementation.", null],
        ["That estimate would remain unsupported unless actual staffing and payroll evidence confirmed the associated expenditure reduction.", st("A projected reduction in staffing is not equivalent to an actual reduction in labour costs.")],
        ["The same distinction applies to Qasr, where the original assumption involved eleven fewer employees but the observed reduction was four.", null],
        ["The AED 240,000 labour claim therefore requires financial evidence rather than a simple calculation based on headcount ratios.", dg("Applying the supermarket lesson", D.flow(["Assumed|Eleven fewer", "Observed|Four fewer", "Examine|Payroll", "Assess|Realisation"]), "Qasr's observed staffing reduction does not independently establish the monetary value realised.")],
        ["The audit committee should also consider whether released capacity produced other demonstrable benefits without inventing such outcomes.", null],
        ["This approach recognises operational success while protecting financial reporting from unsupported assumptions about labour expenditure.", iss("Do not confuse the number of employees assumed in a business case with the actual financial consequences of implementation.", "The staffing assumption")],
        ["The practical lesson is to examine actual resource decisions, supporting records and the value those decisions produced.", null],
        ["A defensible benefits claim follows financial evidence rather than the staffing reductions originally hoped for.", st("Measure the improvement, examine the staffing consequence and verify the financial result before recognising labour savings.")]
      ]
    },
    {
      title: "The clinic that reduced appointment administration",
      lines: [
        ["Consider a small clinic introducing online appointment booking because its administrators spend considerable time answering scheduling calls.", t("The clinic's capacity puzzle", "Understanding why less administrative work does not automatically mean lower payroll expenditure.")],
        ["The redesigned process allows patients to arrange appointments without requiring an employee to handle every routine booking.", null],
        ["Administrative employees now spend less time scheduling appointments, creating capacity within their existing working hours.", dg("The operational change", D.flow(["Online|Booking", "Fewer|Routine calls", "Released|Staff time"]), "The redesigned booking process may release administrative capacity without changing the number of employees.")],
        ["The clinic owner initially describes the released time as a labour saving because employees complete fewer administrative tasks.", null],
        ["However, those employees continue receiving their salaries, so the clinic has not automatically removed payroll expenditure.", cmp("Capacity versus cost", "Released capacity", "Existing employees spend less time handling routine appointment bookings.", "Cost removed", "Actual payroll expenditure decreases because of the redesigned process.")],
        ["The clinic might use the available capacity to improve patient communication or handle other necessary administrative activities.", null],
        ["Those activities could be valuable, but their benefits require evidence appropriate to the outcomes actually achieved.", q("If employees remain fully paid, what additional evidence would justify reporting a financial labour saving?")],
        ["The owner would need to demonstrate an attributable change in actual expenditure rather than rely on reduced task duration.", null],
        ["For example, a genuine reduction in paid overtime could support a saving if financial records confirmed the change.", dg("A possible financial test", D.flow(["Less|Booking effort", "Reduced|Paid overtime", "Payroll|Comparison", "Verified|Saving"]), "This is a hypothetical example. Actual expenditure evidence would be required to establish the benefit.")],
        ["However, reduced overtime might also reflect lower patient demand, so the clinic must investigate alternative explanations.", null],
        ["This is attribution, meaning the process improvement should receive credit only for the contribution supported by evidence.", st("A financial saving must be both observed and reasonably attributable to the redesigned process.")],
        ["Now imagine the original business case assumed that several administrative positions would become unnecessary after online booking began.", null],
        ["If those reductions did not occur, the original labour estimate would need reconsideration rather than automatic recognition.", dg("Revisiting the expectation", D.flow(["Original|Staffing estimate", "Actual|Employment", "Investigate|Difference", "Revise|Benefit claim"]), "A benefits review must reconcile the original staffing assumption with observed employment and financial consequences.")],
        ["Qasr faces this problem because its labour claim relied on eleven assumed reductions while actual headcount fell by four.", null],
        ["The difference does not establish that the process produced no value, but it limits what can be claimed without evidence.", iss("A genuine improvement can coexist with an unrealised financial expectation when staffing decisions differ from the original plan.", "The realisation gap")],
        ["Management should examine actual labour expenditure and determine whether released capacity created another measurable organisational benefit.", null],
        ["It should not invent a monetary value for that capacity or assume the remaining staffing reductions will eventually occur.", q("Why would a proportional calculation based on employee numbers be insufficient to establish Qasr's actual labour saving?")],
        ["Employment costs and financial assumptions may differ, so actual expenditure evidence is necessary for a defensible conclusion.", null],
        ["The clinic example reminds us that operational efficiency, staffing levels and payroll expenditure must be examined separately.", st("A credible labour benefit is established through actual financial consequences, not merely fewer tasks or projected headcount reductions.")]
      ]
    }
  ]
},
{
  title: "Two renewals, a rate cut and an avoided fine",
  sec: "W13O2d",
  lines: [
    ["Let us return to Qasr's benefits review, where two financial claims present different challenges for the audit committee.", t("Two renewals, a rate cut and an avoided fine", "Week 13 - Realize Value - W13O2d")],
    ["The programme claims AED 180,000 in retained corporate revenue and AED 85,000 from an avoided regulatory penalty.", dg("Qasr's reported claims", D.bars([["Retained revenue", 180], ["Avoided penalty", 85]]), "Amounts in AED thousands. These are reported benefit claims, not independently verified financial realisation.")],
    ["Both amounts sound valuable, but their financial meaning depends on evidence that the reported figures alone cannot provide.", null],
    ["Consider the corporate revenue claim, which concerns two renewals that the programme associates with the redesigned arrival process.", dg("Examining the renewals", D.flow(["Corporate|Renewals", "Reported|Retention", "Process|Contribution", "Financial|Evidence"]), "Observed renewals do not independently establish how much retention resulted from the process improvement.")],
    ["Renewal demonstrates that customers continued their commercial relationships, but it does not establish why they made those decisions.", null],
    ["During the renewal quarter, Qasr also reduced corporate rates by four percent, creating another plausible influence on retention.", cmp("Two possible influences", "Service improvement", "The redesigned arrival process may have supported corporate retention.", "Pricing decision", "Lower corporate rates may also have influenced renewal decisions.")],
    ["A customer might appreciate faster arrivals while also considering the lower price when deciding whether to renew.", null],
    ["Because both influences operated during the relevant period, assigning the entire retained revenue claim to BPM would require evidence.", q("Would you credit the redesigned process with all retained revenue when corporate customers also received lower rates?")],
    ["This is an attribution problem, meaning the observed outcome may reflect several causes rather than one intervention alone.", null],
    ["The review should investigate available evidence about customer decisions without assuming that those reasons are already known.", dg("Testing the retention claim", D.flow(["Observed|Renewals", "Investigate|Customer reasons", "Examine|Pricing effect", "Assess|Process contribution"]), "These are proposed evidence checks, not additional facts established about Qasr's customers.")],
    ["Even credible attribution would leave another question because retained revenue does not necessarily equal additional financial contribution.", null],
    ["Revenue describes income from business activity, while financial contribution also considers the relevant costs of generating that income.", st("Retained revenue, attributable revenue and realised financial contribution are related but different measures.")],
    ["The rate reduction makes this distinction important because retaining business at lower prices can change its economic value.", null],
    ["Finance therefore needs appropriate commercial and accounting evidence before recognising the claimed AED 180,000 as realised value.", dg("From retention to value", D.flow(["Retained|Business", "Actual|Revenue", "Relevant|Costs", "Attributed|Contribution"]), "The financial test must consider actual income, relevant costs and the process contribution supported by evidence.")],
    ["Now consider Qasr's avoided regulatory penalty, where the claim concerns a possible cost rather than retained commercial income.", null],
    ["The case identifies AED 85,000, but the penalty remains contingent on enforcement rather than representing an established liability.", cmp("Two different concepts", "Reduced regulatory exposure", "Improved processes may reduce the possibility of an adverse regulatory outcome.", "Realised financial saving", "Evidence supports expenditure genuinely avoided against a credible alternative situation.")],
    ["A contingent penalty represents possible financial exposure, so its absence does not automatically demonstrate an equivalent saving.", null],
    ["Management must establish whether the penalty was realistically applicable and whether the process improvement reduced that exposure.", iss("A possible penalty cannot automatically be recognised as money saved merely because enforcement did not occur.", "The contingent penalty problem")],
    ["This requires a counterfactual, meaning a defensible account of what would reasonably have happened without the intervention.", null],
    ["If that alternative remains uncertain, the financial claim must preserve uncertainty instead of treating enforcement as inevitable.", dg("Testing the avoided penalty", D.flow(["Possible|Exposure", "Credible|Counterfactual", "Process|Contribution", "Defensible|Value"]), "A counterfactual must be supported by evidence rather than an assumption that the penalty would certainly occur.")],
    ["Notice how the renewal claim requires attribution evidence, while the penalty claim also requires evidence about contingent exposure.", null],
    ["Both may represent genuine organisational value without necessarily qualifying as financially realised benefits of their reported amounts.", st("Different benefit mechanisms require different evidence before their monetary values can be defended.")],
    ["The audit committee should therefore examine these claims separately rather than combine them automatically into verified programme savings.", null],
    ["It should retain the reported amounts while clearly identifying their assumptions, supporting evidence and unresolved financial uncertainty.", q("Which claim requires evidence about customer decisions, and which requires evidence about credible regulatory exposure?")],
    ["Neither uncertainty proves the redesigned process created no value, but neither justifies recognition beyond the available evidence.", null],
    ["A trustworthy review distinguishes what happened, what the process contributed and what finance can reasonably recognise.", t("The central lesson", "Corporate retention requires attribution evidence, while avoided penalties require credible evidence of exposure and financial consequences.")]
  ],
  review: [
    {
      title: "The neighbourhood shop and its returning customers",
      lines: [
        ["Imagine a neighbourhood shop improving customer service because its owner hopes regular customers will continue purchasing there.", t("The shop's retention puzzle", "Why returning customers do not automatically establish the financial value of improved service.")],
        ["Employees become more attentive, and customers receive assistance more quickly whenever they visit the shop.", null],
        ["During the same period, the owner introduces lower prices to encourage customers to return more frequently.", dg("Two possible influences", D.flow(["Better|Service", "Lower|Prices", "Returning|Customers"]), "Service quality and pricing may both influence customer retention.")],
        ["Several customers continue shopping there, and the owner immediately credits the service improvement with their loyalty.", null],
        ["However, lower prices offer another plausible explanation because customers often consider both service quality and affordability.", cmp("Competing explanations", "Service contribution", "Customers may appreciate faster and more attentive assistance.", "Price contribution", "Customers may return because purchases have become less expensive.")],
        ["The owner cannot determine each influence simply by counting the customers who continued visiting the shop.", null],
        ["Customer feedback and comparable purchasing evidence could help investigate why those customers maintained their relationship.", q("Would a returning customer prove that improved service alone caused the decision when prices also decreased?")],
        ["The owner should also distinguish revenue from profit because lower prices can affect the contribution generated by sales.", null],
        ["Keeping a customer may preserve income while producing less profit than the original business estimate assumed.", dg("Examining financial contribution", D.flow(["Customer|Returns", "Actual|Sales", "Pricing|Effect", "Relevant|Costs", "Financial|Contribution"]), "Retained business requires financial assessment as well as evidence of its causes.")],
        ["Suppose the owner reports every retained sale as additional value created entirely by the service improvement.", null],
        ["That claim would exceed the evidence because some customers might have returned without the operational change.", iss("An observed customer decision does not establish that one improvement caused the entire financial outcome.", "The attribution problem")],
        ["Now return to Qasr, where two corporate renewals occurred during a period that also included lower corporate rates.", null],
        ["The programme claims AED 180,000 in retained revenue, but the process contribution still requires examination.", dg("Applying the shop lesson", D.flow(["Corporate|Renewals", "Service|Improvement", "Rate|Reduction", "Assess|Attribution"]), "Qasr must investigate how service improvement and pricing influenced the reported retention.")],
        ["The audit committee should examine available renewal evidence and the financial consequences of the changed rates.", null],
        ["Without sufficient evidence, the entire reported amount cannot confidently be credited to the BPM programme.", st("Retained business is an observed outcome, while attributable financial value requires a separate explanation.")],
        ["The shop example reminds us that customers may respond to several changes occurring during the same period.", null],
        ["A credible benefits review recognises genuine improvements without assigning financial credit that the evidence cannot support.", t("The shop lesson", "Customer retention requires attribution evidence, and retained revenue must not be confused with realised profit.")]
      ]
    },
    {
      title: "The apartment building and the inspection that never came",
      lines: [
        ["Consider an apartment building manager improving fire safety procedures because an inspection might identify costly compliance problems.", t("The apartment building's avoided penalty", "Why reducing regulatory exposure differs from demonstrating a realised financial saving.")],
        ["The manager introduces clearer maintenance records and ensures employees understand their responsibilities for building safety.", null],
        ["These changes may reduce compliance risk, meaning the likelihood or consequences of failing applicable safety requirements.", dg("The compliance improvement", D.flow(["Improved|Procedures", "Better|Compliance", "Reduced|Exposure"]), "Improved controls may reduce regulatory exposure without establishing a realised monetary saving.")],
        ["However, no regulatory inspection occurs during the period, and the building receives no financial penalty.", null],
        ["The manager celebrates by claiming that the new procedures saved the full amount of a possible fine.", cmp("Two different claims", "Reduced risk", "Improved procedures may lower the likelihood of regulatory noncompliance.", "Financial saving", "Evidence establishes that a credible expected expenditure was genuinely avoided.")],
        ["That conclusion is questionable because the absence of a penalty does not establish that enforcement would otherwise have occurred.", null],
        ["The manager must distinguish possible financial exposure from expenditure that the building would reasonably have incurred.", q("Can you claim the full amount of a fine when nobody knows whether it would have been imposed?")],
        ["A credible assessment would examine the compliance exposure and evidence supporting the effect of the improved procedures.", null],
        ["It would also consider whether the assumed penalty was realistically applicable under the circumstances being evaluated.", dg("Testing the claim", D.flow(["Possible|Violation", "Credible|Enforcement", "Process|Contribution", "Assess|Financial value"]), "A defensible avoided-penalty claim requires evidence supporting the exposure and the intervention's contribution.")],
        ["Without that evidence, reporting the entire possible fine as realised savings would confuse uncertainty with financial achievement.", null],
        ["Nevertheless, better safety procedures may still provide valuable protection for residents and the building owner.", st("A reduction in risk can be valuable even when no corresponding cash saving has been demonstrated.")],
        ["This distinction matters because organisations should recognise genuine risk improvements without inventing certainty about hypothetical financial consequences.", null],
        ["At Qasr, the AED 85,000 avoided regulatory penalty remains contingent on enforcement, creating the same evidential challenge.", dg("Applying the building lesson", D.flow(["Regulatory|Exposure", "Process|Improvement", "Enforcement|Uncertainty", "Financial|Assessment"]), "Qasr must distinguish possible regulatory exposure from a financially defensible benefit.")],
        ["The audit committee should examine whether the redesigned process reduced credible exposure and what monetary claim that evidence supports.", null],
        ["It should not automatically recognise the full penalty amount simply because no enforcement cost appeared in the accounts.", iss("The absence of an adverse event does not prove that the process prevented a financial loss of the same amount.", "The counterfactual problem")],
        ["A counterfactual is the credible alternative situation against which management evaluates what the intervention actually prevented.", null],
        ["Where that alternative remains uncertain, the financial claim should preserve uncertainty rather than present an unsupported saving.", q("What evidence would make Qasr's avoided penalty claim more defensible without assuming enforcement was inevitable?")],
        ["The apartment example shows why sound risk management and verified financial savings are different kinds of achievement.", null],
        ["Realize Value requires managers to report both honestly while avoiding monetary claims that exceed the available evidence.", st("Reduced regulatory exposure deserves recognition, but contingent penalties must not automatically become realised financial savings.")]
      ]
    }
  ]
},
{
  title: "Six hundred and twenty, or five hundred and five",
  sec: "W13O2e",
  lines: [
    ["Let us return to Qasr's audit committee, where the benefits review has reached its most important decision point.", t("Six hundred and twenty, or five hundred and five", "Week 13 - Realize Value - W13O2e")],
    ["The original business case promised AED 620,000 annually, while the programme currently reports AED 505,000 in tracked benefits.", dg("The two reported figures", D.bars([["Promised", 620], ["Tracked", 505], ["Difference", 115]]), "Amounts in AED thousands. Tracked benefits are not automatically verified financial benefits.")],
    ["The difference is AED 115,000, but the committee cannot resolve the disagreement simply by choosing the larger figure.", null],
    ["Nor should it automatically accept the smaller figure as financially realised, because tracking and financial recognition require different evidence.", cmp("What the figures mean", "AED 620,000 promised", "The annual benefit expected in the original business case.", "AED 505,000 tracked", "The benefit amount currently reported by the programme, subject to verification.")],
    ["The programme director argues that timing matters because seven of fourteen properties went live within the last four months.", null],
    ["That explanation deserves attention because recently implemented processes may not yet have completed their expected benefit measurement periods.", dg("Deployment timing", D.bars([["Recent go-lives", 7], ["Other properties", 7]]), "Seven of fourteen properties went live within the last four months. Deployment timing does not establish financial realisation.")],
    ["However, recent deployment cannot prove that the entire difference will eventually become an attributable financial benefit.", null],
    ["The finance director therefore questions whether the reported benefits can be reconciled with the organisation's financial evidence.", iss("A timing explanation cannot replace evidence showing when and how the expected financial value will materialise.", "The reconciliation challenge")],
    ["Both directors raise legitimate questions, but neither position independently establishes the amount that should be recognised.", null],
    ["The committee needs to examine the underlying claims rather than treat their combined total as a single verified result.", dg("The evidence review", D.flow(["Reported|Benefits", "Examine|Components", "Test|Attribution", "Reconcile|Finance", "Report|Status"]), "Each component needs supporting evidence before its financial value can be defended.")],
    ["Consider Qasr's AED 240,000 labour claim, where the original estimate assumed eleven fewer employees after implementation.", null],
    ["Actual headcount fell by four, creating a substantial difference between the staffing assumption and the observed result.", dg("Labour assumption versus observation", D.bars([["Assumed reduction", 11], ["Actual reduction", 4]]), "Headcount figures do not independently establish the amount of labour expenditure removed.")],
    ["That difference requires examination of actual payroll expenditure rather than a proportional calculation based only on employee numbers.", null],
    ["The redesigned process may have released capacity, but released capacity is not automatically equivalent to reduced salary expenditure.", st("Operational efficiency becomes a realised labour saving only when its attributable financial consequences are demonstrated.")],
    ["Now consider the AED 180,000 retained corporate revenue claim, which concerns two renewals associated with the programme.", null],
    ["Corporate rates also fell by four percent during renewal, creating uncertainty about the process contribution to retention.", dg("The retention attribution problem", D.flow(["Improved|Arrival process", "Lower|Corporate rates", "Contract|Renewals", "Assess|Contribution"]), "Service improvement and pricing may both influence retention, so the process contribution requires evidence.")],
    ["The renewals may represent genuine commercial value, but the entire amount cannot automatically be attributed to BPM.", null],
    ["Finance must also distinguish retained revenue from the economic contribution generated after considering relevant costs.", q("Would you recognise the full retained revenue claim without examining the influence of the corporate rate reduction?")],
    ["The AED 85,000 avoided regulatory penalty presents another challenge because the underlying exposure remains contingent on enforcement.", null],
    ["Reduced regulatory risk may be valuable, but a possible penalty is not automatically expenditure that was actually avoided.", cmp("Risk versus realised saving", "Reduced exposure", "The redesigned process may reduce the possibility of regulatory penalties.", "Financial recognition", "Evidence supports a credible avoided expenditure attributable to the intervention.")],
    ["These uncertainties cannot be converted into precise deductions without evidence supporting the financial value of each component.", null],
    ["The committee should therefore avoid inventing a revised total by applying arbitrary percentages to the reported claims.", iss("A precise calculation is not a defensible financial result when the underlying assumptions remain unsupported.", "False precision")],
    ["Instead, management should distinguish the original promise, currently tracked benefits and amounts supported by financial evidence.", null],
    ["Any remaining difference should retain an explicit explanation of timing, required action or unresolved benefit expectations.", dg("An honest committee report", D.flow(["Original|Promise", "Tracked|Claims", "Verified|Evidence", "Unresolved|Difference", "Required|Actions"]), "The report should preserve uncertainty rather than present unverified claims as realised financial value.")],
    ["This approach does not require the committee to reject the programme or assume its operational improvements lack value.", null],
    ["It requires managers to explain what has been achieved, what remains uncertain and who must resolve the evidence gaps.", q("Which figure should the committee receive when the promised amount and tracked amount answer different questions?")],
    ["The defensible answer is a reconciled explanation showing both figures without presenting either as automatically verified financial realisation.", null],
    ["That is the purpose of Realize Value: replacing competing claims with accountable evidence about benefits actually delivered.", t("The central lesson", "Report the promise, the tracked amount and the verified value separately, while explaining unresolved differences honestly.")]
  ],
  review: [
    {
      title: "The hotel renovation with two competing savings reports",
      lines: [
        ["Imagine a small hotel renovating its laundry facilities because management expects lower operating expenditure and more efficient service.", t("The hotel's disputed savings", "Why a promised benefit and a tracked benefit require separate interpretation.")],
        ["The original investment proposal includes an annual savings estimate based on expected reductions in water and labour requirements.", null],
        ["After implementation, the operations manager reports improvements in laundry processing time and resource consumption.", dg("The operational improvement", D.flow(["Renovated|Laundry", "Lower|Resource use", "Reported|Improvement"]), "Improved operating measures do not automatically establish the monetary saving promised in the investment proposal.")],
        ["However, the finance manager cannot locate an equivalent reduction in the hotel's actual operating expenditure.", null],
        ["The operations manager argues that the renovation succeeded because the redesigned process demonstrably uses fewer resources.", cmp("Two management perspectives", "Operations", "The redesigned laundry process uses resources more efficiently.", "Finance", "The expected reduction in operating expenditure requires supporting financial evidence.")],
        ["Both observations may be accurate because operational efficiency and financially realised savings are different measures.", null],
        ["Employees might complete laundry work faster while remaining on the same payroll and performing additional duties.", q("Would faster laundry processing establish a labour saving if the hotel's salary expenditure remained unchanged?")],
        ["The answer depends on whether management can demonstrate an attributable economic consequence rather than merely reduced processing effort.", null],
        ["The finance manager should therefore examine actual expenditure and the assumptions used in the original investment calculation.", dg("Reconciling the claim", D.flow(["Original|Estimate", "Measured|Improvement", "Actual|Expenditure", "Explain|Difference"]), "A defensible reconciliation connects the expected saving with measured operating results and financial evidence.")],
        ["The operations manager should also explain whether additional management decisions are needed to capture the remaining potential value.", null],
        ["Neither manager should invent a financial amount simply to eliminate the difference between the two reports.", st("A benefits review should explain differences through evidence rather than force operational and financial figures to agree.")],
        ["Now return to Qasr, where AED 620,000 was promised and AED 505,000 is currently tracked.", null],
        ["The AED 115,000 difference requires investigation, but the tracked amount also needs verification before financial recognition.", dg("The Qasr comparison", D.bars([["Promised", 620], ["Tracked", 505], ["Gap", 115]]), "Amounts in AED thousands. The gap is arithmetic; its causes and the realised value remain subject to evidence.")],
        ["The committee should examine each claim and distinguish benefits awaiting realisation from those whose assumptions remain unsupported.", null],
        ["It should also identify accountable managers who can investigate discrepancies and explain any actions needed.", iss("A tracked benefit should not become a verified saving merely because it appears in a programme report.", "The reporting distinction")],
        ["The hotel example demonstrates why genuine process improvements can coexist with disappointing or uncertain financial results.", null],
        ["A responsible committee receives both the operational story and the financial evidence without confusing their meanings.", q("What would make the hotel's benefits report more credible than simply selecting the most favourable savings figure?")],
        ["The answer is transparent reconciliation supported by measurements, assumptions and actual financial consequences.", null],
        ["That discipline allows management to recognise progress while preserving uncertainty about benefits not yet demonstrated.", st("Report what was promised, what was measured and what was financially verified as distinct pieces of evidence.")]
      ]
    },
    {
      title: "The community centre and its unfinished benefits review",
      lines: [
        ["Consider a community centre introducing an online booking system because management expects better service and lower administrative costs.", t("The community centre's benefits review", "How to explain a benefits gap without inventing financial certainty.")],
        ["The project launches successfully, allowing visitors to reserve facilities without relying on the previous manual booking arrangements.", null],
        ["The original business case included expected savings, but the centre's current report shows less financial value than anticipated.", dg("The benefits question", D.flow(["Expected|Saving", "System|Operating", "Tracked|Improvement", "Unresolved|Value"]), "Implementation success does not establish that the original financial expectation has been achieved.")],
        ["The project manager argues that the system has only recently entered regular use, so benefits need additional time.", null],
        ["The finance manager responds that the expected savings have not yet appeared clearly in expenditure records.", cmp("Two legitimate questions", "Project perspective", "Has the system operated long enough for expected benefits to emerge?", "Finance perspective", "Which reported benefits have produced demonstrable financial consequences?")],
        ["Both perspectives deserve examination because timing and financial recognition address different aspects of the same investment.", null],
        ["However, recent implementation does not guarantee that every expected benefit will eventually become financially real.", q("What evidence would distinguish a delayed saving from an original expectation that may never be achieved?")],
        ["Management should examine when the system began operating and whether the original measurement period remains appropriate.", null],
        ["It should also investigate whether reduced administrative work has actually changed staffing expenditure or released useful capacity.", dg("Investigating the difference", D.flow(["Check|Timing", "Measure|Workload", "Examine|Staffing", "Review|Expenditure"]), "The investigation should test possible explanations instead of assuming the entire gap results from timing.")],
        ["If employees remain on the same payroll, reduced booking effort does not automatically establish removed labour expenditure.", null],
        ["The centre may still benefit from improved service, but that value requires evidence appropriate to its actual nature.", st("Operational improvement can be genuine even when the original financial expectation remains unverified.")],
        ["Suppose the project manager proposes reducing the reported savings by an arbitrary percentage to satisfy the finance manager.", null],
        ["That adjustment would create apparent precision without establishing which benefits were genuinely realised or why others remained missing.", iss("An unsupported adjustment does not become credible simply because it produces a smaller and more cautious figure.", "False precision")],
        ["The centre instead needs a reconciliation that distinguishes the original promise from measured results and verified financial consequences.", null],
        ["Each unresolved claim should retain an explanation of missing evidence and any management action needed.", dg("A defensible report", D.flow(["Original|Promise", "Tracked|Result", "Verified|Value", "Explain|Gap", "Assign|Action"]), "A useful benefits report preserves distinct figures and identifies unresolved evidence and responsibilities.")],
        ["Qasr faces the same reporting challenge with AED 620,000 promised and AED 505,000 currently tracked.", null],
        ["The committee cannot assume the AED 115,000 difference is entirely delayed, nor treat the tracked figure as verified.", q("Why would presenting both Qasr figures with their evidence be more defensible than choosing either figure alone?")],
        ["Because each figure answers a different question, the committee needs an explanation connecting expectations with actual financial outcomes.", null],
        ["The community centre example shows how honest reporting supports decisions without concealing uncertainty or dismissing genuine progress.", st("A credible benefits review explains what was expected, what happened and what financial value the evidence can defend.")]
      ]
    }
  ]
},
      ] },
      { id: "l4", title: "Making benefits accountable", sections: [
{
  title: "A benefit needs an owner in the business",
  sec: "W13O3a",
  lines: [
    ["Let us return to Qasr's audit committee, where the disputed benefits now raise a question about management responsibility.", t("A benefit needs an owner in the business", "Week 13 - Realize Value - W13O3a")],
    ["The programme promised AED 620,000 annually, yet its reported AED 505,000 in tracked benefits still requires financial verification.", dg("Qasr's unresolved benefits position", D.bars([["Promised", 620], ["Tracked", 505], ["Gap", 115]]), "Amounts in AED thousands. The tracked amount is not automatically verified financial value.")],
    ["We have examined the evidence, but evidence alone cannot ensure that an organisation actually captures its expected benefits.", null],
    ["Someone must remain responsible for turning operational improvements into business outcomes after the implementation team completes its work.", dg("From delivery to accountability", D.flow(["Process|Implemented", "Business|Owner", "Management|Action", "Benefit|Verified"]), "Benefits ownership connects implementation capability with decisions, measurable outcomes and financial evidence.")],
    ["That person is the benefit owner, meaning the manager accountable for delivering and demonstrating a particular business benefit.", null],
    ["The owner should have sufficient authority to influence the operational decisions needed to achieve the expected outcome.", st("A benefit owner is accountable for realising the benefit, not merely recording that the project has finished.")],
    ["Consider Qasr's AED 240,000 front-desk labour claim, which depended on an assumption involving eleven fewer employees.", null],
    ["Actual headcount fell by four, so the original financial expectation cannot be accepted without examining staffing expenditure.", dg("The labour benefit challenge", D.bars([["Assumed reduction", 11], ["Actual reduction", 4]]), "The observed staffing reduction differs from the original assumption. Neither figure independently establishes realised labour savings.")],
    ["The implementation team may demonstrate that the redesigned arrival process works, but staffing decisions require business management authority.", null],
    ["A suitable operational owner would investigate released capacity and decide how it could create measurable organisational value.", cmp("Two responsibilities", "Programme delivery", "Introduce the redesigned arrival process and demonstrate operational capability.", "Business ownership", "Make resource decisions and establish the economic consequences of improvement.")],
    ["That owner must also explain why any expected financial reduction has not appeared in the relevant operating budget.", null],
    ["Without such responsibility, released employee capacity may remain useful operationally while the promised financial benefit stays unrealised.", q("Who should remain accountable for Qasr's labour benefit after the redesigned arrival process enters normal operations?")],
    ["Now consider retained corporate revenue, where the programme claims AED 180,000 associated with two corporate renewals.", null],
    ["Corporate rates also fell by four percent, so the process contribution requires evidence about the renewal decisions.", dg("Ownership of the retention claim", D.flow(["Corporate|Renewals", "Commercial|Evidence", "Process|Attribution", "Financial|Assessment"]), "A proposed commercial benefit owner would need to coordinate evidence about retention, pricing and financial contribution.")],
    ["A manager responsible for the relevant commercial outcome should investigate retention without assuming the process caused every renewal.", null],
    ["Finance can help evaluate the monetary consequences, but financial verification does not replace operational accountability for achieving value.", st("Finance validates financial evidence, while the accountable business owner remains responsible for delivering the benefit.")],
    ["The avoided regulatory penalty presents another ownership challenge because its AED 85,000 claim remains contingent on enforcement.", null],
    ["A responsible owner would need to demonstrate credible risk reduction without automatically presenting possible exposure as realised savings.", dg("Ownership of the risk claim", D.flow(["Regulatory|Exposure", "Accountable|Owner", "Control|Evidence", "Financial|Assessment"]), "A proposed owner must substantiate reduced exposure and distinguish it from an established financial saving.")],
    ["Notice that these responsibilities concern different business outcomes, so assigning every benefit to the programme director would be insufficient.", null],
    ["The programme director can coordinate delivery and reporting, but cannot independently control every staffing, commercial or compliance decision.", iss("Programme coordination cannot substitute for business authority over the decisions that determine whether benefits are realised.", "The ownership problem")],
    ["This is why benefit ownership should be agreed before programme approval rather than improvised when financial discrepancies appear.", null],
    ["Early ownership allows managers to challenge assumptions and establish the measurements needed to demonstrate benefits later.", dg("Ownership across the programme", D.flow(["Agree|Benefit", "Assign|Owner", "Establish|Baseline", "Deliver|Change", "Verify|Value"]), "Benefit ownership begins before implementation and continues until the expected outcome is resolved.")],
    ["Ownership must also survive sponsor changes and project closure because some benefits mature after operational deployment.", null],
    ["A named owner should maintain evidence, explain shortfalls and initiate justified actions when expected value remains missing.", st("Accountability continues until the benefit is demonstrated, revised with evidence or explicitly reported as unrealised.")],
    ["For Qasr, the audit committee should therefore request an accountable owner for each disputed benefit claim.", null],
    ["It should also establish who can authorise corrective action and who will independently examine the resulting financial evidence.", q("Would naming an owner be sufficient if that manager lacked authority to influence the decisions needed for realisation?")],
    ["The answer is no, because meaningful accountability requires responsibility, decision authority and access to reliable performance information.", null],
    ["Our next discussion will turn these principles into a benefits register that makes ownership and evidence visible.", t("The central lesson", "Every promised benefit needs an accountable business owner with authority to act and responsibility to demonstrate results.")]
  ],
  review: [
    {
      title: "The library that installed self-service borrowing",
      lines: [
        ["Imagine a public library introducing self-service borrowing equipment because management expects employees to spend less time processing loans.", t("The library's ownership gap", "Why a successful installation still needs someone responsible for the expected benefit.")],
        ["The equipment works successfully, and visitors begin borrowing books without requiring an employee to complete every transaction.", null],
        ["The project team celebrates the installation because the technology operates and the redesigned borrowing process functions correctly.", dg("The completed project", D.flow(["Self-service|Installed", "Borrowing|Redesigned", "Employee|Capacity released"]), "The new process may release employee capacity, but its subsequent organisational value remains to be established.")],
        ["However, the library continues employing the same staff, and the expected financial savings have not become visible.", null],
        ["The project manager believes operational management will capture the benefit, while the library manager assumes implementation already delivered it.", cmp("Different responsibilities", "Project manager", "Deliver functioning self-service borrowing capability.", "Library manager", "Determine how released capacity will create measurable organisational value.")],
        ["This creates an ownership gap because neither manager has accepted clear responsibility for demonstrating the expected economic outcome.", null],
        ["The library therefore needs a benefit owner who can make decisions about employee duties and service priorities.", q("Who should decide how employees use the time released by the redesigned borrowing process?")],
        ["The library manager might redirect capacity toward activities that improve access to information or support additional visitors.", null],
        ["Those outcomes could be valuable, but their contribution would require measurement rather than an invented financial amount.", dg("Capturing the potential benefit", D.flow(["Released|Staff time", "Manager|Decision", "New|Service activity", "Measured|Outcome"]), "The proposed management action must produce evidence of value before the organisation claims a realised benefit.")],
        ["Finance would examine any monetary claim, while the library manager remains accountable for the underlying operational outcome.", null],
        ["The owner should also preserve the original assumptions and explain why actual results differ from the business case.", st("A benefit owner must connect operational improvement with decisions, evidence and an honest explanation of results.")],
        ["Now return to Qasr, where the labour claim depends on staffing reductions that differed from the original assumption.", null],
        ["An accountable operational manager should examine actual expenditure and determine whether released capacity produced measurable value.", dg("Applying the library lesson", D.flow(["Qasr|Labour claim", "Business|Owner", "Staffing|Evidence", "Financial|Verification"]), "The proposed accountability arrangement separates operational decisions from financial verification.")],
        ["The programme team can explain implementation, but it cannot substitute for management authority over staffing decisions.", null],
        ["Without an accountable owner, the benefit may remain disputed even when the redesigned arrival process operates successfully.", iss("A completed project does not guarantee that someone remains responsible for converting its improvements into business value.", "The ownership gap")],
        ["The library example shows why accountability must continue beyond the implementation milestone and remain attached to business management.", null],
        ["That responsibility should include authority to act and an obligation to explain benefits that remain financially unverified.", q("What should the owner report when operational improvement is demonstrated but the expected financial saving remains missing?")],
        ["The owner should report the evidence honestly and identify justified actions rather than claim value that has not materialised.", null],
        ["This protects genuine improvements while making the organisation responsible for capturing the benefits used to justify investment.", st("The business owns benefit realisation, while the project provides the capability needed to make realisation possible.")]
      ]
    },
    {
      title: "The apartment building's shared electricity bill",
      lines: [
        ["Consider an apartment building installing motion-sensitive corridor lighting because residents expect lower shared electricity expenditure.", t("The building's accountability puzzle", "Why responsibility must include the authority to influence the expected financial result.")],
        ["The contractor installs the equipment successfully, and the lights now respond automatically when people enter the corridors.", null],
        ["The building committee celebrates because the new equipment works and the installation has been completed as planned.", dg("The installation achievement", D.flow(["Lighting|Installed", "Automatic|Operation", "Expected|Energy saving"]), "Successful installation creates the possibility of lower electricity consumption, not automatic proof of financial savings.")],
        ["However, nobody has been assigned responsibility for comparing electricity consumption and expenditure against the previous position.", null],
        ["The contractor considers the work complete, while residents assume the building manager will demonstrate the promised saving.", cmp("Different responsibilities", "Contractor", "Install functioning motion-sensitive lighting equipment.", "Building manager", "Monitor consumption, investigate results and demonstrate financial consequences.")],
        ["The expected benefit therefore risks disappearing from attention even though the equipment continues operating correctly.", null],
        ["The building committee should appoint someone with access to energy records and authority over relevant operating arrangements.", q("Would naming a resident without access to electricity records create meaningful accountability for the promised saving?")],
        ["That person might accept responsibility in principle but lack the information and authority needed to investigate actual performance.", null],
        ["Effective ownership therefore combines a clear obligation with practical access to measurements and decisions affecting the outcome.", dg("Meaningful accountability", D.flow(["Named|Owner", "Access|Evidence", "Authority|To act", "Report|Outcome"]), "Responsibility becomes meaningful when the owner can obtain evidence, influence decisions and explain results.")],
        ["Suppose the electricity bill remains unchanged because other shared equipment consumes more energy during the comparison period.", null],
        ["The owner should investigate that possibility rather than automatically conclude that the lighting installation produced no improvement.", st("An accountable owner investigates competing explanations and reports the benefit supported by actual evidence.")],
        ["The building manager may need to examine comparable consumption periods before attributing any financial change to the new lighting.", null],
        ["The manager should also preserve uncertainty when available records cannot separate lighting consumption from other electricity use.", dg("The evidence responsibility", D.flow(["Previous|Consumption", "Current|Consumption", "Other|Influences", "Assess|Saving"]), "A defensible financial claim requires comparable measurements and examination of alternative explanations.")],
        ["Now consider Qasr, where the programme director and finance director disagree about the meaning of reported benefits.", null],
        ["An accountable business owner would connect operational evidence with management decisions while finance examines the financial consequences.", cmp("The Qasr responsibilities", "Business owner", "Deliver the operational outcome and explain the benefit claim.", "Finance", "Examine the financial evidence and challenge unsupported recognition.")],
        ["Neither responsibility should disappear when the implementation programme finishes or its original sponsor changes.", null],
        ["The audit committee should therefore require continuing ownership for claims that remain uncertain or financially unrealised.", iss("A benefit without continuing accountability can remain unresolved even when the original implementation was successful.", "The continuity risk")],
        ["The apartment example demonstrates why naming an owner is only useful when responsibility includes evidence and decision authority.", null],
        ["A credible owner must explain what happened, what remains uncertain and what action is justified.", q("Who should remain responsible if the expected benefit has not appeared when the installation project closes?")],
        ["The building manager should continue the review until the benefit is demonstrated or its limitations are honestly explained.", null],
        ["Qasr needs the same discipline so that financial promises remain accountable beyond the completion of operational change.", st("A benefit owner needs authority, evidence and continuing responsibility until the promised outcome is resolved.")]
      ]
    }
  ]
},
{
  title: "Building a benefits register that finance can trust",
  sec: "W13O3b",
  lines: [
    ["Let us return to Qasr, where the audit committee needs more than competing figures and explanations.", t("Building a benefits register that finance can trust", "Week 13 - Realize Value - W13O3b")],
    ["It needs a reliable record connecting each promised benefit with its owner, supporting evidence and financial consequences.", null],
    ["That record is a benefits register, a management tool for tracking expected value from commitment through realisation.", dg("The purpose of a benefits register", D.flow(["Promised|Benefit", "Accountable|Owner", "Measured|Result", "Financial|Evidence", "Reported|Status"]), "The register connects the original commitment with responsibility, measurement, verification and reporting.")],
    ["A useful register begins with the business objective because managers must understand why each benefit matters.", null],
    ["It then preserves the original estimate and baseline, meaning the agreed position before the redesigned process changed operations.", dg("Establishing the commitment", D.flow(["Business|Objective", "Original|Estimate", "Agreed|Baseline", "Expected|Outcome"]), "The original expectation and starting position must remain visible throughout the benefits review.")],
    ["Without those records, managers may report improvement while losing the assumptions needed to evaluate its actual significance.", null],
    ["At Qasr, the AED 240,000 labour claim illustrates why preserving the original assumptions is essential.", cmp("The labour claim", "Original expectation", "AED 240,000 in labour benefits, with eleven fewer employees assumed.", "Observed staffing", "Headcount fell by four; actual financial realisation requires verification.")],
    ["The register should identify the relevant operational measure and connect it with evidence of actual labour expenditure.", null],
    ["It should not convert the staffing ratio into a monetary saving because employment costs and assumptions remain unverified.", st("Every financial claim needs a measurement method that matches the economic benefit being reported.")],
    ["The next requirement is an accountable business owner who can influence decisions affecting the expected outcome.", null],
    ["That owner must explain progress, investigate shortfalls and initiate justified actions when the benefit remains unrealised.", dg("Ownership and verification", D.lanes(["Business owner", "Programme team", "Finance"], [[0, "Deliver outcome"], [0, "Explain shortfall"], [1, "Support measurement"], [1, "Preserve assumptions"], [2, "Examine evidence"], [2, "Reconcile value"]]), "These are proposed governance responsibilities, not confirmed assignments within Qasr.")],
    ["Finance should examine the financial evidence independently, while business management remains responsible for delivering the underlying benefit.", null],
    ["This separation matters because reporting a monetary estimate does not establish that expenditure or financial contribution actually changed.", q("Who should explain an unrealised benefit, and who should examine whether its claimed financial value is defensible?")],
    ["Now consider Qasr's AED 180,000 retained corporate revenue claim, where two renewals require careful attribution.", null],
    ["The register should preserve the four percent corporate rate reduction because pricing may also have influenced renewal decisions.", dg("Recording the retention claim", D.flow(["Two|Renewals", "Rate|Reduction", "Attribution|Evidence", "Financial|Contribution"]), "The register must preserve competing explanations rather than automatically crediting the redesigned process.")],
    ["A credible record would distinguish observed retention from the contribution reasonably attributable to the redesigned arrival process.", null],
    ["It would also identify the financial evidence needed before treating retained revenue as realised economic value.", st("A benefits register records uncertainty explicitly instead of hiding it inside an apparently precise financial amount.")],
    ["The AED 85,000 avoided regulatory penalty requires another treatment because its financial exposure remains contingent on enforcement.", null],
    ["The register should therefore distinguish evidence of reduced regulatory risk from evidence supporting an actual avoided financial cost.", cmp("Different evidence requirements", "Retained revenue", "Investigate customer decisions, pricing effects and attributable financial contribution.", "Avoided penalty", "Investigate credible regulatory exposure, enforcement uncertainty and defensible avoided expenditure.")],
    ["Notice how a single register can accommodate different benefit categories without pretending their evidence is interchangeable.", null],
    ["Each claim should also have an expected measurement date, allowing managers to distinguish delayed results from unresolved assumptions.", dg("Tracking benefit maturity", D.flow(["Expected|Date", "Observed|Progress", "Evidence|Review", "Status|Update", "Next|Action"]), "Dates and review decisions help explain timing without automatically recognising future benefits.")],
    ["At Qasr, seven properties went live within the last four months, making measurement timing particularly relevant.", null],
    ["However, the register must not classify the entire AED 115,000 gap as delayed without supporting evidence.", iss("A benefits register must preserve unresolved differences rather than manufacture explanations that the available evidence cannot support.", "The reconciliation safeguard")],
    ["The reporting cycle should require owners to update evidence and finance to examine claims before committee reporting.", null],
    ["Any unresolved amount should retain its explanation, responsible owner, required action and next review point.", dg("A proposed reporting cycle", D.flow(["Owner updates evidence", "Finance examines claims", "Committee reviews gaps", "Actions return to owners"]), "This is a proposed governance cycle for Qasr, not an established organisational procedure.")],
    ["The register should never become a document that merely repeats the original business case without challenging its assumptions.", null],
    ["Its purpose is to make benefit realisation visible, testable and accountable throughout the programme's remaining life.", q("Would you trust a benefits register that reported precise savings but omitted their owners, baselines and financial evidence?")],
    ["For Qasr, the committee should receive the AED 620,000 promise and AED 505,000 tracked figure with clear qualifications.", null],
    ["The verified financial amount must remain distinct until supporting evidence establishes what the organisation actually realised.", t("The central lesson", "A trustworthy benefits register connects commitments, ownership, measurements, attribution, financial evidence and unresolved actions.")]
  ],
  review: [
    {
      title: "The sports club that could not explain its savings",
      lines: [
        ["Imagine a sports club introducing an online membership system because management expects fewer administrative tasks and lower operating costs.", t("The sports club's benefits register", "Why a financial promise needs a traceable record of evidence and responsibility.")],
        ["The system begins operating successfully, and members can renew their subscriptions without completing the previous manual paperwork.", null],
        ["The club manager celebrates because administrative employees now spend less time processing routine membership renewals.", dg("The operational improvement", D.flow(["Online|Renewals", "Less|Manual work", "Released|Capacity"]), "The redesigned process may release administrative capacity without automatically reducing expenditure.")],
        ["However, the club's financial report does not show the savings originally expected from the new system.", null],
        ["Nobody can explain the difference because the original assumptions and measurement arrangements were never preserved.", iss("A benefit becomes difficult to verify when the organisation loses its baseline and the assumptions supporting its estimate.", "The missing evidence")],
        ["The club needs a benefits register that connects its original expectation with actual operating and financial results.", null],
        ["The register should identify the business objective, expected saving and baseline established before the system began operating.", dg("Recording the original promise", D.flow(["Business|Objective", "Expected|Saving", "Original|Baseline", "Measurement|Method"]), "The starting position and expected benefit must remain available for later comparison.")],
        ["A named club manager should then accept responsibility for explaining what happened to the released administrative capacity.", null],
        ["That owner might identify opportunities to improve service, but potential improvements must not be reported as realised savings.", q("Would assigning an owner solve the problem if nobody preserved the records needed to measure the benefit?")],
        ["Ownership and evidence must work together because responsibility without reliable measurement cannot establish financial value.", null],
        ["Finance should examine whether actual expenditure changed and whether any reduction can reasonably be attributed to the system.", dg("The verification process", D.flow(["Owner|Reports outcome", "Evidence|Supports claim", "Finance|Examines value", "Status|Recorded"]), "Business ownership and financial examination serve different but complementary purposes.")],
        ["If the expected saving remains missing, the register should explain the gap rather than silently preserve the original estimate.", null],
        ["The owner should identify any justified action and establish when the unresolved claim will be reviewed again.", st("A useful benefits register makes missing value visible and assigns responsibility for resolving the uncertainty.")],
        ["Now return to Qasr, where the original labour assumption differs from the observed reduction in employee headcount.", null],
        ["The register should preserve both figures while requiring evidence of actual expenditure before recognising a financial saving.", dg("Applying the club lesson", D.flow(["Original|Labour claim", "Actual|Staffing", "Payroll|Evidence", "Defensible|Value"]), "Qasr must reconcile its labour expectation with actual staffing and financial consequences.")],
        ["The committee should also see who owns the claim and what evidence remains necessary for verification.", null],
        ["This prevents an operational improvement from becoming an unsupported monetary figure repeated across successive management reports.", q("What would make Qasr's labour benefit more credible than simply repeating the AED 240,000 claim?")],
        ["The answer is a traceable record connecting the original assumptions with measured outcomes and financial evidence.", null],
        ["The sports club example shows why a register supports accountability rather than merely storing numbers.", st("A trustworthy register preserves the promise, assigns ownership, records evidence and explains unresolved financial differences.")]
      ]
    },
    {
      title: "The household renovation notebook",
      lines: [
        ["Consider a family renovating its home because several improvements are expected to reduce monthly household expenditure.", t("The household benefits notebook", "How a simple record can distinguish expected savings from actual financial results.")],
        ["The family replaces inefficient appliances and improves insulation, expecting lower electricity expenditure after the work is completed.", null],
        ["The renovation finishes successfully, but the family later struggles to explain whether the investment achieved its financial objectives.", dg("The household investment", D.flow(["Expected|Savings", "Renovation|Completed", "Actual|Bills", "Benefits|Review"]), "Completing the renovation does not establish that the expected financial benefits have been realised.")],
        ["The difficulty is that nobody recorded the original consumption baseline or the assumptions behind the expected savings.", null],
        ["Without those records, a lower electricity bill may look encouraging while providing limited evidence about the renovation's contribution.", cmp("Two different records", "Original expectation", "The saving estimated before the renovation began.", "Measured outcome", "The expenditure observed after completion under actual conditions.")],
        ["The family decides to maintain a simple notebook connecting each expected benefit with its supporting measurements.", null],
        ["For every improvement, the notebook records the original expectation, available baseline and method for checking the result.", dg("A useful benefits record", D.flow(["Original|Expectation", "Agreed|Baseline", "Current|Measurement", "Assess|Difference"]), "The record preserves the relationship between the original promise and observed performance.")],
        ["One family member accepts responsibility for collecting bills and explaining differences between expected and actual expenditure.", null],
        ["Another examines whether changes in electricity prices or household occupancy influenced the observed financial result.", q("Why would a lower electricity bill be insufficient evidence if household occupancy also changed during the comparison period?")],
        ["Because several influences can affect expenditure, the family must distinguish observed change from the renovation's attributable contribution.", null],
        ["The notebook should preserve those uncertainties rather than assign every favourable difference to the completed work.", st("A credible benefits record distinguishes measured improvement from the contribution reasonably attributable to the intervention.")],
        ["Suppose the insulation improvement appears useful, but its financial effect cannot yet be separated from seasonal temperature changes.", null],
        ["The family should record the unresolved question and identify what additional comparison would improve its assessment.", dg("Managing uncertainty", D.flow(["Observed|Change", "Other|Influences", "Unresolved|Claim", "Further|Evidence"]), "Uncertainty should remain visible until sufficient evidence supports a defensible conclusion.")],
        ["That approach is more useful than inventing a precise saving simply because the renovation was expected to deliver one.", null],
        ["At Qasr, the same discipline applies to retained corporate revenue and the contingent avoided regulatory penalty.", cmp("Different Qasr claims", "Corporate retention", "Pricing changes complicate attribution to the redesigned process.", "Regulatory penalty", "Contingent enforcement complicates recognition of an avoided financial cost.")],
        ["The benefits register should preserve these different uncertainties while identifying accountable owners and appropriate evidence requirements.", null],
        ["Finance can then examine each claim without assuming that all reported amounts represent equivalent financial achievements.", dg("From register to review", D.flow(["Benefit|Claim", "Owner|Explains", "Evidence|Examined", "Finance|Reconciles", "Status|Reported"]), "A proposed review process connects ownership, evidence and financial assessment.")],
        ["The household example demonstrates that reliable benefits management depends on preserving information throughout the improvement journey.", null],
        ["A register becomes valuable when it supports decisions rather than merely recording optimistic expectations.", q("What should Qasr report when a claimed benefit remains plausible but its financial value cannot yet be verified?")],
        ["It should preserve the claim with an explicit qualification, supporting evidence and a responsible owner for further examination.", null],
        ["That approach protects the credibility of the benefits review while allowing genuine improvements to receive appropriate recognition.", st("A benefits register should make expected, measured and financially verified value distinguishable and accountable.")]
      ]
    }
  ]
},
{
  title: "The next programme must not repeat the argument",
  sec: "W13O3c",
  lines: [
    ["Let us return to Qasr's audit committee, where our final challenge is preventing the same disagreement from recurring.", t("The next programme must not repeat the argument", "Week 13 - Realize Value - W13O3c")],
    ["The programme promised AED 620,000 annually, while AED 505,000 is currently tracked without complete financial verification.", dg("The unresolved benefits position", D.bars([["Promised", 620], ["Tracked", 505], ["Difference", 115]]), "Amounts in AED thousands. The difference is arithmetic; the verified financial value remains unresolved.")],
    ["The committee needs an honest explanation today, but the next BPM investment needs stronger arrangements from the beginning.", null],
    ["That brings us to benefits governance, meaning the responsibilities and decisions through which expected value becomes accountable.", dg("A proposed governance chain", D.flow(["Strategic|Objective", "Named|Owner", "Agreed|Evidence", "Financial|Review", "Committee|Oversight"]), "This is a proposed arrangement for future Qasr programmes, not an existing approved governance structure.")],
    ["Imagine Qasr preparing another process improvement programme, this time concerning corporate billing rather than guest arrivals.", null],
    ["Before approving its business case, management should identify the outcomes expected and the evidence needed to demonstrate them.", st("Benefits governance begins before investment approval, not when the implementation team announces that delivery is complete.")],
    ["A proposed benefit owner should understand the relevant business operations and possess authority over decisions affecting realisation.", null],
    ["Finance should challenge the measurement method and assumptions before management accepts a monetary estimate as a commitment.", dg("Preparing the next investment", D.flow(["Define|Outcome", "Assign|Business owner", "Agree|Baseline", "Test|Estimate", "Approve|Commitment"]), "These are proposed preparation steps, not established facts about Qasr's corporate-billing programme.")],
    ["This early agreement matters because disputes become harder to resolve when the original assumptions disappear after implementation.", null],
    ["A baseline should preserve the starting position, while the benefit estimate should explain how improvement creates economic value.", cmp("Two essential records", "Baseline", "The agreed position before the proposed process change.", "Benefit estimate", "The expected economic consequence, supported by explicit assumptions.")],
    ["The proposed corporate-billing programme should therefore distinguish faster administrative work from any reduction in actual operating expenditure.", null],
    ["Otherwise, Qasr could repeat the front-desk problem by treating released employee capacity as automatically realised labour savings.", q("What would prevent the next programme from promising financial savings that no manager can later locate?")],
    ["The answer involves clear ownership, credible measurements and decisions that connect operational improvements with financial consequences.", null],
    ["These arrangements must continue after implementation because some benefits require further action before their value becomes visible.", dg("Responsibility beyond implementation", D.flow(["Implement|Capability", "Business|Action", "Measure|Outcome", "Finance|Verification", "Report|Realisation"]), "Programme delivery enables improvement, while business management remains responsible for capturing and demonstrating value.")],
    ["For the current programme, Qasr should preserve the unresolved labour, retained revenue and regulatory claims separately.", null],
    ["Their evidence requirements differ, so combining them prematurely would conceal uncertainty rather than resolve the committee's disagreement.", dg("Current claims requiring review", D.flow(["Labour: staffing and expenditure", "Retention: pricing and attribution", "Penalty: contingent exposure"]), "These are reported claims requiring different evidence, not verified allocations of realised financial value.")],
    ["The programme director's timing explanation also deserves examination because seven properties went live within the last four months.", null],
    ["However, the committee should not assume that recent deployment guarantees the remaining expected benefits will eventually materialise.", iss("An explanation based on timing needs supporting measurements and a defensible review period, not optimism alone.", "The timing safeguard")],
    ["A proposed reporting cycle would require benefit owners to update evidence and explain any unresolved differences.", null],
    ["Finance would examine the monetary claims before the committee considers their implications and authorises justified follow-up actions.", dg("A proposed reporting cycle", D.flow(["Owners update evidence", "Finance examines claims", "Committee reviews gaps", "Actions return to owners"]), "This is a recommended governance cycle for Qasr, not a documented existing procedure.")],
    ["Such reporting should encourage honesty because concealing disappointing results prevents management from understanding why value remains missing.", null],
    ["An unresolved claim should remain visible until evidence supports recognition, revision or an explicit conclusion about nonrealisation.", st("Good governance rewards credible explanations and corrective action rather than the preservation of optimistic benefit figures.")],
    ["This approach also prepares Qasr for Sustainable Performance, the framework phase following Realize Value.", null],
    ["Realize Value establishes what benefits were achieved, while Sustainable Performance concerns maintaining and improving operational results.", dg("The framework transition", D.flow(["Implement|Operational use", "Realize Value|Demonstrate benefits", "Sustainable Performance|Maintain improvement"]), "Phase nine examines realised value; the following phase addresses continuing performance.")],
    ["A benefit that depends on continued operational discipline needs ownership beyond the original project's closing milestone.", null],
    ["Without that continuity, even genuinely achieved improvements may weaken after the programme team has moved elsewhere.", q("Who should remain accountable when the project finishes but the business must continue delivering its expected outcomes?")],
    ["The answer is accountable business management, supported by reliable measurements, financial scrutiny and continuing governance.", null],
    ["Our separate discussion forum will challenge you to evaluate disputed benefits in another organisation using this same reasoning.", dg("Your benefits review discipline", D.flow(["Identify|Claim", "Examine|Evidence", "Assess|Attribution", "Assign|Ownership", "Defend|Conclusion"]), "Apply the reasoning to the separate forum case using its own supplied evidence, without assuming Qasr's facts apply.")],
    ["As we conclude Week 13, remember that a successful BPM programme must demonstrate value rather than merely announce completion.", null],
    ["Qasr's unresolved figures teach us why credible evidence and accountable ownership belong at the centre of benefits management.", t("The Week 13 conclusion", "Define benefits early, assign accountable owners, verify financial consequences and preserve honest reporting beyond implementation.")]
  ],
  review: [
    {
      title: "The neighbourhood recycling programme",
      lines: [
        ["Imagine a neighbourhood association introducing a recycling collection arrangement because residents expect lower waste management expenditure.", t("The recycling programme's accountability lesson", "Why benefits governance must begin before implementation and continue afterward.")],
        ["The association purchases collection containers and arranges a new schedule for separating recyclable materials from ordinary household waste.", null],
        ["Residents begin participating, and the organisers celebrate because the redesigned collection arrangement operates as intended.", dg("The implementation achievement", D.flow(["Collection|Redesigned", "Residents|Participate", "Waste|Separated"]), "Successful participation establishes operational change, not the financial saving originally expected.")],
        ["However, the association later discovers that nobody agreed how the expected reduction in waste expenditure would be measured.", null],
        ["The collection contractor continues charging according to existing arrangements, leaving the promised financial benefit difficult to demonstrate.", cmp("Two different achievements", "Operational improvement", "Residents separate recyclable materials using the redesigned collection arrangement.", "Financial realisation", "Evidence establishes an attributable reduction in actual waste management expenditure.")],
        ["The organisers assume the association treasurer will calculate savings, while the treasurer expects the organisers to provide evidence.", null],
        ["This creates an accountability gap because responsibility for demonstrating the promised benefit was never clearly assigned.", q("What should the association have agreed before approving the recycling investment?")],
        ["It needed a baseline describing previous waste expenditure and a credible explanation of how recycling would change that expenditure.", null],
        ["It also needed an accountable owner with authority to examine collection arrangements and influence relevant management decisions.", dg("Designing benefits governance", D.flow(["Agree|Objective", "Record|Baseline", "Assign|Owner", "Measure|Outcome", "Verify|Saving"]), "The proposed governance arrangement connects the original promise with evidence and accountable management action.")],
        ["The owner should remain responsible after implementation because financial consequences may depend on later contractual or operating decisions.", null],
        ["If the expected saving does not appear, the association should investigate the reasons rather than repeat the original estimate.", st("Benefits ownership continues beyond implementation until the expected outcome is demonstrated or honestly explained.")],
        ["Now return to Qasr, where the current benefits review exposes weaknesses that future programme governance should prevent.", null],
        ["The proposed corporate-billing programme should establish owners, baselines and financial tests before approving its expected benefits.", dg("Applying the recycling lesson", D.flow(["Future|Qasr programme", "Benefit|Commitment", "Business|Ownership", "Financial|Verification"]), "These are proposed safeguards for future Qasr investment decisions, not documented existing arrangements.")],
        ["Finance should examine the financial assumptions, while business managers remain accountable for decisions affecting benefit realisation.", null],
        ["A reporting cycle should preserve unresolved claims and identify actions without manufacturing certainty about missing financial value.", iss("Without continuing accountability, a genuine operational improvement can remain financially unrealised after the project closes.", "The governance gap")],
        ["The recycling example shows why benefits management must be designed into the investment rather than added after delivery.", null],
        ["That discipline makes future financial claims more credible and helps managers respond when actual outcomes differ from expectations.", q("Who should explain a missing benefit when the implementation team has already completed its work?")],
        ["The accountable business owner should explain the evidence and coordinate justified actions with appropriate financial scrutiny.", null],
        ["That is how benefits governance prevents the next programme from repeating an avoidable disagreement about promised value.", st("Agree the benefit, establish the baseline, assign ownership and preserve accountability until realisation is resolved.")]
      ]
    },
    {
      title: "The family's new household budget",
      lines: [
        ["Consider a family planning several home improvements because everyone hopes the changes will reduce monthly household expenditure.", t("The household budget agreement", "How early commitments and continuing reviews prevent arguments about expected savings.")],
        ["The family agrees to replace inefficient equipment and reorganise some everyday activities to use household resources more effectively.", null],
        ["Everyone supports the plan, but nobody initially records the existing expenditure or agrees how future savings will be calculated.", dg("The incomplete plan", D.flow(["Expected|Saving", "Planned|Changes", "Missing|Baseline", "Unclear|Evidence"]), "Without an agreed starting point and measurement method, later financial claims become difficult to defend.")],
        ["After the improvements, one family member celebrates lower electricity consumption while another questions whether monthly bills actually decreased.", null],
        ["Both may have valid observations because reduced consumption and reduced expenditure are related but different outcomes.", cmp("Two perspectives", "Operational result", "Household electricity consumption may have decreased.", "Financial result", "Actual attributable expenditure reduction requires supporting billing evidence.")],
        ["The disagreement becomes difficult because the family never agreed which result would demonstrate success before spending money.", null],
        ["A better arrangement would record the original bills and establish a realistic expectation for the proposed changes.", q("Why is it harder to agree on financial success after the investment when nobody defined success beforehand?")],
        ["Without prior agreement, people may select favourable measurements that support their preferred interpretation of the outcome.", null],
        ["The family could instead assign one person to maintain records and explain differences between expectations and actual results.", dg("A household benefits agreement", D.flow(["Record|Baseline", "Agree|Expectation", "Name|Owner", "Review|Bills", "Explain|Difference"]), "An agreed record and responsible owner support a more credible assessment of the investment.")],
        ["That responsibility should include checking whether electricity prices or household occupancy changed during the comparison period.", null],
        ["Such influences matter because an observed financial result may not belong entirely to the improvements being evaluated.", st("A credible benefits review examines competing explanations rather than automatically crediting the original investment.")],
        ["Suppose the family discovers that expenditure remains higher than expected despite evidence of improved energy efficiency.", null],
        ["The responsible person should explain the difference and identify any justified changes that could improve the outcome.", dg("Responding to a shortfall", D.flow(["Observed|Result", "Investigate|Causes", "Identify|Action", "Review|Evidence"]), "A shortfall should prompt evidence-based investigation and proportionate action rather than an invented saving.")],
        ["The family should not alter its records merely to make the original investment appear more financially successful.", null],
        ["Honest reporting helps everyone understand which improvements worked and which financial expectations require reconsideration.", iss("Preserving an optimistic estimate cannot substitute for evidence that the expected financial benefit was actually achieved.", "The reporting safeguard")],
        ["Now return to Qasr, where AED 620,000 was promised and AED 505,000 is currently tracked.", null],
        ["The next programme should preserve its original assumptions and establish financial verification arrangements before implementation begins.", dg("Preventing another Qasr dispute", D.flow(["Strategic|Objective", "Agreed|Baseline", "Accountable|Owner", "Verified|Benefit", "Continuing|Review"]), "This proposed governance approach addresses the weaknesses revealed by Qasr's current benefits dispute.")],
        ["Business managers should remain accountable for benefit delivery, while finance examines the monetary consequences of their decisions.", null],
        ["The committee should receive transparent explanations of unresolved claims rather than unsupported promises about future realisation.", q("What would make the next Qasr benefits review more defensible than the current disagreement?")],
        ["Early agreement, continuing ownership and credible financial evidence would make the organisation better prepared to explain its results.", null],
        ["The household example reminds us that benefits management is a continuing responsibility rather than an end-of-project calculation.", st("Define the promise before investment, verify the outcome afterward and keep accountability alive beyond implementation.")]
      ]
    }
  ]
},
      ] },
    ]
  };
  // Claude review fixes (original line indices): sentence replacements, then removals in descending order.
  const FIX = [["W13O1b",-1,4,"During phase one, Organization Strategy, managers establish the business objectives that justify investing resources in process improvement."],["W13O1c",-1,7,"Now consider cost avoided, where a spend the organisation had genuinely committed to simply does not take place."],["W13O1c",-1,20,"This may improve service or absorb demand, but it counts as a benefit only once the capacity is redeployed to something measured."],["W13O2c",-1,1,"The programme\u0027s tracked figure includes AED 240,000 in labour benefits, calculated as if eleven fewer employees were needed."]];
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
