<script lang="ts">
  export let data;
</script>

<div class="grid grid-cols-1 gap-1 place-items-center p-2">
  <p class="text-2xl">Waiting For...</p>
  {#each data["waitingFor"] as _,i}
    <p class="text-xl p-2 ">{_}</p>
  {/each}
</div>
