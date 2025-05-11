import {list} from './sectNumbers.js'
import { db } from '../global/firebaseConfig.js';
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { rifaInfos } from "../global/rifaInfo.js";
import { gerarPix } from './verifyPayment.js';
import { getUserInfo, enableSendUserInfo} from './getUserInfo.js';
import { getReservState } from '../global/getReservedNumbers.js';

const numbers = list.querySelectorAll("li");
const button = document.querySelector("#pay");
const constPayment = rifaInfos.value;

let infoCreated = false;

let reservNumbers = [];

button.addEventListener("click", () => {
    reservNumbers.length = 0; //esvaziar antes de inicar a nova contagem
    numbers.forEach(num => {
        if (num.classList.contains("ClickedNum")){
            reservNumbers.push(parseInt(num.innerHTML))
        } else{
            let index = reservNumbers.indexOf(parseInt(num.innerHTML))
            if (index != -1){
                reservNumbers.splice(index)
            }
        }
    })
    

    if (reservNumbers.length > 0){
        nNumeros(reservNumbers)
        button.classList.add('none');
    } else{
        alert("É necessário que, no mínimo, um número esteja selecionado.");
    }
    
    if(document.body.contains(document.querySelector("#negButton"))){
        document.querySelector("#negButton").addEventListener('click', cancel);    
    }
    
    if(document.body.contains(document.querySelector("#cnfButton"))){
        document.querySelector("#cnfButton").addEventListener('click', () => {getUserInfo(); enableSendUserInfo(confirm);} );    
    }
})

function nNumeros(num){
    if (infoCreated){
        cancel();
    }
    var sectionCentralMegaTop = document.createElement("section")
    var sectInfo = document.createElement("section");
    var infoNum = document.createElement("p");
    var divButtons = document.createElement("div");
    var cnfButton = document.createElement("button");
    var negButton = document.createElement("button");

    cnfButton.innerHTML = "Confirmar";
    negButton.innerHTML = "Cancelar";

    cnfButton.classList.add("button");
    negButton.classList.add("button");

    cnfButton.id = "cnfButton";
    negButton.id = "negButton";
    infoNum.id = "infoNum";
    sectInfo.id = "sectInfo";
    
    infoNum.innerHTML = createMsg(num);
    
    divButtons.appendChild(negButton);
    divButtons.appendChild(cnfButton);

    sectInfo.appendChild(infoNum);
    sectInfo.appendChild(divButtons);

    sectionCentralMegaTop.appendChild(sectInfo);
    sectionCentralMegaTop.id = "confirmInfo";
    sectionCentralMegaTop.classList.add("Sprite-Grafiti");

    if (!infoCreated){
        document.body.appendChild(sectionCentralMegaTop);
        infoCreated = true;
    }

}

function createMsg(array){
    
    let qtd = array.length;

    let infoMsg = ``;
    
    const totVal = qtd * constPayment;
    
    if (qtd == 1){
        infoMsg = `O número selecionado foi: ${array}`
    } else{
        infoMsg = `Os número selecionados foram:`

        reservNumbers.forEach((num, index) => {
            if (index == 0){
                infoMsg+= ``;
            } else if (index == qtd-1){
                infoMsg+= ` e`;
            } else{
                infoMsg+= `,`;
            }
            infoMsg+= ` ${num}`
        })

        infoMsg+= `.`
    }
    infoMsg+= `\nO valor total é R$${totVal}.\nQuer realizar o pagamento?`

    infoMsg = infoMsg.replace(/\n/g, "<br>");

    return infoMsg;
}

function cancel(){
    document.body.removeChild(document.querySelector("#confirmInfo"));
    infoCreated = false;
    button.classList.remove('none');
}

function getName(){
    var firstInput = document.querySelector("#firstNameInput");
    var lastInput = document.querySelector("#lastNameInput");


    if (!firstInput.value || !lastInput.value) {
        alert("Preencha os dois campos!");
        return;
    } else if (firstInput.value.length < 2 || lastInput.value.length < 2){
        alert("Preencha sua identificação de forma correta!");
        return;
    }

    var firstName = `${firstInput.value}`;
    var lastName = `${lastInput.value}`;


    const infos = {
        "firstName": firstName.trim(),
        "lastName": lastName.trim()
    }
    
    return infos;
}

function getUserContact(){
    const contactInput = document.querySelector("#contactInput");

    let contact = contactInput.value;
    if (!contact || contact.length < 14){
        alert("Preencha seu número para contato, por gentileza.");
        return;
    }
    contact = `${contactInput.value}`;

    return contact;
}

async function confirm(){

    const inputNumber = reservNumbers;

    const rootName = rifaInfos.title;

    const name = getName();

    const contact = getUserContact();

    let filename = `${name.firstName}-${name.lastName}`

    filename = filename.replace(/\s/g, '_')

    const docRef = doc(db, rootName, filename);

    const docSnap = await getDoc(docRef);

    let reservaFeita = false;

    inputNumber.forEach(number => {
        if (getReservState(number)){
            alert("Nós verificamos que este número já está reservado. Tente outro");
            reservaFeita = true
            location.reload();
        } else if (docSnap.exists()){
            alert("Este nome já está sendo utilizado. Tente substituir")
            reservaFeita = true;
        }
    })

    if (!reservaFeita){
        await setDoc(docRef, {
            Usuario: name,
            Pagamento: true,
            Reservas: inputNumber,
            Contato: contact,
            timestamp: serverTimestamp()
        });
    
        // status.innerText = "Número reservado com sucesso!";
        // numeroInput.value = "";
        // nomeInput.value = "";
        
        // await gerarPix(inputNumber.length, filename);

        alert("Sua reserva foi efetuada com sucesso. Agradecemos por ajudar a turma!!");
        inputNumber.value = "";
        name.value = "";
        location.reload();
    }

}