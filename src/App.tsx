import React, {useRef, useState} from 'react';
import './App.css';
import "./custom.scss"
import {getRandom} from "./function";
import {dataType} from "./schema";

function App() {
    const [count, setCount] = useState<number[]>([])
    const [data, setData] = useState<dataType[]>([])
    const [isComplete, setIsComplete] = useState(false)
    const [isComplete2, setIsComplete2] = useState(false)
    const countRef = useRef<number>(0)
    const peopleRef = useRef<HTMLInputElement>(document.createElement('input'))
    const nameRef = useRef<HTMLInputElement>(document.createElement('input'))
    const [point, setPoint] = useState<string>("")
    console.log(count)

    const peopleClick = () => {
        let n: number = +peopleRef.current.value
        let count = []
        for (let i = 1; i <= n; i++) {
            count.push(i)
        }
        setCount(count)
        setIsComplete(true)
        countRef.current = count.length
    }

    const nameClick = () => {
        let name = nameRef.current.value
        if (name === '') {
            return
        }
        let n = getRandom(count)
        setData(pre => [...pre, {n: n, name: name}])
        setCount(pre => {
            let result = [...pre]
            let index = pre.indexOf(n)
            result.splice(index, 1)
            if (result.length === 0) {
                setIsComplete2(true)
            }else{
                nameRef.current.focus()
            }
            return result
        })
        nameRef.current.value = ""
    }

    const getClick = () => {
        let names = []
        for (let i = 0; i < data.length; i++) {
            names.push(data[i].name)
        }
        console.log(names)
        let point = getRandom(names)
        setPoint(point)
    }

    const resetClick = () => {
        setPoint("")
    }
    return (
        <div className="App">

            <div className={"general"}>
                <label htmlFor="people">
                    人數:
                </label>
                {!isComplete ? (
                    <>

                        <input type="text" id={"people"} ref={peopleRef}/>
                        <button onClick={() => {
                            peopleClick()
                        }}>
                            確定
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
                        名稱:
                    </label>
                    <input type="text" id={"name"} ref={nameRef}/>
                    <button onClick={() => {
                        nameClick()
                    }}>
                        確定
                    </button>
                </div>
            }
            <div className={"participateContainer"}>
                {data.map(data => (<div className={"participate"} key={data.name}>
                    <div>名稱:</div>
                    <div className={"margin"}>{data.name}</div>
                    <div className={"margin"}>號碼:</div>
                    <div>{data.n}</div>
                    <div className={"margin"}>紅包:</div>
                    <input type="text"/>
                </div>))}
            </div>
            {isComplete2 && <div className={"general"}>
                <button onClick={()=>{getClick()}}>
                    抽籤
                </button>
                <button onClick={()=>{resetClick()}}>
                    清除
                </button>
            </div>}
            {isComplete2 && <div className={"point"}>
                {point}
            </div>}
        </div>
    );
}

export default App;
