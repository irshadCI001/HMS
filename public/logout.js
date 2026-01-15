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

// Support both modular `getAuth` and compat `firebase.auth()` environments
let auth;
try {
  auth = getAuth ? getAuth(app) : null;
} catch (e) {
  auth = null;
}

window.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-btn');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            if (auth && typeof signOut === 'function') {
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
            } else if (window.firebase && firebase.auth) {
                firebase.auth().signOut()
                    .then(() => {
                        console.log('User signed out (compat).');
                        localStorage.clear();
                        window.location.href = 'login.html';
                    })
                    .catch((error) => {
                        console.error('Logout Error (compat):', error);
                        alert('Failed to logout. Try again.');
                    });
            } else {
                // Fallback
                console.warn('No Firebase auth available to sign out.');
                localStorage.clear();
                window.location.href = 'login.html';
            }
        });
    }
});