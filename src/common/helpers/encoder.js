// I feel like I shouldn't be passing around the canvas like this....

async function imageToBase64URL(imageFile, canvas) {
    const imageBitmapPromise = await createImageBitmap(imageFile);
    const ctx = canvas.getContext('2d')
    canvas.width = imageBitmapPromise.width
    canvas.height = imageBitmapPromise.height
    ctx.drawImage(imageBitmapPromise, 0, 0)
    const dataUrl = canvas.toDataURL('image/jpeg')
    // const base64URL = dataUrl.split(",")[1]
    // return base64URL
    return dataUrl
}


function completeBase64ImageURL(data) {
    const base64Details = "data:image/jpeg;base64,"
    const imgBuffer = Buffer(data)
    const base64Data = imgBuffer.toString('base64')
    const fullBase64Img = base64Details + base64Data
    return fullBase64Img
}

export { imageToBase64URL, completeBase64ImageURL }