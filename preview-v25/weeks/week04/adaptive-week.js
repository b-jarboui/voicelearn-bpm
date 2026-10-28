// OPER621 · Week 4 · Adaptive Learning Layer
// BPM and Organisational Change
//
// Structure follows Week 1 adaptive.js.
// Mastery rules, object keys, section mappings, and review schema
// are preserved.
//
// COURSE LEARNING OUTCOMES
// K3: Assess the importance of change management in relation to BPM
//     and devise solutions to minimize employees' resistance.
// S3: Coordinate people and the change process in organizations
//     to achieve BPM objectives.
//
// WEEK 4 LEARNING OUTCOMES
// O1: Assess the importance of change management to the success of BPM.
// O2: Analyse the sources of employee resistance to process change.
// O3: Devise solutions that reduce resistance and secure adoption.
//
// REMEDIAL DESIGN
// Each section has two remedial variants.
// Each variant introduces a different explanatory angle.
// Each variant uses a fresh, relatable example.
// Remedial narration is separate from the main lessons.
// The original mastery threshold and evidence rules remain unchanged.

(() => {

  const D = window.DIAG,
    { t, it, q, st, iss, cmp, dg } = window.MOMENT_KIT;

  window.ADAPTIVE = {

    target: 0.8,

    window: 5,

    minEvidence: 3,

    firstCheck: 4,

    firstCheckPerSection: 3,

    perWeak: 3,

    clos: {

      K3: {
        name: "K3",
        full: "Assess the importance of change management in relation to BPM and devise solutions to minimize employees' resistance"
      },

      S3: {
        name: "S3",
        full: "Coordinate people and the change process in organizations to achieve BPM objectives"
      }

    },

    outcomes: {

      O1: {
        clo: "K3",
        name: "Importance of change management",
        full: "Assess the importance of change management to the success of BPM"
      },

      O2: {
        clo: "K3",
        name: "Sources of resistance",
        full: "Analyse the sources of employee resistance to process change"
      },

      O3: {
        clo: "S3",
        name: "Reducing resistance and securing adoption",
        full: "Devise solutions that reduce resistance and secure adoption"
      }

    },

    sections: {

      O1a: {
        lo: "O1",
        lesson: "l1",
        name: "Why good process designs fail on adoption"
      },

      O1b: {
        lo: "O1",
        lesson: "l1",
        name: "The performance dip: a cost to plan for"
      },

      O2a: {
        lo: "O2",
        lesson: "l2",
        name: "What employees stand to lose"
      },

      O2b: {
        lo: "O2",
        lesson: "l2",
        name: "Resistance or a genuine design defect?"
      },

      O2c: {
        lo: "O2",
        lesson: "l2",
        name: "Match the response to the cause"
      },

      O3a: {
        lo: "O3",
        lesson: "l3",
        name: "The stakeholder power–interest grid"
      },

      O3b: {
        lo: "O3",
        lesson: "l3",
        name: "Four engagement strategies"
      },

      O3c: {
        lo: "O3",
        lesson: "l3",
        name: "Stakeholders move: revisit the grid"
      },

      O3d: {
        lo: "O3",
        lesson: "l4",
        name: "Adoption, workarounds and parallel processes"
      },

      O3e: {
        lo: "O3",
        lesson: "l4",
        name: "Design an intervention with explicit costs"
      },

      O3f: {
        lo: "O3",
        lesson: "l5",
        name: "Diagnose, prioritise and defend the response"
      },

      O3g: {
        lo: "O3",
        lesson: "l5",
        name: "Week 4 synthesis and forum handover"
      }

    },

    // Remedial micro-lessons: two variants per section.
    // Variant 0 and variant 1 provide different explanatory angles.
    // Both variants use new examples rather than repeating Qasr Marina.
    // Round 1 plays variant 0; round 2 plays variant 1.
    // Subsequent remediation rounds alternate between the variants.

    review: {
O1a: [

        {
          title: "The new library system nobody uses",

          lines: [

            [
              "Let's approach organisational change through a university library that has invested in a modern borrowing system.",
              t(
                "Another way to understand adoption",
                "A university library introduces a better system, but employees continue using familiar procedures."
              )
            ],

            [
              "The old arrangement requires librarians to enter borrowing information manually and prepare several paper records.",
              null
            ],

            [
              "Management introduces a digital system that records loans automatically and allows students to complete transactions more quickly.",
              dg(
                "The redesigned borrowing process",
                D.flow([
                  "Student|arrives",
                  "Scan|library card",
                  "Scan|book",
                  "Loan|recorded",
                  "+Book|borrowed"
                ]),
                "The digital borrowing process reduces manual recording and simplifies the student's transaction."
              )
            ],

            [
              "The software passes every technical test, and the project team celebrates a successful implementation.",
              null
            ],

            [
              "But imagine visiting the library several weeks later and noticing something unexpected behind the counter.",
              q(
                "What if the technology works perfectly, but librarians continue using the old procedures?"
              )
            ],

            [
              "Several librarians still write borrowing details on paper because they trust the familiar method more.",
              iss(
                "The digital system is operational, but employees continue recording transactions manually.",
                "Implementation without adoption"
              )
            ],

            [
              "Others avoid the new system because they feel uncertain about correcting mistakes or handling unusual requests.",
              null
            ],

            [
              "The technology has changed, but everyday behaviour has not changed sufficiently to deliver the intended benefits.",
              st(
                "Technical implementation does not guarantee that employees will adopt a redesigned process."
              )
            ],

            [
              "This distinction explains why process redesign and people change management must work together throughout implementation.",
              null
            ],

            [
              "Process redesign determines how work should happen, while change management helps people adopt that new approach.",
              [
                cmp(
                  "a",
                  "Process redesign",
                  "The library creates a faster digital borrowing procedure."
                ),
                cmp(
                  "b",
                  "People change management",
                  "Librarians receive the preparation and support needed to use the new procedure."
                )
              ]
            ],

            [
              "The library manager therefore needs to understand why employees remain attached to their familiar recording methods.",
              null
            ],

            [
              "Some may need practical training, while others may have identified problems that the technical team overlooked.",
              it(
                1,
                3,
                "book",
                "Build confidence",
                "Provide practical training that includes unfamiliar and exceptional borrowing situations."
              )
            ],

            [
              "Experienced librarians could help test difficult transactions and suggest improvements to the digital procedure.",
              null
            ],

            [
              "Their participation matters because employees are more likely to trust arrangements that address their operational concerns.",
              it(
                2,
                3,
                "users",
                "Involve employees",
                "Use frontline experience to identify difficulties and improve the proposed procedures."
              )
            ],

            [
              "Management should also observe actual borrowing transactions rather than relying entirely on installation reports.",
              null
            ],

            [
              "That evidence reveals whether employees are genuinely using the redesigned process during normal working conditions.",
              it(
                3,
                3,
                "gauge",
                "Observe adoption",
                "Measure actual use of the digital procedure rather than assuming installation means success."
              )
            ],

            [
              "The library receives its expected benefits only when the new process becomes the normal way of working.",
              null
            ],

            [
              "So remember that successful BPM requires more than a technically sound design and functioning technology.",
              st(
                "Successful BPM requires a workable process and people who genuinely adopt it."
              )
            ],

            [
              "The essential question is whether the organisation has changed how work happens, not merely what technology exists.",
              q(
                "Would you call the library's redesign successful before employees genuinely adopt the new procedure?"
              )
            ]

          ]
        },

        {
          title: "The football club with a perfect training plan",

          lines: [

            [
              "Imagine a football club hiring a new coach who develops an impressive strategy for improving team performance.",
              t(
                "Another way to understand change",
                "A football club shows why a technically strong plan can fail without behavioural adoption."
              )
            ],

            [
              "The coach studies previous matches and identifies weaknesses in how players move and support one another.",
              null
            ],

            [
              "He develops a new playing system designed to create space, reduce mistakes, and improve attacking opportunities.",
              dg(
                "The intended playing system",
                D.flow([
                  "Win|possession",
                  "Create|space",
                  "Move|together",
                  "Support|attack",
                  "+Create|chances"
                ]),
                "The proposed playing system depends on coordinated behaviour rather than isolated individual actions."
              )
            ],

            [
              "The strategy looks excellent during presentations, and the club's directors approve its introduction enthusiastically.",
              null
            ],

            [
              "But during matches, players repeatedly return to the familiar movements they have practised for years.",
              iss(
                "Players understand the new strategy but continue using their previous habits during matches.",
                "The adoption gap"
              )
            ],

            [
              "Some players lack confidence, while others believe their previous approach gives them greater personal control.",
              null
            ],

            [
              "The coach becomes frustrated because the team is not performing according to his carefully prepared design.",
              q(
                "Is the problem necessarily the strategy, or could it involve how players are adapting?"
              )
            ],

            [
              "This situation illustrates the difference between designing a better approach and achieving genuine organisational change.",
              null
            ],

            [
              "A strategy describes intended behaviour, but its benefits depend on people consistently performing that behaviour.",
              st(
                "A technically strong design creates value only when people change how they actually work."
              )
            ],

            [
              "The coach cannot solve every difficulty by repeating that the new strategy is superior.",
              null
            ],

            [
              "He needs to understand what prevents players from using it confidently during real matches.",
              [
                cmp(
                  "a",
                  "Explaining the strategy",
                  "Players understand what the coach wants them to do."
                ),
                cmp(
                  "b",
                  "Supporting adoption",
                  "Players develop the confidence and coordination needed to perform differently."
                )
              ]
            ],

            [
              "Training sessions could allow players to practise unfamiliar movements without the pressure of immediate competitive results.",
              null
            ],

            [
              "The coach could also invite experienced players to identify situations where the new approach creates difficulties.",
              it(
                1,
                3,
                "users",
                "Understand concerns",
                "Listen to players who must perform the new strategy during real matches."
              )
            ],

            [
              "Those conversations matter because practical experience can reveal weaknesses that theoretical planning does not anticipate.",
              null
            ],

            [
              "Repeated practice then helps players replace familiar habits with coordinated movements suited to the new system.",
              it(
                2,
                3,
                "book",
                "Practise the change",
                "Give players opportunities to develop confidence before expecting consistent performance."
              )
            ],

            [
              "The coach must also examine match behaviour to determine whether the intended changes are actually occurring.",
              null
            ],

            [
              "A completed training session proves participation, but it does not demonstrate sustained adoption during competition.",
              it(
                3,
                3,
                "gauge",
                "Observe behaviour",
                "Evaluate whether players consistently use the intended approach during matches."
              )
            ],

            [
              "The same principle applies whenever an organisation introduces a redesigned business process.",
              null
            ],

            [
              "The design provides direction, while change management prepares and supports people who must work differently.",
              st(
                "Change management connects the intended process design with the behaviour required to deliver its benefits."
              )
            ],

            [
              "So when a promising redesign fails, examine adoption before assuming that the technical solution was necessarily wrong.",
              q(
                "What would convince you that the football team has genuinely adopted its new playing system?"
              )
            ]

          ]
        }

      ],

      O1b: [

        {
          title: "Learning a new supermarket checkout",

          lines: [

            [
              "Let's explore the performance dip through a supermarket that replaces familiar checkout equipment with a redesigned payment system.",
              t(
                "Another way to understand the performance dip",
                "A supermarket introduces faster technology, but employees initially need time to adapt."
              )
            ],

            [
              "The new equipment promises quicker payments, fewer scanning errors, and shorter queues during busy shopping periods.",
              null
            ],

            [
              "Management expects immediate improvement because the technology processes transactions faster during controlled demonstrations.",
              dg(
                "The intended checkout process",
                D.flow([
                  "Customer|arrives",
                  "Items|scanned",
                  "Payment|processed",
                  "Receipt|issued",
                  "+Customer|leaves"
                ]),
                "The redesigned checkout process is intended to reduce transaction time and improve customer flow."
              )
            ],

            [
              "But imagine arriving during the opening morning and discovering that several checkout queues are moving unusually slowly.",
              null
            ],

            [
              "Cashiers hesitate when unfamiliar messages appear, and supervisors repeatedly leave their stations to provide assistance.",
              iss(
                "Employees are learning the new checkout system while continuing to serve waiting customers.",
                "Temporary performance decline"
              )
            ],

            [
              "Some customers become frustrated because the supposedly faster system appears slower than the equipment it replaced.",
              null
            ],

            [
              "This temporary decline is the performance dip, which occurs while people adapt to unfamiliar ways of working.",
              st(
                "The performance dip is a temporary decline while employees learn and adapt to organisational change."
              )
            ],

            [
              "The new equipment may be technically superior, but employees have not yet developed the confidence needed.",
              null
            ],

            [
              "Their attention is divided between serving customers and remembering procedures that were previously automatic.",
              q(
                "Why can a better system initially produce slower service?"
              )
            ],

            [
              "As employees practise, unfamiliar steps gradually become routine, reducing hesitation and the need for assistance.",
              null
            ],

            [
              "Performance can then recover and eventually exceed the level achieved with the previous equipment.",
              dg(
                "The transition journey",
                D.flow([
                  "Change|introduced",
                  "Learning|begins",
                  "!Performance|dip",
                  "Confidence|grows",
                  "+Performance|recovers"
                ]),
                "Performance may decline during learning before recovering as employees become confident with the new system."
              )
            ],

            [
              "However, management should not assume that recovery will happen automatically without sufficient preparation and support.",
              null
            ],

            [
              "Additional supervisors could assist during busy periods, while realistic practice could prepare cashiers for unusual transactions.",
              it(
                1,
                3,
                "users",
                "Provide temporary support",
                "Protect customer service while employees develop confidence with the new equipment."
              )
            ],

            [
              "Managers should also explain the expected disruption before implementation rather than promise immediate improvements.",
              null
            ],

            [
              "Realistic expectations prevent temporary difficulties from being mistaken for proof that the entire redesign has failed.",
              it(
                2,
                3,
                "chart",
                "Prepare expectations",
                "Explain that performance may temporarily decline before the intended improvement becomes visible."
              )
            ],

            [
              "The supermarket should monitor checkout times and recurring difficulties to determine whether employees are recovering.",
              it(
                3,
                3,
                "gauge",
                "Monitor recovery",
                "Track service performance and investigate difficulties that persist beyond the expected learning period."
              )
            ],

            [
              "If performance remains poor, managers must investigate whether the problem involves training or a genuine design weakness.",
              null
            ],

            [
              "The important lesson is that temporary disruption requires active management rather than automatic rejection of change.",
              st(
                "Change management can reduce the depth and duration of the performance dip through preparation and support."
              )
            ],

            [
              "So remember that successful implementation involves helping people through the difficult transition toward improved performance.",
              q(
                "What could supermarket management do to make the performance dip shorter and less damaging?"
              )
            ]

          ]
        },

        {
          title: "The orchestra learning a new piece",

          lines: [

            [
              "Imagine a professional orchestra preparing to perform a demanding musical composition that none of its members has played before.",
              t(
                "Another way to understand transition costs",
                "An orchestra shows why learning can temporarily reduce performance before producing a better result."
              )
            ],

            [
              "The conductor believes the composition will create a remarkable experience for audiences once the musicians master it.",
              null
            ],

            [
              "Every musician is highly skilled, and the orchestra has performed familiar compositions successfully for many years.",
              null
            ],

            [
              "Yet the opening rehearsal sounds surprisingly uneven because musicians are still learning unfamiliar rhythms and transitions.",
              iss(
                "Highly skilled musicians struggle temporarily while learning a demanding new composition.",
                "The performance dip"
              )
            ],

            [
              "The violinists concentrate on difficult passages, while other musicians struggle to coordinate their timing.",
              null
            ],

            [
              "Nobody has suddenly become less talented, but the new requirements demand attention that familiar music rarely needs.",
              st(
                "Temporary performance loss can reflect unfamiliar work rather than a decline in employees' underlying abilities."
              )
            ],

            [
              "This is similar to organisational change, where experienced employees must develop new routines and coordination patterns.",
              null
            ],

            [
              "The orchestra's conductor understands that demanding immediate perfection would create pressure without improving the musicians' readiness.",
              q(
                "Would cancelling the composition after one difficult rehearsal be a sensible decision?"
              )
            ],

            [
              "Instead, the conductor plans additional rehearsals and allows musicians to concentrate on difficult passages.",
              null
            ],

            [
              "Those rehearsals require paid time, suitable facilities, and attention that cannot be devoted to other performances.",
              it(
                1,
                3,
                "clock",
                "Recognise transition costs",
                "Learning requires time and resources before the intended performance benefits become available."
              )
            ],

            [
              "These are genuine transition costs, even though they do not mean the new composition is a mistake.",
              null
            ],

            [
              "The conductor also adjusts expectations because improvement depends on practice rather than immediate familiarity.",
              [
                cmp(
                  "a",
                  "Unrealistic expectation",
                  "Musicians should perform the unfamiliar composition perfectly during their opening rehearsal."
                ),
                cmp(
                  "b",
                  "Realistic expectation",
                  "Performance improves through rehearsal, feedback, coordination, and growing confidence."
                )
              ]
            ],

            [
              "As rehearsals continue, musicians become more confident and begin coordinating their contributions more effectively.",
              null
            ],

            [
              "The orchestra gradually moves beyond the difficult learning period toward the performance the conductor originally envisioned.",
              dg(
                "Learning and recovery",
                D.flow([
                  "New|composition",
                  "Unfamiliar|passages",
                  "!Uneven|rehearsal",
                  "Practice|and feedback",
                  "+Confident|performance"
                ]),
                "Repeated practice and feedback help the orchestra recover from its temporary performance decline."
              )
            ],

            [
              "But suppose one passage remains consistently unsuccessful despite repeated rehearsal and careful attention.",
              null
            ],

            [
              "The conductor should investigate that difficulty rather than assume every problem will disappear through additional practice.",
              it(
                2,
                3,
                "eye",
                "Investigate persistent problems",
                "Distinguish normal learning difficulties from problems that require a different response."
              )
            ],

            [
              "This distinction matters because organisational change can expose genuine weaknesses alongside ordinary learning difficulties.",
              null
            ],

            [
              "The conductor also needs to protect the orchestra's confidence while maintaining clear expectations for improvement.",
              it(
                3,
                3,
                "users",
                "Support confidence",
                "Provide constructive feedback and realistic expectations throughout the learning period."
              )
            ],

            [
              "The orchestra's experience reminds us that temporary difficulty can be part of achieving a better future performance.",
              st(
                "A performance dip should be anticipated, resourced, monitored, and managed rather than automatically treated as failure."
              )
            ],

            [
              "The important question is whether management provides enough support for people to move beyond that difficult period.",
              q(
                "How would you distinguish a normal learning dip from a persistent problem requiring intervention?"
              )
            ]

          ]
        }

      ],
// CHUNK: R-O2
  O2a: [
    {
      title: "The pharmacy cabinet that took away a skill",
      lines: [
        [
          "Let's look at resistance again, this time in a hospital pharmacy that is installing automated dispensing cabinets.",
          t(
            "Another way to see what people lose",
            "A hospital pharmacy introduces cabinets that dispense medicines automatically."
          )
        ],
        [
          "The cabinets promise fewer dispensing errors, and almost every pharmacist agrees that they will be safer.",
          null
        ],
        [
          "Yet Huda, a senior pharmacist with fifteen years on the night shift, opposes the plan in every meeting.",
          iss(
            "A senior pharmacist agrees the cabinets are safer, and still opposes them.",
            "Agreement with the benefit, opposition to the change"
          )
        ],
        [
          "Her manager calls it stubbornness, but I want you to ask what Huda actually stands to lose.",
          q(
            "What might an expert lose when a machine takes over the visible part of her work?"
          )
        ],
        [
          "For years, doctors have phoned Huda at three in the morning to solve unusual dosing problems.",
          null
        ],
        [
          "That expertise gives her status, meaning the respect and standing her colleagues grant her because she knows things.",
          st(
            "Loss of status or expertise is a real loss, even when the new process is better."
          )
        ],
        [
          "When a cabinet dispenses everything, nobody can see that her judgement still matters.",
          null
        ],
        [
          "She also notices that the cabinet cannot split tablets for children's doses, which happens several times a night.",
          iss(
            "The cabinet has no way to handle split-tablet doses for children.",
            "Knowledge that the design fails a real case"
          )
        ],
        [
          "That is a second cause, because her opposition carries knowledge the designers never had.",
          null
        ],
        [
          "There is a third cause, because the last pharmacy system was sold as time-saving and was followed by shift cuts.",
          dg(
            "Why Huda resists",
            D.flow([
              "Lost|expertise",
              "Design fails|a real case",
              "Memory of|last system",
              "Not|consulted",
              "!Resistance"
            ]),
            "Huda's opposition has several causes at once, and none of them is a misunderstanding of the benefit."
          )
        ],
        [
          "People remember how the last promise ended, so the new promise is heard through that memory.",
          null
        ],
        [
          "Finally, nobody on the night shift was asked to help design the cabinet workflow.",
          st(
            "People with no part in shaping a process feel no ownership of the result."
          )
        ],
        [
          "Notice that explaining the safety benefit again would change none of these four causes.",
          null
        ],
        [
          "Huda's resistance is rational, and part of it is telling the hospital that its design is incomplete.",
          st(
            "Resistance is usually rational and frequently informative about the design."
          )
        ],
        [
          "So when you meet resistance, start by asking what people stand to lose, not how to persuade them.",
          q(
            "Which of Huda's losses could the hospital address before the cabinets go live?"
          )
        ]
      ]
    },
    {
      title: "The warehouse foreman who had heard it before",
      lines: [
        [
          "Now imagine a large distribution warehouse replacing paper pick lists with handheld scanners.",
          t(
            "A second look at the sources of resistance",
            "A warehouse introduces scanners, and its longest-serving foreman says no."
          )
        ],
        [
          "The scanners should cut picking errors, and a staff survey shows most workers agree they will be faster.",
          null
        ],
        [
          "So why does Tariq, the foreman with twenty years in the building, still argue against them?",
          q(
            "If staff already believe the benefit, what else could explain their opposition?"
          )
        ],
        [
          "Start with organisational memory, which is what people learned from earlier programmes about how promises turn out.",
          null
        ],
        [
          "Six years ago a new stock system was launched as making jobs easier, and twelve pickers were let go.",
          iss(
            "The last programme promised easier jobs and delivered redundancies.",
            "Organisational memory"
          )
        ],
        [
          "Tariq is not ignoring today's facts, because he is reading them through what happened last time.",
          null
        ],
        [
          "His colleagues remember it too, which is why his doubts spread so quickly across the shifts.",
          null
        ],
        [
          "The business case also assumes fewer pickers per shift, so his fear of job loss has a real basis.",
          st(
            "Fear of job loss is rational when the business case depends on fewer people."
          )
        ],
        [
          "His team also knows which aisles lose signal, so the scanners will freeze exactly where the heaviest stock sits.",
          [
            cmp(
              "a",
              "What managers see",
              "A faster, more accurate way to pick orders."
            ),
            cmp(
              "b",
              "What the foreman sees",
              "Dead zones, fewer jobs, and a promise heard before."
            )
          ]
        ],
        [
          "That is genuine knowledge that the design fails a real case, and it deserves to be checked.",
          null
        ],
        [
          "His expertise matters too, because pickers come to him when orders go wrong, and scanners make that role less visible.",
          dg(
            "What the foreman stands to lose",
            D.flow([
              "Status as|the expert",
              "Secure|job",
              "Trust from|last time",
              "Voice in|the design",
              "!Opposition"
            ]),
            "The foreman's opposition is built from several separate losses, each with its own cause."
          )
        ],
        [
          "And like most of the floor, he was told about the scanners rather than asked about them.",
          null
        ],
        [
          "If the manager answers with a brighter presentation, every one of these causes will still be standing.",
          iss(
            "A better presentation leaves every cause of resistance untouched.",
            "The wrong response"
          )
        ],
        [
          "Begin by treating Tariq's resistance as data, because some of it is telling the warehouse its design is wrong.",
          st(
            "Treat resistance as data first, because some of it is telling you the design is wrong."
          )
        ],
        [
          "So the useful question is never how to overcome him, but what he knows and what he fears losing.",
          q(
            "Which part of Tariq's objection could be checked against data this week?"
          )
        ]
      ]
    }
  ],
  O2b: [
    {
      title: "The loan system and the self-employed applicant",
      lines: [
        [
          "Let's practise telling resistance from a design defect, using a bank that is automating its loan approvals.",
          t(
            "Resistance or a design defect?",
            "A bank automates loan approval, and two branch officers object."
          )
        ],
        [
          "The new system scores applications in minutes, and head office expects branch officers to welcome it.",
          null
        ],
        [
          "Reem, an experienced officer, says about one applicant in five is self-employed and has no payslips to upload.",
          iss(
            "About one applicant in five has no payslips for the system to read.",
            "Objection one"
          )
        ],
        [
          "Another officer says simply that customers prefer talking to a person and will hate the change.",
          iss(
            "Customers prefer a person and will hate the system.",
            "Objection two"
          )
        ],
        [
          "Both objections sound like resistance in a meeting, so we need a test rather than a hunch.",
          q(
            "How would you decide which objection is a design defect?"
          )
        ],
        [
          "The test begins by asking whether the objection names a specific case that real data can check.",
          it(
            1,
            2,
            "search",
            "Can it be checked?",
            "Does the objection name a specific case that operating data can confirm or reject?"
          )
        ],
        [
          "It then asks whether the claim would still be true if the person raising it had nothing to lose.",
          it(
            2,
            2,
            "scale",
            "Would it survive without a stake?",
            "Would the claim hold even if the person raising it had nothing personal to lose?"
          )
        ],
        [
          "Reem's claim is specific, because the bank can count last year's self-employed applicants this afternoon.",
          dg(
            "Testing Reem's objection",
            D.flow([
              "Specific|claim",
              "Pull|applications",
              "Count|self-employed",
              "Compare with|one in five",
              "+Verdict"
            ]),
            "The claim can be checked against real application records before anyone labels it."
          )
        ],
        [
          "If the count confirms it, the system has no path for a fifth of applicants, whoever pointed that out.",
          null
        ],
        [
          "That passes both parts of the test, so it is a design defect and the design must change.",
          st(
            "A design defect stays true whoever raises it, so persuasion cannot fix it."
          )
        ],
        [
          "The second objection names no case that the bank can check today.",
          null
        ],
        [
          "It would probably remain even if the system handled every applicant perfectly.",
          null
        ],
        [
          "It may reflect a real worry about the officer's own role, which makes it resistance that still deserves a hearing.",
          [
            cmp(
              "a",
              "Design defect",
              "Specific, checkable, and true whoever raises it."
            ),
            cmp(
              "b",
              "Resistance",
              "Would remain even if the design worked perfectly."
            )
          ]
        ],
        [
          "Calling Reem's defect resistance would be the costliest mistake, because the flaw would go live with the system.",
          null
        ],
        [
          "So apply the test to every objection, because it protects both the design and the people raising concerns.",
          q(
            "What data would you ask for before labelling any objection as resistance?"
          )
        ]
      ]
    },
    {
      title: "The admissions portal and the transfer students",
      lines: [
        [
          "Now picture a university replacing paper admission forms with an online portal.",
          t(
            "A second look at the test",
            "An admissions office hears three objections to its new portal."
          )
        ],
        [
          "The portal should cut processing time sharply, and most admissions staff agree it will be faster.",
          null
        ],
        [
          "Yousef, who has handled admissions for twelve years, raises three objections in one long email.",
          null
        ],
        [
          "His manager is tempted to file the whole email under resistance and move on.",
          null
        ],
        [
          "He says transfer students cannot enter credits from other universities, because the portal has no field for them.",
          iss(
            "The portal has no field for credits earned at another university.",
            "Objection one"
          )
        ],
        [
          "He also says the portal is impersonal, and that the last system was promised as easier and was not.",
          iss(
            "The portal feels impersonal, and the last system broke its promise.",
            "Objections two and three"
          )
        ],
        [
          "Instead of judging Yousef, let's judge each claim with the same two questions.",
          q(
            "Which claim names a case that data can check?"
          )
        ],
        [
          "The transfer claim is checkable, because the office knows exactly how many transfer students applied last year.",
          dg(
            "Testing the transfer objection",
            D.flow([
              "Specific|claim",
              "Count transfer|applicants",
              "Try the|portal",
              "No path|found",
              "+Design|defect"
            ]),
            "A quick test with real applicants shows whether the portal truly lacks a path for transfer credits."
          )
        ],
        [
          "And it would remain true even if Yousef retired tomorrow, so it is a genuine design defect.",
          null
        ],
        [
          "The portal team must add a path for transfer credits before launch, and say publicly why they did.",
          st(
            "Design genuinely flawed: change the design and say publicly why."
          )
        ],
        [
          "The impersonal claim names no case, so it fails the data test, though it may still reveal how staff feel.",
          null
        ],
        [
          "The broken promise is organisational memory, which is real resistance about trust rather than about the portal's design.",
          [
            cmp(
              "a",
              "Defect",
              "Transfer credits have no path. Change the design."
            ),
            cmp(
              "b",
              "Resistance",
              "Distrust after a broken promise. Answer it differently."
            )
          ]
        ],
        [
          "Notice that one person raised all three, so judging the person would have hidden the defect.",
          st(
            "Test each claim, not the person, because one objector can raise a defect and resistance together."
          )
        ],
        [
          "Treating everything as resistance would launch a portal that fails transfer students on its first day.",
          null
        ],
        [
          "So separate the claims, test each one, and let the evidence decide what kind of problem you have.",
          q(
            "How would you explain your verdict to Yousef for each of his three objections?"
          )
        ]
      ]
    }
  ],
  O2c: [
    {
      title: "The permits office with five different problems",
      lines: [
        [
          "Let's practise matching responses to causes in a city permits office moving building applications online.",
          t(
            "Matching the response to the cause",
            "A permits office faces several causes of resistance at once."
          )
        ],
        [
          "The director wants one confident message for all staff, which is exactly the mistake we want to avoid.",
          null
        ],
        [
          "Inspectors have shown that the online form cannot handle applications for historic buildings, a genuine design defect.",
          iss(
            "The online form has no path for historic building applications.",
            "Design genuinely flawed"
          )
        ],
        [
          "So the director changes the design and says publicly why, crediting the inspectors who found the gap.",
          st(
            "Design genuinely flawed: change the design and say publicly why."
          )
        ],
        [
          "Senior clerks fear losing their standing as the people who untangle difficult applications.",
          null
        ],
        [
          "Their skill took years to build, and an online form makes it invisible overnight.",
          null
        ],
        [
          "More training would insult them, so she gives them a role in designing the new standard for complex cases.",
          [
            cmp(
              "a",
              "Does not work",
              "More training for people who are already the experts."
            ),
            cmp(
              "b",
              "Works",
              "A role in designing the new standard."
            )
          ]
        ],
        [
          "Junior staff fear job loss, and vague reassurance would only deepen that fear.",
          null
        ],
        [
          "She publishes an explicit, written redeployment position, saying where each affected role will go.",
          st(
            "Fear of job loss: an explicit, written redeployment position."
          )
        ],
        [
          "The whole office is tired after three systems in two years, which is change fatigue.",
          iss(
            "Three new systems in two years have left staff exhausted.",
            "Change fatigue"
          )
        ],
        [
          "Another launch event would make things worse, so she plans fewer, larger, better-spaced changes instead.",
          null
        ],
        [
          "Few staff were consulted on the online process, which is the cause called no involvement.",
          q(
            "Why would a communication campaign fail to fix no involvement?"
          )
        ],
        [
          "A campaign only tells people more, so she chooses co-design, where staff help shape the process they will run.",
          dg(
            "Five causes, five responses",
            D.flow([
              "Flawed design|change it",
              "Lost expertise|design role",
              "Job fear|written position",
              "Fatigue|space changes",
              "+No voice|co-design"
            ]),
            "Each cause of resistance is matched with the response that actually addresses it."
          )
        ],
        [
          "Every effective response changes something real, and every one has a cost in time, effort or commitment.",
          null
        ],
        [
          "So begin by diagnosing the cause, and then choose the response that fits it rather than the one easiest to send.",
          q(
            "Which response would you expect to cost the permits office most, and why is it still worth paying?"
          )
        ]
      ]
    },
    {
      title: "The airline cargo team and the wrong fixes",
      lines: [
        [
          "Now imagine an airline cargo team where a manager has already tried the wrong responses.",
          t(
            "Learning from responses that failed",
            "A cargo manager discovers why one fix for everything does not work."
          )
        ],
        [
          "A new booking tool cannot handle shipments of live animals, and the team has said so clearly.",
          iss(
            "The booking tool has no path for live-animal shipments.",
            "A real design flaw"
          )
        ],
        [
          "The manager answered with a video about the tool's benefits, so the flaw is still there.",
          null
        ],
        [
          "The team already believed the tool was faster, so the video told them nothing new.",
          null
        ],
        [
          "Persuasion cannot repair a missing path, so the design must change and the reason must be shared openly.",
          st(
            "A flawed design is never answered by persuasion."
          )
        ],
        [
          "Her most experienced agent, Faisal, was sent on a basic training course, and he felt humiliated.",
          null
        ],
        [
          "His real loss was expert status, so the right answer was a role in designing the new handling standard.",
          [
            cmp(
              "a",
              "What she did",
              "Basic training for the team's leading expert."
            ),
            cmp(
              "b",
              "What fits the cause",
              "A role in designing the new standard."
            )
          ]
        ],
        [
          "When agents asked about jobs, she said nobody needed to worry, but wrote nothing down.",
          iss(
            "Reassurance without commitment leaves fear of job loss untouched.",
            "What did not work"
          )
        ],
        [
          "Only an explicit, written redeployment position answers that fear, because ambiguity does more damage than bad news.",
          null
        ],
        [
          "She also launched two smaller tools in the same month, so a tired team felt it was all happening again.",
          null
        ],
        [
          "Change fatigue needs fewer, larger, better-spaced changes, so she should hold back the smaller tools.",
          st(
            "Change fatigue: fewer, larger, better-spaced changes."
          )
        ],
        [
          "Finally, she sent a weekly newsletter to the team who never helped design the tool.",
          null
        ],
        [
          "No involvement calls for co-design, because a newsletter informs people but gives them no ownership.",
          dg(
            "Repairing the response",
            D.flow([
              "Diagnose|each cause",
              "Drop the|wrong fix",
              "Change|something real",
              "State|the cost",
              "+Adoption|improves"
            ]),
            "The manager replaces generic fixes with responses that each match a diagnosed cause."
          )
        ],
        [
          "Notice that each wrong fix was cheap and easy, which is exactly why it felt attractive.",
          null
        ],
        [
          "So when a response feels easy, check whether it changes anything real for the people resisting.",
          q(
            "Which of the manager's wrong fixes would you replace first, and what would it cost?"
          )
        ]
      ]
    }
  ],
// END-BLOCK
// CHUNK: R-O3abc
  O3a: [
    {
      title: "The museum extension and its stakeholders",
      lines: [
        [
          "Let's practise the power–interest grid with a city museum that is redesigning how visitors buy tickets and enter.",
          t(
            "Another way to place stakeholders",
            "A museum director maps who can shape or stop a new entry process."
          )
        ],
        [
          "The director, Laila, cannot give everyone the same attention, so she needs to know where her effort counts.",
          null
        ],
        [
          "Power means how much someone can affect the outcome, including the ability to block it.",
          [
            cmp(
              "a",
              "Power",
              "How much they can affect the outcome, including blocking it."
            ),
            cmp(
              "b",
              "Interest",
              "How much the change touches their own work or worries."
            )
          ]
        ],
        [
          "Interest means how much the change touches their own work, goals or worries.",
          null
        ],
        [
          "The museum's deputy director and the head of visitor services both have high power and high interest.",
          it(
            1,
            4,
            "users",
            "Manage closely",
            "High power, high interest: co-design and frequent contact."
          )
        ],
        [
          "They will shape the outcome, so Laila invites them into the design itself and meets them often.",
          null
        ],
        [
          "If either of them hears about a problem late, they can only react rather than help solve it.",
          null
        ],
        [
          "The city's fire safety officer cares little about tickets, but can refuse to approve a new entrance layout.",
          it(
            2,
            4,
            "shield",
            "Keep satisfied",
            "High power, lower interest: manage expectations, because a late objection can stop everything."
          )
        ],
        [
          "So Laila manages that officer's expectations early, because a late objection could stop the whole project.",
          st(
            "Keep satisfied: a late objection from this corner can stop everything."
          )
        ],
        [
          "The gallery attendants have little formal power, yet the change touches every hour of their working day.",
          it(
            3,
            4,
            "users",
            "Keep informed",
            "They do the work: consult them on the design and explain decisions."
          )
        ],
        [
          "Keeping them informed means consulting them on the design and explaining each decision, not sending a newsletter.",
          null
        ],
        [
          "They know where queues form on busy weekends, so their advice can improve the design before it is built.",
          null
        ],
        [
          "The company that services the café's coffee machines sits low on both axes for this change.",
          it(
            4,
            4,
            "eye",
            "Monitor",
            "Low power, low interest: periodic updates, minimal effort."
          )
        ],
        [
          "Periodic updates are enough there, which frees Laila's time for the corners that decide success.",
          dg(
            "Placing the museum's stakeholders",
            D.flow([
              "List|stakeholders",
              "Judge|power",
              "Judge|interest",
              "Place on|the grid",
              "+Plan|engagement"
            ]),
            "Laila lists stakeholders, judges their real power and interest, places them, and only then plans engagement."
          )
        ],
        [
          "Notice that the grid decides how much engagement each group needs, not whose concerns deserve respect.",
          st(
            "The grid sorts attention, not respect."
          )
        ],
        [
          "So place people honestly, using real influence rather than job titles alone.",
          q(
            "Which museum stakeholder would be most dangerous to place in the wrong corner, and why?"
          )
        ]
      ]
    },
    {
      title: "The ferry terminal and the hidden influencer",
      lines: [
        [
          "Now picture a ferry terminal replacing paper boarding passes with a mobile app.",
          t(
            "A second look at the grid",
            "A terminal manager discovers that power is not only a job title."
          )
        ],
        [
          "The manager, Omar, sketches the grid quickly and places people according to the organisation chart.",
          null
        ],
        [
          "The port authority's operations director lands in the top-right corner, with high power and high interest.",
          it(
            1,
            3,
            "users",
            "Manage closely",
            "Co-design and frequent contact, because they shape the outcome."
          )
        ],
        [
          "Maritime legal advisers sit high on power but low on interest, so he keeps them satisfied.",
          null
        ],
        [
          "He places the boarding crews in keep informed, because they do the work but hold no formal authority.",
          it(
            2,
            3,
            "users",
            "Keep informed",
            "Consult them on the design and explain decisions."
          )
        ],
        [
          "But one crew leader, Salem, has worked the ramps for eighteen years, and every crew follows his lead.",
          iss(
            "The crews follow Salem, whatever the organisation chart says.",
            "Informal power"
          )
        ],
        [
          "If Salem decides the app is unworkable, the crews will quietly keep checking paper passes after launch.",
          null
        ],
        [
          "The organisation chart would never have warned Omar about that risk.",
          null
        ],
        [
          "His real power is far higher than his job title suggests, so Omar moves him closer to manage closely.",
          [
            cmp(
              "a",
              "On the organisation chart",
              "Crew leader: low formal power, keep informed."
            ),
            cmp(
              "b",
              "In practice",
              "Every crew follows him: treat him as someone who shapes the outcome."
            )
          ]
        ],
        [
          "That means inviting Salem to test the app on real sailings and to help redesign the boarding steps.",
          dg(
            "Correcting the grid",
            D.flow([
              "Chart-based|placement",
              "Observe real|influence",
              "Spot hidden|power",
              "Move on|the grid",
              "+Engage|properly"
            ]),
            "Omar corrects his first grid once he sees who really influences the crews."
          )
        ],
        [
          "The ticket printing supplier, by contrast, sits low on both axes and needs only periodic updates.",
          it(
            3,
            3,
            "eye",
            "Monitor",
            "Periodic updates, minimal effort."
          )
        ],
        [
          "Omar's first grid was not wrong because he was careless, but because he trusted titles over observation.",
          null
        ],
        [
          "A single afternoon watching boarding would have shown him who the crews really listen to.",
          null
        ],
        [
          "Placing people honestly requires judgement about who actually moves others, not only who signs approvals.",
          st(
            "Power includes informal influence, so placement needs judgement, not just an organisation chart."
          )
        ],
        [
          "So when you build a grid, ask who people really follow before you decide where each one sits.",
          q(
            "How would you find out who holds informal power in a team you have never worked with?"
          )
        ]
      ]
    }
  ],
  O3b: [
    {
      title: "The library director's engagement week",
      lines: [
        [
          "Let's watch the four engagement strategies in action at a university library moving to self-service borrowing.",
          t(
            "Engagement in practice",
            "One week in a library director's calendar"
          )
        ],
        [
          "The director, Mariam, has already built her grid, and now her calendar must follow it.",
          null
        ],
        [
          "On Monday she spends two hours with the dean of libraries and two senior librarians redesigning the returns process.",
          it(
            1,
            4,
            "users",
            "Manage closely",
            "Co-design: they shape the outcome, not just hear about it."
          )
        ],
        [
          "That is co-design, because the people in the room are changing the process rather than approving slides.",
          st(
            "Manage closely means co-design and frequent contact."
          )
        ],
        [
          "On Tuesday she sends the university's data protection officer a short note on how borrower records will be stored.",
          it(
            2,
            4,
            "shield",
            "Keep satisfied",
            "Manage expectations early, because a late objection can stop everything."
          )
        ],
        [
          "It is brief, but it answers the question the officer would otherwise raise just before launch.",
          null
        ],
        [
          "Keeping someone satisfied never means hiding problems, because confidence built on missing facts collapses later.",
          null
        ],
        [
          "On Wednesday she visits the evening desk staff and asks what still breaks in the self-service design.",
          it(
            3,
            4,
            "users",
            "Keep informed",
            "Consult them on the design and explain decisions."
          )
        ],
        [
          "Then she explains which suggestions changed the design and which could not, giving the reason each time.",
          null
        ],
        [
          "Explaining decisions matters, because staff accept a reasoned no far more easily than silence.",
          [
            cmp(
              "a",
              "A newsletter",
              "Information travels one way, and staff knowledge never reaches the design."
            ),
            cmp(
              "b",
              "Consult and explain",
              "Staff shape the design, and decisions come back with reasons."
            )
          ]
        ],
        [
          "On Thursday the shelving contractor receives a one-paragraph update, and nothing more is needed.",
          it(
            4,
            4,
            "eye",
            "Monitor",
            "Periodic updates, minimal effort."
          )
        ],
        [
          "That small effort is deliberate, because every hour saved goes to the corners that decide adoption.",
          null
        ],
        [
          "If you showed Mariam's diary to a stranger, they could almost redraw her grid from it.",
          null
        ],
        [
          "Notice that Mariam never sent one identical message to everyone and called it engagement.",
          dg(
            "Different corners, different engagement",
            D.flow([
              "Monitor|updates",
              "Keep informed|consult",
              "Keep satisfied|expectations",
              "Manage closely|co-design",
              "+Effort where|it counts"
            ]),
            "Engagement deepens from periodic updates to co-design as power and interest rise."
          )
        ],
        [
          "Each conversation had its own purpose, depth and channel, because each group needed something different.",
          st(
            "The engagement plan differs by quadrant."
          )
        ],
        [
          "So when you plan engagement, ask what each group needs from you, not what is easiest to send.",
          q(
            "What would go wrong if Mariam sent the evening desk staff only a newsletter?"
          )
        ]
      ]
    },
    {
      title: "The courier depot that engaged everyone the same way",
      lines: [
        [
          "Now imagine a courier depot introducing new sorting software, where the manager made one common mistake.",
          t(
            "When engagement is identical",
            "A depot manager sends everyone the same message, and pays for it."
          )
        ],
        [
          "Khalid, the manager, wrote one polished email about the software and sent it to every stakeholder.",
          iss(
            "One identical message went to every stakeholder.",
            "The trap"
          )
        ],
        [
          "The regional director received it too, although she should have helped shape the design.",
          null
        ],
        [
          "She skimmed it like any other update and moved on to her next meeting.",
          null
        ],
        [
          "Because she was only informed, she discovered a costly trade-off late and froze the budget.",
          [
            cmp(
              "a",
              "What she got",
              "One email, the same as everyone else."
            ),
            cmp(
              "b",
              "What manage closely needs",
              "Co-design and frequent contact."
            )
          ]
        ],
        [
          "The health and safety inspector, who cared little about software, was never briefed on the new conveyor speeds.",
          null
        ],
        [
          "He raised an objection two days before launch, which is exactly how a keep satisfied stakeholder can stop everything.",
          iss(
            "A late objection from a high-power stakeholder delayed the launch.",
            "Keep satisfied was neglected"
          )
        ],
        [
          "The sorters, who do the work, read the email but were never asked what would break on night shifts.",
          null
        ],
        [
          "Keeping them informed should have meant consulting them on the design and explaining each decision.",
          st(
            "Keep informed means consult and explain, not broadcast."
          )
        ],
        [
          "Only the cleaning contractor was engaged correctly, because a periodic update was all that corner needed.",
          null
        ],
        [
          "The sorters, meanwhile, kept using their old paper labels on night shifts because nobody had asked about them.",
          null
        ],
        [
          "So Khalid spent equal effort everywhere and got it right only where it mattered least.",
          dg(
            "Repairing the engagement plan",
            D.flow([
              "Re-read|the grid",
              "Co-design|with director",
              "Brief|the inspector",
              "Consult|the sorters",
              "+Effort where|it counts"
            ]),
            "Khalid matches engagement to each quadrant instead of sending one message to all."
          )
        ],
        [
          "His repaired plan puts most effort into co-design and early expectation management, not into the email.",
          null
        ],
        [
          "Engagement works when its depth matches the stakeholder's power and interest.",
          st(
            "The same message for everyone wastes effort where it counts."
          )
        ],
        [
          "So before you engage anyone, check which corner they sit in and what that corner needs.",
          q(
            "Which of Khalid's mistakes was most costly, and how would you have prevented it?"
          )
        ]
      ]
    }
  ],
  O3c: [
    {
      title: "The hospital project and the moving pharmacist",
      lines: [
        [
          "Let's see how stakeholders move, using a hospital that is redesigning how patients are discharged.",
          t(
            "Stakeholders move",
            "Stakeholder position is a snapshot, not an attribute."
          )
        ],
        [
          "At the kickoff, the project lead placed the chief pharmacist in keep satisfied.",
          null
        ],
        [
          "That was sound, because pharmacy had high power but little interest in the early discharge paperwork.",
          [
            cmp(
              "a",
              "At kickoff",
              "Chief pharmacist: high power, low interest. Keep satisfied."
            ),
            cmp(
              "b",
              "In phase two",
              "Discharge medicines come into scope. Interest rises. Manage closely."
            )
          ]
        ],
        [
          "But in phase two, the redesign starts to cover the medicines patients take home.",
          iss(
            "Discharge medicines, pharmacy's own process, come into scope.",
            "Scope moves"
          )
        ],
        [
          "Once their own process is in scope, the pharmacist's interest rises sharply and she moves across the grid.",
          null
        ],
        [
          "She now belongs in manage closely, which means co-design rather than a monthly briefing.",
          dg(
            "A stakeholder who moved",
            D.flow([
              "Keep|satisfied",
              "Medicines|in scope",
              "Interest|rises",
              "Manage|closely",
              "+Co-design"
            ]),
            "When her own process enters scope, the pharmacist moves and engagement must deepen."
          )
        ],
        [
          "Imagine the project lead never redraws the grid and keeps sending the same polite summary.",
          null
        ],
        [
          "The summary is accurate, but it is written for someone who no longer exists on the grid.",
          null
        ],
        [
          "The discharge medicine steps get designed without pharmacy, and the pharmacist objects just before go-live.",
          iss(
            "A powerful stakeholder sees the design late and stops it.",
            "A late objection"
          )
        ],
        [
          "Failing to notice that a stakeholder has moved is exactly how late objections arrive.",
          st(
            "Failing to notice movement is how late objections arrive."
          )
        ],
        [
          "That is why the grid is re-run at every phase boundary, where one stage ends and the next begins.",
          it(
            1,
            2,
            "search",
            "Re-run at every phase boundary",
            "Power and interest move as the programme becomes real."
          )
        ],
        [
          "Those are the moments when scope widens and different people start to feel the change.",
          null
        ],
        [
          "Re-running the grid takes an hour, while a late objection from pharmacy could cost months.",
          null
        ],
        [
          "Each time someone moves, the engagement plan must change with them, or the redrawn grid achieves nothing.",
          it(
            2,
            2,
            "users",
            "Change the engagement",
            "A redrawn grid matters only when engagement changes with it."
          )
        ],
        [
          "Notice that nobody behaved badly here, because the lead simply used an old picture of a moving organisation.",
          null
        ],
        [
          "So treat every grid as a snapshot, and plan the dates when you will redraw it.",
          q(
            "At which phase boundary would you expect the most stakeholders to move, and why?"
          )
        ]
      ]
    },
    {
      title: "The airport retailer and the shifting grid",
      lines: [
        [
          "Now picture an airport retailer moving its stores to a new stock replenishment process.",
          t(
            "A second look at moving stakeholders",
            "Movement can go up, down, and sideways."
          )
        ],
        [
          "The programme manager, Dana, re-runs her grid at the end of each phase, as the rule requires.",
          null
        ],
        [
          "At the first phase boundary, she notices that the airport's commercial team has moved.",
          null
        ],
        [
          "Their contracts now depend on store availability, so their interest has risen and they need closer engagement.",
          iss(
            "The airport's commercial team now depends on store availability.",
            "Interest rises"
          )
        ],
        [
          "At the second boundary, the warehouse team's process leaves scope, so they drift down toward monitor.",
          [
            cmp(
              "a",
              "Moving up",
              "Commercial team: interest rises, engagement deepens."
            ),
            cmp(
              "b",
              "Moving down",
              "Warehouse team: process leaves scope, periodic updates suffice."
            )
          ]
        ],
        [
          "That frees Dana's time, which she can redirect to the stakeholders who now matter more.",
          null
        ],
        [
          "Movement downward is easy to miss, yet continuing heavy engagement there wastes effort where it no longer counts.",
          null
        ],
        [
          "At the same boundary, a store supervisor named Aisha becomes the person every shop asks for advice.",
          iss(
            "Every shop now asks Aisha how the new process works.",
            "Informal power grows"
          )
        ],
        [
          "Her formal power has not changed, but her informal power has grown, so Dana invites her into co-design.",
          null
        ],
        [
          "Each movement leads to a change in engagement, because a redrawn grid matters only when the plan follows it.",
          dg(
            "Re-running the grid",
            D.flow([
              "Phase|ends",
              "Re-run|the grid",
              "Spot who|moved",
              "Adjust|engagement",
              "+Next|phase"
            ]),
            "At each phase boundary Dana re-runs the grid, spots movement, and adjusts engagement."
          )
        ],
        [
          "Notice that if she had kept the kickoff grid, she would be over-engaging the warehouse and ignoring Aisha.",
          null
        ],
        [
          "Position on the grid is a snapshot, so it describes one moment rather than a fixed attribute of a person.",
          st(
            "Stakeholder position is a snapshot, not an attribute."
          )
        ],
        [
          "Power and interest move as a programme becomes real, so engagement must keep moving with them.",
          null
        ],
        [
          "So schedule the grid review at each phase boundary, and treat any movement as a signal to act.",
          q(
            "What signs would tell you a stakeholder has moved before the next phase boundary arrives?"
          )
        ]
      ]
    }
  ],
// END-BLOCK
// CHUNK: R-O3de
  O3d: [
    {
      title: "The clinic that measured adoption weekly",
      lines: [
        [
          "Let's look at adoption again, this time in a group of clinics switching from paper referrals to an electronic referral system.",
          t(
            "Adoption is a measure",
            "A clinic group tracks how many referrals really use the new system."
          )
        ],
        [
          "At the launch review, managers report that doctors seem fairly happy with the new system.",
          null
        ],
        [
          "But seeming happy is a feeling, and a feeling cannot show how referrals are actually being sent.",
          st(
            "Adoption is a measure, not a feeling."
          )
        ],
        [
          "So the operations lead, Noura, counts the share of referrals sent electronically every week from day one.",
          it(
            1,
            3,
            "chart",
            "Measure adoption weekly",
            "Track the proportion of cases through the new process, weekly, from day one."
          )
        ],
        [
          "After twelve weeks her adoption line has risen quickly and then flattened at about sixty percent.",
          [
            cmp(
              "a",
              "What the meeting heard",
              "Doctors seem fairly happy with the system."
            ),
            cmp(
              "b",
              "What the measure shows",
              "Adoption has plateaued at about 60%."
            )
          ]
        ],
        [
          "Many managers would call sixty percent nearly there, but it means four referrals in ten still travel on paper.",
          null
        ],
        [
          "The clinics are therefore running two processes at once, and without action they will keep doing so indefinitely.",
          iss(
            "Paper and electronic referrals run side by side, with no end in sight.",
            "Two processes at once"
          )
        ],
        [
          "That doubles the checking, creates two kinds of error, and stops the promised benefits from fully arriving.",
          null
        ],
        [
          "Noura also tracks workarounds, meaning the unofficial ways staff get referrals done when the system does not fit.",
          it(
            2,
            3,
            "search",
            "Track workarounds explicitly",
            "Each workaround shows where the design fails a real case."
          )
        ],
        [
          "She finds that specialists who need scanned test results keep faxing them, because the system cannot attach images.",
          dg(
            "A workaround at the clinic",
            D.flow([
              "Doctor|refers",
              "System|lacks images",
              "!Staff fax|results",
              "!Paper|copy filed",
              "Referral|completed"
            ]),
            "When the system cannot attach images, staff quietly fall back to fax and paper."
          )
        ],
        [
          "That fax is not disobedience, because it is a design defect reporting itself.",
          st(
            "Every workaround is a design defect reporting itself."
          )
        ],
        [
          "So the image gap goes onto the improvement backlog, which is the running list of fixes the process still needs.",
          null
        ],
        [
          "Noura reports adoption to the sponsor alongside the delivery milestones every month.",
          it(
            3,
            3,
            "gauge",
            "Report adoption with milestones",
            "Otherwise the programme will look finished when it is not."
          )
        ],
        [
          "Without that report, the programme would look finished, because every installation milestone is already green.",
          null
        ],
        [
          "So track adoption after go-live as seriously as you tracked delivery before it.",
          q(
            "What would you expect to happen to adoption once the image gap is fixed, and how would you check?"
          )
        ]
      ]
    },
    {
      title: "The warehouse that blamed its workers",
      lines: [
        [
          "Now picture a parts warehouse that has introduced handheld scanners for every stock movement.",
          t(
            "Reading workarounds correctly",
            "A warehouse manager mistakes design defects for disobedience."
          )
        ],
        [
          "The manager, Hamad, sees that many pickers still write movements on paper and type them in later.",
          null
        ],
        [
          "His instinct is to issue a warning letter, because he reads every workaround as a discipline problem.",
          iss(
            "Workarounds are treated as disobedience and punished.",
            "The wrong reading"
          )
        ],
        [
          "Before he signs it, his deputy suggests counting the workarounds and asking where they happen.",
          null
        ],
        [
          "The count shows workarounds peaking near forty percent in the opening weeks and then settling near ten percent.",
          [
            cmp(
              "a",
              "Opening weeks",
              "Workarounds peak near 40% while people learn."
            ),
            cmp(
              "b",
              "Later weeks",
              "Workarounds settle near 10%, concentrated in a few places."
            )
          ]
        ],
        [
          "The early peak reflects learning, but the stubborn ten percent is concentrated in the cold store.",
          null
        ],
        [
          "There, the scanners fail in freezing temperatures, so pickers have no choice but to use paper.",
          dg(
            "Where the workaround comes from",
            D.flow([
              "Picker|enters cold store",
              "!Scanner|fails",
              "!Paper|note",
              "!Typed in|later",
              "Stock|updated late"
            ]),
            "The remaining workaround comes from a real case the design cannot handle."
          )
        ],
        [
          "Hamad realises that each workaround is a design defect reporting itself, so punishment would only hide the evidence.",
          st(
            "Track workarounds explicitly, because each one shows where the design fails."
          )
        ],
        [
          "He asks the pickers what they would change, and their answers become the improvement backlog.",
          null
        ],
        [
          "One picker suggests insulated scanner cases, which cost little and could remove the problem entirely.",
          null
        ],
        [
          "Meanwhile his adoption measure, tracked weekly since go-live, has plateaued at about sixty-five percent.",
          iss(
            "Adoption has stalled at about 65%.",
            "A plateau"
          )
        ],
        [
          "That plateau means the warehouse runs paper and scanners side by side, indefinitely, unless the design changes.",
          null
        ],
        [
          "So he fixes the cold-store scanners and reports adoption to the sponsor alongside his delivery milestones.",
          it(
            1,
            1,
            "gauge",
            "Report adoption, not only delivery",
            "A programme can look finished when it is not."
          )
        ],
        [
          "Notice that a warning letter would have pushed the workaround underground, where nobody could learn from it.",
          null
        ],
        [
          "So when you see a workaround, ask what case the design failed before you ask who broke the rule.",
          q(
            "How would you tell a learning workaround from one caused by a design defect?"
          )
        ]
      ]
    }
  ],
  O3e: [
    {
      title: "The tax office intervention plan",
      lines: [
        [
          "Let's design an intervention for a city tax office moving its counter services to an online portal.",
          t(
            "Designing the intervention",
            "Be specific about what you would change, not only what you would say."
          )
        ],
        [
          "The director, Salma, has been advised to launch a campaign explaining the portal's benefits.",
          null
        ],
        [
          "Yet most staff already agree the portal is faster, so another campaign would change almost nothing.",
          st(
            "Change management that is not just communication."
          )
        ],
        [
          "So she begins by inviting counter clerks to co-design the portal's handling of difficult cases.",
          it(
            1,
            4,
            "users",
            "Co-design the to-be process",
            "Involve the people who do the work in designing it."
          )
        ],
        [
          "That costs two weeks of workshops and supervisor time, but it gives the clerks ownership of the result.",
          null
        ],
        [
          "The business case assumes fewer counter staff, so she publishes a written redeployment position early.",
          it(
            2,
            4,
            "shield",
            "Be explicit and early",
            "Ambiguity does more damage than bad news."
          )
        ],
        [
          "That costs a firm management commitment, but ambiguity would do more damage than bad news.",
          null
        ],
        [
          "The draft training plan only shows which screens to click, which trains people on the system alone.",
          [
            cmp(
              "a",
              "Training on the system",
              "Which screens to click and which buttons to press."
            ),
            cmp(
              "b",
              "Training on the process",
              "When to step in, how exceptions are resolved, and who does what next."
            )
          ]
        ],
        [
          "So she adds training on the process, including when clerks should step in and how exceptions are resolved.",
          it(
            3,
            4,
            "book",
            "Train on the process",
            "Train on the process, not only on the system."
          )
        ],
        [
          "That costs extra practice sessions and counter cover, because people cannot learn and serve at the same time.",
          null
        ],
        [
          "Clerks are still rated on how many visitors they personally serve, so helping someone use the portal looks unproductive.",
          iss(
            "Clerks are rated on visitors served in person.",
            "An old measure survives"
          )
        ],
        [
          "If that measure stays, the old behaviour remains rational, so she changes it to cases resolved by any channel.",
          it(
            4,
            4,
            "gauge",
            "Change measures and incentives",
            "Otherwise the old behaviour will be rational."
          )
        ],
        [
          "That costs a revision of the scorecard, which is small compared with a portal nobody is rewarded for using.",
          null
        ],
        [
          "Every step changes something real, and every step has a stated cost the sponsor can approve.",
          dg(
            "An intervention with explicit costs",
            D.flow([
              "Diagnose|the cause",
              "Change|something real",
              "State|the cost",
              "Track|adoption",
              "+Adoption|rises"
            ]),
            "Each measure links a diagnosed cause to a real change with a stated cost."
          )
        ],
        [
          "She also tracks adoption after go-live, so she will know whether her measures are working.",
          q(
            "Which of Salma's measures would you expect to cost most, and why is it still worth paying?"
          )
        ]
      ]
    },
    {
      title: "The bank branch plan that only talked",
      lines: [
        [
          "Now imagine a bank branch network introducing tablets for account opening, with a plan that relies entirely on words.",
          t(
            "Repairing a weak plan",
            "A plan full of messages, and nothing that changes the work."
          )
        ],
        [
          "The manager's plan contains a launch video, a weekly newsletter, posters in staff rooms, and a motivational town hall.",
          null
        ],
        [
          "Every item tells people something, but not one of them changes how the work is actually done.",
          iss(
            "The plan communicates benefits but changes nothing about the work.",
            "All talk"
          )
        ],
        [
          "Advisers were never asked to help design the tablet process, so they feel no ownership of it.",
          null
        ],
        [
          "A better plan replaces the video with co-design sessions, where advisers shape the steps they will follow.",
          it(
            1,
            4,
            "users",
            "Co-design",
            "The people who do the work help design it."
          )
        ],
        [
          "Advisers fear branch closures, and the town hall offered only reassurance without commitment.",
          null
        ],
        [
          "So the better plan includes a written position on roles, published early and stating what happens to each branch.",
          it(
            2,
            4,
            "shield",
            "Commit in writing",
            "An explicit position answers fear; reassurance does not."
          )
        ],
        [
          "The training covers tablet screens but not the new process for identity checks or unusual customers.",
          [
            cmp(
              "a",
              "Original plan",
              "Messages about benefits, and training on screens."
            ),
            cmp(
              "b",
              "Repaired plan",
              "Co-design, written commitments, process training, and new measures."
            )
          ]
        ],
        [
          "So training moves to the process, because the tablet is only one part of the new way of working.",
          it(
            3,
            4,
            "book",
            "Train on the process",
            "Not only on the system."
          )
        ],
        [
          "Advisers are still measured on paper forms completed, which quietly rewards the old behaviour.",
          null
        ],
        [
          "The better plan changes that measure to accounts opened correctly, whatever the channel, so the new way becomes the sensible way.",
          it(
            4,
            4,
            "gauge",
            "Change measures and incentives",
            "Or the old behaviour remains rational."
          )
        ],
        [
          "Each repaired item has a cost in workshop time, management commitment, training cover or scorecard redesign.",
          st(
            "Every real change has a cost, and stating it turns intentions into a plan."
          )
        ],
        [
          "Notice that the original plan looked cheaper only because its real cost would appear later as low adoption.",
          dg(
            "From talk to change",
            D.flow([
              "Messages|only",
              "Diagnose|the causes",
              "Change|the work",
              "State|each cost",
              "+Track|adoption"
            ]),
            "A weak plan becomes a strong one when each message is replaced by a real, costed change."
          )
        ],
        [
          "So when you review any plan, ask what it changes, what each change costs, and how you will know it worked.",
          q(
            "Which single item in the original plan would you replace before any other, and with what?"
          )
        ]
      ]
    }
  ],
// END-BLOCK
// CHUNK: R-O3fg
  O3f: [
    {
      title: "The rail depot and its three objections",
      lines: [
        [
          "Let's practise the whole decision again, this time at a rail maintenance depot introducing digital job cards.",
          t(
            "Three objections, one decision",
            "A depot manager must decide what to do with ten weeks left."
          )
        ],
        [
          "The manager, Rashid, has three written objections on his desk and ten weeks until the tablets go live.",
          null
        ],
        [
          "His adviser says he should communicate the benefits more clearly, so let's test that advice properly.",
          iss(
            "Advice on the table: communicate the benefits more clearly.",
            "The advice to test"
          )
        ],
        [
          "The night shift says the tablets cannot record jobs on the older locomotives, which still use paper part numbers.",
          [
            cmp(
              "a",
              "Night shift",
              "No way to record jobs on the older locomotives."
            ),
            cmp(
              "b",
              "Cause",
              "Knowledge that the design fails a real case."
            )
          ]
        ],
        [
          "The day shift points out that the business case assumes two fewer planners per shift.",
          [
            cmp(
              "a",
              "Day shift",
              "Costed on two fewer planners per shift."
            ),
            cmp(
              "b",
              "Cause",
              "Fear of job loss."
            )
          ]
        ],
        [
          "The weekend crew says the last system promised easier work and delivered nothing but extra forms.",
          [
            cmp(
              "a",
              "Weekend crew",
              "The last system promised the same."
            ),
            cmp(
              "b",
              "Cause",
              "Organisational memory of a broken promise."
            )
          ]
        ],
        [
          "Grouping the objections by cause, rather than by shift, shows Rashid that he faces three different problems.",
          null
        ],
        [
          "A staff survey shows most technicians already believe the tablets will be faster, so better messages would fix almost nothing.",
          st(
            "When staff already believe the benefit, communicating it more clearly fixes almost nothing."
          )
        ],
        [
          "Next he tests each claim, asking whether it names a checkable case and would hold without a personal stake.",
          dg(
            "Testing each objection",
            D.flow([
              "Objection|raised",
              "Names a|checkable case?",
              "Check|the data",
              "True without|a stake?",
              "+Defect or|resistance"
            ]),
            "Each objection is tested against data before anyone labels it resistance."
          )
        ],
        [
          "The older locomotives are easy to count, so the night shift's claim is a genuine design defect.",
          null
        ],
        [
          "The other two are rational resistance, and they still deserve real answers rather than dismissal.",
          null
        ],
        [
          "So Rashid changes the design to cover the older locomotives and says publicly why it changed.",
          it(
            1,
            3,
            "search",
            "Change the design",
            "Fix the real defect, and say publicly why."
          )
        ],
        [
          "He publishes a written redeployment position for the planners, which costs a firm management commitment.",
          it(
            2,
            3,
            "shield",
            "Commit in writing",
            "An explicit position answers the fear of job loss."
          )
        ],
        [
          "And he invites the weekend crew to co-design the job card, which costs workshop time but rebuilds trust.",
          it(
            3,
            3,
            "users",
            "Co-design",
            "Involvement answers a broken promise better than a new one."
          )
        ],
        [
          "Every step changes something real, and each one has a cost he can state to his sponsor.",
          q(
            "Which of Rashid's three steps would you take earliest, and why?"
          )
        ]
      ]
    },
    {
      title: "The hotel laundry and the tempting shortcut",
      lines: [
        [
          "Now picture a hotel group centralising its laundry, where the operations director is tempted by a shortcut.",
          t(
            "Resisting the easy answer",
            "A director wants one message to answer three different objections."
          )
        ],
        [
          "The director, Hessa, has twelve weeks until the central laundry opens and three objections from her housekeeping leads.",
          null
        ],
        [
          "Her shortcut is a single campaign, with posters and a video showing how much faster the new process will be.",
          iss(
            "One campaign to answer every objection.",
            "The shortcut"
          )
        ],
        [
          "Before approving it, she asks which objections a campaign could actually fix.",
          q(
            "Which objections could a campaign about benefits fix?"
          )
        ],
        [
          "One lead says the central laundry has no route for guests' own clothes, which hotels handle every day.",
          null
        ],
        [
          "That names a specific case the records can confirm, and it stays true whoever raises it, so it is a defect.",
          st(
            "A defect stays true whoever raises it, so no campaign can repair it."
          )
        ],
        [
          "Another lead fears that laundry attendants will lose their jobs, because the business case shows fewer staff.",
          null
        ],
        [
          "A third says housekeepers were never consulted, so they feel the change is being done to them.",
          [
            cmp(
              "a",
              "Fear of job loss",
              "Answered by a written redeployment position."
            ),
            cmp(
              "b",
              "No involvement",
              "Answered by co-design, not a campaign."
            )
          ]
        ],
        [
          "Notice that the campaign answers none of the three causes, because each needs something real to change.",
          null
        ],
        [
          "So Hessa adds a guest-clothing route to the design and tells staff openly why she changed it.",
          dg(
            "From shortcut to plan",
            D.flow([
              "Group by|cause",
              "Test for|defects",
              "Match each|response",
              "State|the costs",
              "+Track|adoption"
            ]),
            "Hessa replaces one campaign with responses matched to each diagnosed cause."
          )
        ],
        [
          "She publishes a written position on the attendants' roles and invites housekeepers to co-design the collection steps.",
          null
        ],
        [
          "Each step has a cost, whether in design changes, management commitment or workshop time.",
          st(
            "Be specific about what you would change, not only what you would say."
          )
        ],
        [
          "She keeps the video too, but now it explains real changes rather than replacing them.",
          null
        ],
        [
          "So whenever one message seems to answer everything, check whether it changes anything at all.",
          q(
            "What would you track after go-live to know whether Hessa's plan worked?"
          )
        ]
      ]
    }
  ],
  O3g: [
    {
      title: "Writing a strong forum post",
      lines: [
        [
          "Let's prepare for the forum again, because a good post depends on habits as much as knowledge.",
          t(
            "The Week 4 forum",
            "Twenty-Two Years of Knowing How"
          )
        ],
        [
          "The case is set in a different organisation from Qasr, and that difference is deliberate.",
          null
        ],
        [
          "It tests whether you can diagnose resistance somewhere unfamiliar, rather than repeat answers you already know.",
          st(
            "Diagnose resistance in an unfamiliar organisation, then propose and defend a change approach."
          )
        ],
        [
          "So begin by reading the case and its exhibit slowly, because the exhibit may hold the real argument.",
          it(
            1,
            4,
            "book",
            "Read the case and exhibit",
            "The evidence comes before the opinion."
          )
        ],
        [
          "Then write your own diagnosis before you open anyone else's post.",
          it(
            2,
            4,
            "search",
            "Post before reading peers",
            "Your thinking stays your own."
          )
        ],
        [
          "Reading a confident classmate early quietly bends your answer toward theirs, even when your instinct was better.",
          null
        ],
        [
          "Posting before reading also gives the group more variety, because twenty independent diagnoses teach more than twenty echoes.",
          st(
            "Post before reading peers, so the discussion starts from independent diagnoses."
          )
        ],
        [
          "In your post, name each source of resistance and say what people stand to lose.",
          null
        ],
        [
          "Look for losses that are easy to miss, such as expertise built over many years or trust broken by a past programme.",
          st(
            "Analyse resistance in terms of what people stand to lose."
          )
        ],
        [
          "Then say whether any objection is a genuine design defect, and explain the test you used.",
          dg(
            "Building your post",
            D.flow([
              "Read case|and exhibit",
              "Diagnose|the causes",
              "Test for|defects",
              "Propose|with costs",
              "+Cite|Jeston Ch. 25"
            ]),
            "A strong post moves from evidence to diagnosis, testing, costed proposals, and citation."
          )
        ],
        [
          "Propose what you would change, not only what you would say, and state what each change would cost.",
          null
        ],
        [
          "Support your reasoning by citing Jeston's chapter twenty-five, because it gives everyone a shared evidence base.",
          it(
            3,
            4,
            "book",
            "Cite the chapter",
            "Ground your argument in Jeston, Chapter 25."
          )
        ],
        [
          "A post that only says change management matters is too general, because it could describe any organisation.",
          [
            cmp(
              "a",
              "A weak post",
              "General statements that fit any case."
            ),
            cmp(
              "b",
              "A strong post",
              "Specific causes, a defect test, costed changes, and a citation."
            )
          ]
        ],
        [
          "Aim to post by mid-week, so your peers have time to read and respond to you.",
          it(
            4,
            4,
            "chart",
            "Post by mid-week",
            "Leave time for real discussion."
          )
        ],
        [
          "Your draft does not need to be perfect, but it does need to be yours and specific to the case.",
          q(
            "What would make your diagnosis different from a general answer about resistance?"
          )
        ]
      ]
    },
    {
      title: "Replying well, and closing the week",
      lines: [
        [
          "Now let's think about the replies, which matter as much as your own post.",
          t(
            "Responding to peers",
            "Challenge or extend, rather than agree."
          )
        ],
        [
          "You should respond to at least two peers, and you should disagree with at least one of them.",
          it(
            1,
            2,
            "users",
            "Respond to two, disagree with one",
            "A challenged argument becomes stronger."
          )
        ],
        [
          "Disagreement is a service here, because it shows your colleague where their reasoning stops.",
          null
        ],
        [
          "Agreeing with everyone feels polite, but it leaves every argument exactly as weak as it was.",
          null
        ],
        [
          "Imagine a classmate, Ahmed, who argues that the workers in the case simply need more training.",
          iss(
            "A peer proposes more training as the whole answer.",
            "A post to challenge"
          )
        ],
        [
          "A weak reply says great post and moves on, which adds nothing to anyone's thinking.",
          [
            cmp(
              "a",
              "A weak reply",
              "Agreement and praise, with nothing added."
            ),
            cmp(
              "b",
              "A strong reply",
              "A reasoned challenge, grounded in the case and the chapter."
            )
          ]
        ],
        [
          "A strong reply asks whether those workers are already the experts, because training would then insult them.",
          null
        ],
        [
          "It might suggest a role in designing the new standard instead, and cite the chapter to support that view.",
          st(
            "Match the response to the cause, and support it with Jeston, Chapter 25."
          )
        ],
        [
          "Be respectful in tone and specific in substance, so the disagreement helps rather than hurts.",
          null
        ],
        [
          "At the end of the week, read the facilitator summary to see how the group's thinking developed.",
          it(
            2,
            2,
            "book",
            "Read the facilitator summary",
            "See how the whole discussion moved."
          )
        ],
        [
          "This work is formative, and it also contributes to the participation assessment in week fourteen.",
          null
        ],
        [
          "The forum is where the week's ideas come together in one continuous argument.",
          dg(
            "The week in one line",
            D.flow([
              "Change|matters",
              "Diagnose|resistance",
              "Engage|stakeholders",
              "Measure|adoption",
              "+Benefits|realised"
            ]),
            "Change matters, resistance is diagnosed, stakeholders are engaged, and adoption is measured until benefits arrive."
          )
        ],
        [
          "A sound process fails when people do not adopt it, so change management runs through every phase.",
          null
        ],
        [
          "Next week we move to the Organization Strategy phase, which tells us which processes matter most.",
          t(
            "Next week · Week 5",
            "The Organization Strategy phase"
          )
        ],
        [
          "So bring this week's people thinking with you, because strategy succeeds only when people adopt it.",
          q(
            "Which peer post would you choose to challenge, and what evidence would you use?"
          )
        ]
      ]
    }
  ],
// END-BLOCK
//__MORE_REVIEW__

    }

  };

})();