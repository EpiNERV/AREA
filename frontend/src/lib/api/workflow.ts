import AxiosInstance from "@/lib/auth/axiosInstance";

interface Workflow {
    _id: string;
    name: string;
}

// Fetch all workflows
export const fetchWorkflows = async () => {
  const response = await AxiosInstance.get<Workflow[]>(`/workflow`);
  return response.data;
};

// Create a new workflow
export const createWorkflow = async (name: string) => {
  const response = await AxiosInstance.post<Workflow>(
    `/workflow`,
    { name },
  );
  return response.data;
};

// Update a workflow
export const updateWorkflow = async (id: string, name: string) => {
  const response = await AxiosInstance.put<Workflow>(
    `/workflow/${id}`,
    { name },
  );
  return response.data;
};

// Delete a workflow
export const deleteWorkflow = async (id: string) => {
  await AxiosInstance.delete(`/workflow/${id}`);
};
