import React from 'react'
import "./Investors.css"
import Image from 'next/image'
import { investorsData } from "../../Data/InvestorsData"
import { Carousel } from "flowbite-react";
const Investors = () => {
  return (
    <div id='Investors'>
        <div className='text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-bigger mt-8 mb-4'>
            <p>PAST <span className='text-black gradient pt-[7.5px] pl-2 pr-2 '>INVESTORS</span></p>
        </div>
        <div className="w-full">
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 flex flex-col justify-center items-center">
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4 ">
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

     <div className="sm:hidden h-56 sm:h-64 xl:h-80 2xl:h-96 ml-8 mr-6 mb-4">
          <Carousel slideInterval={1000} indicators={false}>
            <Image src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="..." layout='fixed' height={500} width={500}/>
            <Image src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="..." layout='fixed' height={500} width={500}/>
            <Image src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="..." layout='fixed' height={500} width={500}/>
            <Image src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="..." layout='fixed' height={500} width={500}/>
            <Image src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="..." layout='fixed' height={500} width={500}/>
            <Image src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="..." layout='fixed' height={500} width={500}/>
            {/* <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="..." />*/}
          </Carousel>
        </div>
</div>
    </div>
  )
}

export default Investors;