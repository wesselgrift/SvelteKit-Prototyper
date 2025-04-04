<script>

    let {
        multiple = false
    } = $props();

    let base = "block w-full text-base lg:text-sm border border-input focus:border-input bg-background rounded-lg cursor-pointer focus-ring transition-all";
    let button = "file:font-medium file:cursor-pointer file:border-0 file:py-2 file:px-3.5 lg:file:py-3 lg:file:px-4 file:mr-4 file:bg-secondary hover:file:bg-secondary-foreground/10 file:text-secondary-foreground";

</script>

<input type="file" class="{base} + ' ' + {button}" {multiple} />
