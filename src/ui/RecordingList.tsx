import { FiVideo } from "react-icons/fi";
import type { RoomRecording } from "../types/room";

export default function RecordingList({
  recordings,
  selectRecording,
  activeRecording,
}: {
  recordings: RoomRecording[] | undefined;
  selectRecording: (index: number) => void;
  activeRecording: number;
}) {
  if (!recordings?.length) {
    return (
      <p className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">
        No recordings are available for this room.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {recordings.map((recording, index) => {
        const isActive = activeRecording === index;
        const date = new Date(recording.createdAt);
        const dateLabel = Number.isNaN(date.getTime())
          ? "Date unavailable"
          : date.toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            });

        return (
          <button
            key={recording.createdAt}
            type="button"
            aria-pressed={isActive}
            onClick={() => selectRecording(index)}
            className={`flex w-full min-w-0 items-center gap-3 rounded-xl border p-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
              isActive
                ? "border-violet-200 bg-violet-50"
                : "border-transparent bg-slate-50 hover:border-slate-200 hover:bg-white"
            }`}>
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-lg ${
                isActive
                  ? "bg-primary-400 text-white"
                  : "bg-white text-slate-500"
              }`}>
              <FiVideo aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold text-slate-800">
                Recording {index + 1}
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-slate-500">
                {dateLabel}
              </span>
            </span>
            {isActive && (
              <span
                className="size-2 shrink-0 rounded-full bg-primary-400"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
