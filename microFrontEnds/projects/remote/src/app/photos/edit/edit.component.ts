import { PhotosService } from './../../services/photos.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../models/photos';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  editPhotoForm!: FormGroup;

  photoData: Photo | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private photoService: PhotosService
  ) {
    this.editPhotoForm = this.formBuilder.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      thumbnailUrl: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '');

    if (id !== 0) {
      this.photoService.getPhotosById(id).subscribe((data) => {
        this.photoData = data;

        this.editPhotoForm.patchValue(this.photoData);
      });
    }
  }

  onSubmit() {
    if (this.editPhotoForm.valid) {
      const updatedFormData: Photo = this.editPhotoForm.value;
      console.log(updatedFormData);
      this.photoService.updatePhoto(updatedFormData);
    }
  }
}
