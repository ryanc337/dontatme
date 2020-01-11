import React, { useState, useEffect, useRef } from 'react';
import { getAddress } from '../../api';
import Alert from '../layout/Alert';
import Loading from '../layout/Loading';

const EmailClient = (props) => {
  const [ address, setAddress ] = useState('');
  // const [ allEmails, setAllEmails ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ alert, setAlert ] = useState({ show: false, color: 'red', message: '' });
  // const [ focusPanel, setFocusPanel ] = useState("list");
  // const [ focusId, setFocusId ] = useState(null);
  // const [ fetchedEmails, setFetchedEmails ] = useState({});
  // const cable = useRef();

  useEffect(() => {
    const tryFetchAddress = async () => {
      try {
        setIsLoading(true);
        const fetchedAddress = await getAddress();
        setAddress(fetchedAddress.address);
      } catch (error) {
        setAlert({
          color: 'red',
          show: true,
          message: 'Unable to load. Please refresh page.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    tryFetchAddress();
  }, [])

  return (
    <div>
      {alert.show && <Alert 
        message={alert.message}
        color={alert.color}
        closeAlert={() => setAlert(prevState => ({ ...prevState, show: false }))}
      />}
      {isLoading && <Loading />}
      <div>{address}</div>
    </div>
  );
};

export default EmailClient