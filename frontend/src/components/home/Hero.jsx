import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiSearch, HiLocationMarker } from 'react-icons/hi';

export default function Hero() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section className="bg-[#F8F8FD] relative overflow-hidden">
      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div className="animate-fade-in-up">
            <h1 className="font-clash text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.1] font-semibold text-[#25324B] mb-4">
              Discover{' '}
              <br />
              more than{' '}
              <br />
              <span className="text-[#26A4FF]">5000+</span> Jobs
            </h1>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-16 h-[1px] bg-[#4640DE]" />
              <p className="text-[#515B6F] text-lg leading-relaxed">
                Great platform for the job seeker that searching for new career heights and passionate about startups.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch}>
              <div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-4 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center">
                {/* Job title search */}
                <div className="flex items-center gap-3 flex-1 px-2">
                  <HiSearch className="text-[#25324B] shrink-0" size={24} />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full py-2 text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue"
                  />
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-10 bg-[#D6DDEB] mx-2" />

                {/* Location search */}
                <div className="flex items-center gap-3 flex-1 px-2">
                  <HiLocationMarker className="text-[#25324B] shrink-0" size={24} />
                  <input
                    type="text"
                    placeholder="Florence, Italy"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full py-2 text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue"
                  />
                </div>

                {/* Search button */}
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#4640DE] text-white font-bold text-base hover:bg-[#3530c9] transition-colors"
                >
                  Search my job
                </button>
              </div>
            </form>

            {/* Popular tags */}
            <p className="mt-4 text-[#515B6F] text-base">
              <span className="text-[#A8ADB7]">Popular : </span>
              UI Designer, UX Researcher, Android, Admin
            </p>
          </div>

          {/* Right - Hero Image Placeholder */}
          <div className="hidden lg:flex justify-end animate-fade-in-up animate-delay-200">
            <div className="relative w-full max-w-[500px]">
              {/* Decorative pattern */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-[#4640DE]/5 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#26A4FF]/5 rounded-full" />
              {/* Illustration placeholder */}
              <div className="relative bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#4640DE] flex items-center justify-center">
                      <span className="text-white font-bold text-lg">⚡</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#25324B]">10K+ Jobs</div>
                      <div className="text-sm text-[#7C8493]">Available now</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-[#4640DE]">→</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Design', count: 235, color: '#56CDAD' },
                    { label: 'Dev', count: 542, color: '#26A4FF' },
                    { label: 'Marketing', count: 140, color: '#FFB836' },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#F8F8FD] rounded-lg p-3 text-center">
                      <div className="text-xl font-bold" style={{ color: item.color }}>{item.count}</div>
                      <div className="text-xs text-[#7C8493] mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  {['UI/UX Designer — Spotify', 'Frontend Dev — Stripe', 'Marketing Lead — Notion'].map((job, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-[#515B6F]">{job}</span>
                      <span className="text-xs text-[#4640DE] font-medium">New</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
