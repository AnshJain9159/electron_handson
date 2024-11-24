// /* eslint-disable prettier/prettier */
// import React from 'react'
// import { ipcRenderer } from 'electron'
// import '../assets/Topbar.css' // Import the corresponding CSS for styling

// const CustomTitleBar = () => {
//   const handleWindowControl = (action) => {
//     ipcRenderer.send('window-control', action)
//   }

//   return (
//     <div className="title-bar">
//       <div className="window-controls">
//         <button title='close' className="control close" onClick={() => handleWindowControl('close')}></button>
//         <button
//         title='min'
//           className="control minimize"
//           onClick={() => handleWindowControl('minimize')}
//         ></button>
//         <button
//         title='max'
//           className="control maximize"
//           onClick={() => handleWindowControl('maximize')}
//         ></button>
//       </div>
//     </div>
//   )
// }

// export default CustomTitleBar
