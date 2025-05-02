import { enableContactMask } from './contactMask.js';

function cancelGetUserInfo(){
    
    if(document.body.contains(document.querySelector("#cancelUserInfo"))){
        document.querySelector("#cancelUserInfo").addEventListener('click', () => {
            document.body.removeChild(document.querySelector("#userInfo"));
        }
        );
    }
}
function enableSendUserInfo(func){
    if(document.body.contains(document.querySelector("#sendUserInfo"))){
        document.querySelector("#sendUserInfo").addEventListener('click', func);
    }
}

function getUserInfo(){
    
    const userInfo = document.createElement("section");
    const firstDiv = document.createElement("div");
    const main = document.createElement("main");
    const p = document.createElement("p");
    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    const input1 = document.createElement("input");

    const li2 = document.createElement("li");
    const input2 = document.createElement("input");

    const li3 = document.createElement("li");
    const input3 = document.createElement("input");

    const footer = document.createElement("footer");
    const btnConf = document.createElement("button");
    const btnNeg = document.createElement("button");

    userInfo.classList.add("Sprite-Grafiti");

    userInfo.id = "userInfo";
    input1.id = 'firstNameInput';
    input2.id = 'lastNameInput';
    input3.id = 'contactInput';
    btnConf.id = "sendUserInfo";
    btnNeg.id = "cancelUserInfo";

    input1.setAttribute('type', 'text');
    input1.setAttribute('placeholder', 'Primeiro Nome');
    input1.setAttribute('autocomplete', 'off');

    input2.setAttribute('type', 'text');
    input2.setAttribute('placeholder', 'Último Nome');
    input2.setAttribute('autocomplete', 'off');

    input3.setAttribute('type', 'tel');
    // input3.setAttribute('placeholder', '(00) 00000-0000');
    input3.setAttribute('placeholder', 'WhatsApp com DDD');
    input3.setAttribute('pattern', '^\(\d{2}\)\s\d{4,5}-\d{4}$');
    input3.setAttribute('autocomplete', 'off');

    btnConf.innerHTML = "Enviar";
    btnNeg.innerHTML = "Voltar";

    main.innerHTML = 'Estamos quase lá';
    p.innerHTML = 'Para finalizar o processo nós precisamos de alguns dados para identificação:';

    footer.appendChild(btnNeg);
    footer.appendChild(btnConf);

    li1.appendChild(input1);

    li2.appendChild(input2);

    li3.appendChild(input3);

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);

    firstDiv.appendChild(main);
    firstDiv.appendChild(p);
    firstDiv.appendChild(ul);
    firstDiv.appendChild(footer);
    userInfo.appendChild(firstDiv);

    document.body.appendChild(userInfo);

    cancelGetUserInfo();
    enableContactMask();
}

export { getUserInfo, enableSendUserInfo};