"use client";


import React from 'react'

const DisplayQRCode = () => {
  const [qrCodeUrl , setQrCodeUrl] = React.useState<string | null>(null);
  React.useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/generateQR');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQrCodeUrl(data.qrCodeUrl);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    };

    fetchQRCode();
  }, []);

  if (!qrCodeUrl) {
    return <div className='text-center'>Loading QR Code...</div>;
  }
  return (
    <div className='p-7 text-xl font-bold'> 
      <h1 className='text-center'>Scan the QR Code to pay</h1>
      <div className='flex justify-center mt-4'>
        <img src={qrCodeUrl} alt="QR Code" className='w-64 h-64' />
      </div>
      <p className='text-center text-[#6a51a6] mt-2'> Scan and Pay</p>
    </div>
  )
}

export default DisplayQRCode