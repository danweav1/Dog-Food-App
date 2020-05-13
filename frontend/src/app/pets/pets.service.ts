import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private pets: Pet[] = [];
  private petsUpdated = new Subject<Pet[]>();

  constructor(private http: HttpClient) {}

  getPets() {
    this.http
      .get<{ message: string; pets: Pet[] }>('http://localhost:3000/pets')
      .subscribe((petData) => {
        this.pets = petData.pets;
        this.petsUpdated.next([...this.pets]);
      }); // don't need to unsubscribe because it's built into angular so handled for us
  }

  getPetUpdateListener() {
    return this.petsUpdated.asObservable();
  }

  addPet(name: string) {
    const pet: Pet = { id: null, name: name, owner: 'Dan' };
    this.http
      .post<{ message: string }>('http://localhost:3000/pets', pet)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.pets.push(pet); // only push and update the pets if the http req was successful
        this.petsUpdated.next([...this.pets]);
      });
  }
}
