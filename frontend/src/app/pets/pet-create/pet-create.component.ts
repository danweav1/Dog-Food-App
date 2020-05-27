import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PetsService } from '../pets.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css'],
})
export class PetCreateComponent implements OnInit, OnDestroy {
  isLoading = false;
  imagePreview: string;
  form: FormGroup;
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
    this.form = new FormGroup({
      petName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      image: new FormControl(null, {
        asyncValidators: [mimeType],
      }),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file,
    });
    this.form.get('image').updateValueAndValidity(); // lets angular know the value was changed and it should revalidate it
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }; // executed when it's done loading the file. it's async.
    reader.readAsDataURL(file); // instruct it to load the file. kicks off the onload event.
  }

  onAddPet(): void {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.petsService.addPet(this.form.value.petName, this.form.value.image);
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
