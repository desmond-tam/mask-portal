import React from 'react';
import { createStore } from 'state-pool';


const store = createStore();
store.setState("count",0);


export const CounterSection = (props:any) => {
    const [count,setCount] = store.useState("count");

    const incrementCount = (e?:any) => {
        setCount(count+1);
    }

    return (
        <div>
            count: {count}
            <br/>
            <button onClick={() => incrementCount()}>Click</button>
        </div>
    )
}

