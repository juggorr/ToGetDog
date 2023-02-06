import { DoubleOptionBtnItem } from "../styles/BtnsEmotion";

const OptionBtn = ({ btn_id, text, onClick, isSelected }) => {
  return (
    <>
      <DoubleOptionBtnItem
        onClick={() => onClick(btn_id)}
        className={[
          "double-option-btn",
          isSelected ? "double-option-btn-on" : "double-option-btn-off",
        ].join(" ")}>
        {text}
      </DoubleOptionBtnItem>
    </>
  );
};

export default OptionBtn;