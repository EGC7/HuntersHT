import { db } from '/assets/scripts/global/firebaseConfig.js';
import { getDocs, collection, query, where} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { browniesInfos } from '/assets/scripts/brownies/browniesInfo.js';

const onBrownies = [];

async function getOnBrownies(state=true) {

    const rootName = browniesInfos.title;

    const qry = query(collection(db, rootName), where("onBasement", "==", state));
    
    const brownieData = await getDocs(qry);
    
    brownieData.forEach(doc => {
        if (doc.data().onBasement){
            onBrownies.push([doc.id, doc.data().onQuanties])
        }
    })
    
    return onBrownies;
}

export { getOnBrownies }