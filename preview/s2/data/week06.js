/* Session 2 case data, week 6. Extracted verbatim from the OPER621 learning-support app (course data JSON); not rewritten. */
window.S2_DATA=window.S2_DATA||{};window.S2_DATA[6]={week:6,title:"Process Architecture",classCase:{
    "company": "Qasr Hospitality Group — mapping fourteen properties",
    "title": "Which One Is The Process?",
    "situation": [
     "The programme has begun documenting guest arrival across the fourteen properties. Eleven documented versions have been produced so far.",
     "At Marina, arrival includes a corporate rate verification step performed by the revenue office. At Old Town, a heritage building with no back office, the front-desk agent performs it. At Desert Ridge, which serves mainly leisure guests, the step does not appear. Three properties have documented a step called 'guest recognition'; the three descriptions of it differ.",
     "Two of the eleven models were drawn by the property teams themselves. Nine were drawn by the programme's analysts from the group standard operating manual, which was last revised four years ago. When the analysts' models were shown to the property teams, six were disputed on points of fact.",
     "The repository has no field recording which version is authoritative. Asked which model the redesign should start from, the programme's lead analyst has proposed drawing a twelfth that combines them."
    ],
    "exhibitTitle": "Exhibit 6 — Documented arrival processes, by origin and status",
    "exhibit": [
     [
      "Property group",
      "Models",
      "Drawn by",
      "Disputed on fact",
      "Named owner"
     ],
     [
      "Marina, Corniche",
      "2",
      "Property teams",
      "0",
      "Front office manager"
     ],
     [
      "Old Town, Heritage x2",
      "3",
      "Programme analysts",
      "2",
      "None"
     ],
     [
      "Desert Ridge, Oasis x3",
      "4",
      "Programme analysts",
      "3",
      "None"
     ],
     [
      "Airport, City x1",
      "2",
      "Programme analysts",
      "1",
      "None"
     ],
     [
      "Remaining 3 properties",
      "0",
      "—",
      "—",
      "None"
     ]
    ],
    "questions": [
     "The lead analyst proposes a twelfth model combining the eleven. State what that would produce, and what you would do instead — as a sequence of steps, not a principle.",
     "Marina verifies corporate rates in the revenue office and Old Town does it at the desk. Decide whether that difference should be standardised away or registered as a permitted variant, and give the test you applied.",
     "Nine of the eleven models were drawn from a four-year-old manual and six were disputed on fact. What does that ratio tell you about the effort spent so far, and what would you now stop doing?"
    ],
    "questionPoints": [
     {
      "heading": "Structure first, detail second",
      "lookFor": [
       {
        "claim": "Agree the level 1 flows with the executive before anything is modelled",
        "because": ""
       },
       {
        "claim": "Assign ownership at level 2 before documenting, so documentation has an audience",
        "because": ""
       },
       {
        "claim": "Model to level 3 only where a decision depends on that detail",
        "because": ""
       },
       {
        "claim": "Publish the conventions before the modelling starts, not as a clean-up afterwards",
        "because": ""
       }
      ]
     },
     {
      "heading": "The multi-site question",
      "lookFor": [
       {
        "claim": "Standardise where variation carries cost and no customer benefit",
        "because": ""
       },
       {
        "claim": "Permit variation where local conditions genuinely differ",
        "because": "regulation, scale, market"
       },
       {
        "claim": "Require any variant to be registered against the standard, with a stated reason",
        "because": ""
       },
       {
        "claim": "Unregistered local variants are how one process quietly becomes fourteen",
        "because": ""
       }
      ]
     },
     {
      "heading": "Structure first, detail second",
      "lookFor": [
       {
        "claim": "Agree the level 1 flows with the executive before anything is modelled",
        "because": ""
       },
       {
        "claim": "Assign ownership at level 2 before documenting, so documentation has an audience",
        "because": ""
       },
       {
        "claim": "Model to level 3 only where a decision depends on that detail",
        "because": ""
       },
       {
        "claim": "Publish the conventions before the modelling starts, not as a clean-up afterwards",
        "because": ""
       }
      ]
     }
    ],
    "contracts": [
     {
      "asks": [
       {
        "text": "State what drawing a twelfth model combining the eleven would actually produce.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Give what you would do instead as a sequence of steps. The question rules out answering with a principle.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [
       {
        "option": "",
        "reasoning": [
         "i would combine",
         "combining them is right",
         "agree with the lead analyst",
         "draw the twelfth",
         "support the proposal",
         "merging them is the"
        ],
        "conflict": "A model combined from the eleven inherits every dispute in them and belongs to no property, so it settles nothing about which version is authoritative.",
        "caseFact": "Nine of the eleven were drawn by analysts from a manual last revised four years ago, and six were disputed on points of fact by the property teams."
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
        "text": "Decide: standardise the difference away, or register it as a permitted variant.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Give the test you applied to reach that decision.",
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
     },
     {
      "asks": [
       {
        "text": "Say what the ratio tells you about the effort spent so far.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Name what you would now stop doing.",
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
    "title": "Four Hundred Processes and No Map",
    "organisation": "Sahab Telecom, mobile and fixed-line, 3,200 staff",
    "situation": [
     "Sahab's process repository contains 412 documented processes. An audit commissioned after a failed billing migration found the following.",
     "Eleven processes are called 'Customer Activation'. Four are current. Three departments each believe they own 'Complaint Handling', and each has a different escalation path; a complaint's route depends on which channel it arrived through. Naming follows no convention: some processes are named for the department that performs them, some for the system that supports them, some for the outcome they produce. There is no statement anywhere of which processes are core to Sahab's competitive position and which are support.",
     "When the billing migration team asked which processes touched billing, the repository could not answer. The team compiled the list manually over five weeks. It was later found to be missing nine processes, two of which caused the migration failure.",
     "The Head of Transformation has proposed hiring twelve analysts to re-document all 412 processes to a common standard, on the argument that the repository's problem is inconsistency."
    ],
    "exhibitTitle": "Exhibit 1 - Audit findings",
    "exhibit": [
     [
      "Core reading",
      "Jeston, Chapter 14"
     ],
     [
      "Estimated time",
      "90 minutes self-paced (45 min case and reading, 30 min initial post, 15 min replies)"
     ],
     [
      "Outcomes evidenced",
      "S1"
     ],
     [
      "Forum status",
      "Formative - supports Assessment 4 (Participation)"
     ]
    ],
    "questions": [
     "Explain the difference between a process repository and a process architecture, and show which one Sahab actually has.",
     "Evaluate the proposal to hire twelve analysts to re-document all 412 processes. State what it would fix, what it would not, and what you would do instead.",
     "Sahab has never classified processes as core or support. Explain what decisions that classification enables, and why its absence contributed to the billing failure."
    ],
    "lookFor": [
     {
      "claim": "Defines architecture as structure, hierarchy, ownership, naming and classification",
      "because": "not a collection of documents."
     },
     {
      "claim": "Sees that re-documenting inconsistent processes to a common standard produces consistent documents inside the same missing structure",
      "because": ""
     },
     {
      "claim": "Argues for establishing hierarchy, ownership and a naming convention first, then documenting selectively against it",
      "because": ""
     },
     {
      "claim": "Links the absence of core/support classification to being unable to answer 'what does billing touch', hence the missed processes",
      "because": ""
     },
     {
      "claim": "Notes that disputed ownership (37 processes) is an architecture defect, not a documentation defect",
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
       "text": "Explain the difference between a process repository and a process architecture, and show which one Sahab actually has.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "Evaluate the proposal to hire twelve analysts to re-document all 412 processes. State what it would fix, what it would not, and what you would do instead.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "Sahab has never classified processes as core or support. Explain what decisions that classification enables, and why its absence contributed to the billing failure.",
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
