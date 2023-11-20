import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-slate-200">
      <div className="flex  justify-between items-center mx-auto p-3 max-w-6xl">
        <Link to="/">
          <h1 className="text-black font-bold text-xl">Auth App</h1>
        </Link>
        <ul className="flex flex-row gap-4 font-semibold text-black text-lg cursor-pointer">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/sign-in">
            <li>Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
