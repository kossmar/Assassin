// I feel like I shouldn't be passing around the canvas like this....

async function imageToBase64URL(imageFile, canvas) {
    const imageBitmapPromise = await createImageBitmap(imageFile);
    const ctx = canvas.getContext('2d')
    canvas.width = imageBitmapPromise.width
    canvas.height = imageBitmapPromise.height
    ctx.drawImage(imageBitmapPromise, 0, 0)
    const dataUrl = canvas.toDataURL('image/jpeg')
    const base64Image = dataUrl.split(",")[1]

    return base64Image
}

export { imageToBase64URL }