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
      <h2 className="text-lg font-semibold text-gray-900">
        Recordings ({recordings?.length})
      </h2>
      <p className="text-xs md:text-sm">
        Select a recording to view its transcript
      </p>

      <div className="flex text-left gap-1 lg:flex-col flex-wrap mt-5">
        {recordings?.map((item: RoomRecording, index) => (
          <button
            key={index}
            onClick={() => selectRecording(index)}
            className={`px-2 py-1.5 lg:px-4 lg:py-2.5 cursor-pointer text-left ${activeRecording === index && "bg-primary-400 text-primary-200"} hover:bg-primary-300 hover:text-primary-200 rounded-sm`}>
            Recording {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
