import { defineConfig } from "cypress";
import pg from 'pg'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv'
export default defineConfig({
  retries: {
    runMode: 2,
  },
  e2e: {
    defaultCommandTimeout: 15000,
    baseUrl: "https://fe-news.netlify.app",
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on("task", {
        dbQuery(queryString) {
          const sqlConfig = {};
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = dirname(__filename);
          dotenv.config({
            path: `${__dirname}/.env`,
          });
          sqlConfig.connectionString = process.env.DATABASE_URL;
          const db = new pg.Pool(sqlConfig);
         
          return db
            .query(queryString)
            .then((res) => {
              return res.rows;
            })
            .catch((err) => {
              return err;
            });
        },
      });
    },
  },
});
