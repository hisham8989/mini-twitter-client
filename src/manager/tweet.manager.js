import { BASE_URL } from "../constants";
import { destroyToken } from "./user.manager";

export const getFollowingTweets = async (userId, token) => {
  try {
    if (!token) throw Error("token has expired");
    const url = `${BASE_URL}/tweets/${userId}/following`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    destroyToken();
    throw err;
  }
};

export const getTweets = async (userId = null, token) => {
  try {
    if (!token) throw Error("token has expired");
    const url = `${BASE_URL}/tweets?userId=${userId ? userId : ""}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    destroyToken();
    throw err;
  }
};

export const createTweet = async (content, userId, token) => {
  try {
    if (!token) throw Error("token has expired");
    const url = `${BASE_URL}/tweets/create/${userId}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    return res.json();
  } catch (err) {
    destroyToken();
    throw err;
  }
};

export const destroyTweet = async (tweetId, token) => {
  try {
    if (!token) throw Error("token has expired");
    const url = `${BASE_URL}/tweets/${tweetId}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    destroyToken();
    throw err;
  }
};
