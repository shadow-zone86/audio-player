<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <div class="header__body">
          <router-link to="/" class="header__logo"><img src="image/logo.png" alt=""></router-link>
        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<style scoped>
  .container {
    max-width: 1180px;
    margin: 0px auto;
    padding: 0px 10px;
  }

  .header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 50;
  }

  .header:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #35495e;
  }

  .header__body {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    height: 80px;
    align-items: center;
  }

  .header__logo {
    flex: 0 0 60px;
  }

  .header__logo img {
    max-width: 100%;
  }
</style>