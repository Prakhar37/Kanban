import "./avatar.css"

function Avatar({children}) {
    console.log(children)
  return (
    <div className='avatar'>
      {children[0]}
    </div>
  )
}

export default Avatar
