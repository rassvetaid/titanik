export interface Passenger {
  id: number;
  class: string;
  survived: boolean;
  name: string;
  gender: string;
  age: number;
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
