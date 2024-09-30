//heading component
class Heading extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const timeOutput = this.props.time ? '(' + this.props.time + ')' : '';

        return <div className="task-heading">
            <h1>{this.props.content}</h1>
            <p className="task-time">{timeOutput}</p>
        </div>
    }
}


//get all heading elements
const tasks = Array.from(document.getElementsByClassName('task'));

//render Heading component for each header
tasks.forEach((task) => {
    const time = task.getAttribute('time');
    const content = task.innerHTML;

    // Replace the current content with <h1> and <p>
    ReactDOM.render(<Heading content={content} time={time} />,task);
});