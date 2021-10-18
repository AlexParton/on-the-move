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
            position: relative;
            margin: 0 auto 80px;
            width: 600px;
            height: 200px;
            border-radius: 60px;
        }

        a {
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 50px;
        }
    }
</style>


<header>
    <img src="assets/moving-header.jpg" alt="mudanza">
   <a href=".">On The Move</a>
</header>