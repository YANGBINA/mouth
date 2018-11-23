import React, { Component } from 'react'
import  {connect} from  'react-redux'
import {Icon,Popconfirm,message} from 'antd'
import  './list.css'
class List extends Component {
    state={
        val:'',
        flag:'',
        set:'',
        fw:'',
        selete:[]
    }
    render() {
        return (
        <div className="box">
            {
            this.props.arr.map((item,index)=>{
            return <div key={index} 
                    onMouseOver={()=>this.init(index)}
                    onClick={()=>this.fw(item.name)}
                    className={this.state.set===index?"set bkg":'set'}
                    >
                    {this.state.selete[index]===index?<Icon type="caret-down" />:null}
                    <Icon type="file" />
                    {
                    this.state.flag!==index &&
                        <span
                        onDoubleClick={()=>this.clk(index,item.name)}
                        className={this.state.fw===item.name?'active':null}
                        >
                        {item.name}
                        </span>
                    }
                    {
                    this.state.flag===index && 
                    <input type="text"  
                    onKeyDown={(e)=>this.down(e,item.name)}
                    defaultValue={item.name}
                    onChange={(e)=>this.handleChange(e)}
                    onBlur={()=>{this.blur(item.name)}}
                        />
                    }
                    {
                    this.state.set===index &&  
                    this.state.flag!==index &&
                    <span className="right">
                        <Icon type="plus" onClick={()=>this.add(index)} />
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
    add=(ind)=>{
     let  arr=this.props.arr;
     this.state.selete.push(ind)
     this.setState({
      selete:this.state.selete,
      flag:ind+1
     })
     arr.splice(ind+1,0,{name:'我是子页面',flag:false});
     this.props.addselete(arr);
    }
    handleChange=(e)=>{
      this.setState({
        val:e.target.value
      },()=>{
        
      })
    }
    clk=(ind,name)=>{
    this.setState({
        flag:ind,
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
    init=(index)=>{
     if(this.state.flag===false || this.state.flag===''){
        this.setState({
            set:index
        })
     }
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
         message.success('您已经删除成功',1);
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
        },
        addselete(newArr){
           dispatch({
               type:'ADD_SELETE',
               payload:newArr
           }) 
        } 
      }
  }
export default  connect(mapStateToProps,mapDispatchToProps)(List);