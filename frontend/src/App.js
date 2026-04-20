import { useState, useEffect } from "react";
import "./App.css";

const API = "http://127.0.0.1:8080";

export default function App() {
  const [status, setStatus] = useState("loading");
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/dashboard`, { credentials: "include" }),
      fetch(`${API}/top-artists`, { credentials: "include" })
    ])
    .then(async ([tRes, aRes]) => {
      if (tRes.status === 302 || tRes.url.includes("accounts.spotify") || tRes.status === 401) {
        setStatus("login");
        return;
      }
      const tData = JSON.parse(await tRes.text());
      const aData = JSON.parse(await aRes.text());
      setTracks(tData.items || []);
      setArtists(aData.items || []);
      setStatus("loaded");
    })
    .catch(() => setStatus("login"));
  }, []);

  if (status === "loading") return <div className="screen"><div className="spinner" /></div>;

  if (status === "login") return (
    <div className="screen">
      <h1 className="logo">Statify</h1>
      <p className="subtitle">Your Spotify stats, beautifully displayed</p>
      <button className="connect-btn" onClick={() => window.location.href = `${API}/oauth2/authorization/spotify`}>
        Connect Spotify
      </button>
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">Statify <span className="dot" /></h1>
      </header>
      <div className="columns">
        <div className="column">
          <h2 className="section-title">Top Tracks</h2>
          {tracks.map((track, i) => (
            <div className="item" key={track.id}>
              <span className="rank">{i + 1}</span>
              <img className="art" src={track.album.images[2]?.url} alt={track.name} />
              <div className="info">
                <div className="name">{track.name}</div>
                <div className="sub">{track.artists.map(a => a.name).join(", ")}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="column">
          <h2 className="section-title">Top Artists</h2>
          {artists.map((artist, i) => (
            <div className="item" key={artist.id}>
              <span className="rank">{i + 1}</span>
              <img className="art" src={artist.images[2]?.url} alt={artist.name} />
              <div className="info">
                <div className="name">{artist.name}</div>
                <div className="sub">{artist.genres?.slice(0, 2).join(", ")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
