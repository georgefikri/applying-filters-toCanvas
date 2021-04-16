import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";

function Tests3() {
    const [greyScaleBoolean, setGreyScaleBoolean] = useState(false)
    const [blurBoolean, setBlurBoolean] = useState(false)

    let src
    var canvas
    let reader = new FileReader();

    const onChange = (e)=> {
        canvas = new fabric.Canvas('canvas');
           reader = new FileReader();
           canvasWrite(reader)
             reader.readAsDataURL(e.target.files[0]);
    
   }

    const canvasWrite = (reader, filterType) => { 
        console.log('filterType', filterType)
        reader.onload = function (event){
            var imgObj = new Image();
            imgObj.src = event.target.result;
            src = event.target.result;
            fabric.Image.fromURL(src, function(img) {

                // add filter
                if(filterType === 'Vintage') {
                    console.log('inside vintage')
                    // img.filters.push(new fabric.Image.filters.RemoveColor({
                    //     threshold: 0.2,
                    //   }));
                    img.filters.push(new fabric.Image.filters.Vintage());
                } else if(filterType === 'Vintage') {
                    img.filters.push(new fabric.Image.filters.Blur({
                        blur: 0.5
                    }));
                }
                    // img.filters.push(new fabric.Image.filters.Grayscale());
                    // img.filters.push(new fabric.Image.filters.Grayscale());
                    // img.filters.push(new fabric.Image.filters.Vintage());
                    // img.filters.push(new fabric.Image.filters.Blur({
                    //     blur: 0.5
                    //   }));
                img.applyFilters();
                canvas.add(img);
                canvas.requestRenderAll();
              });

              fabric.util.createClass(fabric.Image.filters.BaseFilter, { 
                applyTo: {
                    webgl: true
                }
             });
             
          }
    }

  

    useEffect(() => {
        if(greyScaleBoolean) {
            console.log('goa useeffect')
            canvasWrite(reader, 'Vintage')
        } else if (blurBoolean) {
            canvasWrite(reader, 'blur')
        }

        console.log('greyScaleBoolean', greyScaleBoolean)
    }, [greyScaleBoolean, src])
    
    return (
        <div>
            <input 
                onChange={(e)=> onChange(e)} type="file" id="uploadedImg"/>

        <canvas id="canvas" style={{height: '500px', width: '600px' }}></canvas>
        <button 
        onClick={(e)=> setGreyScaleBoolean(true)}
        >Vintage</button>

        <button 
        onClick={(e)=> setBlurBoolean(true)}
        >Blur</button>
    </div>
    )
}

export const Test3 = Tests3

