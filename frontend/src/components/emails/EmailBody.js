import React from 'react';

const EmailBody = ({ html, from, date }) => {
  return(
    <div className = "email-body">
      <p>{from.value[0].address}</p>
      <p>{date.toString()}</p>
    <article className="__email-body-text">
      <p dangerouslySetInnerHTML={{
        __html: html
      }}>
      </p>
      </article>
    </div>
  );
}

export default EmailBody;
