const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  department: { type: String, required: true },
  date: { type: Date, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
