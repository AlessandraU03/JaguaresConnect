// src/components/organisms/Footer.js
import React from 'react';
import styled from 'styled-components';
import Logo from '../atoms/Logo';
import Text from '../atoms/Text';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterText = styled(Text)`
  color: white;
`;

function Footer() {
  return (
    <FooterContainer>
      <Logo />
      <FooterText>Central Sur 111, San Esteban, 29150 Suchiapa, Chis.</FooterText>
      <FooterText>IDEM "Jaguares"</FooterText>
    </FooterContainer>
  );
}

export default Footer;
