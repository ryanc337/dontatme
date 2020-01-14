import React from 'react';

const EmailBody = ({ html }) => (
  <article className="email-body">
    <p dangerouslySetInnerHTML={{
      __html: html,
    }}
    />
  </article>
);

export default EmailBody;
