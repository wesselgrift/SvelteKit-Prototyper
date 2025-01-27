<script>
    import { goto } from "$app/navigation";
    import { logout } from "$lib/firebase/auth";
    function handleLogout() {
        logout();
        goto("/");
    }
</script>

<div class="flex justify-between items-center">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
    <button onclick={handleLogout}>Logout</button>
</div>
