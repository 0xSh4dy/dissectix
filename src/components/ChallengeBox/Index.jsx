import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setChallenge } from "../../slices/challengeSlice";

export default function Challenge(props) {
  const navigate = useNavigate();
  const [solves, setSolves] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props.challenge)
    const solvePercentage = props.challenge.solve_percentage;
    const solveCount = Object.values(solvePercentage).filter((percentage) => percentage === 100).length;
    setSolves(solveCount);
  }, [props.challenge.solve_percentage]);

  const startChallenge = (challengeData) => {
    dispatch(setChallenge({
      "chall_id":challengeData.chall_id,
      "name":challengeData.name,
      "code":challengeData.code,
      "functions":challengeData.functions,
      "language":challengeData.language
    }))
    navigate(`/challenge/${challengeData.chall_id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} padding="16px">
      <Box
        sx={{
          overflow:"auto",
          backgroundColor: "#F5F5F5", // Light gray background
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          textAlign: "center",
          maxHeight:"80vh",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: "#E5F3F8", // Light blue background on hover
          },
        }}
      >
        <Typography color="#3CBAE6" variant="h4" gutterBottom>
          {props.challenge.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {props.challenge.description}
        </Typography>
        <Typography color="primary" variant="h6">
          Solves: {solves}
        </Typography>
        <Typography color="primary" variant="h6">
          Max Points: {props.challenge.points}
        </Typography>
        <Box sx={{ marginTop: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => startChallenge(props.challenge)}
            sx={{ marginRight: "8px",marginBottom:"5px" }}
          >
            Start
          </Button>
          <Button onClick={()=>{
            window.location.href = props.challenge.file_url;
          }} variant="contained" color="secondary">
            Download
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
