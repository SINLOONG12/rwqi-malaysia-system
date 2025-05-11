
import React from 'react';
import PollutionAlert from './PollutionAlert';
import KeyMetricsGrid from './KeyMetricsGrid';
import RiverFlowChart from './RiverFlowChart';
import RiverQualityGauge from './RiverQualityGauge';
import RiverQualityTrendChart from './RiverQualityTrendChart';
import GovernmentContent from './GovernmentContent';
import CleanupContent from './CleanupContent';
import PublicContent from './PublicContent';
import RiverQualityDataTable from './RiverQualityDataTable';
import ChartContainer from './charts/ChartContainer';

interface OverviewTabProps {
  userRole: "government" | "cleanup" | "public" | "publisher";
  lowestRwqiLocation: any;
  latestDate: any;
  onDownloadReport: () => void;
  onSubmitFeedback: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  userRole, 
  lowestRwqiLocation, 
  latestDate,
  onDownloadReport,
  onSubmitFeedback
}) => {
  return (
    <div className="space-y-6">
      <PollutionAlert 
        location={lowestRwqiLocation.location} 
        score={lowestRwqiLocation.rwqiScore} 
        userRole={userRole} 
      />
      
      <KeyMetricsGrid data={latestDate} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer height={280}>
          <RiverFlowChart />
        </ChartContainer>
        <ChartContainer height={280}>
          <RiverQualityGauge />
        </ChartContainer>
      </div>
      
      <ChartContainer height={350}>
        <RiverQualityTrendChart />
      </ChartContainer>

      {userRole === "government" && (
        <GovernmentContent onDownloadReport={onDownloadReport} />
      )}

      {userRole === "cleanup" && (
        <CleanupContent />
      )}

      {userRole === "public" && (
        <PublicContent onSubmitFeedback={onSubmitFeedback} />
      )}

      <RiverQualityDataTable />
    </div>
  );
};

export default OverviewTab;
