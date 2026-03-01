import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJob, submitApplication } from '../services/api';
import { HiArrowLeft, HiLocationMarker, HiBriefcase, HiClock, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

const tagColorMap = {
  marketing: 'tag-marketing', design: 'tag-design', business: 'tag-business',
  technology: 'tag-technology', engineering: 'tag-engineering', finance: 'tag-finance',
  'full-time': 'tag-full-time', fulltime: 'tag-fulltime', management: 'tag-management',
};

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: '', email: '', resume_link: '', cover_note: '' });

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await getJob(id);
        setJob(res.data.data);
      } catch (err) {
        console.error('Failed to fetch job:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
    window.scrollTo(0, 0);
  }, [id]);

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.resume_link.trim()) errs.resume_link = 'Resume link is required';
    else {
      try { new URL(form.resume_link); } catch { errs.resume_link = 'Must be a valid URL'; }
    }
    if (!form.cover_note.trim()) errs.cover_note = 'Cover note is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setSubmitStatus(null);
    try {
      await submitApplication({ ...form, job_id: id });
      setSubmitStatus('success');
      setForm({ name: '', email: '', resume_link: '', cover_note: '' });
      setErrors({});
    } catch (err) {
      setSubmitStatus('error');
      if (err.response?.data?.errors) {
        const serverErrors = {};
        err.response.data.errors.forEach(e => { serverErrors[e.path] = e.msg; });
        setErrors(serverErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8FD] flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#F8F8FD] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-clash text-2xl font-semibold text-[#25324B] mb-4">Job not found</h2>
          <Link to="/jobs" className="text-[#4640DE] font-medium hover:underline">← Back to jobs</Link>
        </div>
      </div>
    );
  }

  const createdDate = new Date(job.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#D6DDEB]">
        <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-[#7C8493] hover:text-[#4640DE] transition-colors text-sm font-medium">
            <HiArrowLeft size={16} />
            Back to jobs
          </Link>
        </div>
      </div>

      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Job Header */}
            <div className="bg-white border border-[#D6DDEB] p-8 mb-6">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0"
                  style={{ backgroundColor: job.logoColor || '#4640DE' }}
                >
                  {job.logo || job.company?.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="font-clash text-[28px] md:text-[32px] font-semibold text-[#25324B] mb-2">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-[#515B6F] text-base mb-4">
                    <span className="flex items-center gap-1.5">
                      <HiBriefcase size={18} className="text-[#7C8493]" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HiLocationMarker size={18} className="text-[#7C8493]" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HiClock size={18} className="text-[#7C8493]" />
                      {job.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(job.tags || []).map((tag) => (
                      <span key={tag} className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        tagColorMap[tag.toLowerCase().replace(/\s+/g, '')] || 'tag-design'
                      }`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#D6DDEB]">
                <span className="text-[#7C8493] text-sm">Posted on {createdDate}</span>
                <button
                  onClick={() => setShowApplyForm(!showApplyForm)}
                  className="px-8 py-3 bg-[#4640DE] text-white font-bold text-base hover:bg-[#3530c9] transition-colors"
                >
                  {showApplyForm ? 'Close Application' : 'Apply Now'}
                </button>
              </div>
            </div>

            {/* Apply Form */}
            {showApplyForm && (
              <div className="bg-white border border-[#D6DDEB] p-8 mb-6 animate-fade-in-up">
                <h2 className="font-clash text-2xl font-semibold text-[#25324B] mb-2">
                  Apply for this job
                </h2>
                <p className="text-[#7C8493] text-base mb-6">
                  Fill in the form below to submit your application for <span className="font-medium text-[#25324B]">{job.title}</span> at <span className="font-medium text-[#25324B]">{job.company}</span>.
                </p>

                {/* Success message */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <HiCheckCircle size={24} className="text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-1">Application submitted!</h4>
                      <p className="text-green-700 text-sm">Your application has been successfully submitted. The hiring team will review it shortly.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && !Object.keys(errors).length && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <HiExclamationCircle size={24} className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">Submission failed</h4>
                      <p className="text-red-700 text-sm">Something went wrong. Please try again.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-[#25324B] mb-2">Full Name *</label>
                    <input
                      type="text" placeholder="e.g. John Doe" value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full px-4 py-3 border text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue transition-colors ${
                        errors.name ? 'border-red-400 bg-red-50/50' : 'border-[#D6DDEB] focus:border-[#4640DE]'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-[#25324B] mb-2">Email Address *</label>
                    <input
                      type="email" placeholder="e.g. john@example.com" value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue transition-colors ${
                        errors.email ? 'border-red-400 bg-red-50/50' : 'border-[#D6DDEB] focus:border-[#4640DE]'
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  {/* Resume Link */}
                  <div>
                    <label className="block text-sm font-semibold text-[#25324B] mb-2">Resume Link (URL) *</label>
                    <input
                      type="url" placeholder="e.g. https://linkedin.com/in/yourprofile" value={form.resume_link}
                      onChange={(e) => handleChange('resume_link', e.target.value)}
                      className={`w-full px-4 py-3 border text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue transition-colors ${
                        errors.resume_link ? 'border-red-400 bg-red-50/50' : 'border-[#D6DDEB] focus:border-[#4640DE]'
                      }`}
                    />
                    {errors.resume_link && <p className="mt-1 text-sm text-red-500">{errors.resume_link}</p>}
                  </div>

                  {/* Cover Note */}
                  <div>
                    <label className="block text-sm font-semibold text-[#25324B] mb-2">Cover Note *</label>
                    <textarea
                      rows={5} placeholder="Tell us why you'd be a great fit for this role..."
                      value={form.cover_note} onChange={(e) => handleChange('cover_note', e.target.value)}
                      className={`w-full px-4 py-3 border text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue resize-none transition-colors ${
                        errors.cover_note ? 'border-red-400 bg-red-50/50' : 'border-[#D6DDEB] focus:border-[#4640DE]'
                      }`}
                    />
                    {errors.cover_note && <p className="mt-1 text-sm text-red-500">{errors.cover_note}</p>}
                  </div>

                  <button
                    type="submit" disabled={submitting}
                    className="w-full sm:w-auto px-10 py-3 bg-[#4640DE] text-white font-bold text-base hover:bg-[#3530c9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : 'Submit Application'}
                  </button>
                </form>
              </div>
            )}

            {/* Job Description */}
            <div className="bg-white border border-[#D6DDEB] p-8">
              <h2 className="font-clash text-xl font-semibold text-[#25324B] mb-6">Description</h2>
              <div className="prose prose-sm max-w-none">
                {job.description.split('\n').map((line, i) => {
                  if (!line.trim()) return <br key={i} />;
                  if (line.startsWith('- ')) {
                    return (
                      <div key={i} className="flex items-start gap-3 mb-2 ml-2">
                        <div className="w-1.5 h-1.5 bg-[#4640DE] rounded-full mt-2 shrink-0" />
                        <p className="text-[#515B6F] text-base leading-relaxed">{line.substring(2)}</p>
                      </div>
                    );
                  }
                  if (line.endsWith(':')) {
                    return <h3 key={i} className="font-epilogue font-semibold text-[#25324B] text-base mt-6 mb-3">{line}</h3>;
                  }
                  return <p key={i} className="text-[#515B6F] text-base leading-relaxed mb-3">{line}</p>;
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[340px] shrink-0">
            <div className="sticky top-[90px] space-y-6">
              {/* About this role */}
              <div className="bg-white border border-[#D6DDEB] p-6">
                <h3 className="font-epilogue font-bold text-lg text-[#25324B] mb-5">About this role</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#7C8493] text-sm">Job Type</span>
                    <span className="text-[#25324B] text-sm font-medium">{job.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7C8493] text-sm">Category</span>
                    <span className="text-[#25324B] text-sm font-medium">{job.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7C8493] text-sm">Posted</span>
                    <span className="text-[#25324B] text-sm font-medium">{createdDate}</span>
                  </div>
                </div>

                {/* Apply button in sidebar */}
                <button
                  onClick={() => { setShowApplyForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full mt-6 px-6 py-3 bg-[#4640DE] text-white font-bold text-base hover:bg-[#3530c9] transition-colors"
                >
                  Apply Now
                </button>
              </div>

              {/* Categories / Tags */}
              <div className="bg-white border border-[#D6DDEB] p-6">
                <h3 className="font-epilogue font-bold text-lg text-[#25324B] mb-5">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 text-sm font-semibold rounded-full tag-full-time">{job.type}</span>
                  {(job.tags || []).map((tag) => (
                    <span key={tag} className={`px-3 py-1.5 text-sm font-semibold rounded-full ${
                      tagColorMap[tag.toLowerCase().replace(/\s+/g, '')] || 'tag-design'
                    }`}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Company info */}
              <div className="bg-white border border-[#D6DDEB] p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: job.logoColor || '#4640DE' }}
                  >
                    {job.logo || job.company?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-epilogue font-bold text-base text-[#25324B]">{job.company}</h4>
                    <Link to="/jobs" className="text-sm text-[#4640DE] hover:underline">View more jobs</Link>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#7C8493] text-sm">
                  <HiLocationMarker size={16} />
                  {job.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
