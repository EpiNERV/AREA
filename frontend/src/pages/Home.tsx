import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Plus } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { fetchWorkflows, createWorkflow, updateWorkflow, deleteWorkflow } from 'sdk-api';
import AxiosInstance from '@/lib/auth/axiosInstance.tsx';

interface Workflow {
  _id: string;
  name: string;
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

type FormData = z.infer<typeof formSchema>;

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [workflowToDelete, setWorkflowToDelete] = useState<Workflow | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkflowsData = async () => {
      try {
        const data = await fetchWorkflows(AxiosInstance);
        setWorkflows(data);
      } catch (error) {
        console.error('Error fetching workflows:', error);
      }
    };
    void fetchWorkflowsData();
  }, []);

  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (workflowId: string) => {
    navigate(`/workflow/${workflowId}`);
  };

  const handleWorkflowCreated = async (name: string) => {
    try {
      const newWorkflow = await createWorkflow(AxiosInstance, name);
      setWorkflows((prev) => [...prev, newWorkflow]);
      setIsAddDialogOpen(false);
    } catch (err) {
      console.error('Error creating workflow:', err);
    }
  };

  const handleWorkflowUpdated = async (id: string, name: string) => {
    try {
      const updatedWorkflow = await updateWorkflow(AxiosInstance, id, name);
      setWorkflows((prev) =>
        prev.map((wf) => (wf._id === updatedWorkflow._id ? updatedWorkflow : wf))
      );
      setIsEditDialogOpen(false);
    } catch (err) {
      console.error('Error updating workflow:', err);
    }
  };

  const handleWorkflowDeleted = async () => {
    if (workflowToDelete) {
      try {
        await deleteWorkflow(AxiosInstance, workflowToDelete._id);
        setWorkflows((prev) => prev.filter((wf) => wf._id !== workflowToDelete._id));
        setIsDeleteDialogOpen(false);
      } catch (err) {
        console.error('Error deleting workflow:', err);
      }
    }
  };

  const openEditDialog = (workflow: Workflow) => {
    setCurrentWorkflow(workflow);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (workflow: Workflow) => {
    setWorkflowToDelete(workflow);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-col items-center p-4 w-full h-full">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-4xl font-bold">{t('Home.title')}</h1>
      </div>

      <div className="flex justify-center items-center space-x-4 mb-4">
        <Input
          type="text"
          placeholder={t('Home.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-green-600 hover:bg-green-700 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {filteredWorkflows.map((workflow) => (
          <Card
            key={workflow._id}
            className="cursor-pointer"
            onClick={() => handleCardClick(workflow._id)}
          >
            <div className="flex justify-between items-center p-4">
              <p className="text-lg font-semibold">{workflow.name}</p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditDialog(workflow);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteDialog(workflow);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredWorkflows.length === 0 && (
        <div className="mt-10 text-center text-gray-500">
          {t('Home.noWorkflowsFound')}
        </div>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('Home.createWorkflowTitle')}</DialogTitle>
            <DialogDescription>
              {t('Home.createWorkflowDescription')}
            </DialogDescription>
          </DialogHeader>
          <NewWorkflowForm onWorkflowCreated={handleWorkflowCreated} />
        </DialogContent>
      </Dialog>

      {currentWorkflow && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('Home.editWorkflowTitle')}</DialogTitle>
              <DialogDescription>
                {t('Home.editWorkflowDescription')}
              </DialogDescription>
            </DialogHeader>
            <EditWorkflowForm
              workflow={currentWorkflow}
              onWorkflowUpdated={handleWorkflowUpdated}
            />
          </DialogContent>
        </Dialog>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('Home.deleteWorkflowTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('Home.deleteWorkflowDescription', { workflowName: workflowToDelete?.name })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('Home.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleWorkflowDeleted}>
              {t('Home.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

interface NewWorkflowFormProps {
  onWorkflowCreated: (newWorkflow: string) => void;
}

const NewWorkflowForm: React.FC<NewWorkflowFormProps> = ({ onWorkflowCreated }) => {
  const { t } = useTranslation();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const { handleSubmit, reset, formState: { errors, isSubmitting } } = form;

  const onSubmit = async (data: FormData) => {
    try {
      onWorkflowCreated(data.name);
      reset();
    } catch (err) {
      console.error('Error creating workflow:', err);
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
              <FormLabel>{t('Home.workflowName')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('Home.workflowNamePlaceholder')}
                  {...field}
                  className="w-full"
                />
              </FormControl>
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button
            variant="secondary"
            onClick={() => reset()}
            type="button"
            disabled={isSubmitting}
          >
            {t('Home.reset')}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('Home.creating') : t('Home.create')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

interface EditWorkflowFormProps {
  workflow: Workflow;
  onWorkflowUpdated: (id: string, name: string) => void;
}

const EditWorkflowForm: React.FC<EditWorkflowFormProps> = ({ workflow, onWorkflowUpdated }) => {
  const { t } = useTranslation();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workflow.name,
    },
  });

  const { handleSubmit, reset, formState: { errors, isSubmitting } } = form;

  const onSubmit = async (data: FormData) => {
    try {
      onWorkflowUpdated(workflow._id, data.name);
      reset();
    } catch (err) {
      console.error('Error updating workflow:', err);
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
              <FormLabel>{t('Home.workflowName')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('Home.workflowNamePlaceholder')}
                  {...field}
                  className="w-full"
                />
              </FormControl>
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button
            variant="secondary"
            onClick={() => reset()}
            type="button"
            disabled={isSubmitting}
          >
            {t('Home.reset')}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('Home.updating') : t('Home.update')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Home;