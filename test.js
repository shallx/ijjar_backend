const deepInsert = (objA, objB) => {
    const [targetKey,value] = Object.entries(objB)[0];
    if(objA[targetKey]) {
        return {
            ...objA,
            [targetKey]: deepInsert(objA[targetKey], value),
        }
    }
    else return {...objA, ...objB};
}

const theFunc = (obj) => 
    Object.entries(obj).reduce(
        (res,[keyPath,v]) => 
        {
            console.log(keyPath);
            return deepInsert(
                res,
                keyPath
                    .split('.')
                    .reverse()
                    .reduce((res, keyPart) => ({ [keyPart]: res}), v)
            )
        },
        {}
    );

const testObj = {
    "bank.account": '343asad',
    "bank.swift": "dff",

    "bank.account": "Random act",
    "random.stuff": "Random",
    simpleKey: "Simple",
    "bank.info.name" : "Test name",
    "bank.info.founder" : "Test founder"
};


console.log(theFunc(testObj));
