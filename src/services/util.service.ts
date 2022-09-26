
export const baseUrl = 'https://depowersoft.com.au';
//export const baseUrl = 'https://localhost:7090';
export const axiosConfig = {
    headers:{
        'Content-Type':'application/json;odata=nometadata',
        'Accept':'application/json;odata=nometadata',
        'Access-Control-Allow-Origin':'*'
    },
    withCredentials:false
}