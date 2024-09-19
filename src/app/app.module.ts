import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { HeroComponent } from './main/hero/hero.component';
import { MainComponent } from './main/main.component';
import { GlobeAnimationService } from './service/globe-animation.service';
import { SlideComponent } from './main/projects/slide/slide.component';
import { ProjectsComponent } from './main/projects/projects.component';
import { FooterComponent } from './main/footer/footer.component';
import { AboutComponent } from './main/about/about.component';
import { MobileViewComponent } from './main/mobile-view/mobile-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    MainComponent,
    SlideComponent,
    ProjectsComponent,
    FooterComponent,
    AboutComponent,
    MobileViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [GlobeAnimationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
