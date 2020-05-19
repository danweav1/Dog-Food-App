import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pet } from '../pet.model';
import { PetsService } from '../pets.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit, OnDestroy {
  pets: Pet[] = [];
  isLoading = false;

  userIsAuthenticated = false;
  private petsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    private petsService: PetsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.petsService.getPets();
    this.petsSub = this.petsService
      .getPetUpdateListener()
      .subscribe((pets: Pet[]) => {
        this.isLoading = false;
        this.pets = pets;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onEdit(petId: string) {}

  onDelete(petId: string) {
    this.petsService.deletePet(petId);
  }

  ngOnDestroy(): void {
    this.petsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
