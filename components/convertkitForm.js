import React, { Component } from 'react';

class ConvertkitEmailForm extends Component {
  state = {
    message: '',
    email: '',
  };

  emailHandler = (e) => {
    let updatedEmail = e.target.value;
    this.setState({ email: updatedEmail });
  };

  subscribeUser = async (e) => {
    e.preventDefault();
    const url = '/api/convertkitSubscribeHandler';

    const res = await fetch(url, {
      body: JSON.stringify({ email: this.state.email }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'POST',
    });

    const json_res = await res.json();

    this.setState({
      message: json_res.message,
      email: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.subscribeUser}>
        <input
          id="newsletter-input"
          type="email"
          name="email"
          className="shadow-md rounded-md px-5 py-2 m-0 w-11/12 mx-auto lg:w-2/3"
          placeholder="Enter your email"
          aria-label="Enter Email Address"
          aria-describedby="nnewsletter-btn"
          value={this.state.email}
          onChange={this.emailHandler}
          required
          autoCapitalize="off"
          autoCorrect="off"
        />
        <button
          type="submit"
          id="newsletter-btn"
          className="bg-[#1B2A41] w-11/12 mx-auto lg:w-1/3 text-white font-semibold px-5 py-2 rounded-md m-0 hover:bg-slate-600 transition-all duration-150"
          value=""
          name="subscribe"
        >
          Subscribe
        </button>
        {
          (this.state.message.length > 0) && 
          <p id="newsletter-message" className={"text-left text-sm mt-3 alert alert-warning bg-[#1B2A41] rounded-md text-white w-full px-5 py-2 "}>
            {this.state.message}
          </p>
        }
        
      </form>
    );
  }
}

export default ConvertkitEmailForm;