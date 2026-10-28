/* Session 2 case data, week 13. Extracted verbatim from the OPER621 learning-support app (course data JSON); not rewritten. */
window.S2_DATA=window.S2_DATA||{};window.S2_DATA[13]={week:13,title:"The Realize Value Phase",classCase:{
    "company": "Qasr Hospitality Group — the benefits review",
    "title": "Six Hundred And Twenty, Or Five Hundred And Five",
    "situation": [
     "Eleven months after the first go-live, the programme's benefits review is before the audit committee. The business case promised AED 620,000 in annual benefit. The programme reports AED 505,000 tracked. The finance director has asked for the review to be deferred rather than approved.",
     "The AED 505,000 comprises three items. AED 240,000 of front-desk labour, calculated as agent hours no longer spent on re-keying and rate calls, valued at the loaded hourly rate. Front-desk headcount across the fourteen properties is down by four, from 96 to 92; the calculation assumes the equivalent of eleven.",
     "AED 180,000 of retained corporate revenue, being two corporate accounts that renewed and had previously indicated they would not. Both renewals were signed in the same quarter that Qasr reduced its corporate rate by 4%. AED 85,000 of avoided regulatory penalty, being the fine the tourism authority may levy for non-compliance with the digital guest record rule, which Qasr now meets.",
     "The programme director's position is that the AED 115,000 gap is timing: seven of the fourteen properties went live within the last four months and their benefits have not matured. The finance director's position is that she has been shown a number she cannot reconcile to any account."
    ],
    "exhibitTitle": "Exhibit 13 — Claimed benefit against evidence",
    "exhibit": [
     [
      "Item",
      "Claimed, AED",
      "Basis",
      "Evidence available"
     ],
     [
      "Front-desk labour",
      "240,000",
      "Hours saved x loaded rate",
      "Headcount down 4 of 11 assumed"
     ],
     [
      "Retained corporate revenue",
      "180,000",
      "Two accounts renewed",
      "Rate cut of 4% same quarter"
     ],
     [
      "Avoided regulatory penalty",
      "85,000",
      "Fine not levied",
      "Compliance achieved"
     ],
     [
      "Total tracked",
      "505,000",
      "—",
      "—"
     ],
     [
      "Business case",
      "620,000",
      "—",
      "—"
     ]
    ],
    "questions": [
     "Take each of the three items and rule on it: real, overstated, unproven, or not a benefit at all. Give the reasoning for each ruling, not just the label.",
     "The programme director says the gap is timing and the finance director says she cannot reconcile the number. Decide which of them you would support at the audit committee, and say what evidence would change your mind.",
     "Qasr is about to fund a second programme on corporate billing. Specify what must be put in place at the start of that programme so this argument does not recur, and say who has to agree to it."
    ],
    "questionPoints": [
     {
      "heading": "Proving the programme caused it",
      "lookFor": [
       {
        "claim": "Other things changed at the same time; say what they were before someone else does",
        "because": ""
       },
       {
        "claim": "Where two causes are confounded, separate them if you can and disclose it if you cannot",
        "because": ""
       },
       {
        "claim": "Comparison sites and pre/post windows are weak evidence, but they are evidence",
        "because": ""
       },
       {
        "claim": "An overstated claim discovered later costs more credibility than a modest claim ever earned",
        "because": ""
       }
      ]
     },
     {
      "heading": "When tracked benefits fall short of promised",
      "lookFor": [
       {
        "claim": "Some benefits are late rather than absent",
        "because": "say which, with a date"
       },
       {
        "claim": "Some depend on an action nobody has taken, which is a task, not a shortfall",
        "because": ""
       },
       {
        "claim": "Some were never realisable and were approved anyway, which is a lesson for estimating",
        "because": ""
       },
       {
        "claim": "Reporting the shortfall early is what makes the next estimate credible",
        "because": ""
       }
      ]
     },
     {
      "heading": "Who owns a benefit",
      "lookFor": [
       {
        "claim": "The owner sits in the business and carries the benefit in their own objectives",
        "because": ""
       },
       {
        "claim": "The programme can deliver a capability; only the business can realise the benefit",
        "because": ""
       },
       {
        "claim": "Name the owner in the business case, before approval, not in the closing report",
        "because": ""
       },
       {
        "claim": "An unowned benefit is realised by nobody and defended by nobody when it is questioned",
        "because": ""
       }
      ]
     }
    ],
    "contracts": [
     {
      "asks": [
       {
        "text": "Rule on each of the three items: real, overstated, unproven, or not a benefit at all.",
        "kind": "select",
        "count": null,
        "options": [
         {
          "name": "Front-desk labour",
          "aliases": [
           "front-desk labour",
           "front desk labour",
           "labour saving",
           "240,000",
           "240000"
          ]
         },
         {
          "name": "Retained corporate revenue",
          "aliases": [
           "retained corporate",
           "corporate revenue",
           "two accounts",
           "180,000",
           "180000"
          ]
         },
         {
          "name": "Avoided regulatory penalty",
          "aliases": [
           "avoided regulatory",
           "penalty",
           "fine",
           "85,000",
           "85000"
          ]
         }
        ]
       },
       {
        "text": "Give the reasoning for each ruling, not just the label.",
        "kind": "prose",
        "count": null,
        "options": []
       }
      ],
      "contradictions": [
       {
        "option": "Retained corporate revenue",
        "reasoning": [
         "is real",
         "clearly real",
         "is proven",
         "genuine benefit",
         "solid benefit",
         "fully real",
         "can be claimed"
        ],
        "conflict": "Nothing here separates the programme from the price cut. Both renewals were signed in the quarter Qasr reduced its corporate rate, so the cause is not established.",
        "caseFact": "Exhibit 13: 'Two accounts renewed', evidence 'Rate cut of 4% same quarter'."
       },
       {
        "option": "Front-desk labour",
        "reasoning": [
         "is real",
         "clearly real",
         "is proven",
         "fully real",
         "genuine saving",
         "can be claimed"
        ],
        "conflict": "The saving is calculated on eleven people and four have gone. The hours may be released; the money is not saved until the cost leaves the payroll.",
        "caseFact": "Exhibit 13: 'Headcount down 4 of 11 assumed' — headcount fell from 96 to 92."
       }
      ],
      "note": "",
      "choiceNeeds": "your ruling on it: real, overstated, unproven, or not a benefit at all",
      "nextCheck": "Is each ruling supported by the evidence column rather than by the size of the number?",
      "taskType": "classification"
     },
     {
      "asks": [
       {
        "text": "Say which of the two directors you would support at the audit committee.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Say what evidence would change your mind.",
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
        "text": "Specify what must be put in place at the start of the corporate billing programme so this argument does not recur.",
        "kind": "prose",
        "count": null,
        "options": []
       },
       {
        "text": "Name who has to agree to it.",
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
    "title": "The Benefits Nobody Can Find",
    "organisation": "Andalus Education Group, 14 private schools",
    "situation": [
     "Andalus completed a BPM programme across admissions, fee collection and staff recruitment. The closing report claims AED 11.4 million in annual benefits. The CFO has refused to sign it.",
     "The claimed benefits break down as: AED 6.2 million from reduced admissions processing effort, calculated as hours saved multiplied by loaded hourly cost; AED 3.1 million from improved fee collection, being the reduction in debtor days applied to the cost of working capital; and AED 2.1 million from faster recruitment, calculated as reduced vacancy days multiplied by the revenue attributed to a filled teaching post.",
     "The CFO's objections are specific. Headcount in admissions is unchanged at 31; the 6.2 million of saved hours has not left the cost base. Debtor days did fall from 47 to 31, but a new late-payment penalty was introduced in the same term, and nobody separated the two effects. The recruitment figure attributes revenue to individual posts in a way that, if applied across all posts, would exceed the group's total revenue.",
     "The programme director's response is that benefits are real even when they do not appear as cost reduction, because released capacity is redeployed to higher-value work. Andalus has not measured what the released capacity was redeployed to."
    ],
    "exhibitTitle": "Exhibit 1 - Claimed benefits and objections",
    "exhibit": [
     [
      "Core reading",
      "Jeston, Chapter 21"
     ],
     [
      "Estimated time",
      "90 minutes self-paced (45 min case and reading, 30 min initial post, 15 min replies)"
     ],
     [
      "Outcomes evidenced",
      "K2, S1"
     ],
     [
      "Forum status",
      "Scheduled in the approved syllabus weekly plan"
     ]
    ],
    "questions": [
     "Evaluate each of the three benefit claims. For each, state whether it is real, overstated, unproven, or double-counted, and give your reasoning.",
     "The programme director argues released capacity is a genuine benefit even without headcount reduction. Assess that argument, and state the conditions under which it would be true.",
     "The Realize Value phase is meant to be designed at the start of a programme, not assembled at the end. Explain what Andalus should have put in place beforehand to make this dispute unnecessary."
    ],
    "lookFor": [
     {
      "claim": "Treats the admissions saving as unrealised unless capacity was redeployed to something measured or removed from cost",
      "because": ""
     },
     {
      "claim": "Identifies the fee-collection figure as confounded, and proposes how the two effects could have been separated",
      "because": ""
     },
     {
      "claim": "Rejects the recruitment attribution on the internal-consistency test the CFO applied",
      "because": ""
     },
     {
      "claim": "Concedes released capacity can be real, but only with a baseline, a redeployment target and measurement of it",
      "because": ""
     },
     {
      "claim": "Argues for benefit definition, baselining and ownership established before the programme starts",
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
       "text": "Evaluate each of the three benefit claims. For each, state whether it is real, overstated, unproven, or double-counted, and give your reasoning.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "The programme director argues released capacity is a genuine benefit even without headcount reduction. Assess that argument, and state the conditions under which it would be true.",
       "kind": "prose",
       "count": null,
       "options": []
      },
      {
       "text": "The Realize Value phase is meant to be designed at the start of a programme, not assembled at the end. Explain what Andalus should have put in place beforehand to make this dispute unnecessary.",
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
