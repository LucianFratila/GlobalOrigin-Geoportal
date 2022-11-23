
import {useState} from 'react'

export default function SidePanel({children}) {
    const [open, setopen] = useState(true)
    const toggleOpen = () => {
        setopen(!open)
    }
  return (
    <div  >
      {/* <div className="divBtn">
        <button className="menuBtn" onClick={toggleOpen}>
            {open? <i class="fa-solid fa-angles-left"></i>: <i class="fa-solid fa-angles-right"></i>}
        </button>
      </div>   */}
        {children}
    </div>
  )
}

// className={open?"sidenav":"sidenavClosed"}