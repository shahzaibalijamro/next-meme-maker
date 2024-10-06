"use client"
import Image from 'next/image'
import React, { useRef } from 'react'

interface SingleMeme {
    searchParams: {
        id: string,
        img: string,
        name: string,
        height: number,
        width: number,
        box_count: number,
        captions: number
    }
}
const SingleMeme = (props: SingleMeme) => {
    console.log(props.searchParams.box_count);
    const text1 = useRef<HTMLInputElement | null>(null);
    const text2 = useRef<HTMLInputElement | null>(null);
    const text3 = useRef<HTMLInputElement | null>(null);
    const text4 = useRef<HTMLInputElement | null>(null);
    const text5 = useRef<HTMLInputElement | null>(null);
    const text6 = useRef<HTMLInputElement | null>(null);
    const refArr = [text1,text2,text3,text4,text5,text6];
    const generateMeme = async() => {
        let apiToHit = `https://api.imgflip.com/caption_image?template_id=${props.searchParams.id}&username=shahzaibalijamro&password=Iwasbornon29072006`
        for (let i = 0; i < props.searchParams.box_count; i++) {
            apiToHit += `&text${i}=${refArr[i].current!.value}`;
            refArr[i].current!.value = '';
        }
        const singleMemeReq = await fetch(apiToHit, {
            method: 'POST'
        })
        console.log(apiToHit);
        const generatedMeme = await singleMemeReq.json();
        console.log(generatedMeme);
    }
    return (
        <div className='my-container'>
            <h1 className='font-semibold text-3xl mt-8 mb-12 text-black text-center'><span className='me-2'>&#128516;</span>{props.searchParams.name}
            </h1>
            <div className='flex justify-center w-full items-center'>
                <Image src={props.searchParams.img} width={400} height={400} alt={props.searchParams.name} />
            </div>
            <div className='text-center my-6'>
                {Array.from({ length: props.searchParams.box_count }).map((_, index) => {
                    return <div key={index}>
                        <div className="input-group">
                            <label className="label">Text {index+1}</label>
                            <input autoComplete="off" name="Email" id="Email" className="input" placeholder={`Enter text ${index+1}`} type="email" ref={refArr[index]}/>
                                <div></div></div>
                    </div>
                })}
                <button className='btn btn-warning mt-6' onClick={generateMeme}>Generate</button>
            </div>
        </div>
    )
}

export default SingleMeme