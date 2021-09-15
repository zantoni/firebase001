import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//  Service 
import { ProductService } from '../../../services/product.service';


// Class
import { Product } from '../../../models/product';

// toastr
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public productService : ProductService ) { }

  ngOnInit(): void {

    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm)
  {
    if(productForm.value.$key == null)
      this.productService.insertProduct(productForm.value);
    else
    this.productService.updateProduct(productForm.value);
    
    this.resetForm(productForm);
//    this.toastr.success('Sucessful Operation', 'Product Registered');
  }

  resetForm(productForm?: NgForm)
  {
    if(productForm != null)
      productForm.reset();
      this.productService.selectedProduct = new Product();
  }
}
