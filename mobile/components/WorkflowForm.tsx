// components/WorkflowForm.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  TextInput, 
  Button, 
  HelperText 
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the form validation schema using zod
const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

type FormData = z.infer<typeof formSchema>;

interface Workflow {
  id: number;
  name: string;
}

interface WorkflowFormProps {
  initialData?: Workflow;
  onSubmit: (workflow: Workflow) => void;
  onCancel: () => void;
}

const WorkflowForm: React.FC<WorkflowFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData ? initialData.name : '',
    },
  });

  const submitHandler = (data: FormData) => {
    if (initialData) {
      onSubmit({ id: initialData.id, name: data.name });
    } else {
      onSubmit({ id: 0, name: data.name }); // ID will be set in mockCreateWorkflow
    }
    reset();
  };

  return (
    <View>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              label="Workflow Name"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.name}
            />
            {errors.name && (
              <HelperText type="error">
                {errors.name.message}
              </HelperText>
            )}
          </>
        )}
      />

      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined" 
          onPress={onCancel} 
          style={styles.button}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          mode="contained" 
          onPress={handleSubmit(submitHandler)} 
          style={styles.button}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {initialData ? 'Update' : 'Create'}
        </Button>
      </View>
    </View>
  );
};

export default WorkflowForm;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    marginLeft: 8,
  },
});
