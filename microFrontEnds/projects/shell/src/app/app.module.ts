import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatListModule } from '@angular/material/list';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopWidgetsComponent } from './top-widgets/top-widgets.component';

import { TopThreeProductsComponent } from './top-three-products/top-three-products.component';
import { MainComponent } from './main/main.component';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighchartsChartModule } from 'highcharts-angular';
import { SalesByDayComponent } from './sales-by-day/sales-by-day.component';
import { SalesByCategoryComponent } from './sales-by-category/sales-by-category.component';
import { LastFewTransactionComponent } from './last-few-transaction/last-few-transaction.component';
import { FooterComponent } from './footer/footer.component';
//
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    TopWidgetsComponent,
    TopThreeProductsComponent,
    MainComponent,
    SalesByDayComponent,
    SalesByCategoryComponent,
    LastFewTransactionComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    FontAwesomeModule,
    HighchartsChartModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
