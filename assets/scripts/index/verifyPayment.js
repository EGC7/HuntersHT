import { rifaInfos } from '../global/rifaInfo';
const { QrCodePix } = require('qrcode-pix');

async function gerarPix(total) {
    const qrCode = QrCodePix({
      version: '01',
      key: 'hunters3ht@gmail.com',
      name: 'Fulaninho',
      city: 'Belém',
      transactionId: 'RIFA001',
      message: 'Pagamento da Rifa',
      value: total
    });
  
    // console.log('Copia e Cola Pix:', qrCode.payload());
  
    const imgBase64 = await qrCode.base64();
    // console.log('Imagem (base64):', imgBase64);

    // linkPayment()
}

async function linkPayment(){
    while (true) {
        var qrCodeCenter = document.createElement("section")
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
        return;
    }
}

export { gerarPix }