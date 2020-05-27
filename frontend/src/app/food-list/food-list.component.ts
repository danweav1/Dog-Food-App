import { Component, OnInit, OnDestroy } from '@angular/core';
import { Food } from './food.model';
import { FoodService } from './food.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IngredientsDialogComponent } from '../ingredients-dialog/ingredients-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent implements OnInit, OnDestroy {
  foods: Food[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  totalFood = 0;
  foodPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  private foodsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    private foodService: FoodService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.foodService.getFood(this.foodPerPage, this.currentPage);
    this.foodsSub = this.foodService
      .getFoodUpdateListener()
      .subscribe((foodData: { foods: Food[]; foodCount: number }) => {
        this.isLoading = false;
        this.totalFood = foodData.foodCount;
        this.foods = foodData.foods;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true; // automatically setting this to false in the petsSub after getPets is called
    this.currentPage = pageData.pageIndex + 1;
    this.foodPerPage = pageData.pageSize;
    this.foodService.getFood(this.foodPerPage, this.currentPage);
  }

  openIngredientsDialog(food: Food) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = { name: food.name, ingredients: food.ingredients };
    console.log(dialogConfig.data);
    this.dialog.open(IngredientsDialogComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.foodsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
