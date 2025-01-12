async function getJSONData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null; // Return null in case of an error to handle gracefully
    }
}

class Post extends React.Component {
    render() {
        const { data, dir } = this.props;

        const postPath = dir+'/'+data.postDir;

        return (
            <div className="grid-item">
                <div className="item-info">
                    <img className="item-image" src={postPath+'/'+data.thumbnailPath} alt="Post Thumbnail" />
                    <h2 className="item-date">{data.date}</h2>
                </div>
                <p className="item-description">{data.description}</p>
                <a className="item-link" href={postPath+'/'+data.postFile} target="_blank" rel="noopener noreferrer">
                    Visit Post
                </a>
            </div>
        );
    }
}

class PostList extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="devlog">
                <h1 className="log-title">{data.title}</h1>
                <p className="log-description">{data.description}</p>
                <div className="grid-container">
                    {data.posts.map((post) => (
                        <Post key={post.postDir} data={post} dir={data.logDir} />
                    ))}
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: null,
            loading: true,
        };
    }

    async updateLogs() {
        const data = await getJSONData("posts.json");
        if (data) {
            this.setState({ logs: data, loading: false });
        } else {
            this.setState({ loading: false }); // Handle error state
        }
    }

    componentDidMount() {
        this.updateLogs();
    }

    render() {
        const { logs, loading } = this.state;

        if (loading) {
            return <p>Loading...</p>;
        }

        if (!logs) {
            return <p>Failed to load posts.</p>;
        }

        return (
            <div className="grid-container">
                {logs.map((devlogData) => (
                    <PostList key={devlogData.title} data={devlogData} />
                ))}
            </div>
        );
    }
}

// Render the React app
ReactDOM.render(<App />, document.getElementById('posts'));