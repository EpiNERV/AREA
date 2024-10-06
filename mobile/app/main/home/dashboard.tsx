// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { 
  Text, 
  TextInput, 
  FAB, 
  Portal, 
  Modal, 
  Button, 
  Card, 
  Title, 
  Paragraph 
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import WorkflowForm from '@/components/WorkflowForm';

// Mock API functions (imported or defined here)

interface Workflow {
  id: number;
  name: string;
}

// Define the form validation schema using zod
const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

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

type RootStackParamList = {
  Home: undefined;
  WorkflowDetail: { id: number };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow | null>(null);

  const navigation = useNavigation<HomeScreenNavigationProp>();

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

  const handleCardPress = (workflowId: number) => {
    navigation.navigate('WorkflowDetail', { id: workflowId });
  };

  const handleAddWorkflow = (newWorkflow: Workflow) => {
    setWorkflows(prev => [...prev, newWorkflow]);
    setIsAddModalVisible(false);
  };

  const handleUpdateWorkflow = (updatedWorkflow: Workflow) => {
    setWorkflows(prev =>
      prev.map(wf => (wf.id === updatedWorkflow.id ? updatedWorkflow : wf))
    );
    setIsEditModalVisible(false);
  };

  const handleDeleteWorkflow = (id: number) => {
    Alert.alert(
      'Delete Workflow',
      'Are you sure you want to delete this workflow? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await mockDeleteWorkflow(id);
              setWorkflows(prev => prev.filter(wf => wf.id !== id));
            } catch (error) {
              console.error('Error deleting workflow:', error);
              Alert.alert('Error', 'Failed to delete the workflow.');
            }
          } 
        },
      ]
    );
  };

  const openEditModal = (workflow: Workflow) => {
    setCurrentWorkflow(workflow);
    setIsEditModalVisible(true);
  };

  const renderItem = ({ item }: { item: Workflow }) => (
    <Card style={styles.card} onPress={() => handleCardPress(item.id)}>
      <Card.Title title={item.name} right={() => (
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => openEditModal(item)}>
            <Icon name="pencil" size={20} color="#6200ee" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteWorkflow(item.id)}>
            <Icon name="trash-can" size={20} color="#b00020" style={styles.icon} />
          </TouchableOpacity>
        </View>
      )} />
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        label="Search Workflows"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        mode="outlined"
        style={styles.searchInput}
      />

      {/* Workflow List */}
      <FlatList
        data={filteredWorkflows}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text>No workflows found. Try adjusting your search or add a new workflow.</Text>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      {/* Floating Action Button to Add Workflow */}
      <FAB
        style={styles.fab}
        small
        icon="plus"
        label="Add Workflow"
        onPress={() => setIsAddModalVisible(true)}
      />

      {/* Add Workflow Modal */}
      <Portal>
        <Modal 
          visible={isAddModalVisible} 
          onDismiss={() => setIsAddModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Create New Workflow</Text>
          <WorkflowForm 
            onSubmit={handleAddWorkflow} 
            onCancel={() => setIsAddModalVisible(false)} 
          />
        </Modal>
      </Portal>

      {/* Edit Workflow Modal */}
      <Portal>
        <Modal 
          visible={isEditModalVisible} 
          onDismiss={() => setIsEditModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Edit Workflow</Text>
          {currentWorkflow && (
            <WorkflowForm 
              initialData={currentWorkflow}
              onSubmit={handleUpdateWorkflow} 
              onCancel={() => setIsEditModalVisible(false)} 
            />
          )}
        </Modal>
      </Portal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
  },
  cardActions: {
    flexDirection: 'row',
    marginRight: 8,
  },
  icon: {
    marginHorizontal: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
