/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Configuration, LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    // using common directory
    // auth:{
    //     clientId:'e748a95b-50b3-459d-b034-d1f7220a9b8e',
    //     authority:'https://login.microsoftonline.com/consumers/',
    //     redirectUri:'http://localhost:3000'
    // },
    // using b2c directory without workflows
    // auth:{
    //              62c794fa-c387-42fb-af0a-7120c390c270
    //     clientId: "194b076d-67f6-4075-8050-3fa69cdebde1", 
    //     authority: 'https://login.microsoftonline.com/cbf126b4-b1ad-43e2-b6f1-bd87b31fcfde', 
    //     authority:'https://login.microsoftonline.com/48f45a3d-9aad-4a54-9f45-cde47f1ed8a3',
    //     redirectUri: "http://localhost:3000"
    // },
    // auth:{
    //         // 62c794fa-c387-42fb-af0a-7120c390c270
    //     clientId: "194b076d-67f6-4075-8050-3fa69cdebde1", 
    //     authority: 'https://login.microsoftonline.com/cbf126b4-b1ad-43e2-b6f1-bd87b31fcfde', 
    //     redirectUri: "http://localhost:3000"
    // },
    // using b2c directory with workflows
    auth:{
        //         62c794fa-c387-42fb-af0a-7120c390c270 -- b2c directory without workflows
        //         194b076d-67f6-4075-8050-3fa69cdebde1
        //         a95eb5b9-be68-44b4-b6c4-ecc2e7c6f1a7
       //            e748a95b-50b3-459d-b034-d1f7220a9b8e
  //  1c531c0c-3991-47ea-b3f9-2ca309ff606f
        clientId: "194b076d-67f6-4075-8050-3fa69cdebde1", // This is the ONLY mandatory field; everything else is optional.
        authority:'https://newdepowersoft.b2clogin.com/newdepowersoft.onmicrosoft.com/B2C_1_signin',
       // validateAuthority:true,
        //postLogoutRedirectUri:'http://localhost:3000',http
        // clientSecret:'569444b-8167-4173-802c-bbc5c368c8dc',
        knownAuthorities: ['newdepowersoft.b2clogin.com'], // You must identify your tenant's domain as a known authority.
        redirectUri: "http://localhost:3000", // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href".
        navigateToLoginRequestUrl:true,
        skipAuthorityMetadataCache:true
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level:LogLevel, message:string, containsPii:boolean) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;		
                }	
            }	
        }	
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ["openid"]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};


