# Statify 🎵

A full-stack Spotify stats dashboard that shows your top tracks, top artists, and recently played songs — beautifully displayed in a clean Apple-style dark UI.

## Live Demo
> Coming soon (deploying to Render)

## Screenshots

> Add screenshots here

## Features
- 🔐 Spotify OAuth2 login
- 🎧 Top Tracks with album art
- 🎤 Top Artists with photos
- 🕐 Recently Played grid
- 📅 Time range selector — Last 4 Weeks, 6 Months, All Time
- 🌙 Clean Apple-style dark UI

## Tech Stack
**Backend**
- Java 17 + Spring Boot 4
- Spring Security OAuth2
- Spring Web (RestClient)

**Frontend**
- React
- CSS3 with animations

**Auth**
- Spotify OAuth2 Authorization Code Flow

## Running Locally

### Prerequisites
- Java 17+
- Node.js 18+
- Spotify Developer account

### Setup

1. Clone the repo
```bash
git clone https://github.com/saivarda/statify.git
cd statify
```

2. Create a Spotify app at [developer.spotify.com](https://developer.spotify.com)
   - Add redirect URI: `http://127.0.0.1:8080/login/oauth2/code/spotify`

3. Add your credentials to `src/main/resources/application.yml`

4. Run the backend
```bash
./mvnw spring-boot:run
```

5. Open `http://127.0.0.1:8080` and connect your Spotify account

## Author
Venkata Sai Yashwanth — [GitHub](https://github.com/saivarda) · [LinkedIn](https://linkedin.com/in/YOUR_LINKEDIN)
