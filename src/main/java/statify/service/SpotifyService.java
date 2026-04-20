package statify.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class SpotifyService {

    private final OAuth2AuthorizedClientService authorizedClientService;

    public SpotifyService(OAuth2AuthorizedClientService authorizedClientService) {
        this.authorizedClientService = authorizedClientService;
    }

    public String getTopTracks(Authentication authentication) {
        var client = authorizedClientService.loadAuthorizedClient("spotify", authentication.getName());
        String accessToken = client.getAccessToken().getTokenValue();
        RestClient restClient = RestClient.create();
        return restClient.get()
            .uri("https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term")
            .header("Authorization", "Bearer " + accessToken)
            .retrieve()
            .body(String.class);
    }

    public String getTopArtists(Authentication authentication) {
        var client = authorizedClientService.loadAuthorizedClient("spotify", authentication.getName());
        String accessToken = client.getAccessToken().getTokenValue();
        RestClient restClient = RestClient.create();
        return restClient.get()
            .uri("https://api.spotify.com/v1/me/top/artists?limit=10&time_range=medium_term")
            .header("Authorization", "Bearer " + accessToken)
            .retrieve()
            .body(String.class);
    }
}