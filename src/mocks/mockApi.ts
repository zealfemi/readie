import type { campaignType } from "../types/campaign";
import type {
  IdentityPhase1,
  RoomRecording,
  RoomAnalytics,
} from "../types/room";

const CAMPAIGN_IDS = [119, 120, 122, 123] as const;

const candidateSeed = [
  {
    id: "100",
    name: "Candidate 100",
    email: "candidate100@example.test",
    completed: true,
    progress: 100,
  },
  {
    id: "101",
    name: "Candidate 101",
    email: "candidate101@example.test",
    completed: false,
    progress: 62,
  },
  {
    id: "102",
    name: "Candidate 102",
    email: "candidate102@example.test",
    completed: false,
    progress: 0,
  },
] as const;

function makeRoomName(campaignId: number, candidateId: string, email: string) {
  return `campaign_${campaignId}interview~~${email}~~mock${campaignId}${candidateId}`;
}

function makeCandidate(
  campaignId: number,
  candidate: (typeof candidateSeed)[number],
  index: number,
): campaignType {
  const createdAt = new Date(Date.UTC(2026, 10, 3, 17 + index, 20)).toISOString();
  const userId = Number(candidate.id);
  const pctCorrect = candidate.completed ? 82 : candidate.progress ? 50 : 0;

  return {
    roomName: makeRoomName(campaignId, candidate.id, candidate.email),
    campaignId,
    userId,
    analyticsCompleted: candidate.completed,
    candidateUserId: userId,
    candidateId: candidate.id,
    candidateName: candidate.name,
    candidateEmail: candidate.email,
    candidateDateCreated: createdAt,
    campaignJobTitle: "Frontend Developer",
    percentageAnalyticCompleted: candidate.progress,
    campaign_assessment_video_link: [
      {
        created_at: createdAt,
        video_url_link: "",
        userId: String(userId),
        streakId: campaignId * 100 + userId,
        profileAvatar: null,
        userName: candidate.name,
        userEmail: candidate.email,
        totalQuestions: 8,
        correctCount: Math.round((pctCorrect / 100) * 8),
        wrongCount: candidate.completed ? 1 : 2,
        unansweredCount: candidate.completed ? 0 : 8 - Math.round((pctCorrect / 100) * 8) - 2,
        pctCorrect,
        created_date: "2026-11-03",
        created_time: `${String(17 + index).padStart(2, "0")}:20`,
        totalActivityCount: 3,
        activityCountsByType: JSON.stringify({ answer: 8, review: 2, pause: 1 }),
        invigilatorVideoUrlLink: "",
      },
    ],
  };
}

const mockCampaigns: Record<number, campaignType[]> = Object.fromEntries(
  CAMPAIGN_IDS.map((campaignId) => [
    campaignId,
    candidateSeed.map((candidate, index) =>
      makeCandidate(campaignId, candidate, index),
    ),
  ]),
) as Record<number, campaignType[]>;

const identityPhase1: IdentityPhase1 = {
  decision: "INCONCLUSIVE",
  confidence: 0,
  referenceVideoQuality: "UNKNOWN",
  interviewVideoQuality: "UNKNOWN",
  multiplePeopleDetected: false,
  matchingEvidence: [],
  conflictingEvidence: [],
  limitations: [
    "Campaign assessment video unavailable; human identity review required.",
  ],
};

const transcriptSamples = [
  "I broke the page into smaller sections and reusable components.",
  "I check the response first, then show the loading, success, or error state.",
  "I used AI to explore a solution and reviewed the result before adding it.",
  "I tested the layout on a narrow screen before checking the desktop view.",
  "The API response can grow, so I would keep the fields the page needs stable.",
  "I would show a clear message if the request failed and let the user retry.",
  "I grouped similar cards together so the page is easier to maintain.",
  "I would check the network request and then trace the value through the component.",
  "The video stays low risk, but identity still needs a person to review it.",
  "I would keep the first content visible while the rest of the page loads.",
  "I tried the interaction again after fixing the validation issue.",
  "That is how I would explain the decision and the evidence behind it.",
] as const;

function formatTimestamp(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function makeTranscript(index: number) {
  const offset = index * 4;
  return [
    {
      timestamp: "00:00",
      speaker: "INTERVIEWEE",
      text: transcriptSamples[index],
      videoUrl: "",
    },
    {
      timestamp: formatTimestamp(offset + 26),
      speaker: "INTERVIEWER",
      text: "Could you walk me through how you checked that?",
      videoUrl: "",
    },
    {
      timestamp: formatTimestamp(offset + 37),
      speaker: "INTERVIEWEE",
      text: "I checked the output and corrected it before moving on.",
      videoUrl: "",
    },
  ];
}

function makeRoomAnalytics(candidateId: string, transcriptIndex: number): RoomAnalytics {
  return {
    candidateId,
    identity_phase1: { ...identityPhase1 },
    deepfake_phase2: {
      gemini: {
        identityPhase1: { ...identityPhase1 },
        overallRisk: "LOW",
        syntheticVideo: {
          risk: "LOW",
          confidence: 0.68,
          observations: [
            {
              timestamp: "00:00",
              source: "GEMINI",
              category: "SYNTHETIC_VIDEO",
              observation:
                "Natural facial expressions, consistent skin textures, and normal head motions observed throughout.",
            },
          ],
        },
        personContinuity: {
          risk: "LOW",
          confidence: 0.72,
          observations: [
            {
              timestamp: "00:00",
              source: "GEMINI",
              category: "PERSON_CONTINUITY",
              observation:
                "Candidate remains visible in frame with persistent visual identity.",
            },
          ],
        },
        audioVideoConsistency: {
          risk: "LOW",
          confidence: 0.7,
          observations: [
            {
              timestamp: "00:10",
              source: "GEMINI",
              category: "AUDIO_VIDEO",
              observation:
                "Candidate lip motion aligns consistently with spoken dialogue.",
            },
          ],
        },
        possibleOffScreenAssistance: {
          risk: "LOW",
          confidence: 0.65,
          observations: [
            {
              timestamp: "01:30",
              source: "GEMINI",
              category: "OFF_SCREEN_ACTIVITY",
              observation:
                "Candidate looks down briefly to navigate the interface and share project links.",
            },
          ],
        },
        suspiciousTimeRanges: [],
        limitations: [
          "One interviewer tile has low lighting and intermittent camera movement.",
          "Standard web platform video compression artifacts are present.",
        ],
        transcript: { entries: makeTranscript(transcriptIndex) },
      },
      specialistResults: [],
      disposition: "REVIEW_REQUIRED",
      humanReviewRequired: true,
    },
    disposition: "REVIEW_REQUIRED",
    humanReviewRequired: true,
  };
}

function makeRoomRecordings(
  roomName: string,
  campaignId: number,
  candidateId: string,
): RoomRecording[] {
  const firstCreatedAt = Date.UTC(2026, 10, 3, 17, 0, 0);

  return transcriptSamples.map((_, index) => {
    const createdAt = new Date(firstCreatedAt + index * 4 * 60_000).toISOString();
    const userId = Number(candidateId);

    return {
      roomName,
      recordingType: "COMPOSITE",
      campaignId,
      updatedAt: "2026-11-06T00:39:19.835Z",
      databaseType: "CAMPAIGN_COMPOSITE_INTERVIEW",
      objectPath: "",
      egressId: `MOCK-EGRESS-${String(index + 1).padStart(3, "0")}`,
      participantIdentity: null,
      userId,
      finalUrl: "",
      status: "PERSISTED",
      attempts: 0,
      lastError: null,
      campaignRecordId: campaignId * 1000 + userId + index,
      nextCheckAt: null,
      createdAt,
      persistedAt: createdAt,
      parsedCampaignId: String(campaignId),
      extractedEmail: `candidate${candidateId}@example.test`,
      campaignAssessments: [],
      analytic: makeRoomAnalytics(candidateId, index),
      analyticsCompleted: "Y",
    };
  });
}

const mockLatency = (milliseconds = 180) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

export async function getMockCampaign(campaignId: string): Promise<campaignType[]> {
  await mockLatency();
  return (mockCampaigns[Number(campaignId)] ?? []).map((candidate) => ({
    ...candidate,
    campaign_assessment_video_link: candidate.campaign_assessment_video_link.map(
      (assessment) => ({ ...assessment }),
    ) as campaignType["campaign_assessment_video_link"],
  }));
}

export async function getMockRoomEvaluation(
  roomName: string,
): Promise<RoomRecording[]> {
  await mockLatency();

  const candidate = Object.values(mockCampaigns)
    .flat()
    .find((item) => item.roomName === roomName);

  if (!candidate) return [];

  return makeRoomRecordings(
    candidate.roomName,
    candidate.campaignId,
    candidate.candidateId,
  );
}
