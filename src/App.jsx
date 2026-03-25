import { useEffect, useState } from "react";
import "./App.css";
import Square from "./Comp/square.jsx";

function App() {
    const size = 9;
    const boxes = size * size;

    const [squares, setSquares] = useState(Array(boxes).fill(""));

    const [given, setGiven] = useState(Array(boxes).fill(false));

    useEffect(() => {
        async function getSudoku() {
            try {
                const res = await fetch(`http://localhost:8080/api/sudoku/create/impossible`);
                const data = await res.json();

                const puzzle = data.puzzle;
                const solution = data.solution;

                const formatted = puzzle.map(n => (n === 0 ? "" : String(n)));

                setSquares(formatted);
                setGiven(formatted.map(v => v !== ""));


            } catch (err) {
                console.error("Failed to load sudoku", err);
            }
        }

        getSudoku();
    }, []);

    function onChangeSquare(i, newValue) {
        setSquares(prev => {
            const copy = [...prev];
            copy[i] = newValue;
            return copy;
        });
    }

    return (
        <div className="app">
            <h1>Sudoku</h1>

            <div className="grid">
                {squares.map((value, i) => (
                    <Square
                        key={i}
                        index={i}
                        value={value}
                        isGiven={given[i]}
                        onChange={(val) => onChangeSquare(i, val)}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;