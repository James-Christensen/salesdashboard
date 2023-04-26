import React from "react";
import Link from "next/link";
import supabase from "../lib/supabaseClient";
//Supabase auth imports
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Navbar({ title }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  //function to sign out of Supabase auth.
  const signOut = async () => await supabase.auth.signOut();
  //handleClick funciton to confirm whether user wants to sign out. Confirmation handled by window.confirm.
  const handleSignOutClick = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      signOut();
    }
  };
  return (
    <nav className="navbar mb-6 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <Link href="/" className="text-lg font-bold text-primary-content">
            Sales Dashboard
          </Link>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className="btn m-1">
                Reports
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link
                  href="/"
                  className="btn btn-ghost text-primary-content btn-sm rounded-btn"
                >
                  APM Solutions
                </Link>
                <Link
                  href="/"
                  className="btn btn-ghost text-primary-content btn-sm rounded-btn"
                >
                  MIPS Solutions
                </Link>
                <Link
                  href="/"
                  className="btn btn-ghost text-primary-content btn-sm rounded-btn"
                >
                  All
                </Link>
              </ul>
            </div>
            <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className="btn m-1">
                Profile
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link
                  href="/"
                  className="btn btn-ghost text-primary-content btn-sm rounded-btn"
                >
                  My Profile
                </Link>
                <li>
                  <p
                    onClick={handleSignOutClick}
                    className="btn btn-ghost text-primary-content btn-sm rounded-btn"
                  >
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
