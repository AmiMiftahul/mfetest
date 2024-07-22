import { PhotosService } from './../../services/photos.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../models/photos';
import { Router } from '@angular/router';
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
    private photoService: PhotosService,
    private router: Router
  ) {
    this.editPhotoForm = this.formBuilder.group({
      albumId: 1,
      title: ['', Validators.required],
      url: ['', Validators.required],
      thumbnailUrl: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);

    if (id > 100) {
      const addedItem = JSON.parse(localStorage.getItem('add') || '');
      const filtered = addedItem.filter(
        (each: { id: number }) => each.id === id
      );
      this.photoData = filtered[0];
      this.editPhotoForm.patchValue(filtered[0]);
    } else if (id !== 0) {
      let editedPhotos: Photo[] = JSON.parse(
        localStorage.getItem('edit') || '[]'
      );

      if (editedPhotos) {
        const idx = editedPhotos.findIndex((photo) => photo.id === id);

        if (idx !== -1) {
          this.photoData = editedPhotos[idx];
          this.editPhotoForm.patchValue(editedPhotos[idx]);
        } else {
          this.photoService.getPhotosById(id).subscribe((data) => {
            this.photoData = data;
            this.editPhotoForm.patchValue(this.photoData);
          });
        }
      }
    }
  }

  onSubmit() {
    if (this.editPhotoForm.valid) {
      const updatedFormData: Photo = this.editPhotoForm.value;
      updatedFormData.id = this.photoData?.id || 0;

      this.photoService
        .updatePhoto(updatedFormData)
        .subscribe((updatedPhoto) => {
          // Update local storage
          if (updatedPhoto.id > 100) {
            const addedItem = JSON.parse(localStorage.getItem('add') || '');
            const idx = addedItem.findIndex(
              (data: { id: number }) => data.id === updatedPhoto.id
            );
            addedItem[idx] = updatedPhoto;
            localStorage.setItem('add', JSON.stringify(addedItem));
          } else {
            let editedPhotos: Photo[] = JSON.parse(
              localStorage.getItem('edit') || '[]'
            );

            if (editedPhotos) {
              const idx = editedPhotos.findIndex(
                (photo) => photo.id === updatedPhoto.id
              );
              console.log('tol');
              console.log(idx);

              if (idx !== -1) {
                editedPhotos[idx] = updatedPhoto;
              } else {
                editedPhotos.push(updatedPhoto);
              }

              localStorage.setItem('edit', JSON.stringify(editedPhotos));
            }
          }

          alert('Photo updated successfully');
          this.router.navigate(['/photos']);
        });
    }
  }
}
