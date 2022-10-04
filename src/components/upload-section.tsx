import { useState } from "react";
import { data_service, gateway } from "../services/gateway-service";
import { addToast, isCaptchaChecked, isLocal } from "../services/util.service";


const FileUploader = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const { showSpinner, hideSpinner } = gateway.useSpinner();
  
    const onFileChange = (event:any) => {
      // Update the state
        setSelectedFile(event.target.files[0]);
        displaycap();
    };
  
  
    const onFileUpload = () => {
      if (!isCaptchaChecked()) {
        addToast("please click on google check box.");
        return;
      }
      if (!selectedFile) {
        addToast("Please select file.");
        return;
      }
      
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append("myFile",
          selectedFile,
          selectedFile.name
      );
      
      showSpinner();
      data_service.Upload(formData)
          .subscribe({
            next:(res:any) => {
              var data = res;
              
              // let screamData = res.data.screamImageUrl;
              //var blob = new Blob([data], { type: "application/pdf" });
              var link = document.createElement('a');
              link.target = "_blank";
              link.href = `data:application/pdf;base64,${data.base64}`;
              const filename = `e${selectedFile.name}`;
              link.download = filename;
              link.click();
            },
            error:(err:string[]) => {
              err.forEach(x => {
                addToast(x);
              })
            }
          })
          .add(() => {
            hideSpinner();
          })
    };
  
    const ProcessButton = () => {
      return (
        <button className="btn btn-outline-info" onClick={() => onFileUpload()}>
            Process
        </button>
      )
    }
  
    // const Captcha = () => {
      
      
    //   // return (
    //   //   <form action="?" method="POST">
    //   //     <div className="g-recaptcha" data-sitekey="6LdPNisiAAAAAFMeu9o4YdHyXd55XSPbRNADnRfv"></div>
    //   //     <br/>
    //   //   </form>
    //   // )
    // }
    const displaycap = () => {
      setTimeout(() => {
        window.grecaptcha.render('RecaptchaField1', {'sitekey': '6LdPNisiAAAAAFMeu9o4YdHyXd55XSPbRNADnRfv'});
      }, 600);
    }
  
    return (
      <>
      { !isLocal() ?  <div id="RecaptchaField1" ></div> : <></> } 
     
      <div className='select-file-container'>
          <input type="file" id="actual-btn" onChange={(e) => onFileChange(e)} hidden/>
          <label className='upload-file-label' htmlFor="actual-btn">Choose File</label>
          <span className='upload-file-chosen'>{selectedFile ? selectedFile.name : 'no file selected.'}</span>
      </div>
        {/* <input type="file" onChange={(e) => onFileChange(e)} /> */}
        <div className='upload-button-container'>
            <ProcessButton />
        </div>
        </>
    );
  }
  
  export const UploadSection = () => {
    const ontest = () => {
      data_service.getwealther()
      .subscribe({
        next:() => {
          console.log('done');
        },
        error:(err:any) => {
          addToast(err);
        }
      })
    }
    const ontest2 = () => {
      data_service.GetSample()
        .subscribe({
          next:() => {
            console.log('done');
          },
          error:(err:any) => {
            addToast(err);
          }
        })
    }
    return (
        <>
          <div className="upload-svg"></div>
          <div className="upload-content">
              <p>The PDF masking process is not for commercial use and still doing the fine tuning.</p>
              <p>The process will be moved to Azure.</p>
              <p>The file should not be larger than 10mb.</p></div>
                {/* { !show ?  <Dummy /> : <CheckInForm />}    */}
                <FileUploader />
             <div>
              {/* <button onClick={() => ontest()}>get weather</button> */}
              {/* <button onClick={() => ontest2()}>get sample</button> */}
            </div> 
            </>
    )
  }