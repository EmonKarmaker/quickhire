import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getJobs } from '../../services/api';

const tagColorMap = {
  marketing: 'tag-marketing',
  design: 'tag-design',
  business: 'tag-business',
  technology: 'tag-technology',
  engineering: 'tag-engineering',
  finance: 'tag-finance',
  'full-time': 'tag-full-time',
  fulltime: 'tag-fulltime',
  management: 'tag-management',
};

export default function LatestJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs();
        // Get the last 8 jobs for "latest"
        setJobs(res.data.data.slice(0, 8));
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-[#F8F8FD]">
      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-clash text-[36px] md:text-[48px] font-semibold text-[#25324B] leading-tight">
            Latest <span className="italic text-[#26A4FF]">jobs open</span>
          </h2>
          <button
            onClick={() => navigate('/jobs')}
            className="hidden md:flex items-center gap-2 text-[#4640DE] font-semibold text-base hover:gap-3 transition-all"
          >
            Show all jobs
            <span>→</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="spinner" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="group flex items-start gap-6 bg-white border border-[#D6DDEB] p-6 hover:border-[#4640DE] transition-all duration-300 hover:shadow-md"
              >
                {/* Company Logo */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                  style={{ backgroundColor: job.logoColor || '#4640DE' }}
                >
                  {job.logo || job.company?.charAt(0)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-epilogue font-semibold text-lg text-[#25324B] group-hover:text-[#4640DE] transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-[#7C8493] text-sm mb-3">
                    {job.company} · {job.location}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full tag-full-time">
                      {job.type}
                    </span>
                    {(job.tags || []).slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                          tagColorMap[tag.toLowerCase().replace(/\s+/g, '')] || 'tag-design'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate('/jobs')}
          className="md:hidden mt-8 flex items-center gap-2 text-[#4640DE] font-semibold text-base mx-auto"
        >
          Show all jobs →
        </button>
      </div>
    </section>
  );
}
