import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pet } from '../pet.model';
import { PetsService } from '../pets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit, OnDestroy {
  pets: Pet[] = [];
  private petsSub: Subscription;
  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.petsService.getPets();
    this.petsSub = this.petsService
      .getPetUpdateListener()
      .subscribe((pets: Pet[]) => {
        this.pets = pets;
      });
  }

  ngOnDestroy(): void {
    this.petsSub.unsubscribe();
  }
}
