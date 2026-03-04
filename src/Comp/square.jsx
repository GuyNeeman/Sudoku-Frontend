export default function Square({ value, onChange }) {
    const handleChange = (e) => {
        const val = e.target.value;

        // Allow empty string (so user can delete)
        if (val === "") {
            onChange("");
            return;
        }

        // Only allow digits 1–9
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
                fontWeight: 'bold',
                resize: "none",
                width: "50px",
                height: "50px",
                textAlign: "center",
                fontSize: "24px",
                lineHeight: "50px",
                caretColor: "transparent"
            }}
        />
    );
}