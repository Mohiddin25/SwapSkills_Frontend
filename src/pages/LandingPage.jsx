import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Users,
  Compass,
  Repeat,
  ShieldCheck
} from 'lucide-react';
import { NavbarPublic } from '../components/layout/NavbarPublic';
import { Button } from '../components/common/Button';
import { MatchScore } from '../components/matching/MatchScore';
import { SkillTag } from '../components/skills/SkillTag';
import { POPULAR_SKILLS } from '../constants/skills';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#111625] flex flex-col selection:bg-[#F0F4F8] selection:text-[#1B365D]">
      <NavbarPublic />

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl text-left mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#F0F4F8] border border-[#D0DCE7] text-[#1B365D] text-xs font-semibold uppercase tracking-wider mb-6">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Peer Learning · Campus Community</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111625] leading-[1.08] mb-6">
            Trade skills.<br />Learn together.
          </h1>

          <p className="text-base sm:text-lg text-[#5C6479] leading-relaxed max-w-2xl mb-8">
            Find students who can teach what you want to learn — while sharing the skills you already have. An editorial academic exchange built exclusively for university students.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              onClick={() => navigate('/signup')}
            >
              Find Your Match
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              How It Works
            </Button>
          </div>
        </div>

        {/* Hero Visual: Realistic Editorial Product UI */}
        <div className="w-full bg-white border border-[#E4E7EC] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-4 mb-6">
            <div className="text-left">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6479]">
                Live Algorithmic Compatibility Example
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-[#111625]">
                Verified Campus Reciprocity Match
              </h3>
            </div>
            <span className="text-xs text-[#5C6479] hidden sm:inline">
              Engine: 50% Skill · 25% Time · 15% Level · 10% Proximity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Candidate 1: Priya Sharma */}
            <div className="p-5 border border-[#E4E7EC] rounded-xl bg-[#FBFBFA]/70 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-semibold text-[#111625]">Priya Sharma</h4>
                  <p className="text-xs text-[#5C6479]">Computer Science & Engineering · 2nd Year</p>
                </div>
                <MatchScore score={95} />
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C6479] block mb-1">
                    Offers Instruction In
                  </span>
                  <SkillTag skill={{ name: 'UI/UX Design', level: 'Advanced' }} type="teach" size="sm" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C6479] block mb-1">
                    Seeking Mentorship In
                  </span>
                  <SkillTag skill={{ name: 'Python', level: 'Intermediate' }} type="learn" size="sm" />
                </div>
              </div>

              <div className="pt-2 border-t border-[#E4E7EC] flex items-center gap-2 text-xs text-[#5C6479]">
                <Calendar className="w-3.5 h-3.5 text-[#1B365D]" />
                <span>Mutual availability: <strong>Saturday · 4:00–5:00 PM</strong></span>
              </div>
            </div>

            {/* Candidate 2: Rahul Verma */}
            <div className="p-5 border border-[#E4E7EC] rounded-xl bg-[#FBFBFA]/70 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-semibold text-[#111625]">Rahul Verma</h4>
                  <p className="text-xs text-[#5C6479]">Electronics & Communication · 3rd Year</p>
                </div>
                <MatchScore score={88} />
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C6479] block mb-1">
                    Offers Instruction In
                  </span>
                  <SkillTag skill={{ name: 'Python', level: 'Advanced' }} type="teach" size="sm" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C6479] block mb-1">
                    Seeking Mentorship In
                  </span>
                  <SkillTag skill={{ name: 'UI/UX Design', level: 'Beginner' }} type="learn" size="sm" />
                </div>
              </div>

              <div className="pt-2 border-t border-[#E4E7EC] flex items-center gap-2 text-xs text-[#5C6479]">
                <Calendar className="w-3.5 h-3.5 text-[#1B365D]" />
                <span>Mutual availability: <strong>Monday · 5:00–7:00 PM</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 border-t border-[#E4E7EC] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-2xl mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1B365D] block mb-2">
              Academic Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111625]">
              How Skill Swap works
            </h2>
            <p className="text-sm sm:text-base text-[#5C6479] mt-2 leading-relaxed">
              A transparent, credit-based peer exchange system designed to unlock hidden talents across university departments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Step 01 */}
            <div className="border-t-2 border-[#1B365D] pt-6 space-y-3">
              <div className="text-2xl font-bold text-[#1B365D] tracking-tight">
                01
              </div>
              <h3 className="text-lg font-semibold text-[#111625]">
                Build your profile
              </h3>
              <p className="text-sm text-[#5C6479] leading-relaxed">
                Declare skills you can teach with proficiency levels (Beginner to Advanced), list skills you desire to learn, and establish your weekly campus availability blocks.
              </p>
            </div>

            {/* Step 02 */}
            <div className="border-t-2 border-[#1B365D] pt-6 space-y-3">
              <div className="text-2xl font-bold text-[#1B365D] tracking-tight">
                02
              </div>
              <h3 className="text-lg font-semibold text-[#111625]">
                Find compatible peers
              </h3>
              <p className="text-sm text-[#5C6479] leading-relaxed">
                Our transparent matching model evaluates reciprocal skill overlap, availability synchronization, skill-tier suitability, and campus proximity to rank optimal study partners.
              </p>
            </div>

            {/* Step 03 */}
            <div className="border-t-2 border-[#1B365D] pt-6 space-y-3">
              <div className="text-2xl font-bold text-[#1B365D] tracking-tight">
                03
              </div>
              <h3 className="text-lg font-semibold text-[#111625]">
                Learn and contribute
              </h3>
              <p className="text-sm text-[#5C6479] leading-relaxed">
                Send swap proposals, meet at designated campus study hubs or online, complete interactive pairing sessions, and earn recognized Skill Credits as a trusted contributor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reciprocity Model Section */}
      <section id="reciprocity" className="py-20 border-t border-[#E4E7EC] bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1B365D] block mb-2">
              The Reciprocity Principle
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111625] mb-4">
              Your skill can unlock someone else's.
            </h2>
            <p className="text-base text-[#5C6479] leading-relaxed mb-8">
              Students exchange knowledge without monetary transactions. When you coach a peer in your strongest discipline, you unlock direct mentorship in subjects where you seek guidance.
            </p>

            {/* Minimal Reciprocity Diagram */}
            <div className="p-6 bg-white border border-[#E4E7EC] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C6479] mb-1">
                  Step 1
                </span>
                <span className="text-sm font-semibold text-[#111625]">You teach</span>
              </div>
              <div className="text-xs text-[#5C6479] font-mono">?</div>
              <div className="flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C6479] mb-1">
                  Step 2
                </span>
                <span className="text-sm font-semibold text-[#111625]">They learn</span>
              </div>
              <div className="text-xs text-[#5C6479] font-mono">?</div>
              <div className="flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C6479] mb-1">
                  Step 3
                </span>
                <span className="text-sm font-semibold text-[#111625]">They teach</span>
              </div>
              <div className="text-xs text-[#5C6479] font-mono">?</div>
              <div className="flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C6479] mb-1">
                  Step 4
                </span>
                <span className="text-sm font-semibold text-[#111625]">You learn</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Skills Showcase */}
      <section id="explore-skills" className="py-20 border-t border-[#E4E7EC] bg-white text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1B365D] block mb-2">
                Campus Exchange Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111625]">
                Most requested peer skills
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
            >
              Browse Full Catalog
            </Button>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {POPULAR_SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-2 rounded-lg border border-[#E4E7EC] bg-[#FBFBFA] text-[#111625] text-xs font-medium hover:border-[#1B365D] transition-colors cursor-pointer"
                onClick={() => navigate('/signup')}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="mt-auto border-t border-[#E4E7EC] bg-[#FBFBFA] py-12 px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded bg-[#1B365D] text-white flex items-center justify-center font-bold text-[10px]">
                SS
              </div>
              <span className="text-xs font-bold tracking-wider text-[#111625]">
                SKILL SWAP
              </span>
            </div>
            <p className="text-xs text-[#5C6479]">
              Campus peer-learning and knowledge exchange system.
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#5C6479]">
            <span className="hover:text-[#111625] cursor-pointer">Academic Guidelines</span>
            <span className="hover:text-[#111625] cursor-pointer">Honor Code</span>
            <span className="hover:text-[#111625] cursor-pointer">Privacy & Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
