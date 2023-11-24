import Client from '../model/entities/Client';

interface ClientDTO  extends Client{
  imagename:string | null;
}

export default {
 
  renderClient(client: ClientDTO) {
    return {
      id: client.id,
      name: client.name,
      latitude: client.latitude,
      longitude: client.longitude,
      cpf: client.cpf,
      username: client.username,
      imagename: this.renderImage(client.imagename)
    };
  },
  renderImage(nameImage: string | null):string {
    if(nameImage !== null){
      return  `${process.env.URL_IMG_CLIENT}/${nameImage}`;
    }else{
      return "";
    }
    
  },
 
}