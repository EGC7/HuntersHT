const sect = document.querySelector("#sectNumbers");
const totalNumbers = 50;
const list = sect.querySelector("ul");

for (let num=0; num<totalNumbers; num++){
    var number = document.createElement("li");
    var x1 = document.createElement("div");
    var x2 = document.createElement("div");
    
    number.classList.add("number");
    number.classList.add("noClickedNum");
    // number.classList.add("preSelected");
    number.innerHTML = num < 9 ? `0${num+1}` : `${num+1}`; 

    x1.id = "selectX1";
    x2.id = "selectX2";
    
    x1.classList.add("selectedX");
    x2.classList.add("selectedX");
    
    number.appendChild(x1)
    number.appendChild(x2)
    list.appendChild(number)
}

export { list }