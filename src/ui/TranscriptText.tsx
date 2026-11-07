import type { RoomRecording } from "../types/room";

export default function TranscriptText({
  room,
  activeRecording,
}: {
  room: RoomRecording[] | undefined;
  activeRecording: number;
}) {
  const entries =
    room?.at(activeRecording)?.analytic.deepfake_phase2.gemini.transcript
      .entries ?? [];

  return (
    <div className="w-full min-w-0 space-y-4">
      <h2 className="lg:hidden text-lg font-semibold text-gray-900">
        Transcript Timeline
      </h2>

      {entries.length > 0 ? (
        <div className="flex flex-col gap-3 w-full min-w-0 max-h-150 overflow-y-auto overflow-x-hidden scrollbar-none">
          {entries.map((entry, index) => {
            const isCandidate = [
              "interviewee",
              "candidate",
              "participant",
            ].includes(entry.speaker.toLowerCase());

            return (
              <div
                key={`${entry.timestamp}-${index}`}
                className={`p-3 sm:p-4 rounded-lg border w-[90%] min-w-0 ${
                  isCandidate
                    ? "bg-green-50/20 border-green-200 self-end"
                    : "bg-blue-50/20 border-blue-200 self-start"
                }`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      isCandidate
                        ? "bg-green-200 text-green-900"
                        : "bg-blue-200 text-blue-900"
                    } uppercase`}>
                    {entry.speaker}
                  </span>

                  <span className="text-xs text-gray-500 font-mono shrink-0">
                    {entry.timestamp}
                  </span>
                </div>

                <p className="text-sm text-gray-800 leading-relaxed break-words">
                  {entry.text}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>There are no transcripts for this recording.</p>
      )}
    </div>
  );
}
