import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket';

export default function Activities() {
  const { ticket } = useTicket();

  if (ticket?.status !== 'PAID') {
    return (
      <Container>
        <Title>Atividades</Title>
        <Message>Você precisa de um ticket pago para acessar as atividades.</Message>
      </Container>
    );
  }

  return 'Atividades: Em breve!';
}

const Container = styled.div`
  & {
    display: flex;
    flex-direction: column;

    height: 100%;
  }
`;

const Title = styled.div`
  & {
    font-size: 34px;
    line-height: 40px;

    margin-bottom: 30px;
  }
`;

const Message = styled.div`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    
    height: 100%;
    
    margin-bottom: 30px;
  }
`;
