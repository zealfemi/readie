import { FiArrowUpRight, FiBriefcase } from "react-icons/fi";
import { Link } from "react-router-dom";

const campaigns = [119, 120, 122, 123];

export default function CampaignsList() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
      {campaigns.map((campaignId) => (
        <li key={campaignId}>
          <Link
            to={`campaign/${campaignId}`}
            className="group flex min-h-52 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-11 place-items-center rounded-xl bg-violet-50 text-primary-400">
                <FiBriefcase className="text-xl" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Hiring campaign
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                Campaign {campaignId}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Review candidate submissions and interview results.
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
              <span className="font-semibold text-primary-500">
                View candidates
              </span>
              <FiArrowUpRight className="text-lg text-primary-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
