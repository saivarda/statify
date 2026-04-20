package statify.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import statify.service.SpotifyService;

@RestController
public class AuthController {

    private final SpotifyService spotifyService;

    public AuthController(SpotifyService spotifyService) {
        this.spotifyService = spotifyService;
    }

    @GetMapping("/api/user")
    public ResponseEntity<String> user(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(authentication.getName());
    }

    @GetMapping("/dashboard")
    public String dashboard(Authentication authentication) {
        return spotifyService.getTopTracks(authentication);
    }

    @GetMapping("/top-artists")
    public String topArtists(Authentication authentication) {
        return spotifyService.getTopArtists(authentication);
    }
}
