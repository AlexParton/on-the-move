<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let opened
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
    font-weight: 300;
    padding: 50px 1em 0;
    position: fixed;
    top: 0;
    left: -100%;
    z-index: 1000;
    background: #0000009c;
    width: 75%;
    height: 100%;
    transition: .3s;
    backdrop-filter: blur(7px);
	}

	nav.opened {
		left: 0
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
	}

	li {
		display: block;
		width: 100%;
		border-bottom: 1px dotted var(--maincolorlight);
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
	}

	li div {
		width: 40px;
    height: 40px;
    padding: 5px;
    background: var(--maincolorlight);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
	}

	li div img {
		width: 25px;
    height: 25px;
	}

	li span {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		font-size: 20px;
		font-weight: 400;
		color: var(--maincolorlight);
	}
	
	@media (min-width:768px) {
		nav, nav.false {
			border: none;
			left: 0;
			background: none;
			z-index: 100000;
			width: 100%;
			height: auto;
			padding: 0 50px;
			backdrop-filter: none;
			transition: none;
		}

		li {
			width: auto;
   			border-bottom: none;
			   margin-right: 20px;
			   height: 90px;
			  
		}

		li div {
			display: none;
		}

		li span {
			cursor: pointer;
			padding: 0 10px 0 0;
		}

		li span:hover {
			border-bottom: 2px solid var(--maincolorlight);
		}
	}
</style>

<nav class={(opened) && 'opened'}>
	<ul>
		<li on:click="{() => dispatch('itemclicked', 'cajas')}"><div><img src="assets/open-box.svg" alt="cajas"></div><span>Cajas</span></li>
		<li on:click="{() => dispatch('itemclicked', 'cosas')}"><div><img src="assets/hang-clothes.svg" alt="cosas"></div><span>Cosas</span></li>
		<li on:click="{() => dispatch('itemclicked', 'admin')}"><div><img src="assets/shopping.svg" alt="admin"></div><span>Admin</span></li>
	</ul>
</nav>
