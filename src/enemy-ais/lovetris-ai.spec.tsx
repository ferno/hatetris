/* eslint-env jest */

'use strict'

import { shallow } from 'enzyme'
import * as React from 'react'

import Game from '../components/Game/Game'
import { lovetrisAi } from './lovetris-ai'
import hatetrisRotationSystem from '../rotation-systems/hatetris-rotation-system'

// Note: well bits are flipped compared to what you would see on the screen.
// Least significant bit is rendered on the *left* on web, but appears to the
// *right* of each binary numeric literal

const game = shallow<Game>(
  <Game
    bar={4}
    replayTimeout={0}
    rotationSystem={hatetrisRotationSystem}
    wellDepth={8}
    wellWidth={10}
  />
)

const getNextCoreStates = game.instance().getNextCoreStates

describe('LovetrisAi', () => {
  it('generates I every time right now', () => {
    expect(lovetrisAi({
      score: 0,
      well: [
        0b0000000000,
        0b0000000000,
        0b0000000000,
        0b0000000000,
        0b0000000000,
        0b0000000000,
        0b0000000000,
        0b0000000000
      ]
    }, undefined, getNextCoreStates)).toBe('I')
  })
})
