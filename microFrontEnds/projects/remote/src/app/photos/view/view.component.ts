import { PhotosService } from './../../services/photos.service';
import { PhotosComponent } from './../photos.component';
import { Photo } from './../../models/photos';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  photoDetails!: Photo;
  photoId!: number;

  constructor(
    private photosService: PhotosService,
    private router: ActivatedRoute,
    private route: ActivatedRoute
  ) {
    // this.photoId = parseInt(this.router.snapshot.paramMap.get('id') || '');
  }
  //   this.photosService.getPhotosById(this.photoId).subscribe((data: Photo) => {

  //     this.photoDetails = data;
  //   });
  // }
  ngOnInit(): void {
    // if (this.photoId > 100) {
    //   const editedPhotos: Photo[] = JSON.parse(
    //     localStorage.getItem('edit') || '[]'
    //   );
    //   const photo = editedPhotos.filter((item) => item.id === this.photoId);
    //   if (photo) {
    //     this.photoDetails = photo;
    //   }
    // } else {
    // this.photosService
    //   .getPhotosById(this.photoId)
    //   .subscribe((data: Photo) => {
    //     this.photoDetails = data;
    //   });
    // }
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);

    if (id > 100) {
      const addedItem = JSON.parse(localStorage.getItem('add') || '');
      const idx = addedItem.findIndex((data: { id: number }) => (data.id = id));
      this.photoDetails = addedItem[idx];
    } else if (id !== 0) {
      let editedPhotos: Photo[] = JSON.parse(
        localStorage.getItem('edit') || '[]'
      );

      if (editedPhotos) {
        const idx = editedPhotos.findIndex((photo) => photo.id === id);

        if (idx !== -1) {
          this.photoDetails = editedPhotos[idx];
        } else {
          this.photosService.getPhotosById(id).subscribe((data: Photo) => {
            this.photoDetails = data;
          });
        }
      }
    }
  }
}
