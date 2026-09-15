// routes/index.js
// Gom tất cả route con lại, để server.js chỉ cần import 1 file này.

const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
// const patientRoutes = require('./patient.routes');
// const appointmentRoutes = require('./appointment.routes');

router.use('/auth', authRoutes);
// router.use('/patients', patientRoutes);
// router.use('/appointments', appointmentRoutes);

module.exports = router;
