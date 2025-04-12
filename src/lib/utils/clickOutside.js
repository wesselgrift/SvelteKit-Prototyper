export function clickOutside(event, element) {
    if (element && !element.contains(event.target) ) {
        // Returns true if click is outside of the element
        return true;
    }
    return false;
}