import type { AppProps } from "next/app";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/utils/msalConfig";
import { Provider } from "react-redux";
import AppAuthenticator from "@/components/Authenticator/AppAuthenticator";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import { store } from "@/store";

const msalInstance = new PublicClientApplication(msalConfig);
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        {/* <AppAuthenticator> */}
            <Layout>
              <Component {...pageProps} />
            </Layout>
        {/* </AppAuthenticator> */}
      </Provider>
    </MsalProvider>
  );
};

export default MyApp;
