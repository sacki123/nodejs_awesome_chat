let sum = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (typeof a != 'number'){
                return reject('Error');   
            }
            else {
                let c = a+b;
                resolve(c);
            }    
        },100);
    })
}
let tsum = async ()=>{
    try {
        let t = await sum(10,2);
        console.log(t);
        let t2 = await sum(t,10);
        console.log(t2)
    } catch (error) {
        console.log(error)
    }
}
tsum();