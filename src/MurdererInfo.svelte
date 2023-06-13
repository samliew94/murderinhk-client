<script lang="ts">
  export let data;

  import Config from "./Config";
  import clues from "./data/clues";
  import clues_cn from "./data/clues_cn";
  import means from "./data/means";
  import means_cn from "./data/means_cn";

  async function next() {
    // only host can call this method
    if (!data["isHost"]) return;

    const res = await fetch(`${Config.origin}/game/toremovediamonds`, {
      method: "POST",
      // body: JSON.stringify({ username: username }),
      // headers: {
      //   "Content-Type": "application/json",
      // },
      credentials: "include",
    });
  }
</script>

<div
  class="bg-neutral-900 grid grid-cols-1 gap-1 place-items-center text-center border border-black border-2 rounded-xl p-4"
>
  <p class="text-xl text-red-500 underline underline-offset-4">
    Murderer's Clue and Mean:
  </p>
  <div class="grid grid-cols-2 gap-1">
    <div class="bg-blue-500 text-white p-1 rounded-lg">
      <p>{clues[data["clue"]]}</p>
      <p>{clues_cn[data["clue"]]}</p>
    </div>
    <div class="bg-rose-500 text-white p-1 rounded-lg">
      <p>{means[data["mean"]]}</p>
      <p>{means_cn[data["mean"]]}</p>
    </div>
  </div>
</div>
