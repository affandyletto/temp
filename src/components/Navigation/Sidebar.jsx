// src/components/Sidebar.js

import { useState, useEffect, useRef, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronsUpDown, LogOut, Search } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { menuDropdownUsers, menuItems, organizations } from "@/data/sidebar";
import { Tooltip } from "react-tooltip";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isCollapsed, setIsCollapsed } = useSidebar();

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile, setIsCollapsed]);

  const location = useLocation();
  const currentPath = location.pathname;

  const [isOpen, setOpen] = useState(false);
  const [isSearchCompany, setIsSearchCompany] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(organizations);

  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim() === "") {
      setSearchResult(organizations); // default all
    } else {
      const filtered = organizations.filter((org) =>
        org.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResult(filtered);
    }
  };

  // Klik luar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside
      className={`
        h-screen fixed top-0 left-0 bg-neutral-200 border-r-2 border-neutral-300 p-5 flex flex-col justify-between
        transition-all duration-300
        ${isCollapsed ? "w-24" : "w-72"}
      `}
    >
      <div>
        <Link
          to={"/"}
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-start"
          } gap-1`}
        >
          <img src={"/images/Logo.webp"} alt="Logo" className="size-10" />
          {!isCollapsed && (
            <span className="text-base text-primary-200 font-semibold">
              OneSurvey
            </span>
          )}
        </Link>

        {menuItems.map(({ id, name, menus }) => (
          <nav key={id} className="mt-12 space-y-1">
            {!isCollapsed && <p className="text-xs text-secondary">{name}</p>}
            <div className="space-y-1">
              {menus.map(({ label, icon: Icon, to }) => (
                <Fragment key={to}>
                  <Link
                    to={to}
                    data-tooltip-id={`sidebar-${to}`}
                    className={`flex items-center ${
                      isCollapsed ? "justify-center" : "justify-start"
                    } gap-2 rounded-md p-2 ${
                      currentPath.startsWith(to)
                        ? "bg-neutral-300"
                        : "hover:bg-neutral-300"
                    }`}
                  >
                    <Icon className="size-6" />
                    {!isCollapsed && <span className="text-sm">{label}</span>}
                  </Link>
                  {
                    isCollapsed && (
                      <Tooltip
                        id={`sidebar-${to}`}
                        place="right"
                        content={label}
                        style={{ backgroundColor: "#3F444D", borderRadius: "8px", zIndex: "9999" }}
                      />
                    )
                  }
                </Fragment>
              ))}
            </div>
          </nav>
        ))}
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="w-full flex items-center justify-between hover:bg-neutral-300 rounded-md p-2"
          onClick={() => {
            setOpen((prev) => !prev);
            setIsSearchCompany(false);
          }}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-blue-400 w-10 h-10 rounded-full overflow-hidden">
              <img
                src={"/images/Avatar.webp"}
                alt="Avatar"
                className="size-10"
              />
            </div>
            {!isCollapsed && (
              <div className="text-left">
                <p className="text-sm font-semibold leading-none">User01</p>
                <span className="text-xs text-secondary">user@example.com</span>
              </div>
            )}
          </div>
          {!isCollapsed && <ChevronsUpDown className="size-5" />}
        </button>
        {/* Dropdown Account */}
        {isOpen && (
          <div
            className={`absolute ${
              isCollapsed ? "left-16" : "left-64"
            } bottom-0 w-72 rounded-xl bg-white border border-neutral-400 shadow-md`}
          >
            <div className="flex items-center gap-2 p-4 border-b border-b-neutral-400">
              <div className="flex items-center justify-center bg-blue-400 w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={"/images/Avatar.webp"}
                  alt="Avatar"
                  className="size-10"
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold leading-none">User01</p>
                <span className="text-xs text-secondary">user@example.com</span>
              </div>
            </div>
            <div className="relative">
              <button
                type="button"
                className="w-full flex items-center justify-between hover:bg-neutral-300 border-b border-b-neutral-400 p-4"
                onClick={() => setIsSearchCompany(!isSearchCompany)}
              >
                <div className="text-left">
                  <p className="text-sm font-semibold leading-none">
                    Current Organization
                  </p>
                  <span className="text-xs text-secondary">
                    Example Company
                  </span>
                </div>
                <ChevronRight className="size-5" />
              </button>
              {/* Dropdown Search Company */}
              {isSearchCompany && (
                <div className="absolute bottom-0 left-72 ml-2 w-72 h-60 overflow-y-scroll rounded-xl bg-white border border-neutral-400 shadow-md p-2">
                  <div className="flex items-center gap-2 border border-neutral-400 rounded-lg p-3">
                    <Search className="size-5" />
                    <input
                      name="search"
                      value={searchText}
                      onChange={handleSearch}
                      className="w-full text-sm placeholder:text-secondary focus:outline-none focus:ring-0 focus:border-transparent active:outline-none active:ring-0 active:border-transparent"
                      placeholder="Search"
                    />
                  </div>

                  {searchResult.length > 0 ? (
                    <div className="space-y-1 mt-2">
                      {searchResult.map(({ url, name }) => (
                        <Link
                          key={url}
                          to={url}
                          className="flex items-center hover:bg-neutral-300 rounded-md p-2"
                        >
                          <span className="text-sm">{name}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-40 mt-2 p-3">
                      <div className="space-y-1 text-center">
                        <p className="text-sm font-semibold">
                          Search not found
                        </p>
                        <p className="text-xs text-secondary">
                          Try checking the spelling of the organization name or
                          using other keywords.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="border-b border-b-neutral-400 p-2">
              <div className="space-y-1">
                {menuDropdownUsers.map(({ label, icon: Icon, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-2 hover:bg-neutral-300 rounded-md p-2"
                  >
                    <Icon className="size-6" />
                    <span className="text-sm">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="p-2">
              <Link
                to={"logout"}
                className="flex items-center gap-2 hover:bg-neutral-300 rounded-md p-2"
              >
                <LogOut className="size-6" />
                <span className="text-sm">Logout</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
