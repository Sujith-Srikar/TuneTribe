import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./input";
import { Button } from "./button";
import { SearchIcon } from "lucide-react";

export default function Search() {
  const [query, setQuery] = useState("");
  const inpRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      navigate("/");
      return;
    }
    navigate(`/search/${query}`);
    inpRef.current.blur();
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md mx-auto"
    >
      <div className="flex items-center w-full bg-[#18181A] rounded-full ring-1 ring-[#2a2a2c] focus-within:ring-gray-600 transition-all">
        <input
          ref={inpRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          type="search"
          name="query"
          placeholder="Try searching..."
          className="flex-1 bg-transparent px-4 py-2 text-white text-sm placeholder-gray-400 rounded-full focus:outline-none"
        />

        <button
          type="submit"
          className="p-2 rounded-full hover:bg-[#2a2a2c] transition-colors duration-150 mr-1"
        >
          <SearchIcon className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </form>

  );
}
