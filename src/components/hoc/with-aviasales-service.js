import React from 'react';

import { AviasalesServiceConsumer } from '../aviasales-service-context';

const withAviasalesService = () => (Wrapped) => {
  return (props) => {
    return (
      <AviasalesServiceConsumer>
        {
          (aviasalesService) => {
            return (<Wrapped {...props}
              aviasalesService={aviasalesService} />);
          }
        }
      </AviasalesServiceConsumer>
    );
  };
};

export default withAviasalesService;
