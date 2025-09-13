import { json } from '@sveltejs/kit';
import routesData from './dummy-routes.json';

export function GET() {
	return json(routesData);
}
