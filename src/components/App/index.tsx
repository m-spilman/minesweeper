import React, {useState}  from 'react'
import NumberDisplay from '../NumberDisplay'
import { generateCells } from '../../utils'
import './App.scss'
import Button from '../Button'

const App: React.FC = () =>{

    const [cells, setCells] = useState(generateCells())
    const renderCells = (): React.ReactNode => {
        return cells.map((row, rowIndex ) => row.map((cell, columnIndex) => <Button key={`${rowIndex}-${columnIndex}`}></Button>))
    }
    return(
        <div className ="App">
            <div className="Header">
                <NumberDisplay value={0}></NumberDisplay>
                <div className='Face'><span role="img" aria-label="face">🧐</span></div>
                <NumberDisplay value={23}></NumberDisplay>
            </div>
            <div className = "Body">{renderCells()}</div>
        </div>
    )
}

export default App
