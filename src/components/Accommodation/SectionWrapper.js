import styled from 'styled-components';

export const SectionWrapper = styled.section`
  width: 100% !important;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  margin-bottom: 30px;

  @media (orientation: portrait) {
    margin-bottom: 0px;
  }

  > h2 {
    font-size: 1.1rem;
    font-weight: 400;
    color: #8e8e8e;
    margin-bottom: 18px;
  }

  > div {
    display: flex;
    flex-wrap: wrap;
  }
`;
