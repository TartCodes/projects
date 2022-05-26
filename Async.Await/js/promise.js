
// Using the fetch API

// const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

// console.log(fetchPromise)

// fetchPromise.then( response => { 
//     console.log(`Received response: ${response.status}`);
// });

// console.log('Starting request...');

//CHAINING PROMISES

// const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json')

// fetchPromise.then ( response => {
//     const jsonPromise = response.json()
//     jsonPromise.then ( json => {
//         console.log(json[0].name);
//     })
// })

        // the elegant feature of promises is that: then() itself returns a promise, which will be completed with the result of the 
        // function that was passed to it. This means that we can (and certainly should) rewrite the above code like this:

        // const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
        
        // fetchPromise
        //     .then( response => {
        //         return response.json();
        //     })
        //     .then( json => {
        //         console.log(json[0].name);
        //     })

    //CATCHING ERRORs
    // Try this version of our fetch() code. We've added an error handler using catch(), and also modified the URL so the request will fail.
    
    // const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
    //     fetchPromise
    //         .then( response => {
    //             if(!response.ok) {
    //                 throw new Error(`HTTP error ${response.status}`)
    //             }
    //             return response.json()
    //         })
    //             .then( json => {
    //             console.log(json[0].name);
    //         })
    //         .catch(error => {
    //             console.error(`Could not get products: ${error}`)
    //         })

    //COMBINING MULTIPLE PROMISES

    // const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
    // const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
    // const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');   

    // Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    //     .then( responses => {
    //         for (const response of responses) {
    //             console.log(`${response.url}: ${response.status}`);
    //         }
    //     })
    //     .catch( error => {
    //         console.error(`Failed to fetch: ${error}`);
    //     })

        // Here we're making three fetch() requests to three different URLs. If they all succeed, we will log the response status of each one. If any of them fail, we're logging the failure.

//PROMISE.ANY

// const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
// const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
// const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

// Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
//   .then( response => {
//     console.log(`${response.url}: ${response.status}`);
//   })
//   .catch( error => {
//     console.error(`Failed to fetch: ${error}`)
//   });


//ASYNC AWAIT
    //syntax 
        // async function myFunction(){
            //this is an async function
        //}

        async function fetchProducts(){
            try {
                const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
                if(!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`)
                }
                const json = await response.json();
                console.log(json[0].name);
              }
              catch(error){
                  console.error(json[0].name);
              }
            }
            fetchProducts()

            async function fetchProducts() {
                try {
                  const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
                  if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                  }
                  const json = await response.json();
                  return json;
                }
                catch(error) {
                  console.error(`Could not get products: ${error}`);
                }
              }
              
              const jsonPromise = fetchProducts();
              jsonPromise.then((json) => console.log(json[0].name));
              
    // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises