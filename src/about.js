var React = require("react");
var ReactDOM = require('react-dom');
require('./style.scss');

class About extends React.Component{
    render(){
        return(<div>
            about us
        </div>)
    }
}
ReactDOM.render(<About ></About>,
document.getElementById('react-container'));