import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/pets';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private pets: Pet[] = [];
  private petsUpdated = new Subject<{ pets: Pet[]; petCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPets(petsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${petsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; pets: any; maxPets: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((petData) => {
          return {
            pets: petData.pets.map((pet) => {
              return {
                id: pet._id,
                name: pet.name,
                badIngredients: pet.badIngredients,
                favoriteFoods: pet.favoriteFoods,
                owner: pet.owner,
                imagePath: pet.imagePath,
              };
            }),
            maxPets: petData.maxPets,
          };
        })
      )
      .subscribe((transformedPetsData) => {
        // transformedPets is the result of our map operation
        this.pets = transformedPetsData.pets;
        this.petsUpdated.next({
          pets: [...this.pets],
          petCount: transformedPetsData.maxPets,
        });
        this.pets.forEach((pet) => {
          if (!pet.imagePath) {
            pet.imagePath = 'assets/profile-pic.png';
          }

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

  addPet(name: string, image: File) {
    const petData = new FormData();
    petData.append('name', name);
    petData.append('image', image);
    console.log(image);
    this.http
      .post<{ message: string; pet: Pet }>(BACKEND_URL, petData)
      .subscribe((res) => {
        this.router.navigate(['/mypets']);
      });
  }

  editPet(petId: string) {}

  deletePet(petId: string) {
    return this.http.delete(BACKEND_URL + '/' + petId);
  }
}
