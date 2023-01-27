import { useState } from 'react';

const OptionBtn = ({ text }) => {
  const [btnState, setBtnState] = useState('false');

  const clickOptionBtn = () => {
    btnState = !btnState;
  };

  return (
    <>
      <div onClick={clickOptionBtn}>{text}</div>
    </>
  );
};
