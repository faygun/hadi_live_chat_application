import React,{Component} from 'react';

export default class MessageRow extends Component{

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <label className="from-user">{this.props.name}</label>
                <span className="text">{this.props.message}</span>
            </div>
        )
    }
}