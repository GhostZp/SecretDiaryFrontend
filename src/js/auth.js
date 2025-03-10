import { fetchData } from "./fetch";
import "../css/loginstyle.css";

// Get the snackbar DIV
const snackbar = document.getElementById("snackbar");

// Reusable function to show snackbar message
const showSnackbar = (message, type = "") => {
  snackbar.innerText = message;
  snackbar.className = `show ${type}`.trim();

  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "").trim();
  }, 10000);
};

const addUser = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  const email = document.querySelector("#email").value.trim();

  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  const url = "http://localhost:3000/api/users";

  const options = {
    body: JSON.stringify(bodyData),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };
  console.log(options);

  const response = await fetchData(url, options);

  if (response.error) {
    console.log(response.error);
    showSnackbar(
      "Error: Remember to fill all fields and make sure password at least 8 letters long!",
      "error"
    );
  } else if (response.message) {
    console.log(response.message);
    showSnackbar("Successfully added user! Move onto login.", "success");
  }

  console.log(response);
  document.querySelector(".registerForm").reset();
};

const loginUser = async (event) => {
  event.preventDefault();

  const loginForm = document.querySelector(".loginForm");
  const username = loginForm.querySelector("input[name=username]").value;
  const password = loginForm.querySelector("input[name=password]").value;

  const bodyData = { username, password };

  const url = "http://localhost:3000/api/auth/login";
  const options = {
    body: JSON.stringify(bodyData),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };

  console.log(options);

  try {
    const response = await fetchData(url, options);

    if (!response || response.error) {
      console.error("Error logging in:", response?.error || "Unknown error");
      showSnackbar("Login failed! Please check your credentials.", "error");
      return;
    }

    if (!response.token) {
      console.error("No valid token received, login failed.");
      showSnackbar("Login failed! Check your credentials.", "error");
      return;
    }

    console.log(response.message, "success");
    localStorage.setItem("token", response.token);
    localStorage.setItem("username", username);
    showSnackbar("Login successful! Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "/src/pages/frontpage.html";
    }, 2000);

    loginForm.reset();
  } catch (error) {
    console.error("Login request failed:", error);
    showSnackbar("An error occurred. Please try again.", "error");
  }
};

const logoutUser = () => {
  try {
    if (localStorage.getItem("token")) {
      // Remove token from localStorage
      localStorage.removeItem("token");

      // Show logout confirmation
      showSnackbar("Logout successful! Redirecting...", "success");

      // Redirect to login page
      setTimeout(() => {
        window.location.href = "/src/pages/loginpage.html";
      }, 2000);
    } else {
      console.log("error");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    showSnackbar("An error occurred while logging out.", "error");
  }
};

export { addUser, loginUser, logoutUser };
