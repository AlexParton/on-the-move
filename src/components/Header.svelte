<script>


</script>

<style>
    header {
        width: 100%;
        overflow: hidden;
        position: fixed;
        height: 125px;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    img {
        width: 100%;
        filter: brightness(0.7);
    }

    a {
        position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    padding: 45px 0;
    font-weight: 600;
    font-size: 30px;
    color: var(--maincolorlight);
    text-shadow: 1px 1px 12px black;
    font-family: 'Shrikhand', cursive;
    text-decoration: none;
    }

    @media (min-width: 768px) {
        header{
            position: fixed;
            height: 60px;
            width: 25%;
            right: 20px;
            top: 10px;
            z-index: 10000000000000;
            left: initial;
            margin: auto;
            border-radius: 60px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        a {
            left: 0;
            right: 0;
            font-size: 28px;
            padding: 0;
            top: 12px;
            z-index: 1000000;
            bottom: initial;
            text-align: center;
        }

        img {
            transform: translateY(-35px);
        }
    }
</style>


<header>
    <img src="assets/moving-header.jpg" alt="mudanza">
   <a href=".">On The Move</a>
</header>