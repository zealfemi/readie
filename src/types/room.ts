export type RoomRecording = {
  roomName: string;
  recordingType: string;
  campaignId: number;
  updatedAt: string;
  databaseType: string;
  objectPath: string;
  egressId: string;
  participantIdentity: string | null;
  userId: number;
  finalUrl: string;
  status: string;
  attempts: number;
  lastError: string | null;
  campaignRecordId: number;
  nextCheckAt: string | null;
  createdAt: string;
  persistedAt: string | null;
  parsedCampaignId: string;
  extractedEmail: string;
  campaignAssessments: unknown[];
  analytic: RoomAnalytics;
  analyticsCompleted: "Y" | "N";
};

export type RoomAnalytics = {
  candidateId?: string;

  identity_phase1: IdentityPhase1 | null;

  deepfake_phase2: DeepfakePhase2;

  disposition: string;
  humanReviewRequired: boolean;
};

export type IdentityPhase1 = {
  decision: string;
  confidence: number;
  referenceVideoQuality: string;
  interviewVideoQuality: string;
  multiplePeopleDetected: boolean;
  matchingEvidence: string[];
  conflictingEvidence: string[];
  limitations: string[];
};

export type DeepfakePhase2 = {
  gemini: GeminiAnalysis;
  specialistResults: unknown[];
  disposition: string;
  humanReviewRequired: boolean;
};

export type GeminiAnalysis = {
  identityPhase1?: IdentityPhase1 | null;

  overallRisk: string;

  syntheticVideo: RiskAssessment;
  personContinuity: RiskAssessment;
  audioVideoConsistency: RiskAssessment;
  possibleOffScreenAssistance: RiskAssessment;

  suspiciousTimeRanges: unknown[];
  limitations: string[];

  transcript: Transcript;
};

export type RiskAssessment = {
  risk: string;
  confidence: number;
  observations: Observation[];
};

export type Observation = {
  timestamp: string;
  source: string;
  category: string;
  observation: string;
};

export type Transcript = {
  entries: TranscriptEntry[];
};

export type TranscriptEntry = {
  timestamp: string;
  speaker: string;
  text: string;
  videoUrl: string;
};
