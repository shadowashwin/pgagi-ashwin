import React, { useState, useRef } from "react";
import { Tabs } from "./Tabs";
import WeatherContent from "../weather/WeatherContext";
import NewsContext from "../news/NewsContext";
import StockContext from "../stock/StockContext";
import GitHubData from "../github/GitHubData";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../redux/feature/login/loginSlice";
import Pp  from "./../../assets/male-avatar.png"


export function TabsDemo() {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const username = useSelector((state) => state.username);


  const handleLogout = () => {
    dispatch(logout());
  };
  const tabs = [
    {
      title: "Weather",
      value: "product",
      content: (
        <div className="w-full relative h-full rounded-2xl p-3 text-xl md:text-4xl font-bold text-white bg-black">
          <WeatherContent />  
        </div>
      ),
    },
    {
      title: "News",
      value: "services",
      content: (
        <div className="w-full relative h-full rounded-2xl p-3 text-xl md:text-4xl font-bold text-white bg-black">
          <NewsContext />
        </div>
      ),
    },
    {
      title: "Finance",
      value: "playground",
      content: (
        <div className="w-full relative h-full rounded-2xl p-3 text-xl md:text-4xl font-bold text-white bg-black">
          <StockContext />
        </div>
      ),
    },
    {
      title: "Github",
      value: "new",
      content: (
        <div className="w-full relative h-full rounded-2xl p-3 text-xl md:text-4xl font-bold text-white bg-black overflow-auto">
          <GitHubData />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[100%] [perspective:1000px] relative b p-1 flex flex-col w-full overflow-hidden">
      <div className="absolute top-4 right-4" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          <img
            src={Pp}
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </button>

        {isDropdownOpen && (
          <div className={`absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg py-2 transform transition-all duration-300 z-50 ${
            isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}>
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-sm text-gray-200">
                Signed in as
              </p>
              <p className="text-sm font-medium text-white truncate">{username || "User"}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 focus:outline-none"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
}


