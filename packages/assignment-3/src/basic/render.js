export function jsx(type, props, ...children) {
  return {type, props, children: children.flat()}
}

export function createElement(node) {
  // jsx를 dom으로 변환
  const element = document.createElement(node.type)
  // props이 null이 아닐 시 prop을 추가해줍니다.
  if(node.props){
    const propList = Object.entries(node.props)
    propList.forEach(prop => element.setAttribute(prop[0], prop[1]))
  }
  // children이 있는 경우 children을 추가해줍니다.
  if(node.children){
    for (let i = 0 ; i < node.children.length; i ++ ){
      const target = node.children[i]
      // 더이상 child가 node가 아닐때
      if(typeof target === 'string'){
        element.innerHTML = target
      }else{
        element.appendChild(createElement(target))
      }
    }
  }

  return element
}

function updateAttributes(target, newProps, oldProps) {
  // newProps들을 반복하여 각 속성과 값을 확인
  //   만약 oldProps에 같은 속성이 있고 값이 동일하다면
  //     다음 속성으로 넘어감 (변경 불필요)
  //   만약 위 조건에 해당하지 않는다면 (속성값이 다르거나 구속성에 없음)
  //     target에 해당 속성을 새 값으로 설정

  if(!isNill(newProps)){
    const keys = Object.keys(newProps)
    keys.map((key, idx) => {
      if(!isNill(oldProps) && oldProps[key] === newProps[key]){
        return
      }else{
        target.setAttribute(key, newProps[key])
      }
    })
  }
  // oldProps을 반복하여 각 속성 확인
  //   만약 newProps들에 해당 속성이 존재한다면
  //     다음 속성으로 넘어감 (속성 유지 필요)
  //   만약 newProps들에 해당 속성이 존재하지 않는다면
  //     target에서 해당 속성을 제거
  if(!isNill(oldProps)){
    const keys = Object.keys(oldProps)
    keys.map((key, idx) => {
      if(!isNill(newProps) && newProps[key] === oldProps[key]){
        return
      }else{
        target.removeAttribute(key)
      }
    })
  }
}

/**
 * 태그 안의 내용이 달라지는 경우 innerHTML을 수정
 * 태그에 태그를 child로 추가할 때는 appendChild()
 */
export function render(parent, newNode, oldNode, index = 0) {
  console.log( "render.js render")
  // 1. 만약 newNode가 없고 oldNode만 있다면
  //   parent에서 oldNode를 제거
  //   종료
  if(newNode === undefined && oldNode !== undefined){
    console.log("case 1")
    parent.removeChild(oldNode)
    return
  }

  // 2. 만약 newNode가 있고 oldNode가 없다면
  //   newNode를 생성하여 parent에 추가
  //   종료
  if(newNode !== undefined && oldNode === undefined){
    console.log("==============================")
    console.log("case 2")
    console.log(newNode)
    console.log(oldNode)
    console.log("==============================")
    const child = createElement(newNode)
    parent.appendChild(child)
    return
  }

  // 3. 만약 newNode와 oldNode 둘 다 문자열이고 서로 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  if(isString(newNode) && isString(oldNode) && newNode !== oldNode){
    parent.replaceChildren(newNode)
    return
  }

  // 4. 만약 newNode와 oldNode의 타입이 다르다면
  //   oldNode를 newNode로 교체
  //   종료
  if(typeof newNode !== typeof oldNode){
    console.log("case 4")
    parent.replaceChildren(newNode)
    return
  }

  // 5. newNode와 oldNode에 대해 updateAttributes 실행
  updateAttributes(parent.firstChild, newNode?.props, oldNode?.props)

  // 6. newNode와 oldNode 자식노드들 중 더 긴 길이를 가진 것을 기준으로 반복
  //   각 자식노드에 대해 재귀적으로 render 함수 호출
  
  let longChildrenLength = (newNode.children?.length ?? 0) > (oldNode.children?.length ?? 0) ? newNode.children.length : oldNode.children.length
  for(let i = 0 ; i < longChildrenLength ; i ++ ){
    if(newNode.children[i] === oldNode.children[i]) continue
    // parent.firstChild에 넣어도 되는건가??
    render(parent.firstChild, newNode.children[i], oldNode.children[i])
  }
}

const isString = (target) => {
  return typeof target === "string"
}

const isUndefined = (target) => {
  return target === undefined
}

const isNull = (target) => {
  return target === null
}

const isNill = (target) => {
  return isUndefined(target) || isNull(target)
}