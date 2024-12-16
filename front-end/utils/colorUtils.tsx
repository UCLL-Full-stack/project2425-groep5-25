import { Color } from '@types';

// export const formatOptionLabel = ({ label, value }: { label: string; value: string }) => (
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//         <div
//             style={{
//                 width: '20px',
//                 height: '20px',
//                 borderRadius: '50%',
//                 backgroundColor: value,
//                 marginRight: '10px',
//             }}
//         />
//         <span>{label}</span>
//     </div>
// );

export const formatOptionLabel = ({ label, color }: { label: string; color: string }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
            style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: color,
                marginRight: '10px',
            }}
        />
        <span>{label}</span>
    </div>
);

export const hexToColorNameMap = Object.entries(Color).reduce(
    (acc, [name, hex]) => ({ ...acc, [hex]: name }),
    {} as { [key: string]: string },
);

export const getColorName = (hex: string): string => {
    return hexToColorNameMap[hex] || 'Unknown';
};

export const hexToRgba = (hex: string, alpha: number): string => {
    const sanitizedHex = hex.replace('#', '');

    const r = parseInt(sanitizedHex.substring(0, 2), 16);
    const g = parseInt(sanitizedHex.substring(2, 4), 16);
    const b = parseInt(sanitizedHex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getColorEnumFromHex = (hex: string): Color | null => {
    const colorName = getColorName(hex);
    return Color[colorName as keyof typeof Color] || null;
};
