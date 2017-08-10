import React from 'react';
import ReactDOM from 'react-dom';



function render(Component){
ReactDOM.render(<Component />,
  document.getElementById('react-container'));
}
class App extends React.Component {
  render() {
    return (<div className="container-fluid">
      <p >react 2</p>
    </div>);
  }
}
render(App);

// function test(){
//     console.log('aa');
// }
// test();
