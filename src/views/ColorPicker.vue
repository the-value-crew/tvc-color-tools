<template>
  <div
    class="background"
    ref="background"
    :class="textColorClass"
    :style="'background-color:' + backgroundColorHex"
    @keydown="generateRandomColor()"
  >
    <div class="colorForm">
      <input
        type="text"
        spellcheck="false"
        v-model="backgroundColorHex"
        class="hexInput"
        :class="textColorClass"
        @click="copyText"
      />
      <br />
      <br />
      <input
        type="text"
        spellcheck="false"
        v-model="backgroundColorRgb"
        class="hexInput"
        :class="textColorClass"
        @click="copyText"
      />
      <p class="generateNewInfo">
        Press
        <i>SPACEBAR</i>&nbsp; to generate new
      </p>
    </div>
  </div>
</template>

<script>
import { generateRandomColor, hexToRgbA } from "@/util";

export default {
  name: "ColorPicker",
  data: () => {
    return {
      backgroundColorHex: null,
      backgroundColorRgb: null
    };
  },

  created() {
    this.generateRandomColor();
  },

  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
  },

  destroyed() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },

  methods: {
    handleKeyDown(e) {
      if (e.code === "Space") {
        this.generateRandomColor();
      }
    },

    generateRandomColor() {
      this.backgroundColorHex = generateRandomColor();
      let rgb = hexToRgbA(this.backgroundColorHex);
      this.backgroundColorRgb = [rgb.r, rgb.g, rgb.b].join(",");
    },

    copyText(e) {
      var copyText = e.srcElement;
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");
    }
  },

  computed: {
    textColorClass() {
      let rgb = hexToRgbA(this.backgroundColorHex);
      let luma = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
      return luma < 100 ? "--white" : "--black";
    }
  }
};
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100%;
  transition: background-color 0.5s ease-in-out;
}

.hexInput {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 2.5rem;
  padding: 0 0.5rem;
  border-bottom-width: 1px;
  border-bottom-style: dashed;
  font-weight: lighter;
  font-family: "Open Sans Condensed", sans-serif;

  width: 250px;
  text-align: center;
  transition: color 0.5s ease-in-out;
}
</style>
