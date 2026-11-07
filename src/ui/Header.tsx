import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center  px-5 py-5 lg:px-10 text-sm">
      <Link to="/">
        <img src="/readie-logo.svg" alt="readie logo" />
      </Link>
      <div className="flex w-full items-center justify-end ">
        <Link to="/jobs" className="hover:underline">
          Campaigns
        </Link>
      </div>
    </header>
  );
}
