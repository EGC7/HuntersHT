import { rifaInfos } from '/public/assets/scripts/global/rifaInfo.js';

async function gerarPix(qtd, user) {
    const resposta = await fetch('/url-da-sua-http-function', {
      method: 'POST',
      body: JSON.stringify({
        key: "91996410818",
        name: user,
        city: "Belém",
        transactionId: "TX000",
        message: "Pagamento da Rifa",
        value: parseFloat((rifaInfos.value * qtd).toFixed(2)),
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    const { payload, base64 } = await resposta.json();
    linkPayment(payload, base64)
  }

async function linkPayment(copiaEcola, dataImage){
    return new Promise((resolve) => {
        var blurSection = document.createElement("section");
        var paymentPix = document.createElement("section");

        var pixLink = document.createElement("input");
        var qrCodeCenter = document.createElement("div");
        var titleMsg = document.createElement("main");
        var copyButton = document.createElement("button");

        titleMsg.innerHTML = "Aponte para o QR code, ou copie o link e efetue o pagamento para garantir a sua reserva.";
        
        copyButton.innerHTML = "Pix Copia e Cola";
    
        copyButton.classList.add("button");
        titleMsg.classList.add("Sprite-Grafiti");

        copyButton.id = "copyButton";
        paymentPix.id = "pixSection";
        blurSection.id = "blurSection";

        pixLink.setAttribute('type', 'text');
        pixLink.readOnly = true;

        pixLink.value = `${copiaEcola}`

        paymentPix.appendChild(titleMsg);
        paymentPix.appendChild(qrCodeCenter);
        paymentPix.appendChild(pixLink);
        paymentPix.appendChild(copyButton);
        
        qrCodeCenter.style.backgroundImage = `url('${dataImage}')`;

        blurSection.appendChild(paymentPix);
        document.body.appendChild(blurSection);

        copyButton.addEventListener('click', () => {
            pixLink.select();
            pixLink.setSelectionRange(0, 99999);
            
            navigator.clipboard.writeText(pixLink.value)
            
            alert('Código Pix copiado!');

            resolve();
        }, { once: true });
    })
}

export { gerarPix }