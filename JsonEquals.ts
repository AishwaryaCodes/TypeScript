// JSON Deep Equals 

function deepEqual(obj1: any, obj2: any) : boolean {

    if(obj1 === obj2) return true;

    if(typeof(obj1) !== typeof(obj2)) return false;

    if(obj1 === null || obj2 === null) return obj1 === obj2;


    if(Array.isArray(obj1) && Array.isArray(obj2)) {
        if(obj1.length !== obj2.length) return false;

        for(let i = 0; i < obj1.length; i++) {
            if(!deepEqual(obj1[i], obj2[i])) return false;
        }

        return true;
    }


    if(typeof obj1 === 'object' && typeof obj2 === 'object') {

        const key1 = Object.keys(obj1);
        const key2 = Object.keys(obj2);

        if(key1.length !== key2.length) return false;

        for(const k of key1) {
            if(!key2.includes(k)) return false;
        
            if(!deepEqual(obj1[k], obj2[k])) return false;
        }

        return true;
    }

    return false;
}