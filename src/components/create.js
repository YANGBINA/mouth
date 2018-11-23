import React, { Component } from 'react'
import  {Icon} from  'antd'
import  './create.css'
import  {connect} from  'react-redux'
class Create extends Component {
    state ={
        index:1
    }
    render() {
        return (
            <div className="header">
            <p onClick={this.add}><Icon type="plus-circle" />新页面</p>
            </div>
        )
    }
    add=()=>{
     let  arr =  this.props.arr;
     this.setState({
         index:this.state.index+1
     })
     arr.push({
         name:`页面${this.state.index}`,
         flag:false
     })
     this.props.add(arr);
    }
}
let mapStateToProps = (state)=>{
    return {
        arr:state.arr
    }
 }
let mapDispatchToProps = (dispatch)=>{
    return {
        add(arr){
            dispatch({
              type:'ADD',
              payload:arr
            })
        }
    }
}

export  default connect(mapStateToProps,mapDispatchToProps)(Create);
