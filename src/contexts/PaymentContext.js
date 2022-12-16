import { createContext, useState } from 'react';

const PaymentContext = createContext();
export default PaymentContext;

export function PaymentProvider({ children }) {
  const [paymentOptionsSelected, setPaymentOptionsSelected] = useState({});
  
  return (
    <PaymentContext.Provider value={{ paymentOptionsSelected, setPaymentOptionsSelected }}>
      {children}
    </PaymentContext.Provider>
  );
}
