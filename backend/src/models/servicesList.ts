import mongoose, { Document, Model, Schema } from "mongoose";
import jsonServicesList from "./default_services_list.json";
import Spinner from "../utils/spinner";
import Service, { IServiceDetails } from "./service";

// Parse the JSON file

// Interface to access the document
export interface IncompleteIServicesList extends Document {
  name: string;
  oauth2_redirect_uri: string;
}

// ServicesList Schema
const servicesListSchema = new Schema<IncompleteIServicesList>({
  name: { type: String, required: true, unique: true, trim: true },
  oauth2_redirect_uri: { type: String, required: true, trim: true },
}, { timestamps: true }
);

// Seed the ServicesList collection
interface IServicesList extends Model<IncompleteIServicesList> {
  seed(): Promise<IncompleteIServicesList[]>;
  updateAllUsersServices(): Promise<void>;
}

servicesListSchema.statics.seed = async function () {
  const spinner = new Spinner(
    "Successfully seeded the ServicesList collection",
    "Failed to seed the ServicesList collection"
  )
  spinner.addStep("Retrieving the database services list");
  spinner.addStep("Retrieving the JSON services list");

  try {
    spinner.start();

    const servicesDocuments = await this.find();
    const allSelfServices = new Set(servicesDocuments.map((service: { name: any; }) => service.name));

    spinner.endStep();
    const allJsonServices = new Set(jsonServicesList.map(service => service.key));

    const docsToDelete = [];
    for (const doc of servicesDocuments) {
      if (!allJsonServices.has(doc.name)) {
        spinner.addStep(`Service ${doc.name} not found in JSON file, removing it from the database`);
        docsToDelete.push(doc);
      }
    }

    for (const doc of docsToDelete) {
      spinner.endStep();
      await this.deleteOne({ name: doc.name });
    }


    const docsToCreate = [];
    for (const jsonService of jsonServicesList) {
      if (!allSelfServices.has(jsonService.key)) {
        spinner.addStep(`Service ${jsonService.key} not found in the database, creating it`);
        docsToCreate.push({
          name: jsonService.key,
          oauth2_redirect_uri: jsonService.oauth2_redirect_uri
        });
      }
    }

    for (const doc of docsToCreate) {
      await new Promise(resolve => setTimeout(resolve, 100));
      spinner.endStep();
      await this.create(doc);
    }

    spinner.stop();
  } catch (err) {
    spinner.stopFailure(err);
    throw err;
  }
}

servicesListSchema.statics.updateAllUsersServices = async function () {
  const spinner = new Spinner(
    "Successfully updated all users services",
    "Failed to update all users services"
  )
  spinner.addStep("Retrieving all services");
  spinner.addStep("Retrieving all users services");

  try {
    spinner.start();

    const all_required_services = await this.find();
    const all_required_services_names: Set<string> = new Set(all_required_services.map((service: { name: string; }) => service.name));

    spinner.endStep();
    const users_services_doc = await Service.find();

    for (const user_services_entry of users_services_doc) {
      const all_user_services_names: Set<string> = new Set(user_services_entry.services.map((service: { key: string; }) => service.key));
      const missing_services = new Set([...all_required_services_names].filter(x => !all_user_services_names.has(x)));

      // Create the missing services
      for (const name of missing_services) {
        spinner.addStep(`Service ${name} not found in the user services, creating it`);
        spinner.endStep();

        const new_service = {
          name: name,
          key: name,
          connect: false,
        }

        user_services_entry.services.push(new_service as unknown as IServiceDetails);
        user_services_entry.save();
      }
    }
    spinner.stop();
  } catch (err) {
    spinner.stopFailure(err);
    throw err;
  }
}

// Export the ServicesList model
const ServicesList = mongoose.model<IncompleteIServicesList, IServicesList>("ServicesList", servicesListSchema);
export default ServicesList;
