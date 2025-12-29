import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: false
})
export class ProductDetailsPage implements OnInit {

  productId!: string;
  product: any;

  constructor(private router: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.productId = this.router.snapshot.paramMap.get('id')!;

    this.getProductDetails(this.productId);
  }

  getProductDetails(id: string) {
    this.apiService.get(`products/${id}`)
      .subscribe(res => {
        this.product = res;
      });
  }
}
