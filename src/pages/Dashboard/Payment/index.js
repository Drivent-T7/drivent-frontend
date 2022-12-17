import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import * as paymentApi from '../../../services/paymentApi';
import styled from 'styled-components';
import MyCard from './CardSection';

export default function Payment() {
  const token = useToken();
  const [ticketData, setTicketData] = useState({});

  useEffect(() => {
    const ticketInformation = getData(token);
    ticketInformation
      .then((data) => {
        console.log(data);
        setTicketData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Title>Ingresso e pagamento</Title>
      <Section>
        <h1>Ingresso Escolhido</h1>
        <Card>
          <Name>{ticketData.name}</Name>
          <Price>R$ {ticketData.price / 100}</Price>
        </Card>
      </Section>

      <Section>
        <h1>Pagamento</h1>
        <MyCard />
      </Section>
    </>
  );
}

// export default function PaymentSection() {
//   const token = useToken();
//   const [ticketData, setTicketData] = useState({});

//   useEffect(() => {
//     const ticketInformation = getData(token);
//     ticketInformation
//       .then((data) => {
//         console.log(data);
//         setTicketData(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <>
//       <Title>Ingresso e pagamento</Title>
//       <Section>
//         <h1>Ingresso Escolhido</h1>
//         <Card>
//           <Name>{ticketData.name}</Name>
//           <Price>R$ {ticketData.price / 100}</Price>
//         </Card>
//       </Section>

//       <Section>
//         <h1>Pagamento</h1>
//         <MyCard />
//       </Section>
//     </>
//   );
// }

async function getData(token) {
  try {
    const data = await paymentApi.getTicketInformation(token);
    return data.TicketType;
  } catch (error) {
    console.log(error);
  }
}

const Title = styled.div`
  color: #000000;
  font-size: 34px;
  line-height: 40px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 35px;
`;

const Section = styled.div`
  font-family: 'Roboto', sans-serif;
  h1 {
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-top: 30px;
  }
`;

const Card = styled.div`
  width: 290px;
  height: 108px;
  background: #ffeed2;
  border-radius: 20px;
  margin-top: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: #454545;
  margin-bottom: 10px;
`;

const Price = styled.div`
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #898989;
`;
