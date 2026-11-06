import { useParams } from "react-router-dom";
import useRoom from "./useRoom";
import Spinner from "../../ui/Spinner";

export default function Room() {
  const { roomId } = useParams();

  const { room, isLoading } = useRoom(roomId ?? "");

  if (isLoading) return <Spinner />;

  return <div>room</div>;
}
