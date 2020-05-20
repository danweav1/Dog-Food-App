import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PetsService } from '../pets.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css'],
})
export class PetCreateComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(
    private petsService: PetsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false; // if the authStatus changes we'll always need to disable the loader
      });
  }

  onAddPet(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.petsService.addPet(form.value.petName);
    form.resetForm();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
