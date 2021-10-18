<script>
import cajasStore from '../util/cajas-store'

let items = [];
let boxNumber
let boxCat

let inputAnimation = false
let itemToAdd = '';
$: itemToAddUppercase = itemToAdd.toUpperCase();
let crearCaja = true
let showBox = false


const createBoxHandler = () => {
    if (boxCat !== '' && boxNumber !== '') {
        showBox = true;
    }
}

let alreadyItem = false;

let cajaNotFound = false
let alreadyItems = [];
const editBoxHandler = () => {
    let cajaToEdit = false;
    
    if (boxNumber !== '') {
        cajasStore.subscribe(cajas => {
        cajaToEdit = cajas.filter(caja => caja.cajaId === boxNumber)
        alreadyItems = cajaToEdit[0].items
        }
    );
        
        if (cajaToEdit.length > 0) {
            boxCat = ''
            showBox = true;
        } else {
            cajaNotFound = true
        }
    }
}

const cancelHandler = () => {
    showBox = false;
    boxCat = ''
    boxNumber = ''
    alreadyItem  = false
    itemToAdd = ''
}

const addItemHandler = () => {
    inputting = false
    if (alreadyItems.includes(itemToAddUppercase) || items.includes(itemToAddUppercase)) {
        alreadyItem  = true
    } else {
        items.push(itemToAddUppercase)
        inputAnimation = true
        alreadyItem  = false
        setTimeout(() => {
            itemToAdd = ''
            inputAnimation = false
        }, 400)
    }
    
}

const postBox = () => {
        let caja = {
            cajaId: boxNumber,
            cat: boxCat,
            items: items
        }

        fetch('https://on-the-move-3b7b8-default-rtdb.firebaseio.com/boxes.json', {
            method: 'POST',
            body: JSON.stringify(caja),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed!')
            }
            return res.json();
        })
        .then(data => {
            cajasStore.addCaja({...caja, id: data.name})
            cancelHandler()
        })
        .catch(err => console.log(err))
}

const editBox = () => {
    let cajaToEditId;
    let prevItems = [];
    cajasStore.subscribe(cajas => {
        const cajaToEdit = cajas.filter(caja => caja.cajaId === boxNumber)
        cajaToEditId = cajaToEdit[0].id 
        prevItems = cajaToEdit[0].items 
    });


     const newItems = {items: [...prevItems, ...items]}
     fetch(`https://on-the-move-3b7b8-default-rtdb.firebaseio.com/boxes/${cajaToEditId}.json`, {
         method: 'PATCH',
         body:JSON.stringify(newItems),
         headers: {
                'Content-Type': 'application/json'
            }
     })
     .then(res => {
        if (!res.ok) {
                throw new Error('Failed!')
            }
        cajasStore.updateCaja(cajaToEditId, newItems);
       location.reload()
     })
     .catch(err => console.log(err))
    
}

let inputting = false


</script>

<style>
.mode-controller {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto 30px;
        max-width: 260px;
    }

    .mode-controller span {
        font-size: 15px;
        color: #3339;
        font-weight: 400;
    }

    .mode-controller span.selected {
        font-size: 15px;
        color: var(--black);
        font-weight: 600;
    }

    .toggler {
        background: white;
        width: 50px;
        height: 25px;
        border-radius: 25px;
        position: relative;
        border: none;
    }

    .toggler div {
        width: 19px;
        height: 19px;
        background: var(--maincolordark);
        border-radius: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .toggler div.left {
        right: initial;
        left: 1px;
    }

    .toggler div.right {
        right: 1px;
        left: initial;
    }

    .crea-cajas-wrapper {
    padding: 0;
    text-align: center;
}

label {
    font-weight: 500;
}

.input-wrapper {
    margin: 12px 0;
}

input {
    width: 180px;
    height: 35px;
    margin: 5px auto;
    display: block;
    border-radius: 10px;
    border: 1px solid #b7b7b7;
    text-align: center;
    text-align-last: center;
}

input:focus {
    border: 2px solid var(--maincolordark);
    outline: none
}

.crea-cajas-wrapper button {
    width: 250px;
    height: 35px;
    border-radius: 25px;
    border: none;
    background: var(--maincolorlight);
    margin: 20px 0 0;
}

.caja-display {
    position: fixed;
    bottom: 40px;
    z-index: 100;
}

.carton-up {
    position: fixed;
    bottom: 45px;
    z-index: -1;
}

.text-wrapper {
    perspective: 1000px;
    position: absolute;
    bottom: 20%;
    left: 22%;
    width: 110px;
    overflow: hidden;
}

.text {
   
    transform: rotateY(-51deg) rotateZ(6deg);
    font-size: 18px;
    font-weight: 900;
}

.text span {
    font-size: 14px;
    font-weight: 600;
}

.button-controller {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    padding: 20px;
}

.button-controller button {
    border: none;
    border-radius: 25px;
    padding: 3px;
    width: 83px;
    background: #a74444;
    color: white;
    font-weight: 700;
}

.button-controller button:nth-child(2){
    background-color: var(--maincolorlight);
    color: var(--black)
}

.adder {
    text-align: center;
}

.adder input {
    width: 100%;
}

.adder input.input-animation {
    transition: .4s;
    width: 1%;
    transform: translateY(300px);
}

.adder button:disabled {
   border: none
}

.adder button {
    width: 60px;
    height: 60px;
    border: 2px solid var(--maincolordark);
    border-radius: 100%;
    margin: 8px 0 0 0;
    font-size: 18px;
}

.cajanotfound {
    margin: 20px 0 0;
    font-size: 20px;
}

.box-super {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
   
}

.box-super.hide {
    display: none;
}


@media(min-width: 768px) {
    .box-super.hide {
        display: flex;
    }

    .crea-cajas-wrapper button, button, input {
        cursor: pointer;
    }

    .crea-cajas-wrapper button:hover, .button-controller button:hover {
        box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.541);
    }

    .adder input {
        margin: 30px auto 15px;
        max-width: 300px;
    }

    .box-super {
        position: relative;
        margin: 60px 0 0;
    }

    .carton-up, .caja-display {
        position: absolute;
    bottom: initial;
    top: 0;
    }

    .button-controller button {
        width: 120px;
        height: 50px;
        font-size: 18px;
    }
}

</style>

<div class="admin-wrapper">
    {#if !showBox}
        <div class="mode-controller">
            <span class={(crearCaja) && 'selected'}>Crear Caja</span>
            <button on:click="{() => crearCaja = !crearCaja}" class="toggler">
                <div class={(crearCaja) ? 'left' : 'right'}></div>
            </button>
            <span class={(!crearCaja) && 'selected'}>Añadir Cosa</span>
        </div>
        <div class="crea-cajas-wrapper">
            <div class="input-wrapper">
                <label for="boxNumberInput">Número de caja</label>
                <input type="number" name="boxNumberInput"  bind:value="{boxNumber}">
            </div>
            {#if crearCaja}
                <div class="input-wrapper">
                    <label for="boxCatInput">Categoría</label>
                    <input type="text" name="boxCatInput"  bind:value="{boxCat}">
                </div>
            {/if}
            <button on:click="{(crearCaja) ? createBoxHandler : editBoxHandler}">{(crearCaja) ? 'CREAR CAJA' : 'ABRIR CAJA'}</button>
            {#if cajaNotFound}
                <div class="cajanotfound">No existe esa caja</div>
            {/if}
          
        </div>
    {:else}
    <div class='adder'>
        <div class="input-wrapper">
            <label for="addItem">¿Qué quieres meter?</label>
            <input 
              on:focus="{() => inputting = true}"
              class={(inputAnimation) && 'input-animation'} 
              type="text" name="addItem"  
              bind:value="{itemToAdd}">
            <button disabled={itemToAdd === ''} on:click="{addItemHandler}">OK</button>
            {#if alreadyItem}
                <h2>Eso ya está en la caja</h2>
            {/if}
        </div>

    </div>
    <div class="button-controller">
        <button on:click="{cancelHandler}">Cancelar</button>
        <button on:click="{(crearCaja) ? postBox : editBox}">Listo!</button>
    </div>
    <div class={(inputting) ? 'box-super hide' : 'box-super'}>
        <img class="carton-up" src="assets/cajacarton-back.png" alt="caja carton">
        <div class="caja-display">
            
            <img src="assets/cajacarton-front.png" alt="caja carton">
            <div class="text-wrapper">
                <div class="text">
                    <div>{boxNumber}</div>
                    {#if crearCaja}
                    <span>{(boxCat.length > 14) ? boxCat.substr(0, 14)+'...' : boxCat}</span>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    
        
    {/if}
    
</div>