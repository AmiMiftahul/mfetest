import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '../../models/photos';
import { PhotosService } from '../../services/photos.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  constructor(private photosService: PhotosService, private router: Router) {}
  newPhoto: Photo = {
    albumId: 1,
    id: 2,
    title: '',
    url: '',
    thumbnailUrl: '',
  };

  savePhoto() {
    console.log('Form submitted');
    this.photosService.createPhoto(this.newPhoto).subscribe((data) => {
      alert('Photo added successfully');
      this.router.navigate(['/photos']);
    });
  }
}
