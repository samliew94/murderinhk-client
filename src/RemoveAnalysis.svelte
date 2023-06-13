<script lang="ts">
  import Icon from "@iconify/svelte";

  export let data;

  import Config from "./Config";
  import analysis from "./data/analysis";
  import clues from "./data/clues";
  import means from "./data/means";
  import CountdownTimer from "./CountdownTimer.svelte";
  import MurdererInfo from "./MurdererInfo.svelte";
  import Round from "./Round.svelte";
  import analysis_cn from "./data/analysis_cn";
  import BtnNext from "./BtnNext.svelte";

  let selectedAnalysisId: number = -1;

  function onSelectedAnalysis(value: number) {
    if (value == 0 || value == 1) {
      return;
    }

    selectedAnalysisId = value;
  }

  async function next() {
    const res = await fetch(`${Config.origin}/game/onremovedanalysis`, {
      method: "POST",
      body: JSON.stringify({ selectedAnalysisId: selectedAnalysisId }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    selectedAnalysisId = -1;
  }
</script>

<CountdownTimer {data} />
<Round {data} />
<p class="font-bold text-center text-2xl text-green-500">
  Remove <span class="underline underline-offset-4">ONE</span> Analysis
</p>
<MurdererInfo {data} />
<div
  class="bg-neutral-900 border border-black border-2 rounded-xl grid grid-cols-2 gap-1 flex justify-center items-center text-center p-2"
>
  {#each data["analysis"] as e, i}
    <button
      on:click={() => onSelectedAnalysis(i)}
      class=" {i === 0 || i === 1
        ? 'bg-neutral-800'
        : selectedAnalysisId === i
        ? 'bg-blue-500'
        : 'bg-purple-800'} p-2 text-white h-full rounded-xl"
    >
      <!-- <div>
        <p class="text-sm">{analysis[e["scenePos"]]["title"]}:</p>
        <p class=" text-lg underline underline-offset-4">
          {analysis[e["scenePos"]]["options"][e["sceneOption"]]}
        </p>
      </div> -->
      <div class="text-sm">
        <p class="">
          {analysis[e["scenePos"]]["title"]}<br />
          {analysis_cn[e["scenePos"]]["title"]}:
        </p>
        <p class="underline underline-offset-4 font-bold">
          {analysis[e["scenePos"]]["options"][e["sceneOption"]]}
          {analysis_cn[e["scenePos"]]["options"][e["sceneOption"]]}
        </p>
      </div>
    </button>
  {/each}
</div>
{#if selectedAnalysisId != -1}
  <!-- <div class="flex justify-center items-center pt-4">
    <button on:click={next} class="btn btn-secondary">NEXT</button>
  </div> -->
  <div class="flex justify-center mt-2">
    <BtnNext onClick={next} />
  </div>
{/if}
