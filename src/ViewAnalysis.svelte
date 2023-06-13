<script lang="ts">
  export let data;

  import Config from "./Config";
  import analysis from "./data/analysis";
  import analysis_cn from "./data/analysis_cn";
  import CountdownTimer from "./CountdownTimer.svelte";
  import MurderSuspects from "./MurderSuspects.svelte";
  import MurdererInfo from "./MurdererInfo.svelte";
  import Round from "./Round.svelte";
  import MyRole from "./MyRole.svelte";
  import MyButton from "./MyButton.svelte";

  let selectedClueId: number = -1;
  let selectedMeanId: number = -1;
  let isNextVisible: boolean;

  $: {
    if (selectedClueId >= 0 && selectedMeanId >= 0) {
      isNextVisible = true;
    } else {
      isNextVisible = false;
    }
  }

  async function next() {
    const res = await fetch(`${Config.origin}/game/onnextanalysis`, {
      method: "POST",
      // body: JSON.stringify({ username: username }),
      // headers: {
      //   "Content-Type": "application/json",
      // },
      credentials: "include",
    });
  }
</script>

<MyRole {data} />
<CountdownTimer {data} />
<Round {data} />
{#if data["analysis"].length > 0}
  <div
    class="grid grid-cols-2 gap-1 flex justify-center items-center text-center p-1"
  >
    {#each data["analysis"] as e, i}
      <div class="bg-purple-900 p-2 rounded-xl text-white h-full">
        <p class="">
          {analysis[e["scenePos"]]["title"]}<br />
          {analysis_cn[e["scenePos"]]["title"]}:
        </p>
        <p class="underline underline-offset-4 font-bold">
          {analysis[e["scenePos"]]["options"][e["sceneOption"]]}
          {analysis_cn[e["scenePos"]]["options"][e["sceneOption"]]}
        </p>
      </div>
    {/each}
  </div>
{:else}
  <p class="class text-center mt-4 italic text-xl">Waiting for Forensic's clue...</p>
{/if}
<MurderSuspects {data} />
{#if data["roleCode"] === "FORENSIC"}
  <div class="flex justify-center items-center pt-4">
    <MyButton
      onClick={next}
      title={data["round"] + 1 === 3 ? "END GAME" : "NEXT"}
    />
  </div>
{/if}
