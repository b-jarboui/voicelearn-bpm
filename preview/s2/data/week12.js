/* Session 2 case data, week 12. Extracted verbatim from the OPER621 learning-support app (course data JSON); not rewritten. */
window.S2_DATA=window.S2_DATA||{};window.S2_DATA[12]={week:12,title:"The Implement Phase",classCase:{
    "company": "Qasr Hospitality Group — fourteen properties, one January",
    "title": "Where To Go Live, And When To Stop",
    "situation": [
     "The redesigned arrival is built and tested. The tourism authority's digital guest record rule takes effect on 1 January, five months away, and applies to every property. The steering group has to choose a rollout.",
     "Marina and Corniche piloted the kiosk eleven weeks ago. Kiosk adoption there has plateaued at 65%. The 35% handled at the desk are predominantly corporate arrivals the kiosk rejects; the assisted exception path added after the front-desk objections is working, and takes 9 minutes against the kiosk's 2. Guest satisfaction at the two pilot properties has risen from 6.8 to 7.9.",
     "Three of the remaining twelve properties are heritage buildings with no lobby space for a kiosk, and have registered variants under the week 6 architecture. Four operate at above 90% occupancy through the January period. Rollback has been rehearsed once, at Marina, and took eleven hours; it has not been tested with live corporate bookings in the system.",
     "The programme director has proposed rolling out all twelve remaining properties over eight weeks beginning in October, completing in December with three weeks before the regulatory deadline. The operations director has asked what happens if the eighth week fails."
    ],
    "exhibitTitle": "Exhibit 12 — Rollout conditions across fourteen properties",
    "exhibit": [
     [
      "Property group",
      "Count",
      "Condition",
      "Rollout implication"
     ],
     [
      "Pilot (Marina, Corniche)",
      "2",
      "Live, 65% adoption",
      "Complete"
     ],
     [
      "Standard layout",
      "5",
      "No constraint identified",
      "Straightforward"
     ],
     [
      "Heritage, no kiosk space",
      "3",
      "Registered variant",
      "Assisted path only"
     ],
     [
      "Peak occupancy in January",
      "4",
      ">90% occupancy",
      "Cannot absorb a dip in January"
     ],
     [
      "Rollback rehearsal",
      "—",
      "Once, 11 hours, no live corporate data",
      "Untested at scale"
     ]
    ],
    "questions": [
     "Design the rollout sequence. Name the property group you would go to second and the one you would go to last, and give the reason for each placement.",
     "The operations director asks what happens if the eighth week fails, three weeks before a regulatory deadline. Answer that question specifically, including what you would decide in advance and who would decide it.",
     "Adoption plateaued at 65% in the pilot and the residual is corporate arrivals the kiosk rejects. Decide whether that is an acceptable steady state to roll out or a defect to fix before rolling, and say what your decision costs."
    ],
    "questionPoints": [
     {
      "heading": "Rolling into sites that are not identical",
      "lookFor": [
       {
        "claim": "The pilot site teaches you about the pilot site; check which of its lessons generalise",
        "because": ""
       },
       {
        "claim": "Registered variants from week 6 tell you where the standard rollout will not fit",
        "because": ""
       },
       {
        "claim": "Later sites get a better product and less attention",
        "because": "plan the attention deliberately"
       },
       {
        "claim": "Do not let each site renegotiate the design; let each site register a variant with a reason",
        "because": ""
       }
      ]
     },
     {
      "heading": "The plan you hope not to use",
      "lookFor": [
       {
        "claim": "Decide the rollback trigger before go-live, as a number, and say who may call it",
        "because": ""
       },
       {
        "claim": "Rehearse the rollback; an untested rollback plan is a paragraph, not a capability",
        "because": ""
       },
       {
        "claim": "Where parallel running is impossible, rollback carries the safety that parallel would have given",
        "because": ""
       },
       {
        "claim": "Set a decision point at which rollback is no longer available, and make it explicit",
        "because": ""
       }
      ]
     },
     {
      "heading": "What the first six weeks need",
      "lookFor": [
       {
        "claim": "Help physically where the work happens, not a ticket queue",
        "because": ""
       },
       {
        "claim": "A daily route for problems to reach someone who can change the process, not only the system",
        "because": ""
       },
       {
        "claim": "Fast, visible fixes for small things, because they buy credibility for the large ones",
        "because": ""
       },
       {
        "claim": "Communication of what has been fixed, so reporting a problem is seen to be worth doing",
        "because": ""
       },
       {
        "claim": "Before cutover, write down the conditions under which you would roll back",
        "because": "and get the sponsor to sign them"
       },
       {
        "claim": "Do it beforehand, because at 02:00 on cutover night nobody is capable of deciding this fairly",
        "because": ""
       },
       {
        "claim": "Conditions must be measurable: 'check-in exceeding 15 minutes at any property for more than two hours', not 'if it goes badly'",
        "because": ""
       },
       {
        "claim": "Agree who is authorised to call it, by name and by role, including at 02:00",
        "because": ""
       },
       {
        "claim": "Rollback criteria that are written after go-live begins are not criteria, they are an argument",
        "because": ""
       }
      ]
     }
    ],
    "contracts": [
     {
      "asks": [
       {
        "text": "Give the rollout sequence.",
        "kind": "select",
        "count": null,
        "options": [
         {
          "name": "Pilot (Marina, Corniche)",
          "aliases": [
           "pilot",
           "marina",
           "corniche"
          ]
         },
         {
          "name": "Standard layout",
          "aliases": [
           "standard layout",
           "standard properties",
           "no constraint"
          ]
         },
         {
          "name": "Heritage, no kiosk space",
          "aliases": [
           "heritage",
           "no kiosk space"
          ]
         },
         {
          "name": "Peak occupancy in January",
          "aliases": [
           "peak occupancy",
           "high occupancy",
           "90% occupancy"
          ]
         }
        ]
       },
       {
        "text": "Name the property group you would go to second, and the one you would go to last.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Give the reason for each of those two placements.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [
       {
        "option": "Peak occupancy in January",
        "reasoning": [
         "roll out in january",
         "rolling out in january",
         "go live in january",
         "going live in january",
         "during the january period",
         "deploy in january"
        ],
        "conflict": "These four are the properties that cannot absorb a dip in January, which is exactly when this would put them through a change.",
        "caseFact": "Exhibit 12: four properties run above 90% occupancy and 'Cannot absorb a dip in January'."
       }
      ],
      "note": "",
      "choiceNeeds": "the reason for putting it in that position",
      "nextCheck": "Does your order follow from the conditions in the exhibit, or from what is convenient? Name the condition behind each placement.",
      "taskType": "sequence"
     },
     {
      "asks": [
       {
        "text": "Answer the operations director's question specifically: what happens if the eighth week fails?",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Say what you would decide in advance, and name who would make that decision.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [
       {
        "option": "",
        "reasoning": [
         "we can roll back",
         "we would roll back",
         "simply roll back",
         "roll back safely",
         "rollback is available",
         "just roll back"
        ],
        "conflict": "Rollback is not yet a control you can rely on. It has been rehearsed once, took eleven hours, and has never run with live corporate bookings in the system.",
        "caseFact": "'Rollback has been rehearsed once, at Marina, and took eleven hours; it has not been tested with live corporate bookings in the system.'"
       }
      ],
      "note": "",
      "choiceNeeds": "",
      "nextCheck": "",
      "taskType": "multi_requirement"
     },
     {
      "asks": [
       {
        "text": "Decide: is 65% adoption an acceptable steady state to roll out, or a defect to fix before rolling?",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Say what your decision costs.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [],
      "note": "",
      "choiceNeeds": "",
      "nextCheck": "",
      "taskType": "multi_requirement"
     }
    ]
   },forumCase:{
    "title": "One Weekend or Nine Months",
    "organisation": "Salama Utilities, water and electricity billing, 1.1 million accounts",
    "situation": [
     "Salama's new billing process is built and tested. The implementation approach is undecided, and the two options divide the steering committee.",
     "Big bang: cut over all 1.1 million accounts on one weekend. The programme director argues that running two billing processes in parallel is operationally dangerous, that dual-running requires reconciliation between two systems every cycle, and that a phased approach extends the period of maximum risk from one weekend to nine months. Cost of the cutover weekend: AED 2.1 million.",
     "Phased by region: five regions over nine months, starting with the smallest (61,000 accounts). The Head of Customer Service argues that a billing error affecting 1.1 million customers simultaneously is a regulatory and reputational event of a different order from one affecting 61,000, and that Salama has never executed a change of this size.",
     "Two facts are agreed by both sides. Salama's last major system change, four years ago, caused 40,000 incorrect bills and a regulatory enquiry. And the new process cannot run in parallel for the same account, because meter readings would be consumed by whichever process read them first.",
     "The regulator requires 60 days' notice of any change to billing presentation."
    ],
    "exhibitTitle": "Exhibit 1 - Implementation options",
    "exhibit": [
     [
      "Core reading",
      "Jeston, Chapter 20"
     ],
     [
      "Estimated time",
      "90 minutes self-paced (45 min case and reading, 30 min initial post, 15 min replies)"
     ],
     [
      "Outcomes evidenced",
      "K3, S1, S2, S3"
     ],
     [
      "Assessment",
      "Assessment 3 - Group Project (15%)"
     ],
     [
      "Forum status",
      "Formative - supports Assessment 4 (Participation)"
     ]
    ],
    "questions": [
     "Recommend an implementation approach. Both sides have made valid arguments -- your answer must say why the argument you reject is outweighed, not why it is wrong.",
     "Parallel running is impossible because meter readings are consumed once. Explain how this technical constraint shapes the risk profile of each option, and whether any mitigation restores the safety that parallel running would have given.",
     "The last major change produced 40,000 incorrect bills. Discuss how an organisation should let its own implementation history inform this decision without being paralysed by it.",
     "The new billing process cannot run in parallel because a meter reading is consumed once. Specify the technical and organisational measures you would put in place together so that the cutover is survivable, and say which of them you would refuse to go live without."
    ],
    "lookFor": [
     {
      "claim": "Takes a position and defeats the opposing argument rather than balancing both",
      "because": ""
     },
     {
      "claim": "Understands that no-parallel-running removes the standard fallback, so rollback planning carries the weight instead",
      "because": ""
     },
     {
      "claim": "Recognises phased implementation converts one large risk into repeated smaller risks plus sustained reconciliation cost",
      "because": ""
     },
     {
      "claim": "Uses the 60-day regulatory notice as a hard scheduling constraint on either path",
      "because": ""
     },
     {
      "claim": "Pairs technical measures (rehearsed rollback, reconciliation reporting, a data freeze) with organisational ones (staffed support, a named person who may call the rollback, customer communication) rather than listing only one kind",
      "because": ""
     },
     {
      "claim": "Treats the prior failure as evidence about organisational capability, arguing for building capability rather than only for caution",
      "because": ""
     }
    ],
    "pushFurther": [
     "If the thread converges too early, post the strongest counter-argument yourself and attribute it to 'a view from the other side of the table'.",
     "Watch for answers that restate the case narrative instead of analysing it -- the most common postgraduate failure mode on case forums.",
     "Push any learner who proposes a solution to state what their solution costs, and who in the case would object to it."
    ],
    "contract": {
     "asks": [
      {
       "text": "Recommend an implementation approach. Both sides have made valid arguments -- your answer must say why the argument you reject is outweighed, not why it is wrong.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "Parallel running is impossible because meter readings are consumed once. Explain how this technical constraint shapes the risk profile of each option, and whether any mitigation restores the safety that parallel running would have given.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "The last major change produced 40,000 incorrect bills. Discuss how an organisation should let its own implementation history inform this decision without being paralysed by it.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "The new billing process cannot run in parallel because a meter reading is consumed once. Specify the technical and organisational measures you would put in place together so that the cutover is survivable, and say which of them you would refuse to go live without.",
       "kind": "prose",
       "count": null,
       "options": []
      }
     ],
     "contradictions": [],
     "note": "",
     "choiceNeeds": "",
     "nextCheck": "",
     "taskType": "forum_multi_question"
    }
   }};
