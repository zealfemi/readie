import { useQuery } from "@tanstack/react-query";
import { getRoomEvaluation } from "../../services/api";

export default function useRoom(roomId: string) {
  const {
    data: room,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoomEvaluation(roomId),
  });

  return { room, isLoading, error };
}
