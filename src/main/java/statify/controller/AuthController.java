package statify.controller;

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

    @GetMapping("/")
    public String welcome() {
        return "Welcome to Statify";
    }

    @GetMapping("/dashboard")
    public String dashboard(Authentication authentication) {
        return spotifyService.getTopTracks(authentication);
    }
}