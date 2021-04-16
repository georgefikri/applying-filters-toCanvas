import React, { useEffect } from 'react'
import { fabric } from "fabric";

function TestFabrics() {

    const onUpload = (e)=> {
        var canvas = new fabric.Canvas('canvas');
            var reader = new FileReader();
              reader.onload = function (event){
                var imgObj = new Image();
                imgObj.src = event.target.result;
                let src = imgObj.src = event.target.result;
                fabric.Image.fromURL(src, function(img) {

                    // add filter
                    img.filters.push(new fabric.Image.filters.Grayscale());
                  
                    // apply filters and re-render canvas when done
                    img.applyFilters();
                    // add image onto canvas (it also re-render the canvas)
                    canvas.add(img);
                  });
              }
              reader.readAsDataURL(e.target.files[0]);
     
    }



    return (
        <div>
            <form id="uploadImg" onChange={(e)=> onUpload(e)} runat="server">
                <input type="file" id="uploadedImg"/>
            </form>
            <canvas id="canvas" style={{height: '500px', width: '600px' }}></canvas>
        </div>
    )
}

export const TestFabric = TestFabrics
