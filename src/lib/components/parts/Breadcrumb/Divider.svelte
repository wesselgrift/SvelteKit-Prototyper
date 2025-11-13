<script>
    // Visual separator between breadcrumb items
    // Shows a chevron (>) icon between crumbs
    // Hidden from screen readers since it's purely decorative
    
    import { ChevronRight } from "lucide-svelte";
</script>

<!-- Separator with chevron icon, hidden from accessibility tree -->
<li class="divider text-muted-foreground/50" aria-hidden="true">
    <ChevronRight size={20} />
</li>