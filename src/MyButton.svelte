<script lang="ts">
  export let title;
  export let onClick;
</script>

<button
  class="bg-red-800 text-white font-bold rounded-lg py-2 px-4"
  on:click={onClick}>{title}
</button>
