<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import Lobby from "./Lobby.svelte";
  import Settings from "./Settings.svelte";
  import WaitingFor from "./WaitingFor.svelte";
  import Config from "./Config";
  import ChooseForensic from "./ChooseForensic.svelte";
  import ChooseClueAndMean from "./ChooseClueAndMean.svelte";
  import ChooseSceneTile from "./ChooseSceneTile.svelte";
  import ViewAnalysis from "./ViewAnalysis.svelte";
  import RemoveAnalysis from "./RemoveAnalysis.svelte";
  import Gg from "./Gg.svelte";
  import MyButton from "./MyButton.svelte";
  import BtnRestart from "./BtnRestart.svelte";

  let socket: WebSocket;
  let screen: String;
  let data: any; //json

  const dispatch = createEventDispatcher();

  async function websocketConnect() {
    socket = new WebSocket(`ws://${Config.hostName}/websocket`);

    socket.onopen = () => {
      console.log("websocket connected...");
    };

    socket.onclose = () => {
      dispatch("isAuthenticatedChanged", false);
      console.log("websocket closed xxx");
    };

    socket.onmessage = (event) => {
      console.log(`received ${JSON.stringify(JSON.parse(event.data))}`);
      data = JSON.parse(event.data);
      screen = data["screen"];
    };
  }

  async function restartGame() {
    const res = await fetch(`${Config.origin}/game/tolobby`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  onMount(websocketConnect);
</script>

<div>
  {#if data && data["isHost"]}
    {#if !(screen === "lobby" || screen === "GG")}
      <div class="flex justify-center items-center pb-2">
        <BtnRestart/>
      </div>
    {/if}
  {/if}

  {#if screen === "lobby"}
    <Lobby bind:data />
  {:else if screen === "settings"}
    <Settings bind:data />
  {:else if screen === "selectforensic"}
    <ChooseForensic bind:data />
  {:else if screen === "selectcluemean"}
    <ChooseClueAndMean bind:data />
  {:else if screen === "viewanalysis"}
    <ViewAnalysis bind:data />
  {:else if screen === "selectanalysis"}
    <ChooseSceneTile bind:data />
  {:else if screen === "removeanalysis"}
    <RemoveAnalysis bind:data />
  {:else if screen === "gg"}
    <Gg bind:data />
  {:else if screen === "waitingfor"}
    <WaitingFor bind:data />
  {/if}
</div>
