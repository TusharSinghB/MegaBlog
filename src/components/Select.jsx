/* eslint-disable react/prop-types */
import { forwardRef, useId } from "react";

function Select({ options = [], label, className = "", ...props }, ref) {
    console.log(options);

    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="">
                    {" "}
                    {label}{" "}
                </label>
            )}
            <select
                ref={ref}
                id={id}
                {...props}
                className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default forwardRef(Select);
