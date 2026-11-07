import { useParams } from "react-router-dom";
import type { IdentityPhase1 } from "../../types/room";
import Spinner from "../../ui/Spinner";
import useRoom from "./useRoom";
import { FaUsers, FaVideo } from "react-icons/fa6";

export default function IdentityVerification() {
  const { roomId } = useParams();
  const { room, isLoading } = useRoom(roomId ?? "");

  if (isLoading) return <Spinner />;

  const recording: IdentityPhase1 | null | undefined =
    room?.at(0)?.analytic.identity_phase1;

  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 px-4 md:px-5 py-5 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Identity Verification - Phase 1
        </h2>

        {recording ? (
          <div className="grid lg:grid-cols-6 gap-6">
            <div className="lg:col-span-4 p-4 border border-gray-300 rounded-lg bg-gray-50 space-y-5">
              <div className="text-sm font-medium text-gray-500">
                Biometric Decision
              </div>
              <div className="text-xl font-bold text-amber-700">
                {recording.decision}
              </div>

              <div>
                <div className="space-y-5">
                  <div className="flex justify-between text-xs text-gray-600 font-medium">
                    <span>Confidence Score</span>
                    <span>{recording.confidence}%</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-300 h-2.5 rounded-full transition-all"
                      style={{ width: `${recording.confidence}%` }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex w-full justify-between items-center gap-2">
                      <span className="flex items-center gap-2">
                        <FaVideo />
                        <p className="font-medium">Reference video quality</p>
                      </span>
                      <p>{recording.referenceVideoQuality}</p>
                    </div>
                    <div className="flex w-full justify-between items-center gap-2">
                      <span className="flex items-center gap-2">
                        <FaVideo />
                        <p className="font-medium">Interview video quality</p>
                      </span>
                      <p>{recording.interviewVideoQuality}</p>
                    </div>
                    <div className="flex w-full justify-between items-center gap-2">
                      <span className="flex items-center gap-2">
                        <FaUsers />
                        <p className="font-medium">Multiple people detected</p>
                      </span>
                      <p>{recording.multiplePeopleDetected ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="font-medium">Matching evidence</p>
                  <div>
                    {recording.matchingEvidence.length === 0 ? (
                      <p>No matching evidence</p>
                    ) : (
                      <ul>
                        {recording.matchingEvidence.map(
                          (item: string, index) => (
                            <li key={index}>{item}</li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Conflicting evidence</p>
                  <div>
                    {recording.conflictingEvidence.length === 0 ? (
                      <p>No conflicting evidence</p>
                    ) : (
                      <ul>
                        {recording.conflictingEvidence.map(
                          (item: string, index) => (
                            <li key={index}>{item}</li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 p-4 border border-gray-300 rounded-lg bg-gray-50 space-y-2">
              <div className="text-sm font-medium text-gray-500">
                Flagged Limitations
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {recording.limitations.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            Identity Phase 1 verification data is not available for this
            session.
          </p>
        )}
      </div>
    </div>
  );
}
