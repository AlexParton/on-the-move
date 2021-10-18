<script>
export let imgSrc
export let title
</script>

<style>
    div {
        width: 100%;
        border-radius: 20px;
        margin: 15px auto;
        position: relative;
        overflow: hidden;
        height: 110px;
    }

    img {
        width: 100%;
        transform: translateY(-20px);
    }

    h2 {
        position: absolute;
        top: 0;
        left: 0;
        margin: auto;
        font-weight: 600;
        font-size: 17px;
        background: var(--maincolorlight);
        width: 102px;
        padding: 5px 0 5px 20px;
        border-radius: 0 0 25px 0;
    }

    @media (min-width: 768px) {
        div {
            width: 30%;
            height: 140px;
            cursor: pointer;
        }

        div:hover {
            box-shadow: 1px 1px 12px black;
        }

        img {
        transform: translateY(0);
        }
    }
</style>

<div on:click>
    <img src="{imgSrc}" alt="{title}">
    <h2>{title}</h2>
</div>