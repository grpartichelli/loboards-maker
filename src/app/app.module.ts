import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToolbarModule } from "./components/toolbar/toolbar.component";
import { NgOptimizedImage, CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CreatorModule } from "./components/board-creator/board-creator.component";
import { HomeModule } from "./components/home/home.component";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    HttpClientModule,
    ToolbarModule,
    CreatorModule,
    HomeModule,
    CommonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
