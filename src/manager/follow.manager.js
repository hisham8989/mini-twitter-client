import { BASE_URL } from "../constants";

export const toggleFollowUnFollowUser = async (
  action,
  userId,
  toFollowId,
  token
) => {
  try {
    if (!token) throw Error("token has expired");
    const url = `${BASE_URL}/users/${action}/${toFollowId}/user/${userId}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    throw err;
  }
};
