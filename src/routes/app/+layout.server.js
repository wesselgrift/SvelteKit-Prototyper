import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    // Check if user is authenticated server-side
    if (!locals.user) {
        throw redirect(302, '/login');
    }
    
    // Check if email is verified
    if (!locals.user.emailVerified) {
        throw redirect(302, '/verify-email');
    }
    
    return {
        user: locals.user
    };
}
