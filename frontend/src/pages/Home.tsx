import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// shadcn/ui v2 components imported individually
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Edit, Trash2 } from "lucide-react"; // Icons from lucide-react

// react-hook-form and zod for form handling and validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the Workflow interface
interface Workflow {
  id: number;
  name: string;
}

// Define the form validation schema using zod
const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

// Infer the form data type from the schema
type FormData = z.infer<typeof formSchema>;

// Mock API functions
const mockFetchWorkflows = (): Promise<Workflow[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Workflow Alpha' },
        { id: 2, name: 'Workflow Beta' },
        { id: 3, name: 'Workflow Gamma' },
      ]);
    }, 500); // Simulate network delay
  });
};

const mockCreateWorkflow = (name: string): Promise<Workflow> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newWorkflow: Workflow = {
        id: Math.floor(Math.random() * 1000) + 4, // Random ID for example
        name,
      };
      resolve(newWorkflow);
    }, 500); // Simulate network delay
  });
};

// Mock update and delete functions
const mockUpdateWorkflow = (id: number, name: string): Promise<Workflow> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name });
    }, 500);
  });
};

const mockDeleteWorkflow = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

const Home: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch workflows from the mock API
    const fetchWorkflows = async () => {
      try {
        const data: Workflow[] = await mockFetchWorkflows();
        setWorkflows(data);
      } catch (error) {
        console.error('Error fetching workflows:', error);
      }
    };
    fetchWorkflows();
  }, []);

  // Filter workflows based on the search term
  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (workflowId: number) => {
    navigate(`/workflow/${workflowId}`);
  };

  // Handle adding a new workflow and closing the dialog
  const handleWorkflowCreated = (newWorkflow: Workflow) => {
    setWorkflows(prev => [...prev, newWorkflow]);
    setIsAddDialogOpen(false);
  };

  // Handle updating a workflow
  const handleWorkflowUpdated = (updatedWorkflow: Workflow) => {
    setWorkflows(prev =>
      prev.map(wf => (wf.id === updatedWorkflow.id ? updatedWorkflow : wf))
    );
    setIsEditDialogOpen(false);
  };

  // Handle deleting a workflow
  const handleWorkflowDeleted = async (id: number) => {
    try {
      await mockDeleteWorkflow(id);
      setWorkflows(prev => prev.filter(wf => wf.id !== id));
    } catch (error) {
      console.error('Error deleting workflow:', error);
      // Optionally, show an error message to the user
    }
  };

  // Open edit dialog with selected workflow
  const openEditDialog = (workflow: Workflow) => {
    setCurrentWorkflow(workflow);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <aside
        className="w-full max-w-6xl p-6 bg-white shadow-lg rounded-lg overflow-auto"
        style={{ boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.1)' }}
      >
        {/* Header with Search and Add Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <Input
            type="text"
            placeholder="Search workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
            disabled={false}
          />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                Add Workflow
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Workflow</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new workflow.
                </DialogDescription>
              </DialogHeader>
              <NewWorkflowForm onWorkflowCreated={handleWorkflowCreated} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Grid of Workflow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow) => (
            <Card
              key={workflow.id}
              onClick={() => handleCardClick(workflow.id)}
              className="relative cursor-pointer p-6 flex flex-col justify-center items-center h-32 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              <p className="text-lg font-semibold text-center">{workflow.name}</p>
              {/* Edit and Delete Buttons */}
              <div
                className="absolute top-2 right-2 flex space-x-2"
                onClick={(e) => e.stopPropagation()} // Prevent card click
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEditDialog(workflow)}
                  className="text-white hover:text-blue-300 p-1"
                  aria-label="Edit Workflow"
                >
                  <Edit size={16} />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-red-400 p-1"
                      aria-label="Delete Workflow"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Delete Workflow</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete the workflow "{workflow.name}"? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button
                        variant="secondary"
                        onClick={() => {}}
                        type="button"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleWorkflowDeleted(workflow.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ))}
        </div>

        {/* No Workflows Found Message */}
        {filteredWorkflows.length === 0 && (
          <div className="mt-10 text-center text-gray-500">
            No workflows found. Try adjusting your search or add a new workflow.
          </div>
        )}

        {/* Edit Workflow Dialog */}
        {currentWorkflow && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              {/* Invisible trigger */}
              <span></span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Workflow</DialogTitle>
                <DialogDescription>
                  Modify the name of the workflow.
                </DialogDescription>
              </DialogHeader>
              <EditWorkflowForm
                workflow={currentWorkflow}
                onWorkflowUpdated={handleWorkflowUpdated}
              />
            </DialogContent>
          </Dialog>
        )}
      </aside>
    </div>
  );
};

// NewWorkflowForm Component
interface NewWorkflowFormProps {
  onWorkflowCreated: (newWorkflow: Workflow) => void;
}

const NewWorkflowForm: React.FC<NewWorkflowFormProps> = ({ onWorkflowCreated }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const { handleSubmit, reset, formState: { errors, isSubmitting } } = form;

  const onSubmit = async (data: FormData) => {
    try {
      const newWorkflow: Workflow = await mockCreateWorkflow(data.name);
      onWorkflowCreated(newWorkflow);
      reset();
    } catch (err) {
      console.error('Error creating workflow:', err);
      // Optionally, you can add error state to display to the user
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workflow Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter workflow name" 
                  {...field} 
                  className="w-full"
                />
              </FormControl>
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            variant="secondary"
            onClick={() => reset()}
            type="button"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Reset
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

// EditWorkflowForm Component
interface EditWorkflowFormProps {
  workflow: Workflow;
  onWorkflowUpdated: (updatedWorkflow: Workflow) => void;
}

const EditWorkflowForm: React.FC<EditWorkflowFormProps> = ({ workflow, onWorkflowUpdated }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workflow.name,
    },
  });

  const { handleSubmit, reset, formState: { errors, isSubmitting } } = form;

  const onSubmit = async (data: FormData) => {
    try {
      const updatedWorkflow: Workflow = await mockUpdateWorkflow(workflow.id, data.name);
      onWorkflowUpdated(updatedWorkflow);
      reset();
    } catch (err) {
      console.error('Error updating workflow:', err);
      // Optionally, you can add error state to display to the user
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workflow Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter new workflow name" 
                  {...field} 
                  className="w-full"
                />
              </FormControl>
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            variant="secondary"
            onClick={() => reset()}
            type="button"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Reset
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Home;
