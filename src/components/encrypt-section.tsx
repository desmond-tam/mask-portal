import { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import { data_service, gateway } from "../services/gateway-service";
import { addToast, isCaptchaChecked, isLocal, isValidPassword } from "../services/util.service";

const EncryptFileUploader = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [text,setText] = useState<any>(null);
    const { showSpinner, hideSpinner } = gateway.useSpinner();
  
    const onFileChange = (event:any) => {
      // Update the state
        setSelectedFile(event.target.files[0]);
        displaycap();
    };

    const onTextChange = (event:any) => {
        setText(event.currentTarget.value);
    }
  
  
    const onFileUpload = (evt: React.FormEvent<HTMLFormElement>) => {
      if (!isCaptchaChecked()) {
        addToast("please click on google check box.");
        evt.preventDefault();
        return false;
      }
      
      if (!selectedFile) {
        //console.log('please select file');
        addToast('please select file.');
        evt.preventDefault();
        return;
      }

      if (!isValidPassword(text)) {
        addToast("Invalid password, it must not contain space and special chars and at least 8 chars.");
        evt.preventDefault();
        return;
      }
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append("myfile",
          selectedFile,
          selectedFile.name
      );

      formData.append('pwd',text);
      
      showSpinner();
      data_service.Encrypt(formData)
          .subscribe({
            next:(res:any) => {
              var data = res;
              
              // let screamData = res.data.screamImageUrl;
              //var blob = new Blob([data], { type: "application/pdf" });
              var link = document.createElement('a');
              link.target = "_blank";
              link.href = `data:application/pdf;base64,${data.base64}`;
              const filename = `out_${selectedFile.name}`;
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
            evt.preventDefault();
          });

          evt.preventDefault();
    };
  
    // const ProcessButton = () => {
    //   return (
    //     <button className="btn btn-outline-info" onClick={() => onFileUpload(this)}>
    //         Process
    //     </button>
    //   )
    // }
  
    const displaycap = () => {
      setTimeout(() => {
        window.grecaptcha.render('RecaptchaForEncrypt', {'sitekey': '6LdPNisiAAAAAFMeu9o4YdHyXd55XSPbRNADnRfv'});
      }, 600);
    }
  
    return (
      <>
      { !isLocal() ?  <div id="RecaptchaForEncrypt" ></div> : <></> } 
      <Form onSubmit={onFileUpload}>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="text" id="txtpwd" placeholder="Password" onChange={(e) => onTextChange(e)} />
        </Form.Group>
        <Form.Group >
                <div className='select-file-container' >
                <input type="file" id="actual-btn" onChange={(e) => onFileChange(e)} hidden/>
                <label className='upload-file-label' htmlFor="actual-btn">Choose File</label>
                <span className='upload-file-chosen'>{selectedFile ? selectedFile.name : 'no file selected.'}</span>
            </div>

        </Form.Group>
        <Form.Group>
                          {/* <input type="file" onChange={(e) => onFileChange(e)} /> */}
            <div className="m-3">
                <button type="submit"  className="btn btn-primary">
                    Submit
                </button>
            </div>
        </Form.Group>
    </Form>
      
        </>
    );
  }

export const EncryptSection = () => {
    return (
        <>
        <p>The uploaded pdf file will not be kept in our system and will not be shared with others.</p>
        <p>Please do not use the app in public area like cafe or resturant. etc..</p>
        <EncryptFileUploader />
        </>
    )
}