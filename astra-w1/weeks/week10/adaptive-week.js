// OPER621 Business Process Management - Week 10
// Adaptive layer: mastery rules, CLOs, weekly outcomes, section mappings,
// and remedial micro-lessons.
//
// Topic: The People Phase - Framework Phase 6.
// Sources: OPER621 Week 10 Session 1 slides, Week 10 Delivery Plan,
// Jeston Chapter 18, and the Week 8 VoiceLearn structural reference.
// Running case: Qasr Hospitality Group - The Guest Host.
// Author: Prof. Bassem Jarboui
//
// OFFICIAL COURSE LEARNING OUTCOMES
// K3 - Assess the importance of change management in relation to BPM
//      and devise solutions to minimize employees' resistance.
// S3 - Coordinate people and the change process in organizations
//      to achieve BPM objectives.
//
// WEEKLY LEARNING OUTCOMES
// O1 - Assess the contribution of the People phase to delivering
//      process change.
// O2 - Design roles, measures and incentives aligned to the new process.
// O3 - Coordinate people through the change process to achieve
//      BPM objectives.
//
// PRIMARY CLO MAPPINGS
// O1: K3
// O2: S3
// O3: S3
//
// SUPPORTING CLO MAPPINGS
// O1: S3
// O2: K3
// O3: K3
//
// Each outcome retains one primary CLO in the runtime schema.
// O3 integrates K3 and S3, with S3 as its primary runtime mapping.
//
// LESSON AND SECTION MAPPINGS
//
// l1 - The design is not the work
//   W10O1a - A process redesign changes people's jobs
//   W10O1b - What the People phase must deliver
//   W10O1c - Who does the work, and who answers for it?
//
// l2 - The Guest Host's impossible job
//   W10O2a - Authority without ambiguity
//   W10O2b - When the old measure defeats the new design
//   W10O2c - Designing a role people can actually perform
//
// l3 - Capability is more than attendance
//   W10O3a - Training for judgement, not just buttons
//   W10O3b - One organisation, two processes
//   W10O3c - The knowledge the redesign might lose
//
// l4 - Making the people design real
//   W10O2d - Repairing the Guest Host specification
//   W10O3d - The eleven-week decision
//   W10O3e - The handover and the next phase
//
// RUNTIME SECTION KEYS
// W10O1a, W10O1b, W10O1c,
// W10O2a, W10O2b, W10O2c,
// W10O3a, W10O3b, W10O3c,
// W10O2d, W10O3d, W10O3e.
//
// The question bank is maintained separately in bank.js.
// Each section has exactly twelve bank items.
// The six question types are distributed evenly.
// Three questions are used for the initial section check.
// Three fresh questions are available for each of three remediation rounds.
//
// REMEDIAL MICRO-LESSONS
// Every section has exactly two remedial variants.
// Each variant uses a different explanatory angle and a fresh example.
// Remedial variants contain 230-360 spoken words.
// Every spoken sentence contains 6-30 words.
// Target average sentence length is 15-18 words.
// Narration uses warm, natural, connected speech.
// Avoid mechanical enumeration and disconnected spoken lists.
// Avoid the banned spoken patterns "first,", "second,", and "third,".
// Do not use arrows or bullet characters in narration.
// Every spoken line has the structure [sentence, moment].
// Null moments retain the previous visual.
// Introduce a meaningful new visual moment every 1-3 sentences.
// Use only existing MOMENT_KIT helpers and DIAG diagram types.
// Remedial explanations must not simply repeat the main lesson.
// Each variant must use a genuinely different teaching approach.
//
// WEEK 10 ACCURACY RULES
// Never contradict the Week 10 slides or delivery plan.
// Distinguish observed Qasr facts from proposed corrective actions.
// Qasr's observed kiosk adoption is 65% at week eleven.
// Desk-handled arrivals account for 29%.
// Do not classify every desk-handled arrival as a workaround.
// Nine of twenty-two Guest Hosts refer every rate discrepancy upward.
// Do not assume the individual reasons for their behaviour.
// Two Guest Hosts have resigned; their motives are not established.
// One pilot property has reinstated a permanent desk.
// Do not assume whether reinstatement protects or undermines the design.
// The AED 400 waiver is absent from formal delegation.
// The people workstream is green on induction attendance alone.
// Capability was not tested after induction.
// The sixteen-week adoption chart is illustrative, not Qasr history.
// Do not invent facts from the separate discussion forum case.
//
// REMEDIATION BEHAVIOUR
// Round 1 on a weak section plays variant 0.
// Round 2 plays variant 1.
// Subsequent rounds alternate between the two variants.
// Each remediation round uses three fresh questions per weak section.
//
// LOAD ORDER
// moments.js
// course.js
// adaptive-week.js
// bank.js
//
// The Week 10 course.js sections contain the two authored remedial
// micro-lessons in each section's review array.
//
// This file registers those existing remedial lessons in ADAPTIVE.review.
// It does not duplicate their narration or replace them with Week 9 content.
//
// The attached adaptive-week.js contains Week 9 material despite its
// description as the Week 8 reference. Its mastery configuration and
// runtime property names are preserved here.
 
(() => {
  const D = window.DIAG;
  const { t, it, q, st, iss, cmp, dg, fm } = window.MOMENT_KIT;
 
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
        name: "Assess the contribution of the People phase",
        full: "Assess the contribution of the People phase to delivering process change"
      },
      O2: {
        clo: "S3",
        name: "Design aligned roles, measures and incentives",
        full: "Design roles, measures and incentives aligned to the new process"
      },
      O3: {
        clo: "S3",
        name: "Coordinate people through process change",
        full: "Coordinate people through the change process to achieve BPM objectives"
      }
    },
 
    sections: {
      W10O1a: {
        lo: "O1",
        lesson: "l1",
        name: "A process redesign changes people's jobs"
      },
      W10O1b: {
        lo: "O1",
        lesson: "l1",
        name: "What the People phase must deliver"
      },
      W10O1c: {
        lo: "O1",
        lesson: "l1",
        name: "Who does the work, and who answers for it?"
      },
 
      W10O2a: {
        lo: "O2",
        lesson: "l2",
        name: "Authority without ambiguity"
      },
      W10O2b: {
        lo: "O2",
        lesson: "l2",
        name: "When the old measure defeats the new design"
      },
      W10O2c: {
        lo: "O2",
        lesson: "l2",
        name: "Designing a role people can actually perform"
      },
 
      W10O3a: {
        lo: "O3",
        lesson: "l3",
        name: "Training for judgement, not just buttons"
      },
      W10O3b: {
        lo: "O3",
        lesson: "l3",
        name: "One organisation, two processes"
      },
      W10O3c: {
        lo: "O3",
        lesson: "l3",
        name: "The knowledge the redesign might lose"
      },
 
      W10O2d: {
        lo: "O2",
        lesson: "l4",
        name: "Repairing the Guest Host specification"
      },
      W10O3d: {
        lo: "O3",
        lesson: "l4",
        name: "The eleven-week decision"
      },
      W10O3e: {
        lo: "O3",
        lesson: "l4",
        name: "The handover and the next phase"
      }
    },
 
    // Two remedial micro-lessons per section.
    // Each variant has its own explanatory angle and fresh example.
    // The runtime selects variants according to remediation round.
    //
    // Register the complete Week 10 remedial lessons already authored
    // in course.js rather than duplicating their narration here.
    //
    // Each entry is the original array of two complete remedial objects,
    // preserving their titles, [sentence, moment] pairs and visual helpers.
 
    review: (() => {
      const review = {};
 
      const course = window.COURSE;
 
      if (!course) {
        throw new Error(
          "Week 10 adaptive-week.js requires course.js to load first."
        );
      }
 
      const lessonIds = ["l1", "l2", "l3", "l4"];
 
      const sectionIds = [
        "W10O1a",
        "W10O1b",
        "W10O1c",
        "W10O2a",
        "W10O2b",
        "W10O2c",
        "W10O3a",
        "W10O3b",
        "W10O3c",
        "W10O2d",
        "W10O3d",
        "W10O3e"
      ];
 
      // Accept the Week 8-style lesson collection without changing
      // the authored lesson or section objects.
 
      const lessons = Array.isArray(course.lessons)
        ? course.lessons
        : lessonIds
            .map(id => course.lessons && course.lessons[id])
            .filter(Boolean);
 
      if (lessons.length !== 4) {
        throw new Error(
          "Week 10 requires four loaded lessons in course.js."
        );
      }
 
      const authoredSections = [];
 
      for (const lesson of lessons) {
        if (Array.isArray(lesson.parts)) {
          authoredSections.push(...lesson.parts);
        } else if (Array.isArray(lesson.sections)) {
          authoredSections.push(...lesson.sections);
        } else {
          throw new Error(
            "Week 10 lesson is missing its parts or sections collection."
          );
        }
      }
 
      for (const sectionId of sectionIds) {
        const section = authoredSections.find(
          part => part.sec === sectionId
        );
 
        if (!section) {
          throw new Error(
            "Missing Week 10 course section: " + sectionId
          );
        }
 
        if (
          !Array.isArray(section.review) ||
          section.review.length !== 2
        ) {
          throw new Error(
            "Section " + sectionId +
            " must contain exactly two remedial lessons."
          );
        }
 
        for (let i = 0; i < 2; i++) {
          const variant = section.review[i];
 
          if (
            !variant ||
            typeof variant.title !== "string" ||
            !Array.isArray(variant.lines) ||
            variant.lines.length === 0
          ) {
            throw new Error(
              "Invalid remedial variant " + i +
              " for section " + sectionId
            );
          }
 
          for (const line of variant.lines) {
            if (
              !Array.isArray(line) ||
              line.length !== 2 ||
              typeof line[0] !== "string"
            ) {
              throw new Error(
                "Invalid remedial narration line in " + sectionId
              );
            }
          }
        }
 
        review[sectionId] = section.review;
      }
 
      return review;
    })()
  };
})();
