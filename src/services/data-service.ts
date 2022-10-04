import { graphConfig } from "../config/authConfig";
import axios from "axios";
import { from, map, Observable, Subscriber } from 'rxjs';
import { axiosConfig } from "./util.service";
import { environment } from "../environments/environment";



export async function callMsGraph(accessToken:string) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
  
    headers.append("Authorization", bearer);
  
    const options = {
        method: "GET",
        headers: headers
    };
  
    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
  }


  export const preflight = () => {
    const url = "https://localhost:7265/api/reg"
    axios.options(url)
        .catch((err) => {
            console.log(err);
        })
  }


  export const preSignin = ():Observable<any> => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImJXOFpjTWpCQ25KWlMtaWJYNVVRRE5TdHZ4NCJ9.eyJ2ZXIiOiIyLjAiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkL3YyLjAiLCJzdWIiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFHZUZjQW9nUS1VLTFBMVp6TUhKemFjIiwiYXVkIjoiZTc0OGE5NWItNTBiMy00NTlkLWIwMzQtZDFmNzIyMGE5YjhlIiwiZXhwIjoxNjU5NTA5NzQ4LCJpYXQiOjE2NTk0MjMwNDgsIm5iZiI6MTY1OTQyMzA0OCwibmFtZSI6IkRlc21vbmQgVGFtIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGVzbW9uZGVkc0Bob3RtYWlsLmNvbSIsIm9pZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC00MDc1LWUwZjI0ZDc2OWIxNiIsInRpZCI6IjkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsIm5vbmNlIjoiNzdmNzNiNzMtM2ZmZC00NzM5LTljY2MtZjUyYTYzZDdiYTQxIiwiYWlvIjoiRGFNcFJZc1E3RXVaN1lSSmlDb3AheDQ1NkJpUW1PZHl5ZTRZRElFaDRkRTB6OHpJRjhiczdlTk1NTHBFRSF5cXZRdDFLN3NEU0dmM1ZjMDZSaDc2RkpvTVlLUWNhYzNmY0RKSlEzWTAwWUxJRHh4bWdFbmpSRDZjVCpHKmYwenplaGJkMk81bENSVEoycHlJUDRCQUVjcyQifQ.0iAze75OCmVn459WUh1_LBsoeXw99MQxa6c-2rcJQAXQu2kL-HN2bNc4aJLCqR78fjfP0PUJF7yJzv2nlAKjKzUbcrwiEHyv9APEFWGKs9KF9FIGBeK2NHgCVoDKdCwN1CILQIInJGdrzEe4O4lTwWBjlk_D5YJukeBm-4XjgD8gGDL6DKXcsaImkSsp7dhSKlVDUD5w6PNqOLYh88gFGrrUW5qdOqXfkaLQ_7AY38_aNg9lZDKlgW_doN7mF1P_5D6X5gpfg2g12gWQUg6DiDOiRc3IUqwJdMURKJ4Vbm43CF-WdweBjybRDpwnAnXrr-fgunJNNblypBEw0Jn7Eg';
        const config = {
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json;odata=nometadata',
                'Accept':'application/json;odata=nometadata',
                'Access-Control-Allow-Origin':'*'
            }
        };

        const url = "https://localhost:7211/api/users";
        const promise = axios.get(url,config);
        return from(promise);
  }


  export class dataService {
    // private _upload(body:any):Observable<any> {
    //     const url = `${environment.endpoint()}/maskingappuploadv1`;
    //     const promise = axios.post(url,body,axiosConfig);
    //     return from(promise);
    // }
    private _handleError(err:any,subscriber:Subscriber<any>) {
        
        if (err.response?.status ==  400 && err.response.data?.messages) {
            const mesgs : string[] = err.response.data.messages;
           subscriber.error(mesgs);
        } else {
            subscriber.error([err.message]);
            console.log(err.message);
        }
        subscriber.complete();
    }
    public Upload(body:any):Observable<any> {
        const _upload = (body:any):Observable<any> => {
            const url = `${environment.endpoint()}/maskingappuploadv1`;
            const promise = axios.post(url,body,axiosConfig);
            return from(promise);
        }
        return new Observable<any>(subscriber => {
            _upload(body)
                .pipe(
                    map(x => x)
                )
                .subscribe({
                    next:(response:any) => {
                        subscriber.next(response.data);
                        subscriber.complete();
                    },
                    error:(err:any) => this._handleError(err,subscriber)
                })
        })
    }
    public Encrypt(body:any):Observable<any> {
        const post = (body:any):Observable<any> => {
            const url = `${environment.endpoint()}/maskingappencryptv1`;
            const promise = axios.post(url,body,axiosConfig);
            return from(promise);
        }
        return new Observable<any>(subscriber => {
            post(body)
                .pipe(
                    map(x => x)
                )
                .subscribe({
                    next:(response:any) => {
                        subscriber.next(response.data);
                        subscriber.complete();
                    },
                    error:(err:any) => this._handleError(err,subscriber)
                })
        })
    }
    public getwealther():Observable<any> {
        const url = `https://depowersoft.com.au/masking`;
        const promise = axios.get(url,axiosConfig);
        return from(promise);
    }
    private _getsample():Observable<any> {
        const url = `${environment.endpoint()}/maskingappsamplev1`;
        const promise = axios.get(url,axiosConfig);
        return from(promise);
    }
    public GetSample():Observable<any> {
        return new Observable<any>(subscriber => {
            this._getsample()
                .pipe(
                    map(x => x)
                )
                .subscribe({
                    next:(response:any) => {
                        subscriber.next(response.data);
                        subscriber.complete();
                    },
                    error:(err:any) => {
                         if (err.response?.status ==  400 && err.response.data?.messages) {
                             const mesgs : string[] = err.response.data.messages;
                            subscriber.error(mesgs);
                         } else {
                             subscriber.error(err.message);
                             console.log(err.message);
                         }
                         subscriber.complete();
                    }
                })
        })
    }
}






