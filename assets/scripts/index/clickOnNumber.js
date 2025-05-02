import {list} from './sectNumbers.js'
import { getReservState } from '../global/getReservedNumbers.js';

const nums = list.querySelectorAll('li');

nums.forEach(num => {
    if (num.classList.contains('preSelected')){return};
    num.addEventListener('click', () => {
        if (getReservState(parseInt(num.innerText))){
            alert(`O número ${parseInt(num.innerText)} infelizmente já foi reservado. Escolha outro.`);
        } else{
            num.classList.toggle("noClickedNum");
            num.classList.toggle("ClickedNum");
        }
    });
});
