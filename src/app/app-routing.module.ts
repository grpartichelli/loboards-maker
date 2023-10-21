import { Router, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CreatorComponent } from "./presentation/creator/creator.component";
import { HomeComponent } from "./presentation/home/home.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "creator",
    component: CreatorComponent,
  },
  { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollOffset: [0, 0],
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
