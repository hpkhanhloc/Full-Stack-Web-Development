import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOneThree extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartOneThree {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartOneThree {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  }
];

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  // const courseParts = [
  //   {
  //     name: "Fundamentals",
  //     exerciseCount: 10
  //   },
  //   {
  //     name: "Using props to pass data",
  //     exerciseCount: 7
  //   },
  //   {
  //     name: "Deeper type usage",
  //     exerciseCount: 14
  //   }
  // ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));