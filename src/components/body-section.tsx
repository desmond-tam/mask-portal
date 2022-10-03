import { data_service,  gateway } from '../services/gateway-service';
import { useEffect, useRef, useState } from 'react';
import $ from 'jquery';

import './body-section.scss';
import { environment } from '../environments/environment';
import { addToast, isCaptchaChecked, isLocal } from '../services/util.service';
import { ContactUsSection } from './contacts/contactus-section';
import { UploadSection } from './upload-section';
import { EncryptSection } from './encrypt-section';

export const DashboardSection = (props:any) => {
   
}





export const ShowBody = () => {
    const { page } = gateway.usePage();
    switch (page) {
      case 'upload':{
        return (
          <UploadSection />
        );
        break;
      };
      case 'contactus':{
        return (
          <ContactUsSection />
        );
        break;
      };
      case 'encrypt':{
        return (
          <EncryptSection />
        );
        break;
      };
      default:{
        return (
          <UploadSection />
        )
      }
    }
}

export const BodySection = (props:any) => {
    return (
        <>
          <ShowBody />
        </>
    )
}