import React, {SelectHTMLAttributes} from 'react';

import './styles.css';

interface Options {
    label?: string;
    value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: Options[]
}

const Select: React.FunctionComponent<SelectProps> = ({label, name, options, ...rest})=>{
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest} >
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label || option.value}</option>
                })}
            </select>
        </div>
        )
};

export default Select;