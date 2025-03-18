const BASE_URL = "http://localhost:5274/api";

export const getAllCakes = async () => {
  try {
    const res = await fetch(`${BASE_URL}/cake`, {
      method: "GET",
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
