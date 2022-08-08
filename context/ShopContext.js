import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'

export const ShopContext = createContext()

export const ShopProvider = ({ children }) => {
    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')
    const [assets, setAssets] = useState([])
    let getAssets = []

  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
  } = useMoralis()

  const {
    data: assetsData,
    error: assetsDataError,
    isLoading: assetsDataIsLoading,
  } = useMoralisQuery('assets')

  useEffect( () => {
    if (isAuthenticated) {
      const currentUsername = user?.get('nickname')
      setUsername(currentUsername)
  }}, [
    isAuthenticated,
    user,
    username
  ])

  useEffect(()=> {
    ;(async()=> {
        if(isWeb3Enabled) {
          await getAssets()
        }
    })()
  }, [isWeb3Enabled, assetsData, assetsDataIsLoading])

  
  const handleSetUsername = () => {
    if (user) {
      if(nickname) {
        user.set('nickname', nickname)
        user.save()
        setNickname('')
      } else {
        console.log("Can't set empty nickname")
      }
    } else {
      console.log('No user')
    }
  }

  getAssets = async () => {
    try {
      await enableWeb3()
      //console.log('RUNNING')
      setAssets(assetsData)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <ShopContext.Provider
      value={{
        isAuthenticated,
        handleSetUsername,
        setNickname,
        user,
        username,
        assets,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

