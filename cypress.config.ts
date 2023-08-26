import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'rhu2mz',
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      
    },
    baseUrl: "https://shoten-itsjrillo.netlify.app/",
    video: false
  },
});
