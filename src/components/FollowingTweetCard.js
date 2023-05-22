import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { getUserLoggedInUser } from "../manager/user.manager";
import { toggleFollowUnFollowUser } from "../manager/follow.manager";

const FollowingTweetCard = ({
  tweetUser,
  content,
  refreshTweets,
  loggedInUser,
  updateUser,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    const action = "unfollow";
    const { token } = getUserLoggedInUser();
    toggleFollowUnFollowUser(
      action,
      loggedInUser._id,
      tweetUser._id,
      token
    ).then((res) => {
      updateUser((prev) => {
        return {
          ...prev,
          following: [
            ...prev.following.filter(
              (following) => following !== res.unfollowedUser
            ),
          ],
        };
      });
      refreshTweets();
      return setLoading(false);
    });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body2">{content}</Typography>
        {loading ? (
          <CircularProgress disableShrink />
        ) : (
          <Button
            variant="outlined"
            onClick={() => handleClick()}
            sx={{ mt: 2 }}
          >
            unfollow
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

export default FollowingTweetCard;
