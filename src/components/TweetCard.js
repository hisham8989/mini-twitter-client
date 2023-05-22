import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { toggleFollowUnFollowUser } from "../manager/follow.manager";
import { getUserLoggedInUser } from "../manager/user.manager";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { destroyTweet } from "../manager/tweet.manager";

const TweetCard = ({
  tweetUser,
  content,
  isFollowing,
  loggedInUser,
  updateUser,
  updateTweetsOnFollow,
  removeUnfollowedUserTweets,
  updateIsFollowing,
  updateTweetsOnDelete,
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
          updateTweetsOnFollow(tweetUser._id);
          updateIsFollowing(true);
          return { ...prev, following: [...prev.following, res.followedUser] };
        } else {
          updateIsFollowing(false);
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

  //updateTweetsOnDelete(tweetId)
  const handleTweetDelete = (tweetId) => {
    const { token } = getUserLoggedInUser();
    destroyTweet(tweetId, token).then((res) => {
      updateTweetsOnDelete(res.data._id);
    });
  };
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body2">{content}</Typography>
        {loggedInUser._id !== tweetUser._id ? (
          <Button variant="outlined" onClick={handleClick} sx={{ mt: 2 }}>
            {isFollowing ? "unfollow" : "follow"}
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ mt: 2, minWidth: "5rem" }}
            color="error"
            onClick={() => handleTweetDelete(tweetId)}
          >
            <DeleteForeverIcon />
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
