export class Place {
  constructor(title, imageUri, address = null, location = null) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    // @ts-ignore
    this.location = location ? { lat: location.lat, lng: location.lng } : null;
    this.id = `${new Date().getTime()}_${Math.random()}`;
  }
}