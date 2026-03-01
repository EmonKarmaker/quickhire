import { Link } from 'react-router-dom';

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

export default function JobCard({ job }) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="group block bg-white border border-[#D6DDEB] p-6 hover:border-[#4640DE] transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        {/* Company Logo */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ backgroundColor: job.logoColor || '#4640DE' }}
        >
          {job.logo || job.company?.charAt(0)}
        </div>

        {/* Job Type Badge */}
        <span className="px-3 py-1 border border-[#4640DE] text-[#4640DE] text-sm font-medium">
          {job.type}
        </span>
      </div>

      {/* Job Info */}
      <h3 className="font-epilogue font-semibold text-lg text-[#25324B] mb-1 group-hover:text-[#4640DE] transition-colors">
        {job.title}
      </h3>
      <p className="text-[#7C8493] text-base mb-4">
        {job.company} · {job.location}
      </p>

      {/* Description snippet */}
      <p className="text-[#515B6F] text-sm leading-relaxed mb-6 line-clamp-2">
        {job.company} is looking for {job.title.includes('a') ? '' : 'a '}{job.title} to help team ma...
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {(job.tags || []).map((tag) => (
          <span
            key={tag}
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              tagColorMap[tag.toLowerCase().replace(/\s+/g, '')] || 'tag-design'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
