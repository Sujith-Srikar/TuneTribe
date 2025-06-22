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
      className="flex items-center relative z-10 w-full"
    >
      <Button
        variant="ghost"
        type="submit"
        size="icon"
        className="absolute right-0 rounded-xl rounded-l-none bg-none"
      >
        <SearchIcon className="w-4 h-4" />
      </Button>
      <Input
        ref={inpRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        type="search"
        className="rounded-lg bg-secondary/50"
        name="query"
        placeholder="Try Searching..."
      />
    </form>
  );
}
