

//export const baseUrl = 'https://depowersoft.com.au';

import { toast } from "react-toastify";
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
    if (isLocal()) {
        return true;
    } else {
        return window.grecaptcha?.getResponse() != '';
    }
}

export const addToast = (text:string) => {
    toast(text);
}

export const isLocal = () => {
    return window.location.host.indexOf('localhost') >= 0;
  }


export const isValidPassword = (text:string) => {
   var pattern = /^[a-z,0-9,_#]{8,}$/gmi;
   return pattern.test(text);
}