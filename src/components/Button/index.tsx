import React from 'react'
// import { CellState, CellValue } from '../../types'
import { CellState} from '../../types'
import './Button.scss'

interface ButtonProps{
 row: number;
 column: number;
 state: CellState
//  value: CellValue
value: number
}

const Button: React.FC<ButtonProps> = ({row, column, state, value}) =>{
    const renderContent = (): React.ReactNode =>{
        if(state === CellState.visible){
                if(value === 9){
                return <span role ='img' aria-label='bomb'>💣</span>
            }
            else if (value === 0) return null
            else return value

        } else if(state === CellState.flagged){
            return <span role ='img' aria-label='flag'>🚩</span>

        }
        return null

    }
    return <div className={`Button ${state === CellState.visible ? 'visible' : ''} value-${value}`}>
        {renderContent()}
    </div>

}
export default Button
