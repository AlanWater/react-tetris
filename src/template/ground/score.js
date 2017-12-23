import React,{ Component } from 'react';
class Score extends Component{
    constructor(props){
        super(props);
        this.state = {
            score:this.props.score || 0
        }
    }
    componentWillReceiveProps( props ){
        if(props.score!==this.state.score){
            this.setState({
                score:props.score
            });
        }
    }
    render(){
        return <span className="score">Score:{this.state.score}</span>
    }
}
export default Score;