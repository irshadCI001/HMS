// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase config (same as in firebaseauth.js)
const firebaseConfig = {
  apiKey: "AIzaSyA33Px0Y-ThP9Wv7MO68sWg4FaMP_Z89ZA",
  authDomain: "hospital-management-203c5.firebaseapp.com",
  projectId: "hospital-management-203c5",
  storageBucket: "hospital-management-203c5.firebasestorage.app",
  messagingSenderId: "45154128779",
  appId: "1:45154128779:web:bfcd7f5f00cea5d0c6d58e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle appointment form submission
document.querySelector('.appointment-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('patient-name').value;
  const phone = document.getElementById('phone-number').value;
  const gender = document.getElementById('gender').value;
  const age = document.getElementById('age').value;
  const department = document.getElementById('department').value;
  const date = document.getElementById('date').value;

  try {
    await addDoc(collection(db, 'appointments'), {
      name,
      phone,
      gender,
      age: parseInt(age),
      department,
      date,
      createdAt: new Date()
    });

    alert('Appointment booked successfully!');
    e.target.reset(); // Clear the form
  } catch (error) {
    console.error("Error booking appointment:", error);
    alert('Something went wrong. Try again.');
  }
});
