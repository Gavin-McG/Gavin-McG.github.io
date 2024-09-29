async function getJSONData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}



class Post extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="grid-item">
            <div className="item-info">
                <img className="item-image" src={this.props.thumbnail} />
                <h2 className="item-date">{this.props.date}</h2>
            </div>
            <p className="item-description">{this.props.description}</p>
            <a className="item-link" href={this.props.url}>Visit Post</a>
        </div>;
    }
}

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        }
        this.updatePosts = this.updatePosts.bind(this);
    }
    async updatePosts() {
        const data = await getJSONData("posts.json");
        const postPromises = data.postNames.map(async (name) => {
            const path = data.postDirectory + "/" + name + "/";
            const postData = await getJSONData(path + "post.json")
            return <Post 
                key={name} 
                date={postData.date} 
                description={postData.description} 
                url={path+"post.html"} 
                thumbnail={path+postData.thumbnailPath} 
            />
        })
        const posts = await Promise.all(postPromises);

        this.setState({
            posts: posts
        });
    }
    componentDidMount() {
        this.updatePosts();
    }
    render() {
        return <div className="grid-container">
            {this.state.posts}
        </div>
    }
}

// Render the React app
ReactDOM.render(<PostList />, document.getElementById('posts'));