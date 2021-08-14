// export enum CellValue {
//     none,
//     one,
//     two,
//     three,
//     four,
//     five,
//     six,
//     seven,
//     eight,
//     bomb
// }


export enum CellState{
    // open,
    closed,
    visible,
    flagged
}

// export type Cell = {value: CellValue, state: CellState}
export type Cell = {value: number, state: CellState,}
