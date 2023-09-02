import React, { useState } from "react";
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
    const [formData, setFormData] = useState({
        name: "",
        chall_id: "",
        author: "",
        is_public: false,
        file_url: "",
        points: 0,
        difficulty: "easy",
        language: "",
        functions: "",
        code: "",
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
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Challenge ID"
                            fullWidth
                            name="chall_id"
                            value={formData.chall_id}
                            onChange={handleChange}
                        />
                    </Grid>
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
                        />
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
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
