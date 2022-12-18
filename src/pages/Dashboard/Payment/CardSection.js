import { useState } from 'react';
import {
  CardWrapper,
  FormWrapper,
  InputWrapper,
  Input,
  ExpiryInput,
  CvcInput,
  Button,
} from './styles/CardSectionStyle';
import { toast } from 'react-toastify';
import useSavePayment from '../../../hooks/api/useSavePayment';
import formatCard from './utils/formatCardData';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default function CardSection({ getTicket, ticketId }) {
  const { savePayment } = useSavePayment();
  const [maxLength, setMaxLength] = useState(12);
  const [issuer, setIssuer] = useState('');
  const [data, setData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  });

  function handleChange(e) {
    let value;

    /*eslint-disable */
    switch (e.target.name) {
      case 'expiry':
        value = formatCard.expirationDate(e.target.value);
        break;

      case 'cvc':
        value = formatCard.CVC(e.target.value);
        break;

      default:
        value = e.target.value;
        break;
    }
    /*eslint-enable */

    setData({
      ...data,
      [e.target.name]: value,
    });
  }

  function handleInputFocus(e) {
    setData({
      ...data,
      focus: e.target.name,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const paymentData = {
      ticketId,
      cardData: {
        issuer,
        number: Number(data.number),
        name: data.name,
        expirationDate: data.expiry,
        cvv: Number(data.cvc),
      },
    };

    try {
      await savePayment(paymentData);
      toast('Pagamento realizado com sucesso!');
      await getTicket();
    } catch (error) {
      toast('Não foi possível registrar o pagamento!');
    }
  }

  return (
    <CardWrapper>
      <Cards
        cvc={data.cvc}
        expiry={data.expiry}
        focused={data.focus}
        name={data.name}
        number={data.number}
        callback={({ issuer, maxLength }) => {
          setMaxLength(maxLength);
          setIssuer(issuer);
        }}
      />
      <FormWrapper onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            name="number"
            placeholder="Card Number"
            type="tel"
            value={data.number}
            maxLength={maxLength}
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
            maxLength="17"
            onChange={handleChange}
            onFocus={handleInputFocus}
            required
          />
        </InputWrapper>
        <InputWrapper direction="inline">
          <ExpiryInput
            name="expiry"
            placeholder="Valid Thru"
            type="text"
            value={data.expiry}
            onChange={handleChange}
            onFocus={handleInputFocus}
            required
            pattern="^(0[1-9]|1[0-2])\/?(2[3-9]|[3-9]\d)$"
          />

          <CvcInput
            name="cvc"
            placeholder="CVC"
            type="tel"
            value={data.cvc}
            maxLength="4"
            onChange={handleChange}
            onFocus={handleInputFocus}
            required
          />
        </InputWrapper>

        <Button type="submit">FINALIZAR PAGAMENTO</Button>
      </FormWrapper>
    </CardWrapper>
  );
}
