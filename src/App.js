import React from "react";
import './App.css';
var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://api.newscatcherapi.com/v2/search',
  params: {q: 'India',lang: 'en', sort_by: 'relevancy', page: '1'},
  headers: {
    'x-api-key': '9EI5uwUGbHfS4NKSwBi7b_87EH8qTbZ0Y5yqBFQhF8o'
  }
};

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
		var self=this;
		axios.request(options).then(function (response) {
			console.log(response.data.articles);
			self.setState({
				items: response.data.articles,
				DataisLoaded: true
			});
		}).catch(function (error) {
			console.error(error);
		});
	}
	render() {
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Pleses wait some time.... </h1> </div> ;

		return (
		<div className = "App">
			<h1 className="head">Articles on India</h1> {
				items.map((item) => ( 
            <div key={item._id} className="disp-box row">
			        <div className="col-md-5">
					   <h4 className="title">{item.title}</h4>
                       <img className="Image"
                          src={item.media} alt="Not found" 
                       />
                    </div>
					<div className="col-md-7">
						<p>{item.summary}</p>
						<a href={item.link}>
							To read more..
						</a>
						{item.author?
						  <span className="author">By {item.author}</span> :
						  <span className="author">By Anonymous</span>
						}
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
