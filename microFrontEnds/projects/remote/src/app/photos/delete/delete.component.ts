import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotosService } from '../../services/photos.service';
import { Photo } from '../../models/photos';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class DeleteComponent {
  photoId!: Number;
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private photosService: PhotosService
  ) {
    this.photoId = parseInt(this.router.snapshot.paramMap.get('id') || '');

    const deletedLogs = JSON.parse(localStorage.getItem('deleted') || '[]');
    deletedLogs.push(this.photoId);
    localStorage.setItem('deleted', JSON.stringify(deletedLogs));
    // // Delete photo form localStorage 'add' key
    // let addedPhotos: Photo[] = JSON.parse(localStorage.getItem('add') || '[]');
    // addedPhotos = addedPhotos.filter((photo) => photo.id !== this.photoId);
    // localStorage.setItem('add', JSON.stringify(addedPhotos));

    // // Delete photo from localStorage 'edit' key
    // let editedPhotos: Photo[] = JSON.parse(
    //   localStorage.getItem('edit') || '[]'
    // );
    // editedPhotos = editedPhotos.filter((photo) => photo.id !== this.photoId);
    // localStorage.setItem('edit', JSON.stringify(editedPhotos));

    // FOR DELETE
    this.photosService.deletePhoto(this.photoId).subscribe((deletePhoto) => {
      alert('Photo Deleted successfully');
      this.route.navigate(['photos']);
    });
  }
}
