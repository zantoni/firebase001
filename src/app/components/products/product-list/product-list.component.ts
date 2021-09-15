import { Component, OnInit } from '@angular/core';

// model
import { Product } from '../../../models/product';

// service
import { ProductService } from '../../../services/product.service';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList! : Product[];
  x! : Product[];

  constructor(
    private productService: ProductService
    ,    private toastr: ToastrService
  ) { }

  ngOnInit() {
    return this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          var y = {...x, $key: ""};
          let z : any = element.key;
          y.$key = z ;
          console.log(y);
          this.productList.push(y as Product);
          console.log( this.productList);
        });
      });
  }
  onEdit(product: Product) {
    this.productService.selectedProduct = Object.assign({}, product);
  }

  

  onDelete($key: string) {
    if(confirm('Are you sure you want to delete it?')) {
      this.productService.deleteProduct($key);
      this.toastr.warning('Deleted Successfully', 'Product Removed');
    }
  }

  
}
