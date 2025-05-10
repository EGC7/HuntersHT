import { reserveds } from "../global/getReservedNumbers.js";
import { rifaInfos } from "../global/rifaInfo.js";

const sect = document.querySelector("#sectNumbers");
const totalNumbers = rifaInfos.totNum;
const numberInitial = rifaInfos.initNum;
const list = sect.querySelector("ul");

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
    list.appendChild(number)
}

list.querySelectorAll("li").forEach(li => {
    if (reserveds.includes(parseInt(li.innerHTML))){
        li.classList.remove("noClickedNum");
        li.classList.add("preSelected");
        // li.style.pointerEvents = 'none';
    }
}) // EU NÃO SEI PQ NÃO FUNCIONA NO MEU CELULAR, MAS ESPERO QUE ESTEJA NORMAL NO DOS OUTROS >:(

export { list }