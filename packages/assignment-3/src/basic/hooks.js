import { deepEquals } from '../../../assignment-2/src/basic/basic';

export function createHooks(callback) {
  let _state = new Map()
  const useState = (initState) => {
    // 더 나은 키가 필요함
    let key = initState
    if(_state.get(key) === undefined){
      _state.set(key, initState)
    }
    const setState = (newState) => {
      if(deepEquals(_state.get(key), newState)){
        return
      }else{
        console.log("state changed!!!")
        console.log("before: ", _state.get(key))
        console.log("after: ", newState)
        _state.set(key, newState)
        callback()
      }
    }
    return [_state.get(key), setState];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {

  }

  return { useState, useMemo, resetContext };
}
