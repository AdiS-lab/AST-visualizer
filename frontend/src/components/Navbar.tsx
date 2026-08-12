import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-neutral-100/80 backdrop-blur-sm z-50">
      <div className="px-8 py-4 flex justify-between">
        <Link to="/" className="text-xl font-light text-neutral-900 no-underline hover:text-neutral-600 transition-colors">
          Home
        </Link>
        <Link to="/ast" className="text-xl font-light text-neutral-900 no-underline hover:text-neutral-600 transition-colors">
          AST
        </Link>
      </div>
    </nav>
  );
}
