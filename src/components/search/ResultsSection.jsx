import { SongCard, AlbumCard, ArtistCard } from "../index";

export default function ResultSection({
  title,
  subtitle,
  songs = [],
  albums = [],
  artists = [],
}) {
  const hasItems = songs.length + albums.length + artists.length > 0;

  if (!hasItems) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">No results for &quot;{subtitle}&quot;</p>
      </div>
    );
  }

  return (
    <section className="mb-12 px-28">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="text-gray-400">{subtitle}</p>
      </div>

      {/* Songs Carousel */}
      {songs.length > 0 && (
        <div className="mb-8 group">
          <h3 className="text-xl font-semibold text-white mb-2">Songs</h3>
          <div className="custom-scroll flex space-x-4 py-2">
            {songs.map((song) => (
              <div key={song.id} className="flex-shrink-0 w-48">
                <SongCard song={song} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Albums Carousel */}
      {albums.length > 0 && (
        <div className="mb-8 group">
          <h3 className="text-xl font-semibold text-white mb-2">Albums</h3>
          <div className="custom-scroll flex space-x-4 py-2">
            {albums.map((album) => (
              <div key={album.id} className="flex-shrink-0 w-48">
                <AlbumCard album={album} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Artists Carousel */}
      {artists.length > 0 && (
        <div className="group">
          <h3 className="text-xl font-semibold text-white mb-2">Artists</h3>
          <div className="custom-scroll flex space-x-4 py-2">
            {artists.map((artist) => (
              <div key={artist.id} className="flex-shrink-0 w-32">
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}