<script>
  import { goto } from "$app/navigation";
  import Spinner from "$lib/components/ui/Spinner.svelte";
  
  $effect(() => {
    goto("/login");
  });
</script>

<div role="status" class="flex flex-row justify-center items-center h-screen">
  <Spinner />
</div>
  