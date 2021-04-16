import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";

function Tests4() {
    let img = document.querySelector('img')

    const onChange = (e)=> {
            var URL = window.webkitURL || window.URL;
            var url = URL.createObjectURL(e.target.files[0]);
            img = new Image();      
            img.src = url;
            img.onload = function () {
            var canvas = new fabric.Canvas("c");

            ///
            fabric.Image.fromURL( img.src, function( img ) {

            // add filter
            canvas.filters.push(new fabric.Image.filters.Grayscale());

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
            <input onChange={(e)=> onChange(e)}  type="file" id="file_input"/>
            <canvas id="c"></canvas>
    </div>
    )
}

export const Test4 = Tests4

