/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function (functions) {
    return new Promise((resolve, reject) => {
      const size = functions.length;
      const orderedResponse = [];
      for (let i = 0; i < size; i++) {
        const fn = functions[i];
        fn()
          .then((res) => {
            orderedResponse[i] = res;
            if (Object.keys(orderedResponse).length === size) {
              const response = [];
              Object.keys(orderedResponse).sort().forEach(key => {
                  response.push(orderedResponse[key]);
              })
              resolve(response);
            }
          })
          .catch((res) => {
            reject(res);
          });
      }
    });
  };
  
  /**
   * const promise = promiseAll([() => new Promise(res => res(42))])
   * promise.then(console.log); // [42]
   */
const promise1 = () =>
  new Promise((res) => {
    setTimeout(() => {
      res(42);
    }, 1000);
  });
const promise2 = () =>
  new Promise((res) => {
    res(100);
  });

const all = promiseAll([promise1, promise2]);

all.then(console.log);
