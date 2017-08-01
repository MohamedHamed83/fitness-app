var React = require("react");
var ReactDOM = require('react-dom');

class App extends React.Component{
    render(){
        return(<div>
            <p>react 7</p>
        </div>)
    }
}
ReactDOM.render(<App></App>,
document.getElementById('react-container'));