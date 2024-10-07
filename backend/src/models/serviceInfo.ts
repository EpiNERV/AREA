import mongoose, { Document, Model, Schema } from "mongoose";

// Interface that extends the mongoose Document
export interface IServiceInfo extends Document {
    name: string;
    oauth2_redirect_uri: string;
}

// ServiceInfo Schema
const serviceInfoSchema = new Schema<IServiceInfo>(
    {
        name: {
            type: String,
            required: [true, "Service name is required"],
            unique: true,
            trim: true,
        },
        oauth2_redirect_uri: {
            type: String,
            required: [true, "OAuth2 redirect URI is required"],
            trim: true,
        },
    },
    { timestamps: true }
);

// Seed the ServiceInfo collection
interface IServiceInfoFull extends Model<IServiceInfo> {
    seed(): Promise<IServiceInfo[]>;
}

serviceInfoSchema.statics.seed = async function () {
    console.log("Seeding the ServiceInfo collection");
    const count = await this.countDocuments().exec();

    if (count > 0) {
        console.log("ServiceInfo collection already seeded");
        return [];
    }

    return this.create([
        {
            name: "discord",
            oauth2_redirect_uri: "http://localhost:5000/api/v1/user/services/discord/login",
        },
        {
            name: "twitter",
            oauth2_redirect_uri: "http://localhost:5000/api/v1/user/services/twitter/login",
        }
    ]);
};

// Export the ServiceInfo model
const ServiceInfo: IServiceInfoFull = mongoose.model<IServiceInfo, IServiceInfoFull>('ServiceInfo', serviceInfoSchema, 'serviceinfos');
export default ServiceInfo;
