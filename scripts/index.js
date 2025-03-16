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
            <a className="post-link" href={postPath+'/'+data.postFile}>
                <div className="post">
                    <div className="post-info">
                        <img className="post-image" src={postPath+'/'+data.thumbnailPath} alt="Post Thumbnail" />
                        <h2 className="post-date">{data.date}</h2>
                    </div>
                    <p className="post-description">{data.description}</p>                    
                </div>
            </a>
        );
    }
}

class PostList extends React.Component {
    render() {
        const { data } = this.props;
        
        return (
            <div className="devlog">
                <div className="log-header">
                    <img className="log-image" src={data.image} />
                    <h1 className="log-title">{data.title}</h1>
                </div>
                <p className="log-description">{data.Description}</p>
                <div className="post-container">
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
            <div className="devlog-container">
                {logs.map((devlogData) => (
                    <PostList key={devlogData.title} data={devlogData} />
                ))}
            </div>
        );
    }
}

// Render the React app
ReactDOM.render(<App />, document.getElementById('app'));