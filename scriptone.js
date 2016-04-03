$(document).ready(function(){
	
	
	
	
	
	var camera = $('#camera'),
		photos = $('#photos'),
		screen =  $('#screen');

//	var template = '<a href="uploads/original/{src}" rel="cam" '
//		+'style="background-image:url(uploads/thumbs/{src})"></a>';

	/*----------------------------------
		Setting up the web camera
	----------------------------------*/
	
	Webcam.set({
			width: 500,
			height: 375,
            dest_width: 640,
            dest_height: 480,
			image_format: 'jpeg',
			jpeg_quality: 90
            
            
		});
		
		
	   
/*
	webcam.set_swf_url('assets/webcam/webcam.swf');
//	webcam.set_api_url('upload.php');	// The upload script
	webcam.set_quality(80);				// JPEG Photo Quality
	webcam.set_shutter_sound(true, 'assets/webcam/shutter.mp3');

	// Generating the embed code and adding it to the page:	
	screen.html(
		webcam.get_html(screen.width(), screen.height())
	);
*/


	/*----------------------------------
		Binding event listeners
	----------------------------------*/



	var shootEnabled = true;
		
	$('#shootButton').click(function(){
		
		if(!shootEnabled){
			
			return false;
		}
		
		Webcam.freeze();
		togglePane();
		return false;
	});
	
	$('#cancelButton').click(function(){
		Webcam.unfreeze();
		togglePane();
		return false;
	});
	
	$('#uploadButton').click(function(){
		
		Webcam.snap( function(data_uri) {
                //clear the canvas
                canvas.clear().renderAll(); 
				// display results in page
                fabric.Image.fromURL(data_uri, function(wImg) {
                
                    // scale image down, and flip it, before adding it onto canvas
                //oImg.scale(0.5).setFlipX(true);
                canvas.setBackgroundImage(wImg);
                    });
				
                //document.getElementById('results').innerHTML = 
					//'<h2>Here is your image:</h2>' + 
					//'<img src="'+data_uri+'"/>';  
			});
                        
             fabric.Image.fromURL('necklace.png', function(oImg) {
				 oImg.scale(0.5)
				  oImg.setLeft(canvas.width/3); 
	oImg.setTop(canvas.height/1.75);
            canvas.add(oImg);});    
		
		Webcam.unfreeze();
		togglePane();
		return false;
	});

	camera.find('.settings').click(function(){
		if(!shootEnabled){
			return false;
		}
		
		webcam.configure('camera');
	});


	// Showing and hiding the camera panel:
	
	var shown = false;
	$('.camTop').click(function(){
		
		Webcam.attach( '#screen' );
		
		$('.tooltip').fadeOut('fast');
		
		if(shown){
			camera.animate({
				bottom:-466
			});
		}
		else {
			camera.animate({
				bottom:-5
			},{easing:'easeOutExpo',duration:'slow'});
		}
		
		shown = !shown;
	});

	$('.tooltip').mouseenter(function(){
		$(this).fadeOut('fast');
	});

	$("input[type='image']").click(function() {
    $("input[id='my_file']").click();

	});

	/*---------------------- 
		Callbacks
	----------------------*/
var canvas = new fabric.Canvas('c');
 var ctx = canvas.getContext('2d');       
    //code for upload  
        document.getElementById('my_file').onchange = function handleImage(e) {
            
            canvas.clear().renderAll();
            
    var reader = new FileReader();
    reader.onload = function (event) { console.log('fdsf');
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            
//			document.body.appendChild(imgObj);
//            debugger;
            var hrw = imgObj.height / imgObj.width;
            var newHeight = canvas.height;
            var newWidth = newHeight / hrw;
            if (newWidth > canvas.width) {
                newWidth = canvas.width;
                newHeight = newWidth * hrw;
            }
            //ctx.drawImage(imgObj,0,0, newWidth , newHeight);
			
			// start fabricJS stuff

            var image = new fabric.Image(imgObj);
            image.set({
               // top: canvas.height/2,
				//left: canvas.width/2,
				scaleY: canvas.height / imgObj.height,
				scaleX: canvas.width / imgObj.width
            });
            //image.scale(getRandomNum(0.1, 0.25)).setCoords();
            canvas.setBackgroundImage(image);
            
      fabric.Image.fromURL('necklace.png', function(oImg) {
  // scale image down, and flip it, before adding it onto canvas
  oImg.setLeft(canvas.width/3); 
	oImg.setTop(canvas.height/1.75);	  
  //oImg.center();
  //oImg.setCoords(); 	
  canvas.add(oImg);
});
  
            // end fabricJS stuff
        }
		//imgObj.src = reader.result;

    }
    reader.readAsDataURL(e.target.files[0]);
}	
	
	
function togglePane(){
		var visible = $('#camera .buttonPane:visible:first');
		var hidden = $('#camera .buttonPane:hidden:first');
		
		visible.fadeOut('fast',function(){
			hidden.show();
		});
	}
	
	
});
