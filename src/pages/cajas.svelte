<script>
import cajasStore from '../util/cajas-store';
import CajaCard from "../components/cajas/cajaCard.svelte";
import CajaModal from "../components/cajas/CajaModal.svelte";
import { scale } from 'svelte/transition'
import {createEventDispatcher} from 'svelte'

const dispatch = createEventDispatcher()

let showModal = false;
let modalBoxNumber
let modalBoxCat
let id;

const verCaja = (event) => {
    const caja = event.detail
    modalBoxNumber = caja.cajaId
    modalBoxCat = caja.cat
    showModal = true
    id = caja.id
}

</script>

<style>
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

    .boxes-wrapper {
        display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    }

    .boxes-wrapper .cajas {
        width: 30%;
    margin: 20px 20px 20px 0;
    cursor: pointer;
    }

    .boxes-wrapper .sincajas {
        width: 100%;
        margin: 20px 0;
    }

    
}
</style>
{#if showModal}
    <CajaModal on:deleteitem on:delete on:closer={() => showModal = false} {modalBoxNumber} {modalBoxCat} {id}/>
{:else}
<div class='boxes-wrapper'>
    {#if $cajasStore.length === 0}
        <div class="sincajas">Todavía no hay cajas hechas</div>
        <button class='empezar' on:click="{() => dispatch('empezar')}">Haz la primera caja</button>
    {/if}
    {#each $cajasStore as caja (caja)}
        <div class="cajas" in:scale>
            <CajaCard on:showbox={verCaja} {caja} />
        </div> 
    {/each}
</div>
{/if}