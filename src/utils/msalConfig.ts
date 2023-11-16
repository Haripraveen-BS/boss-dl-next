import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    authority: `https://login.microsoftonline.com/054fe825-0668-422f-a636-90afe2a67ea3`,
    clientId: "06a3eb45-9526-4cf3-a1f8-16484b8f1a98",
    redirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: number, message: string, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            // console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};
export const loginRequest = {
  scopes: ["User.Read"],
};
