import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA33Px0Y-ThP9Wv7MO68sWg4FaMP_Z89ZA",
  authDomain: "hospital-management-203c5.firebaseapp.com",
  projectId: "hospital-management-203c5",
  storageBucket: "hospital-management-203c5.appspot.com",
  messagingSenderId: "45154128779",
  appId: "1:45154128779:web:bfcd7f5f00cea5d0c6d58e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function loadUserInfo() {

  const userId = localStorage.getItem("userUID");

  if (!userId) {
    alert("You must be logged in to view appointments.");
    window.location.replace('home.html');
    return;
  }


  const userData = JSON.parse(localStorage.getItem('userData'));
  

  if (userData) {
    document.getElementById('profile-name').innerText = userData.firstName || '';
    document.getElementById('profile-gender').innerText = userData.gender || '';
    document.getElementById('profile-dob').innerText = userData.dateOfBirth || '';
    document.getElementById('profile-email').innerText = userData.email || '';
    document.getElementById('profile-phone').innerText = userData.phoneNumber || '';
    document.getElementById('profile-address').innerText = userData.address || '';
  }
}

loadUserInfo();
