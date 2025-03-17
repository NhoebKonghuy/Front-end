import React from 'react'

export function Spinner({ className }) {
    return <div className={`animate-spin rounded-full border-4 border-t-4 border-gray-300 ${className}`}></div>;
  }


export default Spinner