import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  const { campaign, isLoading } = useCampaign(campaignId ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(emailSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [emailSearch]);

  if (isLoading) return <Spinner />;

  const filteredCandidates = campaign.filter((candidate: campaignType) =>
    candidate.candidateEmail
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase()),
  );

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
                className="border border-gray-400 py-1.5 px-2 w-full rounded-md"
              />
            </div>
            <TableOperations />
          </div>
        </div>
      </div>

      {filteredCandidates.length ? (
        <div className="bg-white">
          <Candidates campaign={filteredCandidates} />
        </div>
      ) : (
        <Empty resourceName="candidate" />
      )}
    </div>
  );
}
