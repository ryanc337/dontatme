import React from 'react';

const EmailBody = ({ html }) => (
  <article className="email-body">
    <div dangerouslySetInnerHTML={{
      __html: html,
    }}
    />
  </article>
);

export default EmailBody;
