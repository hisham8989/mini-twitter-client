import { Container } from "@mui/material";
import CreateTweet from "./CreateTweet";
import DisplayTweets from "./DisplayTweets";
import { createTweet } from "../manager/tweet.manager";
import { getUserLoggedInUser } from "../manager/user.manager";
import { useState } from "react";

const MainComponent = ({ tweets, apiStatus, updateUser, refreshTweets }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmitTweet = async (values, actions) => {
    try {
      setLoading(true);
      const { userInfo, token } = getUserLoggedInUser();
      const res = await createTweet(values.content, userInfo._id, token);
      if (res.success) {
        // addTweet(res.data);
        actions.resetForm();
      }
      refreshTweets();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <CreateTweet handleSubmit={handleSubmitTweet} loading={loading} />
      <DisplayTweets
        tweets={tweets}
        apiStatus={apiStatus}
        updateUser={updateUser}
        refreshTweets={refreshTweets}
      />
    </Container>
  );
};

export default MainComponent;
