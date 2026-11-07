import { useRoomContext } from "../context/RoomContext";
import type { RoomRecording } from "../types/room";

interface RecordingListProps {
  recordings: RoomRecording[] | undefined;
}

export default function RecordingList({ recordings }: RecordingListProps) {
  const { activeRecording, setActiveRecording } = useRoomContext();

  return (
    <>
      <div className="lg:hidden">
        <h2 className="text-lg font-semibold text-gray-900">
          Recordings ({recordings?.length ?? 0})
        </h2>

        <p className="text-xs md:text-sm">
          Select a recording to view its transcript
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1 w-full mt-5 lg:flex lg:flex-col lg:gap-1 whitespace-nowrap">
        {recordings?.map((item, index) => (
          <button
            key={item.createdAt}
            type="button"
            onClick={() => setActiveRecording(index)}
            aria-pressed={activeRecording === index}
            className={`px-2 py-1.5 cursor-pointer text-left rounded-sm transition-colors ${
              activeRecording === index
                ? "bg-primary-400 text-primary-200"
                : "hover:bg-primary-300 hover:text-primary-200"
            }`}>
            Recording {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
