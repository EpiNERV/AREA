import React from 'react';
import { Dialog, Button, TextInput } from 'react-native-paper';

interface BackendAddressDialogProps {
  visible: boolean;
  onDismiss: () => void;
  address: string;
  setAddress: (text: string) => void;
  port: string;
  setPort: (text: string) => void;
  onSave: () => void;
}

const BackendAddressDialog: React.FC<BackendAddressDialogProps> = ({
  visible,
  onDismiss,
  address,
  setAddress,
  port,
  setPort,
  onSave,
}) => {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Enter Backend Address</Dialog.Title>
      <Dialog.Content>
        <TextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Port"
          value={port}
          onChangeText={setPort}
          keyboardType="numeric"
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button onPress={onSave}>OK</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default BackendAddressDialog;
