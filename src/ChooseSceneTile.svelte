<script lang="ts">
  import Round from './Round.svelte';

  import Icon from "@iconify/svelte";

  export let data;

  import Config from "./Config";
  import analysis from "./data/analysis";
  import clues from "./data/clues";
  import clues_cn from "./data/clues_cn";
  import means from "./data/means";
  import means_cn from "./data/means_cn";
  import { onMount, onDestroy } from "svelte";
  import CountdownTimer from "./CountdownTimer.svelte";
  import analysis_cn from "./data/analysis_cn";
  import MurdererInfo from "./MurdererInfo.svelte";
  import MyButton from './MyButton.svelte';
  import BtnNext from './BtnNext.svelte';
  import MurdererIdentity from './MurdererIdentity.svelte';

  let selectedAnalysisId: number = -1;

  function onSelectedAnalysis(value: number) {
    selectedAnalysisId = value;
  }

  async function next() {
    // only host can call this method
    const res = await fetch(`${Config.origin}/game/onselectedanalysis`, {
      method: "POST",
      body: JSON.stringify({ selectedAnalysisId: selectedAnalysisId }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    selectedAnalysisId = -1; //reset
  }
</script>

<CountdownTimer {data} />
<Round {data}/>
<div class="grid grid-cols-1 place-items-center p-2 text-center">
  <MurdererIdentity {data}/>
  <MurdererInfo {data} />
  <p class="text-green-500 text-2xl mt-4 font-bold underline underline-offset-4 ">Select new Hint:</p>
  <div
    class=" bg-neutral-900 border border-black p-2 rounded-xl border-2 m-2 p-4"
  >
    <p class="text-2xl underline underline-offset-4">
      {analysis[data["analysis"]["scenePos"]]["title"]}
    </p>
    <p class="text-xl underline underline-offset-4 mb-2">
      ({analysis_cn[data["analysis"]["scenePos"]]["title"]}):
    </p>
    <div class="grid grid-cols-2 gap-1">
      {#each { length: analysis[data["analysis"]["scenePos"]]["options"].length } as _, i}
        <button
          on:click={() => onSelectedAnalysis(i)}
          class="px-4 py-1 border border-black rounded-xl text-white {selectedAnalysisId === i
            ? 'bg-purple-800 '
            : 'bg-neutral'}"
        >
          <div class="grid grid-cols-1 gap-0.25">
            <p>{analysis[data["analysis"]["scenePos"]]["options"][i]}</p>
            <p>{analysis_cn[data["analysis"]["scenePos"]]["options"][i]}</p>
          </div>
        </button>
      {/each}
    </div>
  </div>
  {#if selectedAnalysisId > -1}
    <BtnNext onClick={next}/>
  {/if}
</div>
