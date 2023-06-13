<script lang="ts">
  import Config from "./Config";
  import MyButton from "./MyButton.svelte";

  async function restart() {
    // only host can call this method
    const res = await fetch(`${Config.origin}/game/tolobby`, {
      method: "POST",
      // body: JSON.stringify({ clue : selectedClue, mean : selectedMean }),
      // headers: {
      //   "Content-Type": "application/json",
      // },
      credentials: "include",
    });
  }
</script>

<MyButton onClick={restart} title="RESTART GAME" />
