import { PhotosService } from './../../services/photos.service';
import { PhotosComponent } from './../photos.component';
import { Photo } from './../../models/photos';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  photoDetails!: Photo;
  photoId!: Number;

  constructor(
    private photosService: PhotosService,
    private router: ActivatedRoute
  ) {
    this.photoId = parseInt(this.router.snapshot.paramMap.get('id') || '');
    this.photosService.getPhotosById(this.photoId).subscribe((data: Photo) => {
      this.photoDetails = data;
    });
  }
}
