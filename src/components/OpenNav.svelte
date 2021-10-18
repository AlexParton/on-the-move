<script>
import { createEventDispatcher } from 'svelte'

export let showNav;

const dispatch = createEventDispatcher()


const navHandler = () => {
    dispatch('menuclick');
    showNav = !showNav
}
</script>

<style>
.topbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    height: 30px;
    padding: 5px 10px;
}

.menu-icon {
    width: 25px;
    height: 25px;
}

.menu-icon div {
    height: 2px;
    width: 100%;
    background: var(--maincolorlight);
    margin: 5px 0;
    border-radius: 70px;
    transition: 500ms cubic-bezier(.75,-0.5,0,1.75);

}

.menu-icon.closer div:nth-child(1) {
    transform: rotate(-45deg) translate(-2px, 3px);
} 

.menu-icon.closer div:nth-child(2) {
    transform: translateX(-50px);
} 

.menu-icon.closer div:nth-child(3) {
transform: rotate(45deg) translate(-7px, -7px);
} 

@media(min-width: 768px) {
    .topbar {
        width: 100%;
        background: var(--moveblue);
        height: 90px;
        padding: 20px 50px;
        border-bottom: 1px solid;
    }

    .menu-icon {
        display: none;
    }
}
</style>

<div class="topbar">
    <div class={(showNav) ? 'menu-icon closer' : 'menu-icon'} on:click="{navHandler}">
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>