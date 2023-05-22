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
  updateTweetsOnFollow,
  removeUnfollowedUserTweets,
  isFollowing,
  updateIsFollowing,
  updateTweetsOnDelete,
}) => {
  const handleSubmitTweet = async (values, actions) => {
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
        updateTweetsOnFollow={updateTweetsOnFollow}
        removeUnfollowedUserTweets={removeUnfollowedUserTweets}
        isFollowing={isFollowing}
        updateIsFollowing={updateIsFollowing}
        updateTweetsOnDelete={updateTweetsOnDelete}
      />
    </Container>
  );
};

export default MainComponent;
