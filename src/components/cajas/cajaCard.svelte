<script>
   import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
export let caja

</script>

<style>
  .caja {
    border-radius: 20px;
    border: 1px solid black;
    margin: 15px auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow: hidden;
    background: white;
    position: relative;
  }

  .marker {
      width: 50px;
      height: 100%;
      background: #e2c0a7;
      margin-right: 10px;
      justify-content: center;
        align-items: center;
        display: flex;
  }

  h3 {
    display: flex;
    align-items: center;
    font-weight: 500;
  }

  h3 span {
    font-weight: 100;
    font-size: 14px;
    padding: 0 0 0 10px;
  }


</style>

<div class='caja' on:click="{() => dispatch('showbox', caja)}">
    <div class="marker"> <h2>{caja.cajaId}</h2></div>
   
    <h3>{caja.cat} <span>({caja.items.length} items)</span></h3>
</div>

