import { deepEquals } from '../../../assignment-2/src/basic/basic';

export function createHooks(callback) {
  let _state = null
  const useState = (initState) => {
    if(_state === null ){
      _state = initState
    }
    const setState = (newState) => {
      if(deepEquals(_state, newState)){
        return
      }else{
        console.log("state changed!!!")
        console.log("before: ", _state)
        console.log("after: ", newState)
        _state = newState
        callback()
      }
    }
    return [_state, setState];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {

  }

  return { useState, useMemo, resetContext };
}
