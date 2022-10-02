
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BehaviorSubject, Observable } from "rxjs";
import { IAuthication, IUser } from '../models/data-model';
import { preSignin, dataService } from './data-service';
import { msalService } from './msal-service';

//export const auth0Srv = new auth0Service();
export const msalSrv:IAuthication = new msalService();
export const data_service = new dataService();

let store:BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
export const useUserObs = () => {
    const [users,setUser] = useState<IUser[]>([]);

    useEffect(() => {
        const sub = store.subscribe((recs:IUser[]) => {
            setUser(recs);
        })
        return () => {
            if (sub) {
                sub.unsubscribe();
            }
        };
    },[]);
    const getUserList = () => {
        preSignin().subscribe((response:any) => {
            store.next(response.data);
        })
    }
    return { getUserList,users };
}


let tokenStore:BehaviorSubject<string | null>;
export const getIdToken = () => {
    if (!tokenStore) {
        return undefined;
    }
    return tokenStore.value;
}

export const useTokenObs = () => {
    const [idToken,setTokenState] = useState<string | null>('');
    
    if (!tokenStore) {
        tokenStore = new BehaviorSubject<string | null>(null);
    }

    useEffect(() => {
        const subscription = tokenStore.subscribe((rec:string | null) => {
            setTokenState(rec);
        });

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    },[]);

    const setToken = (info:string | null) => {
        tokenStore.next(info);
    }

    return { setToken,idToken};
}


//let toastor :BehaviorSubject<string[]>;
// export const getToastorLines = () => {
//     if (!toastor) {
//         return undefined;
//     }
//     return toastor.value;
// }

// export const useToastor = () => {
//     const [texts,setText] = useState<string[]>([]);
    
//     if (!toastor) {
//         toastor = new BehaviorSubject<string[]>([]);
//     }

//     useEffect(() => {
//         const subscription = toastor?.subscribe((lines:string[]) => {
//             setText(lines);
//         });

//         return () => {
//             if (subscription) {
//                 subscription.unsubscribe();
//             }
//         };
//     },[]);

//     const addText = (text:string) => {
//         toastor.next([...texts,text]);
//     }

//     const clear = () => {
//         toastor.next([]);
//     }

//     return { addText,clear,texts};
// }



export const gateway = {
    page:new BehaviorSubject<string>('upload'),
    usePage:() => {
        const [page,setPage] = useState<string>('upload');
        useEffect(() => {
            const sub = gateway.page.subscribe((page:string) => {
                setPage(page);
            })
            return () => {
                if (sub) {
                    sub.unsubscribe();
                }
            };
        },[]);
        
        const showPage = (page:string) => {
            gateway.page.next(page);
        }

        return { page,showPage };
    },
    spinner:new BehaviorSubject<boolean>(false),
    useSpinner:() => {
        const [visible,setVisible] = useState<boolean>(false);
        useEffect(() => {
            const sub = gateway.spinner.subscribe((show:boolean) => {
                setVisible(show);
            })
            return () => {
                if (sub) {
                    sub.unsubscribe();
                }
            };
        },[]);
        const showSpinner = () => {
            gateway.spinner.next(true);
        }
        const hideSpinner = () => {
            gateway.spinner.next(false);
        }
        return { visible, showSpinner, hideSpinner};
    }
}

