import React from 'react';
import Header from '../components/organisms/Header';
import AboutSection from '../components/Home/organisms/AboutSection';
import MissionVisionSection from '../components/Home/organisms/MissionVisionSection';
import PhilosophySection from '../components/Home/organisms/PhilosophySection';
import Footer from '../components/organisms/Footer';

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
