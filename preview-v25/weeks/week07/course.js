// OPER621 Business Process Management · Week 7 · The Launch Pad Phase.
// Framework phase 3: choosing where to start, and who with.
// Sources: OPER621 Week 7 Session 1 slides (27 slides),
// OPER621 Week 7 Delivery Plan, Jeston, Business Process Management:
// Practical Guidelines to Successful Implementation, 4th ed., Chapter 15.
// Running case: Qasr Hospitality Group — Four Candidates, One Team.
//
// OFFICIAL COURSE LEARNING OUTCOMES
// K2: Evaluate various factors that impact on the successful implementation
//     of BPM in public and private sector organizations.
// S1: Design a framework for BPM and explain and assess related phases
//     in the context of a regional company.
//
// WEEK 7 LEARNING OUTCOMES
// O1: Explain how the Launch Pad phase determines where a BPM programme begins.
//     Primary CLO: S1. Supporting CLO: K2.
// O2: Apply prioritisation criteria when many processes are underperforming.
//     Primary CLO: K2. Supporting CLO: S1.
// O3: Justify a starting scope and defend it against stakeholders
//     who preferred another.
//     Primary CLO: S1. Supporting CLO: K2.
//
// LESSON AND SECTION MAPPING
// l1: From strategy to the Launch Pad
//     W7O1a: Why the Launch Pad matters.
//     W7O1b: The five decisions that make a project possible.
//     W7O1c: What a completed Launch Pad must deliver.
// l2: Four candidates, one delivery team
//     W7O2a: Choosing a process that matters and can be delivered.
//     W7O2b: Qasr's four competing candidates.
//     W7O2c: Making a defensible first choice.
// l3: Defining the work and building the coalition
//     W7O3a: Drawing a boundary that solves the problem.
//     W7O3b: The people who can make the project succeed.
//     W7O3c: Turning disagreement into an agreed commitment.
// l4: Measuring success and defending the Launch Pad
//     W7O3d: Establishing the baseline before redesign.
//     W7O3e: The one-page Launch Pad decision.
//     W7O3f: From Qasr's decision to your forum.
//
// RUNTIME SECTION KEYS
// The course uses O1a through O3f as runtime section keys,
// matching ADAPTIVE.sections and the Week 1 engine.
// Full Week 7 identifiers are W7O1a through W7O3f.
// Bank item IDs use W7O1a-01, W7O1a-02, and so on.
//
// NARRATION RULES
// Each main section contains 430–570 spoken words.
// Spoken sentences contain 6–30 words, averaging 15–18 words.
// One connected teacher-to-student story continues across the lessons.
// Each line is [spoken sentence, visual moment].
// A null moment keeps the previous picture visible.
// A meaningful visual change occurs every one to three sentences.
// Only Week 1 MOMENT_KIT and DIAG functions are used.
// Remedial micro-lessons belong in adaptive-week.js, not here.
//
// PRODUCTION
// This base file contains lesson l1 only.
// Insert subsequent lesson objects at //MORE_LESSONS.
// Preserve the IIFE, helpers, metadata, and final script-generation block.
 
(() => {
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
    id: "oper621-w7",
    code: "OPER621",
    title: "The Launch Pad Phase",
    subtitle: "Business Process Management · Week 7",
    author: "Prof. Bassem Jarboui",
 
    teacher: {
      name: "Prof. Bassem Jarboui",
      email: "",
      sendReport: false
    },
 
    lessons: [
 
      {
        id: "l1",
        title: "From strategy to the Launch Pad",
 
        sections: [
 
          {
            title: "Why the Launch Pad matters",
            sec: "O1a",
 
            lines: [
 
              ["Welcome to Week Seven, where our BPM journey reaches the moment when an organisation must decide what to improve.", t("OPER621 · Week 7", "The Launch Pad Phase")],
 
              ["Until now, we have explored why processes matter and how they connect with organisational strategy.", null],
 
              ["Today, I want you to imagine sitting inside the headquarters of Qasr Hospitality Group.", dg("Returning to Qasr Hospitality", D.org("process", {
                depts: ["Reservations", "Front desk", "Housekeeping", "Finance"],
                top: "Qasr management",
                from: "Guest request",
                to: "Guest served"
              }), "Qasr's customer journeys depend on connected work across several departments.")],
 
              ["You remember Qasr, our hotel group operating fourteen properties and serving thousands of guests.", null],
 
              ["Its managers have recognised that disconnected processes are damaging customer experiences and organisational performance.", iss("Qasr understands its process problems, but it has not yet selected the first improvement project.", "The decision remains open")],
 
              ["They have discussed strategic priorities and examined how the group's important processes fit together.", null],
 
              ["But the management team now faces a difficult question that cannot be answered by drawing another diagram.", q("Which process should Qasr actually improve first?")],
 
              ["Several processes need attention, and every department can explain why its own problems deserve immediate action.", null],
 
              ["The difficulty is that Qasr cannot realistically redesign everything at the same time.", st("Recognising many problems does not mean an organisation can improve every process simultaneously.")],
 
              ["Its board expects to review progress in six months, while the programme has only one delivery team.", null],
 
              ["Choosing poorly could consume that team's capacity without producing a result that anyone can recognise.", iss("One delivery team must demonstrate meaningful progress before the board's six-month review.", "Limited delivery capacity")],
 
              ["This is where the Launch Pad becomes essential, because a BPM programme needs a practical starting point.", null],
 
              ["The Launch Pad is the third phase of the implementation framework we introduced earlier in this course.", dg("Phase three of the BPM framework", D.route([2]), "The Launch Pad follows Organisation Strategy and Process Architecture and prepares the work for Understand.")],
 
              ["Organisation Strategy came in Week Five, when we connected process improvement with the organisation's wider ambitions.", null],
 
              ["Process Architecture followed in Week Six, helping us understand the processes and relationships across the organisation.", dg("From strategy to action", D.route([0, 1, 2]), "Organisation Strategy establishes direction, Process Architecture identifies the process landscape, and the Launch Pad selects actionable work.")],
 
              ["Those earlier phases provide direction and understanding, but neither automatically tells managers which project should begin.", null],
 
              ["Imagine having a map of every road in Dubai without knowing which destination matters most today.", st("A process architecture identifies possible improvement areas, but managers still need to choose where to begin.")],
 
              ["The map is useful, yet you still need to choose a destination that fits your purpose and resources.", null],
 
              ["In the same way, Qasr needs to convert its strategic ambitions into a manageable improvement commitment.", null],
 
              ["That commitment must identify the process, its boundaries, the responsible people, and the evidence of success.", it(1, 3, "target", "Choose meaningful work", "The selected process must support organisational priorities and be realistic to improve.")],
 
              ["The Launch Pad also establishes whether the organisation has enough support to make the proposed changes happen.", null],
 
              ["A promising project can fail when its sponsor cannot resolve disagreements between departments.", it(2, 3, "users", "Secure the necessary support", "A credible project needs leadership, ownership, and cooperation across the affected functions.")],
 
              ["And even a completed project can disappoint when nobody agreed how improvement would be measured.", null],
 
              ["That is why the Launch Pad establishes the starting evidence before anyone begins redesigning the process.", it(3, 3, "gauge", "Prepare to demonstrate value", "The team needs a defined measure and reliable baseline before judging later improvements.")],
 
              ["Notice that this phase does not require Qasr to solve every operational problem immediately.", null],
 
              ["Instead, it prepares the organisation to investigate one agreed area through the next phase, called Understand.", dg("Preparing for the next phase", D.route([2, 3]), "The Launch Pad establishes the improvement commitment that the Understand phase will investigate.")],
 
              ["During Understand, the team will examine what actually happens and investigate why the selected process performs poorly.", null],
 
              ["For now, the challenge is choosing the right work and creating the conditions for that investigation.", st("The Launch Pad turns strategic intentions and process architecture into a clearly defined improvement project.")],
 
              ["Keep Qasr's steering group in mind, because its decisions will connect every part of our lesson.", null],
 
              ["By the end of this week, you should be able to explain and defend those decisions yourself.", q("What must Qasr agree before its improvement team can begin meaningful work?")],
 
              ["Let's examine the commitments that turn an interesting improvement idea into a project ready to begin.", null]
 
            ]
          },
 
          {
            title: "The five decisions that make a project possible",
            sec: "O1b",
 
            lines: [
 
              ["Let's return to Qasr's steering group, where the managers have agreed that the BPM programme must finally begin.", t("The Launch Pad decisions", "Five connected decisions turn an improvement idea into a workable project.")],
 
              ["The board expects visible progress, but the team still needs to establish exactly what that commitment means.", null],
 
              ["The programme director suggests improving guest arrival, because complaints about arriving guests helped trigger the BPM programme.", iss("Guest arrival has strong organisational relevance, but other processes also compete for the team's attention.", "Competing priorities")],
 
              ["That suggestion sounds sensible, especially when you remember the exhausted traveller we followed during Week One.", null],
 
              ["Yet another director argues that corporate billing deserves attention because billing problems have already damaged customer relationships.", q("Should Qasr begin with guest arrival simply because its problems are familiar?")],
 
              ["This disagreement reveals the opening Launch Pad decision: which process should the organisation improve, and why?", null],
 
              ["Managers must consider strategic value, realistic delivery, sponsor commitment, and whether success will be visible.", dg("Comparing possible starting points", D.flow(["Strategic|value", "Delivery|feasibility", "Sponsor|support", "+Visible|result"]), "A credible starting process combines organisational value, deliverability, sponsorship, and demonstrable results.")],
 
              ["Selecting a process solely because it promises impressive benefits could leave the team facing impossible dependencies.", null],
 
              ["But choosing something trivial merely because it is easy could fail to demonstrate why BPM matters.", st("The first project should matter to the organisation and be realistic for the available team.")],
 
              ["Once Qasr selects a process, another question becomes unavoidable: exactly which activities belong inside the project?", null],
 
              ["Imagine the team chooses guest arrival but studies only what happens at the reception desk.", dg("A narrow view of guest arrival", D.flow(["Booking|confirmed", "Rate|shared", "*Front|desk", "Room|allocated", "First night|billed"]), "A front-desk-only boundary excludes important information exchanges that may cause guest-arrival problems.")],
 
              ["That boundary might miss booking errors created earlier, even though those errors cause delays when guests arrive.", null],
 
              ["The project therefore needs a starting event, a final result, and explicit decisions about included handoffs.", null],
 
              ["For Qasr, the programme director proposes following the journey from booking confirmation through the first night's billing.", dg("The proposed guest-arrival boundary", D.flow(["Booking|confirmed", "Details|shared", "Guest|arrives", "Room|allocated", "+First night|billed"], {
                bracket: [0, 4, "Proposed project scope"]
              }), "The proposed boundary includes booking information, room allocation, check-in, and the first billing handoff.")],
 
              ["Later parts of the stay, checkout, and post-stay complaints remain outside that proposed project boundary.", null],
 
              ["Notice how defining a boundary prevents the team from promising improvements it cannot realistically deliver.", st("A useful scope includes the work needed to address the problem while explicitly excluding unrelated activities.")],
 
              ["Now consider what happens when Reservations disagrees with including booking information in the arrival project.", null],
 
              ["The steering group needs people who can resolve that disagreement and keep the improvement work moving.", q("Who can authorise a cross-functional decision when departments disagree about the project?")],
 
              ["That leads to another Launch Pad commitment: identifying the executive sponsor, process owner, and people doing the work.", null],
 
              ["The sponsor provides authority and removes barriers, while the process owner remains accountable for ongoing performance.", dg("Different responsibilities", D.flow(["Executive|sponsor", "Process|owner", "Front-line|employees", "+Customer|outcome"]), "The sponsor protects the project, the owner remains accountable for the process, and employees contribute operational knowledge.")],
 
              ["Front-line employees explain how the process really operates, including exceptions that managers may never see.", null],
 
              ["Customer representatives help challenge proposals that simplify internal work while making the guest experience worse.", st("A credible Launch Pad involves decision-makers, process owners, employees, and representatives of the customer outcome.")],
 
              ["But even a well-supported project needs evidence showing whether the resulting process performs better.", null],
 
              ["Suppose Qasr promises fewer rate corrections without knowing how often those corrections happen today.", iss("Qasr cannot demonstrate a reduction in rate corrections without measuring the current rate.", "Missing baseline")],
 
              ["The team must define its measure, establish the baseline, agree a target, and assign reporting responsibility.", null],
 
              ["Only then can later results be compared fairly with the situation that existed before redesign.", st("Success measurement requires a clear definition, reliable baseline, agreed target, and reporting owner.")],
 
              ["Finally, the steering group must explain the expected benefits and identify what could prevent their achievement.", null],
 
              ["Better guest experiences may be valuable, but disconnected systems or departmental opposition could undermine the project.", dg("From expected benefit to risk", D.flow(["Expected|benefit", "Required|changes", "!Delivery|barriers", "+Agreed|response"]), "The Launch Pad records the expected benefit alongside the obstacles that could prevent its delivery.")],
 
              ["These decisions belong together because an attractive project without boundaries, people, measures, or risk awareness remains fragile.", null],
 
              ["Qasr must document what it agrees, rather than assuming everyone leaves the meeting with the same understanding.", q("What evidence would convince you that Qasr's project is genuinely ready to begin?")],
 
              ["Let's examine the practical document that brings these commitments together and prepares the next team for action.", null]
 
            ]
          },
 
          {
            title: "What a completed Launch Pad must deliver",
            sec: "O1c",
 
            lines: [
 
              ["Imagine returning to Qasr's headquarters after the steering group has spent several meetings discussing possible improvement projects.", t("The Launch Pad handover", "A completed Launch Pad gives the next team a clear and usable starting point.")],
 
              ["The managers understand the competing priorities, but the programme director now asks everyone to demonstrate what has been agreed.", null],
 
              ["She does not want another presentation filled with ambitions that nobody has accepted responsibility for delivering.", iss("A long presentation cannot replace clear decisions about the project, its people, and its expected results.", "Unclear commitments")],
 
              ["Instead, she wants a concise Launch Pad document that another team can actually use.", null],
 
              ["That distinction matters because the next phase must investigate a defined process, not interpret conflicting management intentions.", st("The Launch Pad document should be specific enough for the Understand team to act without guessing.")],
 
              ["Imagine the team receiving a document that simply says Qasr should improve customer service.", null],
 
              ["The statement sounds positive, but it gives almost no guidance about what the team should investigate.", q("Could an improvement team begin useful work from a statement as broad as improve customer service?")],
 
              ["A usable document must identify the selected process and explain why it deserves the programme's initial attention.", null],
 
              ["It must also state where the process begins, where it ends, and which important handoffs are included.", dg("A documented process boundary", D.flow(["Booking|confirmed", "Rate and room|details", "Guest|arrives", "Check-in|completed", "+First night|billed"], {
                bracket: [0, 4, "Guest-arrival project"]
              }), "A documented boundary tells the team which activities and information handoffs belong to the proposed project.")],
 
              ["For the guest-arrival option, that could mean including booking information, room allocation, check-in, and first-night billing.", null],
 
              ["Checkout and later guest-service problems would remain outside this particular improvement project.", null],
 
              ["Writing those exclusions matters because otherwise the scope could expand whenever another manager identifies a related complaint.", st("An agreed boundary protects the project from uncontrolled expansion while preserving the work needed to address its problem.")],
 
              ["The document must also identify the executive sponsor and the person responsible for the process after improvement.", null],
 
              ["Remember that these responsibilities are different, even when both people support the same organisational objective.", dg("Sponsor and process owner", D.flow(["Executive|sponsor", "Project|decisions", "Process|owner", "+Ongoing|performance"]), "The executive sponsor resolves project barriers, while the process owner remains accountable for continuing process performance.")],
 
              ["The sponsor authorises decisions and helps remove barriers that the delivery team cannot resolve independently.", null],
 
              ["The process owner remains accountable for performance when the temporary improvement project has finished.", null],
 
              ["Without that distinction, Qasr might complete a project while leaving nobody responsible for sustaining its results.", iss("A completed project can lose its improvements when ongoing process ownership remains unclear.", "Accountability gap")],
 
              ["The next part of the document explains who must participate and how those people will be involved.", null],
 
              ["Reservations, revenue, housekeeping, and front-desk employees may understand different parts of the same guest-arrival problem.", dg("People across the journey", D.lanes(["Reservations", "Revenue", "Front desk", "Housekeeping"], [
                [0, "Booking"],
                [1, "Rate"],
                [2, "Arrival"],
                [3, "Room"],
                [2, "Check-in"]
              ]), "The stakeholder plan must account for employees whose work contributes to the guest-arrival journey.")],
 
              ["Their involvement should reflect their influence, interests, and the ways proposed changes could affect their work.", null],
 
              ["The stakeholder map therefore needs an engagement plan rather than merely a collection of names.", st("A stakeholder map identifies affected people, while the engagement plan explains how the project will involve them.")],
 
              ["Now imagine Qasr announcing that successful redesign will reduce the number of check-ins requiring rate corrections.", null],
 
              ["That ambition becomes useful only when the team knows the current percentage and agrees how improvement will be judged.", q("How could Qasr prove improvement without knowing the current rate of corrections?")],
 
              ["The Launch Pad must therefore record a precise measure, a reliable baseline, an agreed target, and reporting responsibility.", null],
 
              ["The team should avoid inventing an attractive baseline simply because the board expects a convincing business case.", st("Baseline figures must come from reliable evidence rather than assumptions or desired results.")],
 
              ["The document also records expected benefits and the risks that could prevent the programme from achieving them.", null],
 
              ["For example, conflicting departmental priorities might delay decisions even when the technical solution appears straightforward.", iss("Departmental disagreement can prevent a valuable improvement from being delivered on schedule.", "Implementation risk")],
 
              ["A concise risk statement helps the sponsor recognise where intervention may become necessary.", null],
 
              ["Taken together, these commitments form a practical handover rather than an impressive but unusable report.", dg("The Launch Pad handover", D.flow(["Selected|process", "Agreed|boundary", "People and|ownership", "Measures|and risks", "+Understand|phase"]), "The Launch Pad gives the Understand team an agreed process, clear responsibilities, and evidence for investigating current performance.")],
 
              ["The Understand phase can then investigate how the chosen process actually works and why its problems occur.", null],
 
              ["Qasr will still need to examine competing candidates carefully before committing its single delivery team.", null],
 
              ["That decision brings us to our next lesson, where four processes compete for the programme's attention.", q("Which Qasr process offers the strongest combination of value, deliverability, sponsorship, and visible results?")],
 
              ["Remember that the Launch Pad succeeds when its decisions enable meaningful investigation, not when its document looks impressive.", null]
 
            ]
          }
 
        ]
      },
      {
        id: "l2",
        title: "Four candidates, one delivery team",
 
        sections: [
 
          {
            title: "Choosing a process that matters and can be delivered",
            sec: "O2a",
 
            lines: [
 
              ["Welcome back to Qasr, where the steering group must now choose which process deserves the programme's limited delivery capacity.", t("Lesson 2 · Choosing where to start", "A valuable improvement opportunity is not automatically a suitable first project.")],
 
              ["The directors have brought several convincing proposals, and each proposal addresses a genuine organisational problem.", null],
 
              ["The programme director reminds everyone that Qasr has one delivery team and a board review in six months.", iss("Qasr has several important improvement opportunities, but only one delivery team.", "The starting decision matters")],
 
              ["This constraint changes the discussion because the team cannot promise to investigate every candidate simultaneously.", null],
 
              ["I want you to notice that selecting a process is not simply identifying which problem sounds most serious.", q("Which process offers meaningful value while remaining realistic for Qasr to improve?")],
 
              ["A serious problem may require more authority, specialist knowledge, or time than the available team possesses.", null],
 
              ["The steering group therefore needs consistent criteria that can be applied to every candidate.", st("Fair prioritisation compares competing processes against the same clearly understood criteria.")],
 
              ["Strategic value sits at the centre of that comparison, because improvement should support what the organisation wants to achieve.", null],
 
              ["For Qasr, that might involve protecting customer relationships, improving guest experiences, or reducing avoidable operating losses.", it(1, 4, "target", "Strategic value", "How strongly does improving this process support the organisation's priorities?")],
 
              ["A process that causes visible inconvenience may deserve attention, but visibility alone does not establish its strategic importance.", null],
 
              ["Managers should connect each proposed improvement to a meaningful organisational objective rather than relying on personal frustration.", null],
 
              ["The next consideration is deliverability, which asks whether the organisation can realistically undertake the proposed work.", it(2, 4, "gauge", "Deliverability", "Can the available team investigate and improve the process within practical constraints?")],
 
              ["Imagine choosing a process that depends on replacing several systems before any operational improvement becomes possible.", null],
 
              ["Even substantial expected benefits may not justify using the initial project to absorb those dependencies.", iss("A high-value process may be unsuitable for the initial project when essential dependencies exceed available capacity.", "Delivery exposure")],
 
              ["Conversely, a manageable process may provide an opportunity to demonstrate progress and build organisational confidence.", null],
 
              ["But deliverability should never become an excuse for choosing work that makes almost no difference.", cmp("left", "Easy but insignificant", "A manageable project may contribute little strategic value.", "down")],
 
              ["The steering group must consider both the importance of the problem and the feasibility of addressing it.", cmp("right", "Valuable and deliverable", "A stronger candidate combines meaningful benefits with realistic execution.", "up")],
 
              ["Sponsor commitment also matters because cross-functional improvements frequently require decisions that individual employees cannot authorise.", null],
 
              ["Suppose the project needs Reservations and Finance to agree on shared information and revised responsibilities.", it(3, 4, "users", "Sponsor commitment", "Will an accountable senior leader support decisions and resolve obstacles?")],
 
              ["Without an engaged sponsor, a capable improvement team may become trapped between competing departmental priorities.", null],
 
              ["A sponsor's title alone is insufficient when that person cannot provide time, authority, or continuing support.", st("Effective sponsorship means active commitment to resolving barriers, not simply approving the project name.")],
 
              ["The remaining consideration is visibility, meaning whether the improvement can produce results that stakeholders recognise.", null],
 
              ["The board needs credible evidence that BPM is creating value, rather than another attractive presentation.", it(4, 4, "eye", "Visibility", "Will the project produce meaningful results that stakeholders can observe and verify?")],
 
              ["Visibility does not mean choosing the loudest complaint or designing an improvement merely for publicity.", null],
 
              ["It means identifying outcomes that matter and can be demonstrated within a realistic period.", null],
 
              ["These criteria work together, and a strong score in one area cannot automatically cancel a serious weakness elsewhere.", dg("Balancing selection criteria", D.flow(["Strategic|value", "Delivery|feasibility", "Sponsor|commitment", "+Visible|results"]), "A defensible starting choice considers value, feasibility, sponsorship, and demonstrable results together.")],
 
              ["For example, a highly valuable project without sponsorship may be riskier than a slightly smaller opportunity with committed leadership.", null],
 
              ["The steering group should record those trade-offs rather than pretending that every candidate has an obvious ranking.", q("Would you choose the highest potential benefit if its delivery depended on unresolved departmental disagreements?")],
 
              ["In our next section, we will apply these criteria to the four processes competing for Qasr's attention.", null]
 
            ]
          },
 
          {
            title: "Qasr's four competing candidates",
            sec: "O2b",
 
            lines: [
 
              ["Now imagine Qasr's steering group examining four proposals, each presented by managers who believe their process deserves immediate attention.", t("Qasr · Four Candidates, One Team", "Four credible proposals compete for one initial BPM improvement project.")],
 
              ["The programme director asks everyone to consider the evidence before defending their preferred department.", null],
 
              ["The board expects progress within six months, so a persuasive argument must include both organisational importance and practical delivery.", iss("Four candidates compete for one delivery team and a six-month board review.", "A genuine prioritisation dilemma")],
 
              ["Guest arrival attracts attention because it shapes the customer's immediate impression of the hotel.", null],
 
              ["You remember our earlier story, where an exhausted guest encountered delays and conflicting information at reception.", dg("Candidate: guest arrival", D.flow(["Booking|confirmed", "Room|information", "!Guest|arrival", "+Check-in|completed"]), "Guest arrival connects booking information, room readiness, and the front-desk experience.")],
 
              ["The difficulty extends beyond reception because booking details, room availability, and billing information cross departmental boundaries.", null],
 
              ["Improving this journey could demonstrate how BPM addresses a problem that no single department can solve alone.", it(1, 4, "users", "Guest arrival", "A visible customer journey involving several departments and important information handoffs.")],
 
              ["But that same cross-functional scope could create disagreements about responsibility, authority, and the activities included.", null],
 
              ["The front-office director has volunteered to sponsor it, and the programme director recommends it, although that still needs a defensible comparison.", q("Does the visibility of guest arrival justify selecting it ahead of every competing process?")],
 
              ["The finance representative then presents corporate billing, where errors have already contributed to losing two corporate accounts.", null],
 
              ["This evidence gives the proposal strategic importance because the organisation has experienced damage to valuable customer relationships.", dg("Candidate: corporate billing", D.flow(["Corporate|agreement", "Service|records", "!Invoice|errors", "+Account|relationship"]), "Corporate billing problems have contributed to the loss of two corporate accounts.")],
 
              ["A successful improvement might protect future revenue and strengthen trust with organisations that purchase substantial hotel services.", null],
 
              ["However, one director openly opposes changing the billing process, so the project would begin without the leadership support it needs.", it(2, 4, "gauge", "Corporate billing", "Documented customer losses strengthen the value case, but delivery feasibility still requires investigation.")],
 
              ["Notice that financial harm makes this candidate important without automatically proving it should receive the only team.", null],
 
              ["The discussion becomes more complicated when another manager raises the digital guest record.", null],
 
              ["This process faces a January regulatory deadline, creating an obligation that cannot be evaluated like an optional improvement.", dg("Candidate: digital guest record", D.flow(["Guest|information", "Digital|record", "!January|deadline", "+Required|compliance"]), "The digital guest record faces a regulatory deadline but lacks a committed sponsor.")],
 
              ["The deadline creates urgency, yet the proposal currently lacks a sponsor who can support implementation decisions.", null],
 
              ["That combination should concern you because mandatory work needs accountable leadership even when the organisation has limited resources.", it(3, 4, "target", "Digital guest record", "A mandatory deadline creates urgency, while missing sponsorship creates implementation risk.")],
 
              ["The steering group must distinguish the obligation to meet a deadline from the choice of the initial BPM project.", null],
 
              ["A separate compliance response may be necessary even if another process becomes the programme's starting improvement.", st("Deferring a process from the BPM programme does not remove an organisation's mandatory obligations.")],
 
              ["The housekeeping manager then proposes room release, which affects a large volume of daily operational work.", null],
 
              ["Delays in releasing rooms can affect readiness, coordination, and the ability to serve arriving guests.", dg("Candidate: housekeeping room release", D.flow(["Room|vacated", "Cleaning|completed", "Room|checked", "+Room|released"]), "Housekeeping room release involves frequent operational activity within a comparatively narrow departmental scope.")],
 
              ["Property managers support attention to it, but sponsorship is neutral, even though working within one department makes it easier to organise.", null],
 
              ["Nevertheless, the steering group must ask whether that advantage outweighs the strategic and visible benefits of other candidates.", it(4, 4, "eye", "Housekeeping room release", "High operational volume and a narrower scope offer potential deliverability advantages.")],
 
              ["An easy project is not necessarily the strongest opening project if its benefits are less strategically significant.", null],
 
              ["You can now see why Qasr's decision cannot be made by counting complaints or choosing the largest process.", st("Each candidate combines a different pattern of value, feasibility, sponsorship, visibility, and urgency.")],
 
              ["Guest arrival offers visible cross-functional improvement, while corporate billing presents evidence of serious customer losses.", null],
 
              ["The digital guest record introduces a mandatory deadline, and housekeeping room release offers a potentially manageable operational scope.", q("Which candidate would you defend, and what evidence would you need before making that commitment?")],
 
              ["The steering group must now compare these alternatives without confusing a strong argument with a complete business case.", null]
 
            ]
          },
 
          {
            title: "Making a defensible first choice",
            sec: "O2c",
 
            lines: [
 
              ["We have reached the most demanding part of Qasr's discussion, because the steering group must turn competing arguments into a decision.", t("Making the starting decision", "A defensible recommendation explains the chosen process, its limitations, and the work being deferred.")],
 
              ["The programme director still favours guest arrival, but the finance representative believes corporate billing deserves priority.", null],
 
              ["Meanwhile, the digital guest record has a mandatory deadline, and housekeeping offers a more contained operational improvement.", iss("Every candidate has a legitimate argument, but Qasr cannot assign its only delivery team to all four.", "Selection requires trade-offs")],
 
              ["Rather than asking which manager speaks most convincingly, the group should apply its agreed selection criteria consistently.", null],
 
              ["Strategic value, deliverability, sponsor commitment, and visibility provide a shared basis for examining the alternatives.", dg("A common decision framework", D.flow(["Strategic|value", "Delivery|feasibility", "Sponsor|commitment", "+Visible|outcomes"]), "Each candidate should be examined against the same four criteria before a recommendation is approved.")],
 
              ["The directors can use qualitative judgements or an agreed scoring approach, provided they explain the evidence behind each assessment.", null],
 
              ["A numerical score should not create false certainty when important facts remain unknown or disputed.", st("A prioritisation score supports management judgement; it does not replace evidence, discussion, or accountability.")],
 
              ["Consider corporate billing, where losing two accounts provides strong evidence that the process matters strategically.", null],
 
              ["That evidence deserves serious attention, but it does not establish whether the initial team can deliver improvement quickly.", q("What additional evidence would you request before placing corporate billing ahead of guest arrival?")],
 
              ["The group would need to understand its boundaries, dependencies, leadership support, and likely improvement opportunities.", null],
 
              ["Without those details, selecting billing solely because of financial losses would leave important delivery risks unresolved.", iss("Documented losses establish urgency and value, but they do not prove that a project is ready to launch.", "Incomplete feasibility evidence")],
 
              ["Now consider housekeeping room release, which may offer a narrower and more manageable starting scope.", null],
 
              ["Its high transaction volume could make even modest operational improvements valuable across Qasr's properties.", cmp("left", "Manageable scope", "A contained process may be easier to investigate and improve.", "up")],
 
              ["However, the steering group must demonstrate that its expected benefits justify allocating the programme's only team.", null],
 
              ["Choosing the simplest process merely to guarantee an early success could weaken the programme's strategic credibility.", cmp("right", "Meaningful impact", "The starting project must also demonstrate benefits that matter to the organisation.", "up")],
 
              ["The digital guest record presents a different problem because the January deadline creates an obligation beyond ordinary prioritisation.", null],
 
              ["The organisation cannot treat mandatory compliance as optional simply because another BPM candidate receives a higher score.", st("Mandatory compliance work requires an accountable response, regardless of which BPM improvement project begins.")],
 
              ["The missing sponsor must therefore be addressed, even if Qasr establishes a separate compliance workstream.", null],
 
              ["This distinction prevents the steering group from confusing a programme selection decision with permission to ignore regulatory responsibilities.", iss("The digital guest record needs a credible compliance response and accountable leadership.", "Mandatory work remains")],
 
              ["Guest arrival remains a credible recommendation because its customer impact is visible and its problems cross departmental boundaries.", null],
 
              ["It also connects directly with Qasr's earlier strategy and process architecture work, making the improvement story understandable.", dg("Guest arrival as the proposed starting point", D.flow(["Booking|information", "Room|readiness", "!Guest|arrival", "+First night|billing"]), "The guest-arrival proposal offers a visible cross-functional journey whose boundaries and sponsorship must still be agreed.")],
 
              ["Nevertheless, the recommendation should remain conditional on confirming that the volunteered sponsor can make decisions across the agreed scope.", null],
 
              ["The steering group must also establish realistic measures and secure cooperation from the departments involved.", q("Would guest arrival still be your preferred choice if Reservations refused to support the proposed boundary?")],
 
              ["A defensible decision acknowledges that the strongest alternative may offer benefits the selected project cannot deliver.", null],
 
              ["The finance representative should therefore hear why corporate billing is being deferred and when it will be reconsidered.", st("A credible decision explains not only what begins, but also what is postponed and why.")],
 
              ["Housekeeping's operational concerns should remain visible, while the digital guest record receives attention appropriate to its deadline.", null],
 
              ["The decision record should identify assumptions, unresolved risks, responsible leaders, and the evidence needed to confirm readiness.", dg("A defensible decision record", D.flow(["Compare|candidates", "Explain|trade-offs", "Record|deferrals", "+Confirm|readiness"]), "The steering group must document its reasoning, deferred work, unresolved obligations, and conditions for launching the chosen project.")],
 
              ["That record allows Qasr to proceed without pretending the other problems have disappeared.", null],
 
              ["Our next lesson will examine how the selected process receives workable boundaries and the support needed for implementation.", q("Can you defend Qasr's starting recommendation while acknowledging the strongest argument against it?")],
 
              ["That is the real test of Launch Pad prioritisation: choosing responsibly when every available option involves a trade-off.", null]
 
            ]
          }
 
        ]
      },
      {
        id: "l3",
        title: "Defining the work and building the coalition",
 
        sections: [
 
          {
            title: "Drawing a boundary that solves the problem",
            sec: "O3a",
 
            lines: [
 
              ["Welcome back to Qasr, where the steering group has identified guest arrival as a promising starting point for its BPM programme.", t("Lesson 3 · Defining the work", "A useful process boundary must address the real problem without making the project unmanageable.")],
 
              ["The recommendation remains conditional, because choosing a process does not automatically establish what the improvement team should investigate.", null],
 
              ["The programme director now asks the managers to agree where the guest-arrival process begins and ends.", q("Where should Qasr draw the boundary around its guest-arrival improvement project?")],
 
              ["The front-desk manager suggests concentrating on reception, where arriving guests experience queues, delays, and frustrating corrections.", null],
 
              ["Her proposal sounds practical because reception employees encounter the problems directly and understand the daily pressures.", dg("A narrow departmental boundary", D.flow(["Guest|arrives", "*Reception|activities", "+Check-in|completed"]), "A reception-only boundary concentrates on visible front-desk activities but may exclude upstream causes.")],
 
              ["A narrow boundary could make the project easier to organise, measure, and complete within the available period.", null],
 
              ["However, the programme director remembers that some reception problems originate before the guest reaches the hotel.", iss("A reception-only project may improve visible activities without addressing errors created earlier in the journey.", "Upstream causes remain")],
 
              ["Imagine a guest arriving with a confirmed booking, only to discover that the hotel's system displays another rate.", null],
 
              ["The receptionist can apologise and correct the record, but that action does not explain why the information was wrong.", q("Would improving receptionist behaviour prevent a rate error created during the booking process?")],
 
              ["This example reveals the danger of defining a process entirely around the department where its symptoms appear.", null],
 
              ["A department may experience a problem even when the underlying cause belongs to another part of the organisation.", st("The location of a visible problem does not necessarily reveal where its underlying cause originates.")],
 
              ["Qasr therefore considers a wider boundary that follows the guest journey across the relevant departmental handoffs.", null],
 
              ["The proposed starting event becomes booking confirmation, when information needed for the eventual arrival should be available.", dg("Following the journey upstream", D.flow(["Booking|confirmed", "Rate|information", "Room|readiness", "Guest|arrival", "+Check-in|completed"]), "An end-to-end perspective includes upstream information that can affect the guest's arrival experience.")],
 
              ["The proposed ending event is completion of the initial billing handoff associated with the guest's first night.", null],
 
              ["That boundary captures important relationships between Reservations, revenue, front-desk operations, housekeeping, and Finance.", dg("The proposed project boundary", D.flow(["Booking|confirmed", "Details|shared", "Guest|arrives", "Room|allocated", "+First night|billed"], {
                bracket: [0, 4, "Proposed guest-arrival scope"]
              }), "The proposed scope extends from booking confirmation through the first night's billing.")],
 
              ["It also provides a clear destination for investigation without extending the project across the entire hotel stay.", null],
 
              ["Checkout, later guest services, and post-stay complaints would remain outside this particular improvement project.", st("An effective boundary includes necessary handoffs while explicitly excluding activities beyond the agreed improvement purpose.")],
 
              ["But the Reservations manager challenges the proposal because her department would become involved in another team's project.", null],
 
              ["She argues that booking confirmation belongs to Reservations and should not automatically fall under a guest-arrival initiative.", iss("Reservations challenges the proposed boundary because it extends beyond the front desk into booking activities.", "Departmental disagreement")],
 
              ["The programme director should not dismiss this objection, because it raises a legitimate question about responsibility and workload.", null],
 
              ["Instead, she can ask whether excluding booking information would prevent the team from addressing documented arrival problems.", q("Can Qasr solve rate discrepancies while excluding the activities that create or transfer booking information?")],
 
              ["This moves the discussion away from departmental territory and toward the evidence required to solve the problem.", null],
 
              ["The team can distinguish investigating an upstream handoff from redesigning every activity performed by Reservations.", st("Including an information handoff does not mean redesigning every activity within the department that supplies it.")],
 
              ["That distinction helps the steering group balance meaningful problem coverage with realistic limits on delivery.", null],
 
              ["A boundary that is too narrow risks treating symptoms, while an excessively broad boundary may overwhelm the team.", cmp("left", "Too narrow", "Important causes and handoffs may remain outside the project.", "down")],
 
              ["The stronger boundary includes the work necessary to understand the problem while protecting the project's available capacity.", cmp("right", "Meaningful and manageable", "The scope covers relevant causes without absorbing the entire guest journey.", "up")],
 
              ["Qasr must document its starting event, ending event, included handoffs, exclusions, and unresolved assumptions before proceeding.", null],
 
              ["The proposed boundary now gives the steering group something concrete to discuss, challenge, and eventually approve.", q("Would you defend this boundary against Reservations, and what evidence would strengthen your argument?")],
 
              ["Our next challenge is identifying the people whose commitment will determine whether this cross-functional project can succeed.", null]
 
            ]
          },
 
          {
            title: "The people who can make the project succeed",
            sec: "O3b",
 
            lines: [
 
              ["Qasr now has a proposed guest-arrival boundary, but the steering group recognises that a diagram cannot secure departmental cooperation.", t("Building the Launch Pad coalition", "Successful process improvement depends on the people who influence, perform, and experience the work.")],
 
              ["The project crosses several functions, and each manager sees its consequences from a different organisational position.", null],
 
              ["Reservations worries about additional work, while reception employees hope the project will remove recurring frustrations.", iss("The proposed improvement crosses departmental boundaries, creating different expectations and concerns among affected stakeholders.", "Stakeholder alignment")],
 
              ["The programme director needs to understand these positions before assuming that everyone will support the same changes.", null],
 
              ["This is why the Launch Pad includes stakeholder analysis rather than treating cooperation as an automatic consequence of approval.", q("Who can influence Qasr's improvement project, and who will experience the consequences of its decisions?")],
 
              ["A stakeholder is someone who can influence the project or whose interests may be affected by its outcomes.", null],
 
              ["Some stakeholders control important decisions, while others possess operational knowledge that the project cannot safely ignore.", st("Stakeholder analysis considers both influence over the project and interest in its consequences.")],
 
              ["Imagine the programme director placing Qasr's stakeholders on a simple map of influence and interest.", null],
 
              ["The map helps her choose suitable engagement approaches rather than communicating with everyone in exactly the same way.", dg("Stakeholder influence and interest", D.flow(["Stakeholder|identified", "Influence|assessed", "Interest|assessed", "+Engagement|planned"]), "Stakeholder analysis connects each person's influence and interest with an appropriate engagement approach.")],
 
              ["People with substantial influence and strong interest generally require close involvement in important project decisions.", null],
 
              ["At Qasr, the sponsor, the finance director, and the process owner belong here, sharing decisions about scope and benefits.", it(1, 4, "users", "Manage closely", "Engage influential and highly interested stakeholders directly in important decisions.")],
 
              ["Other influential stakeholders may have limited immediate interest, yet their authority could become essential when barriers arise.", null],
 
              ["Qasr's legal team sits here, so concise updates on relevant risks and decisions keep it satisfied without daily involvement.", it(2, 4, "target", "Keep satisfied", "Maintain the confidence of influential stakeholders whose direct interest is currently limited.")],
 
              ["Employees with strong interest but limited formal authority need information and meaningful opportunities to contribute.", null],
 
              ["Front-desk staff belong here, so the team consults them and asks them to test the current process and proposed changes.", it(3, 4, "eye", "Keep informed", "Provide interested stakeholders with information and opportunities to contribute practical knowledge.")],
 
              ["Stakeholders with limited influence and limited interest may require monitoring rather than intensive engagement.", null],
 
              ["An external auditor may sit here today, yet that position can change once the project reaches work the auditor reviews.", it(4, 4, "gauge", "Monitor", "Review stakeholder positions because influence and interest can change during the project.")],
 
              ["Notice that the map does not tell us whether a stakeholder is good, difficult, or personally supportive.", null],
 
              ["It provides a practical basis for deciding how the project should communicate and involve different people.", st("Stakeholder categories guide engagement; they should not become permanent labels or judgements about individuals.")],
 
              ["Qasr also needs to distinguish the executive sponsor from the person who owns ongoing process performance.", null],
 
              ["The sponsor provides authority, protects the project, and helps resolve obstacles that cross departmental boundaries.", dg("Project authority and process accountability", D.flow(["Executive|sponsor", "Project|support", "Process|owner", "+Ongoing|performance"]), "The sponsor enables project decisions, while the process owner remains accountable for continuing performance.")],
 
              ["The process owner remains accountable for the guest-arrival process after the temporary improvement team completes its work.", null],
 
              ["Without clear ownership, Qasr could implement changes without anyone accepting responsibility for sustaining their benefits.", iss("Project sponsorship cannot substitute for clear accountability over the process after implementation.", "Ownership risk")],
 
              ["The programme director must also involve employees who understand booking errors, room readiness, check-in exceptions, and billing handoffs.", null],
 
              ["These employees can explain what actually happens when formal procedures fail to match daily operational realities.", dg("Knowledge across the guest journey", D.lanes(["Reservations", "Revenue", "Front desk", "Housekeeping"], [
                [0, "Booking"],
                [1, "Rate"],
                [2, "Arrival"],
                [3, "Room"],
                [2, "Check-in"]
              ]), "Employees across the guest journey hold different pieces of the operational knowledge needed for improvement.")],
 
              ["A customer perspective also matters because internal efficiency gains should not create new frustrations for arriving guests.", null],
 
              ["Qasr's engagement plan should therefore connect decision authority, operational knowledge, and the experience of the customer.", st("A strong coalition combines leadership authority, process accountability, employee knowledge, and attention to customer outcomes.")],
 
              ["The stakeholder map gives the programme director a starting point, but relationships must be managed throughout the project.", null],
 
              ["Our next section examines what happens when those stakeholders disagree about the scope and responsibilities already proposed.", q("How should Qasr respond when an influential manager challenges a boundary that other stakeholders consider essential?")]
 
            ]
          },
 
          {
            title: "Turning disagreement into an agreed commitment",
            sec: "O3c",
 
            lines: [
 
              ["Let's return to Qasr's steering group, where the proposed guest-arrival project has exposed a disagreement between departmental managers.", t("From disagreement to commitment", "The Launch Pad must turn competing stakeholder positions into clear and workable project decisions.")],
 
              ["The programme director wants to investigate booking information, but Reservations questions why its activities belong inside the proposed scope.", null],
 
              ["The front-desk manager argues that reception cannot prevent errors when incorrect rates arrive from upstream systems.", iss("Reservations challenges the scope, while the front desk argues that upstream information causes visible arrival problems.", "Conflicting departmental positions")],
 
              ["Both managers have legitimate concerns, and neither concern disappears simply because the programme director prefers guest arrival.", null],
 
              ["This is an important moment because successful BPM requires cooperation across the boundaries that organisational charts create.", q("How can Qasr resolve this disagreement without allowing one department to dominate the decision?")],
 
              ["A weak response would be to instruct Reservations to cooperate without explaining why its involvement is necessary.", null],
 
              ["That approach might secure formal agreement while leaving resentment, limited participation, and unresolved operational problems.", cmp("left", "Authority without explanation", "A manager may comply formally while withholding meaningful commitment.", "down")],
 
              ["Another weak response would be removing Reservations from the project merely to avoid an uncomfortable discussion.", null],
 
              ["That concession could leave the team unable to investigate the booking information that contributes to arrival errors.", cmp("right", "Evidence-based agreement", "The scope should follow relevant causes and handoffs rather than departmental convenience.", "up")],
 
              ["The programme director can instead bring the discussion back to the guest experience and the evidence already available.", null],
 
              ["She asks where incorrect rates originate, how booking information reaches reception, and which handoffs require investigation.", dg("Tracing the disputed information", D.flow(["Booking|confirmed", "!Rate|information", "Front-desk|system", "+Guest|check-in"]), "The steering group can examine information handoffs to determine whether upstream activities belong within the proposed scope.")],
 
              ["This approach does not assume that Reservations caused every discrepancy or that reception employees are free from responsibility.", null],
 
              ["It establishes what the improvement team must investigate before proposing changes to anyone's work.", st("A defensible boundary follows evidence about the problem rather than assumptions about departmental responsibility.")],
 
              ["Reservations can accept keeping booking in scope as a joint owner, while still resisting a complete redesign of its department.", null],
 
              ["The steering group can therefore distinguish the activities included in the project from unrelated departmental responsibilities.", q("Can Qasr include booking information without expanding the project into every Reservations activity?")],
 
              ["The programme director also needs support from revenue, housekeeping, and Finance because their work influences the guest-arrival journey.", null],
 
              ["Revenue contributes rate information, while housekeeping provides room readiness information that affects the timing of check-in.", dg("Connected departmental contributions", D.lanes(["Reservations", "Revenue", "Housekeeping", "Front desk"], [
                [0, "Booking"],
                [1, "Rate"],
                [2, "Room"],
                [3, "Arrival"],
                [3, "Check-in"]
              ]), "The project depends on relevant information and operational contributions from several departments.")],
 
              ["Finance may need to participate where the agreed boundary includes the initial billing handoff.", null],
 
              ["Each function should understand why its involvement matters and what contribution the project actually requires.", st("Stakeholder commitment becomes stronger when responsibilities are specific, proportionate, and connected to the improvement purpose.")],
 
              ["The steering group must also establish who can approve changes when disagreements cannot be resolved operationally.", null],
 
              ["The executive sponsor should have sufficient authority to address cross-functional barriers and protect the agreed project direction.", dg("Resolving project disagreements", D.flow(["Operational|discussion", "Evidence|review", "Sponsor|decision", "+Recorded|commitment"]), "Unresolved cross-functional disagreements require an agreed escalation route and a documented decision.")],
 
              ["The process owner should understand how those decisions affect continuing accountability for guest-arrival performance.", null],
 
              ["Employees need opportunities to explain practical consequences before decisions become commitments that affect their daily work.", iss("Decisions made without operational input may appear acceptable to managers but prove difficult to implement.", "Implementation resistance")],
 
              ["Notice that constructive disagreement can improve the project when it exposes missing information or unrealistic assumptions.", null],
 
              ["The objective is not eliminating every objection, but ensuring that important objections receive fair consideration and a clear response.", st("A credible Launch Pad records significant objections, the reasoning behind decisions, and any unresolved risks.")],
 
              ["Qasr should document the agreed boundary, departmental contributions, decision rights, escalation arrangements, and responsibilities for outstanding actions.", null],
 
              ["The record should also explain which concerns remain open and how the project intends to investigate them.", dg("The agreed Launch Pad commitment", D.flow(["Agreed|scope", "Stakeholder|roles", "Decision|rights", "Open|risks", "+Documented|commitment"]), "A workable agreement identifies the scope, responsibilities, decision authority, and unresolved issues.")],
 
              ["That record allows the team to begin investigation without pretending that every manager originally supported the same proposal.", null],
 
              ["It also gives stakeholders a shared reference when later discussions threaten to expand or redirect the project.", q("Could you defend Qasr's agreed scope while explaining fairly why Reservations initially opposed it?")],
 
              ["In our final lesson, we will connect these commitments with performance measures and a complete Launch Pad decision.", null]
 
            ]
          }
 
        ]
      },
        {
          id: "l4",
          title: "Measuring success and defending the Launch Pad",
          sections: [
            {
              title: "Establishing the baseline before redesign",
              sec: "O3d",
              lines: [
                ["Welcome to our final Week Seven lesson, where Qasr must decide how it will recognise genuine improvement.", t("Lesson 4 · Measuring success", "A credible Launch Pad establishes how success will be measured before the process is redesigned.")],
                ["The steering group has examined guest arrival, considered its boundaries, and discussed the people needed to support the project.", null],
                ["But the finance director now raises a question that changes the conversation from intentions to evidence.", q("How will Qasr demonstrate that guest arrival has actually improved?")],
                ["The programme director suggests reducing the number of check-ins that require corrections to the guest's booked rate.", null],
                ["That sounds promising because rate discrepancies create frustration for guests and additional work for reception employees.", iss("Qasr wants fewer rate corrections, but the current frequency has not yet been established.", "A missing starting point")],
                ["Without knowing today's performance, the steering group cannot demonstrate whether a later result represents meaningful improvement.", null],
                ["This is why the Launch Pad requires a baseline, meaning a reliable measurement of performance before redesign begins.", st("A baseline records current performance so that later results can be compared with a credible starting point.")],
                ["Imagine the front-desk manager reporting that rate corrections happen frequently, based on what employees have told her.", null],
                ["Her observation identifies a possible problem, but it does not establish how frequently that problem actually occurs.", q("Would the word frequently provide enough evidence to judge whether the improvement project succeeds?")],
                ["Qasr needs a precise measure that employees can calculate consistently across the participating hotels.", null],
                ["One useful measure is the percentage of completed check-ins that required no correction to the confirmed booking rate.", dg("Defining the success measure", D.flow(["Completed|check-ins", "Check-ins|without correction", "+Percentage|calculated"]), "The measure compares check-ins completed without rate corrections with all completed check-ins in the same reporting period.")],
                ["The team must define what counts as a rate correction and which completed check-ins enter the calculation.", null],
                ["Otherwise, two hotels could report different results simply because their employees interpret the measure differently.", fm("Check-ins without rate correction (%)", "Check-ins without rate correction × 100", "All completed check-ins")],
                ["The programme director asks the team to examine reliable booking and check-in records before proposing any improvement target.", null],
                ["Those records should cover a defined period and enough relevant transactions to provide a meaningful starting picture.", it(1, 4, "gauge", "Define the measure", "Specify the calculation, reporting period, included transactions, and meaning of a rate correction.")],
                ["The team must also check whether the information is recorded consistently across Qasr's participating properties.", null],
                ["Missing records or inconsistent classifications could make a precise-looking percentage misleading.", iss("Inconsistent records can undermine comparisons between hotels or between reporting periods.", "Data reliability risk")],
                ["If reliable information is unavailable, Qasr should establish a collection method rather than inventing a convenient baseline.", null],
                ["The baseline remains unconfirmed until the team has gathered and checked the required evidence.", it(2, 4, "target", "Establish the baseline", "Use reliable current records and document their source, period, and limitations.")],
                ["Once that evidence exists, the steering group can agree a realistic improvement target with the responsible managers.", null],
                ["A target describes the performance Qasr intends to achieve, not a result the organisation has already demonstrated.", cmp("left", "Baseline", "The verified percentage achieved before redesign begins.", "down")],
                ["The target should reflect organisational ambitions, available resources, and what the investigation suggests may be achievable.", cmp("right", "Target", "The agreed future percentage that the improvement project aims to achieve.", "up")],
                ["Qasr must also identify who will produce the figures and how regularly the results will be reviewed.", null],
                ["The process owner remains accountable for performance, while a named reporting responsibility keeps the evidence available.", it(3, 4, "users", "Assign reporting responsibility", "Name who collects, checks, and reports the measure at an agreed frequency.")],
                ["The team should consider whether fewer rate corrections actually improve the guest experience rather than merely changing recording practices.", null],
                ["Related evidence about complaints or arrival delays can help reveal whether the customer receives the intended benefit.", it(4, 4, "eye", "Verify the benefit", "Check that better reported performance corresponds with meaningful improvements for guests.")],
                ["Remember that Qasr has not yet demonstrated any improvement simply by defining a measure and setting a target.", null],
                ["Those commitments prepare the organisation to evaluate results honestly when the improvement work has been completed.", st("Expected benefits are promises to investigate and deliver; demonstrated benefits require reliable evidence of actual change.")],
                ["When the programme reaches Realise Value, the agreed baseline will provide a reference for judging achieved results.", dg("From Launch Pad to Realise Value", D.route([2, 8]), "The Launch Pad establishes the measurement commitment, while Realise Value later checks whether the expected benefits were achieved.")],
                ["Qasr now has a measurement approach, but its steering group still needs to bring every commitment together.", null],
                ["Let's examine the concise decision record that will allow the next team to begin without guessing.", q("What must Qasr document so that its improvement commitment can be investigated and defended?")]
              ]
            },
            {
              title: "The one-page Launch Pad decision",
              sec: "O3e",
              lines: [
                ["Imagine Qasr's steering group meeting again, with the programme director preparing to close the Launch Pad discussion.", t("Qasr · The Launch Pad decision", "A one-page decision record connects the starting choice with its scope, people, measures, benefits, and risks.")],
                ["The directors have debated four processes, but Qasr still has only one delivery team and a six-month board review.", null],
                ["The programme director recommends guest arrival because guest complaints helped start the programme and cross four functions in fourteen properties.", iss("Qasr must select a meaningful project without ignoring other important obligations.", "The final management decision")],
                ["The front-office director has volunteered as sponsor, providing a stronger basis for leadership support than several alternatives.", null],
                ["Guest arrival therefore combines strategic relevance, visible customer problems, and a potentially manageable improvement opportunity.", dg("The recommended starting process", D.flow(["Booking|confirmed", "Rate and room|information", "Guest|arrival", "Check-in|completed", "+First night|billed"]), "Guest arrival offers a visible cross-functional improvement opportunity with a proposed boundary and a volunteered sponsor.")],
                ["However, recommending this process does not mean that every implementation risk has disappeared.", null],
                ["The finance director reminds everyone that corporate billing problems contributed to losing two corporate accounts.", q("What is the strongest argument against selecting guest arrival as Qasr's opening project?")],
                ["Those losses establish a serious strategic case for billing, although a director currently opposes change.", cmp("left", "Corporate billing", "Documented account losses establish value, but leadership opposition creates delivery risk.", "down")],
                ["Guest arrival has stronger sponsorship, although its cross-functional scope still requires cooperation from several departments.", cmp("right", "Guest arrival", "Visible customer problems and volunteered sponsorship support the recommendation.", "up")],
                ["The steering group should record this trade-off rather than dismissing the financial losses.", null],
                ["Housekeeping room release offers high operational volume and a narrower scope, but sponsorship remains neutral.", st("Deferring a candidate means explaining why another project should begin sooner, not declaring its problems unimportant.")],
                ["The digital guest record presents a different obligation because its January regulatory deadline cannot simply be postponed.", null],
                ["Qasr must establish accountable leadership and a credible compliance response, potentially through a separate mandatory workstream.", iss("The digital guest record faces a regulatory deadline but still lacks a committed sponsor.", "Mandatory action required")],
                ["The programme director can now distinguish the recommended BPM project from deferred improvements and mandatory compliance work.", dg("Recording the competing decisions", D.flow(["Guest arrival|BPM candidate", "Corporate billing|reconsider", "Room release|defer", "!Guest record|compliance"]), "The record distinguishes the initial BPM recommendation, deferred improvements, and mandatory compliance work.")],
                ["The decision record then defines the proposed guest-arrival boundary, beginning when a booking is confirmed.", null],
                ["It ends when the first night's billing is completed, including the relevant information and operational handoffs.", dg("The agreed project boundary", D.flow(["Booking|confirmed", "Details|shared", "Guest|arrives", "Room|allocated", "+First night|billed"], {
                  bracket: [0, 4, "Guest-arrival project"]
                }), "The scope includes booking information, room readiness, check-in, and the first billing handoff.")],
                ["Later guest services, checkout, and post-stay issues remain outside this project to protect its manageable scope.", null],
                ["Reservations participates in examining upstream booking information without committing to redesigning its entire department.", st("The scope includes relevant causes and handoffs while excluding unrelated departmental activities.")],
                ["The volunteered front-office director is the proposed executive sponsor, responsible for supporting decisions and removing barriers.", null],
                ["The steering group must formally confirm a process owner who remains accountable after the improvement project finishes.", dg("Leadership and accountability", D.flow(["Front-office|sponsor", "Project|decisions", "Process|owner", "+Continuing|performance"]), "The sponsor enables project decisions, while the process owner remains accountable for ongoing performance.")],
                ["Reservations, revenue, housekeeping, front-desk employees, Finance, and customer representatives require involvement appropriate to their responsibilities.", null],
                ["The engagement plan should identify contributions, decision rights, and arrangements for escalating unresolved disagreements.", st("Stakeholder commitment requires practical participation and decision rights, not merely a list of names.")],
                ["The record also proposes measuring the percentage of check-ins completed without corrections to confirmed booking rates.", null],
                ["Its baseline must come from verified records, while the target and reporting owner require explicit agreement.", dg("The measurement commitment", D.flow(["Define|measure", "Verify|baseline", "Agree|target", "+Assign|reporting"]), "The decision record identifies the measurement approach and commitments still requiring confirmation.")],
                ["Expected benefits include fewer corrections and smoother arrivals, while risks include departmental resistance and unreliable information.", null],
                ["The sponsor should assign responsibilities for unresolved risks rather than treating the document as automatic approval.", iss("Unconfirmed ownership, unreliable baseline evidence, or unresolved cooperation could prevent effective project delivery.", "Readiness conditions")],
                ["A responsible decision record distinguishes confirmed commitments from assumptions requiring further evidence.", null],
                ["The steering group can endorse guest arrival conditionally, subject to confirming those remaining readiness requirements.", st("A conditional recommendation is more credible than presenting unresolved assumptions as completed agreements.")],
                ["The one-page record gives the Understand team a starting process, investigation boundary, accountable people, and measurable objectives.", dg("The Launch Pad handover", D.flow(["Chosen|process", "Agreed|boundary", "People and|authority", "Measures|and risks", "+Understand|phase"]), "The record connects Qasr's recommendation with the commitments needed for the Understand phase.")],
                ["Its purpose is not to predict solutions, because the next phase must investigate how the process actually works.", null],
                ["Qasr can now explain its starting recommendation while identifying the evidence and commitments still needed.", q("Could another team act on this record without inventing missing responsibilities or performance figures?")],
                ["That is the standard your own Launch Pad recommendation should meet when you examine another organisation.", null]
              ]
            },
            {
              title: "From Qasr's decision to your forum",
              sec: "O3f",
              lines: [
                ["We have reached the end of Qasr's Launch Pad journey, but your own decision-making challenge is about to begin.", t("Week 7 · From Qasr to your forum", "Apply the Launch Pad method to another organisation and defend your reasoning against alternatives.")],
                ["Remember the steering group facing four serious problems, one delivery team, and a six-month board review.", null],
                ["Its challenge was choosing where to begin when every candidate offered a legitimate reason for attention.", iss("Competing priorities require managers to balance organisational value, delivery capacity, sponsorship, and obligations.", "The prioritisation challenge")],
                ["Guest arrival became the recommended starting point because it offered visible customer value and volunteered leadership support.", null],
                ["Nevertheless, that recommendation depended on securing cooperation, confirming ownership, and establishing reliable performance evidence.", st("A defensible recommendation explains its advantages, acknowledges limitations, and identifies the conditions for proceeding.")],
                ["Corporate billing remained important because its problems had contributed to losing two valuable corporate accounts.", null],
                ["Housekeeping room release offered a manageable possibility, while the digital guest record required a separate compliance response.", dg("The four competing commitments", D.flow(["Guest arrival|recommended", "Corporate billing|deferred", "Room release|deferred", "!Guest record|mandatory"]), "Qasr distinguishes its initial BPM project, deferred improvements, and mandatory compliance obligations.")],
                ["Managers who disagree should understand the evidence and trade-offs, even when their preferred project must wait.", q("Could you explain the strongest argument against your recommendation before defending your own choice?")],
                ["A convincing recommendation connects strategic importance with deliverability, sponsorship, and results that stakeholders can verify.", st("The strongest Launch Pad argument is evidence-based, balanced, and realistic about organisational capacity.")],
                ["You will now apply this reasoning to a different organisation in your Week Seven discussion forum.", null],
                ["The case is called Where to Start When Everything Is Broken, and it presents a new prioritisation challenge.", t("Your Week 7 forum", "Where to Start When Everything Is Broken")],
                ["Read the complete case and accompanying exhibit carefully before deciding which process deserves initial attention.", null],
                ["Do not assume Qasr's recommendation transfers automatically, because another organisation may face different constraints and evidence.", q("Which starting process would you defend when the organisational circumstances are different?")],
                ["Consider what the organisation needs to achieve and how each candidate contributes to those objectives.", null],
                ["Compare strategic value, realistic delivery, sponsorship, and the visibility of possible improvements using the available evidence.", dg("Applying the selection method", D.flow(["Case|evidence", "Strategic|value", "Delivery and|sponsorship", "+Defensible|choice"]), "The forum recommendation connects case evidence with a reasoned assessment of the starting options.")],
                ["A potentially valuable project may still be difficult to deliver with the resources and authority available.", null],
                ["Conversely, an easy project may contribute too little to the organisation's most important priorities.", st("Explain why your selected process should begin now, not merely why improving it would be useful.")],
                ["Once you have a preferred process, explain the boundary you recommend and the problem it addresses.", null],
                ["Identify the starting event, final result, important handoffs, and activities that should remain outside scope.", dg("Defending the proposed boundary", D.flow(["Starting|event", "Relevant|handoffs", "Customer|outcome", "+Explicit|exclusions"]), "A defensible boundary includes the work needed to investigate the problem without unnecessarily expanding the project.")],
                ["Consider which stakeholders might challenge your recommendation and why their objections deserve thoughtful consideration.", null],
                ["An objection may reveal a missing dependency, unrealistic workload, or overlooked organisational priority.", q("How would you respond if a classmate defended another process using evidence you had overlooked?")],
                ["Constructive discussion means examining competing evidence rather than simply repeating your original recommendation more forcefully.", st("Constructive disagreement tests recommendations by examining evidence, assumptions, and consequences.")],
                ["Post your own substantive recommendation before reading your classmates' contributions, keeping your initial reasoning independent.", null],
                ["Then respond meaningfully to at least two classmates, including a constructive challenge to an alternative argument.", it(1, 3, "target", "Make your recommendation", "Use the case evidence to justify a realistic starting process.")],
                ["Support your arguments with relevant ideas from Jeston's Chapter Fifteen rather than relying on personal preference.", it(2, 3, "users", "Engage with classmates", "Respond substantively to at least two peers and constructively challenge an alternative.")],
                ["Remember to read the facilitator's end-of-week summary after the discussion has developed.", null],
                ["The forum is formative, while participation across the term contributes to the course's participation assessment.", it(3, 3, "eye", "Reflect on the discussion", "Use alternative arguments and the facilitator summary to reconsider your reasoning.")],
                ["Now look toward Week Eight, when the BPM framework moves from Launch Pad into Understand.", dg("The next phase", D.route([2, 3]), "Week 7 establishes the improvement commitment, while Week 8 investigates the selected process and its problems.")],
                ["The Understand team will examine actual activities, investigate delays, and identify why the selected process performs poorly.", null],
                ["New evidence may challenge assumptions behind the original Launch Pad recommendation or its proposed boundary.", st("The framework is a route, not a ratchet, so new evidence can justify revisiting earlier decisions.")],
                ["For Qasr, this means investigating guest arrival rather than assuming the steering group's explanations are correct.", null],
                ["The agreed boundary and reliable baseline will help distinguish observed performance from managerial expectations.", q("What would you investigate if Qasr's rate corrections originated somewhere unexpected?")],
                ["That question captures our transition from choosing where to begin toward understanding why the process needs improvement.", null],
                ["As you finish Week Seven, remember that responsible BPM begins with a decision people can explain and support.", st("A successful Launch Pad selects meaningful work, defines boundaries, secures accountability, and establishes credible measures.")],
                ["Carry that discipline into your forum discussion, and bring your questions about current performance into Week Eight.", null]
              ]
            }
          ]
        }
      ]
    };
    // Plain-text scripts for tools that expect continuous narration.
    // Preserve the Week 1 sentence-to-moment structure.
    COURSE.lessons.forEach((l) =>
      l.sections.forEach((s) =>
        (s.script = s.lines.map((x) => x[0]).join(" "))
      )
    );
  })();
