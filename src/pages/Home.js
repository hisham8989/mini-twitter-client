import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Box } from "@mui/material";
import UserInfo from "../components/UserInfo";
import FollowingPanel from "../components/FollowingPanel";
import MainComponent from "../components/MainTweetContainer";
import { getUserLoggedInUser } from "../manager/user.manager";
import { getFollowingTweets, getTweets } from "../manager/tweet.manager";

const Home = (props) => {
  const { user, updateLoggedIn, updateUser } = props;

  // Start from here

  // TODO FOLLOW UNFOLLOW TEXT
  // TODO UPDATE TWEET AND DELETE

  const [follwerTweets, setFollwerTweets] = useState([]);
  const [allTweets, setAllTweets] = useState([]);
  const [follwerTweetsApiStatus, setfollwerTweetsApiStatus] = useState({
    loading: true,
    success: false,
  });
  const [allTweetsApiStatus, setAllTweetsApiStatus] = useState({
    loading: true,
    success: false,
  });

  useEffect(() => {
    const { userInfo, token } = getUserLoggedInUser();
    fetchFollowingTweets(userInfo._id, token);
    fetchAllTweets(token);
  }, []);

  const addTweet = (tweet) => {
    setAllTweets((prev) => {
      return [tweet, ...prev];
    });
  };

  const removeUnfollowedUserTweets = (userId) => {
    setFollwerTweets((prev) => {
      return [...prev.filter((prevTweet) => prevTweet.user._id !== userId)];
    });
  };

  const addFollowedUserTweets = (tweet) => {
    setFollwerTweets((prev) => {
      return [...prev, tweet];
    });
  };

  const fetchFollowingTweets = async (userId, token) => {
    const res = await getFollowingTweets(userId, token);
    if (res.success) {
      setfollwerTweetsApiStatus((prev) => {
        return { ...prev, loading: false, success: true };
      });
      setFollwerTweets(res.data);
    }
  };

  const fetchAllTweets = async (token) => {
    const res = await getTweets(token);
    if (res.success) {
      setAllTweetsApiStatus((prev) => {
        return { ...prev, loading: false, success: true };
      });
      setAllTweets(res.data);
    }
  };

  return (
    <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box sx={{ height: "33vh" }}>
            <UserInfo user={user} updateLoggedIn={updateLoggedIn} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ paddingTop: 3, paddingBottom: 3 }}>
            <MainComponent
              tweets={allTweets}
              apiStatus={allTweetsApiStatus}
              addTweet={addTweet}
              updateUser={updateUser}
              addFollowedUserTweets={addFollowedUserTweets}
              removeUnfollowedUserTweets={removeUnfollowedUserTweets}
            />
          </Paper>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
        >
          <Box
            sx={{
              height: "200vh",
            }}
          >
            <Paper
              sx={{
                height: "60%",
                boxShadow: "none",
              }}
            >
              <FollowingPanel
                tweets={follwerTweets}
                apiStatus={follwerTweetsApiStatus}
                updateUser={updateUser}
                removeUnfollowedUserTweets={removeUnfollowedUserTweets}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
