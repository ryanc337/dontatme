import React, { useRef } from 'react';
import { ReactComponent as Copy } from '../../assets/copy.svg';

const EmailListHeader = ({ address }) => {
  const addressRef = useRef(null);
  const copyToClipboard = () => {
    addressRef.current.select();
    document.execCommand('copy');
  };

  return (
    <div className="email-list-header">
      <input className="email-list-header__address-id" ref={addressRef} value={address+'@dontatme.ca'} readOnly/>
      <div className="email-list-header__copy" onClick={copyToClipboard}><Copy/></div>
    </div>
  );
};

export default EmailListHeader;
