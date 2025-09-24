// logout.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Your Firebase configuration (SAME as firebaseauth.js)
const firebaseConfig = {
  apiKey: "AIzaSyA33Px0Y-ThP9Wv7MO68sWg4FaMP_Z89ZA",
  authDomain: "hospital-management-203c5.firebaseapp.com",
  projectId: "hospital-management-203c5",
  storageBucket: "hospital-management-203c5.appspot.com",
  messagingSenderId: "45154128779",
  appId: "1:45154128779:web:bfcd7f5f00cea5d0c6d58e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Now get auth instance
const auth = getAuth(app);

window.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutBtn');


    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth)
                .then(() => {
                    console.log('User signed out.');
                    localStorage.clear();
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    console.error('Logout Error:', error);
                    alert('Failed to logout. Try again.');
                });
        });
    }
});