import React from 'react';

function Tabla({ headers, data }) {
    return (
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="py-2 px-4 border-b-2 border-gray-300">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="text-center">
                        {row.map((cell, cellIndex) => (
                            <td key={`${rowIndex}-${cellIndex}`} className="py-2 px-4 border-b border-gray-300">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}

export default Tabla;
