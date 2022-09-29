import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gateway } from '../services/gateway-service';

export const ToastSection = () => {
    //const { message } = gateway.useToastor();

       
    
    
    //const notify = () => toast("Wow so easy!");

    return (
      <div>
        {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer />
      </div>
    );
}