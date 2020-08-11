import { Component, OnInit } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-index",
  templateUrl: "./product-index.component.html",
  styleUrls: ["./product-index.component.css"],
})
export class ProductIndexComponent implements OnInit {
  products: Product[];
  displayedColumns = ["id", "name", "price", "actions"];

  constructor(private producService: ProductService) {}

  ngOnInit(): void {
    this.producService
      .index()
      .subscribe((products) => (this.products = products));
  }
}
