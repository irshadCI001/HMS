import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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

async function loadPatientInfo() {
  const userId = localStorage.getItem("userUID");

  if (!userId) {
    alert("User not logged in!");
    return;
  }

  const appointmentsRef = collection(db, "appointments");
  const q = query(appointmentsRef, where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    const appointments = [];

    querySnapshot.forEach((doc) => {
      appointments.push(doc.data());
    });

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      document.getElementById('patient-name').innerText = userData.firstName || '';
      document.getElementById('patient-gender').innerText = userData.gender || '';
      document.getElementById('patient-age').innerText = userData.age || '';
    }

    // Display appointments on the page
    const appointmentsContainer = document.getElementById('appointmentsContainer');
    appointmentsContainer.innerHTML = appointments.map(app => {
      return `
        <div class="appointment">
          <p><strong>Doctor:</strong> ${app.doctor}</p>
          <p><strong>Department:</strong> ${app.department}</p>
          <p><strong>Appointment Date:</strong> ${app.date}</p>
          <p><strong>Status:</strong> Booked</p>
        </div>
      `;
    }).join('');

  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
}

window.onload = loadPatientInfo;
