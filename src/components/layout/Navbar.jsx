import { useLocation, Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import Search from "../ui/search";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-1 text-white text-3xl no-underline">
      <div className="relative h-8 w-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center">
          <div className="h-5 w-5 bg-black rounded-full flex items-center justify-center">
            <div className="h-2.5 w-2.5 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-amber-500 rounded-full shadow-lg"></div>
        <div className="absolute -bottom-1 -left-1 h-2 w-2 bg-amber-400 rounded-full shadow-lg"></div>
      </div>
      <div className="font-bold text-xl tracking-tight relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-500">
          TuneTribe
        </span>
        <span className="absolute -top-1 -right-2 text-xs text-amber-500">
          ♪
        </span>
      </div>
    </Link>
  );
};

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleBackClick = () => {
    if (path.startsWith("/player/")) {
      navigate("/dashboard");
    } else if (path === "/dashboard") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="flex flex-col px-4 sm:px-6 md:px-20 lg:px-32 py-6">
      {/* Mobile layout (stacked) */}
      <div className="sm:hidden w-full space-y-4">
        <div className="flex justify-between items-center w-full">
          <Logo />
          {path !== "/" && (
            <Button
              onClick={handleBackClick}
              className="rounded-full h-8 px-3 flex items-center gap-1 bg-white text-black"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          )}
        </div>
        <div className="w-full">
          <Search />
        </div>
      </div>

      {/* Desktop layout (side by side) */}
      <div className="hidden sm:flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-1">
          <Logo />
        </div>
        <div className="flex items-center gap-3 w-full max-w-md">
          <Search />
          {path !== "/" && (
            <Button
              onClick={handleBackClick}
              className="h-10 px-3 whitespace-nowrap flex items-center gap-1 bg-white text-black cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;