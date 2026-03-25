
import RevenueTrendCard from "@/app/components/RevenueTrendCard";
import DistributionCard from "@/app/components/DistributionCard";
import DashboardHeader from "../components/DashboardHeader";
import StatCardGroup from "@/component/Statcardgroup ";

const Dashboard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      <DashboardHeader />

      {/* Bento Grid Container */}
      <div className="bento-grid">
        <StatCardGroup />
        <RevenueTrendCard />
        <DistributionCard />
      </div>
    </div>
  );
};

export default Dashboard;