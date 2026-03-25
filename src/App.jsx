import { useEffect, useState } from "react";
import "./App.css";
import Square from "./Comp/square.jsx";
import StartScreen from "./Comp/StartScreen.jsx";

function App() {
    const size = 9;
    const boxes = size * size;

    const [squares, setSquares] = useState(Array(boxes).fill(""));
    const [given, setGiven] = useState(Array(boxes).fill(false));
    const [difficulty, setDifficulty] = useState(null);
    const [solution, setSolution] = useState([]);
    const [checked, setChecked] = useState(false);

    async function getSudoku(diff) {
        try {
            const res = await fetch(`http://localhost:8080/api/sudoku/create/${diff}`);
            const data = await res.json();

            const puzzle = data.puzzle;
            const solution = data.solution;

            const formatted = puzzle.map(n => (n === 0 ? "" : String(n)));

            setSquares(formatted);
            setGiven(formatted.map(v => v !== ""));
            setSolution(solution.map(n => String(n)));
            setChecked(false);

        } catch (err) {
            console.error("Failed to load sudoku", err);
        }
    }

    useEffect(() => {
        if (difficulty !== null) {
            getSudoku(difficulty);
        }
    }, [difficulty]);

    function handleSubmit() {
        setChecked(true);
    }


    function onChangeSquare(i, newValue) {
        setSquares(prev => {
            const copy = [...prev];
            copy[i] = newValue;
            return copy;
        });

        setChecked(false);
    }

    return (
        <div className="app">
            <h1>Sudoku</h1>

            {difficulty==null && (
            <StartScreen setDifficulty={setDifficulty}/>
            )}
            {difficulty!==null && (
                <>
                    <div className="grid">
                        {squares.map((value, i) => (
                            <Square
                                key={i}
                                index={i}
                                value={value}
                                isGiven={given[i]}
                                solutionValue={solution[i]}
                                checked={checked}
                                onChange={(val) => onChangeSquare(i, val)}
                            />
                        ))}
                    </div>
                    <button onClick={handleSubmit} style={{marginTop: "1rem"}}>
                        Check Results
                    </button>
                </>
            )}
        </div>
    );
}

export default App;