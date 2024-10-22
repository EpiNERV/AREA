import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import { useTranslation } from 'react-i18next';

interface User {
	id: number;
	username: string;
	email: string;
	workflows: number;
	userType: 'Admin' | 'User';
	lastConnection: string;
}

const UserManagement = () => {
	const { t } = useTranslation();
	const [users, setUsers] = useState<User[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<User | null>(null); // Track the user to be deleted

	const mockUsers: User[] = [
		{ id: 1, username: 'Alice', email: 'alice@example.com', workflows: 5, userType: 'Admin', lastConnection: '20-10-2024' },
		{ id: 2, username: 'Bob', email: 'bob@example.com', workflows: 3, userType: 'User', lastConnection: '20-09-2024' },
		{ id: 3, username: 'Charlie', email: 'charlie@example.com', workflows: 7, userType: 'User', lastConnection: '20-08-2024' },
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
			const updatedUsers = await editUser(currentUser.id, currentUser);
			setUsers(updatedUsers);
			setIsDialogOpen(false);
		}
	};

	const handleSort = (field: keyof User, direction: 'asc' | 'desc') => {
		const sortedUsers = [...users].sort((a, b) => {
			if (field === 'lastConnection') {
				const dateA = new Date(a.lastConnection.split('-').reverse().join('-')).getTime();
				const dateB = new Date(b.lastConnection.split('-').reverse().join('-')).getTime();
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
							<SelectItem value="workflows:asc">{t('UserManagement.workflowsAsc')}</SelectItem>
							<SelectItem value="workflows:desc">{t('UserManagement.workflowsDesc')}</SelectItem>
							<SelectItem value="userType:asc">{t('UserManagement.userTypeAsc')}</SelectItem>
							<SelectItem value="userType:desc">{t('UserManagement.userTypeDesc')}</SelectItem>
							<SelectItem value="lastConnection:asc">{t('UserManagement.lastConnectionAsc')}</SelectItem>
							<SelectItem value="lastConnection:desc">{t('UserManagement.lastConnectionDesc')}</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
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
							<TableCell>{user.workflows}</TableCell>
							<TableCell>{user.userType}</TableCell>
							<TableCell>{user.lastConnection}</TableCell>
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

			{/* Dialog for editing user */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('UserManagement.editUser')}</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<Input
							type="text"
							placeholder="Username"
							value={currentUser?.username || ''}
							onChange={(e) => setCurrentUser((prev) => (prev ? { ...prev, username: e.target.value } : prev))}
						/>
						<Input
							type="email"
							placeholder="Email"
							value={currentUser?.email || ''}
							onChange={(e) => setCurrentUser((prev) => (prev ? { ...prev, email: e.target.value } : prev))}
						/>
						<Select
							value={currentUser?.userType || 'User'}
							onValueChange={(value: 'Admin' | 'User') => setCurrentUser((prev) => (prev ? { ...prev, userType: value } : prev))}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select User Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Admin">{t('UserManagement.admin')}</SelectItem>
								<SelectItem value="User">{t('UserManagement.user')}</SelectItem>
							</SelectContent>
						</Select>
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