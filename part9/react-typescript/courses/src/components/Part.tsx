import { CoursePart } from "../App";


const Part = ({ courseParts }: { courseParts: CoursePart[] }) => {

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    // Create variable for rendering
    const parts: JSX.Element[] = [];

    courseParts.forEach((part) => {
        switch (part.type) {
            case "normal":
                parts.push(
                    <div>
                        <p><b>{part.name} {part.exerciseCount}</b>
                            <br></br>
                            {part.description}</p>
                    </div>
                )
                break;
            case "groupProject":
                parts.push(
                    <div>
                        <p>
                            <b>{part.name} {part.exerciseCount}</b>
                            <br></br>
                            project exercises {part.groupProjectCount} </p>
                    </div>
                )
                break;
            case "submission":
                parts.push(
                    <div>
                        <p>
                            <b>{part.name} {part.exerciseCount}</b>
                            <br></br>
                            {part.description}
                            <br></br>
                            submit to {part.exerciseSubmissionLink}
                        </p>
                    </div>
                )
                break;
            case "special":
                parts.push(
                    <div>
                        <p>
                            <b>{part.name} {part.exerciseCount}</b>
                            <br></br>
                            {part.description}
                            <br></br>
                            required skills: {part.requirements.map((part) => `${part} `)}
                        </p>
                    </div>

                )
                break;

            default:
                return assertNever(part);
        }
    })
    return (
        <div>
            {parts}

        </div>
    );
};


export default Part