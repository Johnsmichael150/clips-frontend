import ProgressCard from "@/components/ProgressCard";
import AiInsightCard from "./components/AiInsightCard";
import MetricsCards from "./MetricsCards";
import ProcessDashboard from "./components/ProcessDashboard";
import ConnectAccountsSection from "./components/ConnectAccountsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Main content */}
      <main className="flex-1 pl-64 p-8 lg:p-12">
        <div className="w-full max-w-7xl mx-auto space-y-12">
          {/* Hero + Process */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col justify-center gap-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white">
                Transform Your Content with AI-Powered Clips
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-400">
                Create viral-ready clips from your long-form content in seconds.
                Our AI analyzes, edits, and optimizes your videos for maximum engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-white text-black px-6 transition-colors hover:bg-zinc-200"
                  href="/create"
                >
                  Get Started
                </a>
                <a
                  className="flex h-12 items-center justify-center rounded-full border border-white/20 px-6 transition-colors hover:bg-white/10"
                  href="/learn-more"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg">
                <ProcessDashboard />
              </div>
            </div>
          </section>

          {/* AI Insight */}
          <section className="w-full flex justify-center">
            <AiInsightCard />
          </section>

          {/* Progress */}
          <section>
            <ProgressCard
              percentage={87}
              estimatedTimeRemaining="1 minute 15 seconds"
            />
          </section>

          {/* Connect Accounts */}
          <section>
            <ConnectAccountsSection />
          </section>

          {/* Metrics */}
          <section>
            <MetricsCards />
          </section>
        </div>
      </main>
    </div>
  );
}