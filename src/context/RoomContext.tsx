import { createContext, useContext, useState, type ReactNode } from "react";

type RoomContextType = {
  activeRecording: number;
  setActiveRecording: React.Dispatch<React.SetStateAction<number>>;
};

const RoomContext = createContext<RoomContextType | null>(null);

export default function RoomContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeRecording, setActiveRecording] = useState<number>(0);

  return (
    <RoomContext.Provider value={{ activeRecording, setActiveRecording }}>
      {children}
    </RoomContext.Provider>
  );
}

export function useRoomContext() {
  const context = useContext(RoomContext);

  if (!context) {
    throw new Error("Room context used outside of provider");
  }

  return context;
}
