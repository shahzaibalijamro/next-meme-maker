"use client"
import Image from 'next/image'
import React, { useRef, useState } from 'react'

interface SingleMeme {
    searchParams: {
        memeId: string,
        img: string,
        name: string,
        height: number,
        width: number,
        box_count: number,
        captions: number
    }
}
const SingleMeme = (props: SingleMeme) => {
    console.log(props.searchParams);
    const [returnedMeme,SetReturnedMeme] = useState<string | null>(null);
    console.log(props.searchParams.box_count);
    const text1 = useRef<HTMLInputElement | null>(null);
    const text2 = useRef<HTMLInputElement | null>(null);
    const text3 = useRef<HTMLInputElement | null>(null);
    const text4 = useRef<HTMLInputElement | null>(null);
    const text5 = useRef<HTMLInputElement | null>(null);
    const text6 = useRef<HTMLInputElement | null>(null);
    const refArr = [text1, text2, text3, text4, text5, text6];
    const generateMeme = async () => {
        let apiToHit = `https://api.imgflip.com/caption_image?template_id=${props.searchParams.memeId}&username=shahzaibalijamro&password=Iwasbornon29072006`
        for (let i = 0; i < props.searchParams.box_count; i++) {
            apiToHit += `&text${i}=${refArr[i].current!.value}`;
            refArr[i].current!.value = '';
        }
        const singleMemeReq = await fetch(apiToHit, {
            method: 'POST'
        })
        console.log(apiToHit);
        const generatedMeme = await singleMemeReq.json()
        console.log(generatedMeme);
        generatedMeme.data.url ? SetReturnedMeme(generatedMeme.data.url) : null
    }
    return (
        <div className='my-container'>
            <h1 className='font-semibold text-3xl mt-8 mb-12 text-black text-center'><span className='me-2'>&#128516;</span>{props.searchParams.name}
            </h1>
            <div className='flex justify-around flex-wrap gap-10 items-center'>
                <div className='flex flex-col justify-center w-full max-w-[400px] items-center'>
                <h1 className='text-2xl font-semibold mb-4'>Meme Template</h1>
                    <Image src={props.searchParams.img} width={320} height={320} alt={props.searchParams.name} priority/>
                </div>
                <div className='text-center max-w-[400px] w-full my-6'>
                    {Array.from({ length: props.searchParams.box_count }).map((_, index) => {
                        return <div key={index}>
                            <div className="input-group">
                                <label className="label">Text {index + 1}</label>
                                <input autoComplete="off" name={`text${index + 1}`} id={`text${index + 1}`} className="input" placeholder={`Enter text ${index + 1}`} type="text" ref={refArr[index]} />
                                <div></div></div>
                        </div>
                    })}
                    <button className='btn btn-warning mt-6' onClick={generateMeme}>Generate</button>
                </div>
                <div className='flex flex-col justify-center mb-10 w-full max-w-[400px] items-center'>
                    {returnedMeme ? 
                    <>
                    <h1 className='text-2xl font-semibold mt-12 mb-6'>Result</h1>
                    <Image src={returnedMeme} width={300} height={300} alt={props.searchParams.name} />
                    </>
                    : null}
                </div>
            </div>
        </div>
    )
}

export default SingleMeme