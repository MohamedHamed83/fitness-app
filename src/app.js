var React = require('react');
var ReactDOM = require('react-dom');
require('../src/style.scss');
class App extends React.Component{
    render(){
        return(<div>
            <p>react 100</p>
        </div>);
    }
}
ReactDOM.render(<App></App>,
document.getElementById('react-container'));