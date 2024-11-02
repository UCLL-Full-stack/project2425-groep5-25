import { Color } from "@types";

export const formatOptionLabel = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: value,
        marginRight: "10px",
      }}
    />
    <span>{label}</span>
  </div>
);

export const hexToColorNameMap = Object.entries(Color).reduce(
  (acc, [name, hex]) => ({ ...acc, [hex]: name }),
  {} as { [key: string]: string }
);
