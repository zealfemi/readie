import { useParams } from "react-router-dom";
import useRoom from "./useRoom";
import Spinner from "../../ui/Spinner";
import type { Transcript } from "../../types/room";
import { useState } from "react";
import RecordingList from "../../ui/RecordingList";
import TranscriptText from "../../ui/TranscriptText";

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
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div className="grid lg:grid-cols-9 gap-10 lg:h-[50vh]">
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
              <video controls className="w-full aspect-video">
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
