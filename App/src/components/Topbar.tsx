import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Topbar = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email") || "";
    const storedUsername = localStorage.getItem("username") || "";
    setEmail(storedEmail);
    setUsername(storedUsername);
  }, []);

  return (
    <div className="flex justify-end items-center bg-slate-100 px-6 py-3 shadow-md relative">
      <div className="relative">
        <FaUserCircle
          className="text-3xl cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white rounded shadow-lg w-52 p-4 z-10">
            <div className="text-sm text-gray-700">Logged in as:</div>
            <div className="font-semibold text-blue-600">
              {username || email || "Guest"}
            </div>

            <button
              className="mt-3 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-full"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
