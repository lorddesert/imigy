export default async function saveImage(ref, file, uid, global = false) {
  try {

      if (global) uid = "global"

      await ref.child(`/${uid}/${file.name}`).put(file)

      console.log('File uploaded!');
      alert('File uploaded')
  } catch (error) {
      console.log(error)
      alert(`Ups, something happened: ${error}\n
      In case that this error appears multiple times, send a snapshot of this error to the support.`)
  }
}