import { ObjectFormSerializable } from "./core"

const a = {
    a: 1,
    b: {
        c: 123,
        d: "dafd"
    },
    c: [1, 2, 3],
    d: [
        { oo: 123, hk: null },
        { oo: 123, hk: null }
    ]
};

let result = ObjectFormSerializable.Parse(a);
console.log(result);