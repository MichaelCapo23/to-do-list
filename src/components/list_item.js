import React from 'react';

export default (props) => {
    return (
        <li className={"collection-item row "}>
        <div className="col s10">{props.title}
        </div>
            <div className="col s2 center">
                <button onClick={props.toggle} className={"btn blue darkend-2"}><i className={"material-icons"}>{props.complete ? 'check_box' : 'crop_din'}</i></button>
                <button onClick={props.delete} className={"btn red darkend-2"}><i className={"material-icons"}>delete</i></button>
            </div>
        </li>
    )
}