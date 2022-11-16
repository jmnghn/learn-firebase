import { createContext, useReducer } from "react";

// Auth context 객체를 생성.
const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "login": // 파이어베이스는 회원가입 후 로그인으로 처리하므로 (공식문서), 따로 처리하지 않고 login으로 함께 사용함.
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    default:
      return state;
  }
};

// context를 구독할 컴포넌트의 묶음 범위를 설정.
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log("@AuthContextProvider state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
