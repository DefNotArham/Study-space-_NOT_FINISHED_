import { useNavigate } from "react-router-dom";

import { LogoutIcon } from "../icons/icons";
import Logo from "../icons/logo";

import { useAuthStore } from "../../stores/auth.store";

function SidebarContents() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-3 px-1">
        <Logo />
      </div>

      <button
        type="button"
        onClick={() => handleLogout()}
        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-[#9C8D7E] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC] cursor-pointer"
      >
        <LogoutIcon className="h-[18px] w-[18px] text-[#8A7B6C]" />
        Logout
      </button>
    </div>
  );
}

export default SidebarContents;
