import React from 'react';
import './Header.css'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: null
    }
  }

 async componentDidMount() {
  fetch("http://143.233.226.88:2004/rag/welcome-news/")
     .then(response => response.json())
     .then(data => this.setState({ subtitle: data.message }))
 }

  render() {
    return (
      <header>
        <h1 className='class-title'>Mediapot</h1>
        <p className="class-text">{this.state.subtitle}</p>
      </header>
    );
  }
}
export default Header;