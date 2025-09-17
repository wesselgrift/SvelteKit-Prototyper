// Import the error function from the @sveltejs/kit package
import { error } from '@sveltejs/kit';

// This is the load function for the dynamic route
// It fetches the route data from the API and returns it
// The route data is then passed to the page component
// The page component can then use the route data to display the page
// The route data is also passed to the page component as a prop
// The page component can then use the route data to display the page
export async function load({ params, fetch }) {
    try {
        const response = await fetch('/api/data');
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