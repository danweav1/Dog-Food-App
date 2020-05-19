import { Injectable } from '@angular/core';
import { Food } from './food.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private foods: Food[] = [];
  private foodsUpdated = new Subject<Food[]>();

  constructor(private http: HttpClient) {}

  getFood() {
    this.http
      .get<{ foods: any }>('http://localhost:3000/food')
      .pipe(
        map((foodData) => {
          return foodData.foods.map((food) => {
            return {
              id: food._id,
              name: food.name,
              brand: food.brand,
              flavor: food.flavor,
              ingredients: food.ingredients,
              imagePath: food.imagePath,
            };
          });
        })
      )
      .subscribe((transformedFoods) => {
        this.foods = transformedFoods;
        this.foodsUpdated.next([...this.foods]);
      });
  }

  getFoodUpdateListener() {
    return this.foodsUpdated.asObservable();
  }
}
