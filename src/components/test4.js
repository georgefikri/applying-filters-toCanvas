import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";

function Tests4() {
    const [removeFilter, setRemoveFilter] = useState(false)
    const [greyScaleBoolean, setGreyScaleBoolean] = useState(false)
    const [blurBoolean,setBlurBoolean] = useState(false)
    const [changeEvent, setchangeEvent] = useState()
    let src
    var canvas
    let reader 
    let file
    const onChange = (e)=> {
        console.log('dddd', e)
        setchangeEvent(e)
        canvas = new fabric.Canvas('canvas');
        reader = new FileReader();
        file = e.target.files[0]
        canvasWrite(reader)
        reader.readAsDataURL(file);
    
    }

   const canvasWrite = (reader, filterType) => { 
    console.log('filterType', filterType)
    reader.onload = function (event){
        var imgObj = new Image();
        imgObj.src = event.target.result;
        src = event.target.result;
        fabric.Image.fromURL(src, function(img) {
            console.log('filters before', img.filters)
            // add filter
            img.filters.push(new fabric.Image.filters.Vintage());
            
            // setTimeout(() => {
            //     img.filters.splice(0,img.filters.length)
            // }, 2000);
            if(removeFilter) {
                console.log('it is true')
                img.filters.splice(0,img.filters.length)
            } else if (greyScaleBoolean) {
                // img.filters.splice(0,img.filters.length)
                img.filters.push(new fabric.Image.filters.Grayscale())
            } else if (blurBoolean) {
                img.filters.push(new fabric.Image.filters.Blur({
                     blur: 0.5
                }));
            }


            img.applyFilters();
            canvas.add(img);
            // canvas.requestRenderAll();
            canvas.renderAll()
            console.log('filters', img.filters)

          });

          fabric.util.createClass(fabric.Image.filters.BaseFilter, { 
            applyTo: {
                webgl: true
            }
         });
         
      }
}

    useEffect(() => {
        if(removeFilter || greyScaleBoolean || blurBoolean) {
            onChange(changeEvent)
        }
    }, [removeFilter, greyScaleBoolean, blurBoolean])

    console.log('change event', changeEvent)
    return (
        <div>
            <input 
                onChange={(e)=> onChange(e)} 
                type="file" 
                id="uploadedImg"/>

            <canvas id="canvas" style={{height: '500px', width: '600px' }}></canvas>

            <button onClick={()=> setRemoveFilter(true)}>remove filters</button>
            <button onClick={()=> setGreyScaleBoolean(true)}>apply grayscale</button>
            <button onClick={()=> setBlurBoolean(true)}>apply blur</button>
    </div>
    )
}

export const Test4 = Tests4

