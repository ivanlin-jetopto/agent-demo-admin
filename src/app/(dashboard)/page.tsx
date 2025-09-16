import UserActivity from '@/components/UserActivity';
import BusinessMetrics from '@/components/BusinessMetrics';
import UserActivityTrend from '@/components/UserActivityTrend';
import ConversationVolumeChart from '@/components/ConversationVolumeChart';
import FunctionCallTrend from '@/components/FunctionCallTrend';
import ErrorRateTrend from '@/components/ErrorRateTrend';
import TaskQueue from '@/components/TaskQueue';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 my-4 flex flex-col gap-4">
      <div className="flex flex-row gap-4 justify-around">
        {/* 用戶活躍度 */}
        {/* <UserActivity /> */}

        {/* AI Agent 業務指標 */}
        <BusinessMetrics />
      </div>
      {/* 即時任務狀態 */}
      <TaskQueue />

      {/* 7日用戶活躍度趨勢圖 */}
      {/* <UserActivityTrend /> */}

      {/* 24小時對話量分布圖 */}
      <ConversationVolumeChart />

      {/* Function Call 使用趨勢 */}
      <FunctionCallTrend />

      {/* 錯誤率變化曲線 */}
      <ErrorRateTrend />
    </main>
  );
}
