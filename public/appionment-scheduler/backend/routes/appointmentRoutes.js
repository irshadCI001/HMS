const express = require('express');
const Appointment = require('../models/appointment');
const router = express.Router();

// POST route to create an appointment
router.post('/appointments', async (req, res) => {
  try {
    const { patient_name, phone_number, gender, age, department, date } = req.body;
    const newAppointment = new Appointment({
      patient_name,
      phone_number,
      gender,
      age,
      department,
      date,
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error });
  }
});

// GET route to fetch all appointments
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
});

module.exports = router;
