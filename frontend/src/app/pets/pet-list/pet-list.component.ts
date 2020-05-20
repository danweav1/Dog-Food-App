import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pet } from '../pet.model';
import { PetsService } from '../pets.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit, OnDestroy {
  pets: Pet[] = [];
  isLoading = false;
  totalPets = 0;
  petsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  userIsAuthenticated = false;
  private petsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    private petsService: PetsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    console.log(this.currentPage);
    this.petsService.getPets(this.petsPerPage, this.currentPage);
    this.petsSub = this.petsService
      .getPetUpdateListener()
      .subscribe((petData: { pets: Pet[]; petCount: number }) => {
        this.isLoading = false;
        this.totalPets = petData.petCount;
        this.pets = petData.pets;
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
    console.log(this.currentPage);
    this.petsPerPage = pageData.pageSize;
    this.petsService.getPets(this.petsPerPage, this.currentPage);
  }

  onEdit(petId: string) {}

  onDelete(petId: string) {
    this.isLoading = true;
    this.petsService.deletePet(petId).subscribe(() => {
      // once we delete a pet, we need to refetch them
      this.petsService.getPets(this.petsPerPage, this.currentPage);
    });
  }

  ngOnDestroy(): void {
    this.petsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
