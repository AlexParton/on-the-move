<script>
  import { createEventDispatcher } from 'svelte'
  import { scale, fade } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import cajasStore from '../../util/cajas-store'

const dispatch = createEventDispatcher()
export let modalBoxNumber
export let modalBoxCat
export let id

let showConfirmation = false
</script>

<style>
.modal {
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
}

.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

h2.number {
    width: 40px;
    height: 40px;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    margin: 0;
    background: var(--carton);
}

h3 {
    text-transform: uppercase;
    font-size: 22px;
    width: calc(100% - 180px);
}

ul {
    list-style: circle;
    margin: 20px 0;
    padding: 1em 0;
    border-top: 1px dashed var(--black);
}

li {
    padding: 12px 0;
    font-size: 18px;
    color: var(--black);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    text-transform: capitalize;
}

button {
    background: none;
    margin: 0 0 20px;
    color: var(--black);
    border: none;
}

.trash {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    color: #a74444;
    border: 1px solid #a74444;
    padding: 0 10px;
    border-radius: 10px;
    font-size: 10px;
    width: 120px;
    cursor: pointer;
}

.confirmation{
    background: #151515;
    padding: 30px;
    text-align: center;
    border-radius: 10px;
    margin: 0 0 20px;
}

.confirmation h2 {
    color: #a74444;
    font-size: 18px;
}

.confirmation h2 span {
    font-size: 30px;
    display: block;
}

.but-wrapp {
    margin: 25px auto 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.but-wrapp button {
    height: 30px;
    width: 40%;
    background: #a74444;
    border-radius: 20px;
    color: var(--grey);
}

.but-wrapp button:nth-child(2) {
   background: var(--maincolorlight);
   color: var(--black)
}
      
button.borrar-item {
    margin: 0;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #a54a4a;
    border-radius: 100%;
    color: #a54a4a;
}

@media(min-width:768px) {
    button {
        cursor: pointer;
        margin: 20px 0 40px;
    }

    button:hover {
        font-weight: 900;
    }

    .trash:hover {
        background:#a74444;
        color: white;
        font-weight: 900;
      }

      .confirmation {
        max-width: 300px;
    margin: 0 auto;
      }
}
</style>

<div class="modal">
    {#if showConfirmation}
        <div in:scale class="confirmation">
            <h2><span>¡Ojo!</span> Vas a borrar esta caja</h2>
            <div class="but-wrapp">
                <button on:click="{() => showConfirmation = false}">Cancelar</button>
                <button on:click="{() => dispatch('delete', id)}">Confirmar</button>
            </div> 
        </div>
        
    {/if}
    <button on:click="{() => (dispatch('closer'))}">Volver a Cajas</button>
    <div class="title">
        <h2 class='number'>{modalBoxNumber}</h2>
        <h3>{modalBoxCat}</h3>
        <div class="trash" on:click="{() => showConfirmation = true}">ELIMINAR CAJA</div>
    </div>
   
    <ul>
        {#each $cajasStore as caja (caja.id)}
            {#if caja.id === id}
                {#each caja.items as item (item)}
                    <li animate:flip out:fade>{item.toLowerCase()} 
                        <button 
                        on:click={(caja.items.length === 1) ? () => showConfirmation = true : () => dispatch('deleteitem', [id, item])} 
                        class="borrar-item"
                        >X
                        </button>
                    </li>
                {/each}
            {/if}
        {/each}
    </ul>
</div>