import React, { useRef } from 'react';

const Hero = ({ address }) => {
  const addressRef = useRef(null);
  const copyToClipboard = () => {
    addressRef.current.select();
    document.execCommand('copy');
  };
<<<<<<< HEAD

  return (
    <section className="hero">
      <h1 className="hero__tagline">
Practice safe emails...
        <br />
Use a burner
      </h1>
      <div className="hero__cta">
        <input className="hero__cta-input" ref={addressRef} value={`${address}@dontatme.ca`} readOnly />
        <button className="hero__cta-btn" onClick={copyToClipboard} type="button">Copy</button>
=======
  
  return(
    <section className='hero'>
      <h1 className='hero__tagline'>Protect your email.<br/>Use a burner.</h1>
      <div className='hero__cta'>
        <input className='hero__cta-input' ref={addressRef} value={address+'@dontatme.ca'} readOnly />
        <button className='hero__cta-btn' onClick={copyToClipboard}>Copy</button>
>>>>>>> 3bd48127577a613928f1203070e6b82b2846742d
      </div>
    </section>
  );
};

export default Hero;
