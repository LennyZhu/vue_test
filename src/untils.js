export function deepObjectMerge(obj, obj2) {
  for (let key in obj2) {
    obj[key] =
      obj[key] && obj[key].toString() === "[object Object]"
        ? deepObjectMerge(obj[key], obj2[key])
        : (obj[key] = obj2[key]);
  }
  return obj;
}

export function deepClone(data) {
  let isArr = Array.isArray(data);
  let isObj = Object.prototype.toString.call(data) === "[object Object]";
  if (isArr) {
    // 克隆数组
    let newObj = [];
    for (let i = 0; i < data.length; i++) {
      newObj[i] = deepClone(data[i]);
    }
    return newObj;
  } else if (isObj) {
    // 克隆Object
    let newObj = {};
    for (let i in data) {
      newObj[i] = deepClone(data[i]);
    }
    return newObj;
  }
  // 不是引用类型直接返回
  return data;
}

export function debounce(fun, time = 500) {
  let timer;
  return function () {
    clearTimeout(timer);
    let args = arguments;
    timer = setTimeout(() => {
      fun.apply(this, args);
    }, time);
  };
}

export function cutString(str, len, suffix) {
  if (!str) return "";
  if (len <= 0) return "";
  if (!suffix) suffix = "";
  var templen = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      templen += 2;
    } else {
      templen++;
    }
    if (templen == len) {
      return str.substring(0, i + 1) + suffix;
    } else if (templen > len) {
      return str.substring(0, i) + suffix;
    }
  }
  return str;
}

export function checkCardNo(num) {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(num);
}

export function randomString(len) {
  len = len || 8;
  let $chars =
    "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * $chars.length));
  }
  return pwd;
}

export function getRandomColor() {
  const rgb = [];
  for (let i = 0; i < 3; i++) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length == 1 ? "0" + color : color;
    rgb.push(color);
  }
  return "#" + rgb.join("");
}

export function sort(arr, type) {
  return arr.sort((a, b) => {
    switch (type) {
      case 1:
        return a - b;
      case 2:
        return b - a;
      case 3:
        return Math.random() - 0.5;
      default:
        return arr;
    }
  });
}

export function remove(arr, ele) {
  let index = arr.indexOf(ele);
  if (index != -1) arr.splice(index, 1);
  return arr;
}

export function max(arr) {
  return Math.max.apply(null, arr);
}

export function trim(str, type = 1) {
  switch (type) {
    case 1:
      return str.replace(/\s+/g, "");
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, "");
    case 3:
      return str.replace(/(^\s*)/g, "");
    case 4:
      return str.replace(/(\s*$)/g, "");
    default:
      return str;
  }
}
export function unique(arr) {
  // for (let i = 0; i < arr.length; i++) {
  //   for (let j = i + 1; j < arr.length; j++) {
  //     if (arr[i] === arr[j]) {
  //       arr.splice(j, 1);
  //       j--;
  //     }
  //   }
  // }
  // return arr;

  // return [...new Set(arr)];

  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

// instanceof实现原理
// export function _instanceof(left, right) {
// const rightVal = right.prototype;
// const leftVal = left.__proto__;
// while (true) {
//   if (leftVal === null) {
//     return false;
//   }
//   if (leftVal === rightVal) {
//     return true;
//   }
//   leftVal = leftVal.__proto__;
// }
// }

// 手写new简易版
// function myNew(fn, ...args) {
//   let obj = {}
//   obj.__proto__ = fn.prototype
//   fn.apply(obj,args)
//   return obj
// }

// 斐波拉契数列
// function fn(n) {
//   if (n === 1 || n === 2) {
//     return 1
//   } else {
//     return fn(n-1) + fn(n-2)
//   }
// }

// 冒泡排序
// let arr = [1,4,6,2,0]
// for(let i = 0; i<arr.length; i++) {
//   for(let j = 0; j<arr.length-i; j++) {
//     if (arr[j] > arr[j+1]) {
//       let temp = arr[j]
//       arr[j] = arr[j+1]
//       arr[j+1] = temp
//     }
//   }
// }
