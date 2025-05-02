import { db } from './firebaseConfig.js';
import { getDocs, collection, query, where} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { rifaInfos } from "./rifaInfo.js";

const rootName = rifaInfos.title;
const qry = query(collection(db, rootName), where("Pagamento", "==", false)); //troca pra 'payment' e 'true' dpsss

const rifaData = await getDocs(qry);

const reserveds = [];

rifaData.forEach(doc => {
    doc.data().Reservas.forEach(reserved => {
        reserveds.push(reserved);
    })
})

function getReservState(reserv){
    if (reserveds.includes(reserv)){
        return true;
    } else{
        return false;
    }
}

export {reserveds, getReservState}