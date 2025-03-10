import '../css/snackbar.css';
import {addUser, loginUser, logoutUser} from './auth.js';

// Handle user registration
const addUserForm = document.querySelector('.registerForm');
if (addUserForm) {
  addUserForm.addEventListener('submit', addUser);
}

// Handle user login
const loginForm = document.querySelector('.loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', loginUser);
}

// Handle user logout
const logoutBtn = document.querySelector('.logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logoutUser);
}