import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { FaDesktop, FaPlay, FaUser, FaWaveSquare } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import type { DeepfakePhase2 } from "../../types/room";
import useRoom from "./useRoom";

export default function IntegrityAudit() {
  const { roomId } = useParams();
  const { room } = useRoom(roomId ?? "");
  const recording: DeepfakePhase2 | null | undefined =
    room?.at(0)?.analytic.deepfake_phase2;
  const gemini = recording?.gemini;
  const disposition = recording?.disposition || "REVIEW_REQUIRED";
  const humanReviewRequired = recording?.humanReviewRequired ?? true;
  const specialistResults = recording?.specialistResults || [];
  const observations = recording?.gemini.syntheticVideo.observations;

  if (!gemini) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-gray-200 text-gray-500 text-sm">
        Integrity & Proctoring Audit data is unavailable for this room.
      </div>
    );
  }

  const getRiskBadge = (risk: string) => {
    switch (risk?.toUpperCase()) {
      case "LOW":
        return "bg-emerald-100 text-emerald-700";
      case "MEDIUM":
        return "bg-amber-100 text-amber-700";
      case "HIGH":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-emerald-50/90 via-green-50/50 to-emerald-50/30 border border-emerald-200/80 rounded-2xl p-4 md:p-5 flex items-center gap-3.5 shadow-sm">
        <div className="p-2.5 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-sm">
          <FaCheckCircle className="text-xl" />
        </div>
        <div>
          <h2 className="text-base md:text-lg font-bold text-emerald-950 flex items-center gap-2">
            Overall Risk:{" "}
            <span className="uppercase">{gemini.overallRisk}</span>
          </h2>
          <p className="text-xs md:text-sm text-emerald-800/80 font-medium">
            {humanReviewRequired
              ? "But requires human review"
              : "Passes automated verification threshold"}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="p-2 w-max bg-indigo-50 text-indigo-600 rounded-xl">
                <FaPlay className="text-xs" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-900 mb-1">
                  Synthetic Video
                </h4>
                <span
                  className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md ${getRiskBadge(gemini.syntheticVideo.risk)}`}>
                  {gemini.syntheticVideo.risk}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {Math.round((gemini.syntheticVideo.confidence || 0) * 100)}%
                confidence
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="p-2 w-max bg-indigo-50 text-indigo-600 rounded-xl">
                <FaUser className="text-xs" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-900 mb-1">
                  Person Continuity
                </h4>
                <span
                  className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md ${getRiskBadge(gemini.personContinuity.risk)}`}>
                  {gemini.personContinuity.risk}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {Math.round((gemini.personContinuity.confidence || 0) * 100)}%
                confidence
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="p-2 w-max bg-indigo-50 text-indigo-600 rounded-xl">
                <FaWaveSquare className="text-xs" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-900 mb-1">
                  Audio/Video
                </h4>
                <span
                  className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md ${getRiskBadge(gemini.audioVideoConsistency.risk)}`}>
                  {gemini.audioVideoConsistency.risk}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {Math.round(
                  (gemini.audioVideoConsistency.confidence || 0) * 100,
                )}
                % confidence
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="p-2 w-max bg-indigo-50 text-indigo-600 rounded-xl">
                <FaDesktop className="text-xs" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-900 mb-1">
                  Off-Screen Assistance
                </h4>
                <span
                  className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md ${getRiskBadge(gemini.possibleOffScreenAssistance.risk)}`}>
                  {gemini.possibleOffScreenAssistance.risk}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {Math.round(
                  (gemini.possibleOffScreenAssistance.confidence || 0) * 100,
                )}
                % confidence
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Key Observations
            </h3>

            <div className="space-y-3">
              {observations?.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No key observations recorded.
                </p>
              ) : (
                observations?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-4 text-xs py-2 border-b border-slate-100 last:border-0">
                    <div className="flex items-start gap-2.5">
                      <FaCheckCircle className="text-emerald-500 text-sm mt-0.5 shrink-0" />
                      <span className="text-slate-700 font-medium leading-relaxed">
                        {item.observation}
                      </span>
                    </div>
                    <span className="font-mono text-slate-400 text-[11px] shrink-0">
                      {item.timestamp}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 md:p-5 flex items-center gap-4">
            <div className="p-3 bg-amber-500 text-white rounded-xl shrink-0">
              <FaExclamationTriangle className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm md:text-base font-bold text-amber-950">
                Final Disposition: {disposition}
              </h4>
              <p className="text-xs text-amber-900/80 font-medium mt-0.5">
                Human review required: {humanReviewRequired ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-indigo-50/30 border border-indigo-100/80 rounded-2xl p-5 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900">
            Additional Info
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-slate-600 font-medium">
                Suspicious Time Ranges
              </span>
              <span className="font-bold text-slate-900">
                {gemini.suspiciousTimeRanges?.length || 0}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-slate-600 font-medium">
                Specialist Results
              </span>
              <span className="font-bold text-slate-900">
                {specialistResults.length}
              </span>
            </div>
          </div>

          <hr className="border-indigo-100" />

          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Limitations
            </h4>
            {gemini.limitations?.length === 0 ? (
              <p className="text-xs text-slate-500">No limitations reported.</p>
            ) : (
              <ul className="space-y-2">
                {gemini.limitations.map((limit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                    <span className="text-amber-500 font-bold text-base leading-none">
                      •
                    </span>
                    <span>{limit}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
