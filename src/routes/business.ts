import { BusinessDB } from './../types';
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
			.collection<BusinessDB>('entrepreneur');
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

export default business;
