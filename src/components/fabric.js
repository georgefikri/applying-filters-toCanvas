import React from 'react'
import { fabric } from "fabric";

function fabrics() {
    let img = document.querySelector('img')
    const applyFilter = (e)=> {
        var URL = window.webkitURL || window.URL;
        var url = URL.createObjectURL(e.target.files[0]);
        img = new Image();      
        img.src = url;
        console.log('src',img.src = url)
        img.onload = function () {
            var canvas = new fabric.Canvas("c");
    
        ///
        fabric.Image.fromURL( img.src, function( img ) {
    
      // add filter
        img.filters.push(new fabric.Image.filters.Grayscale());
        // img.filters.push(new fabric.Image.filters.Vintage());
        // img.filters.push(new fabric.Image.filters.Blur({
        //     blur: 0.5
        //   }));
    
      // apply filters and re-render canvas when done
        // img.applyFilters(canvas.renderAll.bind(canvas));
    
      // add image onto canvas
        img.width = canvas.width;
        img.height = canvas.height;
        canvas.add(img);
    });
    }
}

    return (
        <div>
            <input type="file" id="file_input" onChange={(e)=> applyFilter(e)}/>
            <canvas id="c"></canvas>
        </div>
    )
}

export const Fabric = fabrics
