import React from 'react';

function Label({ htmlFor, children }){
    return (
        <label htmlFor={htmlFor} className="font-bold">
            {children}
        </label>
    );
};

export default Label;
