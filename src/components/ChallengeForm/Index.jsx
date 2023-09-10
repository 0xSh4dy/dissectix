import React, { useState } from "react";
import "./challengeForm.css";
import styled from "styled-components";

import {
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectToken } from "../../slices/tokenSlice";
import { CHALLENGE_URL } from "../../constants";
import { Message } from "@mui/icons-material";
import { Editor } from "@monaco-editor/react";

const StyledContainer = styled(Container)`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Heading = styled(Typography)`
  color: #3498db;
  margin-bottom: 20px;
`;

const RoundedButton = styled.button`
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

const UsedDivision = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const TagButton = styled(RoundedButton)`
  background-color: #2ecc71;
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
`;

const DifficultyLabel = styled(InputLabel)`
  /* Custom styles for Difficulty label */
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export default function ChallengeForm() {
  const [tags, setTags] = useState([]);
  const [code, setCode] = useState("");
  const token = useSelector(selectToken);
  const [isSubmitting,setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    difficulty: "easy",
    description: "",
    language: "c",
  });



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fnStr = "";
    for (let fn of tags) {
      fnStr += fn + "|";
    }
    fnStr = fnStr.substring(0, fnStr.length - 1);
    formData.functions = fnStr;
    formData.code = code;

    if (formData.name == "") {
      alert("Name cannot be empty");
      return;
    }
    else if (formData.description == "") {
      alert("Desciption cannot be empty");
      return;
    }
    else if (formData.code == "") {
      alert("Code cannot be empty");
      return;
    }
    else if (tags.length == 0) {
      alert("Functions cannot be empty");
      return;
    }
    setSubmitting(true);

    const response = await fetch(CHALLENGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify(formData)
    });
    if (response.status != 200) {
      setSubmitting(false);
      alert(response.statusText)
    }
    else {
      setSubmitting(false);
      let data = await response.json();
      if (data.error == "true") {
        alert(data.detail)
      }
      else {
        alert("Challenge created");
      }
    }
  };

  const removeTag = (tag) => {
    const newArray = tags.filter((element) => element !== tag);
    setTags(newArray);
  };

  const handleFunctionChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value === "") {
        window.alert("Please enter a function: ");
      } else {
        if (!tags.includes(e.target.value)) {
          setTags((prev) => [...prev, e.target.value]);
        }
      }
      e.target.value = "";
    }
  };

  const renderButtons = () => {
    let counter = 0;

    return tags.map((tag, index) => {
      counter++;
      return (
        <TagButton
          key={index}
          className="rounded-button"
          onClick={() => removeTag(tag)}
        >
          {tag}
        </TagButton>
      );
    });
  };





  function Loading(){
    return <div>
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
      </div>
  }
  return (
  <StyledContainer maxWidth="sm"  >
    {isSubmitting?<Loading/>:null}
      <Heading variant="h4" gutterBottom >
        Create Challenge
      </Heading>
      <form onSubmit={handleSubmit} >

        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Input
              label="Challenge Name"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              inputProps={{ maxLength: 40 }}

              helperText={`${formData.name.length} / 40 characters`}
            />


          </Grid>
          <Grid item xs={12}>
            <StyledFormControl>
              <InputLabel htmlFor="language">Programming Language</InputLabel>
              <Select
                name="language"
                value={formData.language}
                onChange={handleChange}
                label="Programming Language"
              >
                <MenuItem value="c">C</MenuItem>
                <MenuItem value="c++">C++</MenuItem>
                <MenuItem value="rust">Rust</MenuItem>
                {/* <MenuItem value="go">Go</MenuItem> */}
              </Select>
            </StyledFormControl>
          </Grid>
          <Grid item xs={12}>
            {/* <Input fullWidth label="Code" maxRows={10} multiline />
             */}
            <p style={{ textAlign: "left" }}>Code</p>
            <Editor onChange={(value) => { setCode(value) }} theme="light" language={formData.language != "" ? formData.language : "c"} height="40vh" style={{ overflow: "auto" }} defaultValue="// Type your code here" />
          </Grid>
          <Grid item xs={12}>
            <Input
              fullWidth
              label="Description"
              multiline maxRows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              inputProps={{ maxLength: 200 }}
              helperText={`${formData.description.length} / 200 characters`}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              fullWidth
              label="Functions"
              maxRows={10}
              multiline
              placeholder="Type function name and press enter"
              onKeyDown={handleFunctionChange}

            />

          </Grid>

          <div className="used_division">
            <StyledGrid>{renderButtons()}</StyledGrid>
          </div>
          <Grid item xs={12}>
            <StyledFormControl>
              <InputLabel htmlFor="difficulty">Difficulty</InputLabel>
              <Select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                label="Difficulty"
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </StyledFormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" > Submit
            </Button>
          </Grid>
        </Grid>
      </form>

    </StyledContainer>
  );
}
