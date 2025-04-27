import {list} from './sectNumbers.js'

const nums = list.querySelectorAll('li');

nums.forEach(num => {
    num.addEventListener('click', () => {
        num.classList.toggle("noClickedNum");
        num.classList.toggle("ClickedNum");
    })
})
