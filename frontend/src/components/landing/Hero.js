import React, { useRef } from 'react'

const Hero = ({ address }) => {
  const addressRef = useRef(null);
  const copyToClipboard = e => {
    addressRef.current.select();
    document.execCommand('copy');
  };
  
  return(
  <main>
    <div className="Hero-Banner">
      <h1>Practice safe emails... use a burner</h1>
      <input ref={addressRef} value={address} readOnly/>
      <button onClick={copyToClipboard}>Copy</button>
    </div> 
  </main>
  )
}

export default Hero;
