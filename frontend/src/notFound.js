import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class notFound extends Component {
  
formSubmit(e) {
e.preventDefault()
 console.log(this.props.history)
}
  render() {

    var id = 1234
    return (
      <div>
       <h1> Login </h1>
       <form onSubmit={this.formSubmit.bind(this)} >
          <input
          name="username"
          type="text"
          data-parse="uppercase"
        />

        <input name="email" type="email" />

        <input
          name="birthdate"
          type="text"
          data-parse="date"
        />
         <Link to={`/main/${id}`}>
        <button> Send data!</button>
        </Link>
       </form>
      </div>

    );
  }
}

export default notFound