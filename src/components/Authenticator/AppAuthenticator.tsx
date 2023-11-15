import React, { useEffect, useState } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "@/utils/msalConfig";
import { Loader } from "../common";

type Props = {
  children: JSX.Element;
};
function AppAuthenticator({ children }: Props) {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length === 0) {
      instance
        .ssoSilent({
          scopes: ["user.read"],
        })
        .then((response) => {
          instance.setActiveAccount(response.account);
        })
        .catch((error) => {
          console.log(" sso error : ", error);
          if (!isAuthenticated) {
            instance
              .loginRedirect(loginRequest)
              .then((response: any) => {
                instance.setActiveAccount(response.account);
              })
              .catch((e) => {
                console.log("error" + e);
              });
          }
        });
    }
  }, [accounts, instance, isAuthenticated]);

  return (
    <main>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Loader />
      </UnauthenticatedTemplate>
    </main>
  );
}

export default AppAuthenticator;
