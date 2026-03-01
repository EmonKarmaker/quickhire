import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="bg-[#202430] text-white">
      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#4640DE] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="font-clash font-bold text-2xl text-white">QuickHire</span>
            </Link>
            <p className="text-[#A8ADB7] text-base leading-relaxed max-w-[280px]">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About Column */}
          <div className="md:col-span-2">
            <h4 className="font-epilogue font-semibold text-lg mb-5">About</h4>
            <ul className="space-y-4">
              {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#A8ADB7] text-base hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="md:col-span-2">
            <h4 className="font-epilogue font-semibold text-lg mb-5">Resources</h4>
            <ul className="space-y-4">
              {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#A8ADB7] text-base hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4">
            <h4 className="font-epilogue font-semibold text-lg mb-3">Get job notifications</h4>
            <p className="text-[#A8ADB7] text-base mb-5">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8ADB7]" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[#363944] text-white placeholder:text-[#A8ADB7] text-sm outline-none focus:border-[#4640DE] transition-colors"
                />
              </div>
              <button className="px-5 py-3 bg-[#4640DE] text-white font-semibold text-sm hover:bg-[#3530c9] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#363944] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A8ADB7] text-sm">
            2021 © QuickHire. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[FaFacebookF, HiOutlineMail, FaInstagram, FaLinkedinIn, FaTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full bg-[#363944] flex items-center justify-center text-white hover:bg-[#4640DE] transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
