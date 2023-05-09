export const firststate=null;
export const reducer=(state,action)=>{
   switch (action.type) {
    case "USER":
        return action.payload
    case "LOGOUT":
        return null
    case "POSTD":
        return action.payload
    default:
        break;
   }
}