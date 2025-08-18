<script>
    // Props
    let { 
        type = 'text',
        id,
        name,
        value = $bindable(), 
        placeholder,
        required = false,
        multiple = false,
        disabled = false,
    } = $props();


    const classes = {
        default: `
            block w-full 
            text-base lg:text-sm 
            h-9     lg:h-10
            px-3.5  lg:px-4 
            bg-background
            border border-input  
            rounded-lg 
            focus-ring 
            focus:border-input 
            transition-all
            shadow-sm
        `,
        fileType:`
            block w-full 
            text-base lg:text-sm 
            bg-background 
            border border-input 
            rounded-lg 
            overflow-hidden 
            shadow-sm
            cursor-pointer 
            focus-ring 
            focus:border-input 
            transition-all 
            file:font-medium 
            file:cursor-pointer 
            file:border-0 
            file:h-9   lg:file:h-[38px]
            file:px-3.5 lg:file:px-4 
            file:mr-4 
            file:bg-secondary 
            hover:file:bg-secondary-foreground/10 
            file:text-secondary-foreground
        `,
        colorType:`
            inline-block 
            lg:text-sm 
            size-10 
            rounded-full 
            focus-ring 
            shadow-sm
            transition-all
        `,
        rangeType:`
            w-full 
            cursor-pointer
        `,
        disabled:`
            disabled:cursor-default 
            disabled:bg-muted 
            disabled:border-muted 
            disabled:text-muted-foreground/70 
            disabled:pointer-events-none 
            file:disabled:bg-muted-foreground/10 
            file:disabled:text-muted-foreground/70
        `
    }
</script>
  
{#if type === 'text' || type === 'password' || type === 'email' || type === 'tel' || type === 'url' || type === 'search' || type === 'number' || type === 'date' || type === 'datetime-local' || type === 'month' || type === 'time' || type === 'week'}
    <input {name} {id} {type} {placeholder} {required} {disabled} class={classes.default + ' ' + classes.disabled} bind:value />
{:else if type === 'file'}
    <input {name} {id} {type} {placeholder} {required} {disabled} class={classes.fileType + ' ' + classes.disabled} bind:value {multiple} />
{:else if type === 'color'}
    <input {name} {id} {type} {placeholder} {required} {disabled} class={classes.colorType + ' ' + classes.disabled} bind:value />
{:else if type === 'range'}
    <input {name} {id} {type} {placeholder} {required} {disabled} class={classes.rangeType + ' ' + classes.disabled} bind:value />
{/if}


<style>
    /* Style date and time related inputs */
    input[type="date"]::-webkit-calendar-picker-indicator,
    input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    input[type="month"]::-webkit-calendar-picker-indicator,
    input[type="time"]::-webkit-calendar-picker-indicator,
    input[type="week"]::-webkit-calendar-picker-indicator {
        display: none;
    }

    /* Add a date related icon */
    input[type="date"], input[type="datetime-local"], input[type="month"], input[type="week"], input[type="time"], input[type="search"] {
        position: relative;
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-calendar-icon lucide-calendar'><path d='M8 2v4'/><path d='M16 2v4'/><rect width='18' height='18' x='3' y='4' rx='2'/><path d='M3 10h18'/></svg>");
        background-repeat: no-repeat;
        background-size: 1.2rem;
        background-position: left 1rem center;
        padding-left: 2.6rem;
        &:disabled{
            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' opacity='0.3' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-calendar-icon lucide-calendar'><path d='M8 2v4'/><path d='M16 2v4'/><rect width='18' height='18' x='3' y='4' rx='2'/><path d='M3 10h18'/></svg>");
        }
    }

    /* Add a time related icon */
    input[type="time"] {
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-clock-icon lucide-clock'><circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/></svg>");
        &:disabled{
            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' opacity='0.3' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-clock-icon lucide-clock'><circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/></svg>");
        }
    }

    /* Add a search related icon and cancel icon */
    input[type="search"] {
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-search-icon lucide-search'><circle cx='11' cy='11' r='8'/><path d='m21 21-4.3-4.3'/></svg>");
        &::-webkit-search-cancel-button{
            appearance: none;
            -webkit-appearance: none;
            @apply size-4;
            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='grey' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-x-icon lucide-x'><path d='M18 6 6 18'/><path d='m6 6 12 12'/></svg>");
            background-size: 20px;
            background-repeat: no-repeat;
            background-position: center;
            cursor: pointer;
        }
        &:disabled{
            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' opacity:'0.3' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-search-icon lucide-search'><circle cx='11' cy='11' r='8'/><path d='m21 21-4.3-4.3'/></svg>");
        }
    }

    /* Dark mode svg colors */
    @media (prefers-color-scheme: dark) {
        input[type="date"], input[type="datetime-local"], input[type="month"], input[type="week"], input[type="time"], input[type="search"] {
            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-calendar-icon lucide-calendar'><path d='M8 2v4'/><path d='M16 2v4'/><rect width='18' height='18' x='3' y='4' rx='2'/><path d='M3 10h18'/></svg>");
            &:disabled{
                background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' opacity='0.3' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-calendar-icon lucide-calendar'><path d='M8 2v4'/><path d='M16 2v4'/><rect width='18' height='18' x='3' y='4' rx='2'/><path d='M3 10h18'/></svg>");
            }
        }
        input[type="time"] {
            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-clock-icon lucide-clock'><circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/></svg>");
            &:disabled{
                background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' opacity='0.3' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-clock-icon lucide-clock'><circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/></svg>");
            }
        }
        input[type="search"] {
            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-search-icon lucide-search'><circle cx='11' cy='11' r='8'/><path d='m21 21-4.3-4.3'/></svg>");
            &:disabled{
                background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' opacity='0.3' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-search-icon lucide-search'><circle cx='11' cy='11' r='8'/><path d='m21 21-4.3-4.3'/></svg>");
            }
        }
    }

    /*Range type styling*/
    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
    }

    /* Removes default focus */
    input[type="range"]:focus {
        outline: none;
    }

    /* slider track */
    input[type="range"]::-webkit-slider-runnable-track {
        @apply bg-muted h-2 rounded-lg;
    }

    /* slider thumb */
    input[type="range"]::-webkit-slider-thumb {
        @apply appearance-none bg-primary rounded-full size-4 -mt-1;
    }

    input[type="range"]:focus::-webkit-slider-thumb {   
        @apply border border-ring outline outline-ring outline-2 outline-offset-2;
    }

    input[type="range"]:disabled::-webkit-slider-thumb {
        @apply opacity-50 pointer-events-none;
    }

    /* slider track */
    input[type="range"]::-moz-range-track {
        @apply bg-muted h-2 rounded-lg;
    }

    /* slider thumb */
    input[type="range"]::-moz-range-thumb {
        border: none; /*Removes extra border that FF applies*/
        @apply appearance-none bg-primary rounded-full size-4 -mt-1;
    }

    input[type="range"]:focus::-moz-range-thumb {
        @apply border border-ring outline outline-ring outline-2 outline-offset-2;
    }

    input[type="range"]:disabled::-moz-range-thumb {
        @apply opacity-50 pointer-events-none;
    }

    /* Style color input */
    input[type="color"] {
        appearance: none;
        -webkit-appearance: none;
        border: none;
        width: 32px;
        height: 32px;
        &:disabled {
            opacity: 0.3;
        }
    }
    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0px;
    }
    input[type="color"]::-webkit-color-swatch {
        border: none;
    }
</style>


