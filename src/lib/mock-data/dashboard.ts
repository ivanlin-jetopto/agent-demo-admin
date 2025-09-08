import { UserActivityType, BusinessMetricType } from '@/lib/types/dashboard';

export const userActivities: UserActivityType = {
  activeUsers: 1247,
  newUsersToday: 142,
  weeklyActiveUsers: 8756,
  averageSessionDuration: 28.5,
};

export const businessMetrics: BusinessMetricType = {
  totalConversationsToday: 3847,
  averageConversationTurns: 4.2,
  apiCalls: 15623,
  taskCompletionRate: 87.3,
};

// Generate 7-day trend data with dynamic dates
export const generateWeeklyTrendData = () => {
  const today = new Date();
  const data = [];
  const variations = [1150, 1234, 1189, 1356, 1423, 1298, 1247];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      users: variations[6 - i],
    });
  }

  return data;
};

export const weeklyUserTrend = generateWeeklyTrendData();

// Generate 24-hour conversation volume data
export const generate24HourConversationData = () => {
  const hours = [];
  // Typical conversation pattern: low at night, peak during business hours
  const hourlyVolumes = [
    45,
    32,
    28,
    25,
    30,
    42,
    85,
    156, // 00:00 - 07:00
    234,
    289,
    312,
    298,
    187,
    278,
    325,
    341, // 08:00 - 15:00
    298,
    267,
    234,
    189,
    145,
    98,
    76,
    52, // 16:00 - 23:00
  ];

  for (let i = 0; i < 24; i++) {
    hours.push({
      hour: `${i.toString().padStart(2, '0')}:00`,
      conversations: hourlyVolumes[i],
    });
  }

  return hours;
};

export const hourlyConversationVolume = generate24HourConversationData();

// Generate Function Call usage trend data (7 days)
export const generateFunctionCallTrendData = () => {
  const today = new Date();
  const data = [];
  // Different function types with varying usage patterns
  const functionTypes = {
    search: [450, 523, 489, 612, 678, 589, 634],
    calculation: [234, 256, 289, 312, 298, 325, 341],
    database: [789, 834, 756, 923, 987, 845, 912],
    api: [567, 612, 534, 689, 723, 645, 701],
  };

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      search: functionTypes.search[6 - i],
      calculation: functionTypes.calculation[6 - i],
      database: functionTypes.database[6 - i],
      api: functionTypes.api[6 - i],
      total:
        functionTypes.search[6 - i] +
        functionTypes.calculation[6 - i] +
        functionTypes.database[6 - i] +
        functionTypes.api[6 - i],
    });
  }

  return data;
};

export const functionCallTrend = generateFunctionCallTrendData();

// Generate error rate trend data (24 hours) - static data for SSR
export const errorRateTrend = [
  { time: '00:00', errorRate: 1.2, requests: 1234, errors: 15 },
  { time: '01:00', errorRate: 0.8, requests: 1156, errors: 9 },
  { time: '02:00', errorRate: 0.6, requests: 1089, errors: 7 },
  { time: '03:00', errorRate: 0.5, requests: 1045, errors: 5 },
  { time: '04:00', errorRate: 0.7, requests: 1123, errors: 8 },
  { time: '05:00', errorRate: 1.1, requests: 1267, errors: 14 },
  { time: '06:00', errorRate: 2.3, requests: 1389, errors: 32 },
  { time: '07:00', errorRate: 3.1, requests: 1456, errors: 45 },
  { time: '08:00', errorRate: 4.2, requests: 1489, errors: 63 },
  { time: '09:00', errorRate: 3.8, requests: 1423, errors: 54 },
  { time: '10:00', errorRate: 3.5, requests: 1378, errors: 48 },
  { time: '11:00', errorRate: 4.1, requests: 1467, errors: 60 },
  { time: '12:00', errorRate: 2.8, requests: 1345, errors: 38 },
  { time: '13:00', errorRate: 3.2, requests: 1412, errors: 45 },
  { time: '14:00', errorRate: 3.9, requests: 1489, errors: 58 },
  { time: '15:00', errorRate: 4.5, requests: 1456, errors: 66 },
  { time: '16:00', errorRate: 3.6, requests: 1367, errors: 49 },
  { time: '17:00', errorRate: 2.9, requests: 1289, errors: 37 },
  { time: '18:00', errorRate: 2.1, requests: 1234, errors: 26 },
  { time: '19:00', errorRate: 1.8, requests: 1189, errors: 21 },
  { time: '20:00', errorRate: 1.5, requests: 1145, errors: 17 },
  { time: '21:00', errorRate: 1.3, requests: 1098, errors: 14 },
  { time: '22:00', errorRate: 1.0, requests: 1067, errors: 11 },
  { time: '23:00', errorRate: 0.9, requests: 1034, errors: 9 },
];
