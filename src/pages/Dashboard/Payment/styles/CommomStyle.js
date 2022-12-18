import styled from 'styled-components';

const Container = styled.div`
  & {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
  }
`;

const Title = styled(Container)`
  & {
    font-size: 34px;
    line-height: 40px;

    margin-bottom: 30px;
  }
`;

const SubTitle = styled(Container)`
  & {
    font-size: 20px;
    line-height: 23px;

    color: #8e8e8e;

    margin-bottom: 10px;
  }
`;

export { Container, Title, SubTitle };
