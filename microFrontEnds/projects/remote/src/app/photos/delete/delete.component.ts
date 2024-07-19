import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotosService } from '../../services/photos.service';

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

    // FOR DELETE
    this.photosService.deletePhoto(this.photoId).subscribe((photo) => {
      alert('Photo Deleted successfully');
      this.route.navigate(['photos']);
    });
  }
}
