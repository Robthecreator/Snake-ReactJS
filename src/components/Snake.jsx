import React from "react";

function Snake(props) {
    return (<div>
        {props.coordinates.map((dot, index) => {
            const style = {
                left: `${dot[0]}%`,
                top: `${dot[1]}%`
            }

            return <div className="body-snake" key={index} style={style} ></div>;
        })}
    </div>);
}

export default Snake;