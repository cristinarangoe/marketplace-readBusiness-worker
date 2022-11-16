import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Env } from './types';
import business from './routes/business';

const app = new Hono<{ Bindings: Env }>();
app.use(
	'/*',
	cors({
		origin: '*',
		allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'],
	})
);
app.route('/business', business);

export default app;
