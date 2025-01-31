<script>
  import ResetPassword from "$lib/components/auth/ResetPassword.svelte";
  import { ChevronLeft } from 'lucide-svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
</script>
  
  
  
<div class="flex justify-center" style="padding-top: 120px;">
  <div style="max-width: 470px;" class="p-5 w-full">
    <Logo className="mb-10" />
    <h2 class="text-3xl font-semibold mb-9 leading-tight text-color-foreground">Reset Password</h2>
    <ResetPassword />
    <a href="/login" class="flex items-center justify-center gap-1 mt-5 text-sm text-color-muted-foreground hover:text-color-foreground transition">
      <ChevronLeft size={20} strokeWidth={2} />
      Back to sign in
    </a>
  </div>
</div>