import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice'
import { useEffect, useState } from 'react'
import { YOUTUBE_SEARCH_API } from '../utils/constant'
import { cacheResults } from '../utils/searchSlice'

const Header = () => {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchCache = useSelector((store) => store.search)

  //   searchCache = {
  //   "iphone" : ["iphone 11" , "iphone 13"]
  // }
  // searchQuery = iphone

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery])
      } else {
        getSearchSuggestions()
      }
    }, 200)

    return () => {
      clearTimeout(timer)
    }
  }, [searchQuery])
  // everytime searchquery changes this useEffect will be called
  // settimeout will be generated

  const toggleMenuHandler = () => {
    dispatch(toggleMenu())
  }

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery)
    const json = await data.json()
    setSuggestions(json[1])

    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    )
  }

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          alt="hamburger menu"
          className="h-12 w-15 cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/128/4254/4254068.png"
        />
        <a href="/">
          <img
            alt="logo"
            className="h-12 w-15 mx-2 cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/128/15047/15047410.png"
          />
        </a>
      </div>
      <div className="col-span-10">
        <div>
          <input
            className=" px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 p-2 rounded-r-full bg-gray-100 cursor-pointer">
            {' '}
            Search
          </button>
        </div>
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[32rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  className="py-2 px-3 shadow-sm hover:bg-gray-100"
                >
                  {suggestion}{' '}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          alt="userIcon"
          className="h-12"
          src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
        />
      </div>
    </div>
  )
}

export default Header
