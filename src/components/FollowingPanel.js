import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { getUserLoggedInUser } from "../manager/user.manager";
import FollowingTweetCard from "./FollowingTweetCard";

const FollowingPanel = ({ tweets, apiStatus, updateUser, refreshTweets }) => {
  if (apiStatus.loading) {
    return (
      <Paper
        sx={{
          height: "50%",
          p: 2,
          boxShadow: "none",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, position: "sticky" }}>
          Followings
        </Typography>
        <Box
          sx={{
            paddingTop: 5,
          }}
        >
          <Skeleton
            animation="wave"
            height={30}
            width={170}
            sx={{ marginBottom: 1 }}
          />
          <Skeleton
            animation="wave"
            height={30}
            width={170}
            sx={{ marginBottom: 3 }}
          />
          <Skeleton animation="wave" height={50} width={120} />
          <Skeleton
            animation="wave"
            height={50}
            width={180}
            sx={{ marginTop: 2 }}
          />
        </Box>
      </Paper>
    );
  }

  const { userInfo } = getUserLoggedInUser();

  return (
    <Paper
      sx={{
        height: "60%",
        overflow: "auto",
        p: 2,
        boxShadow: "none",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, position: "sticky" }}>
        Followings
      </Typography>
      <Box
        sx={{
          paddingTop: 5,
        }}
      >
        {tweets.map((tweet, index) => (
          <FollowingTweetCard
            key={`tweet-card-${index + 1}`}
            updateUser={updateUser}
            tweetUser={tweet.user}
            content={tweet.content}
            loggedInUser={userInfo}
            refreshTweets={refreshTweets}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default FollowingPanel;
