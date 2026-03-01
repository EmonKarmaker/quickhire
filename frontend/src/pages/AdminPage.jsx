import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobs, deleteJob, createJob, getApplications } from '../services/api';
import {
  HiPlus, HiTrash, HiEye, HiX, HiBriefcase, HiLocationMarker,
  HiUsers, HiDocumentText, HiCheckCircle, HiExclamationCircle,
  HiChevronDown, HiChevronUp, HiExternalLink, HiLockClosed
} from 'react-icons/hi';

const CATEGORIES = ['Design','Sales','Marketing','Finance','Technology','Engineering','Business','Human Resource'];
const JOB_TYPES = ['Full Time','Part Time','Remote','Internship'];

// Simple admin credentials
const ADMIN_EMAIL = 'admin@quickhire.com';
const ADMIN_PASSWORD = 'admin123';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [expandedApp, setExpandedApp] = useState(null);

  // Create job form
  const [form, setForm] = useState({
    title: '', company: '', location: '', category: 'Design',
    type: 'Full Time', description: '', tags: '', logo: '', logoColor: '#4640DE'
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const saved = sessionStorage.getItem('quickhire_admin');
    if (saved === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (loginForm.email === ADMIN_EMAIL && loginForm.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('quickhire_admin', 'true');
    } else {
      setLoginError('Invalid email or password. Try admin@quickhire.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('quickhire_admin');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F8FD] flex items-center justify-center px-4">
        <div className="w-full max-w-[420px] bg-white border border-[#D6DDEB] p-8 shadow-lg animate-fade-in-up">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#4640DE] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="font-clash font-bold text-2xl text-[#25324B]">QuickHire</span>
            </div>
          </div>

          <h1 className="font-clash text-2xl font-semibold text-[#25324B] text-center mb-2">
            Admin Login
          </h1>
          <p className="text-[#7C8493] text-sm text-center mb-8">
            Sign in to manage job listings and applications
          </p>

          {loginError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <HiExclamationCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{loginError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#25324B] mb-2">Email Address</label>
              <input
                type="email"
                placeholder="admin@quickhire.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-[#D6DDEB] text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue focus:border-[#4640DE] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#25324B] mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-[#D6DDEB] text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue focus:border-[#4640DE] transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#4640DE] text-white font-bold text-base hover:bg-[#3530c9] transition-colors flex items-center justify-center gap-2"
            >
              <HiLockClosed size={18} />
              Sign In
            </button>
          </form>

          <div className="mt-6 p-3 bg-[#F8F8FD] border border-[#D6DDEB] rounded-lg">
            <p className="text-[#7C8493] text-xs text-center">
              <span className="font-semibold text-[#25324B]">Demo credentials:</span><br />
              Email: admin@quickhire.com<br />
              Password: admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data.data);
    } catch (err) { console.error(err); }
  };

  const fetchApplications = async () => {
    try {
      const res = await getApplications();
      setApplications(res.data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchJobs(), fetchApplications()]);
      setLoading(false);
    };
    load();
  }, [isAuthenticated]);

  // Re-fetch applications when switching to that tab
  useEffect(() => {
    if (activeTab === 'applications') {
      fetchApplications();
    }
  }, [activeTab]);

  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
      setDeleteConfirm(null);
      showToast('Job deleted successfully');
    } catch (err) {
      showToast('Failed to delete job', 'error');
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Required';
    if (!form.company.trim()) errs.company = 'Required';
    if (!form.location.trim()) errs.location = 'Required';
    if (!form.description.trim()) errs.description = 'Required';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [form.category],
        logo: form.logo || form.company.charAt(0).toUpperCase(),
      };
      const res = await createJob(payload);
      setJobs(prev => [res.data.data, ...prev]);
      setForm({ title: '', company: '', location: '', category: 'Design', type: 'Full Time', description: '', tags: '', logo: '', logoColor: '#4640DE' });
      setFormErrors({});
      setShowCreateForm(false);
      showToast('Job created successfully!');
    } catch (err) {
      showToast('Failed to create job', 'error');
      if (err.response?.data?.errors) {
        const serverErrors = {};
        err.response.data.errors.forEach(e => { serverErrors[e.path] = e.msg; });
        setFormErrors(serverErrors);
      }
    } finally { setSubmitting(false); }
  };

  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: undefined }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8FD] flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-up ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <HiCheckCircle size={20} /> : <HiExclamationCircle size={20} />}
          <span className="text-sm font-medium">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 opacity-70 hover:opacity-100"><HiX size={16} /></button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-[#D6DDEB]">
        <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-clash text-[32px] md:text-[40px] font-semibold text-[#25324B]">
                Admin Dashboard
              </h1>
              <p className="text-[#515B6F] text-base mt-1">Manage job listings and view applications</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#4640DE] text-white font-bold text-base hover:bg-[#3530c9] transition-colors"
              >
                <HiPlus size={20} />
                Post New Job
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-3 border border-[#D6DDEB] text-[#515B6F] font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Total Jobs', value: jobs.length, icon: HiBriefcase, color: '#4640DE' },
              { label: 'Applications', value: applications.length, icon: HiDocumentText, color: '#56CDAD' },
              { label: 'Categories', value: CATEGORIES.length, icon: HiUsers, color: '#26A4FF' },
              { label: 'Locations', value: [...new Set(jobs.map(j => j.location))].length, icon: HiLocationMarker, color: '#FFB836' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#F8F8FD] border border-[#D6DDEB] p-5">
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon size={20} style={{ color: stat.color }} />
                  <span className="text-[#7C8493] text-sm">{stat.label}</span>
                </div>
                <span className="font-clash text-2xl font-semibold text-[#25324B]">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-0 mt-8 border-b border-[#D6DDEB]">
            {[
              { key: 'jobs', label: 'Job Listings', count: jobs.length },
              { key: 'applications', label: 'Applications', count: applications.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'text-[#4640DE] border-[#4640DE]'
                    : 'text-[#7C8493] border-transparent hover:text-[#25324B]'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.key ? 'bg-[#E9E8FF] text-[#4640DE]' : 'bg-gray-100 text-[#7C8493]'
                }`}>{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ====== JOBS TAB ====== */}
        {activeTab === 'jobs' && (
          <div>
            {jobs.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#D6DDEB]">
                <HiBriefcase size={48} className="text-[#D6DDEB] mx-auto mb-4" />
                <h3 className="font-epilogue font-semibold text-xl text-[#25324B] mb-2">No jobs yet</h3>
                <p className="text-[#7C8493] mb-6">Create your first job listing to get started.</p>
                <button onClick={() => setShowCreateForm(true)}
                  className="px-6 py-3 bg-[#4640DE] text-white font-bold text-sm hover:bg-[#3530c9] transition-colors">
                  <HiPlus size={16} className="inline mr-1" /> Create Job
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {jobs.map((job, i) => (
                  <div key={job.id}
                    className="bg-white border border-[#D6DDEB] p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-[#4640DE]/30 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${i * 30}ms`, opacity: 0 }}
                  >
                    {/* Logo */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: job.logoColor || '#4640DE' }}>
                      {job.logo || job.company?.charAt(0)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-epilogue font-semibold text-base text-[#25324B]">{job.title}</h3>
                      <p className="text-[#7C8493] text-sm">{job.company} · {job.location}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="px-2 py-0.5 text-xs font-medium rounded bg-[#E9E8FF] text-[#4640DE]">{job.type}</span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded bg-gray-100 text-[#515B6F]">{job.category}</span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="text-[#A8ADB7] text-xs whitespace-nowrap">
                      {new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Link to={`/jobs/${job.id}`}
                        className="p-2 text-[#7C8493] hover:text-[#4640DE] hover:bg-[#E9E8FF] rounded transition-colors" title="View">
                        <HiEye size={18} />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(job.id)}
                        className="p-2 text-[#7C8493] hover:text-[#FF6550] hover:bg-red-50 rounded transition-colors" title="Delete">
                        <HiTrash size={18} />
                      </button>
                    </div>

                    {/* Delete confirmation */}
                    {deleteConfirm === job.id && (
                      <div className="w-full sm:w-auto flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D6DDEB] mt-2 sm:mt-0">
                        <span className="text-xs text-[#FF6550] font-medium">Delete?</span>
                        <button onClick={() => handleDeleteJob(job.id)}
                          className="px-3 py-1 bg-[#FF6550] text-white text-xs font-medium rounded hover:bg-[#e5503a] transition-colors">
                          Yes
                        </button>
                        <button onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1 border border-[#D6DDEB] text-[#7C8493] text-xs font-medium rounded hover:bg-gray-50 transition-colors">
                          No
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ====== APPLICATIONS TAB ====== */}
        {activeTab === 'applications' && (
          <div>
            {applications.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#D6DDEB]">
                <HiDocumentText size={48} className="text-[#D6DDEB] mx-auto mb-4" />
                <h3 className="font-epilogue font-semibold text-xl text-[#25324B] mb-2">No applications yet</h3>
                <p className="text-[#7C8493]">Applications will appear here when candidates apply to your jobs.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((app, i) => (
                  <div key={app.id}
                    className="bg-white border border-[#D6DDEB] overflow-hidden hover:border-[#4640DE]/30 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${i * 30}ms`, opacity: 0 }}
                  >
                    {/* Clickable header row */}
                    <div
                      onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
                      className="w-full p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 cursor-pointer hover:bg-[#F8F8FD] transition-colors"
                    >
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-[#E9E8FF] flex items-center justify-center text-[#4640DE] font-bold text-sm shrink-0">
                        {app.name.charAt(0).toUpperCase()}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-epilogue font-semibold text-base text-[#25324B]">{app.name}</h3>
                        <p className="text-[#7C8493] text-sm">
                          Applied for <span className="text-[#4640DE] font-medium">{app.job_title}</span> at {app.company}
                        </p>
                      </div>

                      {/* Email preview */}
                      <span className="hidden md:block text-[#7C8493] text-sm">{app.email}</span>

                      {/* Date */}
                      <span className="text-[#A8ADB7] text-xs whitespace-nowrap">
                        {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>

                      {/* Expand icon */}
                      {expandedApp === app.id ? <HiChevronUp size={20} className="text-[#7C8493] shrink-0" /> : <HiChevronDown size={20} className="text-[#7C8493] shrink-0" />}
                    </div>

                    {/* Expanded content - NOT inside the click target */}
                    {expandedApp === app.id && (
                      <div className="px-5 pb-5 border-t border-[#D6DDEB] pt-4 bg-[#F8F8FD]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-xs text-[#7C8493] uppercase tracking-wider font-medium">Email</span>
                            <p className="text-[#25324B] text-sm mt-1">
                              <a href={`mailto:${app.email}`} className="text-[#4640DE] hover:underline">{app.email}</a>
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-[#7C8493] uppercase tracking-wider font-medium">Resume</span>
                            <p className="text-sm mt-1">
                              <a href={app.resume_link} target="_blank" rel="noopener noreferrer"
                                className="text-[#4640DE] hover:underline inline-flex items-center gap-1">
                                View Resume <HiExternalLink size={14} />
                              </a>
                            </p>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-[#7C8493] uppercase tracking-wider font-medium">Cover Note</span>
                          <p className="text-[#515B6F] text-sm mt-1 leading-relaxed bg-white border border-[#D6DDEB] p-3 rounded">
                            {app.cover_note}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ====== CREATE JOB MODAL ====== */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-8 sm:pt-16 px-4 overflow-y-auto">
          <div className="bg-white w-full max-w-[640px] shadow-2xl mb-8 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#D6DDEB]">
              <div>
                <h2 className="font-clash text-2xl font-semibold text-[#25324B]">Post a New Job</h2>
                <p className="text-[#7C8493] text-sm mt-1">Fill in the details to create a new job listing</p>
              </div>
              <button onClick={() => { setShowCreateForm(false); setFormErrors({}); }}
                className="p-2 text-[#7C8493] hover:text-[#25324B] hover:bg-gray-100 rounded transition-colors">
                <HiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateJob} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#25324B] mb-2">Job Title *</label>
                <input type="text" placeholder="e.g. Senior Product Designer" value={form.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  className={`w-full px-4 py-3 border text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue transition-colors ${
                    formErrors.title ? 'border-red-400' : 'border-[#D6DDEB] focus:border-[#4640DE]'
                  }`} />
                {formErrors.title && <p className="mt-1 text-xs text-red-500">{formErrors.title}</p>}
              </div>

              {/* Company + Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-2">Company *</label>
                  <input type="text" placeholder="e.g. Stripe" value={form.company}
                    onChange={(e) => handleFormChange('company', e.target.value)}
                    className={`w-full px-4 py-3 border text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue transition-colors ${
                      formErrors.company ? 'border-red-400' : 'border-[#D6DDEB] focus:border-[#4640DE]'
                    }`} />
                  {formErrors.company && <p className="mt-1 text-xs text-red-500">{formErrors.company}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-2">Location *</label>
                  <input type="text" placeholder="e.g. Berlin, Germany" value={form.location}
                    onChange={(e) => handleFormChange('location', e.target.value)}
                    className={`w-full px-4 py-3 border text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue transition-colors ${
                      formErrors.location ? 'border-red-400' : 'border-[#D6DDEB] focus:border-[#4640DE]'
                    }`} />
                  {formErrors.location && <p className="mt-1 text-xs text-red-500">{formErrors.location}</p>}
                </div>
              </div>

              {/* Category + Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-2">Category *</label>
                  <select value={form.category} onChange={(e) => handleFormChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-[#D6DDEB] text-base text-[#25324B] outline-none font-epilogue focus:border-[#4640DE] bg-white transition-colors">
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-2">Job Type *</label>
                  <select value={form.type} onChange={(e) => handleFormChange('type', e.target.value)}
                    className="w-full px-4 py-3 border border-[#D6DDEB] text-base text-[#25324B] outline-none font-epilogue focus:border-[#4640DE] bg-white transition-colors">
                    {JOB_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>

              {/* Tags + Logo Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-2">Tags <span className="font-normal text-[#A8ADB7]">(comma-separated)</span></label>
                  <input type="text" placeholder="e.g. Marketing, Design, Remote" value={form.tags}
                    onChange={(e) => handleFormChange('tags', e.target.value)}
                    className="w-full px-4 py-3 border border-[#D6DDEB] text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue focus:border-[#4640DE] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-2">Logo Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={form.logoColor} onChange={(e) => handleFormChange('logoColor', e.target.value)}
                      className="w-12 h-12 border border-[#D6DDEB] rounded cursor-pointer" />
                    <input type="text" value={form.logoColor} onChange={(e) => handleFormChange('logoColor', e.target.value)}
                      className="flex-1 px-4 py-3 border border-[#D6DDEB] text-sm text-[#25324B] outline-none font-epilogue font-mono focus:border-[#4640DE] transition-colors" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#25324B] mb-2">Job Description *</label>
                <textarea rows={8} placeholder="Describe the role, responsibilities, requirements..."
                  value={form.description} onChange={(e) => handleFormChange('description', e.target.value)}
                  className={`w-full px-4 py-3 border text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue resize-none transition-colors ${
                    formErrors.description ? 'border-red-400' : 'border-[#D6DDEB] focus:border-[#4640DE]'
                  }`} />
                {formErrors.description && <p className="mt-1 text-xs text-red-500">{formErrors.description}</p>}
              </div>
            </form>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[#D6DDEB] bg-[#F8F8FD]">
              <button onClick={() => { setShowCreateForm(false); setFormErrors({}); }}
                className="px-6 py-3 border border-[#D6DDEB] text-[#515B6F] font-semibold text-sm hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleCreateJob} disabled={submitting}
                className="px-6 py-3 bg-[#4640DE] text-white font-bold text-sm hover:bg-[#3530c9] transition-colors disabled:opacity-50 flex items-center gap-2">
                {submitting ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating...</>
                ) : (
                  <><HiPlus size={16} /> Post Job</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
