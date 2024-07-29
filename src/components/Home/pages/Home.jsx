import React from 'react';
import Header from '../organisms/Header';
import AboutSection from '../organisms/AboutSection';
import MissionVisionSection from '../organisms/MissionVisionSection';
import PhilosophySection from '../organisms/PhilosophySection';
import Footer from '../organisms/Footer';

function Home() {
  return (
    <div className='min-h-screen bg-custom-bg bg-cover bg-center'>
      <Header />
      <AboutSection />
      <MissionVisionSection />
      <PhilosophySection />
      <Footer />
    </div>
  );
}

export default Home;
