<script>
    import { createEventDispatcher } from "svelte";
    import cajasStore from '../util/cajas-store';
    import CosasSearch from "../components/cosas/CosasSearch.svelte";


const dispatch = createEventDispatcher()
let query = ''

$: isSearching = (query !== '')

</script>

<style>
ul {
    list-style: none;
}

li {
    font-size: 14px;
    position: relative;
    margin: 15px 0;
    border: 1px solid #e2c0a7;
    padding: 3px 50px 3px 10px;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
}

li span {
    position: absolute;
    width: 40px;
    right: 0;
    top: 0;
    height: 100%;
    background: #e2c0a7;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
}

li div {
    font-size: 12px;
    font-weight: 300;
    font-size: 12px;
    font-weight: 300;
    margin: 0 0 0 15px;
}

.sincajas {
    text-align: center;
    font-size: 20px;
    margin: 20px auto;
}

.empezar {
    margin: auto;
    width: 200px;
    height: 35px;
    background: var(--maincolorlight);
    border: none;
    border-radius: 25px;
    font-size: 15px;
    color: var(--black);
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media(min-width: 768px) {
    .empezar {
        cursor: pointer;
    }

    .empezar:hover {
        box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.541);
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        margin: 30px 0 0;
    }

    li {
        width: 30%;
        margin: 20px 20px 20px 0;
    }
}
</style>

{#if $cajasStore.length === 0}
<div class="sincajas">Todavía no hay cajas hechas</div>
<button class='empezar' on:click="{() => dispatch('empezar')}">Haz la primera caja</button>
{:else}
<div class="cosas-wrapper">
    <CosasSearch bind:search={query}/>
    {#if isSearching}
        <ul class='cosas-list'>
            {#each $cajasStore as caja}
                {#each caja.items as item}
                    {#if item.toLowerCase().includes(query.toLowerCase())}
                         <li>{item} <div>{caja.cat}</div> <span>{caja.cajaId}</span></li>
                    {/if}
                {/each}
            {/each}
        </ul>
    {:else}
        <ul class='cosas-list'>
            {#each $cajasStore as caja}
                {#each caja.items as item}
                    <li>{item} <div>{caja.cat}</div> <span>{caja.cajaId}</span></li>
                {/each}
            {/each}
        </ul>
    {/if}
    
</div>
{/if}

