import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { ArrowRight } from 'lucide-react';

export function NavbarPublic() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#E4E7EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1B365D] text-white flex items-center justify-center font-bold text-sm tracking-wider">
            SS
          </div>
          <div className="text-left">
            <span className="text-sm font-bold tracking-tight text-[#111625] block leading-none">
              SKILL SWAP
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#5C6479] font-medium block mt-1">
              Peer Learning
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C6479]">
          <a href="#how-it-works" className="hover:text-[#111625] transition-colors">
            How it works
          </a>
          <a href="#explore-skills" className="hover:text-[#111625] transition-colors">
            Explore skills
          </a>
          <a href="#reciprocity" className="hover:text-[#111625] transition-colors">
            Reciprocity model
          </a>
        </nav>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/login')}
          >
            Log in
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            onClick={() => navigate('/signup')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
