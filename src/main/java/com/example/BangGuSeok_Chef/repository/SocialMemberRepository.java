package com.example.BangGuSeok_Chef.repository;

import com.example.BangGuSeok_Chef.entity.SocialMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SocialMemberRepository extends JpaRepository<SocialMember, Long> {
    Optional<SocialMember> findByEmail(String email);
}
