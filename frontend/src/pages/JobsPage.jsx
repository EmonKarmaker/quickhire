import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getJobs } from '../services/api';
import JobCard from '../components/common/JobCard';
import { HiSearch, HiLocationMarker, HiX, HiAdjustments } from 'react-icons/hi';

const CATEGORIES = ['All','Design','Sales','Marketing','Finance','Technology','Engineering','Business','Human Resource'];
const JOB_TYPES = ['All','Full Time','Part Time','Remote','Internship'];

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedType, setSelectedType] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const fetchJobs = async (overrides = {}) => {
    setLoading(true);
    try {
      const params = {};
      const s = overrides.search !== undefined ? overrides.search : search;
      const loc = overrides.location !== undefined ? overrides.location : locationFilter;
      const cat = overrides.category !== undefined ? overrides.category : selectedCategory;
      const type = overrides.type !== undefined ? overrides.type : selectedType;
      if (s) params.search = s;
      if (loc) params.location = loc;
      if (cat && cat !== 'All') params.category = cat;
      if (type && type !== 'All') params.type = type;
      const res = await getJobs(params);
      setJobs(res.data.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, [selectedCategory, selectedType]);

  useEffect(() => {
    const cat = searchParams.get('category');
    const s = searchParams.get('search');
    const loc = searchParams.get('location');
    if (cat) setSelectedCategory(cat);
    if (s) setSearch(s);
    if (loc) setLocationFilter(loc);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (locationFilter) params.set('location', locationFilter);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    setSearchParams(params);
    fetchJobs();
  };

  const clearFilters = () => {
    setSearch(''); setLocationFilter(''); setSelectedCategory('All'); setSelectedType('All');
    setSearchParams({});
    fetchJobs({ search: '', location: '', category: 'All', type: 'All' });
  };

  const hasActiveFilters = search || locationFilter || selectedCategory !== 'All' || selectedType !== 'All';

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      {/* Search Header */}
      <div className="bg-white border-b border-[#D6DDEB]">
        <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="font-clash text-[32px] md:text-[40px] font-semibold text-[#25324B] mb-2">
              Find your <span className="text-[#26A4FF]">dream job</span>
            </h1>
            <p className="text-[#515B6F] text-base">Find your next career at companies like HubSpot, Nike, and Dropbox</p>
          </div>

          <form onSubmit={handleSearch}>
            <div className="bg-white border border-[#D6DDEB] flex flex-col sm:flex-row items-stretch">
              <div className="flex items-center gap-3 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#D6DDEB]">
                <HiSearch className="text-[#25324B] shrink-0" size={20} />
                <input type="text" placeholder="Job title or keyword" value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue bg-transparent" />
              </div>
              <div className="flex items-center gap-3 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#D6DDEB]">
                <HiLocationMarker className="text-[#25324B] shrink-0" size={20} />
                <input type="text" placeholder="City or country" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full text-base text-[#25324B] placeholder:text-[#A8ADB7] outline-none font-epilogue bg-transparent" />
              </div>
              <button type="submit" className="px-8 py-3 bg-[#4640DE] text-white font-bold text-base hover:bg-[#3530c9] transition-colors">Search</button>
            </div>
          </form>

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-[#A8ADB7] text-sm">Popular:</span>
            {['UI Designer','UX Researcher','Android','Admin'].map((tag) => (
              <button key={tag} onClick={() => { setSearch(tag); fetchJobs({ search: tag }); }}
                className="text-sm text-[#515B6F] hover:text-[#4640DE] transition-colors cursor-pointer">{tag}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-[240px] shrink-0">
            <div className="sticky top-[90px]">
              <div className="mb-8">
                <h3 className="font-epilogue font-bold text-base text-[#25324B] mb-4">Category</h3>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 text-sm font-medium transition-all rounded ${
                        selectedCategory === cat ? 'bg-[#E9E8FF] text-[#4640DE]' : 'text-[#515B6F] hover:bg-gray-50 hover:text-[#4640DE]'
                      }`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <h3 className="font-epilogue font-bold text-base text-[#25324B] mb-4">Job Type</h3>
                <div className="space-y-1">
                  {JOB_TYPES.map((type) => (
                    <label key={type} className="flex items-center gap-3 px-3 py-2 cursor-pointer group">
                      <input type="radio" name="jobType" checked={selectedType === type} onChange={() => setSelectedType(type)}
                        className="w-4 h-4 accent-[#4640DE]" />
                      <span className={`text-sm font-medium transition-colors ${
                        selectedType === type ? 'text-[#4640DE]' : 'text-[#515B6F] group-hover:text-[#25324B]'
                      }`}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center gap-2 text-sm font-medium text-[#FF6550] hover:text-[#e5503a] transition-colors">
                  <HiX size={16} /> Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button onClick={() => setShowMobileFilters(true)}
            className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#4640DE] text-white rounded-full shadow-lg flex items-center justify-center">
            <HiAdjustments size={24} />
          </button>

          {/* Mobile Filter Overlay */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowMobileFilters(false)}>
              <div className="absolute right-0 top-0 h-full w-[300px] bg-white p-6 overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-epilogue font-bold text-lg text-[#25324B]">Filters</h3>
                  <button onClick={() => setShowMobileFilters(false)}><HiX size={24} className="text-[#7C8493]" /></button>
                </div>
                <div className="mb-6">
                  <h4 className="font-epilogue font-bold text-sm text-[#25324B] mb-3">Category</h4>
                  {CATEGORIES.map((cat) => (
                    <button key={cat} onClick={() => { setSelectedCategory(cat); setShowMobileFilters(false); }}
                      className={`w-full text-left px-3 py-2 text-sm rounded ${
                        selectedCategory === cat ? 'bg-[#E9E8FF] text-[#4640DE] font-medium' : 'text-[#515B6F]'
                      }`}>{cat}</button>
                  ))}
                </div>
                <div className="mb-6">
                  <h4 className="font-epilogue font-bold text-sm text-[#25324B] mb-3">Job Type</h4>
                  {JOB_TYPES.map((type) => (
                    <label key={type} className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                      <input type="radio" name="mobileJobType" checked={selectedType === type}
                        onChange={() => { setSelectedType(type); setShowMobileFilters(false); }} className="w-4 h-4 accent-[#4640DE]" />
                      <span className="text-sm text-[#515B6F]">{type}</span>
                    </label>
                  ))}
                </div>
                {hasActiveFilters && (
                  <button onClick={() => { clearFilters(); setShowMobileFilters(false); }}
                    className="w-full py-3 border border-[#FF6550] text-[#FF6550] font-medium text-sm rounded">Clear all filters</button>
                )}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-epilogue font-bold text-[#25324B] text-lg">All Jobs</h2>
                <p className="text-[#7C8493] text-sm mt-1">
                  Showing {jobs.length} results
                  {selectedCategory !== 'All' && <span> in <span className="text-[#4640DE] font-medium">{selectedCategory}</span></span>}
                  {search && <span> for &quot;<span className="text-[#4640DE] font-medium">{search}</span>&quot;</span>}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-[#7C8493]">Sort by:</span>
                <select className="text-sm font-medium text-[#25324B] bg-transparent outline-none cursor-pointer">
                  <option>Most relevant</option><option>Newest</option><option>Oldest</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {search && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E9E8FF] text-[#4640DE] text-sm font-medium rounded-full">
                    {search}<button onClick={() => { setSearch(''); fetchJobs({ search: '' }); }}><HiX size={14} /></button>
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E9E8FF] text-[#4640DE] text-sm font-medium rounded-full">
                    {selectedCategory}<button onClick={() => setSelectedCategory('All')}><HiX size={14} /></button>
                  </span>
                )}
                {locationFilter && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E9E8FF] text-[#4640DE] text-sm font-medium rounded-full">
                    {locationFilter}<button onClick={() => { setLocationFilter(''); fetchJobs({ location: '' }); }}><HiX size={14} /></button>
                  </span>
                )}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-20"><div className="spinner" /></div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-[#E9E8FF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiSearch size={32} className="text-[#4640DE]" />
                </div>
                <h3 className="font-epilogue font-semibold text-xl text-[#25324B] mb-2">No jobs found</h3>
                <p className="text-[#7C8493] text-base mb-6 max-w-md mx-auto">Try adjusting your filters or search terms.</p>
                <button onClick={clearFilters} className="px-6 py-3 bg-[#4640DE] text-white font-bold text-sm hover:bg-[#3530c9] transition-colors">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {jobs.map((job, index) => (
                  <div key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}>
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
