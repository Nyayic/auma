import { Audio } from "./audio";

import "./results.css";

export const Results = {
  components: {
    "app-audio": Audio,
  },
  template: `
<div class="results">
  <app-audio :url="audioUrl" :style="{width: '240px'}"/>
</div>`,
  props: {
    config: Object,
    results: Array,
  },
  mounted() {
    if (this.results.length != this.config.questions.length) {
      throw new Error("results and questions have different length");
    }
  },
  computed: {
    numberYes() {
      return this.results.filter((r) => r.option === "yes").length;
    },
    audioUrl() {
      for (let i = 0; i < this.config.results.length; i++) {
        if (
          this.numberYes >= this.config.results[i].from &&
          this.numberYes <= this.config.results[i].to
        ) {
          return this.config.results[i].audioUrl;
        }
      }
      throw new Error("could not find results audio");
    },
  },
};