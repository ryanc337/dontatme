import React from 'react'

const Hero = ({ address }) => {
  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };
  return(
  <main>
    <div class="Hero-Banner">
      <h1>Practice safe emails... use a burner</h1>
      <textarea value={address} />
      <button onClick={() => copyToClipboard(address)}>Copy</button>
    </div> 
  </main>
  )
}

export default Hero;