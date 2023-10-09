import axios from "axios";

export const login=(user)=>{
    return async(dispatch)=>{
       dispatch({
        type:'SET_USER',
        payload:user
       })
    }
}

export const setUser=()=>{
    
    return async(dispatch)=>{
        const jwtToken = localStorage.getItem('SavedToken');
        const response = await axios.get('http://localhost:4000/getUser',
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${jwtToken}`,
            },
        }
        );
    
        dispatch({
         type:'SET_USER',
         payload:response.data
        })
     }
}

export const setTask=(arr)=>{
    return async(dispatch)=>{
         dispatch({
         type:'SET_TASK',
         payload:arr
        })
     }
}