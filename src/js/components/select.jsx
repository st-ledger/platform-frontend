import React from 'react';
import Any from '../any.jsx';

class Select extends Any {
	componentDidMount() {
		this.onChangeViaSelect = this.onChangeViaSelect.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}
	render(p,s,c,m) {
		var select = this.renderViaSelect(p,s,c,m);
		if (p.useFormControl) {
			return this.renderWrap(p,s,select,m);
		} else {
			return select;
		}
	}
	renderWrap(p,s,c,m) {
		var haveValue = p.value && (p.value.length!=0);
		var inputGroupCls = "input-group with-placeholder";
		inputGroupCls += haveValue ? " filled placeholder-to-up" : " empty";
		if (s.focused) inputGroupCls += " focused";
		if (p.hasError || s.errorViaRequied) inputGroupCls += " has-danger";
		var hint = p.hint || null;
		if (s.errorViaRequied) {
			hint = "This field is required";
		}
		return <label className={inputGroupCls}>
			<span className="placeholder">{p.placeholder}</span>
			{c}
			<span className="input-hint">{hint}</span>
		</label>;
	}
	renderViaSelect(p,s,c,m) {
		var cls;
		if (p.className) {
			cls = p.className;
		} else {
			cls = "";
		}
		var options = p.options.slice(0);
		if (p.placeholder && !p.useFormControl) {
			options.unshift({value:"#placeholder#",text:p.placeholder});
		} else if (p.useFormControl) {
			options.unshift({value:"#placeholder#",text:""});
		}
		return <select className={cls} value={p.value} onChange={this.onChangeViaSelect} onFocus={this.onFocus} onBlur={this.onBlur}>
			{options.map((v,i)=>{
				return <option key={"option"+i} value={v.value||v.id}>{v.text||v.title}</option>
			})}
		</select>;
	}
	onChangeViaSelect(e) {
		var v = e.target.value;
		if (v=="#placeholder#") v = null;
		this.props.onChange(v);
	}
	onFocus() {
		this.setState({focused:true,errorViaRequied:false}, ()=>{
			if (this.props.onFocus) this.props.onFocus();
			this.forceUpdate();
		});
	}
	onBlur() {
		var errorViaRequied = this.props.required && (this.props.value||"")=="";
		this.setState({focused:false,wasBlurred:true,errorViaRequied}, ()=>{
			if (this.props.onBlur) this.props.onBlur(this.node.value||'', this.valid, this);
			this.forceUpdate();
		});
	}
}

export default Select;
