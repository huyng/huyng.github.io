    function getImageDataURL(url, success, error) {
        var data, canvas, ctx;
        var img = new Image();
        var onImgLoad = function(){

            img = Pixastic.process(img, "blurfast", {amount:5});
            img = Pixastic.process(img, "hsl", {hue:0,saturation:0,lightness:-10});


            // Create the canvas element.
            canvas = document.createElement('canvas');
            canvas.width  = 1480;
            canvas.height = 500;
            // canvas.width = img.width;
            // canvas.height = img.height;

            // Get '2d' context and draw the image.
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Get average color of image at bottom
            destCanvas = document.createElement('canvas');
            destCanvas.width = 1;
            destCanvas.height = 1;
            destCtx = destCanvas.getContext('2d');
            destCtx.drawImage(canvas, 0, 498, 1480, 2, 0,0,1,1);
            imdata = destCtx.getImageData(0,0,destCanvas.width, destCanvas.height);
            r = imdata.data[0];
            g = imdata.data[1];
            b = imdata.data[2];

            // Get canvas data URL
            try{
                data = canvas.toDataURL();
                success({image:img, data:data, bottom_color:{r:r, g:g, b:b}});
            }catch(e){
                error(e);
            }
        }
        img.addEventListener("load", onImgLoad);
        
        // Load image URL.
        try{
            img.src = url;
            console.log("h");
        }catch(e){
            console.log("e");
            error(e);

        }
    }

// getImageDataURL("/static/8850085656_ed45650e55_c.jpg",function(evt){
//     var color= "rgb("+evt.bottom_color.r+","+evt.bottom_color.g+","+evt.bottom_color.b+")";
//     $('body').css({
//         "background-image":"url(" + evt.data + ")",
//         "background-repeat":"no-repeat",
//         // "background-position-y":"300px",
//         "background-color":  color
//     });
// }, function(e) { console.log(e)});
