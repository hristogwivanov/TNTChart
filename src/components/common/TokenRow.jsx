import { useState } from "react";
import Modal from "./Modal"; // Import your custom modal
import { checkImg, formatNumber, removeW } from "../../utils/funcs";
import { svg2img } from "../../utils/randomAvatar";
import "./style.css";

const TokenRow = ({ data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Prepare the essential data
  const essentialData = {
    Name: data.name,
    Symbol: removeW(data.symbol),
    "Derived USD Price": `$${data.derivedUSD}`,
    "Trade Volume USD": `$${formatNumber(data.tradeVolumeUSD * 1)}`,
    "Total Liquidity USD": `$${formatNumber(data.totalLiquidityUSD * 1)}`,
    "Trade Volume": formatNumber(data.tradeVolume * 1),
    "Total Liquidity": formatNumber(data.totalLiquidity * 1),
    "Transactions Count": data.txCount,
  };

  // Determine the logo source
  const logoSrc = data.logo
    ? `https://assets.thetatoken.org/tokens/${data.logo}`
    : svg2img(data);

  return (
    <>
      <tr onClick={openModal} style={{ cursor: "pointer" }}>
        <td
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-center",
            paddingTop: "20px",
            paddingBottom: "0px",
            borderCollapse: "collapse",
            borderColor: "black",
            paddingLeft: "80px",
            alignItems: "center",
          }}
          className="token-header"
        >
          <img
            src={
              data.logo
                ? `https://assets.thetatoken.org/tokens/${data.logo}`
                : svg2img(data)
            }
            style={
              data.logo
                ? { width: "20px", marginRight: "10px" }
                : { width: "20px", marginRight: "10px", borderRadius: "50%" }
            }
            alt={data.symbol}
          />
          <div className="font-header" style={{ marginRight: "3px" }}>
            {removeW(data.symbol)}
          </div>
          <span
            className="font-regular"
            style={{
              fontSize: "small",
              color: "#449782",
            }}
          >
            {"+" +
              (data.tradeVolumeETH * 1
                ? (
                    ((data.volume24HrsETH * 1) / (data.tradeVolumeETH * 1)) *
                    100
                  ).toFixed(2)
                : "0") +
              "%"}
          </span>
        </td>
        <td style={{ textAlign: "start" }} className="font-regular">
          {"$" + data.derivedUSD}
        </td>
        <td style={{ textAlign: "start" }} className="font-regular">
          ${formatNumber(data.tradeVolumeUSD * 1)}
        </td>
        <td style={{ textAlign: "start" }} className="font-regular">
          {"$" + formatNumber(data.totalLiquidityUSD * 1)}
        </td>
        <td style={{ textAlign: "start" }} className="font-regular">
          {"$" + formatNumber(data.tradeVolume * 1)}
        </td>
        <td
          style={{ textAlign: "start", paddingRight: "80px" }}
          className="font-regular"
        >
          {"2yr 3mon"}
        </td>
      </tr>

      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="modal-content-wrapper">
          {/* Logo at the top */}
          <div className="modal-logo">
            <img
              src={logoSrc}
              alt={data.name}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "20px",
              }}
            />
          </div>
          {/* Token Name and Symbol */}
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
            {data.name} ({removeW(data.symbol)})
          </h2>
          {/* Essential Information */}
          <table className="data-table">
            <tbody>
              {Object.entries(essentialData).map(([key, value]) => (
                <tr key={key}>
                  <td
                    className="font-regular"
                    style={{
                      textAlign: "start",
                      fontWeight: "bold",
                      padding: "8px",
                    }}
                  >
                    {key}
                  </td>
                  <td
                    className="font-regular"
                    style={{ textAlign: "start", padding: "8px" }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Close Button */}
          <button onClick={closeModal} className="close-button">
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TokenRow;
