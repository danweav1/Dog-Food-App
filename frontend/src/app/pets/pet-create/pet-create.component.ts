import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css'],
})
export class PetCreateComponent implements OnInit {
  isLoading = false;

  constructor(private petsService: PetsService) {}

  ngOnInit(): void {}

  onAddPet(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.petsService.addPet(form.value.petName);
    form.resetForm();
  }
}
