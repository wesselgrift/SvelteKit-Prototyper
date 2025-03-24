<script>
    let { 
        children, 
        type = 'button', 
        onclick = () => {},
        variant = 'primary',
        size = 'default',
        width = 'fill'
    } = $props();

    const defaultClasses = 'svb-button flex items-center justify-center font-medium rounded-lg transition focus:ring-2 focus:ring-color-ring focus:ring-offset-2 focus:outline-none focus:ring-offset-color-background dark:focus:ring-offset-color-background-dark';

    const widthType = {
        fill: "w-full",
        hug: ""
    }

    const sizes = {
        default: "py-2.5 lg:py-3.5 px-4 lg:px-5",
        small: "py-1 lg:py-1.5 px-2 lg:px-3"
    }

    const variants = {
        primary: `${defaultClasses} primary`,
        secondary: `${defaultClasses} secondary`,
        outline: `${defaultClasses} outline border border-1 outline-none`
    }

    
</script>
  
<button {type} onclick={onclick} class={variants[variant] + ' ' + sizes[size] +' '+ widthType[width]}>
    {#if children}
        {@render children()}
    {/if}
</button>

<style>
    .svb-button {
        &.primary {
            /* bg */
            @apply 
                bg-color-primary 
                dark:bg-color-primary-dark;

            /* bg:hover */
            @apply 
                hover:bg-color-primary-hover 
                dark:hover:bg-color-primary-dark-hover;

            /* bg:active (pressed) */
            @apply 
                active:bg-color-primary-pressed 
                dark:active:bg-color-primary-dark-pressed;

            /* text */
            @apply 
                text-color-primary-foreground 
                dark:text-color-primary-foreground-dark;

        }
        &.secondary {
            /* bg */
            @apply 
                bg-color-secondary 
                dark:bg-color-secondary-dark;

            /* bg:hover */
            @apply 
                hover:bg-color-secondary-hover 
                dark:hover:bg-color-secondary-dark-hover;

            /* bg:active (pressed) */
            @apply 
                active:bg-color-secondary-pressed 
                dark:active:bg-color-secondary-dark-pressed;

            /* text */
            @apply 
                text-color-secondary-foreground 
                dark:text-color-secondary-foreground-dark;

        }
        &.outline {
            /* bg */
            @apply
                bg-color-background 
                dark:bg-color-background-dark;

            /* bg:hover */
            @apply
                hover:bg-color-background-hover 
                dark:hover:bg-color-background-dark-hover;

            /* bg:active (pressed) */
            @apply
                active:bg-color-background-pressed 
                dark:active:bg-color-background-dark-pressed;

            /* text */
            @apply
                text-color-foreground 
                dark:text-color-foreground-dark;

            /* border */
            @apply 
                border-color-border
                dark:border-color-border-dark;
        }
    }
</style>