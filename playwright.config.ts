import "dotenv/config"
import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e/tests",
})
