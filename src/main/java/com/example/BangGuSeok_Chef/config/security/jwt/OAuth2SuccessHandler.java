package com.example.BangGuSeok_Chef.config.security.jwt;

import com.example.BangGuSeok_Chef.dto.TokenDto;
import com.example.BangGuSeok_Chef.entity.RefreshToken;
import com.example.BangGuSeok_Chef.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth)
            throws IOException, ServletException {
        String targetUrl = determineTargetUrl(req, res, auth);
        getRedirectStrategy().sendRedirect(req, res, targetUrl);

    }
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String redirectUrl = "http://localhost:3000/test";
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                ._key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        log.info("리프레쉬 토큰" + tokenDto.getRefreshToken() + "에세스 토큰 : " + tokenDto.getAccessToken());
        return UriComponentsBuilder.fromUriString(redirectUrl)
                .queryParam("accesstoken",tokenDto.getAccessToken())
                .queryParam("refreshtoken",tokenDto.getRefreshToken())
                .build()
                .toUriString();
    }
}
