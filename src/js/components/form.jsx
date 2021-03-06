import React from 'react';
import Any from '../any.jsx';

class Form extends Any {
	render(p,s,c,m) {
		return <form onSubmit={this.onSubmit.bind(this)}><div>{c}</div></form>
	}
	onSubmit(e) {
		if (e && e.preventDefault) e.preventDefault();
		this.props.onSubmit();
	}
}

export default Form;
