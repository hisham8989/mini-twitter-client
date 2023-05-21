import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { toggleFollowUnFollowUser } from "../manager/follow.manager";
import { getUserLoggedInUser } from "../manager/user.manager";

const TweetCard = ({
  tweetUser,
  content,
  isFollowing,
  loggedInUser,
  updateUser,
  removeUnfollowedUserTweets,
  tweetId,
}) => {
  if (isFollowing === undefined) {
    isFollowing = loggedInUser.following.includes(tweetUser._id);
  }

  const handleClick = (e) => {
    const action = isFollowing ? "unfollow" : "follow";
    const { token } = getUserLoggedInUser();
    toggleFollowUnFollowUser(
      action,
      loggedInUser._id,
      tweetUser._id,
      token
    ).then((res) => {
      updateUser((prev) => {
        if (action === "follow") {
          return { ...prev, following: [...prev.following, res.followedUser] };
        } else {
          removeUnfollowedUserTweets(tweetUser._id);
          return {
            ...prev,
            following: [
              ...prev.following.filter(
                (following) => following !== res.unfollowedUser
              ),
            ],
          };
        }
      });
    });
  };

  // console.log("Tweet Card");
  // console.log("Logged In User", loggedInUser);
  // console.log("tweet user", tweetUser);
  // console.log();

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body2">{content}</Typography>
        {loggedInUser._id !== tweetUser._id ? (
          <Button variant="outlined" onClick={handleClick} sx={{ mt: 2 }}>
            {isFollowing ? "unfollow" : "follow"}
          </Button>
        ) : (
          <Button variant="contained" disabled sx={{ mt: 2 }}>
            its mine
          </Button>
        )}
        <Box
          sx={{
            padding: 2,
            bgcolor: "#CAD5E2",
            marginTop: 2,
            borderRadius: 2,
            paddingBottom: 0.5,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            {tweetUser.username}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TweetCard;
