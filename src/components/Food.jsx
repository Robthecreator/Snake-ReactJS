import React from "react";

function Food(props) {
    return (<div>
        {props.coordinates.map((dot, index) => {
            const style = {
                left: `${dot[0]}%`,
                top: `${dot[1]}%`
            }

            return <div className="food" key={index} style={style}></div>;
        })}
    </div>)
}

export default Food;