// src/components/molecules/MissionVision.js
import React from 'react';
import styled from 'styled-components';
import Text from '../atoms/Text';

const Section = styled.section`
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
`;

function MissionVision() {
  return (
    <div>
      <Section>
        <h2 className="bg-yellow-or text-2xl">MISION</h2>
        <Text>Fortalecer el físico y carácter de nuestros alumnos. Fomentamos un ambiente positivo donde se valoren el respeto, la autodisciplina y el espíritu deportivo.</Text>
      </Section>
      <Section>
        <h2 className="text-yellow-or text-2xl">VISION</h2>
        <Text>Transformar vidas a través del Taekwondo, estableciendo una escuela líder en innovación educativa y formación de individuos resilientes.</Text>
      </Section>
    </div>
  );
}

export default MissionVision;
