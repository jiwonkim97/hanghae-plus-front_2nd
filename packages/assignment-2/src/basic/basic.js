export function shallowEquals(target1, target2) {
  // object 타입과 literal 타입을 구분합니다.
  if(typeof target1 === "object" && typeof target2 === "object"){
    // null의 타입은 object로 분류되기 때문에 null을 우선 처리해줍니다
    if(target1 === null && target2 === null){
      return true
      // Array의 경우 Array.isArray 함수를 통해 따로 분류합니다.
    }else if(Array.isArray(target1) && Array.isArray(target2)){
      // 배열의 길이 우선 비교
      if(target1.length !== target2.length){
        return false
      }
      // 배열의 값들을 순회하면서 비교 후에 결과를 반환합니다.
      return !target1.map((value, index) => value === target2[index]).includes(false)
    }else{
      try{
        const aConst = target1.constructor()
        const bConst = target1.constructor()
        // new 연산자를 통해 생성된 객체는 constructor 함수가 없는것을 이용합니다.
        if(typeof aConst === "object" && typeof bConst === "object"){
          // 이렇게 스프레드를 했을때 테스트 통과는 했는데 이런식으로 접근해도 맞는것인지...
          return shallowEquals(...Object.entries(target1), ...Object.entries(target2))

          // constructor의 타입이 object가 아닌경우에는 Object.is로 비교를 위해 에러를 throw 합니다.
        }else{
          throw new Error
        }
      }catch{
        // new 연산자를 통해 생성된 객체는 Object.is로 얕은 비교를 수행합니다.
        return Object.is(target1, target2)
      }
    }
  }else{
    return target1 === target2;
  }
}

export function deepEquals(target1, target2) {
  return JSON.stringify(target1) === JSON.stringify(target2)
}


export function createNumber1(n) {
  return new Number(n);
}

export function createNumber2(n) {
  return new String(n);
}

export function createNumber3(n) {
  let _n = new String(n)
  Object.defineProperty(_n, "toJSON", {value: () => `this is createNumber3 => ${_n}`, writable: false,})
  Object.defineProperty(_n, "valueOf", {value: () => parseInt(_n), writable: false,})
  
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
  Object.defineProperty(target, "propertyIsEnumerable", {
    value: () => false,
    writable: false
  })
  return target;
}

export function forEach(target, callback) {

}

export function map(target, callback) {

}

export function filter(target, callback) {

}


export function every(target, callback) {

}

export function some(target, callback) {

}



