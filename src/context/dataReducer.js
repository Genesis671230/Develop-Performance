const dataReducer = (state, action)=>{
    switch(action.type){
      
        case "USER":{
            return{
                data: action.payload
            }
        }
        case "DATALOGOUT":{
            return{
                data: null
            }
        }
       
       

        default:
            return state;
    }
};

export default dataReducer;