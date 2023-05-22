import React, { useCallback, useEffect, useState } from "react";
import { Container, Grid, Paper, Box } from "@mui/material";
import UserInfo from "../components/UserInfo";
import FollowingPanel from "../components/FollowingPanel";
import MainComponent from "../components/MainTweetContainer";
import { getUserLoggedInUser } from "../manager/user.manager";
import { getFollowingTweets, getTweets } from "../manager/tweet.manager";

const Home = (props) => {
  const { user, updateLoggedIn, updateUser } = props;

  const [followingTweets, setFollowingTweets] = useState([]);
  const [allTweets, setAllTweets] = useState([]);
  const [followingTweetsApiStatus, setfollwingTweetsApiStatus] = useState({
    loading: true,
    success: false,
  });
  const [allTweetsApiStatus, setAllTweetsApiStatus] = useState({
    loading: true,
    success: false,
  });

  const fetchFollowingTweets = useCallback(
    async (token) => {
      const res = await getFollowingTweets(user._id, token);
      if (res.success) {
        setfollwingTweetsApiStatus((prev) => {
          return { ...prev, loading: false, success: true };
        });
        setFollowingTweets(res.data);
      }
    },
    [user]
  );

  const fetchAllTweets = useCallback(
    async (token) => {
      const res = await getTweets(null, token);
      if (res.success) {
        setAllTweetsApiStatus((prev) => {
          return { ...prev, loading: false, success: true };
        });
        const mainContainerTweets = res.data.map((tweet) => {
          return {
            ...tweet,
            follow: tweet.user.followers.includes(user._id),
          };
        });
        setAllTweets(mainContainerTweets);
      }
    },
    [user]
  );

  const refreshTweets = useCallback(async () => {
    const { token } = getUserLoggedInUser();
    await fetchFollowingTweets(token);
    await fetchAllTweets(token);
  }, [fetchFollowingTweets, fetchAllTweets]);

  useEffect(() => {
    refreshTweets();
  }, [refreshTweets]);

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
              refreshTweets={refreshTweets}
              updateUser={updateUser}
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
                tweets={followingTweets}
                apiStatus={followingTweetsApiStatus}
                updateUser={updateUser}
                refreshTweets={refreshTweets}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
