import {createContext, useContext, useReducer} from "react"

const AuthContext = createContext()

const initialstate = {
    user:null,
    isAuth:false,
}

function reducer(state,{type,payload}){
    switch(type){
        case 'login':
            return {...state, user:payload, isAuth:true};

        case 'logout':
            return {...state,isAuth:false,user:null};

        default: return state;
    }
}

const FAKE_USER = {
    name: "Akhil",
    email: "akhil@example.com",
    password: "akhil",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
function AuthProvider({children}){
    const [{user,isAuth},dispatch] = useReducer(reducer,initialstate);
    
    function login({email,password}){
        if(email === FAKE_USER.email && password === FAKE_USER.password){
            dispatch({type:'login',payload:FAKE_USER})
        }
    }

    function logout(){
        dispatch({type:'logout'});
    }
    return(
        <AuthContext.Provider value={{
            isAuth,
            user,
            login,
            logout
        }}>
        {children}
        </AuthContext.Provider>
    )
}
function useAuth(){
    const context = useContext(AuthContext)
    if(!context) throw new Error("AuthContext was used outside AuthProvider");
    return context;
}

export {AuthProvider, useAuth};