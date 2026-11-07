import { useState } from "react";
import { FiClock, FiVideo } from "react-icons/fi";
import { useParams } from "react-router-dom";
import RecordingList from "../../ui/RecordingList";
import Spinner from "../../ui/Spinner";
import TranscriptText from "../../ui/TranscriptText";
import useRoom from "./useRoom";

export default function Transcript() {
  const [activeRecording, setActiveRecording] = useState<number>(0);
  const { roomId } = useParams();
  const { room, isLoading } = useRoom(roomId ?? "");

  if (isLoading) return <Spinner />;

  function selectRecording(recordingIndex: number) {
    setActiveRecording(recordingIndex);
  }

  const currentRecording = room?.at(activeRecording);
  const recordingUrl = currentRecording?.finalUrl;
  const recordingDate = currentRecording?.createdAt
    ? new Date(currentRecording.createdAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Date unavailable";

  return (
    <div className="grid min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-[200px_minmax(0,1.25fr)_minmax(260px,1fr)] lg:gap-5">
      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-900">
              Recordings
            </h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {room?.length ?? 0}
            </span>
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Choose a recording to review.
          </p>
        </div>
        <div className="max-h-[65vh] overflow-y-auto overflow-scroll scrollbar-none pr-1">
          <RecordingList
            recordings={room}
            selectRecording={selectRecording}
            activeRecording={activeRecording}
          />
        </div>
      </section>

      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Video preview
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Recording {room?.length ? activeRecording + 1 : 0} of{" "}
              {room?.length ?? 0}
            </p>
          </div>
          {currentRecording?.recordingType && (
            <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-500">
              {currentRecording.recordingType}
            </span>
          )}
        </div>

        {recordingUrl ? (
          <div className="overflow-hidden rounded-xl bg-slate-950 shadow-inner">
            <video
              key={recordingUrl}
              controls
              preload="metadata"
              className="aspect-video w-full bg-black">
              <source src={recordingUrl} type="video/mp4" />
              Your browser does not support HTML video playback.
            </video>
          </div>
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center rounded-xl bg-slate-950 p-6 text-center text-white/80 shadow-inner">
            <span className="mb-3 grid size-11 place-items-center rounded-full bg-white/10 text-white">
              <FiVideo className="text-xl" aria-hidden="true" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Offline demo
            </p>
            <p className="mt-2 max-w-xs text-sm leading-6">
              Video files are not included in the mock data.
            </p>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <FiClock className="shrink-0 text-primary-400" aria-hidden="true" />
          <span>Recorded {recordingDate}</span>
        </div>
      </section>

      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <TranscriptText room={room} activeRecording={activeRecording} />
      </section>
    </div>
  );
}
