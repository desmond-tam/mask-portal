

//export const baseUrl = 'https://depowersoft.com.au';

import { environment } from "../environments/environment"

//export const baseUrl = 'https://localhost:7090';
export const axiosConfig = {
    headers:{
        'Content-Type':'application/json;odata=nometadata',
        'Accept':'application/json;odata=nometadata',
        'Access-Control-Allow-Origin':'*'
    },
    withCredentials:false
}

export const isCaptchaChecked = () => {
    if (environment.isLocal()) {
        return true;
    } else {
        return window.grecaptcha?.getResponse() != '';
    }
}
