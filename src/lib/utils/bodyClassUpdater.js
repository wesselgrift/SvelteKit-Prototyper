export function bodyClassUpdater(boolean, className, body, html) {
    
    if (boolean) {
        document.body.classList.add(className);
        document.documentElement.classList.add(className);
    } else {
        document.body.classList.remove(className);
        document.documentElement.classList.remove(className);
    }
}