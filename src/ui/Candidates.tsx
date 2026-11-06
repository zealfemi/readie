import { useNavigate } from "react-router-dom";
import type { campaignType } from "../types/campaign";

export default function Candidates({ campaign }: { campaign: campaignType[] }) {
  const navigate = useNavigate();

  function checkComplete(
    analyticsCompleted: boolean,
    percentageCompleted: number,
  ) {
    if (analyticsCompleted) return "completed";
    if (percentageCompleted > 0) return "in progress";
    return "failed";
  }

  return (
    <div className="w-full border border-gray-300 rounded-md overflow-x-auto">
      <table className="w-full min-w-225 table-fixed">
        <thead className="font-semibold text-left">
          <tr>
            <th className="py-4 px-4 lg:py-5 lg:px-6">Candidate</th>
            <th className="py-4 px-4 lg:py-5 lg:px-6">Room Identifier</th>
            <th className="py-4 px-4 lg:py-5 lg:px-6">Submission Timestamp</th>
            <th className="py-4 px-4 lg:py-5 lg:px-6">Verification Status</th>
          </tr>
        </thead>

        <tbody>
          {campaign.map((candidate: campaignType) => (
            <tr
              key={candidate.roomName}
              onClick={() =>
                navigate(`/jobs/room/${encodeURIComponent(candidate.roomName)}`)
              }
              className="border-t border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors">
              <td className="py-2.5 px-4 lg:py-4 lg:px-6">
                <p className="font-medium capitalize">
                  {candidate.candidateName}
                </p>
                <p className="text-[13px] lg:text-sm text-gray-600">
                  {candidate.candidateEmail}
                </p>
              </td>
              <td className="py-2.5 px-4 lg:py-4 lg:px-6 truncate">
                {candidate.roomName}
              </td>
              <td className="py-2.5 px-4 lg:py-4 lg:px-6 truncate">
                {new Date(candidate.candidateDateCreated).toLocaleString()}
              </td>
              <td className="py-2.5 px-4 lg:py-4 lg:px-6 truncate uppercase font-semibold">
                {checkComplete(
                  candidate?.analyticsCompleted,
                  candidate?.percentageAnalyticCompleted,
                ) === "completed" && (
                  <span className="bg-green-600 px-2 py-1.5 text-xs rounded-sm text-primary-200">
                    Completed
                  </span>
                )}
                {checkComplete(
                  candidate?.analyticsCompleted,
                  candidate?.percentageAnalyticCompleted,
                ) === "failed" && (
                  <span className="bg-red-600 px-2 py-1.5 text-xs rounded-sm text-primary-200">
                    Failed
                  </span>
                )}
                {checkComplete(
                  candidate?.analyticsCompleted,
                  candidate?.percentageAnalyticCompleted,
                ) === "in progress" && (
                  <span className="bg-yellow-600 px-2 py-1.5 text-xs rounded-sm text-primary-200">
                    In Progress
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className="text-xs border-gray-200 border-t">
          <tr>
            <td colSpan={4} className="pt-4 pb-4 px-4 lg:px-6">
              Total Candidate(s): {campaign.length}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
