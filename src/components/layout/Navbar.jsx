import { useLocation, Link } from "react-router-dom";
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
  const path = location.pathname;

  return (
    <header className="grid gap-2 pt-5 px-5 pb-5 md:px-20 lg:px-32">
      <div className="flex items-center sm:justify-between w-full gap-2">
        {path == "/" ? (
          <div className="flex items-center gap-1">
            <Logo />
          </div>
        ) : (
          <div className="flex justify-between w-full items-center gap-1">
            <Logo />
            <Button className="rounded-full sm:hidden h-8 px-3" asChild>
              <Link href="/" className="flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Link>
            </Button>
          </div>
        )}
        <div className="hidden sm:flex items-center gap-3 w-full max-w-md">
          <Search />
          {path != "/" && (
            <Button className="h-10 px-3 bg-white text-black hover:opacity-90">
              <Link href="/" className="flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;