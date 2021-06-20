export function* helloSaga() {
  console.log('Hello Sagas!');
  yield console.log('Hello Sagas!');
}

export function* helloSaga1() {
  yield console.log('Hello Sagas!');
}
