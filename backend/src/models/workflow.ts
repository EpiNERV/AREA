import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkflow extends Document {
  name: string;
}

const WorkflowSchema: Schema = new Schema({
  name: { type: String, required: true },
});

const Workflow = mongoose.model<IWorkflow>('Workflow', WorkflowSchema);
export default Workflow;
