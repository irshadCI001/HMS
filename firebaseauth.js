// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase configuration
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
const auth = getAuth();
const db = getFirestore();

// Function to display messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  if (messageDiv) {
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
      messageDiv.style.opacity = 0;
    }, 5000);
  }
}

// Wait for DOM content to fully load
window.addEventListener('DOMContentLoaded', function () {

    console.log("DOM fully loaded and parsed");

    // SIGN UP HANDLER
    const signUpButton = document.getElementById('submitSignIn');
    if (signUpButton) {
      signUpButton.addEventListener('click', (event) => {
  event.preventDefault();

  const firstName = document.getElementById('name')?.value;
  const Gender = document.getElementById('Gender')?.value;
  const email = document.getElementById('Email')?.value;
  const address = document.getElementById('Address')?.value;
  const rawPhone = document.getElementById('phone')?.value || '';
  const phoneNumber = rawPhone.replace(/\D/g, ''); // Digits only
  const dateOfBirth = document.getElementById('DOB')?.value;
  const password = document.getElementById('Password')?.value;

  if (!email || !password || !firstName || !Gender || !dateOfBirth || !phoneNumber) {
    showMessage('Please fill in all fields.', 'signUpMessage');
    return;
  }

  // Now use phoneNumber to save to Firebase



        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
              email,
              firstName,
              address,
              phoneNumber,
              gender: Gender,
              dateOfBirth
            };

            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
              .then(() => {
                window.location.href = 'login.html'; // Redirect to login page
              })
              .catch((error) => {
                console.error("Error writing document", error);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
              showMessage('Email address already exists!', 'signUpMessage');
            } else {
              showMessage('Unable to create user', 'signUpMessage');
            }
          });
      });
    }

    // SIGN IN HANDLER
    const signInButton = document.getElementById('submitSignIn');
    if (signInButton) {
      signInButton.addEventListener('click', (event) => {
        event.preventDefault();

        const email = document.getElementById('Email')?.value;
        const password = document.getElementById('Password')?.value;

        if (!email || !password) {
          showMessage('Please enter both email and password.', 'signInMessage');
          return;
        }

        signInWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            showMessage('Login successful!', 'signInMessage');

            // Fetch user data
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              localStorage.setItem('userData', JSON.stringify(userData));
              localStorage.setItem('userUID', user.uid);

              // Redirect to home page after login
              window.location.replace('home.html');
            } else {
              console.log("No user data found for UID:", user.uid);
              showMessage('No user data found in Firestore.', 'signInMessage');
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
              showMessage('Incorrect email or password.', 'signInMessage');
            } else {
              showMessage('Login failed. Please try again.', 'signInMessage');
            }
          });
      });
    }
    

});
