import React, { useEffect, useState } from "react";
import DaumPostCode from "react-daum-postcode";

const DaumKakaoAddress = (props) => {
  const handleComplete = (data) => {
    let address = data.sido + " " + data.sigungu + " " + data.bname;
    let sigunguCode = data.sigunguCode;

    props.setData({
      ...props.data,
      address: address,
      sigunguCode: sigunguCode,
    });

    props.setError(true);
    props.setErrorMsg("");
    props.setPopup(!props.popup);
  };

  return (
    <div>
      <DaumPostCode
        className="modal"
        autoClose
        onComplete={handleComplete}></DaumPostCode>
    </div>
  );
};

export default DaumKakaoAddress;
