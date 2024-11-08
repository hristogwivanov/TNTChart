import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTokenListRequest } from "../redux/actions/tokenAction";
import TokenListLogo from "../assets/img/Tokenbar-Logo.png";
import TopTokenList from "./common/TopTokenList";
import TokenTable from "./TokenTable";
import LoginButton from "./common/LoginButton"; // Import the LoginButton component
import "./style.css";
import { createTheme, useMediaQuery } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext

// Rest of your TokenList code...

const TokenList = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1160,
        xl: 1560,
      },
    },
  });

  const { isAuthenticated, user } = useContext(AuthContext); // Access auth state
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const MediumScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [isMediumScreen, setIsMediumScreen] = useState(MediumScreen);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTokenListRequest());
  }, [fetchTokenListRequest]);

  const tokenList = useSelector((state) => state.tokenReducer.tokenList);
  const loading = useSelector((state) => state.tokenReducer.loading);
  const error = useSelector((state) => state.tokenReducer.error);

  const [filteredTokenList, setFilteredTokenList] = useState([...tokenList]);

  const sortedTokenList = tokenList.sort(
    (a, b) =>
      (b.volume24HrsETH * 1) / (b.tradeVolumeETH * 1) -
      (a.volume24HrsETH * 1) / (a.tradeVolumeETH * 1)
  );

  const limitedTokenList = sortedTokenList.slice(0, 10).map((item, index) => ({
    num: "#" + (index + 1),
    id: item.id,
    name: item.name,
    symbol: item.symbol,
    logo: item.logo,
    riserate: (
      ((item.volume24HrsETH * 1) / (item.tradeVolumeETH * 1)) *
      100
    ).toFixed(2),
  }));

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Select Token/Contract Address ⌄");

  useEffect(() => {
    setFilteredTokenList([...tokenList]);
  }, [tokenList, isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFilteredTokenList(
      [...tokenList].filter((obj) =>
        obj.symbol.toLowerCase().includes(e.target.value.toLowerCase()) ||
        obj.id.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const divRef = useRef(null);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      handleSaveClick();
    }
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setFilteredTokenList([...tokenList]);
    setText("Select Token/Contract Address ⌄");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
<div className="tokenlist-background font-header">
  <img
    src={TokenListLogo}
    alt="Token List Logo"
    className="token-list-logo"
  />
      <TopTokenList tokenList={limitedTokenList} />

      {/* Display greeting if user is authenticated */}
      <div className="greeting-container">
    {isAuthenticated && user && (
      <span className="greeting">Hi, {user.name}</span>
    )}
    <LoginButton />
  </div>

      <div
        className="dropdown-container font-header"
        style={{ position: "relative" }}
      >
        {isEditing ? (
          <input
            type="text"
            placeholder={text}
            className="dropdown-button"
            onChange={handleInputChange}
            style={{ fontFamily: "altivo" }}
            autoFocus
          />
        ) : (
          <button
            onClick={handleEditClick}
            className="dropdown-button"
            style={{ overflow: "hidden", fontFamily: "altivo" }}
          >
            {text}
          </button>
        )}
        {isEditing && (
          <div
            ref={divRef}
            style={{
              position: "absolute",
              top: "calc(45px)",
              transform: "translateX(-50%)",
              width: isLargeScreen ? "60vw" : "100vw",
              backgroundColor: "#191919",
              padding: "10px",
              borderRadius: "5px",
              zIndex: "50",
              color: "white",
              border: `2px solid transparent`,
              left: isLargeScreen ? "-13vw" : "-37vw",
            }}
          >
            <TokenTable tokenData={filteredTokenList} />
          </div>
        )}
      </div>
    </div>
  );
};

export { TokenList };
