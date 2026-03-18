export default function Square({ value, onChange, index }) {
    const row = Math.floor(index / 9);
    const col = index % 9;

    const handleChange = (e) => {
        const val = e.target.value;

        if (val === "") {
            onChange("");
            return;
        }

        if (/^[1-9]$/.test(val)) {
            onChange(val);
        }
    };

    const borderStyle = {
        borderTop: row % 3 === 0 ? "3px solid black" : "1px solid #999",
        borderLeft: col % 3 === 0 ? "3px solid black" : "1px solid #999",
        borderRight: col === 8 ? "3px solid black" : "",
        borderBottom: row === 8 ? "3px solid black" : "",
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            maxLength={1}
            style={{
                width: "60px",
                height: "60px",
                textAlign: "center",
                fontSize: "28px",
                fontWeight: "bold",
                outline: "none",
                color: "black",
                backgroundColor: value ? "rgb(110,109,109)" : "white",
                ...borderStyle
            }}
        />
    );
}