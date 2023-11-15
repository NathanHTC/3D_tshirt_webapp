import React from 'react'
import { RGBADepthPacking } from 'three';
import { snapshot, useSnapshot } from 'valtio'
import state from '../store'

const CustomButton = (props) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if(type === 'filled'){
      return {
        backgroundColor: snap.color,
        color: '#fff'
      }
    }
  }
  return (
    <button
    className={`px-4 py-1.5 flex-1 hover:scale-105
    rounded-md ${props.customStyles}`} 
    style={generateStyle(props.type)}
    onClick={props.handleClick}
    >
      {props.title}
    
    </button>
  )
}

export default CustomButton