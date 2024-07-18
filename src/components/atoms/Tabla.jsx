import React from 'react';

function Tabla({ headers, data }) {
    return (
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header} className="py-2 px-4 border-b-2 border-gray-300">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} className="text-center">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="py-2 px-4 border-b border-gray-300">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabla;
