import React from 'react'
import Image from 'next/image'
import { sponsorData } from '../../Data/SponsorData'
import "./Sponsors.css"
function Sponsors() {
  return (
    <div className='pb-[1rem] bg-black' id='Sponsors'>
  <div className="relative font-inter antialiased">
  <div className='text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-bigger mt-8 mb-4'>
            <p>PAST <span className='text-black gradient pt-[7.5px] pl-2 pr-2 '>SPONSORS</span></p>
        </div>

<main className="relative h-full flex flex-col justify-center overflow-hidden">
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-16">
        <div className="text-center">

            
            <div
                x-data="{}"
                x-init="$nextTick(() => {
                    let ul = $refs.logos;
                    ul.insertAdjacentHTML('afterend', ul.outerHTML);
                    ul.nextSibling.setAttribute('aria-hidden', 'true');
                })"
                className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
            >
                <ul x-ref="logos" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                  { sponsorData.map((item: any) => (
                    <li key={item.id}>
                        <div className="h-32 w-32 relative">
                        <Image src={item.imageUrl} alt="Facebook" layout='fill' className='rounded-full' objectFit='cover'/>
                        </div>
                    </li>
                    ))}
                </ul>                
            </div>

            <div
                x-data="{}"
                x-init="$nextTick(() => {
                    let ul = $refs.logos;
                    ul.insertAdjacentHTML('afterend', ul.outerHTML);
                    ul.nextSibling.setAttribute('aria-hidden', 'true');
                })"
                className="w-full mt-[3rem] sm:inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] hidden"
            >
                <ul x-ref="logos" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-rtl ">
                  { sponsorData.map((item: any) => (
                    <li key={item.id}>
                        <div className="h-32 w-32 relative">
                        <Image src={item.imageUrl} alt="Facebook" layout='fill' className='rounded-full' objectFit='cover'/>
                        </div>
                    </li>
                    ))}
                </ul>                
            </div>
            
            
            
        </div>

    </div>
</main>

</div>
    </div>
  )
}

export default Sponsors
