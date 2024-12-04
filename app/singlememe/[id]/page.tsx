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
    const [returnedMeme, SetReturnedMeme] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const text1 = useRef<HTMLInputElement | null>(null);
    const text2 = useRef<HTMLInputElement | null>(null);
    const generateMeme = async () => {
        if (!text1.current?.value || !text2.current?.value) return alert("Both text fields are required!");
        setLoading(true);
        let apiToHit = `https://api.imgflip.com/caption_image?template_id=${props.searchParams.memeId}&username=${process.env.USERNAME}&password=${process.env.PASSWORD}&text0=${text1.current?.value}&text1=${text2.current?.value}`
        const response = await fetch(apiToHit, {
            method: 'POST'
        })
        const generatedMeme = await response.json()
        generatedMeme.data.url && SetReturnedMeme(generatedMeme.data.url)
        setLoading(false)
        text1.current.value = ''
        text2.current.value = ''
    }
    return (
        <div className='my-container'>
            <h1 className='font-semibold text-3xl mt-8 mb-12 text-black text-center'><span className='me-2'>&#128516;</span>{props.searchParams.name}
            </h1>
            <div className='flex justify-around flex-wrap gap-10 items-center'>
                <div className='flex flex-col justify-center w-full max-w-[400px] items-center'>
                    <h1 className='text-2xl font-semibold mb-4'>Meme Template</h1>
                    <Image priority={true} src={props.searchParams.img} width={320} height={320} alt={props.searchParams.name} />
                </div>
                <div className='text-center max-w-[400px] w-full my-6'>
                    <div className="input-group">
                        <label className="label">Text 1</label>
                        <input autoComplete="off" name={`text1`} id={`text1`} className="input" placeholder={`Enter text 1`} type="text" ref={text1} />
                        <div>
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="label">Text 2</label>
                        <input autoComplete="off" name={`text2`} id={`text2`} className="input" placeholder={`Enter text 2`} type="text" ref={text2} />
                        <div></div></div>
                    <button className='btn btn-warning mt-6' onClick={generateMeme}>Generate</button>
                </div>
                <div className='flex flex-col justify-center mb-10 w-full max-w-[400px] items-center'>
                    {/* meme has been generated */}
                    {returnedMeme && !loading && <>
                        <h1 className='text-2xl font-semibold mt-12 mb-6'>Result</h1>
                        <Image priority={true} src={returnedMeme} width={300} height={300} alt={props.searchParams.name} />
                    </>}
                    {/* //no request has been made */}
                    {!returnedMeme && !loading && <>
                        <h1 className='text-2xl font-semibold mt-12 mb-6'>Your generated Meme will show here!</h1>
                    </>}
                    {/* //meme is currently being generated */}
                    {!returnedMeme && loading && <>
                        <h1 className='text-2xl font-semibold mt-12 mb-6'>Generating....</h1>
                    </>}
                </div>
            </div>
        </div>
    )
}

export default SingleMeme