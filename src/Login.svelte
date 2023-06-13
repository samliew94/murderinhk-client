<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Config from "./Config";
  import MyButton from "./MyButton.svelte";

  const dispatch = createEventDispatcher();

  // let username: string = generateRandomString(); // debug
  let username: string = "";
  let loginError: string;
  let banner: string =
    "https://cf.geekdo-images.com/1COY3oeK9aN2_XNimKaNww__itemrep/img/cAOvicFEw8eQs6D9b2G4E7MTp00=/fit-in/246x300/filters:strip_icc()/pic3033330.jpg";

  // Randomly generates a three-letter string using alphabetic characters
  function generateRandomString(): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let randomString = "";

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomString += alphabet[randomIndex];
    }

    return randomString;
  }

  function onUsernameChange(event) {
    // Remove non-alphabetic characters using a regular expression
    username = event.target.value.replace(/[^A-Za-z]/g, "");

    // max 10 chars
    username = username.slice(0, 10);

    // Convert the input to uppercase
    username = username.toUpperCase();
  }

  async function onLogin() {
    if (!username || username.trim() === "") return;
    // Send POST request to http://localhost/login with the username
    const res = await fetch(`${Config.origin}/user/login`, {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 400) {
      loginError = await res.text();
      return;
    }

    loginError = null;

    dispatch("isAuthenticatedChanged", res.status === 200);
  }
</script>

<div class="grid grid-cols-1 gap-3 place-items-center p-4 text-center">
  {#if loginError}
    <p class="text-red-500">{loginError}</p>
  {/if}
  <img src={banner} alt="Banner" />
  <p class="text-4xl">Murder in Hong Kong</p>
  <p class="text-2xl">(香港凶杀案)</p>

  <div class="">
    <input
      bind:value={username}
      on:input={onUsernameChange}
      class="bg-neutral-700 text-white text-center m-1 py-2 rounded-lg border border-black border-2"
      type="text"
      placeholder="Enter Username"
    />
  </div>
  <div class="flex items-center justify-center">
    <MyButton onClick={onLogin} title="NEXT"/>
  </div>
  <p class="text-center text-gray-500 text-xs">
    &copy;2023 1Meat1Vege0Rice Solutions. All rights reserved.
  </p>
</div>
