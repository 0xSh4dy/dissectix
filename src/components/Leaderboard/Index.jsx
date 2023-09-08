import React, { useEffect, useState } from "react";
import { LEADERBOARD_URL } from "../../constants";
import "./Leaderboard.css"; // Import a separate CSS file for your styling
import { Link, useNavigate } from "react-router-dom";

export default function Leaderboard() {
    const [userScoreData, setUserScoreData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(LEADERBOARD_URL)
            .then(response => response.json())
            .then(data => {
                data = JSON.parse(data.detail);
                setUserScoreData(data);
            })
            .catch(err => alert(err));
    }, []);

    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {userScoreData.map((user, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                            <td>{index + 1}</td>
                            <td className="hoverptr" onClick={(e)=>{
                                navigate(`/profile/${user.username}`);
                            }}>
                               {user.username}
                            </td>
                            <td>{user.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
