<script lang="ts">
  import clues from "./data/clues";
  import clues_cn from "./data/clues_cn";
  import means from "./data/means";
  import means_cn from "./data/means_cn";

  export let data: any;
</script>

<div class="grid grid-cols-1 gap-1 place-items-center text-center pt-8">
  <div class="">
    <p class="text-2xl text-orange-500">Murder Suspects: &nbsp;</p>

    <div class="flex overflow-x-auto">
      {#each data["suspects"] as suspect, i}
        <div
          class="flex-none bg-neutral-700 border border-black border-2 my-2 rounded-lg p-2 m-1"
        >
          <div class="grid grid-cols-1">
            <p class="text-orange-500 underline underline-offset-4 text-2xl">
              {suspect["username"]}
            </p>
            <div class="grid grid-cols-2">
              {#each suspect["clues"] as clue, j}
                <div
                  class="inline-block text-white border-blue-800 bg-blue-600 p-2 m-1 rounded-lg"
                >
                  {clues[clue]}
                  {clues_cn[clue]}
                </div>
              {/each}
              {#each suspect["means"] as mean, k}
                <div
                  class="inline-block text-white border-rose-800 bg-rose-600 p-1 m-1 rounded-lg"
                >
                  {means[mean]}
                  {means_cn[mean]}
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
