const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    // Check if the response is valid JSON
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      console.error("Unexpected response format:", text);
      return { error: "Unexpected error occurred." };
    }
  } catch (error) {
    console.error("fetchData() error:", error.message);
    return { error: error.message };
  }
};

export { fetchData };
