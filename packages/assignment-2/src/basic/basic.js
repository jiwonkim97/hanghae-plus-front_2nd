export function shallowEquals(target1, target2) {
  // object 타입과 literal 타입을 구분합니다.
  if (typeof target1 === "object" && typeof target2 === "object") {
    // null의 타입은 object로 분류되기 때문에 null을 우선 처리해줍니다
    if (target1 === null && target2 === null) {
      return true
      // Array의 경우 Array.isArray 함수를 통해 따로 분류합니다.
    } else if (Array.isArray(target1) && Array.isArray(target2)) {
      // 배열의 길이 우선 비교
      if (target1.length !== target2.length) {
        return false
      }
      // 배열의 값들을 순회하면서 비교 후에 결과를 반환합니다.
      return !target1.map((value, index) => value === target2[index]).includes(false)
    } else {
      try {
        const aConst = target1.constructor()
        const bConst = target1.constructor()
        // new 연산자를 통해 생성된 객체는 constructor 함수가 없는것을 이용합니다.
        if (typeof aConst === "object" && typeof bConst === "object") {
          /**
           * target1의 엔트리를 순회하면서 target2의 같은 인덱스의 있는 값과 shallowEquals를 진행한 후 
           * 모두 일치하는지를 반환합니다.
           */
          return !Object.entries(target1)
            .map((target, idx) => shallowEquals(target, Object.entries(target2)[idx]))
            .includes(false)

          // constructor의 타입이 object가 아닌경우에는 Object.is로 비교를 위해 에러를 throw 합니다.
        } else {
          throw new Error
        }
      } catch {
        // new 연산자를 통해 생성된 객체는 Object.is로 얕은 비교를 수행합니다.
        return Object.is(target1, target2)
      }
    }
  } else {
    return target1 === target2;
  }
}

export function deepEquals(target1, target2) {
  if (typeOf(target1) === "object" && typeOf(target2) === "object") {
    try {
      if (typeOf(target1.constructor()) === "object" && typeOf(target2.constructor()) === "object") {
        if (Object.entries(target1).length !== Object.entries(target2).length) {
          return false
        }
        return !(Object.entries(target1)
          .map((target, idx) => deepEquals(target, Object.entries(target2)[idx]))
          .includes(false))
      } else {
        throw new Error
      }
    } catch {
      return Object.is(target1, target2)
    }
  }
  if (typeOf(target1) === "array" && typeOf(target2) === "array") {
    if (target1.length !== target2.length) {
      return false
    }
    return !(target1.map((target, idx) => deepEquals(target, target2[idx])).includes(false))
  }
  if (typeOf(target1) === "undefined" && typeOf(target2) === "undefined") {
    return Object.is(target1, target2)
  }

  return JSON.stringify(target1) === JSON.stringify(target2)
}

const typeOf = (target) => {
  if (typeof target !== "object") {
    return typeof target
  }

  if (target === null) {
    return null
  }

  if (Array.isArray(target)) {
    return "array"
  }

  return typeof target
}


export function createNumber1(n) {
  return new Number(n);
}

export function createNumber2(n) {
  return new String(n);
}

export function createNumber3(n) {
  let _n = new String(n)
  Object.defineProperty(_n, "toJSON", { value: () => `this is createNumber3 => ${_n}`, writable: false, })
  Object.defineProperty(_n, "valueOf", { value: () => parseInt(_n), writable: false, })

  return _n
}

export class CustomNumber {
  // 클래스의 인스턴스를 캐시함
  constructor(value) {
    if (CustomNumber.cache[value]) {
      return CustomNumber.cache[value];
    }
    this.value = value;
    CustomNumber.cache[value] = this;
  }

  // 클래스 호출 시 값 반환을 위함
  valueOf() {
    return this.value;
  }

  // 타입 캐스팅을 위함
  toString() {
    return String(this.value);
  }

  // JSON.stringify를 위함
  toJSON() {
    return `${this.value}`
  }
}
// CustomNumber 캐시
CustomNumber.cache = {};

export function createUnenumerableObject(target) {
  /**
   * spread 연산자는 객체의 얕은 복사를 수행합니다.
   * 얕은 복사는 객체의 최상위 속성만 복사하고, 중첩된 객체는 참조로 복사합니다.
   * 그렇다면?? 생성자에서 새로운 객체로 만들어서 넣어줘야하나..?
   * 
   * 각 키에 대한 Property의 enumerable 속성을 false로 변경한다!
   */
  Object.keys(target).map(key => {
    Object.defineProperty(target, key, {
      enumerable: false
    })
  })

  return target
}

export function forEach(target, callback) {
  /**
   * createUnenumerableObject에서 enumerable을 false로 했으니 다른 방법을 찾아야 한다.
   * 그래서 모든 프로퍼티 이름을 가져온다 -> key
   * 배열의 경우 length라는 프로퍼티가 있다! -> 필터링 해주기
   */
  Object.getOwnPropertyNames(target).filter(key => key !== "length").map(_key => {
    let value = target[_key]
    let key = _key

    /**
     * key던 value던 숫자일 경우 Number로 만들어준다.
     * isNaN 함수의 경우 "0", 0 모두 false를 반환하기 때문에 사용하기 적합하다고 판단
     */
    if (!isNaN(value)) {
      value = Number(value)
    }

    if (!isNaN(key)) {
      key = Number(key)
    }

    callback(value, key)
  })
}

export function map(target, callback) {
  if (Array.isArray(target)) {
    // console.log(JSON.stringify(target) + "is Array")
    const array = Object.getOwnPropertyNames(target).filter(key => key !== "length").map(_key => {
      return callback(target[_key])
    })

    return array
  } else {
    // console.log(JSON.stringify(target) + "is Not Array")
    /**
     * 일반 object의 경우에는 해당 속성이 빈 배열이지만
     * span의 경우에는 [ Symbol(impl) ]이 반환됨!
     */
    if (Object.getOwnPropertySymbols(target).length) {
      // NodeList는 순회가 되지 않아 Array로 변환
      const spansArray = Array.from(target)
      return spansArray.map(span => callback(span))
    } else {
      const entries = Object.getOwnPropertyNames(target).map(_key => {
        return ([_key, callback(target[_key])])
      })

      return Object.fromEntries(entries)
    }
  }
}

export function filter(target, callback) {
  if (Array.isArray(target)) {
    return Object.getOwnPropertyNames(target)
      .filter(key => key !== "length")
      .filter(key => callback(target[key]))
      .map(key => target[key])
  } else {
    /**
     * 일반 object의 경우에는 해당 속성이 빈 배열이지만
     * span의 경우에는 [ Symbol(impl) ]이 반환됨!
     */
    if (Object.getOwnPropertySymbols(target).length) {
      // NodeList는 순회가 되지 않아 Array로 변환
      const spansArray = Array.from(target)
      return spansArray.filter(span => callback(span))
    } else {
      const keys = Object.getOwnPropertyNames(target).filter((_key) => {
        return callback(target[_key])
      })

      return Object.fromEntries(keys.map(key => [[key], target[key]]))
    }
  }
}


export function every(target, callback) {
  if (Array.isArray(target)) {
    return Object.getOwnPropertyNames(target)
      .filter(key => key !== "length")
      .filter(key => callback(target[key]))
      .map(key => target[key])
      .length === target.length
  } else {
    if (Object.getOwnPropertySymbols(target).length) {
      const spansArray = Array.from(target)
      return spansArray.filter(span => callback(span)).length === target.length
    } else {
      const keys = Object.getOwnPropertyNames(target).filter((_key) => {
        return callback(target[_key])
      })

      return Object.fromEntries(keys.map(key => [[key], target[key]])).length === target.length
    }
  }
}

export function some(target, callback) {
  if (Array.isArray(target)) {
    return Object.getOwnPropertyNames(target)
      .filter(key => key !== "length")
      .filter(key => callback(target[key]))
      .map(key => target[key])
      .length !== 0
  } else {
    if (Object.getOwnPropertySymbols(target).length) {
      const spansArray = Array.from(target)
      return spansArray.filter(span => callback(span)).length !== 0
    } else {
      const keys = Object.getOwnPropertyNames(target).filter((_key) => {
        return callback(target[_key]).length !== 0
      })

      return Object.fromEntries(keys.map(key => [[key], target[key]])).length !== 0
    }
  }
}