import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import { useTranslation } from 'react-i18next';

interface User {
	id: number;
	username: string;
	email: string;
	nbr_workflow: number;
	role: 'Admin' | 'User';
	last_connection: string;
	password?: string;
}

const UserManagement = () => {
	const { t } = useTranslation();
	const [users, setUsers] = useState<User[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isNewUser, setIsNewUser] = useState(false);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<User | null>(null);

	const mockUsers: User[] = [
		{ id: 1, username: 'Alice', email: 'alice@example.com', nbr_workflow: 5, role: 'Admin', last_connection: '20-10-2024' },
		{ id: 2, username: 'Bob', email: 'bob@example.com', nbr_workflow: 3, role: 'User', last_connection: '20-09-2024' },
		{ id: 3, username: 'Charlie', email: 'charlie@example.com', nbr_workflow: 7, role: 'User', last_connection: '20-08-2024' },
	];

	const fetchUsers = useCallback((): Promise<User[]> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(mockUsers);
			}, 500);
		});
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchUsers();
			setUsers(data);
		};
		fetchData().then();
	}, [fetchUsers]);

	const deleteUser = (id: number): Promise<User[]> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const updatedUsers = mockUsers.filter((user) => user.id !== id);
				resolve(updatedUsers);
			}, 500);
		});
	};

	const handleDeleteUser = async () => {
		if (userToDelete) {
			const updatedUsers = await deleteUser(userToDelete.id);
			setUsers(updatedUsers);
			setIsDeleteDialogOpen(false);
		}
	};

	const handleOpenDeleteDialog = (user: User) => {
		setUserToDelete(user); // Set the user to be deleted
		setIsDeleteDialogOpen(true); // Open the delete confirmation dialog
	};

	const handleOpenEditDialog = (user: User) => {
		setCurrentUser(user);
		setIsNewUser(false); // Set isNewUser to false since we are editing
		setIsDialogOpen(true);
	};

	const handleOpenAddDialog = () => {
		setCurrentUser({ id: Date.now(), username: '', email: '', role: 'User', nbr_workflow: 0, last_connection: new Date().toISOString().slice(0, 10), password: '' });
		setIsNewUser(true); // Set isNewUser to true since we are adding a new user
		setIsDialogOpen(true);
	};

	const editUser = (id: number, updatedUser: User): Promise<User[]> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const userIndex = mockUsers.findIndex((user) => user.id === id);
				mockUsers[userIndex] = { ...updatedUser };
				resolve([...mockUsers]);
			}, 500);
		});
	};

	const handleSaveChanges = async () => {
		if (currentUser) {
			if (isNewUser) {
				setUsers([...users, currentUser]);
			} else {
				const updatedUsers = await editUser(currentUser.id, currentUser);
				setUsers(updatedUsers);
			}
			setIsDialogOpen(false);
		}
	};

	const handleSort = (field: keyof User, direction: 'asc' | 'desc') => {
		const sortedUsers = [...users].sort((a, b) => {
			if (field === 'last_connection') {
				const dateA = new Date(a.last_connection.split('-').reverse().join('-')).getTime();
				const dateB = new Date(b.last_connection.split('-').reverse().join('-')).getTime();
				return direction === 'asc' ? dateB - dateA : dateA - dateB;
			} else if (typeof a[field] === 'string' && typeof b[field] === 'string') {
				return direction === 'asc'
					? (a[field] as string).localeCompare(b[field] as string)
					: (b[field] as string).localeCompare(a[field] as string);
			} else {
				return direction === 'asc' ? (a[field] as number) - (b[field] as number) : (b[field] as number) - (a[field] as number);
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
				<h1 className="text-4xl font-bold">{t('UserManagement.title')}</h1>
			</div>

			<div className="flex justify-center items-center space-x-4 mb-4">
				<Input
					type="text"
					placeholder={t('UserManagement.searchPlaceholder')}
					className="p-2 border rounded w-64"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Select onValueChange={(value) => {
					const [field, direction] = value.split(':') as [keyof User, 'asc' | 'desc'];
					handleSort(field, direction);
				}}>
					<SelectTrigger className="w-[200px]">
						<SelectValue placeholder={t('UserManagement.sortBy')} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="username:asc">{t('UserManagement.usernameAsc')}</SelectItem>
							<SelectItem value="username:desc">{t('UserManagement.usernameDesc')}</SelectItem>
							<SelectItem value="email:asc">{t('UserManagement.emailAsc')}</SelectItem>
							<SelectItem value="email:desc">{t('UserManagement.emailDesc')}</SelectItem>
							<SelectItem value="nbr_workflow:asc">{t('UserManagement.workflowsAsc')}</SelectItem>
							<SelectItem value="nbr_workflow:desc">{t('UserManagement.workflowsDesc')}</SelectItem>
							<SelectItem value="role:asc">{t('UserManagement.userTypeAsc')}</SelectItem>
							<SelectItem value="role:desc">{t('UserManagement.userTypeDesc')}</SelectItem>
							<SelectItem value="last_connection:asc">{t('UserManagement.lastConnectionAsc')}</SelectItem>
							<SelectItem value="last_connection:desc">{t('UserManagement.lastConnectionDesc')}</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				<Button className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2" onClick={() => handleOpenAddDialog()}>
					<Plus className="w-4 h-4" />
				</Button>
			</div>

			<Table className="mt-4 mx-auto w-[800px]">
				<TableHeader>
					<TableRow>
						<TableHead>{t('UserManagement.username')}</TableHead>
						<TableHead>{t('UserManagement.email')}</TableHead>
						<TableHead>{t('UserManagement.workflows')}</TableHead>
						<TableHead>{t('UserManagement.userType')}</TableHead>
						<TableHead>{t('UserManagement.lastConnection')}</TableHead>
						<TableHead>{t('UserManagement.actions')}</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredUsers.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.username}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.nbr_workflow}</TableCell>
							<TableCell>{user.role}</TableCell>
							<TableCell>{user.last_connection}</TableCell>
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

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{isNewUser ? t('UserManagement.addUser') : t('UserManagement.editUser')}</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<Input
							type="text"
							placeholder={t('UserManagement.username')}
							value={currentUser?.username || ''}
							onChange={(e) => setCurrentUser((prev) => (prev ? { ...prev, username: e.target.value } : prev))}
						/>
						<Input
							type="email"
							placeholder={t('UserManagement.email')}
							value={currentUser?.email || ''}
							onChange={(e) => setCurrentUser((prev) => (prev ? { ...prev, email: e.target.value } : prev))}
						/>
						<Select
							value={currentUser?.role || 'User'}
							onValueChange={(value: 'Admin' | 'User') => setCurrentUser((prev) => (prev ? { ...prev, role: value } : prev))}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select User Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Admin">{t('UserManagement.admin')}</SelectItem>
								<SelectItem value="User">{t('UserManagement.user')}</SelectItem>
							</SelectContent>
						</Select>

						{isNewUser && (
							<Input
								type="password"
								placeholder={t('UserManagement.password')}
								value={currentUser?.password || ''}
								onChange={(e) => setCurrentUser((prev) => (prev ? { ...prev, password: e.target.value } : prev))}
							/>
						)}
					</div>
					<DialogFooter>
						<Button onClick={handleSaveChanges}>{t('UserManagement.save')}</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{t('UserManagement.confirmDeleteTitle')}</AlertDialogTitle>
						<AlertDialogDescription>{t('UserManagement.confirmDeleteDescription')}</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>{t('UserManagement.cancel')}</AlertDialogCancel>
						<AlertDialogAction onClick={handleDeleteUser}>{t('UserManagement.confirm')}</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default UserManagement;