import { useQuery } from "@tanstack/react-query";
import { getCampaign } from "../../services/api";

export default function useCampaign(campaignId: string) {
  const {
    data: campaign = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: () => getCampaign(campaignId),
  });

  return { campaign, isLoading, error };
}
