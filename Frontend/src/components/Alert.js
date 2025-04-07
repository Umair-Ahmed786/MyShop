import React, { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import { AlertContext } from '../context/alert/AlertContext';

const Alert_component = () => {
  const { alert } = useContext(AlertContext);

  return (
    alert && (
      <div className={`alert alert-${alert.type} px-5`} role="alert">
       <b> {alert.type === 'danger'? `ERROR: ${alert.message}`: `${alert.type.toUpperCase()}: ${alert.message}` }</b>
      </div>

      // <Alert variant={alert.type}>
      //   <b> {alert.type === 'danger'? `ERROR: ${alert.message}`: `${alert.type.toUpperCase()}: ${alert.message}` }</b>
      // </Alert>
    )
  );
};

export default Alert_component;
