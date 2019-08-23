import React,{Component} from 'react';
import { InputGroup, InputGroupAddon, Label } from 'reactstrap';

export default class MessageRow extends Component{

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <label className="from-user">Faruk</label>
                <span className="text">sadasdsa ssdgdfg asdasda</span>
            </div>
        )
    }
}