import React, { useState, useEffect } from 'react';
import {AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';


const Customizer = () => {
  //to check if we are in Home or Customizer page
  const snap = useSnapshot(state);

  //handle file upload
  const [file, setFile] = useState('');
  // state filed for AI prompt
  const [prompt, setPrompt] = useState('');
  //loading state
  const [generatingImg, setGeneratingImg] = useState(false);
  //active filterTab and EditorTab
  const [activeEditorTab, setActiveEditorTab] = useState("")
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt:true,
    stylishShirt:false,
  });

  //show tab content depending on the activeTab
  const generateTabContent = () => { //if i pass in this argument it wont work
    switch (activeEditorTab){
      //access state directly so we dont need to pass in anything
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker 
            file={file}
            setFile={setFile} //pass into child component
            readFile={readFile}
          />
      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          genratingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return activeFilterTab("Please enter a prompt");

    try {
      //call our backend to generate an ai image!
      
    } catch(error){
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;
    if(!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch(tabName){
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTxture = true;
        state.isFullTexture = false;
    }
    //after setting the state, activeFilterTab is updated
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    reader(file) //this will return a promise
    .then((result) => {
      handleDecals(type,result);
      setActiveEditorTabs("");
    })
    .catch((err) => {
      console.error("Error reading file:", err);
    } )

  }


  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen"> 
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {/* this will render tabcontent dynamically according to 
                activeEditorTab state variable */}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
                
          <motion.div className="absolute top-5 right-5 z-10"
            {...fadeAnimation}>
              <CustomButton 
                type="filled"
                title="Go Back"
                customStyles="w-fit px-4 py-1.5 font-bold text-sm"
                handleClick={()=>{state.intro = true}}>

              </CustomButton>

          </motion.div>

          <motion.div className="filtertabs-container"
            {...slideAnimation('up')}>
              {FilterTabs.map((tab) => (
                <Tab 
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  isActiveTab={activeEditorTab[tab.name]}
                  handleClick={() => {handleActiveFilterTab(tab.name)}}
                  >
                </Tab>
              ))}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer