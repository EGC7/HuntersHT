import { db } from '/assets/scripts/global/firebaseConfig.js';
import { getDocs, collection, query, where} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { browniesInfos } from '/assets/scripts/brownies/browniesInfo.js';

const onFlavors = [];

async function getFlavors(state=true) {

    const rootName = browniesInfos.title;

    const qry = query(collection(db, rootName), where("onBasement", "==", state));
    
    const brownieData = await getDocs(qry);
    
    brownieData.forEach(doc => {
        if (doc.data().onBasement){
            onFlavors.push(doc.id)
        }
    })
    
    return onFlavors;
}

export { getFlavors }