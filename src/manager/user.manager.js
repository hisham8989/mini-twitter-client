import { BASE_URL } from "../constants";

export const createUser = async (user) => {
  try {
    const url = `${BASE_URL}/users/create`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserByUserById = async (id, token) => {
  try {
    if (!token) throw Error("token has expired");
    const url = `${BASE_URL}/users/${id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (user) => {
  try {
    const url = `${BASE_URL}/auth/login`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const saveToken = (token) => {
  try {
    localStorage.setItem("token", token);
  } catch (err) {
    throw err;
  }
};

export const destroyToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (err) {
    throw err;
  }
};

export const saveUser = (user) => {
  try {
    localStorage.setItem("user", user);
  } catch (err) {
    throw err;
  }
};

export const destroyUser = () => {
  try {
    localStorage.removeItem("user");
  } catch (err) {
    throw err;
  }
};

export const updateLoggedInUser = (userInfo) => {
  try {
    const tokenJson = localStorage.getItem("token");
    if (tokenJson) {
      const parsedToken = JSON.parse(tokenJson);
      const newToken = {
        ...parsedToken,
        userInfo,
      };
      localStorage.setItem("token", JSON.stringify(newToken));
    } else {
      throw Error("no user logged in");
    }
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const getUserLoggedInUser = () => {
  try {
    const tokenJson = localStorage.getItem("token");
    if (tokenJson) {
      const parsedToken = JSON.parse(tokenJson);
      return parsedToken;
    } else {
      throw Error("no user logged in");
    }
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
