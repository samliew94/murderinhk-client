<script lang="ts">
  import MurdererIdentity from './MurdererIdentity.svelte';

  import MurdererInfo from "./MurdererInfo.svelte";

  export let data;

  import Config from "./Config";
  import MurderSuspects from "./MurderSuspects.svelte";
  import OptionalRolesInfo from "./OptionalRolesInfo.svelte";

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

<div class="grid grid-cols-1 gap-0.5">
  <MurdererIdentity {data}/>
  <MurdererInfo {data} />
  <OptionalRolesInfo {data} />
</div>
