import { AviasalesServiceConsumer } from '../aviasales-service-context';

const withAviasalesService = () => (Wrapped) => {
  return (props) => {
    return (
      <AviasalesServiceConsumer>
        {(aviasalesService) => {
          if (!aviasalesService) {
            return null;
          }
          return <Wrapped {...props} aviasalesService={aviasalesService} />;
        }}
      </AviasalesServiceConsumer>
    );
  };
};

export default withAviasalesService;
