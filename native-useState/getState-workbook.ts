function getState() {
  let value = 42;
  return [value];
}

let [myValue] = getState();
myValue;
myValue = 22;
myValue;

let [myValueAgain] = getState();
myValueAgain;
