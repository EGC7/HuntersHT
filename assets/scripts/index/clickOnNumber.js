import {list} from './sectNumbers.js'

const nums = list.querySelectorAll('li');

nums.forEach(num => {
    if (num.classList.contains('preSelected')){return};
    num.addEventListener('click', () => {
        num.classList.toggle("noClickedNum");
        num.classList.toggle("ClickedNum");
    });
});
