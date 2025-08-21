/**
 * Toggle CSS classes on both the body and html elements
 * 
 * This utility function is used to add or remove CSS classes from both the
 * document body and the html root element. This is commonly needed for:
 * - Applying global styles based on UI state (dark mode, mobile menu open, etc.)
 * - Preventing scroll when modals are open
 * - Changing the entire page appearance based on user preferences
 * 
 * Note: The 'body' and 'html' parameters are not used in the current implementation
 * but are kept for potential future use or backward compatibility
 */
export function bodyClassUpdater(boolean, className, body, html) {
    
    if (boolean) {
        // Add the class to both body and html elements
        document.body.classList.add(className);
        document.documentElement.classList.add(className);
    } else {
        // Remove the class from both body and html elements
        document.body.classList.remove(className);
        document.documentElement.classList.remove(className);
    }
}