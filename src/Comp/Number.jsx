import "./Number.css";

export default function Number({ squares }) {
    const totalPerNumber = 9;

    // count occurrences
    const counts = Array(9).fill(0);

    squares.forEach(val => {
        if (val !== "") {
            const num = parseInt(val, 10);
            if (num >= 1 && num <= 9) {
                counts[num - 1]++;
            }
        }
    });

    return (
        <div className="number-tracker">
            {counts.map((count, i) => {
                const remaining = totalPerNumber - count;
                const isComplete = remaining === 0;

                return (
                    <div
                        key={i}
                        className={`number-box ${isComplete ? "complete" : ""}`}
                    >
                        <span className="number">{i + 1}</span>
                    </div>
                );
            })}
        </div>
    );
}