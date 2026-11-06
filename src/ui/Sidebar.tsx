import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col w-full justify-center">
      <div className="lg:px-5 py-10 border-b border-gray-200 flex justify-center w-full">
        <img src="/readie-logo.svg" alt="readie logo" />
      </div>

      <div className="flex flex-col w-full items-start lg:px-5">
        <Link
          to="/jobs"
          className={`hover:bg-gray-100 block w-full py-4 px-2 lg:px-4 ${pathname === "/jobs" && "bg-gray-300"}`}>
          Jobs
        </Link>
        <Link
          to="#"
          className={`hover:bg-gray-100 block w-full py-4 px-2 lg:px-4 ${pathname === "#" && "bg-gray-300"}`}>
          Rooms
        </Link>
      </div>
    </div>
  );
}
