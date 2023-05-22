import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { toggleFollowUnFollowUser } from "../manager/follow.manager";
import { getUserLoggedInUser } from "../manager/user.manager";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { destroyTweet } from "../manager/tweet.manager";

const TweetCard = ({
  tweetUser,
  content,
  loggedInUser,
  updateUser,
  tweetId,
  follow,
  refreshTweets,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    const action = follow ? "unfollow" : "follow";
    setLoading(true);
    const { token } = getUserLoggedInUser();
    toggleFollowUnFollowUser(action, loggedInUser._id, tweetUser._id, token)
      .then((res) => {
        updateUser((prev) => {
          if (follow) {
            // updateIsFollowing(true);
            return {
              ...prev,
              following: [...prev.following, res.followedUser],
            };
          } else {
            // updateIsFollowing(false);
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
        refreshTweets();
        setLoading(false);
      })
      .catch((err) => {
        alert("some went wrong");
        setLoading(false);
      });
  };

  const handleTweetDelete = (tweetId) => {
    setLoading(true);
    const { token } = getUserLoggedInUser();
    destroyTweet(tweetId, token)
      .then((res) => {
        refreshTweets();
        setLoading(false);
      })
      .catch((err) => {
        alert("error with deleting tweet");
        setLoading(false);
      });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body2">{content}</Typography>
        {loggedInUser._id !== tweetUser._id ? (
          loading ? (
            <CircularProgress disableShrink />
          ) : (
            <Button variant="outlined" onClick={handleClick} sx={{ mt: 2 }}>
              {follow ? "unfollow" : "follow"}
            </Button>
          )
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
