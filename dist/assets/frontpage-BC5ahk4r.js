import{f as l}from"./main-DP3VjRHo.js";document.addEventListener("DOMContentLoaded",function(){const n=document.querySelector(".registerEntry");n.addEventListener("submit",async function(s){s.preventDefault();const e=localStorage.getItem("token");if(!e){o("Error finding a valid token!");return}const t={entry_date:document.getElementById("entry_date").value,mood:document.getElementById("mood").value,weight:document.getElementById("weight").value,sleep_hours:document.getElementById("sleep_hours").value,notes:document.getElementById("notes").value};if(!t.entry_date||!t.mood||!t.weight||!t.sleep_hours||!t.notes){o("Please fill in all fields.");return}const a="http://localhost:3000/api/entries",d={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(t)},r=await l(a,d);r.error?o("Error: "+r.error):(o("Diary entry saved successfully!"),n.reset())});function o(s){const e=document.getElementById("snackbar");e.textContent=s,e.classList.add("show"),setTimeout(()=>e.classList.remove("show"),3e3)}});document.addEventListener("DOMContentLoaded",()=>{const n=localStorage.getItem("username");n?document.getElementById("usernameDisplay").textContent=n:document.getElementById("usernameDisplay").textContent="Guest"});
