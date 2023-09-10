import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../slices/tokenSlice";
import { useNavigate } from "react-router-dom";
import ChallengeForm from "../ChallengeForm/Index";
import { CHALLENGE_URL } from "../../constants";
import Challenge from "../ChallengeBox/Index";
import { Box, Button, Grid, Hidden, Select, Typography } from "@mui/material";

export default function Dashboard() {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const [start, setStart] = useState(0);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    if (token === "") {
      navigate("/login");
    } else {
      const challFetchingUrl = CHALLENGE_URL + "?" + new URLSearchParams({
        start: start,
        end: start + 20,
      });
      fetch(challFetchingUrl, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          data = JSON.parse(data.detail);
          setChallenges(data);
        })
        .catch((err) => console.log(err));
    }
  }, [start]);

  const nextText = ">>"; //Next >>
  const prevText = "<< "; // << Previous

  const nextEnable = challenges.length > 20;
  return (
    <div style={{ overflow: "hidden" }}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="stretch"
        marginTop="2px"
        marginLeft="2px"
        
      >
        {challenges.map((challenge) => (
          <Challenge key={challenge.id} challenge={challenge} />
        ))}
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="2rem"
      >
        <Button
          onClick={() => {
            if (start - 20 >= 0) {
              setStart(start - 20);
            } else {
              setStart(0);
            }
          }}
          variant="contained"
          style={{ width: "1%", marginRight: "1rem" }}
        >
          {prevText}
        </Button>
        <Typography
          margin="1rem"
          display="inline"
          color="textSecondary"
          variant="h6"
        >
          Page {start / 20 + 1}
        </Typography>
        {/* {nextEnable && ( */}
          <Button
            onClick={() => {
              setStart(start + 20);
            }}
            variant="contained"
            style={{ width: "1%", marginLeft: "1rem" }}
          >
            {nextText}
          </Button>
        {/* )} */}
      </Box>
    </div>
  );
}