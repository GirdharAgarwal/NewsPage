import React from "react";
import './App.css';
class App extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items:[],
			DataisLoaded: false
		};
	}

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
		fetch("https://newsapi.org/v2/everything?q=tesla&from="+{date}+"&sortBy=publishedAt&apiKey=64a609e61cfd4b69b0b0a90f724a11aa")
    .then((res) => res.json())
			.then((json) => {
				this.setState({
					items: json.articles,
					DataisLoaded: true
				});
			})
	}
	render() {
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Pleses wait some time.... </h1> </div> ;

		return (
		<div className = "App">
			<h1 className="head">Articles</h1> {
				items.map((item) => ( 
            <div key={item.url.toString()} className="disp-box row">
			        <div className="col-md-5">
                       <img className="Image"
                          src={item.urlToImage} alt="Not found" 
                       />
                    </div>
					<div className="col-md-7">
						<h4 className="title">{item.title}</h4>
						<p>{item.description}</p>
						<a href={item.url}>
							To read more..
						</a>
						<span className="author">By {item.author}</span>
					</div>
                    {/* Source Name:{ item.source.name}
                    Published At: {item.publishedAt}
                    Content: {item.content} */}
            </div>
        ))
			}
		</div>
	);
}
}

export default App;
