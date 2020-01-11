import React from 'react';

const EmailBody = ({ html, from, date }) => {
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
