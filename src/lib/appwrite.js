import {Client, Databases} from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

export const databases = new Databases(client);

export const collection_id = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
export const bucket_id = import.meta.env.VITE_APPWRITE_BUCKET_ID
export const project_name_id = import.meta.env.VITE_APPWRITE_PROJECT_NAME_ID;
