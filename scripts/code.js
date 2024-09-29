async function readFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.text();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}



class CodeBlock extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <pre><code className="language-cs">{this.props.content}</code></pre>
    }
}

//get all code elements
let codeElements = Array.from(document.getElementsByClassName('code'));

// Map each element's fetch/render promise into an array
const promises = codeElements.map(async (element) => {
    try {
        // Fetch the content of the file specified in the href attribute
        const codeContent = await readFile(element.getAttribute('href'));
        
        // Render the React component with the fetched content
        ReactDOM.render(<CodeBlock content={codeContent} />, element);
    } catch (error) {
        console.error("Error reading file:", error);
    }
});

// Wait for all components to be rendered
Promise.all(promises).then(() => {
    // Run Prism.js syntax highlighting after rendering
    Prism.highlightAll();
});