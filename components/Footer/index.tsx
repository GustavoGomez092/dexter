import React from 'react';

export default function Footer() {
  const calculateYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className='py-5 text-center text-gray-600'>
      <p>
        Dexter - Code Challenges for Job applicants ⓒ Copyright{' '}
        {calculateYear()}
      </p>
    </div>
  );
}
