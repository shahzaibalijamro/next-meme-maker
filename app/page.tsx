import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = async () => {
  interface Meme {
    id: string,
    name: string,
    url: string,
    width: number,
    height: number,
    box_count: number,
    captions: number
  }
  const memeReq = await fetch("https://api.imgflip.com/get_memes",{
    cache: 'no-store'
})
  const memeRes = await memeReq.json()
  return (
    <div className='my-container'>
      <h1 className='font-semibold text-3xl mt-8 mb-12 text-black text-center'><span className='me-2'>&#128516;</span>Meme Maker</h1>
      <div className='flex justify-center items-center gap-8 flex-wrap'>
        {memeRes.data.memes.map((item: Meme) => {
          return <div key={item.id} className="card card-compact bg-base-100 w-72 shadow-xl">
            <div style={{
              borderTopLeftRadius: '18px',
              borderTopRightRadius: '18px'
            }} className='flex justify-center bg-[#e9e9e9] items-center'>
              <Image className='h-[200px]' src={item.url} width={200} height={200} alt='item.name' />
            </div>
            <div className="card-body">
              <h2 className="card-title whitespace-nowrap overflow-hidden text-ellipsis max-w-full inline-block">{item.name}</h2>
              <div className="card-actions flex justify-center">
                <Link href={{
                  pathname: `/singlememe/${item.id}`,
                  query: {
                    memeId : item.id,
                    img: item.url,
                    name: item.name,
                    box_count: item.box_count,
                    captions: item.captions
                  }
                }}>
                  <button className="Btn text-white btn-primary p-0">
                  Generate
                  </button>
                </Link>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Home