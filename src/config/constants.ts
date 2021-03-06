export const GOOGLE_MAPS_LINK: string = `https://maps.googleapis.com/maps/api/js?key=${
  process.env.REACT_APP_GOOGLE_MAPS_KEY
}&v=3.exp&libraries=geometry,drawing,places`;

export const MEDIA_SIZES: { tablet: string; mobile: string } = {
  tablet: '1024px',
  mobile: '767px'
};
