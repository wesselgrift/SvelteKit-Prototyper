import { json } from '@sveltejs/kit';
import routesData from './dummy-data.json';

export function GET() {
	return json(routesData);
}
