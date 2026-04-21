import { useState, useEffect } from "react";
import "./App.css";

const API = "http://127.0.0.1:8080";
const TIME_RANGES = [
  { label: "4 Weeks", value: "short_term" },
  { label: "6 Months", value: "medium_term" },
  { label: "All Time", value: "long_term" },
];

export default function App() {
  const [status, setStatus] = useState("loading");
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [range, setRange] = useState("medium_term");
  const [recent, setRecent] = useState([]);

  const fetchData = (timeRange) => {
    setStatus("loading");
    Promise.all([
      fetch(`${API}/dashboard?time_range=${timeRange}`, { credentials: "include" }),
      fetch(`${API}/top-artists?time_range=${timeRange}`, { credentials: "include" }),
      fetch(`${API}/recently-played`, { credentials: "include" })
    ])
    .then(async ([tRes, aRes, rRes]) => {
      if (tRes.status === 401 || tRes.url.includes("accounts.spotify")) {
        setStatus("login");
        return;
      }
      const tData = JSON.parse(await tRes.text());
      const aData = JSON.parse(await aRes.text());
      const rData = JSON.parse(await rRes.text());
      setTracks(tData.items || []);
      setArtists(aData.items || []);
      setRecent(rData.items || []);
      setStatus("loaded");
    })
    .catch(() => setStatus("login"));
  };

  useEffect(() => { fetchData(range); }, [range]);

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
        <div className="range-selector">
          {TIME_RANGES.map(r => (
            <button
              key={r.value}
              className={`range-btn ${range === r.value ? "active" : ""}`}
              onClick={() => setRange(r.value)}
            >
              {r.label}
            </button>
          ))}
        </div>
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

      <div className="recent-section">
        <h2 className="section-title">Recently Played</h2>
        <div className="recent-grid">
          {recent.slice(0, 6).map((item, i) => (
            <div className="recent-item" key={i}>
              <img className="recent-art" src={item.track.album.images[1]?.url} alt={item.track.name} />
              <div className="recent-name">{item.track.name}</div>
              <div className="recent-sub">{item.track.artists.map(a => a.name).join(", ")}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
