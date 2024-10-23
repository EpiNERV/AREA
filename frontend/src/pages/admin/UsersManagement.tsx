// src/components/UsersManagement.tsx

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import { useTranslation } from 'react-i18next';
import { createUser, fetchUsers, updateUser, deleteUser, User } from 'sdk-api';
import axiosInstance from '@/lib/auth/axiosInstance';

const UsersManagement = () => {
	const { t } = useTranslation();
	const [users, setUsers] = useState<User[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isNewUser, setIsNewUser] = useState(false);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const memoizedFetchUsers = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const fetchedUsers = await fetchUsers(axiosInstance);
			console.log('fetchUsers:', fetchedUsers);
			setUsers(fetchedUsers);
		} catch (err) {
			console.error('Erreur lors de la récupération des utilisateurs :', err);
			setError(t('UsersManagement.errorFetchingUsers'));
		} finally {
			setLoading(false);
		}
	}, [t]);

	useEffect(() => {
		void memoizedFetchUsers();
	}, [memoizedFetchUsers]);

	const handleDeleteUser = async () => {
		if (userToDelete) {
			console.log('Deleting user:', userToDelete);
			try {
				await deleteUser(axiosInstance, userToDelete.id);
				setUsers(users.filter((user) => user.id !== userToDelete.id));
				setIsDeleteDialogOpen(false);
				setUserToDelete(null);
			} catch (err) {
				console.error('Erreur lors de la suppression de l\'utilisateur :', err);
				setError(t('UsersManagement.errorDeletingUser'));
			}
		}
	};

	const handleOpenDeleteDialog = (user: User) => {
		setUserToDelete(user);
		setIsDeleteDialogOpen(true);
	};

	const handleOpenEditDialog = (user: User) => {
		setCurrentUser(user);
		setIsNewUser(false);
		setIsDialogOpen(true);
	};

	const handleOpenAddDialog = () => {
		setCurrentUser({
			id: '',
			username: '',
			email: '',
			role: 'user',
			nbr_workflow: 0,
			last_connection: new Date().toISOString().slice(0, 10),
			password: '',
		});
		setIsNewUser(true);
		setIsDialogOpen(true);
	};

	const handleSaveChanges = async () => {
		if (currentUser) {
			try {
				if (isNewUser) {
					const createdUser = await createUser(axiosInstance, {
						username: currentUser.username,
						email: currentUser.email,
						password: currentUser.password || '',
						role: currentUser.role,
					});
					setUsers([...users, createdUser]);
				} else {
					const updatedUser = await updateUser(axiosInstance, currentUser.id, {
						username: currentUser.username,
						email: currentUser.email,
						role: currentUser.role,
					});
					setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
				}
				setIsDialogOpen(false);
				setCurrentUser(null);
			} catch (err) {
				console.error('Erreur lors de la sauvegarde des modifications :', err);
				setError(isNewUser ? t('UsersManagement.errorCreatingUser') : t('UsersManagement.errorUpdatingUser'));
			}
		}
	};

	const handleSort = (field: keyof User, direction: 'asc' | 'desc') => {
		const sortedUsers = [...users].sort((a, b) => {
			let valueA: any = a[field];
			let valueB: any = b[field];

			if (field === 'last_connection') {
				valueA = new Date(b.last_connection).getTime();
				valueB = new Date(a.last_connection).getTime();
			}

			if (typeof valueA === 'string' && typeof valueB === 'string') {
				return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
			} else if (typeof valueA === 'number' && typeof valueB === 'number') {
				return direction === 'asc' ? valueA - valueB : valueB - valueA;
			} else {
				return 0;
			}
		});
		setUsers(sortedUsers);
	};

	const filteredUsers = users.filter((user) =>
		user.username.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex justify-center items-center mb-4">
				<h1 className="text-4xl font-bold">{t('UsersManagement.title')}</h1>
			</div>

			<div className="flex justify-center items-center space-x-4 mb-4">
				<Input
					type="text"
					placeholder={t('UsersManagement.searchPlaceholder')}
					className="p-2 border rounded w-64"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Select
					onValueChange={(value) => {
						const [field, direction] = value.split(':') as [keyof User, 'asc' | 'desc'];
						handleSort(field, direction);
					}}
				>
					<SelectTrigger className="w-[200px]">
						<SelectValue placeholder={t('UsersManagement.sortBy')} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="username:asc">{t('UsersManagement.usernameAsc')}</SelectItem>
							<SelectItem value="username:desc">{t('UsersManagement.usernameDesc')}</SelectItem>
							<SelectItem value="email:asc">{t('UsersManagement.emailAsc')}</SelectItem>
							<SelectItem value="email:desc">{t('UsersManagement.emailDesc')}</SelectItem>
							<SelectItem value="nbr_workflow:asc">{t('UsersManagement.workflowsAsc')}</SelectItem>
							<SelectItem value="nbr_workflow:desc">{t('UsersManagement.workflowsDesc')}</SelectItem>
							<SelectItem value="role:asc">{t('UsersManagement.userTypeAsc')}</SelectItem>
							<SelectItem value="role:desc">{t('UsersManagement.userTypeDesc')}</SelectItem>
							<SelectItem value="last_connection:asc">{t('UsersManagement.lastConnectionAsc')}</SelectItem>
							<SelectItem value="last_connection:desc">{t('UsersManagement.lastConnectionDesc')}</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				<Button
					className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
					onClick={handleOpenAddDialog}
				>
					<Plus className="w-4 h-4" />
					{t('UsersManagement.addUser')}
				</Button>
			</div>

			{error && <div className="text-red-500 text-center mb-4">{error}</div>}

			{loading ? (
				<p className="text-center">{t('UsersManagement.loading')}</p>
			) : (
				<Table className="mt-4 mx-auto w-[800px]">
					<TableHeader>
						<TableRow>
							<TableHead>{t('UsersManagement.username')}</TableHead>
							<TableHead>{t('UsersManagement.email')}</TableHead>
							<TableHead>{t('UsersManagement.workflows')}</TableHead>
							<TableHead>{t('UsersManagement.userType')}</TableHead>
							<TableHead>{t('UsersManagement.lastConnection')}</TableHead>
							<TableHead>{t('UsersManagement.actions')}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredUsers.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.username}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.nbr_workflow}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>{new Date(user.last_connection).toLocaleDateString()}</TableCell>
								<TableCell className="flex space-x-2">
									<Button variant="outline" size="sm" onClick={() => handleOpenEditDialog(user)}>
										<Edit className="w-4 h-4" />
									</Button>
									<Button variant="destructive" size="sm" onClick={() => handleOpenDeleteDialog(user)}>
										<Trash className="w-4 h-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{isNewUser ? t('UsersManagement.addUser') : t('UsersManagement.editUser')}
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<Input
							type="text"
							placeholder={t('UsersManagement.username')}
							value={currentUser?.username ?? ''}
							onChange={(e) =>
								setCurrentUser((prev) =>
									prev ? { ...prev, username: e.target.value } : prev
								)
							}
							required
						/>
						<Input
							type="email"
							placeholder={t('UsersManagement.email')}
							value={currentUser?.email ?? ''}
							onChange={(e) =>
								setCurrentUser((prev) =>
									prev ? { ...prev, email: e.target.value } : prev
								)
							}
							required
						/>
						<Select
							value={currentUser?.role ?? 'user'}
							onValueChange={(value: 'admin' | 'user') =>
								setCurrentUser((prev) =>
									prev ? { ...prev, role: value } : prev
								)
							}
						>
							<SelectTrigger>
								<SelectValue placeholder={t('UsersManagement.selectUserType')} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="admin">{t('UsersManagement.admin')}</SelectItem>
									<SelectItem value="user">{t('UsersManagement.user')}</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						{isNewUser && (
							<Input
								type="password"
								placeholder={t('UsersManagement.password')}
								value={currentUser?.password ?? ''}
								onChange={(e) =>
									setCurrentUser((prev) =>
										prev ? { ...prev, password: e.target.value } : prev
									)
								}
								required
							/>
						)}
					</div>
					<DialogFooter>
						<Button onClick={handleSaveChanges}>
							{isNewUser ? t('UsersManagement.create') : t('UsersManagement.save')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{t('UsersManagement.confirmDeleteTitle')}</AlertDialogTitle>
						<AlertDialogDescription>
							{t('UsersManagement.confirmDeleteDescription')}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>{t('UsersManagement.cancel')}</AlertDialogCancel>
						<AlertDialogAction onClick={handleDeleteUser}>{t('UsersManagement.confirm')}</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default UsersManagement;