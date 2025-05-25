const BASE_URL = "http://localhost:5056/api";

// User Registration
export const createUser = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      const { message } = await res.json();
      return { success: false, message };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error:", error.message);
    return { success: false, message: "Network error, please try again" };
  }
};

// User Login
export const login = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      console.log("res", res);
      const { message } = await res.json();
      return { success: false, message };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error:", error.message);
    return { success: false, message: "Network error, please try again" };
  }
};

// Get User By Token
export const getUserByToken = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const { message } = await res.json();
      return { success: false, message };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error:", error.message);
    return { success: false, message: "Network error, please try again" };
  }
};

//Update User By ID
export const updateUserById = async (id, updatedData, token) => {
  try {
    const res = await fetch(`${BASE_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const { message } = await res.json();
      return { success: false, message };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error:", error.message);
    return { success: false, message: "Network error, please try again" };
  }
};