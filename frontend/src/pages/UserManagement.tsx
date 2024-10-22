import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface User {
	id: number;
	username: string;
	email: string;
	workflows: number;
	userType: 'Admin' | 'User';
	lastConnection: string;
}

const UserManagement = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState<User | null>(null); // Nullable type

	const mockUsers: User[] = [
		{ id: 1, username: 'Alice', email: 'alice@example.com', workflows: 5, userType: 'Admin', lastConnection: '20-10-2024' },
		{ id: 2, username: 'Bob', email: 'bob@example.com', workflows: 3, userType: 'User', lastConnection: '20-09-2024' },
		{ id: 3, username: 'Charlie', email: 'charlie@example.com', workflows: 7, userType: 'User', lastConnection: '20-08-2024' },
	];

	const fetchUsers = useCallback((): Promise<User[]> => {
		const mockUsers: User[] = [
			{ id: 1, username: 'Alice', email: 'alice@example.com', workflows: 5, userType: 'Admin', lastConnection: '20-10-2024' },
			{ id: 2, username: 'Bob', email: 'bob@example.com', workflows: 3, userType: 'User', lastConnection: '20-09-2024' },
			{ id: 3, username: 'Charlie', email: 'charlie@example.com', workflows: 7, userType: 'User', lastConnection: '20-08-2024' },
		];
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

	const editUser = (id: number, updatedUser: User): Promise<User[]> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const userIndex = mockUsers.findIndex((user) => user.id === id);
				mockUsers[userIndex] = { ...updatedUser };
				resolve([...mockUsers]);
			}, 500);
		});
	};

	const handleDeleteUser = async (id: number) => {
		const updatedUsers = await deleteUser(id);
		setUsers(updatedUsers);
	};

	const handleOpenEditDialog = (user: User) => {
		setCurrentUser(user);
		setIsDialogOpen(true);
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
				<h1 className="text-4xl font-bold">Users Management</h1>
			</div>

			<div className="flex justify-center items-center space-x-4 mb-4">
				<Input
					type="text"
					placeholder="Search by username"
					className="p-2 border rounded w-64"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Select onValueChange={(value) => {
					const [field, direction] = value.split(':') as [keyof User, 'asc' | 'desc'];
					handleSort(field, direction);
				}}>
					<SelectTrigger className="w-[200px]">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="username:asc">Username (A-Z)</SelectItem>
							<SelectItem value="username:desc">Username (Z-A)</SelectItem>
							<SelectItem value="email:asc">Email (A-Z)</SelectItem>
							<SelectItem value="email:desc">Email (Z-A)</SelectItem>
							<SelectItem value="workflows:asc">Workflows (Ascending)</SelectItem>
							<SelectItem value="workflows:desc">Workflows (Descending)</SelectItem>
							<SelectItem value="userType:asc">User Type (Admin First)</SelectItem>
							<SelectItem value="userType:desc">User Type (User First)</SelectItem>
							<SelectItem value="lastConnection:asc">Last Connection (Newest)</SelectItem>
							<SelectItem value="lastConnection:desc">Last Connection (Oldest)</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<Table className="mt-4 mx-auto w-[800px]">
				<TableHeader>
					<TableRow>
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Number of Workflows</TableHead>
						<TableHead>User Type</TableHead>
						<TableHead>Last Connection</TableHead>
						<TableHead>Actions</TableHead>
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
								<Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
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
						<DialogTitle>Edit User</DialogTitle>
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
								<SelectItem value="Admin">Admin</SelectItem>
								<SelectItem value="User">User</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<DialogFooter>
						<Button onClick={handleSaveChanges}>Save</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default UserManagement;