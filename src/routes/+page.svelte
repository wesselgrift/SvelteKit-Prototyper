<script>
    // Import reusable components and icons
    import Logo from "$lib/components/parts/Logo/Logo.svelte";
    import Button from "$lib/components/parts/Button/Button.svelte";
    import { Github } from "lucide-svelte";
</script>

<!-- Landing page with navigation and hero section -->
<div class="flex flex-col w-full max-w-7xl justify-center mx-auto">
    <!-- Top navigation bar -->
    <nav class="flex flex-row justify-between items-center gap-4 py-6 px-4">
        <Logo />
        <!-- Auth buttons for signup and login -->
        <div class="flex flex-row gap-1 items-start">
            <a href="/account">
                <Button width="hug" size="small" variant="ghost">Create account</Button>
            </a>
            <a href="/login">
                <Button width="hug" size="small" variant="ghost">Login</Button>
            </a>
        </div>
    </nav>
    
    <!-- Main content area -->
    <main class="px-4">
        <!-- Hero section with project description -->
        <section class="px-4 py-16 lg:py-[160px] flex flex-col justify-center items-center border border-border">
            <h1 class="text-2xl lg:text-5xl font-medium mb-4 text-center">SvelteKit Prototyper</h1>
            <p class="text-md lg:text-lg text-muted-foreground text-center mb-4">
                SvelteKit + Tailwind CSS + Firebase Auth boilerplate
            </p>
            <!-- Link to GitHub repository -->
            <a href="https://github.com/wesselgrift/svelte-boilerplate" target="_blank">
                <Button width="hug" variant="primary">
                    <Github size={20} />
                    View on Github
                </Button>
            </a>
        </section>
    </main>
</div>