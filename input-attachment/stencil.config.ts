import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'input-attachment',
  outputTargets: [
    {
      type: 'dist-custom-elements',
      dir: 'dist/components',
      customElementsExportBehavior: 'bundle',
      isPrimaryPackageOutputTarget: true,
    },
    {
      type: 'www',
      dir: 'www',
      serviceWorker: null,
      copy: [
        { src: 'images', dest: 'images' }
      ]
    },
    {
      type: 'docs-readme',
    },
  ],
  devServer: {
    reloadStrategy: 'pageReload',
    root: 'www',
  },
  testing: {
    browserHeadless: "new",
    useESModules: true,
    moduleNameMapper: {
      "^@botandrose/progress-bar$": "<rootDir>/test-mocks/progress-bar.cjs",
      "^@botandrose/file-drop$": "<rootDir>/test-mocks/file-drop.cjs",
      "\\.\\./upload-dialog/upload-dialog$": "<rootDir>/test-mocks/upload-dialog.cjs"
    },
    transformIgnorePatterns: [
      "node_modules/(?!(rails-request-json|@botandrose/progress-bar|@botandrose/file-drop|@rails/request\.js))"
    ],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
    browserArgs: process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : []
  },
  validatePrimaryPackageOutputTarget: true,
};
