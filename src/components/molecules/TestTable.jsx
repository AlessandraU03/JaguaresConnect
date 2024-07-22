import React from 'react';
import Label from '../atoms/Label';

function TestTable({ label, title, fields = [] }) {
    return (
        <div className="p-4">
            <h2 className="font-bold text-xl mb-4">{title}</h2>
            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-[#1B3140]">
                            <th className="p-2 text-left  text-white">{label}</th>
                            <th className="p-2 text-left text-white">Calificacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map(field => (
                            <tr key={field.id} className="border-b">
                                <td className="p-2 font-medium">{field.label}</td>
                                <td className="p-2">{field.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TestTable;
