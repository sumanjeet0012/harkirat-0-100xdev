const testingfunction = () => {
    console.log("hello world");
}

setTimeout(() => {
    console.log("hello world");
}, 1000);

setTimeout( testingfunction, 2000);

