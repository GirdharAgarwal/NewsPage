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
		fetch("https://newsapi.org/v2/everything?q=tesla&from=2022-04-09&sortBy=publishedAt&apiKey=a0e0e4000ace4640a9b7e45bb2c4bc0d")
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
			<h1> Fetch data from an api in react </h1> {
				items.map((item) => ( 
            <p key={item.url.toString()} className="content">
                    Source Name:{ item.source.name},
                    Author: { item.author}, 
                    Title: { item.title }, 
                    Description: { item.description } ,
                    Url: { item.url},
                    Image: {item.urlToImage},
                    Published At: {item.publishedAt},
                    Content: {item.content}
            </p>
        ))
			}
		</div>
	);
}
}

export default App;
