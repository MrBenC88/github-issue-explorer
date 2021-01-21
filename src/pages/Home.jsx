import React from "react";
import { Typography } from "@material-ui/core";
import { SearchSection } from "../components/SearchSection";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

export const Home = () => {
  const { width, height } = useWindowDimensions();
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        width,
        height,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `url("https://i.imgur.com/LKFYqnQ.jpg")`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "cover",
      }}
    >
      {" "}
      <div
        style={{
          width: "90%",
          maxWidth: "90%",
          height: "90%",
        }}
      >
        <img
          src={"https://i.imgur.com/1zz0uc8.png"}
          height="30%"
          alt="logo"
          style={{ marginTop: 20 }}
        />
        <Typography
          variant="h4"
          style={{ marginBottom: 20, color: "white", fontFamily: "Montserrat" }}
        >
          GitHub Issue Explorer
        </Typography>
        <SearchSection />
        <Typography
          variant="h6"
          style={{
            marginBottom: 80,
            marginTop: 20,
            color: "white",
            fontFamily: "Montserrat",
          }}
        >
          View issues quicker, easier, and more conveniently.
        </Typography>
      </div>
    </div>
  );
};
