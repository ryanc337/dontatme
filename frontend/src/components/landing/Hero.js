import React from 'react'

const Hero = ({ address }) => {
  const copyToClipboard = str => {
    const el = document.createElement('input');
    el.value = str;
    el.setAttribute('readonly', '');
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };
  return(
  <main>
    <div className="Hero-Banner">
      <h1>Practice safe emails... use a burner</h1>
      <input value={address} />
      <button onClick={() => copyToClipboard(address)}>Copy</button>
    </div> 
  </main>
  )
}

export default Hero;