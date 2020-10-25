/**
  Old hex-mode replays.
*/

'use strict'

import type { Move } from './move.ts'
import { isMove } from './move.ts'

const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
type HexChar = (typeof hexChars)[number]
const isHexChar = (x: any): x is HexChar => hexChars.includes(x)

const forwardLookup: {
  [key in Move]: {
    [key in Move]: HexChar
  }
} = {
  L: { L: '0', R: '1', D: '2', U: '3' },
  R: { L: '4', R: '5', D: '6', U: '7' },
  D: { L: '8', R: '9', D: 'A', U: 'B' },
  U: { L: 'C', R: 'D', D: 'E', U: 'F' }
}

const reverseLookup: {
  [key in HexChar]: [Move, Move]
} = {
  0: ['L', 'E'],
  1: ['L', 'R'],
  2: ['L', 'D'],
  3: ['L', 'U'],
  4: ['R', 'L'],
  5: ['R', 'R'],
  6: ['R', 'D'],
  7: ['R', 'U'],
  8: ['D', 'L'],
  9: ['D', 'R'],
  A: ['D', 'D'],
  B: ['D', 'U'],
  C: ['U', 'L'],
  D: ['U', 'R'],
  E: ['U', 'D'],
  F: ['U', 'U']
}

/**
  Convert an array of moves into a replay
*/
const encode = (moves: Move[]): string => moves
  .map((move1, i) => {
    if (i % 2 === 1) {
      return ''
    }

    // trailing unpaired move behaves as if an extra "D" was appended
    const move2 = i + 1 in moves ? moves[i + 1] : 'D'

    return forwardLookup[move1][move2]
  })
  .join('')
  .replace(/(....)/g, '$1 ')

/**
  Convert a string back into an array of moves
*/
const decode = (string: string): Move[] => string
  .split('')
  .map(chr => isHexChar(chr) ? reverseLookup[chr] : [])
  .flat()

export default { encode, decode }
