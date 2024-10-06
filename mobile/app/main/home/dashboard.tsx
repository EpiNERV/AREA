// screens/HomeScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  RefreshControl 
} from 'react-native';
import { 
  Text, 
  TextInput, 
  FAB as Fab, 
  Portal, 
  Modal, 
  Card, 
  ActivityIndicator 
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import WorkflowForm from '@/components/WorkflowForm';
import { 
  fetchWorkflows, 
  createWorkflow, 
  updateWorkflow, 
  deleteWorkflow 
} from '@/lib/api/workflow';

interface Workflow {
  _id: string; // or _id: string based on your backend
  name: string;
}

type RootStackParamList = {
  Home: undefined;
  WorkflowDetail: { id: string };
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // New state for refreshing

  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Data fetching function
  const loadWorkflows = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchWorkflows();
      setWorkflows(data);
    } catch (error: any) {
      console.error('Error fetching workflows:', error);
      Alert.alert('Error', 'Failed to fetch workflows.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    loadWorkflows();
  }, [loadWorkflows]);

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchWorkflows();
      setWorkflows(data);
    } catch (error: any) {
      console.error('Error refreshing workflows:', error);
      Alert.alert('Error', 'Failed to refresh workflows.');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Filter workflows based on the search term
  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardPress = (workflowId: string) => {
    navigation.navigate('WorkflowDetail', { id: workflowId });
  };

  const handleAddWorkflow = async (name: string) => {
    try {
      const newWorkflow = await createWorkflow(name);
      setWorkflows(prev => [...prev, newWorkflow]);
      setIsAddModalVisible(false);
      Alert.alert('Success', 'Workflow created successfully.');
    } catch (error: any) {
      console.error('Error creating workflow:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to create workflow.');
    }
  };

  const handleUpdateWorkflow = async (id: string, name: string) => {
    try {
      const updatedWorkflow = await updateWorkflow(id, name);
      setWorkflows(prev =>
        prev.map(wf => (wf._id === updatedWorkflow._id ? updatedWorkflow : wf))
      );
      setIsEditModalVisible(false);
      Alert.alert('Success', 'Workflow updated successfully.');
    } catch (error: any) {
      console.error('Error updating workflow:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to update workflow.');
    }
  };

  const onDeleteConfirm = async (id: string) => {
    try {
      await deleteWorkflow(id);
      setWorkflows(prev => prev.filter(wf => wf._id !== id));
      Alert.alert('Success', 'Workflow deleted successfully.');
    } catch (error: any) {
      console.error('Error deleting workflow:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to delete workflow.');
    }
  };

  const handleDeleteWorkflow = (id: string) => {
    onDeleteConfirm(id);
    Alert.alert(
      'Delete Workflow',
      'Are you sure you want to delete this workflow? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDeleteConfirm(id) },
      ]
    );
  };

  const openEditModal = (workflow: Workflow) => {
    setCurrentWorkflow(workflow);
    setIsEditModalVisible(true);
  };

  const renderItem = ({ item }: { item: Workflow }) => (
    <Card style={styles.card} onPress={() => handleCardPress(item._id)}>
      <Card.Title title={item.name} right={() => (
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => openEditModal(item)}>
            <Icon name="pencil" size={20} color="#6200ee" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteWorkflow(item._id)}>
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
        left={<TextInput.Icon icon="magnify" />}
      />

      {/* Workflow List */}
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredWorkflows}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text>No workflows found. Try adjusting your search or add a new workflow.</Text>
            </View>
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl 
              refreshing={isRefreshing} 
              onRefresh={onRefresh} 
              tintColor="#6200ee" // Optional: Change the color of the refresh indicator
            />
          }
        />
      )}

      {/* Floating Action Button to Add Workflow */}
      <Fab
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
              onSubmit={(name: string) => handleUpdateWorkflow(currentWorkflow._id, name)} 
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
    backgroundColor: '#FFFFFF', // Ensure background is white
  },
  searchInput: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#F5F5F5', // Optional: Light grey for cards
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
  loader: {
    marginTop: 20,
  },
});
