export default function CompanyLogos() {
  const companies = [
    { name: 'Vodafone', text: 'Vodafone' },
    { name: 'Intel', text: 'intel.' },
    { name: 'Tesla', text: 'Tesla' },
    { name: 'AMD', text: 'AMD' },
    { name: 'Talkit', text: 'Talkit' },
  ];

  return (
    <section className="py-8 border-b border-[#D6DDEB]">
      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[#A8ADB7] text-lg mb-8">
          Companies we helped grow
        </p>
        <div className="flex items-center justify-between gap-8 flex-wrap">
          {companies.map((company) => (
            <div
              key={company.name}
              className="text-[#A8ADB7] font-clash font-semibold text-xl sm:text-2xl opacity-60 hover:opacity-100 transition-opacity cursor-default"
            >
              {company.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
