<script lang="ts">
  import { onMount } from "svelte";
  import Config from "./Config";
  import Game from "./Game.svelte";
  import Login from "./Login.svelte";
  import WaitingFor from "./WaitingFor.svelte";
  import Lobby from "./Lobby.svelte";
  import Settings from "./Settings.svelte";
  import MyBorder from "./MyBorder.svelte";
  import ChooseForensic from "./ChooseForensic.svelte";
  import ChooseClueAndMean from "./ChooseClueAndMean.svelte";
  import ChooseSceneTile from "./ChooseSceneTile.svelte";
  import DaisyTest from "./DaisyTest.svelte";
  import RemoveAnalysis from "./RemoveAnalysis.svelte";
  import Gg from "./Gg.svelte";
  import ViewAnalysis from "./ViewAnalysis.svelte";
  import { insert_hydration } from "svelte/internal";

  let isAuthenticated: boolean = false;
  let isConnected: boolean = false;

  async function getPrincipal() {
    const uri = `${Config.origin}/user/principal`;
    console.log(uri);

    const res = await fetch(`${Config.origin}/user/principal`, {
      credentials: "include",
    });

    if (res.status === 200) {
      isAuthenticated = true;
    } else if (res.status === 401) {
      isAuthenticated = false;
    }
  }

  onMount(getPrincipal);

  function onIsAuthenticatedChanged(e): void {
    console.log(`isAuthenticated = ${e.detail}`);

    isAuthenticated = e.detail;
  }

  let debugMsg: string;
  function onDebugMsg(e): void {
    debugMsg = e.detail;
  }
</script>

<main
  class="bg-neutral-800 h-full min-h-screen flex justify-center items-center text-white grid grid-cols-1 p-4"
>
  <!-- <MyBorder> -->
  {#if isAuthenticated}
    <Game on:isAuthenticatedChanged={onIsAuthenticatedChanged} />
  {:else}
    <Login
      on:isAuthenticatedChanged={onIsAuthenticatedChanged}
      on:loginMsg={onDebugMsg}
    />
  {/if}

  <!-- debug mode -->
  <!-- <Login /> -->
  <!-- <Lobby
      data={{
        isHost: true,
        players: [
          { username: "JOHNCAPABERA", isHost: true, hostUsername: "JOHNCAPABERA" },
          { username: "BAR", isHost: false, hostUsername: "FOO" },
          { username: "BAZ", isHost: false, hostUsername: "FOO" },
          { username: "QUZ", isHost: false, hostUsername: "FOO" },
        ],
      }}
    /> -->
  <!-- <Settings
      data={{
        isHost: true,
        totalClueMeans:3,
      }}
    /> -->
  <!-- <ChooseForensic
      data={{
        isHost: true,
        players: ["FOO", "BAR", "BAZ", "QUX","AAAAAAAAAA"],
        forensic:"FOO"
      }}
    /> -->
  <!-- <ChooseClueAndMean
      data={{
        isHost:true,
        clues:[0,1,2,3,4],
        means:[0,1,2,3,4],
      }}
    /> -->
  <!-- <ViewAnalysis
    data={{
      isHost:true,
      roleCode:"FORENSIC",
      murderer:"FOO",
      clue:0,
      mean:0,
      timeRemaining: 300,
      round: 0,
      analysis: [
        { scenePos: 0, sceneOption: 0 },
        { scenePos: 1, sceneOption: 1 },
        { scenePos: 5, sceneOption: 2 },
        { scenePos: 6, sceneOption: 3 },
        { scenePos: 7, sceneOption: 4 },
        { scenePos: 8, sceneOption: 5 },
      ],
      suspects: [
        { username: "BAR", clues: [0, 1, 2, 3, 4], means: [0, 1, 2, 3, 4] },
        { username: "BAZ", clues: [5, 6, 7, 8, 9], means: [5, 6, 7, 8, 9] },
        {
          username: "QUZ",
          clues: [10, 11, 12, 13, 14],
          means: [10, 11, 12, 13, 14],
        },
        {
          username: "QUX",
          clues: [15, 16, 17, 18, 19],
          means: [15, 16, 17, 18, 19],
        },
        {
          username: "ROX",
          clues: [20, 21, 22, 23, 24],
          means: [20, 21, 22, 23, 24],
        },
        {
          username: "ROZ",
          clues: [25, 26, 27, 28, 29],
          means: [25, 26, 27, 28, 29],
        },
      ],
    }}
  /> -->
  <!-- <ChooseSceneTile
      data={{
        isHost: true,
        timeRemaining:300,
        round:0,
        murderer:'FOO',
        clue:1,
        mean:1,
        analysis:{
          scenePos:0
        }
      }}
    /> -->
  <!-- <RemoveAnalysis data={{
      timeRemaining:300,
      round:0,
      murderer:"FOO",
      clue:0,
      mean:0,
      analysis: [
        { scenePos: 0, sceneOption: 5 },
        { scenePos: 1, sceneOption: 5 },
        { scenePos: 9, sceneOption: 2 },
        { scenePos: 10, sceneOption: 5 },
        { scenePos: 11, sceneOption: 5 },
        { scenePos: 12, sceneOption: 5 },
      ],
    }}/> -->
  <!-- <Gg
    data={{
      murderer: "FOO",
      clue: 0,
      mean: 0,
      accomplice:"BAR",
      witness:"BAZ"
    }}
  /> -->

  <!-- </MyBorder> -->
</main>
