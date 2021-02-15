function getSyncScriptParams() {
     var scripts = document.getElementsByTagName('script');
     var lastScript = scripts[scripts.length-1];
     var scriptName = lastScript;
     return {
        room : scriptName.getAttribute('room'),
     };
}

document.addEventListener('DOMContentLoaded',() => {

	var scriptParams = getSyncScriptParams();
	var room = scriptParams.room;
    if (room==undefined) {
        room = '';
    }
	var srcUrl = "https://live.dreampotential.org/" + room;

	var meta = document.createElement('meta');
	meta.name = "viewport";
	meta.content = "width=device-width, initial-scale=1";
	document.getElementsByTagName('head')[0].appendChild(meta);

    var widgetHtml = `
    	<div id="sntch_webchat" style=" ;background-color: rgb(255, 255, 255); width: 600px; height: 600px; position: fixed; bottom: 10px; right: 10px; max-height: 100%; max-width: 100%; z-index: 2147483647; transform: translateY(105%); transition: transform 0.5s ease 0s; border-radius: 20px 20px 0px 0px; overflow: hidden; box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;">
		    <style>
		    @media print {
		        #sntch_webchat, #sntch_button, #sntch_popup {
		          	visibility: hidden;
		        }
		    }
		    </style>
	        <div style="box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; position: relative; height: 100%;">
	          	<iframe style="max-width: 100%; width:600px; height: 600px; border:0" src="`+srcUrl+`" name="mobile" id="sntch_iframe" allow="microphone"></iframe>
	          	<div id="sntch_close" style="position: absolute; top: 20px; right: 8px; width: 40px; height: 40px; line-height: 20px; text-align: center; cursor: pointer;"><svg width="24" height="24" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
		            <path d="M1490 1245q0 40-24 68l-136 136q-24 24-68 24t-68-28l-294-294-294
		            294q-24 24-68 24t-68-28l-136-136q-24-24-24-68t24-68l294-294-294-294q-24-24-24-68t24-68l136-136q24-24 68-24t68
		            28l294 294 294-294q24-24 68-28t68 28l136 136q28 24 24 68t-24 68l-294 294 294 294q24 24 24 68z" fill="#0079fe"></path>
		            </svg>
	            </div>
	           </div>
      	</div>
	    <div id="sntch_block" style="z-index: 2147483646; position: fixed; bottom: 0px; right: 0px; width: 1280px; height: 5px;"><div id="sntch_button" hash="3c93dc29be762468845964202a0790f47c448d8197b94c7cb4106bc61ede620a" style="z-index: 2147483646; box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; width: 40px; height: 40px; color: rgb(255, 255, 255); font-size: 18px; font-weight: 400; background-color: rgb(255, 255, 255); justify-content: center; align-items: center; display: flex; cursor: pointer; position: absolute; right: 10px; bottom: 10px; box-sizing: border-box; padding: 10px; background-image: url(&quot;https://images-eu.ssl-images-amazon.com/images/I/411d1-PV6kL.png&quot;); background-size: cover; background-position: center center; border-radius: 50%;"></div>
	    </div>
    `;
    document.body.innerHTML += widgetHtml;

    document.getElementById("sntch_button").addEventListener("click", function(){
	 document.getElementById("sntch_webchat").style.transform = "translateY(0px)";
	});
	document.getElementById("sntch_close").addEventListener("click", function(){
	 document.getElementById("sntch_webchat").style.transform = "translateY(105%)";
	});
});
