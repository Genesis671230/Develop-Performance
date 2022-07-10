const SearchReducer = (state, action)=>{
    switch(action.type){
        case "/department":{
            return{
                insert:action.payload
            }
        }
      
        default:
            return state;
    }
};

export default SearchReducer;