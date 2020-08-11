import {
  Directive,
  OnInit,
  Input,
  ViewContainerRef,
  TemplateRef,
} from "@angular/core";

@Directive({
  selector: "[myFor]",
})
export class ForDirective implements OnInit {
  @Input("myForEm") numbers: String[];

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    this.numbers.forEach((icon) => {
      this.container.createEmbeddedView(this.template, { $implicit: icon });
    });
  }
}
