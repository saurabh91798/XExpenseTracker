import "./WalletButton.css";

const WalletButton = ({ text, color, clickevent, type }) => {
  return (
    <>
      <button
        className={`btn ${color === "green" ? "addincome" : "addexpense"}`}
        onClick={() => {
          clickevent(type);
        }}
      >
        {text}
      </button>
    </>
  );
};

export default WalletButton;
