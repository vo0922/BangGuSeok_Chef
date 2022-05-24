package com.example.BangGuSeok_Chef.repository.Member;

import com.example.BangGuSeok_Chef.entity.Member.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query(value = "select exists (select * from follow where followed_email = :followedEmail and following_email = :followingEmail)", nativeQuery = true)
    Integer existFollow(String followedEmail, String followingEmail);

    @Query(value = "select * from follow where followed_email = :followedEmail and following_email = :followingEmail", nativeQuery = true)
    Follow findByUsers(String followedEmail, String followingEmail);

    @Query(value = "select follow_check from follow where followed_email = :followedEmail and following_email = :followingEmail", nativeQuery = true)
    Boolean findFollowByUser(String followedEmail, String followingEmail);

}
