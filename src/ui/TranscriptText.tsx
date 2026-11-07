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
    <div className="flex min-w-0 flex-col">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Transcript
          </h2>
          <p className="mt-1 text-xs text-slate-500">Interview timeline</p>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
          {entries.length} lines
        </span>
      </div>

      {entries.length > 0 ? (
        <ol
          aria-label="Transcript entries"
          className="max-h-[65vh] space-y-2.5 overflow-y-auto pr-1">
          {entries.map((entry, index) => {
            const isCandidate = ["interviewee", "candidate"].includes(
              entry.speaker.toLowerCase(),
            );

            return (
              <li
                key={`${entry.timestamp}-${index}`}
                className={`rounded-xl border p-3 ${
                  isCandidate
                    ? "border-violet-100 bg-violet-50/70"
                    : "border-slate-200 bg-slate-50"
                }`}>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`min-w-0 truncate rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                      isCandidate
                      ? "bg-violet-100 text-violet-800"
                      : "bg-white text-slate-600"
                    }`}>
                    {entry.speaker}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] font-medium text-slate-500">
                    {entry.timestamp}
                  </span>
                </div>
                <p className="mt-2 break-words text-sm leading-6 text-slate-700">
                  {entry.text}
                </p>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-500">
          There is no transcript for this recording.
        </p>
      )}
    </div>
  );
}
