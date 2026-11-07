import { FaExclamationCircle } from "react-icons/fa";
import { FaUsers, FaVideo } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import type { IdentityPhase1 } from "../../types/room";
import Spinner from "../../ui/Spinner";
import useRoom from "./useRoom";

export default function IdentityVerification() {
  const { roomId } = useParams();
  const { room, isLoading } = useRoom(roomId ?? "");

  if (isLoading) return <Spinner />;

  const recording: IdentityPhase1 | null | undefined =
    room?.at(0)?.analytic.identity_phase1;

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm">
        {recording ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  Identity Verification - Phase 1
                </h2>
                <span className="px-3.5 py-1 w-fit text-xs font-semibold rounded-full bg-amber-100 text-amber-800 capitalize">
                  {recording.decision?.toLowerCase() || "Inconclusive"}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="font-semibold text-slate-700">
                      Identity Confidence
                    </span>
                    <span className="font-bold text-slate-900">
                      {recording.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-300 h-2.5 rounded-full transition-all"
                      style={{ width: `${recording.confidence}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2.5 text-slate-600 font-medium">
                      <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                        <FaVideo className="text-xs" />
                      </div>
                      <span>Reference Video Quality</span>
                    </div>
                    <span className="font-semibold text-slate-900 capitalize">
                      {recording.referenceVideoQuality}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2.5 text-slate-600 font-medium">
                      <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                        <FaVideo className="text-xs" />
                      </div>
                      <span>Interview Video Quality</span>
                    </div>
                    <span className="font-semibold text-slate-900 capitalize">
                      {recording.interviewVideoQuality}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2.5 text-slate-600 font-medium">
                      <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                        <FaUsers className="text-xs" />
                      </div>
                      <span>Multiple People Detected</span>
                    </div>
                    <span className="font-semibold text-slate-900">
                      {recording.multiplePeopleDetected ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 text-sm mb-1.5">
                    Matching Evidence
                  </h4>
                  {recording.matchingEvidence.length === 0 ? (
                    <p className="text-xs text-slate-500">
                      No matching evidence returned.
                    </p>
                  ) : (
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                      {recording.matchingEvidence.map(
                        (item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ),
                      )}
                    </ul>
                  )}
                </div>

                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 text-sm mb-1.5">
                    Conflicting Evidence
                  </h4>
                  {recording.conflictingEvidence.length === 0 ? (
                    <p className="text-xs text-slate-500">
                      No conflicting evidence.
                    </p>
                  ) : (
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                      {recording.conflictingEvidence.map(
                        (item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ),
                      )}
                    </ul>
                  )}
                </div>
              </div>

              {recording.limitations && recording.limitations.length > 0 && (
                <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 flex gap-3 items-start">
                  <div className="p-1 text-amber-600 mt-0.5">
                    <FaExclamationCircle className="text-base" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <h5 className="font-bold text-amber-900 text-sm">
                      Assessment Limitation
                    </h5>
                    <div className="text-amber-800/90 leading-relaxed">
                      {recording.limitations.map((item: string, i: number) => (
                        <p key={i}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1 bg-indigo-50/40 rounded-2xl border border-indigo-100/70 p-6">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Summary</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Identity verification is{" "}
                  <span className="font-semibold text-slate-800">
                    {recording.decision?.toLowerCase() || "inconclusive"}
                  </span>{" "}
                  due to limited evidence. A human review is required.
                </p>
              </div>
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
