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
                fontSize: "26px",
                fontWeight: "bold",
                border: "1px solid black",

                borderRight: col % 3 === 2 && col !== 8 ? "3px solid black" : "1px solid black",
                borderBottom: row % 3 === 2 && row !== 8 ? "3px solid black" : "1px solid black",

                outline: "none"
            }}
        />
    );
}