import { useState } from 'react'
import './App.css'
import Square from "./Comp/square.jsx";

function App() {
    const size = 9;
    const boxes = size * size;
    const [squares, setSquares] = useState(Array(boxes).fill(""));

    function onChangeSquare(i, newValue) {
        setSquares(prev => {
            const copy = [...prev];
            copy[i] = newValue;
            return copy;
        });
    }

    return (
        <>
            <div
                className="grid"
                style={{
                    display: "grid",
                    gap: "5px",
                    gridTemplateColumns: `repeat(9, 60px)`,
                    gridTemplateRows: `repeat(9, 60px)`
                }}
            >
                {squares.map((value, i) => (
                    <Square
                        key={i}
                        value={value}
                        onChange={(val) => onChangeSquare(i, val)}
                    />
                ))}
            </div>
        </>
    )
}

export default App;