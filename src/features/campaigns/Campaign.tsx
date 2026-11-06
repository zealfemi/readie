import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { campaignType } from "../../types/campaign";
import Candidates from "../../ui/Candidates";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import TableOperations from "../../ui/TableOperations";
import useCampaign from "./useCampaign";

export default function Campaign() {
  const [emailSearch, setEmailSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { campaignId } = useParams();
  const [searchParams] = useSearchParams();

  const { campaign, isLoading } = useCampaign(campaignId ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(emailSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [emailSearch]);

  if (isLoading) return <Spinner />;

  // FILTER
  const filtered = searchParams.get("status") || "all";

  const filteredCandidates = campaign.filter((candidate) => {
    const isCompleted = candidate.analyticsCompleted === true;

    const progress = Number(candidate.percentageAnalyticCompleted ?? 0);

    switch (filtered) {
      case "completed":
        return isCompleted;

      case "in-progress":
        return !isCompleted && progress > 0;

      case "failed":
        return !isCompleted && progress <= 0;

      default:
        return true;
    }
  });

  // SORTING
  const sortBy = searchParams.get("sortBy") || "candidateDateCreated-desc";

  const [, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    const dateA = new Date(a.candidateDateCreated).getTime();
    const dateB = new Date(b.candidateDateCreated).getTime();

    return (dateA - dateB) * modifier;
  });

  // SEARCH
  const searchedCandidates = sortedCandidates?.filter(
    (candidate: campaignType) =>
      candidate.candidateEmail
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()),
  );

  const filteredResults = searchedCandidates;

  return (
    <div>
      <div className="mb-5 lg:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <h1 className="font-bold text-2xl">Campaign {campaignId}</h1>

          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            <div>
              <input
                type="text"
                name="email"
                value={emailSearch}
                onChange={(e) => setEmailSearch(e.target.value)}
                placeholder="Search email"
                className="bg-white border border-gray-300 py-1.5 px-2 w-full lg:min-w-80 rounded-md"
              />
            </div>
            <TableOperations />
          </div>
        </div>
      </div>

      {filteredResults?.length ? (
        <div className="bg-white">
          <Candidates campaign={filteredResults} />
        </div>
      ) : (
        <Empty resourceName="candidate" />
      )}
    </div>
  );
}
