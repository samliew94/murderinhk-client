<script lang="ts">
  export let data;
</script>

{#if data["accomplice"] && data["witness"]}
  <div
    class="bg-neutral-900  grid grid-cols-1 gap-1 place-items-center text-center border border-black border-2 rounded-xl p-4"
  >
    <p class="text-xl text-red-500 underline underline-offset-4">
      Accomplice: {data["accomplice"]}
    </p>
    <p class="text-xl text-blue-500 underline underline-offset-4">
      Witness: {data["witness"]}
    </p>
  </div>
{/if}
