<template>
  <div id="app">
    <router-view />

    <p class="bottomNav">
      <router-link to="/">Color Picker</router-link>|
      <router-link to="/palette">Color Palette</router-link>|
      <a
        href="https://coschedule.com/blog/color-psychology-marketing/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Color Psychology
        <i class="fa fa-external-link"></i>
      </a>
    </p>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: "Baloo Tamma 2", cursive;
}

#app {
  position: absolute;
  width: 100%;
  height: 100%;
}

.--white {
  color: whitesmoke;
  border-color: whitesmoke;
}

.--black {
  color: #373737;
  border-color: #373737;
}

.colorForm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.generateNewInfo {
  font-size: 0.8rem;
  margin-top: 0.5rem;
  text-align: center;
}

.bottomNav {
  position: absolute;
  bottom: 1%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  a {
    text-decoration: none;
    color: inherit;
  }
}

.text-center {
  text-align: center;
}

// Palette
</style>
