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
    console.log('do i get pets');
    this.petsService.getPets();
    console.log('got pets');
    this.petsSub = this.petsService
      .getPetUpdateListener()
      .subscribe((pets: Pet[]) => {
        this.isLoading = false;
        this.pets = pets;
      });
    console.log('');
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log('got user aunthetication status');
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    console.log('user is uanthetnicated');
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
