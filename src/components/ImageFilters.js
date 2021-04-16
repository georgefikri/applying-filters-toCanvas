import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";

function ImageFilter() {
    /* storing button value to distinguish which filter to apply*/ 
    const [buttonString, setButtonString] = useState('')
    /* storing onChange  */
    const [changeEvent, setchangeEvent] = useState()

    let src,canvas,reader,file;

    const onChange = (e)=> {
        setchangeEvent(e)
        canvas = new fabric.Canvas('canvas');
        reader = new FileReader();
        file = e.target.files[0]
        canvasWrite(reader)
        reader.readAsDataURL(file);
    
    }

   const canvasWrite = (reader, filterType) => { 
    reader.onload = function (event){
        var imgObj = new Image();
        imgObj.src = event.target.result;
        src = event.target.result;
        fabric.Image.fromURL(src, function(img) {

            console.log('filters before', img.filters)
            if(buttonString === 'Vintage') {
                img.filters.shift()
                img.filters.push(new fabric.Image.filters.Vintage());
                
                /* remove all effect JIC it's asked to be done
                    img.filters.splice(0,img.filters.length)
                    new fabric.Image()
                 */
            } 
            else if (buttonString === 'grayscale') {

                img.filters.shift()
                img.filters.push(new fabric.Image.filters.Grayscale())
                console.log('grayscale', img.filters)

            } else if (buttonString === 'blur') {
                img.filters.shift()
                img.filters.push(new fabric.Image.filters.Blur({
                    blur: 0.5
                }));
                console.log('blur', img.filters)

            }


            img.applyFilters();
            canvas.add(img);
            canvas.renderAll()

        });
    }
}

    useEffect(() => {
        if(buttonString === 'Vintage' || buttonString === 'grayscale' || buttonString === 'blur') {
            onChange(changeEvent)
            console.log('inside useeffect')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttonString])



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
                <button 
                    onClick={()=> setButtonString('Vintage')}
                    disabled={changeEvent === undefined}>
                        Vintage
                </button>
                <button 
                    onClick={()=> setButtonString('grayscale')}
                    disabled={changeEvent === undefined}>
                        apply grayscale</button>
                <button 
                    onClick={()=> setButtonString('blur')}
                    disabled={changeEvent === undefined}>
                        apply blur</button>
                <button 
                    onClick={(e)=> download(e)}
                    disabled={changeEvent === undefined}>
                    download
                </button>
            </div>
    </div>
    )
}

export const ImageFilters = ImageFilter

