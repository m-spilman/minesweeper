import React from 'react'
import { CellState} from '../../types'
import './Button.scss'

interface ButtonProps{
 row: number;
 column: number;
 state: CellState
value: number
onClick(rowParam:number, columnParam:number): (...ard: any[]) => void
onContext(rowParam:number, columnParam:number): (...ard: any[]) => void

}

const Button: React.FC<ButtonProps> = ({row, column, onClick, onContext, state, value}) =>{
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
    return <div className =
    {`Button ${state === CellState.visible ? 'visible' : ''} value-${value}` } 
    onClick = {onClick(row, column)}
    onContextMenu={onContext(row, column)}>
        {renderContent()}
    </div>

}
export default Button
