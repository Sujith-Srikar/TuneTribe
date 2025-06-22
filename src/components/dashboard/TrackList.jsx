import TrackCard from "./TrackCard";

const TrackList = ({ tracks, loading, type = "songs" }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-800"></div>
      </div>
    );
  }

  // Make sure tracks is an array and exists
  const itemsToDisplay = Array.isArray(tracks) ? tracks : [];

  if (itemsToDisplay.length === 0) {
    return (
      <div className="text-center py-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-16 w-16 text-neutral-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
        <p className="mt-4 text-neutral-400 text-lg">
          {loading
            ? "Searching..."
            : itemsToDisplay.length === 0 && type === "songs"
            ? "No songs found. Try another search."
            : "Search for your favorite music above"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {itemsToDisplay.map((item) => (
        <TrackCard key={item.id} item={item} type={type} />
      ))}
    </div>
  );
};

export default TrackList;
