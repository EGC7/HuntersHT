
async function createPaymentDiv(sabores) {
    const paymentDiv = document.createElement("div");
    const title = document.createElement('p');
    const qrCode = document.createElement('div');
    const copyText = document.createElement('main');
    const copyButton = document.createElement('button');
    const sendButton = document.createElement('button');
    const cancelButton = document.createElement('button');
    
    const qtdBrownies = Object.keys(sabores).length;
    
    sendButton.id = 'sendButton';
    sendButton.innerHTML = 'Já fiz o pagamento';

    cancelButton.id = 'cancelButton';
    cancelButton.innerHTML = '&times;';
    // cancelButton.innerHTML = 'Cancelar o pagamento';
    
    title.innerHTML = 'Efetue o Pagamento com o QrCode abaixo';
    title.classList.add('Sprite-Grafiti');
    copyText.innerHTML = 'hunters3ht@gmail.com';
    copyText.readOnly = true;
    qrCode.classList.add('qrCodePix');
    copyButton.innerHTML = 'Copiar chave pix';
    copyButton.id = 'copyButton';

    paymentDiv.id = 'paymentDiv';

    paymentDiv.appendChild(title);
    paymentDiv.appendChild(qrCode);
    paymentDiv.appendChild(copyText);
    paymentDiv.appendChild(copyButton);
    paymentDiv.appendChild(sendButton);
    paymentDiv.appendChild(cancelButton);

    document.body.appendChild(paymentDiv);

    setTimeout(() => {
        var msg = '';
        if(qtdBrownies > 1){
            msg = `Você precisa efetuar um pagamento de R$${8 * qtdBrownies}.00 na chave pix apresentada e depois clicar em \"Já fiz o pagamento\"`;
        } else{
            msg = "Você precisa efetuar um pagamento de R$9.00 na chave pix apresentada e depois clicar em \"Já fiz o pagamento\"";
        }

        alert(msg)
    }, 1500);
}

export { createPaymentDiv }