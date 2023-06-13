<script lang="ts">
  export let bgColor:string = "950"
  export let bdColor:string = "600"
  export let textSize:string = "lg"
  export let otherSettings: string = ""
</script>

<main
  class="{otherSettings} bg-neutral-200 border border-neutral-900 rounded-xl m-2 p-2 text-{textSize}"
>
  <slot />
</main>
