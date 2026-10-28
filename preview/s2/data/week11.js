/* Session 2 case data, week 11. Extracted verbatim from the OPER621 learning-support app (course data JSON); not rewritten. */
window.S2_DATA=window.S2_DATA||{};window.S2_DATA[11]={week:11,title:"The Develop Phase",classCase:{
    "company": "Qasr Hospitality Group — building on a tool that only partly fits",
    "title": "Configure, Extend, Or Change The Process",
    "situation": [
     "Qasr selected Vendor C: moderate feature set, cheap to change after go-live, trainable in-house, and a partial fit to the designed process. That partial fit has now become concrete.",
     "The designed process resolves corporate rate approval overnight against the corporate agreement, which is what removes the 47-minute wait. Vendor C's standard workflow can request an approval and hold a case open, but it cannot evaluate a rate agreement itself; it expects a human to approve. Three options are on the table.",
     "Configure: use the standard approval step and staff the revenue office to clear the overnight queue before 06:00. AED 180,000, six weeks, no code, upgradeable. Requires two additional overnight shifts per week and leaves a human in the loop for every corporate arrival. Extend: write a rules component that evaluates the agreement automatically. AED 540,000, four months, fits the design exactly. Vendor C has confirmed in writing that extensions of this type are outside supported upgrade paths.",
     "Change the design: drop overnight resolution and pre-fetch the rate at booking instead, which the standard product supports natively. AED 95,000, three weeks. It resolves 71% of corporate arrivals and leaves the remaining 29% — those whose booking arrives inside 24 hours — on the old approval path. The January regulatory deadline is seven months away and the same team is doing that work."
    ],
    "exhibitTitle": "Exhibit 11 — Three routes to the same capability",
    "exhibit": [
     [
      "",
      "Configure",
      "Extend",
      "Change the design"
     ],
     [
      "Cost, AED",
      "180,000",
      "540,000",
      "95,000"
     ],
     [
      "Duration",
      "6 weeks",
      "4 months",
      "3 weeks"
     ],
     [
      "Fits phase 5 design",
      "Partially",
      "Exactly",
      "For 71% of arrivals"
     ],
     [
      "Removes the 47-minute wait",
      "Yes, if queue cleared",
      "Yes",
      "For 71%"
     ],
     [
      "Supported at upgrade",
      "Yes",
      "No",
      "Yes"
     ],
     [
      "Ongoing operational cost",
      "2 shifts/week",
      "None",
      "None"
     ]
    ],
    "questions": [
     "Choose a route and defend it to the phase 5 design authority, who will point out that two of the three do not deliver what was designed.",
     "Vendor C has confirmed the extension falls outside supported upgrade paths. Decide what that fact is worth in this decision — put a rough number or a condition on it rather than calling it a risk.",
     "The third option leaves 29% of corporate arrivals on the old path. Using week 6's core-versus-supporting classification, decide whether that is an acceptable design or a failure disguised as a saving."
    ],
    "questionPoints": [
     {
      "heading": "Deciding the route without deciding it by default",
      "lookFor": [
       {
        "claim": "Make the route an explicit decision with a named approver, per capability",
        "because": ""
       },
       {
        "claim": "Require the cost of change in four years to be stated, not only the cost to build now",
        "because": ""
       },
       {
        "claim": "Record what the organisation gives up under each route, in the words of the phase 5 design",
        "because": ""
       },
       {
        "claim": "Revisit extensions annually; an extension nobody revisits becomes a permanent constraint",
        "because": ""
       }
      ]
     },
     {
      "heading": "Deciding the route without deciding it by default",
      "lookFor": [
       {
        "claim": "Make the route an explicit decision with a named approver, per capability",
        "because": ""
       },
       {
        "claim": "Require the cost of change in four years to be stated, not only the cost to build now",
        "because": ""
       },
       {
        "claim": "Record what the organisation gives up under each route, in the words of the phase 5 design",
        "because": ""
       },
       {
        "claim": "Revisit extensions annually; an extension nobody revisits becomes a permanent constraint",
        "because": ""
       }
      ]
     },
     {
      "heading": "Designing the path for cases that do not fit",
      "lookFor": [
       {
        "claim": "Phase 4 measured the exception volume; build for that number, not for the happy path",
        "because": ""
       },
       {
        "claim": "Name who handles each exception type and what authority they need",
        "because": "this is phase 6's output"
       },
       {
        "claim": "An exception path that is slower than the old process will push people back to the old process",
        "because": ""
       },
       {
        "claim": "Instrument exceptions so their volume and causes are visible after go-live",
        "because": ""
       }
      ]
     }
    ],
    "contracts": [
     {
      "asks": [
       {
        "text": "Choose one of the three routes.",
        "kind": "select",
        "count": 1,
        "options": [
         {
          "name": "Configure",
          "aliases": [
           "configure",
           "configuration",
           "standard approval step"
          ]
         },
         {
          "name": "Extend",
          "aliases": [
           "extend",
           "extension",
           "rules component"
          ]
         },
         {
          "name": "Change the design",
          "aliases": [
           "change the design",
           "pre-fetch",
           "prefetch",
           "third option"
          ]
         }
        ]
       },
       {
        "text": "Defend it to the phase 5 design authority, who will point out that two of the three do not deliver what was designed.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [
       {
        "option": "Extend",
        "reasoning": [
         "is supported",
         "remains supported",
         "stays supported",
         "supported at upgrade",
         "no upgrade risk",
         "upgrade is safe",
         "safe at upgrade"
        ],
        "conflict": "The vendor has already answered this in writing, and answered it the other way.",
        "caseFact": "'Vendor C has confirmed in writing that extensions of this type are outside supported upgrade paths.'"
       }
      ],
      "note": "",
      "choiceNeeds": "",
      "nextCheck": "Does your defence answer the design authority's point, that two of the three routes do not deliver what was designed?",
      "taskType": "single_choice"
     },
     {
      "asks": [
       {
        "text": "Decide what the unsupported-upgrade fact is worth in this decision.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Put a rough number or a condition on it. The question explicitly rules out calling it 'a risk' and stopping.",
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
        "text": "Decide: is leaving 29% of corporate arrivals on the old path an acceptable design, or a failure disguised as a saving?",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Reach it using week 6's core-versus-supporting classification. The question names the tool to apply.",
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
    "title": "Automating the Exception",
    "organisation": "Kawthar Islamic Bank, corporate finance operations",
    "situation": [
     "Kawthar is developing automation for its trade finance document-checking process. The redesigned process has been agreed. The question is what to build.",
     "Analysis of 12 months of transactions shows 4,100 letters of credit. 68% pass document checking with no discrepancy. 24% have one of six recurring discrepancy types. The remaining 8% have discrepancies that are effectively unique -- 331 cases, no two alike, each requiring an experienced checker's judgement and often a conversation with the client.",
     "The vendor has proposed a solution covering all cases, including a machine-learning component for the 8%. It costs AED 5.4 million and takes 11 months. The vendor's argument is that partial automation leaves a manual process running alongside an automated one, which is 'the worst of both worlds'.",
     "An internal option automates the 68% clean cases and the six recurring discrepancy types, routing the 8% to the existing checker team with the collected documentation attached. It costs AED 1.3 million and takes 4 months.",
     "The Head of Operations notes that the eleven experienced checkers are the same people who would be needed to train any machine-learning component, and that four of them are within three years of retirement."
    ],
    "exhibitTitle": "Exhibit 1 - Transaction profile and options",
    "exhibit": [
     [
      "Core reading",
      "Jeston, Chapter 19"
     ],
     [
      "Estimated time",
      "90 minutes self-paced (45 min case and reading, 30 min initial post, 15 min replies)"
     ],
     [
      "Outcomes evidenced",
      "S1, S2"
     ],
     [
      "Forum status",
      "Formative - supports Assessment 4 (Participation)"
     ]
    ],
    "questions": [
     "Recommend one of the two options. Address the vendor's argument that partial automation is 'the worst of both worlds' directly rather than around it.",
     "The Develop phase builds what the Innovate phase designed. Discuss the risk of allowing what is technically buildable to redefine what was designed, and how a BPM team guards against it.",
     "Four of eleven experienced checkers retire within three years. Analyse what this means for both options, and whether it strengthens or weakens the case for automating the 8%."
    ],
    "lookFor": [
     {
      "claim": "Argues from the volume profile",
      "because": "92% of cases are rule-tractable and deliver most of the value at a quarter of the cost."
     },
     {
      "claim": "Answers the vendor's argument rather than dismissing it",
      "because": "exception routing is a designed path, not a parallel manual process."
     },
     {
      "claim": "Raises the knowledge-retention problem",
      "because": "retirement threatens the expertise either option depends on."
     },
     {
      "claim": "Notes that ML on 331 heterogeneous cases per year is a thin training base, so the expensive component is also the least certain",
      "because": ""
     },
     {
      "claim": "Considers capturing checker expertise as documented rules before retirement, independent of which option is chosen",
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
       "text": "Recommend one of the two options. Address the vendor's argument that partial automation is 'the worst of both worlds' directly rather than around it.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "The Develop phase builds what the Innovate phase designed. Discuss the risk of allowing what is technically buildable to redefine what was designed, and how a BPM team guards against it.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "Four of eleven experienced checkers retire within three years. Analyse what this means for both options, and whether it strengthens or weakens the case for automating the 8%.",
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
