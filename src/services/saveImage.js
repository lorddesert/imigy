import { uploadBytes, ref, listAll } from 'firebase/storage'

export default async function saveImage(imagesRef, file, uid, global = false) {
  try {
      if (global) uid = "global"
      
      const destiny = ref(imagesRef.storage, `images/${uid}/${file.name}`)

      const response = await uploadBytes(destiny, file)

      console.log('File uploaded!');
      alert('File uploaded')
      
      return response
    } catch (error) {
      console.log(error)
      alert(`Ups, something happened: ${error}\n
      In case that this error appears multiple times, send a snapshot of this error to the support.`)
  }
}