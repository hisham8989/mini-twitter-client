import { Container } from "@mui/material";
import CreateTweet from "./CreateTweet";
import DisplayTweets from "./DisplayTweets";
import { createTweet } from "../manager/tweet.manager";
import { getUserLoggedInUser } from "../manager/user.manager";

const MainComponent = ({
  tweets,
  apiStatus,
  addTweet,
  updateUser,
  addFollowedUserTweets,
  removeUnfollowedUserTweets,
}) => {
  const handleSubmitTweet = async (values, actions) => {
    // const userJson = localStorage.getItem("user");
    // if (userJson) {
    //   const user = JSON.parse(userJson);
    try {
      const { userInfo, token } = getUserLoggedInUser();
      const res = await createTweet(values.content, userInfo._id, token);
      if (res.success) {
        addTweet(res.data);
        actions.resetForm();
      }
    } catch (err) {
      console.log(err);
    }
    // }
  };

  return (
    <Container maxWidth="sm">
      <CreateTweet handleSubmit={handleSubmitTweet} />
      <DisplayTweets
        tweets={tweets}
        apiStatus={apiStatus}
        updateUser={updateUser}
        addFollowedUserTweets={addFollowedUserTweets}
        removeUnfollowedUserTweets={removeUnfollowedUserTweets}
      />
    </Container>
  );
};

export default MainComponent;
