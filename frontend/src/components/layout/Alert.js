import React from 'react';

const Alert = ({ alert, closeAlert }) => (
  <div className="Alert" onClick={closeAlert}>
    <h1>{alert.message}</h1>
  </div>
);

export default Alert;
