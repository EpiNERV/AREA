import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"; // shadCN UI input component
import { Card } from "@/components/ui/card"; // shadCN UI card component
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const [workflows, setWorkflows] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		// Ici tu fais le call API pour récupérer la liste des workflows
		const fetchWorkflows = async () => {
			try {
				const response = await fetch('/api/workflows');
				const data = await response.json();
				setWorkflows(data);
			} catch (error) {
				console.error('Erreur lors de la récupération des workflows', error);
			}
		};
		fetchWorkflows();
	}, []);

	// Filtrer les workflows selon la barre de recherche
	const filteredWorkflows = workflows.filter(workflow =>
		workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleCardClick = (workflowId) => {
		navigate(`/workflow/${workflowId}`);
	};

	return (
		<aside className="w-[75%] h-[95vh] p-4 absolute right-0 mx-5 flex flex-col  rounded-lg"
		       style={{top: '19px', boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.3)'}}
		>
			{/* Barre de recherche */}
			<div className="mb-6">
				<Input
					type="text"
					placeholder="Search workflows..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full"
				/>
			</div>

			{/* Grid des cartes */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{/* Carte "New Workflow" */}
				<Card
					onClick={() => navigate('/new-workflow')}
					className="cursor-pointer flex items-center justify-center h-32  text-center"
				>
					<p className="font-bold">Create new workflow</p>
				</Card>

				{/* Cartes des workflows */}
				{filteredWorkflows.map((workflow) => (
					<Card
						key={workflow.id}
						onClick={() => handleCardClick(workflow.id)}
						className="cursor-pointer flex items-center justify-center h-32 bg-purple-500 text-white text-center"
					>
						<p className="font-bold">{workflow.name}</p>
					</Card>
				))}
			</div>
		</aside>
	);
};

export default Home;
