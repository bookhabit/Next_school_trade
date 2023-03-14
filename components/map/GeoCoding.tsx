import Geocode from 'react-geocode'

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string)
Geocode.setLanguage('ko')
Geocode.setRegion('es')
Geocode.enableDebug()

type GeoLocation = {
    lat: number;
    lng: number;
  }

  const GeoCoding = async (currentAddr:string): Promise<GeoLocation> => {
    const response = await Geocode.fromAddress(currentAddr);
    const { lat, lng } = response.results[0].geometry.location;
    return {lat, lng};
  }

export default GeoCoding 