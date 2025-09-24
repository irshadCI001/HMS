// signup.js
// ———————————————————————————————————————————————————————————
// 1) Import the Firebase modules you need from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// ———————————————————————————————————————————————————————————
// 2) Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyA33Px0Y-ThP9Wv7MO68sWg4FaMP_Z89ZA",
  authDomain: "hospital-management-203c5.firebaseapp.com",
  projectId: "hospital-management-203c5",
  appId: "1:45154128779:web:bfcd7f5f00cea5d0c6d58e"
};

// 3) Initialize Firebase services
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// 4) Grab the form and listen for submit
const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 5) Pull values from the form
  const name     = document.getElementById("name").value.trim();
  const gender   = document.getElementById("Gender").value.trim();
  const email    = document.getElementById("email").value.trim();
  const dob      = document.getElementById("DOB").value;        // yyyy‑mm‑dd
  const password = document.getElementById("password").value;

  try {
    // 6) Create the user in Firebase Auth
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    // 7) Optionally set the displayName on the Auth user
    await updateProfile(user, { displayName: name });

    // 8) Save the extra profile fields in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      gender,
      email,
      dob,
      createdAt: serverTimestamp()
    });

    alert("Signup successful!");
    // 9) Redirect to login or dashboard
    window.location.href = "login.html";
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
});
