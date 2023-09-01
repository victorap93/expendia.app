async function getBlob(uri: string) {
  try {
    const response = await fetch(uri)
    const blob = await response.blob()

    return blob
  } catch (error) {
    console.error(error)
    return false
  }
}
