import { Box, Paper, Skeleton, Typography } from "@mui/material";
import TweetCard from "./TweetCard";
import { getUserLoggedInUser } from "../manager/user.manager";

const FollowingPanel = ({
  tweets,
  apiStatus,
  updateUser,
  removeUnfollowedUserTweets,
  updateIsFollowing,
}) => {
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
          <TweetCard
            key={`tweet-card-${index + 1}`}
            updateUser={updateUser}
            tweetUser={tweet.user}
            content={tweet.content}
            loggedInUser={userInfo}
            tweetId={tweet._id}
            removeUnfollowedUserTweets={removeUnfollowedUserTweets}
            isFollowing
            updateIsFollowing={updateIsFollowing}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default FollowingPanel;
