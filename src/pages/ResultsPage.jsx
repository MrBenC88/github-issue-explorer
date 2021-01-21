import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import Pagination from "@material-ui/lab/Pagination";
import {
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Link,
  Card,
  Tooltip,
  GridList,
  GridListTile,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  ListItem,
  List,
} from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import IssueClosedIcon from "../assets/icons/issue-closed.svg";
import PullRequestIcon from "../assets/icons/pull-request.svg";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import DehazeOutlinedIcon from "@material-ui/icons/DehazeOutlined";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Montserrat",
    color: "#000000",
  },
  paginationStyles: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export const ResultsPage = (props) => {
  const location = useLocation();
  const { width, height } = useWindowDimensions();
  const [queriedData, setQueriedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [value, setValue] = React.useState("all");
  const [pageNum, setPageNum] = React.useState(1);

  const [currentView, setCurrentView] = React.useState("gridView");
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleViewChange = (viewType) => {
    setCurrentView(viewType);
  };

  // /repos/{owner}/{repo}/issues
  // https://api.github.com/repos/{owner}/{repo}
  // https://docs.github.com/en/rest/reference/issues#list-repository-issues

  //https://api.github.com/repos/facebook/react/issues?state=open

  const fetchData = async () => {
    try {
      let apiValue = value;
      if (apiValue === "pullrequests") {
        apiValue = "all";
      }
      const response = await fetch(
        `https://api.github.com/repos/${location.state.owner}/${location.state.repo}/issues?state=${apiValue}&page=${pageNum}&per_page=21`
      );
      const json = await response.json();
      if (json.message) throw new Error(json.message);
      setQueriedData(json);
    } catch (err) {
      console.log(err);
      setQueriedData([]);
    }
  };

  const handlePaginationChange = (event, currentPage) => {
    setPageNum(currentPage);
  };

  // useeffect when value changes when u click bottom thigny
  // call fetch data in that useefffect or when the page num changes also call fetch data
  // pagination to change page number - onclick change pagenum react hook

  useEffect(() => {
    // api call - this api call was deceptively simple. it was actually hard af? wtf
    (async () => {
      await fetchData();
    })();
  }, [location, value, pageNum]);

  useEffect(() => {
    setFilteredData(
      queriedData?.filter(
        (mapDatum) =>
          value === "all" ||
          mapDatum.state === value ||
          (mapDatum.pull_request &&
            value === "pullrequests" &&
            mapDatum.pull_request != "closed")
      )
    );
  }, [queriedData, value]);

  useEffect(() => {
    console.log(queriedData);
  }, [queriedData]);

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        width,
        height,
        flexDirection: "column",
        background: `url("https://i.imgur.com/LKFYqnQ.jpg")`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "cover",
      }}
    >
      <AppBar position="static" style={{ background: "#ffffff" }}>
        <Toolbar>
          <IconButton edge="start" href="/home">
            <img src="https://i.imgur.com/ZvYGIbA.png" height="20px" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            GitHub Issue Explorer
          </Typography>
          <Button color="#000000" href="/">
            New Search
          </Button>
        </Toolbar>
      </AppBar>{" "}
      <div
        style={{
          height: "100%",
          marginTop: "5px",
          overflowY: "scroll",
        }}
      >
        <div style={{ float: "right" }}>
          <Link onClick={() => handleViewChange("gridView")}>
            <Tooltip arrow title={"Grid View"} placement="bottom-end">
              <AppsOutlinedIcon fontSize="large" style={{ color: "white" }} />
            </Tooltip>
          </Link>

          <Link onClick={() => handleViewChange("listView")}>
            <Tooltip arrow title={"List View"} placement="bottom-end">
              <DehazeOutlinedIcon fontSize="large" style={{ color: "white" }} />
            </Tooltip>
          </Link>
        </div>

        <Typography
          variant="h6"
          style={{ marginBottom: 20, color: "white", fontFamily: "Montserrat" }}
        >
          Current Repo: {location.state.owner} / {location.state.repo}
        </Typography>

        {currentView == "gridView" ? (
          <GridList
            cols={3}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            {filteredData.map((mapDatum, index) => {
              return (
                <GridListTile key={index}>
                  <Card
                    style={{
                      height: "200px",
                      overflowY: "scroll",
                      background: "#ebf7ff",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={index}
                        height="10"
                        image="https://i.imgur.com/LKFYqnQ.jpg"
                        title="banner"
                      />

                      <CardContent>
                        {(mapDatum.pull_request &&
                          mapDatum.state != "closed") ||
                        (mapDatum.state == "open" && mapDatum.pull_request) ? (
                          <span>
                            <Typography>Pull Request</Typography>{" "}
                            <img src={PullRequestIcon} height="20px" />
                          </span>
                        ) : mapDatum.state === "closed" ||
                          value === "closed" ? (
                          <span>
                            <Typography> Closed</Typography>
                            <img src={IssueClosedIcon} height="20px" />
                          </span>
                        ) : (
                          <span>
                            {" "}
                            <Typography> Issue</Typography>
                          </span>
                        )}
                        <Typography variant="h6">
                          #{mapDatum.number} | State: {mapDatum.state}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <b>{mapDatum.title}</b>

                          <br />
                          {!mapDatum.body
                            ? "No issue description."
                            : mapDatum.body}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        href={mapDatum.html_url}
                        style={{ paddingBottom: "15px" }}
                      >
                        Issue URL
                      </Button>
                    </CardActions>
                  </Card>
                </GridListTile>
              );
            })}
          </GridList>
        ) : (
          <List>
            {filteredData.map((mapDatum, index) => {
              return (
                <ListItem primary={index}>
                  <Card
                    style={{
                      height: "200px",
                      overflowY: "scroll",
                      background: "#ebf7ff",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={index}
                        height="10"
                        image="https://i.imgur.com/LKFYqnQ.jpg"
                        title="banner"
                      />

                      <CardContent>
                        {(mapDatum.pull_request &&
                          mapDatum.state != "closed") ||
                        (mapDatum.state == "open" && mapDatum.pull_request) ? (
                          <span>
                            <Typography>Pull Request</Typography>{" "}
                            <img src={PullRequestIcon} height="20px" />
                          </span>
                        ) : mapDatum.state === "closed" ||
                          value === "closed" ? (
                          <span>
                            <Typography> Closed</Typography>
                            <img src={IssueClosedIcon} height="20px" />
                          </span>
                        ) : (
                          <span>
                            {" "}
                            <Typography> Issue</Typography>
                          </span>
                        )}
                        <Typography variant="h6">
                          #{mapDatum.number} | State: {mapDatum.state}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <b>{mapDatum.title}</b>

                          <br />
                          {!mapDatum.body
                            ? "No issue description."
                            : mapDatum.body}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        href={mapDatum.html_url}
                        style={{ paddingBottom: "15px" }}
                      >
                        Issue URL
                      </Button>
                    </CardActions>
                  </Card>
                </ListItem>
              );
            })}
          </List>
        )}
      </div>
      <div
        className={classes.paginationStyles}
        style={{
          background: "#FFFFFF",
          marginBottom: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={10}
          color="primary"
          size="large"
          onChange={handlePaginationChange}
          variant="outlined"
          style={{ marginTop: 0 }}
        />{" "}
      </div>
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction
          label="All"
          icon={<RestoreIcon />}
          value="all"
        />
        <BottomNavigationAction
          label="Open"
          icon={<FavoriteIcon />}
          value="open"
        />
        <BottomNavigationAction
          label="Closed"
          icon={<CloseOutlinedIcon />}
          value="closed"
        />
        <BottomNavigationAction
          label="Pull Requests"
          icon={<InfoOutlinedIcon />}
          value="pullrequests"
        />
      </BottomNavigation>
    </div>
  );
};
