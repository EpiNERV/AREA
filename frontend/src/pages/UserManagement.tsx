import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const UserManagement = () => {
	const [users, setUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortField, setSortField] = useState('');
	const [sortDirection, setSortDirection] = useState('asc');

	// Mock API data with workflow count
	const mockUsers = [
		{ id: 1, username: 'Alice', email: 'alice@example.com', workflows: 5, userType: 'Admin', lastConnection: '20-10-2024' },
		{ id: 2, username: 'Bob', email: 'bob@example.com', workflows: 3, userType: 'User', lastConnection: '20-09-2024' },
		{ id: 3, username: 'Charlie', email: 'charlie@example.com', workflows: 7, userType: 'User', lastConnection: '20-08-2024' },
	];

	// Fetch users (simulating API call)
	const fetchUsers = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(mockUsers);
			}, 500);
		});
	};

	// Delete a user
	const deleteUser = (id) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const updatedUsers = mockUsers.filter((user) => user.id !== id);
				resolve(updatedUsers);
			}, 500);
		});
	};

	// Edit a user
	const editUser = (id, updatedUser) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const userIndex = mockUsers.findIndex((user) => user.id === id);
				mockUsers[userIndex] = { id, ...updatedUser };
				resolve([...mockUsers]);
			}, 500);
		});
	};

	useEffect(() => {
		// Fetch initial user data when the component mounts
		const fetchData = async () => {
			const data = await fetchUsers();
			setUsers(data);
		};
		fetchData();
	}, []);

	const handleDeleteUser = async (id) => {
		const updatedUsers = await deleteUser(id);
		setUsers(updatedUsers);
	};

	const handleEditUser = async (id, updatedUser) => {
		const updatedUsers = await editUser(id, updatedUser);
		setUsers(updatedUsers);
	};

	const handleSort = (field, direction) => {
		setSortField(field);
		setSortDirection(direction);

		const sortedUsers = [...users].sort((a, b) => {
			if (field === 'lastConnection') {
				const dateA = new Date(a.lastConnection.split('-').reverse().join('-'));
				const dateB = new Date(b.lastConnection.split('-').reverse().join('-'));

				if (direction === 'asc') {
					return dateB - dateA;
				} else {
					return dateA - dateB;
				}
			} else {
				if (direction === 'asc') {
					return a[field] < b[field] ? -1 : 1;
				} else {
					return a[field] > b[field] ? -1 : 1;
				}
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
				<h1 className="text-4xl font-bold">User Management</h1>
			</div>

			<div className="flex justify-center items-center space-x-4 mb-4">
				<input
					type="text"
					placeholder="Search by username"
					className="p-2 border rounded w-64"  // Reduced width
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Select onValueChange={(value) => {
					const [field, direction] = value.split(':');
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

			<Table className="mt-4 w-full">
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
							<TableCell>
								<Button
									onClick={() =>
										handleEditUser(user.id, {
											username: user.username,
											email: user.email,
											workflows: user.workflows,
											userType: user.userType,
											lastConnection: user.lastConnection,
										})
									}
								>
									Edit
								</Button>
								<Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default UserManagement;