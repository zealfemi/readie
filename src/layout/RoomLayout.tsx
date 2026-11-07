import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import useRoom from "../features/rooms/useRoom";
import Spinner from "../ui/Spinner";

export default function RoomLayout() {
  const { roomId } = useParams();
  const { room, isLoading } = useRoom(roomId ?? "");
  const { pathname } = useLocation();
  const currentLink = pathname.split("/").at(4) ?? "transcript";

  if (isLoading) return <Spinner />;

  const userEmail = room?.at(0)?.roomName.split("~~").at(1);
  const campaignId = room?.at(0)?.campaignId;

  return (
    <div>
      <div className="mb-5 lg:mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Link
                to={`/jobs/campaign/${campaignId}`}
                className="underline hover:cursor-pointer">
                Campaign
              </Link>
              <span>/</span>
              <span>Room Evaluation</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 break-all">
              {userEmail}
            </h1>
          </div>

          <div className="">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                room?.at(0)?.analytic.disposition === "PASS_WITH_LOW_RISK"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-amber-100 text-amber-800 border border-amber-300"
              }`}>
              {room?.at(0)?.analytic.disposition.replace(/_/g, " ")}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 lg:gap-10 lg:flex w-full lg:w-fit text-center place-items-start mb-5 lg:mb-10">
        <Link
          to="transcript"
          className={`px-4 py-2 ${currentLink === "transcript" && "border-b-2"} border-primary-400 transition-all duration-50 ease-in-out h-full w-full lg:whitespace-nowrap`}>
          Transcript
        </Link>
        <Link
          to="identity-verification"
          className={`px-4 py-2 ${currentLink === "identity-verification" && "border-b-2"} border-primary-400 transition-all duration-50 ease-in-out h-full w-full lg:whitespace-nowrap`}>
          Identity Verification
        </Link>
        <Link
          to="integrity-audit"
          className={`px-4 py-2 ${currentLink === "integrity-audit" && "border-b-2"} border-primary-400 transition-all duration-50 ease-in-out h-full w-full lg:whitespace-nowrap`}>
          Integrity Audit
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
