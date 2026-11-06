import { Link } from "react-router-dom";

export default function CampaignsList() {
  return (
    <div className="bg-white">
      <ul className="border border-gray-200 rounded-md overflow-hidden">
        <li className="font-semibold w-full border-t border-gray-200 hover:bg-gray-100">
          <Link to="campaign/119" className="block w-full py-5 px-4 lg:px-6">
            Campaign 119
          </Link>
        </li>
        <li className="font-semibold w-full border-t border-gray-200 hover:bg-gray-100">
          <Link to="campaign/120" className="block w-full py-5 px-4 lg:px-6">
            Campaign 120
          </Link>
        </li>
        <li className="font-semibold w-full border-t border-gray-200 hover:bg-gray-100">
          <Link to="campaign/122" className="block w-full py-5 px-4 lg:px-6">
            Campaign 122
          </Link>
        </li>
        <li className="font-semibold w-full border-t border-gray-200 hover:bg-gray-100">
          <Link to="campaign/123" className="block w-full py-5 px-4 lg:px-6">
            Campaign 123
          </Link>
        </li>
      </ul>
    </div>
  );
}
