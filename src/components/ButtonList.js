import Button from './Button'

const ButtonList = () => {
  const list = [
    'All',
    'Live',
    'cricket',
    'news',
    'motivation',
    'red',
    'All',
    'Live',
    'cricket',
    'news',
  ]

  return (
    <div className="flex">
      {list.map((type, index) => (
        <Button id={index} name={type} />
      ))}
    </div>
  )
}

export default ButtonList
