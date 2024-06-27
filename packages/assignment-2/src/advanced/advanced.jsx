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
  const value = useRef()
  
  const setState = useCallback(()=> {
    if(JSON.stringify(value.current) !== JSON.stringify(initValue)){
      value.current = initValue
    }
  }, [initValue])
  return [{value: value.current}, setState]
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

export const TestContextProvider = ({ children }) => {
  const [value, setValue] = useState(textContextDefaultValue);

  return (
    <TestContext.Provider value={{ value, setValue }}>
      {children}
    </TestContext.Provider>
  )
}

const useTestContext = () => {
  return useContext(TestContext);
}

export const useUser = () => {
  const { value, setValue } = useTestContext();

  return [
    value.user,
    (user) => setValue({ ...value, user })
  ];
}

export const useCounter = () => {
  const { value, setValue } = useTestContext();

  return [
    value.count,
    (count) => setValue({ ...value, count })
  ];
}

export const useTodoItems = () => {
  const { value, setValue } = useTestContext();

  return [
    value.todoItems,
    (todoItems) => setValue({ ...value, todoItems })
  ];
}
