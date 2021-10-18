<script>
	import { onMount } from "svelte";
	import cajasStore from './util/cajas-store'
	import IndexCard from './components/index/IndexCard.svelte'
	import OpenNav from "./components/OpenNav.svelte";
	import Header from "./components/Header.svelte";
	import Nav from "./components/Nav.svelte";
	import Cajas from "./pages/cajas.svelte";
	import Cosas from "./pages/cosas.svelte";
	import Admin from "./pages/admin.svelte";
	import IndexHeader from "./components/index/IndexHeader.svelte";

let isLoggedIn = false
onMount(() => {
	
	const extractedCode = localStorage.getItem('codigoMudanza');
	if (extractedCode) {
		isLoggedIn = true
	}

    fetch('https://on-the-move-3b7b8-default-rtdb.firebaseio.com/boxes.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed!')
            }
            return res.json()
        })
        .then(data => {
            let loadedCajas = []
            for (const key in data) {
                loadedCajas.push({
                    ...data[key],
                    id: key
                })
            }
            cajasStore.setCajas(loadedCajas)
        })
        .catch(err => console.log(err))
})

let showNav = false

let page = 'index'

const navigate = (event) => {
	const toPage = event.detail;
	page = toPage
	showNav = false
}


let codigoInput = '';
$: codigoMudanza = codigoInput.toLowerCase()
let noMoveFound = false

const authHandler = () => {
	if (codigoMudanza === 'lugano') {
		isLoggedIn = true
		localStorage.setItem('codigoMudanza', codigoMudanza);
	} else {
		noMoveFound = true
	}
}

const deleteBoxHandler = (event) => {
	const idToDelete = event.detail;
	console.log(idToDelete)

	fetch(`https://on-the-move-3b7b8-default-rtdb.firebaseio.com/boxes/${idToDelete}.json`, {
         method: 'DELETE',
     })
     .then(res => {
        if (!res.ok) {
                throw new Error('Failed!')
            }

     location.reload()
     })
     .catch(err => console.log(err))
}

const deleteItemHandler = (event) => {
	const id = event.detail[0]
	const itemToDelete = event.detail[1]
    let prevItems = [];
	let newItems = [];

    cajasStore.subscribe(cajas => {
        const cajaToEdit = cajas.filter(caja => caja.id === id)
		prevItems = cajaToEdit[0].items
		newItems = prevItems.filter((item) => item !== itemToDelete)
    });
	if (newItems.length === 0) {
		fetch(`https://on-the-move-3b7b8-default-rtdb.firebaseio.com/boxes/${id}.json`, {
         method: 'DELETE',
     })
     .then(res => {
        if (!res.ok) {
                throw new Error('Failed!')
            }
	 location.reload()
     })
     .catch(err => console.log(err))
	} else {
		fetch(`https://on-the-move-3b7b8-default-rtdb.firebaseio.com/boxes/${id}.json`, {
         method: 'PATCH',
         body:JSON.stringify({items: newItems}),
         headers: {
                'Content-Type': 'application/json'
            }
     })
     .then(res => {
        if (!res.ok) {
                throw new Error('Failed!')
            }
        cajasStore.updateCaja(id, newItems);
     })
     .catch(err => console.log(err))
	}
	
}

</script>

<style>
	.index-cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin: 0;
	}

	main {
		position: relative;
		max-width: 56em;
		padding: 1em 2em;
		margin: 0 auto;
		box-sizing: border-box;
		margin-top: 125px;
	}

	input {
		height: 35px;
    border: none;
    border-radius: 10px;
    margin: 20px auto;
    width: 200px;
	text-align: center;
	text-align-last: center;
	display: block;
	}

	button {
		margin: 6px 20%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 35px;
		width: 120px;
		border: none;
		background: var(--maincolorlight);
		border-radius: 10px;
		font-size: 14px;
		color: var(--black);
		font-weight: 600;
	}

	h3 {
		margin: 20px 0;
	}

	.codigo-wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.codigo-wrapper h2 {
		text-align: center;
		margin: 20px 0;
		width: 100%;
	}

	@media (min-width: 768px) {
		input {
			margin: 0 20px 0 40px;
		}

		button {
			margin: 0;
		}

		main {
			max-width: 65em;
			margin-top: 120px;
		}
		.index-cards{
			margin: 50px 0 0;
		}
	}
</style>

<svelte:head>
	<title>ON THE MOVE</title>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Shrikhand&display=swap');
	</style>
</svelte:head>

{#if !isLoggedIn}
<Header />
	<main>
		<div class="codigo-wrapper">
			<h2>Código de Mudanza</h2>
			<input type="text" bind:value="{codigoInput}">
			<button on:click="{authHandler}">Confirmar</button>
			{#if noMoveFound}
				<h3>Mudanza not found</h3>
			{/if}
		</div>
	</main>
{:else}
	<main>
		{#if page === 'index'}
			<div class="index-main">
				<IndexHeader />
				<div class="index-cards">
					<IndexCard imgSrc='assets/inventory.jpg' title='CAJAS' on:click={() => page = 'cajas'}/>
					<IndexCard imgSrc='assets/cosas-draw.jpg' title='COSAS' on:click={() => page = 'cosas'}/>
					<IndexCard imgSrc='assets/cajas-draw.jpg' title='ADMIN' on:click={() => page = 'admin'}/>
				</div>
			</div>
			

		{:else}
			<Header />
			<OpenNav {showNav} on:menuclick={() => showNav = !showNav}/>
			<Nav opened={showNav} on:itemclicked={navigate}/>
			{#if page === 'cajas'}
				<Cajas on:empezar={() => page = 'admin'} on:delete={deleteBoxHandler} on:deleteitem={deleteItemHandler}/>
			{/if}
		
			{#if page === 'cosas'}
				<Cosas on:empezar={() => page = 'admin'}/>
			{/if}
		
			{#if page === 'admin'}
				<Admin />
			{/if}

		{/if}
	</main>
{/if}