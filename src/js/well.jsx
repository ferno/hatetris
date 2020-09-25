'use strict'

import classnames from 'classnames'
import React from 'react'

export default props => {
  const {
    bar,
    rotationSystem,
    wellDepth,
    wellWidth,
    onClickL,
    onClickR,
    onClickU,
    onClickD,
    onClickZ,
    onClickY,
    wellState
  } = props

  const well = wellState && wellState.well
  const piece = wellState && wellState.piece

  const cellses = []
  for (let y = 0; y < wellDepth; y++) {
    const cells = []
    for (let x = 0; x < wellWidth; x++) {
      const cell = {}

      cell.landed = well !== null && well[y] & (1 << x)

      if (piece === null) {
        cell.live = false
      } else {
        const orientation = rotationSystem.rotations[piece.id][piece.o]
        const y2 = y - piece.y - orientation.yMin
        const x2 = x - piece.x - orientation.xMin
        cell.live = (
          y2 >= 0 && y2 < orientation.yDim &&
          x2 >= 0 && x2 < orientation.xDim &&
          (orientation.rows[y2] & (1 << x2))
        )
      }

      cells.push(cell)
    }
    cellses.push(cells)
  }

  // put some buttons on the playing field
  const buttons = [
    { y: 0, x: 0, handleClick: onClickZ, symbol: '\u21B6', title: 'Press Ctrl+Z to undo' },
    { y: 0, x: 1, handleClick: onClickU, symbol: '\u27F3', title: 'Press Up to rotate' },
    { y: 0, x: 2, handleClick: onClickY, symbol: '\u21B7', title: 'Press Ctrl+Y to redo' },
    { y: 1, x: 0, handleClick: onClickL, symbol: '\u2190', title: 'Press Left to move left' },
    { y: 1, x: 1, handleClick: onClickD, symbol: '\u2193', title: 'Press Down to move down' },
    { y: 1, x: 2, handleClick: onClickR, symbol: '\u2192', title: 'Press Right to move right' }
  ]

  buttons.forEach(button => {
    cellses[button.y][button.x].handleClick = button.handleClick
    cellses[button.y][button.x].symbol = button.symbol
    cellses[button.y][button.x].title = button.title
  })

  return (
    <table>
      <tbody className='hatetris__welltbody'>
        {cellses.map((cells, y) => (
          <tr key={y}>
            {cells.map((cell, x) => (
              <td
                key={x}
                className={classnames({
                  hatetris__cell: true,
                  'hatetris__cell--bar': y === bar,
                  'hatetris__cell--manual': cell.onClick,
                  'hatetris__cell--landed': cell.landed,
                  'hatetris__cell--live': cell.live
                })}
                onClick={cell.handleClick}
                title={cell.title}
              >
                {cell.symbol}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
