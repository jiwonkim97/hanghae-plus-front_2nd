import { deepEquals } from '../../../assignment-2/src/basic/basic';

export function createHooks(callback) {
  let stateList = [];
  let pState = -1;
  // setState의 태스크 큐의 길이를 추적합니다.
  let eventQueueLength = 0;

  const useState = (initState) => {
    stateList.push(initState);
    pState += 1;
    const currentIndex = pState;

    const state = stateList[currentIndex];

    const setState = (newState) => {
      if (!deepEquals(stateList[currentIndex], newState)) {
        // 이벤트루프의 태스크 큐 안에 넣어준다!
        eventQueueLength += 1
        setTimeout(() => {
          if (eventQueueLength === 1) {
            stateList[currentIndex] = newState
            callback()
          } else {
            eventQueueLength -= 1;
          }
        }, 0)
      }
    }
    return [state, setState];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {
    pState = -1
  }

  return { useState, useMemo, resetContext };
}
