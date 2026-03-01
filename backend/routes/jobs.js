const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const { JOBS_FILE, readData, writeData } = require('../config/database');

router.get('/', (req, res) => {
  try {
    let jobs = readData(JOBS_FILE);
    const { search, category, location, type } = req.query;
    if (search) { const s = search.toLowerCase(); jobs = jobs.filter(j => j.title.toLowerCase().includes(s) || j.company.toLowerCase().includes(s) || j.description.toLowerCase().includes(s)); }
    if (category) jobs = jobs.filter(j => j.category.toLowerCase() === category.toLowerCase());
    if (location) { const loc = location.toLowerCase(); jobs = jobs.filter(j => j.location.toLowerCase().includes(loc)); }
    if (type) jobs = jobs.filter(j => j.type.toLowerCase() === type.toLowerCase());
    jobs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error', error: error.message }); }
});

router.get('/categories', (req, res) => {
  try {
    const jobs = readData(JOBS_FILE);
    const cats = {};
    jobs.forEach(j => { cats[j.category] = (cats[j.category] || 0) + 1; });
    res.json({ success: true, data: Object.entries(cats).map(([name, count]) => ({ name, count })) });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

router.get('/:id', (req, res) => {
  try {
    const jobs = readData(JOBS_FILE);
    const job = jobs.find(j => j.id === req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, data: job });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('company').notEmpty().withMessage('Company is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('type').notEmpty().withMessage('Job type is required'),
  body('description').notEmpty().withMessage('Description is required'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  try {
    const jobs = readData(JOBS_FILE);
    const newJob = {
      id: `job_${crypto.randomUUID().split('-')[0]}`, title: req.body.title, company: req.body.company,
      location: req.body.location, category: req.body.category, type: req.body.type || 'Full Time',
      description: req.body.description, tags: req.body.tags || [req.body.category],
      logo: req.body.logo || req.body.company.charAt(0), logoColor: req.body.logoColor || '#4640DE',
      created_at: new Date().toISOString()
    };
    jobs.unshift(newJob);
    writeData(JOBS_FILE, jobs);
    res.status(201).json({ success: true, data: newJob });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error', error: error.message }); }
});

router.delete('/:id', (req, res) => {
  try {
    let jobs = readData(JOBS_FILE);
    const idx = jobs.findIndex(j => j.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Job not found' });
    const deleted = jobs.splice(idx, 1)[0];
    writeData(JOBS_FILE, jobs);
    res.json({ success: true, message: 'Job deleted', data: deleted });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

module.exports = router;
