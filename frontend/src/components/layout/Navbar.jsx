import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-[1192px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4640DE] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="font-clash font-bold text-2xl text-[#25324B]">
              QuickHire
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/jobs"
              className={`text-base font-medium transition-colors ${
                isActive('/jobs') ? 'text-[#4640DE]' : 'text-[#515B6F] hover:text-[#4640DE]'
              }`}
            >
              Find Jobs
            </Link>
            <Link
              to="/jobs"
              className="text-base font-medium text-[#515B6F] hover:text-[#4640DE] transition-colors"
            >
              Browse Companies
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/admin"
              className="text-base font-bold text-[#4640DE] hover:text-[#3530c9] transition-colors"
            >
              Login
            </Link>
            <div className="w-px h-[48px] bg-[#D6DDEB]" />
            <Link
              to="/admin"
              className="px-6 py-3 bg-[#4640DE] text-white font-bold text-base rounded-[0px] hover:bg-[#3530c9] transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#25324B]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-3 pt-4">
              <Link
                to="/jobs"
                className="text-base font-medium text-[#515B6F] hover:text-[#4640DE] px-2 py-2"
                onClick={() => setMobileOpen(false)}
              >
                Find Jobs
              </Link>
              <Link
                to="/jobs"
                className="text-base font-medium text-[#515B6F] hover:text-[#4640DE] px-2 py-2"
                onClick={() => setMobileOpen(false)}
              >
                Browse Companies
              </Link>
              <hr className="border-gray-100" />
              <Link
                to="/admin"
                className="text-base font-bold text-[#4640DE] px-2 py-2"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/admin"
                className="mx-2 px-6 py-3 bg-[#4640DE] text-white font-bold text-base text-center"
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
