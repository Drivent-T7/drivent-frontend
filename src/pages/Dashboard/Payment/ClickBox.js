import { useContext } from 'react';
import styled from 'styled-components';
import PaymentContext from '../../../contexts/PaymentContext';

export default function ClickBox({ optionData, type }) {
  const { paymentOptionsSelected, setPaymentOptionsSelected } = useContext(PaymentContext);

  return (
    <Container
      onClick={() => {
        setPaymentOptionsSelected((old) => {
          if (type === 'ticket' && optionData.id === 1) return { ticket: optionData };
          
          const newer = { ...old };
          newer[type] = optionData;
          return newer;
        });
      }}
      style={paymentOptionsSelected[type]?.id === optionData.id ? { background: '#FFEED2' } : {}}
    >
      <Name>{optionData.name}</Name>
      <Price>R$ {optionData.price}</Price>
    </Container>
  );
}

export const Container = styled.div`
  & {
    box-sizing: border-box;

    width: 145px;
    height: 145px;

    border: 1px solid #cecece;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
  }
`;

export const Name = styled.div`
  & {
    font-size: 16px;
    line-height: 19px;

    text-align: center;

    color: #454545;
  }
`;

export const Price = styled.div`
  & {
    font-size: 14px;
    line-height: 16px;
    text-align: center;

    color: #898989;
  }
`;
