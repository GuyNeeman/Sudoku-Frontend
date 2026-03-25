import { useState } from "react";

export default function StartScreen({ setDifficulty }) {
    const [selected, setSelected] = useState("");

    function handleSubmit() {
        if (!selected) return;
        setDifficulty(selected);
        console.log(selected)
    }

    return (
        <>
            <p>Welcome to my Sudoku!</p>
            <p>Please choose a difficulty</p>

            <div style={{ display: "flex", gap: "1.5rem" }}>
                <label>
                    Easy
                    <input
                        type="radio"
                        value="easy"
                        name="difficulty"
                        onChange={(e) => setSelected(e.target.value)}
                    />
                </label>

                <label>
                    Medium
                    <input
                        type="radio"
                        value="medium"
                        name="difficulty"
                        onChange={(e) => setSelected(e.target.value)}
                    />
                </label>

                <label>
                    Hard
                    <input
                        type="radio"
                        value="hard"
                        name="difficulty"
                        onChange={(e) => setSelected(e.target.value)}
                    />
                </label>

                <label>
                    Impossible
                    <input
                        type="radio"
                        value="impossible"
                        name="difficulty"
                        onChange={(e) => setSelected(e.target.value)}
                    />
                </label>
            </div>

            <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
                Start Game
            </button>
        </>
    );
}