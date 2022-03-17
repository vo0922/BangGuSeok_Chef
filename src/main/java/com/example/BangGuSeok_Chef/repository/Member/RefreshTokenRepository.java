package com.example.BangGuSeok_Chef.repository.Member;

import com.example.BangGuSeok_Chef.entity.Member.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findBy_key(String _key);
}
