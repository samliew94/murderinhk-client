<script lang="ts">
  import Icon from "@iconify/svelte";

  export let data;

  import Config from "./Config";
  import BtnNext from "./BtnNext.svelte";

  async function onSelectedForensic(username: string) {
    // only host can change godFather
    if (!data["isHost"]) return;

    const res = await fetch(`${Config.origin}/game/onselectedforensic`, {
      method: "POST",
      body: JSON.stringify({ username: username }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
  async function next() {
    // only host can call this method
    if (!data["isHost"]) return;

    const res = await fetch(`${Config.origin}/game/toselectclueandmean`, {
      method: "POST",
      // body: JSON.stringify({ username: username }),
      // headers: {
      //   "Content-Type": "application/json",
      // },
      credentials: "include",
    });
  }
</script>

<div class="grid grid-cols-1 gap-4 place-items-center text-center p-2">
  <p class="text-2xl">Host Selects<br/>Forensic Scientist</p>

  <div class="grid grid-cols-2 gap-2">
    {#each data["players"] as player, index}
      <button
        on:click={() => onSelectedForensic(player)}
        class="
  {data['forensic'] === player ? 'bg-blue-600' : 'bg-neutral'} text-2xl p-2 rounded-lg"
        >{player}</button
      >
    {/each}
  </div>

  <!-- only host can see the Next button -->
  {#if data["isHost"]}
    <BtnNext onClick={next}/>
  {/if}

</div>
