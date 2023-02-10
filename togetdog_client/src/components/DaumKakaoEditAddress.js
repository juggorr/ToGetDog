import React, { useEffect, useState } from 'react';
import DaumPostCode from 'react-daum-postcode';

const DaumKakaoEditAddress = (props) => {
  const handleComplete = (data) => {
    let address = data.sido + ' ' + data.sigungu + ' ' + data.bname;
    let sigunguCode = data.sigunguCode;

    console.log(address);
    console.log(sigunguCode);

    props.setData({
      ...props.data,
      address: address,
      sigunguCode: sigunguCode,
    });

    props.setError();
    props.setErrorMsg('');
    props.setPopup(!props.popup);
  };

  return (
    <div>
      <DaumPostCode className='modal' autoClose onComplete={handleComplete}></DaumPostCode>
    </div>
  );
};

export default DaumKakaoEditAddress;
