interface PerformanceData {
  sttLatency: number;
  intentRecognition: number;
  apiResponse: number;
  ttsGeneration: number;
  endToEndLatency: number;
  successRate: number;
}

export const defaultMaterics: PerformanceData = {
  sttLatency: 320,
  intentRecognition: 180,
  apiResponse: 650,
  ttsGeneration: 350,
  endToEndLatency: 2400,
  successRate: 94.2,
};
