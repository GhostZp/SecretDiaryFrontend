import { fetchData } from "./fetch.js";
import "../css/habitstyle.css";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".registerHabits");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Retrieve token from localStorage
    const token = localStorage.getItem("token")?.trim();
    if (!token) {
      showSnackbar("Error finding a valid token!");
      return;
    }

    // Collect form data
    const habitData = {
      entry_date: document.getElementById("entry_date").value || null,
      drank_water: !!document.getElementById("drank_water")?.checked,
      exercised: !!document.getElementById("exercised")?.checked,
      did_hobby: !!document.getElementById("did_hobby")?.checked,
      spent_money: !!document.getElementById("spent_money")?.checked,
      bad_habit: !!document.getElementById("bad_habit")?.checked,
      drank_alcohol: !!document.getElementById("drank_alcohol")?.checked,
    };

    const url = "http://localhost:3000/api/habits";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(habitData),
    };

    console.log("Sending habitData:", habitData);

    try {
      const result = await fetchData(url, options);

      if (!result || result.error) {
        showSnackbar("Error: " + (result?.error || "Unknown error"));
      } else {
        showSnackbar("Habit data saved successfully!");
        form.reset();
      }
    } catch (error) {
      showSnackbar("Network error: " + error.message);
    }
  });

  function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    if (!snackbar) {
      console.error("Snackbar element not found!");
      return;
    }

    snackbar.textContent = message;
    snackbar.classList.add("show");
    setTimeout(() => snackbar.classList.remove("show"), 3000);
  }
});
