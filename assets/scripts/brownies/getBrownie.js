import { enableContactMask } from "../index/contactMask.js";
import { getFlavors } from "./getOnFlavors.js";
import { sendMessage } from "./sendWhatsappMessage.js";
import { createPaymentDiv } from "./browniePayment.js";

const browniesSabores = await getFlavors();

function setFlavorsOnSelect(){
    const selectFlavors = document.querySelector('#flavors');
    
    browniesSabores.forEach(flavor => {
        let option = document.createElement('option');
        option.classList.add('optionFlavor');
        
        option.innerHTML = `${flavor}`;

        selectFlavors.appendChild(option);

    });
}

function showFlavorOnHTML(){
    const rootForm = document.querySelector('form');
    
    browniesSabores.forEach(flavor => {
    
        const label = document.createElement('label');
        const p = document.createElement('p');
        const check = document.createElement('input');
        const qtd = document.createElement('input');
    
        label.classList.add('Sprite-Grafiti');
        label.classList.add('labelSabor');
        label.setAttribute('for', `check-${flavor}`);
        
        check.classList.add('check');
        check.id = `check-${flavor}`;
        check.setAttribute('type', 'checkbox');
        check.setAttribute('value', 0);
        
        qtd.classList.add('quantidade');
        qtd.setAttribute('type', 'number');
        qtd.setAttribute('min', 0);
        qtd.setAttribute('max', 10);
        qtd.setAttribute('value', 0);
        qtd.readOnly = true;

        
        p.innerText = `${flavor}`;

        label.appendChild(p);
        label.appendChild(check);
        label.appendChild(qtd);
        
        rootForm.insertBefore(label, document.querySelector('button'));
        console.log('created')

    });
}

// // setFlavorsOnSelect();

showFlavorOnHTML();

enableContactMask();

const button = document.querySelector("button");
const brownieInputs = document.querySelectorAll(".check");
const qtds = document.querySelectorAll(".quantidade");
var checkedList = [];

button.disabled = true;

let user = {
    name: "",
    contact: "",
    brownies: []
};

brownieInputs.forEach((brownie, index) => {
    brownie.addEventListener('change', () => {
        checkedList[index] = brownie.checked;
        
        button.disabled = !checkedList.includes(true);    
        qtds[index].readOnly = !checkedList.includes(true);
    })
})


function getName(){
    var nameInput = document.querySelector("#name");
    var value = `${nameInput.value}`.trim();

    
    if ((value < 2) || (!value.includes(" "))){
        // mailInput.style.border = "3px solid red";
        const pError = document.createElement("p")
        pError.innerHTML = "Nome inválido *";
        pError.style.color = "red";
        pError.style.fontSize = "1.2rem";
        
        document.querySelectorAll("label")[0].appendChild(pError);
        nameInput.style.border = "3px solid red";

        setTimeout(() => {
            document.querySelectorAll("label")[0].removeChild(pError);
            nameInput.style.border = "3px solid green";
        }, 3500);

    } else{
        var firstName = `${value.split(" ")[0]}`;
        var lastName = `${value.split(" ")[1]}`;
    
        const name = `${firstName} ${lastName}`
        
        return name;
    }
}

function getContact(){
    const contactInput = document.querySelector(".contactInput");
    var value = `${contactInput.value}`.trim();
    if (value.length >= 13){
        return value;

    } else{
        const pError = document.createElement("p")
        pError.innerHTML = "Contato inválido *";
        pError.style.color = "red";
        pError.style.fontSize = "1.2rem";
        
        document.querySelectorAll("label")[1].appendChild(pError);
        contactInput.style.border = "3px solid red";
        
        setTimeout(() => {
            document.querySelectorAll("label")[1].removeChild(pError);
            contactInput.style.border = "3px solid green";
        }, 3500);
    }
}

function getBrownies() {

    let chks = 0;
    let sabores = [];
    let quantidade = [];
    let saborInfo = {};
    let brownies = browniesSabores;

    brownieInputs.forEach( (input, index) => {
        if (input.checked){
            chks++
            sabores.push(index);
            if (qtds[index].value <= 0){
                const pError = document.createElement("p")
                pError.innerHTML = "Quantidade inválida *";
                pError.style.color = "red";
                pError.style.fontSize = "1.2rem";
                
                document.querySelectorAll("label")[(index+2)].appendChild(pError);
                
                setTimeout(() => {
                    document.querySelectorAll("label")[index+2].removeChild(pError);
                }, 3500);   
            }else{
                quantidade = qtds[index].value;
    
                saborInfo[brownies[index]] = quantidade;
            }

        }
    })

    brownieInputs.forEach( (input, index) => {
        if (chks == 0){
            const pError = document.createElement("p")
            pError.innerHTML = "Sabor inválido *";
            pError.style.color = "red";
            pError.style.fontSize = "1.2rem";
            
            document.querySelectorAll("label")[(index+2)].appendChild(pError);
            
            setTimeout(() => {
                document.querySelectorAll("label")[index+2].removeChild(pError);
            }, 3500);   
        }
    })
    return saborInfo;
}

button.addEventListener("click", (event) => {
    event.preventDefault();

    user.name =  getName();
    user.contact =  getContact();
    user.brownies = getBrownies();
    
    console.log(user);
    
    if(user.name && user.contact && Object.keys(user.brownies).length > 0){
        createPaymentDiv();
        document.querySelector('#paymentDiv').querySelectorAll('button')[0].addEventListener('click', async () => {
            const texto = document.querySelector('main').innerText;
            navigator.clipboard.writeText(texto).then(() => {
                alert('Texto copiado!');
            }).catch(err => {
                console.error('Falha ao copiar texto: ', err);
                alert('Falha ao copiar texto.');
            });
        }
        );
        document.querySelector('#sendButton').addEventListener('click', () => {
            try{
                sendMessage(user.name, user.contact, user.brownies);
            } catch(e){
                console.error(e);
            }
        })
    } else{ return}
    
})