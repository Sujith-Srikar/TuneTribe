import { useState } from 'react';

function App() {
  const [keyword, setKeyword] = useState("");
  const [tracks, setTracks] = useState([]);

  const getTracks = async (event) => {
    event.preventDefault();
    
    let data = await fetch(
      `https://v1.nocodeapi.com/sowmyamusti/spotify/fGsgndfHkAUgCRfM/search?q=${keyword}&type=track`
    );
    let convertedData = await data.json();
    setTracks(convertedData.tracks.items);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">TuneTribe</a>
          <form className="d-flex" role="search" onSubmit={getTracks}>
            <input
              value={keyword}
              onChange={event => setKeyword(event.target.value)}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      
      <div className="container">
        <div className="row">
          {/* Conditionally render either the static image or the track list */}
          {
            tracks.length === 0 ? (
              <div className="col-12 text-center">
                {/* Display a static image before search */}
                <img
                  src="https://i.pinimg.com/564x/e4/cb/4b/e4cb4ba9451bf3c28c3aa68e71c7057b.jpg"
                  alt="Search placeholder"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', 
                    zIndex: -1 
                  }}
                  className="img-fluid"
                />
              </div>
            ) : (
              tracks.map((element) => {
                return (
                  <div key={element.id} className="col-lg-3 col-md-6 py-2">
                    <div className="card">
                      <img src={element.album.images[0].url} className="card-img-top" alt="Album Art" />
                      <div className="card-body">
                        <h5 className="card-title">{element.name}</h5>
                        <p className="card-text">
                          Artist: {element.album.artists[0].name}
                        </p>
                        <p className="card-text">
                          Release date: {element.album.release_date}
                        </p>
                        <audio src={element.preview_url} controls className="w-100"></audio>
                      </div>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>
      </div>
    </>
  );
}

export default App;
