const workcode = () => {
    let offscreenCanvas:any;
    let offscreenCtx:CanvasRenderingContext2D;

    self.onmessage = function(evt) {
        let canvas = evt.data.canvas;
        let imageBitmap = evt.data.imageBitmap;

        if(canvas) {
            offscreenCanvas = canvas;
            offscreenCtx = offscreenCanvas.getContext('2d');
        } else if(imageBitmap) {
            offscreenCtx.drawImage(imageBitmap, 0, 0);
            offscreenCanvas.convertToBlob().then((blob:Blob) => {
                self.postMessage({blob, requestId:evt.data.requestId});
            });
        }
    }
}

let code = workcode.toString();
code = code.substring(code.indexOf('{')+1, code.lastIndexOf('}'));

const blob = new Blob([code], {type: 'application/javascript'});
const CaptureImgWorker = URL.createObjectURL(blob);

export default CaptureImgWorker;