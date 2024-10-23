// src/services/userService.ts

import { AxiosInstance } from "axios";

// Interface utilisateur alignée avec le composant
export interface User {
	id: string; // Ajouté pour correspondre au backend
	username: string;
	email: string;
	role: 'admin' | 'user';
	nbr_workflow: number;
	last_connection: string;
	password?: string; // Optionnel, utilisé uniquement lors de la création
}

export interface CreateUserData {
	username: string;
	email: string;
	password: string;
	role: 'admin' | 'user';
}

export interface UpdateUserData {
	username?: string;
	email?: string;
	role?: 'admin' | 'user';
}

interface FetchUsersResponse {
	status: string;
	user: User[];
	user_count: number;
}

// Fonction pour créer un utilisateur
export const createUser = async (
	axios: AxiosInstance,
	data: CreateUserData
): Promise<User> => {
	const response = await axios.post<User>("/admin/user/", data);
	return response.data;
};

// Fonction pour récupérer la liste des utilisateurs
export const fetchUsers = async (axios: AxiosInstance): Promise<User[]> => {
	const response = await axios.get<FetchUsersResponse>("/admin/users/");
	console.log("fetchUsers:", response.data);
	return response.data.user;
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (
	axios: AxiosInstance,
	id: string,
	data: UpdateUserData
): Promise<User> => {
	const response = await axios.patch<User>(
		`/admin/user/${id}/update/`,
		data
	);
	return response.data;
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (
	axios: AxiosInstance,
	id: string
): Promise<void> => {
	await axios.delete(`/admin/user/${id}/delete/`);
};