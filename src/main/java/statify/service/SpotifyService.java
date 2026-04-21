package statify.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class SpotifyService {

    private final OAuth2AuthorizedClientService authorizedClientService;
    private final RestClient restClient = RestClient.create();

    public SpotifyService(OAuth2AuthorizedClientService authorizedClientService) {
        this.authorizedClientService = authorizedClientService;
    }

    private String getAccessToken(Authentication authentication) {
        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
            "spotify", authentication.getName());
        OAuth2AccessToken token = client.getAccessToken();
        return token.getTokenValue();
    }

    public String getTopTracks(Authentication authentication, String timeRange) {
        String token = getAccessToken(authentication);
        return restClient.get()
            .uri("https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=" + timeRange)
            .header("Authorization", "Bearer " + token)
            .retrieve()
            .body(String.class);
    }

    public String getTopArtists(Authentication authentication, String timeRange) {
        String token = getAccessToken(authentication);
        return restClient.get()
            .uri("https://api.spotify.com/v1/me/top/artists?limit=10&time_range=" + timeRange)
            .header("Authorization", "Bearer " + token)
            .retrieve()
            .body(String.class);
    }

    public String getRecentlyPlayed(Authentication authentication) {
        String token = getAccessToken(authentication);
        return restClient.get()
            .uri("https://api.spotify.com/v1/me/player/recently-played?limit=6")
            .header("Authorization", "Bearer " + token)
            .retrieve()
            .body(String.class);
    }
}
