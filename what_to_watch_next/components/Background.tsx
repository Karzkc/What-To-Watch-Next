import React from 'react';

const Background = () => {
  return (
    <div
      className="fixed inset-0 w-screen h-screen -z-10"
      style={{
        
        backgroundImage: 'url(/cinema.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(12px)', 
      }}
    >
      
      <div className="absolute inset-0
       bg-black/10"></div>
    </div>
  );
};

export default Background;