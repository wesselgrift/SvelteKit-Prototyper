<script>
    import Logo from "$lib/components/parts/Logo.svelte";
    import Button from "$lib/components/parts/Button.svelte";
    import { Github } from "lucide-svelte";
</script>

<!-- Homepage dummy content -->
<div class="flex flex-col w-full max-w-7xl justify-center mx-auto">
    <nav class="flex flex-row justify-between items-center gap-4 py-6 px-4">
        <Logo />
        <div class="flex flex-row gap-1 items-start">
            <a href="/account">
                <Button width="hug" size="small" variant="ghost">Create account</Button>
            </a>
            <a href="/login">
                <Button width="hug" size="small" variant="ghost">Login</Button>
            </a>
        </div>
    </nav>
    <main class="border border-border mt-8">
        <section class="px-4 py-[160px] flex flex-col justify-center items-center">
            <h1 class="text-5xl font-medium mb-5">SvelteKit Prototyping Boileplate</h1>
            <p class="text-lg text-muted-foreground text-center mb-4">
                A small starter kit built with with SvelteKit, Tailwind CSS, Firestore and Firebase authenication. <br> No typescript, because f*ck typescript.
            </p>
            <a href="https://github.com/wesselgrift/svelte-boilerplate" target="_blank">
                <Button width="hug" variant="primary">
                    <Github size={20} />
                    View on Github
                </Button>
            </a>
        </section>
    </main>
</div>