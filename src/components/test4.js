import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";

function Tests4() {
    const [removeFilter, setRemoveFilter] = useState(false)
    const [greyScaleBoolean, setGreyScaleBoolean] = useState('')
    const [blurBoolean,setBlurBoolean] = useState('')
    const [changeEvent, setchangeEvent] = useState()
    let src
    let canvas
    let reader 
    let file
    const onChange = (e)=> {
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
                img.filters.splice(0,img.filters.length)
            } else if (greyScaleBoolean === 'grayscale') {
                // img.filters.splice(0,img.filters.length)
                // img.filters.push(new fabric.Image.filters.Grayscale())
                img.filters.splice(0,1,new fabric.Image.filters.Grayscale())

                console.log('grayscale', img.filters)
            } else if (blurBoolean === 'blur') {
                // img.filters.splice(0,img.filters.length)
                // img.filters.push(new fabric.Image.filters.Blur({
                //     blur: 0.5
                // }));
                img.filters.splice(0,1,new fabric.Image.filters.Blur({
                    blur: 0.5
                }));
                console.log('blur', img.filters)

            }


            img.applyFilters();
            canvas.add(img);
            // canvas.requestRenderAll();
            canvas.renderAll()

          });

          fabric.util.createClass(fabric.Image.filters.BaseFilter, { 
            applyTo: {
                webgl: true
            }
         });
         
      }
}

    useEffect(() => {
        if(removeFilter || greyScaleBoolean === 'grayscale' || blurBoolean === 'blur') {
            onChange(changeEvent)

        }
    }, [removeFilter, greyScaleBoolean, blurBoolean])

    // console.log('removeFilter', removeFilter)
    // console.log('greyScaleBoolean', greyScaleBoolean)
    // console.log('blurBoolean', blurBoolean)
    console.log('changeEvent', changeEvent)


    const download = (e)=> {
    let getCanvasById =  document.getElementById("canvas");
    var image = getCanvasById.toDataURL("image/jpg");
    console.log('img canvas', image)

    var link = document.createElement("a");

    document.body.appendChild(link); // for Firefox

    link.setAttribute("href", image);
    link.setAttribute("download", 'filtered-image');
    link.click();


    }


    return (
        <div>
            <input 
                onChange={(e)=> onChange(e)} 
                type="file" 
                id="uploadedImg"/>

            <canvas id="canvas" style={{height: '500px', width: '600px' }}></canvas>

            <div className='filter-buttons'>
                <button onClick={()=> setRemoveFilter(true)}>remove filters</button>
                <button onClick={()=> setGreyScaleBoolean('grayscale')}>apply grayscale</button>
                <button onClick={()=> setBlurBoolean('blur')}>apply blur</button>
                <button onClick={(e)=> download(e)}>
                    download
                </button>
            </div>
    </div>
    )
}

export const Test4 = Tests4

