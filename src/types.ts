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

export interface ProductUpdatableFields {
	name: string;
	price: number;
	description: string;
	image: string;
	stock: number;
}

export interface UpdateProductBody {
	id: string;
	data: ProductUpdatableFields;
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

interface ProductVariant {
	type: string;
	value: string;
}
export interface Product {
	name: string;
	characteristics: ProductVariant[];
	description: string;
	idBusiness: string;
	businessType: string;
	image: string;
	price: number | string;
	stock?: number;
}

export interface ProductDB extends Document {}
