import { defineConfig } from 'cypress'

export default defineConfig({
  video: true, 
  videosFolder: 'cypress/evidencias/videos',
  screenshotsFolder: 'cypress/evidencias/screenshots',
  e2e: {
    baseUrl: 'https://desafio-feng-qa-ab3c59.gitlab.io'
  }
})