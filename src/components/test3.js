import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";

function Tests3() {

    const [greyScaleBoolean, setGreyScaleBoolean] = useState(false)
    
    let src
    var canvas


    const canvasWrite = (reader) => {
        reader.onload = function (event){
            var imgObj = new Image();
            imgObj.src = event.target.result;
            src = imgObj.src = event.target.result;
            fabric.Image.fromURL(src, function(img) {

                // add filter
                    img.filters.push(new fabric.Image.filters.Grayscale());
                    // img.filters.push(new fabric.Image.filters.Grayscale());
                    // img.filters.push(new fabric.Image.filters.Vintage());
                    // img.filters.push(new fabric.Image.filters.Blur({
                    //     blur: 0.5
                    //   }));
                img.applyFilters();
                canvas.add(img);
                canvas.renderAll();
              });
          }
    }

    const onChange = (e)=> {
         canvas = new fabric.Canvas('canvas');
            var reader = new FileReader();
            canvasWrite(reader)
              reader.readAsDataURL(e.target.files[0]);
     
    }

    useEffect(() => {
        if(greyScaleBoolean) {
            console.log('goa el if condition')
            var reader = new FileReader();
            reader.onload = function (event){
                var imgObj = new Image();
                imgObj.src = event.target.result;
                src = imgObj.src = event.target.result;
                fabric.Image.fromURL(src, function(img) {

                    // add filter
                        img.filters.push(
                            new fabric.Image.filters.Sepia()
                            );
                  
                    // apply filters and re-render canvas when done
                    img.applyFilters();
                    // add image onto canvas (it also re-render the canvas)
                    canvas.add(img);
                  });
              }
        }
    }, [greyScaleBoolean])
    
    return (
        <div>
            <input 
                onChange={(e)=> onChange(e)} type="file" id="uploadedImg"/>

        <canvas id="canvas" style={{height: '500px', width: '600px' }}></canvas>
        <button 
        onClick={(e)=> console.log('eeee', e)}
        >Grayscale</button>
    </div>
    )
}

export const Test3 = Tests3

