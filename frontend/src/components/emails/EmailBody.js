import React from 'react';

const EmailBody = ({ html, from, date }) => {
  return(
    <div className = "Emailbody">
      <p>{from.value[0].address}</p>
      <p>{date.toString()}</p>
    <article>
      <p dangerouslySetInnerHTML={{
        __html: html
      }}>
      </p>
      </article>
    </div>
  );
}

export default EmailBody;
