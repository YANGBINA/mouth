export  default   function  arr(state=[],action){
    if(action.type==='ADD'){
        return  [...action.payload]
    }else if(action.type==='SET'){
        return  [...action.payload]
    }else if(action.type==='DELETE'){
        return [...action.payload]
    }else if(action.type==='ADD_SELETE'){
        return [...action.payload]
    }
   return  state;
}