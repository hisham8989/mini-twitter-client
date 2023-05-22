import { Box, Skeleton, Typography } from "@mui/material";
import TweetCard from "./TweetCard";
import { getUserLoggedInUser } from "../manager/user.manager";

const DisplayTweets = ({ tweets, apiStatus, updateUser, refreshTweets }) => {
  if (apiStatus.loading) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2, color: "black" }}>
          Tweets
        </Typography>
        <Skeleton
          animation="wave"
          height={30}
          width={110}
          sx={{ marginBottom: 1, marginLeft: "15px" }}
        />

        <Skeleton
          sx={{ marginLeft: "15px" }}
          animation="wave"
          height={50}
          width={90}
        />
      </Box>
    );
  }

  const { userInfo } = getUserLoggedInUser();

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, color: "black" }}>
        Tweets
      </Typography>
      {tweets.map((tweet, index) => {
        return (
          <TweetCard
            key={`tweet-card-${index + 1}`}
            updateUser={updateUser}
            tweetUser={tweet.user}
            content={tweet.content}
            loggedInUser={userInfo}
            tweetId={tweet._id}
            follow={tweet.follow}
            refreshTweets={refreshTweets}
          />
        );
      })}
    </Box>
  );
};

export default DisplayTweets;
