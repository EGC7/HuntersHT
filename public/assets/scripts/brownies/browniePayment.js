
async function createPaymentDiv() {
    const paymentDiv = document.createElement("div");
    const title = document.createElement('p');
    const qrCode = document.createElement('div');
    const copyText = document.createElement('main');
    const copyButton = document.createElement('button');
    const sendButton = document.createElement('button');
    const cancelButton = document.createElement('button');

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

}

export { createPaymentDiv }