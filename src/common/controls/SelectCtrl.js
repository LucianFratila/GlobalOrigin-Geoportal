import React, {useState, useEffect} from 'react';
import Translate from '../languages/Translate'
import Select from 'react-select'
import axios from 'axios'

function  SelectCtrl(props) {
		
	const [selectValue,setSelectValue]=useState({value:"",label:""})
	const [options,setOptions]=useState(props.options)
	
	useEffect(() => {
		if(options && props.value){
			for (var i=0; i<options.length; i++) {
				if(options[i].value==props.value)
					setSelectValue(options[i])
			}
		}
		else
			setSelectValue({value:"",label:""})
		
	},[props.value]);

	const handleChange=(valueObj,actionObj) => {
		if(actionObj.action==='clear') 
			props.onChange(props.name,'')
		if(actionObj.action==='select-option')
			props.onChange(props.name,valueObj.value)
	};
	
	useEffect(() => {
		if(props.url){ axios.get(props.url).then(response => { setOptions(response.data.output) })}
	},[]);
	

    return (
		<React.Fragment>
			{props.label ? <label  htmlFor={props.name}  className={props.classLabel}>{props.label}</label> : ''}
			<Select onChange={handleChange}
				name={props.name} 
				options={options}
				value={selectValue}
				error={props.error}
				isClearable='true'	
				isSearchable='true'
			/>
			<div className="valid-feedback"></div>
			<div className="invalid-feedback d-block" >{props.error}</div>
		</React.Fragment>  
    )
}

export default SelectCtrl
