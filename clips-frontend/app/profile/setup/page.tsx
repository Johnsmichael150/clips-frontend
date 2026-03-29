import React from 'react';
import { BasicInfoForm } from '@/components/profile-setup/BasicInfoForm';
import { OnboardingProgress } from '@/components/profile-setup/OnboardingProgress';

export const metadata = {
  title: 'Profile Setup - Clips',
  description: 'Set up your Creator profile',
};

export default function ProfileSetupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050505] px-4 py-8 relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#17f9bf]/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#17f9bf]/5 blur-[100px]"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Page heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 flex items-center justify-center gap-2 flex-wrap">
            Welcome to{' '}
            <span className="text-[#17f9bf] drop-shadow-[0_0_15px_rgba(23,249,191,0.3)]">
              Clips
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Complete your profile in three simple steps to start analyzing your content.
          </p>
        </div>

        {/* Progress Card + Form Card — stacked on mobile, side-by-side on lg+ */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
          {/* Progress Card */}
          <div className="w-full lg:w-64 lg:flex-shrink-0 mb-4 lg:mb-0">
            <OnboardingProgress currentStep={1} totalSteps={3} className="max-w-none mx-0 mb-0" />
          </div>

          {/* Form Card */}
          <div className="flex-1 min-w-0">
            <BasicInfoForm />
          </div>
        </div>
      </div>
    </main>
  );
}
