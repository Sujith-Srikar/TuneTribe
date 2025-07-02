import { Navbar } from "../components";
import { useSearchResults } from "../hooks/useSearchResults";
import { ResultsSection } from "../components/index";

export default function Dashboard() {
  // hard-coded queries
  const latest = useSearchResults("latest");
  const trending = useSearchResults("trending");

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-6 space-y-16">

        {/* Latest */}
        {latest.loading ? (
          <h1>hii</h1>
          // spinner
        ) : latest.error ? (
          <div className="text-red-500">{latest.error}</div>
        ) : (
          <ResultsSection
            title="Latest"
            subtitle='The very latest in songs, albums & artists'
            songs={latest.songs}
            albums={latest.albums}
            artists={latest.artists}
          />
        )}

        {/* Trending songs only */}
        {trending.loading ? (
          <h1>hii</h1>
          // spinner
        ) : trending.error ? (
          <div className="text-red-500">{trending.error}</div>
        ) : (
          <ResultsSection
            title="Trending Songs"
            subtitle="What’s hot right now"
            songs={trending.songs}
            albums={trending.albums}           
            artists={trending.artists}          
          />
        )}

      </div>
    </div>
  );
}