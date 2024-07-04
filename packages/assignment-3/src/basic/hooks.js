import { deepEquals } from '../../../assignment-2/src/basic/basic';

export function createHooks(callback) {
  /**
   * let _state = new Map()
   * 기존에 위와 같은 형식으로 initState 기반의 key를 통해 값을 저장했다.
   * 초기의 테스트코드는 문제없이 통과하지만,
   * 새로 추가한 "동일한 initState를 가진 여러개의 state를 선언해도 각각 다른 상태를 갖는다."
   * 테스트 실행 시 테스트를 통과하지 못한다.
   * 
   * Math.random()함수로 테스트 했을 시에는 매번 random값이 바뀌는 이슈가 있었다.
   * 왜지?
   */
  let stateList = [];
  let pState = -1;
  const useState = (initState) => {
    stateList.push(initState);
    pState += 1;
    const currentIndex = pState;

    const state = stateList[currentIndex];

    const setState = (newState) => {
      if (!deepEquals(stateList[currentIndex], newState)) {
        console.log("state changed!!!")
        console.log("before: ", stateList[currentIndex])
        console.log("after: ", newState)
        console.log("============================")
        stateList[currentIndex] = newState
        callback()
      }
    }
    return [state, setState];
  };

  let memoList = [];
  let pMemo = -1;
  const useMemo = (fn, refs) => {
    let target = fn();
    memoList.push({ value: target, ref: [...refs] })
    pMemo += 1;

    const currentIndex = pMemo;

    if (!deepEquals(memoList[currentIndex].ref, [...refs])) {
      memoList[currentIndex] = { value: fn(), ref: [...refs] }
    }
    return memoList[currentIndex].value;
  };

  const resetContext = () => {
    pState = -1
    pMemo = -1
  }

  return { useState, useMemo, resetContext };
}
