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

  function selectRecording(RecordingIndex: number) {
    setActiveRecording(RecordingIndex);
  }

  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 px-4 md:px-5 py-5 space-y-4">
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
        <div className="grid lg:grid-cols-9 gap-10 lg:h-[70vh]">
          {/* RECORDINGS LIST */}
          <div className="col-span-2 lg:overflow-scroll scrollbar-none">
            <RecordingList
              recordings={room}
              selectRecording={selectRecording}
              activeRecording={activeRecording}
            />
          </div>

          {/* VIDEO */}
          <div className="col-span-4 place-self-center">
            <div className="bg-black rounded-lg overflow-hidden shadow-md max-w-4xl mx-auto">
              <video
                key={room?.at(activeRecording)?.finalUrl}
                controls
                className="w-full aspect-video">
                <source
                  src={room?.at(activeRecording)?.finalUrl}
                  type="video/mp4"
                />
                Your browser does not support HTML video playback.
              </video>
            </div>
          </div>

          {/* TRANSCRIPT */}
          <div className="col-span-3 lg:overflow-scroll scrollbar-none">
            <TranscriptText room={room} activeRecording={activeRecording} />
          </div>
        </div>
      </div>
    </div>
  );
}
