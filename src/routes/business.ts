import { BusinessDB, Product, ProductDB, UpdateProductBody } from './../types';
import { Hono } from 'hono';
import * as Realm from 'realm-web';

const business = new Hono();

let RealmApp: Realm.App;
const ObjectId = Realm.BSON.ObjectID;

business.get('/findBusiness/:email', async (c) => {
	try {
		const email = c.req.param('email');
		RealmApp = RealmApp || new Realm.App(c.env.MONGO_DB_APP_ID);

		const credentials = Realm.Credentials.apiKey(c.env.MONGO_DB_API_KEY);

		//duda
		let user = await RealmApp.logIn(credentials);
		let mongoClient = user.mongoClient('mongodb-atlas');

		const collection = mongoClient
			.db('users')
			.collection<BusinessDB>('business');
		//falta poner que busque es por el negocio, no por el name
		const result = await collection.findOne({ email: email });

		return c.json(result);
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify((error as Error).message), {
			status: 500,
		});
	}
});

business.get('/:id/products', async (c) => {
	try {
		const id = c.req.param('id');
		RealmApp = RealmApp || new Realm.App(c.env.MONGO_DB_APP_ID);

		const credentials = Realm.Credentials.apiKey(c.env.MONGO_DB_API_KEY);

		let user = await RealmApp.logIn(credentials);
		let mongoClient = user.mongoClient('mongodb-atlas');

		const collection = mongoClient.db('users').collection('Products');
		//falta poner que busque es por el negocio, no por el name
		const result = await collection.find({ idBusiness: id });

		return c.json(result);
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify((error as Error).message), {
			status: 500,
		});
	}
});

business.get('/product/:productId', async (c) => {
	try {
		const productId = c.req.param('productId');
		RealmApp = RealmApp || new Realm.App(c.env.MONGO_DB_APP_ID);

		const credentials = Realm.Credentials.apiKey(c.env.MONGO_DB_API_KEY);

		let user = await RealmApp.logIn(credentials);
		let mongoClient = user.mongoClient('mongodb-atlas');

		const collection = mongoClient.db('users').collection('Products');
		//falta poner que busque es por el negocio, no por el name
		let o_Id = new ObjectId(productId);
		const result = await collection.findOne({ _id: o_Id });

		return c.json(result);
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify((error as Error).message), {
			status: 500,
		});
	}
});

business
	.options('/product/update', async (c) => console.log(c.req.header))
	.put(async (c) => {
		try {
			RealmApp = RealmApp || new Realm.App(c.env.MONGO_DB_APP_ID);

			const credentials = Realm.Credentials.apiKey(c.env.MONGO_DB_API_KEY);

			let user = await RealmApp.logIn(credentials);
			let mongoClient = user.mongoClient('mongodb-atlas');

			const body: UpdateProductBody = await c.req.json();

			const collection = mongoClient
				.db('users')
				.collection<ProductDB>('Products');
			//falta poner que busque es por el negocio, no por el name
			let o_Id = new ObjectId(body.id);
			const result = await collection.updateOne(
				{ _id: o_Id },
				{
					$set: {
						...body.data,
					},
				},
				{
					upsert: true,
				}
			);

			return new Response('product updated', {
				status: 201,
			});
		} catch (error) {
			console.log(error);
			return new Response(JSON.stringify((error as Error).message), {
				status: 500,
			});
		}
	});

business
	.options('/product/delete', async (c) => console.log(c.req.header))
	.delete(async (c) => {
		try {
			RealmApp = RealmApp || new Realm.App(c.env.MONGO_DB_APP_ID);

			const credentials = Realm.Credentials.apiKey(c.env.MONGO_DB_API_KEY);

			let user = await RealmApp.logIn(credentials);
			let mongoClient = user.mongoClient('mongodb-atlas');

			const body: { productId: string } = await c.req.json();

			const collection = mongoClient
				.db('users')
				.collection<ProductDB>('Products');
			//falta poner que busque es por el negocio, no por el name
			let o_Id = new ObjectId(body.productId);
			const result = await collection.deleteOne({ _id: o_Id });

			return new Response('product updated', {
				status: 200,
			});
		} catch (error) {
			console.log(error);
			return new Response(JSON.stringify((error as Error).message), {
				status: 500,
			});
		}
	});

business.get('/:id/orders', async (c) => {
	try {
		const id = c.req.param('id');
		RealmApp = RealmApp || new Realm.App(c.env.MONGO_DB_APP_ID);

		const credentials = Realm.Credentials.apiKey(c.env.MONGO_DB_API_KEY);

		//duda
		let user = await RealmApp.logIn(credentials);
		let mongoClient = user.mongoClient('mongodb-atlas');

		const collection = mongoClient.db('users').collection('businessOrder');
		//falta poner que busque es por el negocio, no por el name
		const result = await collection.find({ idBusiness: id });

		return c.json(result);
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify((error as Error).message), {
			status: 500,
		});
	}
});

business.get('/:id/order/:idOrder', async (c) => {
	try {
		const idOrder = c.req.param('idOrder');

		RealmApp = RealmApp || new Realm.App(c.env.MONGO_DB_APP_ID);

		const credentials = Realm.Credentials.apiKey(c.env.MONGO_DB_API_KEY);

		//duda
		let user = await RealmApp.logIn(credentials);
		let mongoClient = user.mongoClient('mongodb-atlas');

		const collection = mongoClient.db('users').collection('businessOrder');
		//falta poner que busque es por el negocio, no por el name
		const o_Id = new ObjectId(idOrder);
		const result = await collection.findOne({ _id: o_Id });

		return c.json(result);
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify((error as Error).message), {
			status: 500,
		});
	}
});
export default business;
