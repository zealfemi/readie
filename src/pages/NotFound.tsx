import { FiArrowLeft, FiCompass } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-primary-800 px-5 py-10 text-slate-100 sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(125,76,255,0.18),transparent_42%),radial-gradient(ellipse_at_bottom_right,rgba(91,74,190,0.12),transparent_38%)]"
      />

      <section
        aria-labelledby="not-found-title"
        className="grid w-full max-w-5xl overflow-hidden rounded-4xl border border-white/10 bg-[#0d0d21]/90 shadow-2xl shadow-black/40 backdrop-blur md:grid-cols-[0.95fr_1.05fr]">
        <div className="relative flex min-h-72 items-center justify-center overflow-hidden border-b border-white/10 bg-linear-to-br from-violet-500/10 via-[#0d0d21] to-primary-600 p-8 sm:min-h-96 md:border-b-0 md:border-r">
          <div
            aria-hidden="true"
            className="absolute size-64 rounded-full border border-violet-200/10 sm:size-80"
          />
          <div
            aria-hidden="true"
            className="absolute size-48 rounded-full border border-dashed border-violet-200/15 sm:size-64"
          />
          <div
            aria-hidden="true"
            className="absolute size-36 rounded-full bg-primary-400/15 blur-3xl sm:size-48"
          />
          <div className="relative flex flex-col items-center text-center">
            <span className="mb-3 grid size-14 place-items-center rounded-2xl border border-violet-200/15 bg-violet-300/10 text-violet-200 shadow-lg shadow-violet-950/30">
              <FiCompass className="text-2xl" aria-hidden="true" />
            </span>
            <p className="select-none text-7xl font-bold tracking-[-0.08em] text-white sm:text-8xl">
              404
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-200/70">
              Off the map
            </p>
          </div>
          <span
            aria-hidden="true"
            className="absolute left-[18%] top-[22%] size-1.5 rounded-full bg-violet-200/80 shadow-[0_0_18px_rgba(196,181,253,0.9)]"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-[20%] right-[18%] size-2 rounded-full bg-primary-300 shadow-[0_0_18px_rgba(154,132,255,0.9)]"
          />
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <span className="mb-5 w-fit rounded-full border border-violet-300/15 bg-violet-300/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-200">
            Page not found
          </span>
          <h1
            id="not-found-title"
            className="max-w-md text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            Looks like this page wandered off.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
            The link may have changed, or the address may have been entered
            incorrectly. Head back to your campaigns and continue your review.
          </p>

          <Link
            to="/jobs"
            className="mt-8 inline-flex min-h-12 w-fit items-center gap-2.5 rounded-xl bg-primary-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d21]">
            <FiArrowLeft aria-hidden="true" />
            Back to campaigns
          </Link>

          <p className="mt-6 text-xs text-slate-500">
            If you typed the address, check it for spelling mistakes.
          </p>
        </div>
      </section>
    </main>
  );
}
