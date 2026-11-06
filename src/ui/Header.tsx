import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center  px-5 py-5 lg:px-10 text-sm">
      <Link to="/">
        <img src="/readie-logo.svg" alt="readie logo" />
      </Link>
      <div className="flex gap-3 w-full items-center justify-end">
        <p>Log In</p>|<p>Sign Up</p>
      </div>
    </header>
  );
}
