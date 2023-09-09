import React, { useEffect, useState } from "react";
import { PROFILE_URL } from "../../constants";
import { Link, useLocation } from "react-router-dom";
import { Typography, Container, Grid, Paper } from "@mui/material";
import "./Profile.css"; // Import the external CSS file

export default function Profile() {
  const location = useLocation();
  const [solvedChallenges, setSolvedChallenges] = useState([]);
  const [userName, setUserName] = useState("");
  const [createdChallenges, setCreatedChallenges] = useState([]);

  useEffect(() => {
    let username = location.pathname.split("/")[2];
    setUserName(username);
    fetch(PROFILE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        let detail = JSON.parse(data.detail);
        let solvedChalls = detail.solved_challenges;
        let challIds = Object.keys(solvedChalls);
        solvedChalls = [];
        for (let challId of challIds) {
          let challName = detail.solved_challenges[challId];
          solvedChalls.push({ name: challName, id: challId });
        }
        setSolvedChallenges(solvedChalls);
        let createdChallenges = [];
        for (let challId of Object.keys(detail.created_challenges)) {
          let challName = detail.created_challenges[challId];
          createdChallenges.push({ name: challName, id: challId });
        }
        setCreatedChallenges(createdChallenges);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <Container className="container">
      <Typography variant="h4" className="profileHeader" gutterBottom>
        {userName}'s Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Paper className="paper">
            <Typography variant="h5" className="header">
              Created Challenges
            </Typography>
            {createdChallenges.map((chall) => (
              <Typography
                key={chall.id}
                className="challengeItem"
                variant="body1"
              >
                <Link to={`/challenge/${chall.id}`}>{chall.name}</Link>
              </Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper className="paper">
            <Typography variant="h5" className="header">
              Solved Challenges
            </Typography>
            {solvedChallenges.map((chall) => (
              <Typography
                key={chall.id}
                className="challengeItem"
                variant="body1"
              >
                <Link to={`/challenge/${chall.id}`}>{chall.name}</Link>
              </Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
