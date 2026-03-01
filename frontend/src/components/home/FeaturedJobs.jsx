import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobs } from '../../services/api';
import JobCard from '../common/JobCard';

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs();
        setJobs(res.data.data.slice(0, 8));
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-clash text-[36px] md:text-[48px] font-semibold text-[#25324B] leading-tight">
            Featured <span className="italic text-[#26A4FF]">jobs</span>
          </h2>
          <button
            onClick={() => navigate('/jobs')}
            className="hidden md:flex items-center gap-2 text-[#4640DE] font-semibold text-base hover:gap-3 transition-all"
          >
            Show all jobs
            <span>→</span>
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="spinner" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Mobile show all */}
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
