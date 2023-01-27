import { OptionBtnItem } from "../styles/BtnsEmotion";

const OptionBtn = ({ btn_id, text, onClick, isSelected }) => {
  return (
    <>
      <OptionBtnItem
        onClick={() => onClick(btn_id)}
        className={[
          "option-btn",
          isSelected ? "option-btn-on" : "option-btn-off",
        ].join(" ")}>
        {text}
      </OptionBtnItem>
    </>
  );
};

export default OptionBtn;
