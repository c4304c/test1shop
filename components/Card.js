import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Image from 'next/image'
import { FaCoins } from 'react-icons/fa'

const Card = ({item}) => {

    const styles = {
        cardContainer: `flex flex-col`,
        card: `h-[250px] w-[190px] -3xl flex cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden border border-black shadow-xl border-4 border-[#fb9701]`,
        cardTitle: `text-xl font-bold flex text-center w-full flex-1 justify-center mt-[10px]`,
        Price: `text-md font-bold flex justify-center`,
        coins: `ml-[10px]`,
    }

    return (
        <div className={styles.cardContainer}>
          <div className={styles.card}>
              <Image
              src={item.Src}
              className= 'object-cover, object-center'
              width={190}
              height={250}
              alt="product"
              />
            </div>
            <div className={styles.cardTitle}>{item.Name}</div>
            <div className={styles.Price}>
                {item.Price} WPTC <FaCoins className={styles.coins} />
            </div>
        </div>
    )
}  

export default Card