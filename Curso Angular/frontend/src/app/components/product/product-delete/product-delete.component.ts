import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";
import { Product } from "../product.model";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {
    name: "",
    price: null,
  };
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService
      .show(id)
      .subscribe((product) => (this.product = product));
  }

  deleteProduct(): void {
    this.productService.delete(`${this.product.id}`).subscribe(() => {
      this.productService.showMessage("Produto atualizado com sucesso!");
      this.router.navigateByUrl("/products");
    });
  }

  cancel(): void {
    this.router.navigateByUrl("/products");
  }
}
