/* eslint-disable react/prop-types */
import "./WalletDetail.css";
import WalletButton from "./WalletButton";

const WalletDetail = ({
  title,
  amount,
  theme,
  buttontext,
  clickHandler,
  type,
}) => {
  return (
    <>
      <div className="box">
        <p className="boxheader">
          {title}:{" "}
          <span className={theme === "green" ? "green" : "red"}>
            &#8377;{amount}
          </span>
        </p>
        <WalletButton
          text={buttontext}
          color={theme}
          clickevent={clickHandler}
          type={type}
        />
      </div>
    </>
  );
};

export default WalletDetail;
