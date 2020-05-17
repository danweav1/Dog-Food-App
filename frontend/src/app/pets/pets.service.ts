import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private pets: Pet[] = [];
  private petsUpdated = new Subject<Pet[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPets() {
    this.http
      .get<{ message: string; pets: any }>('http://localhost:3000/pets')
      .pipe(
        map((petData) => {
          console.log('petData', petData);
          return petData.pets.map((pet) => {
            console.log('pet', pet, 'petData', petData);
            return {
              id: pet._id,
              name: pet.name,
              badIngredients: pet.badIngredients,
              favoriteFoods: pet.favoriteFoods,
              owner: pet.owner,
              imagePath: pet.imagePath,
            };
          });
        })
      )
      .subscribe((transformedPets) => {
        // transformedPets is the result of our map operation
        this.pets = transformedPets;
        this.petsUpdated.next([...this.pets]);
        this.pets.forEach((pet) => {
          pet.imagePath = 'assets/profile-pic.png';
          pet.favoriteFoods.push({
            id: '11',
            name: 'Wellness Core',
            brand: 'Donkey',
            flavor: 'chicken and shit',
            ingredients: ['fish, bones'],
            imagePath: '',
          });
          pet.favoriteFoods.push({
            id: '22',
            name: 'Perdue',
            brand: 'Perdue',
            flavor: 'broccoli',
            ingredients: ['tuna, vodka'],
            imagePath: '',
          });
          pet.favoriteFoods.push({
            id: '22',
            name: 'Perdue',
            brand: 'Perdue',
            flavor: 'broccoli',
            ingredients: ['tuna, vodka'],
            imagePath: '',
          });
          pet.favoriteFoods.push({
            id: '22',
            name: 'Perdue',
            brand: 'Perdue',
            flavor: 'broccoli',
            ingredients: ['tuna, vodka'],
            imagePath: '',
          });
          pet.favoriteFoods.push({
            id: '22',
            name: 'Perdue',
            brand: 'Perdue',
            flavor: 'broccoli',
            ingredients: ['tuna, vodka'],
            imagePath: '',
          });
          pet.favoriteFoods.push({
            id: '22',
            name: 'Perdue',
            brand: 'Perdue',
            flavor: 'broccoli',
            ingredients: ['tuna, vodka'],
            imagePath: '',
          });
          pet.favoriteFoods.push({
            id: '22',
            name: 'Perdue',
            brand: 'Perdue',
            flavor: 'broccoli',
            ingredients: ['tuna, vodka'],
            imagePath: '',
          });
          pet.favoriteFoods.push({
            id: '22',
            name: 'Perdue',
            brand: 'Perdue',
            flavor: 'broccoli',
            ingredients: ['tuna, vodka'],
            imagePath: '',
          });
          pet.favoriteFoods.push({
            id: '22',
            name: 'Perdue',
            brand: 'Perdue',
            flavor: 'broccoli',
            ingredients: ['tuna, vodka'],
            imagePath: '',
          });
          pet.favoriteFoods.push({
            id: '22',
            name: 'Perdue',
            brand: 'Perdue',
            flavor: 'broccoli',
            ingredients: ['tuna, vodka'],
            imagePath: '',
          });
        });
      }); // don't need to unsubscribe because it's built into angular so handled for us
  }

  getPetUpdateListener() {
    return this.petsUpdated.asObservable();
  }

  addPet(name: string) {
    this.http
      .post<{ message: string; pet: Pet }>('http://localhost:3000/pets', {
        name,
      })
      .subscribe((res) => {
        const pet = res.pet;
        this.pets.push(pet); // only push and update the pets if the http req was successful
        this.petsUpdated.next([...this.pets]);
        this.router.navigate(['/mypets']);
      });
  }

  editPet(petId: string) {}

  deletePet(petId: string) {
    this.http.delete('http://localhost:3000/pets/' + petId).subscribe(() => {
      const udpatedPets = this.pets.filter((pet) => pet.id !== petId);
      this.pets = udpatedPets;
      this.petsUpdated.next([...this.pets]);
    });
  }
}
