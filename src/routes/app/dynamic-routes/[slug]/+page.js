import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    try {
        const response = await fetch('/api/dynamic-routes');
        const data = await response.json();
        const routeData = data.routes.find(route => route.slug === params.slug);
        
        if (!routeData) {
            error(404, 'Route not found');
        }
        
        return {
            routeData
        };
    } catch (err) {
        console.error('Failed to fetch route data:', err);
        error(500, 'Failed to load route data');
    }
}