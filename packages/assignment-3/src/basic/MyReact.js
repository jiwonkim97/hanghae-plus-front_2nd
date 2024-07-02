import { createHooks } from "./hooks";
import { render as customRender } from "./render";

function MyReact() {
  let _root = null;
  let _rootComponent = null;
  let _oldComponent = null;
  const _render = () => {
    console.log("rerender")
    console.log(JSON.stringify(_oldComponent))
    console.log(JSON.stringify(_rootComponent()))
    console.log("==============================")

    customRender(_root, _rootComponent(), _oldComponent)
    _oldComponent = _rootComponent()
  };
  function render($root, rootComponent) { 
    console.log("render")
    console.log($root.innerHTML)
    console.log(JSON.stringify(rootComponent()))
    console.log("==============================")
    _root = $root
    _rootComponent = rootComponent
    _oldComponent = rootComponent()
    customRender($root, rootComponent())
  }

  const { useState, useMemo, resetContext: resetHookContext } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
