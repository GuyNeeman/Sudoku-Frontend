import { useEffect, useState } from "react";
import "./App.css";
import Square from "./Comp/square.jsx";
import StartScreen from "./Comp/StartScreen.jsx";
import Number from "./Comp/Number.jsx";

function App() {
    const size = 9;
    const boxes = size * size;

    const [squares, setSquares] = useState(Array(boxes).fill(""));
    const [given, setGiven] = useState(Array(boxes).fill(false));
    const [difficulty, setDifficulty] = useState(null);
    const [solution, setSolution] = useState([]);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showLoader, setShowLoader] = useState(false);

    async function getSudoku(diff) {
        try {
            setLoading(true);
            setProgress(0);

            // Fake progress loop
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += Math.random() * 10;

                if (currentProgress >= 90) {
                    currentProgress = 90; // stop at 90% until API finishes
                    clearInterval(interval);
                }

                setProgress(Math.floor(currentProgress));
            }, 200);

            const res = await fetch(`https://sudokuapi-1.onrender.com/api/sudoku/create/${diff}`);
            const data = await res.json();

            clearInterval(interval);

            // finish progress smoothly
            setProgress(100);

            const puzzle = data.puzzle;
            const solution = data.solution;

            const formatted = puzzle.map(n => (n === 0 ? "" : String(n)));

            setSquares(formatted);
            setGiven(formatted.map(v => v !== ""));
            setSolution(solution.map(n => String(n)));
            setChecked(false);

            // small delay so user sees 100%
            setTimeout(() => {
                setLoading(false);
            }, 300);

        } catch (err) {
            console.error("Failed to load sudoku", err);
            setLoading(false);
        }
    }

    //To Do: Kommentar, Anzeigen was wo

    useEffect(() => {
        if (difficulty !== null) {
            getSudoku(difficulty);
        }
    }, [difficulty]);

    useEffect(() => {
        let timeout;

        if (loading) {
            // only show loader after 300ms
            timeout = setTimeout(() => {
                setShowLoader(true);
            }, 300);
        } else {
            setShowLoader(false);
        }

        return () => clearTimeout(timeout);
    }, [loading]);

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

            {difficulty === null && (
                <StartScreen setDifficulty={setDifficulty} />
            )}

            {showLoader && (
                <div className="loading">
                    <p>Generating Sudoku...</p>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <p>{progress}%</p>
                </div>
            )}

            {!loading && difficulty !== null && (
                <>
                    <Number squares={squares} />

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

                    <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
                        Check Results
                    </button>
                </>
            )}
        </div>
    );
}

export default App;