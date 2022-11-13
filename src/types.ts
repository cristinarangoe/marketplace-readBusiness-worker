import * as Realm from 'realm-web';

export interface Env {
	MONGO_DB_APP_ID: string;
	MONGO_DB_API_KEY: string;
}

type Document = globalThis.Realm.Services.MongoDB.Document;

export interface Todo extends Document {
	owner: string;
	done: boolean;
	todo: string;
}

export interface BusinessInfo {
    firstName: string;
	secondName?: string;
	firstLastName: string;
	secondLastName?: string;
	phone: number;
	email: string;
	IDType: string;
	ID: string;
	businessType: string;
	businessName: string;
}

export interface BusinessDB extends Document {
	firstName: string;
	secondName?: string;
	firstLastName: string;
	secondLastName?: string;
	phone: number;
	email: string;
	IDType: string;
	ID: string;
	businessType: string;
	businessName: string;
}