<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let data;

  let seconds: number;
  let timer;

  $: seconds = data["timeRemaining"];

  function startTimer() {
    timer = setInterval(() => {
      seconds -= 1;
      if (seconds < 0) {
        seconds = 0;
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  onMount(startTimer);
  onDestroy(stopTimer);
</script>

<p class="text-center text-xl text-[#fa8832]">Time Remaining: {seconds}s</p>
