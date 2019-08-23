import React,{Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../Channel.css';
import ChannelBar from './ChannelBar';
import MessageContainer from './MessageContainer';
import axios from 'axios';
import { getConfig } from '../helper/jwt';

export default class Channel extends Component{
    constructor(props){
        super(props)

        this.state = {
            channels:[],
            active_channel : ""
        };
    }

    setActiveChannel(id){
        this.setState({
            active_channel : id
        })
    }

    componentDidMount(){
        axios.get('/api/channel', getConfig())
        .then(res => {
            this.setState({channels:res.data})
        })
        .catch(err => {
            this.setState({error:err.error});
        });
    }
    render(){
        let channelList = this.state.channels ? this.state.channels : [];
        return(
            <Container>
                <Row>
                    <Col xs="3"><ChannelBar setActiveChannel={this.setActiveChannel.bind(this)} channels={channelList}/></Col>
                    <Col xs="9"><MessageContainer active_channel={this.state.active_channel}/></Col>
                </Row>
            </Container>
        )
    }
}