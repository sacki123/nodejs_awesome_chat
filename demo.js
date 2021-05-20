console.log("Run 1");
// print = (s,callback)=>{
//     setTimeout(()=>{
//         console.log(s);
//         a = "Run 3"
//         callback(a);
//     },1000);
        
// }
// print("Run 2",callback)
// function callback(a){
//     console.log(a);
// };
sum =(a,b,callback)=>{
    setTimeout(()=>{
        let total = a+ b;
        let nhan = a * b;
        let chia = a / b;
        let tong_hop = total + nhan +chia;
        console.log(tong_hop);
        callback(10,2);
    },1000);
    
}
nhan =(a,b)=>{
    setTimeout(()=>{
        let nhan = a * b;
        console.log(nhan);
    },500);
    
}
chia =(a,b)=>{
    setTimeout(()=>{
        let chia = a /b;
        console.log(`chia ${chia}`);
    },200);
    
}
sum(10,2,chia);
// chia(10,2);
// nhan(2,3);
console.log("end");
