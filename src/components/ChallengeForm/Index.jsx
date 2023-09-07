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

export default function ChallengeForm() {
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        chall_id: "",
        author: "",
        is_public: false,
        file_url: "",
        points: 0,
        difficulty: "easy",
        language: "c",
        functions: "",
        code: "",
        description:""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here.
    };

    const removeTag = (tag) => {
        const newArray = tags.filter((element) => element !== tag);
        setTags(newArray);
    }
    const handleWordChange = (e) => {                 // For description
        const { name, value } = e.target;
        
        
        const wordCount = value.split(/\s+/).filter(Boolean).length;

        if (wordCount <= 200) {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
        
    };
    const handleCombinedChange = (e) => {
        handleChange(e); 
        handleDescriptionChange(e); // For Challenge Name 
    };


    const handleFunctionChange = (e)=>{
        if(e.key==='Enter'){
            e.preventDefault();
            if(e.target.value===''){
                window.alert('Please enter a function: ')
            }
            else{
                if(!tags.includes(e.target.value)){
                    setTags(prev=>[...prev,e.target.value])
                }
            }
            e.target.value='';
        }
    }

    const renderButtons = () => {
        let counter = 0;
    
        return tags.map((tag, index) => {
          counter++;
          return (
            <button
              key={index}
              className="rounded-button"
              onClick={() => removeTag(tag)}
            >
              {tag}
            </button>
          );
        });
      };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Create Challenge
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Challenge Name"
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleCombinedChange}
                            helperText={`${formData.name.length} / 40 characters`}
                            inputProps={{ maxLength: 40 }}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            label="Challenge ID"
                            fullWidth
                            name="chall_id"
                            value={formData.chall_id}
                            onChange={handleChange}
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Code"
                            maxRows={10}
                            multiline
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Functions"
                            maxRows={10}
                            multiline
                            placeholder="function1|function2"
                            onKeyDown={handleFunctionChange}
                        />
                    </Grid>

                    <div className="used_division">
      <StyledGrid>{renderButtons()}</StyledGrid>
    </div>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
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
                                <MenuItem value="go">Go</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
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
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            maxRows={10}
                            multiline
                            placeholder="Challenge Description"
                            name="description"
                            value={formData.description}
                            onChange={handleWordChange}
                            helperText={`${formData.description.length} / 200 characters`}
                            inputProps={{ maxLength: 200 }}
                           
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

const StyledContainer  = styled(Container)`

`;


const Heading  = styled(Typography)`
    color:white;
`;


const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Adjust the number of columns as needed */
  gap: 10px; /* Adjust the gap between buttons as needed */
`;


const Input = styled(TextField)`
    /* & label{
        color: white;
    }
    & div{
        border: 1px solid white;
        border-radius: 10px;
    }
         */
`;

const DifficultyLabel = styled(InputLabel)`
    /* color:white; */
`;


const StyledFormControl = styled(FormControl)`
    & div,svg{
        /* color: #740f0f; */
    }
`
