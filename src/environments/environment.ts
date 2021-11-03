// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_API : "http://localhost:1337/",
  URL_IMG: "http://localhost:1337",
  URL_API_FORGOT_PASSWORD: "http://localhost:1337/auth/forgot-password",
  URL_API_CONFIRMATION_MAIL: "http://localhost:1337/emailverification",
  URL_QRCODE: "https://api.qr-code-generator.com/v1/create?access-token=gfMm4d6jQAyIdTMc9Yb-dWDpMheL1cL-Bsf6fsp2cFJQD1uq0_laGF4d4BeW6M-1",
  SMPT_HOSTNAME: "contact@digitaldevelopment.fr",
  LINK_EMAIL_CONFIRMATION: "http://localhost:4200",
  LINK_EMAIL_RESILLIATION: "http://localhost:4200/reset_password"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
