// const badSmoothie = async() => {
//     try{
//         const a = getFruit('pineaplle')
//         const b = getFruit('strawberry')
//         const smoothie = await Promise.all([a, b])
        
//         throw 'broken!'

//         return smoothie;
//     } catch(err) {
//         console.log(err);
//     }
// }

// const fruits = ['peach', 'pineapple', 'strawberry'];

// const smoothie = fruits.map(async v => {
//     for (const f of fruits){
//         const emoji = await getFruit(f)
//         log(emoji)
//     }
// })

// const fruits = ['peach', 'pineapple', 'strawberry'];

// const smoothie = fruits.map(async v => {
//     const emoji = await getFruit(v)  //writing it this way can be problematic due to the map running concurrently and not pausing at each promise, to pause at each promise run a for loop
//     log(emoji)                         //see for loop above
//     return emoji
// })

//more often than not youll want to run everything concurrently 
//you can use the await keyword directly in your for loop if have a promise that you know
//resovles into an array you can actually use await in for loop -> waits for the array to resolve
//then loop through them immediately after    

// const fruits = ['peach', 'pineapple', 'strawberry'];

// const smoothie = fruits.map(v => getFruit(v))

// const fruitLoop = async() => {                          
//     for await (const emoji of smoothie) {                 
//         log(emoji)                                                               

//     }
// }
// fruitLoop()

//you can also use the await keyword inside of conditionalsj
const fruitInspection = async () => {
    if (await getFruit('peach') === 'emoji of peach i dont have') {
        console.log('loos peachy!');
    }
}
fruitInspection()