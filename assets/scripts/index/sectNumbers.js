import { getReservedNumbers, getReservState } from "../global/getReservedNumbers.js";
import { rifaInfos } from "../global/rifaInfo.js";


async function createNumberList() {

    const sect = document.querySelector("#sectNumbers");
    const totalNumbers = rifaInfos.totNum;
    const numberInitial = rifaInfos.initNum;
    const list = sect.querySelector("ul");

    const reserveds = await getReservedNumbers();

    for (let num=(numberInitial-1); num<totalNumbers; num++){
        var number = document.createElement("li");
        var x1 = document.createElement("div");
        var x2 = document.createElement("div");
        
        number.innerHTML = num < 9 ? `0${num+1}` : `${num+1}`; 
        
        number.classList.add("number");
        number.classList.add("Sprite-Grafiti")
        number.classList.add("noClickedNum");
    
        x1.id = "selectX1";
        x2.id = "selectX2";
        
        x1.classList.add("selectedX");
        x2.classList.add("selectedX");
        
        number.appendChild(x1)
        number.appendChild(x2)
        
        list.appendChild(number);
    }
    
    const nums = list.querySelectorAll('li');
    
    nums.forEach(li => {
        if (reserveds.includes(parseInt(li.innerHTML))){
            li.classList.remove("noClickedNum");
            li.classList.add("preSelected");
            // li.style.pointerEvents = "none";
        }
    })
    
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

    return nums;
}

export { createNumberList }