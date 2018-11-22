import React, { Component } from 'react'
import  {connect} from  'react-redux'
import {Icon,Popconfirm,message} from 'antd'
import  './list.css'
class List extends Component {
    state={
        val:'',
        flag:false,
        set:'',
        fw:''
    }
    render() {
        return (
        <div className="box">
            {
            this.props.arr.map((item,index)=>{
            return <div key={index} 
                    onMouseOver={()=>this.init(item.name)}
                    onClick={()=>this.fw(item.name)}
                    className={this.state.set===item.name?"set bkg":'set'}
                    >
                    <Icon type="file" />
                    {
                    this.state.flag!==item &&
                        <span
                        onDoubleClick={()=>this.clk(item,item.name)}
                        className={this.state.fw===item.name?'active':null}
                        >
                        {item.name}
                        </span>
                    }
                    {
                    this.state.flag===item && 
                    <input type="text"  onKeyDown={(e)=>this.down(e,item.name)}
                    defaultValue={item.name}
                    onChange={(e)=>this.handleChange(e)}
                    onBlur={()=>{this.blur(item.name)}}
                        />
                    }
                    {
                    this.state.set===item.name &&  
                    this.state.flag!==item &&
                    <span className="right">
                        <Icon type="plus" />
                        <Popconfirm 
                        title="Are you sure delete this file?" 
                        onConfirm={()=>this.confirm(index)} 
                        onCancel={this.cancel} 
                        okText="Yes"
                        cancelText="No">
                        <Icon type="delete" />
                    </Popconfirm>  
                        </span>
                    } 
                </div>
            })
            }
        </div>
        )
    }
    componentDidMount(){

    }
    handleChange=(e)=>{
      this.setState({
        val:e.target.value
      },()=>{
        
      })
    }
    clk=(val,name)=>{
    this.setState({
        flag:val,
        set:'',
        val:name
    })
    }
    down=(e,val)=>{
       let arr =  this.props.arr;
       if(e.keyCode===13){
        if(this.state.val===''){
            alert('名字不能为空');
            return;
        }   
        let newArr = arr.map(item=>{
            if(item.name===val){
              item.name = this.state.val;
              }
              return  item;
        })
        this.props.setArr(newArr);
        this.setState({
           flag:false
         })
       } 
    }
    init=(val)=>{
      this.setState({
          set:val
      })
    }
    blur=(name)=>{
      this.setState({
        flag:false,
        val:name   
      })
    }
    confirm(index){
    let  arr = this.props.arr;
         arr.splice(index,1);
         this.props.delete(arr);
         message.success('您已经删除成功');
    }
    fw=(val)=>{
       this.setState({
           fw:val 
       })
    }
}
let mapStateToProps = (state)=>{
    return {
       arr:state.arr
    }
  }
  let mapDispatchToProps=(dispatch)=>{
      return {
        setArr(newArr){
           dispatch({
               type:'SET',
               payload:newArr
           })
        },
        delete(newArr){
            dispatch({
                type:'DELETE',
                payload:newArr
            })
        } 
      }
  }
export default  connect(mapStateToProps,mapDispatchToProps)(List);
