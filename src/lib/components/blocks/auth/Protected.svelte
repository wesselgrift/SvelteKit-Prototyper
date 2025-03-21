<script>
  import { onDestroy } from "svelte";
  import { user, loading } from "$lib/stores/userStore";
  import Spinner from "$lib/components/parts/Spinner.svelte";

  let { children } = $props();
  let currentUser = $state();

  const unsubscribe = user.subscribe((val) => {
    currentUser = val;
  });

  onDestroy(() => {
    unsubscribe();
  });

</script>


{#if $loading}
  <div role="status" class="flex flex-row justify-center items-center h-screen">
    <Spinner />
  </div>
{:else if currentUser}
  <div>
    {@render children?.()}
  </div>
{/if}