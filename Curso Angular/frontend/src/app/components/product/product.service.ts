import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";

import { Product } from "../product/product.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  base_url = "http://localhost:3333/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(mensagem: string, isError: boolean = false): void {
    this.snackBar.open(mensagem, "X", {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-succes"],
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.base_url, product).pipe(
      map((obj) => obj),
      catchError((erro) => this.erroHandler(erro))
    );
  }

  index(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base_url).pipe(
      map((obj) => obj),
      catchError((erro) => this.erroHandler(erro))
    );
  }

  show(id: string): Observable<Product> {
    return this.http.get<Product>(this.base_url + "/" + id).pipe(
      map((obj) => obj),
      catchError((erro) => this.erroHandler(erro))
    );
  }

  update(product: Product): Observable<Product> {
    return this.http
      .put<Product>(this.base_url + "/" + product.id, product)
      .pipe(
        map((obj) => obj),
        catchError((erro) => this.erroHandler(erro))
      );
  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(this.base_url + "/" + id).pipe(
      map((obj) => obj),
      catchError((erro) => this.erroHandler(erro))
    );
  }

  erroHandler(e: any): Observable<any> {
    this.showMessage("Acorreu um erro!", true);
    return EMPTY;
  }
}
