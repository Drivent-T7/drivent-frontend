import styled from 'styled-components';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function ConfirmedPaymentMessage() {
  return (
    <MessageWrapper>
      <AiFillCheckCircle size="50px" color="green" />
      <TextWrapper>
        <h1>Pagamento confirmado!</h1>
        <p>Prossiga para escolha de hospedagem e atividades</p>
      </TextWrapper>
    </MessageWrapper>
  );
}

const MessageWrapper = styled.div`
  & {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }
`;

const TextWrapper = styled.div`
  & {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    color: #454545;

    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    font-weight: 700;
  }
`;
