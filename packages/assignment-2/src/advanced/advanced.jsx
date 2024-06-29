import { createContext, useCallback, useContext, useRef, useState } from "react";

const cache = new Map();

export const memo1 = (fn) => {
  if (cache.has(fn)) {
    return cache.get(fn)
  };
  const ret = fn()
  cache.set(fn, ret);

  return ret;
};

const cache2 = new Map();

export const memo2 = (fn, arr) => {
  const key = arr.toString()
  if (cache2.has(key)) {
    return cache2.get(key)
  }
  const result = fn();
  cache2.set(key, result)
  return result;
};

export const useCustomState = (initValue) => {
  const [value, _setValue] = useState(initValue)

  const setState = (newValue) => {
    if(JSON.stringify(value) !== JSON.stringify(newValue)){
      _setValue(newValue)
    }
  }
  return [value, setState];
  
}

const textContextDefaultValue = {
  user: null,
  todoItems: [],
  count: 0,
};

export const TestContext = createContext({
  value: textContextDefaultValue,
  setValue: () => null,
});

// 전체 컴포넌트에 영향을 미치는 컴포넌트는 렌더링 최소화
export const TestContextProvider = ({ children }) => {
  const value = useRef(textContextDefaultValue)
  const setValue = useCallback((newValue) => value.current = newValue, [])


  return (
    <TestContext.Provider value={{ value: value.current, setValue }}>
      {children}
    </TestContext.Provider>
  )
}

// 개별 컴포넌트에 렌더링을 유발해야한다!
const useTestContext = (key) => {
  const {value, setValue} = useContext(TestContext)
  const [state, setState] = useState(value[key])
  
  const memoSetState = (newValue) => {
    setState(newValue)
    setValue({...value, newValue})
  }

  return [state, memoSetState];
}

// 각 키를 가지고 그들만의 상태를 가지도록 한다.
export const useUser = () => {
  return useTestContext("user")
}

export const useCounter = () => {
  return useTestContext("count")
}

export const useTodoItems = () => {

  return useTestContext("todoItems")
}
