import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import "./custom.scss"
import {getRandom} from "./function";
import {dataType} from "./schema";

function App() {
    const [count, setCount] = useState<number[]>([])
    const colorRef = useRef<string[]>([])
    const [data, setData] = useState<dataType[]>([])
    const [isComplete, setIsComplete] = useState(false)
    const [isComplete2, setIsComplete2] = useState(false)
    const countRef = useRef<number>(0)
    const peopleRef = useRef<HTMLInputElement>(document.createElement('input'))
    const nameRef = useRef<HTMLInputElement>(document.createElement('input'))
    const [point, setPoint] = useState<string>("")

    const peopleClick = () => {
        let n: number = +peopleRef.current.value
        let count = []
        let color = []
        for (let i = 1; i <= n; i++) {
            count.push(i)
            if (i % 2 === 0){
                color.push("w")
            }else{
                color.push("b")
            }
        }
        setCount(count)
        setIsComplete(true)
        countRef.current = count.length
        colorRef.current = color
    }

    const nameClick = () => {
        let name = nameRef.current.value
        if (name === '') {
            return
        }
        let n = getRandom(count)
        let colors = colorRef.current
        let color = getRandom(colors)
        setData(pre => [...pre, {n: n, name: name, color: color}])
        setCount(pre => {
            let result = [...pre]
            let index = pre.indexOf(n)
            result.splice(index, 1)
            if (result.length === 0) {
                setIsComplete2(true)
            }
            return result
        })
        colors.splice(colors.indexOf(color), 1)
        nameRef.current.value = ""
    }

    const getClick = () => {
        let names = []
        for (let i = 0; i < data.length; i++) {
            names.push(data[i].name)
        }
        let point = getRandom(names)
        setPoint(point)
    }

    const resetClick = () => {
        setPoint("")
    }

    useEffect(()=>{
        if (count.length !== 0){
            nameRef.current.focus()
        }
    })
    return (
        <div className="App">

            <div className={"general"}>
                <label htmlFor="people">
                    ??????:
                </label>
                {!isComplete ? (
                    <>

                        <input type="text" id={"people"} ref={peopleRef}/>
                        <button onClick={() => {
                            peopleClick()
                        }}>
                            ??????
                        </button>
                    </>
                ) : (<div>
                    {countRef.current}
                </div>)
                }
            </div>
            {(!isComplete2 && count.length !== 0) &&
                <div className={"general"}>
                    <label htmlFor="name">
                        ??????:
                    </label>
                    <input type="text" id={"name"} ref={nameRef}/>
                    <button onClick={() => {
                        nameClick()
                    }}>
                        ??????
                    </button>
                </div>
            }
            <div className={"participateContainer"}>
                {data.map(data => (<div className={"participate"} key={data.name}>
                    <div>??????:</div>
                    <div className={"margin"}>{data.name}</div>
                    <div className={"margin"}>??????:</div>
                    <div>{data.n}</div>
                    <div className={"margin"}>??????:</div>
                    <div className={data.color}/>
                    <div className={"margin"}>??????:</div>
                    <input type="text"/>
                </div>))}
            </div>
            {isComplete2 && <div className={"general"}>
                <button onClick={()=>{getClick()}}>
                    ??????
                </button>
                <button onClick={()=>{resetClick()}}>
                    ??????
                </button>
            </div>}
            {isComplete2 && <div className={"point"}>
                {point}
            </div>}
        </div>
    );
}

export default App;
