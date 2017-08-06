import React from 'react';
import ReactDOM from 'react-dom';
import {reduce} from 'lodash';

require('../src/style.scss');
class App extends React.Component {
    render() {
        return (<div>
            <p>react 2</p>
        </div>);
    }
}
ReactDOM.render(<App></App>,
    document.getElementById('react-container'));
// function test(){
//     console.log('aa');
// }
// test();