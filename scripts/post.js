//heading component
class Heading extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const timeOutput = this.props.time ? '(' + this.props.time + ')' : '';

        return <div className="task-heading">
            <h1 dangerouslySetInnerHTML={this.props.content}></h1>
            <p className="task-time"><strong>{timeOutput}</strong></p>
        </div>
    }
}


function convertToHours(timeStr) {
    const timePattern = /^(\d+(\.\d+)?)([hm])$/;  // Regex to match strings like "1.5h" or "50m"
    const match = timeStr.match(timePattern);
    
    if (match) {
        const value = parseFloat(match[1]);  // Extract the numeric part
        const unit = match[3];               // Extract the unit (h or m)
        
        if (unit === 'h') {
            return value;  // It's already in hours
        } else if (unit === 'm') {
            return value / 60;  // Convert minutes to hours
        }
    } else {
        throw new Error("Invalid time format");
    }
}


//get all heading elements
const tasks = Array.from(document.getElementsByClassName('task'));

let totalTime = 0;

//render Heading component for each header
tasks.forEach((task) => {
    const time = task.getAttribute('time');
    const content = task.innerHTML;

    totalTime += convertToHours(time);

    // Replace the current content with <h1> and <p>
    ReactDOM.render(<Heading content={{__html: content}} time={time} />,task);
});


//get all task-total elements (usually only 1)
const taskTotals = Array.from(document.getElementsByClassName('task-total'));

//render heading component for each task time total
taskTotals.forEach((taskTotal) => {
    //round to the nearest 0.1h (6m)
    const roundedTime = Math.round(totalTime*10)/10;

    // Replace the current content with <h1> and <p>
    ReactDOM.render(<Heading content={{__html: "Total time Spent:"}} time={roundedTime+'h'} />,taskTotal);
});