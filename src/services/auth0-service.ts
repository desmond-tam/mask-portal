import { Observable, Subscriber } from 'rxjs';
import { IAuthication } from '../models/data-model';

export class auth0Service implements IAuthication{
    _cryptObj: Crypto = window.crypto;
    auth0:any=null;
    domain = 'dev-8dnd16mk.au.auth0.com';
    client_id = '7dORX23bkYdLGfvQw004t0kUmpPma5XR';
    redirect_url = 'http://localhost:3000';
    _token:string | null=null;
    constructor() {}

    // SetConfig = async() => {
    //     this.auth0 = await createAuth0Client({
    //         domain:this.domain,
    //         client_id:this.client_id
    //     })
    // }

    // _setConfig = ():Observable<any> => {
    //     return new Observable<any>(subscriber => {
    //         createAuth0Client({
    //             domain:this.domain,
    //             client_id:this.client_id
    //         }).then((auth0:any) => {
    //             subscriber.next(auth0);
    //             subscriber.complete();
    //         });
    //     })
    // }

    Login = () => {
        const url = `https://${this.domain}/authorize?response_type=id_token&client_id=${this.client_id}&state=${this._guid()}&nonce=${this._guid()}&redirect_uri=${this.redirect_url}`;
        window.location.href = url;
    }

    Logout = () => {
        const url =  `https://${this.domain}/v2/logout?client_id=${this.client_id}&returnTo=${this.redirect_url}`;
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
    // IsAuthenticated = async() => {
    //    return await this.auth0.isAuthenticated();
    // }

    _guid = () => {
        var buf = new Uint16Array(8);
        this._cryptObj.getRandomValues(buf);
        const s4 = (num:number) => {
            var ret = num.toString(16);
            while (ret.length < 4) {
                ret = '0' + ret;
            }
            return ret;
        }
        return s4(buf[0]) + s4(buf[1]) + '-' + s4(buf[2]) + '-' + s4(buf[3]) + '-' + 
        s4(buf[4]) + '-' + s4(buf[5]) + s4(buf[6]) + s4(buf[7]);
    }

}



