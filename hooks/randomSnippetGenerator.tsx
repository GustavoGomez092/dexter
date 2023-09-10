export default function ExportSnippet() {
  const snippets = [
`
// HTTPS Redirect

const httpsRedirect = () => {
  if (location.protocol !== 'https:')
    location.replace('https://' + location.href.split('//')[1]);
  };
  httpsRedirect();
// Redirect from http://mydomain.com to https://mydomain.com

`,
`
// Input value as a Number

const numInput = document.getElementById('num-input');

let num;
// Bad: parseFloat() converts the string to a number
num = parseFloat(numInput.value);

// Good: returns a numeric value
num = numInput.valueAsNumber;

`,
`
// Handle click outside

const onClickOutside = (elementId, callback) => {
  const element = document.getElementById(elementId);

  document.addEventListener("click", (e) => {
    if (!element.contains(e.target)) callback();
  });
};

onClickOutside("red-box", () => console.log("Clicked outside red box"));

document.addEventListener("DOMContentLoaded", onClickOutside);

`,
`
// Handle scroll stop

const onScrollStop = callback => {
  let isScrolling;
  window.addEventListener(
    'scroll',
    e => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        callback();
      }, 150);
    },
    false
  );
};

onScrollStop(() => {
  console.log('The user has stopped scrolling');
});

`,
`
// Detect if capsLock is on or off

el.addEventListener('keyup', e => {
  msg.style = e.getModifierState('CapsLock')
    ? 'display: block'
    : 'display: none';
});

`,
`
// All values inside the array are equal
const allEqual = arr => arr.every(val => val === arr[0]);

allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true

`,
`
// Get Average
const average = (...nums) => {
  nums.reduce((acc, val) => acc + val, 0) / nums.length;
}

average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2

`,
`
// Capitalize
const capitalize = ([first, ...rest]) =>
first.toUpperCase() + rest.join('');

capitalize('fooBar'); // 'FooBar'
capitalize('fooBar', true); // 'Foobar'

`,
]
  const getRandomSnippet = () => {
  const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)]
  return randomSnippet
  }

  return {
    getRandomSnippet
  }
}