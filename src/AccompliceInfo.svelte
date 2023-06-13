<script lang="ts">
  import MurdererInfo from "./MurdererInfo.svelte";

  export let data;

  let murderer:string

  $:murderer = data['murderer']

</script>

<div
  class="bg-neutral-800 grid grid-cols-1 gap-1 place-items-center text-center border border-black border-2 rounded-xl p-4"
>

  <p class="text-xl text-red-500 underline underline-offset-4">
    Murderer: {murderer}
  </p>
  <MurdererInfo {data}/>
</div>
