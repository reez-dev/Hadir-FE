export default function SideBar() {
  return (
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
  );
}
