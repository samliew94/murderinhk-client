<script lang="ts">
  import Icon from "@iconify/svelte";

  export let data;

  import Config from "./Config";
  import MyBorder from "./MyBorder.svelte";
  import MyButton from "./MyButton.svelte";

  import clues from "./data/clues";
  import clues_cn from "./data/clues_cn";
  import means from "./data/means";
  import means_cn from "./data/means_cn";
  import BtnNext from "./BtnNext.svelte";

  let selectedClue:number = -1;
  let selectedMean:number = -1;
  let isNextVisible: boolean;

  $: {
    isNextVisible = selectedClue != -1 && selectedMean != -1
  }

  function onSelectedClue(value: number) {
    // onSelectClueOrMean(value, -1);
    selectedClue = value;
  }
  function onSelectedMean(value: number) {
    // onSelectClueOrMean(-1, value);
    selectedMean = value;
  }

  // async function onSelectClueOrMean(clue: number = -1, mean: number = -1) {
  //   const res = await fetch(`${Config.origin}/game/onselectedclueormean`, {
  //     method: "POST",
  //     body: JSON.stringify({ clue: clue, mean: mean }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   });
  // }

  async function next() {
    // only host can call this method
    const res = await fetch(`${Config.origin}/game/onselectedclueandmean`, {
      method: "POST",
      body: JSON.stringify({ clue : selectedClue, mean : selectedMean }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
</script>

<div class="grid grid-cols-1 gap-4 place-items-center text-center">
  <div>
    <p class="text-3xl font-bold text-blue-500 underline underline-offset-4 ">Select one Clue</p>
    {#each data["clues"] as clue, i}
      <button
        on:click={() => onSelectedClue(clue)}
        class="text-base px-5 py-2 rounded-lg m-1 border border-black text-white {selectedClue === clue
          ? 'bg-blue-500'
          : 'bg-neutral-900'}"
      >
        <div class='grid grid-col-1 gap-1'>
          <p>{clues[clue]}</p>
          <p>{clues_cn[clue]}</p>
        </div>
      </button>
    {/each}
  </div>

  <div>
    <p class="text-3xl font-bold text-rose-500 underline  underline-offset-4 ">Select one Mean</p>
    {#each data["means"] as mean, i}
      <button
        on:click={() => onSelectedMean(mean)}
        class="text-base px-5 py-2 rounded-lg m-1 border border-black text-white {selectedMean === mean
          ? 'bg-rose-500'
          : 'bg-neutral-900'}"
      >
        <div class='grid grid-col-1 gap-1'>
          <p>{means[mean]}</p>
          <p>{means_cn[mean]}</p>
        </div>
      </button>
    {/each}
  </div>

  <div>
    {#if isNextVisible}
      <BtnNext onClick={next}/>
    {/if}
  </div>
</div>
