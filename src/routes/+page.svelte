<script>
    import Logo from "$lib/components/parts/Logo.svelte";
    import Button from "$lib/components/parts/Button.svelte";
    import { goto } from "$app/navigation";

    function login() {
        goto("/login");
    }

    function signup() {
        goto("/account");
    }
</script>

<nav class="flex flex-row justify-between items-center gap-4 py-4 px-4 border-b border-border">
    <Logo />
    <div class="flex flex-row gap-4 items-start">
        <Button width="hug" size="small" variant="primary" onclick={signup}>Create account</Button>
        <Button width="hug" size="small" variant="outline" onclick={login}>Login</Button>
    </div>
</nav>
<main>
    <section class="p-8 flex flex-col justify-center items-center">
        <h1 class="text-xl font-semibold">Hello World</h1>
    </section>
</main>