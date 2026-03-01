import { useNavigate } from 'react-router-dom';
import { HiOutlinePencil, HiOutlineTrendingUp, HiOutlineSpeakerphone, HiOutlineCash, HiOutlineDesktopComputer, HiOutlineCode, HiOutlineBriefcase, HiOutlineUserGroup } from 'react-icons/hi';

const categories = [
  { name: 'Design', icon: HiOutlinePencil, count: 235, color: '#4640DE' },
  { name: 'Sales', icon: HiOutlineTrendingUp, count: 756, color: '#4640DE' },
  { name: 'Marketing', icon: HiOutlineSpeakerphone, count: 140, color: '#4640DE', highlighted: true },
  { name: 'Finance', icon: HiOutlineCash, count: 325, color: '#4640DE' },
  { name: 'Technology', icon: HiOutlineDesktopComputer, count: 436, color: '#4640DE' },
  { name: 'Engineering', icon: HiOutlineCode, count: 542, color: '#4640DE' },
  { name: 'Business', icon: HiOutlineBriefcase, count: 211, color: '#4640DE' },
  { name: 'Human Resource', icon: HiOutlineUserGroup, count: 346, color: '#4640DE' },
];

export default function CategorySection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-clash text-[36px] md:text-[48px] font-semibold text-[#25324B] leading-tight">
              Explore by <span className="text-[#26A4FF]">category</span>
            </h2>
          </div>
          <button
            onClick={() => navigate('/jobs')}
            className="hidden md:flex items-center gap-2 text-[#4640DE] font-semibold text-base hover:gap-3 transition-all"
          >
            Show all jobs
            <span>→</span>
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => navigate(`/jobs?category=${cat.name}`)}
                className={`group p-8 border border-[#D6DDEB] text-left transition-all duration-300 hover:bg-[#4640DE] hover:border-[#4640DE] ${
                  cat.highlighted ? 'bg-[#4640DE] border-[#4640DE]' : 'bg-white'
                }`}
              >
                <Icon
                  size={40}
                  className={`mb-8 transition-colors ${
                    cat.highlighted
                      ? 'text-white'
                      : 'text-[#4640DE] group-hover:text-white'
                  }`}
                />
                <h3
                  className={`font-epilogue font-semibold text-xl mb-2 transition-colors ${
                    cat.highlighted
                      ? 'text-white'
                      : 'text-[#25324B] group-hover:text-white'
                  }`}
                >
                  {cat.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-base transition-colors ${
                      cat.highlighted
                        ? 'text-white/80'
                        : 'text-[#7C8493] group-hover:text-white/80'
                    }`}
                  >
                    {cat.count} jobs available
                  </span>
                  <span
                    className={`text-lg transition-all group-hover:translate-x-1 ${
                      cat.highlighted ? 'text-white' : 'text-[#25324B] group-hover:text-white'
                    }`}
                  >
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

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
