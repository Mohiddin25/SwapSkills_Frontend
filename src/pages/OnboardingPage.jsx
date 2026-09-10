import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { SkillSelector } from '../components/skills/SkillSelector';
import { SkillTag } from '../components/skills/SkillTag';
import { AvailabilityEditor } from '../components/availability/AvailabilityEditor';
import { AvailabilityGrid } from '../components/availability/AvailabilityGrid';
import { useAuth } from '../context/AuthContext';
import { Check, ArrowRight, ArrowLeft, GraduationCap, CheckCircle2 } from 'lucide-react';

export function OnboardingPage() {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [skillsTeach, setSkillsTeach] = useState(
    user?.skillsTeach?.length ? user.skillsTeach : [
      { name: 'Python', level: 'Advanced' },
      { name: 'C++', level: 'Intermediate' }
    ]
  );
  const [skillsLearn, setSkillsLearn] = useState(
    user?.skillsLearn?.length ? user.skillsLearn : [
      { name: 'React', level: 'Intermediate' },
      { name: 'UI/UX Design', level: 'Beginner' }
    ]
  );
  const [availability, setAvailability] = useState(
    user?.availability?.length ? user.availability : [
      { id: 'av-1', day: 'Monday', time: '5:00 PM – 7:00 PM', start: '17:00', end: '19:00' },
      { id: 'av-2', day: 'Wednesday', time: '4:00 PM – 6:00 PM', start: '16:00', end: '18:00' },
      { id: 'av-3', day: 'Saturday', time: '10:00 AM – 1:00 PM', start: '10:00', end: '13:00' }
    ]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: 'What can you teach?' },
    { number: 2, title: 'What do you want to learn?' },
    { number: 3, title: 'When are you available?' },
    { number: 4, title: 'Review your profile' }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await completeOnboarding({
        skillsTeach,
        skillsLearn,
        availability
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-10 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-3xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E4E7EC] mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1B365D] text-white flex items-center justify-center font-bold text-sm">
              SS
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-[#111625] block">
                SKILL SWAP
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#5C6479]">
                Academic Setup
              </span>
            </div>
          </div>
          <div className="text-xs text-[#5C6479]">
            Step {currentStep} of 4
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8">
          {steps.map((step) => {
            const isDone = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            return (
              <div key={step.number} className="space-y-1.5">
                <div
                  className={`h-1.5 rounded-full transition-colors ${
                    isDone || isCurrent ? 'bg-[#1B365D]' : 'bg-[#E4E7EC]'
                  }`}
                />
                <span
                  className={`hidden sm:block text-[11px] font-medium truncate ${
                    isCurrent ? 'text-[#1B365D]' : 'text-[#5C6479]'
                  }`}
                >
                  {step.number}. {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content Container */}
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 sm:p-8 space-y-6">
          {/* STEP 1: What can you teach? */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1B365D]">
                  Step 01
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#111625] mt-1">
                  What can you teach?
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6479] mt-1 leading-relaxed">
                  List skills you are confident explaining or mentoring peers in, and specify your current proficiency level.
                </p>
              </div>

              <SkillSelector
                skills={skillsTeach}
                onChange={setSkillsTeach}
                type="teach"
                label="Teaching Capabilities"
                placeholder="Search or add a skill e.g. Python, C++, Video Editing..."
              />
            </div>
          )}

          {/* STEP 2: What do you want to learn? */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1B365D]">
                  Step 02
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#111625] mt-1">
                  What do you want to learn?
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6479] mt-1 leading-relaxed">
                  Target technologies, creative disciplines, or academic subjects you want a compatible peer to guide you through.
                </p>
              </div>

              <SkillSelector
                skills={skillsLearn}
                onChange={setSkillsLearn}
                type="learn"
                label="Learning Goals"
                placeholder="Search or add a learning target e.g. React, UI/UX Design, System Design..."
              />
            </div>
          )}

          {/* STEP 3: When are you available? */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1B365D]">
                  Step 03
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#111625] mt-1">
                  When are you available?
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6479] mt-1 leading-relaxed">
                  Declare weekly hours you can dedicate to peer exchange. Overlapping availability directly drives match rankings.
                </p>
              </div>

              <AvailabilityEditor
                availability={availability}
                onSave={setAvailability}
              />

              <div className="pt-4 border-t border-[#E4E7EC]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5C6479] mb-3">
                  Schedule Grid Preview
                </h4>
                <AvailabilityGrid availability={availability} />
              </div>
            </div>
          )}

          {/* STEP 4: Review Profile Summary */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1B365D]">
                  Step 04
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#111625] mt-1">
                  Review your profile
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6479] mt-1 leading-relaxed">
                  Review your academic listing before activating your profile on the campus network.
                </p>
              </div>

              <div className="space-y-4">
                {/* User info */}
                <div className="p-4 bg-[#FBFBFA] border border-[#E4E7EC] rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-[#111625]">{user?.name || 'Alex Johnson'}</h3>
                    <p className="text-xs text-[#5C6479]">{user?.department} · {user?.year}</p>
                    <p className="text-xs text-[#5C6479] mt-0.5">{user?.email}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#E6F4EA] text-[#0E6245] border border-[#C2E7D1] rounded-md">
                    Ready to Activate
                  </span>
                </div>

                {/* Skills Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-[#E4E7EC] rounded-xl bg-white space-y-2">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C6479]">
                      You Can Teach ({skillsTeach.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsTeach.map((s, idx) => (
                        <SkillTag key={idx} skill={s} type="teach" size="sm" />
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border border-[#E4E7EC] rounded-xl bg-white space-y-2">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C6479]">
                      You Want to Learn ({skillsLearn.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsLearn.map((s, idx) => (
                        <SkillTag key={idx} skill={s} type="learn" size="sm" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Availability Summary */}
                <div className="p-4 border border-[#E4E7EC] rounded-xl bg-white space-y-2">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C6479]">
                    Weekly Availability ({availability.length} Windows)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {availability.map((slot) => (
                      <span
                        key={slot.id}
                        className="text-xs px-2.5 py-1 rounded-md bg-[#F0F4F8] border border-[#D0DCE7] text-[#1B365D] font-medium"
                      >
                        {slot.day}: {slot.time}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-6 border-t border-[#E4E7EC] flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                size="md"
                icon={ArrowLeft}
                onClick={handleBack}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleComplete}
                isLoading={isSubmitting}
                icon={CheckCircle2}
              >
                Complete Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
