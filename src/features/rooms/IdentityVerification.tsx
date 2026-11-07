import { useParams } from "react-router-dom";
import { useRoomContext } from "../../context/RoomContext";
import useRoom from "./useRoom";
import Spinner from "../../ui/Spinner";
import type { IdentityPhase1 } from "../../types/room";

export default function IdentityVerification() {
  const { roomId } = useParams();
  const { room, isLoading } = useRoom(roomId ?? "");

  const { activeRecording } = useRoomContext();

  if (isLoading) return <Spinner />;

  const recording: IdentityPhase1 | null | undefined =
    room?.at(activeRecording)?.analytic.identity_phase1;

  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Identity Verification Summary
        </h2>

        {recording ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg bg-gray-50 space-y-3">
              <div className="text-sm font-medium text-gray-500">
                Biometric Decision
              </div>
              <div className="text-xl font-bold text-amber-700">
                {recording.decision}
              </div>

              {/* Confidence Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600 font-medium">
                  <span>Confidence Score</span>
                  <span>{recording.confidence * 100}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full transition-all"
                    style={{ width: `${recording.confidence * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50 space-y-2">
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
