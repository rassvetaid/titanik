export interface Passenger {
  id: string;
  class: string;
  survived: string;
  name: string;
  gender: string;
  age: string;
  sibsp: string;
  parch: string;
  ticket: string;
  boat: string | null;
  body: string | null;
}

export interface PassengerFilter {
    name?: string;
    age?: string;
    gender?: string;
    survived?: string;
}
