var initialState ={
    user:{},
    allTask:[]
}

export const reducer=(state=initialState,action)=>{
    if(action.type=='SET_USER')
    {       
        return {...state,user:action.payload}
    }
    if(action.type=='SET_TASK'){
        return {...state,allTask:action.payload}
    }
    else{
        return state;
    }
}