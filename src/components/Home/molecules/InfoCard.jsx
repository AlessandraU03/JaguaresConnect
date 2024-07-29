import React from 'react';

function InfoCard({ title, text }) {
  return (
    <div className="info-card">
      <h3 className='flex flex-col items-center justify-center w-full max-w-[296px] h-auto flex-shrink-0 rounded-[30px_10px] bg-[#E4C000] text-center text-black font-inter text-[32px] md:text-[48px] font-semibold leading-normal mb-4'>
        {title}
      </h3>
      <p className='flex flex-col justify-center w-full max-w-[558px] h-auto flex-shrink-0 text-justify text-black font-inter text-[20px] md:text-[32px] font-medium leading-normal'>
        {text}
      </p>
    </div>
  );
}

export default InfoCard;
