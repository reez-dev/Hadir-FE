"use client";
import {
  faDatabase,
  faHome,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import { logout } from "@/action/dashboard/logout_action";
import RsCard from "@/components/atom/card";
import CardVariant from "@/core/types/card_variant_enum";
import RequestState from "@/core/types/request_state";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../../lib/features/dashboard/dashboard_slice";
import { AppDispatch, RootState } from "../../../lib/store";

export default function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEcommerceDropdownOpen, setIsEcommerceDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dashboard = useSelector((state: RootState) => state.dashboard);
  const dispatch: AppDispatch = useDispatch();
  const data = dashboard.data;

  useEffect(() => {
    if (dashboard.status === RequestState.IDLE) {
      dispatch(fetchDashboard());
    }
  }, [dashboard.status, dispatch]);

  return (
    <div className="bg-[url('/bg.svg')] bg-cover font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white dark:bg-slate-800/5 shadow-sm backdrop-blur-[80px] border-1 border-white/50">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              {/* Hamburger button for mobile */}
              <button
                aria-controls="logo-sidebar"
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://hadir.co.id" className="flex ms-2 md:me-24">
                <Image
                  src={"/icon.png"}
                  alt="Hadir Logo"
                  width={80}
                  height={40}
                />
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={"/user.png"}
                    alt="User Avatar"
                    width={70}
                    height={70}
                  />
                </button>
                {/* User dropdown */}
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-700 transition ease-in-out duration-300"
                    style={{ top: "100%" }}
                  >
                    <div className="py-1">
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        Settings
                      </Link>

                      <button
                        type="button"
                        onClick={logout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 backdrop-blur-[80px] transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white  border-gray-200 dark:bg-slate-800/5 shadow-sm sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-slate-800/0">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/dashboard"
                className={`${
                  window.location.pathname == "/dashboard"
                    ? "dark:bg-white/10"
                    : ""
                } flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-white/5`}
              >
                <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
                <span className="ms-3 text-sm">Dashboard</span>
              </Link>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-slate-700">
            <li>
              <button
                type="button"
                onClick={() =>
                  setIsEcommerceDropdownOpen(!isEcommerceDropdownOpen)
                }
                className="flex items-center w-full p-3 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-white/5"
              >
                <FontAwesomeIcon icon={faDatabase} className="w-4 h-4" />
                <span className="flex-1 ms-3 text-sm text-left whitespace-nowrap">
                  Master Data
                </span>
                <svg
                  className={`w-2 h-2 transform transition-transform ${
                    isEcommerceDropdownOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l4 4 4-4"
                  />
                </svg>
              </button>
              {/* Ecommerce dropdown */}
              {isEcommerceDropdownOpen && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="flex text-sm items-center w-full p-2 pl-11 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-white/5"
                    >
                      Staff
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex text-sm items-center w-full p-2 pl-11 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-white/5"
                    >
                      Hari Libur
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex text-sm items-center w-full p-2 pl-11 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-white/5"
                    >
                      Jabatan
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex text-sm items-center w-full p-2 pl-11 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-white/5"
                    >
                      Perizinan
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="p-4 sm:ml-64 backdrop-blur-[80px] min-h-screen">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-2 gap-4">
            <RsCard
              variant={CardVariant.DEFAULT}
              isLoading={dashboard.status === RequestState.LOADING}
            >
              <div className="grid grid-cols-2 gap-2">
                <h2 className="text-lg font-bold">{data.total_staff}</h2>
                <FontAwesomeIcon
                  icon={faUserGroup}
                  className="w-6 h-6 justify-self-end"
                />
              </div>
            </RsCard>
            <RsCard
              variant={CardVariant.DEFAULT}
              isLoading={dashboard.status === RequestState.LOADING}
            >
              <h3>{data.total_permit}</h3>
            </RsCard>
          </div>
        </div>
      </div>
    </div>
  );
}
