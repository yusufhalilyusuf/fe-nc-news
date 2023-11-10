import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    
    defaultCommandTimeout:15000,
    baseUrl : 'https://fe-news.netlify.app',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
