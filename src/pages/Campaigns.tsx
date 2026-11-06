import CampaignsList from "../ui/CampaignsList";

export default function Campaigns() {
  return (
    <div>
      <div className="mb-5 lg:mb-10">
        <h1 className="text-2xl font-bold">All Campaigns</h1>
      </div>

      <CampaignsList />
    </div>
  );
}
