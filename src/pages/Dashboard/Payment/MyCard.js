import { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';

export default function MyCard() {
  const [data, setData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  });

  console.log(data.expiry);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
  }

  function handleChange(e) {
    if (e.target.name === 'expiry') {
      const value = formatExpirationDate(e.target.value);
      setData({
        ...data,
        [e.target.name]: value,
      });

      return;
    }

    if (e.target.name === 'cvc') {
      const value = formatCVC(e.target.value);
      setData({
        ...data,
        [e.target.name]: value,
      });

      return;
    }

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  function handleInputFocus(e) {
    setData({
      ...data,
      focus: e.target.name,
    });
  }

  function clearNumber(value = '') {
    return value.replace(/\D+/g, '');
  }

  function formatExpirationDate(value) {
    const clearValue = clearNumber(value);

    if (clearValue.length >= 3) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }
    console.log(clearValue);
    return clearValue;
  }

  function formatCVC(value) {
    const clearValue = clearNumber(value);
    let maxLength = 4;

    return clearValue.slice(0, maxLength);
  }

  return (
    <CardWrapper>
      <Cards cvc={data.cvc} expiry={data.expiry} focused={data.focus} name={data.name} number={data.number} />
      <FormWrapper onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            name="number"
            placeholder="Card Number"
            type="number"
            value={data.number}
            onChange={handleChange}
            onFocus={handleInputFocus}
            required
          />
          <label>E.g.: 49..., 51..., 36..., 37...</label>
        </InputWrapper>
        <InputWrapper>
          <Input
            name="name"
            placeholder="Name"
            type="text"
            value={data.name}
            onChange={handleChange}
            onFocus={handleInputFocus}
            required
          />
        </InputWrapper>
        <InputWrapper direction="inline">
          <Input
            name="expiry"
            placeholder="Valid Thru"
            value={data.expiry}
            type="text"
            onChange={handleChange}
            onFocus={handleInputFocus}
            width="60%"
            required
            pattern="/^(0[1-9]|1[0-2])([2-9][3-9])$/"
          />

          <Input
            name="cvc"
            placeholder="CVC"
            value={data.cvc}
            onChange={handleChange}
            onFocus={handleInputFocus}
            width="30%"
            maxlength="4"
            type="number"
            required
          />
        </InputWrapper>

        <Button type="submit">FINALIZAR PAGAMENTO</Button>
      </FormWrapper>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  width: 670px;
  height: 250px;
  display: flex;
  align-items: left;
  flex-direction: row;
  padding: 20px 0;
`;

const FormWrapper = styled.form`
  width: 355px;
  margin-left: 20px;
  position: relative;
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
  width: ${(props) => (props.width ? props.width : '100%')};
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

const Button = styled.button`
  cursor: pointer;
  width: 182px;
  height: 37px;
  background-color: #e0e0e0;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
  position: absolute;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  top: 250px;
  right: 485px;
  outline-color: #e0e0e0;
  border-color: #e0e0e0;
  text-decoration: none;
  border: none;
`;
