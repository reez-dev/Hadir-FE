import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavbarChildProps {
  type: "button" | "link";
  text: string;
  className: string;
}

interface LinkChildProps extends NavbarChildProps {
  link: string;
}

interface ButtonChildProps extends NavbarChildProps {
  onClick: () => void;
}

type ChildType = LinkChildProps | ButtonChildProps;

interface NavbarProps {
  logo: string;
  children: ChildType[];
}

function LinkChild({ text, className, link }: LinkChildProps) {
  return (
    <Link
      href={link}
      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 ${className}`}
    >
      {text}
    </Link>
  );
}

function ButtonChild({ text, className, onClick }: ButtonChildProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 ${className}`}
    >
      {text}
    </button>
  );
}

export default function Navbar({ logo, children }: NavbarProps) {
  const dispatch = useDispatch();
  const boolState = useSelector((state: RootState) => state.bool.value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
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
            <Link href="https://hadir.co.id" className="flex ms-2 md:me-24">
              <Image src={logo} alt="Main Logo" width={80} height={40} />
            </Link>
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
                    {children.map((e) => {
                      if (e.type === "link") {
                        return (
                          <LinkChild
                            type={e.type}
                            key={e.text}
                            text={e.text}
                            className={e.className}
                            link={(e as LinkChildProps).link}
                          />
                        );
                      } else {
                        return (
                          <ButtonChild
                            type={e.type}
                            key={e.text}
                            text={e.text}
                            className={e.className}
                            onClick={(e as ButtonChildProps).onClick}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
