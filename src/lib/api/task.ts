interface TaskFlowRequest {
  id: string;
}
interface TaskFlowResponse {
  flow: string[];
}

export async function taskFlow(
  request: TaskFlowRequest
): Promise<TaskFlowResponse> {
  //   const response = await fetch(`api/task/${request.id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   if (!response.ok) {
  //     const errorText = await response.text();
  //     console.error('API Error:', errorText);
  //     throw new Error(`API error: ${response.status}`);
  //   }

  //   return response.json();

  return { flow: ['start', 'The AI is processing', 'func call', 'func call'] };
}
