function sendMessage(user, contact, sabores, hasPix=false) {

    const HOURS = new Date().getHours();
    var message = '';
    const qtdBrownies = Object.keys(sabores).length;

    if (HOURS < 12){
        message += 'Bom Dia! ';
    } else if (HOURS > 18){
        message += 'Boa Noite! ';
    } else {
        message += 'Boa Tarde! ';
    }
    message += `Me chamo ${user}.\n`;
    
    if (qtdBrownies > 1){   
        message += `Eu gostaria de verificar o pedido dos meus brownies:\n`
        for (let brow = 0; brow < qtdBrownies; brow++){
            message += ` - ${Object.keys(sabores)[brow]}: ${sabores[`${Object.keys(sabores)[brow]}`]}\n`;
        }
    } else {
        sabores[`${Object.keys(sabores)[0]}`] > 1 ? message += `Eu gostaria de registrar um pedido com ${sabores[`${Object.keys(sabores)[0]}`]} brownies de ${Object.keys(sabores)[0]}` : message += `Eu gostaria de registrar um pedido de ${sabores[`${Object.keys(sabores)[0]}`]} brownie de ${Object.keys(sabores)[0]}`;
        message+='\n';
    }
    
    message += `Meu telefone para contato é: ${contact}.\n`;
    
    const URLMessage = encodeURI(message)

    
    var url = `https://wa.me/5591991446037?text=${URLMessage}`;
    
    window.open(url, '_blank');
    location.reload();

}

export { sendMessage }