export const composeClassName = (
  normalClassName: string,
  addClassNames: boolean,
  ...additionalClassNames: string[]
) => {
  let className = normalClassName;

  if (addClassNames) {
    additionalClassNames.forEach((name) => (className += " " + name));
  }

  return className;
};

export const funcWithCallFunc = (func: Function, funcIn: Function) => {
  return (...values: any[]) => {
    return func(funcIn(...values));
  };
};
