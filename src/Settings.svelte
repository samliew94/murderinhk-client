<script lang="ts">
  import Icon from "@iconify/svelte";

  export let data;

  import Config from "./Config";
  import BtnNext from "./BtnNext.svelte";

  async function next() {
    // only host can change godFather
    if (!data["isHost"]) return;

    const res = await fetch(`${Config.origin}/game/toselectforensic`, {
      method: "POST",
      // body: JSON.stringify({ username: username }),
      // headers: {
      //   "Content-Type": "application/json",
      // },
      credentials: "include",
    });
  }
  async function incrNumClueMean() {
    updateNumClueMean(true);
  }

  async function decrNumClueMean() {
    updateNumClueMean(false);
  }

  async function updateNumClueMean(isIncrement: boolean) {
    // only host can call this method
    if (!data["isHost"]) return;

    const res = await fetch(`${Config.origin}/game/updatenumcluemeans`, {
      method: "POST",
      body: JSON.stringify({ increment: isIncrement }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  async function toggleOptionalRoles() {
    if (!data["isHost"]) return;

    const res = await fetch(`${Config.origin}/game/toggleoptionalroles`, {
      method: "POST",
      // body: JSON.stringify({ increment: isIncrement }),
      // headers: {
      //   "Content-Type": "application/json",
      // },
      credentials: "include",
    });
  }
</script>

<div class="grid grid-cols-1 gap-2 p-2 place-items-center">
  <div class="grid grid-cols-7 p-2 items-center text-center">
    <p class="col-span-3 text-xl">Clues & Means &nbsp;</p>
    <p class="col-span-2 text-2xl">{data["totalClueMeans"]}</p>
    <button on:click={incrNumClueMean} class="col-span-1">
      <Icon color="green" width="28" icon="zondicons:add-solid" />
    </button>
    <button on:click={decrNumClueMean} class="col-span-1">
      <Icon color="red" width="28" icon="zondicons:minus-solid" />
    </button>
  </div>

  <div class="grid grid-cols-1 gap-2 px-2 text-center">
    <div class="bg-[#023e8a] h-auto p-4 grid grid-cols-1 rounded-lg">
      <p class="text-2xl underline underline-offset-4">FORENSIC SCIENTIST</p>
      <p class="italic">
        Helps Investigators to find<br />"Clue" and "Mean"
      </p>
    </div>
    <div class="bg-[#023e8a] h-auto p-4 grid grid-cols-1 rounded-lg">
      <p class="text-2xl underline underline-offset-4">INVESTIGATOR</p>
      <p class="italic">Wins if identified<br />Murderer, Clue and Mean</p>
    </div>
    <button class="bg-[#db222a] h-auto p-4 grid grid-cols-1 rounded-lg">
      <p class="text-2xl underline underline-offset-4">MURDERER</p>
      <p class="italic">Wins if uncaught</p>
    </button>
    <button
      on:click={toggleOptionalRoles}
      class="{data['isOptionalRoles']
        ? 'bg-[#db222a]'
        : 'bg-neutral'} h-auto p-4 grid grid-cols-1 rounded-lg"
    >
      <p class="text-2xl underline underline-offset-4">ACCOMPLICE</p>
      <p class="italic">
        Knows Murderer, Clue and Mean<br />Wins if Murderer uncaught
      </p>
    </button>
    <button
      on:click={toggleOptionalRoles}
      class="{data['isOptionalRoles']
        ? 'bg-[#023e8a]'
        : 'bg-neutral'} h-auto p-4 grid grid-cols-1 rounded-lg"
    >
      <p class="text-2xl underline underline-offset-4">WITNESS</p>
      <p class="italic">Knows Murderer & Accomplice<br />Wins if not killed</p>
    </button>
  </div>

  <!-- only host can see the Next button -->
  {#if data["isHost"]}
    <BtnNext onClick={next}/>
  {/if}
</div>
