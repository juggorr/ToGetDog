import React, { useEffect, useState } from 'react';
import DaumPostCode from 'react-daum-postcode';

const DaumKakaoAddress = (props) => {
  const handleComplete = (data) => {
    let dongName = data.bname;
    let sigunguCode = data.sigunguCode;

    console.log(dongName);
    console.log(sigunguCode);

    props.setData({
      ...props.data,
      address: dongName,
      sigunguCode: sigunguCode,
    });
  };

  return (
    <div>
      <DaumPostCode className='modal' autoClose onComplete={handleComplete}></DaumPostCode>
    </div>
  );
};

export default DaumKakaoAddress;
