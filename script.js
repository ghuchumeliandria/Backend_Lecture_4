// Fetch Data from these two sources and return the faster response: https://dummyjson.com/users and https://jsonplaceholder.typicode.com/users .
// Use either fetch or axios.

const fetchApi1 = new Promise((resolve) => {
  const fetchData = async () => {
    const data = await fetch(" https://jsonplaceholder.typicode.com/users");
    const res = await data.json();
    resolve(res);
  };
  fetchData();
});
const fetchApi2 = new Promise((resolve) => {
  const fetchData = async () => {
    const data = await fetch(" https://jsonplaceholder.typicode.com/users");
    const res = await data.json();
    resolve(res);
  };

  fetchData();
});
Promise.race([fetchApi1, fetchApi2]).then((value) => {
  const div = document.createElement("div");
  div.innerHTML = value
    .map((item) => {
      return `<p style="margin: 0 ; font-size: 18px;">task 1 : ${item.name}</p>`;
    })
    .join("");

  document.body.appendChild(div);
});
// 2) Write three promises that return arrays after different time intervals:
// Two should be resolve successfully.
// One should be reject.
// Merge the only fulfilled promises.

const promise1 = new Promise((resolve, reject) => {
  const success = true;
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  if (success) {
    setTimeout(() => {
      resolve(arr);
    }, 1000);
  } else {
    reject("error");
  }
});
const promise2 = new Promise((resolve, reject) => {
  const success = true;
  const arr = [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
  ];
  if (success) {
    setTimeout(() => {
      resolve(arr);
    }, 2000);
  } else {
    reject("error");
  }
});
const promise3 = new Promise((resolve, reject) => {
  const success = false;
  const arr = [1, "string", 3, "string", 5, "string", 7, "string"];
  if (success) {
    setTimeout(() => {
      resolve(arr);
    }, 3000);
  } else {
    reject("error");
  }
});
// let array = [];
Promise.allSettled([promise1, promise2, promise3]).then((value) => {
  //   value.map((item) => {
  //     if (item.status === "fulfilled") {
  //       array = array.concat(item.value);
  //     }
  //   });

  //   console.log(array, "Task 2");
  const filteredArr = value.filter((item) => item.status === "fulfilled");
  const mergedArr = filteredArr[0].value.concat(filteredArr[1].value);
  console.log(mergedArr);
});
// 3) Use these APIs: https://fakestoreapi.com/users  and https://jsonplaceholder.typicode.com/users Fetch data from both endpoints and display the combined data only if both promises are fulfilled successfully.

const fetchApi3 = new Promise((resolve) => {
  const fetchData = async () => {
    const data = await fetch("https://fakestoreapi.com/users");
    const res = await data.json();
    resolve(res);
  };

  fetchData();
});

const fetchApi4 = new Promise((resolve) => {
  const fetchData = async () => {
    const data = await fetch(" https://jsonplaceholder.typicode.com/users");
    const res = await data.json();
    resolve(res);
  };

  fetchData();
});

Promise.all([fetchApi3, fetchApi4]).then((value) => {
  let arr = value[0].concat(value[1]);
  console.log(arr);
});
// 4) Create a function that logs mouse coordinate after mouse stop moving. use debauncer technique.

// 5) Create a Input in html, when user typing something on it you should fetch data from this API: https://dummyjson.com/products/search?q=phone as you see there is a products where you can searching something. Replace 'phone' to user typed value and display the result, use debaunce technique to optimize performance.

function debauncer(cb, ms) {
  let interval;
  return (...args) => {
    clearInterval(interval);
    interval = setTimeout(() => {
      cb(...args);
    }, ms);
  };
}

let input = document.getElementById("input");
let text;
let h1 = document.getElementById("h1");
let p = document.getElementById("p");
input.addEventListener(
  "input",
  debauncer(async (e) => {
    text = e.target.value;
    let data = await fetch(
      `https://dummyjson.com/products/search?q=${e.target.value}`
    );
    let res = await data.json();
    let div = document.getElementById("div");
    res.products.map((item) => {
      let div2 = document.createElement("div");
      div2.innerHTML = `<h1>${item.title}</h1>`;
      div.appendChild(div2);
    });
  }, 100)
);
