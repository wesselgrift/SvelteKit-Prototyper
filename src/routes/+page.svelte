<script>
  import { goto } from "$app/navigation";
  import Spinner from "$lib/components/ui/Spinner.svelte";
  
  // for simplicity of this boilerplate, just redirect the homepage to login page
  // remove this in your own project
  $effect(() => {
    goto("/login");
  });
</script>

<div role="status" class="flex flex-row justify-center items-center h-screen">
  <Spinner />
</div>
  