import { useEffect, useState } from "react";
import "./App.css";
import Square from "./Comp/square.jsx";

function App() {
    const size = 9;
    const boxes = size * size;

    const [squares, setSquares] = useState(Array(boxes).fill(""));

    useEffect(() => {
        async function getSudoku() {
            try {
                const res = await fetch("http://localhost:8080/api/sudoku/create");
                const data = await res.json();

                // convert numbers -> strings and 0 -> ""
                const formatted = data.map(n => (n === 0 ? "" : String(n)));

                setSquares(formatted);
                console.log(formatted);
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
                        onChange={(val) => onChangeSquare(i, val)}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;