import { createHooks } from "./hooks";
import { render as customRender, isNull } from "./render";

function MyReact() {
  let _root = null;
  let _rootComponent = null;
  let _oldComponent = null;

  function resetContext() {
    _root = null;
    _rootComponent = null;
    _oldComponent = null;
    resetHookContext()
  }
  const _render = () => {
    resetHookContext()
    const newComponent = _rootComponent()

    if (isNull(_oldComponent)) {
      customRender(_root, newComponent)
    } else {
      customRender(_root, newComponent, _oldComponent)
    }
    _oldComponent = newComponent
  };

  function render($root, rootComponent) {
    resetContext()
    _root = $root
    _rootComponent = rootComponent

    _render()
  }

  const { useState, useMemo, resetContext: resetHookContext } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
