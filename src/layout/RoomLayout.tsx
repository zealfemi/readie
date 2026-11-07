import {
  FiAlertCircle,
  FiCheckCircle,
  FiChevronRight,
  FiFileText,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import useRoom from "../features/rooms/useRoom";
import Spinner from "../ui/Spinner";

const roomTabs = [
  { id: "transcript", label: "Transcript", Icon: FiFileText },
  { id: "identity-verification", label: "Identity Verification", Icon: FiUser },
  { id: "integrity-audit", label: "Integrity Audit", Icon: FiShield },
];

export default function RoomLayout() {
  const { roomId } = useParams();
  const { room, isLoading } = useRoom(roomId ?? "");
  const { pathname } = useLocation();
  const currentLink = pathname.split("/").at(4) ?? "transcript";

  if (isLoading) return <Spinner />;

  const roomRecord = room?.at(0);
  const userEmail = roomRecord?.roomName.split("~~").at(1);
  const campaignId = roomRecord?.campaignId;
  const candidateId =
    roomRecord?.analytic.candidateId ?? String(roomRecord?.userId ?? "");
  const disposition = roomRecord?.analytic.disposition ?? "REVIEW_REQUIRED";
  const isPassed = disposition === "PASS_WITH_LOW_RISK";
  const isFailed = disposition.toUpperCase().includes("FAIL");
  const StatusIcon = isPassed ? FiCheckCircle : FiAlertCircle;
  const statusColor = isPassed
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : isFailed
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-amber-200 bg-amber-50 text-amber-700";

  return (
    <div className="space-y-4 lg:space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
              <Link
                to={campaignId ? `/jobs/campaign/${campaignId}` : "/jobs"}
                className="font-medium transition hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
                {campaignId ? `Campaign ${campaignId}` : "Campaigns"}
              </Link>
              <FiChevronRight className="shrink-0 text-xs" aria-hidden="true" />
              <span className="text-slate-700">Room review</span>
            </div>

            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-50 text-primary-400 sm:size-12">
                <FiUser className="text-xl" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-500">
                  Interview room
                </p>
                <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  Candidate {candidateId}
                </h1>
                <p className="mt-1 break-all text-sm text-slate-500">
                  {userEmail ?? "Candidate information unavailable"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
              {room?.length ?? 0} recordings
            </span>
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase ${statusColor}`}>
              <StatusIcon aria-hidden="true" />
              {disposition.replace(/_/g, " ")}
            </span>
          </div>
        </div>
      </section>

      <nav
        aria-label="Room review sections"
        className="grid grid-cols-3 gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
        {roomTabs.map(({ id, label, Icon }) => {
          const isActive = currentLink === id;

          return (
            <Link
              key={id}
              to={id}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-center text-[11px] font-semibold transition sm:flex-row sm:gap-2 sm:text-sm ${
                isActive
                  ? "bg-primary-400 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}>
              <Icon className="shrink-0 text-base" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <Outlet />
    </div>
  );
}
