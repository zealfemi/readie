import type { RoomRecording } from "../types/room";

export default function TranscriptText({
  room,
  activeRecording,
}: {
  room: RoomRecording[] | undefined;
  activeRecording: number;
}) {
  return (
    <div className="space-y-4">
      <h2 className="lg:hidden text-lg font-semibold text-gray-900">
        Transcript Timeline
      </h2>

      {room?.at(activeRecording)?.analytic.deepfake_phase2.gemini.transcript
        .entries.length !== 0 ? (
        <div className="space-y-4 max-h-150 overflow-y-auto pr-2">
          {room
            ?.at(activeRecording)
            ?.analytic.deepfake_phase2.gemini.transcript.entries.map(
              (entry, index) => {
                const isCandidate =
                  entry.speaker === "INTERVIEWEE" ||
                  entry.speaker === "Candidate";
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      isCandidate
                        ? "bg-green-50/20 border-green-200 ml-4 md:ml-12"
                        : "bg-blue-50/20 border-blue-200 mr-4 md:mr-12"
                    }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.75 rounded ${
                          isCandidate
                            ? "bg-green-200 text-green-900"
                            : "bg-blue-200 text-blue-900"
                        } capitalize`}>
                        {entry.speaker}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">
                        {entry.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {entry.text}
                    </p>
                  </div>
                );
              },
            )}
        </div>
      ) : (
        <p>There are no transcript for this recording</p>
      )}
    </div>
  );
}
