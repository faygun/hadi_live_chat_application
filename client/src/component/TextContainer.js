import React,{Component} from 'react';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
   } from 'reactstrap';
export default class TextContainer extends Component{
    render(){
        return(
            <div className="text-container">
                 <InputGroup>
                    <Input placeholder="type message"/>
                    <InputGroupAddon addonType="append">
                        <Button>Send</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        )
    }
}