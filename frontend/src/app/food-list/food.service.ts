import { Injectable } from '@angular/core';
import { Food } from './food.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private foods: Food[] = [];
  private foodsUpdated = new Subject<{ foods: Food[]; foodCount: number }>();

  constructor(private http: HttpClient) {}

  getFood(foodPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${foodPerPage}&page=${currentPage}`;
    console.log(queryParams);
    this.http
      .get<{ message: string; foods: any; maxFoods: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((foodData) => {
          return {
            foods: foodData.foods.map((food) => {
              return {
                id: food._id,
                name: food.name,
                brand: food.brand,
                flavor: food.flavor,
                ingredients: food.ingredients,
                imagePath: food.imagePath,
              };
            }),
            maxFood: foodData.maxFoods,
          };
        })
      )
      .subscribe((transformedFoodsData) => {
        this.foods = transformedFoodsData.foods;
        this.foodsUpdated.next({
          foods: [...this.foods],
          foodCount: transformedFoodsData.maxFood,
        });
      });
  }

  getFoodUpdateListener() {
    return this.foodsUpdated.asObservable();
  }
}
