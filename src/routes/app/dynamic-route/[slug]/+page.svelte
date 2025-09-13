<script>
    import { page } from '$app/state';
    import PageTitle from "$lib/components/parts/PageTitle.svelte";
    
    // Get the dynamic parameter from the URL
    const slug = $derived(page.params.slug);
  </script>
  
  <PageTitle title="Dynamic route: {slug}" />
  
  <p>You're viewing page with slug: <strong>{slug}</strong></p>
  <p>This is a dynamic route with a parameter, slug, that can be used to load data dynamically when a user requests a page like /projects/{slug}</p>