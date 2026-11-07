import { useParams } from "react-router-dom";
import { useRoomContext } from "../../context/RoomContext";
import RecordingList from "../../ui/RecordingList";
import Spinner from "../../ui/Spinner";
import TranscriptText from "../../ui/TranscriptText";
import useRoom from "./useRoom";

export default function Transcript() {
  const { activeRecording } = useRoomContext();
  console.log(activeRecording);

  const { roomId } = useParams();
  const { room, isLoading } = useRoom(roomId ?? "");

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full min-w-0">
      <div className="bg-white rounded-lg border border-gray-200 px-4 md:px-5 py-5 space-y-4 w-full min-w-0">
        {/* DESKTOP HEADINGS */}
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

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 lg:gap-10 lg:h-[50vh] min-w-0">
          {/* RECORDINGS LIST */}
          <div className="col-span-1 min-w-0 w-full lg:col-span-2 lg:overflow-y-auto scrollbar-none">
            <RecordingList recordings={room} />
          </div>

          {/* VIDEO */}
          <div className="col-span-1 min-w-0 w-full lg:col-span-4">
            <div className="bg-black rounded-lg overflow-hidden shadow-md w-full max-w-4xl mx-auto">
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
          <div className="col-span-1 min-w-0 w-full lg:col-span-3 lg:overflow-y-auto scrollbar-none">
            <TranscriptText room={room} activeRecording={activeRecording} />
          </div>
        </div>
      </div>
    </div>
  );
}
