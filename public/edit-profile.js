const userData = JSON.parse(localStorage.getItem("userData"));

if (userData) {
  document.getElementById("firstName").value = userData.firstName || "";
  document.getElementById("gender").value = userData.gender || "";
  document.getElementById("dateOfBirth").value = userData.dateOfBirth || "";
  document.getElementById("phoneNumber").value = userData.phoneNumber || "";
  document.getElementById("address").value = userData.address || "";
}

document.getElementById("edit-profile-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const updatedData = {
    ...userData,
    firstName: document.getElementById("firstName").value,
    gender: document.getElementById("gender").value,
    dateOfBirth: document.getElementById("dateOfBirth").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    address: document.getElementById("address").value
  };

  localStorage.setItem("userData", JSON.stringify(updatedData));
  alert("Profile updated successfully!");
  window.location.href = "profile.html"; // ✅ Redirect after saving
});
