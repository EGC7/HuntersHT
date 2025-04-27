import {list} from './sectNumbers.js'
import { db } from '../global/firebaseConfig.js';
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const numbers = list.querySelectorAll("li");
const button = document.querySelector("#pay");
const constPayment = 15.0;

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
        document.querySelector("#cnfButton").addEventListener('click', confirm);    
    }
})

function nNumeros(num){
    const qntNum = num.length;
    
    if (infoCreated){
        cancel();
    }

    var sectInfo = document.createElement("section");
    var infoNum = document.createElement("pre");
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
    
    divButtons.appendChild(cnfButton);
    divButtons.appendChild(negButton);

    sectInfo.appendChild(infoNum);
    sectInfo.appendChild(divButtons);

    if (!infoCreated){
        document.body.appendChild(sectInfo);
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
    infoMsg+= `\nO valor total de pagamento é de R$${totVal}.\nQuer realizar o pagamento?`

    infoMsg.replace(/\n/g, "<br>");

    return infoMsg;
}

function cancel(){
    document.body.removeChild(document.querySelector("#sectInfo"));
    infoCreated = false;
    button.classList.remove('none');
}

function getName(){
    var input = document.querySelector("#nameInput");

    const name = input.value;

    const infos = {
        "firstName": name.split(" ")[0],
        "lastName": name.split(" ")[1]
    }
    
    return infos;
}

async function confirm(){

    const inputNumber = reservNumbers;

    // const status = document.getElementById("status");

    
    const name = getName();

    const filename = `${name.firstName}_${name.lastName}`
    // if (!numero || !nome) {
    //     status.innerText = "Preencha os dois campos!";
    //     return;
    // }

    const docRef = doc(db, "rifa", filename);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // status.innerText = "Esse número já foi escolhido!";
        alert("Nós verificamos que você já tem uma reserva, deseja substituir?");
    } else {
        await setDoc(docRef, {
        Usuario: name,
        Pagamento: false,
        Reservas: inputNumber,
        timestamp: serverTimestamp()
        });

        // status.innerText = "Número reservado com sucesso!";
        // numeroInput.value = "";
        // nomeInput.value = "";

        alert("Número reservado com sucesso!");
        inputNumber.value = "";
        name.value = "";
    }

}