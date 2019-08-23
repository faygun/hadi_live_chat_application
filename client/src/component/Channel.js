import React,{Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../Channel.css';
import ChannelBar from './ChannelBar';
import MessageContainer from './MessageContainer';

export default class Channel extends Component{

    render(){
        return(
            <Container>
                <Row>
                    <Col xs="3"><ChannelBar/></Col>
                    <Col xs="9"><MessageContainer/></Col>
                </Row>
            </Container>
        )
    }
}