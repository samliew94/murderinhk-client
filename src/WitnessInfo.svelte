<script lang="ts">
  export let data;

  let suspects:Array<string>

  $:suspects = data['murdererOrAccomplice']

</script>

<div
  class="bg-neutral-800 grid grid-cols-1 gap-1 place-items-center text-center border border-black border-2 rounded-xl p-4"
>

  <p class="text-xl text-red-500 ">
    Murderer and Accomplice:
  </p>
  <p class='text-red-500 text-2xl underline underline-offset-4'>{suspects[0]} or {suspects[1]}</p>
</div>
