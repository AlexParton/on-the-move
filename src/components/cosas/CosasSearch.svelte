<script>
    export let search
    // export let isSearching = busqueda.length > 3

    // $: busqueda = search
    // $: console.log(search)
</script>

<style>
h3 {
    color: white
}
.search {
    padding: 12px 0 12px;
    position: sticky;
    top: 125px;
    z-index: 100;
    background: #ccd6db;
}

.input-wrapper {
    margin: 12px 0;
}

input {
    width: 100%;
    height: 35px;
    border-radius: 10px;
    border: 1px solid var(--maincolordark);
    padding: 0 0 0 10px;
}

input::placeholder {
    color: #999;
    font-style: italic;
}

input:focus {
    border: 2px solid var(--maincolordark);
    outline: none
}

@media(min-width: 768px) {
    .search {
        max-width: 300px;
    }
}
</style>

<div class="search">
    <h3>¿Qué estás buscando?</h3>
    <div class="input-wrapper">
        <input type="text" placeholder="Calcetines" bind:value={search}>
    </div>
</div>