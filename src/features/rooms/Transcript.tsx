import { useState } from "react";
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

  const recordingUrl = room?.at(activeRecording)?.finalUrl;

  return (
    <div className="w-full min-w-0">
      <div className="bg-white rounded-lg border border-gray-200 px-4 md:px-5 py-5 space-y-4 w-full min-w-0">
        <div className="hidden mb-5 lg:grid lg:grid-cols-9 gap-10">
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Recordings ({room?.length})
            </h2>
            <p className="text-xs md:text-sm">
              Select a recording to view its transcript
            </p>
          </div>

          <div className="col-span-4"></div>

          <div className="col-span-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Transcript Timeline
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 lg:gap-10 lg:h-[50vh] min-w-0">
          <div className="col-span-1 min-w-0 w-full lg:col-span-2 lg:overflow-y-auto scrollbar-none">
            <RecordingList
              recordings={room}
              selectRecording={selectRecording}
              activeRecording={activeRecording}
            />
          </div>

          <div className="col-span-1 min-w-0 w-full lg:col-span-4">
            {recordingUrl ? (
              <div className="bg-black rounded-lg overflow-hidden shadow-md w-full max-w-4xl mx-auto">
                <video
                  key={recordingUrl}
                  controls
                  className="w-full aspect-video">
                  <source src={recordingUrl} type="video/mp4" />
                  Your browser does not support HTML video playback.
                </video>
              </div>
            ) : (
              <div className="bg-slate-950 text-white/80 rounded-lg shadow-md w-full aspect-video flex items-center justify-center p-6 text-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                    Offline demo
                  </p>
                  <p className="mt-2 text-sm">
                    Video files are not included in the mock data.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-1 min-w-0 w-full lg:col-span-3 lg:overflow-y-auto scrollbar-none">
            <TranscriptText room={room} activeRecording={activeRecording} />
          </div>
        </div>
      </div>
    </div>
  );
}
