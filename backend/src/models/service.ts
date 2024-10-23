import { Schema, model, Document } from 'mongoose';

export interface IServiceDetails {
  name: string;
  key: string;
  connected: boolean;
  token: string | null;
  refreshToken: string | null;
  tokenCreatedAt: Date | null;
  tokenExpiresIn: number | null;
}

export interface IService extends Document {
  user: Schema.Types.ObjectId;
  services: IServiceDetails[];
}

const ServiceSchema = new Schema<IService>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  services: [{
    name: { type: String, required: true },
    key: { type: String, required: true },
    connected: { type: Boolean, default: false },
    token: { type: String, default: null },
    refreshToken: { type: String, default: null },
    tokenCreatedAt: { type: Date, default: null },
    tokenExpiresIn: { type: Number, default: null },
  }]
});

const Service = model<IService>('Service', ServiceSchema);
export default Service;
