<script>
  import ResetPassword from "../../lib/components/auth/ResetPassword.svelte";
  import { ChevronLeft } from 'lucide-svelte';
</script>
  
  
  
<div class="flex justify-center" style="padding-top: 120px;">
  <div style="max-width: 470px;" class="p-5 w-full">
    <h2 class="text-3xl font-semibold mb-9 leading-tight">Reset Password</h2>
    <ResetPassword />
    <a href="/login" class="flex items-center justify-center gap-1 mt-5 text-sm text-gray-500 hover:text-gray-700 transition">
      <ChevronLeft size={20} strokeWidth={2} />
      Back to sign in
    </a>
  </div>
</div>