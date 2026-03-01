const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const { JOBS_FILE, APPLICATIONS_FILE, readData, writeData } = require('../config/database');

router.post('/', [
  body('job_id').notEmpty().withMessage('Job ID is required'),
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('resume_link').isURL().withMessage('Resume link must be a valid URL'),
  body('cover_note').notEmpty().withMessage('Cover note is required').trim(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  try {
    const jobs = readData(JOBS_FILE);
    const job = jobs.find(j => j.id === req.body.job_id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    const applications = readData(APPLICATIONS_FILE);
    const newApp = {
      id: `app_${crypto.randomUUID().split('-')[0]}`, job_id: req.body.job_id, job_title: job.title,
      company: job.company, name: req.body.name, email: req.body.email,
      resume_link: req.body.resume_link, cover_note: req.body.cover_note,
      created_at: new Date().toISOString()
    };
    applications.unshift(newApp);
    writeData(APPLICATIONS_FILE, applications);
    res.status(201).json({ success: true, data: newApp });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error', error: error.message }); }
});

router.get('/', (req, res) => {
  try {
    const applications = readData(APPLICATIONS_FILE);
    const { job_id } = req.query;
    let filtered = job_id ? applications.filter(a => a.job_id === job_id) : applications;
    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

module.exports = router;
