import "../css/historystyle.css";
import Book from "/src/img/Book.png";

const getEntries = async () => {
  const url = "http://localhost:3000/api/entries";

  // Retrieve token from localStorage
  const token = localStorage.getItem("token")?.trim();
  if (!token) {
    showSnackbar("Error finding a valid token!");
    return;
  }

  // Make the request with the Authorization header
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const entries = await response.json();

  if (entries.error) {
    console.log("Error fetching diary entries!");
    return;
  }

  console.log(entries);

  // Get the section that holds the cards
  const section = document.querySelector(".card-area");
  section.style.display = "w";

  // Clear any existing cards before adding new ones
  section.innerHTML = "";

  // Loop through each entry and create a card
  entries.forEach((entry) => {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("parent");

    const childLeftDiv = document.createElement("div");
    childLeftDiv.classList.add("child-left");

    const img = document.createElement("img");
    img.src = Book;
    img.classList.add("Book1");
    img.alt = "ABook";

    childLeftDiv.appendChild(img);

    const childRightDiv = document.createElement("div");
    childRightDiv.classList.add("child-right");

    // Create actual diary entry content
    childRightDiv.innerHTML = `
        <h4>Entry Date: ${new Date(entry.entry_date).toLocaleDateString()}</h4> 
        <p><strong>Mood:</strong> ${entry.mood || "No mood data"}</p> 
        <p><strong>Weight:</strong> ${
          entry.weight ? `${entry.weight} kg` : "No weight data"
        }</p> 
        <p><strong>Sleep Hours:</strong> ${
          entry.sleep_hours || "No sleep data"
        }</p> 
        <p><strong>Notes:</strong> ${entry.notes || "No notes"}</p>
      `;

    parentDiv.appendChild(childLeftDiv);
    parentDiv.appendChild(childRightDiv);

    section.appendChild(parentDiv);
  });
};

const getHabits = async () => {
  const url = "http://localhost:3000/api/habits";

  // Retrieve token from localStorage
  const token = localStorage.getItem("token")?.trim();
  if (!token) {
    showSnackbar("Error finding a valid token!");
    return;
  }

  // Make the request with the Authorization header
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const entries = await response.json();

  if (entries.error) {
    console.log("Error fetching habit entries!");
    return;
  }

  console.log(entries);

  // Get the section that holds the cards
  const section = document.querySelector(".card-area2");
  section.style.display = "w";

  // Clear any existing cards before adding new ones
  section.innerHTML = "";

  // Loop through each entry and create a card
  entries.forEach((entry) => {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("parent2");

    const childLeftDiv = document.createElement("div");
    childLeftDiv.classList.add("child-left2");

    const img = document.createElement("img");
    img.src = Book;
    img.classList.add("Book2");
    img.alt = "ABook";

    childLeftDiv.appendChild(img);

    const childRightDiv = document.createElement("div");
    childRightDiv.classList.add("child-right2");

    // Create actual habit entry content
    childRightDiv.innerHTML = `
        <h4>Entry Date: ${new Date(entry.entry_date).toLocaleDateString()}</h4> 
        <p><strong>Drank Water:</strong><br> ${
          entry.drank_water ? "Yes" : "No"
        }</p> 
        <p><strong>Exercised:</strong><br> ${
          entry.exercised ? "Yes" : "No"
        }</p> 
        <p><strong>Did Hobby:</strong><br> ${
          entry.did_hobby ? "Yes" : "No"
        }</p> 
        <p><strong>Spent Money:</strong><br> ${
          entry.spent_money ? "Yes" : "No"
        }</p> 
        <p><strong>Bad Habit:</strong><br> ${
          entry.bad_habit ? "Yes" : "No"
        }</p> 
        <p><strong>Drank Alcohol:</strong><br> ${
          entry.drank_alcohol ? "Yes" : "No"
        }</p>
      `;

    parentDiv.appendChild(childLeftDiv);
    parentDiv.appendChild(childRightDiv);

    section.appendChild(parentDiv);
  });
};

const getEntriesBtn = document.querySelector("#diaryRequest");
getEntriesBtn.addEventListener("click", getEntries);

const getHabitsBtn = document.querySelector("#habitRequest");
getHabitsBtn.addEventListener("click", getHabits);
