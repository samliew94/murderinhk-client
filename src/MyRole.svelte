<script lang="ts">
  import AccompliceInfo from "./AccompliceInfo.svelte";
  import MainModal from "./MainModal.svelte";
  import MurdererIdentity from "./MurdererIdentity.svelte";
  import MurdererInfo from "./MurdererInfo.svelte";
  import MyButton from "./MyButton.svelte";
  import WitnessInfo from "./WitnessInfo.svelte";

  export let data: any;
  let roleCode: string;
  let showRole: boolean;

  $: roleCode = data["roleCode"];
</script>

<MainModal bind:show={showRole}>
  <div class="">
    {#if roleCode === "FORENSIC"}
      <p
        class="text-center underline underline-offset-4 text-blue-500 text-3xl mb-1"
      >
        FORENSIC SCIENTIST
      </p>
      <MurdererIdentity {data}/>
      <MurdererInfo {data}/>
    {:else if roleCode === "INVESTIGATOR"}
      <p
        class="text-center underline underline-offset-4 text-blue-500 text-3xl mb-1"
      >
        INVESTIGATOR
      </p>      
    {:else if roleCode === "ACCOMPLICE"}
      <p class="text-center underline underline-offset-4 text-red-500 text-3xl  mb-1">
        ACCOMPLICE
      </p>
      <AccompliceInfo {data} />
    {:else if roleCode === "MURDERER"}
      <p class="text-center underline underline-offset-4 text-red-500 text-3xl  mb-1">
        MURDERER
      </p>
      <MurdererInfo {data} />
    {:else if roleCode === "WITNESS"}
      <p
        class="text-center underline underline-offset-4 text-blue-500 text-3xl  mb-1"
      >
        WITNESS
      </p>
      <WitnessInfo {data} />
    {/if}
  </div>
</MainModal>

{#if roleCode}
  <div class='flex justify-center mb-4'>
    <MyButton onClick={() => (showRole = true)} title="Click to see your hidden role" />
  </div>
{/if}
