// src/components/molecules/Filosofia.js
import React from 'react';
import styled from 'styled-components';
import Text from '../atoms/Text';

const Section = styled.section`
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
`;

function Filosofia() {
  return (
    <Section >
      <h2 className="text-center text-yellow-or text-2xl">NUESTRA FILOSOFIA</h2>
      <Text>En Jaguares Taekwondo creemos que el verdadero aprendizaje va más allá de las técnicas marciales. Nuestra filosofía se basa en el desarrollo integral de cada estudiante, inculcando valores que los acompañarán toda la vida. Creemos en la educación a través del ejemplo, y nuestros instructores son modelos a seguir que inspiran a los alumnos a ser su mejor versión. Promovemos un ambiente inclusivo y de apoyo donde cada estudiante es valorado y animado a superar sus propios límites.</Text>
    </Section>
  );
}

export default Filosofia;
