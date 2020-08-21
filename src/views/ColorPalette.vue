<template>
  <div class="paletteBackground">
    <div class="palette">
      <p class="generateNewInfo">
        Press
        <i>SPACEBAR</i>&nbsp; to generate new
      </p>

      <div class="loadingContainer" v-if="colorsLoading">
        <Loading />
      </div>

      <div class="paletteContainer">
        <div class="paletteUnitContainer" v-for="(colorData, index) in colors" :key="index">
          <div class="paletteUnit" :style="'background-color:' + colorData.hex"></div>
          <div class="toolbar">
            <span class="colorName">{{colorData.hex}}</span>
            
            <button
              :ref="'btnLock' + index"
              class="btnLock"
              :class="{'--active': colorData.locked}"
              @click="toggleLock(index)"
            >
              <i class="fa fa-lock"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button class="btnGenerate" @click="generateNextPalette()">
        <i class="fa fa-refresh" aria-hidden="true"></i>
        Generate
      </button>
    </div>
  </div>
</template>

<script>
import { rgbToHex } from "@/util";
import Loading from "@/components/Loading";
import Vue from "vue";

export default {
  name: "ColorPalette",
  components: { Loading },
  data: () => {
    return {
      colorsLoading: false,
      colors: null
    };
  },

  created() {
    this.generateRandomPalette();
    this.getSources();
  },

  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
  },

  destroyed() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },

  methods: {
    handleKeyDown(e) {
      if (e.code === "Space" && !this.colorsLoading) {
        this.generateNextPalette();
      }
    },

    generateRandomPalette() {
      this.colorsLoading = true;
      fetch("http://colormind.io/api/", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ model: "default" })
      })
        .then(response => response.json())
        .then(data => {
          this.colors = data.result.map(r => {
            return { rgb: r, hex: rgbToHex(...r), locked: false };
          });
          this.colorsLoading = false;
        });
    },

    generateNextPalette() {
      this.colorsLoading = true;
      var input = this.colors.map(c => (c.locked ? c.rgb : "N"));
      // debugger;

      fetch("http://colormind.io/api/", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ input, model: "default" })
      })
        .then(r => r.json())
        .then(data => {
          let _colors = JSON.parse(JSON.stringify(this.colors));
          input.forEach((inp, index) => {
            if (inp === "N") {
              let respColor = data.result[index];
              _colors[index].rgb = respColor;
              _colors[index].hex = rgbToHex(...respColor);
            }
          });
          this.colors = _colors;
          this.colorsLoading = false;
        });
    },

    getSources() {
      fetch("http://colormind.io/list/")
        .then(response => response.json())
        .then(res => {
          console.log(res);
        });
      // ''
    },

    toggleLock(index) {
      // prevent button click due to SPACE press
      this.$refs["btnLock" + index][0].blur();

      Vue.set(this.colors, index, {
        ...this.colors[index],
        locked: !this.colors[index].locked
      });
    }
  }
};
</script>

<style lang="scss">
.paletteBackground {
  width: 100%;
  height: 100%;
  background-color: #212121;
  color: white;
}

.palette {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loadingContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.paletteContainer {
  display: flex;
}

.paletteUnitContainer {
  display: flex;
  flex-direction: column;
}

.paletteUnit {
  height: 150px;
  width: 150px;
  cursor: pointer;
}

.paletteUnit:hover {
  opacity: 0.9;
}

.toolbar {
  display: flex;
  // justify-content: space-between;
  padding: 0.5rem 1rem;

  .colorName {
    align-self: center;
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }

  .btnLock {
    $size: 30px;
    height: $size;
    width: $size;
    // padding: 10px;
    border-radius: 50%;
    background-color: #313131;
    text-align: center;
    // line-height: $size;
    outline: none;
    cursor: pointer;
    border: none;
    align-self: center;

    &.--active {
      background-color: #33691e;
      color: white;
    }
  }
}

.btnGenerate {
  cursor: pointer;
  outline: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  background-color: #373737;
  color: whitesmoke;
  margin-top: 1rem;
}
</style>
