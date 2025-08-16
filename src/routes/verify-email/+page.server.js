export async function load({ locals }) {
    // Pass server user data to the page
    return {
        user: locals.user || null
    };
}
