import React from 'react'
import "./Investors.css"
import Image from 'next/image'
import { investorsData } from "../../Data/InvestorsData"
const Investors = () => {
  return (
    <div className='bg-black' id='Investors'>
        <div className='text-center text-3xl sm:text-4xl text-white md:text-5xl lg:text-6xl font-extrabold font-bigger mt-8 mb-4'>
            <p>PAST <span className='text-black gradient pt-[7.5px] pl-2 pr-2 '>INVESTORS</span></p>
        </div>
        <div className="w-full">
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-4 flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4 ">
            {investorsData.map((team, index) => (
                <div key={team.id} className="w-full overflow-hidden flex flex-col justify-center items-center">
                    <div>
                        <Image className="object-center object-cover h-auto w-full rounded-lg" src={team.image} alt={team.alt}
                        width={500}
                        height={500}
                        layout='fixed'
                        />
                    </div>
                    <div className="text-center py-8 sm:py-4 w-full font-poppins">
                        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold text-center">{team.name}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
</div>
    </div>
  )
}

export default Investors;