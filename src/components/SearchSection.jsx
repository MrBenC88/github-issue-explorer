import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import { useHistory } from "react-router-dom";

export const SearchSection = () => {
  const [search, setSearch] = useState("");
  const history = useHistory();

  //https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4

  const handleSearch = (query) => {
    console.log(`parse data and Call GitHub API:  ${query}`);
    const arr = query.split("/");

    // account for cases where url is invalid
    if (arr[0].includes("github.com")) {
      history.push({
        pathname: "/results",
        state: { owner: arr[1], repo: arr[2], test: 13 },
      });
    } else if (arr[0].includes("https:")) {
      history.push({
        pathname: "/results",
        state: { owner: arr[3], repo: arr[4] },
      });
    } else {
      alert("Invalid Repo URL");
    }
  };

  return (
    <div
      style={{
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "900px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <SearchBar
        value={""}
        onChange={(searchInput) => setSearch(searchInput)}
        onRequestSearch={() => handleSearch(search)}
        placeholder={"Paste a link to a GitHub repository!"}
      />
    </div>
  );
};
