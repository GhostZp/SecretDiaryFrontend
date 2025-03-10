import { fetchData } from "./fetch.js";
import "../css/frontstyle.css";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".registerEntry");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      showSnackbar("Error finding a valid token!");
      return;
    }

    // Collect form data
    const entryData = {
      entry_date: document.getElementById("entry_date").value,
      mood: document.getElementById("mood").value,
      weight: document.getElementById("weight").value,
      sleep_hours: document.getElementById("sleep_hours").value,
      notes: document.getElementById("notes").value,
    };

    if (
      !entryData.entry_date ||
      !entryData.mood ||
      !entryData.weight ||
      !entryData.sleep_hours ||
      !entryData.notes
    ) {
      showSnackbar("Please fill in all fields.");
      return;
    }

    const url = "http://localhost:3000/api/entries";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(entryData),
    };

    const result = await fetchData(url, options);

    if (result.error) {
      showSnackbar("Error: " + result.error);
    } else {
      showSnackbar("Diary entry saved successfully!");
      form.reset();
    }
  });

  function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.classList.add("show");
    setTimeout(() => snackbar.classList.remove("show"), 3000);
  }
});

// Handle displaying username on frontpage
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username"); // Get stored username
  if (username) {
    document.getElementById("usernameDisplay").textContent = username;
  } else {
    document.getElementById("usernameDisplay").textContent = "Guest";
  }
});
