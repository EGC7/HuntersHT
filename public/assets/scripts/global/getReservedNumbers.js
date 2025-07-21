import { db } from '/public/assets/scripts/global/firebaseConfig.js';
import { getDocs, collection, query, where} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { rifaInfos } from "/public/assets/scripts/global/rifaInfo.js";

const reserveds = [];

async function getReservedNumbers() {
    const rootName = rifaInfos.title;
    const qry = query(collection(db, rootName), where("Pagamento", "==", true)); //troca pra 'payment' e 'true' dpsss

    const rifaData = await getDocs(qry);
    
    rifaData.forEach(doc => {
        doc.data().Reservas.forEach(reserved => {
            reserveds.push(reserved);
        })
    })

    return reserveds;
}

function getReservState(reserv){
    return reserveds.includes(reserv);
}

export {getReservedNumbers, getReservState}