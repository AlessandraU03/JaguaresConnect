import React from 'react';
import styled from 'styled-components';
import MissionVision from './MissionVission';
import Filosofia from '../molecules/Filosofia';
import BannerImage from '/public/Images/Banner.png'; // Asegúrate de importar la imagen correctamente

const AboutContainer = styled.div`
  position: relative; /* Asegura que el posicionamiento sea relativo para manejar capas */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  background-image: url(${BannerImage}); 
  background-size: cover;
  background-position: center;
  height: 690px; 
  z-index: 1; 
`;

const TextContainer = styled.div`
  flex: 1;
  max-width: 50%;
  box-sizing: border-box;
  text-align: center;
`;

const AboutText = styled.p`
  color: #333;
  font-size: 24px;
  text-align: justify;
  padding: 100px;
`;

function AboutUs() {
  return (
    <>
      <AboutContainer>
        <TextContainer>
          <h2 className="text-7xl">QUIENES SOMOS</h2>
          <AboutText>
            Somos IDEM "Jaguares", una escuela dedicada a impartir conocimientos y habilidades en el arte del Taekwondo. Nuestro enfoque está en la formación integral de nuestros alumnos, combinando competencia física con el desarrollo personal. Nos comprometemos a fomentar un ambiente seguro, respetuoso y motivador, donde cada estudiante pueda alcanzar su máximo potencial.
          </AboutText>
        </TextContainer>
      </AboutContainer>
      <MissionVision />
      <Filosofia />
    </>
  );
}

export default AboutUs;
