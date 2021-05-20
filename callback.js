let sum = (a,b,callback) => {
    setTimeout(()=>{
        if (typeof a != 'number'){
            console.log('Error');
            return
        }
        else {
            let c = a+b;
            callback(c);
        }
        
    },100);
}
sum('23', 3, (total)=>{
    console.log(total);
});
