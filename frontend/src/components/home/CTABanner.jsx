export default function CTABanner() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#4640DE] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between py-12 px-8 lg:px-16 gap-8">
          {/* Left text */}
          <div className="text-white z-10 text-center lg:text-left">
            <h2 className="font-clash text-[36px] md:text-[48px] font-semibold leading-tight mb-4">
              Start posting<br />
              jobs today
            </h2>
            <p className="text-white/70 text-lg mb-6">
              Start posting jobs for only $10.
            </p>
            <button className="px-8 py-4 bg-white text-[#4640DE] font-bold text-base hover:bg-gray-100 transition-colors">
              Sign Up For Free
            </button>
          </div>

          {/* Right decorative dashboard image area */}
          <div className="relative z-10 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 w-[400px]">
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#4640DE] rounded-full" />
                    <div>
                      <div className="text-xs font-medium text-[#25324B]">Good morning, Marie</div>
                      <div className="text-[10px] text-[#7C8493]">Here is your job listings overview</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { value: '76', label: 'New candidates', color: '#4640DE' },
                    { value: '24', label: 'New messages', color: '#26A4FF' },
                    { value: '12', label: 'Interviews', color: '#FFB836' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#F8F8FD] rounded-lg p-2 text-center">
                      <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-[8px] text-[#7C8493]">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#F8F8FD] rounded-lg p-3">
                  <div className="text-xs font-medium text-[#25324B] mb-2">Job Statistics</div>
                  <div className="flex items-end gap-1 h-12">
                    {[40, 65, 35, 80, 55, 70, 45, 60, 75, 50, 85, 67].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h}%`,
                          background: i === 9 ? '#4640DE' : '#E9E8FF',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
      </div>
    </section>
  );
}
