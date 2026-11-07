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
  return (
    <>
      <div className="lg:hidden">
        <h2 className="text-lg font-semibold text-gray-900">
          Recordings ({recordings?.length})
        </h2>
        <p className="text-xs md:text-sm">
          Select a recording to view its transcript
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1 w-full mt-5 lg:flex lg:flex-col lg:gap-1 whitespace-nowrap">
        {recordings?.map((item: RoomRecording, index) => (
          <button
            key={item.createdAt}
            onClick={() => selectRecording(index)}
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
