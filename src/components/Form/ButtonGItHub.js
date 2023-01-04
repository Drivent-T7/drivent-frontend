import styled from 'styled-components';

export default function ButtonGitHub({ children, ...props }) {
  return (
    <Container {...props}>
      {children}
    </Container>
  );
}

export const Container = styled.div`
  & {
    box-sizing: border-box;

    width: 60%;
    height: 40px;

    border: 1px solid #cecece;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
    
    background-color: black;
    color: white;
    
  }

  &:hover {
    cursor: pointer;
  }
`;
