import React from 'react';

const EmailBody = ({ html }) => {
  return(
    <article className="email-body">
      <p dangerouslySetInnerHTML={{
        __html: html
      }}>
      </p>
    </article>
  );
}

export default EmailBody;
