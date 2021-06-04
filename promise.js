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
sum(11,2)
.then((total)=>{
    console.log(total);
})
.catch((error)=>{
    console.log(error);
});