<script lang="ts">
  export let data;

  import BtnNext from "./BtnNext.svelte";
  import Config from "./Config";
  import Icon from "@iconify/svelte";

  async function next() {
    const res: any = await fetch(`${Config.origin}/game/tosettings`, {
      method: "POST",
      credentials: "include",
    });
  }

  async function kick(username: String) {
    const res = await fetch(`${Config.origin}/game/kick`, {
      method: "POST",
      body: JSON.stringify({ username: username }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
</script>

<div class="grid grid-cols-1 gap-2 place-items-center text-center">
  <p class="text-4xl underline">Lobby</p>
  <div class="grid grid-cols-8 gap-2 p-2 rounded-lg text-2xl">
    {#each data["players"] as player, i}
      <p class="col-span-1">{i + 1}.</p>
      <p class="col-span-5">{player["username"]}</p>
      <div class="col-span-1">
        {#if player["isHost"]}
          <Icon color="yellow" icon="pepicons-pop:crown" />
        {:else}
          <div />
        {/if}
      </div>
      <div class="col-span-1">
        {#if data["isHost"] && player['username'] != player['hostUsername']}
          <button on:click={() => kick(player['username'])}>
            <Icon color="red" icon="game-icons:boot-kick" />
          </button>
        {:else}
          <div />
        {/if}
      </div>
    {/each}
  </div>

  {#if data["players"].length < 4}
    <p>
      Need {data["players"].length}/4 players
    </p>
  {:else if data["isHost"]}
    <BtnNext onClick={next}/>
  {:else}
    <p class="italic">Waiting for Host to continue</p>
  {/if}
</div>
