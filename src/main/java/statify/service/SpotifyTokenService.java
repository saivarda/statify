package statify.service;

import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.stereotype.Service;

@Service
public class SpotifyTokenService {

    public String getAccessToken(OAuth2AuthorizedClient client) {
        return client.getAccessToken().getTokenValue();
    }
}