import React from "react";
import Parts from './Parts';
import { CoursePart } from "../index";


const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => {
    return (
        <div>
            <Parts courseParts={courseParts} />
        </div>
    )
}

export default Content;
