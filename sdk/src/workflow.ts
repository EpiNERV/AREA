// src/workflow.ts
import { AxiosInstance } from "axios";

export interface Workflow {
	_id: string;
	name: string;
}

// Fetch all workflows
export const fetchWorkflows = async (axios: AxiosInstance): Promise<Workflow[]> => {
	const response = await axios.get<Workflow[]>('/workflow');
	return response.data;
};

// Create a new workflow
export const createWorkflow = async (axios: AxiosInstance, name: string): Promise<Workflow> => {
	const response = await axios.post<Workflow>('/workflow', { name });
	return response.data;
};

// Update a workflow
export const updateWorkflow = async (axios: AxiosInstance, id: string, name: string): Promise<Workflow> => {
	const response = await axios.put<Workflow>(`/workflow/${id}`, { name });
	return response.data;
};

// Delete a workflow
export const deleteWorkflow = async (axios: AxiosInstance, id: string): Promise<void> => {
	await axios.delete(`/workflow/${id}`);
};