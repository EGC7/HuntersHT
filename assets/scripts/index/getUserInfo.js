import { enableContactMask } from './contactMask.js';

function cancelGetUserInfo(){
    document.querySelector('#cancelUserInfo').addEventListener('click', () => { 
        document.querySelector("#userInfo").style.display = 'none';
    });
}

function getUserInfo(){
    const userInfo = document.createElement("section");
    const firstDiv = document.createElement("div");
    const main = document.createElement("main");
    const p = document.createElement("p");
    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    const label1 = document.createElement("label");
    const input1 = document.createElement("input");

    const li2 = document.createElement("li");
    const label2 = document.createElement("label");
    const input2 = document.createElement("input");

    const li3 = document.createElement("li");
    const label3 = document.createElement("label");
    const input3 = document.createElement("input");

    const footer = document.createElement("footer");
    const btnConf = document.createElement("button");
    const btnNeg = document.createElement("button");

    userInfo.id = "userInfo";
    input1.id = 'firstNameInput';
    input2.id = 'lastNameInput';
    input3.id = 'contactInput';
    btnConf.id = "sendUserInfo";
    btnNeg.id = "cancelUserInfo";

    input1.setAttribute('type', 'text')
    input1.setAttribute('placeholder', 'Primeiro Nome')

    input2.setAttribute('type', 'text')
    input2.setAttribute('placeholder', 'Último Nome')

    input3.setAttribute('type', 'tel')
    input3.setAttribute('placeholder', '(00) 00000-0000')
    input3.setAttribute('pattern', '^\(\d{2}\)\s\d{4,5}-\d{4}$')


    label1.setAttribute('for', input1.id);
    label2.setAttribute('for', input2.id);
    label3.setAttribute('for', input3.id);

    label1.innerHTML = "Nome: ";
    label2.innerHTML = "Sobrenome: ";
    label3.innerHTML = "Nº para contato: ";

    btnConf.innerHTML = "Enviar";
    btnNeg.innerHTML = "Voltar";

    main.innerHTML = 'Estamos quase lá';
    p.innerHTML = 'Para finalizar o processo, nós precisamos de alguns dados: ';

    footer.appendChild(btnConf);
    footer.appendChild(btnNeg);

    li1.appendChild(label1);
    li1.appendChild(input1);

    li2.appendChild(label2);
    li2.appendChild(input2);

    li3.appendChild(label3);
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

export { getUserInfo };