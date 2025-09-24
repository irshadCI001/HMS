    // Doctor list based on departments
    const doctorData = {
        "Emergency": ["Dr. Rajesh"],
        "Fertility Care": ["Dr. Ryan Thompson"],
        "Obstetrics & Gynaecology": ["Dr. Liam Chen"],
        "Gynec Laparoscopy": ["Dr. Jackson Lee"],
        "Orthopedics": ["Dr. Emma Mathew"],
        "Neurology": ["Dr. Charlotte Kim"],
        "Pediatrics": ["Dr. Ethan Hamiz"],
        "ENT": ["Dr. Lucas Broos"],
        "Radiology": ["Dr. Zoe Hernandez"]
    };

    // Function to update doctor dropdown based on selected department
    function updateDoctors() {
        const departmentSelect = document.getElementById('department');
        const doctorSelect = document.getElementById('doctor');
        const selectedDepartment = departmentSelect.value;

        console.log("Selected Department: ", selectedDepartment);  // Debug log

        // Clear previous doctor options
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';

        // If there are doctors for the selected department, add them to the dropdown
        if (doctorData[selectedDepartment]) {
            doctorData[selectedDepartment].forEach(function(doctor) {
                const option = document.createElement('option');
                option.value = doctor;
                option.text = doctor;
                doctorSelect.appendChild(option);
            });
        }
    }

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

    // Handle form submission
    document.querySelector('.appointment-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const patientName = document.getElementById('patient-name').value;
        const phoneNumber = document.getElementById('phone-number').value;
        const gender = document.getElementById('gender').value;
        const age = document.getElementById('age').value;
        const department = document.getElementById('department').value;
        const doctor = document.getElementById('doctor').value;
        const date = document.getElementById('date').value;

        const userId = localStorage.getItem("loggedInUserId");

        if (!userId) {
            alert("You must be logged in to book an appointment.");
            return;
        }

        try {
            await addDoc(collection(db, "appointments"), {
                userId,
                patientName,
                phoneNumber,
                gender,
                age,
                department,
                doctor,
                date,
                timestamp: new Date()
            });
        
            alert("Appointment booked successfully!");
            window.location.assign("patient.html");

        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Failed to book appointment.");
        }
    });
