import React from "react";

type coursePros = {
    name: string;
    exerciseCount: number;
}

const Total: React.FC<{ courseParts: Array<coursePros> }> = ({ courseParts }) => {
    return (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
}


export default Total;
