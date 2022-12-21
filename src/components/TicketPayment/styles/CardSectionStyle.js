import styled from 'styled-components';

const CardWrapper = styled.div`
  width: 670px;
  height: 250px;
  display: flex;
  align-items: left;
  flex-direction: row;
  padding: 20px 0;

  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

const FormWrapper = styled.form`
  width: 100%;
  margin-left: 20px;
  position: relative;

  @media (max-width: 600px) {
    margin-top: 30px;
    margin-left: 0;
    margin-bottom: 50px;
  }
`;

const InputWrapper = styled.div`
  min-height: 55px;
  display: flex;
  flex-direction: ${(props) => (props.direction ? 'row' : 'column')};
  margin-bottom: 10px;
  align-items: left;
  justify-content: space-between;

  label {
    color: #8e8e8e;
    font-size: 16px;
    margin-top: 5px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  font-size: 20px;
  padding: 0 10px;
  border: 1px solid #ccc;
  outline-color: #898989;
  text-decoration: none;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ExpiryInput = styled(Input)`
  width: 60%;
`;

const CvcInput = styled(Input)`
  width: 30%;
`;

const Button = styled.button`
  cursor: pointer;
  width: 182px;
  height: 37px;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  outline-color: #e0e0e0;
  text-decoration: none;
  border: none;

  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 16px;
  color: #000000;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 250px;
  right: 485px;

  @media (max-width: 600px) {
    top: 210px;
    left: 0;
  }
`;

export { CardWrapper, FormWrapper, InputWrapper, Input, ExpiryInput, CvcInput, Button };
