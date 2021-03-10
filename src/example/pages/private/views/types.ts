export interface IUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}
export interface IPost {
  id: number;
  userId: IUser['id'];
  title: string;
  body: string;
}
