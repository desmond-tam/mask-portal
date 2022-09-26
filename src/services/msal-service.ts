import { IAuthication } from '../models/data-model';

export class msalService implements IAuthication {
    msalConfig = {
        endpoint:'https://newdepowersoft.b2clogin.com/newdepowersoft.onmicrosoft.com/oauth2/v2.0/authorize',
        tenant:'newdepowersoft',
        policy:'B2C_1_signin',
        client_id:'194b076d-67f6-4075-8050-3fa69cdebde1',
        nonce:'defaultNonce',
        redirect_url:'http://localhost:3000',
        scope:'openid',
        response_type:'id_token',
        prompt:'login'
    };
    _token:string | null = null;
    //endpoint:string = 'https://newdepowersoft.b2clogin.com/newdepowersoft.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signin&client_id=194b076d-67f6-4075-8050-3fa69cdebde1&nonce=defaultNonce&redirect_uri=https://localhost:3000&scope=openid&response_type=id_token&prompt=login';
    //policy:string='B2C_1_signin';
    //client_id:string = 
    constructor() {
        
    }

    Login = () => {
        const url = `https://${this.msalConfig.tenant}.b2clogin.com/${this.msalConfig.tenant}.onmicrosoft.com/oauth2/v2.0/authorize?p=${this.msalConfig.policy}&client_id=${this.msalConfig.client_id}&nonce=${this.msalConfig.nonce}&redirect_uri=${this.msalConfig.redirect_url}&scope=${this.msalConfig.scope}&response_type=${this.msalConfig.response_type}&prompt=${this.msalConfig.prompt}`;
        window.location.href = url;
    }

    Logout = () => {
        const url =  `https://${this.msalConfig.tenant}.b2clogin.com/${this.msalConfig.tenant}.onmicrosoft.com/${this.msalConfig.policy}/oauth2/v2.0/logout?redirect_uri=${this.msalConfig.redirect_url}`;
        window.location.href = url;
    }

    IsAuthenicated = ():boolean => {
        if (window.location.href.indexOf('id_token') > 0) {
            const lines = window.location.href.split('id_token=');
            const token = lines[1];
            this._token = token;
            this._removeHash();
            return true;
        }
        return false;
    }

    GetToken = ():string => {
        return this._token ?? '';
    }

    _removeHash = () => {
            window.history.pushState("", document.title, window.location.pathname
                                                               + window.location.search);
    }
}