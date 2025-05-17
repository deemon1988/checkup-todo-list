async function* generator() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  yield 1;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  yield 2;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  yield 3;
}

const gen = generator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
