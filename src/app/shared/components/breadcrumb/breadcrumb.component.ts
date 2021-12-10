import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Crumb } from './crumb-type';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumbs: Crumb[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.breadcrumbs);
  }

  handleClick({ path, relative, disabled, absolute }: Crumb) {
    if (!disabled)
      this.router.navigate([path], {
        relativeTo: relative ? this.route : null,
        replaceUrl: absolute,
      });
  }
}
