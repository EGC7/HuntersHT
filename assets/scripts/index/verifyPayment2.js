import { rifaInfos } from '../global/rifaInfo.js';

async function gerarPix(qtd, myNum) {
    const payload = "hunters3ht@gmail.com";
    const dataImage = "/assets/images/qrcode-pix.png";
    await linkPayment(payload, dataImage, qtd, myNum);
  }

async function linkPayment(copiaEcola, dataImage, qtd, comproveContact){
    return new Promise((resolve) => {
        var blurSection = document.createElement("section");
        var paymentPix = document.createElement("section");

        var pixLink = document.createElement("input");
        var qrCodeCenter = document.createElement("div");
        var titleMsg = document.createElement("main");
        var finallyMsg = document.createElement("meta");
        var copyButton = document.createElement("button");
        var finallyButton = document.createElement("button");

        titleMsg.innerHTML = "Aponte para o QR code, ou copie a chave pix e efetue o pagamento para garantir a sua reserva!";
        titleMsg.innerHTML += qtd > 1 ? `<br><br> O valor de pagamento é de R$${(qtd*rifaInfos.value).toFixed(2)}, pois você escolheu ${qtd} números.` : `<br><br> O valor de pagamento é de R$${(qtd*rifaInfos.value).toFixed(2)}, pois você escolheu ${qtd} número.`;
        
        finallyMsg.innerHTML += `<br>Após finalizar  o pagamento, envie o comprovante para: <br> Eduardo Cajueiro - ${comproveContact}`;
        
        finallyMsg.setAttribute("name", "format-detection");
        finallyMsg.setAttribute("content", "telephone=no");

        copyButton.innerHTML = "Copiar chave Pix";
        finallyButton.innerHTML = "Finalizar Processo";
    
        finallyButton.classList.add("button");
        copyButton.classList.add("button");

        titleMsg.classList.add("Sprite-Grafiti");
        finallyMsg.classList.add("Sprite-Grafiti");

        copyButton.id = "copyButton";
        finallyButton.id = "finallyButton";
        paymentPix.id = "pixSection";
        blurSection.id = "blurSection";

        pixLink.setAttribute('type', 'text');
        pixLink.readOnly = true;

        pixLink.value = `${copiaEcola}`

        paymentPix.appendChild(titleMsg);
        paymentPix.appendChild(finallyMsg);
        paymentPix.appendChild(qrCodeCenter);
        paymentPix.appendChild(pixLink);
        paymentPix.appendChild(copyButton);
        paymentPix.appendChild(finallyButton);
        
        qrCodeCenter.style.backgroundImage = `url('${dataImage}')`;

        blurSection.appendChild(paymentPix);
        document.body.appendChild(blurSection);

        copyButton.addEventListener('click', () => {
            pixLink.select();
            pixLink.setSelectionRange(0, 99999);
            
            navigator.clipboard.writeText(pixLink.value)
            
            alert('Código Pix copiado!');
        });

        finallyButton.addEventListener('click', () => {
            resolve();
        }, { once: true });
    })
}

export { gerarPix }