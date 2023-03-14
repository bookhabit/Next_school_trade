import Geocode from 'react-geocode'

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string)
Geocode.setLanguage('ko')
Geocode.setRegion('es')
Geocode.enableDebug()

const GeoCoding = async (currentAddr:string) => {
  return Geocode.fromAddress(currentAddr)
    .then( response => {
        const { lat, lng } = response.results[0].geometry.location;
      console.log('GeoCoding',lat,lng)
      return {lat, lng}
    })
    .catch(err => console.log(err))
}

export default GeoCoding 